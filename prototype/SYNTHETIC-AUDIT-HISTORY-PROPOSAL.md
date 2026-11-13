# Synthetic Audit-History Model — design proposal

**Branch:** `prototype/internal-demo`  
**Version:** `audit-history.js` v0.1.0  
**State:** **EXPERIMENTAL / NOT RATIFIED / NOT CONNECTED TO THE REVIEW GATE**  
**Data:** fictional fixtures only

## Purpose

This proposal tests whether a review can be reconstructed from an ordered sequence of evidence and review events. It is a validator for a caller-supplied in-memory event array, not an audit service and not an immutable ledger. It does not provide immutable storage.

## Event envelope

Every event carries:

- `eventId`: unique event identifier;
- `eventType`: declared event vocabulary;
- `occurredAt`: event timestamp; array order must be chronological;
- `actorId` and `authorityId`: synthetic actor and authority references;
- `organizationId` and `scope`: exact organizational and review boundary;
- `provenanceRef`: non-empty synthetic event-source reference;
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

Evidence events must resolve to exactly one evidence-version fixture. Their organization and scope must match that fixture; the actor and authority must match its synthetic reviewer binding. Review events must resolve to exactly one review fixture and match its reviewer, authority, organization and scope. A review event must carry the exact evidence-version links declared by that review; completion is rejected unless every linked version has an earlier accepted event. If evidence is later rejected, marked stale, revoked or superseded after review completion, the sequence must contain a review-invalidation event for that completed review. Duplicate IDs, unknown events, missing provenance, unresolved targets, invalid chronology, future timestamps and illegal transitions fail closed.

## Important limits

1. The validator does not persist events or prevent callers from rewriting, deleting, reordering or replacing them.
2. There is no cryptographic hash, signature, trusted timestamp, append-only database, tamper-evident chain or independent event store.
3. Actor and authority strings are fixture comparisons, not identity proofing or authorization.
4. The model does not inspect evidence sources, prove evidence authenticity or adjudicate a real conflict.
5. It is not integrated into `review-engine.js`; a valid event sequence does not change an invitation gate or authorize a human decision.
6. It does not create a durable historical decision or automatically invalidate a previously displayed result.

## Stop conditions and future decisions

Before any real use, a ratified policy must define event authority, actor authentication, signatures, canonical content hashing, trusted time, append-only retention, correction/supersession rules, access, privacy, legal basis, incident handling, and how a review invalidation propagates to every dependent decision. No database, migration, RLS, API, identity processing, notification, disclosure, contact, deployment or pilot is authorized by this proposal.

**Governing rule:** a decision must never outlive the evidence that justified it—but this experimental validator does not yet enforce that rule across a system.
