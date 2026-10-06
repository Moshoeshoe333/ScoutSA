# ScoutSA PostgreSQL Runtime Witness — Environment Limitation — 2026-10-06

## Authority

**AuthorityLevel: NONE**

This artifact records an execution-environment limitation. It does not convert the absence of a PostgreSQL runtime into a syntax PASS, migration PASS, deployment PASS, or production-readiness claim.

Governing rule:

> Strength of a claim must never exceed strength of evidence.

## Target

- Repository: `Moshoeshoe333/ScoutSA`
- SQL draft: `docs/research/scoutsa-schema-draft.sql`
- SQL draft blob witnessed by the prior static review: `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`
- Static witness: `docs/research/sql-draft-static-witness-migration-safety-2026-10-06.md`
- Static witness current blob: `b0f5bc0f2f8e5037b4f856df0596f95163b0410e`

## Environment check

The available execution environment was checked for a PostgreSQL-capable runtime.

| Capability | Result |
|---|---|
| `psql` | NOT AVAILABLE |
| `postgres` | NOT AVAILABLE |
| `pg_isready` | NOT AVAILABLE |
| Docker | NOT AVAILABLE |
| Podman | NOT AVAILABLE |
| Python `psycopg` | NOT AVAILABLE |
| Python `psycopg2` | NOT AVAILABLE |
| `sqlglot` | NOT AVAILABLE |
| `pglast` | NOT AVAILABLE |
| `pg_config` | PRESENT, but insufficient by itself for SQL parser/runtime execution |

## Evidence consequence

Because no PostgreSQL-compatible parser/server/runtime was available:

- PostgreSQL syntax acceptance: **UNAVAILABLE / NOT TESTED**
- PostgreSQL database creation: **UNAVAILABLE / NOT TESTED**
- migration execution: **HOLD**
- FK runtime acceptance: **UNAVAILABLE / NOT TESTED**
- transaction/reversibility behavior: **UNAVAILABLE / NOT TESTED**
- extension/runtime behavior: **UNAVAILABLE / NOT TESTED**
- production database write: **NOT AUTHORIZED**

The prior static witness remains valid only for the scope it actually tested: textual table coverage, FK target traceability, semantic separation, derived-state containment, conditional-data containment, and containment of unresolved policy decisions.

## Required next evidence

When a genuine PostgreSQL-capable environment is available:

1. Re-fetch the SQL draft and verify the target blob SHA.
2. Run an actual PostgreSQL parser/runtime witness.
3. Record exact PostgreSQL version and execution result.
4. Review migration transaction and reversibility behavior.
5. Reconcile field/nullability/default constraints with the frozen decision matrix.
6. Review RLS/access policy separately.
7. Perform a non-production migration dry run.
8. Record explicit migration authorization before any database write.
9. Perform and record a post-migration runtime witness.

## 33×3

- Existence: **PASS** — the limitation and required next evidence are explicitly represented.
- Coherence: **PASS** — environment unavailability is not promoted into a SQL correctness claim.
- Failure containment: **PASS** — migration remains blocked until runtime evidence exists.

## Decision

**POSTGRESQL RUNTIME WITNESS: UNAVAILABLE**

**SQL syntax/runtime: HOLD**

**Migration-safety review: HOLD**

**Migration: HOLD**

**Production database: HOLD**

No implementation authority is created by this artifact.
