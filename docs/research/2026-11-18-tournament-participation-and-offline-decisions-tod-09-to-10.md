# Tournament Participation & Offline Decisions — TOD-09 and TOD-10

**Date:** 2026-11-18  
**Status:** PROPOSED / NOT RATIFIED  
**Inputs:** ScoutSA Constitution; Player Passport Specification; Domain and Relationship Models; Tournament Organiser Adversarial Test Pack; TOD-01 to TOD-08 research briefs  
**Scope:** Relationship between tournament records and player-performance claims; minimum offline capability for the tournament workflow  
**Authority:** Research and decision support only. This document does not amend frozen governing models, ratify policy, establish legal compliance, or authorize implementation.

> Tournament record ≠ player participation. Player participation ≠ verified performance. Offline saved ≠ server accepted. Server accepted ≠ independently verified.

## 1. Executive recommendation

Resolve the final two tournament decisions narrowly:

1. **TOD-09 — Player Passport / SeasonPerformance relationship:** tournament records should not automatically create or verify player participation or performance. A team entry, fixture, accepted score or tournament placement is team/competition-level evidence. A player-level claim requires a separately attributable participation assertion, a defined subject and match/period context, a source with relevant authority, and an appropriate verification process. Reuse the existing Assertion, Evidence, Verification and SeasonPerformance semantics; do not invent a parallel truth-bearing statistics object.
2. **TOD-10 — Offline scope:** the first organizer workflow should prioritize resilient capture of tournament setup changes, team entries, fixtures and result assertions, with clear local/queued/submitted/acknowledged/disputed states. Offline capability must not silently resolve conflicts, imply server publication, bypass authority checks, or store unnecessary player data. The actual offline envelope, retention, device protections and conflict policy require external validation and security review.

Both are recommendations, not ratified decisions.

## 2. Governing constraints

The inspected repository sources establish:

- Player Passport is a persistent, club-independent football identity.
- Membership is the historical/current Player–Organization relationship; it is not a team roster.
- SeasonPerformance is period-bound and may concern a season, team, competition or defined period; source and context must remain explicit.
- Assertion, Evidence and Verification are distinct epistemic objects. A claim is not evidence, verification or truth.
- Historical records are append-oriented; corrections must not silently rewrite history.
- A team entry does not prove player identity, eligibility, consent or participation.
- A submitted score is not an independently verified result.
- Purpose-bound authorization and minimum necessary disclosure remain governing requirements.
- The Tournament Organiser adversarial pack explicitly marks all scenarios NOT RUN and requires an authorized synthetic test environment before any pass claim.
- The canonical Gate Status continues to hold implementation, RLS, migration and pilot activity.

This paper does not amend those sources or claim that an external standard has ratified its proposals.

## 3. TOD-09 — How does tournament participation relate to Player Passport and SeasonPerformance?

### 3.1 The core failure to prevent

A tournament may have a verified organizer, accepted team entries, completed fixtures and an accepted final score. None of that proves that a named player:

- was registered or eligible;
- was present;
- entered the field;
- played a particular position or number of minutes;
- scored, assisted or made another statistical contribution;
- was evaluated by an independent scout or coach.

The relationship must not be inferred from team membership, a roster upload, a team result or a tournament award.

### 3.2 Recommended evidence ladder

Treat these as distinct claims with distinct evidence requirements. The ladder is explanatory, not an automatic state machine.

| Level | Claim | Possible supporting source | What it does not prove |
|---|---|---|---|
| P0 | Team entered tournament | Accepted TournamentEntry record | Any player was involved |
| P1 | Fixture was scheduled | Fixture schedule and change history | Match took place |
| P2 | Match/result was reported | Attributable result assertion | Result is accepted or independently verified |
| P3 | Match/result was accepted under competition authority | Recorded decision and governing mandate | Any named player participated |
| P4 | Named player was reported as participating | Attributable participation assertion linked to a defined fixture and player | The claim is true or independently verified |
| P5 | Participation claim was supported/verified within a defined scope | Evidence and an authorized verification record | Every statistic or performance judgment is verified |
| P6 | Specific performance statistic or observation was asserted | Attributable claim, definition, source and match context | The statistic is accurate merely because it is recorded |
| P7 | Specific statistic/observation was verified within scope | Appropriate evidence, competent verifier and recorded method | Overall talent, future success or selection suitability |

A record may enter at a later level if reliable evidence exists; no record is required to pass through every level. Do not collapse the levels into one generic “verified player stats” badge.

### 3.3 Recommended conceptual boundary

- Tournament, TournamentEntry, Fixture and result governance remain competition-level concepts proposed in TOD-01–06.
- A player participation claim is an Assertion about a Player in a defined Fixture/competition context.
- Evidence supports or challenges that assertion; it does not automatically establish truth.
- Verification evaluates a defined claim within a defined scope, by an actor with relevant authority and evidence basis.
- SeasonPerformance remains a period-bound performance record. A tournament may provide one source/context for it, but tournament entry or team result alone must not populate player performance.
- Any aggregation or derived player view must preserve source, period, competition, verification status and known limitations.
- Corrections or disputes must invalidate/reassess dependent derived views without deleting the historical assertion or evidence.

This recommendation deliberately reuses existing semantics. It does not assert a new first-class domain concept or specify a relationship cardinality.

### 3.4 Player data and child-safeguarding boundary

For the initial organizer workflow, keep player identity and participation out of scope. If a later use case requires named player participation records:

1. identify the exact operational or sporting purpose;
2. identify the minimum fields needed for that purpose;
3. determine the applicable lawful basis and competent authority;
4. assess the relevant age/guardian and child-participation requirements;
5. define who may submit, view, challenge and verify each claim;
6. define source evidence, retention, correction and disclosure boundaries;
7. assess whether the record should be visible on the Player Passport at all.

A tournament organizer role must not grant access to Player Passport, guardian, medical, academic, transport, media or safeguarding information. A team roster is not blanket consent or proof of participation.

### 3.5 Adversarial cases

| Case | Unsafe shortcut | Expected safe treatment |
|---|---|---|
| Team wins tournament | Every listed player receives a verified win/stat | Team-level result remains separate; no player claim inferred |
| Player appears on submitted roster | Mark player as having participated | Roster is a claim/list; presence and actual participation remain unproven |
| Coach submits player statistics | Treat coach role as universal authority | Evaluate the coach's authority and evidence for this claim and context |
| Two sources report different minutes/goals | Keep the latest number | Preserve both assertions; route conflict to an authorized process |
| Match result corrected later | Leave player statistics unchanged | Reassess dependent derived records and disclose stale/disputed status |
| Player is a minor | Tournament registration unlocks Passport | Separate purpose-specific authorization, child voice and safeguarding controls |

### 3.6 Disposition

**Recommend:** tournament records may be a provenance-bearing source for later Player Passport / SeasonPerformance claims, but no automatic player-level participation or performance derivation is permitted.

**Status:** PROPOSED — NOT RATIFIED. External sporting-practice and safeguarding validation required. No model amendment or implementation authorized.

## 4. TOD-10 — What offline behaviour is essential?

### 4.1 Product question

What must remain usable when a tournament organizer has weak, intermittent or no connectivity, without turning offline mode into a second ungoverned source of truth?

Offline is not synonymous with fully autonomous operation. The workflow must make its authority and synchronization limits visible.

### 4.2 Recommended minimum offline envelope

For the first validated workflow, investigate the following capabilities in priority order:

| Capability | Candidate offline behaviour | Boundary |
|---|---|---|
| View previously loaded tournament | Read-only cached summary | Show last sync time; never imply it is current |
| Draft tournament/fixture edits | Save locally as draft/queued | Not published or authoritative until server acknowledgement |
| Team entry administration | Capture a queued team-level entry/change | Duplicate and eligibility decisions may require server/authorized review |
| Result assertion capture | Preserve a local, attributable draft with fixture reference and capture time | Not accepted, adjudicated or verified offline |
| Retry after reconnect | Safe idempotent submission | Retry must not duplicate the logical action |
| Conflicting edits | Show conflict and preserve alternatives | No silent last-write-wins or first-write-wins |
| Audit/sync status | Show local, queued, submitted, acknowledged, rejected or conflict state | Local device time is not automatically trusted server time |

Do not assume that every capability belongs in v1. Validate which ones organizers actually need.

### 4.3 Explicitly out of scope until separately justified

- Offline access to Player Passport or guardian records.
- Offline media capture/upload involving minors.
- Offline viewing of medical, academic, transport or safeguarding information.
- Offline adjudication of disputed results.
- Offline granting/revoking organizer authority.
- Offline publication of standings or verified player statistics.
- Background location tracking or continuous sensor collection.
- Unbounded retention of queued data on shared devices.

### 4.4 Required synchronization semantics

A future design must distinguish at least:

- **LOCAL_DRAFT:** stored on this device only.
- **QUEUED:** awaiting transmission.
- **SUBMITTED:** transmission attempted; server acknowledgement not yet confirmed.
- **ACKNOWLEDGED:** server confirms receipt, not necessarily acceptance.
- **REJECTED:** server or authorized process declined the submission; reason retained where safe.
- **CONFLICT:** competing changes require review.
- **ACCEPTED / VERIFIED:** separate domain decisions, never implied by sync state.

These are candidate labels for review, not a ratified state machine.

A successful network request is not proof that the underlying assertion is true. Acknowledgement is a transport/receipt fact, not adjudication.

### 4.5 Failure modes that must be tested

1. Device loses power while a draft is being saved.
2. App is terminated after local save but before submission.
3. User retries after a timeout when the server may already have received the action.
4. Two devices edit the same fixture offline.
5. Organizer authority expires or is revoked while a device is offline.
6. Tournament or fixture is cancelled/rescheduled elsewhere while a device retains stale data.
7. Device clock is wrong or changed.
8. Shared device is lost, borrowed or accessed by another person.
9. Storage is full or local data becomes corrupted.
10. A queued result arrives after a newer correction or dispute.
11. User signs out or loses access while queued records remain.
12. A low-data connection makes repeated retries costly.

### 4.6 Minimum evidence before any offline claim

A test report must record exact app/build/commit, device and OS, network conditions, fixture data, steps, expected and observed outcomes, logs, and evidence references.

Required test families:

- airplane mode and reconnect;
- packet loss, latency and timeout;
- process kill/restart and device restart;
- duplicate retry/idempotency;
- two-device conflict;
- stale schedule and revoked authority;
- wrong device clock;
- storage exhaustion/corruption;
- logout/shared-device access;
- payload size and data consumption;
- local data protection and deletion/retention behaviour.

All tests must use synthetic data in an explicitly authorized environment. A test design is not a test result.

### 4.7 Security and privacy questions before local storage

Offline persistence introduces a device-level risk surface. Before selecting storage or promising offline security, determine:

- data classification for every locally stored field;
- whether the device is personal, shared or organization-managed;
- platform backup/synchronization behaviour;
- encryption-at-rest and key-management assumptions;
- app lock/session expiry and logout semantics;
- what happens on account revocation or device loss;
- local retention and deletion rules;
- whether queued records can be inspected or exported by another device user;
- whether any personal or child data can be excluded entirely.

Do not claim local encryption, secure deletion, POPIA compliance or device compromise resistance without implementation evidence and qualified review.

### 4.8 Disposition

**Recommend:** validate a narrow offline-first capture-and-sync experience for team/tournament operations only. Treat local drafts as non-authoritative; preserve competing edits; require server-side authority and adjudication; exclude player personal data from the first offline scope.

**Status:** PROPOSED — NOT RATIFIED. No implementation or storage design authorized.

## 5. External validation plan

The next evidence should come from actual Vaal/Sedibeng tournament operations rather than additional desk-only reasoning.

### Witnesses to seek

- Tournament organizers who operate events in areas with inconsistent connectivity.
- Team/coach representatives who submit and challenge results.
- A league/LFA or other relevant competition authority where available.
- A safeguarding/privacy practitioner for any proposed player-level data flow.
- A technical reviewer familiar with mobile offline synchronization and shared-device risks.

### Questions for TOD-09

1. What records do organizers actually retain to establish who participated in a match?
2. Are team sheets, referee reports, substitutions or signed score sheets used? Which source is authoritative in ordinary and disputed cases?
3. Which player statistics are routinely recorded, by whom, and for what purpose?
4. How are errors or disputes corrected after a tournament?
5. Would a tournament-level record be useful without named player statistics?
6. What evidence would a coach, academy or scout actually trust, and what would they treat as self-report?

### Questions for TOD-10

1. Where and when does connectivity fail during tournament operations?
2. Which tasks must continue without a connection?
3. What information is currently captured on paper, WhatsApp or spreadsheets during outages?
4. What is the cost of losing an entry, fixture change or result submission?
5. Are devices shared among organizers or volunteers?
6. How often do two people update the same record?
7. What mobile data and battery constraints matter in practice?
8. Which functions can safely wait until connectivity returns?

### Evidence discipline

- An interview establishes what that witness reports, not a national standard.
- A sample score sheet establishes what that artifact contains, not that every competition uses it.
- A demonstration establishes behaviour only for the exact build and test conditions.
- Contradictory practices must be retained rather than averaged into a false universal rule.
- Legal and safeguarding interpretation requires qualified South African review.

## 6. Proposed decision register

| ID | Proposed direction | Status |
|---|---|---|
| TOD-09 | Tournament records can support later player claims, but team entry/results never automatically establish player participation or verified performance; reuse Assertion/Evidence/Verification/SeasonPerformance semantics | PROPOSED — NOT RATIFIED |
| TOD-10 | Validate narrow team/tournament-level offline capture and sync; local state is non-authoritative; preserve conflicts; no offline player data in initial scope | PROPOSED — NOT RATIFIED |

## 7. Cross-decision implications

Together, TOD-01 to TOD-10 describe a coherent candidate workflow:

1. A tournament is created by an actor whose specific mandate has been checked.
2. Teams are identified separately from organizations.
3. Team entries are recorded without inferring player participation.
4. Fixtures are scheduled and their changes retained.
5. Result assertions are submitted with provenance.
6. Conflicts and corrections follow explicit authority and review.
7. Offline capture preserves drafts without claiming server acceptance or truth.
8. Player Passport / SeasonPerformance claims are separate, evidence-bearing and purpose-bound.
9. Only after a separately governed player-data purpose exists may player-level information be considered.

The product should first prove that it can help organizers administer a competition with team-level data alone.

## 8. Gate and next action

**Current decision:** RESEARCH / EXTERNAL VALIDATION ONLY.

- No new semantic concept is ratified.
- No Constitution, Domain Model, Relationship Model, ERD, MVP boundary or schema amendment.
- No SQL, migration, RLS, API, UI, authentication or production implementation.
- No offline storage mechanism or security claim is authorized.
- No real player data or player-level tournament participation processing is authorized.
- All six adversarial scenarios remain NOT RUN unless separate execution evidence is produced.
- Canonical Gate Status remains authoritative.

**Next controlled action:** validate actual tournament record practices and offline constraints with a small, diverse set of Vaal/Sedibeng stakeholders. Record source, date, role, artifact, claim, contradiction and limitation. Return only material findings to the existing governance process.

**Stop condition:** if tournament utility depends on collecting player personal data, making unverified player claims, or silently resolving offline conflicts, stop and reopen the specific decision with evidence. Do not code around it.

**Final principle:** make tournament administration useful first; let player-performance claims earn their way into the Passport through evidence, authority and purpose—not convenience.


## 9. External source check — important qualification to TOD-09

A limited public-source check found that some formal competition rules define a team-sheet entry as participation for the purposes of that competition's own regulations. This is a material qualification: ScoutSA must not impose one universal definition of participation across all competitions.

- **SAFA Competitions Uniform Rules (approved 25 June 2016), clauses 10.1–10.2 and 11:** the published rules require team sheets and state that a player's appearance on the team sheet is deemed participation for the purposes of those rules, subject to a pre-kickoff amendment exception. The same document links eligibility to player registration. Source: https://www.safa.net/wp-content/uploads/2017/03/SAFA-COMPETITIONS-UNIFORM-RULESapproved25June2016.pdf
- **Engen Knockout Challenge 2025 tournament rules:** the organizer's published rules specify roster requirements and competition-specific player eligibility and protest rules. Source: https://engensports.co.za/engen-knockout-challenge-tournament-rules-2025/
- **Tshwane Regional Football Association governance page:** publishes team-sheet, match-summary and match-incident templates alongside regional and SAFA rules, illustrating that operational record types can be competition/association-specific. Source: https://tshwanerfa.org.za/governance/

### Revised interpretation

The earlier evidence ladder is a safety model for ScoutSA's claims, not a claim that every football authority uses the same evidentiary definition. A competition's own valid rules may define a team-sheet entry as a formal participation status for that competition. ScoutSA may record that **rule-defined status** only when it has the applicable competition rules, version, scope, effective period and authoritative record. It must label the basis precisely (for example, “deemed participated under [competition rule/version]”), rather than silently translating it into independently witnessed physical attendance, minutes played, or verified performance statistics.

Accordingly:

1. A team-sheet entry can support a competition-specific participation determination where the governing rules expressly say so and the relevant record is authoritative.
2. It does not automatically prove actual minutes played, starting status, substitutions, goals, assists, or any other statistic not established by that rule or separate evidence.
3. The definition may differ between SAFA official competitions, affiliated regional competitions, private tournaments and grassroots events. Applicability must be checked per event; the 2016 SAFA document must not be assumed to govern every current tournament.
4. A tournament-level result still does not establish every listed player's individual performance.
5. The system must preserve the exact rule/source and the difference between a rule-defined participation status, an observed event, an assertion, and a verified performance claim.

This source check strengthens the need for competition-specific rule provenance; it does not authorize player-level data collection or processing. The source documents are leads for stakeholder/legal validation, not a legal opinion or proof of current applicability to any particular Vaal tournament.

## 10. Evidence limitations and offline research status

The public-source check did not establish the actual offline/connectivity conditions of Vaal/Sedibeng tournament organizers. TOD-10 remains an unvalidated product hypothesis. No field interviews, device tests, connectivity measurements, mobile-data measurements or offline prototypes were conducted.

The next useful evidence is direct observation/interview with organizers using their existing paper, WhatsApp or spreadsheet processes, followed—only if separately authorized—by synthetic fault-injection tests. Do not infer offline requirements from geography alone.
