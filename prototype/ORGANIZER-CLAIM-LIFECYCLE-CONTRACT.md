# Organizer claim lifecycle contract — revision, withdrawal and supersession

**Contract ID:** OPA-LIFECYCLE-001  
**Status:** Proposed; not ratified; no implementation authority  
**Scope:** Synthetic Organizer Portal → Tournament Manager handoff only  
**Related findings:** OPA-013, OPA-014, OPA-015, OPA-016  
**Rule:** Imported claims are evidence-bearing source assertions, not operational decisions.

## 1. Problem and decision boundary

The current handoff uses stable claim IDs and rejects changed content under an existing ID. The Organizer Portal can update a feature-permission claim in place, so the same ID may later carry different meaning. A receiver cannot safely distinguish correction, withdrawal, replacement, replay, or tampering.

This contract proposes an append-only event history. It does **not** authorize a database, API, production identity workflow, publication, or promotion of imported claims into verified/approved states. The current prototype remains session-only and synthetic.

## 2. Identity model

Keep these identifiers distinct:

- `claim_id`: stable identity of one assertion stream; never reused for a different assertion.
- `claim_event_id`: globally unique identity of one immutable lifecycle event.
- `subject_id`: stable identity of the entity the assertion concerns (for example, an organizer, submission, evidence reference, or feature-permission request).
- `source_package_id`: stable identity of the exported package or source transaction.
- `predecessor_event_id`: the immediately preceding event in the same claim stream, null only for the first event.
- `supersedes_claim_id`: optional link from a new claim stream to the older claim stream it replaces.

A claim stream must not be used to change its subject or claim type. A material change of subject or claim meaning creates a new `claim_id`.

## 3. Immutable event envelope

Every event must carry:

| Field | Requirement |
|---|---|
| `schema_version` | Explicit supported contract version |
| `claim_id` | Stable assertion-stream ID |
| `claim_event_id` | Unique immutable event ID |
| `subject_id` | Stable subject reference |
| `claim_type` | Controlled vocabulary, e.g. identity, authority, evidence, feature_permission |
| `event_type` | ASSERTED, REVISED, WITHDRAWN, SUPERSEDED, or REINSTATED |
| `revision` | Positive, contiguous integer within the claim stream |
| `predecessor_event_id` | Previous event ID, or null for ASSERTED |
| `supersedes_claim_id` | Required for SUPERSEDED; otherwise absent |
| `reinstates_claim_id` | Required for REINSTATED; otherwise absent |
| `payload` | Bounded claim content; immutable after acceptance |
| `reason` | Required for withdrawal, supersession and reinstatement |
| `actor_id`, `actor_role` | Source actor attribution; never inferred from a label |
| `source_system`, `source_package_id` | Provenance |
| `occurred_at`, `recorded_at` | Source time and receiver time kept distinct |
| `content_digest` | Digest over canonicalized immutable event content |

Unknown fields must not silently alter semantics. Unknown schema versions fail closed. Timestamps are provenance claims unless independently trusted; they are not proof of actor identity or event time.

## 4. Lifecycle semantics

1. **ASSERTED** — first event for a new `claim_id`; revision 1; no predecessor.
2. **REVISED** — append a new event to the same claim stream; increment revision by exactly one; point to the prior event. Previous events remain readable. The receiver derives the current assertion from the latest valid event.
3. **WITHDRAWN** — append a terminal withdrawal event to the same stream. Preserve the prior payload and withdrawal reason. The effective current claim is withdrawn, not deleted. A withdrawal does not erase downstream history or silently reverse an independent human decision.
4. **SUPERSEDED** — create a new claim stream and link it to the old `claim_id`. The old stream receives an explicit supersession event or a linked terminal marker in the same atomic package. A superseding claim does not inherit verification, approval, permission, or authority from the old claim.
5. **REINSTATED** — create a new claim stream linked to the withdrawn stream using `reinstates_claim_id`; require a reason and fresh provenance. Do not reopen or rewrite the withdrawn event.

A claim stream may have only one valid next event at a given revision. Conflicting forks are quarantined for human resolution; do not choose a winner by arrival order.

## 5. Import and idempotency rules

- Validate the complete package, event graph, identifiers, schema versions, references, digest, and size limits before mutating any state.
- Same `claim_event_id` plus same canonical digest = exact replay; count as skipped.
- Same `claim_event_id` with a different digest = hard conflict; reject the whole package.
- Same `claim_id` and revision with different event IDs = fork; quarantine/reject, never last-write-wins.
- Revision gaps, missing predecessors, cycles, cross-subject links, invalid supersession links, and unsupported event transitions fail closed.
- Apply all accepted events atomically. If the implementation cannot guarantee atomic commit, it must expose an explicit partial-commit result and a recoverable transaction identifier; it must never claim rejection after durable mutation.
- Canonicalization must define object-key ordering, Unicode normalization, number representation, and treatment of absent versus null fields. Do not use raw `JSON.stringify` equality as the canonical digest contract.
- Return added/skipped/rejected counts per collection and event type, plus the transaction outcome.

## 6. Authority and projection boundaries

Imported source claims remain claims. They must never directly set operational fields such as verified identity, approved authority, permission to feature, publication state, eligibility, or disclosure permission. Those require separate, locally authorized human decisions with their own actor, scope, reason, timestamp and audit trail.

A withdrawal may change the effective source-claim projection immediately, but it must not silently mutate a separate operational decision. The consuming workflow must raise a review/invalidation task where that decision depended on the withdrawn claim. Human review decides the consequence.

## 7. Required invariants

- History is append-only; no in-place update or deletion of accepted events.
- One event ID maps to exactly one canonical digest.
- One claim stream has one subject and one claim type.
- Revision sequence is contiguous and predecessor-linked.
- A withdrawn stream cannot be revised as if still active.
- Supersession creates a new stream and preserves the old stream.
- No automatic trust, authority, consent, permission, eligibility or publication escalation.
- Every material mutation and every skipped replay is visible in the import result.
- Import commit outcome is independent of subsequent rendering or notification outcome.

## 8. Adversarial acceptance matrix

| Scenario | Expected result |
|---|---|
| Exact event replay | No mutation; counted as skipped |
| Same event ID, altered payload | Reject whole package |
| Same claim/revision, different event ID | Fork conflict; quarantine/reject |
| Revision 1 then revision 3 | Reject gap |
| Missing predecessor | Reject |
| Revision points to another claim stream | Reject |
| Withdrawal with no reason | Reject |
| Revision after withdrawal | Reject |
| Supersession without target claim | Reject |
| Supersession cycle | Reject |
| New superseding claim tries to inherit approval | Preserve source claim only; operational state remains unchanged |
| Reinstatement without a new claim ID and provenance | Reject |
| Duplicate submission plus new evidence event | Commit new evidence; report per-collection counts |
| Commit succeeds, UI refresh fails | Report committed with display failure; never report import rejection |

## 9. Ratification gates

Before implementation, the project owner and relevant domain reviewers must ratify:
- claim-type vocabulary and subject identity rules;
- who may assert, revise, withdraw, supersede and reinstate each claim type;
- whether withdrawals invalidate downstream decisions automatically or create review tasks;
- canonicalization and digest algorithm;
- event retention, privacy and correction requirements;
- fork resolution authority and conflict handling;
- transaction/atomicity guarantees and recovery behavior.

Until those decisions are ratified, OPA-016 remains a design contract only. The existing prototype must continue rejecting changed claim content under a reused ID rather than inventing lifecycle semantics.
