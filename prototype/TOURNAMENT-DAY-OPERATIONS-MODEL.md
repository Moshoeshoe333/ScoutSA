# Tournament Day Operations — Proposed Relationship Model

**Status:** Prototype design note · synthetic demo only · not ratified for mainline  
**Branch:** `prototype/internal-demo`  
**As at:** 16 November 2026

## Purpose

Tournament Day Operations demonstrates how a scheduled fixture can be administered as a match-day workflow. It connects operational status, official assignments, fixture-specific lineups, substitutions, match events, match reports and source records to the existing tournament relationship identifiers.

This note describes a browser prototype. It is not a production schema, legal assessment, safeguarding approval, or authorization to collect real participant information.

## Existing parent records

The demo references these existing IDs from the Tournament Manager relationship model:

| Record | ID | Meaning |
|---|---|---|
| Tournament | `TRN-DEMO-001` | Stable competition identity |
| Edition | `EDT-DEMO-001` | Specific season / edition |
| Division | `DIV-DEMO-001` | Competition stream |
| Team entry | `TEN-DEMO-001`, `TEN-DEMO-002` | Team's participation in the edition |
| Player | `PLY-DEMO-001` etc. | Synthetic player identity |
| Participation | `PAR-DEMO-001` etc. | Player's event/team-entry participation |
| Fixture | `FIX-DEMO-001` | Scheduled match between two team entries |

A player-facing match record references **participation ID**, not a display name and not a bare player ID. This preserves the event-specific relationship. The day-operations page includes a third local synthetic participation, `PAR-DEMO-003` / `PLY-DEMO-003`, solely to demonstrate a same-team substitution. It is not a shared or persisted record in Tournament Manager.

## Match-day entities introduced

| Entity | Demo ID prefix | Core relationship |
|---|---|---|
| Match-day record | `MDY` | One operational record for a fixture in this demo |
| Match-official assignment | `MOF` | Fixture + synthetic official label + role + appointment-source label |
| Lineup entry | `LIN` | Fixture + player participation + team entry + lineup status |
| Substitution | `SUB` | Fixture + outgoing participation + incoming participation + minute + source ID |
| Match event | `MEV` | Fixture + player participation + event type/minute + source ID + review state |
| Match report | `MRP` | Fixture + author label + report summary + source ID + review state |
| Source record | `SRC` | Fixture + source label/type + originating record ID + review state |

### Relationship rules

1. A match-day record must reference an existing fixture.
2. A lineup entry must reference a participation belonging to one of that fixture's two team entries.
3. A participation may have only one lineup entry per fixture in this prototype.
4. A substitution must reference two different participations from the same team and fixture. The outgoing player must be a starter; the incoming player must be a substitute.
5. A match event must reference a player with a lineup entry for that fixture and a source record.
6. A match report is limited to one per fixture in this prototype and must have a source record.
7. Source records point back to the originating event, substitution or report. Source labels are synthetic; they do not establish authenticity or authority.
8. A match statistic already captured by Tournament Manager remains a separate observation scoped to fixture + participation. Match events should not be silently converted into verified stats or scouting conclusions.

## Evidence and review semantics

- `Reported — unverified` means an observation has been entered, not confirmed.
- `Checked against demo source` means the synthetic record was checked against the selected demo source label only.
- `Disputed` preserves disagreement; it must not be silently overwritten.
- A source label is not the source document itself. The current prototype has no secure file upload, content hash, trusted timestamp, immutable audit history or independent source verification.
- Match-day status, official assignment, lineup, match event and report are different records; one must not be treated as proof of another.
- A statistic is contextual evidence, not a talent verdict. Missing observations are not zero, and raw totals are not comparable without minutes, competition level, role, opponent and recording-method context.

## Safety and scope constraints

- All people, clubs, officials, source labels and outcomes are fictional.
- The demo uses adult synthetic sample participations only. No real names, contact details, identity documents, photographs, videos or minors may be entered.
- The page is session-only. Refresh resets state; export is a local synthetic JSON file.
- No organizer, referee, coach or player is contacted. No event is published. No player profile is disclosed or referred.
- No referee qualification, appointment authority, identity, age, consent, safeguarding status, event occurrence or result is verified.
- No production permission, POPIA compliance, RLS, authentication, tenant isolation or API is implemented.

## Open design questions before ratification

- Can a fixture have multiple match-day sessions, venues or abandoned/restarted segments?
- How should a substitution be represented when a player is later substituted again or returns under a competition rule?
- What is the canonical source/version model for official match sheets, referee reports, video timestamps and corrections?
- Which event types are allowed to create statistical observations, and which require independent confirmation?
- How should report corrections, appeals and disputed outcomes be versioned without erasing history?
- What role-based permissions and guardian/player authority gates apply before any real youth participation is processed?

**Decision boundary:** this proposal may inform future design. It does not ratify a schema or authorize implementation on mainline. UI-008 safe-rendering work and the existing mainline gates remain open.
