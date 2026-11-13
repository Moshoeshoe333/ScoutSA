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

const version = engine.match(/review engine v([0-9]+\\.[0-9]+\\.[0-9]+)/i)?.[1];
const declaredTestCount = (engineTests.match(/^test\\(/gm) || []).length;
const countPattern = new RegExp(`${declaredTestCount}\\\\s*\\\\/\\\\s*${declaredTestCount}`);

test("contract, README and gate status identify the source engine version", () => {
  assert.ok(version, "engine version comment must be present");
  assert.ok(contract.includes("prototype/review-engine.js") && contract.includes(`version \\`${version}\\``), "contract engine version is stale");
  assert.ok(prototypeReadme.includes("review-engine.js"), "prototype README must identify the engine");
  assert.ok(prototypeReadme.includes(version), "prototype README must state current engine version");
  assert.ok(gateStatus.includes(version), "gate status must state current engine version");
});

test("current documentation reports the count derived from test declarations", () => {
  assert.ok(declaredTestCount > 0, "headless test declarations must be discoverable");
  assert.match(prototypeReadme, countPattern, "prototype README test count is stale");
  assert.match(gateStatus, countPattern, "gate status test count is stale");
  assert.match(verification, countPattern, "verification record test count is stale");
});

test("root README links the documentation integrity control", () => {
  assert.ok(rootReadme.includes("docs/engineering-integrity.md"));
});
