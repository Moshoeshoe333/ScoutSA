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


### DOC-005 — Mainline documentation-integrity coverage and flow authority boundary

- **Detected:** 2026-11-18
- **Affected branch/commit:** `main` at `a96cbae2df0ae30fe837264f95975fe72486406a`.
- **Severity:** Medium–High — documentation changes outside the workflow path allowlist could bypass the mainline integrity suite; concrete proposed user flows could be mistaken for approved implementation requirements.
- **Finding:** The workflow watched only a small set of README, gate-status, integrity-policy, test, and workflow paths. The test suite checked a small number of literal status phrases and empty workflow files. The MVP definition already carried an explicit draft/non-authority statement and the canonical gate record preserved unresolved authority holds; however, `docs/06-user-flows.md` did not carry an equally explicit non-ratification and implementation-authority banner. Its share-card, readiness, and outcome descriptions needed stronger disclosure and epistemic limits.
- **Impact:** A change to an unlisted document could escape this workflow. A reader or implementer could also mistake illustrative flow prose for ratified requirements, especially around public share cards, derived readiness, and outcome authority.
- **Correction proposed in this branch:** Expand push and pull-request path filters to all `docs/**` and `.github/workflows/**`; extend tests to cover draft authority, unresolved governance holds, share-card non-authorization, derived readiness, outcome assertion/dispute/supersession, and Constitution invariants; add an explicit non-ratified authority banner and risk boundaries to the user-flow document.
- **Evidence boundary:** The existing successful mainline run #11 at commit `a96cbae2df0ae30fe837264f95975fe72486406a` proves only that the then-configured narrow suite passed. It does not establish repository-wide consistency. This incident remains open until the branch is read back and its hosted workflow succeeds.
- **Preventive measure:** Keep the workflow broad over documentation and workflow files; add focused executable checks for repeated high-risk governance facts; require human review for semantic/legal decisions that cannot be safely reduced to string assertions.
- **Initial hosted verification:** PR check run [44288619368](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44288619368) failed: 6/9 assertions passed. Three new checks exposed mismatches between the test literals and intended flow wording (implementation-authority sentence, plural material-input wording, and the word-form used for supersession). These are test/document alignment defects, not evidence that the underlying unresolved policy has been resolved. The failed run is retained as evidence.
- **Follow-up correction:** Align the user-flow wording with the explicit non-authority statement and material-input provenance requirement; align the test assertion with the word “supersession”. Re-run hosted CI before closing this incident.
- **Status:** Correction prepared on `governance/documentation-integrity-hardening-2026-11-18`; hosted re-verification pending.
