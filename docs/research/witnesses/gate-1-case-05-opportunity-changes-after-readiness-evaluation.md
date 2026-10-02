# Gate 1 Witness — Case 5: Opportunity Changes After Readiness Evaluation

**Status:** Gate 1 witness — adversarial domain test  
**Scope:** Implementation-independent ScoutSA domain model  
**Governing principle:** Strength of claim must never exceed strength of evidence.

## 1. Witness Point

Test whether ScoutSA can distinguish a readiness evaluation that was valid for an Opportunity at time T1 from the later applicability of that evaluation after the Opportunity materially changes.

Scenario:

- T1: Organization publishes Opportunity O with defined requirements/context.
- T2: Player P is evaluated and receives a readiness state.
- T3: Organization materially changes O.
- T4: a later decision attempts to reuse the T2 readiness result.

Question:

> Can ScoutSA preserve what was determined under the original Opportunity context without silently treating it as current after the Opportunity changes?

This is a semantic witness only. It does not prescribe schema, versioning technology, automatic recomputation, or implementation.

## 2. 33×3 — Existence

### E1 — Opportunity temporal state
**PASS.** Opportunity has publication/open/close/event dates.

### E2 — Readiness point-in-time semantics
**PASS.** OpportunityReadiness is explicitly contextual, point-in-time, and may become stale when material inputs or Opportunity requirements change.

### E3 — Opportunity changes can affect readiness
**PASS AS PRINCIPLE.** The model explicitly states that readiness becomes stale when material Opportunity requirements change.

### E4 — Historical readiness
**PARTIAL.** The model requires derived states to be reproducible from relevant inputs and rules available at that time, but does not explicitly define how the historical Opportunity context itself remains reconstructable after edits.

### E5 — Exact context dependency
**PARTIAL / GAP.** The model identifies Opportunity requirements/context as inputs, but does not define the minimum identity of the exact Opportunity state against which a readiness evaluation was performed.

## 3. Coherence

### C1 — Historical readiness is not made false by later change
**PASS.**

If Player P was correctly evaluated under requirement set A, a later change to requirement set B does not prove the earlier evaluation was false.

Historical readiness is therefore distinct from current readiness.

### C2 — Material Opportunity change affects current readiness
**PASS AS PRINCIPLE.**

The existing model rejects silent reuse of stale readiness.

### C3 — Opportunity and readiness are temporally coupled
**MATERIAL GAP.**

The conceptual coupling exists, but the model does not yet state whether reconstruction requires an Opportunity revision, snapshot, historical requirement state, or another equivalent mechanism.

No mechanism is selected here.

### C4 — Opportunity closure
**PASS AS PRINCIPLE.**

A previous readiness evaluation cannot by itself establish that an Opportunity remains open or actionable.

Historical readiness may remain preserved while current opportunity availability changes.

### C5 — Material versus non-material changes
**MATERIAL GAP.**

The model uses the term “material” but does not yet define its boundary.

Changing a title may not affect readiness; changing age eligibility, location, time, medical, guardian, transport, or position requirements potentially can.

The witness does not ratify a materiality list.

## 4. Failure

### F1 — Old readiness reused after material requirement change
**RED.**

That would apply a historical evaluation to a new context.

### F2 — Historical readiness overwritten
**RED.**

Replacing the old evaluation would destroy the ability to reconstruct what was determined under the earlier context.

### F3 — Opportunity edited but historical context cannot be reconstructed
**RED / DOMAIN GAP.**

Example:

T1: Opportunity requires goalkeeper.  
T2: Player is assessed READY.  
T3: Opportunity changes to striker.  
T4: audit asks why Player was READY.

If only the latest Opportunity state exists, the historical evaluation cannot be properly reconstructed.

### F4 — Every edit automatically invalidates readiness
**UNDER-SPECIFIED.**

That could manufacture invalidation when the edit was semantically irrelevant.

### F5 — New mandatory requirement added after readiness
**RED if silently reused.**

The old readiness cannot silently satisfy the new requirement.

## 5. Reverse Trace

Forward:

Opportunity Context A  
→ Player Inputs  
→ Readiness R1  
→ Opportunity changes to Context B  
→ R1 becomes stale / insufficient  
→ current evaluation uses Context B

Reverse:

Decision  
→ Current Readiness  
→ Opportunity Context  
→ Player Inputs  
→ Evidence / Verification / Authority

For historical R1:

Historical Readiness  
→ Which Opportunity context?  
→ Which requirements?  
→ Which Player inputs?  
→ Which evidence / verification?  
→ Which rules?

The second chain is not yet completely reconstructable from the current Domain Model.

## 6. Relationship to Case 4

Case 4 established:

> Historical verification is not the same thing as current evidentiary sufficiency.

Case 5 extends the same temporal principle to Opportunity context:

> Historical readiness is not the same thing as current readiness for a changed Opportunity.

This suggests a broader candidate principle:

> **A derived state is meaningful only relative to the complete material context under which it was evaluated.**

A timestamp alone is not necessarily sufficient provenance.

## 7. Candidate Finding

### SCOUTSA-025 — Context-Bound Derived State

**STATUS:** HYPOTHESIS / NOT RATIFIED

A derived state such as Opportunity Readiness must be bound to the material Opportunity context and relevant inputs under which the evaluation was performed.

Historical derived state remains a record of the earlier evaluation.

Current decisions must not silently reuse it when material context has changed.

Minimum future question:

> What minimum contextual identity must be preserved so that a historical readiness evaluation can be reconstructed without confusing it with a later evaluation of the same Opportunity?

No versioning mechanism is ratified.

## 8. Gate 1 Impact

| Finding | Result |
|---|---|
| Opportunity is temporal | PASS |
| Readiness is point-in-time | PASS |
| Requirement changes can stale readiness | PASS AS PRINCIPLE |
| Historical readiness should be preserved | PASS IN PRINCIPLE |
| Historical Opportunity context explicitly reconstructable | PARTIAL / GAP |
| Readiness bound to exact material context | PARTIAL / GAP |
| Material Opportunity change defined | RED / GAP |
| Closed Opportunity distinguished from historical readiness | PASS AS PRINCIPLE |
| Automatic recalculation rule | NOT DETERMINED |
| Constitution amendment justified | NO |
| Domain-model amendment justified | NOT YET |
| Gate 1 closure | NO |

## 9. Witness Conclusion

**Case 5 = RED / MATERIAL DOMAIN GAP.**

The Domain Model correctly says readiness becomes stale when material Opportunity requirements change. The witness shows that this statement is stronger than the current reconstruction semantics supporting it.

The unresolved boundary is:

> **What exact Opportunity context produced this readiness evaluation?**

Therefore:

Opportunity O  
+ Player inputs P  
+ Rules/context at T  
→ Readiness Evaluation E at T

is the semantic relationship that must eventually be reconstructable.

This is a witness finding, not a schema proposal.

## 10. Gate 1 Ledger Effect

**SCOUTSA-025 — Context-Bound Derived State**  
**STATUS:** WITNESSED GAP — NOT RATIFIED

**Finding:** Opportunity Readiness is correctly defined as point-in-time and stale when material Opportunity requirements change, but the Domain Model does not yet explicitly define the minimum historical Opportunity context required to reconstruct a prior readiness evaluation.

**Gate:** Gate 1 remains OPEN.

**Next adversarial witness:** Case 6 — Unverified scout contacts minor.
