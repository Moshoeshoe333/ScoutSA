# Trust Core Logic-Only Invariant and Test Matrix

**Prepared:** 2026-10-09  
**Status:** DESIGN / REASONING ARTIFACT — NOT EXECUTED, NOT RATIFIED  
**AuthorityLevel:** NONE  
**Mode:** Offline desk reasoning and synthetic test design only  
**Purpose:** Find contradictions and define falsifiable behavioral expectations without requiring stakeholder access or changing frozen schema/implementation boundaries.

## 1. Scope and limits

This matrix derives candidate invariants from the existing ScoutSA constitution, gate status, claim-scoped verification procedure, synthetic trust fixtures and Trust Core gap reconciliation. It is not a new product constitution and does not supersede any ratified artifact.

It can establish whether proposed rules are internally consistent and whether a synthetic test case would falsify them. It cannot establish real-world truth, current stakeholder practice, legal sufficiency, security of an unexecuted implementation, or product-market demand.

No database, schema, migration, RLS, API, UI, production environment, real-person data or live opportunity is used or authorized.

## 2. Minimal logic model

Represent an opportunity claim as a tuple:

`C = (claim, subject, scope, evidence, verifier, checked_at, deadline, unresolved_conditions, consent_context)`

Represent a requested action as:

`A = (action, actor, target, purpose, requested_at)`

For this matrix, a claim is **supported** only to the degree established by its evidence and scope. A claim is **current** only if required freshness metadata exists and its applicable deadline has not passed. An action is **permitted** only if the required evidence predicates hold and no applicable authorization/consent/access hold remains.

These are abstract test predicates, not an implementation specification. The actual domain schema and policy owners must ratify concrete representations before implementation.

## 3. Candidate invariants

| ID | Invariant | Falsifying counterexample | Safe expected result |
|---|---|---|---|
| INV-01 | Evidence scope bounds claim scope. | A check of an organization's identity is used to claim a particular trial is open and suitable. | Reject the broader claim; retain only the supported narrow claim. |
| INV-02 | Authenticity does not imply availability. | Genuine organization, but opportunity capacity/date unknown. | Authenticity may be corroborated; actionable availability remains blocked. |
| INV-03 | Authenticity does not imply participant-specific suitability. | Opportunity is genuine but eligibility or attendance feasibility is unknown. | Do not assert that a particular participant can act on it. |
| INV-04 | Missing required freshness metadata is not fresh. | Verification has a timestamp but neither `valid_until` nor `reconfirm_by`. | Mark freshness metadata missing and block current-use claims. |
| INV-05 | Expired verification is not current without reconfirmation. | Deadline has passed; no newer verification exists. | Block current/actionable use; preserve historical record. |
| INV-06 | Unknown is not false, true, zero, or permission. | Unknown fee, capacity, eligibility, or transport cost is coerced to a safe value. | Preserve unknown distinctly; block the dependent claim/action. |
| INV-07 | Consent is purpose- and scope-bound. | Consent exists for one purpose but a request uses another purpose or scope. | Block the dependent disclosure/action unless valid authorization covers it. |
| INV-08 | Missing, withdrawn, or conflicting authorization does not silently permit disclosure. | Guardian/authorizer status is unresolved or consent is withdrawn. | Fail closed for the affected protected action; preserve unresolved state. |
| INV-09 | Higher assurance tiers require their own predicates. | A Tier 1 authenticity check automatically becomes Tier 2 or Tier 3. | Reject the transition until the additional scoped predicates are satisfied. |
| INV-10 | Material unresolved conditions block dependent actionability. | Venue, time, fee recipient or transport arrangement is unknown but UI says “ready”. | Block that actionability claim; explain the unresolved condition at a safe level. |
| INV-11 | Corrections supersede rather than falsify history. | Incorrect evidence is overwritten without a trace of correction. | Test must fail; correction should preserve provenance/history subject to separately approved retention rules. |
| INV-12 | A denied action is not an allowed action. | Access attempt is denied but no traceable outcome exists, or downstream flow treats it as success. | Decision remains denied; material attempt/outcome should be auditable where policy requires. |
| INV-13 | Presence of a field/table is not enforcement evidence. | Schema has consent/status fields but no behavior test demonstrates denial. | Do not claim enforcement until a permitted implementation test demonstrates it. |
| INV-14 | Policy/legal HOLD cannot be transformed into ALLOW by inference. | An unresolved policy matrix cell defaults to permission because a field exists. | Preserve HOLD; require explicit authorized decision. |
| INV-15 | A synthetic PASS is not real-world validation. | Synthetic cases pass and product is described as field-validated or compliant. | Reject the inference; report only the exact synthetic test result and limits. |

## 4. Synthetic adversarial vectors

These are proposed test inputs, not results and not edits to the frozen STS fixtures.

| Vector | Input condition | Expected result | Invariant |
|---|---|---|---|
| V-01 | Organization identity corroborated; event date unknown. | Authenticity claim only; actionability blocked. | INV-01, 02 |
| V-02 | Verification timestamp present; freshness deadline absent. | Freshness metadata missing; current-use blocked. | INV-04 |
| V-03 | `reconfirm_by` passed; no newer verification. | Historical only; current-use blocked. | INV-05 |
| V-04 | Opportunity conditions known; participant eligibility unknown. | No participant-specific eligibility claim. | INV-03, 06 |
| V-05 | Fee amount known; recipient or payment demand is unresolved/suspicious. | Do not mark safe/actionable; no payment processing. | INV-10, 14 |
| V-06 | Valid consent for purpose P1; action requests purpose P2. | Deny dependent disclosure/action. | INV-07 |
| V-07 | Consent withdrawn after earlier allowed action. | Future covered actions denied; history retained under approved rules. | INV-08, 11 |
| V-08 | Tier 1 evidence only; request to issue Tier 3. | Deny escalation. | INV-09 |
| V-09 | Transport feasibility required but venue/transport responsibility unknown. | Participant-specific actionability blocked. | INV-10 |
| V-10 | Correction changes a prior verification conclusion. | New version/record linked to prior state; no silent destructive rewrite. | INV-11 |
| V-11 | Access policy remains HOLD; caller requests protected record. | Deny; do not infer permission. | INV-12, 14 |
| V-12 | Synthetic suite passes; proposed report says “POPIA compliant”. | Report claim rejected as unsupported. | INV-15 |

## 5. Decision order for any future synthetic evaluator

The following is a candidate order of reasoning, not executable policy:

1. **Define claim and requested action.** If either is ambiguous, stop and clarify rather than infer.
2. **Check scope.** Determine whether evidence actually supports the specific claim.
3. **Check provenance and verifier limitations.** If material provenance is missing, block the assurance tier that depends on it.
4. **Check freshness.** If a current claim requires freshness and metadata is missing or expired, block current-use.
5. **Check material conditions.** Identify unknown, contradictory or stale conditions that affect the requested claim/action.
6. **Check purpose, consent, access and authority.** Any applicable unresolved HOLD blocks the protected action.
7. **Check tier predicates.** Do not promote assurance based on a prior tier alone.
8. **Emit bounded outcome.** State what is supported, what is not supported, unresolved conditions, evidence references and limits.
9. **Record the result.** For a future authorized implementation, define auditable reason codes and history semantics before testing.

No priority ordering can cure missing legal authorization. If the relevant policy is unresolved, the outcome remains HOLD even if other checks pass.

## 6. Non-monotonic risk checks

A naive rule engine often treats adding a positive fact as sufficient to increase readiness. That is unsafe when new evidence reveals a conflict. Future synthetic cases should test that:
- adding evidence of conflicting authority can lower or block a prior confidence/assurance conclusion;
- a newly expired deadline blocks current-use even if historical authenticity evidence remains;
- withdrawal of consent blocks future covered actions without rewriting historical actions;
- a newly discovered fee or access condition can invalidate participant-specific actionability;
- correcting a false claim preserves the fact that the earlier claim existed and was corrected, subject to approved privacy/retention rules.

These examples are proposed falsification tests only. They do not define numerical scores or automatic status transitions.

## 7. Candidate minimum acceptance criteria for a future authorized harness

A future harness proposal should require:
- every vector has a fixed input, expected outcome, invariant ID and fixture/version;
- expected outcomes are approved before execution and not changed after seeing results;
- tests include negative and conflicting-evidence cases, not only positive cases;
- results distinguish PASS, FAIL, BLOCKED, NOT RUN and NOT APPLICABLE;
- a blocked test is never reported as a pass;
- execution record identifies exact commit, runtime/environment, command, output, evaluator and known independence limits;
- zero critical failures;
- no synthetic result is presented as stakeholder validation, security assurance, legal compliance or production readiness.

## 8. Open questions that logic alone cannot settle

1. Which opportunity conditions are material in each real-world opportunity type?
2. Who is authorized to verify each claim and set its freshness deadline?
3. What legal/operational consent and guardian-authority rules apply in a given workflow?
4. What retention/deletion balance is lawful and appropriate for correction and audit history?
5. Which access-control decisions are approved by accountable policy owners?
6. Do adult football stakeholders find the workflow useful, feasible and worth adopting?

These remain evidence or authority questions. They must not be answered by inventing facts, inferring law, or turning design preferences into policy.

## 9. Status and next action

**Result:** An invariant catalogue and adversarial test-design matrix has been authored. No tests have been run; no invariant is marked empirically verified; no code or schema has changed.

**Next safe step:** Cross-check this matrix against the frozen synthetic fixtures and the existing ratified claim-scoped verification procedure, classify every mapping as aligned / conflict / missing / not applicable, and record the exact evidence. Do not modify frozen fixtures to force alignment. If a conflict emerges, preserve it and seek explicit review before any amendment.

**Current state preserved:** STS-001 v1.1 remains **BLOCKED — NOT A PASS**. No stakeholder validation, implementation, legal clearance, production readiness or live-use readiness is claimed.
