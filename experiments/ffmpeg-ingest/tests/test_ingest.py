import hashlib
import json
import subprocess
from pathlib import Path
from unittest.mock import patch

import pytest

from scoutsa_media.ingest import (
    IngestError,
    MAX_DURATION_SECONDS,
    _validate_derivative,
    process_video,
)


def source_probe(*, duration="42.5", width=1920, height=1080, streams=None):
    return {
        "format": {"duration": duration},
        "streams": streams if streams is not None else [
            {"codec_type": "video", "codec_name": "mpeg4", "width": width, "height": height},
            {"codec_type": "audio"},
        ],
    }


def derivative_probe(*, duration="42.5", width=1280, height=720, streams=None):
    return {
        "format": {"duration": duration},
        "streams": streams if streams is not None else [
            {"codec_type": "video", "codec_name": "h264", "width": width, "height": height},
        ],
    }


def fake_run_factory(source_metadata=None, derivative_metadata=None):
    source_metadata = source_metadata or source_probe()
    derivative_metadata = derivative_metadata or derivative_probe()

    def fake_run(command, **kwargs):
        if command[0] == "ffprobe":
            media_path = Path(command[-1])
            payload = derivative_metadata if media_path.name == "derivative.mp4" else source_metadata
            return subprocess.CompletedProcess(command, 0, json.dumps(payload), "")
        if command[0] == "ffmpeg" and "-version" in command:
            return subprocess.CompletedProcess(command, 0, "ffmpeg version test-build\n", "")
        if command[0] == "ffmpeg" and "-buildconf" in command:
            return subprocess.CompletedProcess(command, 0, "configuration: --enable-gpl --enable-libx264\n", "")
        if command[0] == "ffmpeg":
            Path(command[-1]).write_bytes(b"test-mp4-derivative")
            return subprocess.CompletedProcess(command, 0, "", "")
        raise AssertionError(f"Unexpected command: {command}")

    return fake_run


def test_processes_video_and_preserves_original(tmp_path):
    source = tmp_path / "player-footage.mov"
    source.write_bytes(b"original-video-bytes")
    original_bytes = source.read_bytes()

    with patch("scoutsa_media.ingest.subprocess.run", side_effect=fake_run_factory()):
        result = process_video(source, tmp_path / "private-output")

    output = Path(result["output"])
    manifest_path = Path(result["manifest"])
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    assert source.read_bytes() == original_bytes
    assert output.read_bytes() == b"test-mp4-derivative"
    assert manifest["source_sha256"] == hashlib.sha256(original_bytes).hexdigest()
    assert manifest["derivative_sha256"] == hashlib.sha256(output.read_bytes()).hexdigest()
    assert manifest["processing_profile"]["audio"] == "removed"
    assert manifest["processing_profile"]["source_metadata"] == "stripped"
    assert "enable-libx264" in manifest["ffmpeg_build_configuration"]
    assert manifest["derivative_width"] == 1280
    assert manifest["derivative_height"] == 720


def test_probe_and_transcode_use_private_snapshot(tmp_path):
    source = tmp_path / "input.mp4"
    source.write_bytes(b"video")

    with patch("scoutsa_media.ingest.subprocess.run", side_effect=fake_run_factory()) as mocked:
        process_video(source, tmp_path / "out")

    commands = [call.args[0] for call in mocked.call_args_list]
    probe_paths = [Path(command[-1]) for command in commands if command[0] == "ffprobe"]
    transcode = next(
        command for command in commands
        if command[0] == "ffmpeg" and "-version" not in command and "-buildconf" not in command
    )
    assert len(probe_paths) == 2
    assert probe_paths[0].name == "source.snapshot"
    assert probe_paths[1].name == "derivative.mp4"
    assert transcode[transcode.index("-i") + 1] == str(probe_paths[0])


def test_ffmpeg_command_disables_audio_and_strips_metadata(tmp_path):
    source = tmp_path / "input.mp4"
    source.write_bytes(b"video")

    with patch("scoutsa_media.ingest.subprocess.run", side_effect=fake_run_factory()) as mocked:
        process_video(source, tmp_path / "out")

    commands = [call.args[0] for call in mocked.call_args_list]
    command = next(
        item for item in commands
        if item[0] == "ffmpeg" and "-version" not in item and "-buildconf" not in item
    )
    assert "-an" in command
    assert "-map_metadata" in command
    assert "-1" in command
    assert "-nostdin" in command


@pytest.mark.parametrize("duration", ["0", "-1", "181", "nan", "unknown"])
def test_rejects_invalid_or_overlong_duration(tmp_path, duration):
    source = tmp_path / "input.mp4"
    source.write_bytes(b"video")

    with patch(
        "scoutsa_media.ingest.subprocess.run",
        side_effect=fake_run_factory(source_metadata=source_probe(duration=duration)),
    ):
        with pytest.raises(IngestError):
            process_video(source, tmp_path / "out")


def test_rejects_audio_only_input(tmp_path):
    source = tmp_path / "audio.mp3"
    source.write_bytes(b"audio")
    metadata = source_probe(streams=[{"codec_type": "audio"}])

    with patch(
        "scoutsa_media.ingest.subprocess.run",
        side_effect=fake_run_factory(source_metadata=metadata),
    ):
        with pytest.raises(IngestError, match="video stream"):
            process_video(source, tmp_path / "out")


def test_rejects_empty_file_before_probe(tmp_path):
    source = tmp_path / "empty.mp4"
    source.touch()

    with patch("scoutsa_media.ingest.subprocess.run") as mocked:
        with pytest.raises(IngestError):
            process_video(source, tmp_path / "out")
    mocked.assert_not_called()


def test_rejects_symlink_input(tmp_path):
    source = tmp_path / "real.mp4"
    source.write_bytes(b"video")
    link = tmp_path / "linked.mp4"
    link.symlink_to(source)

    with patch("scoutsa_media.ingest.subprocess.run") as mocked:
        with pytest.raises(IngestError, match="non-symlink"):
            process_video(link, tmp_path / "out")
    mocked.assert_not_called()


def test_does_not_overwrite_existing_derivative(tmp_path):
    source = tmp_path / "input.mp4"
    source.write_bytes(b"video")
    out = tmp_path / "out"
    out.mkdir()
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:16]
    existing = out / f"video-{digest}.mp4"
    existing.write_bytes(b"keep-me")

    with patch("scoutsa_media.ingest.subprocess.run", side_effect=fake_run_factory()):
        with pytest.raises(IngestError, match="refusing to overwrite"):
            process_video(source, out)

    assert existing.read_bytes() == b"keep-me"


def test_rejects_ffmpeg_failure_and_cleans_temporary_file(tmp_path):
    source = tmp_path / "input.mp4"
    source.write_bytes(b"video")

    def failing_run(command, **kwargs):
        if command[0] == "ffprobe":
            return subprocess.CompletedProcess(command, 0, json.dumps(source_probe()), "")
        if command[0] == "ffmpeg" and "-version" in command:
            return subprocess.CompletedProcess(command, 0, "ffmpeg version test\n", "")
        if command[0] == "ffmpeg" and "-buildconf" in command:
            return subprocess.CompletedProcess(command, 0, "configuration test\n", "")
        return subprocess.CompletedProcess(command, 1, "", "codec error")

    out = tmp_path / "out"
    with patch("scoutsa_media.ingest.subprocess.run", side_effect=failing_run):
        with pytest.raises(IngestError, match="could not produce"):
            process_video(source, out)

    assert list(out.iterdir()) == []


@pytest.mark.parametrize(
    "metadata",
    [
        derivative_probe(streams=[
            {"codec_type": "video", "codec_name": "h264", "width": 640, "height": 360},
            {"codec_type": "audio"},
        ]),
        derivative_probe(streams=[
            {"codec_type": "video", "codec_name": "mpeg4", "width": 640, "height": 360},
        ]),
        derivative_probe(width=1920, height=1080),
        derivative_probe(width=641, height=360),
        derivative_probe(duration="181"),
    ],
)
def test_rejects_invalid_derivative_metadata(metadata):
    with pytest.raises(IngestError):
        _validate_derivative(metadata, 42.5)


def test_rejects_bad_derivative_before_publication(tmp_path):
    source = tmp_path / "input.mp4"
    source.write_bytes(b"video")
    out = tmp_path / "out"

    with patch(
        "scoutsa_media.ingest.subprocess.run",
        side_effect=fake_run_factory(derivative_metadata=derivative_probe(width=1920, height=1080)),
    ):
        with pytest.raises(IngestError, match="dimensions"):
            process_video(source, out)

    assert list(out.iterdir()) == []


def test_duration_limit_is_explicit():
    assert MAX_DURATION_SECONDS == 180.0


def test_rejects_oversized_file_before_probe(tmp_path, monkeypatch):
    import scoutsa_media.ingest as ingest

    source = tmp_path / "large.mp4"
    source.write_bytes(b"four")
    monkeypatch.setattr(ingest, "MAX_INPUT_BYTES", 3)

    with patch("scoutsa_media.ingest.subprocess.run") as mocked:
        with pytest.raises(IngestError, match="exceeds"):
            process_video(source, tmp_path / "out")
    mocked.assert_not_called()
