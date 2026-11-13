"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const engine = require("../review-engine.js");

const NOW = "2026-11-12T10:00:00.000Z";
const FUTURE = "2027-01-01T00:00:00.000Z";
const PAST = "2026-01-01T00:00:00.000Z";
const purpose = "Share selected football evidence with a named academy";

function validRequest(overrides = {}) {
  return {
    id: "REQ-1", playerId: "PLAYER-1", playerRef: "PLAYER-REF-1",
    passportRef: "PLAYER-1", representativeId: "REP-1",
    organizationId: "ORG-1", opportunityId: "OPP-1",
    membershipId: "MEM-1", consentCaseId: "CONSENT-1",
    invitationCaseId: "INV-1", ageState: "Under 18 (scenario)",
    requestOrigin: "Guardian-mediated route", purpose,
    ...overrides
  };
}
function evidenceRecord(evidenceRef, reviewerId, authorityId, claimType, inspectedAt) {
  return {
    evidenceRef, versionId:"v1", versionStatus:"CURRENT",
    fingerprint:"SYNTHETIC-FINGERPRINT-" + evidenceRef,
    invitationId:"INV-1", organizationId:"ORG-1", reviewerId, authorityId,
    claimType, reviewScope:"INVITATION_SAFEGUARDING_REVIEW",
    sourceClass:"SYNTHETIC_FIXTURE", sourceLocator:"SYNTHETIC-LOCATOR-" + evidenceRef,
    inspectionStatus:"ACCEPTED", inspectedBy:reviewerId, inspectedAt,
    findingRef:"SYNTHETIC-FINDING-" + evidenceRef,
    lifecycleStatus:"ACTIVE", expiresAt:FUTURE
  };
}
function buildAuditEvents(context) {
  const events = [];
  const add = (eventType, fromState, toState, occurredAt, record, extra = {}) => {
    const eventId = "AUDIT-EVENT-" + String(events.length + 1).padStart(3,"0");
    events.push({
      eventId,eventType,fromState,toState,occurredAt,
      actorId:record.reviewerId,authorityId:record.authorityId,
      organizationId:record.organizationId,scope:record.reviewScope,
      provenanceRef:"SYNTHETIC-PROVENANCE-" + eventId,
      evidenceRef:record.evidenceRef,versionId:record.versionId,
      fingerprint:record.fingerprint,...extra
    });
  };
  for (const record of Array.isArray(context.evidenceRecords) ? context.evidenceRecords : []) {
    const inspectedAt = Date.parse(record.inspectedAt);
    add("EVIDENCE_CREATED",null,"SUBMITTED",new Date(inspectedAt-30000).toISOString(),record);
    add("EVIDENCE_INSPECTED","SUBMITTED","INSPECTED",new Date(inspectedAt-15000).toISOString(),record);
    if (record.inspectionStatus === "REJECTED") {
      add("EVIDENCE_REJECTED","INSPECTED","REJECTED",new Date(inspectedAt).toISOString(),record);
    } else {
      add("EVIDENCE_ACCEPTED","INSPECTED","ACCEPTED",new Date(inspectedAt).toISOString(),record);
      if (record.versionStatus === "SUPERSEDED") {
        add("EVIDENCE_SUPERSEDED","ACCEPTED","SUPERSEDED",new Date(inspectedAt+15000).toISOString(),record);
      } else if (record.inspectionStatus === "STALE") {
        add("EVIDENCE_MARKED_STALE","ACCEPTED","STALE",new Date(inspectedAt+15000).toISOString(),record);
      } else if (record.inspectionStatus === "REVOKED") {
        add("EVIDENCE_REVOKED","ACCEPTED","REVOKED",new Date(inspectedAt+15000).toISOString(),record);
      }
    }
  }
  const reviews = [];
  for (const invitation of Array.isArray(context.invitationCases) ? context.invitationCases : []) {
    for (const [key,includeIndependence] of [["firstReview",false],["secondReview",true]]) {
      const review = invitation[key];
      if (!review) continue;
      const evidenceRefs = [
        {evidenceRef:review.evidenceRef,versionId:review.evidencePins.completion.versionId,fingerprint:review.evidencePins.completion.fingerprint},
        {evidenceRef:review.conflictEvidenceRef,versionId:review.evidencePins.conflict.versionId,fingerprint:review.evidencePins.conflict.fingerprint}
      ];
      if (includeIndependence) evidenceRefs.push({
        evidenceRef:review.independenceEvidenceRef,
        versionId:review.evidencePins.independence.versionId,
        fingerprint:review.evidencePins.independence.fingerprint
      });
      reviews.push({
        reviewId:review.reviewId,organizationId:invitation.organizationId || "ORG-1",
        scope:"INVITATION_SAFEGUARDING_REVIEW",reviewerId:review.reviewerId,
        authorityId:review.authorityId,completedAt:review.completedAt,evidenceRefs
      });
      const eventId = "AUDIT-EVENT-" + String(events.length + 1).padStart(3,"0");
      events.push({
        eventId,eventType:"REVIEW_COMPLETED",fromState:"PENDING",toState:"COMPLETE",
        occurredAt:review.completedAt,actorId:review.reviewerId,authorityId:review.authorityId,
        organizationId:invitation.organizationId || "ORG-1",
        scope:"INVITATION_SAFEGUARDING_REVIEW",
        provenanceRef:"SYNTHETIC-PROVENANCE-" + eventId,
        reviewId:review.reviewId,evidenceRefs
      });
    }
  }
  return events.sort((a,b)=>Date.parse(a.occurredAt)-Date.parse(b.occurredAt));
}
function validContext(overrides = {}) {
  const context = {
    players: [{ id:"PLAYER-1", recordStatus:"ACTIVE", lifecycleStatus:"ACTIVE", expiresAt:FUTURE }],
    organizations: [{ id:"ORG-1", identityStatus:"Verified", lifecycleStatus:"ACTIVE", expiresAt:FUTURE }],
    representativeAuthorities: [{
      organizationId:"ORG-1", representativeId:"REP-1", authority:"Verified",
      scope:"DISCOVERY_REQUEST_REVIEW", lifecycleStatus:"ACTIVE", expiresAt:FUTURE
    }],
    memberships: [{
      id:"MEM-1", playerId:"PLAYER-1", organizationId:"ORG-1", status:"Active",
      verification:"Verified", lifecycleStatus:"ACTIVE", expiresAt:FUTURE
    }],
    consentCases: [{
      id:"CONSENT-1", playerRef:"PLAYER-REF-1", consentState:"Given",
      guardianState:"Established", playerVoice:"Assent recorded",
      lifecycleStatus:"ACTIVE", expiresAt:FUTURE,
      guardians:[{ guardianRef:"GUARDIAN-1", authorityStatus:"ESTABLISHED", primary:true, decision:"APPROVED" }],
      purposes:[{ name:purpose, purposeCode:"SHARE_SELECTED_FOOTBALL_EVIDENCE",
        state:"Given", recipientOrganizationId:"ORG-1" }]
    }],
    opportunities: [{
      id:"OPP-1", organizationId:"ORG-1", verification:"Verified",
      lifecycleStatus:"ACTIVE", expiresAt:FUTURE, eligibility:"Verified", safeguarding:"Reviewed"
    }],
    reviewers:[
      {id:"REVIEWER-1",identityStatus:"Verified",lifecycleStatus:"ACTIVE",expiresAt:FUTURE},
      {id:"REVIEWER-2",identityStatus:"Verified",lifecycleStatus:"ACTIVE",expiresAt:FUTURE}
    ],
    reviewerAuthorities:[
      {id:"REVIEW-AUTH-1",reviewerId:"REVIEWER-1",organizationId:"ORG-1",scope:"INVITATION_SAFEGUARDING_REVIEW",authority:"Verified",lifecycleStatus:"ACTIVE",expiresAt:FUTURE},
      {id:"REVIEW-AUTH-2",reviewerId:"REVIEWER-2",organizationId:"ORG-1",scope:"INVITATION_SAFEGUARDING_REVIEW",authority:"Verified",lifecycleStatus:"ACTIVE",expiresAt:FUTURE}
    ],
    evidenceRecords:[
      evidenceRecord("SYNTHETIC-FIRST-REVIEW-1","REVIEWER-1","REVIEW-AUTH-1","REVIEW_COMPLETION","2026-11-12T08:55:00.000Z"),
      evidenceRecord("SYNTHETIC-CONFLICT-CHECK-1","REVIEWER-1","REVIEW-AUTH-1","REVIEWER_CONFLICT_CHECK","2026-11-12T08:56:00.000Z"),
      evidenceRecord("SYNTHETIC-SECOND-REVIEW-1","REVIEWER-2","REVIEW-AUTH-2","REVIEW_COMPLETION","2026-11-12T09:25:00.000Z"),
      evidenceRecord("SYNTHETIC-CONFLICT-CHECK-2","REVIEWER-2","REVIEW-AUTH-2","REVIEWER_CONFLICT_CHECK","2026-11-12T09:26:00.000Z"),
      evidenceRecord("SYNTHETIC-INDEPENDENCE-CHECK-1","REVIEWER-2","REVIEW-AUTH-2","REVIEWER_INDEPENDENCE_CHECK","2026-11-12T09:27:00.000Z")
    ],
    invitationCases:[{
      id:"INV-1",organizationId:"ORG-1",opportunityId:"OPP-1",workflowState:"READY",secondReviewStatus:"COMPLETE",
      firstReview:{reviewId:"INV-1-FIRST",reviewerId:"REVIEWER-1",authorityId:"REVIEW-AUTH-1",status:"COMPLETE",completedAt:"2026-11-12T09:00:00.000Z",evidenceRef:"SYNTHETIC-FIRST-REVIEW-1",conflictStatus:"CLEARED",conflictEvidenceRef:"SYNTHETIC-CONFLICT-CHECK-1",evidencePins:{completion:{versionId:"v1",fingerprint:"SYNTHETIC-FINGERPRINT-SYNTHETIC-FIRST-REVIEW-1"},conflict:{versionId:"v1",fingerprint:"SYNTHETIC-FINGERPRINT-SYNTHETIC-CONFLICT-CHECK-1"}}},
      secondReview:{reviewId:"INV-1-SECOND",reviewerId:"REVIEWER-2",authorityId:"REVIEW-AUTH-2",status:"COMPLETE",completedAt:"2026-11-12T09:30:00.000Z",evidenceRef:"SYNTHETIC-SECOND-REVIEW-1",conflictStatus:"CLEARED",conflictEvidenceRef:"SYNTHETIC-CONFLICT-CHECK-2",independenceStatus:"CONFIRMED",independenceEvidenceRef:"SYNTHETIC-INDEPENDENCE-CHECK-1",evidencePins:{completion:{versionId:"v1",fingerprint:"SYNTHETIC-FINGERPRINT-SYNTHETIC-SECOND-REVIEW-1"},conflict:{versionId:"v1",fingerprint:"SYNTHETIC-FINGERPRINT-SYNTHETIC-CONFLICT-CHECK-2"},independence:{versionId:"v1",fingerprint:"SYNTHETIC-FINGERPRINT-SYNTHETIC-INDEPENDENCE-CHECK-1"}}}
    }],
    ...overrides
  };
  if (!Object.prototype.hasOwnProperty.call(overrides,"auditEvents")) context.auditEvents = buildAuditEvents(context);
  return context;
}
function evaluate(request = validRequest(), context = validContext(), now = NOW) {
  return engine.evaluateRequest(request, context, { now });
}
function gate(result, key) {
  const found = result.gates.find(item => item.key === key);
  assert.ok(found, "missing gate: " + key);
  return found;
}
function fixtureBundle() {
  const window = {};
  const files = [
    "player-passports.demo.js", "guardian-consent.demo.js",
    "organization-memberships.demo.js", "coach-academy-workspace.demo.js",
    "opportunities.demo.js", "safeguarded-invitations.demo.js",
    "discovery-requests.demo.js"
  ];
  for (const file of files) {
    const source = fs.readFileSync(path.join(__dirname, "../data", file), "utf8");
    vm.runInNewContext(source, { window }, { filename:file });
  }
  return window;
}

test("engine is pure CommonJS and has no DOM dependency", () => {
  assert.equal(engine.version, "0.3.0");
  assert.equal(typeof engine.evaluateRequest, "function");
});
test("all three committed synthetic request fixtures remain HOLD", () => {
  const f = fixtureBundle();
  const context = {
    players:Object.values(f.SCOUTSA_DEMO_PLAYERS),
    consentCases:f.SCOUTSA_GUARDIAN_CONSENT_DEMO.cases,
    organizations:f.SCOUTSA_DEMO_MEMBERSHIPS.organizations,
    memberships:f.SCOUTSA_DEMO_MEMBERSHIPS.memberships,
    representativeAuthorities:[f.SCOUTSA_ACADEMY_WORKSPACE_DEMO.organization],
    opportunities:f.SCOUTSA_DEMO_OPPORTUNITIES.records,
    invitationCases:f.SCOUTSA_INVITATION_WORKFLOW.cases
  };
  for (const request of f.SCOUTSA_DISCOVERY_REQUESTS.records) {
    const result = evaluate(request, context);
    assert.equal(result.disposition, "HOLD", request.id);
    assert.equal(result.disclosurePermitted, false, request.id);
    assert.equal(result.gates.length, 12, request.id);
  }
});
test("valid synthetic state reaches human review only, never disclosure", () => {
  const result = evaluate();
  assert.equal(result.disposition, "READY_FOR_SEPARATE_HUMAN_REVIEW");
  assert.equal(result.allBlockingGatesSatisfied, true);
  assert.equal(result.disclosurePermitted, false);
  assert.equal(gate(result, "disclosure_scope").state, "FAIL");
});
test("evaluation is deterministic for a fixed context time", () => {
  const a = evaluate();
  const b = evaluate();
  assert.deepEqual(a, b);
});
test("evaluation does not mutate request or context inputs", () => {
  const request = validRequest();
  const context = validContext();
  const before = structuredClone({ request, context });
  evaluate(request, context);
  assert.deepEqual({ request, context }, before);
});
test("malformed or missing context collections normalize to empty and fail closed", () => {
  for (const malformed of [null, undefined, {}, "not-an-array"]) {
    const context = validContext({
      players: malformed,
      organizations: malformed,
      representativeAuthorities: malformed,
      memberships: malformed,
      consentCases: malformed,
      opportunities: malformed,
      invitationCases: malformed
    });
    const result = evaluate(validRequest(), context);
    assert.equal(result.disposition, "HOLD");
    assert.equal(result.allBlockingGatesSatisfied, false);
    assert.equal(result.disclosurePermitted, false);
    assert.equal(gate(result, "disclosure_scope").state, "FAIL");
  }
});
test("missing request input is treated as an unresolved request and fails closed", () => {
  const result = evaluate(null, validContext());
  assert.equal(result.disposition, "HOLD");
  assert.equal(result.allBlockingGatesSatisfied, false);
  assert.equal(result.disclosurePermitted, false);
});
test("duplicate Passport references fail closed instead of taking the first record", () => {
  const context = validContext();
  context.players.push(structuredClone(context.players[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "passport_reference").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_PASSPORT_REFERENCE"));
});
test("duplicate organization references fail closed", () => {
  const context = validContext();
  context.organizations.push(structuredClone(context.organizations[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "organization_identity").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_ORGANIZATION_REFERENCE"));
  assert.equal(gate(result, "purpose_consent").state, "SKIPPED");
});
test("duplicate representative authority grants fail closed", () => {
  const context = validContext();
  context.representativeAuthorities.push(structuredClone(context.representativeAuthorities[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "representative_authority").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_REPRESENTATIVE_AUTHORITY"));
});
test("duplicate membership references fail closed", () => {
  const context = validContext();
  context.memberships.push(structuredClone(context.memberships[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "membership_linkage").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_MEMBERSHIP_REFERENCE"));
});
test("duplicate opportunity references fail closed", () => {
  const context = validContext();
  context.opportunities.push(structuredClone(context.opportunities[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "opportunity_source").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_OPPORTUNITY_REFERENCE"));
  assert.equal(gate(result, "opportunity_eligibility").state, "SKIPPED");
});
test("duplicate invitation review references fail closed", () => {
  const context = validContext();
  context.invitationCases.push(structuredClone(context.invitationCases[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_INVITATION_REVIEW_REFERENCE"));
});
test("duplicate consent references fail closed", () => {
  const context = validContext();
  context.consentCases.push(structuredClone(context.consentCases[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "purpose_consent").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_CONSENT_REFERENCE"));
});
test("duplicate grants for one purpose code are treated as ambiguous", () => {
  const context = validContext();
  context.consentCases[0].purposes.push(structuredClone(context.consentCases[0].purposes[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "purpose_consent").state, "FAIL");
  assert.ok(result.reasonCodes.includes("CONSENT_PURPOSE_AMBIGUOUS"));
});
test("missing Passport fails closed", () => {
  const result = evaluate(validRequest({ passportRef:null }));
  assert.equal(gate(result, "passport_reference").state, "FAIL");
  assert.ok(result.reasonCodes.includes("PASSPORT_REFERENCE_MISMATCH"));
});
test("suspended Passport fails even when the record exists", () => {
  const context = validContext();
  context.players[0].lifecycleStatus = "SUSPENDED";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "passport_reference").state, "FAIL");
  assert.ok(result.reasonCodes.includes("LIFECYCLE_NOT_ACTIVE"));
});
test("Passport with missing expiry fails closed", () => {
  const context = validContext();
  delete context.players[0].expiresAt;
  const result = evaluate(validRequest(), context);
  assert.ok(result.reasonCodes.includes("LIFECYCLE_EXPIRY_MISSING_OR_INVALID"));
});
test("an expiry timestamp is invalid at the exact boundary", () => {
  const context = validContext();
  context.players[0].expiresAt = NOW;
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "passport_reference").state, "FAIL");
  assert.ok(result.reasonCodes.includes("LIFECYCLE_EXPIRED"));
});
test("expired Passport fails at the supplied evaluation time", () => {
  const context = validContext();
  context.players[0].expiresAt = PAST;
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "passport_reference").state, "FAIL");
  assert.ok(result.reasonCodes.includes("LIFECYCLE_EXPIRED"));
});
test("unverified organization prevents representative-authorized consent evaluation", () => {
  const context = validContext();
  context.organizations[0].identityStatus = "Unverified";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "organization_identity").state, "FAIL");
  assert.equal(gate(result, "purpose_consent").state, "SKIPPED");
  assert.ok(result.skippedPrerequisites.includes("purpose_consent"));
  assert.ok(!result.reasonCodes.includes("CONSENT_NOT_GIVEN"));
});
test("representative authority must bind exact organization, person, scope and lifecycle", () => {
  const context = validContext();
  context.representativeAuthorities[0].representativeId = "OTHER-REP";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "representative_authority").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REPRESENTATIVE_AUTHORITY_SCOPE_MISMATCH"));
  assert.equal(gate(result, "purpose_consent").state, "SKIPPED");
});
test("expired representative authority blocks Tier 2", () => {
  const context = validContext();
  context.representativeAuthorities[0].expiresAt = PAST;
  const result = evaluate(validRequest(), context);
  assert.ok(result.skippedPrerequisites.includes("purpose_consent"));
  assert.ok(result.reasonCodes.includes("LIFECYCLE_EXPIRED"));
});
test("membership must match exact player and organization", () => {
  const context = validContext();
  context.memberships[0].organizationId = "ORG-OTHER";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "membership_linkage").state, "FAIL");
  assert.ok(result.reasonCodes.includes("MEMBERSHIP_LINK_MISMATCH"));
});
test("membership bound to another player fails closed", () => {
  const context = validContext();
  context.memberships[0].playerId = "PLAYER-OTHER";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "membership_linkage").state, "FAIL");
  assert.ok(result.reasonCodes.includes("MEMBERSHIP_LINK_MISMATCH"));
});

test("opportunity owned by another organization fails closed", () => {
  const context = validContext();
  context.opportunities[0].organizationId = "ORG-OTHER";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "opportunity_source").state, "FAIL");
  assert.ok(result.reasonCodes.includes("OPPORTUNITY_ORGANIZATION_MISMATCH"));
  assert.equal(gate(result, "opportunity_eligibility").state, "SKIPPED");
  assert.equal(gate(result, "safeguarding_review").state, "SKIPPED");
});

test("opaque player reference cannot be replaced by an internal Passport ID", () => {
  const request = validRequest({ playerRef: "PLAYER-1" });
  const result = evaluate(request, validContext());
  assert.equal(gate(result, "passport_reference").state, "PASS");
  assert.equal(gate(result, "guardian_authority").state, "FAIL");
  assert.equal(gate(result, "player_voice").state, "FAIL");
  assert.equal(gate(result, "purpose_consent").state, "FAIL");
  assert.ok(result.reasonCodes.includes("CONSENT_PLAYER_MISMATCH"));
});

test("malformed nested guardian and purpose collections fail closed", () => {
  const context = validContext();
  context.consentCases[0].guardians = { guardianRef: "GUARDIAN-1", authorityStatus: "ESTABLISHED", primary: true, decision: "APPROVED" };
  context.consentCases[0].purposes = { purposeCode: "SHARE_SELECTED_FOOTBALL_EVIDENCE", state: "Given", recipientOrganizationId: "ORG-1" };
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "guardian_authority").state, "FAIL");
  assert.equal(gate(result, "purpose_consent").state, "FAIL");
  assert.ok(result.reasonCodes.includes("GUARDIAN_AUTHORITY_NOT_ESTABLISHED"));
  assert.ok(result.reasonCodes.includes("CONSENT_PURPOSE_NOT_GIVEN"));
  assert.equal(result.disclosurePermitted, false);
});

test("membership lifecycle expiry is re-evaluated at review time", () => {
  const context = validContext();
  context.memberships[0].expiresAt = PAST;
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "membership_linkage").state, "FAIL");
  assert.ok(result.reasonCodes.includes("LIFECYCLE_EXPIRED"));
});
test("consent expiry is checked at evaluation time", () => {
  const context = validContext();
  context.consentCases[0].expiresAt = PAST;
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "purpose_consent").state, "FAIL");
  assert.ok(result.reasonCodes.includes("LIFECYCLE_EXPIRED"));
});
test("wrong purpose does not satisfy the requested purpose category", () => {
  const context = validContext();
  context.consentCases[0].purposes[0].purposeCode = "RESPOND_TO_SPECIFIC_OPPORTUNITY_REQUEST";
  context.consentCases[0].purposes[0].name = "Respond to a specific opportunity request";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "purpose_consent").state, "FAIL");
  assert.ok(result.reasonCodes.includes("CONSENT_PURPOSE_NOT_GIVEN"));
});
test("consent for a different organization does not satisfy recipient scope", () => {
  const context = validContext();
  context.consentCases[0].purposes[0].recipientOrganizationId = "ORG-OTHER";
  const result = evaluate(validRequest(), context);
  assert.ok(result.reasonCodes.includes("CONSENT_RECIPIENT_MISMATCH"));
});
test("any established guardian objection or revocation creates a conflict hold", () => {
  const context = validContext();
  context.consentCases[0].guardians.push({
    guardianRef:"GUARDIAN-2", authorityStatus:"ESTABLISHED", primary:false, decision:"OBJECTION"
  });
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "guardian_authority").state, "FAIL");
  assert.ok(result.reasonCodes.includes("GUARDIAN_CONFLICT_HOLD"));
  assert.equal(gate(result, "purpose_consent").state, "FAIL");
});
test("guardian authority and player voice cannot be borrowed from another player's consent case", () => {
  const context = validContext();
  context.consentCases[0].playerRef = "SOME-OTHER-PLAYER";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "guardian_authority").state, "FAIL");
  assert.equal(gate(result, "player_voice").state, "FAIL");
  assert.ok(result.reasonCodes.includes("CONSENT_PLAYER_MISMATCH"));
});
test("every established primary guardian must approve; silence is not consent", () => {
  const context = validContext();
  context.consentCases[0].guardians.push({
    guardianRef:"GUARDIAN-2", authorityStatus:"ESTABLISHED", primary:true, decision:"NO_RESPONSE"
  });
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "guardian_authority").state, "FAIL");
  assert.ok(result.reasonCodes.includes("GUARDIAN_AUTHORITY_NOT_ESTABLISHED"));
});
test("unverified guardian assertion alone does not establish authority", () => {
  const context = validContext();
  context.consentCases[0].guardianState = "Not established";
  context.consentCases[0].guardians = [{
    guardianRef:"GUARDIAN-CLAIM", authorityStatus:"ASSERTED", primary:true, decision:"APPROVED"
  }];
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "guardian_authority").state, "FAIL");
});
test("unknown age retains under-18 safeguards and requires guardian-mediated route", () => {
  const result = evaluate(validRequest({ ageState:"Unknown" }));
  assert.equal(gate(result, "age_safe_route").state, "PASS");
  assert.equal(gate(result, "guardian_authority").state, "PASS");
});
test("unverified adult status cannot bypass guardian protections", () => {
  const result = evaluate(validRequest({ ageState:"Adult status not verified", requestOrigin:"Adult self-directed" }));
  assert.equal(gate(result, "age_safe_route").state, "FAIL");
  assert.equal(gate(result, "guardian_authority").state, "FAIL");
});
test("eligibility passing does not clear safeguarding", () => {
  const context = validContext();
  context.opportunities[0].safeguarding = "Not assessed";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "opportunity_eligibility").state, "PASS");
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
});
test("eligibility and safeguarding are skipped until opportunity source is verified", () => {
  const context = validContext();
  context.opportunities[0].verification = "Unverified";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "opportunity_source").state, "FAIL");
  assert.equal(gate(result, "opportunity_eligibility").state, "SKIPPED");
  assert.equal(gate(result, "safeguarding_review").state, "SKIPPED");
});
test("invitation review must bind to the exact opportunity", () => {
  const context = validContext();
  context.invitationCases[0].opportunityId = "OPP-OTHER";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("INVITATION_OPPORTUNITY_MISMATCH"));
});
test("legacy second-review status is ignored without structured reviewer evidence", () => {
  const context = validContext();
  delete context.invitationCases[0].firstReview;
  delete context.invitationCases[0].secondReview;
  context.invitationCases[0].secondReviewStatus = "COMPLETE";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("INVITATION_REVIEW_EVIDENCE_INCOMPLETE"));
});
test("revoked consent is rejected when the request is re-evaluated", () => {
  const context = validContext();
  const first = evaluate(validRequest(), context);
  assert.equal(gate(first, "purpose_consent").state, "PASS");
  context.consentCases[0].lifecycleStatus = "REVOKED";
  const second = evaluate(validRequest(), context);
  assert.equal(gate(second, "purpose_consent").state, "FAIL");
  assert.ok(second.reasonCodes.includes("LIFECYCLE_NOT_ACTIVE"));
});
test("a free-text purpose label without its controlled purpose code is insufficient", () => {
  const context = validContext();
  delete context.consentCases[0].purposes[0].purposeCode;
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "purpose_consent").state, "FAIL");
  assert.ok(result.reasonCodes.includes("CONSENT_PURPOSE_NOT_GIVEN"));
});
test("representative authority revoked mid-review blocks the next evaluation", () => {
  const context = validContext();
  const first = evaluate(validRequest(), context);
  assert.equal(first.disposition, "READY_FOR_SEPARATE_HUMAN_REVIEW");
  context.representativeAuthorities[0].lifecycleStatus = "REVOKED";
  const second = evaluate(validRequest(), context);
  assert.equal(second.disposition, "HOLD");
  assert.equal(gate(second, "purpose_consent").state, "SKIPPED");
  assert.ok(second.reasonCodes.includes("LIFECYCLE_NOT_ACTIVE"));
});
test("a missing or invalid evaluation time is rejected, never inferred", () => {
  assert.throws(() => engine.evaluateRequest(validRequest(), validContext()), /deterministic evaluation time/);
  assert.throws(() => evaluate(validRequest(), validContext(), "not-a-date"), /deterministic evaluation time/);
});

test("evidence-backed two-person review eligibility never becomes approval, selection or invitation", () => {
  const context = validContext();
  // The synthetic reviewer records support only gate evaluation, never an outcome.
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "PASS");
  assert.equal(result.disposition, "READY_FOR_SEPARATE_HUMAN_REVIEW");
  assert.equal(result.disclosurePermitted, false);
  assert.equal(result.invitationIssued, undefined);
  assert.equal(result.approved, undefined);
  assert.equal(result.selected, undefined);
});

test("invitation workflow must be READY even when second-review status is COMPLETE", () => {
  const context = validContext();
  context.invitationCases[0].workflowState = "HOLD";
  context.invitationCases[0].secondReviewStatus = "COMPLETE";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("SAFEGUARDING_NOT_CLEARED"));
  assert.equal(result.disposition, "HOLD");
  assert.equal(result.disclosurePermitted, false);
});

test("guardian revocation between evaluations blocks the next consent review", () => {
  const context = validContext();
  const first = evaluate(validRequest(), context);
  assert.equal(gate(first, "guardian_authority").state, "PASS");
  assert.equal(gate(first, "purpose_consent").state, "PASS");
  context.consentCases[0].guardians[0].decision = "REVOKED";
  const second = evaluate(validRequest(), context);
  assert.equal(gate(second, "guardian_authority").state, "FAIL");
  assert.equal(gate(second, "purpose_consent").state, "FAIL");
  assert.ok(second.reasonCodes.includes("GUARDIAN_CONFLICT_HOLD"));
  assert.equal(second.disposition, "HOLD");
  assert.equal(second.disclosurePermitted, false);
});

test("the second reviewer must be a different person with a distinct authority grant", () => {
  const context = validContext();
  context.invitationCases[0].secondReview.reviewerId = "REVIEWER-1";
  context.invitationCases[0].secondReview.authorityId = "REVIEW-AUTH-1";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEWER_NOT_INDEPENDENT"));
});

test("reviewer authority must match reviewer, organization and exact safeguarding scope", () => {
  const context = validContext();
  context.reviewerAuthorities[1].scope = "DISCOVERY_REQUEST_REVIEW";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEWER_AUTHORITY_SCOPE_MISMATCH"));
});

test("expired reviewer identity or authority cannot satisfy the review gate", () => {
  const context = validContext();
  context.reviewers[1].expiresAt = PAST;
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEWER_IDENTITY_LIFECYCLE_EXPIRED"));
});

test("reviewers must have cleared conflict checks with evidence references", () => {
  const context = validContext();
  context.invitationCases[0].firstReview.conflictEvidenceRef = "";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEWER_CONFLICT_CHECK_NOT_EVIDENCED"));
});

test("second-review independence requires an explicit evidence reference", () => {
  const context = validContext();
  context.invitationCases[0].secondReview.independenceEvidenceRef = "";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("SECOND_REVIEW_INDEPENDENCE_NOT_EVIDENCED"));
});

test("second review cannot predate the first review", () => {
  const context = validContext();
  context.invitationCases[0].secondReview.completedAt = "2026-11-12T08:30:00.000Z";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("INVITATION_REVIEW_ORDER_INVALID"));
});

test("duplicate reviewer identities fail closed", () => {
  const context = validContext();
  context.reviewers.push(structuredClone(context.reviewers[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_REVIEWER_IDENTITY"));
});

test("duplicate reviewer authority records fail closed", () => {
  const context = validContext();
  context.reviewerAuthorities.push(structuredClone(context.reviewerAuthorities[1]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_REVIEWER_AUTHORITY"));
});

test("submitted or merely inspected evidence is not accepted for a review claim", () => {
  const context = validContext();
  context.evidenceRecords[0].inspectionStatus = "INSPECTED";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_NOT_ACCEPTED"));
  assert.equal(result.disclosurePermitted, false);
});

test("evidence provenance must match the exact claim and review scope", () => {
  const context = validContext();
  context.evidenceRecords[0].claimType = "REVIEWER_CONFLICT_CHECK";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_PROVENANCE_MISMATCH"));
});

test("stale evidence invalidates a previously complete review on reevaluation", () => {
  const context = validContext();
  assert.equal(gate(evaluate(validRequest(), context), "safeguarding_review").state, "PASS");
  context.evidenceRecords[0].inspectionStatus = "STALE";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_INVALIDATED"));
  assert.equal(result.disposition, "HOLD");
});

test("revoked evidence invalidates a previously complete review on reevaluation", () => {
  const context = validContext();
  assert.equal(gate(evaluate(validRequest(), context), "safeguarding_review").state, "PASS");
  context.evidenceRecords[0].lifecycleStatus = "REVOKED";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_INVALIDATED"));
  assert.equal(result.disclosurePermitted, false);
});

test("evidence inspection must be performed by the reviewer recorded for that claim", () => {
  const context = validContext();
  context.evidenceRecords[1].inspectedBy = "REVIEWER-2";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_PROVENANCE_MISMATCH"));
});

test("expired evidence cannot support a review", () => {
  const context = validContext();
  context.evidenceRecords[0].expiresAt = PAST;
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_INVALIDATED"));
});

test("missing evidence inspection record fails closed", () => {
  const context = validContext();
  context.evidenceRecords = context.evidenceRecords.filter(item => item.evidenceRef !== "SYNTHETIC-FIRST-REVIEW-1");
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_VERSION_MISSING"));
});

test("duplicate evidence references fail closed", () => {
  const context = validContext();
  context.evidenceRecords.push(structuredClone(context.evidenceRecords[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_REVIEW_EVIDENCE_VERSION"));
});

test("revoked reviewer authority invalidates the invitation review on reevaluation", () => {
  const context = validContext();
  assert.equal(gate(evaluate(validRequest(), context), "safeguarding_review").state, "PASS");
  context.reviewerAuthorities[1].lifecycleStatus = "REVOKED";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEWER_AUTHORITY_LIFECYCLE_NOT_ACTIVE"));
  assert.equal(result.disclosurePermitted, false);
});

test("review without an explicit evidence version and fingerprint pin fails closed", () => {
  const context = validContext();
  delete context.invitationCases[0].firstReview.evidencePins;
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_VERSION_PIN_MISSING"));
});

test("a pinned evidence version must exist", () => {
  const context = validContext();
  context.invitationCases[0].firstReview.evidencePins.completion.versionId = "v99";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_VERSION_MISSING"));
});

test("a superseded evidence version invalidates its prior review", () => {
  const context = validContext();
  assert.equal(gate(evaluate(validRequest(), context), "safeguarding_review").state, "PASS");
  const old = context.evidenceRecords[0];
  old.versionStatus = "SUPERSEDED";
  const next = structuredClone(old);
  next.versionId = "v2";
  next.versionStatus = "CURRENT";
  next.fingerprint = "SYNTHETIC-FINGERPRINT-V2";
  next.sourceLocator = "SYNTHETIC-LOCATOR-V2";
  next.findingRef = "SYNTHETIC-FINDING-V2";
  context.evidenceRecords.push(next);
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_VERSION_SUPERSEDED"));
  assert.equal(result.disclosurePermitted, false);
});

test("two current versions of the same evidence reference are ambiguous", () => {
  const context = validContext();
  const next = structuredClone(context.evidenceRecords[0]);
  next.versionId = "v2";
  next.fingerprint = "SYNTHETIC-FINGERPRINT-V2";
  context.evidenceRecords.push(next);
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_CURRENT_VERSION_AMBIGUOUS"));
});

test("duplicate evidence version identifiers fail closed", () => {
  const context = validContext();
  context.evidenceRecords.push(structuredClone(context.evidenceRecords[0]));
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("DUPLICATE_REVIEW_EVIDENCE_VERSION"));
});

test("a changed fingerprint cannot reuse an earlier review pin", () => {
  const context = validContext();
  context.evidenceRecords[0].fingerprint = "SYNTHETIC-FINGERPRINT-CHANGED";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "FAIL");
  assert.ok(result.reasonCodes.includes("REVIEW_EVIDENCE_FINGERPRINT_MISMATCH"));
});

test("a fresh review pinned to the new accepted version can pass", () => {
  const context = validContext();
  const old = context.evidenceRecords[0];
  old.versionStatus = "SUPERSEDED";
  const next = structuredClone(old);
  next.versionId = "v2";
  next.versionStatus = "CURRENT";
  next.fingerprint = "SYNTHETIC-FINGERPRINT-V2";
  next.sourceLocator = "SYNTHETIC-LOCATOR-V2";
  next.findingRef = "SYNTHETIC-FINDING-V2";
  next.inspectedAt = "2026-11-12T09:05:00.000Z";
  context.evidenceRecords.push(next);
  context.invitationCases[0].firstReview.evidencePins.completion = {
    versionId:"v2", fingerprint:"SYNTHETIC-FINGERPRINT-V2"
  };
  context.invitationCases[0].firstReview.completedAt = "2026-11-12T09:10:00.000Z";
  context.auditEvents = buildAuditEvents(context);
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "safeguarding_review").state, "PASS");
  assert.equal(result.disclosurePermitted, false);
});



test("missing audit history blocks invitation safeguarding review", () => {
  const context = validContext();
  delete context.auditEvents;
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result,"safeguarding_review").state,"FAIL");
  assert.ok(result.reasonCodes.includes("INVITATION_AUDIT_HISTORY_MISSING"));
  assert.equal(result.disclosurePermitted,false);
});
test("empty audit history blocks invitation safeguarding review", () => {
  const context = validContext({auditEvents:[]});
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result,"safeguarding_review").state,"FAIL");
  assert.ok(result.reasonCodes.includes("INVITATION_AUDIT_HISTORY_MISSING"));
});
test("incomplete audit history blocks invitation safeguarding review", () => {
  const context = validContext();
  context.auditEvents = context.auditEvents.filter(event=>event.eventType!=="REVIEW_COMPLETED" || event.reviewId!=="INV-1-SECOND");
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result,"safeguarding_review").state,"FAIL");
  assert.ok(result.reasonCodes.includes("INVITATION_AUDIT_HISTORY_INVALID"));
  assert.equal(result.disclosurePermitted,false);
});
test("a validly recorded review invalidation blocks the safeguarding gate", () => {
  const context = validContext();
  const first = context.invitationCases[0].firstReview;
  context.auditEvents.push({
    eventId:"AUDIT-INVALIDATE-FIRST",eventType:"REVIEW_INVALIDATED",
    fromState:"COMPLETE",toState:"INVALIDATED",
    occurredAt:"2026-11-12T09:31:00.000Z",
    actorId:first.reviewerId,authorityId:first.authorityId,
    organizationId:"ORG-1",scope:"INVITATION_SAFEGUARDING_REVIEW",
    provenanceRef:"SYNTHETIC-INVALIDATION-PROVENANCE",
    reviewId:first.reviewId,
    evidenceRefs:[
      {evidenceRef:first.evidenceRef,versionId:first.evidencePins.completion.versionId,fingerprint:first.evidencePins.completion.fingerprint},
      {evidenceRef:first.conflictEvidenceRef,versionId:first.evidencePins.conflict.versionId,fingerprint:first.evidencePins.conflict.fingerprint}
    ]
  });
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result,"safeguarding_review").state,"FAIL");
  assert.ok(result.reasonCodes.includes("INVITATION_REVIEW_HISTORY_INVALIDATED"));
  assert.equal(result.disclosurePermitted,false);
});
test("freshly version-pinned evidence requires a rebuilt audit sequence", () => {
  const context = validContext();
  const old = context.evidenceRecords[0];
  old.versionStatus="SUPERSEDED";
  const next=structuredClone(old);
  next.versionId="v2";next.versionStatus="CURRENT";
  next.fingerprint="SYNTHETIC-FINGERPRINT-V2";
  next.sourceLocator="SYNTHETIC-LOCATOR-V2";
  next.findingRef="SYNTHETIC-FINDING-V2";
  next.inspectedAt="2026-11-12T09:05:00.000Z";
  context.evidenceRecords.push(next);
  context.invitationCases[0].firstReview.evidencePins.completion={versionId:"v2",fingerprint:"SYNTHETIC-FINGERPRINT-V2"};
  context.invitationCases[0].firstReview.completedAt="2026-11-12T09:10:00.000Z";
  const result=evaluate(validRequest(),context);
  assert.equal(gate(result,"safeguarding_review").state,"FAIL");
  assert.ok(result.reasonCodes.includes("INVITATION_AUDIT_HISTORY_INVALID"));
  context.auditEvents=buildAuditEvents(context);
  const fresh=evaluate(validRequest(),context);
  assert.equal(gate(fresh,"safeguarding_review").state,"PASS");
  assert.equal(fresh.disclosurePermitted,false);
});
