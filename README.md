# ScoutSA

## South Africa's Verified Grassroots Football Opportunity Network

ScoutSA exists to make South African grassroots football talent **visible and reachable**.

> **Discover. Verify. Connect.**

ScoutSA is designed around a simple product thesis:

> **Talent exists everywhere. Opportunity does not.**

The platform is not merely a scouting database. It is an opportunity network that captures football identity, verification, guardianship, academic and transport context, consent, media evidence, and opportunity readiness.

### Product North Star

Every Player Passport should progressively answer:

1. **Can this player play?**
2. **Can this player realistically access the opportunity?**

### Core Domain

- Player Passport — persistent football identity
- Membership — historical/current relationship between players and organizations
- Verification — scoped trust signal, not truth
- Assertion & Evidence — attributable claims and supporting provenance
- Football Readiness — football evidence-derived view
- Opportunity Readiness — contextual feasibility state
- Guardian & Consent — scoped protection and authorization
- Safeguarding Case / Response — distinct response lifecycle
- Child Participation / Voice — child's expressed view kept distinct from authority and decision
- Opportunities & Applications — structured pathway from discovery to real-world opportunity
- Outcome — historical result, not ranking or guarantee

### Initial Geography

ScoutSA begins in the **Vaal Triangle**, with expansion intended through Sedibeng, Greater Gauteng, and eventually nationally.

## Current Repository Status — 13 November 2026

**Mainline:** the governing domain and relationship decisions remain the authority. Gate 1 and Gate 2 are closed at their stated conceptual levels; the MVP relationship subset and schema boundary are frozen; the physical table boundary is frozen; SQL remains a reviewed draft with an isolated PostgreSQL runtime witness. Migration/database execution, RLS, API, authentication, real identity processing, deployment and pilot remain on hold. See the [canonical Gate Status](docs/00-gate-status.md) for the full control table and evidence references.

**Isolated prototype branch:** `prototype/internal-demo` contains a synthetic, static browser demonstration and a pure review engine v0.2.0. The last confirmed hosted workflow passed 52 headless Node tests and the three Playwright/Chromium browser smoke suites; seven later engine regression tests are committed and pass in hosted verification [run 43431181124](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43431181124). On [run 43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388), all 48 headless tests passed, the request-review journey passed 7/7 browser groups, and the unified hub/all-workspace journey passed 8/8 groups. The v0.2.0 Discovery & Request Review browser smoke test passed **7/7 groups**, and the unified hub/all-workspace browser test passed **8/8 groups**, both on [run 43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388), commit `7eb60f651363dfc3b569e2be80da187007a75d2d`. See the [request-review verification](prototype/verification/discovery-request-browser-verification-2026-11-13.md) and [workspace-hub verification](prototype/verification/workspace-hub-browser-verification-2026-11-13.md). The unified dashboard workspace hub links all 11 existing synthetic review screens, and each screen now links back to the hub. Its integrity check confirms all 11 destinations and return links. The source inventory is 40 engine + 8 documentation checks = 48 declarations; the two-way navigation check passed hosted CI on [run 43409488949](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409488949), commit `fc3d121becd267287eb37bc19ba4644ed9f39b0c`. The earlier 43-test run passed on [run 43398121693](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43398121693). The 44-test baseline (40 engine + 4 documentation checks) passed hosted GitHub Actions on [run 43399919864](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399919864), commit `24afa22dd35d923ceffcaa0fbec7482a43209fed`. The last independently verified suite (40 engine + 5 documentation checks; 45 total) passed hosted GitHub Actions on [run 43401455192](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401455192), commit `b5fca7ca7551e96027910790eddb83fdd7e26394`. The prior suite (40 engine + 7 documentation checks; 46 total) passed hosted GitHub Actions on [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544), commit `50566e1902b9fa409515103bc81511f4af638881`. The historical 47-declaration suite (40 engine + 7 documentation checks) passed hosted GitHub Actions on [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367), commit `25108a07320a2e70cd86573a4d950024b8211273`. See the [CI verification record](prototype/verification/documentation-integrity-ci-2026-11-13.md). The initial 48-declaration workspace-hub suite passed hosted GitHub Actions on [run 43409104888](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409104888), commit `14bcabb84e58fa8f286887d4125cddb6ee6a282e`. These prototype results do not lift mainline holds.

Recorded 45-test CI baseline: [run 43401941704](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401941704) — historical baseline only (40 engine + 5 documentation checks). Historical 46-test CI verification: [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544). Historical 47-test CI baseline: [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367).

**Prototype documentation and inventory:** see [Prototype README](prototype/README.md), the [Affiliation Evidence Model Proposal](prototype/AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md), the [Opportunity Evidence Acceptance Matrix](prototype/OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md), and the [Opportunity Requirement Declaration](prototype/OPPORTUNITY-REQUIREMENT-DECLARATION.md) (research/design proposals only; not ratified). Synthetic fixtures only; no real player data, production backend, persistence, authentication, authorization, RLS, identity vault, consent capture, disclosure or pilot readiness.

**Documentation integrity:** documentation consistency is a high-priority engineering control. See [Documentation Integrity and Error Prevention](docs/engineering-integrity.md) for the synchronization checklist, incident log and preventive controls.

### Gate 2 carry-forward decisions

| Seam | Status |
|---|---|
| G2-01 User ↔ Player | Operational policy — cardinality/delegation |
| G2-02 User ↔ actors / Organization | Operational/legal — affiliation/authorization |
| G2-03 GuardianLink ↔ ConsentRecord | Legal/operational — conflict/authoriser/applicability |
| G2-07 OpportunityApplication | Operational policy — participants/lifecycle |
| G2-08 Outcome | Operational/legal — multiplicity/correction/dispute/access |

### Repository Principle

ScoutSA follows an evidence-first engineering discipline:

> **Strength of claim must never exceed strength of evidence.**

Product decisions, domain rules, security controls, and implementation claims should be traceable to documented requirements and executable evidence.

### Methodology

> **Research can propose. Evidence can witness. The Constitution ratifies. The Domain Model formalizes. The Relationship Model derives. Code implements.**

No schema, RLS, API, UI, authentication, or implementation behavior is authoritative merely because it is technically convenient.

## Documentation

### Governing / current

- **[Gate Status](docs/00-gate-status.md)**
- **[Constitution](docs/00-constitution.md)**
- **[Domain Model](docs/01-domain-model.md)**
- **[Relationship Model — Gate 2](docs/02-relationship-model.md)**

### Product / operating models

- **[Player Passport](docs/03-player-passport.md)**
- **[Consent Model](docs/05-consent-model.md)**
- **[User Flows](docs/06-user-flows.md)**

### Research & evidence

The `docs/research/` directory contains Gate witnesses, re-witnesses, ratification reviews/records, external research anchors, contradiction audits, and the problem-solution ledger. These artifacts are evidence/provenance records; they do not independently override the governing documents.

## Implementation boundary

**Mainline implementation remains on hold.** The isolated prototype branch is a synthetic design/evaluation artifact only; it is not production implementation and does not authorize database, RLS, API, authentication, real-data, deployment or pilot work.

The objective is to make the eventual MVP **smaller, safer, and derivable** from ratified domain and relationship decisions. Unresolved operational, legal, access and safeguarding questions remain explicit rather than being guessed into code.


### Opportunity validation proposal

The prototype branch contains a [synthetic Opportunity Validation Scenario Pack](prototype/OPPORTUNITY-VALIDATION-SCENARIO-PACK.md) with 14 fictional cases for evidence authority, fair eligibility, fees, safeguarding, privacy, disputes and stage boundaries. It also contains an [optional Vaal Stakeholder Validation Interview Guide](prototype/VAAL-STAKEHOLDER-VALIDATION-INTERVIEW-GUIDE.md). External interviews are not a prerequisite for continued internal development; the guide is parked for any future responses and does not claim validation has occurred. These are research instruments, not ratified policy or authorization for real-world processing.


### Connected synthetic demo journey

The isolated prototype journey is **Player Passport → Opportunity Register → Discovery & Request Review**. The selected synthetic Passport reference is carried into the opportunity register; a request-review link appears only when the fixtures contain that exact player–opportunity pair. The request-review screen filters to that pair and links back to the same Passport and opportunity. This is a read-only URL handoff across static pages, not shared persistence, a live application, approval, disclosure, authentication, authorization or contact. Unmatched and incomplete references—including an opportunity parameter without a player parameter—fail closed; all sample requests remain on hold. The shared handoff filter has regression coverage for missing, empty, unknown and exact-match parameter combinations.

The current source declares 66 review-engine tests, 8 documentation-integrity checks and 2 workspace-data-integrity checks (76 total). The invitation review model now requires claim-scoped evidence inspection records: only unique, current, unexpired and accepted evidence bound to the exact invitation, organization, reviewer, authority and claim can satisfy a review. Submitted, merely inspected, rejected, stale, revoked, expired, missing, duplicate or mismatched evidence fails closed; revoked reviewer authority also blocks reevaluation. Hosted verification for this revision is pending. The previous 67-test hosted result remains historical and does not verify this change.


### Synthetic review-state presentation

The isolated request-review page now displays six read-only stages derived from the existing synthetic evaluator: fixture record, authority/evidence review, safeguarding review, eligibility for separate human review, final decision/outcome, and disclosure/contact boundary. Failed gates remain on hold; skipped gates are shown as waiting; a passing synthetic evaluation can only be described as eligible for separate human review. The UI never invents a decline, approval, invitation or placement. No human decision is recorded, and disclosure/contact remain prohibited. The evaluator and its policy rules are unchanged; this is a presentation layer only. The existing 48 test declarations are unchanged, with additional assertions inside the existing workspace-integrity test. The updated 48-test suite passed hosted verification on [run 43415259079](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43415259079), commit `ad6fb2f488b62b433ef95a5373fa79118a6e5a52` (48 passed, 0 failed). Browser smoke verification on [run 43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388) passed 48/48 headless tests, 7/7 request-review browser groups and 8/8 unified-workspace browser groups. See the two browser verification records linked above.

The presentation also fails closed if a nominal readiness disposition conflicts with failed, skipped or missing review-group results.

### Specialist workspace interaction verification — 2026-11-13

The isolated prototype now has a third Playwright/Chromium browser script covering the actual client-side interactions and read-only boundaries across all 11 specialist workspaces. Hosted run [43422082698](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422082698), commit `e6fab109253fab2091292ddef29d285251348c4e`, passed **48/48 headless tests**, **7/7 request-review browser groups**, **8/8 hub/navigation browser groups**, and **11/11 specialist interaction groups**, with no uncaught browser errors. The new checks cover Passport selection/tabs/handoff; membership, opportunity, evidence, invitation and matching filters/searches; Claim Decisions form validation and session-only reset after reload; pathway and guardian scenario selection; the static Coach & Academy boundary; and the Discovery & Request Review hold/no-decision boundary. See `prototype/verification/workspace-interaction-browser-verification-2026-11-13.md`. These are client-side synthetic smoke tests only; they do not establish persistence, authorization, safeguarding effectiveness, legal compliance, accessibility completeness or production readiness. Mainline implementation holds remain unchanged.


### Core-loop hardening checkpoint — 2026-11-13

The prototype is now deliberately narrowing around the Discovery & Request Review loop and its pure review engine. No additional workspace breadth is planned until the core loop's input, evidence, authority, safeguarding and fail-closed behavior are stronger. This checkpoint corrected an unescaped rules-list interpolation in Discovery & Request Review and removed unnecessary escaping from two search-only expressions. Two new engine tests verify that missing/malformed context collections and a missing request produce HOLD, never human-review eligibility or disclosure. Hosted run [43427648705](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43427648705), commit `5945b75e05229427e430317b79f0541836cbe275`, passed **52/52 headless tests**, **7/7 request-review browser groups**, **8/8 hub/navigation groups** and **12/12 specialist interaction groups**. Inventory: 42 engine + 8 documentation-integrity + 2 cross-workspace data-integrity declarations.

The earlier safe-rendering mitigation remains scoped: helper coverage is not a complete renderer or URL-context audit. UI-008 remains **OPEN**. No external/user-supplied data is authorized and no mainline gate is lifted.

### Safe-rendering mitigation checkpoint — 2026-11-13

The isolated prototype's ten fixture-driven workspaces now apply an HTML-escaping helper to identified dynamic HTML-string interpolations; Claim Decisions retains its existing escaping helper. The specialist browser smoke suite adds a hostile-markup/nullish-value contract check across all eleven workspaces. This is a scoped mitigation and regression check, not proof that every renderer or HTML context is safe. URL policy, malformed fixture resilience and a complete interpolation audit remain to be verified. UI-008 therefore remains **OPEN**. No external/user-supplied data is authorized and no mainline gate is lifted.

### Workspace data-integrity and failure-state checkpoint — 2026-11-13

The cross-workspace review found and corrected three fixture inconsistencies: Coach & Academy referenced a missing membership record; its organization-scoped opportunity list included an opportunity owned by a different sample organization; and an intentionally incomplete discovery request borrowed another player's membership. The missing membership fixture was added as explicitly unverified, the foreign opportunity was removed and its summary count corrected, and the incomplete request's membership reference was cleared. The handoff filter now fails closed on non-array input. New tests verify IDs and relationships across all 11 workspaces, coach organization scope, summary counts, exact/incomplete handoffs and the intentionally missing Passport scenario. Hosted run [43422932825](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422932825), commit `ea3b8919b1240be43391ffbb679b3c1d17a5942e`, passed **50/50 headless tests**, **7/7 request-review browser groups**, **8/8 hub/navigation groups** and **11/11 specialist interaction groups**. Browser coverage now also checks invalid handoffs and literal rendering of HTML-looking text in the Claim Decisions form. See `prototype/verification/workspace-data-integrity-verification-2026-11-13.md`. Hosted run [43426395229](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43426395229), commit `a7a72870ad63b52d722e4260a9c29e8cd7fad647`, passed 50/50 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups. The new browser group checks hostile markup and nullish values against the escaping helper contract across all eleven workspaces. UI-008 remains OPEN pending complete interpolation/context review, URL policy review and malformed-fixture resilience. No external/user-supplied data is authorized; no implementation gate is lifted and mainline remains unchanged.


## Invitation and safeguarding chain regression — 2026-11-13

Eight new review-engine tests replace the legacy second-review status shortcut with a synthetic evidence-linked model. The evaluator requires two distinct reviewers, separate current authority grants scoped to the exact organization and review action, cleared conflict checks with evidence references, an independence-check reference for the second review, and valid chronological ordering. Missing, duplicate, expired or mismatched records HOLD. The result remains limited to eligibility for separate human review; it is never approval, selection, invitation or disclosure. Current inventory: 57 engine + 8 documentation-integrity + 2 workspace-data-integrity declarations (67 total). Hosted CI for the updated model is pending until the current branch run completes. No real-world identity, independence, authority or evidence authenticity is established; no policy ratification or mainline authorization is implied.


Hosted verification for the invitation/safeguarding regression checkpoint passed on [run 43431181124](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43431181124), commit `f7d6383111c92f72e2b33213b0b05619deb94ebd`: **59/59 headless tests**, **7/7 Discovery & Request Review browser groups**, **8/8 workspace-hub browser groups**, and **12/12 specialist interaction browser groups**. This verifies the synthetic test suite and browser checks only; it does not establish real-world reviewer independence, safeguarding effectiveness, legal compliance, security or production readiness.


## Evidence-linked reviewer model — 2026-11-13

The prototype evaluator no longer treats `secondReviewStatus === "COMPLETE"` as sufficient. It now requires two distinct reviewer identities and two distinct authority grants, each exact-scoped to the organization and invitation-safeguarding review, current, and paired with conflict-check evidence references. The second reviewer must also carry a separate independence-check evidence reference. Both reviews require completion timestamps and evidence references; second review cannot predate first review. Eight negative-path tests cover legacy-flag bypass, same-person review, scope mismatch, expired identity, missing conflict evidence, missing independence evidence, invalid order and duplicate records.

These fields remain synthetic. They do not authenticate real people, establish actual legal authority, prove conflict adjudication, verify source authenticity or create an enforceable authorization. The contract remains a draft, UI-008 remains OPEN, mainline remains untouched, and real data/disclosure/deployment/pilot remain unauthorized.


## Evidence-linked reviewer model verification — 2026-11-13

Hosted run [43432903661](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43432903661), commit `8ea0ea7cac0f11875ac3431017d7868f8687629a`, passed **67/67 Node tests**, **7/7 Discovery & Request Review browser groups**, **8/8 workspace hub browser groups**, and **12/12 specialist interaction browser groups**.

The result confirms only the synthetic test contract and exercised browser flows. It does not authenticate real reviewers, verify evidence authenticity, prove real-world independence or authority, establish legal compliance, or certify production security or safeguarding effectiveness. The mainline and all real-data/deployment/pilot holds remain unchanged.

### Evidence provenance and revocation — 2026-11-13

The synthetic review engine now distinguishes submitted, inspected, accepted, rejected, stale and revoked evidence. Every required review, conflict and independence claim must resolve to a unique accepted inspection record with exact invitation/reviewer/authority/scope binding, source metadata, finding reference, inspector and timestamp. Rejection, expiry, staleness, revocation, missing provenance or reviewer-authority revocation blocks reevaluation. Current source inventory: 66 engine + 8 documentation-integrity + 2 workspace-data-integrity = 76 Node test declarations; hosted verification is pending. This is synthetic structural validation only, not evidence authentication, a durable audit trail, or an implemented revocation service. UI-008 remains OPEN; mainline and real-data/deployment/pilot holds remain unchanged.

