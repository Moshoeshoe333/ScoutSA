# ScoutSA Migration-Safety Design Hold — 2026-10-06

## Authority

**AuthorityLevel: NONE**

This document defines the evidence required before any ScoutSA SQL migration is authorized. It is not migration authorization and does not establish PostgreSQL runtime correctness.

## Current evidence

- SQL draft: `docs/research/scoutsa-schema-draft.sql`
- SQL draft blob: `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`
- Static witness: `docs/research/sql-draft-static-witness-migration-safety-2026-10-06.md`
- Static witness result: **PASS WITH RUNTIME HOLD**
- PostgreSQL environment witness: **UNAVAILABLE**
- PostgreSQL parser/runtime result: **NOT TESTED**
- Migration authorization: **NOT GRANTED**

## Migration safety gates

### MS-01 — Exact-input integrity

Before any runtime test, re-fetch the SQL file and verify its blob SHA. A changed SQL draft invalidates the existing runtime witness target.

**Status: REQUIRED**

### MS-02 — PostgreSQL parser/runtime witness

The exact SQL draft must be submitted to an actual PostgreSQL-compatible parser/runtime.

Record at minimum:

- PostgreSQL version;
- exact target commit/blob;
- parser/runtime command or test harness;
- exit/result status;
- complete relevant error output if RED.

**Status: BLOCKED — runtime unavailable**

### MS-03 — Transaction and reversibility review

Before a migration is run, determine:

- transaction boundary;
- failure behavior;
- whether partial application is possible;
- rollback/reversal procedure;
- dependency ordering;
- safe handling of an already-existing object.

No rollback claim is valid until evidenced.

**Status: HOLD**

### MS-04 — Field/constraint reconciliation

Every NOT NULL, default, uniqueness rule, FK, check constraint, index, generated value, and lifecycle constraint must trace to an approved semantic, operational, legal/jurisdictional, or implementation decision.

Technical convenience must not create domain authority.

**Status: HOLD**

### MS-05 — Access/RLS separation

RLS and access rules are a separate controlled review. No migration may imply that database ownership or FK structure equals authorization.

**Status: HOLD**

### MS-06 — Non-production dry run

Only after explicit migration authorization may a non-production database be created or reset for a dry run.

Evidence must record:

- exact migration input;
- database/runtime version;
- clean-start result;
- repeatability result where relevant;
- failure behavior;
- resulting schema inspection.

**Status: HOLD**

### MS-07 — Production boundary

Production writes require a separate explicit authorization after the preceding evidence exists.

**Status: HOLD / NOT AUTHORIZED**

## Safety rule

No claim of:

- PostgreSQL syntax validity;
- migration success;
- database creation success;
- reversibility;
- RLS correctness;
- authorization correctness;
- production readiness

may be inferred from the current static witness.

## Current decision

**MIGRATION-SAFETY DESIGN: DEFINED / EXECUTION HOLD**

The next real evidence event remains an actual PostgreSQL parser/runtime witness. Until that environment exists, the correct state is HOLD rather than PASS or FAIL.

## 33×3

- Existence: **PASS**
- Coherence: **PASS**
- Failure containment: **PASS**

No implementation authority is created by this document.
