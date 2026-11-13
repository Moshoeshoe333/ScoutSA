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


## Follow-on evidence-linked reviewer model — 2026-11-13

The earlier status-only approach described above has been superseded on the isolated prototype branch. The current evaluator now requires:

- Distinct first and second reviewer IDs and distinct authority grant IDs.
- Unique, current reviewer identity fixture records marked verified.
- Unique, current authority grants bound to the exact reviewer and organization, scoped to `INVITATION_SAFEGUARDING_REVIEW`.
- Both reviews marked complete, timestamped in chronological order, and carrying evidence references.
- A cleared conflict check and evidence reference for each reviewer.
- A confirmed independence check and evidence reference for the second reviewer.

The legacy `secondReviewStatus` field is ignored and cannot satisfy the gate. Eight new tests cover status-only bypass, same-person review, authority-scope mismatch, expired identity, missing conflict evidence, missing independence evidence, invalid chronology and duplicate records.

**Limit:** all fields and evidence references are synthetic. No real identity proofing, authority verification, evidence authenticity, conflict adjudication, independent reviewer service, signed attestation, or enforceable authorization exists. The contract remains not ratified; no real data, disclosure, deployment or pilot is authorized.

- Engine test declarations: 57.
- Documentation-integrity declarations: 8.
- Workspace-data-integrity declarations: 2.
- Total source declarations: 67.
- Hosted verification: pending for this model revision.
- Mainline: untouched.
- UI-008: OPEN.
