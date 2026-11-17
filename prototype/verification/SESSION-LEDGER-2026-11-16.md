# ScoutSA Session Ledger — 16 November 2026

**Branch:** `prototype/internal-demo`  
**Session date:** 16 November 2026  
**Scope:** synthetic-only internal prototype engineering and verification  
**Mainline effect:** none; no mainline gate or implementation authorization changed.

## 1. Session outcome

The Discovery & Request Review workspace now exposes a bounded synthetic audit-history test harness for `REQ-DEMO-001`. The user can select four scenarios:

- Baseline — preserves the original unverified source state.
- Valid synthetic history — supplies a structurally complete two-reviewer evidence and audit-event sequence.
- Missing audit history — removes the required event sequence and must fail closed.
- Invalidated evidence — revokes a required evidence version and must fail closed.

The harness is explicitly synthetic. It does not authenticate reviewers, verify real-world authority, establish evidence authenticity, or authorize disclosure. The review engine's disclosure boundary remains `disclosurePermitted: false`.

## 2. Changes committed

| Commit | Change |
|---|---|
| `48bde4292a2acd7c4a695a4347740520094efa7c` | Added synthetic discovery audit-history fixtures. |
| `1d9363c61db8dd161961fafc69c79aaa61a301cc` | Added scenario controls and wired synthetic audit contexts into Discovery & Request Review. |
| `8da81ba9220abebe640d6f187a82639f76afab1a` | Added browser regression coverage for valid, missing and invalidated audit history, reset/replay and disclosure remaining prohibited. |
| `4b4f556a87a600553dcc1d49f883002a73057dbd` | Corrected the baseline assertion to expect `Skipped — source not verified`, preserving the engine's actual source-verification gate semantics. |

## 3. Hosted verification

**Passing workflow:** [GitHub Actions run 43848921959](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43848921959)  
**Verified head commit:** `4b4f556a87a600553dcc1d49f883002a73057dbd`  
**Result:** completed successfully on 16 November 2026.

| Verification group | Result |
|---|---:|
| Node test suite | 121 passed, 0 failed |
| Discovery & Request Review browser smoke | 8/8 groups passed |
| Workspace hub/navigation browser smoke | 8/8 groups passed |
| Specialist workspace interaction browser smoke | 12/12 groups passed |

The new browser checks verify:
- valid synthetic review history passes the safeguarding-review gate only;
- independent organization, consent and player gates continue to hold;
- missing audit history blocks the safeguarding-review gate;
- invalidated evidence blocks the safeguarding-review gate;
- returning to baseline restores the original source-unverified/skip state;
- replaying the valid fixture does not retain stale UI state; and
- disclosure remains unavailable in every tested scenario.

A prior run, [43844140072](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43844140072), failed because the test expected the baseline safeguarding gate to say `Blocked`. The evaluator correctly returned `Skipped — source not verified`; the assertion was corrected without changing policy logic. The subsequent run above passed all configured suites.

## 4. Current product and assurance position

The prototype remains a static, locally openable browser demonstration with 11 specialist workspaces and fictional records. The review engine is v0.3.0 and the audit-history validator is v0.2.0.

The synthetic audit history is caller-supplied and in-memory. It is not durable, append-only, tamper-evident or cryptographically protected. Synthetic fingerprints are not cryptographic proofs. No real identity, age, guardian authority, consent, reviewer independence, evidence authenticity, organization authority or safeguarding status is established.

A passing synthetic evaluation means only that the declared fixture structure passes the evaluator. It is not a human decision, approval, selection, invitation, trial, placement, real-world safety determination or production authorization.

**UI-008 safe-rendering audit remains OPEN.** Do not connect external or user-supplied content to prototype renderers until the full interpolation/context audit, URL scheme policy review and malformed-fixture resilience work are complete.

## 5. Mainline and safeguarding boundaries

No mainline files or gate decisions were changed by this session. Mainline implementation remains on hold. Database execution, RLS, API, authentication, real identity processing, external-data ingestion, production deployment and real-world pilot activity remain unauthorized.

Non-negotiable safeguards remain:
- no real player/minor data, identity documents, private contact details, media or consent in the prototype;
- no direct private contact with minors and no public minor contact details;
- no player pays to be seen;
- no implication that synthetic verification is real verification; and
- no disclosure or contact capability is enabled by this work.

## 6. Next engineering sequence

1. Continue UI-008: inventory every dynamic HTML interpolation and output context across all specialist workspaces.
2. Verify escaping at the actual rendering sink, not merely helper-function unit tests; add hostile-string coverage to each relevant renderer.
3. Review URL construction and accepted schemes for all dynamic navigation/handoff destinations.
4. Test malformed and unexpected fixture shapes for resilient, fail-closed rendering without console errors.
5. Reconcile UI-008 findings into a claim/status ledger with file, line, sink, risk, mitigation and test evidence. Keep UI-008 open until every required item is verified.
6. Prepare a coherent synthetic partner-demo walkthrough and limitations sheet only after the UI safety review is complete.

## 7. Session conclusion

**The synthetic audit-history workflow is now wired into the Discovery & Request Review screen and its configured hosted tests pass.** This is a meaningful internal prototype milestone, not external validation or production readiness.

Governing principle: **A decision must never outlive the evidence that justified it.**


## 8. UI-008 safe-rendering follow-up — 16 November 2026

The rendering review continued on the isolated prototype branch after the audit-history verification.

### Changes and evidence

| Commit | Change |
|---|---|
| `9ed329efb74677e2e08abe77b90819cca74024c4` | Replaced the hub modal's dynamic HTML interpolation with DOM construction and `textContent`; added hostile metadata checks. |
| `c6ded049b16b07c74774495d7dadb68e2fc21147` | Added organization-membership status allowlisting and related hostile fixture assertions. |
| `9d09abd64d17793cc8e6101accf2bbb3aa9315c1` | Corrected the hub smoke test to exercise the visible player view; prior run exposed a test-selector issue. |
| `8a5ed7dcb81991e9361104c45013277ee1895bbb` | Added hostile URL-scheme and identifier regression checks for discovery and opportunity handoffs. |
| `beeba5f814ba327098db7ad29bfa603f8e2f0e26` | Added hostile fixture-string checks at actual rendering sinks across six specialist workspaces. |
| `bd263c1a4d8b6603363dd6ca7081b40b7b59ecc1` | Corrected assertions to account for prefixed rendered text. |
| `1151c957e6a6a5d6ffdcde070f25580ad8748e7c` | Extended actual-renderer hostile fixture checks to Coach & Academy and Opportunity Decisions. |
| `00c15d455cf1fe5a03cc417a4af908925a2d298c` | Corrected the academy action selector to target the direct action-text node. |

The failed intermediate runs were not counted as passes. They exposed test-harness assumptions about visible selectors and prefixed text; the assertions were corrected, and the subsequent hosted run passed.

**Latest hosted verification at this checkpoint:** [GitHub Actions run 43858250236](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43858250236), head commit `e95a79024ec3433ad408d69444ab08dd58fbbfa2`.

| Verification group | Result |
|---|---:|
| Headless policy/documentation suite | 121/121 passed |
| Discovery & Request Review browser smoke | Passed |
| Workspace hub/navigation browser smoke | 8/8 groups passed |
| Specialist workspace interaction browser smoke | 14/14 groups passed |

The 14 specialist browser groups include hostile URL/identifier checks and hostile fixture-string rendering checks across Player Passport, Opportunity Evidence, Safeguarded Invitations, Player–Opportunity Matching, Development Pathways, Guardian & Consent, Coach & Academy, and Opportunity Decisions. The helper-level hostile-string/nullish-value check executes across all 11 workspaces. Organization Membership and Opportunity Management have separate existing hostile metadata/handoff coverage.

### Remaining scope — UI-008 stays OPEN

The successful run is evidence for the tested cases only. It does not establish that every one of the 29 identified dynamic HTML assignment sinks has been exercised with hostile fixture data, nor does it close every output-context question.

Still required:
- map each dynamic interpolation to its precise HTML, text, attribute, URL, CSS-class or other output context;
- extend actual-renderer hostile tests to the remaining profile-field, option, dimension, rules/limits, opportunity-record and discovery-gate sinks;
- test malformed and unexpected fixture shapes (including null, missing, object/array and invalid enum values) for fail-closed behavior and absence of uncaught errors;
- complete the URL-construction and accepted-scheme review;
- reconcile every finding to a file/line/sink/risk/mitigation/test-evidence ledger.

No real or user-supplied content may be connected to these renderers while UI-008 remains open. No mainline files, gate decisions or implementation authorizations were changed.


## 9. Additional sink coverage and inventory — 16 November 2026

The subsequent specialist browser run [43856700124](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43856700124) passed **15/15 groups** and the 121-test headless suite. It added actual-renderer hostile-fixture checks for:
- Player Passport profile fields;
- Player–Opportunity Matching dimension descriptions;
- Guardian & Consent rules and limits; and
- Opportunity Management title, organization identity, source and detail fields.

The current static inventory counts **29 `innerHTML` assignment sinks** across the 11 specialist HTML workspaces. The hub has no `innerHTML` assignment in the inspected page; its modal now uses DOM construction and `textContent`.

| Workspace | Sinks | Current hostile-renderer evidence |
|---|---:|---|
| Player Passport | 4 | Profile fields, claims, membership content and timeline detail tested. |
| Organization Membership Review | 2 | Organization list and membership records tested. |
| Opportunity Management/Register | 1 | Title, organization identity, source and detail tested. |
| Opportunity Evidence Review | 1 | All interpolated evidence fields tested with hostile fixture text, including source, authority, status, corroboration, dates and next action. |
| Opportunity Decision Worksheet | 1 | Claim scope, opportunity context, reviewer and rationale tested. |
| Safeguarded Invitation Workflow | 1 | Opportunity, gate note and hard-stop text tested. |
| Player–Opportunity Matching Review | 2 | Pair renderer and dimension renderer tested. |
| Player Development Pathway Tracker | 3 | Stage, player-list and player-select option sinks tested. |
| Coach & Academy Workspace | 4 | Membership, opportunity, evidence-action and boundary sinks tested. |
| Guardian & Consent Workspace | 5 | Case cards, case details, purposes, rules and limits tested. |
| Discovery & Request Review | 5 | Summary, gate label/detail, request-list and rules tested with hostile values; URL/handoff sink checked against hostile identifiers and unsafe schemes. |
| **Total** | **29** | **Partial coverage; not a closure claim.** |

This table is a working test-coverage inventory, not a finding that every sink is vulnerable or safe. All identified sinks currently use escaping helpers or fixed/allowlisted presentation values on the inspected paths, but output-context correctness and malformed-fixture behavior remain open.

Next: close the untested rows with actual-renderer hostile fixtures; then exercise null, missing, object/array and invalid-enum fixture values; finally complete the URL scheme and attribute-context review. UI-008 remains OPEN.


## 10. Follow-up renderer coverage — 16 November 2026

[GitHub Actions run 43857127472](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43857127472), commit `8c61e140c531ba32594d7b29151d7c7e584e95a5`, passed the 121-test headless suite, Discovery & Request Review, hub/navigation 8/8 and specialist workspace interactions 15/15.

Additional actual-renderer checks now cover:
- Passport timeline detail;
- organization-list names;
- Guardian case-card player references;
- pathway player-list names; and
- Discovery request-list purpose, summary player reference/purpose and workflow rules.

The inventory table in section 9 has been updated to reflect those tested sinks. Remaining targeted gaps include the pathway select-option sink, discovery gate-content sink, and remaining individual fields within the evidence renderer. The 29-sink inventory remains a scoped regression map, not a security sign-off.

No product code or mainline authorization changed in this follow-up; changes were limited to prototype browser tests and documentation.


## 11. Evidence and pathway sink follow-up — 16 November 2026

[GitHub Actions run 43857430464](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43857430464), commit `1f37eea8c455f05ff0de01c7e93fb91e90d090fd`, passed **121/121** headless tests, the Discovery & Request Review browser suite, hub/navigation **8/8**, and specialist interactions **15/15**.

New actual-renderer hostile-fixture checks cover the full set of interpolated fields in the Opportunity Evidence renderer (label, opportunity/type, state, submitter, source, authority, checked date, corroboration, next review, limitation and next action) and the Player Development player-select option text. The sink inventory above now records those checks.

The remaining explicitly identified hostile-value gap in that inventory is the Discovery & Request Review gate-content sink. URL/link scheme and handoff identifier checks remain a separate test concern. UI-008 remains OPEN pending the remaining gate-context test, final output-context review, malformed fixture-shape testing and any further issues those checks reveal.


## 12. Discovery gate sink and 29-sink regression checkpoint — 16 November 2026

[GitHub Actions run 43857931298](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43857931298), commit `7e2da1cf0dfaf7de1bd78c31658fb4f9ff8a4d9f`, passed **121/121** headless tests, Discovery & Request Review browser smoke, hub/navigation **8/8**, and specialist workspace interactions **15/15**.

The Discovery & Request Review gate sink now has a hostile-value regression check for both gate label and detail. The test injects a wrapper only after the ordinary page has rendered, then triggers the normal scenario-change event so the real renderer rebuilds the gate list. The earlier pre-initialization interception attempt failed to render the summary and was discarded; it is not counted as evidence.

At this checkpoint, all **29 inventoried HTML assignment sinks** have targeted rendering or URL-policy regression evidence:
- text/data sinks have hostile fixture values exercised at the actual renderer;
- the fixed-local-link sink has hostile identifier and unsafe-scheme regression checks; and
- the hub modal's prior dynamic HTML construction has been replaced with DOM construction and `textContent`.

This is a coverage milestone, not closure of UI-008. Remaining work is now concentrated on output-context correctness across HTML/text/attribute/URL/CSS contexts, malformed and unexpected fixture-shape resilience, and a complete accepted-scheme/navigation review. No external or user-supplied content may be connected while UI-008 remains open. Mainline remains untouched and its gates remain unchanged.


## 13. Malformed scalar fixture regression — 16 November 2026

[GitHub Actions run 43858250236](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43858250236), commit `e95a79024ec3433ad408d69444ab08dd58fbbfa2`, passed **121/121** headless tests, Discovery & Request Review, hub/navigation **8/8**, and specialist interactions **15/15**.

A real Opportunity Evidence renderer test now supplies a null label, undefined authority, object-valued source, array-valued next action and unknown state enum. The renderer preserves the invariant that these values remain inert text or empty text; no injected element is created and the browser smoke suite reports no uncaught page/console errors.

This is scalar-value resilience evidence only. Missing records, malformed collections, null nested arrays, missing nested objects and cross-field inconsistency still need explicit fail-closed tests. UI-008 remains OPEN.


## 14. Tournament operations prototype — 16 November 2026

The isolated prototype session expanded the Tournament Manager beyond tournament/edition relationships and organizer handoff. The work remains synthetic, browser-local and non-production.

### Changes completed

**Organizer handoff**
- Added a manual JSON export from the Organizer Portal and import into the Tournament Manager.
- The handoff validates its contract version/source, required arrays, synthetic identifiers, linked organizer/evidence/feature records, duplicate IDs and tournament collisions.
- Edition import is designed to be idempotent.
- Missing venue information is represented explicitly as `DEMO-VENUE-UNSPECIFIED`; the import does not invent divisions, teams, coaches, players, fixtures or statistics.
- This is a file-based manual handoff, not shared persistence, synchronization, authentication or an API.

**Competition eligibility review**
- Added a review record linked to a specific PlayerParticipation, player, team entry, division and tournament edition.
- Captures synthetic evidence state, decision, rule reference, reviewer label and note.
- The status “Eligible for human review” is not an eligibility certification. Reviews are participation/competition scoped, not permanent player attributes.
- No date of birth, identity document or real player data is used.

**Roster controls**
- Added optional squad numbers (1–99) and roster states to synthetic player-participation entries.
- Duplicate squad numbers are blocked within the same team entry.
- Statistical observations are blocked for entries whose roster status is not “Registered (demo only)”.
- These controls do not prove official registration, disciplinary standing, eligibility or permission to participate.

### Files and commits

Relevant implementation and supporting commits on `prototype/internal-demo`:

| Commit | Change |
|---|---|
| `3fada5d5c634a265de0a283ee7bb5a65c888ec98` | Link Tournament Manager to Organizer Portal. |
| `ed847034e1dc0c71018c7dbd4231acb11c517007` | Add evidence-aware tournament eligibility review prototype. |
| `4bbb6174861aad96c0816f100eabd1f84d6acccf` | Test tournament eligibility review workflow. |
| `50160dbe8ca3b12ad45f78bd7ea5e293608633c3` | Document tournament eligibility review prototype boundary. |
| `fa2e291f0aa765acf61665bb01398079ed69209b` | Add roster status and squad number controls to Tournament Manager. |
| `2575a0493a0d9585e7e988d042a2784e238b21f6` | Test squad-number uniqueness and roster-status statistics gate. |
| `ec94bb4cbd9839e7f30bd3f552cbb515739ecac0` | Document roster status and squad-number constraints. |
| `1375c43efda79e89deea8fc75f5d8c69dc25100c` | Update prototype README for roster controls. |

Supporting documents include:
- `prototype/TOURNAMENT-ELIGIBILITY-REVIEW-MODEL.md`
- `prototype/TOURNAMENT-ORGANIZER-PORTAL-MODEL.md`
- `prototype/README.md`
- `prototype/tests/tournament-manager.browser-smoke.cjs`
- `prototype/tests/tournament-organizer-portal.browser-smoke.cjs`

### Verification status at session close

The hosted workflow state is **not green for the latest tournament-manager changes**.

- Run [43884577504](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43884577504), on earlier commit `d7ba32544f829e8d5edfc7e7bfea4c3bdb84d308`, failed at the Tournament Manager browser smoke step. The headless policy/documentation suite and earlier browser steps passed; subsequent steps were skipped. The failure's exact cause was not established in the available run summary.
- Run [43885533847](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43885533847), for commit `2575a0493a0d9585e7e988d042a2784e238b21f6`, completed as **cancelled**. Its headless policy/documentation suite, Discovery browser smoke, hub/navigation smoke, player journey preview, Vaal ecosystem coverage and tournament relationship hub smoke steps passed; the Tournament Manager browser step was cancelled, so the new manager changes were not fully verified.
- Run [43885571827](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43885571827), for latest recorded commit `1375c43efda79e89deea8fc75f5d8c69dc25100c`, also completed as **cancelled**. The same earlier steps passed, but the Tournament Manager browser step was cancelled.

Therefore, do not describe the eligibility and roster workflows as fully browser-verified. The Node/headless checks passing in cancelled runs do not substitute for completion of the full browser workflow. A fresh, non-cancelled run is required; inspect and resolve the earlier Tournament Manager failure before claiming the suite passes.

### Boundaries unchanged

All work above is limited to synthetic prototype fixtures on `prototype/internal-demo`. Mainline remains untouched. No database schema, persistence, authentication, authorization, RLS, API, real-world eligibility decision, official registration verification, safeguarding approval, external organizer partnership or production/pilot authorization is created by these changes.

### Next engineering step

First obtain a complete, non-cancelled browser run for the current Tournament Manager and Organizer Portal flows. If it fails, inspect the precise failing assertion and correct the test or prototype behavior before expanding scope. Once verified, the next proposed feature is Squad & Match-Day Integration: link registered roster participation IDs to lineups, starters, substitutes, captain assignments, appearances and minutes, with provenance retained through statistic reconciliation. This remains proposed work, not completed functionality.


## 15. Tournament statistic validation regression — 17 November 2026

A test-only follow-up was committed to the isolated prototype branch.

| Commit | Change |
|---|---|
| `2f65bbf2ed1c4970cd28c81598f4e173fc40777f` | Reintroduced an explicit browser assertion for fractional count rejection, with every form field selected explicitly; asserts that rejected input creates no statistic, then checks a valid whole-number count. |

The earlier Tournament Manager browser failure is now understood at the assertion level: the failed run reported that the test expected the count-validation message but received a successful statistic-recording message. The old test sequence did not explicitly re-select the metric after the preceding successful form submission/reset. The revised regression makes the metric selection explicit and checks both rejection/no-write and valid-write behavior.

**Verification status:** pending. The GitHub connector did not return a workflow run or status check for commit `2f65bbf2ed1c4970cd28c81598f4e173fc40777f`. No browser pass is claimed. The Tournament Manager, Organizer Portal, Tournament Day Operations and statistic-reconciliation workflows remain unverified at this new head until a complete, non-cancelled hosted run is inspected.

No application behavior, mainline file, schema, gate or implementation authorization changed in this test-only follow-up. All records remain synthetic and browser-local.

## 16. Derived player appearances and minutes — 17 November 2026

A focused match-day extension was added to the isolated prototype branch.

### Changes

- Added an Appearances & Minutes view to Tournament Day Operations.
- Derives starter intervals from minute 0 to either the recorded substitution-out minute or configured match duration.
- Derives substitute intervals from the recorded substitution-in minute to match duration; a later substitution-out is considered if present.
- Displays fixture, lineup ID, participation ID, derived status, start/end minute, minutes and contributing lineup/substitution IDs.
- Enforces a whole-number match duration between 1 and 150 minutes. A substitution minute beyond the selected duration, or an invalid interval, suppresses the totals.
- Does not infer appearances from goals, cards or other events; unused players receive zero minutes.

### Commits

| Commit | Change |
|---|---|
| `12d3f94c5ccc72a2e1ec8a455df8b8599613f08b` | Added derived appearance/minutes view to Tournament Day Operations. |
| `fd5c773d4fbfcb9316f5f9d2176aa866b4ed20f7` | Made invalid-duration and invalid-timing states explicit in the view. |
| `ad141dba626bdb187190be1f1876039043df5a1e` | Added browser regression assertions for starter, substitute and full-match minutes plus invalid-duration fail-closed behavior. |
| `1c9829ae618a5c7c2d285102166d590b5e34862c` | Tightened browser assertions to inspect each participation row and exact derived totals. |
| `2c9abe0cd8de884707ab599a62848c75539eac1e` | Updated prototype README and CI verification caveat. |
| `e82ee63fa84e86acb6132e1edbdd7428c432e431` | Documented derived minute semantics and known limitations in the Tournament Day Operations model. |

### Verification status

The new browser regression test is committed, but the GitHub commit-status lookup returned no status entries for the test commit and no fresh hosted workflow result has been confirmed. The test has not been executed in this session. **Do not claim this feature or the full Tournament Day Operations suite is browser-verified yet.** The earlier hosted Tournament Manager failures/cancellations recorded in section 14 remain separate and unresolved until a complete run is inspected.

### Boundaries

This is a session-only synthetic calculation, not a new database entity, official appearance record, verified performance statistic or production feature. The simple interval model does not yet handle competition-specific extra-time periods, abandoned/restarted matches, temporary dismissals or return substitutions. Mainline, schema and gate decisions remain unchanged.
## 17. Appearance interval correction and substitution-duration guard — 17 November 2026

A follow-up review identified an edge case in the derived interval logic: if a substitute later becomes the outgoing player, the calculation must prefer the recorded entry minute over treating the changed lineup status as an original starter. The calculation now gives the linked incoming-substitution record precedence and fails closed for inconsistent `Entered`/`Substituted` states without the corresponding relationship.

A second browser scenario now starts from a fresh page, configures a 60-minute match, attempts a substitution at minute 65, and asserts that the operation is rejected without creating a substitution row.

| Commit | Change |
|---|---|
| `b15b60cb611c31e4db83647783fae7869782fac4` | Corrected derived interval precedence for a player with an incoming substitution record. |
| `a4d74a4a70b54d62a677f6bab793ebb2816cc173` | Added a fresh-session browser assertion that an out-of-range substitution is rejected without a write. |

**Verification remains pending:** no hosted browser run has been confirmed for these commits. The new test is committed, not reported as passed. Mainline and implementation gates remain unchanged.