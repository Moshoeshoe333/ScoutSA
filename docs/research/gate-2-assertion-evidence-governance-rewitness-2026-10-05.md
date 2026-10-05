# Gate 2 Governance / Re-Witness — Assertion / Claim ↔ Evidence

**Seam:** G2-SEAM-04  
**Status:** Governance review — pre-ratification  
**Date:** 2026-10-05  
**Authority:** Gate 2 governance control; no implementation authority  

## 1. Point

Determine whether the existing ScoutSA domain can represent an attributable assertion/claim and its supporting Evidence without inventing semantics through the ERD.

Guiding rule:

> Strength of claim must never exceed strength of evidence.

## 2. Existing ratified boundaries

The following are already ratified:

- ASSERTION ≠ EVIDENCE
- EVIDENCE ≠ VERIFICATION
- VERIFICATION ≠ TRUTH
- ROLE ≠ UNIVERSAL AUTHORITY
- AUTHORITY ≠ CONSENT
- CONFLICT ≠ RESOLUTION
- HISTORICAL VALIDITY ≠ CURRENT APPLICABILITY
- DERIVED STATE ≠ SOURCE OF TRUTH

The Domain Model also defines Authority as the actor permitted to make a particular assertion, and Evidence as an artifact, observation, assertion, or system event supporting a claim.

## 3. Re-witness

### RW-01 — Subject

An assertion must identify what person, organization, membership, performance record, opportunity, or other domain subject the assertion concerns.

**Disposition: SAFE / DERIVABLE.**

### RW-02 — Author

An assertion must retain the actor who made or submitted it. The author is not automatically the owner, verifier, or final authority.

**Disposition: SAFE / DERIVABLE.**

### RW-03 — Authority

The assertion may identify the authority/scope under which it was made where applicable. A role label alone must not establish universal authority.

**Disposition: SAFE / DERIVABLE.**

### RW-04 — Asserted proposition

The model needs to preserve what is actually being asserted, rather than only a pointer to supporting Evidence.

**Disposition: MATERIAL GAP.**

An Evidence record cannot safely substitute for this proposition because the same Evidence may support different claims in different contexts.

### RW-05 — Evidence cardinality

One assertion may be supported by multiple Evidence records; one Evidence record may support multiple assertions.

**Disposition: SAFE / DERIVABLE.**

### RW-06 — Contradiction

Contradictory assertions must remain separately attributable and must not be silently collapsed into a single truth value.

**Disposition: SAFE / DERIVABLE.**

### RW-07 — Temporal history

Assertions require temporal provenance sufficient to distinguish historical validity from current applicability.

**Disposition: SAFE / DERIVABLE.**

### RW-08 — Verification relationship

Verification may evaluate a defined assertion/claim or scope using Evidence, but verification must not replace the underlying assertion or become truth by record existence.

**Disposition: SAFE / DERIVABLE.**

### RW-09 — Derived state

Football Readiness and Opportunity Readiness may consume relevant assertions and Evidence but remain derived states, not replacements for source records.

**Disposition: SAFE / DERIVABLE.**

### RW-10 — Correction / dispute

Correction or dispute must preserve provenance rather than silently rewriting historical assertions.

**Disposition: MATERIAL OPERATIONAL DESIGN REQUIRED.**

Exact workflow is not ratified here.

### RW-11 — Visibility / disclosure

Assertion visibility and Evidence visibility must not be assumed identical. Discoverability does not imply republication permission.

**Disposition: SAFE / DERIVABLE; exact policy deferred.**

## 4. Adversarial conclusion

The current model can describe the *distinction* between assertion and Evidence, but it cannot represent the attributable proposition itself with sufficient precision using Player ↔ Evidence alone.

Therefore the ERD cannot safely derive the missing relationship without choosing semantics.

### Conclusion

**A first-class Assertion concept is warranted as a domain-level candidate.**

This is a governance finding, not yet a ratified amendment.

## 5. Minimum candidate semantics — NOT RATIFIED

If governance ratifies the concept, an Assertion would minimally represent:

- assertion identity;
- subject reference;
- author/submitter;
- applicable authority/scope, where relevant;
- asserted proposition/content or claim scope;
- creation/submission time;
- effective period where relevant;
- status/lifecycle sufficient to preserve history;
- provenance linkage;
- supporting Evidence relationship;
- correction/dispute reference where applicable;
- visibility/disclosure classification where applicable.

An Assertion would **not** automatically mean:

- truth;
- verification;
- legal validity;
- universal authority;
- consent;
- safeguarding clearance;
- current applicability;
- public disclosure.

## 6. Proposed relationships — NOT RATIFIED

Conceptually:

```
Subject
  ↑
Assertion
  ├── author / authority context
  ├── temporal status
  └── supports ← Evidence

Assertion → Verification (where a defined verification evaluates the assertion/scope)
Assertion → Derived State (as an input, never as replacement)
```

Multiplicity is deliberately left unfrozen until governance ratification and the remaining Gate 2 seams are reconciled.

## 7. New invariants proposed for ratification

These are candidate semantic boundaries only:

- ASSERTION ≠ EVIDENCE
- ASSERTION ≠ VERIFICATION
- ASSERTION ≠ TRUTH
- AUTHOR ≠ AUTHORITY
- EVIDENCE SUPPORTS ASSERTION ≠ EVIDENCE ESTABLISHES TRUTH
- CONTRADICTORY ASSERTIONS ≠ SILENT RESOLUTION
- HISTORICAL ASSERTION ≠ CURRENT APPLICABILITY
- ASSERTION VISIBILITY ≠ EVIDENCE VISIBILITY

## 8. Governance disposition

**G2-04R-01:** Existing Evidence concept remains valid.  
**G2-04R-02:** Verification remains a distinct scoped concept.  
**G2-04R-03:** Player ↔ Evidence alone is insufficient for attributable claim representation.  
**G2-04R-04:** A first-class Assertion concept is the minimum candidate that closes the observed semantic representation gap.  
**G2-04R-05:** This candidate is **NOT RATIFIED**.  

Required control:

> **STOP → GOVERNANCE REVIEW → EXPLICIT RATIFICATION IF ACCEPTED → DOMAIN RECONCILIATION → RELATIONSHIP MODEL UPDATE**

## 9. Non-claims

This document does not establish:

- POPIA compliance;
- Children’s Act compliance;
- a legal definition of authority;
- a universal Guardian hierarchy;
- a truth engine;
- a verification certification;
- an automatic dispute resolution rule;
- database schema;
- RLS;
- API behavior;
- UI behavior;
- production readiness.

## 10. Gate state

**Gate 2:** OPEN  
**G2-SEAM-04:** GOVERNANCE REVIEW COMPLETE / RATIFICATION PENDING  
**ERD:** HOLD  
**Schema:** HOLD  
**Implementation:** DEFERRED