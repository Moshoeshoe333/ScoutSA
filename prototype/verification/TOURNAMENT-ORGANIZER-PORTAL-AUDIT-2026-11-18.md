# Tournament Organizer Portal — Focused Engineering Audit

**Date:** 18 November 2026  
**Branch:** `prototype/internal-demo`  
**Audit baseline:** `ae354b20121e52f7ce1ee898b5fe89048c1b56a5`  
**Scope:** Organizer Portal submission state, export handoff, Tournament Manager import validation, browser navigation, mobile layout and incident evidence.

## Executive result

A focused source-and-test review found a confirmed submission data-loss defect: the portal exposed start date, end date and competition summary inputs but did not copy those values into the submission record. The import side already mapped optional start/end fields, but the portal could not provide them. The importer also lacked explicit date-format and date-order checks. These defects are corrected and verified by hosted workflow [run #679](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44299389829), exact commit `06204ac049ce21df6f22575d38202203c9ccec14`. That run passed 121/121 headless tests and all ten browser smoke scripts. The run also verified the section-by-section 390px responsive correction. During the preceding attempt, the Organizer Portal smoke step remained in progress; source review found the test lacked guaranteed browser cleanup on assertion failure. TM-013 records the observation without guessing at the underlying assertion. The cleanup guard is now present and the next exact-head run completed successfully.

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
| OPA-008 | Organizer Registry section overflowed at mobile width while the Ledger section did not. | Run 44298986431 found 696px document width at 390px when Registry was active; the original test measured only Ledger. | Corrected responsive grid/panel/table sizing; run #679 passed all five sections at 390px. |
| OPA-009 | Organizer handoff importer validated organizer/evidence/feature collections but silently dropped most of those records and the competition format when constructing Tournament Manager state. | Importer created event rows from selected submission fields; evidence and feature collections were not retained as destination collections, and organizer type/source records were not preserved. | Added explicit source-claim collections for organizer, evidence and feature records; preserved format and edition label; added exact round-trip assertions. |
| OPA-010 | Imported identity, authority and feature-permission claims flowed directly into operational event fields. | A package could supply values such as `verified`, `approved` or `granted`; the importer copied them into event state without an attributable review decision. | Imported operational states now fail closed to `unverified` / `not-requested`; original values remain traceable only as source claims. This does not validate the claims. |
| OPA-011 | Rejected-import regression checks compared only the tournament count, so mutation of an existing record or claim collection could escape detection. | Existing helper asserted `#countT` unchanged but did not compare the full exported session state. | Rejected-import tests now snapshot and deep-compare the complete exported state before and after rejection; added incomplete-organizer and duplicate organizer/evidence-reference cases. |

## Regression coverage added

- Reversed dates do not create an organizer or submission and leave entered values available for correction.
- Valid dates and the summary survive Organizer Portal export.
- Duplicate evidence references do not increase the evidence count.
- All five Organizer Portal sections are checked for horizontal overflow at 390px, with navigation state asserted.
- Tournament Manager handoff import preserves start date, end date and summary in exported session state.
- Invalid date ordering and impossible calendar dates are rejected without increasing the tournament edition count.
- Organizer, evidence and feature source records plus competition format/edition labels survive the import/export handoff.
- Imported identity/authority/feature-permission claims remain traceable but cannot elevate operational states beyond unverified/not-requested.
- Rejected imports preserve the complete exported session state, not merely the tournament count; incomplete organizer records and duplicate organizer/evidence references are rejected.

## Hosted verification and incident reconciliation

Hosted workflow [run #679](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44299389829) completed successfully against exact commit `06204ac049ce21df6f22575d38202203c9ccec14` on `prototype/internal-demo`.

- Headless tests: **121 passed, 0 failed, 0 skipped**.
- Browser smoke scripts: **10/10 passed** — Discovery & Request Review, workspace hub/navigation, player journey preview, Vaal ecosystem coverage, tournament relationship hub, Tournament Manager, Tournament Day Operations, Statistic Reconciliation, Organizer Portal, and specialist workspace interactions.
- The Organizer Portal test passed its date/summary persistence and export checks, duplicate-evidence no-mutation check, and all five sections at 390px.
- The Tournament Manager test passed date/summary import round-trip and malformed/reversed/impossible-date rejection without mutating the edition count.

### TM incident verification matrix

| Incidents | Current test evidence | Result in run #679 |
|---|---|---|
| TM-001–TM-005 | `tournament-manager.browser-smoke.cjs` — Records navigation, same-team uniqueness, stable selector, unit-specific statistic validation and clean browser console | Passed |
| TM-006–TM-009 | `tournament-day-operations.browser-smoke.cjs` — derived summary provenance, mobile overflow, visible-section setup and same-team substitution guard | Passed |
| TM-010–TM-011 | Linked Player Tournament History 390px viewport check with element-level diagnostics | Passed |
| TM-012 | Organizer submission date/summary persistence, invalid date rejection, export/import round-trip | Passed |
| TM-013 | Browser cleanup in `finally`; successful test teardown | Passed on success path; forced failure-path injection not run |
| TM-014 | Organizer Portal navigation and responsive check across all five sections at 390px | Passed |

All TM incidents remain in the permanent ledger. TM-001–TM-012 and TM-014 are resolved for the exact synthetic regression scope described by their tests; TM-013 is mitigated, with failure-path fault injection still outstanding. These results do not close production architecture, safeguarding, legal, privacy, security or domain-model gates.

## Additional responsive finding

Run [44298986431](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44298986431) exposed a 696px document width at 390px when Organizer Registry was active. This was not detected by the earlier Ledger-only width check. TM-014 and LESSON-012 record the gap. The CSS now uses zero-minimum grid tracks and shrinkable panels/table wrappers; the new test reports overflowing element geometry if the fix is incomplete. Exact-head verification completed successfully in run [44299389829](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44299389829).

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

## Follow-up exact-head verification — run #680

The audit corrections and incident reconciliation were subsequently included in exact prototype branch head `17f69f4da691bb68a3818f5071f23b49f8963657`. Hosted workflow [run #680](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44299838840) completed successfully. Job `policy-and-documentation-tests` (`134786400772`) ran under Node.js 22.23.4 and reports **121/121 headless tests passed, 0 failed**. All ten configured Playwright/Chromium browser smoke steps completed successfully, including the Organizer Portal and Tournament Manager suites. This is a fresh full-workflow verification checkpoint for the exact head stated above.

Run #680 also supports reconciliation of TM-001–TM-012 and TM-014 for their documented synthetic regression scope. TM-013 remains **mitigated, not fully verified**: successful browser teardown passed, but deliberate assertion-failure injection is still outstanding. No result here establishes real organizer identity, event authority, data authenticity, legal/privacy compliance, safeguarding effectiveness, accessibility conformance, production security or production readiness.

## Adversarial handoff findings — follow-up review

A second pass traced every exported collection through the Tournament Manager importer. It found that the importer validated organizer, evidence and feature collections but did not retain those source records in the destination session; it also omitted the competition format and edition label from the event record. The importer copied source identity, authority and feature-permission strings into event fields without independent review. Finally, rejection tests checked only the event count, not the full session state.

The prototype correction now preserves the organizer/evidence/feature records in explicitly named source-claim collections, preserves format and edition label, and keeps imported identity/authority/feature claims separate from operational states. Imported operational identity/authority remain `unverified`; feature permission remains `not-requested`. The raw incoming claims are retained for traceability only and must not be treated as evidence of authority, permission or expiry status. The rejection helper now compares the full exported session state before and after each rejected import.

Domain-level adversarial cases remain deliberately unresolved where a ratified rule is absent: semantic duplicate-competition matching across different IDs; organizer identity conflict resolution; evidence expiry policy and trusted clock/source; permission revocation/supersession history; allowed status enums and decision authority. The prototype must not invent those rules. Until ratified, these are explicit hold points rather than silently accepted production behavior.

## Adversarial scenario coverage and unresolved decisions

| Scenario | Current synthetic control / observation | Disposition |
|---|---|---|
| Conflicting organizer IDs | Duplicate IDs within a package and conflicting source content for an existing claim ID are rejected. Same display name under different IDs is not automatically merged. | ID-level checks tested; identity resolution across distinct IDs requires ratification. |
| Duplicate competitions | Duplicate tournament/edition IDs and conflicting existing edition links are rejected. Same title/season under different IDs is not reliably recognized as the same real-world competition. | Structural collision checks tested; semantic deduplication blocked pending identity rules. |
| Revoked feature permission | Incoming permission status is preserved only as a source claim; operational feature state remains not-requested. | Fail-closed in the synthetic importer; no durable revocation/supersession history exists. |
| Expired evidence | Evidence status such as expired is preserved as an untrusted source claim. | No authoritative expiry date, trusted clock, reviewer or revalidation policy exists; no evidence is treated as verified. |
| Malformed/incomplete imports | Malformed JSON, null records, missing links, ID collisions, oversized payloads, incomplete organizer type, duplicate organizer/evidence references and invalid dates are rejected. | Full exported state is compared before/after each rejected import. |
| Conflicting dates | Reversed ranges and impossible calendar dates are rejected at import; organizer submission also rejects reversed dates. | Verified for tested date-only synthetic inputs; no scheduling/venue truth is implied. |
| Misleading authority claims | Forged verified, approved and granted values remain traceable as source claims while operational states remain unverified/not-requested. | Fail-closed synthetic behavior tested; claims are not independently authenticated. |

**Exact-head hosted verification:** run [#694](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44325785196) passed against da769932354309f8327d50d720395d203eab5a6f: 121/121 headless tests and all ten configured browser smoke steps. The two failed intermediate runs [44324794870](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44324794870), [44325181876](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44325181876) and [44325536793](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44325536793) are retained as test-harness findings and are not counted as passes.
