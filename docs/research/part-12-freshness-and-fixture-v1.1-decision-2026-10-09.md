# Part 12 Governance Decision — Freshness and Fixture v1.1

**Decision date:** 2026-10-09  
**Scope:** Synthetic manual tabletop only  
**Decision basis:** User delegated the next bounded step to the assistant ("PROCEED AS YOU DEEM FIT") after supplying the recommendation to close the two narrow governance points, freeze fixtures, retest only STS-001, and pause further tabletop expansion.  
**Status:** ADOPTED FOR THIS BOUNDED TABLETOP; NOT CONSTITUTION-LEVEL OR LIVE OPERATIONAL POLICY

## Decision A — Freshness handling

**Selected option:** No universal freshness threshold is adopted at this stage. Every verification record used to support a current claim must carry an explicit `valid_until` or `reconfirm_by` value, assigned by the accountable verifier for the specific claim and scope, with a short rationale. The verification-action timestamp remains mandatory.

For the synthetic tabletop:
- If both `valid_until` and `reconfirm_by` are absent, the record cannot support a current verification claim or actionable use. Record `FRESHNESS METADATA MISSING — BLOCKED`.
- If the recorded deadline has passed, the verification is no longer current for the stated scope until re-confirmed. Record the date and source; do not erase the historical verification.
- A verifier may not set a deadline without identifying the claim/scope and rationale. The value is not a universal policy threshold and cannot be copied to unrelated claims.
- The record must preserve who assigned the deadline, when it was assigned, its scope, rationale, and any subsequent re-confirmation.
- This is a procedural requirement for the synthetic tabletop only. It does not settle a universal freshness duration for ScoutSA, amend the Constitution, authorize production schema or code, or authorize live operation. Any implementation or live policy requires a separately ratified decision.

**Why this option:** It avoids inventing an unsupported universal 12-month period while preventing a historical check from silently implying current validity. It gives STS-006 a deterministic expected handling without pretending the fixture is its own authority.

## Decision B — STS-FIXTURES-1.1

The proposed changes to STS-001 and STS-006 are **approved for a new, versioned synthetic tabletop fixture set**, subject to the freeze record:
- STS-001 may contain newly authored fictional provenance fields (source packet/source IDs, synthetic verification-action timestamp, synthetic reviewer identifier, exact claim-by-claim scope). These are test inputs only, not recovered v1.0 evidence and not real-world verification.
- STS-001's unresolved eligibility, final capacity, and transport/access/cost remain blocking. The expected handling may establish only limited Tier 1 authenticity; Tier 2 and Tier 3 remain blocked.
- STS-006 is changed to test missing per-verification freshness metadata under Decision A. The unsupported 12-month threshold is removed from v1.1.
- STS-002–STS-005 and STS-007–STS-010 are carried forward in substance without evaluation at this time.
- STS-FIXTURES-1.0 remains unchanged and preserved as the original frozen record.

## Controlled retest scope and stop rule

Only STS-001 is to be retested against the approved v1.1 fixture and the ratified claim-scoped procedure plus this bounded freshness decision. Do not open STS-002–STS-010 now. Record the retest separately, including evaluator identity, date, source/version, expected outcome, observed handling, result, limitations, and gate implication. Because the fixture and expected handling were authored/reviewed with prior oracle exposure, do not call this an independent or blind evaluation.

After the STS-001 retest, pause formal tabletop expansion. The next work item is a Trust Core implementation-readiness/design gate, not an automatic implementation authorization.

## Authority boundaries

This decision applies only to the synthetic manual tabletop. It does not amend the Constitution or authorize:
- implementation, schema changes, migrations, RLS changes, or production deployment;
- real player/guardian data or any real minor's recruitment/contact;
- public player profiles or public/actionable opportunity listings;
- live outreach, closed rehearsal, pilot, or gate transition.

The README on `main` records schema hold and implementation deferred. Those holds remain until the project's required governance gate is separately satisfied.
