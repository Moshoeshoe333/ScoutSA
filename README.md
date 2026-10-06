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

## Current Gate Status — 6 October 2026

**Gate 1: CLOSED**  
**Gate 2: CLOSED AT CONCEPTUAL LEVEL**  
**Conceptual ERD: FROZEN** · **Schema: HOLD** · **Implementation: DEFERRED**

Three additional semantic concepts have been explicitly ratified through Gate 2 adversarial work:

- **Assertion**
- **Safeguarding Case / Response**
- **Child Participation / Voice Record**

The remaining relationship/cardinality, authorization-process, lifecycle, correction/dispute, access, retention, and legal questions are explicitly carried forward rather than hidden in the ERD. No additional semantic entity is currently warranted.

See the canonical current status: **[Gate Status](docs/00-gate-status.md)**.

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

**Implementation is intentionally deferred.**

The objective is not documentation for its own sake. The objective is to make the eventual MVP **smaller, safer, and derivable** from ratified domain and relationship decisions.

**Next phase: MVP Boundary Freeze.** The frozen conceptual relationship model will be reduced to the smallest MVP scope and explicit non-scope before schema or implementation work begins.
