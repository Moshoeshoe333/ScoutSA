"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const engine = read("prototype/review-engine.js");
const engineTests = read("prototype/tests/review-engine.test.js");
const contract = read("prototype/REVIEW-ENGINE-CONTRACT.md");
const prototypeReadme = read("prototype/README.md");
const gateStatus = read("docs/00-gate-status.md");
const verification = read("prototype/verification/discovery-request-browser-verification-2026-11-12.md");
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
});
