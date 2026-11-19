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
