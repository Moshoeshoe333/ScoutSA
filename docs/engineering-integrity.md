# Documentation Integrity and Error Prevention

**Status:** Active engineering control  
**Applies to:** Every branch, especially the isolated `prototype/internal-demo` branch  
**Priority:** High — documentation accuracy is part of release quality  
**Last reviewed:** 2026-11-13

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
