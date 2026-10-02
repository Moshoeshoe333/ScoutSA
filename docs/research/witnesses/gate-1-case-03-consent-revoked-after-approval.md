# Gate 1 Witness — Case 03: Consent Revoked After Prior Approval

**Status:** Witness result — candidate domain finding, not constitutional ratification  
**Repository:** `Moshoeshoe333/ScoutSA`  
**Branch:** `main`  
**Witness date:** 2026-10-02  
**Method:** 33×3 — Existence / Coherence / Failure  
**Governing principle:** Strength of claim must never exceed strength of evidence.

## 1. Point

Determine whether ScoutSA can reconstruct a protected opportunity decision when valid consent existed at decision time but was later revoked.

### Adversarial case

Player P is a minor. Guardian A has an active, purpose-specific consent allowing Opportunity O to proceed and permitting the disclosure required for that opportunity.

Timeline:

1. `T1` — GuardianLink is active and within scope.
2. `T2` — ConsentRecord grants trial participation/disclosure for Opportunity O.
3. `T3` — ScoutSA evaluates readiness and approves the protected workflow.
4. `T4` — required disclosure occurs.
5. `T5` — Guardian A revokes the relevant consent.
6. `T6` — a new attempt is made to disclose information or continue the opportunity.

The witness must distinguish what was authorized at `T3/T4` from what is authorized at `T6`.

---

## 2. EXISTENCE

### A1 — Can consent exist as a first-class record?

**Result: PASS.**

`ConsentRecord` is explicitly modeled as versioned, purpose-specific, effective, revocable and optionally expiring.

### A2 — Can consent identify purpose?

**Result: PASS.**

Examples include profile visibility, contact requests, media sharing, academic visibility, medical-clearance access and opportunity/trial participation.

### A3 — Can consent have temporal state?

**Result: PASS.**

The model explicitly supports effective periods, revocation and optional expiry.

### A4 — Can revocation be preserved historically?

**Result: PASS IN PRINCIPLE.**

The model states that revocation changes current authorization without erasing historical evidence.

### A5 — Can the system identify exactly what decision a consent supported?

**Result: PARTIAL / UNPROVEN.**

The model defines purpose and context, but it does not yet fully specify the immutable relationship between a consent version, the decision that relied upon it, the disclosed fields/data, and the exact evaluation time.

---

## 3. COHERENCE

### B1 — Does consent equal permanent permission?

**Result: PASS.**

The model explicitly rejects this. Consent is current, purpose-bound and revocable.

### B2 — Does revocation erase history?

**Result: PASS.**

Historical consent and revocation events must remain reconstructable.

### B3 — Does revocation retroactively make the historical decision unauthorized?

**Result: UNPROVEN / IMPORTANT GAP.**

The domain needs to distinguish:

`authorized at evaluation/disclosure time`

from:

`authorized now`.

Otherwise a later revocation could incorrectly rewrite the meaning of an earlier valid decision.

### B4 — Does prior approval survive revocation?

**Result: PARTIAL.**

The historical fact that approval occurred can survive, but the current model does not fully define whether the approval remains executable, becomes stale, is suspended, or must be re-evaluated after revocation.

### B5 — Can purpose be narrower than possession?

**Result: PASS.**

Possession of information does not itself authorize disclosure or repurposing.

### B6 — Can one consent purpose be revoked while another remains active?

**Result: PASS IN PRINCIPLE.**

Granular purpose-bound consent supports this, although the exact conflict/preference evaluation mechanism remains to be witnessed.

### B7 — Can consent be used as evidence without becoming truth?

**Result: PASS.**

A consent action establishes that a permission event occurred; it does not establish unrelated facts about the Player.

---

## 4. FAILURE

### F1 — Revocation occurs after valid approval but before disclosure

**Result: RED / MATERIAL GAP.**

The system needs deterministic semantics for whether the pending action is cancelled, held for re-authorization, or otherwise resolved.

The correct result cannot be inferred merely from the historical approval.

### F2 — Revocation occurs after disclosure

**Result: PARTIAL.**

Historical disclosure must remain auditable. Revocation cannot make the historical event disappear.

However, the model must separately define what revocation does to continued retention, subsequent use, onward disclosure, correction/restriction, and disposal according to applicable purpose and lawful basis.

### F3 — Revocation occurs after a readiness evaluation

**Result: RED / MATERIAL GAP.**

Opportunity Readiness must become stale when a material authorization input changes.

The current Domain Model says readiness becomes stale when material inputs change, but it does not yet provide the complete provenance required to prove that this particular revocation invalidated the earlier readiness state.

### F4 — Revocation applies to media but not trial participation

**Result: PASS IN PRINCIPLE.**

Purpose-bound consent prevents a media revocation from automatically being interpreted as revocation of every other purpose.

### F5 — Revocation is submitted by an actor lacking authority

**Result: UNPROVEN.**

Because Case 2 found an authority-conflict gap, ScoutSA cannot yet fully establish which actor may validly revoke which consent when authority itself is disputed.

### F6 — Consent expires without explicit revocation

**Result: PASS IN PRINCIPLE.**

Expired consent must not silently function as current authorization.

### F7 — New purpose is introduced after original consent

**Result: PASS.**

Original purpose-bound consent must not silently authorize repurposing.

---

## 5. Reverse Trace

### Decision → Consent

A decision such as:

`Opportunity O → APPROVED`

must be reconstructable through:

`Decision → evaluation time → purpose → consent version → granting authority → GuardianLink/authority scope → evidence → opportunity requirements → derived readiness → disclosure decision → audit`

**Result: FAIL / MATERIAL GAP.**

The vocabulary exists, but the exact immutable dependency chain is not yet defined.

### Consent → Decision

Starting from the revocation at `T5`, the system must determine every material decision or disclosure that relied upon the affected consent and distinguish:

- completed historical actions;
- pending actions;
- current permissions;
- derived states that are now stale;
- future actions that require renewed authorization.

**Result: FAIL / MATERIAL GAP.**

---

## 6. Candidate Finding

### C-001 — Consent Precedence / Temporal Authorization

The witness confirms the earlier candidate that ScoutSA requires deterministic semantics connecting consent versions to point-in-time decisions.

The minimum semantic requirement is:

> A later revocation changes current authorization without silently rewriting a previously valid historical decision; any pending or future protected action must be evaluated against the current applicable authority, purpose, consent/lawful basis and safeguarding state.

This does **not** prescribe a specific legal retention/deletion outcome. Those rules require legal/domain review against the actual processing activity.

---

## 7. New Provenance Requirement

Case 3 exposes a broader requirement for derived states:

Every material derived state should be reconstructable from:

- subject;
- opportunity/context;
- evaluation timestamp;
- applicable rule/evaluation version;
- material input record IDs;
- consent/authority state used at evaluation;
- evidence/verification references;
- resulting state;
- subsequent invalidation/staleness event, where applicable.

This is a candidate requirement, not a ratified schema.

---

## 8. Relationship to Previous Cases

Case 1 established the need to separate:

`ASSERTION ≠ EVIDENCE`

Case 2 established the need to separate:

`AUTHORITY ≠ ROLE`
`AUTHORITY ≠ GUARDIANLINK ALONE`
`CONSENT ≠ AUTHORITY`

Case 3 adds:

`CURRENT AUTHORIZATION ≠ HISTORICAL AUTHORIZATION`
`REVOCATION ≠ ERASURE OF HISTORY`
`PRIOR DECISION ≠ CURRENT PERMISSION`
`CONSENT ≠ PERMANENT DISCLOSURE AUTHORITY`

The candidate epistemic/control chain therefore remains:

`SUBJECT → ASSERTION → AUTHORITY / SCOPE → EVIDENCE → INFORMATION QUALITY → VERIFICATION → DERIVED STATE → DECISION → CONTROLLED DISCLOSURE → AUDIT`

Cross-cutting constraints remain:

`PURPOSE · TIME · VISIBILITY · AUTHORIZATION · CONSENT/LAWFUL BASIS · SAFEGUARDING`

---

## 9. Gate Result

**Gate 1 — Case 3: RED / MATERIAL DOMAIN GAP.**

ScoutSA already has strong conceptual consent semantics: granular, purpose-bound, revocable and history-preserving.

The unresolved seam is temporal decision provenance: the system does not yet prove that it can distinguish a decision that was valid when made from an action that is authorized now.

**Gate 1 remains OPEN.**
**Gate 2 remains NOT STARTED.**

---

## 10. Next Adversarial Cases

1. Evidence expires after claim verification.
2. Opportunity changes after readiness evaluation.
3. Unverified scout contacts a minor.
4. Guardian authorizes trial but not media.
5. Child participation preference conflicts with guardian authorization.
6. Safeguarding concern against a verified organization user.
7. Institutional record conflicts with ScoutSA assertion.
8. Authentic but stale evidence.
9. Two legitimate authorities make incompatible assertions.
10. Derived readiness survives withdrawal of a material input.

No ERD/schema expansion should occur before the adversarial set converges.

## Witness conclusion

> **ScoutSA must preserve the difference between what was authorized then and what is authorized now.**

A revocation must change current authorization without rewriting historical events, and any material derived state depending on the revoked permission must become traceably stale or otherwise re-evaluated.

**No constitutional amendment is ratified by this witness.**