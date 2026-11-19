# OPA-016 interaction review — legacy importer and OPA-013 reporting

**Review ID:** OPA-016-IR-001  
**Date:** 2026-11-19  
**Status:** Review findings; proposed clarifications only; not ratified  
**Branch:** `prototype/internal-demo`  
**Scope:** Static source review of the proposed organizer-claim lifecycle contract and synthetic Organizer Portal → Tournament Manager importer  
**Implementation authority:** None

## 1. Executive finding

The proposed lifecycle model is directionally sound: immutable events, predecessor links, append-only history, fail-closed conflicts, and separation of source claims from operational decisions fit the existing OPA-013/014/015 boundaries.

OPA-016 is **not implementation-ready**. The current importer is a legacy snapshot/collection importer, not an event-stream importer. It requires package contract version `1.0` and four collections (`organizers`, `submissions`, `evidence`, `features`). It has no lifecycle event collection, event ID, revision, predecessor, withdrawal, supersession, reinstatement, actor authorization, or event-history projection.

Do not retrofit lifecycle semantics into v1.0 by inference. A future lifecycle package needs an explicit version and compatibility policy.

## 2. Source observations

| ID | Observed source behavior | Consequence |
|---|---|---|
| IR-01 | Importer requires `contractVersion === "1.0"` and four claim arrays. | Current wire contract is a snapshot/claim-collection format, not an event envelope. |
| IR-02 | Existing claim IDs are compared after recursive object-key sorting; changed content under a reused ID rejects the whole package. | Preserve v1.0 immutable-ID conflict protection; do not reinterpret it as revision. |
| IR-03 | Existing editions are checked against derived submission content; changed content bound to an existing edition ID rejects. | Edition identity and claim identity are distinct collision domains. |
| IR-04 | Collections and edition projections are staged, then assigned at a synchronous in-memory commit point. | Useful prototype pattern, not proof of durable database transaction guarantees. |
| IR-05 | Results report added/skipped counts for four claim collections plus edition additions/skips. | A future event collection must be included, with event-type counts and transaction outcome. |
| IR-06 | UI refresh occurs after importer return; refresh failure is reported separately from commit. | Preserve OPA-014 semantics for lifecycle imports. |

## 3. Required clarifications before OPA-016 ratification

### C-01 — Package-version boundary

Define a new lifecycle package version (candidate `2.0`) with a required `claimEvents` collection. Do not fabricate event IDs, revisions, actors, timestamps or digests for v1.0 records.

Choose explicitly:
- **No conversion:** v1.0 remains snapshot-only; lifecycle operations are unavailable.
- **Declared baseline migration:** a separately authorized migration creates a baseline event, marked as receiver-created migration provenance, not source-authored history.

A normal import must never silently perform a baseline migration.

### C-02 — Claim lifecycle versus edition projection

A claim stream is not a tournament edition. Define which claim types may affect which derived fields. Safe default: lifecycle events update only the source-claim projection and raise a review task; they do not rewrite an existing edition or operational decision.

The current importer derives edition fields from submission content and rejects changed content bound to an existing edition ID. Decide whether a revised submission claim remains evidence-only pending separate human review, or can propose an edition revision through a separate explicit projection command. An imported `REVISED` event must not silently overwrite edition state.

### C-03 — Supersession direction

The proposal says the old stream receives a `SUPERSEDED` terminal event carrying `supersedes_claim_id`. Specify that this field on the old stream identifies the **new** claim stream. The new stream begins with its own `ASSERTED` event and inherits no trust, status, evidence acceptance or operational decision.

Define whether a reciprocal link is required on the new stream. Validate both sides atomically and identify one canonical relationship representation to prevent contradictory links.

### C-04 — Reinstatement grammar

The proposal uses `REINSTATED` on a new stream while also saying the first event is revision 1 with no predecessor. Resolve whether `REINSTATED` is a valid first event or whether reinstatement is an `ASSERTED` event with a required `reinstates_claim_id` relation.

In either case, the old withdrawn stream stays terminal; the new stream has a new claim ID, event ID and fresh provenance; nothing is inherited. Prefer one unambiguous state machine.

### C-05 — Complete event-graph validation

Validate the complete package graph, not input array order. Define handling for duplicate event IDs within a package; same-ID/same-digest replays; same-ID/altered-digest conflicts; competing events at one claim revision; missing/cross-stream/non-immediate predecessors; gaps; cycles; illegal transitions after terminal events; cross-subject/type links; missing referenced subjects/claims; and supersession/reinstatement cycles.

Specify whether a package may contain multiple consecutive events for one stream and how those are topologically validated before commit.

### C-06 — Actor and time provenance are not authorization

`actor_id` and `actor_role` in an imported envelope are source assertions unless independently authenticated. Define an authorization mechanism outside the payload for each lifecycle operation. A role string in JSON must never authorize itself.

Keep `occurred_at` and `recorded_at` distinct. Define timestamp format, timezone, precision, clock-skew policy and whether source time may be absent. Neither timestamp proves identity or authority.

### C-07 — Executable, versioned digest profile

The prototype's recursive object-key sorting with preserved array order is useful for deterministic comparison, but is not a complete cross-language digest specification.

Ratify Unicode normalization, number encoding (including negative zero and exponent forms), string escaping, absent versus null, array order, duplicate object-key parsing, and digest algorithm/version. Publish cross-implementation test vectors. A digest detects content mismatch; it does not prove authenticity unless the expected digest is trusted.

### C-08 — Atomicity and recovery

The browser prototype stages synchronous in-memory assignments. This is not a durable transaction guarantee. A persistent implementation must define transaction boundaries across event rows, stream heads/projections, supersession links, import receipts/counts and any review-task creation.

Prefer one atomic database transaction. If that cannot be guaranteed, define durable transaction IDs, idempotent recovery, visible partial-commit states and reconciliation. Display failure remains separate from commit outcome.

### C-09 — OPA-013 reporting extension

For lifecycle imports, report:
- package receipt and transaction ID;
- per-collection added/skipped/rejected totals;
- per-event-type added/skipped/rejected totals;
- exact replay versus conflict/fork counts;
- affected claim streams;
- whether source-claim projections changed;
- review tasks created;
- transaction outcome: committed, rejected-before-commit, or explicitly partial/recovery-required;
- post-commit display/notification outcome separately.

A single "imported" count must not conceal withdrawal, supersession or reinstatement. A rejected package is not a committed import.

## 4. Proposed state machine for reviewer decision

Discussion model only; not an approved rule:

- New stream: one `ASSERTED` event at revision 1.
- Active stream: zero or more contiguous, predecessor-linked `REVISED` events.
- Terminal stream: exactly one `WITHDRAWN` or `SUPERSEDED` event.
- A terminal stream accepts no further events.
- Reinstatement creates a new stream; it never reopens the old one.
- Supersession creates a new stream and linked terminal event on the old stream; both changes commit atomically.
- Forks, missing links and ambiguous transitions quarantine/reject; arrival order never chooses a winner.

**Reviewer decision required:** retain `REINSTATED` as an event type, or represent reinstatement as a new `ASSERTED` event with a typed relation.

## 5. Acceptance scenarios required before implementation

1. v1.0 replay remains idempotent and cannot synthesize lifecycle history.
2. v1.0 changed content under a reused claim ID still rejects before mutation.
3. v2.0 exact event replay is skipped and reported per collection and event type.
4. Same event ID with altered canonical content rejects the package.
5. Duplicate event IDs inside one package are handled deterministically.
6. Competing events at one claim revision are a fork; neither wins by arrival order.
7. Shuffled consecutive revisions validate only when the complete predecessor graph is valid.
8. Missing predecessor, revision gap or cross-stream predecessor rejects before mutation.
9. Withdrawal is terminal; a later revision on that stream rejects.
10. Supersession links both streams consistently and commits both or neither.
11. Superseding claims inherit no verified/approved/permission state.
12. Reinstatement creates a new stream and does not revive the withdrawn stream.
13. Source role text cannot bypass independently configured authorization.
14. Withdrawal of evidence raises a review task where a decision depended on it; it does not silently reverse that decision.
15. Duplicate submission plus new evidence event reports each changed collection accurately.
16. Commit succeeds but refresh fails: commit remains true and display failure is separate.
17. Persistence failures at transaction boundaries leave no partial state or return a recoverable partial outcome with transaction ID.
18. Unicode, numeric and null/absent digest test vectors match across independent implementations.

## 6. Ratification checklist

- [ ] Claim-type vocabulary and subject identity/cardinality.
- [ ] Authorized actors and scopes per lifecycle operation.
- [ ] v1.0 compatibility and any authorized baseline migration.
- [ ] Canonical supersession direction and reciprocal validation.
- [ ] Reinstatement event grammar.
- [ ] Complete event graph and duplicate handling.
- [ ] Canonicalization profile, digest version and test vectors.
- [ ] Withdrawal effects and review-task ownership/SLA.
- [ ] Atomic transaction and recovery contract.
- [ ] Retention, correction, privacy, access and dispute handling.
- [ ] OPA-013 collection/event reporting schema.
- [ ] Independent domain, security, privacy and safeguarding review as appropriate.

## 7. Decision

**OPA-016 remains PROPOSED / NOT RATIFIED.** This review identifies specification gaps; it does not approve a lifecycle design, schema, importer, migration, database, API, authorization model or production behavior.

Keep the current v1.0 importer unchanged apart from independently approved bug fixes. Continue rejecting changed content under a reused stable claim ID. No lifecycle code, migration or operational projection should be implemented until the checklist is resolved.

## 8. Evidence inspected

- `prototype/ORGANIZER-CLAIM-LIFECYCLE-CONTRACT.md` — proposed OPA-016 contract.
- `prototype/tournament-manager.html` — v1.0 validation, stable-ID conflict checks, staged merge, edition projection and commit/display boundary.
- `prototype/tests/tournament-manager.browser-smoke.cjs` — replay, conflict, state-preservation and refresh-failure regression scenarios.

Static source review only. No new tests, database operations, production integration or real-person data processing were performed for this review.
