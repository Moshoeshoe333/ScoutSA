# ScoutSA

## South Africa's Verified Grassroots Football Opportunity Network

**Discover. Verify. Connect.**

ScoutSA is being designed to help grassroots football talent become discoverable while making opportunity access, evidence, authority, consent and safeguarding explicit.

> Talent exists everywhere. Opportunity does not.

The product thesis is an opportunity network, not simply a scouting database. A Player Passport is intended to bring together football identity, attributable claims and evidence, membership history, football readiness, opportunity readiness, guardian/consent context and safe opportunity pathways.

## Current repository status — 17 November 2026

### Mainline: governing model and implementation boundary

The governing domain and relationship decisions remain authoritative. Gate 1 and Gate 2 are closed only at their recorded conceptual levels; the MVP relationship subset and schema/physical-table boundaries are frozen, and the SQL remains a reviewed draft with an isolated PostgreSQL runtime witness.

**Mainline implementation remains on hold.** Database execution, RLS, API, authentication, real identity processing, production deployment and real-world pilot activity are not authorized. Consult [canonical Gate Status](docs/00-gate-status.md) for the detailed control table and evidence.

### Isolated prototype: synthetic internal demonstration

The `prototype/internal-demo` branch contains a static browser prototype, 11 specialist workspaces, a UI-independent synthetic review engine (**v0.3.0**) and a synthetic audit-history validator (**v0.2.0**). It is a design and policy-evaluation artifact—not a production application.

Latest recorded source inventory:

| Test group | Declarations |
|---|---:|
| Review engine | 79 |
| Documentation integrity | 9 |
| Audit-history validator | 31 |
| Workspace data integrity | 2 |
| **Total Node tests** | **121** |

Source inventory includes **79/79 review-engine tests** and **9 documentation checks** (alongside 31 audit-history and 2 workspace-data-integrity declarations). Historical reference points: Recorded 45-test CI baseline: [run 43401941704](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401941704). Historical 46-test CI verification: [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544).

Latest hosted workflow [43848921959](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43848921959), commit `4b4f556a87a600553dcc1d49f883002a73057dbd`, passed **121/121 Node tests**, **8/8 Discovery & Request Review browser groups**, **8/8 workspace hub/navigation groups**, and **12/12 specialist interaction groups**. The Discovery & Request Review browser suite now covers valid synthetic history, missing history, invalidated evidence, reset/replay and the prohibited disclosure boundary.

The 13 November verification [43444088668](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43444088668) and later documentation workflow [43445376478](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43445376478) remain historical checkpoints.

See the [Prototype README](prototype/README.md) for scope, how to open the demo, test commands, current engine behavior and limitations. The latest prototype CI incident and remediation are recorded in the 17 November session ledger; the most recent historical green run is not evidence for later commits. See the [17 November session ledger](prototype/verification/SESSION-LEDGER-2026-11-17.md) for the latest integrity incident, corrective work and exact-head verification stop line; the [16 November](prototype/verification/SESSION-LEDGER-2026-11-16.md) and [13 November](prototype/verification/SESSION-LEDGER-2026-11-13.md) ledgers remain historical context.

## Product principles

- **EXPOSURE ≠ OPPORTUNITY**
- **VISIBILITY ≠ ACCESS**
- **DISCOVERABILITY ≠ TRUST**
- **VERIFICATION ≠ GUARANTEE**
- **CONTACT ≠ PLACEMENT**
- **EXPOSURE ≠ OUTCOME**

ScoutSA follows an evidence-first engineering discipline:

> **Strength of claim must never exceed strength of evidence.**

Research can propose. Evidence can witness. The Constitution ratifies. The Domain Model formalizes. The Relationship Model derives. Code implements.

## Initial geography

The initial focus is the Vaal Triangle and Sedibeng, with potential expansion through Greater Gauteng and eventually nationally. Expansion is an intention, not a validated operating footprint.

## Documentation

### Governing documents
- [Gate Status](docs/00-gate-status.md)
- [Constitution](docs/00-constitution.md)
- [Domain Model](docs/01-domain-model.md)
- [Relationship Model — Gate 2](docs/02-relationship-model.md)
- [Player Passport](docs/03-player-passport.md)
- [Consent Model](docs/05-consent-model.md)
- [User Flows](docs/06-user-flows.md)

### Engineering and prototype
- [Engineering Lessons Ledger](docs/engineering-lessons-ledger.md) — reusable incident-to-control practice and ScoutSA's recorded engineering lessons.
- [Documentation Integrity and Error Prevention](docs/engineering-integrity.md)
- [Prototype README](prototype/README.md)
- [Session Ledger — 17 November 2026](prototype/verification/SESSION-LEDGER-2026-11-17.md) — latest prototype stabilization and verification status.
- [Session Ledger — 13 November 2026](prototype/verification/SESSION-LEDGER-2026-11-13.md)
- [33-tier Audit-History Assessment](prototype/verification/33-tier-audit-history-assessment-2026-11-13.md)
- [Synthetic Audit-History Proposal](prototype/SYNTHETIC-AUDIT-HISTORY-PROPOSAL.md)
- [Review Engine Contract](prototype/REVIEW-ENGINE-CONTRACT.md)
- [Affiliation Evidence Model Proposal](prototype/AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md) — non-ratified
- [Opportunity Evidence Acceptance Matrix](prototype/OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md) — non-ratified
- [Opportunity Requirement Declaration](prototype/OPPORTUNITY-REQUIREMENT-DECLARATION.md) — non-ratified
- [Opportunity Validation Scenario Pack](prototype/OPPORTUNITY-VALIDATION-SCENARIO-PACK.md) — synthetic and non-ratified

## Safety and implementation boundary

- Prototype fixtures are fictional and must remain synthetic.
- Do not enter real player or minor data, identity documents, private contact details, media or real consent.
- The prototype does not authenticate people, verify real authority, enforce access control, provide RLS, create durable audit records, or authorize disclosure/contact.
- A passing synthetic evaluation can indicate only eligibility for separate human review. It is not approval, selection, invitation, trial, placement or a guarantee.
- UI-008 safe-rendering audit remains **OPEN**. Do not connect external or user-supplied content to prototype renderers.
- No prototype result lifts a mainline gate or authorizes production, deployment or pilot activity.

Documentation and code should be read with their stated status. A proposal is not a ratified policy; a test pass is not proof of real-world effectiveness; a working screen is not a production capability.
