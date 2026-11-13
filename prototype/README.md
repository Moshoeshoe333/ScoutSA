# ScoutSA Internal Web Prototype

**Branch:** `prototype/internal-demo`  
**State as at:** 2026-11-13  
**Purpose:** isolated synthetic-data design and policy-evaluation prototype only.

This directory contains the original responsive browser demonstration plus focused synthetic review workspaces. It is not a production application and does not change mainline implementation holds.

## Current review-engine status

- Engine: `review-engine.js` **v0.2.0**.
- Headless suite: `node --test prototype/tests/*.test.js`.
- Current recorded engine-suite result: **40/40 passed** on 2026-11-12 in an isolated Node v26.12.1 execution environment (70.59 ms).
- Documentation-integrity suite: **8 checks declared** alongside 40 engine tests (48 total source declarations); the 48-declaration suite passed hosted verification on [run 43409104888](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409104888), commit `14bcabb84e58fa8f286887d4125cddb6ee6a282e`. The prior 46-declaration suite passed hosted GitHub Actions on [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544), commit `50566e1902b9fa409515103bc81511f4af638881`. The historical 47-declaration baseline passed hosted GitHub Actions on [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367), commit `25108a07320a2e70cd86573a4d950024b8211273`. See [CI verification record](verification/documentation-integrity-ci-2026-11-13.md).
- The v0.2.0 Discovery & Request Review browser smoke test passed **7/7 groups**, and the unified workspace hub/all-workspace browser smoke test passed **8/8 groups**, using Playwright/Chromium on [hosted run 43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388), commit `7eb60f651363dfc3b569e2be80da187007a75d2d`. The run also passed all 48 headless tests. The earlier 32/32 browser result belongs to the v0.1.0 baseline and is historical only.
- Recorded 45-test CI baseline: [run 43401941704](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401941704) is historical (40 engine + 5 documentation checks). Historical 46-test CI verification: [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544). Historical 47-test CI baseline: [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367). The workflow executes both Playwright/Chromium browser smoke scripts after the 48-test headless suite.

The engine can only produce a separate-human-review disposition. It always returns `disclosurePermitted: false`. Its fixtures and projections are synthetic; it is not authentication, authorization, a security boundary or a production policy service.

See:
- [Review engine contract](REVIEW-ENGINE-CONTRACT.md) — draft, not ratified.
- [Verification record](verification/discovery-request-browser-verification-2026-11-12.md).
- [Current gate status](../docs/00-gate-status.md).
- [Documentation integrity and error prevention](../docs/engineering-integrity.md).


## Open locally
Open `index.html` in a modern browser. No build step or package installation is required.

## Run the browser smoke tests

Open `smoke-tests.html` in the same folder as `index.html`, then select **Run smoke tests**. The test page loads the prototype in an iframe and checks its demo labels, sample records, player search, safeguarding view, passport modal, and Escape-key close behavior. These are local UI smoke checks only; they do not test a backend, authorization, RLS, privacy, or legal compliance.

## Scope of this prototype
- Responsive overview dashboard
- Player discovery cards with client-side search and filters
- Fictional player passport detail modal
- Illustrative opportunity detail modal
- Sample organization directory
- Trust and safeguarding information view
- Mobile navigation

## Explicit limitations
- All names, counts, organizations and opportunities are fictional.
- No backend, database connection, authentication, account creation, uploads, messaging, applications or contact actions exist.
- No real player or minor data may be entered.
- No verification, guardian consent, legal compliance, access-control or safeguarding capability is implemented by this UI.
- The UI is a demonstration artifact, not a production service or evidence of product-market fit.

## Next engineering gates
1. Reconcile this prototype against the canonical domain and relationship models.
2. Define a non-production backend boundary and synthetic-data contract.
3. Resolve access-policy and safeguarding requirements before connecting any real data.
4. Add automated accessibility, interaction and security tests.
5. Obtain qualified review before any real-world pilot involving people, especially minors.

## Player Passport prototype

Open `player-passport.html` to inspect the focused Passport experience. It uses two fictional sample records and separates football profile, Assertions and supporting Evidence, Membership history, Verification status, Football Readiness and Opportunity Readiness. It does not calculate readiness or claim any sample is verified.

Open `player-passport-smoke-tests.html` to run local interface smoke checks. These checks are not security, authorization, privacy, legal-compliance or backend tests.

## Development boundary

See [DEVELOPMENT-BOUNDARY.md](./DEVELOPMENT-BOUNDARY.md). Internal development does not have to wait for external validation. We may continue building and testing clearly labelled synthetic-data prototypes and authorized non-production components while outreach remains open. External feedback, if received, is an input to review rather than a prerequisite or automatic ratification. This decision does not lift database, RLS, access-policy, safeguarding, legal, real-data, deployment or production holds.

### Structured sample data and activity timeline

The Passport fixture is loaded from `data/player-passports.demo.js`, separate from the presentation markup. The Activity timeline combines dated synthetic claim and membership entries for display only. It is explicitly **not** an audit log and must not be represented as proof that an event occurred. The browser smoke-test page includes checks for the timeline's presence and warning.


## Organization membership review prototype

Open `organization-memberships.html` to inspect the read-only organization and membership review screen. It uses a separate synthetic fixture at `data/organization-memberships.demo.js` and demonstrates Pending, Active, Ended and Disputed workflow states, organization identity status, claim authorship, evidence descriptions and a separate verification field. An Active workflow state is not proof of a verified affiliation.

Open `organization-memberships-smoke-tests.html` to run local rendering and filtering checks. These checks have not been represented as executed until run in a browser, and they do not test authorization, RLS, security, privacy, safeguarding, verification or legal compliance. The page contains no create, edit, approve, reject, contact or other mutation actions.


## Opportunity management prototype

Open `opportunities.html` to inspect a read-only opportunity register backed by `data/opportunities.demo.js`. The synthetic examples distinguish a proposal, an identified organization, verification, eligibility, safeguarding, invitation and outcome fields. These are demonstration review dimensions, not ratified lifecycle states or completed checks. All examples remain fictional and unverified; no public listing, invitation, application or contact action exists.

Open `opportunities-smoke-tests.html` to run local rendering and filtering checks. They have not been claimed as executed until run in a browser and do not test authorization, RLS, security, publication, safeguarding or legal compliance.


### Opportunity register metric integrity

The opportunity register summary counts are derived from the synthetic fixture at page load: total records, organization-identified stage, explicitly verified records and issued invitations. The smoke-test page checks these values against the fixture. This is client-side demo behavior only and is not a trusted reporting or authorization control.


## Opportunity evidence review prototype

Open `opportunity-evidence.html` to inspect a read-only evidence ledger using synthetic descriptions only. It separates submitter, source, source authority, review time, independent corroboration, limitations and next action. Missing, unreviewed, insufficient and conflicting evidence remain distinct. No real document is uploaded, opened, authenticated or retained; no evidence decision or publication is enabled.

Open `opportunity-evidence-smoke-tests.html` to run local rendering, count and filter checks. These are UI checks only and do not validate evidence, identity, source authority, security, privacy, safeguarding or legal compliance.


## Opportunity review decision worksheet

Open `opportunity-decisions.html` to inspect the human-controlled, claim-scoped decision worksheet. It distinguishes Received, In Review, Accepted for Claim, Rejected, Needs Investigation, Second Review and Blocked. A decision requires a specific claim, reviewer identifier and written rationale. “Accepted for Claim” applies only to that exact claim and does not establish broader identity, organization legitimacy, opportunity safety or safeguarding status.

The worksheet's new entries exist only in page memory and disappear on reload. The initial records are fictional examples, not an audit log. No automated scoring, evidence authentication, approval, publication, invitation or contact action exists.

Open `opportunity-decisions-smoke-tests.html` for local UI checks. These have not been claimed as executed until run in a browser. They do not test persistence, audit integrity, authentication, authorization, RLS, security, privacy, safeguarding, evidence authenticity or legal compliance.


## Safeguarded opportunity invitation workflow

Open `safeguarded-invitations.html` to inspect a fail-closed, read-only invitation gate model. It separates source/current validity, organization and representative authority, opportunity-specific eligibility, guardian authority and consent, safe communication, safeguarding/supervision, venue/transport safety, and independent authorization. Under-18 and unknown-age scenarios require guardian safeguards; direct private contact with minors is prohibited in the model. The sample cases are fictional and deliberately held; no invitation-ready case is asserted.

The page has no player selection, contact, invitation, payment or mutation controls. Its readiness function is a local illustrative rule, not a production policy engine or evidence of real checks. FIFA licensing, safeguarding, consent, identity and legal requirements are not verified by this prototype.

Open `safeguarded-invitations-smoke-tests.html` for local fixture/UI checks. These checks do not test age assurance, consent, safeguarding, identity, authorization, RLS, persistence, security or legal compliance.


## Player–opportunity matching review prototype

Open `player-opportunity-matching.html` to inspect a private, explainable triage register of fictional Player Passport and opportunity pairs. Six review dimensions are shown separately: opportunity requirements, football-profile evidence, geographic feasibility, availability, membership/authority, and safeguarding/eligibility. Missing information remains explicit; there is no composite score, ranking, shortlist recommendation, public exposure or invitation.

The current fixture deliberately supports zero match decisions. Existing player position and area labels are synthetic and unverified; opportunity eligibility criteria, dates, age, availability, venue and safe transport are not established. Under-18 or unknown-age safeguards remain a hard stop. A potential position or geographic overlap is not proof of suitability.

Open `player-opportunity-matching-smoke-tests.html` for local fixture/UI checks. They have not been represented as executed until run in a browser and do not validate ability, eligibility, identity, age, consent, safeguarding, privacy, authorization, RLS, persistence or legal compliance.


## Player development pathway tracker

Open `player-development-pathways.html` to inspect a six-stage, synthetic pathway storyboard: Passport foundation, Evidence collection, Membership review, Development assessment, Opportunity review and Outcome record. Each stage shows its illustrative state, evidence limitations and a responsible next step. The sample data is fictional and is not a record of real activity, an audit log, a talent score, a selection decision or a promise of opportunity.

Football Readiness and Opportunity Readiness remain distinct. Age is not supplied in the sample passports; any real process must apply under-18 safeguards until age is reliably established. No contact, invitation, publication, assessment submission or outcome mutation is enabled.

Open `player-development-pathways-smoke-tests.html` for local fixture/UI checks. They have not been represented as executed until run in a browser and do not validate real development, identity, evidence, age, consent, safeguarding, authorization, privacy, persistence or legal compliance.


## Coach and academy workspace

Open `coach-academy-workspace.html` to inspect a read-only, organization-scoped workspace using a fictional academy. It summarizes organization identity and authority status, membership-claim workflow states, opportunity proposals and outstanding evidence actions. It intentionally shows no player roster, player names, contact details, Passport contents or individual readiness information.

The workspace communicates a critical product boundary: an academy or coach role does not grant general permission to view player information. Organization identity, representative authority, membership claims, opportunity source, eligibility and safeguarding are separate review concerns. The page has no authentication, authorization, tenant isolation or RLS; its displayed scope is illustrative only and is not technically enforced.

Open `coach-academy-workspace-smoke-tests.html` for local fixture/UI checks. They have not been represented as executed until run in a browser and do not validate real identity, role authority, access control, privacy, safeguarding, persistence or legal compliance.


## Guardian and consent workspace

Open `guardian-consent.html` for fictional, read-only consent scenarios. It distinguishes age state, guardian authority, the player's voice, overall consent, purpose-specific permissions, expiry, withdrawal and disclosure. Unknown age is handled with under-18 protections. The page does not collect signatures, identity documents, contact details or real consent.

The fixture and interface are synthetic only. No authentication, secure storage, notifications, authorization, audit log or access enforcement exists. Do not use this prototype to collect real consent or personal information. Open `guardian-consent-smoke-tests.html` for local UI/fixture checks; these have not been represented as browser-executed.

See `PRODUCT-DECISION-GATE.md` for the conditional A/B/C product strategy: narrow MVP, redesign, or pause/pivot. No path is currently validated by external stakeholder evidence; the 6–10 week Vaal pilot is a planning hypothesis subject to all release gates.


## Discovery and request review prototype

Open `discovery-request.html` to inspect a read-only flow connecting synthetic Player Passport references, purpose-specific consent scenarios, organization identity, a specific opportunity, opportunity evidence and invitation safeguards. Three fictional request scenarios are shown; all remain `HOLD — NOT SUBMITTABLE`. The review gates are explicit, and the screen distinguishes a request for consideration from an invitation, selection, trial, placement or guarantee. It does not expose player contact details or permit disclosure.

The fixture at `data/discovery-requests.demo.js` contains only fictional opaque references. The page links to the related prototype workspaces but does not submit, create or persist requests. Unknown age remains subject to under-18 protections; no direct private contact with minors is enabled.

Open `discovery-request-smoke-tests.html` to run the original local smoke page. The current automated Chromium browser test is `prototype/tests/discovery-request.browser-smoke.cjs`; it is run in CI by installing Playwright 1.56.1, Chromium and the browser dependencies, then executing `node prototype/tests/discovery-request.browser-smoke.cjs`. The 2026-11-12 private-repository browser-access limitation is historical; the hosted browser test now executes against the checked-out branch in GitHub Actions. The current browser evidence is recorded in `verification/discovery-request-browser-verification-2026-11-13.md`. These are synthetic prototype checks only; they do not test authentication, authorization, tenant isolation, RLS, secure storage, audit integrity, evidence authenticity, age assurance, real consent validity, safeguarding effectiveness, accessibility conformance or legal compliance.

The UI now renders from `review-engine.js` (version 0.2.0), a UI-independent synthetic evaluator with twelve gates, explicit actor-legitimacy precedence, lifecycle/expiry checks and stable reason codes. Consent, guardian-authority and player-voice evaluation are skipped until organization identity and representative authority both pass. Every time-sensitive evaluation receives an explicit clock value. The UI passes minimal pseudonymous projections to the engine rather than full Passport, membership or opportunity fixture objects; this is data minimization in a synthetic client, not a security boundary. A result can reach only `READY_FOR_SEPARATE_HUMAN_REVIEW`; the prototype always returns `disclosurePermitted: false`.

The headless suite is `node --test prototype/tests/review-engine.test.js`; `.github/workflows/prototype-policy-tests.yml` is configured to run it on relevant prototype changes. The draft backend gate contract is in `REVIEW-ENGINE-CONTRACT.md`, with input and result JSON Schemas under `contracts/`. It is not ratified and is not backend implementation. No production implementation gate is lifted. Do not enter real personal information or use this prototype to collect consent or manage real requests.


## Affiliation evidence model proposal

See [Affiliation Evidence Model — Proposal](AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md). It distinguishes player-reported experience, community-coach attestation and formal organization records without treating them as trust tiers. **This is not ratified and does not change the current verified-membership rule or authorize implementation.**


## Opportunity-specific evidence acceptance matrix

See [Opportunity Evidence Acceptance Matrix](OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md). It proposes candidate evidence handling for community sessions, recurring community programmes, academy assessments, formal club/league registration, scouting observation and funded development opportunities. It is a decision aid only: **not ratified, not an eligibility policy, and not authorization to change the review engine or mainline.**


## Opportunity requirement declaration proposal

See [Opportunity Requirement Declaration](OPPORTUNITY-REQUIREMENT-DECLARATION.md). It proposes the information an opportunity owner should disclose before independent review: owner and representative authority, the actual offer, mandatory criteria versus preferences, claim-specific evidence, safeguarding, privacy, stage transitions, disputes, expiry and change control. It is a requirements template only: **NOT RATIFIED; no implementation, publication, invitation or player-data processing is authorized.**


## Opportunity validation scenario pack

See [Opportunity Validation Scenario Pack](OPPORTUNITY-VALIDATION-SCENARIO-PACK.md). It contains 14 fictional adversarial cases and a reviewer worksheet for stress-testing evidence, fairness, authority, safeguarding, privacy and lifecycle boundaries. It is a research/validation proposal only: **NOT RATIFIED; no implementation or real-world player processing is authorized.**
\n\n## Optional Vaal stakeholder validation interview guide\n\nSee [Vaal Stakeholder Validation Interview Guide](VAAL-STAKEHOLDER-VALIDATION-INTERVIEW-GUIDE.md). This is a parked, non-ratified research instrument for use if stakeholders respond. **External validation is non-blocking:** ScoutSA internal development continues without waiting for interviews. No interviews are claimed to have occurred, and this guide does not authorize real player data or pilot activity.\n

## Unified workspace hub

Open `index.html` as the main synthetic demonstration entry point. Its workspace hub links to all 11 existing review journeys: Player Passport, membership review, opportunity management, evidence review, decision worksheet, safeguarded invitations, matching, development pathways, coach/academy workspace, guardian/consent and discovery/request review. The individual pages remain separate static prototypes; the hub does not imply shared authentication, backend, persistence, role enforcement, live submissions or contact capability. The 48-test headless suite checks the documented inventory and return-link presence. The additional Playwright/Chromium browser suite actually clicks all 11 hub cards, renders each specialist page, follows each return-to-hub link, checks representative Passport/guardian/pathway controls, verifies the hub's view navigation and primary call-to-action, checks the mobile menu, confirms each destination resolves, and tests the hub plus all 11 screens at a 390px viewport without horizontal overflow. Hosted run [43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388) passed all 48 headless tests, 7/7 request-review browser groups and 8/8 workspace-hub browser groups.


## Connected Passport → Opportunity Discovery → Request Review journey

From `player-passport.html`, choose either fictional sample Passport and open **Browse synthetic opportunities**. The selected opaque demo reference is carried to `opportunities.html`; the register shows the selected Passport context and exposes a request-review link only when the fixtures contain that exact player–opportunity pair. `discovery-request.html` then filters to that exact pair and links back to both the Passport and opportunity register. Unrecognized references, incomplete handoffs (including an opportunity parameter without a player parameter), empty parameters and unmatched pairs fail closed; no request is created. The shared `prototype/handoff-filter.js` function is used by the page and directly exercised by regression assertions in the existing workspace integrity test. This is a URL-based, client-side handoff across static files—not shared application state, persistence, authentication, authorization or a real request. All request outcomes remain on hold; no data is submitted or disclosed.
The current suite contains 50 declarations (40 review-engine + 8 documentation-integrity + 2 workspace-data-integrity). The dedicated `tests/workspace-data-integrity.test.js` covers the ordinary no-handoff queue, opportunity-only handoff, empty/unknown player, unknown opportunity, exact player–opportunity pair, invalid record input and cross-workspace reference integrity. Hosted verification is recorded in `verification/workspace-data-integrity-verification-2026-11-13.md`.

The 3-step journey is synthetic only. The Opportunity Register remains read-only; it does not publish or rank opportunities. The request-review page does not submit, approve, disclose or contact. The exact-pair link is a navigation affordance, not an eligibility or matching decision.


## Read-only review journey state

The Discovery & Request Review page now renders six stages from the existing synthetic evaluator result: (1) fictional request fixture, not submitted; (2) authority and evidence review; (3) safeguarding review; (4) eligibility for separate human review; (5) final decision/outcome, explicitly not recorded; and (6) disclosure/contact, prohibited and not implemented. A failed gate yields a hold; skipped prerequisites are shown as waiting; incomplete or unknown gate output fails closed. A synthetic all-pass result may only say **eligible for separate human review** and explicitly states that no human review has occurred. No decline, approval, invitation, trial, placement or registration is invented.

Implementation is isolated in `review-state.js`, a pure presentation projection. It does not change `review-engine.js`, policy rules, fixture records or lifecycle state. It performs no writes, transitions, authorization, disclosure or contact. The workflow now includes this file in its path filters. The test declaration inventory remains 40 engine + 8 documentation checks = 48; additional assertions exercise pass, hold, skipped, missing-gate and no-record behavior inside the existing workspace-integrity check. Hosted verification passed on [run 43415259079](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43415259079), commit `ad6fb2f488b62b433ef95a5373fa79118a6e5a52` (48 passed, 0 failed). Browser smoke verification on [run 43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388) passed 7/7 request-review groups and 8/8 workspace-hub groups. The request-review script covers queue selection, all three age/safeguarding scenarios, six-stage presentation and fail-closed handoffs. The workspace script covers all 11 card clicks, all 11 specialist-page renderings and return-to-hub clicks, connected destinations, representative interactive controls, hub navigation, mobile-menu behavior, 390px layouts and browser error reporting. This is scoped smoke verification, not a full visual-design, accessibility, security or production-readiness audit.

The projection additionally requires the evaluator's blocking-gate flag and both evidence/safeguarding groups to be consistently passing before it can display human-review eligibility; contradictory readiness fails closed.

## Specialist workspace interaction verification — 2026-11-13

The hosted workflow now runs `prototype/tests/workspace-interactions.browser-smoke.cjs` after the existing request-review and hub-navigation browser checks. On [run 43422082698](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422082698), commit `e6fab109253fab2091292ddef29d285251348c4e`, the full hosted suite passed: 48/48 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 11/11 specialist interaction groups. The new script checks every specialist workspace's actual controls or intended static boundary, including filters/searches, Passport and pathway selection, guardian scenarios, exact opportunity handoff, and the Claim Decisions form's browser validation and page-session-only behavior. The session entry disappears on reload; it is not durable storage. The Coach & Academy view is confirmed to remain static and roster-free. No uncaught browser errors were reported. See `verification/workspace-interaction-browser-verification-2026-11-13.md` for scope and limits. This is not an authorization, security, legal, accessibility, safeguarding-effectiveness or production-readiness test; no implementation gate is lifted.


## Workspace data-integrity and failure-state verification — 2026-11-13

The latest review corrected three fixture defects: a missing central membership record referenced by Coach & Academy; a Coach & Academy opportunity belonging to a different organization; and a discovery request that incorrectly referenced another player's membership despite having no Passport. The added membership remains explicitly unverified. The coach workspace is now organization-scoped and its proposal count matches its one listed proposal. The incomplete request remains intentionally incomplete and no longer borrows a membership. `handoff-filter.js` now normalizes invalid/non-array input to an empty list and fails closed. The new Node test file validates cross-workspace IDs, references, ownership and summary counts. The browser test now checks incomplete/unknown/mismatched handoffs and hostile HTML-looking text in the Claim Decisions form. Hosted run [43422932825](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422932825), commit `ea3b8919b1240be43391ffbb679b3c1d17a5942e`, passed 50/50 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 11/11 specialist interaction groups. No real data or production capability was introduced.

## Core-loop focus — 2026-11-13

The prototype is intentionally entering a depth-before-breadth phase. The next product work stays on the pure review engine and Discovery & Request Review loop: deterministic input handling, exact reference binding, authority and evidence gates, safeguarding prerequisites, clear holds, and the prohibition on disclosure. The surrounding workspaces remain supporting synthetic review surfaces; no new workspace expansion is planned until the core loop is better evidenced. This is a prioritization decision, not a policy ratification or implementation-gate change.

Two additional engine tests now exercise missing/malformed context collections and a missing request. Both must return HOLD, keep `allBlockingGatesSatisfied` false and keep `disclosurePermitted` false. The Discovery & Request Review rules list now escapes fixture-derived text; two search-only expressions no longer escape values before matching, avoiding search behavior distortion.

**Safe-rendering mitigation — UI-008 remains OPEN:** The ten fixture-driven workspaces now use an HTML-escaping helper for identified dynamic HTML-string interpolations; Claim Decisions retains its existing `esc()` helper. The specialist browser suite checks hostile markup and nullish values against the helper contract in all eleven workspaces. Hosted run [43426395229](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43426395229) passed 50/50 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups. This does not prove complete safety of every renderer or context. A full interpolation audit, URL policy review and malformed-fixture resilience checks remain outstanding. Do not connect external/user-supplied content to these renderers.
