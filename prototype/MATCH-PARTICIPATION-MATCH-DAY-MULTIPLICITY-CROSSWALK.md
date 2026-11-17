# Match Participation and Match-Day Multiplicity Crosswalk

**Status:** Internal evidence crosswalk · NOT RATIFIED · no implementation authority  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026  
**Decision:** TAD-006 remains OPEN

## 1. Purpose and decision boundary

This crosswalk examines how a fixture, operational match-day session, actual playing attempt, playing periods, player participation, lineup, substitutions, events and derived appearance intervals relate.

It reconciles the current synthetic prototype with the tournament proposals and the current IFAB Laws of the Game. It does not determine South African competition-specific rules, amend the frozen Gate 2 Relationship Model, ratify TAD-002 or TAD-006, or authorize an ERD, schema, migration, API, RLS, authentication, shared persistence, real-data ingestion or production implementation.

All current ScoutSA examples inspected are synthetic. External rules are a reference baseline, not evidence that a particular local tournament has adopted every provision.

## 2. Sources inspected

### Internal ScoutSA sources

- `TOURNAMENT-RELATIONSHIP-MODEL.md`
- `TOURNAMENT-DATA-ARCHITECTURE-DRAFT.md`
- `TOURNAMENT-DAY-OPERATIONS-MODEL.md`
- `tournament-day-operations.html`
- `MATCH-DAY-HANDOFF-CONTRACT.md`
- `PLAYER-TOURNAMENT-HISTORY-MODEL.md`
- `tournament-stat-reconciliation.html`
- `TOURNAMENT-ARCHITECTURE-DECISION-REGISTER.md`
- Canonical `docs/02-relationship-model.md`

### External rules reference

- IFAB, Laws of the Game 2026/27, Law 3 — The Players: https://www.theifab.com/laws/latest/the-players/
- IFAB, Laws of the Game 2026/27, Law 7 — The Duration of the Match: https://www.theifab.com/laws/latest/the-duration-of-the-match/
- IFAB, Laws of the Game 2026/27, Law 10 — Determining the Outcome of a Match: https://www.theifab.com/laws/latest/determining-the-outcome-of-a-match/

The applicable edition and any national/competition modifications must be recorded for each event. The IFAB baseline does not establish the rules of a particular South African league, school competition, academy tournament or friendly.

## 3. Findings from the current ScoutSA prototype

### F-1 — One operational record is a demo constraint, not a domain rule

The Day Operations model defines one MatchDay record for one fixture in this demo. The page's summary begins with one synthetic record; its form updates the record found for a fixture or creates one if absent. The handoff exports `days[0] || null`. This proves the current page's one-record workflow, not a universal one-session-per-fixture rule.

**Implication:** do not ratify a one-to-one Fixture–MatchDay relationship from the demo.

### F-2 — Handoff v1 collapses several possible concepts

The JSON contract has one `matchDay` object or null, one `matchDurationMinutes` value, fixture-scoped lineups/substitutions/events/reports and derived appearances. It does not represent multiple venues or operational sessions, match attempts, resumed periods, extra time phases, penalty shoot-outs, or a rule-set/version reference.

**Implication:** the current handoff is adequate only for its declared simple synthetic case. It cannot be treated as a complete match record contract.

### F-3 — One lineup row per participation is explicitly version-limited

Handoff v1 says a participation may appear only once per fixture. Day Operations validates substitutions against lineup rows. The current appearance calculation finds one incoming and one outgoing substitution for a participation, then derives one continuous interval. The calculation does not model multiple entry/exit cycles.

**Implication:** this is a deliberate v1 simplification, not evidence that a player can only enter once, that return substitutions never occur, or that a player can have only one appearance interval in a fixture.

### F-4 — Fixture participation and match-instance participation are not yet distinguished

The tournament relationship proposal defines `match_participation_id` as `fixture_id + participation_id`. Other modules and the handoff use `fixtureId + participationId`. Neither representation currently says whether the relationship identifies a player's involvement in the scheduled fixture as a whole, one actual played attempt, or one match instance within a fixture's lifecycle.

**Implication:** TAD-002 and TAD-006 are coupled. Do not settle the key or uniqueness constraint before defining the lifecycle grain.

### F-5 — Events and statistics currently use a simple fixture clock

The handoff requires whole-number event/substitution minutes within one configured duration. The Player Tournament History model intentionally exposes a chronology conflict (an event at minute 67 versus a substitution-out at minute 65) instead of silently resolving it. This is good provenance behaviour, but a single integer minute cannot express all period/extra-time/restart cases or distinguish event time from record-entry time.

**Implication:** event chronology needs an explicit time context and correction process before official minutes or totals can be claimed.

### F-6 — The modules are not integrated sources of truth

Day Operations, Player Tournament History and Statistic Reconciliation use fixed or session-only synthetic data. The history page documents that it does not share live state or query the other modules. The handoff is a local file exchange, not persistence or an authoritative match record.

**Implication:** cross-page agreement is illustrative only; no claim of synchronized or verified match data is supported.

## 4. Rules baseline and limits

### R-1 — Playing periods and extra time

IFAB Law 7 defines normal periods and time lost, while competition rules determine certain durations and intervals. Extra time, where used, is a distinct phase of play. A shoot-out is a separate method of determining the outcome, not ordinary playing time to be added to player appearance minutes.

**Design consequence:** a single `matchDurationMinutes` is insufficient as a general rules model. Preserve period/phase context and the applicable rule-set rather than assuming every match is two equal halves or has extra time.

### R-2 — Substitution permissions vary

IFAB Law 3 places substitute numbers and whether an additional substitute may be used in extra time under competition rules. Return substitutions are only permitted in youth, veterans, disability and grassroots football subject to the agreement of the national association, confederation or FIFA.

**Design consequence:** ScoutSA must not enable or infer return substitutions from age category or a generic “grassroots” label alone. The event needs an identifiable competition rule/permission and its effective scope. The actual authority and evidence for local adoption remain unverified.

### R-3 — Abandonment and replay

IFAB Law 7 provides a general replay outcome for an abandoned match unless competition rules or organisers determine otherwise. This is not enough to decide whether a local competition resumes the remaining time, replays from the beginning, upholds a result, or makes another disposition.

**Design consequence:** preserve the original attempt and any later continuation/replay relationship. Never overwrite the first attempt's lineups, events or source observations with a later attempt.

### R-4 — Shoot-out and match result are distinct

IFAB Law 10 treats kicks from the penalty mark as a distinct procedure for determining the outcome. Shoot-out eligibility and participation rules are not interchangeable with ordinary playing-time appearance intervals.

**Design consequence:** represent shoot-out events/outcome separately from regulation/extra-time player minutes. Do not count a shoot-out kick as a goal in ordinary match scoring or as playing minutes.

## 5. Conceptual distinctions to preserve

These are candidate distinctions for governance, not approved entities or tables.

| Concept | Candidate meaning | What it must not be confused with |
|---|---|---|
| Fixture | Scheduled competition contest between team entries | A venue booking, operational session or proof that play occurred |
| Schedule revision | A dated change to planned time/venue/status | A new match attempt by default |
| Match-day session | Operational window for officials, venue, check-in, administration and reporting | The actual playing event |
| Match instance / attempt | One actual attempt to play the fixture under a competition disposition | The scheduled fixture or every admin session |
| Playing period / segment | A bounded portion of play, e.g. first half, second half, extra-time period, or resumed remainder | A new fixture automatically |
| Shoot-out phase | Separate outcome-determination procedure | Ordinary playing time or appearance minutes |
| Player participation | Player's registration relationship to a team entry | Proof of selection, lineup or actual appearance |
| Match participation | Candidate player-to-match-instance context | An assumed one-row-per-fixture shortcut |
| Lineup/substitution observation | Source-backed report of starting, entering, leaving or role state | A verified appearance interval by itself |
| Appearance interval | Derived time on the field for one continuous stint under an applicable clock/rule | An independently reported source fact |
| Match event | An occurrence reported at a defined match phase/time | A statistic or verified fact automatically |
| Result/competition decision | Recorded result observation and separately attributable official disposition | A score field edited in place |

## 6. Candidate relationship principles

1. A fixture may have multiple operational sessions across scheduling, administration, venue changes, postponement and reporting. Their number and identity rules remain to be decided.
2. A fixture may have zero, one or multiple played attempts over its lifecycle, depending on the competition's treatment of abandonment, replay and continuation.
3. A played attempt may contain multiple playing periods or segments, including regulation periods, extra time and a separately represented shoot-out phase.
4. A resumed continuation must retain links to the original attempt and preserve the time already played; whether it is the same match instance or a linked continuation instance is a competition-governed decision.
5. A replay must not silently overwrite the earlier attempt. It should be separately identifiable and linked to the same fixture/contest where the competition authority confirms that relationship.
6. A player may have multiple appearance intervals within one played attempt where the applicable rules permit return/re-entry or where the record includes multiple valid stints. This does not automatically require multiple player-to-match participation identities.
7. A player may have one participation context per match instance as a candidate default, with multiple appearance intervals beneath it. Whether exceptional rules require more than one context remains open.
8. A substitution observation must preserve the outgoing and incoming participant, team entry, phase/time, source, recording time and review status. A correction must not erase the original observation.
9. Appearance minutes are derived from validated entry/exit observations, match clock, periods, stoppages and the applicable competition rules. If the necessary context is absent or contradictory, suppress the calculation and show why.
10. A lineup record, a roster/registration record, an eligibility decision, a player/guardian permission and an actual appearance are separate states.
11. Match events and statistical observations must be attached to the correct match-instance/participation context once that grain is ratified. A fixture-only join may become ambiguous after replay or multiple attempts.
12. The rule-set/version and any local competition variation must be explicit before automated validation or minutes calculations are treated as meaningful.

## 7. Candidate options for TAD-006

| Option | Description | Assessment |
|---|---|---|
| A | One match-day record and one player appearance interval per fixture | Reject as a universal model; current demo does not prove it |
| B | Multiple match-day sessions/segments under a fixture, with all play records still fixture-scoped | Better operational flexibility, but may still conflate a replay with a continuation |
| C | Distinguish fixture, operational session, played match instance/attempt, playing periods and player appearance intervals; link attempts to the fixture under competition decisions | Preferred conceptual direction for further review; not ratified and not a physical schema |

**Candidate recommendation:** advance Option C for domain review only. Preserve TAD-002 as unresolved until the MatchParticipation grain is explicitly defined relative to a played match instance. Do not add a new key simply because the current data shape is inconvenient.

## 8. Unresolved questions and evidence required

- Which South African competition rules apply to each target tournament type (SAFA/LFA, school, academy, independent grassroots, friendly)?
- Who is authoritative for the rule-set, its version/effective dates and permitted deviations?
- What happens locally after postponement, abandonment, suspension, resumed play, replay, walkover, forfeit or protest?
- Does a resumed match retain the same match-instance identity, or become a linked continuation attempt? What happens to elapsed time, lineups, cards, substitutions and goals?
- Are return substitutions permitted in the relevant competition, and under which national-association/competition authorization?
- What are the substitution limits/opportunities, concussion substitutions, temporary dismissals and extra-time rules?
- How are first/second halves, extra-time periods, stoppage time, penalties and shoot-outs recorded?
- Can the same player enter, leave and re-enter more than once? Are multiple stints reported individually?
- Can a player be registered for more than one team entry or participate in more than one fixture in a day? This also depends on TAD-004.
- How are simultaneous venue changes, split sessions, delayed kickoffs, abandoned sessions and administrative handovers represented?
- Who may submit, verify, dispute, correct or approve lineup and timing observations?
- What is the event-time representation, including period, elapsed time, added time, precision, clock source and recorded-at timestamp?
- What source evidence is required for official appearance minutes, and how are late corrections and appeals preserved?

No representative South African competition regulations, local authority confirmation, referee/organiser interviews or real match records were available in this internal source review. These gaps are material, not cosmetic.

## 9. Stop conditions

Until TAD-006 is ratified:

- Keep the current simple one-duration/one-entry-exit calculation explicitly labelled synthetic-demo-only.
- Do not describe the current handoff as a complete or authoritative match record.
- Do not claim official minutes, verified appearances, full match chronology or comprehensive tournament-statistics coverage.
- Do not impose a universal one-session-per-fixture, one-attempt-per-fixture, one-lineup-per-participation, or one-interval-per-player rule.
- Do not treat shoot-out events as ordinary playing minutes or goals.
- Do not infer return-substitution permission from a generic grassroots/youth label.
- Do not overwrite abandoned/replayed match observations or silently reconcile contradictory times.
- Do not process real player or minor data, expose player records, or authorize external contact/publication.
- Do not create or migrate schema, IDs, APIs, RLS, persistence, imports or production integrations from this crosswalk.

## 10. Decision

**TAD-006 remains OPEN.** Option C is the preferred conceptual direction for governance discussion only. TAD-002 remains BLOCKED pending an explicit match-participation grain and lifecycle. TAD-004 and TAD-005 remain OPEN and are dependencies for roster eligibility and fixture lifecycle edge cases.

Review performed: source-document and synthetic-code inspection plus official IFAB rules reference review. No UI/browser test, automated test, local competition-rule validation or external stakeholder validation was performed. No mainline or production boundary changed.
