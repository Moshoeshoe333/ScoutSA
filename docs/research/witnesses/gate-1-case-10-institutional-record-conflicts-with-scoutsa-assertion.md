# Gate 1 Witness — Case 10: Institutional Record Conflicts With ScoutSA Assertion

**Document:** `docs/research/witnesses/gate-1-case-10-institutional-record-conflicts-with-scoutsa-assertion.md`  
**Status:** Gate 1 witness — adversarial domain test  
**Scope:** Implementation-independent ScoutSA domain model  
**Governing principle:** Strength of claim must never exceed strength of evidence.

## 1. Witness Point

Test whether ScoutSA can preserve an institutional record and a conflicting ScoutSA assertion without silently converting either source into universal truth.

The witness asks:

> When an external institutional record conflicts with a Player, Guardian, Coach, Organization, or ScoutSA assertion, can ScoutSA preserve both provenance chains, distinguish source authority from system ownership, and prevent an unresolved disagreement from becoming an unexplained verified fact?

The witness deliberately does not assume that an institutional record is automatically correct. Institutional status may make a source highly relevant or authoritative for a defined claim, but authority remains claim- and scope-specific.

## 2. Scenario

T1 — Player P has a ScoutSA assertion stating a defined fact, for example current membership with Organization O or a competition performance record.

T2 — Institution I provides a record concerning the same fact that conflicts with the ScoutSA assertion.

T3 — The institutional record has identifiable source, scope, effective period, and provenance.

T4 — Neither record has yet been formally resolved against the other.

T5 — A workflow attempts to display one source as the definitive truth or derive a verification/readiness state without preserving the disagreement.

Variants:
- institution record is current while ScoutSA assertion is stale;
- ScoutSA assertion is current while institutional record is stale;
- institution record is authentic but its scope does not cover the exact claim;
- institution record is authoritative for one fact but not another;
- both records are legitimate but describe different effective periods;
- an institution later corrects its record.

## 3. 33×3 Witness

### Existence

- Institutional source/organization exists: PASS.
- Evidence is first-class: PASS.
- Organization assertion is recognized as an evidence example: PASS.
- Verification is scoped to a defined claim: PASS.
- Temporal fields exist conceptually: PASS.
- First-class Assertion entity: PARTIAL / GAP, already established in Case 1.
- Source authority by claim/scope: PARTIAL / GAP.
- Conflict/dispute state: PARTIAL / MATERIAL GAP.
- Resolution record/history: PARTIAL / GAP.
- Correction/supersession provenance: PASS AS PRINCIPLE / implementation unproven.

### Coherence

- Institutional record automatically equals truth: NOT SUPPORTED.
- ScoutSA assertion automatically equals truth: NOT SUPPORTED.
- Institutional source may carry stronger authority for a defined claim: PASS AS PRINCIPLE.
- Stronger source authority does not erase a conflicting historical assertion: PASS AS PRINCIPLE.
- Authenticity ≠ applicability to every claim: PASS.
- Current record ≠ historical record: PASS.
- Verification ≠ universal truth of the underlying entity: PASS.
- Disagreement must remain reconstructable: MATERIAL GAP.
- A derived state must not silently choose a winner where authority/scope/time remain unresolved: RED / MATERIAL GAP.
- Source authority hierarchy is currently under-specified: MATERIAL GAP.

### Failure

- Institutional record automatically overwrites ScoutSA assertion: RED.
- ScoutSA assertion automatically overrides institutional record: RED.
- Conflict is deleted after one source is selected: RED.
- Institutional verification is treated as verification of unrelated attributes: RED.
- Authentic institutional evidence outside its scope is treated as authoritative for another claim: RED.
- Stale institutional record is treated as current solely because the source is institutional: RED.
- Stale ScoutSA assertion is treated as current because it was previously verified: RED.
- Unresolved conflict produces a definitive readiness state without explanation: RED / MATERIAL GAP.
- Later correction rewrites the historical disagreement: RED.
- Public UI hides material source disagreement while presenting a definitive verified claim: RED.

## 4. Reverse Trace

Derived claim/verification/readiness  
→ exact asserted fact  
→ source assertion(s)  
→ source actor/institution  
→ authority scope  
→ supporting evidence  
→ effective period / timestamp  
→ conflict state  
→ resolution or supersession event  
→ rule used to derive the current state.

The current model contains many individual layers but does not yet provide a complete first-class conflict-resolution/provenance chain.

## 5. Candidate Findings

### O-002 — Source-Scoped Authority

**STATUS: HYPOTHESIS / NOT RATIFIED**

A source's authority must be evaluated against the specific claim, scope, period, and context being asserted.

Institutional status alone must not create blanket authority over unrelated facts.

### I-004 — Assertion Conflict Preservation

**STATUS: HYPOTHESIS / NOT RATIFIED**

When legitimate assertions conflict, both assertions and their provenance should remain preserved until a defined resolution, supersession, expiry, or contextual determination occurs.

### I-005 — Conflict-Aware Derived State

**STATUS: HYPOTHESIS / NOT RATIFIED**

A derived state must not silently select an authoritative outcome when material source conflict remains unresolved. The resulting state should either remain unresolved/limited or expose the rule and evidence basis used.

### T-003 — Temporal Source Applicability

**STATUS: HYPOTHESIS / NOT RATIFIED**

Source authority and evidentiary applicability must be evaluated against the relevant effective period. A source can be authentic and authoritative yet stale for the current claim.

## 6. Relationship To Earlier Cases

Case 1: Player/Coach conflict exposed the missing first-class Assertion boundary.

Case 2: Authority must be scoped rather than inferred from relationship labels.

Case 4: Verification and evidence have separate temporal behavior.

Case 5: Historical derived state depends on its historical context.

Case 9: Verification is not a blanket safety clearance.

Case 10 extends these distinctions to institutional sources:

`Institutional Source ≠ Universal Truth`

and:

`Authentic Evidence ≠ Automatically Applicable Evidence`

A further invariant emerges:

> **When two legitimate sources disagree, provenance must survive the disagreement before any resolution is applied.**

## 7. Gate 1 Impact

| Finding | Result |
|---|---|
| Evidence is first-class | PASS |
| Institutional source can be represented | PASS AS PRINCIPLE |
| Verification is scoped | PASS |
| Temporal context exists | PASS |
| First-class Assertion | PARTIAL / GAP |
| Source authority by claim/scope | PARTIAL / GAP |
| Conflict state | PARTIAL / MATERIAL GAP |
| Resolution history | PARTIAL / GAP |
| Institutional source automatically wins | NOT SUPPORTED |
| ScoutSA assertion automatically wins | NOT SUPPORTED |
| Authenticity ≠ universal applicability | PASS |
| Conflict preservation | MATERIAL GAP |
| Conflict-aware derived state | MATERIAL GAP |
| Temporal source applicability | MATERIAL GAP |
| Constitution amendment justified | NO |
| Domain-model amendment justified | NOT YET |
| Gate 1 closure | NO |

## 8. Witness Conclusion

**Case 10 = RED / MATERIAL DOMAIN GAP.**

The current model already supports the important principle that evidence, verification, authority, and temporal state are distinct. What remains unresolved is the first-class representation and resolution of conflicting assertions from sources that may each be legitimate within different scopes.

The witness does not declare the institutional source the winner. It establishes a narrower requirement:

`Authority must be claim-specific, scope-specific, time-aware, and provenance-preserving.`

No Constitution amendment is warranted.
No Domain Model amendment is ratified.
Gate 1 remains OPEN.

## 9. Gate 1 Ledger Effect

**SCOUTSA-030 — Institutional Record / ScoutSA Assertion Conflict**  
**STATUS: WITNESSED GAP — NOT RATIFIED**

Finding: ScoutSA currently lacks a complete first-class mechanism for preserving, evaluating, and resolving conflicting institutional and ScoutSA assertions without silently promoting either source to universal truth.

Gate: Gate 1 remains OPEN.

Next adversarial witness: Case 11 — Public information proposed for republication.
