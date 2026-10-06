# SQL Schema Draft — Adversarial Review — 2026-10-06

**Artifact:** `docs/research/scoutsa-schema-draft.sql`  
**Decision:** CONDITIONAL PASS — SAFE AS A NON-EXECUTED DRAFT; MIGRATION HOLD

## Checks

| Check | Result |
|---|---|
| Table boundary matches frozen physical boundary | PASS |
| Declared FK references point to declared candidate tables | PASS |
| Ratified semantic distinctions preserved | PASS |
| Derived readiness remains separate | PASS |
| Assertion/Evidence/Verification separation | PASS |
| GuardianLink/Consent separation | PASS |
| Child Voice separation | PASS |
| Safeguarding Case/Response separation | PASS |
| Application/Outcome separation | PASS |
| Sensitive/conditional domains bounded | PASS |
| RLS/access assumptions absent | PASS |
| Legal authority assumptions absent | PASS |
| Retention assumptions absent | PASS |
| 33×3 Existence | PASS |
| 33×3 Coherence | PASS |
| 33×3 Failure containment | PASS |

## Technical caveat

This draft has **not** been executed against PostgreSQL. Therefore:
- syntax/runtime validity is not claimed;
- migration success is not claimed;
- schema deployment is not claimed.

The declared foreign keys are only draft structural relationships. They do not settle unresolved domain cardinality or authority policy.

## Decision

The SQL draft is admissible for the next controlled step: **offline syntax/static review and migration-safety design**.

No database write is authorized.
