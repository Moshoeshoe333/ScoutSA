/* ScoutSA synthetic audit-history validator v0.1.0.
 * Validates an ordered event proposal in memory. It does not provide immutable storage,
 * cryptographic integrity, identity proofing, authorization or durable audit history.
 */
"use strict";

const EVIDENCE_TRANSITIONS = Object.freeze({
  EVIDENCE_CREATED: { from: [null], to: "SUBMITTED" },
  EVIDENCE_INSPECTED: { from: ["SUBMITTED"], to: "INSPECTED" },
  EVIDENCE_ACCEPTED: { from: ["INSPECTED"], to: "ACCEPTED" },
  EVIDENCE_REJECTED: { from: ["SUBMITTED", "INSPECTED"], to: "REJECTED" },
  EVIDENCE_MARKED_STALE: { from: ["ACCEPTED"], to: "STALE" },
  EVIDENCE_REVOKED: { from: ["SUBMITTED", "INSPECTED", "ACCEPTED", "STALE"], to: "REVOKED" },
  EVIDENCE_SUPERSEDED: { from: ["ACCEPTED"], to: "SUPERSEDED" }
});
const REVIEW_TRANSITIONS = Object.freeze({
  REVIEW_COMPLETED: { from: "PENDING", to: "COMPLETE" },
  REVIEW_INVALIDATED: { from: "COMPLETE", to: "INVALIDATED" }
});
const list = value => Array.isArray(value) ? value : [];
const nonempty = value => typeof value === "string" && value.trim().length > 0;
const time = value => typeof value === "string" && value.trim() ? Date.parse(value) : NaN;

function validateAuditHistory(input = {}) {
  const events = list(input.events);
  const evidenceRecords = list(input.evidenceRecords);
  const reviews = list(input.reviews);
  const errors = [];
  const ids = new Set();
  const evidenceState = new Map();
  const reviewState = new Map();
  const evidenceInvalidations = new Map();
  const reviewCompletedAt = new Map();
  const reviewInvalidatedAt = new Map();
  const reviewEvidenceLinks = new Map();
  let previousTime = -Infinity;

  const fail = (code, index, detail) => errors.push({ code, index, detail });
  const evidenceKey = (ref, version) => ref + "::" + version;
  const evidenceLookup = (ref, version) => {
    const matches = evidenceRecords.filter(item => item && item.evidenceRef === ref && item.versionId === version);
    return matches.length === 1 ? matches[0] : null;
  };
  const reviewLookup = id => {
    const matches = reviews.filter(item => item && item.reviewId === id);
    return matches.length === 1 ? matches[0] : null;
  };

  for (let i = 0; i < events.length; i++) {
    const event = events[i] || {};
    if (!nonempty(event.eventId)) fail("AUDIT_EVENT_ID_MISSING", i, "Every event needs a non-empty eventId.");
    else if (ids.has(event.eventId)) fail("AUDIT_EVENT_ID_DUPLICATE", i, "Event identifiers must be unique.");
    else ids.add(event.eventId);

    const occurredAt = time(event.occurredAt);
    if (!Number.isFinite(occurredAt)) fail("AUDIT_EVENT_TIME_INVALID", i, "occurredAt must be a valid timestamp.");
    else {
      if (occurredAt < previousTime) fail("AUDIT_EVENT_ORDER_INVALID", i, "Events must be ordered by non-decreasing occurredAt.");
      previousTime = occurredAt;
      if (Number.isFinite(time(input.now)) && occurredAt > time(input.now)) {
        fail("AUDIT_EVENT_FROM_FUTURE", i, "An event cannot occur after the supplied evaluation time.");
      }
    }
    for (const field of ["actorId", "authorityId", "organizationId", "scope", "provenanceRef"]) {
      if (!nonempty(event[field])) fail("AUDIT_EVENT_PROVENANCE_MISSING", i, "Missing " + field + ".");
    }

    const transition = EVIDENCE_TRANSITIONS[event.eventType];
    if (transition) {
      if (!nonempty(event.evidenceRef) || !nonempty(event.versionId)) {
        fail("AUDIT_EVIDENCE_TARGET_MISSING", i, "Evidence events must identify an exact evidenceRef and versionId.");
        continue;
      }
      const key = evidenceKey(event.evidenceRef, event.versionId);
      const record = evidenceLookup(event.evidenceRef, event.versionId);
      if (!record) {
        fail("AUDIT_EVIDENCE_TARGET_UNRESOLVED", i, "Event must resolve to exactly one evidence version record.");
        continue;
      }
      if (record.organizationId !== event.organizationId || record.reviewScope !== event.scope) {
        fail("AUDIT_EVIDENCE_SCOPE_MISMATCH", i, "Event organization and scope must match the exact evidence version.");
      }
      if (event.actorId !== record.reviewerId || event.authorityId !== record.authorityId) {
        fail("AUDIT_EVIDENCE_ACTOR_MISMATCH", i, "Event actor and authority must match the synthetic evidence reviewer binding.");
      }
      const prior = evidenceState.has(key) ? evidenceState.get(key) : null;
      if (!transition.from.includes(prior) || event.fromState !== prior || event.toState !== transition.to) {
        fail("AUDIT_EVIDENCE_TRANSITION_INVALID", i, "Evidence event does not follow the allowed state transition.");
      } else {
        evidenceState.set(key, transition.to);
        if (["REJECTED", "STALE", "REVOKED", "SUPERSEDED"].includes(transition.to)) evidenceInvalidations.set(key, i);
      }
      continue;
    }

    const reviewTransition = REVIEW_TRANSITIONS[event.eventType];
    if (reviewTransition) {
      if (!nonempty(event.reviewId)) {
        fail("AUDIT_REVIEW_TARGET_MISSING", i, "Review events must identify an exact reviewId.");
        continue;
      }
      const review = reviewLookup(event.reviewId);
      if (!review) {
        fail("AUDIT_REVIEW_TARGET_UNRESOLVED", i, "Review event must resolve to exactly one review record.");
        continue;
      }
      if (event.organizationId !== review.organizationId || event.scope !== review.scope
        || event.actorId !== review.reviewerId || event.authorityId !== review.authorityId) {
        fail("AUDIT_REVIEW_ACTOR_OR_SCOPE_MISMATCH", i, "Review event actor, authority, organization and scope must match the review record.");
      }
      const declaredPins = list(review.evidenceRefs);
      const eventPins = list(event.evidenceRefs);
      const samePins = declaredPins.length > 0 && eventPins.length === declaredPins.length
        && declaredPins.every(pin => eventPins.some(item => item
          && item.evidenceRef === pin.evidenceRef && item.versionId === pin.versionId));
      if (!samePins) {
        fail("AUDIT_REVIEW_EVIDENCE_LINK_MISSING", i, "Review event must carry the exact evidence-version links declared by the review record.");
      } else if (event.eventType === "REVIEW_COMPLETED") {
        for (const pin of eventPins) {
          const key = nonempty(pin.evidenceRef) && nonempty(pin.versionId)
            ? evidenceKey(pin.evidenceRef, pin.versionId) : "";
          if (!key || evidenceState.get(key) !== "ACCEPTED") {
            fail("AUDIT_REVIEW_EVIDENCE_NOT_ACCEPTED", i, "A review cannot complete unless every linked evidence version has an earlier ACCEPTED event.");
          }
        }
      }
      const prior = reviewState.has(event.reviewId) ? reviewState.get(event.reviewId) : "PENDING";
      if (event.fromState !== prior || event.toState !== reviewTransition.to
        || prior !== reviewTransition.from) {
        fail("AUDIT_REVIEW_TRANSITION_INVALID", i, "Review event does not follow the allowed review transition.");
      } else {
        reviewState.set(event.reviewId, reviewTransition.to);
        if (event.eventType === "REVIEW_COMPLETED") {
          reviewCompletedAt.set(event.reviewId, i);
          reviewEvidenceLinks.set(event.reviewId, eventPins);
        } else {
          reviewInvalidatedAt.set(event.reviewId, i);
        }
      }
      continue;
    }
    fail("AUDIT_EVENT_TYPE_UNKNOWN", i, "Event type is not in the declared evidence/review event vocabulary.");
  }

  for (const [reviewId, completedIndex] of reviewCompletedAt) {
    for (const pin of list(reviewEvidenceLinks.get(reviewId))) {
      const key = evidenceKey(pin.evidenceRef, pin.versionId);
      const invalidatedIndex = evidenceInvalidations.get(key);
      if (Number.isInteger(invalidatedIndex) && invalidatedIndex > completedIndex
        && !(reviewInvalidatedAt.get(reviewId) > invalidatedIndex)) {
        fail("AUDIT_REVIEW_INVALIDATION_EVENT_MISSING", events.length,
          "A completed review must have a later invalidation event when a linked evidence version is later rejected, stale, revoked or superseded.");
      }
    }
  }

  return Object.freeze({
    valid: errors.length === 0,
    eventCount: events.length,
    evidenceVersionCount: evidenceState.size,
    reviewCount: reviewState.size,
    errors: Object.freeze(errors)
  });
}

module.exports = Object.freeze({
  version: "0.1.0",
  validateAuditHistory,
  evidenceEventTypes: Object.freeze(Object.keys(EVIDENCE_TRANSITIONS)),
  reviewEventTypes: Object.freeze(Object.keys(REVIEW_TRANSITIONS))
});
