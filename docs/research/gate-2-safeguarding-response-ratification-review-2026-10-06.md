# Gate 2 Safeguarding Response — Ratification Review

**Seam:** G2-SEAM-05  
**Date:** 2026-10-06  
**Status:** Ratification review  
**Authority:** Gate 2 governance process; semantic only

## 1. Point

Determine whether the candidate first-class **Safeguarding Case/Response** concept is eligible for ratification without inventing legal authority, collapsing safeguarding states, converting records into truth, or authorizing implementation mechanics.

Guiding rule:

> A safeguarding record must preserve what was reported, what process occurred, what action was taken, and what outcome was reached without silently converting one state into another.

## 2. Candidate under review

The candidate represents the substantive safeguarding response context that connects, where applicable:

**Concern / Report → Response / Case Context → Finding / Substantiation → Protective Action → Investigation Outcome → Final Resolution**

Not every case must pass through every state.

The candidate is a semantic domain concept, not a database table specification.

## 3. Ratification tests

### R-01 — Existing M1–M9 compatibility

The candidate preserves M1–M9, especially:

- ASSERTION ≠ EVIDENCE
- ASSERTION ≠ TRUTH
- HISTORICAL VALIDITY ≠ CURRENT APPLICABILITY
- DERIVED STATE ≠ SOURCE OF TRUTH
- VERIFICATION ≠ SAFEGUARDING CLEARANCE
- CONCERN / REPORT ≠ FINDING / SUBSTANTIATION
- PROTECTIVE ACTION ≠ INVESTIGATION OUTCOME
- INVESTIGATION OUTCOME ≠ FINAL RESOLUTION
- DISCOVERABLE ≠ REPUBLISHABLE

**Disposition: PASS.**

### R-02 — Provenance

The candidate preserves attribution, temporal context, subject/scope, process context, and correction/dispute provenance.

Exact fields, storage, retention, and integrity mechanisms remain implementation/deployment decisions.

**Disposition: PASS.**

### R-03 — Authority boundary

The candidate may reference a responsible authority/process where applicable, but does not itself declare who has legal investigative or adjudicative authority.

No universal safeguarding authority hierarchy is created.

**Disposition: PASS.**

### R-04 — Truth boundary

The existence of a concern, report, case, protective action, finding, investigation outcome, or resolution record does not by itself establish truth outside the applicable process and authority.

**Disposition: PASS.**

### R-05 — State separation

The candidate does not collapse report, finding, protective action, investigation outcome, or final resolution.

A current status, if later defined, must remain traceable to underlying response records and applicable authority.

**Disposition: PASS.**

### R-06 — Multiple and contradictory reports

Multiple reports concerning the same subject remain individually attributable. Duplicate reports do not automatically multiply evidentiary weight.

Contradictory records remain distinguishable until an authorized resolution process applies.

**Disposition: PASS.**

### R-07 — Protective action

Protective action may be recorded where an authorized process permits it. It is not itself proof of guilt, final resolution, or permanent exclusion.

**Disposition: PASS.**

### R-08 — Verification separation

Verified identity, role, organization, or football claims do not create safeguarding clearance.

An unverified concern does not automatically establish guilt or permanent exclusion.

**Disposition: PASS.**

### R-09 — Disclosure boundary

A safeguarding case/response record is not public merely because a Player or Organization is discoverable.

Disclosure/access classification remains contextual and subject to applicable law, policy, and product decisions.

**Disposition: PASS.**

### R-10 — AI boundary

The candidate does not grant AI authority to determine guilt, innocence, legal precedence, best interests, safeguarding findings, investigation outcomes, or final resolution.

**Disposition: PASS.**

### R-11 — AuditEvent boundary

AuditEvent remains an accountability/history mechanism. It does not replace the substantive safeguarding response concept.

**Disposition: PASS.**

### R-12 — Implementation deferral

Ratification of the semantic concept does not authorize:

- database schema;
- foreign keys or cardinalities;
- RLS;
- API behavior;
- UI;
- automated safeguarding decisions;
- retention periods;
- fixed disclosure rules;
- operational investigation procedures.

**Disposition: PASS.**

## 4. Minimal ratified semantics

If accepted, the Safeguarding Case/Response concept carries, where applicable:

- a case/response identity;
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

These are semantic requirements, not database columns.

## 5. Explicit non-ratifications

This review does **not** ratify:

- allegation = guilt;
- report = finding;
- protective action = guilt;
- verification = safeguarding clearance;
- one report = permanent exclusion;
- current status = historical truth;
- case existence = legal validity;
- AI = safeguarding adjudicator;
- automatic public disclosure;
- universal safeguarding authority;
- fixed investigation procedure;
- fixed retention duration;
- POPIA/Children's Act compliance certification;
- production readiness.

## 6. Ratification decision

**G2-05A — Existing safeguarding distinctions:** RATIFIED / CONFIRMED.

**G2-05B — AuditEvent alone sufficient:** NO.

**G2-05C — First-class Safeguarding Case/Response semantic concept:** **ELIGIBLE FOR RATIFICATION.**

**G2-05D — Exact authority/procedure:** DEFERRED.

**G2-05E — Schema/RLS/API/UI/implementation:** DEFERRED.

### Decision

The candidate closes a genuine semantic representation gap identified by the G2-SEAM-05 re-witness and does so without contradicting the Constitution, M1–M9, or the ratified Assertion concept.

**Result: ELIGIBLE FOR EXPLICIT RATIFICATION.**

Because this review concerns a new semantic domain concept, the next controlled action is explicit ratification followed by reconciliation of:

**Constitution → Domain Model → Relationship Model → Ledger**

No ERD/schema/implementation work is authorized merely by this eligibility finding.

## 7. Gate state

```
GATE 1: CLOSED
M1–M9: RATIFIED
ASSERTION: RATIFIED
G2-SEAM-05: ELIGIBLE FOR RATIFICATION
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED
```
