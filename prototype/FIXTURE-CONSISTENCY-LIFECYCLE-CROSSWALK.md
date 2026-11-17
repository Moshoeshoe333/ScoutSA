# Fixture Consistency and Lifecycle Crosswalk

**Status:** Internal evidence crosswalk · NOT RATIFIED · no implementation authority  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026

## 1. Question and boundary

This crosswalk reviews TAD-005: the identity, relationship integrity and lifecycle of a fixture across scheduled, postponed, abandoned, resumed, replayed, forfeited and completed competition scenarios, including multi-leg ties and result correction.

It inspects the tournament relationship and architecture proposals, the Tournament Manager synthetic records, Tournament Day Operations, Match-Day Handoff, Player Tournament History, statistic reconciliation and the canonical Gate 2 boundary.

It does not define competition regulations, certify match occurrence or results, amend the frozen Gate 2 Relationship Model, or authorize production implementation. No schema, migration, API, RLS, authentication, shared persistence, real-data import, public listing, player disclosure or mainline implementation is authorized.

## 2. Findings

### F-1 — The proposed fixture parent relationship is clear, but integrity constraints remain proposed

The tournament relationship proposal defines Fixture by `fixture_id`, linked to one `division_id` and home/away `team_entry_id` references. The architecture draft proposes that a fixture belongs to one division and that both team entries resolve to the same edition/division context as the fixture.

This is a coherent candidate integrity rule. The current Tournament Manager seed uses one fixture with one division and two team entries. It does not exercise cross-edition, cross-division, same-team, missing-entry or duplicate-pairing cases. The proposal itself says the consistency invariant is subject to ratification.

**Finding:** retain the proposed parent and participant relationship for review; do not treat the current single fixture as proof that the full constraint set is settled.

### F-2 — The prototype conflates fixture schedule, match result and operational match-day state in places

Tournament Manager stores fixture fields such as date, round, venue, home score, away score, result source and result review state together in one synthetic fixture object. The Tournament Intelligence view displays a score and a single “Match state” label. Day Operations separately stores a match-day status, kickoff, venue and coordinator.

The Day Operations model correctly warns that match-day status, official assignment, lineup, event and report are different records and none proves another. However, there is no ratified domain boundary that fully separates:
- the planned contest/pairing and its scheduled slot;
- the operational session used to administer it;
- the actual played match instance and its periods;
- the reported score/result and its source/review lifecycle;
- the competition-level decision (for example, walkover, forfeit, replay order or awarded result).

**Finding:** a fixture being marked scheduled, postponed or completed must not automatically create or certify a result, appearance, statistic or official outcome.

### F-3 — Postponement and rescheduling have no defined temporal history

The current fixture seed has one date and round. No rescheduling history, reason, decision authority, notice source or effective-time model is defined. Overwriting a date would lose the distinction between original schedule and later amendment.

Candidate direction: preserve the stable fixture identity when the same contest is merely rescheduled, and preserve each schedule proposal/decision as attributable, time-scoped history. Whether a competition rule treats a cancellation, abandonment or re-ordering as the same fixture or a replacement contest remains subject to the actual rules.

### F-4 — Abandonment, resumption and replay are not interchangeable

The architecture draft explicitly leaves abandoned/replayed fixtures unresolved. Day Operations says its demo assumes one match-day record and a simple configured duration, with no abandoned/restarted periods or complex extra-time segments. The Match-Day Handoff carries a single fixture ID and a single duration; its v1 package has no authoritative result or competition context.

The current data cannot distinguish:
- an operational interruption followed by continuation of the same played contest;
- a match abandoned and later resumed from a defined point;
- an abandoned match ordered to be replayed as a new played contest;
- a wholly new fixture created after cancellation or administrative decision.

**Finding:** do not model all these outcomes as a status string or assume every replay is either the same fixture or a new fixture. The competition authority's rules must define whether the scheduled contest identity persists and how each actual match instance is represented.

### F-5 — Walkover and forfeit are competition decisions, not ordinary played scores

No reviewed model defines walkover/forfeit semantics, the authority and evidence required, score-award conventions, appeal/reversal handling, or whether a non-played outcome creates any player appearance or performance statistics.

Candidate direction: represent a competition decision and its source/review lifecycle distinctly from an actual played match result. Do not create lineup, appearance, match-event or player-stat evidence from an awarded score alone. Exact labels and effects must come from the applicable competition regulations.

### F-6 — Two-legged ties and aggregate results require a higher-level competition relationship

The current proposal links each Fixture to a division and two team entries. It does not define a tie/round relationship grouping multiple fixtures, home/away legs, aggregate score, away-goal rules, extra time, penalties, replay or tie-break adjudication.

A second leg should not be represented by overwriting the first fixture's score or by treating the aggregate as an individual match result. Candidate direction: keep each played fixture's result separately sourced and model any tie/round aggregate as a derived or separately adjudicated competition-level outcome, once the competition format is known.

### F-7 — Result correction and statistical consequences need versioned provenance

Tournament Manager stores a result source label and result review state, but not a versioned result observation, source artifact, correction reason, reviewer decision, appeal or supersession history. Match Statistic Reconciliation separately asks how late corrections, rescinded goals and abandoned fixtures should be versioned. Player Tournament History says results, appearances and statistics are separate records with separate sources/review states.

**Finding:** do not silently overwrite a score or infer that a corrected result changes player appearances or statistics. Preserve original observations and attach any correction/adjudication to its authority, evidence, scope, effective time and affected downstream projections.

### F-8 — The existing handoff is intentionally too narrow to carry fixture lifecycle truth

Match-Day Handoff v1 is a single-fixture synthetic package. It includes a fixture ID and duration, but match result and competition context are not authoritative fields. It has no lifecycle history, schedule revision, actual match-instance identity, tie/leg grouping, awarded-result decision, appeal, package signature or import history.

It must not be extended into a production lifecycle contract by adding convenient fields before the underlying domain decisions are made.

## 3. Evidence inventory

| Source | What it demonstrates | What it does not establish |
|---|---|---|
| `TOURNAMENT-RELATIONSHIP-MODEL.md` | Fixture ID, division and home/away Team Entry links; distinct fixture-scoped match participation proposal | Fixture uniqueness, lifecycle, multi-leg tie or exceptional-result rules |
| `TOURNAMENT-DATA-ARCHITECTURE-DRAFT.md` §§5–9 | Proposed edition/division/team-entry consistency; explicitly lists walkovers, abandoned/replayed fixtures and multi-leg ties as unresolved | Ratified constraints or competition rules |
| `tournament-manager.html` | One synthetic fixture with division, home/away entries, date, round, venue, score, result source and result review label | Schedule history, actual match-instance history, authoritative result, replay, walkover or appeal semantics |
| `tournament-intelligence.html` | Static fictional fixtures display score and match-state labels | Live fixture lifecycle or authoritative results |
| `TOURNAMENT-DAY-OPERATIONS-MODEL.md` and `tournament-day-operations.html` | Separate session-only match-day status, officials, lineups, substitutions, events, reports and source labels; one simple configured match duration | Multiple sessions, resumed/abandoned periods, extra time, return substitutions or official match completion |
| `MATCH-DAY-HANDOFF-CONTRACT.md` | Version-1 package scoped to one fixture; duration and operational observations; no authoritative result or competition context | Production result exchange, lifecycle history or trusted source |
| `PLAYER-TOURNAMENT-HISTORY-MODEL.md` | Results, appearances and statistics remain distinct; unresolved chronology conflict is retained | Authoritative match result or correction process |
| `TOURNAMENT-STAT-RECONCILIATION-MODEL.md` | Correction, rescinded-goal and abandoned-fixture questions are open | Approved correction lifecycle |
| `docs/02-relationship-model.md` | Gate 2 baseline is frozen and deferred relationships require governance | Authority to ratify fixture lifecycle in a prototype document |

## 4. Candidate conceptual boundaries

These are candidates for governance review, not ratified entities or rules:

1. **Fixture / scheduled contest** — the competition's planned pairing between two eligible team entries within one division and edition, with a stable identifier if the contest is rescheduled.
2. **Schedule revision / fixture appointment** — an attributable proposal or decision for date, kickoff, venue and round/slot, retaining prior values and reasons rather than silently overwriting them.
3. **Match-day session** — operational administration at a venue/time; it may not equal an actual played match instance.
4. **Played match instance** — a specific attempt at playing the contest, with its own periods, timing, participants, source records and outcome state if the domain owner establishes this distinction.
5. **Period / segment** — a portion of a played match instance, needed only if competition rules require resumed play, extra time or other separate timing contexts.
6. **Result observation** — a sourced report of score or outcome; it is not automatically the competition's final adjudicated result.
7. **Competition decision** — a scoped decision such as awarded result, walkover, forfeit, replay order, abandonment disposition or appeal outcome, made by the proper competition authority.
8. **Tie / round / leg group** — a competition-format construct grouping multiple fixtures and, where applicable, defining aggregate progression. Its exact grain depends on the competition rules.
9. **Correction / adjudication** — a versioned, attributable decision that supersedes or qualifies prior observations without erasing the historical record.

Do not create every candidate as a separate table or entity merely because it is listed here. Their independent lifecycles and multiplicities must be established first.

## 5. Candidate direction

- Preserve the fixture's identity for schedule-only changes to the same contest, while recording schedule revisions and their authority/history.
- Keep scheduled contest, operational session and actual played match instance conceptually distinct until evidence establishes whether they can be collapsed safely.
- Treat an ordered replay as a distinct played attempt; whether it shares the scheduled fixture identity or receives a separate fixture identity is a competition-governed decision.
- Keep each leg's fixture result separate from any tie-level aggregate or progression decision.
- Keep an awarded walkover/forfeit outcome distinct from a played score and never fabricate player appearances or statistics from it.
- Preserve reported scores and sources; record corrections, appeals and final adjudications as attributable versions/decisions.
- Validate fixture participant entries against the same edition/division only after that integrity rule is ratified.
- Keep match statistics and Player Tournament History derived from the appropriate fixture/match-instance/participation context and preserve source/version provenance.

These are architectural directions for review, not permission to implement a lifecycle state machine.

## 6. Decisions and evidence still required

- What is the competition's definition of a fixture, tie, leg, round, match instance and replay?
- Does a postponement preserve fixture ID? What about cancellation, venue relocation, date change, opponent withdrawal or replacement?
- When does a rescheduled fixture become a new contest rather than a revision of the existing one?
- What are the permitted fixture states, transitions, terminal states and authority for each transition? Which are operational labels versus competition decisions?
- How are abandoned matches resumed, replayed or awarded? Are prior periods/scores retained, restarted or disregarded under each rule?
- Can one fixture have multiple match-day sessions, venues, played instances or periods? Which records carry player appearances and statistics?
- How are walkovers, forfeits, no-shows, disqualifications and awarded scores defined, sourced, appealed and reversed?
- What groups fixtures into a tie/round, and how are aggregate score, away goals, extra time, penalties and tie-break decisions handled?
- Which result source is authoritative for each competition? Who records, confirms, disputes, corrects and appeals a result?
- How do corrections propagate to standings, player history, appearances, statistics, scouting views and public displays without silently rewriting source evidence?
- What uniqueness rules apply to team pairings, round/leg slots, date/time/venue overlaps and duplicate fixture submissions?
- What retention, access, privacy and safeguarding rules apply to match reports, video, referee records and player-level evidence?

Required evidence includes representative published competition regulations and documented edge cases from more than one competition format, with source, version/effective date, authority and scope recorded. Where evidence is absent, keep the behavior unresolved; do not invent a universal football rule.

## 7. Stop conditions

Until the relevant decisions are ratified:
- do not create a production fixture state machine or enforce uniqueness constraints based on the single-fixture demo;
- do not overwrite a scheduled date, venue, score or result state without preserving the prior observation and decision history;
- do not equate fixture completion, match-day status, referee/report submission or a source label with an authoritative result;
- do not represent a replay, resumption, walkover, forfeit or abandoned match using an invented universal rule;
- do not calculate player appearances/minutes across abandoned, resumed, extra-time or replay contexts using the simple v1 duration model;
- do not infer player appearances or statistics from an awarded score;
- do not overwrite first-leg results with aggregate tie outcomes;
- do not ingest real fixture, referee, player, video or match-report data, or publish results, from this crosswalk;
- do not create schema constraints, migrations, APIs, RLS policies, shared persistence or mainline implementation.

## 8. Outcome for TAD-005

**TAD-005 remains OPEN.** The source inventory supports the basic proposed fixture → division + two team entries relationship and identifies a strong need to separate schedule, session, played match, result observation and competition decision. It does not settle fixture identity across postponement/replay, exceptional outcomes, tie/leg grouping, result authority or correction lifecycle.

This review is documentation and source inspection only. It does not change Gate 2, ratify a domain relationship, authorize implementation, or establish real-world match occurrence or result.
