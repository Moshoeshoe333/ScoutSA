# ScoutSA Conceptual ERD Draft — Gate 2
**Date:** 2026-10-06  
**Status:** Draft — implementation-independent; not frozen  
**Gate:** Gate 2 — Semantic Relationship Integrity  
**Authority:** Derived from the ratified Constitution, Domain Model, Relationship Model, Gate 2 seam witnesses, and Gate 2 Consolidated Decision Package.

> **Governing rule:** Strength of claim must never exceed strength of evidence.

## 1. Purpose

This document is the first **conceptual ERD draft** authorized by Gate 2.

It describes domain relationships without deciding database tables, foreign keys, indexes, row-level security, APIs, UI behavior, authentication implementation, storage mechanisms, or other technical structures.

The ERD is derived from the domain model. It must not be used to invent domain truth.

**Status vocabulary**
- **ESTABLISHED** — relationship is supported by the current ratified domain baseline.
- **DERIVED** — relationship follows from an existing domain concept but exact operational mechanics remain open.
- **OPEN** — cardinality, authority, lifecycle, or policy remains unresolved.
- **DEFERRED** — intentionally outside this conceptual ERD's authority.

## 2. Conceptual relationship map

```
User
 ├── role semantics ───────────────→ Guardian / Coach / Scout
 ├── organization affiliation ─────→ Organization                         [OPEN]
 └── may relate to ────────────────→ Player                              [OPEN]

Player
 ├── GuardianLink ─────────────────→ Guardian
 ├── Membership ───────────────────→ Organization
 ├── ConsentRecord
 ├── Assertion ────────────────────→ Evidence
 │      └───────────────────────────→ Verification                        [scoped]
 ├── Media
 ├── SeasonPerformance
 ├── AcademicProfile
 ├── MedicalClearance
 ├── TransportProfile
 ├── Child Participation / Voice Record
 ├── Safeguarding Case / Response                              [defined subject]
 ├── FootballReadiness              [derived]
 ├── OpportunityReadiness           [derived]
 ├── OpportunityApplication ───────→ Opportunity
 │          └──────────────────────→ Outcome                              [relationship open]
 └── AuditEvent

Organization
 ├── Membership ───────────────────→ Player
 ├── Opportunity ──────────────────→ OpportunityApplication
 ├── may author/assert/verify ─────→ scoped domain records
 └── may participate in Outcome     [scope/lifecycle open]

Opportunity
 ├── created/owned by ─────────────→ Organization
 ├── evaluated with ───────────────→ OpportunityReadiness                  [derived]
 └── receives ─────────────────────→ OpportunityApplication

OpportunityApplication
 ├── concerns ─────────────────────→ Player + Opportunity
 ├── may involve ──────────────────→ Player / Guardian / authorized actor [OPEN]
 └── may result in ────────────────→ Outcome                              [OPEN]

Assertion
 ├── concerns ─────────────────────→ defined subject
 ├── authored/submitted by ────────→ actor                                [authority scope applies]
 ├── supported by ─────────────────→ Evidence
 └── evaluated by ─────────────────→ Verification                         [scoped]

Safeguarding Case / Response
 ├── concerns ─────────────────────→ defined safeguarding matter/subject
 ├── preserves ────────────────────→ concern/report, response states,
 │                                    findings where applicable,
 │                                    investigation outcome,
 │                                    final resolution where applicable
 └── visibility ───────────────────→ restricted/contextual                 [OPEN]

Child Participation / Voice Record
 ├── concerns ─────────────────────→ defined matter/context
 ├── expressed by ─────────────────→ Child/Player where applicable
 └── remains distinct from ────────→ Guardian authority / Consent / Decision

AuditEvent
 └── records accountability context for consequential domain actions
```

The arrows above are **conceptual**, not database foreign-key instructions.

## 3. Relationship inventory

| ID | Relationship | Status | Constraint |
|---|---|---|---|
| R-01 | User ↔ Player | OPEN | Exact cardinality and delegated/shared access are not ratified. |
| R-02 | User ↔ Guardian/Coach/Scout | DERIVED / OPEN | Role semantics remain distinct from User identity; exact multiplicity is open. |
| R-03 | User ↔ Organization | OPEN | Affiliation/cardinality and authorization process remain unresolved. |
| R-04 | Player ↔ Guardian via GuardianLink | ESTABLISHED | Player-specific relationship; scope/history must be preserved. |
| R-05 | GuardianLink ↔ ConsentRecord | OPEN | Link does not equal consent; authorizer applicability and conflict effect remain unresolved. |
| R-06 | Player ↔ Organization via Membership | ESTABLISHED | Historical/current membership relationship; no `current_club` shortcut. |
| R-07 | Player ↔ ConsentRecord | ESTABLISHED | Consent is purpose-bound, temporal, and scoped to legitimate authority. |
| R-08 | Player/subject ↔ Assertion | ESTABLISHED | Assertion is first-class and attributable. |
| R-09 | Assertion ↔ Evidence | ESTABLISHED | Evidence supports/evaluates an assertion; evidence is not truth. |
| R-10 | Assertion ↔ Verification | ESTABLISHED | Verification is scoped to a defined claim; it does not establish universal truth. |
| R-11 | Player ↔ Media | ESTABLISHED | Ownership, rights, consent and visibility remain distinct. |
| R-12 | Player ↔ SeasonPerformance | ESTABLISHED | Period-bound historical performance relationship. |
| R-13 | Player ↔ AcademicProfile | ESTABLISHED | Purpose-limited academic context. |
| R-14 | Player ↔ MedicalClearance | ESTABLISHED | Restricted, high-level clearance; underlying medical authority remains external. |
| R-15 | Player ↔ TransportProfile | ESTABLISHED | Feasibility context, not talent/ranking. |
| R-16 | Organization ↔ Opportunity | ESTABLISHED | Organization owns/creates opportunity within authorized scope. |
| R-17 | Player ↔ OpportunityApplication ↔ Opportunity | ESTABLISHED / OPEN | Application concerns Player + Opportunity; participant cardinality and lifecycle remain open. |
| R-18 | OpportunityApplication ↔ Outcome | OPEN | Exact multiplicity, lifecycle and result semantics remain unresolved. |
| R-19 | Outcome ↔ Assertion | OPEN | Precise assertion/result relationship remains unresolved. |
| R-20 | Player ↔ FootballReadiness | DERIVED | Derived from underlying football records; never source-of-truth. |
| R-21 | Player + Opportunity ↔ OpportunityReadiness | DERIVED | Contextual evaluation; exact representation remains implementation-independent. |
| R-22 | Player ↔ Child Participation / Voice Record | ESTABLISHED | Expressed view/participation is preserved separately from authority and decision. |
| R-23 | Safeguarding Case/Response ↔ subject/actors | ESTABLISHED / OPEN | Concept established; responsible authority, lifecycle and visibility remain operational. |
| R-24 | Domain action ↔ AuditEvent | DERIVED | Accountability record; does not replace substantive domain records. |

## 4. Semantic boundaries carried into the ERD

The conceptual ERD MUST NOT collapse any of these distinctions:

- `USER ≠ PLAYER`
- `ROLE ≠ UNIVERSAL AUTHORITY`
- `ROLE ≠ VERIFICATION`
- `GUARDIANLINK ≠ CONSENT`
- `CONSENT ≠ AUTHORITY EXPANSION`
- `ASSERTION ≠ EVIDENCE`
- `ASSERTION ≠ VERIFICATION`
- `ASSERTION ≠ TRUTH`
- `EVIDENCE ≠ TRUTH`
- `VERIFICATION ≠ SAFEGUARDING CLEARANCE`
- `CHILD VOICE ≠ GUARDIAN AUTHORITY`
- `CHILD VOICE ≠ CONSENT`
- `CHILD VOICE ≠ FINAL DECISION`
- `APPLICATION STATE ≠ TRUTH`
- `APPROVED ≠ PLACEMENT`
- `OUTCOME ≠ APPLICATION STATE`
- `OUTCOME ≠ RANKING / REPUTATION`
- `DISPUTE ≠ PROOF OF FALSITY`
- `CORRECTION ≠ HISTORY ERASURE`
- `HISTORICAL VALIDITY ≠ CURRENT APPLICABILITY`
- `DISCOVERABLE ≠ REPUBLISHABLE`
- `CONCERN / REPORT ≠ FINDING / SUBSTANTIATION`
- `PROTECTIVE ACTION ≠ INVESTIGATION OUTCOME`
- `INVESTIGATION OUTCOME ≠ FINAL RESOLUTION`

## 5. Explicitly unresolved edges

### 5.1 User ↔ Player

**OPEN**
- Exact cardinality.
- Whether a Player can be operated by multiple Users through delegation/shared access.
- Whether one User may operate multiple Player identities.
- Lifecycle coupling.

No cardinality is frozen merely because a common application pattern would be convenient.

### 5.2 User ↔ actor roles ↔ Organization

**OPEN**
- Exact role multiplicity.
- Exact organization affiliation cardinality.
- Temporal affiliation behavior.
- Organization authorization and external verification process.

Rejected assumptions:
- User = Guardian/Coach/Scout.
- Role = externally verified professional status.
- One permanent organization per User.
- Affiliation = universal authority.
- Role = authority over every Player.

### 5.3 GuardianLink ↔ ConsentRecord

**OPEN**
- Exact authorizing-person relationship.
- Multiple Guardian conflict handling.
- Applicability when GuardianLink status/scope changes.
- Legal/jurisdictional effect of conflicting authority.

The ERD must not encode latest-wins, first-wins, majority-wins, or universal Guardian precedence.

### 5.4 OpportunityApplication

**OPEN**
- Participant cardinality.
- Initiating/submitting actors.
- Responding actors.
- Transition authority.
- Minor Player/Guardian behavior.
- Lifecycle vocabulary, including withdrawal/cancellation/invitation if required.
- Correction/dispute semantics.
- Access and notification boundaries.

The ERD must not manufacture an `ApplicationParticipant` or `StateTransition` concept solely because it is a familiar technical pattern.

### 5.5 Outcome

**OPEN**
- Multiplicity relative to an Application.
- Event-like versus composite-result semantics.
- Assertion ↔ Outcome relationship.
- Correction/version/supersession.
- Dispute lifecycle and participants.
- Placement/registration treatment.
- Visibility/access.
- Retention/deletion.

The ERD must not manufacture `OutcomeVersion`, `OutcomeDispute`, `OutcomeEvent`, or `StatusHistory` as domain concepts merely for implementation convenience.

## 6. Derived relationships

### FootballReadiness

`Player → underlying football records → FootballReadiness`

It is derived state, not a replacement for Player, Assertion, Evidence, Verification, Membership, Media, or Performance records.

### OpportunityReadiness

`Player + Opportunity + current relevant inputs → OpportunityReadiness`

Material withdrawal, revocation, expiry, dispute, or requirement change requires reassessment. Historical evaluations are not silently rewritten.

### AuditEvent

`Authorized/consequential action → AuditEvent`

AuditEvent supports accountability and provenance. It does not become the source of truth for the substantive domain event.

## 7. Relationship failure-containment rules

1. A relationship must not create authority that the underlying domain concept does not possess.
2. A technical key must not establish truth, ownership, consent, or legal authority.
3. Cardinality must not be inferred from UI convenience.
4. Historical relationships must not be silently overwritten to represent current state.
5. Derived state must remain traceable to its inputs.
6. Contradictory assertions/outcomes remain distinguishable until an applicable resolution process exists.
7. Visibility of a relationship does not imply permission to disclose supporting evidence.
8. Discovery does not imply republication.
9. A safeguarding relationship or verification relationship does not create safeguarding clearance.
10. Child participation remains attributable and separate from authority and final decision.
11. An Application does not imply placement.
12. An Outcome does not imply causation, ranking, reputation, or truth merely by existing.

## 8. ERD readiness assessment

**Semantic ontology:** READY.

**Conceptual relationship draft:** THIS DOCUMENT.

**Relationship freeze:** NOT YET RATIFIED.

**Schema:** HOLD.

**RLS/API/UI:** DEFERRED.

**Implementation:** DEFERRED.

The remaining uncertainty is explicitly represented as OPEN relationship, authorization, lifecycle, correction/dispute, and policy decisions. No missing semantic concept was silently invented.

## 9. Required adversarial review

Before conceptual relationship freeze, review this draft against:

1. Every first-class domain entity.
2. Every established relationship in the Relationship Model.
3. Every Gate 2 seam decision.
4. Every M1–M9 ratified semantic boundary.
5. Assertion, Safeguarding Case/Response, and Child Participation/Voice boundaries.
6. Cardinality assumptions.
7. Authority and consent propagation.
8. Historical/current applicability.
9. Correction/dispute/provenance.
10. Disclosure/republication.
11. Derived-state dependency.
12. Child safeguarding and participation boundaries.

A contradiction or newly exposed semantic gap triggers:

`STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED → DOMAIN RECONCILIATION → ERD UPDATE`

## 10. Provenance

This draft is derived from:

- `docs/00-constitution.md`
- `docs/01-domain-model.md`
- `docs/02-relationship-model.md`
- Gate 1 ratification and closure records
- Gate 2 seam witnesses G2-SEAM-01 through G2-SEAM-08
- `docs/research/gate-2-consolidated-relationship-blocker-review-2026-10-06.md`
- `docs/research/gate-2-consolidated-decision-package-2026-10-06.md`

### Evidence-gap note

G2-SEAM-03 (GuardianLink ↔ ConsentRecord) has been semantically analyzed and classified in the consolidated decision package, but its dedicated repository re-witness artifact was previously blocked from commit. Therefore this document does **not** claim that the repository evidence trail for G2-SEAM-03 is complete. Its unresolved relationship decisions remain explicitly OPEN.

## 11. Non-claims

This draft does not establish:

- legal compliance;
- POPIA compliance;
- Children’s Act compliance;
- FIFA/SAFA policy compliance;
- universal Guardian precedence;
- legal capacity or age thresholds;
- safeguarding clearance;
- a final authorization hierarchy;
- a database schema;
- RLS policy;
- API contract;
- UI behavior;
- authentication architecture;
- production readiness;
- investor readiness.

**No implementation is authorized by this document.**


## 12. Adversarial ERD review — 2026-10-06

### Review result

**CONDITIONAL PASS — one scope correction applied before review closure.**

The first draft risked reading Safeguarding Case/Response as inherently Player-owned because the relationship map placed it beneath Player. That would overconstrain the domain: the ratified concept concerns a defined safeguarding matter/subject and must not assume the subject is always a Player.

The draft has therefore been corrected to preserve a **defined subject/actor relationship** rather than a Player-only ownership assumption.

### Review checks

| Check | Result | Finding |
|---|---|---|
| First-class domain concepts | PASS | All currently established concepts are represented. |
| Ratified semantic boundaries | PASS | M1–M9 plus Assertion, Safeguarding Case/Response, and Child Voice boundaries are preserved. |
| User ↔ Player | PASS | Cardinality/delegation remain OPEN; no invented access entity. |
| User ↔ roles/Organization | PASS | No role-implied universal authority or permanent organization shortcut. |
| GuardianLink ↔ ConsentRecord | PASS WITH EVIDENCE NOTE | Relationship remains OPEN; no precedence invented. G2-03 repository witness remains an evidence gap. |
| Assertion ↔ Evidence/Verification | PASS | Relationships remain scoped and non-equivalent to truth. |
| OpportunityApplication | PASS | Player + Opportunity subject retained; participants/lifecycle remain OPEN. |
| Outcome | PASS | Application relationship and multiplicity remain OPEN; no placement/ranking inference. |
| Safeguarding | PASS AFTER CORRECTION | Case/Response is not forced to be Player-owned; operational authority/lifecycle/visibility remain OPEN. |
| Child Voice | PASS | Voice remains separate from Guardian authority, Consent, and final decision. |
| Derived readiness | PASS | FootballReadiness and OpportunityReadiness remain derived, not source-of-truth. |
| Historical/provenance | PASS | Correction/dispute/history boundaries are preserved. |
| Disclosure | PASS | Discoverability is not treated as republication permission. |
| Technical leakage | PASS | No schema, key, RLS, API, UI, storage, or implementation rule is introduced. |
| Missing semantic concept test | PASS | No new first-class semantic concept exposed by this ERD review. |

### Review disposition

**Conceptual ERD draft: ADMISSIBLE FOR CONSOLIDATED RELATIONSHIP REVIEW / NOT FROZEN.**

The review does not close Gate 2. The remaining OPEN decisions remain exactly the relationship/operational/legal-policy seams already identified.

**No implementation authorization is created.**
