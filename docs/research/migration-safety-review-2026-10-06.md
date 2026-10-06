# ScoutSA Migration-Safety Review — 2026-10-06

**AuthorityLevel:** NONE  
**Status:** CONDITIONAL PASS — MIGRATION AUTHORIZATION HOLD

## 1. Evidence inputs

- Exact SQL draft: `docs/research/scoutsa-schema-draft.sql`
- SQL blob: `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`
- PostgreSQL runtime witness: `docs/research/postgresql-runtime-witness-2026-10-06.md`
- Runtime witness: PostgreSQL 17.11, isolated GitHub Actions service
- Runtime result: SUCCESS
- Structural result: 26/26 tables, 17/17 foreign keys

## 2. MS-01 — Exact-input integrity

**PASS**

The runtime witness explicitly verified the SQL blob before execution. The witnessed blob matches the current controlled SQL draft:

`127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`.

Any subsequent SQL content change invalidates this specific runtime witness and requires a new witness.

## 3. MS-02 — PostgreSQL runtime

**PASS**

The exact SQL draft was executed against PostgreSQL 17.11 with `ON_ERROR_STOP=1`.

This establishes parser/runtime acceptance for the witnessed SQL input in the isolated non-production environment.

It does not establish migration safety, authorization, RLS, or production readiness.

## 4. MS-03 — Transaction and reversibility

### Structural assessment

The current SQL draft consists of `CREATE TABLE` statements and foreign-key declarations. It contains no data manipulation, external side effects, extension installation, role creation, grants, RLS policies, triggers, functions, indexes, sequences explicitly managed outside table creation, or destructive `DROP`/data-altering statements.

For PostgreSQL, the DDL in this draft is suitable for a controlled transaction boundary in principle.

### Boundary

**PASS AS DESIGN ASSESSMENT / RUNTIME REVERSIBILITY NOT YET WITNESSED**

The repository must not claim that rollback/reversibility has been demonstrated until a transaction-wrapped non-production test actually demonstrates failure/rollback behavior.

No production migration is authorized by this assessment.

## 5. MS-04 — Field / constraint reconciliation

**PASS WITH REVIEW HOLDS**

The physical table set remains within the frozen boundary and the field/constraint matrix has already passed adversarial review.

The runtime witness confirms the declared FK structure executes.

However, the following remain intentionally unfinalized:

- exact nullability/default policy where operational workflow requires more precision;
- indexes/uniqueness;
- lifecycle/check constraints;
- policy-dependent cardinality;
- access/disclosure constraints;
- retention/deletion behavior.

No new constraint should be added merely for technical convenience.

## 6. MS-05 — Access / RLS separation

**HOLD**

No RLS or authorization policy is present in the SQL draft.

This is correct for the current evidence boundary.

A separate RLS/access review is required before any application data access is considered authorized.

## 7. MS-06 — Non-production dry run

**HOLD — REQUIRES EXPLICIT AUTHORIZATION**

A non-production database dry run must be separately authorized.

The existing GitHub Actions witness is a runtime execution witness, not authorization to establish a persistent project database or to perform a migration.

The dry run should prove:

1. clean database creation;
2. migration transaction behavior;
3. rollback on controlled failure where feasible;
4. repeatability/idempotence expectations as explicitly defined;
5. resulting table/FK inspection;
6. exact input provenance.

## 8. MS-07 — Production boundary

**HOLD / NOT AUTHORIZED**

No production database, hosted project, user data, or production credentials may be introduced by this review.

## 9. Additional design observations

### 9.1 Current SQL is schema DDL, not yet a migration artifact

The current file is a create-from-zero schema draft. It does not yet define versioned migration metadata, upgrade ordering from an existing schema, rollback strategy, or compatibility behavior with deployed application versions.

Therefore it should not be represented as a production migration merely because PostgreSQL executes it.

### 9.2 Index and uniqueness review remains required

Primary keys provide identity uniqueness, but relationship and workflow access patterns have not yet received a dedicated index/uniqueness decision.

Potential constraints must not be invented before the corresponding domain/operational question is settled.

### 9.3 Nullability/default review remains required

Many fields are deliberately nullable or lack defaults. This is currently conservative, but the MVP workflow must determine which fields are required at which transition without turning workflow convenience into hidden semantics.

### 9.4 Foreign keys do not establish authority

The witnessed FKs preserve structural referential integrity only. They do not establish Guardian precedence, actor authorization, disclosure permission, or safeguarding authority.

## 10. 33×3

- Existence: **PASS**
- Coherence: **PASS**
- Failure containment: **PASS**

## 11. Decision

**MIGRATION-SAFETY REVIEW: CONDITIONAL PASS — MIGRATION AUTHORIZATION HOLD**

The PostgreSQL runtime barrier is cleared for the exact current SQL draft.

The migration barrier is **not** cleared.

### Next controlled evidence

1. final nullability/default decision mapping;
2. index/uniqueness decision mapping;
3. RLS/access review;
4. explicit authorization for a non-production migration dry run;
5. transaction/reversibility witness;
6. post-dry-run schema inspection;
7. post-migration runtime witness.

**No production migration is authorized.**
