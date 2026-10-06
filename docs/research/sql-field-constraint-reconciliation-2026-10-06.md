# ScoutSA SQL ↔ Field/Constraint Reconciliation Review — 2026-10-06

**AuthorityLevel: NONE**

## Purpose

This review reconciles the current non-executed SQL draft against the frozen Field / Constraint Decision Matrix. It is a semantic and traceability review only. It is **not** PostgreSQL syntax/runtime evidence and does not authorize migration.

Governing rule:

> Strength of a claim must never exceed strength of evidence.

## Witness inputs

- SQL draft: `docs/research/scoutsa-schema-draft.sql`
- SQL draft blob SHA: `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`
- Field/Constraint Decision Matrix blob SHA: `eae08e5a048a855e7dfc7ec640598b7807e2a443`
- SQL adversarial review: `docs/research/sql-schema-adversarial-review-2026-10-06.md`
- Static witness: `docs/research/sql-draft-static-witness-migration-safety-2026-10-06.md`

## Reconciliation tests

| Test | Result |
|---|---|
| Candidate SQL tables remain inside frozen physical table boundary | PASS |
| Core identity tables preserve User ≠ Player | PASS |
| GuardianLink remains separate from ConsentRecord | PASS |
| Assertion remains separate from Evidence and Verification | PASS |
| Child Voice remains separate from Consent/Guardian authority/Decision | PASS |
| Safeguarding Case/Response remains separate from Verification and guilt/finding | PASS |
| OpportunityApplication remains separate from Outcome | PASS |
| FootballReadiness / OpportunityReadiness remain derived | PASS |
| Conditional academic/medical data remain separate and bounded | PASS |
| Provenance/temporal fields are represented where the matrix requires them | PASS |
| Pending legal/operational decisions remain unencoded | PASS |
| SQL constraints do not silently establish unresolved authority/cardinality | PASS |
| No new semantic concept is introduced by the SQL table set | PASS |

## Field-level observations

### Identity and actors

The SQL uses stable UUID identities for User, Player, Guardian, Organization, Coach, and Scout. This preserves distinct concepts.

The SQL does **not** encode:
- universal role authority;
- User = Player;
- permanent organization affiliation;
- role-derived authorization.

This is consistent with the frozen matrix.

### Relationship tables

`guardian_links`, `memberships`, and the Player/Opportunity relationships use explicit structural references. These represent the frozen relationship concepts but do not by themselves settle unresolved operational/legal cardinality or authority policy.

### Assertion / Evidence / Verification

The SQL keeps these concepts separate and preserves subject, context/scope, attribution/source, temporal, and provenance references.

The `*_ref` fields are intentionally generic draft references. They must not be interpreted as proof that their referenced object type, authority, or access policy has already been finalized.

### Consent

`consent_records` includes purpose, scope, authorizer, status, temporal fields, and provenance. It does not encode a universal Guardian precedence rule or treat an authorizer reference as self-proving legal authority.

### Child participation / safeguarding

Both concepts have their own tables. Safeguarding responses point to safeguarding cases, while the case itself remains about a defined matter/subject rather than being inherently Player-owned.

No finding, guilt, clearance, capacity determination, best-interests adjudication, or automatic exclusion is encoded.

### Derived readiness

Both readiness tables carry derivation context and remain separate from source records. No ranking or generalized reputation mechanism appears in the draft.

## Controlled technical observations

The reconciliation identifies no semantic blocker in the current SQL draft.

However, the following remain **runtime/implementation holds**, not reconciliation failures:

1. PostgreSQL parser acceptance is not witnessed.
2. Exact nullability/default semantics require final implementation review.
3. Exact indexes/uniqueness constraints remain unset.
4. RLS/access policy is not designed.
5. Retention/deletion is not encoded.
6. Migration transaction/reversibility is not witnessed.
7. Non-production migration has not been executed.
8. Post-migration runtime evidence does not exist.

## 33×3

- Existence: **PASS**
- Coherence: **PASS**
- Failure containment: **PASS**

## Decision

**SQL ↔ FIELD/CONSTRAINT RECONCILIATION: PASS**

The current SQL draft is traceable to the frozen field/constraint boundary without an identified hidden semantic assumption.

This result does **not** establish PostgreSQL syntax validity, runtime validity, migration safety, RLS correctness, legal compliance, or production readiness.

### Next gate

**ACTUAL POSTGRESQL RUNTIME WITNESS remains REQUIRED.**

Until that evidence exists:

- Migration: **HOLD**
- Database write: **HOLD**
- RLS: **HOLD**
- API: **HOLD**
- UI: **HOLD**
- Production implementation: **HOLD**
