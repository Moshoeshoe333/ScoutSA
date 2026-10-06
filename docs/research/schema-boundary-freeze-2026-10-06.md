# ScoutSA Schema Boundary Freeze — 2026-10-06

**Status:** READY FOR ADVERSARIAL REVIEW  
**Authority:** Derived from the frozen conceptual ERD, ratified MVP Boundary, frozen MVP Relationship Subset, and ratified implementation prerequisites.

## 1. Purpose

Define the smallest conceptual data boundary from which a database schema may later be derived.

This is **not** a SQL schema. It does not select foreign keys, indexes, RLS policies, API contracts, storage providers, authentication mechanisms, or exact physical types.

## 2. Schema-boundary entities

### Core identity and access
- User
- Player
- Guardian
- GuardianLink
- Coach
- Scout
- Organization
- Membership

### Evidence and authorization
- Assertion
- Evidence
- Verification
- ConsentRecord
- Media

### Player opportunity context
- SeasonPerformance
- AcademicProfile
- MedicalClearance
- TransportProfile
- Opportunity
- OpportunityApplication
- Outcome

### Protected participation and accountability
- Child Participation / Voice Record
- Safeguarding Case / Response
- AuditEvent

### Derived state
- FootballReadiness
- OpportunityReadiness

## 3. Field-boundary classes

| Class | Meaning | Schema treatment |
|---|---|---|
| Semantically required | Necessary to preserve an established concept | Candidate required data |
| Operationally required | Needed for an approved workflow | Required only for that workflow |
| Legally conditional | Depends on applicable law/purpose/context | Conditional; never universal by default |
| Derived | Computed from source relationships/data | Must not replace source records |
| Audit/provenance | Needed to preserve accountability/history | Retained according to applicable policy/law |
| Implementation detail | Technical mechanism | Excluded from this boundary |

## 4. Mandatory semantic separations

The future schema must be capable of preserving, at minimum:

- User ≠ Player
- GuardianLink ≠ ConsentRecord
- Assertion ≠ Evidence
- Assertion ≠ Verification
- Evidence ≠ Truth
- Verification ≠ Safeguarding Clearance
- Membership ≠ Universal Organization Authority
- Child Voice ≠ Guardian Authority
- Child Voice ≠ Consent
- Child Voice ≠ Final Decision
- Safeguarding Case/Response ≠ Guilt
- OpportunityApplication ≠ Outcome
- Outcome ≠ Placement causation
- FootballReadiness ≠ OpportunityReadiness
- Derived State ≠ Source of Truth
- Discoverability ≠ Republication
- Historical validity ≠ current applicability
- Conflict ≠ resolution

## 5. Minimum provenance boundary

Where an MVP record represents an attributable claim, evaluation, authorization, safeguarding response, child expression, or outcome, the schema must leave room for:

- subject/context;
- attributable actor where applicable;
- relevant authority/scope context where applicable;
- temporal context;
- provenance/source reference where applicable;
- lifecycle/current-applicability distinction where applicable;
- supporting evidence or related record where applicable.

The exact physical representation is deferred.

## 6. Explicitly conditional data

The schema boundary must not turn these into universal collection requirements:

- academic details;
- medical details;
- guardian-related data beyond legitimate purpose;
- child voice data;
- safeguarding details;
- contact/disclosure details;
- media;
- transport information.

Minimum necessary collection and purpose limitation remain controlling principles.

## 7. Explicitly excluded from schema boundary

No MVP schema should be designed for:

- transfer-marketplace transactions;
- contracts;
- commissions, escrow or payments;
- unrestricted messaging;
- public contact directories;
- generalized social feeds;
- generalized ranking/reputation;
- automated talent prediction;
- AI adjudication;
- safeguarding-clearance badges;
- universal role permissions;
- automatic Guardian precedence;
- automatic latest-wins conflict resolution;
- investor/compliance certification state.

## 8. Schema design blockers

Before physical schema design, the following must have an explicit decision record:

1. exact MVP fields and optionality;
2. cardinalities where implementation requires them;
3. workflow state vocabulary and transition ownership;
4. access/disclosure rules;
5. guardian/consent behavior;
6. safeguarding escalation ownership;
7. child-participation effects;
8. correction/dispute/version behavior;
9. retention/deletion basis;
10. acceptance tests and evidence requirements.

A blocker may be classified as operational policy, legal/jurisdictional, or implementation detail. It must not be silently resolved as a database design choice.

## 9. 33×3

**Existence — PASS:** every boundary entity traces to the frozen conceptual ERD.

**Coherence — PASS:** the boundary preserves the Constitution, M1–M9 and Gate 2 semantics.

**Failure containment — PASS:** unresolved policy/legal questions remain explicit blockers.

## 10. Decision

**SCHEMA BOUNDARY: READY FOR ADVERSARIAL REVIEW.**

No physical schema, SQL, RLS, API, UI, authentication, storage implementation, or production deployment is authorized until this boundary passes review and is explicitly frozen.


# Adversarial Schema Boundary Review — 2026-10-06

**Decision:** PASS — SCHEMA BOUNDARY FROZEN

## Review

| Test | Result |
|---|---|
| Frozen ERD coverage | PASS |
| MVP relationship coverage | PASS |
| M1–M9 preservation | PASS |
| Authority/legal containment | PASS |
| Data-minimization boundary | PASS |
| Child participation boundary | PASS |
| Safeguarding boundary | PASS |
| Provenance/history boundary | PASS |
| Derived-state containment | PASS |
| Disclosure boundary | PASS |
| Technical leakage | PASS |
| Out-of-scope containment | PASS |
| 33×3 Existence | PASS |
| 33×3 Coherence | PASS |
| 33×3 Failure containment | PASS |

No hidden semantic concept was introduced. No legal conclusion was encoded. No unresolved policy was converted into a database rule.

**Freeze:** The schema boundary is frozen as the minimum conceptual data boundary for subsequent physical schema design.

**Not authorized:** SQL, foreign keys, indexes, RLS, API, UI, authentication, storage implementation, migrations, or production deployment.

## Next controlled phase

**Physical Schema Design — Draft**

The physical schema draft must trace every table/field/constraint to this frozen boundary and must mark every implementation choice that depends on an unresolved operational or legal decision.

No implementation claim may be made from a draft schema alone.
