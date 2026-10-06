# ScoutSA Domain Model

**Document:** `docs/01-domain-model.md`  
**Status:** Gate 1 — Domain Integrity CLOSED 2026-10-05; M1–M9 semantic baseline ratified  
**Governing Principle:** Strength of claim must never exceed strength of evidence.

---

## 1. Purpose

This document defines the implementation-independent domain model for ScoutSA.

It answers:

- What entities exist?
- Who owns each fact?
- Who may create or amend it?
- Who may verify it?
- How does it behave over time?
- Who may see it?
- What consent or safeguarding gate applies?
- What evidence supports the claim?
- What must never happen?

This document is the bridge between the Constitution and future ERD, schema, API, authorization, UI, and implementation.

**Documentation specifies intended behavior. It does not prove that behavior exists in software.**

---

## 2. Domain Thesis

ScoutSA is a football opportunity network, not merely a player directory.

The Player Passport progressively answers two different questions:

1. **Can this player play?**
2. **Can this player realistically access and succeed in this opportunity?**

These questions must remain separate.

### 2.1 Football Readiness

A derived view of football-related evidence and signals, including:

- position;
- physical attributes where relevant;
- performance records;
- football media;
- coach or organization verification.

Football Readiness is **not a talent score, ranking, or prediction of success**.

### 2.2 Opportunity Readiness

A contextual evaluation of:

**Player + Opportunity + relevant requirements/context**

Examples include:

- guardian approval;
- consent;
- transport feasibility;
- medical clearance where required;
- academic eligibility where required;
- identity/verification prerequisites.

Opportunity Readiness is **never a permanent percentage stored on Player**.

A player may be ready for one opportunity and not ready for another at the same time.

---

## 3. Authority Vocabulary

ScoutSA uses the following distinctions:

- **Owner:** the person or organization responsible for a fact or record.
- **Author:** the actor who creates or submits a record.
- **Authority:** the actor permitted to make a particular assertion.
- **Verifier:** an actor who independently verifies a defined claim or scope.
- **Evidence:** an artifact, observation, assertion, or system event supporting a claim.
- **Consent:** permission for a defined purpose; it is not equivalent to verification.
- **Derived state:** a system calculation based on underlying records; it is not an independent source of truth.
- **Decision:** a resulting determination or action taken within an authorized process; it is not itself proof of the underlying facts.

A verification does not make every attribute of an entity verified. Verification must always have a **defined subject, claim/scope, authority, evidence basis, timestamp, and status**.

### 3.1 Ratified semantic distinctions

- ASSERTION ≠ EVIDENCE
- EVIDENCE ≠ VERIFICATION
- VERIFICATION ≠ TRUTH
- ROLE ≠ UNIVERSAL AUTHORITY
- AUTHORITY ≠ CONSENT
- PURPOSE A AUTHORIZATION ≠ PURPOSE B AUTHORIZATION
- HISTORICAL VALIDITY ≠ CURRENT APPLICABILITY
- AUTHENTIC ≠ CURRENT ≠ APPLICABLE ≠ SUFFICIENT
- CONFLICT ≠ RESOLUTION
- DERIVED STATE ≠ SOURCE OF TRUTH
- VERIFICATION ≠ SAFEGUARDING CLEARANCE
- DISCOVERABLE ≠ REPUBLISHABLE
- CHILD VOICE ≠ GUARDIAN AUTHORITY
- CHILD VOICE ≠ FINAL DECISION
- CONCERN / REPORT ≠ FINDING / SUBSTANTIATION
- PROTECTIVE ACTION ≠ INVESTIGATION OUTCOME
- INVESTIGATION OUTCOME ≠ FINAL RESOLUTION

These are semantic boundaries. They do not create a fixed authority hierarchy, legal conclusion, implementation mechanism, or automatic outcome.

---

## 4. Evidence as a First-Class Domain Concept

### 4.1 Evidence

Evidence is a first-class domain entity because ScoutSA claims must remain traceable to what supports them.

Examples:

- identity document;
- birth-related document;
- school report;
- medical clearance document;
- match footage;
- coach assertion;
- organization assertion;
- competition statistics;
- guardian consent action;
- system-generated event.

Evidence does **not** automatically establish truth. Its provenance, type, source, scope, freshness, and authority determine what claims it can support.

### 4.2 Evidence fields (conceptual)

- evidence ID;
- subject/entity reference;
- evidence type;
- source actor;
- source organization, where applicable;
- captured/submitted timestamp;
- effective date, where applicable;
- expiry date, where applicable;
- provenance metadata;
- integrity/reference metadata;
- visibility classification;
- retention state;
- consent basis, where applicable.

### 4.3 Evidence invariants

1. Evidence must not be fabricated by the system.
2. Evidence must not be silently reassigned to a different subject.
3. Evidence visibility must not imply public disclosure.
4. Expired evidence must not silently remain current.
5. A derived claim must be traceable to its supporting evidence and/or authoritative assertion.
6. Evidence strength must constrain claim strength.

---


## 4.3 Ratified Assertion

**Assertion** is a first-class semantic domain concept.

An Assertion is an attributable domain statement or claim about a defined subject, made or submitted by an actor within an applicable authority/scope where relevant, preserved with sufficient provenance and temporal context to distinguish the historical assertion from later applicability, and capable of being supported or evaluated by Evidence and Verification without itself constituting truth.

Conceptual aspects, where applicable:

- subject;
- author/submitter;
- authority/scope context;
- asserted proposition or claim scope;
- creation/submission time;
- effective period;
- lifecycle/status;
- provenance;
- supporting Evidence;
- correction/dispute reference;
- visibility/disclosure classification.

### Assertion invariants

1. ASSERTION ≠ EVIDENCE.
2. ASSERTION ≠ VERIFICATION.
3. ASSERTION ≠ TRUTH.
4. AUTHOR ≠ AUTHORITY.
5. Evidence supports an Assertion; Evidence does not thereby establish truth.
6. Contradictory Assertions remain distinguishable until an authorized resolution process applies.
7. Historical Assertion does not by itself establish current applicability.
8. Assertion visibility does not imply Evidence visibility or republication permission.
9. An Assertion does not create consent, safeguarding clearance, legal validity, or universal authority.
10. Assertion existence does not create a verification result.
11. Derived readiness may consume Assertions and supporting Evidence but never replaces them as source records.
12. Correction or dispute must preserve provenance rather than silently rewriting historical assertions.

These are semantic requirements, not database columns or implementation mechanics.

## 5. Core Entities

### 5.1 User

Authentication identity for a human actor.

**Ownership:** Individual account holder.  
**Authority:** Limited by role and authorization policy.  
**Temporal:** Persistent; may be suspended/deactivated.  
**Visibility:** Private by default.  
**Evidence:** Registration and optional identity/role verification.  
**Invariants:**

- One User may hold or acquire multiple roles where permitted.
- Authentication identity is distinct from football identity.
- A role assignment does not by itself verify the person's external professional status.

Conceptual roles:

`PLAYER`, `GUARDIAN`, `COACH`, `SCOUT`, `CLUB_ADMIN`, `SCHOOL_ADMIN`, `LEAGUE_ADMIN`, `SUPER_ADMIN`

Future roles such as agents require explicit constitutional/product approval before implementation.

---

### 5.2 Player / Player Passport

The persistent football identity of a person.

**Ownership:** Player, with guardian-controlled functions where legally/constitutionally required for a minor.  
**Authority:** Player/Guardian for self-provided facts; authorized organizations/verifiers for defined assertions; system for generated identifiers.  
**Temporal:** Persistent. Historical relationships are retained.  
**Visibility:** Field-level and purpose-specific access control.  
**Evidence:** Self-report, guardian assertion, organization records, verification, and linked evidence.

**Invariants:**

- Scout ID is immutable once issued.
- Scout ID is never reused for another person.
- Current organization is never stored as a mutable `current_club` or `current_school` field.
- Verified identity facts require a controlled correction process rather than silent mutation.
- Minor safeguarding requirements must be satisfied before protected discovery/contact flows are enabled.

Conceptual fields include identity, location, football profile, and availability. Sensitive supporting records remain separate.

---

### 5.3 Guardian

A person linked to a Player for safeguarding, consent, and related responsibilities.

**Ownership:** Guardian.  
**Authority:** Guardian for their own declarations and permissions within authorized scope.  
**Temporal:** Relationship has effective dates and may be revoked/changed.  
**Visibility:** Restricted.  
**Evidence:** Self-declaration plus relationship evidence where required.

**Invariants:**

- Guardian relationship must have an explicit status and effective period.
- Guardian authority is scoped; being linked does not grant unrestricted access to all Player data.
- Minor-related workflows must not bypass the applicable guardian/safeguarding gate.
- The exact legal definition of guardian/parental responsibility must be confirmed during jurisdiction-specific legal review; this domain model does not itself make that legal determination.

---

### 5.4 GuardianLink

The relationship between Player and Guardian.

This is modeled separately from Guardian because relationship, authority, status, and history are domain facts.

Conceptual fields:

- player;
- guardian;
- relationship type;
- authority scope;
- status;
- effective-from;
- effective-to;
- evidence reference;
- verification status.

---

### 5.5 ConsentRecord

A versioned, purpose-specific permission granted by the authorized person.

**Ownership:** Granting party.  
**Authority:** Authorized grantor only, subject to applicable safeguarding rules.  
**Temporal:** Versioned, effective, revocable, and optionally expiring.  
**Visibility:** Restricted.  
**Evidence:** Explicit action plus timestamp, version, purpose, and context.

Example purposes:

- profile creation;
- profile visibility;
- contact requests;
- media sharing;
- academic visibility;
- medical-clearance access;
- opportunity/trial participation;
- retention/processing acknowledgement.

**Invariants:**

1. Consent is granular and purpose-bound.
2. Revocation changes current authorization state without erasing historical evidence.
3. Consent cannot be inferred merely from profile existence.
4. Consent does not replace legal basis analysis.
5. A consent record cannot grant access beyond the authority of its grantor.

---

### 5.6 Organization

A football-related institution or body.

Types may include:

`SCHOOL`, `CLUB`, `ACADEMY`, `UNIVERSITY`, `LFA`, `LEAGUE`, `OTHER`

**Ownership:** Organization.  
**Authority:** Organization administrators within assigned scope.  
**Temporal:** Persistent; may be archived.  
**Visibility:** Public organizational identity plus restricted administrative data.  
**Evidence:** Registration and optional external verification.

**Invariant:** Organization type and verification status must not be confused.

---

### 5.7 Membership

Historical/current relationship between Player and Organization.

**Ownership:** Relationship jointly concerns Player and Organization.  
**Authority:** Organization may assert membership; Player may confirm or dispute.  
**Temporal:** Start/end dates; history retained.  
**Visibility:** Controlled by policy and consent.  
**Evidence:** Organization assertion, Player confirmation, and supporting evidence where available.

**Invariants:**

- Multiple concurrent memberships may exist.
- Historical memberships are retained.
- Ending membership does not erase the historical relationship.
- “Current club/school” is a derived view, not a mutable Player field.

This is a critical anti-corruption boundary for the Player Passport.

---

### 5.8 Verification

A scoped trust assertion about a defined claim.

**Ownership:** Verifying actor.  
**Authority:** Determined by verification policy for the specific claim.  
**Temporal:** Timestamped; may expire, be superseded, suspended, or revoked.  
**Visibility:** Verification status/badge may be public while supporting evidence remains restricted.  
**Evidence:** Explicit verifier action and supporting evidence where applicable.

Conceptual verification levels:

1. Self Registered
2. Coach Verified
3. Organization Verified
4. League Verified

**Invariants:**

- Self-report cannot self-elevate to external verification.
- Verification must identify verifier, scope, timestamp, and status.
- Higher level does not automatically verify unrelated facts.
- Expired/revoked verification cannot silently continue to support a current claim.
- Verification is not safeguarding clearance.

---

### 5.9 Media

Photo, highlight, match clip, skill clip, or other football media.

**Ownership:** Uploader/rights-holder as determined by product rules.  
**Authority:** Uploader plus applicable Player/Guardian permissions and moderation controls.  
**Temporal:** Has lifecycle and retention state.  
**Visibility:** Purpose-specific and consent-dependent, especially for minors.  
**Evidence:** Source, uploader, timestamp, and optional verification.

Media categories may include:

`GOAL`, `ASSIST`, `DEFENDING`, `GOALKEEPING`, `PACE`, `CROSSING`, `SKILLS`, `FULL_MATCH`, `OTHER`

**Invariant:** Media verification quality must never be presented as stronger than the actual verification evidence.

---

### 5.10 SeasonPerformance / PerformanceMetric

Structured performance record for a season, team, competition, or defined period.

**Ownership:** Organization/Coach as primary source.  
**Authority:** Authorized Coach/Organization actor.  
**Temporal:** Period-bound and historical.  
**Visibility:** Controlled by consent and verification.  
**Evidence:** Team/competition record or authoritative assertion.

**Invariants:**

- Metrics are never silently overwritten.
- Corrections preserve provenance.
- A performance record must identify its period and context.
- Missing statistics must not be converted into zero by assumption.

---

### 5.11 TransportProfile

Describes practical travel capability relevant to opportunity feasibility.

**Ownership:** Player/Guardian.  
**Authority:** Player/Guardian declaration; optional verification for a specific opportunity.  
**Temporal:** Mutable, with effective/current state.  
**Visibility:** Restricted and purpose-limited.  
**Evidence:** Self/Guardian declaration and optional supporting evidence.

Concepts:

- transport mode;
- travel radius;
- independent/dependent travel;
- weekday/weekend availability;
- safe travel-time constraints;
- guardian transport capability.

**Invariant:** Transport constraints are feasibility signals, never public talent/ranking signals.

---

### 5.12 AcademicProfile

Academic context relevant to an opportunity.

**Ownership:** Player/Guardian.  
**Authority:** Player/Guardian; optional School verification.  
**Temporal:** Changes by academic period; history retained where needed.  
**Visibility:** Restricted.  
**Evidence:** Self/Guardian declaration, school evidence, or verified school assertion.

**Invariants:**

- Academic information must be purpose-limited.
- A missing academic record is not equivalent to academic failure.
- Raw academic information must not become an unexplained exclusion mechanism.
- Opportunity requirements must specify when academic information is actually relevant.

---

### 5.13 MedicalClearance

High-level participation-clearance state.

**Ownership:** Player/Guardian for submission and permission; qualified medical authority for the underlying clearance.  
**Authority:** Medical professional for medical clearance; system records the supplied status without becoming the medical authority.  
**Temporal:** Effective/expiry dates.  
**Visibility:** Highly restricted.  
**Evidence:** Medical clearance document or authoritative clearance record.

**Invariants:**

- Detailed medical history is not part of the core Player Passport.
- Default sharing is limited to the minimum status needed for the opportunity.
- Expired clearance cannot be represented as current.
- The system must not manufacture medical conclusions.

---

### 5.14 Opportunity

A structured football opportunity created by an Organization.

Examples:

- trial;
- academy intake;
- scholarship;
- talent camp;
- university recruitment;
- other defined opportunity.

**Ownership:** Creating Organization.  
**Authority:** Authorized Organization actor.  
**Temporal:** Publication/open/close/event dates.  
**Visibility:** Public or targeted.  
**Evidence:** Organization assertion.

Minimum contextual requirements may include:

- age/eligibility;
- positions;
- location;
- date/time;
- required documents;
- medical requirements;
- academic requirements;
- transport/logistics;
- guardian requirements.

**Invariant:** An opportunity cannot be evaluated for feasibility without a sufficiently defined requirement/context set.

---

### 5.15 OpportunityApplication

A formal Player/Guardian/Organization interaction around an Opportunity.

**Ownership:** Interaction between initiating and responding parties.  
**Authority:** Initiator creates; authorized recipient responds.  
**Temporal:** State machine with timestamps.  
**Visibility:** Involved parties plus restricted audit.

Conceptual lifecycle:

`REQUESTED` → `UNDER_REVIEW` → `APPROVED` / `DECLINED` / `EXPIRED`

**Invariants:**

- For a minor, applicable guardian gates must be satisfied before protected contact details or attendance commitments are released.
- An application does not itself prove football ability.
- An accepted application does not guarantee placement or success.

---

### 5.16 OpportunityReadiness

A derived, contextual evaluation of Player against a specific Opportunity.

**Formula:**

**Player + Opportunity + current relevant evidence/context → Readiness Evaluation**

**Ownership:** System-derived.  
**Authority:** Determined by the underlying authoritative records and evaluation rules.  
**Temporal:** Point-in-time; may change as inputs change.  
**Visibility:** Purpose-specific.  
**Evidence:** Underlying consent, guardian, transport, medical, academic, identity, and opportunity records.

Preferred actionable states:

- `TRIAL_READY`
- `READY_WITH_CONSTRAINTS`
- `NEEDS_GUARDIAN_ACTION`
- `NEEDS_TRANSPORT_VERIFICATION`
- `INCOMPLETE`
- `NOT_READY`

**Invariants:**

1. Never a permanent Player percentage.
2. Never a prediction of success.
3. Every state must be explainable by underlying inputs.
4. Missing evidence must not be silently interpreted as a positive state.
5. A readiness state becomes stale when material inputs or opportunity requirements change.
6. Material input withdrawal, revocation, expiry, or dispute requires current-state reassessment; historical evaluations are not silently rewritten.

---

### 5.17 FootballReadiness

A derived view of football evidence.

**Inputs:** football profile, verified performance, relevant media, and verification assertions.

**Ownership:** System-derived.  
**Authority:** Underlying evidence authorities.  
**Temporal:** Point-in-time and evidence-dependent.  
**Visibility:** Policy-controlled.  
**Invariant:** It must remain distinct from Opportunity Readiness and must not become an unexplained player ranking.

---

### 5.18 Outcome

A record of what happened after an opportunity interaction.

Examples:

- trial attended;
- trial not attended;
- further evaluation;
- offer made;
- placement;
- registration;
- declined;
- no outcome recorded.

**Ownership:** Organization + Player/Guardian confirmation where applicable.  
**Authority:** Organization assertion, with confirmation/dispute mechanisms.  
**Temporal:** Historical event/record.  
**Visibility:** Restricted.  
**Evidence:** Organization record, Player/Guardian confirmation, and supporting evidence where available.

**Invariant:** Outcome data measures real-world events; it must not be presented as proof of causation or general player quality.

---

### 5.19 AuditEvent

Immutable record of a meaningful system event.

Examples:

- consent granted/revoked;
- verification created/changed;
- contact requested;
- guardian action;
- opportunity invitation;
- application state change;
- access to restricted information;
- moderation action.

**Ownership:** System.  
**Authority:** System-generated from an authenticated action or trusted system process.  
**Temporal:** Append-only.  
**Visibility:** Restricted.  
**Evidence:** Event metadata and actor context.

**Invariants:**

- Critical audit events are not hard-deleted through ordinary domain operations.
- Events are not silently rewritten.
- An audit event records what the system observed; it does not automatically prove that the underlying human assertion was true.

---

## 6. Ownership / Authority Matrix

| Fact / Domain | Owner / Source | Verification Authority | Default Visibility | Consent / Gate |
|---|---|---|---|---|
| Identity / DOB | Player/Guardian | Defined identity verifier | Restricted | Minor/safeguarding gate |
| Position | Player | Coach/Organization | Discoverable subject to policy | Profile visibility |
| Membership | Organization + Player relationship | Organization | Controlled | Profile/organization policy |
| Performance | Coach/Organization | Organization/competition authority where available | Controlled/discoverable | Visibility policy |
| Guardian relationship | Guardian + Player relationship | Defined relationship verification | Restricted | Safeguarding |
| Consent | Guardian/adult Player | System records grantor action | Restricted | Consent itself |
| Media | Uploader / rights-holder | Coach/Organization where applicable | Consent-controlled | Media consent |
| Transport | Player/Guardian | Optional opportunity-specific verification | Restricted | Opportunity purpose |
| Academic context | Player/Guardian | School where applicable | Restricted | Purpose-specific consent |
| Medical clearance | Medical authority / supplied by Player/Guardian | Qualified medical authority | Highly restricted | Explicit purpose gate |
| Opportunity | Organization | Organization authority | Public/targeted | N/A |
| Opportunity Readiness | System-derived | Underlying evidence authorities | Purpose-specific | Inherits required gates |
| Football Readiness | System-derived | Underlying evidence authorities | Policy-controlled | Visibility policy |
| Outcome | Organization + Player/Guardian | Organization + confirmation | Restricted | Purpose-specific |
| AuditEvent | System | System | Restricted | Access-controlled |
| Evidence | Source actor / rights-holder | Depends on evidence type | Restricted by default | Purpose/retention rules |

**Important:** “Owner” does not mean “unlimited authority.” Authority is scoped to the particular fact and action.

---

## 7. Temporal Model

ScoutSA distinguishes **current state** from **historical truth about what the system previously recorded**.

### Historical / append-oriented

- Membership
- Verification
- Consent history
- SeasonPerformance
- OpportunityApplication events
- Outcome
- AuditEvent
- Evidence submissions

### Mutable current profiles with history where material

- Player profile
- TransportProfile
- AcademicProfile
- GuardianLink
- MedicalClearance status
- Media lifecycle state

### Derived point-in-time states

- FootballReadiness
- OpportunityReadiness

A current derived state must be reproducible from the relevant inputs and evaluation rules available at that time.

---

## 8. Visibility Model

Visibility is not one global Player setting.

Conceptual classes:

1. **Public/Discoverable** — suitable for approved discovery surfaces.
2. **Connected Party** — available to an authorized relationship.
3. **Opportunity-Limited** — available only for a defined opportunity/process.
4. **Restricted** — available only to explicitly authorized roles.
5. **Highly Restricted** — sensitive information requiring elevated purpose and access.
6. **Audit/Internal** — system accountability records.

A public verification badge does not make its supporting evidence public.

A public Player Passport does not make guardian, transport, academic, medical, or consent records public.

Discoverability or public availability does not by itself establish permission to reproduce, aggregate, transform, disclose, or reuse information for another purpose.

---

## 9. Safeguarding and Contact Boundary

For minors:

1. Discovery does not equal contact authorization.
2. Contact does not equal consent.
3. Consent does not equal verification.
4. Verification does not equal suitability.
5. An opportunity invitation does not equal acceptance.
6. Acceptance does not equal placement.
7. A safeguarding concern/report does not equal a finding/substantiation.
8. A finding/substantiation does not automatically determine protective action, investigation outcome, or final resolution.
9. Child participation/voice is distinct from Guardian authority and from the resulting decision where applicable law or policy requires the child's participation or consideration of views.

The system must enforce the applicable guardian/safeguarding gate before protected contact details or attendance commitments are exposed.

The precise technical mechanism for enforcing that gate belongs to the future authorization architecture; this document does **not** claim cryptographic enforcement exists.

---

## 10. Domain Invariants

The following are Gate 1 candidate invariants:

1. **Player identity is stable.** Scout ID is immutable and never reused.
2. **Membership is first-class.** Current organization is derived from Membership, never stored as a mutable Player shortcut.
3. **Verification is scoped.** No verification is broader than its explicit claim/scope.
4. **Self-report cannot self-elevate.** External verification requires an authorized external assertion.
5. **Evidence constrains claims.** Public claims cannot exceed supporting evidence.
6. **Consent is granular.** Consent is purpose-specific, versioned, and revocable.
7. **Revocation preserves history.** Current permission may change without deleting historical consent evidence.
8. **Minor safeguards cannot be bypassed.**
9. **Sensitive data is separated.** Medical, guardian, transport, academic, and consent data are not public by default.
10. **Readiness is contextual.** Opportunity Readiness always relates to a Player and a specific Opportunity.
11. **Readiness is explainable.** A derived state must identify the material inputs that produced it.
12. **Missing is not positive.** Absence of evidence must not silently become a positive assertion.
13. **Historical records are preserved.** Material corrections preserve provenance.
14. **Audit history is durable.** Critical events are not erased through ordinary deletion.
15. **Derived states are not sources of truth.** Readiness and badges are outputs, not replacement records.
16. **No implementation theater.** Documentation status must never be reported as implementation status.
17. **No compliance theater.** Documentation alone does not establish legal compliance.
18. **No ranking by logistics.** Transport, guardian status, academic context, or medical status must not become unexplained public talent rankings.
19. **Purpose does not silently expand.** Authorization for one purpose does not silently authorize another.
20. **Historical validity is not current applicability.** Authentic or valid historical material is not automatically current, applicable, or sufficient.
21. **Conflict is not resolution.** Incompatible legitimate assertions remain distinguishable until an authorized resolution process applies.
22. **Verification is not safeguarding clearance.**
23. **Discoverable is not republishable.**
24. **Child voice is distinct.** A child's expressed view is preserved separately from Guardian authority and from the resulting decision where applicable.
25. **Safeguarding response states are distinct.** Concern/report, finding/substantiation, protective action, investigation outcome, and final resolution are not silently collapsed.

---

## 11. Explicit Anti-Models

ScoutSA must not evolve into:

- a single Player row containing every attribute;
- a mutable `current_club` field that destroys membership history;
- a Player-level readiness percentage;
- a public medical record;
- an unrestricted guardian contact directory;
- self-certified verification badges;
- a ranking engine disguised as readiness;
- an opportunity system that ignores transport and guardian feasibility;
- an audit system that rewrites or deletes history;
- a compliance badge without implementation evidence;
- an AI layer that overrides domain policy or authorization.

---

## 12. Domain Relationships

Conceptually:

```text
User
 ├── Player
 ├── Guardian
 ├── Coach
 └── Scout

Player
 ├── GuardianLink ───────── Guardian
 ├── Membership ─────────── Organization
 ├── ConsentRecord
 ├── Verification
 ├── Evidence
 ├── Media
 ├── SeasonPerformance
 ├── TransportProfile
 ├── AcademicProfile
 └── MedicalClearance

Organization
 └── Opportunity
       └── OpportunityApplication ─── Player

Player + Opportunity
 └── OpportunityReadiness (derived)

Player
 └── FootballReadiness (derived)

OpportunityApplication
 └── Outcome

All critical actions
 └── AuditEvent
```

This is conceptual only. It is **not yet a database schema or ERD**.

---

## 13. Boundaries and Unresolved Decisions

The following remain deliberately unresolved until later gates:

- exact legal definition and verification of guardian authority;
- jurisdiction-specific age/consent requirements;
- identity verification provider/process;
- exact verification authority hierarchy;
- evidence storage and integrity mechanism;
- retention periods;
- exact authorization/RLS model;
- whether Scout should be modeled as a distinct domain actor from User + role;
- whether Trial is a subtype of Opportunity or a specialized Opportunity record;
- exact readiness decision rules;
- dispute/correction workflow;
- moderation authority and escalation;
- organization verification process.
- exact operational safeguarding response procedure and competent authority;
- exact product/legal effect of child participation, objection, assent, or capacity in different contexts;
- legal basis and operational rules for disclosure/republication in context.

Unresolved does not mean forgotten. Each item must be resolved with an explicit decision and evidence before implementation depends on it.

---

## 14. Gate 1 Exit Criteria

Gate 1 should not be considered closed merely because this file exists.

Candidate exit criteria:

- [x] Entity boundaries reviewed against the Constitution.
- [x] Ownership and authority reviewed.
- [x] Evidence model accepted.
- [x] Temporal behavior accepted.
- [x] Visibility classes accepted.
- [x] Minor/guardian semantic boundary accepted.
- [x] Readiness semantics accepted.
- [x] Global semantic invariants accepted.
- [x] Unresolved decisions assigned to later gates.
- [ ] ERD can be derived without inventing missing domain concepts.

**Current status: GATE 1 CLOSED — DOMAIN INTEGRITY BASELINE ACCEPTED 2026-10-05.**

Closure is based on the dedicated Gate 1 Closure Review. Remaining legal, operational, authorization, and implementation questions are explicitly deferred and must not be treated as implicitly decided.

---

## 15. Next Gate

Gate 1 closure was recorded on 2026-10-05 after explicit disposition of the remaining legal/product/operational boundaries as later-gate work. The closure review found no semantic blocker and does not authorize implementation by itself.

Once Gate 1 is closed:



**Gate 2 — Relationship Model / ERD**

The ERD should be derived from this document rather than used to discover the domain accidentally.

Only after the relationship model is stable should ScoutSA freeze:

1. MVP entity subset;
2. event model;
3. API contract;
4. database schema;
5. authorization/RLS;
6. implementation.

---

**End of Domain Model Draft**


## 9.1 Ratified Safeguarding Case/Response

**Safeguarding Case/Response** is a first-class semantic domain concept representing the substantive safeguarding response context around a concern/report and, where applicable, subsequent finding/substantiation, protective action, investigation outcome, and final resolution.

Not every case must pass through every state.

### Conceptual aspects, where applicable

- case/response identity;
- safeguarding subject;
- concern/report provenance;
- submitting/receiving actor;
- relevant organization/opportunity context;
- temporal history;
- response state(s);
- responsible authority/process reference where applicable;
- supporting Evidence;
- protective action records where applicable;
- investigation outcome where applicable;
- final resolution where applicable;
- disclosure/access classification;
- correction/dispute provenance.

### Safeguarding Case/Response invariants

1. CONCERN / REPORT ≠ FINDING / SUBSTANTIATION.
2. FINDING / SUBSTANTIATION ≠ PROTECTIVE ACTION.
3. PROTECTIVE ACTION ≠ INVESTIGATION OUTCOME.
4. INVESTIGATION OUTCOME ≠ FINAL RESOLUTION.
5. VERIFICATION ≠ SAFEGUARDING CLEARANCE.
6. PROTECTIVE ACTION ≠ GUILT.
7. CASE EXISTENCE ≠ TRUTH.
8. CASE EXISTENCE ≠ LEGAL VALIDITY.
9. Historical response records remain distinguishable from current applicability.
10. Safeguarding record visibility does not imply public disclosure.
11. Multiple or contradictory reports remain attributable and are not silently merged or automatically assigned greater evidentiary weight.
12. AI does not acquire authority to determine guilt, safeguarding findings, investigation outcomes, or final resolution.
13. Exact safeguarding authority and operating procedure remain context-dependent and deferred to applicable law, policy, and competent process.

These are semantic requirements, not database columns or implementation mechanics.


## 9.2 Ratified Child Participation / Voice Record

**Child Participation / Voice Record** is a first-class semantic domain concept representing an attributable record of a child's expressed view or participation in a defined matter/context, preserved with provenance and temporal context and kept distinct from Guardian authority, ConsentRecord, and any resulting Decision.

### Conceptual aspects, where applicable

- child/player subject;
- expressed view or participation event;
- matter/purpose/context;
- expressing actor;
- time/effective context;
- provenance;
- relationship to Guardian authority/ConsentRecord;
- resulting Decision reference where applicable;
- correction/dispute history;
- visibility/access classification.

### Child Participation / Voice invariants

1. CHILD VOICE ≠ GUARDIAN AUTHORITY.
2. CHILD VOICE ≠ CONSENT.
3. CHILD VOICE ≠ FINAL DECISION.
4. Child objection does not create an automatic veto.
5. Guardian authority does not automatically suppress the child's expressed view where participation/consideration is applicable.
6. Historical child expression remains distinct from later decisions.
7. A child's expressed view may change over time without rewriting prior views.
8. Conflicting child and Guardian views remain attributable until an applicable authority/process determines their effect.
9. Exact age, capacity, assent, consent, and participation effects are context-dependent and must not be invented by the domain model.
10. AI does not acquire authority to determine capacity, best interests, consent validity, or final decision.
11. Recording a child's view does not create public disclosure or republication permission.

These are semantic requirements, not database columns or implementation mechanics.
