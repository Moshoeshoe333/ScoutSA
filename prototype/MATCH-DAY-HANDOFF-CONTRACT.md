# Match-Day Handoff Contract

**Status:** Prototype contract · version 1 · synthetic data only · not ratified for mainline  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026

## Purpose

The Match-Day Handoff is a portable, fixture-scoped JSON package that connects the Tournament Day Operations page to Player Tournament History without claiming shared persistence, an API, or a production database.

The current workflow is deliberately manual:

1. In Tournament Day Operations, select the fixture and a valid match duration.
2. Export the validated fixture package.
3. In Player Tournament History, choose that JSON file.
4. The browser validates the package and its relationships before replacing the fixed sample view with the imported fixture snapshot.

The file is processed locally by the browser. It is not uploaded, emailed, published, or persisted to a server.

## Package envelope

| Field | Requirement | Meaning |
|---|---|---|
| `format` | Exact string | `scoutsa.match-day-handoff` |
| `schemaVersion` | Integer `1` | Contract version |
| `packageId` | Non-empty string | Stable demo package label |
| `createdAt` | ISO timestamp | Export creation time; not a trusted timestamp |
| `dataClass` | Exact string | `SYNTHETIC_DEMO_ONLY` |
| `sourceModule` | String | Exporting module |
| `fixtureId` | Required ID | Scope boundary for all records |
| `matchDurationMinutes` | Integer 1–150 | Duration used to derive appearances |
| `matchDay` | Object or null | Fixture-scoped match-day record |
| `officials` | Array | Synthetic official assignments |
| `lineups` | Non-empty array | Participation and team-entry relationships |
| `substitutions` | Array | Fixture substitution observations |
| `appearances` | Array | Derived interval snapshot, never an independent source |
| `events` | Array | Fixture events with participation and source IDs |
| `reports` | Array | Fixture reports with source IDs |
| `sources` | Array | Source-reference records linked to originating records |
| `limitations` | Array | Explicit prototype and evidence boundaries |

Every record in the package must carry the same `fixtureId`. Primary IDs must be non-empty and unique within the package.

## Required relationships

- Every lineup has a `participationId` and `entryId`; a participation may appear only once per fixture in this version.
- Every substitution's outgoing and incoming participations must both have lineup records and belong to the same team entry.
- Every substitution, event and report must reference an included `sourceId`.
- Every source's `recordId` must point to an included originating lineup, substitution, event or report record.
- Every event must reference a participation with a lineup record in the same fixture.
- Every event and substitution minute must be a whole number within the configured match duration.
- Cross-fixture records, duplicate IDs, missing source relationships and malformed packages are rejected.

## Appearance derivation

For a starter, the interval begins at minute 0 and ends at the outgoing substitution minute, or at the configured match duration if no outgoing substitution exists.

For a substitute, the interval begins at the incoming substitution minute and ends at the outgoing substitution minute, or at match duration if no outgoing substitution exists.

An unused named substitute has zero minutes. A contradictory status (for example, `Substituted` without an outgoing substitution, or `Entered` without an incoming substitution) invalidates the package.

The importing page requires synthetic DEMO-form identifiers for the fixture and all record/reference IDs. It independently recomputes the intervals from lineups and substitutions and compares every derived field with the supplied appearance rows. A mismatch or non-DEMO identifier rejects the package. These are structural and consistency checks, not proof of source authenticity.

## What the importer does not do

- It does not authenticate a person, referee, coach, organizer, source document or event.
- It does not establish that a match occurred or that a source is authoritative.
- It does not convert events into verified statistics or totals.
- It does not silently resolve event/appearance chronology conflicts.
- It does not verify competition, edition or division metadata that is absent from the package.
- It does not create rankings, talent scores, scouting verdicts, public profiles, contact routes or placement claims.
- It does not write to a database, sync other browser tabs or alter the source page's session state.
- It does not provide cryptographic integrity, signatures, trusted timestamps, encryption at rest, or a full audit log.

The importer limits the file to 1 MB and performs structural and relationship checks in the browser. This is a prototype guard, not a security boundary for untrusted production inputs.

## Known limitations and next gate

- The current prototype offers one synthetic fixture selector; multiple fixture packages and batch import are not yet implemented.
- Team/player display metadata beyond IDs is not guaranteed to be included.
- Match result and competition context are not authoritative handoff fields in version 1.
- No rejection ledger, adjudication workflow, package signature, version migration or import history exists.
- Browser test source has been extended for export, successful import, participation selection, chronology warning and tampered-appearance rejection; a fresh Playwright/hosted CI run is still required.

**Decision boundary:** the handoff demonstrates a versioned file contract and local relationship validation. It does not close any mainline gate, ratify a database schema, or authorize production use. All records remain synthetic.
