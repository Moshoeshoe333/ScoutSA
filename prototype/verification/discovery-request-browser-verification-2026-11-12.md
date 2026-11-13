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


## Pure review-engine extraction and browser verification

**Engine:** `prototype/review-engine.js`  
**Engine version:** `0.1.0`  
**UI integration:** `prototype/discovery-request.html` now calls the engine and renders its returned gates.  
**Tested commit:** `7580f4b5eca05747494bfecf5bab08dea75833ae`  
**Browser session:** https://hangar.firecrawl.dev/live#br_bf36be73a2a24904b4eaffcb860c294c.g_d3042b597443447696795632a8f3da30.-rM02ivM8bqqGyCDId1SeIoYKzYY9XJgoVQZzzRo_Kk

The evaluator is UI-independent and receives a request plus explicit fixture context. It does not access the DOM, storage, network, authentication, authorization, or disclosure systems. It returns twelve uniquely keyed gates, stable reason codes, a review disposition, and an explicit `disclosurePermitted: false`.

**Browser result: 32 / 32 checks passed (0 failures).**

The 32 checks include the 21 UI/regression checks and 11 pure-engine checks:
- Engine loads and exposes version 0.1.0.
- All three synthetic cases evaluate to HOLD.
- Twelve unique gate keys are returned.
- Missing Passport and membership mismatch produce reason codes.
- Stable player ID mismatches are rejected.
- Wrong-recipient consent and missing overall consent are rejected.
- Guardian authority and player assent are both required for minors.
- Organization identity and representative authority remain independent.
- Opportunity eligibility and safeguarding remain independent.
- A fully satisfied synthetic review reaches only `READY_FOR_SEPARATE_HUMAN_REVIEW`; disclosure remains prohibited.

The three UI cases were also manually selected after engine integration:
- **REQ-DEMO-001:** HOLD; linked synthetic Passport; guardian-mediated route present; consent, guardian authority and player assent blocked; organization and representative authority unverified; membership linked but unverified; source unverified; eligibility not assessed; safeguarding blocked; no disclosure.
- **REQ-DEMO-002:** HOLD; linked synthetic Passport; guardian-mediated route not established; consent, guardian authority and player assent blocked; organization and representative authority unverified; membership missing/mismatched; source unverified; eligibility not assessed; safeguarding blocked; no disclosure.
- **REQ-DEMO-003:** HOLD; Passport missing/unresolved; adult status unverified; consent blocked; guardian authority blocked pending adult verification; player voice blocked; organization and representative authority unverified; membership missing/mismatched; source unverified; eligibility not assessed; safeguarding blocked; no disclosure.

**Updated disposition:** The UI and pure-engine synthetic checks pass. The next bounded step is to define a versioned backend gate contract and state-transition rules. This does not authorize backend implementation, real identity processing, RLS, deployment, pilot use, or disclosure.


## Draft backend contract consistency check

Draft artifacts added on `prototype/internal-demo`:

- `prototype/REVIEW-ENGINE-CONTRACT.md`
- `prototype/contracts/review-evaluation-input.schema.json`
- `prototype/contracts/review-evaluation-result.schema.json`

Structural cross-check results:
- Both schema files parse as JSON.
- The result schema defines twelve gate keys; all twelve match the engine's gate keys.
- All 21 reason-code enum values in the result schema are present in the engine source.
- The request schema contains no direct PII fields such as name, date of birth, phone, email, address, identity number, document image or media URL.
- All three current synthetic fixtures still evaluate to `HOLD`, with twelve gates and `disclosurePermitted: false`.

This was a JSON parse and contract/engine consistency check, **not** a full JSON Schema validator run or a backend integration test. The contract remains draft and unratified. No API, database, migration, RLS, authentication, identity vault, consent capture or disclosure implementation was created.


## Review engine v0.2.0 — headless verification

**Engine commit:** `34a93b4fb23b234859a48eef4a13e6a2d5de58a3`.  
**Test suite commit:** `d6b7863a8c785e0f2e74aeafe47b746e56a5e9be`.  
**Node runtime:** v26.12.1 in an isolated Node execution environment.  
**Command:** `node --test prototype/tests/review-engine.test.js`  
**Result:** **40 / 40 passed**, 0 failed, approximately 70.59 ms test duration.

Additional checks on the current branch state:
- `prototype/discovery-request.html` inline JavaScript syntax: PASS.
- `prototype/discovery-request-smoke-tests.html` inline JavaScript syntax: PASS.
- Input JSON Schema file parses as JSON: PASS.
- Result JSON Schema file parses as JSON: PASS.

The current browser-integrated smoke page was **not executed** against this updated engine. An unauthenticated hosted browser request to the private repository's raw GitHub URL returned 404, so no new browser pass is claimed. The earlier 32/32 browser result recorded above belongs to the prior engine baseline and must not be carried forward as proof of this refactor.

A GitHub Actions workflow was added to run the headless suite on relevant branch changes. Its hosted run status was not independently retrieved in this verification session; the 40/40 result above is from the isolated Node run, not a claimed GitHub Actions result.

## v0.2.0 policy changes

- All time-sensitive evaluations require an explicit caller-supplied timestamp.
- Passport, organization, representative authority, membership, consent and opportunity records require active lifecycle status and a valid future expiry.
- Organization identity and representative authority form Tier 1. Purpose consent, guardian authority and player-voice checks are SKIPPED until both pass.
- Representative authority is bound to the exact organization, representative and review scope.
- Consent requires a controlled purpose code and exact recipient organization; free-text label matching alone is insufficient.
- Any established guardian objection, revocation or withdrawal creates a conflict hold; an asserted guardian does not establish authority.
- Re-evaluation after consent or authority revocation returns HOLD; the engine does not cache a prior pass.
- The browser adapter supplies minimal pseudonymous projections to the engine. This is not server-side enforcement or a PII security boundary.

The membership trust-tier model and legal guardian-authority resolution remain explicit open decisions. They were not silently invented or implemented.


## Final v0.2.0 precedence and invitation checks

The headless suite was extended to cover exact player binding for guardian/assent records, opportunity-source precedence, invitation-to-opportunity linkage, independent second-review completion, free-text-only purpose rejection, and re-evaluation after authority/consent revocation.

Final headless result: **30 / 30 passed**, approximately 54.20 ms. The current discovery page and smoke-test page inline scripts both passed syntax compilation. Both JSON schemas parsed successfully.

The current browser-integrated smoke page remains unexecuted against v0.2.0 because unauthenticated browser access to this private repository returns 404. Do not describe the browser suite as passing on this version.


## Final lifecycle and guardian conflict verification

Additional adversarial cases were added and executed:
- Expiry at the exact timestamp boundary is rejected.
- Every established primary guardian must explicitly approve; silence is not consent.
- Guardian authority and player voice cannot be borrowed from a consent case linked to a different player.
- Established guardian objection/revocation/withdrawal causes a conflict hold.
- Opportunity eligibility and safeguarding remain skipped until source verification.
- Invitation review must bind to the exact opportunity and complete independent second review.

Final Node test run: **32 / 32 passed**, 0 failed, 166.94 ms. Both inline page scripts compile successfully. Both contract schema files parse as JSON.

The current browser UI remains unexecuted for v0.2.0; private-repository access limitations still prevent an unauthenticated hosted browser run. No browser pass is claimed.


## Duplicate-reference integrity

The engine now rejects duplicate records for a requested Passport, organization, representative-authority grant, membership, consent, opportunity or invitation review instead of silently selecting the first matching object. Duplicate grants for the same controlled purpose code are also treated as ambiguous and fail closed.

Headless suite extended to **35 / 35 passed**, 0 failed, 120.25 ms. The JSON schema files parsed successfully. The updated browser smoke page has not been run in an authenticated browser session.


Final rerun after unused-helper cleanup: **35 / 35 passed**, 0 failed, 54.57 ms. This is the current recorded headless result.


## Duplicate-reference matrix extension

The duplicate-reference tests now cover all referenced entity classes: Passport, organization, representative authority, membership, consent, opportunity and invitation review, plus duplicate purpose grants. Each ambiguous reference fails closed rather than silently selecting a first match.

Final headless run: **40 / 40 passed**, 0 failed, 70.59 ms. Both schemas parse as JSON. The UI inline scripts were syntax-checked earlier and have not changed since that check. Current browser execution remains outstanding because the repository is private and the isolated browser receives no GitHub credentials.


## Current source-count reconciliation — 2026-11-13

The current engine test file contains **42/42 declared test cases** (this is a source declaration count, not a claim that the latest hosted run passed). The current documentation-integrity suite contains 8 declarations; together these are 50 declarations in the count checked by `documentation-integrity.test.js`. Two additional cross-workspace data-integrity tests bring the full Node test inventory to 52. The latest malformed-input cases require fresh hosted verification.


## Later source-inventory note — 2026-11-13

This historical browser execution remains tied to the tested commit above and is not evidence for later source changes. The current `prototype/tests/review-engine.test.js` source now declares **44/44 test cases**. Two additional negative-path cases cover a membership reference bound to a different player and an opportunity owned by a different organization. They are committed after the historical browser run and await a new hosted workflow result; do not attribute this later test inventory to the historical execution.
