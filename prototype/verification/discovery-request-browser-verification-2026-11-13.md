# Discovery & Request Review Browser Verification — 2026-11-13

**Branch:** `prototype/internal-demo`  
**Commit tested:** `70c6c8563325403bfff334bb8f6bdde67a23be41`  
**Hosted run:** [43418015630](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43418015630)  
**Browser:** Chromium via Playwright 1.56.1  
**Headless suite:** 48 passed, 0 failed  
**Browser smoke:** 7/7 groups passed

## Purpose and boundary

This verification exercises the current synthetic Discovery & Request Review journey in a real browser engine. It verifies the rendered UI, user selection, URL handoffs, connected navigation destinations and a narrow mobile viewport. All records are fictional. This is not a test of real players, identity, consent, guardian authority, safeguarding effectiveness, access control, authorization, privacy/security controls, legal compliance or production readiness.

## Executed browser checks

| Group | Result | Evidence |
|---|---|---|
| Ordinary queue and all three selectable scenarios | PASS | Three request fixtures rendered; each could be selected and displayed. |
| Six review stages and non-invention boundaries | PASS | Fixture remains not submitted; no decision recorded; disclosure/contact prohibited. |
| Age/safeguarding scenarios | PASS | Guardian-mediated under-18, unknown-age and adult-status-unverified examples remain held/protected. |
| Fail-closed handoff cases | PASS | Opportunity-only, unknown player, unmatched pair and empty opportunity returned no request records or fabricated stages. |
| Valid handoffs | PASS | Exact player/opportunity pair and player-only handoff returned the intended synthetic record(s). |
| Connected navigation | PASS | All eight related workspace destinations and the workspace-hub return destination returned HTTP 200; the Passport link was clicked in-browser. |
| Mobile layout and browser errors | PASS | At 390px width, both grids stack to one column, no horizontal page overflow, and no uncaught page/console errors. |

## Hosted run history

The following failed attempts are retained as evidence and are not counted as successful verification:

- [43417473594](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417473594): Playwright 1.56.1 did not support dependency installation on the Ubuntu 26.04 image selected by `ubuntu-latest`. The workflow now pins `ubuntu-24.04`.
- [43417528428](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417528428): test expectation did not match the actual rendered skipped-gate label.
- [43417619789](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417619789): test expectation for an unmatched but syntactically valid handoff banner was incorrect.
- [43417997207](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43417997207): the Passport click-through path assertion used an over-escaped regular expression.

Corrections were made in the test harness and CI runner configuration; no review-engine policy or synthetic fixture behavior was changed to satisfy the tests.

## Final result

Hosted run [43418015630](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43418015630) completed successfully on commit `70c6c8563325403bfff334bb8f6bdde67a23be41`. Its job log confirms 48/48 headless tests and 7/7 browser-smoke groups passed.

## Remaining limits

- The test uses only the current fictional fixtures and the static client-side prototype.
- A 390px viewport check is not a full responsive-design audit across devices and browsers.
- HTTP 200 link checks plus one Passport click-through do not establish every destination's full user journey.
- No accessibility conformance, security, authorization, RLS, identity assurance, real consent, safeguarding effectiveness, legal compliance or production deployment is tested.
- No mainline gate or implementation hold is lifted.

**Conclusion:** The current request-review prototype is browser-smoke verified within the exact scope above. No broader claim is supported by this run.
