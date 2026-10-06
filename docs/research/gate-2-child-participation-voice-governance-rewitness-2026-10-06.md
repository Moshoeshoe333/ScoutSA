# Gate 2 Governance / Re-Witness — Child Participation / Objection / Assent / Decision

**Seam:** G2-SEAM-06  
**Date:** 2026-10-06  
**Status:** Governance review — semantic representation test  
**Authority:** Gate 2 governance process; no implementation authority

## 1. Point

Determine whether the current domain can represent a child's expressed view in a matter affecting the child while keeping that view distinct from Guardian authority, consent, and the resulting decision.

Guiding rule:

> Child voice must be preserved without silently becoming Guardian authority, an automatic veto, or the final decision.

## 2. Existing ratified boundaries

Gate 1 M8 already ratifies:

- CHILD VOICE ≠ GUARDIAN AUTHORITY
- CHILD VOICE ≠ FINAL DECISION

It also requires the child's expressed view to be preserved separately where applicable law or policy requires participation or consideration of the child's views.

The Domain Model separately defines GuardianLink and ConsentRecord, and distinguishes consent from authority.

## 3. Adversarial re-witness

### RW-01 — Child expressed view

A child may express a preference, objection, agreement, concern, or other view about a matter affecting them.

That expression must remain attributable and temporally situated.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-02 — Child voice ≠ Guardian authority

A child's expressed view does not silently change the legal/product authority represented by GuardianLink.

**Disposition: SAFE / ALREADY RATIFIED.**

### RW-03 — Child voice ≠ consent

A child's expressed view must not automatically be treated as a legally sufficient consent record for every purpose.

Conversely, Guardian consent must not silently erase the child's expressed view where participation/consideration is applicable.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-04 — Child voice ≠ veto

Preserving a child's view does not create a universal veto over every decision.

Its contextual effect remains dependent on applicable law, policy, age/maturity/capacity rules where relevant, safeguarding context, and product decisions.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-05 — Child voice ≠ final decision

A resulting decision must remain separately attributable to the applicable decision process.

The decision record must not rewrite the historical child expression.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-06 — Objection

A child's objection is a form of expressed view and should remain distinguishable from a final authorization or decision.

Where an objection has operational effect, that effect must be determined by applicable authority/process rather than invented by the data model.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-07 — Assent / participation

Where a process uses concepts such as assent or participation, those concepts must not be silently equated with universal legal consent.

Exact age, capacity, consent, assent, and participation effects are jurisdiction/process-specific and remain deferred.

**Disposition: SAFE SEMANTIC PRINCIPLE; exact legal effect deferred.**

### RW-08 — Conflicting child and Guardian views

If a child's expressed view differs from a Guardian's authorization, the records must remain separately attributable.

No latest-wins, Guardian-always-wins, child-always-wins, majority-wins, or automatic-veto rule is invented.

**Disposition: SAFE SEMANTIC PRINCIPLE; resolution effect deferred.**

### RW-09 — Temporal change

A child may change their expressed view over time.

Historical views remain distinguishable from later views and from the resulting decision.

**Disposition: SAFE SEMANTIC PRINCIPLE.**

### RW-10 — Disclosure

A child's expressed view is sensitive contextual information. Recording it does not create permission to expose or republish it.

**Disposition: SAFE / consistent with disclosure boundary.**

### RW-11 — AuditEvent sufficiency

AuditEvent can record that an action occurred, but does not safely represent the substantive child participation/voice relationship, its subject, purpose, contextual view, or relationship to a resulting decision.

**Disposition: INSUFFICIENT.**

## 4. Representation sufficiency test

Existing concepts can identify:

- Player;
- Guardian;
- GuardianLink;
- ConsentRecord;
- AuditEvent;
- Opportunity/application context.

However, they do not currently provide a first-class semantic object for:

**Child → expressed view → subject/context/purpose → time → resulting decision relationship**

Using ConsentRecord for this would incorrectly turn child voice into consent.

Using GuardianLink would incorrectly turn child voice into Guardian authority.

Using AuditEvent would reduce substantive participation to a system event.

Therefore:

**Current relationship model is insufficient to freeze the child participation/decision relationship.**

## 5. Governance conclusion

A first-class **Child Participation / Voice Record** concept is warranted as a candidate, subject to ratification.

Conceptually:

```
Player / Child
      │
      ▼
Participation / Voice Record
      │
      ├── view / preference / objection / participation context
      ├── purpose / matter
      ├── provenance + time
      └── resulting Decision (where applicable, without replacing the view)
```

The candidate must not create:

- child voice = legal consent;
- child voice = automatic veto;
- child voice = Guardian authority;
- Guardian authority = automatic suppression of child voice;
- child expression = final decision;
- AI = capacity assessor;
- AI = best-interests adjudicator;
- fixed age threshold invented by schema;
- universal assent/consent rule;
- automatic conflict resolution.

## 6. Candidate minimum semantics — NOT YET RATIFIED

If accepted, the concept would preserve, where applicable:

- child/player subject;
- expressed view or participation event;
- matter/purpose/context;
- author/expressing actor;
- time/effective context;
- provenance;
- relationship to applicable Guardian authority/ConsentRecord without conflating them;
- resulting decision reference where applicable;
- correction/dispute history;
- visibility/access classification.

These are semantic requirements, not database columns.

## 7. Governance disposition

**G2-06A — Existing CHILD VOICE ≠ GUARDIAN AUTHORITY boundary: RATIFIED / SAFE.**

**G2-06B — Existing CHILD VOICE ≠ FINAL DECISION boundary: RATIFIED / SAFE.**

**G2-06C — Child voice represented only by ConsentRecord: NO.**

**G2-06D — Child voice represented only by AuditEvent: NO.**

**G2-06E — First-class Child Participation / Voice Record: GOVERNANCE REVIEW REQUIRED.**

**G2-06F — Exact legal age/capacity/assent/consent effect: DEFERRED / MUST NOT BE INVENTED.**

**G2-06G — Schema/RLS/API/UI: HOLD.**

Required control:

> STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED → DOMAIN RECONCILIATION

## 8. Non-claims

This review does not establish:

- legal capacity;
- universal child veto;
- universal Guardian precedence;
- a fixed assent/consent age;
- best-interests determination;
- safeguarding adjudication;
- POPIA/Children's Act compliance;
- database schema;
- RLS;
- API/UI behavior;
- production readiness.

## 9. Gate state

**Gate 2:** OPEN  
**G2-SEAM-06:** GOVERNANCE STOP  
**ERD:** HOLD  
**Schema:** HOLD  
**Implementation:** DEFERRED
