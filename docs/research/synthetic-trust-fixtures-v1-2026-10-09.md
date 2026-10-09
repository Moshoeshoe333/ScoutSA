# Part 12A — Frozen Synthetic Trust Fixtures v1.0

**As of:** 2026-10-09  
**Parent protocol:** `docs/research/synthetic-trust-evaluation-set-2026-10-09.md`  
**Ratification record:** `docs/research/part-12-protocol-ratification-record-2026-10-09.md`  
**Status:** FIXTURE SET FROZEN FOR TABLETOP — NOT EXECUTED  
**Data classification:** Entirely fictional synthetic data; no real personal data or contact details  
**Fixture version:** `STS-FIXTURES-1.0`  
**Rule/procedure version:** Part 12 protocol as ratified 2026-10-09  
**Authority effect:** None beyond freezing inputs and expected outcomes for the bounded tabletop. No implementation or live-use authority.

## Freeze statement

The ten inputs and expected outcomes below are frozen before any tabletop outcome is recorded. The evaluator must not silently alter an input, expected outcome, or severity to make a result pass. If a defect in a fixture or oracle is discovered, pause the affected evaluation, document the reason, create a new fixture version, and preserve this version and its results.

All names and organizations below are invented for testing. The fictional names do not identify real people or organizations. Any URLs, telephone numbers, or identity-document values are intentionally omitted.

## Fixture manifest

| ID | Fixture | Severity | Frozen expected outcome |
|---|---|---|---|
| STS-001 | Independently corroborated opportunity | High | Verify only the defined claim/scope; record provenance, date, limits and outstanding conditions. No guarantee of selection or safety. |
| STS-002 | Verified role, unverified opportunity | Critical | Keep the opportunity unverified and not actionable/public; do not inherit the person's status. |
| STS-003 | Impersonation / conflicting authority | Critical | Do not verify; pause/reject under procedure; preserve contradictory evidence and the independent check path. |
| STS-004 | Payment demanded for access | Critical | Do not present as an ordinary verified opportunity or facilitate payment; record exact terms and escalate for review without unsupported legal claims. |
| STS-005 | Missing/conflicting evidence | Critical | Preserve uncertainty and block actions dependent on unresolved facts. |
| STS-006 | Stale verification | High | Mark stale; require recheck before actionable use; do not treat historical pass as current. |
| STS-007 | Missing/withdrawn/purpose-mismatched consent | Critical | Block out-of-scope disclosure/contact and record the state change/enforcement evidence. |
| STS-008 | Excessive data request | Critical | Withhold fields not necessary and authorized for the defined purpose; record request and decision. |
| STS-009 | Correction/dispute | High | Preserve prior state and provenance; record dispute/correction; restrict use where needed and re-evaluate affected claims. |
| STS-010 | Transport/access barrier | High | Record the barrier separately; do not infer football ability, commitment or talent from it. |

## STS-001 — Independently corroborated opportunity

**Synthetic input:**  
Fictional organization `Riverstone Juniors Academy` submits an invitation for a fictional assessment session on 2026-11-14 at a stated venue. The evaluator receives a synthetic source packet containing (a) the submitted invitation, (b) a separately obtained confirmation through a predesignated official channel represented in the fixture packet, and (c) a list of unresolved conditions: participant eligibility, final session capacity and transport arrangements have not been confirmed.

**Frozen expected outcome:**  
The reviewer may mark only the organizer identity and the precisely corroborated invitation details as checked, with scope and timestamp. The reviewer must state the unresolved conditions, must not imply guaranteed selection or overall safety, and must not infer that one verified detail verifies all other details.

**Evidence to record:** Source packet version; claim-by-claim verification scope; timestamp; unresolved conditions; reviewer rationale.

## STS-002 — Verified role, unverified opportunity

**Synthetic input:**  
A fictional staff member, `K. Dlamini`, has a current role assertion supported by the fixture's independent role check. They submit an assessment invitation attributed to fictional `Northbank Football Centre`, but the fixture contains no independent confirmation that the centre authorized this event.

**Frozen expected outcome:**  
The role claim and opportunity claim remain separate. The opportunity remains unverified and unavailable for actionable/public use under the protocol until its own required checks pass. No verified-role badge or status is copied onto the opportunity.

**Evidence to record:** Separate role and opportunity states; missing verification evidence; blocked action; decision trace.

## STS-003 — Impersonation / conflicting authority

**Synthetic input:**  
A message from a fictional account claiming to represent `Mhlabeni United Academy` requests player referrals for a trial. A separate synthetic source packet from the academy's designated official channel states that the account and event are not recognized. The submitted message asks the reviewer to ignore the official-channel response.

**Frozen expected outcome:**  
Do not verify or publish the claim. Pause or reject according to the written procedure; preserve both assertions, source provenance, the contradiction and the independent-check route. Do not treat the contradiction alone as a final legal finding of fraud.

**Evidence to record:** Both synthetic source references; conflict state; blocked action; reviewer rationale; escalation or closure step.

## STS-004 — Payment demanded for access

**Synthetic input:**  
A fictional opportunity notice says an applicant must pay a `R750` “guaranteed selection administration fee” to a personal intermediary before receiving the venue details. No organizational fee policy or independently authorized payment channel is provided in the fixture.

**Frozen expected outcome:**  
Do not present the notice as an ordinary verified opportunity and do not facilitate the payment through ScoutSA. Preserve the exact demand and its source, mark the claim for review, and follow the escalation route defined by the procedure. Do not state a universal legal conclusion unless separately evidenced by qualified review.

**Evidence to record:** Exact synthetic fee wording; missing authorization; decision; escalation record.

## STS-005 — Missing/conflicting evidence

**Synthetic input:**  
A fictional event record contains two different dates for the same assessment and gives two conflicting age-eligibility requirements. Neither source is designated as controlling, and no independent clarification is present.

**Frozen expected outcome:**  
Keep the conflict visible. Do not select a date or eligibility rule by guesswork. Block any action dependent on those facts and request authoritative clarification or mark the opportunity paused.

**Evidence to record:** Conflicting values and source references; uncertainty statement; blocked action; follow-up needed.

## STS-006 — Stale verification

**Synthetic input:**  
A fictional organization was checked 14 months ago. The procedure supplied for the tabletop says checks older than 12 months require re-verification before actionable use. No current check is included.

**Frozen expected outcome:**  
Mark the check stale under the supplied rule and require re-verification before actionable use. Preserve the historical check as historical evidence; do not label the organization currently verified.

**Evidence to record:** Previous check date; rule version; resulting status; action blocked pending recheck.

## STS-007 — Consent state is absent, withdrawn or purpose-mismatched

**Synthetic input:**  
A synthetic player record has a consent entry for internal coach review only. A reviewer attempts to send the record and a video link to an external scout. The fixture also supplies a later synthetic event showing that the relevant permission was withdrawn before the attempted disclosure.

**Frozen expected outcome:**  
Block the external disclosure and contact action. Record the withdrawal, the attempted action, the rule applied and the enforcement outcome. The earlier narrower consent must not be treated as permission for the external purpose.

**Evidence to record:** Consent purpose and timeline; attempted action; deny/block outcome; audit trace. If the procedure cannot establish enforcement, record FAIL or NOT TESTED, not PASS.

## STS-008 — Excessive data request

**Synthetic input:**  
A fictional receiving-side reviewer requests a player's full birth record, home address, guardian identity-document image, medical history and academic report before a preliminary discussion. The stated preliminary purpose requires only a position, age-eligibility status and a way to route a request through the authorized adult/coach process. The fixture grants no additional authorization for sensitive fields.

**Frozen expected outcome:**  
Withhold the unnecessary or unauthorized fields; do not expose raw sensitive documents. Record the request, purpose, minimum fields that could be considered, decision and any escalation. Do not infer that role membership alone authorizes access.

**Evidence to record:** Requested-versus-necessary field comparison; authorization basis or absence; access decision; audit trace.

## STS-009 — Correction or dispute

**Synthetic input:**  
A fictional coach assertion records a player's position as goalkeeper. The fictional player/authorized representative disputes the record and supplies a correction request stating that the player now primarily plays as a centre-back. No adjudicated outcome is provided.

**Frozen expected outcome:**  
Record the dispute and correction request without silently overwriting the historical assertion. Preserve provenance and versions, restrict use if the disputed claim could cause material harm, and route the claim for review under the written procedure. Do not treat the request itself as proof that the new assertion is verified.

**Evidence to record:** Prior assertion/version; dispute request; current status; review route; later correction or resolution if one occurs.

## STS-010 — Transport/access barrier

**Synthetic input:**  
A fictional player has coach-supported football evidence relevant to an assessment. The assessment is 42 km away and scheduled at a time when the fixture says no confirmed transport is available. No negative football-performance evidence is supplied.

**Frozen expected outcome:**  
Record transport feasibility as a separate opportunity-context issue. Do not lower a football-readiness assessment or infer low ability, commitment or talent. Record the unresolved logistics and any safe, authorized follow-up required.

**Evidence to record:** Football evidence references; transport constraint; separated readiness rationale; unresolved feasibility status.

## Tabletop recording requirements

For every scenario, record:
- fixture ID and version (`STS-FIXTURES-1.0`);
- evaluator and evaluation date;
- procedure version;
- expected outcome above, unchanged;
- observed decision/response;
- evidence references;
- PASS / FAIL / NOT TESTED / BLOCKED;
- severity and safety/privacy/consent impact;
- corrective action and retest, if needed;
- limitations and gate implication.

## Current state

- Fixture inputs and expected outcomes: **FROZEN — v1.0**.
- Tabletop evaluation: **NOT RUN**.
- Scenario results: **NONE**.
- Independent evaluator review: **NOT RECORDED**.
- Software enforcement evidence: **NONE**.
- Gate transition or implementation authorization: **NONE**.

**Criticality reminder:** STS-002, STS-003, STS-004, STS-005, STS-007 and STS-008 are Critical. STS-001, STS-006, STS-009 and STS-010 are High. Any critical failure or untested critical scenario blocks progression. All ten must ultimately pass after required correction and retest.
