# Bidirectional Field/Constraint ↔ SQL Traceability Review — 2026-10-07

**AuthorityLevel:** NONE  
**Status:** PASS WITH ONE IMPLEMENTATION-DETAIL HOLD  
**SQL blob reviewed:** `00f0dd0542f7f9a92447799f1452b26c513b06a5`

## 1. Review purpose

This review adds the missing reverse-direction control exposed by the F1 finding:

1. **Source → SQL:** every ratified/approved matrix requirement must have a physical representation or an explicitly documented implementation hold.
2. **SQL → Source:** every physical field/constraint must trace to an approved source concept or implementation rationale.

This is a traceability review, not a new semantic gate.

## 2. Source → SQL results

| Matrix requirement | SQL representation | Result |
|---|---|---|
| users stable identity | `users.id` | PASS |
| players stable identity | `players.id` | PASS |
| guardians stable identity | `guardians.id` | PASS |
| guardian_links Player + Guardian | `player_id`, `guardian_id` FKs | PASS |
| memberships Player + Organization | `player_id`, `organization_id` FKs | PASS |
| membership temporal validity | `valid_from`, `valid_to` | PASS |
| assertions subject/context + attribution + temporal/provenance | subject/context/author/authority/effective/expiry/provenance | PASS |
| evidence source/provenance + temporal | source/effective/expiry/provenance | PASS |
| verifications scoped evaluation + temporal | scope/status/effective/expiry/provenance | PASS |
| consent purpose/scope/authorizer/lifecycle | purpose/scope/authorizer/status/effective/expiry/provenance | PASS WITH F5 LIFECYCLE HOLD |
| media reference + purpose/provenance | media_ref/purpose_ref/provenance_ref | PASS |
| season performance context/provenance | season_ref/provenance_ref | PASS |
| academic conditional context | purpose_ref/provenance_ref | PASS |
| medical minimum clearance + expiry/provenance | status/expiry/provenance_ref | PASS |
| transport feasibility/provenance | provenance_ref | PASS |
| organization identity | organizations.id | PASS |
| opportunity identity + organization | opportunity.id/organization_id FK | PASS |
| application Player + Opportunity + lifecycle | player_id/opportunity_id/status/timestamps | PASS |
| outcome + provenance/context | outcome_type/provenance_ref/application_id | PASS |
| child voice expression + matter/context + provenance | subject/matter/expression/provenance/timestamp | PASS |
| safeguarding case subject/matter/provenance | subject/matter/provenance/timestamp | PASS |
| safeguarding response + responsible authority/context | response_type/responsible_authority_ref/provenance/timestamp | PASS |
| football readiness derived context | player_id/derived_at/derivation_ref | PASS WITH D1 HOLD |
| opportunity readiness Player + Opportunity derived context | player_id/opportunity_id/derived_at/derivation_ref | PASS WITH D1 HOLD |
| audit actor/action/target/time/result | actor/action/target/created_at/result | PASS |

## 3. SQL → Source results

All 26 physical tables trace to the frozen physical table boundary.

All non-identity fields reviewed have a source concept, relationship requirement, provenance/temporal rationale, or explicit implementation role.

No field was found that silently:
- creates legal authority;
- creates Guardian precedence;
- converts verification into truth;
- converts verification into safeguarding clearance;
- exposes protected data;
- creates public republication permission;
- turns readiness into ranking;
- encodes unresolved lifecycle policy.

Foreign keys are structural relationship enforcement only; they do not establish semantic authority.

## 4. D1 — derived-state version/context

The matrix describes FootballReadiness and OpportunityReadiness as requiring:

> derived inputs/version/context

The SQL currently represents this through `derivation_ref` plus `derived_at`.

This is **not a confirmed defect**, because the matrix deliberately describes representative boundaries rather than a final field specification. However, the physical representation of derivation version/context is not yet explicit enough to claim complete field-level traceability.

**Disposition:** IMPLEMENTATION DETAIL — AFTER ERD / FIELD SPECIFICATION REVIEW.

Do not invent a `version` column merely to satisfy this review. Resolve the representation when derived-state acceptance requirements are finalized.

## 5. F5 — consent withdrawal/supersession

The existing advisory F5 remains open.

The SQL has consent lifecycle status and temporal fields, but does not yet explicitly model a withdrawal/supersession event or linkage.

**Disposition:** IMPLEMENTATION DETAIL / POLICY-LIFECYCLE HOLD.

No legal conclusion is made.

## 6. Bidirectional conclusion

### Source → SQL
**PASS**, with D1 and F5 explicitly bounded.

### SQL → Source
**PASS.**

No orphan physical field/constraint was identified.

### Required process correction

Future schema reviews must retain this two-direction test. A semantic-separation review alone is insufficient.

## 7. 33×3

- Existence: PASS
- Coherence: PASS
- Failure containment: PASS

## 8. Decision

**BIDIRECTIONAL FIELD/CONSTRAINT ↔ SQL TRACEABILITY: PASS WITH IMPLEMENTATION-DETAIL / LIFECYCLE HOLDS.**

The amended SQL remains suitable for controlled non-production review.

**Migration:** HOLD.  
**RLS:** NOT AUTHORIZED.  
**Production:** HOLD.  
**New governance gate:** NOT CREATED.
