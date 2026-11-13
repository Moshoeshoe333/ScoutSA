# Documentation Integrity CI Verification — 2026-11-13

**Branch:** `prototype/internal-demo`  
**Scope:** Documentation version/count consistency guard and the prototype policy test workflow.  
**Current state:** **HOSTED CI PASSED** on the corrected source. Two successful workflow runs confirm the policy and documentation test command completed successfully.

## What was added

- `prototype/tests/documentation-integrity.test.js` checks that the contract, prototype README and gate status agree with the review-engine version parsed from source.
- It derives the expected engine test count from the `test(` declarations in `prototype/tests/review-engine.test.js` and checks the README, gate status and engine verification record for that count.
- It checks that the root README links the integrity policy.
- `.github/workflows/prototype-policy-tests.yml` now runs all `prototype/tests/*.test.js` files and is triggered by relevant README, gate-status, contract, verification, test and workflow changes.

## Hosted workflow attempts

| Run | Commit | Result | Interpretation |
|---|---|---|---|
| [43396315565](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396315565) | `166d0495eece38d7cdbe7c1f221186602241242c` | **FAILURE** | First guard version was not reliable. |
| [43396391806](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396391806) | `0b26adbbaf9ec8230b64ebbd8b521154c1d3980c` | **FAILURE** | Intermediate assertion correction was insufficient. |
| [43396448839](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396448839) | `333e56fcc823b5c84fe24c1cb95b511525461919` | **FAILURE** | Intermediate source correction was insufficient. |
| [43396467609](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396467609) | `d5bf6bf862c79109bc155e7ce2ddcd747b158908` | **FAILURE** | The generated assertion still contained fragile escaped-template-literal syntax. |
| [43396561970](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396561970) | `793868348eb01a7eadec8c3b015015602116d7f4` | **FAILURE** | Duplicate/intermediate attempt; retained in history. |
| [43396563700](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396563700) | `793868348eb01a7eadec8c3b015015602116d7f4` | **SUCCESS** | Corrected source; all workflow test files passed. |
| [43396594044](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396594044) | `2a5cc8a3932930093dfe9a440b96f62b8ecd3b3f` | **FAILURE** | Duplicate/intermediate attempt; retained in history. |
| [43396595986](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396595986) | `2a5cc8a3932930093dfe9a440b96f62b8ecd3b3f` | **SUCCESS** | All workflow test files passed. |
| [43396763965](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396763965) | `7c28ba630743f26bd712c39cd6b23b5d6a7a8170` | **SUCCESS** | Latest confirmed policy/documentation run; README and gate-status reconciliation passed.

These failed runs are retained as evidence. Do not count them as successful CI validation.

## Corrective action

The guard was simplified to use:
- direct line counting for the existing engine test declarations;
- literal comparison of the engine version in source and documentation;
- literal matching of the current `N/N` or `N / N` result count;
- string concatenation for the Markdown version assertion, avoiding escaped backtick/template-literal complexity.

Relevant correction commits:
- `333e56fcc823b5c84fe24c1cb95b511525461919`
- `793868348eb01a7eadec8c3b015015602116d7f4`

A separate manual consistency inspection confirmed the branch values at that verification point: engine `0.2.0`, 40 engine-test declarations, contract version match, README/gate version match, and the root README integrity-policy link.

## Verification result

- [x] Successful hosted GitHub Actions run on corrected test source: [run 43396563700](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396563700).
- [x] Successful hosted GitHub Actions rerun after incident-log update: [run 43396595986](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396595986).
- [x] Successful policy/documentation run after README and gate-status reconciliation: [run 43396763965](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396763965).
- [x] Successful run after the incident-log and workflow-placeholder correction: [run 43396965878](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396965878).
- [x] Successful run on the reconciled README and gate-status commit: [run 43397100761](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43397100761).
- [x] Later hosted run on `prototype/internal-demo`, commit `fef7aaed3beb87746613d049340a216d82294029`: [run 43398121693](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43398121693), conclusion **SUCCESS**; the `policy-and-documentation-tests` job completed successfully.
- [x] At that verification point, the workflow command `node --test prototype/tests/*.test.js` included 40 engine-test declarations and 3 documentation-integrity test declarations (43 total).
- [x] The three documentation-integrity checks and the existing engine tests completed successfully in that hosted run.
- [ ] Browser-integrated discovery smoke verification remains separate and outstanding; this workflow does not execute browser tests.

**Conclusion:** The automated documentation-integrity guard is active on `prototype/internal-demo`. It checks engine version and current engine-test count against the contract, prototype README, gate status and engine verification record, and checks the root README link to this policy. It is a targeted consistency guard, not a universal proof that every sentence in every document is correct.


## Subsequent evidence reconciliation — run 43398121693

The GitHub Actions run endpoint and job record were inspected directly. It identifies:
- branch: `prototype/internal-demo`;
- commit: `fef7aaed3beb87746613d049340a216d82294029`;
- workflow: `.github/workflows/prototype-policy-tests.yml`;
- job: `policy-and-documentation-tests`;
- conclusion: **SUCCESS**;
- test step: **Run headless policy and documentation tests**, completed successfully.

This run is the CI evidence cited in the current README and gate-status summaries as of this documentation reconciliation. The new affiliation proposal and its documentation-link test are subsequent changes and still require their own hosted run. At that historical point no browser-integrated v0.2.0 test had yet been run; later UI-004 and UI-005 entries below record the subsequent browser verification.


## Subsequent failed run — 43399106967

- Commit: `4304c5a2fccf317053d14edc8194cc34283f4a9b`
- Result: **FAILURE** — 43 passed, 1 failed.
- Failing check: `affiliation evidence proposal is linked and explicitly non-ratified`.
- Confirmed cause from the job log: `root README must link proposal`; the root README link had been missed by a text replacement. This was a documentation failure, not an engine/policy test failure.
- The failure is retained as evidence and is not counted as a pass.

## Current suite after DOC-006 correction

The documentation-integrity file declares **4 checks**. With 40 engine tests, the expected workflow total is **44 declarations**. Current automated test inventory: **4 documentation-integrity test declarations (44 total)**. The root README, prototype README, gate status and this record distinguish the earlier 43-test run from the current 44-test suite. The current suite has now passed hosted verification on run 43399520523 and run 43399527448.


## Successful verification after DOC-006 correction

- [x] Current 44-declaration suite passed on [run 43399520523](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399520523), commit `5bdd80c60a6559ff9a923a9b9d1b9c10c9681bb5`.
- [x] Current 44-declaration suite passed again on [run 43399527448](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399527448), commit `32d9053b83cca858a53276ec8f59d04b70f6360d`.
- [x] Both hosted jobs completed the `Run headless policy and documentation tests` step successfully.
- [x] The proposal is linked from root README, prototype README and gate status; the test suite checks those links, the non-ratified/implementation-hold language, current engine version, and synchronized test counts.
- [ ] Browser-integrated v0.2.0 verification remains outstanding and is not covered by these runs.


## Follow-up failed runs — documentation guard assertions

The following successive commits failed because the new consistency guard expected wording/run identifiers that no longer matched the current summaries. Job logs confirmed the failing assertions; the engine tests continued to pass:
- [43399600727](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399600727): root README count phrase mismatch.
- [43399608136](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399608136), [43399615854](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399615854), [43399624735](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399624735), [43399630906](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399630906): the same count mismatch plus a stale run-ID assertion that still expected 43398121693 after the summaries had been updated to 43399527448.

These failures are not passes. The assertions have now been aligned to the actual documented wording and current successful verification reference. A new hosted run is required to close DOC-006.

- [43399759324](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399759324) failed because the prototype README had changed to the valid verified form `4/4 checks passed`, while the guard accepted only `4 checks declared`. The guard now accepts either wording and still derives the expected count from test declarations.


## Final DOC-006 verification

The corrected 44-declaration suite passed on:
- [43399835146](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399835146) — commit `4c5c8c5f0c3836e0c047b1a61ba4cf79358cedbe`;
- [43399841438](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399841438) — commit `f785211bccebb2ca448a71ab6ba3167e9706db76`;
- [43399847997](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399847997) — commit `4b57458eba34e0f06c9a6c6b10f07978cdf52a76`.

Each run's `policy-and-documentation-tests` job and test step completed successfully. DOC-006 is closed. The failed attempts remain linked above and are not counted as passes.


## Opportunity evidence matrix — 2026-11-13

Added `prototype/OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md` as a non-ratified decision aid. It maps candidate evidence handling to community development sessions, recurring community programmes, academy assessments, formal club/league registration, scouting observations and funded development opportunities. It also defines neutral “not established” handling, decision-role separation, adversarial scenarios and unresolved decisions.

No engine, schema, fixture, contract or mainline behavior changed. Root README, prototype README and gate status link the matrix and explicitly preserve the implementation hold.

The documentation-integrity suite now declares **5 checks**; with 40 engine tests the expected total is **45 declarations**. Current inventory: **5 documentation-integrity test declarations (45 total)**. The previous 44-declaration suite passed on [run 43399919864](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399919864). The current 45-declaration suite awaits its own hosted verification.


Recorded 45-test CI baseline: [run 43401941704](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401941704) — 45 declarations passed (40 engine + 5 documentation checks), commit `b5fca7ca7551e96027910790eddb83fdd7e26394`.


## Final opportunity-matrix documentation verification

- [x] The opportunity evidence matrix is linked from the root README, prototype README and current gate note.
- [x] The matrix is explicitly non-ratified and preserves the implementation hold.
- [x] The documentation-integrity suite declares 5 checks; the engine suite declares 40 tests; total **45**.
- [x] All 45 declarations passed on [run 43401455192](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401455192), commit `b5fca7ca7551e96027910790eddb83fdd7e26394`.
- [x] The hosted job `policy-and-documentation-tests` and test step completed successfully.
- [ ] Browser-integrated v0.2.0 verification remains outstanding; the hosted Node workflow does not execute browser tests.


### Final summary-reconciliation attempts

The following intermediate documentation commits failed the shared-CI-reference assertion while summary files were being updated one at a time: [43401588751](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401588751), [43401594717](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401594717), and [43401600241](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401600241). The final reconciled documentation commit passed all 45 declarations on [run 43401612251](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401612251). This later successful run is additional evidence; the 45-test baseline record above remains the earlier independently verified baseline.


## Opportunity requirement declaration proposal — 2026-11-13

Added `prototype/OPPORTUNITY-REQUIREMENT-DECLARATION.md` as a non-ratified requirements-disclosure template. It covers accountable owner and representative authority, the actual offer, cohort/location/time/capacity, mandatory criteria versus preferences, claim-specific evidence, independent review, safeguarding and safe-contact, application/invitation/selection/registration distinctions, privacy minimization, disputes, expiry and change control. It includes adversarial validation cases and open decisions.

No engine, fixture, schema, contract, UI, database, RLS, API, authentication or mainline behavior changed. The declaration is linked from the root README, prototype README and gate status. A sixth documentation-integrity test checks the links, non-ratified status, implementation hold and core content.

The prior source inventory was 6 documentation-integrity test declarations (46 total), comprising 40 engine tests and 6 documentation-integrity checks. Historical 46-test CI verification: [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544) — all 46 declarations passed on commit `50566e1902b9fa409515103bc81511f4af638881`. The workflow does not execute browser tests.


## Final declaration and documentation-guard verification

- [x] The current source inventory is 40 engine tests + 6 documentation-integrity checks = **46 declarations**.
- [x] Historical 46-test CI verification: [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544) passed on commit `50566e1902b9fa409515103bc81511f4af638881`.
- [x] The hosted `policy-and-documentation-tests` job and `Run headless policy and documentation tests` step completed successfully.
- [x] Root README, prototype README, gate status and this verification record carry the same current 46-test run marker; the automated test checks that consistency.
- [ ] Browser-integrated v0.2.0 verification remains outstanding; this hosted workflow runs Node tests only.
- [ ] No mainline implementation, database, RLS, API, authentication, production or pilot authorization is implied.


## Opportunity validation scenario pack proposal — 2026-11-13

Added `prototype/OPPORTUNITY-VALIDATION-SCENARIO-PACK.md` as a synthetic, non-ratified validation artifact containing 14 fictional cases, a common outcome vocabulary, cross-case adversarial checks, a reviewer worksheet and proposed exit criteria. The pack covers informal community sessions, undefined eligibility, representative authority, expired mandates, pay-to-be-seen fees, unconfirmed venues, changed terms, misuse of coach attestations, stale registration, unsafe supervision/transport, private minor contact, disputes, excessive scholarship data requests and false corroboration from shared sources.

No implementation or policy behavior changed. The new documentation-integrity check verifies the pack's synthetic/non-ratified boundary, all 14 case IDs and links from the root README, prototype README and gate status. The suite now declares **7 documentation-integrity test declarations (47 total)**, comprising 40 engine tests and 7 documentation-integrity checks. The first hosted run [43405608125](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43405608125) failed one documentation assertion: the root README still said 6 documentation checks. The other 46 tests passed. The root README count and run/commit references were corrected. The second hosted run [43405820994](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43405820994) exposed the missing exact derived phrase `7 documentation-integrity test declarations (47 total)`. After that was added, [run 43405962751](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43405962751) exposed a shared-marker assertion that accepted only the label `Current`, not `Historical`. The baseline was correctly labelled historical; the guard has now been corrected to accept either label while enforcing one shared run reference. All failed runs are retained in DOC-009; a new hosted run is required. Browser-integrated v0.2.0 verification remains outstanding.


## Final 47-test verification — opportunity validation scenario pack

- [x] Current source inventory: 40 engine tests + 7 documentation-integrity checks = **47 declarations**.
- [x] Current 47-test CI verification: [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367) — all 47 declarations passed on commit `25108a07320a2e70cd86573a4d950024b8211273`.
- [x] Hosted `policy-and-documentation-tests` job and headless test step completed successfully.
- [x] The first three failed attempts are preserved in DOC-009; the failures were documentation count/marker reconciliation, not engine behavior.
- [ ] Browser-integrated v0.2.0 verification remains outstanding; the hosted workflow runs Node tests only.
- [ ] This research artifact does not authorize implementation, publication, real player-data processing or pilot activity.


## Unified workspace hub — 2026-11-13

Added a workspace hub to `prototype/index.html` with 11 direct links to the existing synthetic review screens. The hub includes Player Passport, organization membership review, opportunity management, evidence review, decision worksheet, safeguarded invitations, matching review, development pathways, coach/academy workspace, guardian/consent and discovery/request review. A new documentation-integrity test checks the hub, navigation state, synthetic-data notice, all 11 links and the existence of each destination file. The workflow now runs when `prototype/index.html` changes for both push and pull-request events.

The historical source inventory was 40 engine tests plus 8 documentation-integrity tests (48 total). The current source inventory is **8 documentation-integrity test declarations (50 total)**: 42 engine tests plus 8 documentation checks. The two workspace-data-integrity declarations are separate, bringing the full Node test inventory to 52. The 47-declaration suite passed previously on [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367), commit `25108a07320a2e70cd86573a4d950024b8211273`; that run is now a historical baseline and does not verify the workspace hub. The current 48-declaration suite passed on [run 43409104888](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409104888), commit `14bcabb84e58fa8f286887d4125cddb6ee6a282e`. The `policy-and-documentation-tests` job and test step completed successfully; the job log records 48 tests, 48 passed, 0 failed. At this historical point browser-integrated v0.2.0 verification was still outstanding; the later UI-004 and UI-005 records below supersede that status.


## Return navigation across specialist screens — 2026-11-13

Added a consistent, compact return-navigation strip to all 11 specialist HTML screens. Each strip links back to `prototype/index.html` and repeats the internal-demo / fictional-data boundary. The existing workspace-hub integrity check was extended to verify that every linked destination includes the return-navigation label and hub link. The documentation test count remains 8; total source declarations remain 48.

Hosted verification: [run 43409488949](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409488949), commit `fc3d121becd267287eb37bc19ba4644ed9f39b0c` — `policy-and-documentation-tests` completed successfully; **48 passed, 0 failed**. This is headless Node verification of the link inventory and source assertions, not a browser visual or interaction test.


## Passport → Opportunity Register → Request Review handoff — verification pending

On 2026-11-13, the existing workspace-hub integrity test was extended to check the synthetic Player Passport → Opportunity Register → Discovery & Request Review URL handoff, exact-fixture filtering, return navigation and fail-closed behavior for unmatched references. The source inventory remains 40 engine tests + 8 documentation-integrity checks = 48 declarations. The previously recorded 48/48 hosted run predates these assertions and is historical for this change. The updated 48-test suite subsequently passed on [run 43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388): 48 passed, 0 failed. The separate browser scripts are documented below. No persistence, submission, authorization or production behavior is implied.


## Incomplete request handoff edge-case correction — verification pending

The review identified that `?opportunity=...` without a `player` parameter previously fell back to the full fictional request queue. Corrected on `prototype/internal-demo` by adding `prototype/handoff-filter.js`, detecting both parameter presences independently, and returning an empty record set for incomplete, empty, unknown or unmatched handoffs. The ordinary queue remains available only when neither handoff parameter is present. The existing workspace-integrity test now exercises: no parameters, opportunity-only, unknown player, exact player–opportunity match, unmatched opportunity and empty opportunity. The declaration inventory remains 40 engine tests + 8 documentation-integrity checks = 48; no new test declaration was added. A fresh hosted run is required before this correction can be reported as CI-verified. Browser click-through remains outstanding.


## Read-only review-state presentation — verification pending

Added `prototype/review-state.js` as a pure projection from the current synthetic review-engine result into six display stages: fictional fixture/not submitted; authority and evidence review; safeguarding review; separate human review eligibility; final decision/outcome not recorded; and disclosure/contact prohibited. The request-review page renders the projection using DOM text nodes. The evaluator and policy rules were not changed. Regression assertions inside the existing workspace-integrity test cover all-pass, blocking failure, skipped prerequisite, missing gate, no matching request and the prohibition on invented outcomes. The declaration inventory remains 40 engine + 8 documentation-integrity checks = 48. The workflow path filter now includes `prototype/review-state.js`. The first test attempts exposed a malformed escaped-quote source assertion in the existing workspace-integrity test; the assertion was corrected to search the fixture's literal `playerId:"DEMO-PLAYER-001"` form. Failed attempts remain recorded: [43414624909](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43414624909), [43414650734](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43414650734), [43414698380](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43414698380), [43414704997](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43414704997), [43414712123](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43414712123), [43414719616](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43414719616) and [43414728521](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43414728521). A subsequent consistency-guard revision made the test fixture incomplete: it did not set `allBlockingGatesSatisfied: true` for the all-pass synthetic evaluation. [Run 43415035969](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43415035969) therefore failed at the expected-readiness assertion. The fixture was corrected in commit `038b913111b8b17d6a0de36bb07ca16934379884`; [run 43415050256](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43415050256) passed the complete suite: **48 passed, 0 failed**. The subsequent explicit `allBlockingGatesSatisfied` negative-case assertion was added in commit `ad6fb2f488b62b433ef95a5373fa79118a6e5a52` and passed on [run 43415259079](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43415259079): **48 passed, 0 failed**. Earlier escaped-quote failures remain recorded above. At the time of this UI-003 entry, no browser-integrated visual or click-through test was claimed; subsequent UI-004 and UI-005 entries record the scoped browser evidence.

A final consistency guard also requires `allBlockingGatesSatisfied === true` and both review groups to be fully passing before the UI can display eligibility for separate human review; an inconsistent readiness disposition is forced to HOLD.


## Browser-integrated request-review smoke verification — 2026-11-13

The workflow now runs both the 48-declaration Node policy/documentation suite and a separate Playwright/Chromium browser smoke script. It installs Playwright 1.56.1 and Chromium, using an `ubuntu-24.04` runner. The browser script is `prototype/tests/discovery-request.browser-smoke.cjs`; its extension intentionally keeps it separate from the Node `*.test.js` declaration inventory.

### Browser test coverage

1. Ordinary request queue renders all three synthetic scenarios and supports selecting each.
2. Six read-only stages render; the fixture is not submitted, no final decision is invented, and disclosure/contact remain prohibited.
3. Guardian-mediated under-18, unknown-age and adult-status-unverified scenarios remain on hold/protected.
4. Opportunity-only, unknown-player, unmatched player/opportunity and empty-opportunity handoffs show no request records and no fabricated review stages.
5. Exact player/opportunity and player-only handoffs return only their intended synthetic records.
6. All eight connected workspace destinations and the workspace-hub return destination respond successfully; the Passport link is clicked in-browser.
7. At 390px viewport width, the request layout and review stages stack without horizontal page overflow; no uncaught browser page or console errors occur.

### Hosted attempts and corrections

- [43417453416](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417453416): the original source-only CI workflow passed 48/48; it did not yet run Playwright.
- [43417473594](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417473594): browser step was blocked because `ubuntu-latest` resolved to Ubuntu 26.04, unsupported by Playwright 1.56.1. The runner was pinned to `ubuntu-24.04`.
- [43417528428](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417528428): 48/48 headless tests passed; browser assertion incorrectly expected generic `FAIL/SKIPPED` text rather than the actual displayed gate labels. The assertion was corrected to the rendered labels.
- [43417619789](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417619789): 48/48 headless tests passed; the unmatched-pair test expected the handoff banner itself to say “No matching synthetic request”. The page correctly shows a recognized Passport handoff and a separate no-match state in the request panel; the test was aligned to that behavior.
- [43417997207](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417997207): 48/48 headless tests passed; the Passport click-through path assertion contained an over-escaped regular expression. Corrected before the final run.

### Final verification

- [x] Hosted GitHub Actions [run 43418015630](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43418015630), commit `70c6c8563325403bfff334bb8f6bdde67a23be41`, completed successfully.
- [x] Node policy/documentation suite: **48 passed, 0 failed**.
- [x] Chromium browser smoke: **7/7 groups passed**.
- [x] Browser checks include actual rendered state, selecting request cases, URL handoffs, link destination responses, a Passport navigation click, mobile viewport layout and browser error reporting.
- [ ] Full visual-design review, accessibility audit, security/authorization testing, real identity/consent/safeguarding validation and production-readiness testing remain outside this smoke-test scope.

**Conclusion:** The current v0.2.0 Discovery & Request Review synthetic journey is browser-smoke verified for the scenarios and paths above. This is not a security, legal, safeguarding-effectiveness or production-readiness claim. Mainline implementation holds remain unchanged.


## Unified workspace hub browser verification — 2026-11-13

### Test artifact and hosted run

The Playwright/Chromium script `prototype/tests/workspace-hub.browser-smoke.cjs` now runs in the same GitHub Actions job after the request-review browser test. The workflow uses Ubuntu 24.04, Node 22, Playwright 1.56.1 and Chromium. The browser test script is a `.cjs` file and does not increase the Node `*.test.js` declaration inventory.

Hosted run [43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388), commit `7eb60f651363dfc3b569e2be80da187007a75d2d`, completed successfully:
- Headless policy/documentation suite: **48 passed, 0 failed**.
- Discovery & Request Review browser smoke: **7/7 groups passed**.
- Unified workspace hub/all-workspace browser smoke: **8/8 groups passed**.

### Executed hub and specialist checks

1. The hub loads and exposes exactly 11 specialist workspace cards.
2. Each of the 11 cards is clicked and navigates to its intended specialist page.
3. Every specialist page renders a document title and primary heading.
4. Every specialist page provides a working return-to-hub link; clicking it returns to the hub and restores all 11 cards.
5. All 11 specialist destinations respond successfully.
6. Representative interactions work: Passport tab selection, guardian scenario selection and development-pathway player selection.
7. Hub view navigation switches between workspaces, organizations and safeguarding views; “Open all workspaces” opens the workspace view.
8. Mobile navigation opens the sidebar and selecting a view closes it.
9. The hub and all 11 specialist pages fit a 390px viewport without horizontal overflow.
10. No uncaught browser page or console errors are reported.

### Defects found and repaired

- The hub's workspace cards remained in a three-column grid on mobile. A 390px browser test found the “SAFEGUARDING” category label extended beyond the viewport (document width 396px against a 390px viewport). The mobile media query now collapses `.workspace-grid` to one column.
- The hub's view-navigation binding called `.forEach` on the single-element `$` helper rather than the collection helper `$$`. Chromium reported `$(...).forEach is not a function`, which interrupted the script before view-navigation listeners and later actions could bind. The code now uses `$$`.
- The “Open all workspaces” button existed but had no listener. It now switches to the workspaces view and is covered by a browser assertion.
- The browser test now explicitly exercises these controls and fails if the page emits uncaught browser errors.

### Failed attempts and evidence handling

- [43419267368](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419267368): first complete hub browser attempt; identified horizontal overflow on the hub.
- [43419439900](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419439900): diagnostic geometry isolated the overflowing “SAFEGUARDING” label.
- [43419600972](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419600972): verified the mobile grid fix and exposed the hub's uncaught selector-helper errors.
- [43419728005](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419728005): no horizontal overflow; hub view navigation still failed because the selector-helper correction was not yet fully applied.
- [43419881053](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419881053), [43419902468](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419902468) and [43419918566](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419918566): intermediate revisions before the final selector correction was present in the tested source.
- [43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388): final successful run after the mobile, selector and primary-action fixes.

**Conclusion:** The unified synthetic workspace hub and all 11 specialist pages are browser-smoke verified within the explicitly tested routes and interactions. This does not constitute a full accessibility audit, security/authorization test, real-world safeguarding validation or production-readiness claim. Mainline implementation holds remain unchanged.


## Current source inventory note — 2026-11-13

The current engine source declares 49 tests and the documentation-integrity source declares 8 checks. This produces **8 documentation-integrity test declarations (57 total)** for the documentation guard's engine-plus-documentation count; the separate workspace-data-integrity file adds 2 more declarations, for **59 total Node test declarations**. The latest nine engine tests cover malformed top-level inputs, cross-player membership references, cross-organization opportunity ownership, opaque player-reference separation, malformed nested consent collections, invitation workflow state, the second-review/approval boundary and guardian revocation reevaluation. They are committed after the last recorded successful hosted run and remain awaiting hosted verification. Historical PASS records above are not evidence for the current head.
