# ScoutSA FFmpeg Video-Ingestion Experiment

**Status:** Isolated prototype; non-production; not part of the ScoutSA application.

## Scope

This experiment accepts a local video file and creates a local MP4 derivative using FFmpeg/FFprobe. It does not add database tables, API routes, UI, authentication, RLS, storage integration, camera access, or network transfer.

### Processing profile

- Maximum source size: 250 MiB.
- Maximum source duration: 180 seconds.
- Requires a readable video stream and positive dimensions.
- H.264 MP4 derivative, maximum 1280×720, CRF 28, preset veryfast.
- Audio, subtitles and data streams are removed; source metadata is stripped. The MP4 muxer may add its own technical container tags.
- The original source is never overwritten or deleted.
- A JSON sidecar records source/derivative SHA-256 hashes, tool version, processing time and profile.
- Existing derivatives are not overwritten.

The sidecar is provenance, not proof of authenticity, ownership, consent, safeguarding clearance or player ability. A hash only identifies bytes.

## Requirements

- Python 3.11+
- FFmpeg and FFprobe installed and available on PATH (or executable paths supplied explicitly)
- pytest for tests

## Run

From this directory:

```bash
python -m venv .venv
. .venv/bin/activate
python -m pip install -e '.[test]'
pytest -q
scoutsa-video-ingest /private/path/to/input-video.mov --output-dir /private/path/to/processed
```

On Windows, activate the environment with .venv\\Scripts\\activate.

To specify executable paths:

```bash
scoutsa-video-ingest input.mov --output-dir processed --ffmpeg /path/to/ffmpeg --ffprobe /path/to/ffprobe
```

## Security and safeguarding boundaries

- Use only media the operator is authorised to process.
- Do not use IP-camera discovery, RTSP URLs, camera credentials or remote streams.
- Do not process real children's footage during this prototype stage.
- Keep input/output directories private and access-controlled.
- This prototype does not scan for malware or validate guardian consent.
- Audio removal reduces voice exposure in the derivative but does not anonymise faces or other identifying visual information.
- No footage is uploaded or shared by this tool.
- No retention policy is established; operators must not treat this experiment as approved storage.

## Licensing

FFmpeg is separately licensed software. The exact FFmpeg build and enabled libraries determine applicable LGPL/GPL obligations. This repository experiment does not bundle FFmpeg binaries. Review the selected build configuration and distribution model before packaging or commercial deployment.

## Test limitations

Tests mock FFmpeg/FFprobe process calls and use synthetic bytes. They verify command construction, validation, source preservation, failure cleanup and provenance formatting. They do not prove real codec compatibility, performance, malware resistance, legal compliance or production readiness.
