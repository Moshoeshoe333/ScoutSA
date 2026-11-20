# UI-008 — Rendering and navigation sink inventory

**Date:** 19 November 2026  
**Branch:** `prototype/internal-demo`  
**Scope:** HTML renderers and navigation/export sinks in the standalone prototype HTML pages.  
**Status:** Partial inventory and targeted mitigations; UI-008 remains OPEN. The latest code-and-test checkpoint passed hosted CI as recorded below.

## Important scope correction

A first broad pattern scan found 54 candidate lines containing rendering or navigation patterns. That was a count of matching source lines, not a count of HTML assignments. A more precise assignment count identifies **55 `.innerHTML =` assignments** across 15 prototype pages after the player-preview mitigation below. The count is based on source text, not a claim that 55 vulnerabilities exist. Some pages contain multiple assignments on one line.

The inventory does not include HTML pages whose role is explicitly smoke-test documentation, nor does it treat every use of `textContent`, DOM node creation, or static HTML markup as an HTML injection sink.

## Assignment inventory

| Prototype page | `.innerHTML =` assignments | Initial disposition |
|---|---:|---|
| `coach-academy-workspace.html` | 4 | Dynamic fixture values use the page's HTML-escape helper; malformed nested fixture handling still needs broader coverage. |
| `discovery-request.html` | 5 | Dynamic summary, gate, request, rule and link labels are escaped. Internal handoff paths are fixed relative paths; player/opportunity identifiers are encoded with `encodeURIComponent`. Existing browser test checks rendered links remain relative and rejects protocol-relative destinations. |
| `guardian-consent.html` | 5 | Dynamic fixture values are escaped. Empty/malformed consent and purpose collections now render explicit blocked states; targeted browser tests added. |
| `opportunities.html` | 1 | Register rows are rendered through escaped fixture text. Passport handoff uses a fixed local path with encoded player ID. |
| `opportunity-decisions.html` | 1 | Decision-list fields use escaped text; initial collections and rows are normalized before filtering/rendering, malformed scalar values use explicit unavailable text, and status styling remains allowlisted. Hostile and malformed-fixture browser regression added. |
| `opportunity-evidence.html` | 1 | Evidence-list fields use the local HTML-escape helper and nullish values are normalized before filtering/rendering. Hostile and malformed fixture coverage exists. |
| `organization-memberships.html` | 2 | Organization and membership display fields use escaped text; unresolved organization references have a fallback label. |
| `player-development-pathways.html` | 3 | Player/stage display fields use escaped text. Missing players/stages/evidence now produce explicit empty or unassessed states; targeted browser tests added. |
| `player-opportunity-matching.html` | 2 | Pair, finding and dimension display fields use escaped text. |
| `player-passport.html` | 4 | Profile, claim, membership and timeline values use escaped text. Opportunity handoff uses a fixed local path and encoded player ID. |
| `safeguarded-invitations.html` | 1 | Case and gate display fields use escaped text; collections are filtered to expected record shapes. |
| `tournament-day-operations.html` | 10 | Table headers and data fields are escaped before trusted table markup is assembled. Export uses a generated local Blob URL. Confirm each future row/template change preserves this contract. |
| `tournament-manager.html` | 8 | Table headers and dynamic cell values are escaped before trusted table markup is assembled. Export uses a generated local Blob URL. |
| `tournament-organizer-portal.html` | 5 | Dynamic table/card values use the page's escape helper; option values and labels are escaped. Export uses a generated local Blob URL. |
| `tournament-stat-reconciliation.html` | 3 | Event/stat display values use escaped text. Export uses a generated local Blob URL. |
| `scoutsa-player-preview.html` | 0 | The two former dynamic `innerHTML` status writes were removed in this pass and replaced with DOM text nodes. |
| `vaal-ecosystem-coverage.html` | 0 | Uses DOM node creation and `textContent` for table content rather than `innerHTML`. External source URL validation is covered separately below. |
| `player-tournament-history.html` | 0 | No `.innerHTML =` assignment found in this scan. |
| `tournament-intelligence.html` | 0 | No `.innerHTML =` assignment found in this scan. |
| `index.html` | 0 | No `.innerHTML =` assignment found in this scan. |
| `demo-journey.html` | 0 | Static guided walkthrough; no `.innerHTML =` assignment found. |

**Total: 55 assignments across 15 pages.** This is a source inventory, not a per-sink adversarial test certificate. Escaping must be reviewed in the correct HTML context; HTML escaping alone is not a safe URL policy, JavaScript-string policy, CSS policy or authorization control.

## Navigation and export sinks

### External research links — mitigation added

`vaal-ecosystem-coverage.html` builds source anchors from the source URL in each research fixture. The renderer now parses the supplied value as an absolute URL and accepts only HTTPS URLs with a hostname and no embedded username/password. Rejected values render a non-clickable “Source unavailable” message. Accepted links use `target="_blank"`, `rel="noopener noreferrer"` and `referrerPolicy="no-referrer"`.

A browser regression mutates a source to `javascript:` and plain `http:`, confirms neither becomes a link, then restores the HTTPS fixture and checks opener/referrer protections.

### Internal handoffs

- `player-passport.html` and `opportunities.html` construct fixed relative HTML paths and encode the player reference with `encodeURIComponent`.
- `discovery-request.html` builds its destination list from fixed relative page names; its player/opportunity identifiers are encoded before inclusion in query parameters. Existing browser coverage checks that rendered destinations stay relative and not protocol-relative.

These are constrained local prototype handoffs, not authorization checks. A query parameter never grants access to a player record.

### Export links

Tournament day operations, tournament manager, organizer portal and stat reconciliation create JSON Blob URLs locally and assign those URLs to temporary anchors. These are local export actions, not externally supplied navigation destinations. Review lifecycle/revocation behavior if export implementation changes.

### Player-preview share action

The preview reads the current page URL, and its WhatsApp action uses a fixed `https://wa.me/` destination, only enables sharing on HTTPS hosts, URL-encodes the message, and opens with `noopener,noreferrer`. This does not make the shared page public or authorize disclosure of real player data.

## Changes in this pass

1. Removed the two `innerHTML` status writes from `scoutsa-player-preview.html`. Status headings are now created with `document.createElement`, `textContent` and `replaceChildren`.
2. Unknown visibility values now render an explicit blocked state instead of indexing an absent message and throwing.
3. Added a browser regression that injects a hostile unknown visibility enum, verifies no element or handler is created, and confirms the simulated guardian action remains explicitly “not real consent”.
4. Added HTTPS-only URL validation to Vaal ecosystem source links, with a browser regression for `javascript:`, plain HTTP and accepted HTTPS behavior.
5. Hardened the coach/academy workspace against missing organization/summary objects, malformed membership/opportunity/action collections and hostile action fields; absent evidence renders explicit empty states.
6. Hardened matching review against missing pair/dimension collections, malformed nested findings and hostile labels. Missing evidence now renders an explicit empty state and cannot become an implied match or readiness outcome.
7. Earlier targeted regressions remain in place for discovery request rendering, evidence records, guardian consent, pathways and the hub's player metadata.
8. Hardened the Claim Decision workspace against missing/non-array decision collections, malformed rows and object/array-valued fields; unavailable values remain explicit and unrecognized statuses cannot become styled decision states.

## Latest hosted verification checkpoint

Hosted workflow [#44548354734](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44548354734) passed against exact verification commit `3c00836e75d1d912871d8d7f87ce6f7629d42a19` on `prototype/internal-demo`. The verified tree includes code-and-test commit `0ac9dc848554bf8fa7d397e684885892babec5b0` and the engineering-lessons ledger ID correction.

- 121/121 headless tests passed.
- 8/8 Discovery & Request Review browser groups passed.
- 8/8 hub/navigation groups passed.
- All eleven configured Playwright/Chromium browser smoke scripts completed successfully.
- The specialist workspace interaction suite passed 24/24 groups, including the new Claim Decision malformed-collection, malformed-row and hostile-field regression, plus the earlier Opportunity stage-attribute and Player Passport resilience regressions.
- Existing player-preview unknown-enum, Vaal HTTPS-only source-link, coach/matching malformed-fixture, hostile renderer and tournament regression checks remained green.
- TM-013 deliberate assertion-failure cleanup test passed.

This exact run is regression evidence for the tested synthetic prototype tree; it is not production security or safeguarding certification.

## Tournament workspace review — 19 November 2026

A targeted expression-level pass reviewed the 8 Tournament Manager, 10 Tournament Day Operations, 5 Organizer Portal and 3 Stat Reconciliation assignments. Dynamic table-cell values were found to be escaped before insertion into trusted table markup; the manager and portal option lists use DOM text nodes or escaped option strings, and the organizer status class is selected from fixed internal categories. The four export paths create local JSON Blob URLs rather than accepting external URLs. Hostile fixture regressions now exercise one representative dynamic value path in each page. No confirmed exploitable injection was identified in this bounded pass. This is not exhaustive coverage of every interpolation or malformed collection shape in these pages.

The first run of the new test failed because the test did not select a tournament edition before submitting its division form. The fixture setup was corrected, then the exact follow-up commit passed hosted CI. The failed run is not counted as verification.

## Remaining work — UI-008 stays OPEN

- Keep the hosted checkpoint above as the verification record for the current code-and-test state; rerun after any subsequent runtime or test change.
- Review every remaining `.innerHTML` assignment at the expression level, including conditional class fragments, fallback markup, and all dynamic attributes. A page-level statement that “the helper escapes values” is not sufficient evidence for every interpolation.
- Expand hostile-fixture tests to every material dynamic sink, including malformed arrays/objects and unexpected enum values.
- Review any future dynamic URL, download filename, import/export and cross-page handoff additions.
- Record file, line, context, exploitability, mitigation and exact test evidence for each finding. Keep UI-008 open until that ledger is complete.

## Boundaries

All fixtures are synthetic. This work does not establish production security, authentication, authorization, POPIA compliance, safeguarding effectiveness, identity verification, accessibility conformance or legal compliance. No real player or guardian data should be entered.


## Player Passport and Opportunity stage follow-up — 19 November 2026

The exact code-and-test checkpoint `7a0adf7fa70d7c4d7f02e4259199350d9742604a` adds two bounded UI-008 regression areas:

1. **Player Passport:** the renderer now normalizes missing/non-array collections, excludes malformed collection rows, safely displays supported scalar values, marks invalid timeline dates as unavailable, provides explicit empty states, and avoids creating a player handoff for an unknown or malformed Passport record. The browser regression exercises hostile text in profile, claim and membership values alongside malformed rows, missing collections, invalid dates and an unknown key.
2. **Opportunity Register:** the browser regression injects a value containing an attribute break-out, event-handler text and HTML markup into the rendered stage value. It asserts that the value remains in the intended `data-stage` attribute, is displayed as literal text, creates no extra element or event-handler attribute and executes no handler. The Opportunity page implementation was unchanged in this checkpoint; this is evidence for its existing escaping behavior.

The assignment count remains **55 `.innerHTML =` assignments across 15 pages**. The new tests do not close UI-008: output-context review and dedicated hostile fixtures for every material assignment remain outstanding. The exact code-and-test evidence is hosted run [#44544589481](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44544589481).


## Claim Decision workspace follow-up — 19 November 2026

Code/test commit `0ac9dc848554bf8fa7d397e684885892babec5b0` hardens `opportunity-decisions.html` at its fixture boundary:

1. Missing, non-array or malformed `decisions` collections normalize to an empty list.
2. Null, array and scalar rows are excluded before filtering or projection.
3. Search and visible fields accept supported scalar values only; malformed object/array values display as `Not supplied` rather than throwing or being interpreted as a status.
4. Decision badge styling remains limited to the fixed `Blocked`, `Rejected`, `Needs Investigation` and `Second Review` categories.
5. The browser regression injects hostile HTML text, malformed rows, object-valued status and a missing collection; it checks literal text, absence of injected elements/handler execution and the explicit zero-record state.

Hosted workflow [#44548354734](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44548354734) passed against verification head `3c00836e75d1d912871d8d7f87ce6f7629d42a19`: 121/121 headless tests and 24/24 specialist workspace interaction groups passed. This does not close UI-008; the 55-assignment source inventory still requires complete expression-level and output-context review.


## Current-branch reconciliation — 20 November 2026

**Snapshot ref:** `prototype/internal-demo` at `3d571866694b0d72f5c14a89d07b7e398664d6e4`  
**Purpose:** Reconcile the 19 November source inventory and review remaining material output contexts. This section supplements the dated 19 November record; it does not rewrite that historical snapshot.

### Recount

A fresh source-text scan of the same 21 prototype HTML pages listed above, pinned to this commit, finds **59 `.innerHTML =` assignments across 15 pages**. The other six listed pages have zero assignments.

The difference from the 19 November count of 55 is confined to `prototype/player-passport.html`:

| Page | 19 November inventory | 20 November snapshot | Difference |
|---|---:|---:|---:|
| `player-passport.html` | 4 | 8 | +4 |
| All other inventoried pages with assignments | 51 | 51 | 0 |
| **Total** | **55** | **59** | **+4** |

The four additional Passport assignments are fixed fallback markup for unavailable profile, claim, membership and timeline records. They do not interpolate fixture values. The four populated render paths continue to pass supported dynamic values through the page's `h()` escape helper. This is a source-count correction, not evidence of four new vulnerabilities.

### Hosted regression evidence at the snapshot ref

Workflow [#44739238739](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44739238739) (run #831) completed successfully against the exact snapshot commit above on 20 November 2026.

- 121/121 Node headless tests passed.
- 8/8 Discovery & Request Review browser groups passed.
- 8/8 workspace-hub browser groups passed.
- All 11 configured Playwright/Chromium browser smoke scripts completed successfully.
- The specialist workspace interaction suite passed 24/24 groups.
- The specialist run includes hostile-fixture regressions for Player Passport, the opportunity stage attribute, Guardian & Consent, Discovery & Request, and representative render paths in Tournament Manager, Tournament Day Operations, Tournament Organizer Portal and Match Statistic Reconciliation.

This is hosted regression evidence for the tested synthetic prototype at the exact commit. It is not a production security assessment, penetration test, authentication or authorization assessment, POPIA compliance finding, or safeguarding certification.

### Bounded output-context review

The following source paths were inspected at the snapshot ref. Line numbers refer to that commit.

| Area | Source observation | Test coverage and remaining limitation |
|---|---|---|
| Tournament Manager | `tournament-manager.html` lines 83, 130–145: the shared table renderer inserts prebuilt cell strings. Reviewed callers escape dynamic cell values with `esc()`; trusted `<code>` wrappers are static. The option-list renderer uses DOM nodes and `textContent`. The organizer-package importer stages records and bounds/validates key fields before committing state (lines 85–128). | Existing browser tests cover import/replay/collision behaviour and a hostile division-label form value. The specialist hostile-fixture regression does not yet exercise accepted hostile strings arriving through imported package fields. The table helper remains a caller-contract maintenance risk, not a confirmed injection defect in reviewed call sites. |
| Tournament Day Operations | `tournament-day-operations.html` lines 42, 60–74: the table helper inserts cell strings supplied by callers. Reviewed row builders escape dynamic fields; the appearance view also uses escaped values. Export serializes synthetic session data to a local JSON Blob with a fixed filename. | The specialist hostile-fixture regression exercises a match-report summary. It does not independently exercise every official, venue, coordinator, lineup, substitution, event and source field. No unescaped dynamic value was identified in the reviewed row builders. |
| Tournament Organizer Portal | `tournament-organizer-portal.html` lines 55–66: dynamic display values pass through `esc()`; `tag()` selects only fixed `good`, `no` or `pending` CSS classes and escapes the label. The option-list helper escapes both option values and labels. Export uses a local JSON Blob and fixed filename. | The specialist regression exercises hostile organizer and competition-name form values, including the ledger card. Other evidence and feature fields are escaped in the reviewed source but are not each independently challenged by that test. |
| Match Statistic Reconciliation | `tournament-stat-reconciliation.html` lines 14–18: event, stat and finding text is escaped; the review badge class is chosen from fixed internal categories; the review identifier is escaped before insertion into a data attribute. Export uses a local JSON Blob and fixed filename. | The dedicated browser test injects hostile event fields and checks literal text/no injected element. It does not yet independently inject hostile values into every statistic row and derived finding field. |
| Discovery & Request | `discovery-request.html` lines 87–121: review-stage cards are built with DOM nodes and `textContent`; the stage tone is derived from fixed values in `review-state.js` (`info`, `hold`, `waiting`, `pass`, `prohibited`). Dynamic summaries, gates, request queue fields and link labels are escaped. Link destinations are fixed relative paths; player/opportunity identifiers are encoded with `encodeURIComponent`. | Existing browser tests exercise hostile URL schemes/identifiers, handoff matching and hold behaviour. These are constrained prototype routes, not authorization checks. |
| Opportunity Register | `opportunities.html` line 26: dynamic text and the `data-stage` attribute are escaped; request handoff uses a fixed relative path and encoded identifiers. | A browser regression checks attribute breakout, injected element creation and event-handler execution. A query parameter does not grant access. |
| Vaal Ecosystem Coverage | `vaal-ecosystem-coverage.html` lines 90–91: external source URLs must parse as HTTPS, have a hostname and contain no username/password. New anchors use `noopener noreferrer` and `no-referrer`; row text is inserted using DOM nodes and `textContent`. | The browser regression checks rejected `javascript:` and HTTP schemes plus accepted HTTPS behaviour and opener/referrer protections. HTTPS validation is not a guarantee that every destination is reputable; sources remain research leads. |
| Export actions | The four tournament workspaces create JSON Blob URLs locally and use fixed download filenames. | The reviewed actions do not accept an externally supplied download URL or filename. This does not establish the safety of any future import/export feature. |

### Risk classification

**No confirmed exploitable injection was identified in the bounded paths reviewed at this snapshot.**

A maintainability risk remains in the shared table helpers: they accept raw HTML strings, so safety depends on each caller escaping dynamic fields and limiting raw markup to trusted static fragments. The reviewed callers observed here satisfy that convention. A typed-node or structured-cell renderer could reduce future caller error, but a refactor is not justified solely by the presence of `innerHTML` and is not proposed as an immediate change.

### Next test-only evidence to obtain

These are proposed test additions, not tests claimed as executed:

1. **Organizer-package import into Tournament Manager:** construct a schema-valid synthetic handoff whose free-text fields (for example organizer type/identity/authority, evidence type/status, or feature scope/status) contain hostile markup. Verify the data is shown literally, no element/handler is created, and the import's state change remains consistent. Separately verify fields that violate the importer’s explicit synthetic-label grammar are rejected without a partial import.
2. **Match Statistic Reconciliation:** inject hostile values into statistic-row fields and values that flow into derived findings, then verify literal text, fixed badge classes, no executable elements and no handler execution.
3. **Tournament Day Operations:** extend hostile fixtures beyond report summary to at least one representative official assignment and one match event/source path. The source review indicates their dynamic fields are escaped, but the current regression does not independently challenge them.
4. **Organizer Portal:** test hostile evidence and feature-scope/status values through their actual form-to-render paths, including the fixed status-class mapping.
5. **Final sink ledger:** record each remaining material assignment's source field, exact output context, sanitization/allowlist, exploitability assessment and specific test ID. Keep UI-008 open until this mapping and the applicable test coverage are complete.

No application code, workflow, prototype behaviour, schema or gate status was changed by this reconciliation. No implementation, production-readiness, legal-compliance or safeguarding claim is made.

## UI-008 regression follow-through — 20 November 2026

**Test commit:** `6b029ab0db68c6c9f90ca9cdd924fdaeda0c55e6`  
**Fixture-quoting correction:** `3f833ca2372bff877e9163c963f7b4761a1c0b43`  
**Verification head:** `3f833ca2372bff877e9163c963f7b4761a1c0b43`  
**Hosted workflow #834:** [run 44750805587](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44750805587) — completed successfully on 20 November 2026.

### Test additions and observed results

| Test file | Added challenge | Observed result |
|---|---|---|
| `prototype/tests/tournament-manager.browser-smoke.cjs` | Imports a valid package containing hostile text in organizer type/identity/authority, evidence type/status and feature scope/status; verifies source claims are preserved, no elements or handler execution result, and these side-collection values are not surfaced into visible HTML. A hostile organizer display name outside the synthetic-label grammar is rejected without partial mutation. | Passed. |
| `prototype/tests/tournament-stat-reconciliation.browser-smoke.cjs` | Injects hostile values into statistic fields and into a statistic ID copied into a derived finding; checks literal text, no injected elements/handler execution and the fixed `pending` badge class. | Passed. |
| `prototype/tests/tournament-day-operations.browser-smoke.cjs` | Injects synthetic hostile values into an official assignment and match event/source state, then calls the existing render path; checks literal text, no injected elements and no handler execution. | Passed. |
| `prototype/tests/tournament-organizer-portal.browser-smoke.cjs` | Adds hostile options to evidence and feature selects in the browser fixture, then uses the normal form submission and render handlers; checks literal text, fixed `pending` badge class, no injected elements/handler execution and data preservation in export. | Passed. |

**Important scope clarification — Tournament Manager:** the organizer, evidence and feature side-collection claims imported by this package are stored in the session state and export, but the current Manager interface does not render those side-collection strings into HTML. The new test therefore verifies inert data preservation and separately checks rejection of a hostile organizer display name. It is not evidence that an HTML escaping sink was exercised for those side-collection fields. The actual Manager HTML sinks remain the existing table and option-list paths documented above.

**Test-fixture limitations:** the Day Operations regression mutates synthetic page state directly to challenge the rendering path; it does not claim that hostile strings pass normal form validation. The Organizer Portal regression adds non-standard options to test selects and then exercises the actual submit/render handlers; it is an adversarial render fixture, not a claim that those values are available through the unmodified option lists.

### Hosted CI evidence

Workflow #834 ran against the exact verification head `3f833ca2372bff877e9163c963f7b4761a1c0b43` and reported:

- Node headless suite: **121/121 passed; 0 failed, 0 cancelled, 0 skipped**.
- Discovery & Request Review browser groups: **8/8 passed**.
- Workspace-hub browser groups: **8/8 passed**.
- Configured Playwright/Chromium browser smoke scripts: **11/11 invoked and completed successfully**, including all four modified scripts.
- Specialist workspace interaction groups: **24/24 passed**.

This verifies the tested synthetic prototype paths at this commit. It is not a complete expression-by-expression review of all 59 inventoried assignments, a penetration test, a production security assessment, an authentication/authorization review, a POPIA finding, or a safeguarding certification.

### Remaining UI-008 work

UI-008 remains **OPEN**. The next evidence requirement is the final sink ledger: for each material assignment, map its dynamic source, output context, escaping or allowlist, exact caller, and dedicated test (or an evidence-based explanation of why no untrusted dynamic value reaches that sink). The shared raw-cell table helper remains a caller-contract maintenance risk; no refactor or application-code change is justified by these test results alone.

No application code, UI behaviour, schema, workflow, MVP boundary, or gate status changed. No implementation or certification is claimed.

## Detailed sink register — 20 November 2026

The per-assignment mapping is now recorded in [UI-008-SINK-EVIDENCE-LEDGER-2026-11-20.md](./UI-008-SINK-EVIDENCE-LEDGER-2026-11-20.md). It enumerates all 59 assignments with stable sink IDs S001–S059, source targets, data fields, output contexts, escaping/allowlist controls and test evidence.

Reconciled at source/test head `c82e46d4147790ff2af33dc528763db44b2b0ce1`:
- 59 `.innerHTML =` assignments across 15 of the 21 inventoried HTML pages.
- 53 data-bearing assignments and six fixed fallback assignments (four Passport and two Day Operations timing fallbacks).
- The six pages with zero assignments are separately recorded; this is not a blanket security finding.
- Tournament Manager's eight tables, Day Operations' remaining tables/derived ledger, and Organizer Portal option/ledger renderers now have expanded hostile-fixture coverage.
- Hosted workflow [#836](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44752258562) passed against the exact source/test head above.

The map is completed, not a closure certificate. UI-008 remains OPEN because representative hostile-field coverage is not an exhaustive test of every property/context, the shared raw-cell table helpers retain a caller-contract maintenance risk, and future changes must be reconciled to the inventory.
