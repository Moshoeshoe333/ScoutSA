"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const engine = read("prototype/review-engine.js");
const engineTests = read("prototype/tests/review-engine.test.js");
const auditModel = read("prototype/audit-history.js");
const auditTests = read("prototype/tests/audit-history.test.js");
const auditProposal = read("prototype/SYNTHETIC-AUDIT-HISTORY-PROPOSAL.md");
const contract = read("prototype/REVIEW-ENGINE-CONTRACT.md");
const prototypeReadme = read("prototype/README.md");
const gateStatus = read("docs/00-gate-status.md");
const verification = read("prototype/verification/audit-history-gate-verification-2026-11-13.md");
const rootReadme = read("README.md");
const ciVerification = read("prototype/verification/documentation-integrity-ci-2026-11-13.md");
const documentationTestSource = read("prototype/tests/documentation-integrity.test.js");

const versionLine = engine.split("\n").find(line => line.includes("review engine v"));
const version = versionLine?.split("review engine v")[1]?.split(" ")[0];
const declaredTestCount = engineTests.split("\n").filter(line => line.startsWith("test(")).length;
const declaredDocumentationTestCount = documentationTestSource.split("\n").filter(line => line.startsWith("test(")).length;
const totalDeclaredTestCount = declaredTestCount + declaredDocumentationTestCount;
const hasCurrentTestCount = source => source.includes(`${declaredTestCount}/${declaredTestCount}`) || source.includes(`${declaredTestCount} / ${declaredTestCount}`);

test("contract, README and gate status identify the source engine version", () => {
  assert.ok(version, "engine version comment must be present");
  assert.ok(contract.includes("prototype/review-engine.js") && contract.includes("version `" + version + "`"), "contract engine version is stale");
  assert.ok(prototypeReadme.includes("review-engine.js"), "prototype README must identify the engine");
  assert.ok(prototypeReadme.includes(version), "prototype README must state current engine version");
  assert.ok(gateStatus.includes(version), "gate status must state current engine version");
});

test("current documentation reports the count derived from test declarations", () => {
  assert.ok(declaredTestCount > 0, "headless test declarations must be discoverable");
  assert.ok(hasCurrentTestCount(prototypeReadme), "prototype README test count is stale");
  assert.ok(hasCurrentTestCount(gateStatus), "gate status test count is stale");
  assert.ok(hasCurrentTestCount(verification), "verification record test count is stale");
  assert.ok(rootReadme.includes(`${declaredDocumentationTestCount} documentation checks`), "root README documentation-test count is stale");
  assert.ok(prototypeReadme.includes(`${declaredDocumentationTestCount} checks declared`) || prototypeReadme.includes(`${declaredDocumentationTestCount}/${declaredDocumentationTestCount} checks passed`) || prototypeReadme.includes(`${declaredDocumentationTestCount} documentation checks`), "prototype README documentation-test count is stale");
  assert.ok(gateStatus.includes(`${declaredDocumentationTestCount} checks`), "gate-status documentation-test count is stale");
  assert.ok(ciVerification.includes(`${declaredDocumentationTestCount} documentation-integrity test declarations (${totalDeclaredTestCount} total)`), "CI verification documentation-test count is stale");
});

test("root README links the integrity policy and workflow directory has no empty files", () => {
  assert.ok(rootReadme.includes("docs/engineering-integrity.md"));
  const workflowDir = path.join(root, ".github/workflows");
  if (fs.existsSync(workflowDir)) {
    for (const name of fs.readdirSync(workflowDir).filter(name => name.endsWith(".yml") || name.endsWith(".yaml"))) {
      assert.ok(fs.statSync(path.join(workflowDir, name)).size > 0, `workflow file is empty: ${name}`);
    }
  }
});


test("affiliation evidence proposal is linked and explicitly non-ratified", () => {
  const proposal = read("prototype/AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md");
  assert.ok(proposal.includes("NOT RATIFIED"), "proposal must remain explicitly non-ratified");
  assert.ok(proposal.includes("No implementation is authorized"), "proposal must preserve implementation hold");
  assert.ok(rootReadme.includes("prototype/AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md"), "root README must link proposal");
  const currentCiIds = [rootReadme, prototypeReadme, gateStatus, ciVerification].map(source => source.match(/Recorded 45-test CI baseline: \[run (\d+)\]/)?.[1]);
  assert.ok(currentCiIds.every(Boolean), "each current summary must identify the last successful prototype CI run");
  assert.ok(new Set(currentCiIds).size === 1, "current summaries must cite the same successful prototype CI run");
  assert.ok(prototypeReadme.includes("AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md"), "prototype README must link proposal");
  assert.ok(gateStatus.includes("AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md"), "gate status must link proposal");
  assert.ok(proposal.includes("Player-reported experience") && proposal.includes("Community-coach attestation") && proposal.includes("Formal organization record"), "all three evidence classes must be documented");
});


test("opportunity evidence acceptance matrix is linked and explicitly non-ratified", () => {
  const matrix = read("prototype/OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md");
  assert.ok(matrix.includes("NOT RATIFIED"), "matrix must remain explicitly non-ratified");
  assert.ok(matrix.includes("No implementation is authorized"), "matrix must preserve implementation hold");
  assert.ok(rootReadme.includes("prototype/OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md"), "root README must link matrix");
  assert.ok(prototypeReadme.includes("OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md"), "prototype README must link matrix");
  assert.ok(gateStatus.includes("OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md"), "gate status must link matrix");
  for (const term of ["Open community development session", "Academy assessment / trial invitation", "Formal club membership / registration", "League eligibility / competition registration", "Scouting observation"]) {
    assert.ok(matrix.includes(term), "matrix missing opportunity category: " + term);
  }
});

test("opportunity requirement declaration is linked and explicitly non-ratified", () => {
  const declaration = read("prototype/OPPORTUNITY-REQUIREMENT-DECLARATION.md");
  assert.ok(declaration.includes("NOT RATIFIED"), "declaration must remain explicitly non-ratified");
  assert.ok(declaration.includes("No implementation is authorized"), "declaration must preserve implementation hold");
  assert.ok(rootReadme.includes("prototype/OPPORTUNITY-REQUIREMENT-DECLARATION.md"), "root README must link declaration");
  assert.ok(prototypeReadme.includes("OPPORTUNITY-REQUIREMENT-DECLARATION.md"), "prototype README must link declaration");
  assert.ok(gateStatus.includes("OPPORTUNITY-REQUIREMENT-DECLARATION.md"), "gate status must link declaration");
  assert.ok(declaration.includes("mandatory criteria versus preferences") && declaration.includes("Safeguarding, age, guardian and safe-contact declaration") && declaration.includes("Privacy and data minimization"), "declaration must cover core requirement and safety domains");
  assert.ok(declaration.includes("owner cannot approve their own") || declaration.includes("must not be the sole reviewer"), "declaration must preserve independent review of owner authority");
  const currentCiIds = [rootReadme, prototypeReadme, gateStatus, ciVerification].map(source => source.match(/(?:Current|Historical) 46-test CI verification: \[run (\d+)\]/)?.[1]);
  assert.ok(currentCiIds.every(Boolean), "each summary must identify the hosted 46-test baseline");
  assert.ok(new Set(currentCiIds).size === 1, "all summaries must cite the same 46-test baseline");
});

test("opportunity validation scenario pack is linked, synthetic and non-ratified", () => {
  const pack = read("prototype/OPPORTUNITY-VALIDATION-SCENARIO-PACK.md");
  assert.ok(pack.includes("NOT RATIFIED") && pack.includes("No implementation is authorized"), "scenario pack must preserve authority and implementation boundaries");
  assert.ok(pack.includes("All people, organizations, venues, messages, amounts and records in the cases below are fictional"), "scenarios must be explicitly synthetic");
  for (const id of ["V-01","V-02","V-03","V-04","V-05","V-06","V-07","V-08","V-09","V-10","V-11","V-12","V-13","V-14"]) assert.ok(pack.includes("### "+id), "scenario missing: "+id);
  assert.ok(rootReadme.includes("OPPORTUNITY-VALIDATION-SCENARIO-PACK.md"), "root README must link scenario pack");
  assert.ok(prototypeReadme.includes("OPPORTUNITY-VALIDATION-SCENARIO-PACK.md"), "prototype README must link scenario pack");
  assert.ok(gateStatus.includes("OPPORTUNITY-VALIDATION-SCENARIO-PACK.md"), "gate status must link scenario pack");
});

test("workspace hub links every existing synthetic review journey", () => {
  const dashboard = read("prototype/index.html");
  const workspacePaths = [
    "player-passport.html",
    "organization-memberships.html",
    "opportunities.html",
    "opportunity-evidence.html",
    "opportunity-decisions.html",
    "safeguarded-invitations.html",
    "player-opportunity-matching.html",
    "player-development-pathways.html",
    "coach-academy-workspace.html",
    "guardian-consent.html",
    "discovery-request.html"
  ];
  assert.ok(dashboard.includes('id="workspaceSection"'), "dashboard must expose the workspace hub");
  assert.ok(dashboard.includes('data-view="workspaces"'), "workspace navigation must be available");
  assert.ok(dashboard.includes("workspaces:['All workspaces'"), "workspace view must be handled by navigation state");
  assert.ok(dashboard.includes("fictional records"), "hub must disclose synthetic-only records");
  for (const file of workspacePaths) {
    assert.ok(dashboard.includes('href="./' + file + '"'), "workspace hub link missing: " + file);
    assert.ok(fs.existsSync(path.join(root, "prototype", file)), "linked workspace file does not exist: " + file);
    const destination = read("prototype/" + file);
    assert.ok(destination.includes('aria-label="ScoutSA workspace return"'), "workspace must provide return navigation: " + file);
    assert.ok(destination.includes('href="./index.html"'), "workspace must link back to the hub: " + file);
  }
  assert.equal((dashboard.match(/class="workspace-card"/g) || []).length, workspacePaths.length, "workspace card inventory must match the linked workspace files");
  const passport = read("prototype/player-passport.html");
  const discovery = read("prototype/discovery-request.html");
  const opportunity = read("prototype/opportunities.html");
  const playerFixtures = read("prototype/data/player-passports.demo.js");
  const requestFixtures = read("prototype/data/discovery-requests.demo.js");
  const filterHandoffRecords = require("../handoff-filter.js");
  const reviewState = require("../review-state.js");
  assert.ok(passport.includes('id="opportunityBrowseLink"') && passport.includes("opportunities.html?player="), "Passport must hand off its selected synthetic player reference to opportunity discovery");
  assert.ok(passport.includes("new URLSearchParams(window.location.search)") && passport.includes("render(initialKey)"), "Passport must restore the matching synthetic player from the handoff URL");
  assert.ok(opportunity.includes("matchingRequest(opportunity)") && opportunity.includes("r.playerId===handoffPlayerId&&r.opportunityId===opportunity.id"), "opportunity discovery must expose a request link only for an exact player–opportunity fixture pair");
  assert.ok(discovery.includes('params.get("player")') && discovery.includes("SCOUTSA_FILTER_HANDOFF_RECORDS(data.records"), "request review must pass handoff references to the shared exact-match filter");
  assert.ok(discovery.includes('params.has("player")') && discovery.includes('params.has("opportunity")'), "request review must detect either handoff parameter independently");
  assert.ok(discovery.includes("SCOUTSA_FILTER_HANDOFF_RECORDS") && discovery.includes('src="./handoff-filter.js"'), "request review must use the shared fail-closed handoff filter");
  const sampleRecords = [
    {id:"r1",playerId:"p1",opportunityId:"o1"},
    {id:"r2",playerId:"p1",opportunityId:"o2"},
    {id:"r3",playerId:"p2",opportunityId:"o1"}
  ];
  assert.deepEqual(filterHandoffRecords(sampleRecords, {}), sampleRecords, "ordinary navigation without handoff parameters must retain the sample queue");
  assert.deepEqual(filterHandoffRecords(sampleRecords, {hasOpportunityParam:true,opportunityId:"o1"}), [], "opportunity-only handoff must fail closed instead of exposing the full queue");
  assert.deepEqual(filterHandoffRecords(sampleRecords, {hasPlayerParam:true,playerId:"unknown"}), [], "unknown Passport handoff must fail closed");
  assert.deepEqual(filterHandoffRecords(sampleRecords, {hasPlayerParam:true,hasOpportunityParam:true,playerId:"p1",opportunityId:"o1"}), [sampleRecords[0]], "complete handoff must return only the exact player–opportunity pair");
  assert.deepEqual(filterHandoffRecords(sampleRecords, {hasPlayerParam:true,hasOpportunityParam:true,playerId:"p1",opportunityId:"missing"}), [], "unmatched opportunity must fail closed");
  assert.deepEqual(filterHandoffRecords(sampleRecords, {hasPlayerParam:true,hasOpportunityParam:true,playerId:"p1",opportunityId:""}), [], "empty opportunity parameter must fail closed");
  assert.ok(discovery.includes("No matching synthetic request") && discovery.includes("No request has been created"), "missing handoff matches must fail closed without creating a request");
  assert.ok(discovery.includes("encodeURIComponent(passport.id)"), "return navigation must preserve the exact synthetic Passport reference");
  assert.ok(playerFixtures.includes("DEMO-PLAYER-001") && playerFixtures.includes("DEMO-PLAYER-002"), "the synthetic Passport fixtures must remain present");
  assert.ok(requestFixtures.includes('playerId:"DEMO-PLAYER-001"') && requestFixtures.includes('playerId:"DEMO-PLAYER-002"'), "each sample Passport must have a corresponding synthetic request fixture");
  const stageKeys = ["organization_identity","representative_authority","passport_reference","membership_linkage","opportunity_source","opportunity_eligibility","age_safe_route","guardian_authority","player_voice","purpose_consent","safeguarding_review"];
  const passingEvaluation = {disposition:"READY_FOR_SEPARATE_HUMAN_REVIEW",allBlockingGatesSatisfied:true,gates:stageKeys.map(key=>({key,label:key,state:"PASS"}))};
  const passingStages = reviewState.deriveReviewStages(passingEvaluation);
  assert.equal(passingStages.length, 6, "review journey must expose six explicit, read-only stages");
  assert.equal(passingStages[0].status, "FICTIONAL FIXTURE — NOT SUBMITTED", "a displayed sample must never imply a received request");
  assert.equal(passingStages[3].status, "ELIGIBLE FOR SEPARATE HUMAN REVIEW", "evaluator readiness must be described as eligibility for separate human review only");
  const unconfirmedEvaluation = {...passingEvaluation,allBlockingGatesSatisfied:false};
  assert.equal(reviewState.deriveReviewStages(unconfirmedEvaluation)[3].status, "NOT READY — HOLD", "readiness without an explicit all-blocking-gates flag must fail closed");
  const inconsistentEvaluation = {disposition:"READY_FOR_SEPARATE_HUMAN_REVIEW",allBlockingGatesSatisfied:true,gates:stageKeys.map(key=>({key,label:key,state:key==="opportunity_source"?"FAIL":"PASS"}))};
  assert.equal(reviewState.deriveReviewStages(inconsistentEvaluation)[3].status, "NOT READY — HOLD", "a readiness disposition inconsistent with failed gate groups must fail closed");
  assert.equal(passingStages[4].status, "NO DECISION RECORDED", "the prototype must not invent a final decision or outcome");
  assert.equal(passingStages[5].status, "PROHIBITED — NOT IMPLEMENTED", "disclosure and contact must remain prohibited");
  const heldEvaluation = {disposition:"HOLD",gates:stageKeys.map(key=>({key,label:key,state:key==="opportunity_source"?"FAIL":key==="opportunity_eligibility"?"SKIPPED":"PASS"}))};
  const heldStages = reviewState.deriveReviewStages(heldEvaluation);
  assert.equal(heldStages[1].status, "HOLD — BLOCKERS PRESENT", "failed evidence checks must keep the evidence stage on hold");
  assert.equal(heldStages[2].status, "CHECKS PASS — SYNTHETIC ONLY", "safeguarding stage must summarize only its own supplied checks");
  assert.equal(heldStages[3].status, "NOT READY — HOLD", "a held evaluation must not appear eligible for human review");
  const skippedEvaluation = {disposition:"HOLD",gates:stageKeys.map(key=>({key,label:key,state:key==="guardian_authority"?"SKIPPED":"PASS"}))};
  assert.equal(reviewState.deriveReviewStages(skippedEvaluation)[2].status, "WAITING — PREREQUISITES NOT MET", "skipped safeguarding checks must be shown as waiting, not passed");
  const incompleteEvaluation = {disposition:"HOLD",gates:stageKeys.slice(1).map(key=>({key,label:key,state:"PASS"}))};
  assert.equal(reviewState.deriveReviewStages(incompleteEvaluation)[1].status, "INCOMPLETE — HOLD", "missing required gate output must fail closed");
  assert.deepEqual(reviewState.deriveReviewStages(null), [], "no matching request must not show invented review stages");
  assert.ok(discovery.includes('id="reviewStages"') && discovery.includes("renderReviewStages(evaluation)") && discovery.includes('src="./review-state.js"'), "request review page must render the read-only review-state projection");
});


test("synthetic audit-history proposal and validator stay explicitly experimental and linked", () => {
  const auditTestCount = auditTests.split("\n").filter(line => line.startsWith("test(")).length;
  assert.ok(auditModel.includes('version: "0.2.0"'), "audit-history module version must be declared");
  assert.ok(auditTestCount >= 25, "audit-history regression coverage must remain present");
  assert.ok(auditProposal.includes("EXPERIMENTAL / NOT RATIFIED / SYNTHETIC GATE INTEGRATION ONLY"), "audit proposal must preserve its non-authoritative status");
  assert.ok(engine.includes("auditHistory.validateAuditHistory"), "review engine must consume the audit-history validator");
  assert.ok(read("prototype/discovery-request.html").includes('src="./audit-history.js"'), "browser review page must load the validator before the review engine");
  assert.ok(auditProposal.includes("does not provide immutable storage"), "audit proposal must state its storage limitation");
  assert.ok(rootReadme.includes("SYNTHETIC-AUDIT-HISTORY-PROPOSAL.md"), "root README must link the audit proposal");
  assert.ok(prototypeReadme.includes("SYNTHETIC-AUDIT-HISTORY-PROPOSAL.md"), "prototype README must link the audit proposal");
  assert.ok(gateStatus.includes("SYNTHETIC-AUDIT-HISTORY-PROPOSAL.md"), "gate status must link the audit proposal");
});
