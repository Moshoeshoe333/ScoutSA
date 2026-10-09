# ScoutSA Part 12 — Synthetic Trust Evaluation Set

**As of:** 2026-10-09  
**Status:** RATIFIED FOR SYNTHETIC MANUAL TABLETOP EVALUATION ONLY — ratification record dated 2026-10-09  
**Target first evaluation:** Manual tabletop review using synthetic records  
**Test execution status:** NOT RUN  
**Authority effect:** None. This document does not authorize implementation, live data processing, recruitment, public listings, migrations, RLS changes, or production use.

## 1. Purpose

Define a reproducible, risk-weighted tabletop evaluation for whether ScoutSA's proposed verification workflow distinguishes verified claims from unverified claims, respects consent and disclosure boundaries, preserves evidence provenance, and avoids treating access barriers as evidence of low football ability.

This is a test-design artifact. Writing scenarios or expected outcomes is not evidence that the workflow has passed them.

## 2. Research and evaluation contract

- **Decision supported:** Is the proposed verification-and-evidence workflow sufficiently clear and safe to proceed to the next authorized evaluation step?
- **As-of date:** 2026-10-09.
- **First evaluation target:** Manual tabletop review.
- **Scope:** Ten synthetic scenarios, documented expected outcomes, observed outcomes, evidence references, failure analysis, correction and retest.
- **Out of scope:** Real player or guardian records; live contact or recruitment; real opportunity publication; production systems; legal conclusions; proof of real-world fraud prevention.
- **Inputs:** Synthetic fixtures only, with no personal data copied from real people.
- **Required outputs:** Versioned fixture set, completed evaluation records, retained failures, corrective actions, retest records, limitations, and a gate recommendation.
- **Stop condition:** All ten scenarios have documented final outcomes; every critical scenario passes; no critical defect remains unresolved; and all evidence needed for the recommendation is linked. If any critical case fails or is not tested, progression is blocked.
- **Evidence rule:** Claim strength must not exceed evidence strength. Missing observation is NOT TESTED, never PASS.

## 3. Ratified evaluation rules

The rules below were ratified for this bounded synthetic manual tabletop on 2026-10-09. See `docs/research/part-12-protocol-ratification-record-2026-10-09.md`. This does not authorize implementation, live data, or any gate transition.

1. **Critical failures: zero tolerated.** Any critical failure blocks progression. A pass on another scenario cannot offset it.
2. **Non-critical failures: all ten scenarios must ultimately pass after correction and retest.** Preserve the original failure; a code, policy, or wording change is not a pass until the relevant scenario is rerun and passes.
3. **First evaluation: manual tabletop review.** No software implementation or live workflow is implied.
4. **Unauthorized disclosure or publication:** zero tolerated failures.
5. **Consent withdrawal:** expected handling must be demonstrated in every applicable scenario; no unresolved failure may remain.
6. **Evidence provenance:** every evaluated case must retain the source or fixture reference, date/version, expected outcome, observed outcome, evaluator, and limitations.
7. **Reproducibility:** a repeated evaluation against the same fixture and rule version should yield a documented, explainable result. Any divergence is recorded and investigated.
8. **No aggregate score can cancel a critical failure.** Do not invent or adjust thresholds after observing results merely to pass a gate.

### Result definitions

- **PASS:** Observed behaviour matches the predeclared expected outcome and supporting evidence is recorded.
- **FAIL:** Observed behaviour contradicts an expected outcome, or a required safeguard is absent.
- **NOT TESTED:** The case was not executed or evidence is insufficient to establish an outcome.
- **BLOCKED:** Evaluation could not proceed safely or meaningfully; record why. BLOCKED is not a pass.

### Severity

- **Critical:** A failure could enable unauthorized disclosure/contact, false verification of a material claim, unsafe action on unresolved evidence, or another high-impact breach of a core trust boundary. Any critical failure blocks progression.
- **High / non-critical for this protocol:** A material quality or workflow failure that does not meet the critical definition. It still requires correction and retest; all ten scenarios must ultimately pass before a progression recommendation.

Severity classifications are frozen for this evaluation version in `STS-FIXTURES-1.0`. Any correction to a fixture or oracle requires a documented new version; never downgrade severity to excuse a failure.

## 4. Synthetic scenarios and expected outcomes

All records below must be synthetic. Expected outcomes are test oracles for the tabletop, not claims about current system behaviour.

| ID | Scenario | Severity | Expected outcome | Required evidence |
|---|---|---|---|---|
| STS-001 | Legitimate opportunity | High | Record the exact claim, independently checkable organizer details, scope, date, source and limitations. Do not imply the opportunity guarantees selection or safety. | Synthetic source packet; completed verification record; reviewer rationale |
| STS-002 | Person/role verified, opportunity unverified | Critical | Keep the specific opportunity unverified and unavailable for actionable/public use until its own required checks pass. Do not transfer a person's verified status to an opportunity. | Separate person/role and opportunity states; decision trace |
| STS-003 | Impersonated club or agent | Critical | Do not mark the claim verified. Pause or reject it under the proposed procedure; preserve the conflicting evidence and record the independent verification route. | Synthetic contradiction; source and contact-channel provenance; decision trace |
| STS-004 | Payment demanded for trial access or placement | Critical | Do not present it as an ordinary verified opportunity or facilitate payment for access through ScoutSA. Record the exact terms and route for review; do not make unsupported universal legal claims. | Synthetic fee terms; policy decision; escalation record |
| STS-005 | Missing or conflicting evidence | Critical | Preserve uncertainty. Block any action that depends on unresolved facts; request clarification or mark paused/rejected as appropriate. Never fill gaps by inference. | Missing/conflicting fields; pause decision; audit entry |
| STS-006 | Expired or stale verification | High | Clearly mark the check stale and require re-verification before actionable use. A past pass is not proof of current status. | Prior check date; configured freshness rule or stated uncertainty; new status |
| STS-007 | Missing, withdrawn, disputed or purpose-mismatched consent | Critical | Block disclosure/contact outside the authorized scope. Record the consent state change and follow the proposed restriction, withdrawal/removal and audit process. | Synthetic consent state/history; attempted action; enforcement result |
| STS-008 | Excessive or out-of-scope data request | Critical | Deny or withhold unnecessary data, preserve the authorized minimum, restrict access as applicable, and record the request and response. | Requested versus authorized fields; access decision; audit entry |
| STS-009 | Correction or dispute | High | Record the dispute, restrict use where needed, preserve the prior version, append the correction/review history, and re-evaluate affected claims. Do not silently overwrite history. | Before/after synthetic records; dispute and review log |
| STS-010 | Transport, scheduling or other access barrier | High | Record the barrier separately from football evidence. Do not infer low ability, low commitment or lack of talent from transport/scheduling constraints. | Synthetic player/opportunity facts; separated readiness fields; reviewer rationale |

## 5. Tabletop procedure

1. **Freeze the fixture version.** Assign a version/date to all ten synthetic scenario inputs and record the rule/procedure version under review.
2. **Predeclare the oracle.** Confirm scenario severity, expected result, evidence required and what constitutes a failure before reviewers see any observed outcome.
3. **Name the target.** State whether the reviewer is evaluating the written policy, a manual operating procedure, a prototype, or software. The first evaluation target here is the written/manual workflow only.
4. **Run each case independently.** Give the reviewer only the scenario input and the relevant procedure. Ask them to state the decision, permitted next action, evidence basis, uncertainty, and what must be logged.
5. **Record observations contemporaneously.** Do not rewrite an expected outcome after seeing the result to make it match.
6. **Classify the result.** PASS, FAIL, NOT TESTED or BLOCKED, with evidence references and a plain-language rationale.
7. **Triage failures.** Identify whether the cause is ambiguous policy, missing evidence, reviewer misunderstanding, workflow gap, or a system/control gap. Do not label a policy tabletop as a software test.
8. **Correct and retest.** Version the change, retain the original failure, rerun the affected case and any linked cases, and record both outcomes.
9. **Review the full set.** Verify all ten have final PASS outcomes and no unresolved critical defect remains before making a progression recommendation.
10. **Record a bounded conclusion.** State exactly what was evaluated, by whom, on which versions, what passed/failed, and what the tabletop cannot establish.

## 6. Evaluation record template

Copy one record per scenario.

- **Scenario ID:**
- **Fixture version / reference:**
- **Evaluation date:**
- **Evaluator(s):**
- **Target under evaluation:** written policy / manual procedure / prototype / software
- **Procedure or rule version:**
- **Input presented:**
- **Expected outcome (frozen before run):**
- **Severity (with rationale):**
- **Required evidence:**
- **Observed decision and behaviour:**
- **Evidence reference(s):**
- **Result:** PASS / FAIL / NOT TESTED / BLOCKED
- **Failure category (if applicable):**
- **Safety, consent, privacy or integrity impact:**
- **Corrective action and owner:**
- **Retest version/date/result:**
- **Remaining uncertainty and limitations:**
- **Gate implication:**

## 7. Gate interpretation

**Progression blocked** if any critical scenario fails or remains NOT TESTED/BLOCKED; any unauthorized disclosure/publication failure occurs; any consent-withdrawal enforcement failure remains; any critical defect is unresolved; or required evidence is missing.

A non-critical failure also prevents completion of this ten-case protocol until it is corrected and retested successfully.

A completed tabletop can support only a bounded claim that the specified scenarios were reviewed against the specified written/manual procedure. It cannot prove the system is scam-proof, legally compliant, operationally scalable, safe in all real-world conditions, or ready for a live pilot.

Passing this protocol would not itself authorize a closed organizational rehearsal or live pilot. The next step still requires its own explicit review and authorization, and the preconditions in Part 11 remain applicable.

## 8. Holds and prohibitions preserved

This proposal does not lift or modify existing holds. In particular, it does not authorize:

- implementation, database migration, RLS changes or production use;
- collection or processing of real player/guardian data for this evaluation;
- recruiting or contacting minors;
- public player profiles or public/actionable opportunity listings;
- live outreach, invitations, trials or payments;
- claims of legal compliance, official affiliation, fraud prevention or safety beyond the evidence.

Use synthetic records only. If a scenario cannot be evaluated without real personal data or live action, mark it BLOCKED and escalate rather than proceeding.

## 9. Current evidence ledger for this artifact

- **Protocol drafted:** Yes — this document, on a review branch.
- **Protocol decisions ratified:** Yes — bounded to synthetic manual tabletop; see ratification record.
- **Fixtures frozen:** Yes — `STS-FIXTURES-1.0`; see frozen fixture manifest.
- **Tabletop evaluation run:** No — NOT RUN.
- **Scenario outcomes:** None recorded; all remain NOT TESTED until observed.
- **Corrections/retests:** None recorded.
- **Master research ledger:** Entries 10.65 and 10.66 record the protocol/fixture state and readiness review.
- **Gate transition:** None.
- **Implementation/live-use holds:** Preserved.

## 10. Relationship to Part 11

Part 11 defines a controlled path from synthetic/tabletop validation to a closed workflow rehearsal and only later, if separately authorized, a limited live pilot. Part 12 specifies a proposed first-stage evaluation method for the trust boundaries. Neither document is a gate transition or implementation authorization.

**Governing rule:** No trust claim without evidence; no critical failure hidden by aggregate results; no progression merely because a protocol has been written.
