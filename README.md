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

**Gate 1:** CLOSED  
**Gate 2:** CLOSED AT CONCEPTUAL LEVEL  
**Conceptual ERD:** FROZEN  
**MVP Boundary / Relationship Subset:** RATIFIED / FROZEN  
**Schema Boundary / Physical Table Boundary:** FROZEN  
**SQL Schema:** DRAFT / REVIEWED  
**PostgreSQL Runtime Witness:** PASS — isolated non-production  
**Migration-Safety Review:** CONDITIONAL PASS / HOLD  
**RLS / Access / Disclosure:** CONDITIONAL PASS / POLICY-LEGAL HOLD  
**Migration / Database / Production Implementation:** HOLD

The current executive position is recorded in [Gate Status](docs/00-gate-status.md), especially Section 13 and the Access-Policy Control section. The controlled next move is **external validation** of the smallest set of MVP assumptions that could materially change the product. Feedback is evidence input, not automatic ratification.

**Mainline boundary:** no RLS implementation, migration, database deployment, API, authentication, real identity processing, production deployment or pilot is authorized by the current evidence.

**Separate prototype branch:** synthetic design and policy-evaluation work is isolated on `prototype/internal-demo`; it is not merged into this mainline tree and does not lift any mainline hold. See the [prototype branch README](https://github.com/Moshoeshoe333/ScoutSA/blob/prototype/internal-demo/prototype/README.md) for its separate scope and verification status.

**Documentation integrity:** consistency across source, tests, schemas, workflows, verification records, gate status and READMEs is a high-priority engineering control. See [Documentation Integrity and Error Prevention](docs/engineering-integrity.md).

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

- **[Tournament Organiser Adversarial Test Pack — 18 November 2026](docs/research/2026-11-18-tournament-organiser-adversarial-test-pack.md)** — proposed scenario tests and unresolved domain decisions; no implementation authority.

The `docs/research/` directory contains Gate witnesses, re-witnesses, ratification reviews/records, external research anchors, contradiction audits, and the problem-solution ledger. These artifacts are evidence/provenance records; they do not independently override the governing documents.

## Implementation boundary

**Mainline implementation remains on hold.** The schema and physical table boundaries are frozen, and SQL remains a reviewed draft with an isolated non-production runtime witness. Migration execution, RLS, API, authentication, real identity processing, deployment and pilot remain unauthorized or on hold as recorded in the canonical Gate Status.

The controlled next move is external validation of the smallest set of MVP assumptions that could materially change the product. Research and stakeholder feedback may inform a proposal, but only the established governance process can ratify a decision or lift a gate.
