# UI-008 — 59-sink evidence ledger

**Assessment date:** 20 November 2026  
**Repository:** `Moshoeshoe333/ScoutSA`  
**Branch:** `prototype/internal-demo`  
**Source and test snapshot:** `c82e46d4147790ff2af33dc528763db44b2b0ce1`  
**Parent inventory:** `prototype/verification/UI-008-RENDER-SINK-INVENTORY-2026-11-19.md`  
**Status:** Mapping completed for the inventoried `.innerHTML =` assignments; UI-008 remains **OPEN**.

## 1. Question and scope

This ledger answers a bounded question: for each of the 59 source-text occurrences of `.innerHTML =` in the 21 inventoried standalone prototype pages, what element is written, which values reach it, what context-specific control is visible in the source, and what test evidence reaches the path?

It does not claim that 59 assignments are 59 vulnerabilities. It does not treat a passing test, an escaping helper, or a zero-count source scan as a production security assessment.

The 21-page source set was fetched at the exact snapshot above. The count was reproduced by counting source-text occurrences of `.innerHTML\s*=` in each page. This is a source-text inventory, not an AST or browser-runtime sink discovery method.

## 2. Recount and source identity

| Prototype page | Assignments | Source blob at snapshot |
|---|---:|---|
| `coach-academy-workspace.html` | 4 | `d7273dcd7d1fe372e5274e7bc88c9ccfa077a014` |
| `discovery-request.html` | 5 | `9faa1009a992af01b257c49af752000dc1c4859b` |
| `guardian-consent.html` | 5 | `2593fae4635b77af81900570101899c4e3eb15a9` |
| `opportunities.html` | 1 | `9b97dbb5490ff28a66592ee520e396f210008f14` |
| `opportunity-decisions.html` | 1 | `2a34d3f67ecac5d07bafa02b701d8b8a0531f08a` |
| `opportunity-evidence.html` | 1 | `f6983abafafc25fa65fb2a861638071dbb4e9c50` |
| `organization-memberships.html` | 2 | `c71ba0a431494f9167a68c0fcf70101b2adad793` |
| `player-development-pathways.html` | 3 | `196658e44ad108b078543d7799a217cabd0a1b15` |
| `player-opportunity-matching.html` | 2 | `5328db3d4a827e7662de0783652446c3951fefce` |
| `player-passport.html` | 8 | `3b357bf607739360b5bd136abb50447f54206137` |
| `safeguarded-invitations.html` | 1 | `160e609af406c5769f64f6977f36ac10bdcccd7f` |
| `tournament-day-operations.html` | 10 | `f0d6973a104f90606604e192b0841700f9379424` |
| `tournament-manager.html` | 8 | `1c7a9088a6350231e81e8b56e772b6cd3f3ee78b` |
| `tournament-organizer-portal.html` | 5 | `cdeceba96538b80096dd7d1f1e44e6a12c39bba1` |
| `tournament-stat-reconciliation.html` | 3 | `e0e8618afe2016c0b3d436c4490336e72d899d74` |
| `scoutsa-player-preview.html` | 0 | `1a5457902513f076a6f7b4437a558043b9dd2e10` |
| `vaal-ecosystem-coverage.html` | 0 | `4d817ff8776212fa3981915cbc3211d5644fa5d2` |
| `player-tournament-history.html` | 0 | `255bf25c5cae8e7192b63b8abaed712581c640b0` |
| `tournament-intelligence.html` | 0 | `44eb30a663a7e5e0eaa6d397a53cf1b1d17b4a0e` |
| `index.html` | 0 | `4ae9baa5cc3ec1f6e01f9b9af4f5d8b4713d1268` |
| `demo-journey.html` | 0 | `224b70da8e42bdc1c5bd0d68e3d6d7374ff12b87` |
| **Total** | **59** | **21 pages** |

The six zero-assignment pages were also scanned for `.outerHTML =`, `insertAdjacentHTML(`, and `document.write(`; none was found in those six files. This secondary check is not being generalized to every JavaScript construction pattern or to every file in the repository.

Six of the 59 assignments are fixed fallback markup with no interpolated fixture value: four Player Passport empty-state writes and two Tournament Day Operations timing-blocked empty states. The remaining **53 assignments are data-bearing render paths** (some of those also contain a static empty-state branch).

## 3. Sink-by-sink register

Legend:
- **HTML text** — dynamic values are inserted into text-bearing HTML positions and passed through the page's `h()` or `esc()` HTML-escape helper.
- **HTML attribute** — dynamic attribute values are escaped before interpolation. That prevents markup/attribute breakout; it does not grant authority or make a URL trustworthy.
- **Fixed class** — class tokens are selected from a fixed mapping or boolean branch, not copied from arbitrary fixture text.
- **Static** — fixed fallback markup only; there is no dynamic interpolation at this assignment.
- Test references identify representative hostile fixtures and the relevant browser-test file/range. They do not imply that every field combination has been attacked.

### Coach / academy workspace — 4

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S001 | `#membershipList`: membership ID, state, note, verification | HTML text via `h()`; the only class variation is a fixed `red` token when state equals `Disputed`. | `workspace-interactions.browser-smoke.cjs` lines 746–767 challenges the membership note; malformed/missing collections and hostile nested fields are also exercised. Other membership fields are representative, not exhaustively varied. |
| S002 | `#opportunityList`: name, state, ID, source, blocker | HTML text via `h()`; fixed markup/classes. | Same test file lines 746–767 challenges the opportunity name. Source, blocker and state are not each separately adversarially varied. |
| S003 | `#actionList`: area, state, action | HTML text via `h()`; class/style markup is static. | Same test file lines 746–767 challenges an action value. Not every action property is separately challenged. |
| S004 | `#boundaries`: boundary strings | HTML text via `h()`; static wrapper. | Same test file lines 746–767 challenges a boundary value. |

### Discovery & Request Review — 5

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S005 | `#summary`: player reference, age state, request route, purpose, organization and opportunity labels/references | HTML text via `h()`; fixed labels are authored strings. | `workspace-interactions.browser-smoke.cjs` lines 854–886 challenges player reference and purpose. Organization/opportunity and every other summary field are not individually varied. |
| S006 | `#gates`: gate label, detail and status | HTML text via `h()`; fixed wrapper. | Same test file lines 867–886 challenges hostile gate labels/details. Status has no separate hostile fixture in this range. |
| S007 | `#links`: link label and `href` | Labels and `href` values are escaped; destinations are fixed relative page paths, with player/opportunity identifiers encoded using `encodeURIComponent`. The destination is not sourced from an arbitrary fixture URL. | Same test file lines 507–547 challenges hostile handoff identifiers and URL schemes across Discovery and Opportunities. The source constraint is the main evidence for this link assignment; it is not a general-purpose URL sanitizer. |
| S008 | `#requestList`: request ID in `data-id`, request ID text and purpose | HTML attribute/text via `h()`; click handler re-resolves the ID against the known request array. | Same test file lines 854–886 challenges request-list purpose; earlier lines 507–535 challenge hostile request handoffs. Not every request field is separately injected. |
| S009 | `#rules`: workflow rule strings | HTML text via `h()`. | Same test file lines 854–866 challenges hostile rule text. |

### Guardian Consent — 5

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S010 | `#caseGrid`: case ID, player reference, age state; selected-state class | HTML text/attribute via `h()`; selected class is chosen by a boolean comparison, not a fixture-supplied class token. | `workspace-interactions.browser-smoke.cjs` lines 734–745 exercises hostile case-card player reference. The same test suite checks scenario selection; not every card property is separately attacked. |
| S011 | `#caseDetails`: fixed row labels and case detail values | HTML text via `h()`; labels are authored constants. | Same test file lines 734–745 challenges a case detail value. |
| S012 | `#purposeList`: purpose name and string state | HTML text via `h()`; non-string state is replaced by fixed `UNSPECIFIED` text before escaping. | Same test file lines 734–745 challenges purpose name. |
| S013 | `#ruleList`: rule strings | HTML text via `h()`. | Same test file lines 812–825 challenges hostile rule text. |
| S014 | `#limitList`: implementation-boundary strings | HTML text via `h()`. | Same test file lines 812–825 challenges hostile limit text. |

### Opportunity Register — 1

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S015 | `#records`: title, organization, location, stage, identity/verification/eligibility data, source/detail text | HTML text and `data-stage` attribute via `h()`; the attribute is data, not authorization. Handoff destinations use a fixed local path and encoded identifiers. | `workspace-interactions.browser-smoke.cjs` lines 283–299 challenges the `data-stage` attribute for breakout and handler injection; lines 828–848 challenge representative record text and malformed fixture values. |

### Claim Decisions — 1

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S016 | `#items`: claim scope, opportunity, evidence ID, record ID, reviewer, date and rationale | HTML text via `esc(display(...))`; status badge class comes from `badgeClass(status)`, a fixed mapping. | `workspace-interactions.browser-smoke.cjs` lines 368–414 challenges hostile/malformed records; lines 769–786 challenges claim, opportunity, reviewer and rationale fields. This is broad representative coverage, not every property/value type. |

### Opportunity Evidence — 1

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S017 | `#items`: evidence label, opportunity, evidence type, state, submitter, source, authority, dates, corroboration, limitations and next action | HTML text via `h()`; the only conditional badge class is a fixed `red` token for the exact `Conflict` state. | `workspace-interactions.browser-smoke.cjs` lines 665–685 challenges the principal evidence fields; lines 899–949 exercise malformed collections/rows and unusual values. |

### Organization Memberships — 2

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S018 | `#orgList`: organization name, type, area and ID | HTML text via `h()`; identity label/class is fixed. | `workspace-interactions.browser-smoke.cjs` lines 228–253 changes organization name to hostile markup and checks literal text/no element/no handler. Type/area/ID are not each separately varied. |
| S019 | `#records`: player, status, organization, role, claim submitter and verification details | HTML text/attribute via `h()`; membership CSS class uses `membershipStatusClass()`, which maps known statuses to fixed tokens and returns empty for unknown status. | Same test file lines 228–253 challenges player, organization and status plus unresolved-organization fallback and status-class allowlist. |

### Player Development Pathways — 3

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S020 | `#playerSelect`: player ID in option `value`, name and ID in option text | HTML attribute/text via `h()`. | `workspace-interactions.browser-smoke.cjs` lines 719–732 injects a hostile player name before option rendering and checks literal option text. |
| S021 | `#playerList`: player ID in `data-id`, name, position and area | HTML attribute/text via `h()`; `aria-pressed` is a boolean derived from selected-player equality. | Same test file lines 709–718 challenges player name and list output. |
| S022 | `#stages`: stage ID/name/description and player evidence/detail/next-step/state | HTML text via `h()`; CSS tone comes from `tone(state)`, which maps only `Started`, `On hold`, `Incomplete` and `Unverified` to fixed classes (`green`, `red`, `amber`, or empty). | Same test file lines 709–718 challenges stage name; malformed/missing stage handling is exercised at lines 978–1004. Other stage values are not each independently attacked. |

### Player–Opportunity Matching — 2

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S023 | `#pairs`: player/opportunity labels and IDs, disposition, context, findings and reasons | HTML text via `h()`; wrapper classes are static. | `workspace-interactions.browser-smoke.cjs` lines 698–708 challenges hostile player, finding and reason; missing nested findings are exercised at lines 165–200. |
| S024 | `#dimensions`: dimension ID, name and meaning | HTML text via `h()`. | Same test file lines 798–810 challenges hostile dimension meaning. |

### Player Passport — 8

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S025 | `#profileFields` empty-state branch | Fixed static fallback HTML; no fixture interpolation. | Missing profile collection branch exercised by `workspace-interactions.browser-smoke.cjs` lines 644–661. |
| S026 | `#claimsList` empty-state branch | Fixed static fallback HTML; no fixture interpolation. | Missing claims collection branch exercised in the same test range. |
| S027 | `#membershipList` empty-state branch | Fixed static fallback HTML; no fixture interpolation. | Missing memberships branch exercised in the same test range. |
| S028 | `#timelineList` empty-state branch | Fixed static fallback HTML; no fixture interpolation. | Missing timeline/claims/membership-derived events branch exercised in the same test range. |
| S029 | `#profileFields` populated branch: profile keys and values | HTML text via `h(display(...))`; row shape is filtered before rendering. | `workspace-interactions.browser-smoke.cjs` lines 586–640 and 790–796 challenge profile values and malformed tuples. |
| S030 | `#claimsList`: claim, status, author and evidence | HTML text via `h(display(...))`; malformed non-string values become safe display fallbacks. | Same test file lines 586–640 challenges hostile claim values and malformed claim records. |
| S031 | `#membershipList`: organization, status, type and period | HTML text via `h(display(...))`; malformed membership rows are filtered/normalized. | Same test file lines 586–640 challenges hostile membership values and malformed records. |
| S032 | `#timelineList`: derived event title, status, date and detail | HTML text via `h()`; dates are normalized before formatting. | Same test file lines 586–640 challenges timeline detail and invalid dates. |

### Safeguarded Invitations — 1

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S033 | `#cases`: opportunity, case ID, organization, participant band, route, gate count and related review details | HTML text via `h()`; readiness label is returned from a fixed conditional, not copied from fixture text. | `workspace-interactions.browser-smoke.cjs` lines 687–696 challenges opportunity, gate note and hard stop; malformed case handling is exercised at lines 431–449. |

### Tournament Day Operations — 10

The shared `table(head, rows)` helper escapes headers; callers must escape every dynamic cell before passing raw cell strings to it. The reviewed callers below do so.

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S034 | `#appearanceTable` invalid-duration fallback | Fixed static fallback HTML; no fixture interpolation. | Invalid duration branch exercised by `tournament-day-operations.browser-smoke.cjs`. |
| S035 | `#appearanceTable` invalid substitution-interval fallback | Fixed static fallback HTML; no fixture interpolation. | Invalid timing branch exercised by the same test. |
| S036 | `#appearanceTable` calculated rows: lineup/substitution IDs, statuses, start/end minutes and derived minutes | Dynamic table cells pass through `esc()`; static `<code>` wrappers are trusted markup. | Same test checks derived minutes and timing; new hostile lineup-ID fixture in the same browser smoke test challenges this table. |
| S037 | `#dayTable`: match-day ID, fixture, status, kick-off, venue and coordinator | Dynamic cells pass through `esc()`. | New hostile venue/coordinator fixture in `tournament-day-operations.browser-smoke.cjs`. |
| S038 | `#officialTable`: assignment ID, fixture, official label, role and appointment source | Dynamic cells pass through `esc()`. | Hostile official label/role/source fixture in the same test. |
| S039 | `#lineupTable`: lineup ID, fixture, participation, team entry, status, position and shirt | Dynamic cells pass through `esc()`. | New hostile lineup ID/status/position fixture in the same test. |
| S040 | `#subTable`: substitution ID, fixture, minute, leaving/entering participations and source ID | Dynamic cells pass through `esc()`. | New hostile substitution fixture in the same test. |
| S041 | `#eventTable`: event ID, fixture, minute, player label, type, source and review | Dynamic cells pass through `esc()`. | Hostile event type/minute/source/review fixture in the same test. |
| S042 | `#reportTable`: report ID, fixture, author, source, review and summary | Dynamic cells pass through `esc()`. | Existing hostile report-summary form test in `workspace-interactions.browser-smoke.cjs` lines 1021–1027; new hostile report state in the Day Operations smoke test. |
| S043 | `#ledger`: record type, IDs, fixture relationships, source type and record links | Dynamic cells pass through `esc()`; record-type text and `<code>` wrappers are controlled. | New hostile day/lineup/substitution/report/source fixture in the Day Operations smoke test calls the normal refresh/render path and checks the ledger. |

### Tournament Manager — 8

The shared `table(headers, rows)` helper escapes headers but deliberately receives prebuilt cell strings. Each reviewed caller wraps dynamic cells in `esc()`; static `<code>` wrappers are trusted markup. This remains a caller-contract maintenance risk.

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S044 | `#divisionTable`: division ID, edition ID, name, age/gender and format | Dynamic cells pass through `esc()`; static code wrappers. | Hostile division-name form test in `workspace-interactions.browser-smoke.cjs` lines 1009–1019; new eight-table fixture also challenges this sink. |
| S045 | `#teamTable`: entry/team IDs, team name, coach assignment, division and status | Dynamic cells pass through `esc()`. | New eight-table hostile fixture in `tournament-manager.browser-smoke.cjs`. |
| S046 | `#playerTable`: participation/player IDs, alias, team entry, shirt, roster state, role and permission | Dynamic cells pass through `esc()`. | New eight-table hostile fixture in the same test. |
| S047 | `#fixtureTable`: fixture/division IDs, team labels, date and round | Dynamic cells pass through `esc()`. | New eight-table hostile fixture in the same test. |
| S048 | `#resultTable`: fixture, score, source and review state | Dynamic cells pass through `esc()`. | New eight-table hostile fixture in the same test. |
| S049 | `#statsTable`: stat/player/fixture IDs, metric/unit, value, source and review | Dynamic cells pass through `esc()`. | New eight-table hostile fixture in the same test. |
| S050 | `#eligibilityTable`: review/participation IDs, division/category, evidence, outcome, rule and reviewer | Dynamic cells pass through `esc()`. | New eight-table hostile fixture in the same test. |
| S051 | `#ledger`: record type, primary IDs and foreign-key relationships | Dynamic cells pass through `esc()`; code wrappers are static. | New eight-table hostile fixture changes an event identifier and verifies literal ledger output. The imported organizer/evidence/feature side collections are stored/exported but are not rendered by this Manager ledger; the separate importer test checks that those values remain inert data. |

### Tournament Organizer Portal — 5

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S052 | `optionList()`: option `value` and visible label; called for evidence-organizer and feature-submission selects | Both attribute value and label are HTML-escaped before option markup is assembled. | New assertions in `workspace-interactions.browser-smoke.cjs` after the hostile organizer/submission form path check literal option labels and no element creation. |
| S053 | `#organizerRows`: organizer ID, name, type, identity and authority | Text/attributes via `esc()`; `tag()` maps status to fixed `good`/`no`/`pending` classes and escapes the label. | Hostile organizer-name form test in `workspace-interactions.browser-smoke.cjs` lines 1030–1044. |
| S054 | `#evidenceRows`: evidence ID, organizer name, type, reference and status | Text/attributes via `esc()`; status class uses fixed `tag()` mapping. | New hostile evidence type/status options through the actual form and render path in `tournament-organizer-portal.browser-smoke.cjs`. |
| S055 | `#featureRows`: feature ID, submission name, scope, status and fixed publication state | Text/attributes via `esc()`; both status badges use fixed `tag()` mapping. | New hostile feature scope/status options through the actual form and render path in the same test. |
| S056 | `#ledgerCards`: organizer ID/name, submission IDs/editions, evidence IDs and feature IDs | Dynamic text via `esc()`; card markup is fixed. | New literal-text/no-element assertion in `workspace-interactions.browser-smoke.cjs`; the organizer-name hostile fixture also flows through this card renderer. |

### Match Statistic Reconciliation — 3

| Sink | Target and source values | Output context and source control | Evidence / limitation |
|---|---|---|---|
| S057 | `#eventRows`: event ID, participation, metric, minute, value, source and review | Dynamic cells pass through `esc()`; static code wrappers. | Hostile event injection in `tournament-stat-reconciliation.browser-smoke.cjs` and the specialist workspace test. |
| S058 | `#statRows`: stat ID, participation, metric, value, source-event ID and review | Dynamic cells pass through `esc()`. | New hostile statistic-field injection in `tournament-stat-reconciliation.browser-smoke.cjs`. |
| S059 | `#findingRows`: derived finding kind/ID, linked event/stat IDs, reason, status and review action | Dynamic text/attribute values pass through `esc()`; badge class is a fixed `duplicate`/`match`/`pending` mapping. | New hostile stat ID flowing into a derived finding plus fixed-class assertion in the same test. |

## 4. Test coverage interpretation

The test evidence is now materially broader than the prior checkpoint:

- The eleven general workspace renderers have representative hostile-field and malformed-fixture tests in `prototype/tests/workspace-interactions.browser-smoke.cjs`. The test also checks the shared HTML-escape helper across all eleven workspaces. The helper-contract check is not treated as a substitute for renderer tests.
- The four tournament workspaces now have broader hostile fixtures. Manager's eight data tables, Day Operations' day/lineup/substitution/appearance/report/ledger tables, and Organizer Portal's option-list/ledger-card paths were specifically added in commit `c82e46d4147790ff2af33dc528763db44b2b0ce1`.
- The previous UI-008 additions remain in place: hostile event/stat/finding paths, imported source claim inertness, Organizer Portal evidence/feature form paths, official/event table paths, and the constrained handoff tests.
- Tests deliberately use synthetic data and, in some cases, direct in-memory fixture mutation. Such a test proves the renderer's handling of the injected state; it does not prove that the same value can be submitted through every unmodified production-like form or that any actual user is authorized to submit it.

The exact hosted verification for source/test head `c82e46d4147790ff2af33dc528763db44b2b0ce1` is workflow [#836](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44752258562), completed successfully on 20 November 2026:

- Node headless tests: **121/121 passed**, 0 failed, 0 cancelled, 0 skipped.
- Discovery & Request Review browser groups: **8/8 passed**.
- Workspace-hub browser groups: **8/8 passed**.
- Configured Playwright/Chromium browser smoke scripts: **11/11 invoked and completed successfully**, including the expanded Manager, Day Operations and workspace-interactions tests.
- Specialist workspace interaction groups: **24/24 passed**.

## 5. Bounded assessment and remaining limitations

**No confirmed exploitable HTML injection was identified in the inspected 59 assignments at this snapshot.** The reviewed data-bearing text interpolations pass through the page's HTML-escape helper. Status CSS classes observed in this review are fixed mappings or fixed conditional tokens. The Discovery link renderer uses fixed relative page names and encoded identifiers rather than fixture-supplied arbitrary URLs.

That finding is deliberately narrower than “the prototype is secure”:

1. The `tournament-manager.html` and `tournament-day-operations.html` table helpers accept raw HTML cell strings. Their present reviewed callers escape dynamic values, but future callers can violate the convention. This remains a maintenance risk.
2. Representative hostile values were tested at each data-bearing sink, but not every property, nested type, malformed shape, browser parsing edge case or future caller combination was independently exercised. The ledger records exact field-level coverage limitations above.
3. HTML escaping is not a substitute for URL policy, authorization, identity verification, consent, safeguarding or data minimisation.
4. The Vaal research-source HTTPS policy, the player-preview share action, fixed local handoff destinations and local Blob exports are separate navigation/export paths already inventoried in the parent document; they are not included in the 59-assignment count.
5. Six pages with zero `.innerHTML =` assignments still require ordinary review of future navigation, DOM APIs and state handling. A zero count is not a blanket security conclusion.
6. This is source review plus regression evidence for synthetic pages. It is not a penetration test, production assessment, authentication/authorization review, POPIA opinion, legal opinion or safeguarding certification.

## 6. Next closure condition

UI-008 remains **OPEN**. The 59 assignments are now individually mapped, and the material gaps in the four tournament renderers have been challenged. Closure still requires a final independent review of the remaining per-field/context limitations above, confirmation that the inventory still matches the then-current branch head, and a competent review of any navigation/export paths changed after this snapshot.

No application code, product behaviour, schema, workflow, MVP boundary or decision gate was changed by this evidence ledger. No certification or gate transition is claimed.
