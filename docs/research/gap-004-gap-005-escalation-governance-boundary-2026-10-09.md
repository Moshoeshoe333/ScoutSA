# GAP-004 and GAP-005 — Escalation Authority and Procedure/Governance Boundary

**Date identified:** 2026-10-09  
**Scope:** ScoutSA Part 12 synthetic manual tabletop procedure  
**Status:** OPEN — governance clarification required  
**Authority:** No live operational authority created

## GAP-004 — No designated authority is identified for the 72-hour escalation trigger

**Observation:** Opportunity Verification Procedure v1.0 says that an unresolved material condition should be escalated after 72 hours to the designated authority. The reviewed material does not establish a named role, accountable owner, route, backup, or acceptance/closure responsibility for that escalation.

**Impact:** The tabletop can detect that escalation is due, but cannot truthfully record a completed escalation to an authority that has not been assigned. The procedure already requires recording this as a governance gap rather than inventing a person or authority.

**Controlled treatment:** For synthetic tabletop records only, mark escalation destination **UNASSIGNED / GOVERNANCE GAP**, keep the case BLOCKED, and record the trigger timestamp if the synthetic scenario supplies one. Do not send a real escalation or imply that an operational escalation route exists.

**Resolution needed:** A separately authorized governance decision must define the accountable role, scope of authority, route, backup/absence handling, response expectations, and closure/accountability record before any live operational use is considered.

## GAP-005 — Boundary between tabletop procedure and governing operational policy needs explicit treatment

**Observation:** The ratified procedure includes a 72-hour escalation trigger. The user ratified that procedure for synthetic manual tabletop only; this decision did not amend the Constitution or authorize operational use. The possible issue is not that the bounded tabletop rule is automatically invalid, but that readers could mistake a test-procedure rule for an already-authorized organization-wide operational policy.

**Impact:** If scope is not explicit, the procedure could be misapplied as live policy or used to imply an escalation capability that has not been assigned or implemented.

**Controlled treatment:** Retain the 72-hour trigger as a **tabletop-only evaluation instruction**. Label it clearly in procedure and related records. Do not describe it as a Constitution-level rule, a live service-level commitment, or evidence that an escalation route exists.

**Resolution needed:** Before any live pilot or operational procedure is proposed, conduct a separately governed alignment review. Decide whether the 72-hour trigger should be adopted in governing documentation, replaced, or excluded from operational policy. No such decision is made by this gap record.

## Related controlled dependencies

- **STS-001:** remains BLOCKED until required verification provenance and material conditions are evidenced in an approved synthetic packet or a properly versioned fixture.
- **STS-006:** remains BLOCKED FROM EVALUATION until the 12-month freshness dependency is resolved through governance or a properly approved fixture-version change.
- **Fixture policy:** do not alter frozen `STS-FIXTURES-1.0` in place. A proposed `STS-FIXTURES-1.1` must be separately authored, versioned, reviewed, and explicitly approved; its fictional evidence must be labelled as synthetic fixture content, never represented as evidence recovered from v1.0.
- **Evaluation integrity:** no scenario result is awarded by this record. No frozen oracle is changed.

## Authority boundary

This gap record does not authorize implementation, schema/migration/RLS changes, real personal data, minor contact, public listing, live outreach, rehearsal, pilot, merge to main, or a gate transition.
