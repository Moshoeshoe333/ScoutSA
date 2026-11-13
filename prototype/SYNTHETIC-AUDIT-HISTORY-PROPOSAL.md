# Synthetic Audit-History Model — design proposal

**Branch:** `prototype/internal-demo`  
**Version:** `audit-history.js` v0.2.0  
**State:** **EXPERIMENTAL / NOT RATIFIED / SYNTHETIC GATE INTEGRATION ONLY**  
**Data:** fictional fixtures only

## Purpose

This proposal tests whether a review can be reconstructed from an ordered sequence of evidence and review events. It is a validator for a caller-supplied in-memory event array, not an audit service and not an immutable ledger. It is now called by the synthetic invitation safeguarding evaluator as a blocking structural check. It does not provide immutable storage.

## Event envelope

Every event carries:

- `eventId`: unique event identifier;
- `eventType`: declared event vocabulary;
- `occurredAt`: event timestamp; array order must be chronological;
- `actorId` and `authorityId`: synthetic actor and authority references;
- `organizationId` and `scope`: exact organizational and review boundary;
- `provenanceRef`: non-empty synthetic event-source reference;
- `fingerprint`: exact synthetic evidence fingerprint for evidence events;
- exact target: `evidenceRef + versionId` for evidence events, or `reviewId` for review events;
- `fromState` and `toState`: explicit transition.

## Declared events and transitions

| Event | From | To |
|---|---|---|
| EVIDENCE_CREATED | none | SUBMITTED |
| EVIDENCE_INSPECTED | SUBMITTED | INSPECTED |
| EVIDENCE_ACCEPTED | INSPECTED | ACCEPTED |
| EVIDENCE_REJECTED | SUBMITTED / INSPECTED | REJECTED |
| EVIDENCE_MARKED_STALE | ACCEPTED | STALE |
| EVIDENCE_REVOKED | SUBMITTED / INSPECTED / ACCEPTED / STALE | REVOKED |
| EVIDENCE_SUPERSEDED | ACCEPTED | SUPERSEDED |
| REVIEW_COMPLETED | PENDING | COMPLETE |
| REVIEW_INVALIDATED | COMPLETE | INVALIDATED |

Evidence events must resolve to exactly one evidence-version fixture. Their organization, scope and synthetic fingerprint must match that fixture. Inspection and acceptance actors must match the evidence record's inspector and authority; every event actor and authority must also resolve to one current, exact-scoped synthetic authority grant at event time. Review events must resolve to exactly one review fixture and match its reviewer, authority, organization and scope. A review event must carry the exact evidence-version and fingerprint links declared by that review; completion time must equal the review record's `completedAt`, and completion is rejected unless every linked version has an earlier accepted event. Every declared review must have exactly one completion event. Event timestamps must be canonical UTC ISO values, strictly increasing and no later than the supplied evaluation time. Final event state must match the evidence record's declared state. If evidence is later rejected, marked stale, revoked or superseded after review completion, a review-invalidation event must follow that exact evidence invalidation. A validly invalidated history is reconstructable but the review is not eligible to pass the gate. Duplicate IDs/targets, unknown events, missing provenance, unresolved targets, invalid chronology, future timestamps, missing completion events and illegal transitions fail closed.

## Important limits

1. The validator does not persist events or prevent callers from rewriting, deleting, reordering or replacing them.
2. There is no cryptographic hash, signature, trusted timestamp, append-only database, tamper-evident chain or independent event store.
3. Actor and authority strings are fixture comparisons, not identity proofing or authorization.
4. The model does not inspect evidence sources, prove evidence authenticity or adjudicate a real conflict.
5. It is integrated only as a blocking synthetic structural check in `review-engine.js`; a valid event sequence means the synthetic review history is internally consistent, not that a human decision is authorized.
6. It does not create a durable historical decision or automatically invalidate a previously displayed result outside a fresh evaluator call.

## Stop conditions and future decisions

Before any real use, a ratified policy must define event authority, actor authentication, signatures, canonical content hashing, trusted time, append-only retention, correction/supersession rules, access, privacy, legal basis, incident handling, and how a review invalidation propagates to every dependent decision. No database, migration, RLS, API, identity processing, notification, disclosure, contact, deployment or pilot is authorized by this proposal.

**Governing rule:** a decision must never outlive the evidence that justified it—but this experimental validator does not yet enforce that rule across a system.


## Integration boundary — 2026-11-13

`review-engine.js` v0.3.0 now requires a non-empty `context.auditEvents` sequence for the invitation safeguarding gate. It constructs two exact review projections from the invitation's first and second review records, pins the completion/conflict/independence evidence versions and fingerprints, and passes the sequence plus the current synthetic reviewer-authority fixtures to this validator. Missing history returns `INVITATION_AUDIT_HISTORY_MISSING`; invalid history returns `INVITATION_AUDIT_HISTORY_INVALID`; a valid but invalidated review returns `INVITATION_REVIEW_HISTORY_INVALIDATED`. The engine still requires its independent evidence/version checks and always returns `disclosurePermitted: false`.

This is a caller-supplied synthetic array checked at evaluation time. It is not append-only, durable, tamper-evident or trusted. The event authority records are fixture comparisons, not authenticated authority. This integration is not a production control and does not lift any mainline, real-data, disclosure, deployment or pilot hold.
