# ScoutSA Session Ledger — 19 November 2026

**Repository:** `Moshoeshoe333/ScoutSA`  
**Branch:** `prototype/internal-demo`  
**Required audit baseline:** `a7122b1767676a4af064c7b774f60a8affc05656`  
**Observed remote branch tip:** `4ecafa1d6e991832de8a59f0eedc0ff0af3a7d99`  
**Scope:** Controlled adversarial verification preflight, stop decision and recovery controls.  
**Authority:** Read-only audit execution was authorized; this ledger records the stop and procedural mitigation only.

## 1. Decision

**STOP — mandatory preflight failed.** No AUD-010, AUD-006, AUD-009, AUD-008 or AUD-007 runtime tests were executed.

The required immutable baseline exists on GitHub, but the mutable branch reference `prototype/internal-demo` no longer resolves to it. The branch is two commits ahead of the required baseline. The audit must not silently substitute the branch tip.

This is an execution-control failure, not a confirmed application defect or security vulnerability.

## 2. Evidence recorded

### 2.1 Remote revision comparison

A fresh GitHub comparison returned:

- Base: `a7122b1767676a4af064c7b774f60a8affc05656`
- Head: `prototype/internal-demo`
- Status: `ahead`
- Ahead by: `2`
- Behind by: `0`
- Required baseline commit exists.
- Current branch tip: `4ecafa1d6e991832de8a59f0eedc0ff0af3a7d99`.

The comparison identifies these changed paths between the required baseline and current branch:

| Path | Change |
|---|---:|
| `prototype/README.md` | 3 additions, 3 deletions |
| `prototype/player-passport.html` | 65 additions, 2 deletions |
| `prototype/tests/workspace-interactions.browser-smoke.cjs` | 78 additions |
| `prototype/verification/UI-008-RENDER-SINK-INVENTORY-2026-11-19.md` | 16 additions, 7 deletions |

Therefore, the branch delta includes application and browser-test changes, not only documentation. Those changes are outside the originally authorized baseline and were not tested in this audit phase.

### 2.2 Local execution environment

The supplied preflight report records:

- Working directory: `/`
- No Git repository or ScoutSA checkout available.
- Local branch, HEAD, clean-tree state, project dependencies, source blob hashes and final integrity state: not verifiable.
- Node.js: `v22.16.0`.
- npm: `10.9.2`.

The GitHub comparison establishes remote refs only. It does not establish a local checkout or runtime execution.

### 2.3 Test disposition

| Test group | Result |
|---|---|
| AUD-010 — review-state projection | BLOCKED |
| AUD-006 — importer/export boundary | BLOCKED |
| AUD-009 — evidence lifecycle | BLOCKED |
| AUD-008 — competition identity | BLOCKED |
| AUD-007 — claim revision/withdrawal | BLOCKED |
| Existing project/browser regression suites | BLOCKED |

**Runtime tests executed:** 0  
**PASS:** 0  
**FAIL:** 0  
**BLOCKED:** all requested runtime groups.

No runtime behaviour or technical finding may be inferred from this stop report.

## 3. Classification and impact

- The branch/baseline mismatch is a verification-scope control event.
- It is not evidence that the newer branch is defective.
- It is not evidence that the required baseline is defective.
- No new technical conclusion is added to AUD-006 through AUD-010.
- No existing technical finding is closed, downgraded or upgraded.
- No application code, tests, policy, gate, ratification or mainline file was changed by the stopped verification exercise.
- Local repository integrity remains unverifiable because no checkout was available.

## 4. Procedural mitigation — immutable baseline checkout

The next executor must use an isolated detached worktree at the exact authorized commit. Do not move, reset, switch or rewrite the existing branch.

From an existing local ScoutSA clone, after confirming the repository and remote:

```bash
git fetch origin a7122b1767676a4af064c7b774f60a8affc05656

git worktree add --detach ../ScoutSA-audit-a7122b1 \
  a7122b1767676a4af064c7b774f60a8affc05656

cd ../ScoutSA-audit-a7122b1

git rev-parse HEAD
git status --porcelain=v1
git branch --show-current
```

Mandatory acceptance checks before any test:

1. `git rev-parse HEAD` returns exactly `a7122b1767676a4af064c7b774f60a8affc05656`.
2. `git status --porcelain=v1` is empty.
3. The detached worktree is visibly separate from the existing branch checkout.
4. No dependency installation, configuration change or repository edit is needed to satisfy preflight.
5. If any condition fails, stop again and record the exact discrepancy.

A detached worktree may report a detached HEAD; that is expected. Do not create or switch a branch to make the branch-name check pass. The immutable commit SHA is the controlling identity; the original branch name is contextual metadata only.

After preflight succeeds, inspect the baseline's own scripts and dependencies, then execute the previously authorized sequence in this order: AUD-010, AUD-006, AUD-009, AUD-008, AUD-007. Use actual repository modules and synthetic fixtures. Preserve exact commands, source blob hashes, stdout/stderr, exit codes and before/after state. Do not install missing tools without separate approval.

After the baseline audit, any review of the newer branch must be a separate change-impact verification with its own explicit scope and exact revision. Do not mix results from the two revisions.

## 5. Ledger and status boundaries

This session ledger records the preflight incident and recovery procedure.

The prototype README must link this ledger and distinguish:
- hosted regression evidence tied to its exact code-and-test commit;
- the current mutable branch tip;
- the separate baseline-pinned adversarial audit, which remains blocked.

The Engineering Lessons Ledger receives a new process lesson on immutable revision pinning and detached-worktree verification.

The following are deliberately not updated by this event:
- AUD-006, AUD-007, AUD-008, AUD-009 and AUD-010 technical verdicts;
- the canonical mainline gate-status ledger;
- UI-008 status or its technical conclusions;
- any ratification, implementation, release or pilot status.

Reason: the preflight produced no new runtime evidence and did not change product requirements or implementation state.

## 6. Next action

**OPEN — baseline runtime verification.**

Make the exact baseline available in a clean detached worktree, demonstrate the mandatory preflight, then resume the authorized audit. Once that work is complete, consider the newer branch delta separately.

## 7. Evidence references

- Required baseline: [`a7122b1767676a4af064c7b774f60a8affc05656`](https://github.com/Moshoeshoe333/ScoutSA/commit/a7122b1767676a4af064c7b774f60a8affc05656)
- Observed branch tip: [`4ecafa1d6e991832de8a59f0eedc0ff0af3a7d99`](https://github.com/Moshoeshoe333/ScoutSA/commit/4ecafa1d6e991832de8a59f0eedc0ff0af3a7d99)
- Preflight stop report: `ScoutSA_Controlled_Adversarial_Verification_Preflight_Stop_2026-11-19.md` (conversation attachment).
- Existing hosted prototype regression checkpoint: [workflow #44544589481](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44544589481), tied to code-and-test commit `7a0adf7fa70d7c4d7f02e4259199350d9742604a`. This is not execution of the AUD verification sequence and is not evidence for the newer branch tip.

**Governing rule:** Strength of claim must never exceed strength of evidence.


## 8. Later progress checkpoint — hosted prototype regression evidence

**Checkpoint captured:** 19 November 2026  
**Workflow:** [GitHub Actions run #44544589481](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44544589481)  
**Workflow file:** `.github/workflows/prototype-policy-tests.yml`  
**Exact code-and-test commit:** [`7a0adf7fa70d7c4d7f02e4259199350d9742604a`](https://github.com/Moshoeshoe333/ScoutSA/commit/7a0adf7fa70d7c4d7f02e4259199350d9742604a)  
**Run result:** `completed` / `success`  
**Job:** `policy-and-documentation-tests` — `completed` / `success`

The workflow-run record and job logs were re-opened for this ledger update. The run's `head_sha` is exactly `7a0adf7fa70d7c4d7f02e4259199350d9742604a`; the runner checked out that SHA, rather than an unpinned later branch tip.

### 8.1 Observed results

| Execution | Observed result |
|---|---|
| `node --test prototype/tests/*.test.js` | 121 tests; 121 passed; 0 failed; 0 skipped |
| Browser smoke script invocations | 11 scripts invoked by the workflow |
| Discovery request smoke | 8/8 groups passed |
| Workspace hub smoke | 8/8 groups passed |
| Player preview smoke | PASS |
| Vaal ecosystem coverage smoke | PASS |
| Tournament intelligence smoke | PASS |
| Tournament Manager smoke | 1/1 test passed |
| Tournament Day Operations smoke | PASS |
| Tournament stat reconciliation smoke | PASS |
| Tournament organizer portal smoke | 1/1 test passed |
| Tournament organizer cleanup smoke | PASS |
| Workspace interactions smoke | 23/23 groups passed |

The workspace-interactions output includes targeted synthetic checks for hostile render strings, unsafe URL schemes, malformed Passport fixtures, guardian/pathway fixture failures, Opportunity stage attribute injection, and related workspace sinks. These are bounded regression checks for the exact tested prototype paths.

### 8.2 What this evidence establishes

- The configured policy/documentation workflow completed successfully at exact commit `7a0adf7fa70d7c4d7f02e4259199350d9742604a`.
- The 121 declared Node tests passed in that run.
- The 11 listed browser smoke scripts were invoked; their reported assertions passed, including 23/23 workspace-interaction groups.
- This is valid hosted regression evidence for that exact code-and-test commit and the scenarios exercised by that workflow.

### 8.3 What this evidence does not establish

- It is **not** execution of the separately authorized AUD-010 → AUD-006 → AUD-009 → AUD-008 → AUD-007 adversarial verification protocol.
- It does not verify the required baseline `a7122b1767676a4af064c7b774f60a8affc05656`.
- It does not establish that the current branch tip was tested. The workflow record pins its tested SHA to `7a0adf7fa70d7c4d7f02e4259199350d9742604a`.
- It does not prove production readiness, real-world safeguarding, POPIA compliance, legal authority, source authenticity, stakeholder validation or deployment safety.
- Passing regression tests do not close the known importer, projection, lifecycle, semantic-identity or claim-revision questions.

### 8.4 Branch and ledger state at this checkpoint

A fresh comparison of `prototype/internal-demo` against the required audit baseline returned:

- Base: `a7122b1767676a4af064c7b774f60a8affc05656`
- Status: `ahead`
- Ahead by: `6`
- Behind by: `0`

The six-file delta comprises:
- `docs/engineering-lessons-ledger.md`
- `prototype/README.md`
- `prototype/player-passport.html`
- `prototype/tests/workspace-interactions.browser-smoke.cjs`
- `prototype/verification/SESSION-LEDGER-2026-11-19.md`
- `prototype/verification/UI-008-RENDER-SINK-INVENTORY-2026-11-19.md`

The later documentation commits record the preflight stop and its process mitigation; they do not change the immutable audit baseline. The most recent documentation commit verified before this ledger append was `4ac16e7b1fa7224ba09abb5c9cbe50c3aac2766f`.

### 8.5 End-of-session disposition

| Workstream | Status at pause |
|---|---|
| Hosted prototype regression checkpoint at `7a0adf7` | PASS for the exact workflow scope |
| Baseline-pinned adversarial preflight | STOP recorded |
| Detached-worktree recovery procedure | Documented; not yet executed |
| AUD-010 | OPEN / runtime adversarial verification pending |
| AUD-006 | OPEN / runtime adversarial verification pending |
| AUD-009 | OPEN / runtime adversarial verification pending |
| AUD-008 | OPEN / runtime adversarial verification pending |
| AUD-007 | OPEN / runtime adversarial verification pending |
| Mainline gate / ratification | Unchanged; no transition authorized |

**Next session:** Resume by obtaining a clean detached worktree at the exact required baseline, proving SHA and clean status, then continue the previously authorized adversarial test order. Keep the successful hosted regression checkpoint as a separate evidence track.

