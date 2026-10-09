# Proposed Synthetic Fixture Amendments — Candidate v1.1

**Date:** 2026-10-09  
**Status:** PROPOSAL ONLY — NOT APPROVED, NOT FROZEN, NOT EVALUATED  
**Base:** `STS-FIXTURES-1.0`, frozen and unchanged.

## Change-control boundary

This document proposes a versioned delta only. It does not replace or modify v1.0. All new source IDs, timestamps, and reviewer IDs below are invented fictional test data, not recovered evidence and not claims about real-world events. Before use, the complete v1.1 fixture set must be assembled, reviewed, explicitly approved, and frozen. No scenario result changes by this proposal.

## STS-001 — proposed provenance supplement

**Packet ID:** `SYN-RJA-STS001-PACKET-1.1`

Proposed synthetic evidence:
- `SYN-RJA-INV-001`: fictional invitation submitted 2026-10-08 13:40 SAST, naming a fictional assessment date of 2026-11-14.
- `SYN-RJA-CHANNEL-CONFIRM-001`: fictional confirmation through the predesignated official channel, recorded 2026-10-08 14:30 SAST.
- `SYN-REVIEWER-R017`: fictional reviewer identifier, used only inside this synthetic packet.
- Represented verification-action timestamp: `2026-10-08T14:30:00+02:00`. This is a fictional event timestamp, not the time of a real verification action or of the present retest.

Proposed claim scope:
1. The represented channel returned a confirmation associated with fictional “Riverstone Juniors Academy.”
2. The represented channel confirmed an invitation for an assessment dated 2026-11-14.
3. No other claim is corroborated by this check.

Explicitly unresolved: eligibility, final capacity/available place, transport/access arrangements and responsibility/cost, fee policy, participant-specific eligibility/consent/feasibility, overall safety, and guaranteed selection.

Proposed expected handling: Tier 1 may be recorded as **AUTHENTICITY CORROBORATED — LIMITED SCOPE** only for claims 1–2, with source, timestamp, synthetic reviewer ID and limitations recorded. Tier 2 remains **PAUSED / BLOCKED — NON-ACTIONABLE** because material conditions remain unresolved. Tier 3 remains **NOT ESTABLISHED**. No publication or participant-specific action is permitted. A PASS, if later awarded by a recorded evaluator, would mean correct handling of the test—not that the fictional opportunity is actionable or safe.

## STS-006 — proposed policy-dependency variant

V1.0 remains unchanged and blocked because its 12-month threshold lacks governing authority.

Proposed replacement condition for a future v1.1:
- A fictional organization has a historical check recorded 14 months before the fictional evaluation.
- No approved freshness threshold is supplied.
- The reviewer must not invent a threshold or call the organization currently verified based only on the historical check.
- Expected handling: **POLICY DEPENDENCY / BLOCKED FROM ACTIONABLE USE** until an authorized freshness rule or an approved, scoped current recheck resolves the question.
- Do not declare it stale specifically because it exceeded 12 months unless that threshold is separately governed.

This variant tests recognition of a missing rule; it does not establish the rule.

## Approval required before use

- Explicit approval of the proposal and new fictional data.
- Complete v1.1 set assembled, with unchanged scenarios carried forward and all deltas itemized.
- Review that STS-001 still blocks Tier 2/Tier 3 while material conditions are unresolved.
- Review that STS-006 tests missing-policy detection without assuming a threshold.
- Separate freeze record for v1.1.
- Separate retest record with evaluator identity, evaluation date, procedure version, observed decision, evidence references, and result.

Until those steps are completed, STS-001 remains BLOCKED under v1.0; STS-006 remains BLOCKED FROM EVALUATION under v1.0. No gate transition, merge, implementation, migrations, live use, or scenario PASS/FAIL is authorized by this proposal.
