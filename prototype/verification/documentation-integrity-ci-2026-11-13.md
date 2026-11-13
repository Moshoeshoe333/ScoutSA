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

This run is the CI evidence cited in the current README and gate-status summaries as of this documentation reconciliation. The new affiliation proposal and its documentation-link test are subsequent changes and still require their own hosted run. No browser-integrated v0.2.0 test is implied.


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
