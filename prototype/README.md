# ScoutSA Internal Web Prototype

**Branch:** `prototype/internal-demo`  
**State as at:** 16 November 2026  
**Purpose:** isolated synthetic-data design, workflow and policy-evaluation demonstration.

This branch contains a static browser prototype and a synthetic review engine. It is deliberately separate from mainline. It does not lift any mainline implementation hold.

## Current verified state

- Review engine: `review-engine.js` **v0.3.0**.
- Synthetic audit-history validator: `audit-history.js` **v0.2.0**, integrated as a mandatory structural gate in the synthetic invitation-review evaluation.
- Node test declarations: **121 total** — **79/79 review-engine tests**, 9 documentation-integrity checks (9 checks declared), 31 audit-history tests and 2 workspace-data-integrity checks.
- Pre-preview verification checkpoint: [GitHub Actions run 43868685945](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43868685945), commit `a22a52de4a4a18166f0e2478a14c73f786b776e7`, completed successfully before the player-facing preview was added.
- The latest fully recorded browser baseline is [GitHub Actions run 43871407060](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43871407060), tested commit `7ff31a19bcaa1c0386247dc0f5b9a197f44fdfc3`. That run completed the 121 Node tests and seven browser suites: Discovery & Request Review, workspace hub/navigation, player preview, Vaal ecosystem coverage, tournament relationship hub, tournament manager and specialist interactions. It predates the later Tournament Manager validation-pattern correction and Tournament Day Operations addition; those later changes require a fresh CI run before being described as verified.
- The preview, coverage workbench, Tournament Manager and Tournament Day Operations exist on the isolated prototype branch only. Player-preview WhatsApp and copy-link actions stay disabled until a public HTTPS URL exists. A passing run is regression evidence, not safeguarding, privacy, accessibility or production approval. Older run links below are historical checkpoints.

The test counts above are source declarations and the cited workflow is the recorded execution evidence. The 14 specialist groups include hostile URL/identifier checks and hostile fixture-string checks at actual render sinks across Passport, organization membership, opportunity, evidence, invitation, matching, pathway, consent, academy, decision and discovery-request workspaces. Targeted browser regression checks now exercise all 29 identified HTML assignment sinks, including the Discovery gate renderer; URL/handoff sinks are checked for hostile identifiers and unsafe schemes. This is not a complete security sign-off: output-context review and malformed-fixture resilience remain open. Helper-level hostile/nullish checks run across all 11 workspaces. This is targeted regression evidence, not a complete security sign-off.

## Open the prototype

Open `index.html` in a modern browser. No build step or package installation is required. The hub provides a separate three-screen Player Experience Preview for coach/guardian conversations, plus 11 specialist workspaces. The player preview is not counted as a specialist workspace:

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

The workspaces are separate static pages. Navigation and URL handoffs do not create shared application state, persistence, authentication or authorization.

## Run tests

From the repository root:

```sh
node --test prototype/tests/*.test.js
```

Hosted CI runs eight Playwright/Chromium browser smoke scripts configured in `.github/workflows/prototype-policy-tests.yml`: Discovery & Request Review, workspace hub/navigation, player journey preview, Vaal ecosystem coverage, tournament relationship hub, tournament manager, tournament day operations and specialist workspace interactions. Check the latest run on the `prototype/internal-demo` branch before relying on the new preview's browser test. A passing run is regression evidence only—not safeguarding, privacy, accessibility or production-readiness approval.

## Review engine and invitation gate

The pure review evaluator is UI-independent and uses synthetic inputs. The audit-history validator requires a caller-supplied synthetic event sequence with review-completion events, evidence-version/fingerprint links, scoped synthetic authority records, ordered timestamps, state agreement and invalidation handling.

A successful synthetic result can reach only **eligibility for separate human review**. It is not a human decision. The engine always returns `disclosurePermitted: false`. Missing, malformed, mismatched, superseded, revoked, expired or otherwise unacceptable required evidence fails closed.

The audit-history model is experimental and not ratified. It is not an immutable or durable audit service: it provides no cryptographic integrity, trusted timestamps, real identity proofing, real authority verification or production authorization. Evidence references and fingerprints are synthetic fixture values.

Historical source-count references: Recorded 45-test CI baseline: [run 43401941704](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401941704). Historical 46-test CI verification: [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544).

See:
- [Player Preview Validation Plan](PLAYER-PREVIEW-VALIDATION.md) — 14-day coach/parent discovery plan, open-ended price questions, stop rule and adult-pilot limitations.\n- [Vaal Football Ecosystem Register](VAAL-FOOTBALL-ECOSYSTEM-REGISTER.md) — research-seeded team, tournament, school and creator leads with provenance and verification states. It is not a complete census.\n- [Vaal-to-National Operating Model](VAAL-FOOTBALL-OPERATING-MODEL.md) — ELFA-first ecosystem, tournament statistics, internal scouting-support agent, schools, creators and national expansion.\n- [Vaal Ecosystem Coverage Workbench](vaal-ecosystem-coverage.html) — static, searchable research seed; no backend or verified team claims.\n- [Tournament Relationship Hub](tournament-intelligence.html) — synthetic tournament registry connecting editions, organizers, teams, coaches, player participation, fixtures and stat lines.\n- [Tournament Manager](tournament-manager.html) — session-only workflow for event setup, divisions, team/coach registration, synthetic player participation, fixtures, results, sourced statistics, record ledger and JSON export. All changes reset on refresh.
- [Tournament Day Operations](tournament-day-operations.html) — session-only match-day workflow for fixture status, synthetic officials, lineups, substitution validation, sourced match events, match reports and an evidence/provenance ledger. No real data or uploads.\n- [Tournament Relationship Model](TOURNAMENT-RELATIONSHIP-MODEL.md) — proposed primary-key, junction-table, statistic-provenance and organizer-feature model; not ratified for mainline.
- [SAFA Emfuleni Exploratory Engagement Brief](SAFA-EMFULENI-ENGAGEMENT-BRIEF.md) — discussion brief requesting guidance and a low-risk first mapping exercise; no partnership is claimed.
- [Review Engine Contract](REVIEW-ENGINE-CONTRACT.md) — draft, not ratified.
- [Synthetic Audit-History Proposal](SYNTHETIC-AUDIT-HISTORY-PROPOSAL.md).
- [Affiliation Evidence Model Proposal](AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md) — non-ratified.
- [Opportunity Evidence Acceptance Matrix](OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md) — non-ratified.
- [Opportunity Requirement Declaration](OPPORTUNITY-REQUIREMENT-DECLARATION.md) — non-ratified.
- [Opportunity Validation Scenario Pack](OPPORTUNITY-VALIDATION-SCENARIO-PACK.md) — synthetic and non-ratified.
- [33-tier Audit-History Assessment](verification/33-tier-audit-history-assessment-2026-11-13.md).
- [Session Ledger — 13 November 2026](verification/SESSION-LEDGER-2026-11-13.md).
- [Session Ledger — 16 November 2026](verification/SESSION-LEDGER-2026-11-16.md).

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
- The prototype is not a production service, legal-compliance certification, security boundary, safeguarding certification or evidence of product-market fit.

## Mainline boundary

Mainline implementation remains on hold. Database execution, RLS, API, authentication, real identity processing, external-data ingestion, production deployment and real-world pilot activity are not authorized by this prototype.

External stakeholder responses are not a prerequisite for continued internal development of synthetic demonstration work. Silence is not validation, consent, approval or ratification. Any future external evidence must be evaluated on its merits and through the relevant decision gates.

## Next engineering sequence

1. Continue UI-008: complete the interpolation and output-context inventory across all 11 specialist workspaces, including the remaining individual sinks not yet covered by hostile-fixture tests.
2. Extend actual-renderer tests to remaining profile, option, dimension, rules/limits, opportunity and discovery-gate sinks.
3. Review URL construction and accepted schemes for every dynamic navigation and handoff destination.
4. Test malformed and unexpected fixture shapes for resilient, fail-closed rendering without console errors.
5. Record each UI-008 finding with file, line, sink, risk, mitigation and test evidence; keep UI-008 open until all required items are verified.
6. Prepare a synthetic partner-demo walkthrough and limitations sheet after the UI safety review is complete.
7. Keep mainline, real-data, deployment and pilot gates closed until their own evidence and authorization requirements are met.

## Governing references

- [Canonical Gate Status](../docs/00-gate-status.md)
- [Constitution](../docs/00-constitution.md)
- [Domain Model](../docs/01-domain-model.md)
- [Relationship Model](../docs/02-relationship-model.md)
- [Documentation Integrity and Error Prevention](../docs/engineering-integrity.md)
- [Development Boundary](DEVELOPMENT-BOUNDARY.md)
