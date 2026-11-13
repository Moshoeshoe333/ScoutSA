"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const filterHandoffRecords = require("../handoff-filter.js");

function fixtures() {
  const window = {};
  const files = [
    "player-passports.demo.js",
    "organization-memberships.demo.js",
    "opportunities.demo.js",
    "opportunity-evidence.demo.js",
    "opportunity-decisions.demo.js",
    "safeguarded-invitations.demo.js",
    "player-opportunity-matches.demo.js",
    "player-development-pathways.demo.js",
    "coach-academy-workspace.demo.js",
    "guardian-consent.demo.js",
    "discovery-requests.demo.js"
  ];
  for (const file of files) {
    const source = fs.readFileSync(path.join(__dirname, "../data", file), "utf8");
    vm.runInNewContext(source, { window }, { filename: file });
  }
  return window;
}

function uniqueIds(rows, label) {
  const ids = rows.map(row => row && row.id);
  assert.ok(ids.every(id => typeof id === "string" && id.length > 0), label + " records need non-empty IDs");
  assert.equal(new Set(ids).size, ids.length, label + " IDs must be unique");
  return new Set(ids);
}

test("all specialist workspace fixtures have unique IDs and resolvable cross-workspace references", () => {
  const f = fixtures();
  const players = Object.values(f.SCOUTSA_DEMO_PLAYERS);
  const organizations = f.SCOUTSA_DEMO_MEMBERSHIPS.organizations;
  const memberships = f.SCOUTSA_DEMO_MEMBERSHIPS.memberships;
  const opportunities = f.SCOUTSA_DEMO_OPPORTUNITIES.records;
  const evidence = f.SCOUTSA_DEMO_EVIDENCE.entries;
  const decisions = f.SCOUTSA_DEMO_DECISIONS.decisions;
  const invitations = f.SCOUTSA_INVITATION_WORKFLOW.cases;
  const pairs = f.SCOUTSA_MATCHING_DEMO.pairs;
  const pathways = f.SCOUTSA_PATHWAYS_DEMO;
  const coach = f.SCOUTSA_ACADEMY_WORKSPACE_DEMO;
  const guardians = f.SCOUTSA_GUARDIAN_CONSENT_DEMO.cases;
  const requests = f.SCOUTSA_DISCOVERY_REQUESTS.records;

  const playerIds = new Set(players.map(row => row.id));
  const organizationIds = uniqueIds(organizations, "Organization");
  const membershipIds = uniqueIds(memberships, "Membership");
  const opportunityIds = uniqueIds(opportunities, "Opportunity");
  const evidenceIds = uniqueIds(evidence, "Opportunity evidence");
  const decisionIds = uniqueIds(decisions, "Claim decision");
  const invitationIds = uniqueIds(invitations, "Invitation");
  const pairIds = uniqueIds(pairs, "Player-opportunity pair");
  const guardianIds = uniqueIds(guardians, "Guardian/consent case");
  const requestIds = uniqueIds(requests, "Discovery request");
  uniqueIds(pathways.players, "Pathway player");
  uniqueIds(pathways.stages, "Pathway stage");

  assert.equal(playerIds.size, players.length, "Passport IDs must be unique");
  for (const row of memberships) {
    assert.ok(organizationIds.has(row.organizationId), row.id + " must reference an existing organization");
    assert.ok(playerIds.has(row.playerId), row.id + " must reference an existing Passport");
  }
  for (const row of opportunities) {
    assert.ok(organizationIds.has(row.organizationId), row.id + " must reference an existing organization");
  }
  const opportunityTitles = new Set(opportunities.map(row => row.title));
  for (const row of evidence) {
    assert.ok(opportunityTitles.has(row.opportunity), row.id + " must reference an existing opportunity title");
  }
  for (const row of decisions) {
    assert.ok(evidenceIds.has(row.evidenceId), row.id + " must reference existing evidence");
  }
  for (const row of invitations) {
    assert.ok(opportunityIds.has(row.opportunityId), row.id + " must reference an existing opportunity");
    const opportunity = opportunities.find(item => item.id === row.opportunityId);
    assert.equal(opportunity.organizationId, row.organizationId,
      row.id + " request organization must own the referenced opportunity");
  }
  for (const row of pairs) {
    assert.ok(playerIds.has(row.playerId), row.id + " must reference an existing Passport");
    assert.ok(opportunityIds.has(row.opportunityId), row.id + " must reference an existing opportunity");
  }
  for (const row of pathways.players) {
    assert.ok(playerIds.has(row.id), row.id + " pathway must reference an existing Passport");
    assert.equal(row.stages.length, pathways.stages.length, row.id + " must have one state per pathway stage");
  }

  for (const row of requests) {
    assert.ok(guardianIds.has(row.consentCaseId), row.id + " must reference an existing consent case");
    assert.ok(organizationIds.has(row.organizationId), row.id + " must reference an existing organization");
    assert.ok(opportunityIds.has(row.opportunityId), row.id + " must reference an existing opportunity");
    const guardian = guardians.find(item => item.id === row.consentCaseId);
    assert.equal(guardian.playerRef, row.playerRef, row.id + " player reference must agree with its consent case");
    if (row.passportRef !== null) {
      assert.equal(row.passportRef, row.playerId, row.id + " Passport reference must agree with player ID when supplied");
    }

    if (row.membershipId !== null) {
      assert.ok(membershipIds.has(row.membershipId), row.id + " must reference an existing membership");
      const membership = memberships.find(item => item.id === row.membershipId);
      assert.equal(membership.playerId, row.playerId, row.id + " membership must belong to the same player");
      assert.equal(membership.organizationId, row.organizationId, row.id + " membership must belong to the same organization");
    }
    if (row.invitationCaseId !== null) {
      assert.ok(invitationIds.has(row.invitationCaseId), row.id + " must reference an existing invitation case");
      const invitation = invitations.find(item => item.id === row.invitationCaseId);
      assert.equal(invitation.opportunityId, row.opportunityId, row.id + " invitation must concern the same opportunity");
    }
  }

  // One deliberately incomplete fixture remains to exercise missing-Passport fail-closed handling.
  const incomplete = requests.find(row => row.id === "REQ-DEMO-003");
  assert.ok(incomplete, "the explicit incomplete request fixture must remain present");
  assert.equal(playerIds.has(incomplete.playerId), false, "REQ-DEMO-003 intentionally has no matching Passport");
  assert.equal(incomplete.passportRef, null, "REQ-DEMO-003 must not invent a Passport reference");
  assert.equal(incomplete.membershipId, null, "REQ-DEMO-003 must not borrow another player's membership");
  for (const row of requests.filter(item => item.id !== "REQ-DEMO-003")) {
    assert.ok(playerIds.has(row.playerId), row.id + " must reference an existing Passport");
    assert.equal(row.passportRef, row.playerId, row.id + " Passport reference must agree with player ID");
  }

  // The coach/academy summary must remain scoped to its own organization.
  const coachOrgId = coach.organization.id;
  assert.ok(organizationIds.has(coachOrgId), "coach workspace organization must exist");
  assert.equal(coach.memberships.length, coach.summary.membershipClaims,
    "coach membership summary must equal its listed organization membership claims");
  assert.equal(coach.opportunities.length, coach.summary.opportunityProposals,
    "coach opportunity summary must equal its listed organization proposals");
  assert.equal(coach.evidenceActions.length, coach.summary.evidenceActions,
    "coach evidence-action summary must equal its listed actions");
  for (const row of coach.memberships) {
    assert.ok(membershipIds.has(row.id), row.id + " coach membership must resolve centrally");
    assert.equal(memberships.find(item => item.id === row.id).organizationId, coachOrgId,
      row.id + " coach membership must belong to the coach workspace organization");
  }
  for (const row of coach.opportunities) {
    assert.ok(opportunityIds.has(row.id), row.id + " coach opportunity must resolve centrally");
    assert.equal(opportunities.find(item => item.id === row.id).organizationId, coachOrgId,
      row.id + " coach opportunity must belong to the coach workspace organization");
  }

  assert.equal(requestIds.size, requests.length);
  assert.equal(decisionIds.size, decisions.length);
  assert.equal(pairIds.size, pairs.length);
});

test("URL handoff filtering fails closed on incomplete, unknown and mismatched references", () => {
  const records = [
    { id: "REQ-1", playerId: "PLAYER-1", opportunityId: "OPP-1" },
    { id: "REQ-2", playerId: "PLAYER-1", opportunityId: "OPP-2" },
    { id: "REQ-3", playerId: "PLAYER-2", opportunityId: "OPP-1" }
  ];
  assert.deepEqual(filterHandoffRecords(records), records);
  assert.deepEqual(filterHandoffRecords(records, { hasOpportunityParam: true, opportunityId: "OPP-1" }), []);
  assert.deepEqual(filterHandoffRecords(records, { hasPlayerParam: true, playerId: "" }), []);
  assert.deepEqual(filterHandoffRecords(records, { hasPlayerParam: true, playerId: "UNKNOWN" }), []);
  assert.deepEqual(filterHandoffRecords(records, {
    hasPlayerParam: true, hasOpportunityParam: true, playerId: "PLAYER-1", opportunityId: "UNKNOWN"
  }), []);
  assert.deepEqual(filterHandoffRecords(records, {
    hasPlayerParam: true, hasOpportunityParam: true, playerId: "PLAYER-1", opportunityId: "OPP-2"
  }), [records[1]]);
  assert.deepEqual(filterHandoffRecords(null), []);
  assert.deepEqual(filterHandoffRecords(undefined, { hasPlayerParam: true, playerId: "PLAYER-1" }), []);
  assert.deepEqual(records.map(row => row.id), ["REQ-1", "REQ-2", "REQ-3"], "filtering must not mutate input records");
});
