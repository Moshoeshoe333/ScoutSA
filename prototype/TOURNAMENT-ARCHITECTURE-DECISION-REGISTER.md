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

**Observed evidence:** The relationship proposal alone defines `match_participation_id`. Tournament Manager statistics, Statistic Reconciliation, Day Operations, Player Tournament History and handoff v1 use `fixtureId + participationId`. Current handoff v1 allows one lineup per participation per fixture. No inspected module proves an independent MatchParticipation lifecycle or multiple stints. See [Tournament Identifier Crosswalk](TOURNAMENT-IDENTIFIER-CROSSWALK.md).

**Options:**
- A. Introduce a canonical fixture-scoped MatchParticipation relationship record; events and statistics reference it, while fixture and participation remain validated context.
- B. Use the composite pair `fixture_id + participation_id` as the sole relationship identity.
- C. Allow either shape in different modules (not recommended; increases ambiguity).

**Candidate recommendation:** unresolved. Keep the pair in synthetic v1; do not create a separate entity solely to add a surrogate key. Reconsider a distinct MatchParticipation only if an independent domain lifecycle or multiplicity is demonstrated.

**Decision authority required:** Domain-model owner / governance ratifier; technical architecture review after semantic approval.  
**Evidence still required:** domain decision on whether match participation is a separately reviewable record, supports multiple stints/segments, has independent status/role/eligibility lifecycle, and how it behaves across abandoned/restarted fixtures; define uniqueness and correction semantics. The current synthetic pair is transport/context only.  
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
**Question:** What is the canonical fixture relationship and lifecycle for division, edition, team entries, legs, postponements, walkovers, abandoned matches and replays?

**Observed evidence:** Current proposals scope fixtures to divisions and match records to fixtures, but do not define all exceptional competition states or multi-leg structures.

**Options:**
- A. One fixture is one scheduled contest; postponement and result correction are versions/status changes on that fixture.
- B. A fixture groups one or more match instances/legs, each with its own played record.
- C. Model all exceptional cases as unrelated new fixtures.

**Candidate recommendation:** Define competition-agnostic core identity plus explicit competition-specific rules; do not decide multi-leg/abandoned semantics from the current single-fixture demo.

**Decision authority required:** Domain governance plus competition-rule owner.  
**Evidence required:** fixture lifecycle examples and actual competition regulations.  
**Impact if unresolved:** duplicate fixtures, incorrect results, broken history and ambiguous statistics.  
**Stop condition:** no production fixture state machine or uniqueness constraints until lifecycle and replay rules are ratified.

### TAD-006 — Match participation and match-day session multiplicity

**Priority:** P0  
**Status:** OPEN  
**Question:** Can one fixture have multiple match-day sessions, venues, restarts or match instances, and how do player participation and appearance intervals attach to them?

**Observed evidence:** Day Operations currently models one simple configured duration and one entry/exit interval. Its model explicitly leaves sessions, abandoned/restarted segments and return substitutions open.

**Options:**
- A. One match-day record per fixture, with revisions.
- B. Multiple session/segment records under a fixture, each with its own timing and source records.
- C. Separate fixture match-instance records for replayed or resumed contests.

**Candidate recommendation:** Do not ratify one-to-one. First distinguish administrative match-day session, actual played match instance, and time segment; they may be different concepts.

**Decision authority required:** Domain governance and competition-rule owner; referee/operations expertise needed before real match records.  
**Evidence required:** examples of postponed, abandoned, resumed, replayed, extra-time and multi-venue fixtures; rules for return substitutions and temporary dismissals.  
**Impact if unresolved:** minutes may be wrong, event chronology may be impossible to reconcile and match reports may be overwritten.  
**Stop condition:** keep appearance calculations limited to the documented synthetic simple-match case; no official minutes claims.

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

## 5. Recommended decision sequence

1. **Resolve TAD-001:** identifier naming is narrow and can be verified against existing contracts.
2. **Resolve TAD-002 and TAD-006 together:** decide whether MatchParticipation is a real domain relationship and how it behaves across sessions/segments.
3. **Resolve TAD-003:** remove the Organizer/Organization ambiguity before any real organizer workflow.
4. **Resolve TAD-004 and TAD-005:** settle team/player registration and fixture lifecycle.
5. **Resolve TAD-007 to TAD-009:** provenance, metric semantics and correction history.
6. **Resolve TAD-010 and TAD-011:** competition eligibility and publication rights.
7. **Resolve TAD-012 to TAD-014:** access, retention and future integration.

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
