# Documentation Integrity and Error Prevention

**Status:** Active engineering control  
**Applies to:** Every branch, especially the isolated `prototype/internal-demo` branch  
**Priority:** High — documentation accuracy is part of release quality  
**Last reviewed:** 2026-11-17

## 1. Non-negotiable rule

Documentation must describe the repository state that actually exists at the referenced branch and commit. README files, gate-status records, contracts, schemas, verification records, workflow descriptions and implementation notes must not contradict source code or one another.

When a discrepancy is found:

1. Stop relying on the affected claim.
2. Record the discrepancy in the incident log below.
3. Identify the authoritative source for the fact (source code, executable test output, workflow run, or ratified decision).
4. Correct every affected document, not just the first file noticed.
5. Add or strengthen a preventive check where practical.
6. Read the changed files back from the intended branch and inspect the resulting commit/diff.
7. Report what was corrected, what was verified, and what remains unverified.

A documentation correction is not complete merely because a write operation returned a commit SHA.

## 2. Source-of-truth hierarchy

Use the following evidence hierarchy. A lower-level artifact cannot silently overrule a higher-level one.

1. **Ratified governance decisions** — authority for product/domain policy and gate transitions.
2. **Current source code and schemas** — what is actually implemented in the repository.
3. **Executed tests and verified workflow runs** — what was actually tested, with exact commit/runtime/result.
4. **Verification records** — durable account of test scope, limits and evidence.
5. **Gate status and README files** — concise summaries that must reconcile to the above.
6. **Planning notes and proposals** — intentions only; never evidence of implementation or approval.

A configured CI workflow is not a passing CI run. A local test pass is not a hosted CI pass. A syntax check is not a browser test. A synthetic evaluator is not a security boundary or production authorization service.

## 3. Required change protocol

Before editing:
- Confirm repository, target branch and current file revision.
- Read the current file and identify every document that repeats the affected fact.
- Preserve the distinction between mainline and isolated prototype work.

After editing:
- Explicitly pass the intended branch to every write operation.
- Never rely on the repository default branch for a write.
- Read every changed file back from that same branch.
- Inspect the commit diff and confirm only intended paths changed.
- Check relevant references, counts, versions, dates, links and claims across all affected documents.
- If a write lands on the wrong branch, stop, record it, restore the intended tree, and verify both branches. Do not imply that the commit history was erased.

## 4. Documentation synchronization checklist

For every meaningful engineering change, reconcile:

- Root `README.md`: project-level status and links.
- `docs/00-gate-status.md`: current gate state, holds and branch boundary.
- `prototype/README.md`: actual prototype inventory, run instructions, test evidence and limitations.
- Relevant contract and JSON Schemas: current versions and explicitly unresolved policy.
- Verification record: exact commit, command, runtime, counts, result, scope and limitations.
- CI workflow: actual triggers and commands; hosted status only when retrieved.
- This incident log: errors, corrections and preventive measures.

Do not rewrite historical evidence to make it look current. Preserve prior results but label their version, date and scope clearly.

## 5. Automated safeguards

The mainline workflow `.github/workflows/documentation-integrity.yml` runs `node --test docs/tests/*.test.js` on relevant `main` changes. Its tests reconcile the root README with the current gate-status date, controlled next move and implementation holds, verify the integrity-policy link, and reject zero-byte workflow files. The filename check uses explicit `.endsWith()` comparisons to avoid the escaped-regex defect caught during DOC-004.

The isolated prototype workflow `.github/workflows/prototype-policy-tests.yml` runs all `prototype/tests/*.test.js` tests, including the documentation-integrity test. That test compares the engine version and declared test count against the contract, prototype README, gate status and engine verification record; it also checks the root README policy link and rejects zero-byte workflow files.

Both workflows are branch-scoped and intentionally test different source-of-truth boundaries. A passing mainline documentation check does not certify the prototype; a passing prototype suite does not certify mainline governance.

When a new repeated fact is introduced into documentation, either add it to the consistency test or document why it cannot be checked automatically.

### DOC-007 — Prototype documentation index drift and incomplete CI path coverage

- **Detected:** 2026-11-17
- **Severity:** High — the documentation-integrity workflow failed and some later documentation changes could bypass the expected hosted check.
- **Finding:** Runs [44091221023](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44091221023) and [44091232808](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44091232808) failed five assertions because the prototype README omitted links to the Affiliation Evidence Model Proposal, Opportunity Evidence Acceptance Matrix, Opportunity Requirement Declaration, Opportunity Validation Scenario Pack and Synthetic Audit-History Proposal. Review also found push and pull-request path filters were asymmetric: prototype HTML, several docs and the workflow directory were not consistently covered.
- **Impact:** The README inventory was incomplete and some changes could land without the expected policy/documentation/browser workflow. Browser tests were skipped after the Node test step failed. Earlier successful browser runs remain historical and do not validate the affected commits.
- **Correction:** Restored all five missing prototype README links. Broadened both push and pull-request filters to the same bounded repository areas (`README.md`, `docs/**`, `prototype/**`, `.github/workflows/**`) and added concurrency cancellation so an obsolete run on the same ref does not waste resources after a newer commit arrives.
- **Preventive measure:** Keep push and pull-request coverage symmetric; changes to prototype code, contracts, tests, documentation and workflow configuration must all trigger the same complete suite. Require a successful exact-head run before updating status summaries. Preserve failed run IDs and never count skipped browser suites as passes.
- **Correction commits:** `c4fb0cd252d19cd9ac441e5b8ada95fb3078c037`, `ecbf320d32890c6784aa8689bba87164504e9191`, `782c2adfddf93dca0c43a83c30aa629240bfdbce`, `546098fb529b66afbec19586aa66db606e0d15a1`, `ebe4f518f6359af0a588074e60439c7af3ed017c`.
- **Status:** Corrective changes committed; awaiting successful hosted verification on the final branch head. Do not close DOC-007 until the exact-head run completes all Node and browser steps.



### TM-001 — Tournament Manager browser test queried a hidden ledger

- **Detected:** 2026-11-18
- **Severity:** Medium — hosted browser verification failed after the prior workflow suites passed.
- **Finding:** Run [44287739432](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44287739432), commit `f174d212272c8408b65f1329ba41a573a0eb7b63`, failed because the test queried `#ledger` while the Record Ledger section was hidden. Playwright resolved the existing record locator but correctly timed out waiting for visibility. The test had not navigated back from the Eligibility Review section.
- **Impact:** The Tournament Manager browser suite stopped; later browser suites were skipped. This does not establish that the underlying eligibility record was absent or that later suites failed.
- **Correction:** Make the test navigate explicitly to Records before asserting imported ledger rows, then navigate to Eligibility Review to assert the eligibility result in its own visible panel.
- **Additional prevention:** Strengthen the Organizer Portal handoff importer with object-shape checks, per-collection limits, feature-link/scope validation, collision checks for existing edition IDs, and a 1 MiB file-size limit. Add browser regression cases for malformed JSON, null records, dangling feature references, conflicting edition identity and oversized files. Each rejected import must leave tournament state unchanged.
- **Status:** Corrective change committed; hosted verification pending.

## 6. Incident log

### DOC-001 — Documentation drift: engine version and final test count

- **Detected:** 2026-11-13
- **Severity:** Medium — could misstate the current prototype contract and verification evidence.
- **Finding:** The contract header still described the engine as v0.1.0 while the source was v0.2.0. The verification record also retained an older 27/27 count in a sentence describing the latest isolated Node run, while the final run recorded later in the same file was 40/40.
- **Impact:** Readers could receive contradictory version and test-status information.
- **Correction:** Contract version reference aligned to v0.2.0; stale 27/27 sentence aligned to 40/40. Historical test runs remain recorded as historical evidence.
- **Preventive measure:** Add a machine-run documentation-integrity test that derives the current engine version and test declaration count from source and checks the contract, prototype README, gate status and latest verification record. Include docs and README changes in the CI trigger paths.
- **Correction commits:** `6d4e8069a73f67ba036e67e839441e8910bf53ce`, `32e16d5c3564712adebf77466be6a036256aeeb7`.
- **Status:** Corrected; preventive guard verified by successful hosted runs [43396563700](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396563700), [43396595986](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396595986) and [43396763965](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396763965), [43396965878](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396965878).

### DOC-002 — Wrong-branch README write

- **Detected:** 2026-11-12
- **Severity:** Medium — a prototype README was briefly written to `main` instead of `prototype/internal-demo`.
- **Finding:** A write operation omitted its explicit branch argument.
- **Impact:** The main branch tree briefly contained a prototype README addition. A subsequent revert removed that file from the mainline tree; the add/revert commits remain in history.
- **Correction:** The unintended file was removed from `main`; intended prototype documentation remains on `prototype/internal-demo`. The mainline tree was checked after the correction.
- **Preventive measure:** Every GitHub write must specify `branch: "prototype/internal-demo"` (or the explicitly intended target). After each write, fetch the file from that branch and inspect the commit diff. Verify branch identity before and after multi-file changes.
- **Correction commit:** `f88d0cfd8dd2d9b35abab29df54513748f61af6d` (revert).
- **Status:** Mainline tree restored; history retains the add/revert record. Prevention rule active.

### DOC-003 — First documentation-integrity CI attempt failed

- **Detected:** 2026-11-13
- **Severity:** Low — the new guard itself was not yet reliable; no product or player data was affected.
- **Finding:** The first hosted run (run `43396315565`, commit `166d0495eece38d7cdbe7c1f221186602241242c`) and subsequent attempts (runs `43396391806`, `43396448839`, `43396467609`) failed in the test step. Source review found the guard had been generated with fragile regular-expression and escaped-template-literal syntax; the contract assertion was also too brittle for the Markdown formatting.
- **Impact:** The new automated documentation check could not yet be relied upon. None of these runs is a pass; they remain part of the incident history.
- **Correction:** Replaced the regular-expression approach with line counting and literal version/count comparisons, then replaced the escaped-template-literal assertion with plain string concatenation. The final test-source correction was followed by successful hosted runs [43396563700](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396563700) and [43396595986](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396595986). The workflow ran `node --test prototype/tests/*.test.js` and completed successfully for the 40 engine tests plus 3 documentation-integrity tests.
- **Preventive measure:** Prefer direct parsing/string comparisons for these fixed repository facts; inspect generated source and run the test locally before relying on CI; require a successful hosted run before marking the guard active. Keep failed runs linked and never overwrite them with a later pass.
- **Failed runs:** https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396315565 · https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396391806 · https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396448839 · https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396467609
- **Correction commits:** `333e56fcc823b5c84fe24c1cb95b511525461919`, `793868348eb01a7eadec8c3b015015602116d7f4`.
- **Successful verification:** [run 43396563700](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396563700), [run 43396595986](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396595986), [run 43396763965](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396763965), [run 43396965878](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396965878).
- **Status:** Closed — corrected and preventive test verified in hosted CI. Failed runs remain preserved above as incident evidence.

### DOC-004 — Mainline README and gate-status summary were stale

- **Detected:** 2026-11-13
- **Severity:** Medium — the project landing page described an obsolete next phase.
- **Finding:** The mainline root README still dated its status to 2026-10-06 and said the next phase was MVP Boundary Freeze, although the canonical gate record had advanced through the schema boundary, physical table boundary, SQL draft and PostgreSQL runtime witness. The canonical gate record also lacked a current dated note at the top.
- **Impact:** A reader could misunderstand the actual project stage, repeat completed planning work, or miss that external validation—not another MVP boundary freeze—is the controlled next move.
- **Correction:** Updated the mainline README to the current controlled state; added a dated executive note to the mainline gate record; linked this integrity policy; and added a dedicated mainline documentation test/workflow.
- **Preventive measure:** Mainline CI now checks the README/gate status date, next move, implementation holds, integrity-policy link, and rejects zero-byte workflow files.
- **Verification:** Mainline hosted run [43397604838](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43397604838) passed the initial checks; latest policy revision run [43397671175](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43397671175) passed. The prototype policy suite also passed after the shared policy was aligned in [run 43397699155](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43397699155).
- **Correction commits:** `16f8c6d843eb3a9aca0d2812d1db12a80aff1b2b`, `89b76ffe04fcece64786c8b14d922ce519786606`, `89d96f9cc4b82ff81f4c157e44cf8b722be8efb9`, `8fb3c08c03ac36cbd84498b6ddeab8b7271d54f3`, `8f7d293f6af4340efa03e6c3940b9e0c0c432d5e`.
- **Status:** Closed — mainline summaries corrected and automated guard verified.

### CI-001 — Empty PostgreSQL workflow placeholder generated unrelated failures

- **Detected:** 2026-11-13
- **Severity:** Medium — created misleading CI noise alongside the prototype workflow.
- **Finding:** `.github/workflows/postgresql-runtime-witness.yml` was a zero-byte file on both `prototype/internal-demo` and `main`. GitHub Actions showed failed runs named for that workflow with zero jobs, distinct from the prototype policy/documentation workflow.
- **Impact:** Pushes to the prototype branch produced unrelated failed workflow entries that could be mistaken for failures in the new policy/documentation checks. No database execution or product code change was involved in this incident.
- **Correction:** Removed the zero-byte placeholder from `prototype/internal-demo` in commit `b639a2e8d7b03de493c72a7c94b39d2ca1dfc415`. The same zero-byte placeholder was also removed from `main` in commit `f8a42608d8d408fffed1f960d31a6c19141aaf3b`. Both branches were checked for absence after deletion. Historical workflow runs remain in GitHub Actions history; this correction does not rewrite them.
- **Preventive measure:** Audit workflow files for zero-byte content, ensure every workflow has a valid trigger and job, and identify workflow name/run ID before attributing a CI failure to a particular test suite.
- **Status:** Closed — zero-byte workflow removed from both `prototype/internal-demo` and `main`; historical failed runs remain preserved as evidence.

## 7. New incident template

For every future mistake, add a dated entry with:

- Incident ID and severity
- Detection date and affected branch/commit/path
- What happened and how it was detected
- User/repository impact and any inaccurate claim that must be withdrawn
- Root cause (confirmed, or explicitly unknown)
- Correction and verification evidence
- Preventive measure (test, workflow, review step or guardrail)
- Correction commit(s)
- Status: open, corrected, or closed after prevention is verified

Do not silently overwrite incidents. Append follow-up notes when a prevention measure is later validated or found insufficient.

## 8. Current boundary

This control does not authorize implementation, database migration, RLS, API, authentication, real personal data, deployment or pilot activity. It governs the accuracy of the documentation and evidence for work that is already authorized.


### DOC-005 — Prototype documentation referenced an older successful CI run

- **Detected:** 2026-11-13
- **Severity:** Low — the cited run was genuinely successful, but it was not the most recent successful prototype policy run available during this reconciliation.
- **Finding:** The root README, prototype README, gate-status note and verification record emphasized earlier successful workflow runs while a later successful hosted run, [43398121693](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43398121693), existed on commit `fef7aaed3beb87746613d049340a216d82294029`.
- **Impact:** Readers could mistake an older verification point for the current recorded CI evidence.
- **Correction:** Updated the three branch-local summaries to reference run 43398121693 and added that run to the verification record. The older run links remain in the historical attempt table.
- **Preventive measure:** Record exact run ID, branch, commit SHA and conclusion together; distinguish a historical successful run from a later verification. The documentation-integrity test now checks that the current recorded CI run is referenced consistently across the root README, prototype README and gate status.
- **Status:** Corrected; verification will be refreshed after the documentation update's own hosted CI run.


### DOC-006 — New proposal-link guard exposed a missing root README link

- **Detected:** 2026-11-13
- **Severity:** Low — a documentation-integrity test failed before the proposal could be considered fully reconciled.
- **Affected branch/commit:** `prototype/internal-demo`, commit `4304c5a2fccf317053d14edc8194cc34283f4a9b`.
- **Finding:** The new documentation test required the root README, prototype README and gate status to link the affiliation evidence proposal. The prototype README and gate status were updated, but the root README replacement did not match its actual wording, so the root link was omitted.
- **Impact:** Hosted run [43399106967](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399106967) failed at the proposal-link assertion. After that link was added, runs [43399355022](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399355022) and [43399360103](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399360103) exposed a stale root README documentation-test count; runs [43399400096](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399400096) and [43399407659](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399407659) exposed incomplete gate-status and CI-verification count reconciliation in successive commits. The job logs identify each failing assertion. The 40 engine tests passed in these runs; no product behavior, player data, or mainline code was affected.
- **Correction:** Added the missing root README link; recorded all failed runs; reconciled the root README, prototype README, gate status and CI verification record to 40 engine + 4 documentation checks (44 declarations).
- **Preventive measure:** Keep the proposal-link assertion in the automated suite; add explicit count reconciliation for documentation tests; verify all changed files by reading them back from the intended branch; inspect job logs before diagnosing a failed workflow.
- **Verification:** The reconciled 44-declaration suite passed on [run 43399520523](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399520523) and again on [run 43399527448](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399527448); both policy-and-documentation jobs completed successfully.
- **Additional finding:** Runs [43399600727](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399600727), [43399608136](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399608136), [43399615854](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399615854), [43399624735](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399624735) and [43399630906](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399630906) exposed two brittle test assertions: the root README used the accurate phrase “4 documentation checks” rather than the test's assumed wording, and the test still required historical run 43398121693 after summaries had advanced to 43399527448. The job logs identify these exact assertions.
- **Additional correction:** Align the root README check with its documented wording and align the consistency assertion to the current recorded successful run, 43399527448. Preserve the earlier failures as incident evidence.
- **Verification:** The corrected 44-test suite passed on [run 43399835146](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399835146), [run 43399841438](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399841438), and [run 43399847997](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399847997). All three `policy-and-documentation-tests` jobs completed successfully.
- **Status:** Closed — the missing root README link and all count/run-reference assertion mismatches were corrected; the 44-test preventive suite passed repeatedly in hosted CI. Failed runs remain preserved above as evidence.

- **Further follow-up:** Run [43399759324](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399759324) exposed one more overly strict wording assumption: the prototype README had advanced from “4 checks declared” to “4/4 checks passed”, but the test accepted only the former. The guard now accepts either state while still checking the derived count. This is recorded as part of DOC-006, not treated as a separate product defect.


### DOC-007 — Opportunity evidence matrix documentation reconciliation

- **Detected:** 2026-11-13
- **Severity:** Low — documentation-integrity guard failures during introduction of a new non-ratified decision aid.
- **Affected branch:** `prototype/internal-demo`; no mainline files or product behavior changed.
- **Finding:** The new opportunity-specific evidence matrix was created, but several successive documentation updates did not fully reconcile the root README's exact count wording, prototype README's count wording, the gate-status matrix link, the shared current-CI reference, and the verification record's explicit declaration count. The guard correctly failed rather than accepting inconsistent summaries.
- **Additional reconciliation failures:** [43401588751](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401588751), [43401594717](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401594717), and [43401600241](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401600241) occurred while the four summary files were being updated one at a time. Their logs show the shared-CI-reference assertion failing because some summaries had advanced to the new run ID before the remaining summaries were updated. The final reconciled commit passed on [43401612251](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401612251).
- **Failed hosted runs:** [43401138691](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401138691), [43401148217](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401148217), [43401152601](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401152601), [43401159536](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401159536), [43401165666](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401165666), [43401216198](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401216198), [43401301774](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401301774), [43401307744](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401307744), [43401314385](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401314385), and [43401391008](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401391008). Representative job logs showed the precise failing assertions: root/prototype README count wording, missing shared CI marker, missing gate matrix link, and missing verification test-count phrase. The engine tests remained passing in these runs.
- **Correction:** Reconciled root README, prototype README, gate status and verification record to 40 engine + 5 documentation checks (45 total); all four now carry the same last-successful CI reference. The automated guard checks the shared reference, counts, proposal/matrix links and non-ratified boundaries.
- **Preventive measure:** When adding a design artifact, update all branch summaries and verification records from their actual text; validate the exact generated source before relying on hosted CI; keep wording-flexible count checks tied to declared test counts rather than a single phrase.
- **Verification:** All 45 test declarations passed in [hosted run 43401455192](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401455192), commit `b5fca7ca7551e96027910790eddb83fdd7e26394`.
- **Status:** Closed — documentation links, counts and CI references reconciled; preventive checks passed in hosted CI. Failed attempts remain preserved as evidence.


### DOC-008 — Opportunity requirement declaration proposal and documentation reconciliation

- **Detected:** 2026-11-13
- **Severity:** Low — new non-ratified design artifact; documentation and test inventory required synchronized updates.
- **Affected branch:** `prototype/internal-demo` only. Mainline remains untouched.
- **Finding:** The new opportunity requirement declaration introduces a sixth documentation-integrity test. Summary files and verification records previously described five documentation checks and a 45-test suite. The first hosted run [43403172054](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403172054) failed in the documentation-integrity test step; the verification record's count phrase did not match the guard's exact expected wording (`6 documentation-integrity test declarations (46 total)`).
- **Impact:** If left unreconciled, readers could mistake the previous hosted 45-test baseline for verification of the new declaration and its link/content guard.
- **Correction:** Added the declaration as a non-ratified proposal; linked it from root README, prototype README and gate status; updated the source inventory to 40 engine + 6 documentation checks (46 total); recorded that the current suite awaits hosted verification. Added a test for its links, non-ratified status, implementation hold and core requirement/safeguarding/privacy coverage. Corrected the verification record to use the exact count phrase required by the guard.
- **Preventive measure:** Keep the declaration's authority boundary explicit; derive test counts from source declarations; preserve the exact prior CI run as historical evidence; do not claim the new suite passed until a hosted run for the new commit completes. Use one atomic tree/commit update for the synchronized documentation set to avoid temporary mixed run/count references.
- **Failed hosted run:** [43403172054](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403172054) — failure in the documentation-integrity test step; not counted as a pass. Confirmed assertion mismatch: the verification record omitted the exact derived-count phrase.
- **Preventive follow-up:** The derived count remains source-driven; keep the verification wording synchronized with the guard's exact asserted phrase and retain the failed run as evidence.
- **Verification:** The shared-marker guard revision exposed an over-escaped regular-expression literal and missing marker in the verification record. Runs [43403560768](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403560768) and [43403764236](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403764236) failed in the documentation-integrity test step and are not counted as passes. The regex and verification marker were corrected; the current 46-declaration suite passed on [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544), commit `50566e1902b9fa409515103bc81511f4af638881`. The `policy-and-documentation-tests` job and test step completed successfully. Browser-integrated v0.2.0 verification remains outstanding.
- **Status:** Closed — declaration links/content and shared-CI-marker guards passed hosted CI. Failed runs [43403172054](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403172054), [43403560768](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403560768) and [43403764236](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403764236) remain preserved as evidence and are not counted as passes.


### DOC-009 — Opportunity validation scenario pack and count reconciliation

- **Detected:** 2026-11-13
- **Severity:** Low — synthetic validation artifact and synchronized documentation/test inventory update.
- **Affected branch:** `prototype/internal-demo` only; mainline untouched.
- **Finding:** A 14-case scenario pack is added to stress-test opportunity evidence, fairness, authority, safeguarding, privacy and stage boundaries. The suite increases from 46 to 47 declared tests (40 engine + 7 documentation checks). A read-back audit also found that the prior verification record paired the current 46-test run marker with the earlier commit SHA; the exact successful run-to-commit relationship must be kept aligned.
- **Impact:** Without reconciliation, readers could mistake a historical CI marker or mismatched commit reference for verification of the new source.
- **Correction:** Add a documentation guard for all 14 scenario IDs, synthetic framing, non-ratified status, implementation hold and repository links. Preserve the 46-test run as historical evidence until the 47-test suite passes. Correct the verification record's current run/commit pair and synchronize the new run marker after CI.
- **Preventive measure:** Keep source test counts derived from declarations; verify the exact workflow run head SHA before recording it; keep one shared current marker across summaries; never treat synthetic scenarios as real reports or stakeholder validation.
- **Failed runs:** [43405608125](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43405608125) — 46/47 passed; the root README still said 6 documentation checks. [43405820994](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43405820994) — 46/47 passed; the verification record omitted the exact derived phrase `7 documentation-integrity test declarations (47 total)`. [43405962751](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43405962751) — 46/47 passed; the shared-marker assertion expected the historical 46-test baseline to retain a `Current` label after it had correctly been relabelled `Historical`. All three failures were documentation-integrity assertions; the engine tests and other documentation checks passed. None of these runs is counted as a pass.
- **Correction:** Updated the root README to 7 documentation checks and 47 total; synchronized the prototype README, gate status and verification record; corrected the prior run 43403854544 commit reference to its actual head SHA `50566e1902b9fa409515103bc81511f4af638881`; added the exact derived count phrase required by the CI assertion. Made the shared-baseline-marker guard accept either Current or Historical labels while checking that all summary files cite the same run, without pinning a stale run ID.
- **Preventive measure:** Keep all summary counts derived from test declarations and verify exact run-to-commit identity before recording CI evidence.
- **Verification:** Corrected 47-declaration suite passed hosted CI on [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367), commit `25108a07320a2e70cd86573a4d950024b8211273`. The `policy-and-documentation-tests` job and headless test step completed successfully. The 14 scenario IDs, synthetic framing, non-ratified status, implementation boundary and README/gate links are covered by the new documentation-integrity check. Browser-integrated v0.2.0 verification remains outstanding.
- **Status:** Closed — documentation and test inventory reconciled; 47/47 hosted checks passed. The failed runs [43405608125](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43405608125), [43405820994](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43405820994) and [43405962751](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43405962751) remain preserved as evidence and are not counted as passes.


### DOC-010 — External validation incorrectly treated as a blocking dependency

- **Recorded:** 2026-11-13
- **Severity:** Medium — process risk; prolonged non-response could stall product development despite no new evidence arriving.
- **Affected branch:** `prototype/internal-demo`; no mainline implementation changes.
- **Finding:** The prior controlled-next-move wording described external validation as the next product-validating activity without explicitly distinguishing it from a blocking dependency. Stakeholder outreach has been attempted and responses have not been received. Waiting indefinitely would create schedule risk without increasing evidence.
- **Decision:** External validation is now **NON-BLOCKING** for continued internal development. ScoutSA may proceed with clearly labelled synthetic-data prototyping, interface refinement and authorized non-production work within existing boundaries. External feedback, if received, is evidence input for review, not automatic ratification.
- **Artifact:** Added `prototype/VAAL-STAKEHOLDER-VALIDATION-INTERVIEW-GUIDE.md` as a parked, optional research instrument. It is not evidence that interviews occurred and is not a prerequisite to build.
- **Safety and authority boundary:** This decision does not lift holds on real player/minor data, public child profiles, real consent capture, database execution, RLS, API, authentication, identity processing, disclosure, deployment or pilot activity. A working demonstration does not establish demand, legal compliance, safeguarding effectiveness or production readiness.
- **Preventive measure:** Project status must distinguish (1) internal work authorized now, (2) external evidence sought but not received, and (3) decisions requiring formal ratification or separate release authorization. Do not label an unanswered outreach item as a build blocker unless a specific safety or authority gate actually requires it.
- **Status:** Recorded; documentation and hosted CI reconciliation pending.

### UI-001 — Unified synthetic workspace hub

- **Recorded:** 2026-11-13
- **Scope:** Frontend navigation and documentation-integrity coverage on `prototype/internal-demo`.
- **Change:** Updated `prototype/index.html` with an All workspaces navigation view and an 11-card workspace directory linking to the existing synthetic review screens. Replaced the crowded header link row with a focused workspace entry point. Kept each specialist screen as its existing separate static prototype.
- **Test:** Added a documentation-integrity check confirming the hub exists, navigation state is wired, synthetic-only wording is present, all 11 destinations are linked and each destination file exists. Added `prototype/index.html` to push and pull-request path filters for the policy/documentation workflow.
- **Source inventory:** 40 review-engine tests + 8 documentation-integrity checks = 48 declarations.
- **Verification:** Hosted verification of the 48-declaration suite is pending. The previous 47-declaration run [43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367) is historical and does not cover this change.
- **Boundary:** This is a navigation/discoverability improvement only. No shared authentication, backend, persistence, authorization, role enforcement, live submissions, player contact or production behavior was added. Mainline is unchanged.
- **Verification:** Hosted GitHub Actions [run 43409104888](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409104888), commit `14bcabb84e58fa8f286887d4125cddb6ee6a282e`, completed successfully. The job log records 48 tests, 48 passed, 0 failed.
- **Status:** Closed — navigation hub and 48-declaration hosted test suite verified.


### UI-002 — Return navigation across specialist workspaces

- **Recorded:** 2026-11-13
- **Scope:** Frontend navigation on `prototype/internal-demo`.
- **Change:** Added a consistent return-to-hub navigation strip to all 11 specialist HTML pages. Each strip labels the environment as internal demo / fictional data only.
- **Test:** Extended the existing workspace-hub documentation-integrity check to require the return-navigation label and `./index.html` link on every destination. The test inventory remains 40 engine + 8 documentation checks = 48.
- **Verification:** Hosted GitHub Actions [run 43409488949](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409488949), commit `fc3d121becd267287eb37bc19ba4644ed9f39b0c`, completed successfully; 48 passed, 0 failed.
- **Boundary:** This adds navigation only. It does not merge pages into one runtime or introduce shared state, authentication, authorization, persistence, real submissions or contact functionality. Mainline remains unchanged.
- **Status:** Closed — return-link inventory and 48-declaration hosted test suite verified.


### UI-003 — Read-only synthetic review-state presentation

- **Recorded:** 2026-11-13
- **Scope:** `prototype/internal-demo` request-review presentation only.
- **Change:** Added `prototype/review-state.js` to project the existing evaluator result into six clearly bounded display stages. The page now distinguishes fixture-only record display, authority/evidence review, safeguarding review, separate human-review eligibility, unrecorded final outcome, and prohibited disclosure/contact.
- **Policy boundary:** The review engine, evaluation rules and fixtures were not changed. No transition, decision, approval, decline, invitation, trial, placement, persistence, authorization, disclosure or contact is implemented. `READY_FOR_SEPARATE_HUMAN_REVIEW` is described only as eligibility for a separate human review, not as approval or a completed review.
- **Tests:** Extended assertions inside the existing workspace-integrity test for all-pass, hold, skipped prerequisite, missing gate, no-record and non-invention boundaries. Test declaration inventory remains 40 engine + 8 documentation checks = 48. Added the new module to the prototype workflow's path filters.
- **Verification incident:** The initial run sequence failed because a source assertion contained excess escaping around quotation marks and therefore searched for a string not present in the synthetic fixture. The assertion was corrected to use a single-quoted JavaScript literal around the fixture's double-quoted `playerId` field. Failed attempts are preserved in `prototype/verification/documentation-integrity-ci-2026-11-13.md` (runs 43414624909, 43414650734, 43414698380, 43414704997, 43414712123, 43414719616 and 43414728521).
- **Additional test-fixture correction:** After strengthening the projection to require `allBlockingGatesSatisfied === true`, [run 43415035969](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43415035969) failed because the all-pass test fixture did not set that required flag. The fixture was corrected in commit `038b913111b8b17d6a0de36bb07ca16934379884`.
- **Final code verification:** Hosted GitHub Actions [run 43415050256](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43415050256), commit `038b913111b8b17d6a0de36bb07ca16934379884`, completed successfully; **48 passed, 0 failed**. A further negative-case assertion requiring an explicit `allBlockingGatesSatisfied` flag passed on [run 43415259079](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43415259079), commit `ad6fb2f488b62b433ef95a5373fa79118a6e5a52` (**48 passed, 0 failed**).
- **Remaining limit at initial UI-003 close:** Browser-integrated visual and click-through verification was outstanding. UI-004 below closes the scoped browser-smoke checkpoint; this does not constitute a full visual-design, accessibility, security or production-readiness audit.
- **Status:** Implemented and headless CI-verified on the isolated prototype branch. Mainline remains unchanged.

The projection also requires `allBlockingGatesSatisfied === true` plus fully passing authority/evidence and safeguarding groups before it displays eligibility for separate human review; inconsistent readiness fails closed.


### UI-004 — Chromium browser smoke verification for request-review journey

- **Recorded:** 2026-11-13
- **Affected branch:** `prototype/internal-demo` only. Mainline remains untouched.
- **Scope:** Actual Chromium rendering and interaction of `prototype/discovery-request.html` with the checked-in synthetic fixtures and current v0.2.0 review engine.
- **Test artifact:** `prototype/tests/discovery-request.browser-smoke.cjs`, executed through Playwright 1.56.1 in GitHub Actions. The workflow is pinned to `ubuntu-24.04` because the initial `ubuntu-latest` image resolved to Ubuntu 26.04, which Playwright 1.56.1 did not support for dependency installation.
- **Coverage:** Ordinary three-record queue; selecting all three scenarios; six review stages; no invented final decision; disclosure/contact prohibited; guardian-mediated under-18, unknown-age and adult-status-unverified cases; opportunity-only, unknown-player, unmatched-pair and empty-opportunity handoffs; exact player–opportunity and player-only handoffs; all eight connected workspace links return HTTP 200; Passport link click-through; hub return destination; 390px mobile layout with no horizontal overflow; no uncaught browser page or console errors.
- **Test corrections retained:** [Run 43417528428](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417528428) exposed an incorrect test expectation for the UI's explicit skipped-gate label; [run 43417619789](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417619789) exposed an incorrect expected handoff banner for a valid but unmatched player/opportunity pair; [run 43417997207](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417997207) exposed an over-escaped path regex in the new Passport click-through assertion. These are test-harness failures, not product-policy changes, and none is counted as a pass. [Run 43417473594](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417473594) additionally records the unsupported Ubuntu 26.04 / Playwright 1.56.1 runner mismatch.
- **Verification:** [Hosted run 43418015630](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43418015630), commit `70c6c8563325403bfff334bb8f6bdde67a23be41`, completed successfully. Job logs confirm **48 headless tests passed, 0 failed**, and **7/7 browser-smoke groups passed**.
- **Result:** The request-review journey is now browser-smoke verified for the explicitly listed synthetic scenarios and navigation paths. The test does not establish real identity, consent, safeguarding effectiveness, authorization, security, accessibility conformance, legal compliance, production readiness or suitability for real player/minor data.
- **Status:** Closed for this scoped request-review browser-smoke checkpoint. UI-005 below records the subsequent whole-workspace browser checkpoint. Mainline remains unchanged at `9ea9ef69e57ebb057e7a869af6a4f462cdfbb673`.


### UI-005 — Unified hub and all specialist workspaces browser verification

- **Recorded:** 2026-11-13
- **Affected branch:** `prototype/internal-demo` only. Mainline remains unchanged.
- **Scope:** Actual Playwright/Chromium navigation and rendering across the central workspace hub and all 11 specialist screens.
- **Test artifact:** `prototype/tests/workspace-hub.browser-smoke.cjs`, executed by the existing GitHub Actions workflow after the request-review browser smoke test.
- **Coverage:** Hub loads and exposes exactly 11 expected workspace cards; all 11 cards are clicked and route to the intended screen; each specialist page renders a title and primary heading; every specialist page exposes a working return-to-hub link; all 11 destinations resolve; representative Passport tab, guardian scenario and pathway player controls respond; hub view navigation and “Open all workspaces” call-to-action work; mobile menu opens and closes after navigation; hub and all 11 specialist screens fit a 390px viewport without horizontal overflow; no uncaught page or console errors.
- **Defects discovered and corrected:** The hub's 3-column workspace card grid overflowed the 390px viewport because the mobile media query did not collapse `.workspace-grid`; it now stacks to one column. The hub's `data-view` listener attempted to call `.forEach` on the single-element `$` helper instead of the collection `$$` helper; this raised uncaught browser errors and prevented view navigation handlers from binding. The corrected collection selector is now used. The “Open all workspaces” call-to-action was also not wired; it now selects the workspaces view. These are real prototype defects, not test-only adjustments.
- **Failed attempts retained:** [43419267368](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419267368) exposed the initial mobile workspace-grid overflow. [43419439900](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419439900) confirmed the same overflow with diagnostic element details. [43419600972](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419600972) isolated the overflowing “SAFEGUARDING” card label. [43419728005](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419728005) confirmed the layout fix and exposed uncaught `$(...).forEach is not a function` errors from the hub's single-element selector misuse. [43419881053](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419881053), [43419902468](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419902468) and [43419918566](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43419918566) are intermediate runs before the selector fix was fully applied and the complete interaction test was rerun. None is counted as successful final verification.
- **Verification:** Hosted GitHub Actions [run 43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388), commit `7eb60f651363dfc3b569e2be80da187007a75d2d`, completed successfully. Job logs confirm **48 headless tests passed, 0 failed**, **7/7 request-review browser groups passed**, and **8/8 workspace-hub browser groups passed**.
- **Result:** All 11 linked specialist workspaces and their return-to-hub navigation are browser-smoke verified for the stated routes and interactions. This is not a full accessibility audit, security/authorization assessment, safeguarding-effectiveness validation, legal review or production-readiness claim.
- **Status:** Closed for the scoped unified-workspace browser-smoke checkpoint. Mainline remains unchanged at `9ea9ef69e57ebb057e7a869af6a4f462cdfbb673`.

### UI-006 — Specialist workspace interaction verification (2026-11-13)

- **Scope:** Added `prototype/tests/workspace-interactions.browser-smoke.cjs` and wired it into the isolated prototype workflow. The script checks client-side filters/searches, player and scenario selection, exact opportunity handoff, Claim Decisions form validation and page-session-only behavior, and intentionally static/read-only workspace boundaries across all eleven specialist pages.
- **Verification:** Hosted run [43422082698](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422082698), commit `e6fab109253fab2091292ddef29d285251348c4e`, passed 48/48 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation browser groups and 11/11 specialist interaction groups. Job logs report no uncaught browser page or console errors.
- **Important boundary:** The Claim Decisions entry exists only in a page-session array and is lost on reload. Search/filter/selection are client-side presentation behavior. No backend persistence, authorization, RLS, API, consent capture, disclosure or contact is introduced. The Coach & Academy view remains static and does not expose a player roster.
- **Result:** Closed for the scoped browser-interaction smoke checkpoint only. This does not constitute full accessibility, security, legal, safeguarding-effectiveness or production-readiness validation. Mainline remains unchanged at `9ea9ef69e57ebb057e7a869af6a4f462cdfbb673`.


### UI-007 — Cross-workspace fixture reference integrity (2026-11-13)

- **Scope:** Added `prototype/tests/workspace-data-integrity.test.js`; hardened `prototype/handoff-filter.js` against invalid/non-array input; expanded the specialist browser smoke test for invalid handoffs and hostile HTML-looking text in the Claim Decisions form.
- **Defects discovered and corrected:** Coach & Academy referenced missing `MEM-DEMO-005`; a matching fictional and explicitly unverified central membership fixture was added. Coach & Academy for `ORG-DEMO-01` listed `OPP-DEMO-003` owned by `ORG-DEMO-03`; the foreign opportunity was removed and its summary count corrected. `REQ-DEMO-003` had no Passport but referenced `MEM-DEMO-002` belonging to another player; the membership reference was cleared. Handoff filtering now safely returns an empty collection for invalid record input.
- **Verification:** Hosted GitHub Actions [run 43422932825](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422932825), commit `ea3b8919b1240be43391ffbb679b3c1d17a5942e`, passed 50/50 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 11/11 specialist interaction groups.
- **Result:** Closed for the scoped fixture-reference and handoff failure-state checkpoint. All data remains fictional; no backend or real-data capability was added.

### Core-loop hardening — 2026-11-13

- Corrected the Discovery & Request Review rules renderer to escape fixture-derived rule text.
- Removed HTML escaping from two search-only concatenation expressions in Organization Memberships and Opportunity Register; those expressions are used for matching, not HTML output, so escaping them altered search semantics unnecessarily.
- Added two review-engine tests: malformed/missing context collections normalize to empty collections and fail closed; missing request input remains HOLD.
- Both new tests assert no human-review eligibility and no disclosure permission.
- No policy rules or fixture records changed. No new workspace was introduced.
- **Verification:** Hosted run [43427648705](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43427648705), commit `5945b75e05229427e430317b79f0541836cbe275`, passed 52/52 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups.
- **Headless declaration inventory:** 52 (42 engine + 8 documentation-integrity + 2 cross-workspace data-integrity).
- **Priority:** depth before breadth; focus remains the review engine and Discovery & Request Review loop.

### UI-008 — Safe rendering of fixture-derived content (OPEN)

- **Original finding:** Static fixture renderers used `innerHTML` with fixture-derived values and did not have universal escaping. The bundled synthetic-only screens had no demonstrated external-input exploit; this was a preventive finding, not a claim of an observed attack.
- **Mitigation applied:** Ten fixture-driven workspaces now define `h(value)` and wrap identified dynamic HTML-string interpolations with it. Claim Decisions retains its existing `esc(value)` helper and escaped record fields.
- **Regression coverage added:** The specialist browser smoke suite checks that hostile HTML-looking text remains literal when passed through each workspace's escape helper and that null/undefined values become empty strings. The existing Claim Decisions form test continues to exercise actual user-entered text through its renderer.
- **Verification:** Hosted GitHub Actions [run 43426395229](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43426395229), commit `a7a72870ad63b52d722e4260a9c29e8cd7fad647`, passed 50/50 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups; logs report no uncaught browser errors.
- **Verification boundary:** These tests establish the helper contract, not that every dynamic interpolation has been identified or that every HTML context is safe. Attribute/URL policy, malformed fixture resilience and complete renderer review remain outstanding.
- **Status:** OPEN. Do not connect untrusted data to these renderers until a complete audit and tests justify closure.

### UI-007 extension — request/opportunity ownership consistency (2026-11-13)

- **Finding:** The cross-workspace integrity test verified that a request's opportunity reference existed, but did not explicitly assert that the referenced opportunity belonged to the organization named by that request.
- **Change:** Added an assertion that resolves the referenced opportunity and requires `opportunity.organizationId === request.organizationId`. Passport-ID consistency is checked only when `passportRef` is non-null; the distinct opaque `playerRef` is intentionally not equated with the internal Passport ID. The intentionally incomplete third request remains incomplete.
- **Scope:** Synthetic fixture integrity test only. No engine policy, fixture, workflow state, authorization or product behavior changed.
- **Commits:** Test change `0d8e09d710046bf1cd5169910b2735a4ca8d9937`; corrected opaque-reference assertion `ca97424852a72d049bb5e2c969e67d249d181321`; documentation reconciliation follows on the same prototype branch.
- **Verification:** Hosted CI result is pending. Do not report the new assertions as passed until a workflow run for the updated branch commit completes successfully.
- **Boundary:** Mainline remains untouched. This is synthetic data consistency, not proof of real-world organization authority or affiliation.


## 7. Cross-project engineering lessons

The [Engineering Lessons Ledger](engineering-lessons-ledger.md) is the durable record for reusable failure patterns, root causes, preventive controls, detective controls, regression evidence and residual risk. Add an entry for every material incident, near miss or audit finding. Preserve failed attempts and historical evidence; do not mark a correction verified until the exact resulting commit has passed the relevant checks. Transfer control patterns to other projects only after checking that their assumptions and risk context fit.
