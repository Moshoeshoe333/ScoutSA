# Tournament Architecture Decision Register

**Status:** Internal decision register · NOT RATIFIED · no implementation authority  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026  
**Companion:** [Tournament Data Architecture Draft](TOURNAMENT-DATA-ARCHITECTURE-DRAFT.md)

## 1. Purpose and control

This register converts the open seams across ScoutSA's tournament proposals into individually traceable decisions. It is intended to prevent an implementation convenience, demo shape or imported payload from becoming an unapproved domain rule.

It is subordinate to the Constitution, canonical Domain Model and frozen Gate 2 Relationship Model. A decision that changes their semantics must return to the relevant governance process; this register cannot ratify it.

**No schema, migration, database, RLS, API, authentication, shared persistence, real-data ingestion, publication or external contact is authorized here.**

### Decision states

- **OPEN:** no decision has been ratified.
- **PROPOSED:** a candidate direction is recorded for review; not binding.
- **BLOCKED:** a required authority, evidence, policy or legal determination is absent.
- **READY FOR GOVERNANCE:** the question and options are sufficiently framed for a formal decision; this is not approval.
- **RATIFIED:** only after an explicit, attributable governance decision is recorded in the governing artifact.
- **DEFERRED:** intentionally not required for the current synthetic prototype scope.

### Evidence discipline

A prototype behavior is evidence that a particular demo path exists, not evidence that the underlying rule is correct. External silence is neither approval nor validation. Each decision must retain the source documents reviewed, options considered, decision authority, rationale, effective scope, date, and any supersession history.

## 2. Priority map

| Priority | Meaning | Decisions |
|---|---|---|
| P0 — relationship contract | Must be resolved before a coherent conceptual tournament ERD can be proposed | TAD-001 to TAD-006 |
| P1 — operational trust | Must be resolved before real event/statistic/eligibility workflows or external pilot | TAD-007 to TAD-011 |
| P2 — production controls | Must be resolved before production data processing or deployment | TAD-012 to TAD-014 |

Priority is a sequencing aid, not a claim that lower-priority items are optional.

## 3. Decision register

### TAD-001 — Canonical tournament edition identifier

**Priority:** P0  
**Status:** READY FOR GOVERNANCE  
**Question:** Should the canonical conceptual identifier be `edition_id` or `tournament_edition_id`?

**Observed evidence:** The tournament relationship proposal uses `edition_id`; the organizer portal proposal uses `tournament_edition_id`; the working organizer JSON handoff and Tournament Manager use `editionId`. The evidence indicates one intended edition concept with inconsistent proposal terminology, not two demonstrated identities. See [Tournament Identifier Crosswalk](TOURNAMENT-IDENTIFIER-CROSSWALK.md).

**Options:**
- A. Use `edition_id` consistently in the conceptual model and define explicit versioned mappings for historical payload fields.
- B. Use `tournament_edition_id` consistently everywhere.
- C. Preserve both as distinct identifiers (not recommended absent a distinct domain meaning).

**Candidate recommendation:** A, because it is concise and already used by the organizer handoff contract. This is a naming recommendation only; it does not change identity semantics.

**Decision authority required:** ScoutSA domain-model owner / governance ratifier.  
**Evidence reviewed:** current proposal documents, organizer handoff export, Tournament Manager import/validation and canonical root models are inventoried in the crosswalk. The inspected payloads use `editionId`; no production payload or persisted-data compatibility requirement was identified. **Governance action:** accept or reject the conceptual naming recommendation; do not infer production migration or compatibility work.  
**Impact if unresolved:** duplicate terminology, brittle imports and inconsistent foreign-key documentation.  
**Stop condition:** do not create or migrate production fields until one canonical name and any compatibility mapping are ratified.

### TAD-002 — Canonical fixture-scoped player join

**Priority:** P0  
**Status:** BLOCKED  
**Question:** Does fixture-scoped player participation have an independent domain lifecycle that warrants `match_participation_id`, or is `fixture_id + participation_id` sufficient?

**Observed evidence:** The relationship proposal alone defines `match_participation_id`; Tournament Manager statistics, Statistic Reconciliation, Day Operations, Player Tournament History and handoff v1 use `fixtureId + participationId`. Handoff v1 allows one lineup per participation per fixture. TAD-006 distinguishes fixture from played match instance/attempt and permits multiple appearance intervals as a candidate where rules allow. If one fixture has multiple distinct played attempts, `fixture_id + participation_id` cannot distinguish the same registration's involvement in each attempt. See [Tournament Identifier Crosswalk](TOURNAMENT-IDENTIFIER-CROSSWALK.md), [Match Participation and Match-Day Multiplicity Crosswalk](MATCH-PARTICIPATION-MATCH-DAY-MULTIPLICITY-CROSSWALK.md), and [Match Participation Grain and Identity Crosswalk](MATCH-PARTICIPATION-GRAIN-DECISION-CROSSWALK.md).

**Options:**
- A. Introduce a canonical fixture-scoped MatchParticipation relationship record; events and statistics reference it, while fixture and participation remain validated context.
- B. Use the composite pair `fixture_id + participation_id` as the sole relationship identity.
- C. Allow either shape in different modules (not recommended; increases ambiguity).

**Candidate recommendation:** keep `fixture_id + participation_id` only as the synthetic v1 transport/context pair. For governance discussion, test the conceptual grain as one PlayerParticipation's involvement in one played match instance; the candidate uniqueness context is therefore `match_instance_id + participation_id`, conditional on TAD-004/005/006. Do not introduce a surrogate `match_participation_id` unless the approved relationship has an independent lifecycle or needs stable references for evidence/review records. This is not a ratified key, entity or schema.

**Decision authority required:** Domain-model owner / governance ratifier; technical architecture review after semantic approval.  
**Evidence still required:** ratified definition of played match instance and fixture lifecycle (TAD-005/006); PlayerParticipation cardinality/effective periods (TAD-004); whether MatchParticipation has an independent status/role/eligibility lifecycle; how continuation/replay is represented; and source correction/review semantics. The new grain crosswalk frames the options but does not close these dependencies. The current synthetic pair remains transport/context only.  
**Impact if unresolved:** event/stat joins can disagree across modules; corrections and match history become harder to scope.  
**Stop condition:** no schema key, uniqueness constraint, payload expansion or importer adapter until entity meaning, cardinality and correction semantics are ratified.

### TAD-003 — Organizer identity and authority relationship

**Priority:** P0  
**Status:** BLOCKED  
**Question:** Is Organizer an existing Organization acting through an authorized representative, a distinct event-organizer identity, or both under explicit relationship semantics?

**Observed evidence:** The canonical Domain Model defines Organization as a football-related institution/body (including SCHOOL, CLUB, ACADEMY, UNIVERSITY, LFA, LEAGUE and OTHER), while the canonical Relationship Model's G2-SEAM-02 explicitly leaves User↔Organization affiliation/authorization unresolved and rejects role-implied authority. The tournament relationship proposal calls Organizer an Organization identity plus authority evidence; the portal model separates organizer identity, authority, submission, feature permission and publication, but still gives Organizer its own identity key. See [Organizer Identity and Authority Crosswalk](ORGANIZER-IDENTITY-AUTHORITY-CROSSWALK.md).

**Options:**
- A. Reuse Organization and model organizer capacity as a scoped relationship/role with attributable representative authority.
- B. Retain a distinct Organizer entity linked to Organization where applicable.
- C. Treat Organizer as a display label only (insufficient for authority-bearing operations).

**Candidate recommendation:** Prefer A as a conceptual boundary: reuse canonical Organization for the enduring institutional identity; treat Organizer as an event-scoped capacity/role; distinguish the submitting User from the Organization represented; and assess representative authority separately with evidence, scope and time. Do not create a second Organizer identity by default. This remains a candidate only: independent individual organizers, affiliation cardinality, delegation and authority lifecycle are unresolved under G2-SEAM-02.

**Decision authority required:** Domain governance plus operational/legal review of entity and representative authority.  
**Evidence reviewed:** canonical Organization definition, G2-SEAM-02, tournament relationship proposal, organizer portal model and synthetic handoff boundary are crosswalked in the companion document. **Evidence still required:** real-world operating examples for independent organizers and institutional representatives; permitted actor/organization cardinalities; delegation, scope, expiry, revocation, dispute and appeal rules; acceptable authority evidence and responsible review authority.  
**Impact if unresolved:** duplicate organizations, false authority assumptions, or event submissions attributed to the wrong legal/operating body.  
**Stop condition:** no real organizer verification, submission authorization or public event listing based solely on a linked account or organization name.

### TAD-004 — Team entry and player participation cardinality

**Priority:** P0  
**Status:** OPEN  
**Question:** What are the permitted multiplicities and lifecycle rules for TeamEntry and PlayerParticipation within one edition/division?

**Observed evidence:** The relationship and architecture proposals bind Player Participation to Team Entry and propose one Team Entry to many participations. The eligibility model scopes review to participation/division/edition. Tournament Manager creates a new Team ID and Team Entry together for each registration and a new Player ID for every participation; it cannot reuse Team or Player identities to demonstrate cross-division entries, dual registration or transfers. Its alias and shirt-number checks are local demo constraints only. The canonical Domain Model establishes stable Player identity and Organization–Player Membership, but does not ratify a Team/Team Entry cardinality contract. See the [Team Entry and Player Participation Cardinality Crosswalk](TEAM-ENTRY-PLAYER-PARTICIPATION-CARDINALITY-CROSSWALK.md).

**Options:**
- A. Enforce one active Player Participation per Player per edition.
- B. Permit multiple participation records where distinct team-entry/competition contexts allow them, with competition-scoped overlap and effective-period rules.
- C. Allow multiple records but leave conflicts to manual review without defined scope or lifecycle rules.

**Candidate recommendation:** B is the more expressive candidate, but it is not ratified. Define uniqueness and active-overlap constraints only at the exact scope established by the relevant competition rules. Keep Team identity separate from Team Entry only if the canonical domain owner ratifies that distinction. Separate registration, roster status, eligibility review, player/guardian permission, fixture selection and appearance.

**Decision authority required:** Domain governance for Team/Team Entry/Player Participation semantics; competition-rule owner for each real competition; privacy/safeguarding authority before real player/minor processing.  
**Evidence reviewed:** tournament relationship/architecture proposals, Tournament Manager seed and form handlers, eligibility review model, Day Operations, Match-Day Handoff, Player Tournament History and canonical root models. **Evidence still required:** representative regulations and edge cases for multi-division entries, guest players, dual registration, transfers/loans, age-group movement, replacement, registration windows, withdrawal/reinstatement, roster limits, identity conflicts, effective periods and appeals.  
**Impact if unresolved:** duplicate or contradictory registrations, incorrect team/player histories, invalid roster/fixture relationships, or false assumptions about eligibility and permission.  
**Stop condition:** do not enforce global one-player/one-team or one-team/one-division assumptions; do not infer identity from aliases; do not treat demo roster state as official registration or eligibility; no real player/minor processing or production constraints.

### TAD-005 — Fixture consistency and lifecycle

**Priority:** P0  
**Status:** OPEN  
**Question:** What is the canonical fixture relationship and lifecycle for division, edition, team entries, schedule changes, legs, postponements, walkovers, abandoned matches and replays?

**Observed evidence:** The relationship proposal defines Fixture by fixture_id, division_id and home/away team-entry references. The architecture draft proposes that both entries resolve to the same edition/division context, subject to ratification. Tournament Manager stores date, round, venue, scores, result source and result review state together in one synthetic fixture. Day Operations separately stores a session-only match-day status and assumes one simple configured duration. The handoff v1 is fixture-scoped and explicitly has no authoritative result or competition context. The proposals explicitly leave walkovers, abandoned/replayed fixtures, multi-leg ties and match-day multiplicity unresolved. See the [Fixture Consistency and Lifecycle Crosswalk](FIXTURE-CONSISTENCY-LIFECYCLE-CROSSWALK.md).

**Options:**
- A. One fixture is one scheduled contest; schedule amendments and result corrections are versioned against it, while exceptional play/outcomes are governed by competition rules.
- B. A fixture groups one or more played match instances/legs, each with its own sourced record and lifecycle.
- C. Model every interruption, replay, leg and administrative outcome as an unrelated new fixture.

**Candidate recommendation:** Preserve a stable scheduled-contest identity for schedule-only changes, but distinguish schedule revision, operational match-day session, actual played match instance, result observation and competition decision. Keep each leg's result separate from any tie-level aggregate. Treat awarded walkover/forfeit outcomes separately from played scores. Whether an ordered replay shares fixture identity or creates a new fixture, and the exact cardinalities, must be decided by the applicable competition rules. These are candidate boundaries only, not ratified entities.

**Decision authority required:** Domain governance and competition-rule owner for each competition; match operations/referee expertise for played-instance and result semantics.  
**Evidence reviewed:** tournament relationship and architecture proposals, Tournament Manager synthetic fixture record, Tournament Intelligence fixture display, Day Operations model/UI, Match-Day Handoff v1, Player Tournament History and Statistic Reconciliation. **Evidence still required:** published regulations and dated examples for postponement, cancellation, resumption, abandonment, replay, walkover, forfeit, multi-leg ties, aggregate progression, extra time, result correction, appeals and duplicate fixture detection.  
**Impact if unresolved:** duplicate or contradictory fixtures, incorrect standings and history, fabricated appearances/statistics, overwritten results and ambiguous downstream scouting evidence.  
**Stop condition:** no production fixture state machine or uniqueness constraints; do not equate operational status with an authoritative result; no invented replay/walkover/abandonment rules; no real match/player data or production implementation.

### TAD-006 — Match participation and match-day multiplicity

**Priority:** P0  
**Status:** OPEN  
**Question:** Can one fixture have multiple operational sessions, played attempts, playing periods or venues, and what is the correct grain for player participation and appearance intervals?

**Observed evidence:** Day Operations creates/updates one session-only match-day record per fixture in its current workflow; the handoff exports `days[0]`, one configured duration and one continuous entry/exit interval per participation. Handoff v1 permits one lineup row per participation per fixture. The Day Operations model explicitly leaves multiple sessions, abandoned/restarted segments and return substitutions open. The Player Tournament History sample is a fixed synthetic snapshot and does not prove shared state. IFAB Laws of the Game 2026/27 distinguish playing periods and extra time, place substitute limits/extra-time allowances under competition rules, and permit return substitutions only in specified categories subject to national-association/confederation/FIFA agreement. IFAB Law 7 states an abandoned match is replayed unless competition rules or organisers determine otherwise. These are a baseline only; no target South African competition rule has been validated. See [Match Participation and Match-Day Multiplicity Crosswalk](MATCH-PARTICIPATION-MATCH-DAY-MULTIPLICITY-CROSSWALK.md).

**Options:**
- A. One match-day record and one appearance interval per fixture (reject as a universal model; current demo does not prove it).
- B. Multiple operational session/segment records under a fixture, with all play records still fixture-scoped (more flexible but may conflate replay with continuation).
- C. Distinguish fixture, operational session, played match instance/attempt, playing periods, shoot-out phase and player appearance intervals; link attempts to the fixture under competition decisions.

**Candidate recommendation:** C is the preferred conceptual direction for governance discussion only. Keep administrative session, played attempt, period/segment and shoot-out distinct. A player may have multiple appearance intervals within a match instance where applicable rules permit, without automatically requiring multiple participation identities. Resolve the MatchParticipation grain jointly with TAD-002 before defining uniqueness or keys. No new entity/key is ratified.

**Decision authority required:** Domain governance and the applicable competition-rule owner; referee/match-operations expertise for real records.  
**Evidence required:** applicable South African competition regulations and rule versions; authority for return substitutions, extra time, temporary dismissals, abandonment/resumption/replay; actual examples for multiple sessions/venues, stints and timekeeping; clock and correction semantics.  
**Impact if unresolved:** incorrect minutes, ambiguous event chronology, duplicate/overwritten attempts and false claims about official appearances.  
**Stop condition:** retain the current simple calculation as synthetic-demo-only; no universal one-session/one-attempt/one-interval rule or official minutes claims; no real match/player data processing or implementation.

### TAD-007 — Source, evidence and provenance model

**Priority:** P1  
**Status:** OPEN  
**Question:** What is the canonical relationship between Source, Evidence, Assertion, Verification, Event/Statistic Observation and Review Decision?

**Observed evidence:** Tournament modules use source IDs/labels; canonical domain semantics distinguish Evidence, Assertion, Verification and derived state. The handoff contract has source references but no authenticity, hash, trusted timestamp or source artifact capture.

**Options:**
- A. Treat source as a provenance locator, Evidence as a domain artifact/record, Assertion as a claim, Verification as a scoped assessment, and ReviewDecision as an attributable disposition.
- B. Collapse source and evidence into one generic record.
- C. Store source labels on each row with no common provenance model.

**Candidate recommendation:** A, consistent with the root Domain Model. Exact entity boundaries and storage are still to be designed.

**Decision authority required:** Domain governance; privacy/security/legal review for source artifact handling.  
**Evidence required:** source types, permitted claims, provenance capture, retention, integrity and verification examples.  
**Impact if unresolved:** source labels may be mistaken for evidence, evidence for verification, or review for truth.  
**Stop condition:** no real source ingestion or “verified” label until evidence scope, authority and provenance rules are approved.

### TAD-008 — Metric definition governance

**Priority:** P1  
**Status:** OPEN  
**Question:** Who defines and versions metric meanings, units, context, denominator, competition-specific rules and comparability?

**Observed evidence:** Reconciliation model requires metric definitions and units; examples distinguish counts, duration and percentages with denominators. It warns against merging incompatible definitions.

**Options:**
- A. ScoutSA owns a canonical metric dictionary, with competition/provider-specific mappings and versioned definitions.
- B. Each competition/provider owns its definitions; ScoutSA stores source-specific definitions and maps only where equivalence is demonstrated.
- C. Use informal labels and normalize later.

**Candidate recommendation:** B with a carefully governed ScoutSA canonical vocabulary for display/analysis only where semantic equivalence is evidenced. Do not imply two providers' “assist” or “tackle” definitions are equivalent.

**Decision authority required:** Product/domain governance plus football-statistics subject-matter review; competition/provider authority for their own official definitions.  
**Evidence required:** official rules, source documentation, metric units, denominators, role/context and correction policies.  
**Impact if unresolved:** invalid comparisons, misleading player history and unsupported performance conclusions.  
**Stop condition:** no cross-provider aggregation, ranking or talent score from unharmonized observations.

### TAD-009 — Statistic reconciliation and correction lifecycle

**Priority:** P1  
**Status:** OPEN  
**Question:** How are conflicts, duplicate candidates, late corrections, appeals, rescinded events and superseding decisions preserved?

**Observed evidence:** Reconciliation proposal separates events, statistical observations, findings and review decisions. It explicitly states review must not mutate source observations; correction needs a separate attributable versioned action.

**Options:**
- A. Immutable source observations plus append-only correction/adjudication records.
- B. Mutable current value plus retained audit history.
- C. Replace disputed values with the newest submitted value.

**Candidate recommendation:** A is the strongest provenance-preserving design hypothesis. Whether technical append-only controls are required and how corrections affect derived views require separate review.

**Decision authority required:** Domain governance; security/audit architecture; competition authority for official result/stat corrections.  
**Evidence required:** correction and appeal scenarios, actor authority, effective time vs recorded time, supersession and downstream recalculation rules.  
**Impact if unresolved:** silent history rewriting, stale totals and disputed claims appearing authoritative.  
**Stop condition:** no destructive overwrite or automatic conflict resolution; preserve the original synthetic observations.

### TAD-010 — Eligibility rule and decision authority

**Priority:** P1  
**Status:** BLOCKED  
**Question:** Who owns each competition's eligibility rule, cut-off date, accepted evidence, exceptions, decision, appeal and effective period?

**Observed evidence:** Eligibility prototype links review to PlayerParticipation, TeamEntry, Division and Edition. It correctly states “eligible for human review” is not eligibility, selection or trial readiness and does not collect DOB/identity documents.

**Options:**
- A. Competition authority supplies and owns rules; ScoutSA records scoped review and evidence references.
- B. ScoutSA authors generalized rules for all competitions.
- C. Infer eligibility from profile attributes and demo logic.

**Candidate recommendation:** A. Competition-specific rule authority cannot be replaced by a generic ScoutSA assumption.

**Decision authority required:** Relevant competition rule owner; legal/privacy/safeguarding review for real personal data; authorized human reviewer.  
**Evidence required:** dated rules, exact cut-off, exception policy, evidence acceptance, reviewer authority, challenge/appeal and retention rules.  
**Impact if unresolved:** wrongful exclusion/admission, sensitive data exposure and false eligibility claims.  
**Stop condition:** no real eligibility decision, DOB processing or minor workflow from the prototype.

### TAD-011 — Organizer feature permission, media rights and listing lifecycle

**Priority:** P1  
**Status:** BLOCKED  
**Question:** What instrument grants ScoutSA permission to feature an event, and how are scope, duration, revocation, media rights, review, publication and removal separated?

**Observed evidence:** Organizer model correctly distinguishes submission from feature permission and feature permission from rights to publish player images, marks or third-party content. Listing publication remains disabled in the prototype.

**Options:**
- A. Separate scoped event-feature permission, content/media rights and public listing approval/lifecycle.
- B. Treat organizer submission as implicit permission to publish event details.
- C. Treat a public social post as permission to republish.

**Candidate recommendation:** A. A submission, public post or event existence does not establish publication rights.

**Decision authority required:** Organizer's authorized representative for granted scope; ScoutSA publication approver; legal review for rights, privacy and takedown requirements.  
**Evidence required:** permission instrument, content ownership/licensing, duration, territory/channel, revocation, expiry, correction and removal procedures.  
**Impact if unresolved:** unauthorized publication, misrepresentation or reuse of protected content.  
**Stop condition:** no public listing, media reuse or outbound organizer contact based solely on demo records.

### TAD-012 — Access, safeguarding and purpose boundaries

**Priority:** P2  
**Status:** BLOCKED  
**Question:** Which actors may create, view, correct, export or disclose each tournament/player record, for which purpose and under which guardian/player authority?

**Observed evidence:** Root domain requires scoped authority, purpose-specific consent and safeguarding boundaries. Tournament proposals prohibit real minor data and direct private contact. No authentication, RLS, tenant isolation or production access policy exists.

**Options:**
- A. Define purpose-specific permissions at record/action level, with separate player/guardian and organizational authority checks.
- B. Use broad role-based access only.
- C. Rely on UI hiding and frontend checks.

**Candidate recommendation:** A as a design requirement, with server-enforced authorization and independent review before any real data. Exact policy is not yet defined.

**Decision authority required:** Domain governance; privacy/legal and child-safeguarding expertise; security architecture.  
**Evidence required:** actor/action matrix, data classification, guardian/child authority scenarios, organizational tenant boundaries, disclosure/recipient checks, revocation and incident paths.  
**Impact if unresolved:** unauthorized access, disclosure or contact; a technical link may be mistaken for permission.  
**Stop condition:** no real player/minor data, external sharing, private contact or production endpoint.

### TAD-013 — Retention, correction and deletion semantics

**Priority:** P2  
**Status:** BLOCKED  
**Question:** How long are tournament, player participation, source, evidence, match, review and audit records retained, and how are correction, restriction, archival and deletion handled?

**Observed evidence:** Canonical domain calls for retention state and historical provenance; tournament proposals identify missing retention, privacy and correction policies. No production retention system exists.

**Options:**
- A. Define record-class retention schedules and legal holds, with privacy-aware correction/restriction/deletion processes.
- B. Retain everything indefinitely for historical analytics.
- C. Delete records whenever a profile or organization is removed.

**Candidate recommendation:** A. Neither indefinite retention nor cascading deletion is safe to assume.

**Decision authority required:** Privacy/legal review and domain governance; security/data stewardship.  
**Evidence required:** purposes, record classes, applicable legal obligations, retention periods, subject rights, disputes, legal holds, backup and derived-data treatment.  
**Impact if unresolved:** unlawful/excessive retention, loss of required evidence or broken historical relationships.  
**Stop condition:** no real personal/evidence data retention until approved schedules and deletion/restriction semantics exist.

### TAD-014 — Import, versioning and conflict handling

**Priority:** P2  
**Status:** OPEN  
**Question:** How should versioned module handoffs be imported, deduplicated, retried, rejected, reconciled and audited once shared persistence exists?

**Observed evidence:** Current Organizer and Match-Day contracts are manual synthetic file transfers between isolated pages. Their validation is structural; no authentication, package authenticity, idempotency store, shared state or trusted timestamp exists.

**Options:**
- A. Versioned server-side contract adapters with idempotency keys, source identity, authorization, schema validation and explicit conflict records.
- B. Blind upsert by supplied IDs.
- C. Continue manual file transfer as the production integration model.

**Candidate recommendation:** A as a future design hypothesis only. Contract versioning and ID mapping must be defined before adapter implementation.

**Decision authority required:** Technical architecture owner; domain governance for conflict semantics; security review for identity/authenticity and authorization.  
**Evidence required:** retry/replay scenarios, duplicate submissions, stale package versions, cross-tenant attacks, partial failure, schema migration and conflict-resolution cases.  
**Impact if unresolved:** duplicated records, stale overwrites, cross-event contamination and untraceable import decisions.  
**Stop condition:** current handoff remains synthetic/manual; no production import or sync until contract and security controls are ratified.

## 4. Dependency map

| Decision | Depends on | Blocks |
|---|---|---|
| TAD-001 | Identifier inventory | Consistent model and contract naming |
| TAD-002 | TAD-004, TAD-006 | Canonical match-event/stat joins |
| TAD-003 | Organization domain and authority model | Organizer onboarding and event submission |
| TAD-004 | Competition participation rules | Team-entry and player-registration constraints |
| TAD-005 | Edition/division and competition lifecycle | Fixture identity/state and results |
| TAD-006 | TAD-005, match rules | Match participation, appearance and minute derivation |
| TAD-007 | Root Evidence/Assertion/Verification semantics | Source ingestion and verification claims |
| TAD-008 | Competition/provider metric rules | Comparable statistics and aggregates |
| TAD-009 | TAD-007, TAD-008 | Corrections, disputes and trusted history |
| TAD-010 | TAD-003, TAD-004, TAD-007, TAD-012 | Real eligibility review |
| TAD-011 | TAD-003, TAD-012 | Public organizer/event listing |
| TAD-012 | Domain authority, consent and safeguarding | Any real player data or disclosure |
| TAD-013 | TAD-007, TAD-012 | Real-data retention and deletion |
| TAD-014 | TAD-001 to TAD-003, TAD-007, TAD-012 | Shared imports and synchronization |

## 5. Recommended decision sequence — dependency-corrected

The sequence below follows the dependency map above. Investigation may run in parallel, but a dependent decision must not be closed before its prerequisites are resolved.

1. **TAD-001:** identifier inventory and naming; prepare for governance.
2. **TAD-003:** reconcile Organizer with canonical Organization and resolve the authority-model dependency before organizer workflows.
3. **TAD-004:** establish Team/TeamEntry and PlayerParticipation cardinality from canonical semantics and applicable competition rules.
4. **TAD-005:** establish fixture identity and lifecycle against edition/division/entry context and competition rules.
5. **TAD-006:** establish operational session, played attempt, periods and appearance intervals; depends on TAD-005.
6. **TAD-002:** finalize MatchParticipation grain and statistic/event join path only after TAD-004 and TAD-006; these are its declared prerequisites.
7. **TAD-007 and TAD-008:** govern provenance and metric definitions before source reconciliation relies on them.
8. **TAD-009:** govern correction and adjudication using TAD-007 and TAD-008.
9. **TAD-012:** establish purpose-bound access and safeguarding controls before any real player data or disclosure.
10. **TAD-010 and TAD-011:** eligibility and publication decisions depend on the relevant authority, provenance and access controls.
11. **TAD-013 and TAD-014:** retention and shared-import controls depend on the evidence, access and identity foundations above.

This ordering is a planning correction, not a ratified domain decision. No item is closed by appearing in this sequence.

## 6. Current recommendation and stop line

The register is ready for internal review, not ratification. The first low-risk decisions to prepare for formal resolution are TAD-001 and TAD-002. TAD-003 through TAD-006 need explicit domain/competition decisions. P1/P2 items require relevant subject-matter, legal, privacy, safeguarding or security authority before real-world processing.

**Do not build a production ERD or database from this register yet.** A coherent next engineering artifact may be a proposed ERD boundary only after P0 decisions are resolved and the canonical Gate 2 owner approves the relationship changes.

External stakeholder silence does not prevent further synthetic design, but it also cannot be used as validation. Continue internal work without pretending that absent authorities have approved their own rules.


## 4. Evidence review checkpoint — 2026-11-17

The [Tournament Identifier Crosswalk](TOURNAMENT-IDENTIFIER-CROSSWALK.md) records the exact source inventory and separates the two outcomes: TAD-001 is **READY FOR GOVERNANCE** as a bounded naming decision; TAD-002 is **BLOCKED** because the proposed MatchParticipation entity has not been shown to have an independent lifecycle or multiplicity beyond the current fixture/participation pair. These status changes are evidence-framing only. Neither decision is ratified, and no implementation authority is created.


## 5. TAD-003 evidence review checkpoint — 2026-11-17

The [Organizer Identity and Authority Crosswalk](ORGANIZER-IDENTITY-AUTHORITY-CROSSWALK.md) identifies a preferred conceptual boundary but does not close the decision. Reuse canonical Organization as the enduring identity; treat Organizer as an event-scoped capacity; distinguish the submitting User from the represented Organization; and evaluate representative authority separately. TAD-003 remains **BLOCKED** because G2-SEAM-02 affiliation/authorization semantics, independent individual organizers, cardinality, delegation and authority lifecycle remain unresolved. No identity entity, authorization model or implementation is ratified.


## 6. TAD-004 evidence review checkpoint — 2026-11-17

The [Team Entry and Player Participation Cardinality Crosswalk](TEAM-ENTRY-PLAYER-PARTICIPATION-CARDINALITY-CROSSWALK.md) confirms the proposed TeamEntry → PlayerParticipation relationship but finds that the current Manager creates fresh Team and Player IDs on every entry/participation and therefore cannot demonstrate identity reuse, multi-division entries, dual registration or transfers. Registration, roster status, eligibility, permission and appearance are separate concerns. TAD-004 remains **OPEN** pending canonical Team semantics and representative competition regulations for cardinality, effective periods, transfer, guest/dual registration, duplicate resolution and appeals. No domain decision or implementation authority is created.


## 7. TAD-005 evidence review checkpoint — 2026-11-17

The [Fixture Consistency and Lifecycle Crosswalk](FIXTURE-CONSISTENCY-LIFECYCLE-CROSSWALK.md) confirms the proposed fixture → division + home/away team-entry relationship, but finds that the synthetic manager stores schedule, score and result-review fields together; Day Operations has a separate session-only status; and Match-Day Handoff v1 has no authoritative result or competition context. The sources leave postponement, abandonment/resumption, replay, walkover/forfeit, multi-leg ties and result correction unresolved. Candidate boundary separates scheduled contest, schedule revision, match-day session, played match instance, result observation and competition decision. TAD-005 remains **OPEN** pending competition-rule evidence and governance. No domain decision or implementation authority is created.
