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

A separate manual consistency inspection confirmed the current branch values: engine `0.2.0`, 40 engine-test declarations, contract version match, README/gate version match, all three documented 40-test counts, and the root README integrity-policy link.

## Verification result

- [x] Successful hosted GitHub Actions run on corrected test source: [run 43396563700](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396563700).
- [x] Successful hosted GitHub Actions rerun after incident-log update: [run 43396595986](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396595986).
- [x] Successful policy/documentation run after README and gate-status reconciliation: [run 43396763965](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396763965).
- [x] Successful run after the incident-log and workflow-placeholder correction: [run 43396965878](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43396965878).
- [x] Successful run on the reconciled README and gate-status commit: [run 43397100761](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43397100761).
- [x] The workflow command is `node --test prototype/tests/*.test.js`, which includes the 40 engine-test declarations and 3 documentation-integrity test declarations (43 total).
- [x] The three documentation-integrity checks and the existing engine tests completed successfully in the hosted run.
- [ ] Browser-integrated discovery smoke verification remains separate and outstanding; this workflow does not execute browser tests.

**Conclusion:** The automated documentation-integrity guard is active on `prototype/internal-demo`. It checks engine version and current engine-test count against the contract, prototype README, gate status and engine verification record, and checks the root README link to this policy. It is a targeted consistency guard, not a universal proof that every sentence in every document is correct.
