# ScoutSA Session Ledger — 17 November 2026

**Branch:** `prototype/internal-demo`  
**Scope:** Stabilization of documentation integrity, CI coverage, tournament decision dependencies and semantic consistency.  
**Mainline effect:** none; no mainline gate or implementation authorization changed.

## 1. Triggering incident

The 33-tier forensic fault audit identified that the latest TAD-006 documentation changes had not been protected by a current successful workflow. The earlier hosted runs [44091221023](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44091221023) and [44091232808](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44091232808) failed the documentation-integrity test step.

Inspection of the job output established five failed assertions: the prototype README did not link the Affiliation Evidence Model Proposal, Opportunity Evidence Acceptance Matrix, Opportunity Requirement Declaration, Opportunity Validation Scenario Pack and Synthetic Audit-History Proposal. The browser stage was skipped after the Node test step failed.

A second fault was found in `.github/workflows/prototype-policy-tests.yml`: push and pull-request path filters were asymmetric and omitted portions of the prototype/documentation surface. A later Markdown change therefore did not receive the expected workflow.

## 2. Corrective changes committed

| Commit | Change |
|---|---|
| `c4fb0cd252d19cd9ac441e5b8ada95fb3078c037` | Restored the five missing prototype README index links. |
| `ecbf320d32890c6784aa8689bba87164504e9191` | Made push and pull-request path filters symmetric across root README, docs, prototype and workflow files; added same-ref concurrency cancellation. |
| `782c2adfddf93dca0c43a83c30aa629240bfdbce` | Corrected the tournament decision sequence to respect the declared dependency map. |
| `546098fb529b66afbec19586aa66db606e0d15a1` | Added a non-ratified governance proposal for the canonical Evidence/Assertion wording inconsistency. |
| `ebe4f518f6359af0a588074e60439c7af3ed017c` | Indexed the semantics reconciliation proposal in the prototype README. |
| `f6812b79de9d905d7bfa73e031b609278cac4212` | Updated the root README date and linked the new semantic review. |
| `1e2a406761019154b39039f3b76baf0f87fc54b6` | Updated the gate-status note to reflect the current prototype integrity incident and preserve historical CI labels. |
| `5e22d146c3f8d64a0c02334c6f458901db04aece` | Added DOC-007 to the active engineering-integrity incident log. |

## 3. Preventive controls installed

- Push and pull-request triggers now use the same bounded path coverage: `README.md`, `docs/**`, `prototype/**` and `.github/workflows/**`.
- Changes to prototype source, HTML, contracts, tests, documentation and workflow configuration therefore trigger the same complete workflow.
- Same-ref concurrency cancellation prevents older in-flight runs from consuming resources after a newer commit is pushed.
- The five missing documents are now indexed in the prototype README; existing tests remain intact.
- The TAD decision sequence now respects its own dependency table. Investigation may proceed in parallel, but dependent decisions cannot be closed before prerequisites.
- The Evidence/Assertion conflict is recorded in [Domain Evidence Semantics Reconciliation](../DOMAIN-EVIDENCE-SEMANTICS-RECONCILIATION.md). The canonical Domain Model was not edited; governance approval remains required.

## 4. Verification status

**At the time this ledger was written, the corrective changes had been committed but final exact-head hosted verification was still pending.**

Do not report a green state until the latest branch head has:
- all Node policy/documentation tests passing;
- all ten configured Playwright/Chromium browser smoke scripts executed successfully;
- no skipped browser stage;
- workflow run and job evidence tied to the exact head SHA;
- changed files re-fetched and checked against the committed state.

Earlier successful runs remain historical evidence only. Failed runs are retained and must not be counted as passes. A successful workflow would verify only the automated checks it actually executes; it would not establish accessibility, legal compliance, production security, external validation or production readiness.

## 5. Unresolved governance and engineering boundaries

- The canonical Evidence wording is not changed by the proposal. Claim versus Assertion, system-event provenance and evidence relationships require domain governance.
- Organizer identity and authority remain unresolved; the existing crosswalk is a candidate, not ratification.
- TAD-004 and TAD-005 remain open; TAD-006 remains open; TAD-002 remains blocked on its declared prerequisites.
- No schema, migration, RLS, API, authentication, shared persistence, real-data ingestion, public listing or production implementation is authorized.
- UI-008 safe-rendering review remains open.
- Branch integration remains separate; no merge to `main` was attempted.

## 6. Stop line and next move

First obtain and inspect the complete hosted workflow result for the latest branch head. If Node checks fail, fix the actual assertion/source mismatch without weakening the guard. If browser tests fail, inspect the exact failing suite and renderer before changing implementation. Once a green exact-head run is established, reconcile the current README and gate-status snapshots, then continue the remaining semantic and tournament decision reviews in dependency order.

**Governing rule:** A correction is not complete when a commit is created; it is complete when the changed state is read back and the relevant verification evidence is observed.


## 7. End-of-day continuation — 17 November 2026

### Additional work completed

- Created `docs/engineering-lessons-ledger.md` as the durable, cross-project engineering lessons register.
- Recorded nine initial ScoutSA lessons covering documentation/CI drift, stale verification claims, cross-workspace ownership references, unsafe dynamic HTML rendering, browser-only defects, fixture/session/match grain, appearance-minute chronology, provenance versus authority, and overclaiming from passing tests.
- Added links to the lessons ledger from the root README, prototype README and engineering-integrity protocol.
- Extended `prototype/tests/documentation-integrity.test.js` to check that the ledger is linked, contains at least eight entries, uses unique lesson IDs and includes all required lesson fields.
- Read the changed files back from GitHub. A faulty regular-expression escape in the new ledger test was caught during read-back and corrected in commit `6d7372cafa2c7820cbbd36b62601f137629a8862`. The correction is part of the history; it is not hidden or counted as a separate product feature.

### Current revision and hosted verification snapshot

- **Branch:** `prototype/internal-demo`
- **Exact head:** `6d7372cafa2c7820cbbd36b62601f137629a8862`
- **Workflow:** [Run #656](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44103601900)
- **Observed status at closeout:** headless policy/documentation tests passed; Playwright and Chromium installation passed; five browser smoke steps had passed (Discovery & Request Review, unified workspace hub, player journey preview, Vaal ecosystem coverage, tournament relationship hub). Tournament Manager was still running; Tournament Day Operations, statistic reconciliation, organizer portal and specialist workspace smoke tests were pending.
- **Conclusion:** workflow was still in progress when the session closed. This is not a green workflow and must not be reported as one. Recheck the run before relying on its final outcome.

### Boundaries preserved

- No tournament domain rule, schema, migration, RLS, API, authentication or production behavior was changed by this lessons-ledger work.
- TAD-004/005/006 and other previously recorded governance dependencies remain open as documented; no gate was closed by this session.
- No merge to `main` was attempted.
- A committed ledger or passing subset of tests does not establish production readiness, external validation, legal compliance or complete safety.

## 8. Next-session opening checklist — 18 November 2026

1. Fetch workflow run #656 and its job details. Confirm the run head SHA still equals `6d7372cafa2c7820cbbd36b62601f137629a8862`; record the final conclusion and every failed, skipped or pending step.
2. If any step failed, inspect its exact logs and reproduce the issue before changing code. Add a lesson or update an existing lesson with evidence, cause, controls and residual risk.
3. If all configured steps passed, record the exact scope and limitations; do not translate a green CI run into a blanket quality or production-readiness claim.
4. Reconcile README, gate-status and verification snapshots only where the observed evidence justifies a change.
5. Resume the next ScoutSA work item without crossing unresolved TAD decision gates. Keep documentation, synthetic prototype behavior and production implementation explicitly distinct.
6. Apply the lessons-ledger pattern to another project only after inspecting that project's own current repository state and adapting controls to its architecture.

**Closeout rule:** stop with a truthful snapshot, a traceable commit and a concrete restart point. Do not leave tomorrow's work dependent on memory alone.
