# Invitation and safeguarding chain regression — 2026-11-13

## Scope

Three new tests were added to `prototype/tests/review-engine.test.js`:

1. A synthetic `secondReviewStatus: "COMPLETE"` does not produce approval, selection, an issued invitation or disclosure. The maximum positive disposition remains `READY_FOR_SEPARATE_HUMAN_REVIEW`.
2. An invitation case whose `workflowState` is `HOLD` fails the safeguarding gate even when second-review status is `COMPLETE`.
3. A guardian decision changed to `REVOKED` between evaluations causes the next evaluation to fail guardian authority and purpose-bound consent, return `HOLD`, and retain `disclosurePermitted: false`.

## Known limitation — not resolved by these tests

The evaluator currently treats `secondReviewStatus === "COMPLETE"` as a synthetic input flag. It does not authenticate reviewer identities, establish that the second reviewer is independent from the first reviewer, or verify second-review authority. A completed status is therefore not proof of independent review. This remains a design gap to resolve before any real-world use or policy ratification. The new tests deliberately do not claim otherwise.

## Verification state

- Engine test declarations: 49.
- Documentation-integrity declarations: 8.
- Workspace-data-integrity declarations: 2.
- Total source declarations: 59.
- Hosted result: 59/59 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups passed.
- Hosted CI: PASS on [run 43431181124](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43431181124), commit `f7d6383111c92f72e2b33213b0b05619deb94ebd`.
- Mainline: untouched.
- UI-008: OPEN.
- Real player/minor data, real consent, disclosure/contact, database/RLS/API/authentication, deployment and pilot: not authorized.

These tests exercise a deterministic synthetic evaluator only. They do not validate real safeguarding, identity, consent, legal compliance, access control, security or production readiness.


The first hosted attempt exposed two test-harness defects rather than evaluator failures: the cross-workspace ownership assertion was attached to invitation fixtures that do not carry an organization ID, and the hostile-rendering browser test mutated rules/limits after their one-time renderer had already run. Both test defects were corrected. The final hosted run above passed the full headless and browser suites.
