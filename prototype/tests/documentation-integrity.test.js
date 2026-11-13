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

const versionLine = engine.split("\n").find(line => line.includes("review engine v"));
const version = versionLine?.split("review engine v")[1]?.split(" ")[0];
const declaredTestCount = engineTests.split("\n").filter(line => line.startsWith("test(")).length;
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
  assert.ok(prototypeReadme.includes("AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md"), "prototype README must link proposal");
  assert.ok(gateStatus.includes("AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md"), "gate status must link proposal");
  assert.ok(proposal.includes("Player-reported experience") && proposal.includes("Community-coach attestation") && proposal.includes("Formal organization record"), "all three evidence classes must be documented");
});
