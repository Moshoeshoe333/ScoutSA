# Gate 2 Assertion Concept — Ratification Review

**Seam:** G2-SEAM-04  
**Status:** Ratification review — decision required  
**Date:** 2026-10-05  
**Authority:** Gate 2 governance control

## 1. Decision under review

Whether ScoutSA should ratify a first-class semantic **Assertion** concept to represent an attributable proposition that may be supported by Evidence and evaluated by Verification.

This review does not authorize schema or implementation.

## 2. Evidence basis

The preceding governance re-witness established:

- Player ↔ Evidence alone is insufficient to represent an attributable proposition.
- Evidence may support multiple assertions.
- An assertion may have multiple supporting Evidence records.
- Contradictory assertions must remain separately attributable.
- Verification must remain distinct from the underlying assertion.
- Derived readiness must consume source records without replacing them.
- Historical assertion and current applicability must remain distinct.

## 3. Ratification test

### Test A — Does the candidate close a witnessed semantic gap?

**PASS.**

Without Assertion, the model has no clear domain carrier for the proposition itself.

### Test B — Does it contradict existing ratified semantics?

**PASS — no contradiction identified.**

The candidate strengthens rather than weakens:

- ASSERTION ≠ EVIDENCE
- EVIDENCE ≠ VERIFICATION
- VERIFICATION ≠ TRUTH
- AUTHORITY ≠ ROLE
- CONFLICT ≠ RESOLUTION
- HISTORICAL VALIDITY ≠ CURRENT APPLICABILITY
- DERIVED STATE ≠ SOURCE OF TRUTH

### Test C — Does it create unsupported authority?

**PASS.**

An Assertion does not itself establish authority. Authority remains scoped and separately determined.

### Test D — Does it create truth-by-record?

**PASS.**

Existence of an Assertion or Evidence record does not establish truth.

### Test E — Does it create automatic conflict resolution?

**PASS.**

Contradictory assertions remain preserved. No latest-wins, first-wins, majority-wins, or role-wins rule is introduced.

### Test F — Does it create automatic verification?

**PASS.**

Verification remains a separate scoped evaluation.

### Test G — Does it create automatic current applicability?

**PASS.**

Historical assertions remain distinct from current applicability.

### Test H — Does it force implementation prematurely?

**PASS.**

The candidate is semantic only. Multiplicity, storage, keys, RLS, API, UI, and implementation remain deferred.

## 4. Proposed ratified semantic definition

> **Assertion:** An attributable domain statement or claim about a defined subject, made or submitted by an actor within an applicable authority/scope where relevant, preserved with sufficient provenance and temporal context to distinguish the historical assertion from later applicability, and capable of being supported or evaluated by Evidence and Verification without itself constituting truth.

## 5. Ratified boundaries proposed

If accepted, the following become part of the Gate 2 semantic baseline:

- ASSERTION ≠ EVIDENCE
- ASSERTION ≠ VERIFICATION
- ASSERTION ≠ TRUTH
- AUTHOR ≠ AUTHORITY
- EVIDENCE SUPPORTS ASSERTION ≠ EVIDENCE ESTABLISHES TRUTH
- CONTRADICTORY ASSERTIONS ≠ SILENT RESOLUTION
- HISTORICAL ASSERTION ≠ CURRENT APPLICABILITY
- ASSERTION VISIBILITY ≠ EVIDENCE VISIBILITY

## 6. Explicit non-ratifications

Acceptance of Assertion does **not** ratify:

- any universal authority hierarchy;
- Guardian precedence;
- legal validity of an assertion;
- truth based on record existence;
- verification as truth;
- automatic conflict resolution;
- fixed freshness periods;
- automatic safeguarding clearance;
- public disclosure permission;
- AI adjudication;
- database schema;
- RLS;
- API contracts;
- UI behavior;
- production readiness.

## 7. Minimum semantic shape

The concept may carry, where applicable:

- subject;
- author/submitter;
- authority/scope context;
- asserted proposition or claim scope;
- creation/submission time;
- effective period;
- lifecycle/status;
- provenance;
- supporting Evidence;
- correction/dispute references;
- visibility/disclosure classification.

These are semantic requirements, not database columns.

## 8. Disposition

**Recommended governance disposition: ELIGIBLE FOR RATIFICATION.**

The evidence supports the minimum concept without requiring unsupported legal or operational assumptions.

**Current ratification state: PENDING EXPLICIT ACCEPTANCE.**

If accepted:

`Governance ratification → Domain Model reconciliation → re-witness → Relationship Model update`

If rejected:

`Preserve governance record → return to Gate 2 seam analysis without inventing an alternative representation`

## 9. Gate state

**Gate 2:** OPEN  
**G2-SEAM-04:** ELIGIBLE FOR RATIFICATION  
**Assertion concept:** NOT YET RATIFIED  
**Domain Model:** unchanged  
**Relationship Model:** unchanged  
**ERD:** HOLD  
**Schema:** HOLD  
**Implementation:** DEFERRED