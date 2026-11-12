# Discovery & Request Review — Browser Verification

**Date/time:** 2026-11-12, approximately 13:37 SAST (UTC+02:00)  
**Branch:** `prototype/internal-demo`  
**Tested commit:** `1453056a178780b42b82366b354aa3c072e455f7`  
**Surface:** `prototype/discovery-request-smoke-tests.html` embedding `prototype/discovery-request.html`  
**Runtime:** Isolated hosted browser session via raw.githack; browser name/version was not exposed by the runner.  
**Evidence session:** https://hangar.firecrawl.dev/live#br_cb1a74ea3f664afe9275677fbc021e8f.g_ee2f2af8af0947b4ae2b215e5e841d3a.PH0CdFy-wYcfdfLxECWT__g3T5d1OfYGzEo6JvsYHcU

## Smoke test execution

The page loaded, the iframe and local fixtures resolved, and the **Run smoke tests** control was clicked in the hosted browser session.

**Result: 12 / 12 existing assertions passed.**

1. PASS — Three synthetic request cases exist.
2. PASS — Request page and fixture load in iframe.
3. PASS — Every sample request is held.
4. PASS — Unknown age has under-18 protections.
5. PASS — No sample grants purpose-specific consent.
6. PASS — No sample organization is verified.
7. PASS — Organization representative authority remains unestablished.
8. PASS — Missing or mismatched Passport and membership links remain visible after selecting REQ-DEMO-003.
9. PASS — No sample opportunity is verified.
10. PASS — No request submission or contact control is rendered.
11. PASS — Request boundary language is present.
12. PASS — No production security or persistence claim is made.

## Manual walkthrough

All three fictional request records were selected and inspected. All remained `HOLD — NOT SUBMITTABLE`.

- **REQ-DEMO-001:** Synthetic Passport linked; under-18 safeguards required; consent blocked; organization identity unverified; representative authority not established; membership claim linked but unverified; opportunity/source not verified; safeguarding blocked; no disclosure.
- **REQ-DEMO-002:** Synthetic Passport linked; unknown age treated with under-18 safeguards; no authorized request route; consent blocked; organization and representative authority unverified; membership missing; opportunity/source not verified; safeguarding blocked; no disclosure.
- **REQ-DEMO-003:** Passport missing/unresolved; adult status unverified; consent blocked in baseline fixture; organization identity unverified; representative authority not established; membership missing/mismatched; opportunity/source not verified; no completed safeguarding review; no disclosure.

## Adversarial runtime checks — failures found

Two in-memory mutations were performed in the hosted browser session and discarded by reloading the page. These are exploratory checks, not committed fixture changes.

1. **Membership false-positive:** Changing `MEM-DEMO-002.player` to `Unrelated player 003` while keeping `organizationId = ORG-DEMO-02` caused REQ-DEMO-003's membership gate to change to **Linked claim; still unverified**. The current suffix-based comparison (`m.player.includes(r.playerId.slice(-3))`) is not a reliable player identity link. This is a confirmed false-positive in the prototype logic.
2. **Consent recipient not bound:** Changing `GCS-DEMO-003` to `Given` for the exact requested purpose while assigning a different `recipientOrganizationId = ORG-DEMO-01` still caused the consent gate to show **Recorded for exact purpose**, although the request organization is `ORG-DEMO-02`. The evaluator checks player reference and purpose name/state but does not check the intended recipient. This is a confirmed consent-scope gap.

## Review notes / disposition

- The 12/12 result confirms that the existing smoke assertions execute successfully in a browser. It does **not** validate the complete policy logic; the two adversarial checks above exposed defects outside the current assertions.
- The representative-authority status is currently hard-coded to `Not established`; the smoke assertion checks the fixture value, not a dynamic independent authority evaluation.
- The current consent fixture has no authoritative recipient binding. A generic purpose label such as “share selected football evidence with a named academy” is insufficient to authorize sharing with any arbitrary academy.
- The static demo still has no authentication, authorization, RLS, tenant isolation, secure persistence, immutable audit ledger, or server-side policy enforcement.
- No production, pilot, safeguarding-compliance, or security-readiness claim is made.
- A fixed screenshot artifact was not exported into the repository. The hosted session link above is the available session evidence; browser version metadata was not exposed.

**Decision:** Browser smoke execution is complete, but the connected review workflow is **not yet accepted**. Fix the membership identity binding and recipient-bound consent, make representative authority evaluation explicit, add adversarial regression assertions, then rerun the browser suite. Do not extract/freeze the review engine until those defects are resolved.


## Remediation and second browser run

**Updated tested commit:** `af818dd6337a6ac594938f00687d05881c981de1`  
**Follow-up date:** 2026-11-12 (SAST; exact execution time not exposed)  
**Follow-up browser session:** https://hangar.firecrawl.dev/live#br_1170dd0625c740e3a7f4117aa295ffac.g_79391b76daee454d90690fe216c1d049.dnKWejJ2GPrdCkuymbtTKacSw6MfD85KK52S2m3lo1s

The two confirmed defects were corrected in the synthetic prototype:

- Membership claims now carry a stable `playerId`; linkage requires exact `playerId` and `organizationId` equality. Display names are no longer used as identity keys.
- Each consent purpose now has an explicit `recipientOrganizationId`; the evaluator requires the exact player reference, overall consent state, exact purpose, exact recipient organization, and the applicable guardian/player-voice conditions.
- Guardian authority and player voice/assent are displayed as separate gates. For under-18 or unknown-age scenarios, both established guardian authority and recorded player assent are required before purpose consent can pass. Adult consent remains blocked until adult status is explicitly verified.
- Representative authority now renders from its own authority record, independently of organization identity.
- Opportunity-specific eligibility and safeguarding review are now separate gates. A positive state in one cannot clear the other.

**Second browser result: 21 / 21 checks passed (0 failures).** The suite now includes regression checks for the prior suffix-collision exploit, mismatched consent recipient, missing overall consent, missing guardian authority, missing player assent, independent representative authority, and eligibility/safeguarding separation.

## Updated manual walkthrough

The three cases were manually selected on the updated commit. All remained `HOLD — NOT SUBMITTABLE`; all had `No disclosure permitted`.

- **REQ-DEMO-001:** Passport linked (synthetic only); under-18 safeguards required; purpose consent blocked; guardian authority blocked; player assent blocked; organization identity unverified; representative authority not established; membership linked as an unverified claim; opportunity/source not verified; eligibility not assessed; safeguarding blocked; disclosure prohibited.
- **REQ-DEMO-002:** Passport linked (synthetic only); unknown age receives under-18 safeguards; purpose consent blocked; guardian authority blocked; player assent blocked; organization identity unverified; representative authority not established; membership missing/mismatched; opportunity/source not verified; eligibility not assessed; safeguarding blocked; disclosure prohibited.
- **REQ-DEMO-003:** Passport missing/unresolved; adult status unverified; purpose consent blocked; guardian authority remains blocked pending adult-status verification; player voice not recorded; organization identity unverified; representative authority not established; membership missing/mismatched; opportunity/source not verified; eligibility not assessed; safeguarding blocked; disclosure prohibited.

## Updated disposition

The current synthetic browser workflow and its adversarial regression checks now pass. The next bounded engineering step is to extract the review logic into a pure, UI-independent module and run the same cases against that module. This is acceptance of the current **prototype logic checks only**—not production readiness, security validation, legal compliance, or pilot authorization.

The original evidence limitations remain: the hosted runner did not expose browser name/version, and a fixed screenshot image was not exported into the repository. The session link is the available interactive evidence.
