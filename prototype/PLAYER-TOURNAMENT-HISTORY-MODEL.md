# Player Tournament History — Proposed Relationship Model

**Status:** Prototype design note · synthetic snapshot only · not ratified for mainline  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026

## Purpose

Player Tournament History presents a read-only, participation-scoped record trail connecting a player identity to their team entry, tournament edition, division, fixture, match-day appearance and statistical observations.

The lookup path is:

`Player → PlayerParticipation → TeamEntry → TournamentEdition → Division → Fixture`

Fixture-specific appearance and statistical records attach to the participation ID. A display alias or bare player ID is not sufficient to join match records.

## Demonstration scope

The page uses two fictional adult sample participations from the Tournament Manager seed:

| Record | Player 1 | Player 2 |
|---|---|---|
| Player | `PLY-DEMO-001` | `PLY-DEMO-002` |
| Participation | `PAR-DEMO-001` | `PAR-DEMO-002` |
| Team entry | `TEN-DEMO-001` | `TEN-DEMO-002` |
| Fixture | `FIX-DEMO-001` | `FIX-DEMO-001` |
| Tournament / edition | `TRN-DEMO-001` / `EDT-DEMO-001` | same |
| Division | `DIV-DEMO-001` | same |
| Lineup | `LIN-DEMO-001` | `LIN-DEMO-002` |

The page's appearance, event and statistic rows are fixed synthetic snapshots that reuse IDs from the Tournament Day Operations and Match Statistic Reconciliation demonstrations. The pages do not share live session state, a database or an API. The values are illustrative cross-module joins, not a live synchronized projection.

## Display rules

1. Keep each history row scoped to a specific PlayerParticipation and Fixture.
2. Show tournament, edition, division, team entry, opponent and result context alongside the fixture ID.
3. Show appearance minutes with the contributing lineup and substitution IDs. Do not infer minutes from goals, cards or other events.
4. Display statistical observations with their source-event link, source ID and review state.
5. Keep unlinked, disputed and unverified observations visible as such. Do not aggregate them into a verified total.
6. Missing observations are unknown, not zero.
7. Do not generate rankings, talent scores, selection predictions or placement claims from this view.

## Evidence semantics

- A stable ID relationship makes a record traceable; it does not authenticate the source or prove the event occurred.
- `Reported — unverified` and `Disputed` are not verified performance states.
- An explicit event/stat link is a traceable relationship, not independent confirmation.
- Possible duplicate candidates must remain separate until a human decision is supported by evidence.
- Match results, appearances and statistical observations remain separate records with separate sources and review states.

## Known limitations

- One tournament edition and one fixture are represented.
- The page is read-only and session-independent; it does not query or update Tournament Manager, Tournament Day Operations or Match Statistic Reconciliation.
- Sample appearance minutes and statistic rows are fixed snapshots. A future integrated implementation must consume canonical persisted records and preserve versioned provenance.
- No source document, cryptographic fingerprint, trusted timestamp, independent referee verification or appeal history is implemented.
- No real player or minor data may be entered.

**Decision boundary:** this is a UI and relationship demonstration only. It does not ratify the model, authorize production schema work, close UI-008, or lift any mainline implementation hold.
