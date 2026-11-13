"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const readme = read("README.md");
const gateStatus = read("docs/00-gate-status.md");

test("root README and gate status carry the current status date", () => {
  assert.ok(readme.includes("Current Repository Status — 13 November 2026"), "root README status date is stale");
  assert.ok(gateStatus.includes("current note 2026-11-13"), "gate status current note is stale");
});

test("root README and gate status agree on the controlled next move and implementation holds", () => {
  assert.ok(readme.includes("external validation"), "root README must state external validation as next move");
  assert.ok(gateStatus.includes("controlled next move is external validation"), "gate status must state external validation as next move");
  assert.ok(readme.includes("Migration / Database / Production Implementation:** HOLD"), "root README must retain implementation holds");
  assert.ok(gateStatus.includes("Migration/database execution, RLS, API, production implementation and pilot remain on hold or unauthorized"), "gate status must retain implementation holds");
});

test("mainline README links the integrity policy and workflow directory has no empty files", () => {
  assert.ok(readme.includes("docs/engineering-integrity.md"), "root README must link the integrity policy");
  const workflowDir = path.join(root, ".github/workflows");
  if (fs.existsSync(workflowDir)) {
    for (const name of fs.readdirSync(workflowDir).filter(name => /\\.ya?ml$/i.test(name))) {
      const file = path.join(workflowDir, name);
      assert.ok(fs.statSync(file).size > 0, `workflow file is empty: ${name}`);
    }
  }
});
