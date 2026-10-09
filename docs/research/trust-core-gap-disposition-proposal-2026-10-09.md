# Trust Core Gap Disposition — Decision Proposal

**Date:** 2026-10-09  
**Status:** PROPOSAL FOR EXPLICIT REVIEW — NOT RATIFIED  
**AuthorityLevel:** NONE  
**Basis:** Frozen MVP boundary, relationship subset, field/constraint matrix, current SQL draft, Trust Core field-boundary reconciliation, and claim-scoped opportunity-verification procedure.

## 1. Decision sought

For each identified gap, decide whether it is:
- **Required for an actionable opportunity claim** and therefore must be resolved before the relevant workflow can be enabled;
- **Required to preserve the ratified MVP loop** but can be deferred from an initial synthetic-only test harness;
- **Conditional** on the actual opportunity/purpose;
- **Deferred/out of scope** for v1; or
- **Policy/legal HOLD**, requiring a decision from the appropriate accountable authority before implementation.

This proposal does not alter the frozen schema or authorize a new field, table, constraint, migration, RLS rule, API, UI or deployment.

## 2. Proposed dispositions

| Gap | Proposed disposition | Why | Minimum safe behavior before actionability | Authority still needed |
|---|---|---|---|---|
| Opportunity lifecycle/status | **Required for operational workflow** | Draft, paused, blocked and closed opportunities cannot be treated as interchangeable. | Unknown, paused or blocked status cannot be treated as available/actionable. | Approve exact states, transition owner and transition rules; reconcile with existing lifecycle model. |
| Date/time/venue | **Required for participant-specific attendance** | A trial pathway cannot be assessed without time/location context. | Missing or unconfirmed material logistics block participant-specific actionability. | Confirm minimal fields and handling of changes/cancellation. |
| Eligibility criteria | **Required for a claim of checked opportunity conditions** | Authenticity alone does not establish who qualifies. | Unknown criteria or participant eligibility remain unresolved; no implied eligibility. | Define minimal criteria representation, source, verifier and scope. |
| Capacity/availability | **Required for current actionable claims** | A genuine organization/opportunity may still have no capacity. | Unknown or stale capacity blocks actionability. | Define accountable source and reconfirmation process. |
| Fee/cost policy and recipient | **Required where any charge or material cost applies; conditional otherwise** | Payment handling is out of scope, but undisclosed costs or payment demands can affect safety and feasibility. | Record known costs and recipient; unresolved charges block actionable use. Do not process payment. | Decide whether “no fee” must be explicit and how suspicious fee demands are handled. |
| Opportunity-specific transport/access | **Required for opportunity-readiness and participant-specific attendance** | Player TransportProfile is not an attendance plan for a particular venue/time. | Unknown transport/access responsibility or known costs block participant-specific actionability where material. | Confirm minimum data and purpose; avoid unnecessary precise home/address collection. |
| Unresolved material conditions | **Required as behavior, not necessarily as a new entity** | An unresolved condition must not be hidden by a positive status. | Any unresolved material condition blocks the dependent tier/action. | Choose a representation only after mapping existing concepts and tests; no new entity assumed. |
| Verification freshness | **Required for current verification claims** | Frozen tabletop decision requires explicit `valid_until` or `reconfirm_by` plus rationale. | Missing deadline or expired deadline blocks current-use claims; historical evidence remains historical. | Decide field mapping and operational deadline assignment before any schema change. |
| Verifier identity, limitations and conflicts | **Required for provenance; scope may be bounded** | A generic provenance pointer alone does not prove who performed the check or what it established. | Missing actor/scope/limitations blocks the corresponding verification tier. | Decide how existing Verification/Assertion/Evidence fields carry this information. |
| Consent purpose, scope and withdrawal | **Required for applicable protected workflows** | Existing MVP requires purpose-bound consent and revocation history. | Missing, withdrawn or purpose-mismatched consent blocks dependent disclosure/action. | Legal/operational rules for authorizer validity and Guardian conflicts remain HOLD. |
| Append-only evidence and correction history | **Required as an integrity property; not automatically a new table** | Corrections must not silently erase prior evidence or decisions. | Supersession/correction preserves prior versions and links; destructive rewrite test must fail. | Define correction, dispute, retention and deletion behavior. |
| Audit completeness | **Required for material state/authorization attempts** | Accountability requires recording material decisions and denials. | Actor, time, target, action, result/reason and applicable rule/evidence references must be traceable. | Reconcile required fields against AuditEvent and access/retention policy. |
| Separate EvidenceEvent / DecisionAuditEvent entities | **Do not add at this stage** | Existing Evidence and AuditEvent concepts may already cover these responsibilities. | First map required event semantics to existing entities and identify only concrete uncovered requirements. | Separate entity only with explicit domain justification and boundary amendment. |
| Access-control negative tests | **Required before any protected implementation can be considered** | A policy matrix with HOLD/CONDITIONAL cells is not enforcement. | Unauthorized reads/writes and attempted tier escalation must be denied and witnessed in an isolated authorized test environment. | Explicit policy/legal ratification and implementation authorization required. |

## 3. Proposed “enough” threshold for a synthetic Trust Core harness

A synthetic-only harness may be considered for a separate authorization decision only when:
1. The proposed fields and state transitions have been reconciled against the frozen boundary, with each amendment explicitly identified.
2. The test environment and exact permitted artifacts are stated; no production database or real person data.
3. Frozen STS-001 v1.1 is evaluated faithfully and remains blocked unless the fixture itself already supplies the required freshness metadata. Do not alter it to obtain a pass.
4. Negative tests cover missing/expired freshness, missing/withdrawn/purpose-mismatched consent, unauthorized reads/writes, attempted tier escalation, history mutation and audit omissions.
5. No unresolved policy/legal HOLD is silently converted into ALLOW.
6. Test results include exact commit, fixture/version, environment, command, output, evaluator and known independence limits.
7. Zero critical failures; a failed or blocked case remains visible and stops progression.

This is a proposed threshold for a future decision, not authorization to build the harness.

## 4. Immediate disposition

**Recommended now:** do not modify SQL. Review and explicitly decide the proposed gap dispositions, then determine which must be validated with adult football stakeholders before any boundary amendment. In parallel, pursue required policy/legal authorization for the access-policy matrix. External validation is evidence input, not automatic ratification.

**Current status preserved:** STS-001 v1.1 **BLOCKED — NOT A PASS**; migration/database, RLS, API, UI and production implementation remain on hold.

## 5. Explicit non-authorization

No schema amendments, tables/columns, migrations, RLS, GRANT/REVOKE, API, authentication, UI, deployment, real player/guardian data, public profiles/listings, recruitment/contact with minors, live outreach or pilot are authorized.

**Governing rule:** Strength of claim must never exceed strength of evidence.
