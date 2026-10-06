# PostgreSQL Runtime Witness — F1–F3 Amended SQL — 2026-10-06

**AuthorityLevel:** NONE  
**Status:** PASS — exact amended SQL witnessed in isolated CI  
**Run:** 37479429284  
**Job:** 112323365262  
**Branch:** evidence/postgresql-runtime-witness-f1-f3-2026-10-06  
**Witness commit:** c40c81b3ff763f483eedceeadcbcc1e4035f3a4e  
**SQL blob:** 00f0dd0542f7f9a92447799f1452b26c513b06a5

## Evidence

- GitHub Actions job completed SUCCESS.
- Exact SQL blob verification completed SUCCESS.
- PostgreSQL 17 service initialized successfully.
- Exact amended SQL executed with `ON_ERROR_STOP=1`.
- Structural verification completed successfully.
- Expected 26 public tables verified.
- Expected 17 foreign keys verified.

## Boundary

This is an isolated non-production PostgreSQL runtime witness.

It does not establish:
- production migration safety;
- RLS correctness;
- access/disclosure authorization;
- POPIA or Children's Act compliance;
- legal validity;
- production readiness.

## Decision

**POSTGRESQL RUNTIME WITNESS FOR F1–F3 AMENDED SQL: PASS.**
