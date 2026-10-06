# ScoutSA Nullability / Defaults / Index / Uniqueness Review — 2026-10-06

**AuthorityLevel:** NONE  
**Status:** PASS WITH EXPLICIT POLICY HOLDS

## 1. Evidence inputs

- Physical table boundary: frozen.
- Field/Constraint Decision Matrix: adversarially reviewed.
- SQL draft blob: `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`.
- PostgreSQL runtime witness: PASS against the exact SQL blob.
- Migration-safety review: CONDITIONAL PASS / execution hold.

## 2. Review rule

A database constraint may preserve an already-established semantic requirement, but must not invent unresolved operational, legal, authority, lifecycle, disclosure, or cardinality policy.

## 3. Nullability

### PASS — identity and structural keys

The following are structurally required in the current draft and may remain NOT NULL:

- primary-key `id` fields;
- `created_at` where the record requires provenance of creation;
- structural relationship keys required for the already-frozen relationship itself;
- fields whose absence would make the table row cease to represent the defined concept.

### HOLD — policy-sensitive fields

Do not tighten nullability merely for implementation convenience for:

- authorizer/authority references;
- context/scope references;
- temporal expiry/effective fields;
- provenance references;
- purpose references where the collection context is conditional;
- child voice expression fields;
- safeguarding provenance/context fields;
- outcome application linkage;
- derived-state derivation references.

Their exact requiredness depends on workflow, purpose, lifecycle, or legal/operational decisions.

### Decision

**NULLABILITY: SAFE TO RETAIN CURRENT DRAFT BOUNDARY; POLICY-SENSITIVE TIGHTENING HOLD.**

## 4. Defaults

The current SQL draft intentionally uses very few defaults.

This is appropriate at the current stage.

No default should silently mean:

- consent granted;
- authority established;
- verification passed;
- safeguarding cleared;
- application approved;
- outcome accepted;
- child voice absent/irrelevant;
- readiness safe/ready;
- public visibility permitted.

### Decision

**DEFAULTS: PASS — NO SEMANTIC DEFAULTS AUTHORIZED.**

Operational timestamp defaults may be considered later where they preserve event-record mechanics without changing meaning.

## 5. Primary keys

UUID primary keys are structurally appropriate for the current candidate tables.

**Decision: PASS.**

This establishes identity uniqueness only; it does not establish business uniqueness.

## 6. Foreign keys

The existing 17 FK relationships were runtime-witnessed successfully.

FKs establish referential integrity only.

They do not establish:

- Guardian legal precedence;
- authorization;
- disclosure permission;
- safeguarding authority;
- Player/User cardinality;
- actor/Organization authorization.

**Decision: PASS.**

## 7. Uniqueness

### Clearly structural uniqueness

Primary-key uniqueness is sufficient for current identity rows.

### Policy-sensitive uniqueness — HOLD

Do not yet add unique constraints for:

- User ↔ Player;
- Guardian ↔ Player beyond the frozen relationship concept;
- Player ↔ Organization membership;
- Player ↔ Opportunity application;
- Outcome per application;
- Assertion per subject/context;
- Evidence per source/subject;
- Verification per subject/scope;
- Consent per purpose/scope;
- readiness per Player/Opportunity;
- media per Player/purpose.

Each may legitimately require multiple historical, concurrent, scoped, superseding, or corrected records.

### Decision

**BUSINESS UNIQUENESS: HOLD pending explicit operational/lifecycle decisions.**

## 8. Indexes

No additional index is currently authorized solely from assumed query patterns.

Candidate indexes can later be derived from:

- approved MVP access patterns;
- workflow transition queries;
- provenance/audit retrieval;
- scoped opportunity discovery;
- authorized Player/Guardian access.

Index design must not become a disguised access-control or authority decision.

**Decision: INDEX DESIGN — HOLD pending approved access/workflow review.**

## 9. Lifecycle constraints

No CHECK constraint should be introduced yet for status vocabularies whose lifecycle is still operationally open.

Examples:

- application states;
- consent states;
- verification states;
- safeguarding response states;
- outcome states.

The current `status text` fields remain deliberately permissive draft fields.

**Decision: LIFECYCLE CHECK CONSTRAINTS — HOLD.**

## 10. 33×3

- Existence: PASS
- Coherence: PASS
- Failure containment: PASS

## 11. Decision

**NULLABILITY / DEFAULT / INDEX / UNIQUENESS REVIEW: PASS WITH POLICY HOLDS**

The current draft does not require technical tightening that would silently invent domain semantics.

The correct next gate is **RLS / access / disclosure review**, followed by explicit authorization only for a controlled non-production migration dry run.

No production database or application data is authorized.
