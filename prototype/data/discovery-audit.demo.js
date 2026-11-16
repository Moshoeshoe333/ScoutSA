/* Synthetic audit-history fixtures for the Discovery & Request Review page.
 * Fictional reviewer, authority, evidence and event records only.
 * This fixture demonstrates structural evaluation; it is not real verification.
 */
(function (root) {
  "use strict";
  const FUTURE = "2027-01-01T00:00:00.000Z";
  const INVITATION = "INV-DEMO-001";
  const ORGANIZATION = "ORG-DEMO-01";
  const SCOPE = "INVITATION_SAFEGUARDING_REVIEW";

  function evidenceRecord(evidenceRef, reviewerId, authorityId, claimType, inspectedAt) {
    return {
      evidenceRef, versionId: "v1", versionStatus: "CURRENT",
      fingerprint: "SYNTHETIC-FINGERPRINT-" + evidenceRef,
      invitationId: INVITATION, organizationId: ORGANIZATION, reviewerId, authorityId,
      claimType, reviewScope: SCOPE, sourceClass: "SYNTHETIC_FIXTURE",
      sourceLocator: "SYNTHETIC-LOCATOR-" + evidenceRef,
      inspectionStatus: "ACCEPTED", inspectedBy: reviewerId, inspectedAt,
      findingRef: "SYNTHETIC-FINDING-" + evidenceRef,
      lifecycleStatus: "ACTIVE", expiresAt: FUTURE
    };
  }

  function buildAuditEvents(context) {
    const events = [];
    const addEvidenceEvent = (eventType, fromState, toState, occurredAt, record) => {
      const eventId = "AUDIT-DEMO-" + String(events.length + 1).padStart(3, "0");
      events.push({
        eventId, eventType, fromState, toState, occurredAt,
        invitationId: record.invitationId, actorId: record.reviewerId,
        authorityId: record.authorityId, organizationId: record.organizationId,
        scope: record.reviewScope, provenanceRef: "SYNTHETIC-PROVENANCE-" + eventId,
        evidenceRef: record.evidenceRef, versionId: record.versionId,
        fingerprint: record.fingerprint
      });
    };

    context.evidenceRecords.forEach(record => {
      const inspectedAt = Date.parse(record.inspectedAt);
      addEvidenceEvent("EVIDENCE_CREATED", null, "SUBMITTED",
        new Date(inspectedAt - 30000).toISOString(), record);
      addEvidenceEvent("EVIDENCE_INSPECTED", "SUBMITTED", "INSPECTED",
        new Date(inspectedAt - 15000).toISOString(), record);
      if (record.inspectionStatus === "REVOKED") {
        addEvidenceEvent("EVIDENCE_ACCEPTED", "INSPECTED", "ACCEPTED",
          new Date(inspectedAt).toISOString(), record);
        addEvidenceEvent("EVIDENCE_REVOKED", "ACCEPTED", "REVOKED",
          new Date(inspectedAt + 15000).toISOString(), record);
      } else {
        addEvidenceEvent("EVIDENCE_ACCEPTED", "INSPECTED", "ACCEPTED",
          new Date(inspectedAt).toISOString(), record);
      }
    });

    for (const invitation of context.invitationCases) {
      for (const [key, includeIndependence] of [["firstReview", false], ["secondReview", true]]) {
        const review = invitation[key];
        const evidenceRefs = [
          { evidenceRef: review.evidenceRef, versionId: review.evidencePins.completion.versionId,
            fingerprint: review.evidencePins.completion.fingerprint },
          { evidenceRef: review.conflictEvidenceRef, versionId: review.evidencePins.conflict.versionId,
            fingerprint: review.evidencePins.conflict.fingerprint }
        ];
        if (includeIndependence) evidenceRefs.push({
          evidenceRef: review.independenceEvidenceRef,
          versionId: review.evidencePins.independence.versionId,
          fingerprint: review.evidencePins.independence.fingerprint
        });
        const eventId = "AUDIT-DEMO-" + String(events.length + 1).padStart(3, "0");
        events.push({
          eventId, eventType: "REVIEW_COMPLETED", fromState: "PENDING", toState: "COMPLETE",
          occurredAt: review.completedAt, actorId: review.reviewerId, authorityId: review.authorityId,
          organizationId: invitation.organizationId, scope: SCOPE,
          provenanceRef: "SYNTHETIC-PROVENANCE-" + eventId,
          invitationId: invitation.id, reviewId: review.reviewId, evidenceRefs
        });
      }
    }
    return events.sort((a, b) => Date.parse(a.occurredAt) - Date.parse(b.occurredAt));
  }

  function create(scenario) {
    const reviewers = [
      { id: "REVIEWER-DEMO-1", identityStatus: "Verified", lifecycleStatus: "ACTIVE", expiresAt: FUTURE },
      { id: "REVIEWER-DEMO-2", identityStatus: "Verified", lifecycleStatus: "ACTIVE", expiresAt: FUTURE }
    ];
    const reviewerAuthorities = [
      { id: "REVIEW-AUTH-DEMO-1", reviewerId: "REVIEWER-DEMO-1", organizationId: ORGANIZATION,
        scope: SCOPE, authority: "Verified", lifecycleStatus: "ACTIVE", expiresAt: FUTURE },
      { id: "REVIEW-AUTH-DEMO-2", reviewerId: "REVIEWER-DEMO-2", organizationId: ORGANIZATION,
        scope: SCOPE, authority: "Verified", lifecycleStatus: "ACTIVE", expiresAt: FUTURE }
    ];
    const evidenceRecords = [
      evidenceRecord("SYNTHETIC-FIRST-REVIEW-DEMO", "REVIEWER-DEMO-1", "REVIEW-AUTH-DEMO-1",
        "REVIEW_COMPLETION", "2026-11-12T08:55:00.000Z"),
      evidenceRecord("SYNTHETIC-FIRST-CONFLICT-DEMO", "REVIEWER-DEMO-1", "REVIEW-AUTH-DEMO-1",
        "REVIEWER_CONFLICT_CHECK", "2026-11-12T08:56:00.000Z"),
      evidenceRecord("SYNTHETIC-SECOND-REVIEW-DEMO", "REVIEWER-DEMO-2", "REVIEW-AUTH-DEMO-2",
        "REVIEW_COMPLETION", "2026-11-12T09:25:00.000Z"),
      evidenceRecord("SYNTHETIC-SECOND-CONFLICT-DEMO", "REVIEWER-DEMO-2", "REVIEW-AUTH-DEMO-2",
        "REVIEWER_CONFLICT_CHECK", "2026-11-12T09:26:00.000Z"),
      evidenceRecord("SYNTHETIC-INDEPENDENCE-DEMO", "REVIEWER-DEMO-2", "REVIEW-AUTH-DEMO-2",
        "REVIEWER_INDEPENDENCE_CHECK", "2026-11-12T09:27:00.000Z")
    ];
    const invitation = {
      id: INVITATION, organizationId: ORGANIZATION, opportunityId: "OPP-DEMO-001",
      workflowState: "READY", secondReviewStatus: "COMPLETE",
      firstReview: {
        reviewId: "INV-DEMO-001-FIRST", reviewerId: "REVIEWER-DEMO-1",
        authorityId: "REVIEW-AUTH-DEMO-1", status: "COMPLETE",
        completedAt: "2026-11-12T09:00:00.000Z",
        evidenceRef: "SYNTHETIC-FIRST-REVIEW-DEMO",
        conflictStatus: "CLEARED", conflictEvidenceRef: "SYNTHETIC-FIRST-CONFLICT-DEMO",
        evidencePins: {
          completion: { versionId: "v1", fingerprint: "SYNTHETIC-FINGERPRINT-SYNTHETIC-FIRST-REVIEW-DEMO" },
          conflict: { versionId: "v1", fingerprint: "SYNTHETIC-FINGERPRINT-SYNTHETIC-FIRST-CONFLICT-DEMO" }
        }
      },
      secondReview: {
        reviewId: "INV-DEMO-001-SECOND", reviewerId: "REVIEWER-DEMO-2",
        authorityId: "REVIEW-AUTH-DEMO-2", status: "COMPLETE",
        completedAt: "2026-11-12T09:30:00.000Z",
        evidenceRef: "SYNTHETIC-SECOND-REVIEW-DEMO",
        conflictStatus: "CLEARED", conflictEvidenceRef: "SYNTHETIC-SECOND-CONFLICT-DEMO",
        independenceStatus: "CONFIRMED", independenceEvidenceRef: "SYNTHETIC-INDEPENDENCE-DEMO",
        evidencePins: {
          completion: { versionId: "v1", fingerprint: "SYNTHETIC-FINGERPRINT-SYNTHETIC-SECOND-REVIEW-DEMO" },
          conflict: { versionId: "v1", fingerprint: "SYNTHETIC-FINGERPRINT-SYNTHETIC-SECOND-CONFLICT-DEMO" },
          independence: { versionId: "v1", fingerprint: "SYNTHETIC-FINGERPRINT-SYNTHETIC-INDEPENDENCE-DEMO" }
        }
      }
    };
    const context = {
      reviewers, reviewerAuthorities, evidenceRecords, invitationCases: [invitation]
    };
    context.auditEvents = buildAuditEvents(context);

    if (scenario === "missing-history") context.auditEvents = [];
    if (scenario === "invalidated-evidence") {
      context.evidenceRecords[0].inspectionStatus = "REVOKED";
      context.evidenceRecords[0].lifecycleStatus = "REVOKED";
      context.auditEvents = buildAuditEvents(context);
    }
    return context;
  }

  root.SCOUTSA_DISCOVERY_AUDIT_DEMO = Object.freeze({ create });
})(window);
