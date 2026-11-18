# Tournament Organizer Portal — Focused Engineering Audit

**Date:** 18 November 2026  
**Branch:** `prototype/internal-demo`  
**Audit baseline:** `ae354b20121e52f7ce1ee898b5fe89048c1b56a5`  
**Scope:** Organizer Portal submission state, export handoff, Tournament Manager import validation, browser navigation, mobile layout and incident evidence.

## Executive result

A focused source-and-test review found a confirmed submission data-loss defect: the portal exposed start date, end date and competition summary inputs but did not copy those values into the submission record. The import side already mapped optional start/end fields, but the portal could not provide them. The importer also lacked explicit date-format and date-order checks. These defects are corrected in the current audit change and covered by browser regression assertions; hosted verification is pending until the exact resulting commit completes CI. During that run, the Organizer Portal smoke step remained in progress; source review found the test lacked guaranteed browser cleanup on assertion failure. TM-013 records the observation without guessing at the underlying assertion. A cleanup guard is now added so the next run can report the actual outcome.

This audit does not certify organizer identity, event authority, safeguarding, privacy/legal compliance, publication eligibility, security or production readiness. All records remain synthetic and browser-session-only.

## Findings and dispositions

| ID | Finding | Evidence at baseline | Disposition |
|---|---|---|---|
| OPA-001 | Start/end dates and competition summary were silently discarded on submission. | `submissionForm` handler stored name, edition, locality and format only; it ignored `#startDate`, `#endDate` and `#submissionNote`. | Corrected: persist all three values in the synthetic submission and preserve them through export/import. |
| OPA-002 | Reversed or malformed competition dates were not rejected at the submission boundary or handoff boundary. | Portal had no start/end ordering check; importer accepted arbitrary optional date strings and did not compare them. | Corrected: reject end-before-start in portal; validate ISO calendar dates and ordering in importer. |
| OPA-003 | Existing organizer browser coverage did not test invalid-date no-mutation behavior, duplicate evidence reference rejection, exported payload completeness, or every mobile navigation section. | Existing browser test covered a single successful submission/evidence/feature/export path and checked mobile width only while Ledger was active. | Regression coverage added for those cases. |
| OPA-004 | Import tests covered malformed JSON, null organizer, missing feature link, edition collision and oversized file, but not date payload corruption. | `tournament-manager.browser-smoke.cjs` existing rejection cases. | Added invalid date order and impossible calendar date cases; asserted rejected imports do not mutate the tournament edition count. |
| OPA-005 | Feature permission is a single mutable per-submission demo state; there is no attributed decision, version history, revocation evidence or publication authorization. | Portal updates the existing feature request in place and hard-codes publication display to `not-published`. | Accepted prototype limitation, not a bug to solve in this pass. Keep publication disabled and do not represent this as a production permission workflow. |
| OPA-006 | Importer accepts several status/type strings as arbitrary text and does not provide an authoritative identity or authority review. | Source review of `importOrganizerPackage`; status fields are not enum-validated and source references are synthetic. | Residual prototype limitation. Before any real integration, define a ratified enum contract, reviewer/decision provenance and server-side authorization. |
| OPA-007 | Handoff import is validated before insertion and edition-idempotent for the tested collision cases, but no persistence or cross-session transaction exists. | Importer constructs and validates collections before adding incoming submissions; browser test verifies duplicate import and selected failure no-mutation cases. | Keep session-only boundary; expand adversarial import matrix before considering a durable integration. |
| OPA-008 | Organizer Registry section overflowed at mobile width while the Ledger section did not. | Run 44298986431 found 696px document width at 390px when Registry was active; the original test measured only Ledger. | Corrected responsive grid/panel/table sizing and expanded section-by-section viewport diagnostics; hosted verification pending. |

## Regression coverage added

- Reversed dates do not create an organizer or submission and leave entered values available for correction.
- Valid dates and the summary survive Organizer Portal export.
- Duplicate evidence references do not increase the evidence count.
- All five Organizer Portal sections are checked for horizontal overflow at 390px, with navigation state asserted.
- Tournament Manager handoff import preserves start date, end date and summary in exported session state.
- Invalid date ordering and impossible calendar dates are rejected without increasing the tournament edition count.

## Existing incident review — Tournament Manager series

The 18 November hosted workflow [run 44297019349](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44297019349) passed against `2e60ff658e5288a978698179cedc52d377100e53`, including the Tournament Manager and Tournament Day Operations browser suites. That is valid evidence for the tests that existed in that commit. It does not verify the new OPA regression cases; those require a new exact-head workflow run.

TM-001–TM-011 are retained as permanent history. TM-011 has exact successful evidence for its correction. Earlier TM entries are being reconciled separately against the current test assertions and run history; no blanket closure is inferred from a later green run.

## Additional responsive finding

Run [44298986431](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44298986431) exposed a 696px document width at 390px when Organizer Registry was active. This was not detected by the earlier Ledger-only width check. TM-014 and LESSON-012 record the gap. The CSS now uses zero-minimum grid tracks and shrinkable panels/table wrappers; the new test reports overflowing element geometry if the fix is incomplete. Exact-head verification remains pending.

## Remaining stop lines

1. Do not use real organizer identities, documents, contact details or player/minor data in this prototype.
2. Do not publish a competition or imply that a granted-demo state is real permission.
3. Do not treat source IDs or evidence references as proof of authenticity or authority.
4. Do not integrate this handoff into a backend until schema, authorization, auditability, privacy/security and governance decisions are ratified.
5. Do not call the audit fixes verified until hosted CI passes against the exact commit containing them.

## Files reviewed

- `prototype/tournament-organizer-portal.html`
- `prototype/TOURNAMENT-ORGANIZER-PORTAL-MODEL.md`
- `prototype/tests/tournament-organizer-portal.browser-smoke.cjs` (now guarantees Chromium cleanup in `finally`)
- `prototype/tournament-manager.html`
- `prototype/tests/tournament-manager.browser-smoke.cjs`
- `prototype/tests/tournament-day-operations.browser-smoke.cjs`
- `prototype/tests/tournament-stat-reconciliation.browser-smoke.cjs`
- `.github/workflows/prototype-policy-tests.yml`
- `docs/engineering-integrity.md`
- `docs/engineering-lessons-ledger.md`
