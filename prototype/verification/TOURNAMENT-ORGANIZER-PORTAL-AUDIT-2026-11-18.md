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

## Final documentation reconciliation checkpoint — run #698

Hosted run [#698](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44326398873) passed on exact prototype head `bcdd4ff4745910e6ff4eea4437edf39b9e075672`, after the audit, engineering-integrity ledger, lessons ledger and README were reconciled. It passed **121/121 headless tests** and all ten configured browser smoke steps under Node.js 22.23.5. This supersedes run #694 as the latest full-workflow checkpoint; run #694 remains the exact code-regression checkpoint for OPA-009–OPA-011 and TM-015. Residual domain and production holds remain unchanged. A subsequent exact-head check, [run #701](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44326714770), passed after this audit/README/integrity reconciliation on commit `e25101038faa39cc4ffb743bc8c2dcc77ea3859f` (121/121 headless tests and all ten browser smoke steps).
## Follow-up adversarial finding — OPA-012: altered duplicate submission content

A further importer review found that an edition ID already present in the Tournament Manager could be treated as a duplicate based only on its structural links. If the same edition/submission IDs were reused with changed source content (for example, a different summary), the import could be skipped without preserving or explicitly rejecting the changed submission. The original submission record also had no dedicated source-claim collection, unlike the organizer, evidence and feature-permission collections.

**Correction prepared on `prototype/internal-demo`:**
- Added `organizerSubmissionClaims` to retain complete imported submission records as source claims.
- Added submission-ID collision detection when a submission ID is reused for a different edition.
- Before treating an existing edition as an idempotent duplicate, compare the incoming source-derived event fields with the existing imported event. Changed content is rejected instead of silently skipped or overwriting the existing record.
- Existing operational decision fields (including authority and feature state) are deliberately excluded from the source comparison and are not assigned during the duplicate path; the importer does not promote incoming claims into human decisions.

**New browser scenarios:** exact duplicate remains idempotent; altered summary under the same IDs is rejected; a reused submission ID with a different edition is rejected; an existing seeded edition without a matching source submission is rejected with full-state no-mutation; a duplicate import preserves an existing synthetic human-decision sentinel and withdrawn permission state; the existing complete-state rejection helper checks no mutation; complete submission source records are asserted after export. The decision-preservation seam is available only on the synthetic `?testMode=1` page.

**Status:** Correction, decision-preservation seam and regression tests committed. The correction sequence includes `536cb58a03711803f764345043b933e086884e10`, `3bd3d5bd20aa8f53f1e6e69c144efc8431ea1fd0`, `14b9477b8db79c3085ca2edeb601756bbaeecbda`, `93bd82fb1a97e0924776af5f8d2fdbc4d4cb0aec`, `c8f9c9b2b73756bc2ed6a05b6d88d8e280dd486b` and `7fe3506fe333f029ab5c4843074bd500184f7512`, followed by this audit reconciliation. Exact-head hosted verification is pending. Do not mark OPA-012 verified until the full workflow passes against the final commit. The test scope remains synthetic and browser-session-only.

**Residual domain questions remain open:** different IDs can still describe the same real-world competition; organizer identity conflicts across distinct IDs; competition/edition identity rules; evidence expiry/revalidation; permission withdrawal/supersession; and authoritative human decision provenance. These require ratified rules and are not solved by structural ID checks.
 
## 2026-11-19 — Mind / Body / Spirit (Soul) Tri-Tier 33 assessment

**Assessment ID:** SCOUTSA-TT33-2026-11-19-01  
**Framework:** Codex-Guidas CG-TT33 v0.3.0-draft; tier names/questions taken from the original user-supplied *Refined Tri-Tier 33 Framework* (Library file `Pasted text(5).txt`).  
**Scope:** Synthetic Tournament Organiser Portal → Tournament Manager handoff only; branch `prototype/internal-demo`; latest known branch commit at assessment start `07c993648eeb386ca7c7213fd2487b64d81c2eea`.  
**Review mode:** Read-only source inspection and test-source review. No new test was executed and no application code was changed during this assessment.  
**Evidence ceiling:** L2 static source inspection for source-backed observations; L0 for uninspected/unwitnessed areas. Run #704 (121/121 headless tests and ten browser smoke steps) is a previous baseline at `0c41fd84b37e13841a4ea65cc12b9c38ae65731f`, not evidence for the current OPA-012 correction head. No exact-head CI result was obtained.

**Verdict discipline:** SOLID / SOFT / OPEN / GHOST are claim-bounded. N/A is a scoped disposition with a reason. Not assessed is not a pass. No aggregate score is calculated. This is not a security, safeguarding, privacy, legal, production-readiness or release certification.

**Framework version warning:** The original user-supplied Harmony draft uses terms such as “Atomic Communion”, “Truth Under Restart”, “No Beyond-Authority” and “Ledger Is Common Ground”, with different tier mappings/scoring. Codex-Guidas v0.3 revises these to “Atomic Logical Action”, “Truth Through Interruption”, “Authority Does Not Escalate” and “Traceable Disagreement”, and updates mappings/probe scoring. This review uses the v0.3 Harmony semantics but does not claim the mapping transition was ratified. Do not combine scores or silently substitute mappings. The source tier catalogue is recoverable from the user-supplied Library file but is not yet versioned as separate `codebase-33.md`, `database-33.md` and `ui-33.md` files in Codex-Guidas.

**Disposition totals across 99 lenses:** 47 SOFT (L2), 25 OPEN (L0), 27 N/A for this bounded synthetic prototype, 0 SOLID, 0 GHOST. N/A does not carry into the production ScoutSA profile: safeguarding, consent, localization, accessibility, retention and offline requirements must be reassessed there.


### Mind — Codebase (C-01…C-33)

| Tier | Diagnostic lens | Disposition / verdict | Source-level assessment |
|---|---|---|---|
| C-01 | Entry points enumerated | SOFT · L2 | Both prototype pages and browser test entry are identifiable; no complete entry-point inventory. |
| C-02 | Module map and import graph | SOFT · L2 | The manager is a standalone HTML page with inline script; no formal module/import graph. |
| C-03 | Dead code eliminated | OPEN · L0 | No complete dead-code or unused-asset analysis. |
| C-04 | Duplicate logic removed | OPEN · L0 | No repository-wide duplicate-logic analysis. |
| C-05 | Determinism | SOFT · L2 | Import validation/merge is synchronous and mostly deterministic; no repeat-output test. |
| C-06 | Versioning | SOFT · L2 | Handoff contractVersion 1.0 is checked; no record-level producer/policy version or migration contract. |
| C-07 | Type integrity | SOFT · L2 | Runtime shape checks exist for imported JSON; no formal schema/type system and existing session state is not fully guarded. |
| C-08 | Constants registry | SOFT · L2 | Limits, ID patterns and contract strings are embedded literals, not one governed registry. |
| C-09 | Error paths | SOFT · L2 | Import errors are caught, but the catch also covers post-mutation refresh; see OPA-014. |
| C-10 | Naming coherence | SOFT · L2 | Claim and operational fields are distinguished, but status vocabulary is free-form and not centrally governed. |
| C-11 | Provenance | SOFT · L2 | Source records are retained; no package ID, export time, sender/source-instance identity or payload digest. |
| C-12 | P1 conformance (SoulSync-specific profile) | N/A | Codex-Guidas v0.3 identifies P1–P7 as SoulSync-specific; no ScoutSA profile maps these controls. |
| C-13 | P2 conformance (SoulSync-specific profile) | N/A | Codex-Guidas v0.3 identifies P1–P7 as SoulSync-specific; no ScoutSA profile maps these controls. |
| C-14 | P3 conformance (SoulSync-specific profile) | N/A | Codex-Guidas v0.3 identifies P1–P7 as SoulSync-specific; no ScoutSA profile maps these controls. |
| C-15 | P4 conformance (SoulSync-specific profile) | N/A | Codex-Guidas v0.3 identifies P1–P7 as SoulSync-specific; no ScoutSA profile maps these controls. |
| C-16 | P5 conformance (SoulSync-specific profile) | N/A | Codex-Guidas v0.3 identifies P1–P7 as SoulSync-specific; no ScoutSA profile maps these controls. |
| C-17 | P6 conformance (SoulSync-specific profile) | N/A | Codex-Guidas v0.3 identifies P1–P7 as SoulSync-specific; no ScoutSA profile maps these controls. |
| C-18 | P7 conformance (SoulSync-specific profile) | N/A | Codex-Guidas v0.3 identifies P1–P7 as SoulSync-specific; no ScoutSA profile maps these controls. |
| C-19 | Observed vs derived classes | SOFT · L2 | Imported identity/authority/permission claims are separated from operational state, but no formal typed claim model. |
| C-20 | Severity is diagnostic only | N/A | No severity-driven decision logic in this handoff workflow. |
| C-21 | Threat-boundary document matches implementation | OPEN · L0 | No dedicated threat-boundary document was inspected against this importer. |
| C-22 | Regression containment | SOFT · L2 | Adversarial tests are committed; exact-current-head execution is not evidenced. |
| C-23 | Fixture coverage mapped to every policy rule | OPEN · L0 | No complete fixture-to-rule coverage map. |
| C-24 | Property tests | OPEN · L0 | No property-based importer tests or executed property evidence. |
| C-25 | CI wiring truth | SOFT · L2 | Workflow source is present; current-head hosted result is unavailable. Run #704 is an earlier baseline. |
| C-26 | Witness harness integrity | N/A | This prototype has no append-only NDJSON witness harness. |
| C-27 | Ledger cross-reference integrity | SOFT · L2 | OPA/TM references are recorded; full automated reachable-SHA validation was not evidenced. |
| C-28 | Hardening debt tracked | SOFT · L2 | OPA-012 and TM-013 are recorded with residual risks. |
| C-29 | Dependency exposure enumerated and pinned | SOFT · L2 | Actions are SHA-pinned and Playwright is version-pinned; Node is major-version pinned and no lockfile-backed test install was evidenced. |
| C-30 | ZA-specific detection patterns | N/A | This is not a threat-detection product; SoulSync ZA patterns do not transfer. |
| C-31 | Performance envelope measured on-device | OPEN · L0 | No representative device performance evidence. |
| C-32 | Reproducibility: same input and SHA, byte-identical record | OPEN · L0 | No byte-identical replay/export reproducibility test. |
| C-33 | Disclosure surface | SOFT · L2 | Prototype/no-backend/no-persistence disclaimers exist; import side effects and source-claim semantics are not fully disclosed. |


### Body — Persistence (D-01…D-33)

| Tier | Diagnostic lens | Disposition / verdict | Source-level assessment |
|---|---|---|---|
| D-01 | Store inventory and keys | N/A | No durable store or storage keys in this prototype. |
| D-02 | Schema declared as type plus runtime guard | SOFT · L2 | Imported package fields are manually guarded; no formal schema and no full event-state schema. |
| D-03 | Version and migration path | OPEN · L0 | Only exact contractVersion 1.0 is accepted; no compatibility/migration path. |
| D-04 | Key lifecycle | N/A | No persistent keys. |
| D-05 | Write atomicity | SOFT · L2 | Validation precedes synchronous in-memory mutation; no durable transaction or failure-injection proof. |
| D-06 | Size, growth and retention | SOFT · L2 | 1 MiB file limit and 250-record collection limits exist; no retention policy or long-session growth analysis. |
| D-07 | Index/query paths and worst-case cost | SOFT · L2 | Array scans are used; bounded input helps, but no measured worst-case cost. |
| D-08 | Integrity invariants detectable on read | SOFT · L2 | Incoming IDs and links are checked; existing session state is not comprehensively revalidated. |
| D-09 | Backup/export path | SOFT · L2 | Session JSON export exists; this is not durable backup or full-session restore. |
| D-10 | Fully offline semantics | SOFT · L2 | The workflow is local-file based; no explicit offline/network-loss runtime witness. |
| D-11 | Orphaned data detected | SOFT · L2 | Organizer and submission references in imported records are checked; full existing-state orphan scan is absent. |
| D-12 | Read validation and quarantine | SOFT · L2 | Malformed imports are rejected; no quarantine workflow. |
| D-13 | Write validation against invariants | SOFT · L2 | Incoming fields are checked before mutation; domain-level and existing-state validation remain incomplete. |
| D-14 | Ledger integrity, append-only and tamper detection | OPEN · L0 | Claims are mutable in browser memory; no tamper-evident or durable append-only ledger. |
| D-15 | Cross-reference integrity against code version | OPEN · L0 | Package contract version exists, but record-level policy/schema producer version is absent. |
| D-16 | Round-trip fidelity | SOFT · L2 | Source claim arrays are asserted in exported session data; full export→import→export round-trip is not supported/tested. |
| D-17 | UTC storage and local render | N/A | Only date-only fields are used in this handoff; no timestamp/timezone contract. |
| D-18 | Cascade and derivation truth | SOFT · L2 | Season and venue ID are derived; derivation provenance is not separately recorded and venue remains a placeholder. |
| D-19 | Concurrency and conflict discipline | SOFT · L2 | Stable-ID and duplicate checks exist; no cross-tab/backend concurrency or race-injection evidence. |
| D-20 | Sensitive data minimisation | SOFT · L2 | Synthetic-only labels and no real player data are declared; no automated leakage test. |
| D-21 | Fixture and persistence parity | SOFT · L2 | Browser fixture is exported and inspected; there is no persistent store to establish parity against. |
| D-22 | Persistence failures become ledger entries | N/A | No persistence operation exists in this prototype. |
| D-23 | Migration rehearsal on real-shaped data | N/A | No database/schema migration in scope. |
| D-24 | Corruption drills, quarantine and boot survival | SOFT · L2 | Malformed/tampered packages are rejected; persistent corruption and restart survival are not tested. |
| D-25 | Storage witness script | N/A | No durable storage witness script. |
| D-26 | Key rename safety | N/A | No persistent storage keys. |
| D-27 | Performance envelope at realistic scale | OPEN · L0 | No realistic-scale performance measurement. |
| D-28 | Schema documentation matches live types | OPEN · L0 | No formal schema/type artefact to compare. |
| D-29 | Secret-free store | N/A | No persistent store; synthetic package only. |
| D-30 | Multi-device and export/import integrity | SOFT · L2 | Organizer handoff export/import exists; no full session restore or multi-device witness. |
| D-31 | Retention enforced | N/A | No durable retention layer. |
| D-32 | Recovery ordering | N/A | No startup recovery or persistent reads. |
| D-33 | Disclosure: stored data, location and erasure | SOFT · L2 | No-backend/no-persistence notice, JSON export and reset exist; complete data lifecycle disclosure is absent. |


### Soul / Spirit — User Interface (U-01…U-33)

| Tier | Diagnostic lens | Disposition / verdict | Source-level assessment |
|---|---|---|---|
| U-01 | Screen/modal inventory | SOFT · L2 | A single-page prototype with sections is present; no complete screen/modal inventory. |
| U-02 | Navigation integrity | SOFT · L2 | Navigation handler and Records browser scenario exist; current-head execution is pending. |
| U-03 | Component map and duplicate components | OPEN · L0 | No component map or duplicate-component review. |
| U-04 | Decision display bound to shared class registry | OPEN · L0 | No canonical decision-class registry was found for this handoff UI. |
| U-05 | Full state matrix | SOFT · L2 | Empty and error messages exist; pending, refresh-failure and durable-recovery states are missing. |
| U-06 | Input validation/normalization paths | SOFT · L2 | File size and payload validation exist; no separate normalization contract. |
| U-07 | Accessibility on decision-heavy components | OPEN · L0 | Native labels/roles exist; no automated accessibility or assistive-technology evidence. |
| U-08 | Centralized localization | OPEN · L0 | English-only interface; no localization catalogue. Product-level relevance remains. |
| U-09 | Offline indicators truthful | N/A | No network-dependent state or offline indicator in this local prototype. |
| U-10 | Restart/recovery UX | N/A | No persistence; reload resets the demo and the page discloses this. |
| U-11 | Platform envelope documented | OPEN · L0 | No supported browser/device/platform matrix. |
| U-12 | Claim-tone discipline | SOFT · L2 | Authority claims are not promoted; import result messaging can under-report side-collection changes. |
| U-13 | Severity honesty | N/A | No severity display or severity-based user decision. |
| U-14 | Disclosure: what is and is not detected | SOFT · L2 | Prototype and non-verification notices exist; detection/coverage limits are not comprehensively explained. |
| U-15 | Error display integrity | SOFT · L2 | Errors are bounded and shown as text; broad catch can falsely report rejection after mutation. |
| U-16 | Observed versus derived visibility | SOFT · L2 | Source claims are exported, but normal ledger UI does not expose claim lineage directly. |
| U-17 | Empty/load states never look safe | SOFT · L2 | Empty ledger says no records; it does not imply verification or safety. |
| U-18 | Why am I seeing this path for warnings | N/A | No warning/alert decision class in this workflow. |
| U-19 | Fixture-driven UI previews | OPEN · L0 | Browser tests use fixtures; no dedicated UI preview matrix. |
| U-20 | Timing honesty | SOFT · L2 | File reading is asynchronous but no processing/busy state is shown; refresh errors are conflated with import errors. |
| U-21 | Visual stability under long content | OPEN · L0 | No long-content visual regression evidence. |
| U-22 | Consent anchors and data-erase affordance | N/A | Synthetic-only data in this bounded demo; this remains applicable to production ScoutSA and minor/guardian flows. |
| U-23 | Snapshot/property tests for state matrix | SOFT · L2 | Complete-state rejection snapshots exist; no full state-matrix/property coverage. |
| U-24 | Copy review ledger | OPEN · L0 | No dedicated copy review ledger. |
| U-25 | Golden fixtures in UI | SOFT · L2 | Browser smoke uses a stable synthetic fixture; no golden visual/semantic snapshot suite. |
| U-26 | Automated accessibility checks | OPEN · L0 | No automated accessibility evidence. |
| U-27 | Full offline flow under airplane mode | N/A | No durable mobile/offline product flow in this local-file prototype. |
| U-28 | Deep-link regression | N/A | No deep-link path in this prototype. |
| U-29 | Interaction latency measured on-device | OPEN · L0 | No device-level interaction measurement. |
| U-30 | Update/migration UX for old data | OPEN · L0 | Unsupported contract versions reject; no user-facing migration path. |
| U-31 | Telemetry-free guarantee | OPEN · L0 | No network capture or telemetry-specific test was inspected. |
| U-32 | Visual regression seeds | OPEN · L0 | No visual regression seeds or screenshot comparison. |
| U-33 | Readback trust | SOFT · L2 | Full session JSON export includes source claims; no direct in-app claim readback. |


### Seven Harmony seam assessment (v0.3 draft)

| Invariant | Result | Evidence and limitation |
|---|---|---|
| H-1 One Vocabulary | OPEN / partial | Contract version and stable IDs exist, but no shared schema/enum registry; free-form claim statuses and no versioned domain vocabulary. |
| H-2 Same Evidence Basis | SOFT | Source claims are retained and event fields are projected; UI does not expose the full claim lineage, import result omits side-collection counts, and no full input→state→UI trace was run. |
| H-3 Version and Compatibility Coherence | OPEN | Exact contractVersion 1.0 is accepted; no record-level producer/policy version or supported-old-version migration matrix. |
| H-4 Atomic Logical Action | SOFT / OPEN | Validation precedes synchronous in-memory mutation; there is no durable transaction. Broad catch can misreport a post-mutation refresh failure as rejection. |
| H-5 Truth Through Interruption | OPEN | No persistence, restart recovery or interrupted-write witness; prototype disclaimer correctly states session-only behaviour. |
| H-6 Authority Does Not Escalate | SOFT | Incoming verified/approved/granted claims remain source claims; operational fields remain unverified/not-requested. No real authentication/authorization or human decision authority is implemented. |
| H-7 Traceable Disagreement | OPEN / partial | Conflicts are rejected with transient UI text; no durable, attributable disagreement/revision ledger or source-envelope provenance. |

### Additional source-review findings

**OPA-013 — Import summary omits side-collection mutations**
- **Observation:** `importOrganizerPackage` merges organizer, submission, evidence and feature claims, but returns only `added` and `skipped` counts derived from submissions. The UI message reports only tournament edition counts.
- **Consequence:** A package with zero new editions can still add organizer/evidence/feature claims while the UI says zero editions imported and zero duplicates skipped. A duplicate edition package can also add new evidence claims without the summary revealing that change.
- **Required correction:** Return per-collection added/skipped counts and report all mutations. Add zero-submission and duplicate-edition/new-evidence tests.
- **Status:** Static finding; runtime reproduction pending.

**OPA-014 — Post-mutation refresh failure can be reported as import rejection**
- **Observation:** The event handler wraps JSON parsing, `importOrganizerPackage`, `refresh` and the success message in one `try/catch`. The importer mutates in-memory arrays before `refresh` executes.
- **Consequence:** If `refresh` throws after the importer has mutated state, the catch displays “Import rejected” although the state may already have changed.
- **Required correction:** Separate pre-commit/import failure handling from post-commit presentation failure. A post-commit rendering failure must report “import committed; view refresh failed”, not rejection. Add controlled refresh-failure injection and state snapshot assertions.
- **Status:** Static control-flow finding; failure injection pending.

**OPA-015 — Duplicate comparison omits importer-derived integrity fields**
- **Observation:** The expected projection checks source-derived event fields but omits deterministic `venueId` and `importSource`, which are assigned when the event is first imported.
- **Consequence:** If either field is corrupted or altered while source claims remain unchanged, a repeated package can still be accepted as an exact duplicate and the discrepancy remains undetected.
- **Required correction:** Include deterministic importer-derived provenance fields in duplicate equivalence checks, while deliberately excluding operational human-decision fields such as `authority` and `feature`.
- **Status:** Static finding; regression test pending.

**OPA-016 — Stable-ID claim updates have no revision/supersession protocol**
- **Observation:** Existing source claim IDs are treated as immutable by JSON-string comparison. The Organizer Portal updates an existing feature record's status in place under the same feature ID. The Manager rejects that changed claim ID instead of recording a revision/withdrawal event.
- **Consequence:** A permission withdrawal or evidence status change under a stable ID cannot be imported. A new ID may avoid the conflict but there is no explicit supersedes/revokes relationship or attributable history.
- **Required correction:** Ratify an append-only revision/event model (stable subject ID + revision/event ID + supersedes/revokes reference + actor/time/source provenance). Never translate a source claim into operational authority automatically.
- **Status:** Static integration/domain finding; withdrawal/expiry scenario test pending.

**Lower-priority validation notes**
- Claim equality uses `JSON.stringify`, so semantically identical objects with different property order can be rejected as conflicting claims. Decide whether exact byte identity or canonical semantic equality is intended; do not silently normalize without a contract.
- `validDemoId` permits repeated/trailing hyphens in the suffix. Tighten only if the ID grammar is ratified and add boundary tests.
- `unique(pkg.submissions, "tournamentId")` allows only one submission per tournament ID in a package. Whether a competition may have multiple editions under one tournament ID is an unresolved domain rule, not a confirmed defect.

### Decision boundary and next action

- OPA-012 remains **awaiting exact-head hosted verification**.
- OPA-013 through OPA-016 are source-review findings; no correction has been implemented in this assessment.
- TM-013 deliberate assertion-failure cleanup injection remains open.
- No semantic duplicate detection across distinct IDs, identity resolution, permission revocation history, evidence expiry/revalidation policy, production persistence, authentication/authorization or safeguarding validation is established.
- **Recommendation: HOLD further implementation until these findings and the versioned domain rules are reviewed.** Continue only with read-only verification or explicitly authorized documentation/test work. Do not merge to main or alter PR #6.
