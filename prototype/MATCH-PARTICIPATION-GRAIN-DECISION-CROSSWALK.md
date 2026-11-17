# Match Participation Grain and Identity Crosswalk

**Status:** Internal evidence crosswalk · NOT RATIFIED · no implementation authority  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026  
**Decision:** TAD-002 remains BLOCKED; TAD-004 and TAD-005 remain OPEN; TAD-006 remains OPEN

## 1. Purpose and decision boundary

This crosswalk resolves the precise question behind TAD-002: what does a player-to-match relationship identify, and at what lifecycle grain should it exist?

It distinguishes:

- Player identity;
- PlayerParticipation (registration/participation in a TeamEntry);
- Fixture (the scheduled competition contest);
- played match instance/attempt;
- MatchParticipation (the candidate relationship between a PlayerParticipation and a played match instance);
- lineup/substitution observations;
- one or more derived appearance intervals;
- match events and statistical observations.

This is a conceptual evidence review only. It does not amend the frozen Gate 2 Relationship Model, ratify a tournament domain model, authorize an ERD, schema, key, constraint, migration, API, importer, RLS, authentication, persistence or production implementation.

All current ScoutSA records inspected are synthetic. No local competition rules or real match records were validated.

## 2. Evidence reviewed

### Internal sources

- `TOURNAMENT-RELATIONSHIP-MODEL.md`
- `TOURNAMENT-IDENTIFIER-CROSSWALK.md`
- `TOURNAMENT-ARCHITECTURE-DECISION-REGISTER.md`
- `MATCH-PARTICIPATION-MATCH-DAY-MULTIPLICITY-CROSSWALK.md`
- `TOURNAMENT-STAT-RECONCILIATION-MODEL.md`
- `MATCH-DAY-HANDOFF-CONTRACT.md`
- `TOURNAMENT-DAY-OPERATIONS-MODEL.md`
- `PLAYER-TOURNAMENT-HISTORY-MODEL.md`
- `docs/01-domain-model.md`
- `docs/02-relationship-model.md`

### Evidence boundary

The tournament relationship proposal introduces `match_participation_id` for a record described by `fixture_id + participation_id`. The current synthetic UI and handoff instead carry `fixtureId + participationId`. The v1 handoff permits one lineup per participation per fixture and one simple entry/exit calculation.

TAD-006 has already established that fixture, operational session, played attempt, playing period and appearance interval are distinct candidate concepts. TAD-005 has not yet settled the lifecycle and identity of abandoned, resumed, replayed or multi-leg contests. TAD-004 has not settled all PlayerParticipation multiplicity and effective-period rules.

Therefore the current evidence demonstrates a transport simplification and a conceptual mismatch. It does not establish a production uniqueness rule.

## 3. Grain analysis

| Candidate record | What it identifies | What it does not identify |
|---|---|---|
| Player | A stable football identity | Registration, selection or appearance in a particular event |
| PlayerParticipation | A player's event/team-entry registration relationship | Selection for a particular fixture or actual playing time |
| Fixture | A scheduled contest within a competition context | Proof that play occurred or one unique played attempt |
| Played match instance/attempt | A particular actual attempt to play the scheduled contest, subject to competition disposition | The player's registration or every administrative session |
| MatchParticipation (candidate) | A PlayerParticipation's relationship to one played match instance | Each separate stint/interval, event or statistic by itself |
| Lineup/substitution observation | A reported selection/entry/exit fact with source and review state | An independently verified appearance interval |
| Appearance interval | One derived continuous stint on the field | The player's entire registration or necessarily the only stint |
| Match event | A reported occurrence in a match phase/time context | An automatically verified statistic |
| Statistical observation | A metric assertion with definition, value, scope and provenance | An automatic proof of the underlying event |

**Key distinction:** PlayerParticipation answers “for which team-entry context was this player registered/participating?” A candidate MatchParticipation answers “in which played match instance was that registration involved?” Those are not interchangeable relationships.

## 4. Adversarial identity tests

### Test A — One fixture, one played attempt

For a simple fixture with one played attempt, `fixture_id + participation_id` can identify the demo's player-match context, assuming one PlayerParticipation is unambiguous.

**Result:** adequate as a synthetic v1 transport locator; not proof of a general domain key.

### Test B — One fixture, abandoned attempt, then replay

If the original attempt and replay are distinct played instances under the same fixture, the same PlayerParticipation may be present in both.

The pair `fixture_id + participation_id` collides: it cannot distinguish the player's involvement in the original attempt from their involvement in the replay.

**Result:** the pair is insufficient if the competition lifecycle treats these as separate played instances and both records must be retained.

### Test C — One fixture, suspended match resumed

A resumed match may be treated by the applicable competition rules as continuation of the same played instance or as a linked continuation attempt. The available evidence does not settle which identity treatment is correct.

**Result:** do not assume a new MatchParticipation or reuse an old one until the competition disposition and match-instance identity are known. Preserve the original observations and link the continuation decision.

### Test D — One match instance, player enters/leaves/re-enters

A player may have more than one appearance interval where the applicable rules permit it. Those intervals are not automatically separate registrations or separate player-to-match identities.

**Result:** multiple intervals should be represented beneath the relevant match participation context if the final model supports them. Do not create one MatchParticipation per stint by default.

### Test E — Same player has multiple PlayerParticipation records

TAD-004 has not established whether one player may have multiple registrations/participation records across team entries, divisions or overlapping periods. A player identity alone therefore cannot safely replace the PlayerParticipation reference.

**Result:** retain the exact PlayerParticipation context. Do not silently collapse distinct registrations by Player ID.

### Test F — Correction, dispute or source replacement

A lineup observation can be corrected or disputed without the underlying registration changing. A review decision is not a source correction; a source correction must preserve its prior version and attribution.

**Result:** MatchParticipation should not be overloaded as the evidence ledger, review decision, or appearance calculation.

## 5. Candidate relationship shape

The following is a conceptual candidate only:

```text
Fixture
  └── PlayedMatchInstance / Attempt
        └── MatchParticipation (candidate)
              ├── PlayerParticipation
              ├── Lineup / Selection observations
              ├── Substitution observations
              ├── Match events
              ├── Statistical observations
              └── Derived AppearanceIntervals (0..many)
```

Candidate cardinality, subject to TAD-004/005/006:

- A Fixture may have zero, one or multiple played match instances over its lifecycle.
- A played match instance may have zero or many MatchParticipation relationships.
- A PlayerParticipation may be related to zero or many played match instances over time.
- A MatchParticipation relationship may have zero or many source-backed lineup/substitution observations.
- A MatchParticipation relationship may have zero or many derived appearance intervals.
- A Match event or statistical observation must resolve to the correct played match instance and relevant participation context when that grain is approved.
- A player who is named but never enters may still have a selection/lineup observation; that does not create an appearance interval.
- A registration, eligibility decision, guardian permission, selection, appearance and statistic remain separate states.

These are candidate cardinalities for review, not approved multiplicities.

## 6. Identity options

| Option | Candidate identity | Strength | Failure / cost | Disposition |
|---|---|---|---|---|
| A | `fixture_id + participation_id` | Simple; matches all current v1 modules | Cannot distinguish multiple played attempts under one fixture | Retain only as v1 synthetic transport shape |
| B | `match_instance_id + participation_id` | Distinguishes a player's involvement in each played attempt without adding an arbitrary surrogate | Depends on ratified match-instance identity and stable natural-key semantics | Preferred conceptual uniqueness candidate, conditional on TAD-005/006 |
| C | Independent `match_participation_id`, with unique `match_instance_id + participation_id` | Stable reference for events/stats/review links; can support independent relationship lifecycle | A surrogate key alone adds no domain meaning; lifecycle, uniqueness and correction semantics still required | Possible technical identity after semantic approval; not yet justified/authorized |
| D | One row per appearance interval | Captures every stint directly | Confuses participation context with interval; multiplies identity and complicates unused substitutes/events | Reject as default MatchParticipation grain |
| E | Either fixture-scoped or match-instance-scoped shape depending on module | Superficially flexible | Different modules silently refer to different things; reconciliation becomes ambiguous | Reject |

### Candidate recommendation

Advance **Option B as the conceptual uniqueness test**, not as an approved key or schema:

> One MatchParticipation relationship, if the domain ratifies that concept, should represent one PlayerParticipation's involvement in one played match instance. Multiple appearance intervals and multiple source observations may exist beneath that relationship.

If governance later confirms that this relationship has an independent lifecycle, needs stable external references, or must be referenced by many evidence/review records, Option C may be a suitable technical identifier. The existence of a surrogate ID must follow the semantic decision, not substitute for it.

Do not use `fixture_id + participation_id` as a universal identity where a fixture may contain multiple distinct played attempts.

## 7. Event and statistic ownership rules to preserve

1. An event must be scoped to a played match instance, not merely to a scheduled fixture, once multiple attempts are possible.
2. Where an event is attributed to a player, it must resolve to the relevant PlayerParticipation/MatchParticipation context; a display name or bare Player ID is not sufficient.
3. A statistic observation must retain its metric definition/version, unit, value, source, recording time, review state and correction history.
4. An event-to-stat link is a traceable relationship, not independent confirmation that either record is accurate.
5. One event may support a candidate statistic, but the conversion rule and metric definition must be explicit; no automatic verified total follows.
6. A correction or dispute must not erase the original observation. Preserve the source version and record any review disposition separately.
7. A match-level team statistic may not have a player participation; the model must not force every event/statistic into a player relationship.
8. Appearance minutes are derived from validated timing/lineup observations and applicable rules. If the attempt, phase, clock or source is ambiguous, suppress the derived result and expose the reason.
9. Shoot-out events remain separate from ordinary playing-time intervals and ordinary match-goal totals.
10. MatchParticipation does not itself prove selection, eligibility, appearance, source authenticity, performance quality or scouting suitability.

## 8. Dependencies and decision gates

| Dependency | Required answer before TAD-002 can close |
|---|---|
| TAD-004 — Team entry / PlayerParticipation cardinality | What exactly does a PlayerParticipation identify, and can multiple registrations overlap or coexist? |
| TAD-005 — Fixture consistency / lifecycle | What is a played match instance, and how do abandonment, resumption, replay, walkover, forfeit and multi-leg ties relate to a fixture? |
| TAD-006 — Match participation / match-day multiplicity | Are sessions, attempts, periods and stints distinct; how are resumed periods and multiple intervals handled? |
| TAD-007 — Source / evidence / provenance | How are observations, corrections, review decisions and source authority represented? Needed before claiming trustworthy match/stat records, though not necessarily to define the basic relationship grain. |

TAD-004/005/006 are blocking semantic dependencies. TAD-007 is a downstream trust dependency for evidence-bearing workflows and verified statistics.

## 9. Unresolved questions

- Is MatchParticipation a domain relationship with its own status/lifecycle, or simply a derived join between PlayerParticipation and played match instance?
- Can a PlayerParticipation be linked to more than one played attempt under the same fixture?
- For a resumed match, is the continuation the same played instance or a linked instance under local competition rules?
- Are lineups frozen per attempt, per period, or subject to versioned correction?
- Can a player be named on a lineup but never appear? (The model should distinguish this from an appearance.)
- What is the authority for selection, substitution and time observations?
- Are player-level events and team-level events represented distinctly?
- Can one event support more than one statistic, and what prevents double counting?
- What is the required event-time representation for period, elapsed time, added time, clock precision and record-entry time?
- What are the correction, dispute, appeal and supersession rules?
- Which local competition rule-set/version governs each target tournament?
- What retention and access boundaries apply to real player/minor match records?

No representative South African competition regulations, local referee/organiser confirmation, real match records or external validation were available in this review. These gaps remain material.

## 10. Stop conditions

Until TAD-002 is ratified:

- Keep `fixtureId + participationId` labelled as a synthetic v1 transport/context pair only.
- Do not introduce `match_participation_id` into the UI, handoff, importer or schema by convenience.
- Do not impose a production uniqueness constraint.
- Do not create one MatchParticipation per appearance interval by default.
- Do not join player match events/statistics on display names or bare Player IDs.
- Do not collapse replay/continuation records into one fixture-scoped player row without a competition disposition.
- Do not describe demo lineup or appearance data as official, verified or complete.
- Do not amend the frozen Gate 2 Relationship Model or claim any mainline gate has closed.
- Do not process real player/minor data or authorize external contact/publication.
- Do not create schema, migrations, APIs, RLS, authentication, persistence or integrations from this crosswalk.

## 11. Decision

**TAD-002 remains BLOCKED.** The evidence supports a precise candidate definition for governance discussion: MatchParticipation, if ratified, is a PlayerParticipation-to-played-match-instance relationship, not a fixture-to-registration shortcut and not an appearance-interval record.

Option B is the preferred conceptual uniqueness test, conditional on TAD-004/005/006. Option C may later provide a technical identifier only if the approved lifecycle requires one. No production or mainline authority is created by this document.

Review performed: internal proposal/contract/model inspection and crosswalk reconciliation. No local competition-rule validation, real-match validation, external stakeholder validation, UI test or automated test was performed.
