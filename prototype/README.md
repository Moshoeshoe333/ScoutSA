# ScoutSA Internal Web Prototype

**Branch:** `prototype/internal-demo`  
**State as at:** 13 November 2026  
**Purpose:** isolated synthetic-data design, workflow and policy-evaluation demonstration.

This branch contains a static browser prototype and a synthetic review engine. It is deliberately separate from mainline. It does not lift any mainline implementation hold.

## Current verified state

- Review engine: `review-engine.js` **v0.3.0**.
- Synthetic audit-history validator: `audit-history.js` **v0.2.0**, integrated as a mandatory structural gate in the synthetic invitation-review evaluation.
- Node test declarations: **121 total** — **79/79 review-engine tests**, 9 documentation-integrity checks, 31 audit-history tests and 2 workspace-data-integrity checks.
- Latest full engine/browser verification: [GitHub Actions run 43444088668](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43444088668), commit `0e95f7d47112b5276552f84e1d362106270ec91b`: **121/121 Node tests**, **7/7 Discovery & Request Review browser groups**, **8/8 workspace hub/navigation groups**, and **12/12 specialist interaction groups**.
- The later session-ledger documentation commit `073655260ac86423182e613329842789a74d84ae` passed its configured hosted workflow: [run 43445376478](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43445376478). This is a later documentation-workflow result, not a new claim that the 121-test/browser suite was rerun on that commit.

The test counts above are source declarations and the cited workflow is the recorded execution evidence. Historical counts and earlier runs are intentionally omitted here to avoid presenting obsolete baselines as current.

## Open the prototype

Open `index.html` in a modern browser. No build step or package installation is required. The hub links to 11 specialist workspaces:

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

Hosted CI also runs the Playwright/Chromium browser smoke scripts configured in `.github/workflows/prototype-policy-tests.yml`. The cited 43444088668 run is the current recorded full verification for the 121-test inventory and three browser suites.

## Review engine and invitation gate

The pure review evaluator is UI-independent and uses synthetic inputs. The audit-history validator requires a caller-supplied synthetic event sequence with review-completion events, evidence-version/fingerprint links, scoped synthetic authority records, ordered timestamps, state agreement and invalidation handling.

A successful synthetic result can reach only **eligibility for separate human review**. It is not a human decision. The engine always returns `disclosurePermitted: false`. Missing, malformed, mismatched, superseded, revoked, expired or otherwise unacceptable required evidence fails closed.

The audit-history model is experimental and not ratified. It is not an immutable or durable audit service: it provides no cryptographic integrity, trusted timestamps, real identity proofing, real authority verification or production authorization. Evidence references and fingerprints are synthetic fixture values.

Historical source-count references: Recorded 45-test CI baseline: [run 43401941704](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401941704). Historical 46-test CI verification: [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544).

See:
- [Review Engine Contract](REVIEW-ENGINE-CONTRACT.md) — draft, not ratified.
- [Synthetic Audit-History Proposal](SYNTHETIC-AUDIT-HISTORY-PROPOSAL.md).
- [Affiliation Evidence Model Proposal](AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md) — non-ratified.
- [Opportunity Evidence Acceptance Matrix](OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md) — non-ratified.
- [Opportunity Requirement Declaration](OPPORTUNITY-REQUIREMENT-DECLARATION.md) — non-ratified.
- [Opportunity Validation Scenario Pack](OPPORTUNITY-VALIDATION-SCENARIO-PACK.md) — synthetic and non-ratified.
- [33-tier Audit-History Assessment](verification/33-tier-audit-history-assessment-2026-11-13.md).
- [Session Ledger — 13 November 2026](verification/SESSION-LEDGER-2026-11-13.md).

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

1. Wire the pure review evaluator into Discovery & Request Review using bounded synthetic-only inputs.
2. Add browser coverage for missing history, invalidated evidence, valid synthetic history, reset/replay and the permanently unavailable disclosure boundary.
3. Complete the UI-008 interpolation, output-context, URL-policy and malformed-fixture audit before considering any external/user-supplied content.
4. Prepare a partner-demo walkthrough and limitations sheet.
5. Keep mainline, real-data, deployment and pilot gates closed until their own evidence and authorization requirements are met.

## Governing references

- [Canonical Gate Status](../docs/00-gate-status.md)
- [Constitution](../docs/00-constitution.md)
- [Domain Model](../docs/01-domain-model.md)
- [Relationship Model](../docs/02-relationship-model.md)
- [Documentation Integrity and Error Prevention](../docs/engineering-integrity.md)
- [Development Boundary](DEVELOPMENT-BOUNDARY.md)
