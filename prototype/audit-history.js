/* ScoutSA synthetic audit-history validator v0.2.0.
 * Validates a caller-supplied event sequence in memory. It does not provide immutable storage,
 * cryptographic integrity, trusted time, identity proofing, authorization or durable audit history.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.SCOUTSA_AUDIT_HISTORY = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
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
  const EVIDENCE_STATES = new Set(["SUBMITTED", "INSPECTED", "ACCEPTED", "REJECTED", "STALE", "REVOKED", "SUPERSEDED"]);
  const list = value => Array.isArray(value) ? value : [];
  const nonempty = value => typeof value === "string" && value.trim().length > 0;
  const time = value => typeof value === "string" && value.trim() ? Date.parse(value) : NaN;
  const isoTime = value => {
    const parsed = time(value);
    return Number.isFinite(parsed) && new Date(parsed).toISOString() === value ? parsed : NaN;
  };
  const freezeErrors = errors => Object.freeze(errors.map(item => Object.freeze({ ...item })));

  function validateAuditHistory(input = {}) {
    const errors = [];
    const fail = (code, index, detail) => errors.push({ code, index, detail });
    const eventsValid = Array.isArray(input.events);
    const recordsValid = Array.isArray(input.evidenceRecords);
    const reviewsValid = Array.isArray(input.reviews);
    const authoritiesValid = Array.isArray(input.eventAuthorities);
    const events = list(input.events);
    const evidenceRecords = list(input.evidenceRecords);
    const reviews = list(input.reviews);
    const eventAuthorities = list(input.eventAuthorities);
    const now = isoTime(input.now);

    if (!eventsValid) fail("AUDIT_EVENTS_COLLECTION_INVALID", -1, "events must be an array.");
    else if (!events.length) fail("AUDIT_EVENTS_EMPTY", -1, "A required audit history cannot be empty.");
    if (!recordsValid || !evidenceRecords.length) fail("AUDIT_EVIDENCE_RECORDS_INVALID", -1, "evidenceRecords must be a non-empty array.");
    if (!reviewsValid || !reviews.length) fail("AUDIT_REVIEWS_INVALID", -1, "reviews must be a non-empty array.");
    if (!authoritiesValid || !eventAuthorities.length) fail("AUDIT_EVENT_AUTHORITIES_INVALID", -1, "eventAuthorities must be a non-empty array.");
    if (!Number.isFinite(now)) fail("AUDIT_EVALUATION_TIME_INVALID", -1, "now must be a canonical UTC ISO timestamp.");

    const ids = new Set();
    const evidenceState = new Map();
    const reviewState = new Map();
    const reviewCompletedAt = new Map();
    const reviewInvalidatedAt = new Map();
    const reviewEvidenceLinks = new Map();
    const evidenceInvalidations = new Map();
    const evidenceKey = (ref, version) => ref + "::" + version;
    const unique = (items, predicate) => {
      const matches = list(items).filter(predicate);
      return { record: matches.length === 1 ? matches[0] : null, count: matches.length };
    };
    const evidenceLookup = (ref, version) => unique(evidenceRecords, item => item && item.evidenceRef === ref && item.versionId === version);
    const reviewLookup = id => unique(reviews, item => item && item.reviewId === id);
    const authorityLookup = event => unique(eventAuthorities, item => item && item.id === event.authorityId
      && item.reviewerId === event.actorId && item.organizationId === event.organizationId
      && item.scope === event.scope && item.authority === "Verified");

    const checkEventAuthority = (event, index, occurredAt) => {
      const found = authorityLookup(event);
      if (found.count > 1) {
        fail("AUDIT_EVENT_AUTHORITY_AMBIGUOUS", index, "Event authority must resolve to exactly one verified actor, organization and scope grant.");
        return false;
      }
      const authority = found.record;
      if (!authority) {
        fail("AUDIT_EVENT_AUTHORITY_UNRESOLVED", index, "Event actor and authority must resolve to one exact scoped authority record.");
        return false;
      }
      const expiry = isoTime(authority.expiresAt);
      if (authority.lifecycleStatus !== "ACTIVE" || !Number.isFinite(expiry) || occurredAt >= expiry) {
        fail("AUDIT_EVENT_AUTHORITY_NOT_CURRENT", index, "Event authority must be active and unexpired at event time.");
        return false;
      }
      return true;
    };

    if (eventsValid && recordsValid && reviewsValid && authoritiesValid) {
      let previousTime = -Infinity;
      for (let i = 0; i < events.length; i++) {
        const event = events[i] || {};
        if (!nonempty(event.eventId)) fail("AUDIT_EVENT_ID_MISSING", i, "Every event needs a non-empty eventId.");
        else if (ids.has(event.eventId)) fail("AUDIT_EVENT_ID_DUPLICATE", i, "Event identifiers must be unique.");
        else ids.add(event.eventId);

        const occurredAt = isoTime(event.occurredAt);
        if (!Number.isFinite(occurredAt)) fail("AUDIT_EVENT_TIME_INVALID", i, "occurredAt must be a canonical UTC ISO timestamp.");
        else {
          if (occurredAt <= previousTime) fail("AUDIT_EVENT_ORDER_INVALID", i, "Events must have strictly increasing timestamps; equal-time order is ambiguous.");
          previousTime = occurredAt;
          if (Number.isFinite(now) && occurredAt > now) fail("AUDIT_EVENT_FROM_FUTURE", i, "An event cannot occur after the supplied evaluation time.");
          checkEventAuthority(event, i, occurredAt);
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
          const found = evidenceLookup(event.evidenceRef, event.versionId);
          if (found.count > 1) {
            fail("AUDIT_EVIDENCE_TARGET_AMBIGUOUS", i, "Evidence event must resolve to exactly one evidence version record.");
            continue;
          }
          const record = found.record;
          if (!record) {
            fail("AUDIT_EVIDENCE_TARGET_UNRESOLVED", i, "Event must resolve to exactly one evidence version record.");
            continue;
          }
          if (record.organizationId !== event.organizationId || record.reviewScope !== event.scope) {
            fail("AUDIT_EVIDENCE_SCOPE_MISMATCH", i, "Event organization and scope must match the exact evidence version.");
          }
          if (event.fingerprint !== record.fingerprint || !nonempty(event.fingerprint)) {
            fail("AUDIT_EVIDENCE_FINGERPRINT_MISMATCH", i, "Event must pin the exact synthetic evidence fingerprint.");
          }
          if (["EVIDENCE_INSPECTED", "EVIDENCE_ACCEPTED"].includes(event.eventType)
            && (event.actorId !== record.reviewerId || event.authorityId !== record.authorityId)) {
            fail("AUDIT_EVIDENCE_INSPECTOR_MISMATCH", i, "Inspection and acceptance events must match the evidence record's synthetic inspector and authority.");
          }
          const prior = evidenceState.has(key) ? evidenceState.get(key) : null;
          if (!transition.from.includes(prior) || event.fromState !== prior || event.toState !== transition.to) {
            fail("AUDIT_EVIDENCE_TRANSITION_INVALID", i, "Evidence event does not follow the allowed state transition.");
          } else {
            evidenceState.set(key, transition.to);
            if (["REJECTED", "STALE", "REVOKED", "SUPERSEDED"].includes(transition.to)) {
              evidenceInvalidations.set(key, i);
            }
          }
          continue;
        }

        const reviewTransition = REVIEW_TRANSITIONS[event.eventType];
        if (reviewTransition) {
          if (!nonempty(event.reviewId)) {
            fail("AUDIT_REVIEW_TARGET_MISSING", i, "Review events must identify an exact reviewId.");
            continue;
          }
          const found = reviewLookup(event.reviewId);
          if (found.count > 1) {
            fail("AUDIT_REVIEW_TARGET_AMBIGUOUS", i, "Review event must resolve to exactly one review record.");
            continue;
          }
          const review = found.record;
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
            && declaredPins.every(pin => eventPins.some(item => item && item.evidenceRef === pin.evidenceRef
              && item.versionId === pin.versionId && item.fingerprint === pin.fingerprint));
          if (!samePins) {
            fail("AUDIT_REVIEW_EVIDENCE_LINK_MISSING", i, "Review event must carry the exact evidence-version and fingerprint links declared by the review record.");
          } else if (event.eventType === "REVIEW_COMPLETED") {
            for (const pin of eventPins) {
              const key = nonempty(pin.evidenceRef) && nonempty(pin.versionId) ? evidenceKey(pin.evidenceRef, pin.versionId) : "";
              if (!key || evidenceState.get(key) !== "ACCEPTED") {
                fail("AUDIT_REVIEW_EVIDENCE_NOT_ACCEPTED", i, "A review cannot complete unless every linked evidence version has an earlier ACCEPTED event.");
              }
            }
          }
          const prior = reviewState.has(event.reviewId) ? reviewState.get(event.reviewId) : "PENDING";
          if (event.fromState !== prior || event.toState !== reviewTransition.to || prior !== reviewTransition.from) {
            fail("AUDIT_REVIEW_TRANSITION_INVALID", i, "Review event does not follow the allowed review transition.");
          } else if (event.eventType === "REVIEW_COMPLETED") {
            const completedAt = isoTime(review.completedAt);
            if (!Number.isFinite(completedAt) || occurredAt !== completedAt) {
              fail("AUDIT_REVIEW_COMPLETION_TIME_MISMATCH", i, "Review completion event time must exactly match the review record's completedAt.");
            }
            reviewState.set(event.reviewId, reviewTransition.to);
            reviewCompletedAt.set(event.reviewId, i);
            reviewEvidenceLinks.set(event.reviewId, eventPins);
          } else {
            const completedIndex = reviewCompletedAt.get(event.reviewId);
            if (!Number.isInteger(completedIndex) || i <= completedIndex) {
              fail("AUDIT_REVIEW_INVALIDATION_ORDER_INVALID", i, "Review invalidation must occur after its completion event.");
            } else {
              reviewState.set(event.reviewId, reviewTransition.to);
              reviewInvalidatedAt.set(event.reviewId, i);
            }
          }
          continue;
        }
        fail("AUDIT_EVENT_TYPE_UNKNOWN", i, "Event type is not in the declared evidence/review event vocabulary.");
      }

      for (const review of reviews) {
        if (!review || !nonempty(review.reviewId)) {
          fail("AUDIT_REVIEW_ID_MISSING", events.length, "Every review fixture needs a non-empty reviewId.");
          continue;
        }
        if (!Number.isInteger(reviewCompletedAt.get(review.reviewId))) {
          fail("AUDIT_REVIEW_COMPLETION_EVENT_MISSING", events.length, "Every declared review must have exactly one valid completion event.");
        }
      }

      for (const [key, finalState] of evidenceState) {
        const [ref, version] = key.split("::");
        const found = evidenceLookup(ref, version);
        if (found.record) {
          const record = found.record;
          const expected = record.versionStatus === "SUPERSEDED" ? "SUPERSEDED" : record.inspectionStatus;
          if (EVIDENCE_STATES.has(expected) && finalState !== expected) {
            fail("AUDIT_EVIDENCE_FINAL_STATE_MISMATCH", events.length, "Final event state does not match the evidence record's declared lifecycle/inspection state.");
          }
        }
      }

      for (const [reviewId, completedIndex] of reviewCompletedAt) {
        for (const pin of list(reviewEvidenceLinks.get(reviewId))) {
          const key = evidenceKey(pin.evidenceRef, pin.versionId);
          const invalidatedIndex = evidenceInvalidations.get(key);
          if (Number.isInteger(invalidatedIndex) && invalidatedIndex > completedIndex) {
            const reviewInvalidatedIndex = reviewInvalidatedAt.get(reviewId);
            if (!Number.isInteger(reviewInvalidatedIndex)) {
              fail("AUDIT_REVIEW_INVALIDATION_EVENT_MISSING", events.length, "A completed review must be invalidated when linked evidence is later rejected, stale, revoked or superseded.");
            } else if (reviewInvalidatedIndex <= invalidatedIndex) {
              fail("AUDIT_REVIEW_INVALIDATION_ORDER_INVALID", events.length, "Review invalidation must follow the evidence invalidation it records.");
            }
          }
        }
      }
    }

    const reviewStatuses = reviews.filter(item => item && nonempty(item.reviewId)).map(item => Object.freeze({
      reviewId: item.reviewId,
      status: reviewState.get(item.reviewId) || "PENDING"
    }));
    return Object.freeze({
      valid: errors.length === 0,
      eventCount: events.length,
      evidenceVersionCount: evidenceState.size,
      reviewCount: reviewState.size,
      reviewStatuses: Object.freeze(reviewStatuses),
      errors: freezeErrors(errors)
    });
  }

  return Object.freeze({
    version: "0.2.0",
    validateAuditHistory,
    evidenceEventTypes: Object.freeze(Object.keys(EVIDENCE_TRANSITIONS)),
    reviewEventTypes: Object.freeze(Object.keys(REVIEW_TRANSITIONS))
  });
});
