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
function validContext(overrides = {}) {
  return {
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
    invitationCases:[{ id:"INV-1", workflowState:"READY" }],
    ...overrides
  };
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
  assert.equal(engine.version, "0.2.0");
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
test("safeguarding passing does not verify opportunity source", () => {
  const context = validContext();
  context.opportunities[0].verification = "Unverified";
  const result = evaluate(validRequest(), context);
  assert.equal(gate(result, "opportunity_source").state, "FAIL");
  assert.equal(gate(result, "safeguarding_review").state, "PASS");
});
test("a missing or invalid evaluation time is rejected, never inferred", () => {
  assert.throws(() => engine.evaluateRequest(validRequest(), validContext()), /deterministic evaluation time/);
  assert.throws(() => evaluate(validRequest(), validContext(), "not-a-date"), /deterministic evaluation time/);
});
