# ScoutSA Internal Web Prototype

**Branch:** `prototype/internal-demo`  
**State as at:** 2026-11-13  
**Purpose:** isolated synthetic-data design and policy-evaluation prototype only.

This directory contains the original responsive browser demonstration plus focused synthetic review workspaces. It is not a production application and does not change mainline implementation holds.

## Current review-engine status

- Engine: `review-engine.js` **v0.2.0**.
- Headless suite: `node --test prototype/tests/*.test.js`.
- Current recorded engine-suite result: **40/40 passed** on 2026-11-12 in an isolated Node v26.12.1 execution environment (70.59 ms).
- Documentation-integrity suite: **6 checks declared** alongside 40 engine tests (46 total source declarations). The last hosted pass was the earlier 45-declaration suite on [run 43401455192](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401455192); the current 46-declaration suite awaits hosted verification. See [CI verification record](verification/documentation-integrity-ci-2026-11-13.md).
- The current browser-integrated discovery smoke page has **not** been rerun against v0.2.0. The previous 32/32 browser result belongs to the v0.1.0 baseline.
- Recorded 45-test CI baseline: [run 43401941704](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401941704) is historical (40 engine + 5 documentation checks). Current source declares 46 tests (40 + 6); hosted verification is pending. The workflow does not execute browser tests.

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

See [DEVELOPMENT-BOUNDARY.md](./DEVELOPMENT-BOUNDARY.md). Internal development without external validation is limited to a clearly labelled synthetic-data demonstration. This decision does not lift database, RLS, access-policy, safeguarding, legal or production holds.

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

Open `discovery-request-smoke-tests.html` to run the browser smoke checks. The earlier 32/32 hosted-browser result belongs to the previous 0.1.0 engine baseline; it is not evidence for the current 0.2.0 integration. On 2026-11-12, the current 0.2.0 engine passed 40/40 headless Node tests in 70.59 ms, both inline page scripts passed syntax checks, and both JSON schemas parsed. The current browser page could not be re-run from the isolated browser because this repository returns 404 to unauthenticated raw GitHub access. See `verification/discovery-request-browser-verification-2026-11-12.md`. These are synthetic prototype checks only; they do not test authentication, authorization, tenant isolation, RLS, secure storage, audit integrity, evidence authenticity, age assurance, real consent validity, safeguarding effectiveness or legal compliance.

The UI now renders from `review-engine.js` (version 0.2.0), a UI-independent synthetic evaluator with twelve gates, explicit actor-legitimacy precedence, lifecycle/expiry checks and stable reason codes. Consent, guardian-authority and player-voice evaluation are skipped until organization identity and representative authority both pass. Every time-sensitive evaluation receives an explicit clock value. The UI passes minimal pseudonymous projections to the engine rather than full Passport, membership or opportunity fixture objects; this is data minimization in a synthetic client, not a security boundary. A result can reach only `READY_FOR_SEPARATE_HUMAN_REVIEW`; the prototype always returns `disclosurePermitted: false`.

The headless suite is `node --test prototype/tests/review-engine.test.js`; `.github/workflows/prototype-policy-tests.yml` is configured to run it on relevant prototype changes. The draft backend gate contract is in `REVIEW-ENGINE-CONTRACT.md`, with input and result JSON Schemas under `contracts/`. It is not ratified and is not backend implementation. No production implementation gate is lifted. Do not enter real personal information or use this prototype to collect consent or manage real requests.


## Affiliation evidence model proposal

See [Affiliation Evidence Model — Proposal](AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md). It distinguishes player-reported experience, community-coach attestation and formal organization records without treating them as trust tiers. **This is not ratified and does not change the current verified-membership rule or authorize implementation.**


## Opportunity-specific evidence acceptance matrix

See [Opportunity Evidence Acceptance Matrix](OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md). It proposes candidate evidence handling for community sessions, recurring community programmes, academy assessments, formal club/league registration, scouting observation and funded development opportunities. It is a decision aid only: **not ratified, not an eligibility policy, and not authorization to change the review engine or mainline.**


## Opportunity requirement declaration proposal

See [Opportunity Requirement Declaration](OPPORTUNITY-REQUIREMENT-DECLARATION.md). It proposes the information an opportunity owner should disclose before independent review: owner and representative authority, the actual offer, mandatory criteria versus preferences, claim-specific evidence, safeguarding, privacy, stage transitions, disputes, expiry and change control. It is a requirements template only: **NOT RATIFIED; no implementation, publication, invitation or player-data processing is authorized.**
