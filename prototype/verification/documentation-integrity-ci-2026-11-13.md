# Documentation Integrity CI Verification — 2026-11-13

**Branch:** `prototype/internal-demo`  
**Scope:** Documentation version/count consistency guard and the prototype policy test workflow.  
**Current state:** Corrective source changes committed; a successful hosted rerun has not yet been confirmed.

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

## Outstanding verification

- [ ] Obtain a successful hosted GitHub Actions run on the corrected test source.
- [ ] Confirm the complete workflow runs both the 40 engine tests and the 3 documentation-integrity tests.
- [ ] Only then mark the automated guard as active.
- [ ] Keep browser-integrated discovery smoke verification separate; this workflow does not execute browser tests.

**Important:** A manual text consistency inspection is not a substitute for executing the test suite. No successful CI result is claimed in this record.
