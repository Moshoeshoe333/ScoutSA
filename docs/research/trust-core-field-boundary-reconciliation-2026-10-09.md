# Trust Core Candidate — Field/Boundary Reconciliation

**Date:** 2026-10-09  
**Status:** Review witness only — no schema amendment or implementation authority  
**AuthorityLevel:** NONE  
**Inputs:** Frozen MVP/schema/physical-table boundaries; Field/Constraint Decision Matrix; SQL draft; Trust Core proposal; Part 12 freshness decision and STS-001 correction.

## 1. Purpose

Classify each Trust Core candidate requirement against the already-frozen physical table boundary and current SQL draft. This is not permission to change the frozen schema, add columns, implement constraints, create new entities, or execute a migration.

Classification:
- **REPRESENTED — LIMITED:** a related field/concept exists, but this does not prove full behavior.
- **GAP — DECISION REQUIRED:** the candidate requirement is not represented by the inspected SQL draft and needs a separately authorized field-level decision before any schema change.
- **POLICY/LEGAL HOLD:** a technical representation cannot settle the unresolved policy/legal rule.
- **OVERLAP — MAP FIRST:** proposal language may duplicate an existing domain concept.
- **OUT OF SCOPE / NOT AUTHORIZED:** do not implement under current authority.

## 2. Field-level reconciliation

| Candidate requirement | Existing table/fields observed | Classification | Finding / controlled next step |
|---|---|---|---|
| Opportunity stable identity | `opportunities.id` UUID PK | REPRESENTED — LIMITED | Identity only; does not prove opportunity validity or actionability. |
| Responsible organization | `opportunities.organization_id` FK | REPRESENTED — LIMITED | Structural link only; membership or organization reference does not establish actor authority. |
| Opportunity lifecycle state | No lifecycle/state field in `opportunities` | GAP — DECISION REQUIRED | Existing MVP workflow and transition owner must be reconciled before a field/state can be authorized. |
| Event date/time and venue | No corresponding fields in `opportunities` | GAP — DECISION REQUIRED | Candidate need is not permission to expand the frozen field boundary. |
| Eligibility criteria | No corresponding field/reference in `opportunities` | GAP — DECISION REQUIRED | Define minimal purpose and source of criteria; do not imply verified eligibility by storing a value. |
| Capacity | No corresponding field/reference in `opportunities` | GAP — DECISION REQUIRED | Capacity state needs a source, verifier/owner and temporal meaning. |
| Fee policy, amount and recipient | No corresponding fields in `opportunities` | GAP + POLICY HOLD | Fee transparency may be necessary to participant actionability; recipient legitimacy and operational policy cannot be inferred. |
| Transport/access arrangements, responsibility, known costs | `transport_profiles` exists for Player context; no opportunity-specific transport/access/cost fields observed | GAP — DECISION REQUIRED | Player transport context is not equivalent to opportunity-specific attendance feasibility. Preserve the distinction. |
| Unresolved material conditions | No explicit opportunity-condition field/table in SQL draft | GAP — DECISION REQUIRED | Do not invent a new entity; map to existing concepts and decide representation through the proper gate. |
| Claim scope | `verifications.scope_ref` | REPRESENTED — LIMITED | Generic text reference does not prove scope validation or tier preconditions are enforced. |
| Verification status | `verifications.status` | REPRESENTED — LIMITED | A status column alone does not implement deliberate tier transitions or block unauthorized updates. |
| Verification action timestamp | `verifications.created_at` and optional `effective_at` | REPRESENTED — LIMITED | Exact semantics need care; record creation time is not automatically the time a verification action occurred. |
| Verifier identity | No explicit typed verifier field; generic provenance only | GAP / POLICY HOLD | Verifier attribution and authorization are not established by an untyped reference. |
| Source/evidence references | `verifications.provenance_ref`; separate `evidence` table | REPRESENTED — LIMITED | Provenance pointer is not proof that the source exists, is authentic, accessible or supports the claim. |
| `valid_until` / `reconfirm_by` plus rationale | `verifications.expires_at` | GAP — DECISION REQUIRED | `expires_at` is not assumed equivalent. The tabletop freshness decision requires explicit deadline semantics and rationale; STS-001 is blocked when missing. |
| Verification limitations/conflicts | No explicit limitation/conflict fields in `verifications` | GAP — DECISION REQUIRED | Need a bounded representation decision; do not hide limitations in unstructured assumptions. |
| Purpose-specific consent | `consent_records.purpose_ref`, `scope_ref` | REPRESENTED — LIMITED | Does not establish lawful authority, valid authorizer, or purpose-compatibility enforcement. |
| Consent effective interval/withdrawal | `effective_at`, `expires_at`, `status` | REPRESENTED — LIMITED | Status semantics and immediate effect of withdrawal require policy and executable tests. |
| Consent provenance | `consent_records.provenance_ref` | REPRESENTED — LIMITED | Provenance is not self-proving legal sufficiency. |
| Append-only evidence/history | `evidence`, `audit_events` tables exist | OVERLAP — MAP FIRST | Table existence does not establish append-only enforcement, version linkage or non-destructive correction. |
| Decision audit completeness | `audit_events.actor_ref`, `action_ref`, `target_ref`, `created_at`, `result_ref` | REPRESENTED — LIMITED | Rule version, prior/new state, reason, evidence refs and immutable denial logging are not explicitly established by these columns. |
| Separate EvidenceEvent entity | Existing `evidence` and `audit_events` | OVERLAP — MAP FIRST | Do not create a second event entity until Evidence vs AuditEvent semantics and retention/access rules are reconciled. |
| Separate DecisionAuditEvent entity | Existing `audit_events` | OVERLAP — MAP FIRST | First decide whether existing AuditEvent needs a field-level refinement or whether a distinct domain concept is justified. |
| Consent/access negative tests | Access-policy matrix reviewed with policy/legal holds; no RLS | POLICY/LEGAL HOLD | Tests can be specified for a synthetic harness, but no live authorization rule or RLS implementation is authorized. |
| No unauthorized tier escalation | Existing `verifications.status` only | GAP + POLICY HOLD | Requires approved transition policy and technical enforcement evidence; a text status is not enforcement. |
| No history mutation | Existing evidence/audit tables | GAP — ENFORCEMENT NOT WITNESSED | No claim of append-only enforcement from table definitions alone. |
| Audit completeness | Existing `audit_events` columns | REPRESENTED — LIMITED | Completeness, immutability and coverage of denied actions remain unwitnessed. |

## 3. Important distinctions

1. **Existing concept ≠ complete implementation.** A table or generic field is evidence of a representation, not proof of behavior.
2. **Timestamp ≠ freshness deadline.** `created_at`, `effective_at` and `expires_at` must not be treated as interchangeable without an explicit, approved semantic mapping.
3. **Player transport profile ≠ opportunity attendance plan.** Participant feasibility is relational and context-specific.
4. **Consent record ≠ authorization engine.** A stored status cannot settle legal authority or prove an access check occurred.
5. **Audit table ≠ append-only guarantee.** Mutation prevention, completeness and retention need explicit requirements and runtime evidence.
6. **Schema boundary frozen ≠ all candidate requirements present.** Missing requirements must return through an explicit field-boundary decision, not be silently added.

## 4. Controlled disposition

The Trust Core candidate is **not ready for direct implementation against the current SQL draft**. This is not a rejection of the product requirements; it is a traceability result.

Next permissible work is a decision-only review of the listed gaps: confirm whether each is essential to the approved MVP, already represented elsewhere, explicitly deferred, or requires a separately authorized boundary amendment. Policy/legal questions remain holds. Any amendment must identify the exact frozen artifact and decision it changes, and must not alter the SQL or run a migration under this record.

## 5. Explicit non-authorization

This document authorizes no:
- schema/table/column/entity changes;
- SQL or migration edits/execution;
- RLS, GRANT/REVOKE, API, authentication or UI implementation;
- real data, public listings, participant-specific contact or pilot;
- claim that STS-001 passed, or that ScoutSA is legally/compliance/production ready.

**Current tabletop status:** STS-001 v1.1 **BLOCKED — NOT A PASS** due to missing freshness metadata.  
**Governing rule:** Strength of claim must never exceed strength of evidence.
