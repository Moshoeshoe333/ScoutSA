# ScoutSA Internal Web Prototype

**Branch:** `prototype/internal-demo`  
**State as at:** 17 November 2026  
**Purpose:** isolated synthetic-data design, workflow and policy-evaluation demonstration.

This branch contains a static browser prototype and a synthetic review engine. It is deliberately separate from mainline. It does not lift any mainline implementation hold.

## Current verified state

**Verification status — 19 November 2026:** Exact-current-head hosted workflow [#44527165027](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44527165027) passed against `0e659e82d480d0f31aca4beaa58bfb699303c759` on `prototype/internal-demo`. It passed **121/121 headless tests**, all ten configured browser smoke scripts, **8/8 hub/navigation groups**, and **16/16 specialist workspace interaction groups**. The specialist suite includes malformed guardian-consent and development-pathway fixture cases, which render explicit blocked/empty states without inventing consent, evidence, readiness or outcomes. The hub test also opens the six-step guided walkthrough, verifies all six specialist destinations resolve, and checks the walkthrough at a 390px viewport. TM-013's deliberate assertion-failure injection is included and passed. This is synthetic regression evidence only—not production-readiness, safeguarding, privacy, legal, accessibility or security certification.


- Review engine: `review-engine.js` **v0.3.0**.
- Synthetic audit-history validator: `audit-history.js` **v0.2.0**, integrated as a mandatory structural gate in the synthetic invitation-review evaluation.
- Node test declarations: **121 total** — **79/79 review-engine tests**, 9 documentation-integrity checks (9 checks declared), 31 audit-history tests and 2 workspace-data-integrity checks.
- Pre-preview verification checkpoint: [GitHub Actions run 43868685945](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43868685945), commit `a22a52de4a4a18166f0e2478a14c73f786b776e7`, completed successfully before the player-facing preview was added.
- Historical browser baseline: [run 43871407060](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43871407060) verified an earlier seven-suite checkpoint. It is superseded by the exact-current-head verification above.
- The preview, coverage workbench, Tournament Manager and Tournament Day Operations exist on the isolated prototype branch only. Player-preview WhatsApp and copy-link actions stay disabled until a public HTTPS URL exists. A passing run is regression evidence, not safeguarding, privacy, accessibility or production approval. Older run links below are historical checkpoints.

The test counts above are source declarations and the cited workflow is the recorded execution evidence. The 14 specialist groups include hostile URL/identifier checks and hostile fixture-string checks at actual render sinks across Passport, organization membership, opportunity, evidence, invitation, matching, pathway, consent, academy, decision and discovery-request workspaces. Targeted browser regression checks now exercise all 29 identified HTML assignment sinks, including the Discovery gate renderer; URL/handoff sinks are checked for hostile identifiers and unsafe schemes. This is not a complete security sign-off: output-context review and malformed-fixture resilience remain open. Helper-level hostile/nullish checks run across all 11 workspaces. This is targeted regression evidence, not a complete security sign-off.

## Open the prototype

**Engineering learning control:** see the [cross-project Engineering Lessons Ledger](../docs/engineering-lessons-ledger.md) for permanent lessons, preventive controls, regression evidence and residual risks.

**Organizer Portal audit:** see [Tournament Organizer Portal Audit — 18 November 2026](verification/TOURNAMENT-ORGANIZER-PORTAL-AUDIT-2026-11-18.md) for scoped findings, corrections and remaining limits.

Open `index.html` in a modern browser. No build step or package installation is required. The hub provides a six-step [Guided Demo Journey](demo-journey.html), a separate three-screen Player Experience Preview for coach/guardian conversations, plus 11 specialist workspaces. The guided journey and player preview are not counted as specialist workspaces:

1. Player Passport
2. Organization Membership Review
3. Opportunity Management/Register
4. Opportunity Evidence Review
5. Opportunity Decision Worksheet
6. Safeguarded Invitation Workflow
7. Player–Opportunity Matching Review
8. Player Development Pathway Tracker
9. Coach & Academy Workspace
10. Guardian & Consent Workspace
11. Discovery & Request Review

The workspaces are separate static pages. A versioned, synthetic-only JSON handoff now lets the Organizer Portal export organizer/submission/evidence/feature-permission records and lets Tournament Manager import them by stable primary IDs. This is a manual file exchange—not shared application state, persistence, authentication, authorization, API synchronization or production integration.

## Run tests

From the repository root:

```sh
node --test prototype/tests/*.test.js
```


The appearance/minutes view is a derived calculation from fixture-specific lineup and substitution records. It is not an independently verified stat, and invalid duration/substitution timing suppresses the totals. Hosted run [#679](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44299389829) passed the current Tournament Day Operations browser smoke test and the linked Player Tournament History checks at the exact commit listed above.
Hosted CI runs ten Playwright/Chromium browser smoke scripts configured in `.github/workflows/prototype-policy-tests.yml`: Discovery & Request Review, workspace hub/navigation, player journey preview, Vaal ecosystem coverage, tournament relationship hub, tournament manager, tournament day operations, tournament statistic reconciliation, tournament organizer portal and specialist workspace interactions. Exact-current-head run [#44526537773](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44526537773) passed the ten configured scripts. A passing run is regression evidence only—not safeguarding, privacy, accessibility or production-readiness approval.

## Review engine and invitation gate

The pure review evaluator is UI-independent and uses synthetic inputs. The audit-history validator requires a caller-supplied synthetic event sequence with review-completion events, evidence-version/fingerprint links, scoped synthetic authority records, ordered timestamps, state agreement and invalidation handling.

A successful synthetic result can reach only **eligibility for separate human review**. It is not a human decision. The engine always returns `disclosurePermitted: false`. Missing, malformed, mismatched, superseded, revoked, expired or otherwise unacceptable required evidence fails closed.

The audit-history model is experimental and not ratified. It is not an immutable or durable audit service: it provides no cryptographic integrity, trusted timestamps, real identity proofing, real authority verification or production authorization. Evidence references and fingerprints are synthetic fixture values.

Historical source-count references: Recorded 45-test CI baseline: [run 43401941704](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401941704). Historical 46-test CI verification: [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544).

See:
- [Affiliation Evidence Model Proposal](AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md) — non-ratified proposal for organization, community-coach and player-reported evidence classes; no implementation authority.
- [Opportunity Evidence Acceptance Matrix](OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md) — candidate evidence handling by opportunity category; non-ratified.
- [Opportunity Requirement Declaration](OPPORTUNITY-REQUIREMENT-DECLARATION.md) — proposed owner disclosures, mandatory criteria, preferences and independent-review controls; non-ratified.
- [Opportunity Validation Scenario Pack](OPPORTUNITY-VALIDATION-SCENARIO-PACK.md) — fictional scenarios for adversarial validation; non-ratified.
- [Synthetic Audit-History Proposal](SYNTHETIC-AUDIT-HISTORY-PROPOSAL.md) — experimental in-memory audit-history model; not durable, tamper-evident or production-authorized.
- [Player Preview Validation Plan](PLAYER-PREVIEW-VALIDATION.md) — 14-day coach/parent discovery plan, open-ended price questions, stop rule and adult-pilot limitations.
- [Vaal Football Ecosystem Register](VAAL-FOOTBALL-ECOSYSTEM-REGISTER.md) — research-seeded team, tournament, school and creator leads with provenance and verification states. It is not a complete census.
- [Vaal-to-National Operating Model](VAAL-FOOTBALL-OPERATING-MODEL.md) — ELFA-first ecosystem, tournament statistics, internal scouting-support agent, schools, creators and national expansion.
- [Vaal Ecosystem Coverage Workbench](vaal-ecosystem-coverage.html) — static, searchable research seed; no backend or verified team claims.
- [Tournament Relationship Hub](tournament-intelligence.html) — synthetic tournament registry connecting editions, organizers, teams, coaches, player participation, fixtures and stat lines.
- [Tournament Manager](tournament-manager.html) — session-only workflow for event setup, divisions, team/coach registration, synthetic player participation, roster status and unique squad numbers, fixtures, results, sourced statistics, eligibility review, record ledger and JSON export.
- [Tournament Eligibility Review Model](TOURNAMENT-ELIGIBILITY-REVIEW-MODEL.md) — non-ratified, synthetic-only eligibility review linked to a player participation, division and competition rule. No DOB or identity documents are collected.
- [Tournament Day Operations](tournament-day-operations.html) — session-only synthetic match-day workflow for fixture status, officials, lineups, substitutions, derived appearances/minutes, sourced events, reports, provenance ledger and validated fixture-scoped JSON handoff export.
- [Match-Day Handoff Contract](MATCH-DAY-HANDOFF-CONTRACT.md) — versioned fixture package format, required IDs, validation rules, derived appearance reconciliation and limitations.
- [Player Tournament History](player-tournament-history.html) — read-only synthetic snapshot; can import and validate a fixture-scoped handoff locally, with no server upload or shared persistence.
- [Match Statistic Reconciliation](tournament-stat-reconciliation.html) — compares synthetic match events and statistical observations, flags explicit links, possible duplicates, unmatched events and disputed observations; review does not write or verify stats.
- [Tournament Organizer Portal](tournament-organizer-portal.html) — session-only synthetic organizer onboarding, competition submissions, evidence references and purpose-specific feature permission requests; no verification, publication or outbound contact occurs.
- [Tournament Organizer Portal Model](TOURNAMENT-ORGANIZER-PORTAL-MODEL.md) — proposed entity relationships, independent status dimensions, commercial hypotheses and open ratification questions.
- [Match Statistic Reconciliation Model](TOURNAMENT-STAT-RECONCILIATION-MODEL.md) — proposed relationships, matching rules, review semantics and open ratification questions.
- [Tournament Day Operations Model](TOURNAMENT-DAY-OPERATIONS-MODEL.md) — proposed IDs, relationships, evidence semantics, constraints and open ratification questions; not a production schema.
- [Tournament Relationship Model](TOURNAMENT-RELATIONSHIP-MODEL.md) — proposed primary-key, junction-table, statistic-provenance and organizer-feature model; not ratified for mainline.
- [Tournament Data Architecture Draft](TOURNAMENT-DATA-ARCHITECTURE-DRAFT.md) — cross-module contract draft reconciling tournament, organizer, participation, match, statistic and history models; records naming/join-path mismatches and unresolved decisions; not ratified and grants no implementation authority.
- [Domain Evidence Semantics Reconciliation](DOMAIN-EVIDENCE-SEMANTICS-RECONCILIATION.md) — records the Evidence/Assertion wording inconsistency and proposes a governance-only clarification; does not amend canonical semantics.
- [Tournament Architecture Decision Register](TOURNAMENT-ARCHITECTURE-DECISION-REGISTER.md) — 14 traceable decisions with priority, status, options, proposed direction, required authority, evidence, dependencies and stop conditions; not ratified and grants no implementation authority.
- [Tournament Identifier Crosswalk](TOURNAMENT-IDENTIFIER-CROSSWALK.md) — source-backed comparison of edition-key naming and fixture-scoped participation joins; advances TAD-001 to governance readiness and keeps TAD-002 blocked pending domain evidence.
- [Organizer Identity and Authority Crosswalk](ORGANIZER-IDENTITY-AUTHORITY-CROSSWALK.md) — maps the canonical Organization and unresolved User-affiliation boundaries to tournament organizer submission, authority and publication; keeps TAD-003 blocked.
- [Team Entry and Player Participation Cardinality Crosswalk](TEAM-ENTRY-PLAYER-PARTICIPATION-CARDINALITY-CROSSWALK.md) — reviews Team/Team Entry identity reuse, player participation multiplicity, registration/eligibility/permission/appearance boundaries and transfer/duplicate-registration gaps; keeps TAD-004 open.
- [TAD-004 Adversarial Cardinality Test Matrix](TAD-004-ADVERSARIAL-CARDINALITY-TEST-MATRIX.md) — 24 fictional adversarial scenarios covering team/player identity reuse, dual registration, transfers, temporal overlap, roster/eligibility/permission separation and historical corrections; non-ratified and no implementation authority.
- [Match Participation and Match-Day Multiplicity Crosswalk](MATCH-PARTICIPATION-MATCH-DAY-MULTIPLICITY-CROSSWALK.md) — examines fixture, operational session, played attempt, periods, shoot-out, return substitutions and derived appearance intervals against the synthetic modules and IFAB baseline; keeps TAD-006 open and grants no implementation authority.
- [Match Participation Grain and Identity Crosswalk](MATCH-PARTICIPATION-GRAIN-DECISION-CROSSWALK.md) — distinguishes PlayerParticipation, fixture, played match instance, MatchParticipation and appearance intervals; tests composite/surrogate identity options and keeps TAD-002 blocked pending TAD-004/005/006.
- [Fixture Consistency and Lifecycle Crosswalk](FIXTURE-CONSISTENCY-LIFECYCLE-CROSSWALK.md) — reviews fixture identity and edition/division/team-entry consistency, schedule changes, abandoned/replayed matches, walkovers, multi-leg ties and result corrections; keeps TAD-005 open.
- [TAD-005 Fixture Lifecycle Adversarial Test Matrix](TAD-005-FIXTURE-LIFECYCLE-ADVERSARIAL-TEST-MATRIX.md) — 32 fictional scenarios covering schedule revisions, duplicates, postponements, abandonment, resumption, replay, walkovers, forfeits, multi-leg ties, result corrections and downstream history; non-ratified and no implementation authority.
- [Session Ledger — 13 November 2026](verification/SESSION-LEDGER-2026-11-13.md).
- [Session Ledger — 16 November 2026](verification/SESSION-LEDGER-2026-11-16.md).
- [Session Ledger — 17 November 2026](verification/SESSION-LEDGER-2026-11-17.md) — DOC-007 incident, CI path-filter repair, decision dependency correction and current verification stop line.

## Open engineering issue: UI-008

**UI-008 safe-rendering audit remains OPEN.** Identified dynamic HTML-string interpolations have scoped escaping mitigations and hostile-markup regression checks, but this is not proof that every renderer and output context is safe. A complete interpolation/context audit, URL scheme policy review and malformed-fixture resilience work remain outstanding.

Do not connect external or user-supplied content to these renderers while UI-008 is open.

## Explicit limitations

- All people, organizations, opportunities, events, evidence references, authority records and outcomes are fictional.
- No backend, database, authentication, account system, tenant isolation, RLS, API, durable storage, secure upload, messaging, real application submission, disclosure or contact service exists.
- The synthetic audit sequence is caller-supplied and in-memory; it is not append-only or tamper-evident.
- No real identity, age, guardian authority, consent, reviewer independence, evidence authenticity, organization authority, FIFA licence or safeguarding status is established.
- A passing synthetic evaluation does not mean approved, selected, invited, trial-ready, placed or safe in the real world.
- No real player/minor data, identity documents, private contact details, media or consent may be entered.
- The Tournament Manager eligibility panel is a synthetic review-state demonstration only; it does not determine or certify real eligibility.
- The prototype is not a production service, legal-compliance certification, security boundary, safeguarding certification or evidence of product-market fit.

## Mainline boundary

Mainline implementation remains on hold. Database execution, RLS, API, authentication, real identity processing, external-data ingestion, production deployment and real-world pilot activity are not authorized by this prototype.

External stakeholder responses are not a prerequisite for continued internal development of synthetic demonstration work. Silence is not validation, consent, approval or ratification. Any future external evidence must be evaluated on its merits and through the relevant decision gates.

## Next engineering sequence

1. Continue UI-008: complete the interpolation and output-context inventory across all 11 specialist workspaces; the existing 29-sink hostile-renderer regression coverage is targeted evidence, not a complete security review.
2. Extend malformed-fixture tests to remaining pages and nested collections, preserving explicit empty/hold states and avoiding invented consent, authority, evidence or readiness.
3. Review URL construction and accepted schemes for every dynamic navigation and handoff destination, including any future external destinations.
4. Record each UI-008 finding with file, line, sink, context, risk, mitigation and exact test evidence; keep UI-008 open until all required items are verified.
5. Rehearse the new guided synthetic walkthrough and prepare a concise limitations sheet before any adult stakeholder demonstration; do not treat a demo reaction as validation or authorization.
6. Keep mainline, real-data, deployment and pilot gates closed until their own evidence and authorization requirements are met.

## Governing references

- [Canonical Gate Status](../docs/00-gate-status.md)
- [Constitution](../docs/00-constitution.md)
- [Domain Model](../docs/01-domain-model.md)
- [Relationship Model](../docs/02-relationship-model.md)
- [Documentation Integrity and Error Prevention](../docs/engineering-integrity.md)
- [Development Boundary](DEVELOPMENT-BOUNDARY.md)


## Organizer handoff lifecycle contract

See [Organizer Claim Lifecycle Contract](ORGANIZER-CLAIM-LIFECYCLE-CONTRACT.md) for the proposed append-only revision, withdrawal, supersession, idempotency and authority-separation model. It is not ratified and does not authorize implementation.
