# Gate 2 Child Participation / Voice — Ratification Review

**Seam:** G2-SEAM-06  
**Date:** 2026-10-06  
**Status:** Ratification review  
**Authority:** Gate 2 governance process; semantic only

## 1. Point

Test whether a first-class **Child Participation / Voice Record** closes the representation gap identified by G2-SEAM-06 without inventing legal capacity, consent, Guardian precedence, child veto, or AI decision authority.

## 2. Ratification tests

### R-01 — M8 compatibility

The candidate preserves:

- CHILD VOICE ≠ GUARDIAN AUTHORITY
- CHILD VOICE ≠ FINAL DECISION

**PASS.**

### R-02 — Consent separation

The candidate does not reuse ConsentRecord as a proxy for child voice and does not imply that expressed voice is universal legal consent.

**PASS.**

### R-03 — Authority separation

The candidate does not alter GuardianLink authority scope or create a new authority hierarchy.

**PASS.**

### R-04 — Decision separation

A resulting decision remains separately attributable and does not rewrite the historical child expression.

**PASS.**

### R-05 — Conflict preservation

Conflicting child and Guardian views remain separately attributable until an applicable authority/process determines their effect.

No latest-wins, Guardian-always-wins, child-always-wins, majority-wins, or automatic-veto rule is introduced.

**PASS.**

### R-06 — Temporal provenance

Views can change over time without rewriting historical expressions.

**PASS.**

### R-07 — Safeguarding boundary

The concept does not determine best interests, safeguarding guilt, capacity, or protective action.

**PASS.**

### R-08 — Disclosure boundary

Recording a child's view does not create public disclosure or republication permission.

**PASS.**

### R-09 — AI boundary

AI does not gain authority to determine capacity, best interests, consent validity, or final decision.

**PASS.**

### R-10 — Implementation deferral

Ratification would not authorize schema, RLS, API, UI, fixed age thresholds, retention periods, or operational procedures.

**PASS.**

## 3. Representation gap

The current domain has Player, Guardian, GuardianLink, ConsentRecord, Decision, and AuditEvent concepts, but none safely represents the substantive child expression itself.

Therefore the candidate closes a genuine semantic representation gap without collapsing existing distinctions.

## 4. Minimal semantic concept

**Child Participation / Voice Record** is an attributable record of a child's expressed view or participation in a defined matter/context, preserved with provenance and temporal context and kept distinct from Guardian authority, ConsentRecord, and any resulting Decision.

Where applicable, it may preserve:

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

These are semantic requirements, not database columns.

## 5. Explicit non-ratifications

This does not ratify:

- child voice = legal consent;
- child voice = automatic veto;
- child voice = Guardian authority;
- Guardian authority = automatic suppression;
- child expression = final decision;
- universal assent/consent rules;
- fixed age or capacity threshold;
- AI capacity assessment;
- AI best-interests determination;
- automatic conflict resolution;
- POPIA/Children's Act compliance certification;
- database schema;
- RLS/API/UI;
- production readiness.

## 6. Decision

**G2-06A — Existing child-voice distinctions:** RATIFIED / CONFIRMED.

**G2-06B — ConsentRecord alone sufficient:** NO.

**G2-06C — AuditEvent alone sufficient:** NO.

**G2-06D — First-class Child Participation / Voice Record:** **ELIGIBLE FOR RATIFICATION.**

The candidate closes the witnessed semantic gap and is consistent with the Constitution, Domain Model, M1–M9, Assertion, and ratified Safeguarding Case/Response semantics.

**Result: ELIGIBLE FOR EXPLICIT RATIFICATION.**

No schema or implementation is authorized from this eligibility finding.

## 7. Gate state

```
GATE 1: CLOSED
M1–M9: RATIFIED
ASSERTION: RATIFIED
SAFEGUARDING CASE/RESPONSE: RATIFIED
G2-SEAM-06: ELIGIBLE FOR RATIFICATION
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
IMPLEMENTATION: DEFERRED
```
