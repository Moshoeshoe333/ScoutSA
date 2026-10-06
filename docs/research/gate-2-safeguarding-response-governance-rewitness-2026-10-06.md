# Gate 2 Governance / Re-Witness — Safeguarding Response Structure

**Seam:** G2-SEAM-05  
**Status:** Governance review — semantic representation test  
**Date:** 2026-10-06  
**Authority:** Gate 2 governance control; no implementation authority

## 1. Point

Determine whether the existing ScoutSA domain can represent a safeguarding concern/report and its subsequent response states without collapsing allegation, finding, protective action, investigation outcome, and final resolution.

Guiding rule:

> A safeguarding concern is not itself proof of wrongdoing, and verification is not safeguarding clearance.

## 2. Existing ratified boundaries

The Gate 1 baseline already ratifies:

- VERIFICATION ≠ SAFEGUARDING CLEARANCE
- CONCERN / REPORT ≠ FINDING / SUBSTANTIATION
- FINDING / SUBSTANTIATION ≠ PROTECTIVE ACTION
- PROTECTIVE ACTION ≠ INVESTIGATION OUTCOME
- INVESTIGATION OUTCOME ≠ FINAL RESOLUTION

The Domain Model also requires safeguarding response states to remain distinct and states that exact safeguarding procedure/authority is deferred.

## 3. Adversarial re-witness

### RW-01 — Concern / report

A report or concern must be representable as an attributable event/record without being treated as a finding.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-02 — Source / provenance

The system must preserve who or what submitted/recorded the concern, when it was received, its subject/scope, and provenance appropriate to the eventual operating model.

**Disposition: SAFE SEMANTIC PRINCIPLE; exact fields deferred.**

### RW-03 — Finding / substantiation

A later finding must remain distinct from the original concern and must not rewrite it.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-04 — Protective action

Protective action may occur in response to a concern or finding where an authorized process permits it, but protective action is not itself proof of guilt or a final investigation outcome.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-05 — Investigation outcome

An investigation outcome must remain attributable to the applicable process/authority and distinct from the original report and interim protective action.

**Disposition: SAFE SEMANTIC PRINCIPLE; exact authority deferred.**

### RW-06 — Final resolution

Final resolution must remain distinct from interim protective action and earlier findings/outcomes.

**Disposition: SAFE SEMANTIC PRINCIPLE; exact resolution authority deferred.**

### RW-07 — Contradictory / multiple reports

Multiple reports may concern the same subject. They must not be silently merged into one allegation, and duplicate reporting must not automatically multiply the evidentiary weight.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-08 — Verification boundary

Verified organization/user status must not create safeguarding clearance. Conversely, an unverified concern must not automatically establish guilt or permanent exclusion.

**Disposition: SAFE / ALREADY RATIFIED.**

### RW-09 — Disclosure

Safeguarding records must not become public or broadly discoverable merely because the subject or organization is otherwise discoverable.

**Disposition: SAFE / ALREADY RATIFIED; exact disclosure policy deferred.**

### RW-10 — Current state

A current safeguarding status, if later defined, must be derived from or traceable to underlying response records and applicable authority, rather than replacing the historical record.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

## 4. Representation sufficiency test

The current domain has:

- AuditEvent;
- Verification;
- Evidence;
- User / Organization / Player relationships;
- ratified safeguarding distinctions.

However, it does **not** currently define a first-class safeguarding response/case record carrying the lifecycle relationship between:

Concern/Report → Finding/Substantiation → Protective Action → Investigation Outcome → Final Resolution

Nor does AuditEvent safely substitute for that domain object: an AuditEvent records system accountability, not necessarily the substantive safeguarding process state.

Therefore:

**Current relationship model is insufficient to freeze the safeguarding response ERD.**

## 5. Governance conclusion

A **first-class Safeguarding Case/Response concept is warranted as a candidate**, subject to governance ratification.

This is not yet a ratified new entity.

The candidate should preserve the lifecycle without implying that every case passes through every state.

Conceptually:

    Safeguarding Subject
           ↑
    Concern / Report
           ↓
    Response / Case context
       ├── Finding / Substantiation (where applicable)
       ├── Protective Action (where applicable)
       ├── Investigation Outcome (where applicable)
       └── Final Resolution (where applicable)

The candidate must not create:

- allegation = guilt;
- report = finding;
- protective action = guilt;
- verification = safeguarding clearance;
- one report = permanent exclusion;
- AI = safeguarding adjudicator;
- automatic public disclosure;
- invented investigation authority;
- automatic legal conclusion.

## 6. Candidate minimum semantics — NOT RATIFIED

If governance later accepts the concept, it would minimally preserve, where applicable:

- case/response identity;
- subject;
- report/concern provenance;
- receiving/submitting actor;
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

These are semantic requirements, not database columns.

## 7. Governance disposition

**G2-05A — Existing safeguarding invariants: RATIFIED / SAFE.**

**G2-05B — AuditEvent alone is sufficient to represent substantive safeguarding response lifecycle: NO.**

**G2-05C — First-class Safeguarding Case/Response concept: GOVERNANCE REVIEW REQUIRED.**

**G2-05D — Exact safeguarding authority/procedure: DEFERRED / MUST NOT BE INVENTED.**

**G2-05E — Schema/RLS/API/UI: HOLD.**

Required control:

> **STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED → DOMAIN RECONCILIATION**

## 8. Non-claims

This document does not establish:

- safeguarding compliance;
- legal reporting duties;
- investigative authority;
- guilt or innocence;
- universal exclusion rules;
- a safeguarding clearance badge;
- POPIA or Children’s Act compliance;
- database schema;
- RLS;
- API behavior;
- UI behavior;
- production readiness.

## 9. Gate state

**Gate 2:** OPEN  
**G2-SEAM-05:** GOVERNANCE STOP  
**ERD:** HOLD  
**Schema:** HOLD  
**Implementation:** DEFERRED