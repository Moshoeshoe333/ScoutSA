# ScoutSA Physical Schema Design — Draft — 2026-10-06

**Status:** DRAFT — NOT FROZEN  
**Authority:** Implementation artifact derived from the frozen schema boundary.  
**Constraint:** No migration or production implementation is authorized by this document.

## 1. Design rule

Every physical table below corresponds to an already-established domain concept. Technical identifiers are implementation details and do not establish semantic authority.

## 2. Candidate tables

```text
users
players
guardians
guardian_links
coaches
scouts
organizations
memberships
assertions
evidence
verifications
consent_records
media
season_performances
academic_profiles
medical_clearances
transport_profiles
opportunities
opportunity_applications
outcomes
child_participation_voice_records
safeguarding_cases
safeguarding_responses
football_readiness
opportunity_readiness
audit_events
```

## 3. Physical-design cautions

The draft intentionally does **not** freeze:
- primary/foreign-key cardinalities where policy remains open;
- RLS policies;
- authorization middleware;
- authentication-provider behavior;
- retention/deletion jobs;
- public/private field visibility;
- workflow transition permissions;
- exact legal guardian precedence;
- safeguarding adjudication rules.

## 4. Candidate provenance fields

Where justified by the corresponding concept, implementation may require representations for:
- stable record identity;
- subject/context reference;
- actor attribution;
- authority/scope context;
- created/effective/expiry or other temporal context;
- provenance/source reference;
- status/lifecycle;
- correction/supersession linkage;
- audit timestamps.

These are candidate implementation representations, not ratified field specifications.

## 5. Derived-state rule

`football_readiness` and `opportunity_readiness` must never become the source of truth for the underlying evidence, assertion, verification, transport, consent, safeguarding or opportunity records.

## 6. Conditional-data rule

Academic, medical, guardian, child-voice, safeguarding, media, transport and disclosure-related fields must remain purpose-bound and conditionally collected where applicable.

## 7. Review requirement

Before any migration:
1. map every candidate table to the conceptual ERD;
2. map every field to a semantic/operational requirement;
3. identify all policy-dependent constraints;
4. review access/disclosure behavior;
5. review retention/deletion behavior;
6. define test fixtures and acceptance evidence;
7. perform adversarial 33×3 review;
8. explicitly freeze the physical schema.

**Decision:** Physical schema draft created for review. Implementation remains HOLD.


# Physical Schema Adversarial Review — 2026-10-06

**Decision:** CONDITIONAL PASS — FIELD/CONSTRAINT MAPPING REQUIRED BEFORE FREEZE

## Review findings

| Test | Result | Finding |
|---|---|---|
| Conceptual ERD coverage | PASS | Candidate tables map to established concepts. |
| MVP subset coverage | PASS | Approved MVP relationships are represented. |
| Semantic separation | PASS | No table definition collapses ratified concepts. |
| Provenance | PASS | Provenance is represented as a requirement, not invented as authority. |
| Derived-state containment | PASS | Readiness remains derived. |
| Conditional-data containment | PASS | Sensitive/contextual data remains conditional. |
| Technical leakage | PASS | Draft does not claim unresolved policy through technical structure. |
| Cardinality/constraints | HOLD | Exact physical cardinalities and constraints still require field-level decision mapping. |
| Access/RLS | HOLD | Disclosure and authorization policies are not yet frozen. |
| Retention/deletion | HOLD | Legal/operational basis remains open. |
| Acceptance evidence | HOLD | Field-level acceptance evidence has not yet been recorded. |
| 33×3 | PASS | Existence, coherence and failure containment all pass for the draft stage. |

## Required next artifact

Before physical schema freeze, create a **Field/Constraint Decision Matrix** mapping every proposed table/field/constraint to:
1. source concept;
2. MVP requirement;
3. semantic necessity;
4. operational/legal dependency;
5. nullability/optionality rationale;
6. cardinality rationale;
7. access sensitivity;
8. retention dependency;
9. acceptance test/evidence.

**No SQL or migration is authorized by this review.**
