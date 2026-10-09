# Opportunity Verification Rule — Ratification Record

**Date:** 2026-10-09  
**Repository:** `Moshoeshoe333/ScoutSA`  
**Branch:** `proposal/part-12-synthetic-trust-evaluation`  
**Decision:** RATIFIED WITH AMENDMENTS — SYNTHETIC MANUAL TABLETOP PROCEDURE ONLY  
**Governing procedure:** `docs/research/opportunity-verification-procedure-v1-2026-10-09.md`  
**Decision source:** Explicit user ratification in the project conversation, including the three-tier distinction and the required amendments below.

## Ratified rule

The three-tier distinction is adopted for the bounded manual tabletop:
1. **AUTHENTICITY CORROBORATED (LIMITED SCOPE)** — claim-specific corroboration with source reference, scope, timestamp, verifier identity, and limitations.
2. **OPPORTUNITY CONDITIONS CHECKED (SCOPE LIMITED)** — material opportunity conditions supported by evidence, with provenance and required record fields.
3. **ACTIONABLE FOR A PARTICULAR PARTICIPANT** — the opportunity and participant-specific eligibility, feasibility, consent/guardian authority, purpose, and applicable conditions are addressed for that specific proposed action.

Authenticity alone does not make an opportunity actionable. A transition between tiers is deliberate, evidence-based, and recorded; it is never automatic. An opportunity must not be called verified for participant-facing/actionable use unless authenticity is corroborated and it is actionable for the particular participant.

## Required amendments included

- Transport/access arrangements, responsibility, and known costs are explicit required fields for any opportunity requiring physical attendance.
- Every tier requires a source reference, verification timestamp, verifier identity, scope, and limitations as applicable. Missing required evidence prevents the tier from being established and requires downgrade or BLOCKED status; missing evidence must not be invented.
- Material unresolved conditions block actionability and public/player-facing use.
- If a material condition is unresolved after 72 hours, escalate to the designated authority. If unresolved after escalation, retain BLOCKED status. If no designated authority has been assigned, record that governance gap; do not invent an authority or treat elapsed time as permission.
- New contradictory or weakening evidence can cause downgrade or pause; prior states must be preserved.

## STS-001 disposition under the ratified rule

The initial observation remains **BLOCKED — NOT A PASS**. The fixture reference can be identified as `STS-FIXTURES-1.0 § STS-001`, but the initial observation does not contain the underlying verification-action timestamp or a sufficiently explicit verifier identifier. The recorded date of the observation is not substituted for the missing verification timestamp. Eligibility, capacity, and transport/access/cost also remain unresolved.

No claim is made that a new verification was performed. The next valid step is evidence completion and a separately recorded retest; if the missing provenance is not present in the synthetic packet, the case remains blocked. Do not change the frozen oracle to force a pass.

## STS-006 disposition

The 12-month freshness threshold remains **UNRATIFIED** by governing documents and is not ratified by this decision. STS-006 is **BLOCKED FROM EVALUATION** until the freshness rule is separately resolved through governance or an explicitly approved fixture-version change. Frozen fixture v1.0 must not be silently altered.

## Authority boundaries

This decision ratifies a manual procedure for synthetic tabletop evaluation only. It does not amend the Constitution, Player Passport, Consent Model, or Core User Flows; change any frozen fixture/oracle; prove software enforcement; authorize implementation, database/RLS/migration work, real personal data, minor contact, publication, live outreach, a closed rehearsal, a live pilot, or a gate transition.

**Evidence rule:** This record proves that the procedure was ratified within this limited scope. It does not prove that the procedure or any scenario has passed evaluation.
