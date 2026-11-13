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

**Isolated prototype branch:** `prototype/internal-demo` contains a synthetic, static browser demonstration and a pure review engine v0.2.0. Its headless test suite currently contains 40 tests; the verification record reports 40/40 passing in an isolated Node run on 2026-11-12. The current browser-integrated smoke page has not been rerun against v0.2.0. The unified dashboard workspace hub links all 11 existing synthetic review screens, and each screen now links back to the hub. Its integrity check confirms all 11 destinations and return links. The source inventory is 40 engine + 8 documentation checks = 48 declarations; the two-way navigation check passed hosted CI on [run 43409488949](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409488949), commit `fc3d121becd267287eb37bc19ba4644ed9f39b0c`. The earlier 43-test run passed on [run 43398121693](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43398121693). The 44-test baseline (40 engine + 4 documentation checks) passed hosted GitHub Actions on [run 43399919864](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43399919864), commit `24afa22dd35d923ceffcaa0fbec7482a43209fed`. The last independently verified suite (40 engine + 5 documentation checks; 45 total) passed hosted GitHub Actions on [run 43401455192](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401455192), commit `b5fca7ca7551e96027910790eddb83fdd7e26394`. The prior suite (40 engine + 7 documentation checks; 46 total) passed hosted GitHub Actions on [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544), commit `50566e1902b9fa409515103bc81511f4af638881`. The historical 47-declaration suite (40 engine + 7 documentation checks) passed hosted GitHub Actions on [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367), commit `25108a07320a2e70cd86573a4d950024b8211273`. See the [CI verification record](prototype/verification/documentation-integrity-ci-2026-11-13.md). The initial 48-declaration workspace-hub suite passed hosted GitHub Actions on [run 43409104888](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409104888), commit `14bcabb84e58fa8f286887d4125cddb6ee6a282e`. These prototype results do not lift mainline holds.

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

On the isolated `prototype/internal-demo` branch, the Player Passport now links to the matching Discovery & Request Review fixture using an opaque synthetic player reference. Discovery filters to that exact fixture and links back to the same Passport. This is a read-only URL handoff between static pages; it is not shared persistence, a live submission, authentication, authorization or a production workflow. Unknown or unmatched references show no request rather than creating one. All sample requests remain on hold.
The 48-declaration hosted result cited above predates the Passport-to-discovery handoff assertions added on 2026-11-13. The source declaration count remains 48 (40 engine + 8 documentation checks); a new hosted run is required to verify the updated assertions.