# ScoutSA SQL Draft Static Witness & Migration-Safety Review — 2026-10-06

## Authority

**AuthorityLevel: NONE**

This document is an evidence witness for the current SQL draft. It does not ratify migration, production execution, RLS, API, UI, authentication, retention, or legal policy.

Governing rule:

> Strength of a claim must never exceed strength of evidence.

## Witness target

- Repository: `Moshoeshoe333/ScoutSA`
- File: `docs/research/scoutsa-schema-draft.sql`
- Witnessed blob SHA: `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`
- Draft commit: `8f5dd03436122975747ab324c429cd0db0260a58`
- Later SQL review-note commit: `b5bd6f452b4482020d4ef060dce0e9754726c46b`
- Status at witness: **DRAFT / NOT EXECUTED**

## Static witness scope

The review checks the draft as text and structure only.

### SW-01 — Candidate table coverage

The SQL draft declares the frozen candidate physical table set:

`users`, `players`, `guardians`, `organizations`, `coaches`, `scouts`, `guardian_links`, `memberships`, `assertions`, `evidence`, `verifications`, `consent_records`, `media`, `season_performances`, `academic_profiles`, `medical_clearances`, `transport_profiles`, `opportunities`, `opportunity_applications`, `outcomes`, `child_participation_voice_records`, `safeguarding_cases`, `safeguarding_responses`, `football_readiness`, `opportunity_readiness`, `audit_events`.

**Result: PASS — textually traceable to the frozen physical table boundary.**

### SW-02 — Declared foreign-key target traceability

The declared FK targets in the draft point to candidate tables declared in the same draft:

- `guardian_links.player_id → players.id`
- `guardian_links.guardian_id → guardians.id`
- `memberships.player_id → players.id`
- `memberships.organization_id → organizations.id`
- `media.player_id → players.id`
- `season_performances.player_id → players.id`
- `academic_profiles.player_id → players.id`
- `medical_clearances.player_id → players.id`
- `transport_profiles.player_id → players.id`
- `opportunities.organization_id → organizations.id`
- `opportunity_applications.player_id → players.id`
- `opportunity_applications.opportunity_id → opportunities.id`
- `outcomes.application_id → opportunity_applications.id`
- `safeguarding_responses.case_id → safeguarding_cases.id`
- `football_readiness.player_id → players.id`
- `opportunity_readiness.player_id → players.id`
- `opportunity_readiness.opportunity_id → opportunities.id`

**Result: PASS — no declared FK target points to an undeclared candidate table.**

This is structural traceability only. It does not settle unresolved cardinality, authority, access, or legal policy.

### SW-03 — Semantic separation

The draft keeps separate tables for:

- Assertion;
- Evidence;
- Verification;
- ConsentRecord;
- GuardianLink;
- Child Participation / Voice;
- Safeguarding Case / Response;
- OpportunityApplication;
- Outcome;
- FootballReadiness;
- OpportunityReadiness;
- AuditEvent.

**Result: PASS.**

No ratified M1–M9 distinction is intentionally collapsed by the table boundary.

### SW-04 — Derived-state containment

`football_readiness` and `opportunity_readiness` are separate derived-state tables and contain derivation timestamps/references.

**Result: PASS.**

No readiness table is treated as a replacement for source assertions, evidence, verification, consent, application, safeguarding, or outcome records.

### SW-05 — Sensitive / conditional data containment

Academic, medical, and transport concepts remain separate from the universal Player identity record.

**Result: PASS.**

The draft does not create a universal detailed medical or academic repository.

### SW-06 — Pending-policy containment

The draft does not encode:

- User ↔ Player cardinality/delegation;
- actor ↔ Organization affiliation/authorization;
- Guardian conflict precedence;
- authorizer legal effect;
- application transition authority/lifecycle policy;
- outcome correction/dispute/supersession policy;
- child-voice legal/operational effects;
- safeguarding escalation authority;
- access/disclosure/RLS;
- retention/deletion;
- provider/authentication/storage choices.

**Result: PASS.**

These remain explicit holds rather than hidden schema assumptions.

### SW-07 — Syntax/runtime boundary

No PostgreSQL server execution was performed as part of this witness.

Therefore this witness **does not claim**:

- PostgreSQL parser acceptance;
- migration success;
- database creation success;
- FK runtime acceptance;
- extension availability;
- transaction behavior;
- RLS behavior;
- performance;
- deployment success.

**Result: NOT TESTED / HOLD.**

## Migration-safety assessment

A migration is **not authorized** by this witness.

Before migration authorization, the following evidence is still required:

1. SQL syntax/parser witness against an actual PostgreSQL-compatible parser/runtime.
2. Explicit migration transaction/reversibility review.
3. Field/nullability/default review against the frozen field/constraint matrix.
4. Policy-to-schema traceability for every constraint that affects authority, access, disclosure, retention, or lifecycle.
5. RLS/access design and review, separately from this draft.
6. Test data strategy that contains no unnecessary real player personal information.
7. Migration dry-run evidence in a non-production environment.
8. Explicit migration authorization recorded in the ledger.
9. Post-migration runtime witness.

## 33×3

- Existence: **PASS**
- Coherence: **PASS**
- Failure containment: **PASS**

## Decision

**SQL DRAFT STATIC WITNESS: PASS WITH RUNTIME HOLD**

The draft is structurally traceable and semantically bounded as a non-executed artifact.

**Migration: HOLD.**

The next authorized control is an actual PostgreSQL syntax/runtime witness followed by migration-safety review. No production database write is authorized by this document.

