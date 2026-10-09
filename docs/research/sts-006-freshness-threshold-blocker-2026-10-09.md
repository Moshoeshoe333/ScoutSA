# STS-006 — Freshness Threshold Dependency Blocker

**Date:** 2026-10-09  
**Fixture:** `STS-FIXTURES-1.0 § STS-006`  
**Severity:** High (frozen fixture classification)  
**Status:** BLOCKED FROM EVALUATION — NOT PASS, NOT FAIL  
**Authority:** Synthetic tabletop only

## Finding

The frozen STS-006 input says a verification check is 14 months old and supplies a 12-month threshold as the procedure to apply. The governing documents inspected for Part 12 do not independently establish that 12-month threshold as an approved general rule.

A test fixture cannot create its own governing policy. Applying the fixture's unsupported threshold as though it were already authorized would make the test self-authorizing and would compromise the evaluation's validity.

## Disposition

- Keep `STS-FIXTURES-1.0` unchanged.
- Do not run or score STS-006 against the unratified 12-month threshold.
- Do not infer that 14 months is necessarily stale under an approved universal rule; the general freshness rule is unresolved.
- Resolve the dependency through the appropriate governance process, or explicitly approve a new fixture version with a properly governed rule reference. Preserve v1.0 and its original expected outcome.
- Until resolved, mark STS-006 BLOCKED FROM EVALUATION and keep overall Part 12 progression blocked.

## Boundary

This blocker is not a PASS or FAIL result for the fictional opportunity or organization. It is a policy/procedure dependency. It authorizes no implementation, real-data use, public listing, outreach, gate transition, or pilot.
