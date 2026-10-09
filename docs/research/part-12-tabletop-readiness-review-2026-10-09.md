# Part 12B — Tabletop Readiness Review (Pre-Execution)

**As of:** 2026-10-09  
**Repository:** `Moshoeshoe333/ScoutSA`  
**Branch:** `proposal/part-12-synthetic-trust-evaluation`  
**Review type:** AI-assisted document-readiness review; not an independent scenario evaluation  
**Inputs inspected:** Part 12 protocol and frozen fixtures v1.0; Constitution; Player Passport; Consent Model; Core User Flows; Part 11 pilot design  
**Execution status:** Formal tabletop NOT RUN; all scenario outcomes remain NOT TESTED  
**Authority effect:** None. This review does not authorize implementation, gate transition, live data, contact, publication, rehearsal, or pilot.

## 1. Purpose and limitation

This review checks whether the written policy/manual materials are sufficiently operational for a separate evaluator to run the frozen synthetic scenarios without inventing procedures. It is not the Part 12 tabletop result.

The reviewer has already inspected the frozen expected outcomes. Therefore this review cannot honestly be represented as blind, independent evaluation. No scenario is marked PASS or FAIL here. A separate evaluator should receive each fixture input and the relevant governing procedure without being shown the expected outcome until their observation is recorded.

## 2. Evidence inspected

- `docs/research/synthetic-trust-evaluation-set-2026-10-09.md` — protocol and expected outcomes; currently contains stale status text saying the protocol is not ratified and fixtures are not frozen.
- `docs/research/synthetic-trust-fixtures-v1-2026-10-09.md` — frozen synthetic input/oracle version `STS-FIXTURES-1.0`.
- `docs/research/part-12-protocol-ratification-record-2026-10-09.md` — protocol ratification bounded to manual tabletop only.
- `docs/00-constitution.md` — epistemic separation, purpose-bound authorization, temporal applicability, safeguarding and disclosure boundaries.
- `docs/03-player-passport.md` — separate Football Readiness and Opportunity Readiness; history preservation and access-barrier distinction.
- `docs/05-consent-model.md` — purpose-specific, revocable consent; consent audit; required propagation to visibility/contact pathways.
- `docs/06-user-flows.md` — proposed contact/trial request and permission checks.
- `docs/research/go-to-market-pilot-design-2026-10-09.md` — independent organizational-channel verification, bounded verification claims, no-paid-access policy and controlled-pilot boundaries.

These documents establish design intent and some proposed workflow steps. They do not prove that software controls exist or are enforced.

## 3. Readiness findings by scenario

“Coverage” below refers only to whether the written materials contain enough operational direction to support a consistent manual decision. It is not a scenario result.

| Scenario | Severity | Written coverage | Gap to resolve before or during a valid run |
|---|---|---|---|
| STS-001 — Independently corroborated opportunity | High | Partial | Part 11 describes independent confirmation and recording scope/date/source/limitations. A reusable verification record and named accountable role are not identified in the inspected materials. |
| STS-002 — Verified role, unverified opportunity | Critical | Strong principle; partial procedure | Separation of role and opportunity verification is explicit. The procedure should identify the required state labels and the exact action blocked while opportunity evidence is missing. |
| STS-003 — Impersonation / conflicting authority | Critical | Partial | Conflict preservation and independent checking are explicit. The accountable escalation owner, escalation destination, pause/rejection criteria, and closure record are not specified. |
| STS-004 — Payment demanded for access | Critical | Partial | The no-paid-access policy boundary is described. The procedure lacks a named reviewer/route, response target, and documented disposition options for a suspicious payment demand. |
| STS-005 — Missing/conflicting evidence | Critical | Partial | Preserving uncertainty and blocking dependent action are explicit. The owner, clarification request path, and criteria for resuming or closing a paused claim are not fully specified. |
| STS-006 — Stale verification | High | Gap in governing rule | The fixture uses a 12-month freshness threshold, but the inspected governing materials do not establish that threshold as a ratified rule. The fixture must not silently serve as its own governing procedure. Supply a separately versioned rule or mark this case BLOCKED pending a rule decision. |
| STS-007 — Consent absent/withdrawn/purpose-mismatched | Critical | Strong policy; enforcement unproven | Consent scope, revocation history, and permission recalculation are specified as design requirements. A manual step-by-step withdrawal/disclosure-denial procedure and its accountable operator are not established; software enforcement is not evidenced. |
| STS-008 — Excessive data request | Critical | Strong principle; partial operational control | Data minimisation and purpose limits are explicit. A field-by-field access matrix, role/purpose decision route, and documented denial path are not present in the inspected materials. |
| STS-009 — Correction/dispute | High | Partial | History preservation and correction are required. A responsible review role, interim restriction criteria, response path, and resolution/appeal state need to be specified. |
| STS-010 — Transport/access barrier | High | Strong conceptual coverage | The Passport and Constitution distinguish Football Readiness from Opportunity Readiness and reject treating transport constraints as talent evidence. The manual record should preserve the two rationales separately. |

## 4. Cross-cutting blockers and document inconsistencies

1. **Stale parent-protocol status.** The ratification record says the protocol is ratified for tabletop only, and the fixture document says v1.0 is frozen; however, the parent Part 12 document still says “not yet ratified” and “Fixtures frozen: No.” These statements conflict. Reconcile the parent document through a reviewed, versioned edit before treating the document set as a coherent controlled record.
2. **No complete manual operating procedure identified.** The current materials define important principles and several flow steps, but do not consistently assign a responsible role, decision route, audit artefact, escalation owner, closure condition, or response target.
3. **Freshness threshold is not independently governed.** The 12-month threshold appears in the STS-006 fixture input, but the inspected policy set does not establish it as an approved general rule. Keep this as an explicit oracle/procedure dependency.
4. **Design intent is not control evidence.** Consent propagation, access restriction, audit logging and state separation are requirements in documents; no software enforcement or production control was evaluated here.
5. **No independent evaluator is recorded.** This review is AI-assisted and non-independent. It cannot substitute for the protocol’s independent case-by-case run.

## 5. Required next actions

1. Reconcile the parent Part 12 status against the ratification record and frozen fixture manifest; preserve the original history.
2. Define or explicitly defer the missing operational choices: accountable verification role, escalation route, pause/reject/resume/close states, dispute handling, consent withdrawal steps, and field-level access decisions.
3. Resolve the STS-006 freshness-rule dependency through a separately versioned, justified procedure decision. Do not change the fixture oracle silently.
4. Prepare a blind evaluation packet: give the evaluator the fixture input and relevant procedure only; keep the frozen expected outcome separate until the evaluator records their decision and rationale.
5. Record all ten scenario observations individually. Use PASS only where observed behavior and supporting evidence meet the frozen oracle. Use FAIL, BLOCKED, or NOT TESTED honestly; preserve any failure and retest after correction.
6. Keep the gate blocked until every scenario ultimately passes after required correction/retest and the ratified stop conditions are satisfied.

## 6. Current evidence state

- Protocol ratification: recorded, tabletop only.
- Fixture version: `STS-FIXTURES-1.0`, frozen.
- This readiness review: completed as a document-gap review.
- Formal manual tabletop: **NOT RUN**.
- Scenario outcomes: **NONE; all remain NOT TESTED**.
- Independent evaluation: **NOT RECORDED**.
- Software enforcement: **NOT TESTED / NO EVIDENCE FROM THIS REVIEW**.
- Gate transition / implementation / live-use authorization: **NONE**.

**Bounded conclusion:** The policy foundation is strong enough to define what ScoutSA wants to protect, but the current documents do not yet form a fully operational manual procedure for every high-risk case. Reconcile the document state and close or explicitly carry the procedure gaps into a controlled evaluation before claiming a completed tabletop.
