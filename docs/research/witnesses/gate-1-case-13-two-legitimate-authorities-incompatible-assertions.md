# Gate 1 Witness — Case 13: Two Legitimate Authorities Make Incompatible Assertions

**Status:** Gate 1 witness — adversarial domain test  
**Scope:** Implementation-independent domain integrity  
**Governing principle:** Strength of claim must never exceed strength of evidence.

## 1. Witness Point

Test whether ScoutSA can preserve and safely process incompatible assertions made by two legitimate authorities without silently selecting a winner.

This case is deliberately different from Case 10. Case 10 tested a ScoutSA assertion against an institutional record. Case 13 assumes **both actors are legitimately authorized within their respective scopes**.

The question is:

> What happens when two legitimate authorities have overlapping authority and make incompatible assertions about the same material fact?

The domain must preserve the disagreement before any resolution.

## 2. Scenario

T1 — Player P exists.

T2 — Authority A is legitimately authorized to assert fact F within scope S1.

T3 — Authority B is legitimately authorized to assert fact F within scope S2.

T4 — Their assertions are incompatible for the same relevant subject, period, and claim context.

Example:

- Coach A, authorized for the team's performance record, asserts Player P played a defined position during period X.
- Organization B, also authorized for its relevant membership/performance record, asserts a materially incompatible position or membership state for the same period.

T5 — Neither assertion has yet been withdrawn, superseded, or resolved.

T6 — A workflow attempts to derive a single current Passport fact or readiness state.

Variants:
- both authorities have equal scope;
- scopes overlap only partially;
- one authority is stronger for one claim but not another;
- one assertion is newer but not necessarily more authoritative;
- evidence supports different portions of each assertion;
- a human resolution is later recorded.

## 3. 33×3 Witness

### Existence

- Multiple User actors: PASS.
- Scoped roles: PASS.
- Authority is defined as claim-specific: PASS.
- Verification is scoped: PASS.
- Evidence is first-class: PASS.
- Assertion concept: PARTIAL / GAP from Case 1.
- Authority scope boundaries: PARTIAL / GAP.
- Conflict/dispute state: PARTIAL / GAP.
- Resolution record: PARTIAL / GAP.
- Supersession semantics: PARTIAL / GAP.

### Coherence

- Legitimate authority ≠ universal authority: PASS.
- Verification ≠ universal truth: PASS.
- Newer assertion ≠ automatically stronger authority: PASS AS PRINCIPLE.
- Stronger authority for one claim ≠ stronger authority for every claim: PASS AS PRINCIPLE.
- Authentic evidence from both parties may coexist: PASS.
- Historical disagreement should remain reconstructable: PASS AS PRINCIPLE.
- Conflict must not be silently collapsed into one value: MATERIAL GAP.
- Authority scope must be evaluated against subject, claim, context, and period: MATERIAL GAP.
- Resolution should be distinct from the original assertions: MATERIAL GAP.
- Derived state should expose unresolved conflict rather than manufacture certainty: MATERIAL GAP.

### Failure

- System selects the first assertion received: RED.
- System selects the newest assertion automatically: RED.
- System selects an organization merely because it is an organization: RED.
- System selects a coach merely because the claim concerns football: RED.
- One legitimate authority overwrites the other: RED.
- Verification of both parties is interpreted as agreement: RED.
- Conflict is hidden from the Passport while a definitive derived value is shown: RED / MATERIAL GAP.
- Historical disagreement is deleted after resolution: RED.
- Resolution is written back as though it were the original assertion: RED.
- AI or automated scoring chooses the disputed fact without a defined authority rule: RED.
- One source's evidence is used to invalidate the other source without scope analysis: RED.

## 4. Authority Matrix Required by the Witness

The case demonstrates that authority must be evaluated against at least:

| Dimension | Required question |
|---|---|
| Subject | Who/what does the assertion concern? |
| Claim | What exact fact is being asserted? |
| Scope | What authority does the actor possess for that fact? |
| Context | In what opportunity/team/competition/context? |
| Time | What effective period does the assertion cover? |
| Evidence | What supports the assertion? |
| Verification | Who, if anyone, independently verified it? |
| Conflict | Is another legitimate assertion incompatible? |
| Resolution | Has an authorized resolution occurred? |
| History | Can both original assertions still be reconstructed? |

## 5. Reverse Trace

Derived Passport value  
→ resolution state  
→ competing assertions  
→ authority scopes  
→ actors  
→ effective periods/context  
→ supporting evidence  
→ verification records  
→ conflict state  
→ authorized resolution, if any.

The current model can represent many individual components, but it does not yet define the complete conflict-resolution/provenance chain.

## 6. Candidate Findings

### A-002 — Authority Is Claim/Scope/Context Bound

**STATUS: HYPOTHESIS / NOT RATIFIED**

Authority should be evaluated against the exact subject, claim, context, and effective period rather than treated as a universal rank attached to an actor.

### I-006 — Legitimate Conflict Preservation

**STATUS: HYPOTHESIS / NOT RATIFIED**

When legitimate authorities make incompatible assertions, both assertions and their supporting provenance must remain reconstructable until an authorized resolution occurs.

### I-007 — Resolution Is Not Original Assertion

**STATUS: HYPOTHESIS / NOT RATIFIED**

A later resolution must be represented as a separate event/state. It must not silently rewrite either original assertion.

### D-001 — Conflict-Aware Derived State

**STATUS: HYPOTHESIS / NOT RATIFIED**

A derived state must not manufacture certainty where material authoritative conflict remains unresolved. Exact user-facing state semantics require later domain design.

## 7. Relationship To Earlier Cases

Case 1 established the need for a first-class Assertion boundary.

Case 2 established that multiple guardian authorities may conflict without the system inventing legal precedence.

Case 9 established that verification and safeguarding state must remain distinct.

Case 10 established that institutional authority does not automatically erase a ScoutSA assertion.

Case 13 generalizes the boundary:

`LEGITIMATE AUTHORITY A + LEGITIMATE AUTHORITY B ≠ AUTOMATIC WINNER`

And:

> **Authority determines who may assert within a scope; it does not by itself resolve incompatible assertions outside that scope.**

## 8. Gate 1 Impact

| Finding | Result |
|---|---|
| Multiple legitimate authorities | PASS AS PRINCIPLE |
| Scoped authority | PASS AS PRINCIPLE |
| First-class evidence | PASS |
| First-class assertion | PARTIAL / GAP |
| Authority scope/context evaluation | MATERIAL GAP |
| Conflict preservation | MATERIAL GAP |
| Resolution as separate state/event | MATERIAL GAP |
| Historical disagreement | PASS AS PRINCIPLE |
| Automatic winner selection | RED |
| Newest assertion = winner | RED |
| Organization role = universal authority | RED |
| Verification = agreement | RED |
| Derived certainty during unresolved conflict | RED |
| Constitution amendment justified | NO |
| Domain-model amendment ratified | NO |
| Gate 1 closure | NO |

## 9. Witness Conclusion

**Case 13 = RED / MATERIAL DOMAIN GAP.**

The model already rejects several simplistic authority assumptions, but it does not yet provide a complete first-class mechanism for preserving and resolving incompatible assertions from separately legitimate authorities.

The safe boundary is:

`LEGITIMATE AUTHORITY ≠ UNIVERSAL AUTHORITY`

and:

`CONFLICT ≠ RESOLUTION`

Until a defined authority/scope/context rule or authorized human resolution exists, the disagreement must remain visible to the domain and reconstructable historically.

No Constitution amendment is ratified.
No Domain Model amendment is ratified.
Gate 1 remains OPEN.

## 10. Gate 1 Ledger Effect

**SCOUTSA-033 — Legitimate Authority Conflict**  
**STATUS: WITNESSED GAP — NOT RATIFIED**

Finding: ScoutSA needs claim/scoped authority and conflict-preservation semantics capable of handling incompatible assertions from multiple legitimate authorities without manufacturing a winner.

Next adversarial witness: **Case 14 — Derived readiness survives withdrawal of a material input.**
