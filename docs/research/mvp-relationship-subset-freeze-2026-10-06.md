# ScoutSA MVP Relationship Subset Freeze — 2026-10-06

**Status:** Draft for review  
**Authority:** Derived from the ratified MVP Boundary and frozen Gate 2 conceptual ERD  
**Rule:** This document selects relationships for MVP; it does not invent new domain semantics or technical keys.

## 1. Purpose

The MVP Boundary is ratified. This artifact now selects the minimum relationship subset required to operate the approved MVP loop.

## 2. MVP relationship subset

| Concept / relationship | MVP status | Reason |
|---|---|---|
| User ↔ Player | REQUIRED, cardinality deferred | Account access must remain distinct from football identity. |
| Player ↔ GuardianLink ↔ Guardian | REQUIRED for applicable minor flows | Guardian relationship is central to protected opportunity pathways. |
| Player ↔ Membership ↔ Organization | REQUIRED | Establishes club/school/academy context without mutable current-organization fields. |
| Player ↔ ConsentRecord | REQUIRED | Purpose-bound authorization is required for protected discovery/contact/trial paths. |
| Player ↔ Assertion | REQUIRED | Preserves attributable claims and provenance. |
| Assertion ↔ Evidence | REQUIRED | Claims must remain supportable and traceable. |
| Player ↔ Verification | REQUIRED | Discovery depends on scoped verification signals. |
| Player ↔ Media | MVP-LIMITED | Only media necessary for legitimate football discovery is included. |
| Player ↔ SeasonPerformance | MVP-LIMITED | Relevant football evidence only. |
| Player ↔ TransportProfile | REQUIRED for relevant opportunity feasibility | Opportunity Readiness must account for realistic access. |
| Player ↔ AcademicProfile | CONDITIONAL | Only information justified by a legitimate opportunity requirement. |
| Player ↔ MedicalClearance | CONDITIONAL | Minimum clearance state only where legitimately required. |
| Organization ↔ Opportunity | REQUIRED | Opportunities are the core demand-side object. |
| Opportunity ↔ OpportunityApplication ↔ Player | REQUIRED | Structured contact/trial interaction. |
| Application ↔ Outcome | REQUIRED, minimal | Records genuine pathway results without claiming causation. |
| Player + Opportunity → OpportunityReadiness | REQUIRED, DERIVED | Feasibility is opportunity-specific. |
| Player → FootballReadiness | REQUIRED, DERIVED | Keeps football evidence distinct from opportunity feasibility. |
| Child Participation/Voice ↔ defined matter/context | REQUIRED where applicable | Preserves child participation separately from authority/decision. |
| Safeguarding Case/Response ↔ defined safeguarding matter/subject | REQUIRED where an MVP safeguarding event occurs | Preserves response provenance without adjudication. |
| Material actor/action → AuditEvent | REQUIRED | Accountability for material MVP actions. |

## 3. Deliberately excluded from MVP relationship implementation

These remain in the frozen conceptual model but are not required as independent MVP implementation surfaces unless a concrete MVP flow proves the need:

- advanced organization hierarchies;
- generalized role-delegation networks;
- unrestricted User ↔ Player shared-access models;
- generalized social relationships;
- agent relationships;
- transfer/contract relationships;
- payment relationships;
- public-contact relationships;
- generalized ranking/reputation relationships;
- AI decision relationships.

Exclusion from MVP implementation does not delete these concepts from the conceptual model.

## 4. Required relationship invariants

1. User is not silently treated as Player.
2. GuardianLink is not silently treated as ConsentRecord.
3. Membership does not create universal organization authority.
4. Assertion does not become Evidence or Verification.
5. Verification does not become Truth or Safeguarding Clearance.
6. Discoverability does not become republication permission.
7. Child Voice does not become Consent, Guardian authority, or final Decision.
8. Safeguarding Case/Response does not become guilt or clearance.
9. OpportunityApplication state does not become Outcome.
10. Outcome does not become ranking, reputation, or proof of platform causation.
11. Readiness remains derived and contextual.
12. Historical records are not silently rewritten when current applicability changes.

## 5. Implementation prerequisites still blocking schema

The following must be decided before their respective implementation paths:

- User ↔ Player cardinality/delegation policy;
- actor ↔ Organization affiliation/authorization policy;
- Guardian/authorizer applicability rules;
- application participants and transition authority;
- application lifecycle vocabulary;
- outcome correction/dispute/supersession policy;
- access/disclosure policy;
- retention/deletion basis;
- safeguarding escalation ownership;
- child-participation effects in concrete workflows;
- required vs optional field-level MVP data;
- acceptance tests for each protected flow.

## 6. 33×3 review

**Existence:** PASS — every selected relationship maps to an established conceptual relationship.

**Coherence:** PASS — no selected relationship contradicts the Constitution, Domain Model, ratified M1–M9 boundaries, or Gate 2 conceptual freeze.

**Failure containment:** PASS — unresolved policy is explicitly carried forward rather than hidden in technical design.

## 7. Decision

**MVP RELATIONSHIP SUBSET: READY FOR FREEZE REVIEW.**

No schema, RLS, API, UI, authentication implementation, or production behavior is authorized by this document.

Next controlled action:

**MVP Relationship Subset Review → implementation-prerequisite freeze → schema design.**


# MVP Relationship Subset — Adversarial Freeze Review — 2026-10-06

**Authority:** Review only. Derived from the ratified MVP Boundary and frozen conceptual ERD.  
**Decision:** PASS — READY FOR FREEZE.

## 1. Review test

The subset was tested against four failure modes:

- hidden semantic invention;
- accidental legal/authority assumption;
- technical leakage into conceptual design;
- omission of a relationship required by the approved MVP loop.

## 2. Results

| Test | Result | Finding |
|---|---|---|
| Frozen ERD coverage | PASS | Every required MVP relationship maps to an established concept. |
| MVP loop coverage | PASS | Passport → verification/evidence → opportunity → discovery → application/contact → protected gates → outcome is representable. |
| Semantic integrity | PASS | No M1–M9 boundary is collapsed. |
| Authority containment | PASS | No role, membership, GuardianLink, verification or application state is promoted to universal authority. |
| Child boundary | PASS | Child Voice remains separate from Guardian authority, ConsentRecord and final Decision. |
| Safeguarding boundary | PASS | Case/Response remains separate from guilt, clearance, investigation outcome and final resolution. |
| Provenance | PASS | Assertion, Evidence, Verification, Outcome and AuditEvent remain distinguishable. |
| Disclosure | PASS | Discoverability does not imply republication or unrestricted contact-data disclosure. |
| Derived state | PASS | FootballReadiness and OpportunityReadiness remain derived. |
| Technical leakage | PASS | No foreign keys, RLS rules, API contracts, UI behavior, storage technology or schema cardinality has been invented. |
| Scope containment | PASS | Transfer marketplace, payments, unrestricted messaging, ranking/reputation, prediction and AI authority remain excluded. |
| 33×3 Existence | PASS | Selected relationships exist in the frozen conceptual model. |
| 33×3 Coherence | PASS | The subset is internally and constitutionally coherent. |
| 33×3 Failure containment | PASS | Deferred questions remain explicit and cannot silently become implementation assumptions. |

## 3. Required correction

No substantive correction is required.

The wording **“REQUIRED”** means required for the approved MVP relationship subset, not legally mandatory and not proof that every record must exist for every player.

“CONDITIONAL” and “MVP-LIMITED” relationships must remain conditional in implementation; they must not become universal data-collection requirements.

## 4. Freeze decision

**MVP RELATIONSHIP SUBSET: FROZEN — 2026-10-06**

This freeze authorizes the next controlled artifact only:

**Implementation-Prerequisite Freeze Review.**

It does NOT authorize schema, RLS, API, UI, authentication implementation, production deployment, or compliance claims.

## 5. Carry-forward

Before schema design, the implementation-prerequisite review must resolve or explicitly classify:

- exact MVP fields and data minimization;
- workflow states and transition ownership;
- access/disclosure purposes;
- Guardian/Consent behavior;
- safeguarding escalation ownership;
- child participation effects;
- correction/dispute behavior;
- retention/deletion basis;
- acceptance/evidence requirements.

No unresolved item may be silently encoded as a technical assumption.
