# Trust Core / Frozen MVP Reconciliation — 2026-10-09

**Status:** Reconciliation witness only; no new ratification or implementation authority.
**Branch:** `proposal/part-12-synthetic-trust-evaluation`

## Finding

The Trust Core proposal incorrectly treated MVP Boundary Freeze as the next gate because it relied on `README.md`. The more detailed `docs/00-gate-status.md`, sections 12–13, records later work: MVP Boundary RATIFIED, MVP Relationship Subset FROZEN, implementation prerequisites RATIFIED, Schema Boundary FROZEN, Physical Table Boundary FROZEN, and SQL draft/runtime evidence recorded. The same status keeps migration/database, RLS, API, UI and production implementation on hold.

The correct next step is not to freeze the MVP boundary again. It is to reconcile the Trust Core candidate against the already-frozen artifacts and preserve all existing holds.

## Mapping to existing concepts

| Trust Core item | Existing model concept | Finding |
|---|---|---|
| Opportunity | Opportunity / `opportunities` | Existing concept. The current SQL draft does not yet represent every proposed eligibility, capacity, fee, venue, transport/access/cost or lifecycle condition. Do not silently add fields. |
| VerificationRecord | Verification / `verifications` | Existing concept. Generic `expires_at` does not prove the tabletop requirement for explicit `valid_until` or `reconfirm_by` plus rationale. |
| ConsentRecord | ConsentRecord / `consent_records` | Existing concept. Authorizer validity, guardian conflicts and purpose applicability remain policy/legal holds. |
| EvidenceEvent | Evidence / `evidence` plus history requirements | Potential overlap; do not create a second entity until its semantics are reconciled. |
| DecisionAuditEvent | AuditEvent / `audit_events` | Potential overlap; define any extra decision-event semantics before proposing a separate entity. |

Blocked/paused states are workflow vocabulary, not new entities. Their transition owners and permitted transitions cannot be invented in schema design.

## Evidence boundary

The repository records an isolated PostgreSQL runtime witness for a specific SQL draft. That is not a production migration, RLS/access enforcement, legal compliance, or evidence that the proposed Trust Core is implemented.

The access-policy matrix is reviewed with policy/legal holds. Its CONDITIONAL/HOLD cells are not permission grants. The frozen tabletop fixture v1.1 remains unchanged, and current STS-001 status remains **BLOCKED — NOT A PASS** because `valid_until` and `reconfirm_by` are absent.

## Documentation contradiction

The README's “Next phase: MVP Boundary Freeze” wording conflicts with the later controlled-state chronology in Gate Status, which explicitly marks earlier wording historical. Record this for a separate, traceable README maintenance change; do not silently alter the governing files as part of Part 12.

## Next controlled action

1. Preserve STS-001 BLOCKED and stop formal tabletop expansion.
2. Reconcile proposed Trust Core fields/states against the frozen table/field boundary: already represented, missing-field decision required, policy/legal hold, or out of scope.
3. Keep migration, database, RLS, API, UI and production work on hold until the explicit required authorizations are recorded.
4. If a synthetic test harness is later proposed, separately define its isolated environment, exact permitted artifacts, acceptance tests, evaluator-independence limits and stop conditions.

**Disposition:** Reconciliation recorded; Trust Core implementation NOT AUTHORIZED.
**Governing rule:** Strength of claim must never exceed strength of evidence.
