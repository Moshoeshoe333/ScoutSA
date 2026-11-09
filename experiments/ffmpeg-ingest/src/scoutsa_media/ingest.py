"""Safe, local-only FFmpeg ingestion prototype.

This module processes one user-supplied local video at a time. It does not
discover cameras, access RTSP endpoints, upload media, or modify source files.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
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
        "-show_entries", "format=duration:stream=codec_type,width,height",
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
        return json.loads(result.stdout)
    except (TypeError, json.JSONDecodeError) as exc:
        raise IngestError("FFprobe returned invalid metadata.") from exc


def _validate_media(source: Path, metadata: dict[str, Any]) -> tuple[float, int, int]:
    if source.is_symlink() or not source.is_file():
        raise IngestError("Input must be a regular, non-symlink file.")
    size = source.stat().st_size
    if size <= 0:
        raise IngestError("Input file is empty.")
    if size > MAX_INPUT_BYTES:
        raise IngestError(f"Input exceeds the {MAX_INPUT_BYTES}-byte limit.")

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
    return duration, width, height


def process_video(
    source_path: str | Path,
    output_dir: str | Path,
    *,
    ffmpeg_bin: str = "ffmpeg",
    ffprobe_bin: str = "ffprobe",
) -> dict[str, Any]:
    """Create a silent, metadata-stripped MP4 derivative; preserve the original."""
    source = Path(source_path)
    if source.is_symlink() or not source.is_file():
        raise IngestError("Input must be a regular, non-symlink file.")
    source = source.resolve(strict=True)

    destination_dir = Path(output_dir)
    destination_dir.mkdir(parents=True, exist_ok=True)
    destination_dir = destination_dir.resolve(strict=True)
    if not destination_dir.is_dir():
        raise IngestError("Output location must be a directory.")

    metadata = _run_probe(source, ffprobe_bin)
    duration, width, height = _validate_media(source, metadata)
    source_hash = _sha256(source)
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
    except (OSError, subprocess.TimeoutExpired) as exc:
        raise IngestError(f"FFmpeg version check failed: {exc}") from exc
    if version_result.returncode != 0:
        raise IngestError("FFmpeg is unavailable or failed its version check.")
    ffmpeg_version = (version_result.stdout.splitlines() or ["unknown"])[0][:200]

    temp_path: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            prefix=".scoutsa-", suffix=".partial.mp4",
            dir=destination_dir, delete=False,
        ) as temporary:
            temp_path = Path(temporary.name)

        command = [
            ffmpeg_bin, "-nostdin", "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(source),
            "-map", "0:v:0", "-an", "-sn", "-dn",
            "-map_metadata", "-1",
            "-vf", f"scale=w='min({MAX_WIDTH},iw)':h='min({MAX_HEIGHT},ih)':force_original_aspect_ratio=decrease",
            "-t", str(MAX_DURATION_SECONDS),
            "-c:v", "libx264", "-preset", "veryfast", "-crf", "28",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart",
            str(temp_path),
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
        if not temp_path.is_file() or temp_path.stat().st_size <= 0:
            raise IngestError("FFmpeg reported success but produced no usable output.")

        derivative_hash = _sha256(temp_path)
        manifest = {
            "format_version": 1,
            "processor": "ScoutSA isolated FFmpeg ingestion experiment",
            "processor_version": "0.1.0",
            "processed_at_utc": datetime.now(timezone.utc).isoformat(),
            "ffmpeg_version": ffmpeg_version,
            "source_sha256": source_hash,
            "derivative_sha256": derivative_hash,
            "derivative_file": output_name,
            "source_duration_seconds": duration,
            "source_width": width,
            "source_height": height,
            "processing_profile": {
                "container": "mp4",
                "video_codec": "h264",
                "audio": "removed",
                "embedded_metadata": "removed",
                "maximum_dimensions": [MAX_WIDTH, MAX_HEIGHT],
                "crf": 28,
                "preset": "veryfast",
            },
            "limitations": [
                "Hash and processing provenance only; not proof of authenticity.",
                "No malware verdict, safeguarding clearance, consent validation, or talent assessment.",
                "Local prototype only; no upload, sharing, or production storage.",
            ],
        }

        os.replace(temp_path, output_path)
        temp_path = None
        manifest_temp = manifest_path.with_suffix(".manifest.json.partial")
        try:
            manifest_temp.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
            os.replace(manifest_temp, manifest_path)
        except OSError:
            output_path.unlink(missing_ok=True)
            manifest_temp.unlink(missing_ok=True)
            raise
        return {"output": str(output_path), "manifest": str(manifest_path), "record": manifest}
    finally:
        if temp_path is not None:
            temp_path.unlink(missing_ok=True)


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
