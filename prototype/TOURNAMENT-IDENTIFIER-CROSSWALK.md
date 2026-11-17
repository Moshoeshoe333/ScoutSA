# Tournament Identifier Crosswalk — Evidence Review

**Status:** Internal evidence review · NOT RATIFIED · no implementation authority  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026  
**Parent decisions:** TAD-001 and TAD-002 in [Tournament Architecture Decision Register](TOURNAMENT-ARCHITECTURE-DECISION-REGISTER.md)

## 1. Scope and method

This review checks the current tournament proposal documents, synthetic browser implementation, handoff contract and canonical domain/relationship documents for two specific seams:

1. edition identifier naming (`edition_id` versus `tournament_edition_id`);
2. fixture-scoped player participation (`match_participation_id` versus `fixture_id + participation_id`).

The review distinguishes conceptual proposals, actual prototype field shapes and canonical domain authority. A prototype field is evidence of the current demo contract only. No production semantics are inferred from it.

## 2. TAD-001 — Edition identifier

### Observed source inventory

| Source | Exact observed form | What it establishes |
|---|---|---|
| `prototype/TOURNAMENT-RELATIONSHIP-MODEL.md`, lines 17–23 | `edition_id` is the Tournament edition key; Division and TeamEntry refer to it | The tournament relationship proposal uses `edition_id` |
| `prototype/TOURNAMENT-ORGANIZER-PORTAL-MODEL.md`, lines 17–20 | `tournament_edition_id` | One proposal document uses the longer snake_case name for the same described edition concept |
| `prototype/tournament-organizer-portal.html`, lines 44–45, 69, 72 | JSON records and export use `editionId` | Organizer handoff v1 uses camelCase `editionId` |
| `prototype/tournament-manager.html`, lines 73, 86, 91, 94–103, 119–121 | State, import validation, idempotency and division/team links use `editionId` | Manager and organizer handoff agree on the camelCase field |
| `prototype/TOURNAMENT-DATA-ARCHITECTURE-DRAFT.md`, sections 4 and 6 | Proposes conceptual `edition_id`; flags the naming difference | The architecture draft already recommends one conceptual name |
| `docs/01-domain-model.md` and `docs/02-relationship-model.md` | No tournament-edition entity/key is established as a canonical root-domain object | The tournament-specific key is not currently ratified by the root model |

### Finding

The evidence supports a **single intended edition concept with inconsistent proposal terminology**, not two demonstrated edition identities. The working synthetic payload contract uses `editionId`; the tournament relationship model uses `edition_id`; one organizer proposal uses `tournament_edition_id`.

### Candidate direction

Use `edition_id` as the conceptual name and retain `editionId` as the current synthetic JSON field in the v1 organizer handoff. Treat `tournament_edition_id` as a documentation inconsistency to correct only after governance accepts the conceptual naming. Do not introduce aliases, dual keys or migration logic: there is no evidence of a released production payload or persisted data requiring compatibility.

### Decision state recommendation

**READY FOR GOVERNANCE — naming only.** The inventory and same-concept evidence are sufficient to present a bounded naming decision. This is not ratification and does not authorize changes to the canonical Gate 2 model or production fields.

## 3. TAD-002 — Fixture-scoped player participation

### Observed source inventory

| Source | Exact observed form | What it establishes |
|---|---|---|
| `prototype/TOURNAMENT-RELATIONSHIP-MODEL.md`, lines 27–31 | `PlayerMatchParticipation` keyed by `match_participation_id`, with `fixture_id + participation_id`; StatisticObservation references it | The conceptual proposal introduces a distinct fixture-scoped relationship record |
| `prototype/TOURNAMENT-STAT-RECONCILIATION-MODEL.md`, lines 27–32 | Events and stats carry `fixture_id` and `participation_id` directly | Reconciliation proposal uses the composite context pair |
| `prototype/tournament-stat-reconciliation.html`, lines 13–16 | Synthetic event/stat fixtures carry `fixtureId` and `participationId` | Current reconciliation UI follows the composite pair |
| `prototype/TOURNAMENT-DAY-OPERATIONS-MODEL.md`, lines 19–27 and 31–35 | Fixture and Participation IDs are separate; lineup is fixture + participation + team entry | Day-operations proposal does not expose a MatchParticipation record |
| `prototype/tournament-day-operations.html`, lines 39, 47–80, 83–95 | Lineups, substitutions and events resolve by `fixtureId` and `participationId`; duplicate lineup per participation/fixture is rejected | Current day-operations workflow uses the pair as its operational relationship |
| `prototype/MATCH-DAY-HANDOFF-CONTRACT.md`, package and required-relationships sections | Package has one `fixtureId`; lineup/event/substitution rows carry `participationId`; one participation may appear only once per fixture in v1 | Handoff v1 encodes the pair and a current single-lineup-per-participation-per-fixture constraint |
| `prototype/player-tournament-history.html`, lines 45–68, 85–87 | Imported history validates one fixture and resolves rows using `participationId` within that fixture | History view consumes the same pair; it does not consume `matchParticipationId` |
| `prototype/tournament-manager.html`, lines 73, 105, 108, 115–116, 126 | Stats retain `fixtureId` and `participationId` | Manager stats also use the pair |
| `docs/01-domain-model.md` and `docs/02-relationship-model.md` | Canonical root model establishes Player and Membership/Organization concepts, but no MatchParticipation entity | The proposed match-level entity is tournament-specific and not already ratified in the root model |

### Finding

There is a real conceptual-versus-implementation seam. The conceptual relationship proposal names a distinct MatchParticipation record, but every inspected working module and the v1 handoff uses `fixtureId + participationId`. The current prototype imposes one lineup per participation per fixture and derives one appearance interval from lineup/substitution observations.

The inspected evidence does **not** demonstrate an independent lifecycle, independent authority, or multiple simultaneous match stints/roles for a MatchParticipation record. A separate identifier may ultimately be justified for event/stat provenance and correction history, but that justification has not yet been proven. A surrogate key alone is not sufficient reason to create a new domain entity.

### Candidate direction

Keep the current pair as the documented **synthetic v1 transport/context key**. Do not claim it is a ratified production composite key. Do not introduce `match_participation_id` into UI payloads, importers or schema by convenience.

Before selecting either a distinct entity or a composite key, decide whether match participation is:
- one fixture-scoped inclusion record per PlayerParticipation;
- a record with independently reviewable status/role/eligibility/appearance lifecycle; or
- a container for multiple stints/segments, where one PlayerParticipation can enter, leave and re-enter.

Then define uniqueness, event/stat ownership, correction semantics and how abandoned/restarted fixtures are represented. The [Match Participation Grain and Identity Crosswalk](MATCH-PARTICIPATION-GRAIN-DECISION-CROSSWALK.md) now tests those options against the TAD-004/005/006 dependencies; it remains a non-ratified evidence proposal.

### Decision state recommendation

**BLOCKED — domain meaning and multiplicity not evidenced.** TAD-002 must remain blocked until the independent lifecycle and multiplicity question is answered. The synthetic v1 pair remains a transport shape only.

## 4. Decision and implementation boundary

- No production key, database constraint, migration, API contract, importer adapter or shared persistence is authorized.
- No canonical Gate 2 relationship has been amended.
- No real player, minor, coach, organizer or competition data is introduced.
- Existing demo behavior is not proof of official eligibility, match occurrence, source authenticity or statistic verification.
- Any future change to the synthetic handoff contract must be versioned and tested; do not silently reinterpret v1.

## 5. Source links

- [Tournament Relationship Model](TOURNAMENT-RELATIONSHIP-MODEL.md)
- [Tournament Organizer Portal Model](TOURNAMENT-ORGANIZER-PORTAL-MODEL.md)
- [Tournament Statistic Reconciliation Model](TOURNAMENT-STAT-RECONCILIATION-MODEL.md)
- [Tournament Day Operations Model](TOURNAMENT-DAY-OPERATIONS-MODEL.md)
- [Match-Day Handoff Contract](MATCH-DAY-HANDOFF-CONTRACT.md)
- [Player Tournament History Model](PLAYER-TOURNAMENT-HISTORY-MODEL.md)
- [Canonical Domain Model](../docs/01-domain-model.md)
- [Canonical Relationship Model](../docs/02-relationship-model.md)

**Conclusion:** TAD-001 is sufficiently evidenced for a naming decision at governance. TAD-002 is not. This distinction prevents a tidy identifier convention from being mistaken for a resolved domain relationship.
