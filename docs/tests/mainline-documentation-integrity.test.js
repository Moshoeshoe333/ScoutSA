"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const readme = read("README.md");
const gateStatus = read("docs/00-gate-status.md");
const mvp = read("docs/01-mvp-definition.md");
const flows = read("docs/06-user-flows.md");
const constitution = read("docs/00-constitution.md");
const workflow = read(".github/workflows/documentation-integrity.yml");

function assertActionInventoryMatches(source, registeredActions, workflowPath) {
  const actual = [...source.matchAll(/^\s*(?:-\s*)?uses:\s*(.*?)\s*$/gm)].map(match => {
    const value = match[1];
    const parsed = value.match(/^([^@\s]+)@([0-9a-f]{40})\s+#\s*(v[^\s#]+)$/);
    assert.ok(
      parsed,
      `action reference must use a full commit SHA and version comment in ${workflowPath}: ${value}`
    );
    return `${parsed[1]}@${parsed[2]} # ${parsed[3]}`;
  });

  const declared = registeredActions.map(action => {
    assert.match(action.commit, /^[0-9a-f]{40}$/, `action commit must be a full lowercase SHA: ${action.uses}`);
    assert.match(action.uses, /^[^@\s]+$/, `invalid action identifier: ${action.uses}`);
    assert.match(action.version, /^v[^\s#]+$/, `invalid action version comment: ${action.version}`);
    return `${action.uses}@${action.commit} # ${action.version}`;
  });

  assert.equal(new Set(actual).size, actual.length, `workflow contains duplicate action references: ${workflowPath}`);
  assert.equal(new Set(declared).size, declared.length, `CI register contains duplicate action references: ${workflowPath}`);
  assert.deepEqual(
    declared.sort(),
    actual.sort(),
    `CI register must exactly match every action used by ${workflowPath}`
  );
}

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

test("mainline workflow covers all documentation and workflow changes", () => {
  assert.ok(workflow.includes('      - "docs/**"'), "all docs changes must trigger the integrity workflow");
  assert.ok(workflow.includes('      - ".github/workflows/**"'), "all workflow changes must trigger the integrity workflow");
  assert.ok(workflow.includes('      - "README.md"'), "root README changes must trigger the integrity workflow");
  assert.ok(workflow.includes("node --test docs/tests/*.test.js"), "workflow must execute the mainline documentation test suite");
});

test("draft MVP and user-flow narratives cannot be mistaken for ratified implementation authority", () => {
  assert.ok(mvp.includes("DRAFT —"), "MVP definition must remain visibly draft");
  assert.ok(mvp.includes("does not authorize schema, RLS, API, UI, migration, or production implementation"), "MVP definition must preserve its non-authority boundary");
  assert.ok(flows.includes("PROPOSED FLOW NARRATIVE — NOT RATIFIED"), "user flows must be visibly non-ratified");
  assert.ok(flows.includes("does not authorize schema, RLS, API, UI, migration, or production implementation"), "user flows must explicitly deny implementation authority");
  assert.ok(gateStatus.includes("User ↔ Player"), "gate status must preserve unresolved User-Player seam");
  assert.ok(gateStatus.includes("multiple-Guardian conflict handling"), "gate status must preserve unresolved guardian conflict handling");
});

test("share cards remain unauthorized until disclosure and safeguarding decisions are ratified", () => {
  const shareCard = flows.split("## Flow 5")[1]?.split("## Flow 6")[0] || "";
  assert.ok(shareCard.includes("NOT AUTHORIZED"), "share-card section must state that it is not authorized");
  assert.ok(shareCard.includes("public"), "share-card section must explicitly address public disclosure");
  assert.ok(shareCard.includes("revoc"), "share-card section must preserve revocation as an unresolved control");
});

test("readiness is opportunity-specific, derived, explainable, and never a player ranking", () => {
  const readiness = flows.split("## Flow 6")[1]?.split("## Flow 7")[0] || "";
  assert.ok(readiness.includes("derived"), "readiness must be explicitly derived");
  assert.ok(readiness.includes("material inputs"), "readiness must identify material inputs");
  assert.ok(readiness.includes("evaluation time"), "readiness must identify evaluation time");
  assert.ok(readiness.includes("ranking"), "readiness must not become a ranking");
});

test("outcomes preserve attribution, disputes, correction history, and epistemic limits", () => {
  const outcome = flows.split("## Flow 7")[1]?.split("## Design Principle")[0] || "";
  assert.ok(outcome.includes("assertion"), "outcomes must be treated as attributable assertions");
  assert.ok(outcome.includes("disputed"), "outcome disputes must remain explicit");
  assert.ok(outcome.includes("supersession"), "outcome correction/supersession must preserve history");
  assert.ok(outcome.includes("not automatic truth"), "outcome records must not be treated as automatic truth");
});

test("Constitution retains purpose, authority, child-voice, and derived-state boundaries", () => {
  assert.ok(constitution.includes("M2 — Scoped Authority and Conflict Preservation"), "scoped authority/conflict boundary missing");
  assert.ok(constitution.includes("M3 — Purpose-Bound Authorization"), "purpose-bound authorization boundary missing");
  assert.ok(constitution.includes("M5 — Derived-State Dependency"), "derived-state dependency boundary missing");
  assert.ok(constitution.includes("M8 — Child Participation / Voice"), "child participation/voice boundary missing");
});

test("mainline README links the integrity policy and workflow directory has no empty files", () => {
  assert.ok(readme.includes("docs/engineering-integrity.md"), "root README must link the integrity policy");
  const workflowDir = path.join(root, ".github/workflows");
  if (fs.existsSync(workflowDir)) {
    for (const name of fs.readdirSync(workflowDir).filter(name => name.endsWith(".yml") || name.endsWith(".yaml"))) {
      const file = path.join(workflowDir, name);
      assert.ok(fs.statSync(file).size > 0, `workflow file is empty: ${name}`);
    }
  }
});

const ciRegister = JSON.parse(read("docs/ci-scope-register.json"));
const safeguarding = read("docs/safeguarding-measurement-contract.md");

test("CI scope register exactly inventories mainline workflow files", () => {
  const workflowDir = path.join(root, ".github/workflows");
  const actual = fs.readdirSync(workflowDir)
    .filter(name => name.endsWith(".yml") || name.endsWith(".yaml"))
    .map(name => `.github/workflows/${name}`)
    .sort();
  const declared = ciRegister.workflows.map(item => item.path).sort();
  assert.deepEqual(declared, actual, "CI scope register must list every mainline workflow exactly once");
  assert.equal(new Set(declared).size, declared.length, "CI scope register contains duplicate workflow paths");
});

test("action inventory rejects unregistered, duplicate, and malformed workflow actions", () => {
  const checkout = "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1";
  const setupNode = "actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1 # v7.1.0";
  const fixture = `steps:\n  - uses: ${checkout}\n  - uses: ${setupNode}\n`;
  const registered = [
    { uses: "actions/checkout", commit: "3d3c42e5aac5ba805825da76410c181273ba90b1", version: "v7.0.1" },
    { uses: "actions/setup-node", commit: "949feb2413d6458794dcd2491c4babbbce0c15c1", version: "v7.1.0" }
  ];

  assert.doesNotThrow(() => assertActionInventoryMatches(fixture, registered, "fixture.yml"));
  assert.throws(
    () => assertActionInventoryMatches(fixture, registered.slice(0, 1), "fixture.yml"),
    /exactly match every action/
  );
  assert.throws(
    () => assertActionInventoryMatches(`steps:\n  - uses: ${checkout}\n  - uses: ${checkout}\n`, registered.slice(0, 1), "fixture.yml"),
    /duplicate action references/
  );
  assert.throws(
    () => assertActionInventoryMatches("steps:\n  - uses: actions/checkout@v4 # v4\n", [], "fixture.yml"),
    /full commit SHA/
  );
});

test("CI scope register matches executable workflow triggers and job configuration", () => {
  for (const item of ciRegister.workflows) {
    const source = read(item.path);
    assert.ok(source.includes(`name: ${item.name}`), `workflow name drift: ${item.path}`);
    for (const branch of item.triggers.push_branches) assert.ok(source.includes(`      - ${branch}`), `push branch missing: ${branch}`);
    for (const branch of item.triggers.pull_request_branches) assert.ok(source.includes(`      - ${branch}`), `pull request branch missing: ${branch}`);
    for (const filter of item.triggers.path_filters) assert.ok(source.includes(`      - "${filter}"`), `path filter missing: ${filter}`);
    const registeredActions = item.jobs.flatMap(job => job.actions || []);
    assertActionInventoryMatches(source, registeredActions, item.path);
    for (const job of item.jobs) {
      assert.ok(source.includes(`  ${job.id}:`), `job missing: ${job.id}`);
      assert.ok(source.includes(`runs-on: ${job.runner}`), `runner drift: ${job.runner}`);
      assert.ok(source.includes(`timeout-minutes: ${job.timeout_minutes}`), "job timeout drift");
      assert.ok(source.includes(`node-version: "${job.node_version}"`), "Node runtime drift");
      assert.ok(source.includes(`run: ${job.command}`), "workflow command drift");
    }
    assert.ok(item.verifies.length > 0 && item.does_not_prove.length > 0, "scope must state both coverage and limitations");
  }
});

test("safeguarding measurement contract prevents growth metrics from overriding safety", () => {
  for (const phrase of [
    "NOT READY TO COLLECT",
    "Trust and safety are constraints, not growth variables",
    "Guardian opt-out / consent withdrawal",
    "Unauthorized access / disclosure events",
    "Pause the affected workflow",
    "Synthetic results must be labelled synthetic",
    "No real-player measurement is authorized",
    "minimum cell-size"
  ]) assert.ok(safeguarding.includes(phrase), `safeguarding measurement control missing: ${phrase}`);
  assert.ok(!/target: ?[0-9]+%/i.test(safeguarding), "unratified numeric targets must not be invented");
});

test("README links the CI scope register and safeguarding measurement contract", () => {
  assert.ok(readme.includes("docs/ci-scope-register.json"), "README must link CI scope register");
  assert.ok(readme.includes("docs/safeguarding-measurement-contract.md"), "README must link safeguarding measurement contract");
});
