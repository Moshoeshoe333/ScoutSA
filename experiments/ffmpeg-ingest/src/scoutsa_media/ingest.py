"""Safe, local-only FFmpeg ingestion prototype.

This module processes one operator-supplied local video at a time. It does not
discover cameras, access RTSP endpoints, upload media, or modify source files.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import stat
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

MAX_INPUT_BYTES = 250 * 1024 * 1024
MAX_DURATION_SECONDS = 180.0
MAX_WIDTH = 1280
MAX_HEIGHT = 720
PROBE_TIMEOUT_SECONDS = 20
TRANSCODE_TIMEOUT_SECONDS = 180


class IngestError(Exception):
    """Expected validation or media-processing failure."""


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _run_probe(source: Path, ffprobe_bin: str) -> dict[str, Any]:
    command = [
        ffprobe_bin, "-v", "error",
        "-show_entries",
        "format=duration:stream=codec_type,codec_name,width,height",
        "-of", "json", str(source),
    ]
    try:
        result = subprocess.run(
            command, capture_output=True, text=True, check=False,
            timeout=PROBE_TIMEOUT_SECONDS,
        )
    except (OSError, subprocess.TimeoutExpired) as exc:
        raise IngestError(f"FFprobe could not inspect the input: {exc}") from exc
    if result.returncode != 0:
        raise IngestError("FFprobe rejected the input or could not read it.")
    try:
        value = json.loads(result.stdout)
    except (TypeError, json.JSONDecodeError) as exc:
        raise IngestError("FFprobe returned invalid metadata.") from exc
    if not isinstance(value, dict):
        raise IngestError("FFprobe returned an unexpected metadata structure.")
    return value


def _duration_and_video(metadata: dict[str, Any]) -> tuple[float, dict[str, Any]]:
    streams = metadata.get("streams")
    if not isinstance(streams, list):
        raise IngestError("No readable media streams were reported.")
    video = next(
        (item for item in streams if isinstance(item, dict) and item.get("codec_type") == "video"),
        None,
    )
    if video is None:
        raise IngestError("Input does not contain a video stream.")
    try:
        duration = float(metadata["format"]["duration"])
        width = int(video["width"])
        height = int(video["height"])
    except (KeyError, TypeError, ValueError) as exc:
        raise IngestError("Duration or video dimensions are missing or invalid.") from exc
    if not (0 < duration <= MAX_DURATION_SECONDS):
        raise IngestError(f"Video duration must be between 0 and {MAX_DURATION_SECONDS:g} seconds.")
    if width <= 0 or height <= 0:
        raise IngestError("Video dimensions must be positive.")
    return duration, video


def _snapshot_source(source_path: Path, snapshot_path: Path) -> str:
    """Copy and hash one opened source inode; downstream tools use only snapshot."""
    flags = os.O_RDONLY
    if hasattr(os, "O_NOFOLLOW"):
        flags |= os.O_NOFOLLOW
    try:
        descriptor = os.open(source_path, flags)
    except OSError as exc:
        raise IngestError(f"Input could not be opened safely: {exc}") from exc
    digest = hashlib.sha256()
    try:
        info = os.fstat(descriptor)
        if not stat.S_ISREG(info.st_mode):
            raise IngestError("Input must be a regular, non-symlink file.")
        if info.st_size <= 0:
            raise IngestError("Input file is empty.")
        if info.st_size > MAX_INPUT_BYTES:
            raise IngestError(f"Input exceeds the {MAX_INPUT_BYTES}-byte limit.")
        with os.fdopen(descriptor, "rb", closefd=True) as source:
            descriptor = -1
            with snapshot_path.open("xb") as snapshot:
                for chunk in iter(lambda: source.read(1024 * 1024), b""):
                    digest.update(chunk)
                    snapshot.write(chunk)
                snapshot.flush()
                os.fsync(snapshot.fileno())
        return digest.hexdigest()
    finally:
        if descriptor >= 0:
            os.close(descriptor)


def _validate_derivative(
    metadata: dict[str, Any], source_duration: float
) -> tuple[float, int, int]:
    streams = metadata.get("streams")
    if not isinstance(streams, list) or len(streams) != 1:
        raise IngestError("Derivative must contain exactly one media stream.")
    video = streams[0]
    if not isinstance(video, dict) or video.get("codec_type") != "video":
        raise IngestError("Derivative contains an unexpected non-video stream.")
    if video.get("codec_name") != "h264":
        raise IngestError("Derivative video codec is not H.264.")
    try:
        duration = float(metadata["format"]["duration"])
        width = int(video["width"])
        height = int(video["height"])
    except (KeyError, TypeError, ValueError) as exc:
        raise IngestError("Derivative metadata is missing or invalid.") from exc
    if not (0 < duration <= min(source_duration, MAX_DURATION_SECONDS) + 0.5):
        raise IngestError("Derivative duration is outside the permitted range.")
    if not (0 < width <= MAX_WIDTH and 0 < height <= MAX_HEIGHT):
        raise IngestError("Derivative dimensions exceed the configured limits.")
    if width % 2 or height % 2:
        raise IngestError("Derivative dimensions must be even.")
    return duration, width, height


def _publish_without_overwrite(temp_path: Path, final_path: Path) -> None:
    """Atomically create a hard link; fail if another process already owns the name."""
    try:
        os.link(temp_path, final_path)
    except FileExistsError as exc:
        raise IngestError(f"Refusing to overwrite existing output: {final_path.name}") from exc
    except OSError as exc:
        raise IngestError(f"Could not safely publish output {final_path.name}: {exc}") from exc


def process_video(
    source_path: str | Path,
    output_dir: str | Path,
    *,
    ffmpeg_bin: str = "ffmpeg",
    ffprobe_bin: str = "ffprobe",
) -> dict[str, Any]:
    """Create a silent, validated, metadata-stripped MP4 derivative; preserve source."""
    source = Path(source_path)
    if source.is_symlink():
        raise IngestError("Input must be a regular, non-symlink file.")

    destination_dir = Path(output_dir)
    destination_dir.mkdir(parents=True, exist_ok=True)
    destination_dir = destination_dir.resolve(strict=True)
    if not destination_dir.is_dir():
        raise IngestError("Output location must be a directory.")

    with tempfile.TemporaryDirectory(prefix=".scoutsa-work-", dir=destination_dir) as work:
        work_dir = Path(work)
        snapshot = work_dir / "source.snapshot"
        source_hash = _snapshot_source(source, snapshot)

        source_metadata = _run_probe(snapshot, ffprobe_bin)
        duration, source_video = _duration_and_video(source_metadata)
        width = int(source_video["width"])
        height = int(source_video["height"])

        output_name = f"video-{source_hash[:16]}.mp4"
        output_path = destination_dir / output_name
        manifest_path = destination_dir / f"video-{source_hash[:16]}.manifest.json"
        if output_path.exists() or manifest_path.exists():
            raise IngestError("A derivative for this exact source already exists; refusing to overwrite.")

        try:
            version_result = subprocess.run(
                [ffmpeg_bin, "-version"], capture_output=True, text=True,
                check=False, timeout=10,
            )
            build_result = subprocess.run(
                [ffmpeg_bin, "-buildconf"], capture_output=True, text=True,
                check=False, timeout=10,
            )
        except (OSError, subprocess.TimeoutExpired) as exc:
            raise IngestError(f"FFmpeg build inspection failed: {exc}") from exc
        if version_result.returncode != 0 or build_result.returncode != 0:
            raise IngestError("FFmpeg version/build configuration inspection failed.")
        ffmpeg_version = (version_result.stdout.splitlines() or ["unknown"])[0][:200]
        ffmpeg_buildconf = build_result.stdout[:12000]

        temp_output = work_dir / "derivative.mp4"
        command = [
            ffmpeg_bin, "-nostdin", "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(snapshot),
            "-map", "0:v:0", "-an", "-sn", "-dn",
            "-map_metadata", "-1",
            "-vf", f"scale=w='min({MAX_WIDTH},iw)':h='min({MAX_HEIGHT},ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
            "-t", str(MAX_DURATION_SECONDS),
            "-c:v", "libx264", "-preset", "veryfast", "-crf", "28",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart",
            str(temp_output),
        ]
        try:
            result = subprocess.run(
                command, capture_output=True, text=True, check=False,
                timeout=TRANSCODE_TIMEOUT_SECONDS,
            )
        except (OSError, subprocess.TimeoutExpired) as exc:
            raise IngestError(f"FFmpeg processing failed: {exc}") from exc
        if result.returncode != 0:
            raise IngestError("FFmpeg could not produce the derivative.")
        if not temp_output.is_file() or temp_output.stat().st_size <= 0:
            raise IngestError("FFmpeg reported success but produced no usable output.")

        derivative_metadata = _run_probe(temp_output, ffprobe_bin)
        derivative_duration, derivative_width, derivative_height = _validate_derivative(
            derivative_metadata, duration
        )
        derivative_hash = _sha256(temp_output)
        manifest = {
            "format_version": 2,
            "processor": "ScoutSA isolated FFmpeg ingestion experiment",
            "processor_version": "0.2.0",
            "processed_at_utc": datetime.now(timezone.utc).isoformat(),
            "ffmpeg_version": ffmpeg_version,
            "ffmpeg_build_configuration": ffmpeg_buildconf,
            "source_sha256": source_hash,
            "derivative_sha256": derivative_hash,
            "derivative_file": output_name,
            "source_duration_seconds": duration,
            "source_width": width,
            "source_height": height,
            "derivative_duration_seconds": derivative_duration,
            "derivative_width": derivative_width,
            "derivative_height": derivative_height,
            "processing_profile": {
                "container": "mp4",
                "video_codec": "h264",
                "audio": "removed",
                "source_metadata": "stripped",
                "container_metadata": "muxer-generated technical tags may remain",
                "maximum_dimensions": [MAX_WIDTH, MAX_HEIGHT],
                "crf": 28,
                "preset": "veryfast",
            },
            "limitations": [
                "Hash and processing provenance only; not proof of authenticity.",
                "No malware verdict, safeguarding clearance, consent validation, or talent assessment.",
                "Local prototype only; no upload, sharing, or production storage.",
                "Media decoding is not OS-sandboxed; process only trusted, authorised test media.",
            ],
        }

        manifest_temp = work_dir / "manifest.json"
        manifest_temp.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
        published_output = False
        published_manifest = False
        try:
            _publish_without_overwrite(temp_output, output_path)
            published_output = True
            _publish_without_overwrite(manifest_temp, manifest_path)
            published_manifest = True
        except Exception:
            if published_manifest:
                manifest_path.unlink(missing_ok=True)
            if published_output:
                output_path.unlink(missing_ok=True)
            raise

        return {"output": str(output_path), "manifest": str(manifest_path), "record": manifest}


def main() -> int:
    parser = argparse.ArgumentParser(description="Local-only ScoutSA FFmpeg video preparation prototype.")
    parser.add_argument("input", help="Path to a local video file")
    parser.add_argument("--output-dir", required=True, help="Private local output directory")
    parser.add_argument("--ffmpeg", default="ffmpeg", help="FFmpeg executable")
    parser.add_argument("--ffprobe", default="ffprobe", help="FFprobe executable")
    args = parser.parse_args()
    try:
        result = process_video(args.input, args.output_dir, ffmpeg_bin=args.ffmpeg, ffprobe_bin=args.ffprobe)
    except IngestError as exc:
        parser.exit(2, f"ingest failed: {exc}\n")
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
