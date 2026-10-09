# Part 12A — Proposed Synthetic Trust Fixtures v1.1 (Review Copy)

**Date:** 2026-10-09  
**Status:** PROPOSAL FOR REVIEW — NOT RATIFIED, NOT FROZEN, NOT EXECUTED  
**Base:** `STS-FIXTURES-1.0`, frozen and unchanged  
**Parent protocol:** `docs/research/synthetic-trust-evaluation-set-2026-10-09.md`  
**Procedure:** `docs/research/opportunity-verification-procedure-v1-2026-10-09.md`  
**Authority effect:** None beyond documenting a proposed test-fixture revision. No implementation or live-use authority.

## 1. Change-control and provenance statement

This is a complete review copy intended to make the proposed changes reviewable in context. It is not the frozen v1.1 release. The v1.0 fixture and oracle remain unchanged and must be retained as historical records.

Only STS-001 and STS-006 have proposed input/expected-handling changes; STS-002 through STS-005 and STS-007 through STS-010 are carried forward unchanged in substance. All new STS-001 packet identifiers, timestamps, and reviewer identifiers below are invented fictional test data authored for this proposal. They are not evidence recovered from v1.0 and do not represent a real-world verification action.

Before any v1.1 evaluation, this review copy must be explicitly approved, checked against the ratified procedure, assigned a release/freeze record, and then preserved unchanged. Until then, use v1.0 for historical reference and retain its existing blockers. Do not award scenario results from this proposal.

## 2. Proposed fixture manifest

| ID | Fixture | Severity | Proposed expected handling |
|---|---|---|---|
| STS-001 | Independently corroborated opportunity | High | Corroborate only explicitly supported authenticity claims with provenance and scope; unresolved conditions block actionability. |
| STS-002 | Verified role, unverified opportunity | Critical | Keep opportunity unverified and not actionable/public; do not inherit the person's status. |
| STS-003 | Impersonation / conflicting authority | Critical | Do not verify; pause/reject under procedure; preserve contradictory evidence and independent check path. |
| STS-004 | Payment demanded for access | Critical | Do not present as ordinary verified opportunity or facilitate payment; record demand and escalate without unsupported legal claims. |
| STS-005 | Missing/conflicting evidence | Critical | Preserve uncertainty and block actions dependent on unresolved facts. |
| STS-006 | Stale verification / missing freshness rule | High | Do not invent a freshness threshold; preserve historical evidence and block actionable use pending governed rule or approved recheck. |
| STS-007 | Missing/withdrawn/purpose-mismatched consent | Critical | Block out-of-scope disclosure/contact and record state change/enforcement evidence. |
| STS-008 | Excessive data request | Critical | Withhold fields not necessary and authorized for the defined purpose; record request and decision. |
| STS-009 | Correction/dispute | High | Preserve prior state and provenance; record dispute/correction; restrict use where needed and re-evaluate affected claims. |
| STS-010 | Transport/access barrier | High | Record barrier separately; do not infer football ability, commitment or talent from it. |

## 3. STS-001 — Independently corroborated opportunity (proposed v1.1 variant)

**Synthetic packet ID:** `SYN-RJA-STS001-PACKET-1.1`

All details in this section are newly authored fictional fixture data for review:
- `SYN-RJA-INV-001`: fictional invitation submitted 2026-10-08 at 13:40 SAST, naming a fictional assessment date of 2026-11-14.
- `SYN-RJA-CHANNEL-CONFIRM-001`: fictional confirmation through the predesignated official channel represented in the synthetic packet, recorded 2026-10-08 at 14:30 SAST.
- `SYN-REVIEWER-R017`: fictional reviewer identifier for the represented synthetic check.
- Represented verification-action timestamp: `2026-10-08T14:30:00+02:00` (SAST). This is fictional fixture data, not a real verification action and not the timestamp of this proposal or any later retest.

### Claim-by-claim scope proposed as corroborated

1. The represented channel returned a confirmation associated with the fictional organization name “Riverstone Juniors Academy.”
2. The represented channel confirmed that an invitation for an assessment dated 2026-11-14 had been issued.
3. No additional claim is corroborated by that represented check.

### Explicitly unresolved / not corroborated

Participant eligibility criteria; final session capacity or availability of a place; transport/access arrangements, responsibility and known costs; fee policy; participant-specific eligibility, consent and feasibility; safeguarding quality or overall safety; and any guarantee of selection.

### Proposed expected handling

- If the evaluator records the packet/source references, timestamp, fictional verifier ID, exact scope and limitations correctly, Tier 1 may be recorded as **AUTHENTICITY CORROBORATED — LIMITED SCOPE** for claims 1–2 only.
- Tier 2 remains **PAUSED / BLOCKED — NON-ACTIONABLE** because material eligibility, capacity and transport/access/cost conditions remain unresolved.
- Tier 3 remains **NOT ESTABLISHED** because no participant-specific evidence or authorization is supplied.
- No public listing, player-profile surfacing, participant-specific contact/invitation, full-verification claim, or guarantee of safety/selection is permitted.
- A future PASS would mean only that the evaluator handled this synthetic test correctly; it would not mean the fictional opportunity is actionable or safe.

## 4. STS-002 — Verified role, unverified opportunity (carried forward)

**Synthetic input:** A fictional staff member, `K. Dlamini`, has a current role assertion supported by the fixture's independent role check. They submit an assessment invitation attributed to fictional `Northbank Football Centre`, but the fixture contains no independent confirmation that the centre authorized this event.

**Expected outcome:** Keep the role claim and opportunity claim separate. The opportunity remains unverified and unavailable for actionable/public use until its own required checks pass. Do not copy a verified-role status onto the opportunity.

**Evidence to record:** Separate role and opportunity states; missing verification evidence; blocked action; decision trace.

## 5. STS-003 — Impersonation / conflicting authority (carried forward)

**Synthetic input:** A message from a fictional account claiming to represent `Mhlabeni United Academy` requests player referrals for a trial. A separate synthetic source packet from the academy's designated official channel states that the account and event are not recognized. The submitted message asks the reviewer to ignore the official-channel response.

**Expected outcome:** Do not verify or publish the claim. Pause or reject according to the written procedure; preserve both assertions, source provenance, the contradiction and the independent-check route. Do not treat the contradiction alone as a final legal finding of fraud.

**Evidence to record:** Both synthetic source references; conflict state; blocked action; reviewer rationale; escalation or closure step.

## 6. STS-004 — Payment demanded for access (carried forward)

**Synthetic input:** A fictional opportunity notice says an applicant must pay a `R750` “guaranteed selection administration fee” to a personal intermediary before receiving the venue details. No organizational fee policy or independently authorized payment channel is provided.

**Expected outcome:** Do not present the notice as an ordinary verified opportunity and do not facilitate payment through ScoutSA. Preserve the exact demand and source, mark the claim for review, and follow an authorized escalation route if one exists. Do not state a universal legal conclusion without separately evidenced qualified review.

**Evidence to record:** Exact synthetic fee wording; missing authorization; decision; escalation record or governance gap.

## 7. STS-005 — Missing/conflicting evidence (carried forward)

**Synthetic input:** A fictional event record contains two different dates for the same assessment and gives two conflicting age-eligibility requirements. Neither source is designated as controlling, and no independent clarification is present.

**Expected outcome:** Keep the conflict visible. Do not select a date or eligibility rule by guesswork. Block any action dependent on those facts and request authoritative clarification or mark the opportunity paused.

**Evidence to record:** Conflicting values and source references; uncertainty statement; blocked action; follow-up needed.

## 8. STS-006 — Stale verification / missing freshness rule (proposed v1.1 variant)

**Synthetic packet ID:** `SYN-STS006-PACKET-1.1`

**Synthetic input:** A fictional organization has a historical check recorded 14 months before the fictional tabletop evaluation date. No approved governing freshness threshold is supplied by the fixture or the governing procedure.

**Proposed expected outcome:**
- Do not invent a freshness threshold or claim that 12 months is an established rule.
- Preserve the historical check as historical evidence; do not treat it by itself as proof of current verification.
- Record **POLICY DEPENDENCY / BLOCKED FROM ACTIONABLE USE** pending an authorized freshness rule or an approved, scoped current recheck under a governing procedure.
- Do not label the organization specifically stale merely because 14 months elapsed unless a separately authorized rule supports that conclusion.
- This fixture tests recognition of a missing policy dependency; it does not itself establish the policy.

**Evidence to record:** Historical check reference/date; governing rule search/review scope; explicit statement that no approved threshold was identified; current action blocked; dependency owner or `UNASSIGNED / GOVERNANCE GAP` if no owner has been designated.

## 9. STS-007 — Consent state absent, withdrawn or purpose-mismatched (carried forward)

**Synthetic input:** A synthetic player record has a consent entry for internal coach review only. A reviewer attempts to send the record and a video link to an external scout. The fixture also supplies a later synthetic event showing that the relevant permission was withdrawn before the attempted disclosure.

**Expected outcome:** Block external disclosure and contact. Record withdrawal, attempted action, rule applied and enforcement outcome. Earlier narrower consent is not permission for the external purpose. If enforcement cannot be established, record FAIL or NOT TESTED, not PASS.

**Evidence to record:** Consent purpose and timeline; attempted action; deny/block outcome; audit trace.

## 10. STS-008 — Excessive data request (carried forward)

**Synthetic input:** A fictional receiving-side reviewer requests a player's full birth record, home address, guardian identity-document image, medical history and academic report before a preliminary discussion. The stated purpose requires only a position, age-eligibility status and a way to route a request through the authorized adult/coach process. No additional authorization for sensitive fields is supplied.

**Expected outcome:** Withhold unnecessary or unauthorized fields; do not expose raw sensitive documents. Record the request, purpose, minimum fields that could be considered, decision and any escalation. Role membership alone does not authorize access.

**Evidence to record:** Requested-versus-necessary field comparison; authorization basis or absence; access decision; audit trace.

## 11. STS-009 — Correction or dispute (carried forward)

**Synthetic input:** A fictional coach assertion records a player's position as goalkeeper. The fictional player/authorized representative disputes the record and requests correction, stating that the player now primarily plays as a centre-back. No adjudicated outcome is provided.

**Expected outcome:** Record the dispute and request without silently overwriting the historical assertion. Preserve provenance and versions, restrict use if the disputed claim could cause material harm, and route the claim for review under the written procedure. The request itself is not proof that the new assertion is verified.

**Evidence to record:** Prior assertion/version; dispute request; current status; review route; later correction or resolution if one occurs.

## 12. STS-010 — Transport/access barrier (carried forward)

**Synthetic input:** A fictional player has coach-supported football evidence relevant to an assessment. The assessment is 42 km away and scheduled at a time when the fixture says no confirmed transport is available. No negative football-performance evidence is supplied.

**Expected outcome:** Record transport feasibility as a separate opportunity-context issue. Do not lower football readiness or infer low ability, commitment or talent. Record unresolved logistics and any safe, authorized follow-up required.

**Evidence to record:** Football evidence references; transport constraint; separated readiness rationale; unresolved feasibility status.

## 13. Recording requirements for any later evaluation

For each scenario, record:
- fixture ID and the exact approved version;
- evaluator identity and evaluation date;
- procedure version;
- frozen expected outcome, unchanged after approval;
- observed decision/response;
- evidence references;
- PASS / FAIL / NOT TESTED / BLOCKED;
- severity and safety/privacy/consent impact;
- corrective action and retest, if any;
- limitations and gate implication.

A missing critical scenario or any critical failure blocks progression. All ten scenarios must ultimately pass after required corrections/retests, with zero tolerated critical failures. Record the observation before comparison with the approved oracle. A manual tabletop evaluates written/manual handling only; it is not software-enforcement, legal-compliance, or live-pilot evidence.

## 14. Approval and freeze checklist

- [ ] Review and explicitly approve this complete v1.1 candidate.
- [ ] Confirm all carried-forward scenarios match v1.0 in substance and document any intended deviations.
- [ ] Confirm the STS-001 fictional provenance is clearly synthetic and the unresolved conditions still block Tier 2 and Tier 3.
- [ ] Confirm STS-006 tests a missing-policy dependency without asserting a freshness threshold.
- [ ] Create a separate v1.1 ratification/freeze record, including exact commit/blob reference and change list.
- [ ] Only after freeze, conduct and record a separate tabletop retest against the approved v1.1 oracle.

**Until approved and frozen, this document is a review copy only.** STS-001 remains BLOCKED under v1.0; STS-006 remains BLOCKED FROM EVALUATION under v1.0. No PASS/FAIL is awarded here. No Constitution amendment, implementation, migration/RLS change, real-data use, minor contact, publication, outreach, pilot, merge to `main`, or gate transition is authorized.
