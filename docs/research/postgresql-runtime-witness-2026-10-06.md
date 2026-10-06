# PostgreSQL Runtime Witness — 2026-10-06

**AuthorityLevel:** NONE  
**Status:** PASS — RUNTIME WITNESS RECORDED  
**Scope:** isolated non-production GitHub Actions PostgreSQL service only

## Witness identity

- Repository: `Moshoeshoe333/ScoutSA`
- Witness commit: `47210a0500b583cc9ef9b1557df5577edcf5d6e9`
- Workflow: `.github/workflows/postgresql-runtime-witness.yml`
- Workflow run: `37468042116`
- Job: `112283944840`
- Trigger: pull_request
- Run conclusion: SUCCESS
- Exact SQL blob expected: `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`
- Actual SQL blob witnessed: `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`

## PostgreSQL runtime

The workflow started an isolated `postgres:17` service container.

Observed server version:

```
PostgreSQL 17.11 (Debian 17.11-1.pgdg13+2)
on x86_64-pc-linux-gnu,
compiled by gcc (Debian 14.2.0-19) 14.2.0, 64-bit
```

The client reported:

```
psql (PostgreSQL) 16.15
```

The server became healthy and accepted connections before schema execution.

## Exact SQL execution

The workflow executed the exact pinned SQL draft with:

```
psql ... -v ON_ERROR_STOP=1 -f docs/research/scoutsa-schema-draft.sql
```

Observed result:

- 26 `CREATE TABLE` operations completed.
- No SQL execution error was reported.
- The SQL blob identity matched the expected witness SHA.

## Structural checks

Expected tables: **26**  
Observed tables: **26** — PASS

Expected foreign keys: **17**  
Observed foreign keys: **17** — PASS

Observed public tables:

```
academic_profiles
assertions
audit_events
child_participation_voice_records
coaches
consent_records
evidence
football_readiness
guardian_links
guardians
media
medical_clearances
memberships
opportunities
opportunity_applications
opportunity_readiness
organizations
outcomes
players
safeguarding_cases
safeguarding_responses
scouts
season_performances
transport_profiles
users
verifications
```

## Witness conclusion

**PostgreSQL syntax/runtime execution for the exact SQL blob: PASS.**

This establishes that the exact SQL draft was accepted and executed successfully by PostgreSQL 17.11 in an isolated non-production environment, and that the declared 26-table / 17-FK structural checks passed.

## Boundary

This witness does **not** establish:

- production database deployment;
- migration safety or reversibility;
- RLS correctness;
- authorization correctness;
- API/UI correctness;
- authentication-provider correctness;
- retention/deletion compliance;
- POPIA, Children's Act, FIFA, SAFA or other legal/institutional compliance;
- production readiness;
- investor readiness.

No production database was touched.

## Required next controls

1. Migration transaction/reversibility review.
2. Final field/nullability/default reconciliation.
3. Index/uniqueness review.
4. RLS/access review.
5. Authorized non-production migration dry run.
6. Explicit migration authorization.
7. Post-migration runtime witness.

**Decision:** PostgreSQL Runtime Witness — **PASS**, with migration and production boundaries still held.
