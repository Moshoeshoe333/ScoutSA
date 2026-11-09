import json
import subprocess
from pathlib import Path
from unittest.mock import patch

import pytest

from scoutsa_media.ingest import IngestError, MAX_DURATION_SECONDS, process_video


def probe_result(*, duration="42.5", width=1920, height=1080, streams=None):
    return {
        "format": {"duration": duration},
        "streams": streams if streams is not None else [
            {"codec_type": "video", "width": width, "height": height},
            {"codec_type": "audio"},
        ],
    }


def fake_run_factory(metadata=None):
    metadata = metadata or probe_result()

    def fake_run(command, **kwargs):
        if command[0] == "ffprobe":
            return subprocess.CompletedProcess(command, 0, json.dumps(metadata), "")
        if command[0] == "ffmpeg" and "-version" in command:
            return subprocess.CompletedProcess(command, 0, "ffmpeg version test-build\n", "")
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
    assert manifest["source_sha256"]
    assert manifest["derivative_sha256"]
    assert manifest["processing_profile"]["audio"] == "removed"
    assert manifest["processing_profile"]["embedded_metadata"] == "removed"
    assert "source" not in manifest


def test_ffmpeg_command_disables_audio_and_strips_metadata(tmp_path):
    source = tmp_path / "input.mp4"
    source.write_bytes(b"video")

    with patch("scoutsa_media.ingest.subprocess.run", side_effect=fake_run_factory()) as mocked:
        process_video(source, tmp_path / "out")

    ffmpeg_calls = [
        call.args[0] for call in mocked.call_args_list
        if call.args[0][0] == "ffmpeg" and "-version" not in call.args[0]
    ]
    command = ffmpeg_calls[0]
    assert "-an" in command
    assert "-map_metadata" in command
    assert "-1" in command
    assert "-nostdin" in command


@pytest.mark.parametrize("duration", ["0", "-1", "181", "nan", "unknown"])
def test_rejects_invalid_or_overlong_duration(tmp_path, duration):
    source = tmp_path / "input.mp4"
    source.write_bytes(b"video")
    metadata = probe_result(duration=duration)

    with patch("scoutsa_media.ingest.subprocess.run", side_effect=fake_run_factory(metadata)):
        with pytest.raises(IngestError):
            process_video(source, tmp_path / "out")


def test_rejects_audio_only_input(tmp_path):
    source = tmp_path / "audio.mp3"
    source.write_bytes(b"audio")
    metadata = probe_result(streams=[{"codec_type": "audio"}])

    with patch("scoutsa_media.ingest.subprocess.run", side_effect=fake_run_factory(metadata)):
        with pytest.raises(IngestError, match="video stream"):
            process_video(source, tmp_path / "out")


def test_rejects_empty_file_before_probe(tmp_path):
    source = tmp_path / "empty.mp4"
    source.touch()

    with patch("scoutsa_media.ingest.subprocess.run") as mocked:
        with pytest.raises(IngestError):
            process_video(source, tmp_path / "out")
    mocked.assert_not_called()


def test_does_not_overwrite_existing_derivative(tmp_path):
    source = tmp_path / "input.mp4"
    source.write_bytes(b"video")
    out = tmp_path / "out"
    out.mkdir()
    import hashlib
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
            return subprocess.CompletedProcess(command, 0, json.dumps(probe_result()), "")
        if command[0] == "ffmpeg" and "-version" in command:
            return subprocess.CompletedProcess(command, 0, "ffmpeg version test\n", "")
        return subprocess.CompletedProcess(command, 1, "", "codec error")

    out = tmp_path / "out"
    with patch("scoutsa_media.ingest.subprocess.run", side_effect=failing_run):
        with pytest.raises(IngestError, match="could not produce"):
            process_video(source, out)

    assert list(out.iterdir()) == []


def test_duration_limit_is_explicit():
    assert MAX_DURATION_SECONDS == 180.0
