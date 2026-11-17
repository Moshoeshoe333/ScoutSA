# TAD-005 Fixture Lifecycle — Adversarial Test Matrix

**Status:** Internal analysis · NOT RATIFIED · no implementation authority  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026  
**Parent decision:** TAD-005 — Fixture consistency and lifecycle  
**Companion:** [Fixture Consistency and Lifecycle Crosswalk](FIXTURE-CONSISTENCY-LIFECYCLE-CROSSWALK.md)

## 1. Purpose and boundary

This matrix tests the proposed fixture relationship and lifecycle against schedule revisions, duplicate submissions, interruptions, resumptions, replays, awarded outcomes, multi-leg formats, result corrections and downstream history/statistics.

It is a design test pack, not a universal football rulebook. It does not assert that a particular South African competition must resume, replay, award, cancel or decide any event in a particular way. Applicable regulations, their effective versions and the competent decision authority must be established first. Where evidence is absent or conflicting, the expected result is **UNDETERMINED / REVIEW REQUIRED**, not a guessed state transition.

No production fixture state machine, schema, migration, API, RLS policy, real-data ingestion, result publication or mainline implementation is authorized.

## 2. Evidence baseline

The reviewed artifacts support these limited observations:

- The tournament relationship proposal gives a Fixture a fixture ID, division and home/away TeamEntry references.
- The architecture draft proposes that both TeamEntries resolve to the fixture's same edition/division context, but this remains unratified.
- Tournament Manager prevents a team entry from playing itself and checks that both selected entries belong to the chosen division. It does not detect duplicate fixtures, preserve schedule revisions or model replay/abandonment/appeal history.
- Tournament Manager stores score, source label and review state on the same in-memory fixture object. A later result submission overwrites those fields rather than preserving a version history.
- Tournament Day Operations has one session-only match-day record per fixture in its current demo and includes operational statuses such as Scheduled, In progress, Delayed, Abandoned and Completed. Its own copy says status does not certify match occurrence.
- Match-Day Handoff v1 is a single-fixture synthetic package. It has no authoritative result, competition context, schedule history, played-match-instance ID, appeal or import history.
- The existing design notes already distinguish scheduled fixture, operational session, played match, result observation and competition decision as candidate concepts. They do not ratify separate tables or exact cardinalities.

A successful browser test of the demo proves only that the tested synthetic workflow behaves as coded. It does not establish competition-rule correctness.

## 3. Adversarial scenario matrix

| ID | Scenario | Question to resolve | Safe candidate treatment before rule evidence |
|---|---|---|---|
| T05-01 | Same fixture receives a new kickoff date | Is this a schedule revision of the same contest? | Preserve original appointment and record the new proposal/decision; do not overwrite history. |
| T05-02 | Venue changes but teams and contest remain the same | Does venue change preserve fixture identity? | Treat as an attributable schedule amendment pending competition rule. |
| T05-03 | Round/stage label is corrected | Is the label descriptive metadata or a governed competition slot? | Preserve prior value and correction source; do not silently re-key the fixture. |
| T05-04 | Same two entries submit duplicate fixtures for the same round/time | Is one a duplicate, a second leg, a replay or a separate competition? | Flag possible duplicate; do not auto-merge or publish either as canonical. |
| T05-05 | Same two entries play twice in one round | What distinguishes home/away legs, replay, friendly or duplicate? | Require explicit competition-format/fixture relationship; do not deduplicate on team pair alone. |
| T05-06 | Home and away are reversed in a second fixture | Is this a second leg or duplicate data? | Preserve distinct fixture candidates and require tie/leg context. |
| T05-07 | One team withdraws before kickoff | Is fixture cancelled, rescheduled, awarded or replaced? | Record the withdrawal observation and await authorized competition decision. |
| T05-08 | Opponent is replaced after withdrawal | Does replacement amend the existing contest or create a new fixture? | Preserve original pairing and replacement decision lineage; do not mutate participants silently. |
| T05-09 | Match is delayed before kickoff | Is the fixture still scheduled, delayed operationally or formally postponed? | Separate match-day observation from formal schedule/competition decision. |
| T05-10 | Match is postponed before any play | Does the same fixture ID remain? | Candidate schedule revision; require rule/authority and preserve original appointment. |
| T05-11 | Match starts and is abandoned before half-time | What score/period/observations survive, and what disposition is ordered? | Preserve played-instance observations; wait for authorized abandonment disposition. |
| T05-12 | Match abandoned after substantial play | Does it resume, restart, replay or receive an awarded result? | Do not infer from elapsed time or score; require competition rule and decision. |
| T05-13 | Match resumes later from the interruption point | Is this continuation of the same played instance or a linked session/segment? | Preserve prior and resumed periods with explicit linkage; avoid treating it as a fresh completed match by default. |
| T05-14 | Abandoned match is ordered to be replayed from minute zero | Is replay a new played instance under the same fixture or a replacement fixture? | Preserve original attempt and replay order; leave fixture identity mapping unresolved until rules decide. |
| T05-15 | Match is replayed after a disputed result | What happens to original score, appearances and statistics? | Keep original result observation and replay result separate; record adjudication and supersession scope. |
| T05-16 | Walkover is awarded when one team does not appear | Is it a competition decision with an awarded score, and what evidence is required? | Record decision separately from played score; create no player appearances or match events. |
| T05-17 | Forfeit is declared after a match has started | Which observations remain, and what is the final competition outcome? | Preserve actual observations and separate forfeit decision; no automatic deletion or conversion. |
| T05-18 | Disqualification changes a previously completed result | Who can decide, what is the effective date, and how are appeals handled? | Version the decision and downstream standings projection; do not rewrite the source observation. |
| T05-19 | Referee report and organizer result disagree | Which source/authority resolves the conflict? | Preserve both observations as disputed; no source-label ranking or automatic winner. |
| T05-20 | Result is corrected after standings have been calculated | Which projections must be recomputed and which historical snapshots retained? | Preserve original and corrected result versions; identify affected projections and correction lineage. |
| T05-21 | A goal is rescinded after video review | Is this a match event correction, score correction, disciplinary decision or all? | Keep event observation and result adjudication distinct, linked by explicit review decision. |
| T05-22 | Penalty shoot-out follows a drawn match | Is shoot-out score part of match score, tie outcome or separate phase? | Preserve regulation/extra-time score and shoot-out outcome separately until format rules specify aggregation. |
| T05-23 | Two-leg tie has an aggregate score | Which rules govern away goals, extra time, penalties and progression? | Keep each leg result separate; aggregate/progression is a rule-based derived or adjudicated outcome. |
| T05-24 | One leg is abandoned and replayed while second leg is scheduled | How does the tie/leg chronology and aggregate calculation behave? | Keep attempts and leg identity explicit; do not calculate a final aggregate from incomplete or superseded attempts. |
| T05-25 | Fixture is moved to another division or edition after creation | Is this correction, invalid fixture, transfer or new contest? | Do not mutate the parent scope; preserve the original record and require authorized correction/replacement decision. |
| T05-26 | Team entry is later found invalid or withdrawn | What happens to prior fixtures and results? | Preserve historical fixture and decision; require explicit competition disposition for each affected contest. |
| T05-27 | A match is marked Completed operationally but no result is recorded | Does completion prove a result exists? | No. Keep operational status separate; result remains absent/unknown. |
| T05-28 | A result is entered while match-day status is Scheduled | Is this a data-entry error, delayed workflow or external result report? | Preserve the observation but flag chronology conflict; do not silently promote match-day state. |
| T05-29 | Match-day session exists but the fixture is cancelled | Can operational records remain for audit? | Preserve the session and its cancellation context; do not infer a played instance. |
| T05-30 | Same fixture is exported/imported more than once | Is package identity idempotent, and how are changed versions handled? | Reject or quarantine duplicate/conflicting package until import/version semantics are defined; never silently overwrite. |
| T05-31 | Result correction arrives after player history/stat exports | How are stale downstream copies identified and corrected? | Track source result version and projection provenance; flag stale snapshots, do not silently rewrite exports. |
| T05-32 | A fixture has no official source, only an informal social post | Is the post sufficient for schedule/result use or publication? | Treat as a lead or unverified observation; no authority, event occurrence or publication claim. |

## 4. Candidate lifecycle vocabulary — not a state machine

The following dimensions must not be collapsed into one status field:

- **Schedule state:** proposed, scheduled, amended, postponed, cancelled — candidate labels only.
- **Operational session state:** setup, check-in, delayed, in progress, paused, ended — local operational observations, not competition adjudications.
- **Played-instance state:** not started, in progress, interrupted, resumed, ended, abandoned — candidate labels whose definitions and transitions depend on competition rules.
- **Result-observation state:** absent, reported, conflicting, disputed, corrected, superseded — describes evidence handling, not the official outcome.
- **Competition-decision state:** pending, decided, appealed, upheld, varied, reversed — candidate governance lifecycle; authority and permitted transitions must be specified.
- **Tie/round progression:** unresolved, provisionally calculated, decided, appealed — competition-format dependent and not reducible to a fixture's score.

These labels are vocabulary for adversarial testing only. They are not proposed enum values, UI controls or permission to implement.

## 5. Cross-cutting invariants

1. **Fixture completion is not result authority.** An operational status does not prove the match occurred or establish its official result.
2. **A result observation is not an adjudication.** A reported score must retain its source and review state.
3. **A source label is not source evidence.** The demo's source dropdown does not authenticate a referee, match sheet, organizer or event.
4. **A schedule change is not necessarily a new fixture.** Identity continuity requires explicit rules and attributable decisions.
5. **A replay is not automatically a resumption.** Preserve the distinct played attempts and the authority's disposition.
6. **An abandoned match is not a completed match with a special score.** Preserve observed play and unresolved outcome separately.
7. **Walkover/forfeit is not an ordinary played score.** Do not fabricate lineups, appearances, goals or minutes from an awarded outcome.
8. **A leg result is not an aggregate tie result.** Keep individual fixtures and tie-level progression distinct.
9. **Correction is not erasure.** Preserve the original observation, correction reason, authority, effective scope and supersession link.
10. **Downstream projections must disclose their source version.** Standings, player history and stats may become stale after a correction.
11. **Missing is not zero.** No result, no appearance or no statistic must remain absent/unknown rather than being synthesized.
12. **Contradiction is not resolved by recency alone.** Latest timestamp or last write does not establish authority.
13. **A duplicate suspicion is not proof of duplication.** Team pair, date, venue and round are clues, not sufficient identity keys.
14. **No silent cross-scope reassignment.** Changing edition/division/team entries requires a preserved correction or replacement decision.
15. **Unknown is a valid outcome.** If the governing rule, source, authority or chronology is missing, return undetermined/review required.

## 6. Prototype defects and bounded observations

| Observation | Classification | Consequence |
|---|---|---|
| Fixture form prevents the same TeamEntry from being both home and away | Existing demo guard | A narrow self-fixture case is blocked; it does not prove all fixture integrity constraints. |
| Both TeamEntries must match the selected division | Existing demo guard | Cross-division fixture creation is blocked in this form; edition consistency still depends on the underlying division/entry data. |
| No duplicate-fixture detection exists in the inspected submit handler | Demonstrated prototype gap | Same pairing can be submitted repeatedly; a duplicate may be legitimate (leg/replay) or erroneous, so a universal auto-block would be unsafe. |
| Fixture has one date/round/venue object | Demonstrated prototype limitation | No schedule revision history or appointment authority is preserved. |
| Result submission overwrites score/source/review fields on the fixture object | Demonstrated prototype limitation | Prior result observations and correction lineage are lost within the current session state. |
| Day Operations has one match-day record per fixture in the seed | Demonstrated demo limitation | Multiple sessions, resumptions and replays cannot be represented faithfully. |
| Day Operations status includes Abandoned and Completed | Deliberate demo vocabulary | These are operational labels only; they do not implement official disposition or result authority. |
| Handoff v1 has no played-instance or authoritative result context | Documented contract boundary | It cannot serve as a general fixture-lifecycle interchange format. |

Do not “fix” these limitations by adding arbitrary state options or uniqueness rules. The correct next step is to define the domain and competition-specific authority/evidence contracts first.

## 7. Required rule/evidence packet before TAD-005 can close

For each pilot competition or format under consideration, capture:

- competition identity, governing authority, regulation title, source URL, version, publication/effective date and relevant clauses;
- definitions of fixture, round, leg, tie, replay, resumption, abandonment, postponement, cancellation, walkover and forfeit;
- who may schedule, amend, postpone, abandon, resume, order a replay, award a result, correct a score and decide an appeal;
- required notice, match sheet, referee report, organizer record, video or other evidence for each decision;
- duplicate-fixture and replacement-opponent handling;
- tie format, aggregate calculation, extra-time and shoot-out semantics;
- result confirmation, correction, appeal, reversal and effective-date rules;
- impact of a changed result on standings, player history, appearances, statistics and previously exported data;
- retention, access and safeguarding requirements for match reports, footage and player-level records.

Record examples with provenance and authority. A social post, undocumented custom, generic rule summary or source without effective date is a research lead, not a settled rule.

## 8. Outcome and next dependency

**TAD-005 remains OPEN.** The current evidence supports a useful conceptual separation between scheduled contest, schedule revision, operational session, played attempt, result observation and competition decision. It does not settle fixture identity across replay, lifecycle transitions, tie/leg grain, awarded outcomes, result authority or correction propagation.

**TAD-006 remains OPEN and dependent.** The match-instance/period/appearance multiplicity work must align with TAD-005's distinction between continuation and replay. TAD-002 remains blocked pending the required upstream decisions.

**Next action:** complete a bounded TAD-006 reconciliation against the TAD-005 vocabulary, then revisit TAD-002 only when the dependency set is ready. Do not implement a state machine from this matrix.

**Stop line:** no real fixtures/results/player data, no public result publication, no schema or uniqueness constraints, no production state machine, no mainline changes.
