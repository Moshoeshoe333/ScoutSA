# Gate 1 Witness — Case 14: Derived Readiness Survives Withdrawal of a Material Input

**Status:** Gate 1 witness — adversarial domain test  
**Scope:** Implementation-independent domain integrity  
**Governing principle:** Strength of claim must never exceed strength of evidence.

## 1. Witness Point

Test whether a previously derived Opportunity Readiness state can survive after a material input used to produce that state is withdrawn, revoked, expired, disputed, or otherwise ceases to support the current evaluation.

This case is intentionally broader than evidence expiry.

The question is:

> If a derived readiness state was valid at T1, what happens when a material input is withdrawn at T2?

The historical result may remain valid as a historical result. It must not silently remain valid as the current state.

## 2. Scenario

T1 — Player P applies to Opportunity O.

T2 — Required input I exists and is sufficiently supported.

Example: valid guardian authorization, current medical clearance, verified transport feasibility, or required evidence.

T3 — ScoutSA evaluates P + O and derives:

**Opportunity Readiness = Trial Ready**

T4 — I is withdrawn, revoked, expires, becomes disputed, or is otherwise materially invalidated.

T5 — A later workflow reads the old readiness result.

Variants:
- guardian authorization revoked;
- medical clearance expires;
- transport feasibility changes;
- verification supporting a requirement is revoked;
- evidence is withdrawn;
- a material assertion becomes disputed;
- opportunity requirements change simultaneously;
- replacement evidence restores readiness later.

## 3. 33×3 Witness

### Existence

- Opportunity Readiness is explicitly a derived state: PASS.
- Readiness is contextual to Player + Opportunity: PASS.
- Readiness is point-in-time: PASS AS PRINCIPLE.
- Material input records have temporal state: PASS AS CONCEPT.
- Consent can be revoked: PASS.
- Verification can expire/revoke: PASS.
- Evidence can expire: PASS.
- Historical records are retained: PASS AS PRINCIPLE.
- Explicit dependency from readiness to each material input: PARTIAL / GAP.
- Invalidation/staleness event for derived readiness: MATERIAL GAP.
- Recalculation trigger semantics: MATERIAL GAP.

### Coherence

- Historical readiness ≠ current readiness: PASS.
- Input withdrawal does not erase the fact that readiness was previously evaluated: PASS.
- Withdrawal of a material input must affect future protected action where that input is required: PASS AS PRINCIPLE.
- Revocation changes current authorization without rewriting historical consent: PASS.
- Expired evidence does not become current merely because a prior readiness result exists: PASS.
- A derived state cannot be stronger than the current inputs on which it depends: PASS AS PRINCIPLE.
- Every derived state should be reconstructable from its material inputs and evaluation rule: MATERIAL GAP.
- Automatic recalculation is not necessarily required; current-state invalidation must nevertheless be defined: UNDER-SPECIFIED.
- A replacement input should create a new evaluation/state rather than silently rewriting the historical evaluation: PASS AS PRINCIPLE.

### Failure

- Old “Trial Ready” remains current after required consent is revoked: RED.
- Old readiness remains current after medical clearance expires: RED.
- Old readiness remains current after transport becomes infeasible: RED.
- Revoked verification remains indirectly active through cached readiness: RED.
- System deletes the old readiness result when an input is withdrawn: RED.
- System rewrites the historical result from “Trial Ready” to “Not Ready” without preserving the original evaluation: RED.
- UI shows a current readiness badge with no indication that a material dependency was withdrawn: RED / MATERIAL GAP.
- A later replacement input retroactively changes the historical readiness result: RED.
- Readiness is recomputed using undocumented rules: RED.
- AI/chatbot treats historical readiness as present authorization: RED.

## 4. Required Dependency Model

The witness identifies a minimum conceptual dependency:

`Readiness Evaluation → Rule Version → Material Inputs → Evidence / Assertions / Verification / Consent / Authority → Evaluation Context → Timestamp`

If a material input later changes:

`Material Input Change → Dependency Invalidation/Staleness → Current Readiness Re-evaluation`

The historical evaluation remains preserved.

## 5. Historical vs Current State

The domain must distinguish:

**Historical statement:**

> “At T1, under Opportunity O version V1 and rule R1, the available inputs supported Trial Ready.”

from:

**Current statement:**

> “At T2, the currently available inputs support Trial Ready.”

These are not interchangeable.

A historical result must not become false merely because an input later changes. A current result must not inherit historical sufficiency without re-evaluation.

## 6. Candidate Findings

### D-002 — Material Input Dependency

**STATUS: HYPOTHESIS / NOT RATIFIED**

Every material derived readiness state should preserve references to the material inputs that contributed to its evaluation.

### D-003 — Derived-State Invalidation

**STATUS: HYPOTHESIS / NOT RATIFIED**

Withdrawal, expiry, revocation, material dispute, or material contextual change affecting a required input should invalidate or mark stale the affected current derived state without erasing the historical evaluation.

### D-004 — Historical Evaluation Immutability

**STATUS: HYPOTHESIS / NOT RATIFIED**

A completed readiness evaluation should remain reconstructable as the result produced at its original evaluation time and context.

### D-005 — Replacement Requires New Evaluation

**STATUS: HYPOTHESIS / NOT RATIFIED**

When a material input is replaced or restored, the resulting current readiness should arise from a new evaluation rather than retroactively rewriting the historical evaluation.

## 7. Relationship To Earlier Cases

Case 3 — Consent revocation established that current authorization can change while historical decisions remain.

Case 4 — Evidence expiry established temporal dependency.

Case 5 — Opportunity change established contextual dependency.

Case 12 — Authentic but stale evidence established that historical authenticity does not establish current sufficiency.

Case 14 combines these into the derived-state boundary:

`HISTORICAL VALIDITY ≠ CURRENT VALIDITY`

and:

`INPUT WITHDRAWAL ≠ HISTORY ERASURE`

## 8. Gate 1 Impact

| Finding | Result |
|---|---|
| Readiness is derived | PASS |
| Readiness is opportunity-contextual | PASS |
| Readiness is point-in-time | PASS AS PRINCIPLE |
| Temporal input state | PASS AS CONCEPT |
| Historical preservation | PASS AS PRINCIPLE |
| Consent/verification/evidence invalidation concepts | PASS |
| Explicit material dependency graph | MATERIAL GAP |
| Derived-state invalidation | MATERIAL GAP |
| Re-evaluation semantics | MATERIAL GAP |
| Historical evaluation preservation | PASS AS PRINCIPLE |
| Retroactive rewriting | RED |
| Stale readiness treated as current | RED |
| AI using historical readiness as current authority | RED |
| Constitution amendment justified | NO |
| Domain-model amendment ratified | NO |
| Gate 1 closure | NO |

## 9. Witness Conclusion

**Case 14 = RED / MATERIAL DOMAIN GAP.**

ScoutSA's current model correctly describes Opportunity Readiness as contextual and derived, and it preserves the principle that historical records should survive later changes. The unresolved boundary is the explicit dependency and invalidation mechanism connecting a derived readiness evaluation to the material inputs that produced it.

The required invariant is:

> **A derived state may preserve historical meaning after an input is withdrawn, but it must not silently retain current authority or current sufficiency.**

No Constitution amendment is ratified.
No Domain Model amendment is ratified.
Gate 1 remains OPEN.

## 10. Gate 1 Ledger Effect

**SCOUTSA-034 — Derived Readiness / Material Input Withdrawal**  
**STATUS: WITNESSED GAP — NOT RATIFIED**

Finding: ScoutSA needs explicit material-input dependency and derived-state invalidation semantics so historical readiness remains reconstructable while current readiness cannot outlive the inputs that support it.

**Next phase:** consolidate Cases 1–14 into a Gate 1 synthesis before adding further witnesses, unless the synthesis identifies a missing adversarial class that warrants another case.
