"use strict";

// Browser interaction checks for all eleven synthetic ScoutSA workspaces.
// All fixtures are fictional. This is not an authorization, security,
// accessibility, legal, safeguarding-effectiveness or production test.
const assert = require("node:assert/strict");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8"
};

function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
    const relative = path.normalize(pathname).replace(/^([/\\\\])+/, "");
    const file = path.resolve(root, relative || "index.html");
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "content-type": mime[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(resolve => server.listen(0, "127.0.0.1", () => {
    resolve({ server, origin: "http://127.0.0.1:" + server.address().port });
  }));
}

async function count(locator) {
  return locator.count();
}

async function assertFilterAndSearch(page, config) {
  const allCount = await count(page.locator(config.items));
  assert.ok(allCount > 0, config.name + " must initially render synthetic records");
  const select = page.locator(config.filter);
  const options = await select.locator("option").evaluateAll(nodes =>
    nodes.map(node => ({ value: node.value, label: node.textContent.trim() }))
  );
  const specific = options.find(option => option.value !== "all" && option.value !== "");
  if (specific) {
    await select.selectOption(specific.value);
    const filtered = await count(page.locator(config.items));
    assert.equal(Number((await page.locator(config.count).innerText()).match(/\d+/)?.[0]), filtered,
      config.name + " visible count must agree with filtered records");
    assert.ok(filtered <= allCount, config.name + " filter must not add records");
    await select.selectOption("all");
    assert.equal(await count(page.locator(config.items)), allCount,
      config.name + " all-state filter must restore the complete fixture set");
  }
  await page.locator(config.search).fill("zz-no-synthetic-record-zz");
  assert.equal(await count(page.locator(config.items)), 0, config.name + " unmatched search must return zero records");
  assert.match(await page.locator(config.empty).innerText(), /No synthetic|No .* match/i,
    config.name + " must show an explicit empty state");
  await page.locator(config.search).fill("");
  assert.equal(await count(page.locator(config.items)), allCount,
    config.name + " clearing search must restore records");
}

async function main() {
  const { server, origin } = await startServer();
  let browser;
  const errors = [];
  const passed = [];
  try {
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on("pageerror", error => errors.push("pageerror: " + error.message));
    page.on("console", message => {
      if (message.type() === "error") errors.push("console: " + message.text());
    });

    // 1. Player Passport: player selection, tab state and contextual handoff.
    await page.goto(origin + "/player-passport.html", { waitUntil: "load" });
    const passportOptions = await page.locator("#playerSelect option").count();
    assert.ok(passportOptions >= 2, "Passport must provide at least two fictional player choices");
    const initialPassportName = await page.locator("#playerName").innerText();
    const nextPassportValue = await page.locator("#playerSelect option").nth(1).getAttribute("value");
    await page.locator("#playerSelect").selectOption(nextPassportValue);
    assert.notEqual(await page.locator("#playerName").innerText(), initialPassportName,
      "changing Passport player must update the displayed identity");
    const claimsTab = page.locator("#tab-claims");
    await claimsTab.click();
    assert.equal(await claimsTab.getAttribute("aria-selected"), "true");
    assert.equal(await page.locator("#claims").isVisible(), true);
    assert.equal(await page.locator("#profile").isVisible(), false);
    assert.match(await page.locator("#opportunityBrowseLink").getAttribute("href"), /player=/,
      "Passport opportunity link must carry the selected synthetic player reference");
    passed.push("Passport player selector, tabs and contextual opportunity handoff");

    // 2. Organization Memberships: status filter and text search.
    await page.goto(origin + "/organization-memberships.html", { waitUntil: "load" });
    await assertFilterAndSearch(page, {
      name: "Membership review", filter: "#statusFilter", search: "#search",
      items: "#records article", count: "#visibleCount", empty: "#records .empty"
    });
    const hostileMembershipText = '<img id="ui008-membership-injection" src=x onerror="window.__ui008Membership=true">';
    await page.evaluate(hostile => {
      const membership = window.SCOUTSA_DEMO_MEMBERSHIPS.memberships[0];
      membership.player = hostile;
      membership.status = hostile;
      window.SCOUTSA_DEMO_MEMBERSHIPS.organizations[0].name = hostile;
      membership.organizationId = "ORG-UNKNOWN-DEMO";
    }, hostileMembershipText);
    await page.locator("#search").fill("force-membership-rerender");
    await page.locator("#search").fill("");
    await page.evaluate(() => renderOrgs());
    assert.equal(await page.locator("#orgList strong").first().textContent(), hostileMembershipText,
      "organization-list name must remain literal at its actual rendering sink");
    assert.equal(await page.locator("#ui008-membership-injection").count(), 0,
      "membership text must not create an HTML element");
    assert.equal(await page.locator("#records .record h3").first().evaluate(node => node.textContent), hostileMembershipText,
      "hostile player metadata must remain literal in the player heading");
    assert.equal(await page.locator("#records .record .chip").first().textContent(), hostileMembershipText,
      "hostile membership status must remain literal in the status label");
    assert.equal(await page.locator("#records .chip").first().evaluate(node => node.classList.length), 1,
      "unrecognized membership status must not become an arbitrary CSS class");
    assert.match(await page.locator("#records").innerText(), /Unresolved organization reference/,
      "unknown organization references must render a safe fallback rather than throw");
    assert.equal(await page.evaluate(() => window.__ui008Membership || false), false,
      "membership markup event handlers must not execute");
    passed.push("Membership hostile text, status-class allowlist and unresolved-organization fallback");
    await page.addInitScript(() => {
      if (location.pathname !== "/organization-memberships.html" || location.search !== "?malformed-fixture=1") return;
      let fixture;
      Object.defineProperty(window, "SCOUTSA_DEMO_MEMBERSHIPS", {
        configurable: true, get: () => fixture,
        set: value => { value.organizations = null; value.memberships = [null, [], "bad"]; fixture = value; }
      });
    });
    await page.goto(origin + "/organization-memberships.html?malformed-fixture=1", { waitUntil: "load" });
    assert.equal(await page.locator("#orgList article").count(), 0,
      "null organization collection must render no organization cards");
    assert.equal(await page.locator("#visibleCount").textContent(), "0 records",
      "invalid membership rows must be excluded");



    // 3. Opportunity register: stage filter, search and exact request handoff.
    await page.goto(origin + "/opportunities.html", { waitUntil: "load" });
    await assertFilterAndSearch(page, {
      name: "Opportunity register", filter: "#stageFilter", search: "#search",
      items: "#records article", count: "#count", empty: "#records .empty"
    });
    await page.goto(origin + "/opportunities.html?player=DEMO-PLAYER-001&opportunity=OPP-DEMO-001", { waitUntil: "load" });
    assert.equal(await page.locator("#records article").count(), 1,
      "an exact synthetic Passport/opportunity handoff must narrow the register to one opportunity");
    assert.equal(await page.locator("#records a[href*='discovery-request.html']").count(), 1,
      "only the exact matching request fixture may expose its review handoff");
    passed.push("Opportunity stage filter, search and exact player/opportunity request handoff");
    await page.addInitScript(() => {
      if (location.pathname !== "/opportunities.html" || location.search !== "?malformed-fixture=1") return;
      let fixture;
      Object.defineProperty(window, "SCOUTSA_DEMO_OPPORTUNITIES", {
        configurable: true, get: () => fixture,
        set: value => { value.records = [null, [], "bad"]; fixture = value; }
      });
    });
    await page.goto(origin + "/opportunities.html?malformed-fixture=1", { waitUntil: "load" });
    assert.equal(await page.locator("#count").textContent(), "0 records",
      "non-record opportunity rows must be excluded");
    assert.equal(await page.locator("#records .empty").count(), 1,
      "invalid opportunity rows must produce the safe empty state");



    // 4. Opportunity Evidence: evidence-state filter and source search.
    await page.goto(origin + "/opportunity-evidence.html", { waitUntil: "load" });
    await assertFilterAndSearch(page, {
      name: "Opportunity evidence", filter: "#filter", search: "#search",
      items: "#items article", count: "#count", empty: "#items .empty"
    });
    passed.push("Evidence state filter, search, count and empty state");

    // 5. Claim Decisions: list filters, validation, safe text rendering and session-only reset.
    await page.goto(origin + "/opportunity-decisions.html", { waitUntil: "load" });
    const initialDecisionCount = await page.locator("#items article").count();
    assert.ok(initialDecisionCount > 0, "decision workspace must render its initial synthetic decision fixtures");
    await page.locator("#filter").selectOption("Blocked");
    assert.equal(await page.locator("#items article").count(),
      Number((await page.locator("#count").innerText()).match(/\d+/)?.[0]),
      "decision filter count must match rendered records");
    await page.locator("#filter").selectOption("all");
    await page.locator("#search").fill("zz-no-decision-zz");
    assert.equal(await page.locator("#items article").count(), 0, "unmatched decision search must return an empty list");
    await page.locator("#search").fill("");

    await page.locator("#evidenceId").fill("EVD-SESSION-TEST");
    const hostileText = "<img src=x onerror=alert(1)>";
    await page.locator("#claimScope").fill(hostileText);
    await page.locator("#status").selectOption("Needs Investigation");
    await page.locator("#reviewer").fill("REVIEWER-DEMO");
    await page.locator("#reason").fill("Too short");
    assert.equal(await page.locator("#decisionForm").evaluate(form => form.checkValidity()), false,
      "short rationale must fail the declared minimum-length validation");
    assert.equal(await page.locator("#items article").count(), initialDecisionCount,
      "invalid form input must not add a session decision");
    await page.locator("#reason").fill("Only the fictional issuer label was inspected; independent authority remains unresolved.");
    assert.equal(await page.locator("#decisionForm").evaluate(form => form.checkValidity()), true,
      "complete decision form must satisfy declared browser validation");
    await page.locator("#decisionForm button[type=submit]").click();
    assert.equal(await page.locator("#items article").count(), initialDecisionCount + 1,
      "valid decision must appear in the current page session");
    assert.match(await page.locator("#items").innerText(), /EVD-SESSION-TEST/);
    assert.match(await page.locator("#items").innerText(), /This page session only|REVIEWER-DEMO/);
    assert.ok((await page.locator("#items").innerText()).includes(hostileText),
      "user-entered markup must remain visible as literal text");
    assert.equal(await page.locator("#items img").count(), 0,
      "user-entered markup must not create executable HTML elements");
    await page.reload({ waitUntil: "load" });
    assert.equal(await page.locator("#items article").count(), initialDecisionCount,
      "session-only decision must disappear after reload; no persistence may be implied");
    assert.doesNotMatch(await page.locator("#items").innerText(), /EVD-SESSION-TEST/,
      "session-only decision must not survive page reload");
    passed.push("Decision filtering, form validation, session-only entry and reload reset");

    // 6. Safeguarded Invitations: workflow-state filter and scenario search.
    await page.goto(origin + "/safeguarded-invitations.html", { waitUntil: "load" });
    await assertFilterAndSearch(page, {
      name: "Safeguarded invitations", filter: "#filter", search: "#search",
      items: "#cases article", count: "#count", empty: "#cases .empty"
    });
    assert.match(await page.locator("#cases").innerText(), /HOLD — NOT INVITABLE/,
      "synthetic invitation cases must retain their hold boundary");
    passed.push("Invitation workflow filter, search and non-invitable hold presentation");
    await page.addInitScript(() => {
      if (location.pathname !== "/safeguarded-invitations.html" || location.search !== "?malformed-fixture=1") return;
      let workflow;
      Object.defineProperty(window, "SCOUTSA_INVITATION_WORKFLOW", {
        configurable: true, get: () => workflow,
        set: value => {
          value.cases = [null, [], { id: "MALFORMED-INVITE", opportunity: "Malformed fixture", organization: "Synthetic", participantBand: "Unknown", workflowState: "HOLD", gates: null, hardStops: null }];
          workflow = value;
        }
      });
    });
    await page.goto(origin + "/safeguarded-invitations.html?malformed-fixture=1", { waitUntil: "load" });
    assert.equal(await page.locator("#count").textContent(), "1 scenarios",
      "malformed invitation rows must be excluded while valid object records remain");
    assert.equal(await page.locator("#ready").textContent(), "0",
      "missing gate and hard-stop evidence must never make an invitation ready");
    assert.equal(await page.locator("#cases .gate").count(), 0,
      "missing gate collection must render no satisfied gates");
    assert.match(await page.locator("#cases").innerText(), /HOLD — NOT INVITABLE/,
      "malformed gate data must preserve the non-invitable hold");



    // 7. Player–Opportunity Matching: disposition filter and evidence-gap search.
    await page.goto(origin + "/player-opportunity-matching.html", { waitUntil: "load" });
    await assertFilterAndSearch(page, {
      name: "Player–opportunity matching", filter: "#filter", search: "#search",
      items: "#pairs article", count: "#count", empty: "#pairs .empty"
    });
    assert.match(await page.locator("#pairs").innerText(), /HOLD/,
      "matching review must not present a placement or guaranteed match");
    passed.push("Matching disposition filter, search and hold presentation");

    // 8. Development Pathways: both selector and player-card selection.
    await page.goto(origin + "/player-development-pathways.html", { waitUntil: "load" });
    const pathwayOptions = await page.locator("#playerSelect option").count();
    assert.ok(pathwayOptions >= 2, "pathway workspace must provide multiple fictional players");
    await page.locator("#playerSelect").selectOption({ index: 1 });
    const selectedPathwayName = await page.locator("#playerName").innerText();
    assert.ok(selectedPathwayName.length > 0);
    const selectedCard = page.locator("button.player-btn[aria-pressed=true]");
    assert.equal(await selectedCard.count(), 1, "selected player card must expose a single pressed state");
    await page.locator("button.player-btn").first().click();
    assert.equal(await page.locator("button.player-btn[aria-pressed=true]").count(), 1);
    assert.match(await page.locator("#stages").innerText(), /Responsible next step:/);
    passed.push("Development pathway player selector, card selection and stage rendering");

    // 9. Guardian & Consent: scenario selection never changes disclosure prohibition.
    await page.goto(origin + "/guardian-consent.html", { waitUntil: "load" });
    const guardianCases = page.locator("#caseGrid button[data-case]");
    assert.ok(await guardianCases.count() >= 2);
    await guardianCases.nth(1).click();
    const selectedGuardianTitle = await page.locator("#caseTitle").innerText();
    assert.ok(selectedGuardianTitle.length > 0);
    assert.match(await page.locator("#caseGrid").innerText(), /DISCLOSURE BLOCKED/);
    assert.match(await page.locator("#purposeList").innerText(), /Not authorized in this scenario/i);
    assert.match(await page.locator("#limitList").innerText(), /fictional|not implemented|not production/i);
    passed.push("Guardian scenario selection and invariant disclosure/purpose restrictions");

    // 10. Coach & Academy: intentionally static, organization-scoped, no player roster.
    await page.goto(origin + "/coach-academy-workspace.html", { waitUntil: "load" });
    assert.ok((await page.locator("#orgName").innerText()).trim().length > 0);
    assert.ok((await page.locator("#membershipList .item").count()) > 0);
    assert.ok((await page.locator("#opportunityList .item").count()) > 0);
    assert.equal(await page.locator("input, select, textarea, form, button").count(), 0,
      "coach/academy overview is intentionally read-only and must not imply editable controls");
    assert.match(await page.locator("body").innerText(), /no player roster|does not expose a player roster/i);
    passed.push("Coach/academy organization-scoped static view and no-roster boundary");

    // 11. Discovery & Request Review: selectable queue and six-stage read-only journey.
    await page.goto(origin + "/discovery-request.html", { waitUntil: "load" });
    const requests = page.locator(".request");
    assert.equal(await requests.count(), 3, "ordinary request queue must contain three fictional records");
    await requests.nth(1).click();
    assert.match(await page.locator("#requestTitle").innerText(), /^REQ-DEMO-/);
    assert.equal(await page.locator("#reviewStages .stage").count(), 6);
    assert.match(await page.locator("#requestState").innerText(), /HOLD/);
    assert.match(await page.locator("#reviewStages").innerText(), /NO DECISION RECORDED/);
    assert.match(await page.locator("#reviewStages").innerText(), /PROHIBITED — NOT IMPLEMENTED/);
    assert.equal(await page.locator("#requestList input, #requestList select, #requestList textarea, #requestList form").count(), 0,
      "request queue must remain a local read-only selector");

    await page.goto(origin + "/discovery-request.html?opportunity=OPP-DEMO-001", { waitUntil: "load" });
    assert.match(await page.locator("#requestTitle").innerText(), /No matching synthetic request/);
    assert.equal(await page.locator(".request").count(), 0,
      "an opportunity-only handoff must not expose the ordinary request queue");
    assert.equal(await page.locator("#reviewStages .stage").count(), 0,
      "an incomplete handoff must not render invented review stages");

    await page.goto(origin + "/discovery-request.html?player=DEMO-PLAYER-001&opportunity=OPP-DEMO-003", { waitUntil: "load" });
    assert.match(await page.locator("#requestTitle").innerText(), /No matching synthetic request/);
    assert.equal(await page.locator(".request").count(), 0,
      "a valid player with a mismatched opportunity must return no request");

    await page.goto(origin + "/discovery-request.html?player=UNKNOWN-PLAYER", { waitUntil: "load" });
    assert.match(await page.locator("#requestTitle").innerText(), /No matching synthetic request/);
    assert.equal(await page.locator(".request").count(), 0,
      "an unknown player reference must return no request");
    // Hostile URL identifiers must remain inert data and must never become
    // executable schemes or external navigation targets.
    const hostileId = 'javascript:alert(1)" onmouseover="window.__xss=1';
    await page.goto(origin + "/discovery-request.html?player=" + encodeURIComponent(hostileId) +
      "&opportunity=" + encodeURIComponent("data:text/html,<script>alert(1)</script>"), { waitUntil: "load" });
    assert.match(await page.locator("#requestTitle").innerText(), /No matching synthetic request/,
      "hostile handoff identifiers must fail closed");
    assert.equal(await page.locator(".request").count(), 0,
      "hostile handoff identifiers must not expose a request queue");
    assert.equal(await page.locator("#links a[href^='javascript:'], #links a[href^='data:']").count(), 0,
      "discovery navigation must not create executable URL schemes");
    assert.equal(await page.evaluate(() => window.__xss || 0), 0,
      "hostile URL identifiers must not execute script");

    await page.goto(origin + "/opportunities.html?player=" + encodeURIComponent(hostileId) +
      "&opportunity=" + encodeURIComponent("javascript:alert(1)"), { waitUntil: "load" });
    assert.match(await page.locator("#passportHandoff").innerText(), /Unrecognized synthetic Passport reference/,
      "unknown hostile player identifier must remain an unrecognized handoff");
    assert.equal(await page.locator("#records article").count(), 0,
      "hostile opportunity identifier must not match or reveal an opportunity");
    assert.equal(await page.locator("#records a[href^='javascript:'], #records a[href^='data:']").count(), 0,
      "opportunity navigation must not create executable URL schemes");
    assert.equal(await page.evaluate(() => window.__xss || 0), 0,
      "opportunity query parameters must not execute script");
    passed.push("Hostile URL schemes and identifiers remain inert across discovery and opportunity handoffs");
    passed.push("Discovery request selection, six-stage hold, no-decision boundary and invalid-handoff failures");


    // 12. Shared rendering-escape contract: every specialist renderer defines h().
    // Exercise the exact helper used by fixture interpolation, including hostile
    // markup and malformed nullish values. This is a bounded rendering test,
    // not a complete security audit.
    const rendererPages = [
      "player-passport.html", "organization-memberships.html", "opportunities.html",
      "opportunity-evidence.html", "opportunity-decisions.html",
      "safeguarded-invitations.html", "player-opportunity-matching.html",
      "player-development-pathways.html", "coach-academy-workspace.html",
      "guardian-consent.html", "discovery-request.html"
    ];
    for (const route of rendererPages) {
      await page.goto(origin + "/" + route, { waitUntil: "load" });
      const result = await page.evaluate(() => {
        const hostile = '<img src=x onerror="window.__xss=1">';
        const escape = typeof h === "function" ? h : esc;
        const escaped = escape(hostile);
        const probe = document.createElement("div");
        probe.innerHTML = escaped;
        return {
          escaped,
          imageCount: probe.querySelectorAll("img").length,
          literalText: probe.textContent,
          nullValue: escape(null),
          undefinedValue: escape(undefined)
        };
      });
      assert.equal(result.imageCount, 0, route + " escape helper must not create an image element");
      assert.equal(result.literalText, '<img src=x onerror="window.__xss=1">',
        route + " hostile markup must remain literal text");
      assert.equal(result.nullValue, "", route + " nullish values must render as empty text");
      assert.equal(result.undefinedValue, "", route + " undefined values must render as empty text");
      assert.match(result.escaped, /&lt;img/);
    }
    // Exercise dynamic fixture values at real renderer sinks, not only h().
    const hostileFixtureText = '<img id="ui008-fixture-injection" src=x onerror="window.__ui008Fixture=true">';
    const assertFixtureTextSafe = async (selector, expected, label, mode = "exact") => {
      assert.equal(await page.locator("#ui008-fixture-injection").count(), 0, label + ": no injected element");
      const renderedText = await page.locator(selector).first().evaluate(node => node.textContent);
      assert.ok(mode === "includes" ? renderedText.includes(expected) : renderedText === expected, label + ": literal text preserved");
      assert.equal(await page.evaluate(() => window.__ui008Fixture || false), false, label + ": no injected handler execution");
    };

    await page.goto(origin + "/player-passport.html", { waitUntil: "load" });
    await page.evaluate(hostile => {
      const p = window.SCOUTSA_DEMO_PLAYERS.p1;
      p.name = hostile; p.claims[0].claim = hostile; p.memberships[0].org = hostile;
    }, hostileFixtureText);
    await page.locator("#playerSelect").selectOption("p2");
    await page.locator("#playerSelect").selectOption("p1");
    await assertFixtureTextSafe("#playerName", hostileFixtureText, "Passport name");
    await assertFixtureTextSafe("#claimsList strong", hostileFixtureText, "Passport claim");
    await assertFixtureTextSafe("#membershipList strong", hostileFixtureText, "Passport membership");
    await assertFixtureTextSafe("#timelineList p:last-of-type", hostileFixtureText, "Passport timeline detail", "includes");

    await page.goto(origin + "/opportunity-evidence.html", { waitUntil: "load" });
    await page.evaluate(hostile => {
      const x = window.SCOUTSA_DEMO_EVIDENCE.entries[0];
      x.evidenceLabel = hostile; x.submittedBy = hostile; x.limitation = hostile;
      x.opportunity = hostile; x.evidenceType = hostile; x.state = hostile;
      x.source = hostile; x.sourceAuthority = hostile; x.checkedAt = hostile;
      x.corroboration = hostile; x.nextReview = hostile; x.nextAction = hostile;
    }, hostileFixtureText);
    await page.locator("#search").fill("rerender-evidence");
    await page.locator("#search").fill("");
    await assertFixtureTextSafe("#items h3", hostileFixtureText, "Evidence label");
    await assertFixtureTextSafe("#items .sub", hostileFixtureText, "Evidence opportunity/type context", "includes");
    await assertFixtureTextSafe("#items .badge", hostileFixtureText, "Evidence state");
    await assertFixtureTextSafe("#items .datum strong", hostileFixtureText, "Evidence submitter");
    await assertFixtureTextSafe("#items .datum:nth-child(2) strong", hostileFixtureText, "Evidence source");
    await assertFixtureTextSafe("#items .datum:nth-child(3) strong", hostileFixtureText, "Evidence source authority");
    await assertFixtureTextSafe("#items .datum:nth-child(4) strong", hostileFixtureText, "Evidence checked date");
    await assertFixtureTextSafe("#items .datum:nth-child(5) strong", hostileFixtureText, "Evidence corroboration");
    await assertFixtureTextSafe("#items .datum:nth-child(6) strong", hostileFixtureText, "Evidence next review");
    await assertFixtureTextSafe("#items article p:nth-of-type(1)", hostileFixtureText, "Evidence limitation", "includes");
    await assertFixtureTextSafe("#items article p:nth-of-type(2)", hostileFixtureText, "Evidence next action", "includes");

    await page.goto(origin + "/safeguarded-invitations.html", { waitUntil: "load" });
    await page.evaluate(hostile => {
      const c = cases[0];
      c.opportunity = hostile; c.gates[0].note = hostile; c.hardStops[0] = hostile;
    }, hostileFixtureText);
    await page.locator("#search").fill("rerender-invitation");
    await page.locator("#search").fill("");
    await assertFixtureTextSafe("#cases h3", hostileFixtureText, "Invitation opportunity");
    await assertFixtureTextSafe("#cases .gate p", hostileFixtureText, "Invitation gate note");
    await assertFixtureTextSafe("#cases .stops li", hostileFixtureText, "Invitation hard stop");

    await page.goto(origin + "/player-opportunity-matching.html", { waitUntil: "load" });
    await page.evaluate(hostile => {
      const x = window.SCOUTSA_MATCHING_DEMO.pairs[0];
      x.player = hostile; x.findings[0][1] = hostile; x.reason = hostile;
    }, hostileFixtureText);
    await page.locator("#search").fill("rerender-match");
    await page.locator("#search").fill("");
    await assertFixtureTextSafe("#pairs h3", hostileFixtureText, "Matching player", "includes");
    await assertFixtureTextSafe("#pairs .finding span", hostileFixtureText, "Matching finding");
    await assertFixtureTextSafe("#pairs .reason", hostileFixtureText, "Matching reason", "includes");

    await page.goto(origin + "/player-development-pathways.html", { waitUntil: "load" });
    await page.evaluate(hostile => {
      window.SCOUTSA_PATHWAYS_DEMO.players[0].name = hostile;
      window.SCOUTSA_PATHWAYS_DEMO.stages[0].name = hostile;
    }, hostileFixtureText);
    await page.locator("#playerSelect").selectOption({ index: 1 });
    await page.locator("#playerSelect").selectOption({ index: 0 });
    await assertFixtureTextSafe("#playerName", hostileFixtureText, "Pathway player name", "includes");
    await assertFixtureTextSafe("#stages h3", hostileFixtureText, "Pathway stage name");
    await assertFixtureTextSafe("#playerList button strong", hostileFixtureText, "Pathway player-list name");
    await page.addInitScript(hostile => {
      let pathways;
      Object.defineProperty(window, "SCOUTSA_PATHWAYS_DEMO", {
        configurable: true,
        get: () => pathways,
        set: value => {
          value.players[0].name = hostile;
          pathways = value;
        }
      });
    }, hostileFixtureText);
    await page.goto(origin + "/player-development-pathways.html", { waitUntil: "load" });
    await assertFixtureTextSafe("#playerSelect option", hostileFixtureText, "Pathway select option text", "includes");


    await page.goto(origin + "/guardian-consent.html", { waitUntil: "load" });
    await page.evaluate(hostile => {
      const c = window.SCOUTSA_GUARDIAN_CONSENT_DEMO.cases[0];
      c.playerRef = hostile; c.next = hostile; c.purposes[0].name = hostile;
    }, hostileFixtureText);
    await page.locator("#caseGrid button[data-case]").nth(1).click();
    await page.locator("#caseGrid button[data-case]").nth(0).click();
    await assertFixtureTextSafe("#caseGrid h2", "GCS-DEMO-001", "Guardian case reference");
    await assertFixtureTextSafe("#caseGrid .case p", hostileFixtureText, "Guardian case-card player reference", "includes");
    await assertFixtureTextSafe("#caseDetails .row:last-child span", hostileFixtureText, "Guardian case detail");
    await assertFixtureTextSafe("#purposeList b", hostileFixtureText, "Guardian purpose");

    // Fixtures assigned by their data scripts are altered before workspace scripts read them.
    await page.addInitScript(hostile => {
      let academy;
      Object.defineProperty(window, "SCOUTSA_ACADEMY_WORKSPACE_DEMO", {
        configurable: true,
        get: () => academy,
        set: value => {
          value.organization.name = hostile;
          value.memberships[0].note = hostile;
          value.opportunities[0].name = hostile;
          value.evidenceActions[0].action = hostile;
          value.boundaries[0] = hostile;
          academy = value;
        }
      });
    }, hostileFixtureText);
    await page.goto(origin + "/coach-academy-workspace.html", { waitUntil: "load" });
    await assertFixtureTextSafe("#orgName", hostileFixtureText, "Academy organization name");
    await assertFixtureTextSafe("#membershipList small", hostileFixtureText, "Academy membership note");
    await assertFixtureTextSafe("#opportunityList strong", hostileFixtureText, "Academy opportunity name");
    await assertFixtureTextSafe("#actionList .action > span", hostileFixtureText, "Academy evidence action");
    await assertFixtureTextSafe("#boundaries .principle span", hostileFixtureText, "Academy boundary");

    await page.addInitScript(hostile => {
      let decisions;
      Object.defineProperty(window, "SCOUTSA_DEMO_DECISIONS", {
        configurable: true,
        get: () => decisions,
        set: value => {
          value.decisions[0].claimScope = hostile;
          value.decisions[0].opportunity = hostile;
          value.decisions[0].reviewer = hostile;
          value.decisions[0].reason = hostile;
          decisions = value;
        }
      });
    }, hostileFixtureText);
    await page.goto(origin + "/opportunity-decisions.html", { waitUntil: "load" });
    await assertFixtureTextSafe("#items h3", hostileFixtureText, "Decision claim scope");
    await assertFixtureTextSafe("#items .sub", hostileFixtureText, "Decision opportunity context", "includes");
    await assertFixtureTextSafe("#items .datum strong", hostileFixtureText, "Decision reviewer");
    await assertFixtureTextSafe("#items p", hostileFixtureText, "Decision rationale", "includes");

    // Cover additional sinks within workspaces already under test.
    await page.goto(origin + "/player-passport.html", { waitUntil: "load" });
    await page.evaluate(hostile => {
      window.SCOUTSA_DEMO_PLAYERS.p1.profile[0][1] = hostile;
    }, hostileFixtureText);
    await page.locator("#playerSelect").selectOption("p2");
    await page.locator("#playerSelect").selectOption("p1");
    await assertFixtureTextSafe("#profileFields strong", hostileFixtureText, "Passport profile field");

    await page.addInitScript(hostile => {
      let matching;
      Object.defineProperty(window, "SCOUTSA_MATCHING_DEMO", {
        configurable: true,
        get: () => matching,
        set: value => {
          value.dimensions[0].meaning = hostile;
          matching = value;
        }
      });
    }, hostileFixtureText);
    await page.goto(origin + "/player-opportunity-matching.html", { waitUntil: "load" });
    await assertFixtureTextSafe("#dimensions .rule span", hostileFixtureText, "Matching dimension meaning");

    await page.addInitScript(hostile => {
      let consent;
      Object.defineProperty(window, "SCOUTSA_GUARDIAN_CONSENT_DEMO", {
        configurable: true,
        get: () => consent,
        set: value => {
          value.rules[0] = hostile;
          value.limits[0] = hostile;
          consent = value;
        }
      });
    }, hostileFixtureText);
    await page.goto(origin + "/guardian-consent.html", { waitUntil: "load" });
    await assertFixtureTextSafe("#ruleList .rule", hostileFixtureText, "Guardian rule");
    await assertFixtureTextSafe("#limitList .rule", hostileFixtureText, "Guardian limit");

    await page.addInitScript(hostile => {
      let opportunities;
      Object.defineProperty(window, "SCOUTSA_DEMO_OPPORTUNITIES", {
        configurable: true,
        get: () => opportunities,
        set: value => {
          value.records[0].title = hostile;
          value.records[0].orgIdentity = hostile;
          value.records[0].source = hostile;
          value.records[0].detail = hostile;
          opportunities = value;
        }
      });
    }, hostileFixtureText);
    await page.goto(origin + "/opportunities.html", { waitUntil: "load" });
    await assertFixtureTextSafe("#records h3", hostileFixtureText, "Opportunity title");
    await assertFixtureTextSafe("#records .datum strong", hostileFixtureText, "Opportunity organization identity");
    await assertFixtureTextSafe("#records article > p", hostileFixtureText, "Opportunity source", "includes");
    await assertFixtureTextSafe("#records article > p:last-of-type", hostileFixtureText, "Opportunity detail");

    await page.addInitScript(hostile => {
      let requests;
      Object.defineProperty(window, "SCOUTSA_DISCOVERY_REQUESTS", {
        configurable: true,
        get: () => requests,
        set: value => {
          value.records[0].playerRef = hostile;
          value.records[0].purpose = hostile;
          value.rules[0] = hostile;
          requests = value;
        }
      });
    }, hostileFixtureText);
    await page.goto(origin + "/discovery-request.html", { waitUntil: "load" });
    await page.locator("#requestList .request").first().click();
    await assertFixtureTextSafe("#requestList .request small", hostileFixtureText, "Discovery request-list purpose");
    await assertFixtureTextSafe("#summary .field strong", hostileFixtureText, "Discovery summary player reference");
    await assertFixtureTextSafe("#summary .field:nth-child(4) strong", hostileFixtureText, "Discovery summary purpose");
    await assertFixtureTextSafe("#rules li", hostileFixtureText, "Discovery workflow rule");
    await page.evaluate(hostile => {
      const original = window.SCOUTSA_REVIEW_ENGINE;
      window.SCOUTSA_REVIEW_ENGINE = {
        ...original,
        evaluateRequest(request, context) {
          const result = original.evaluateRequest(request, context);
          return {
            ...result,
            gates: result.gates.map((gate, index) => index === 0
              ? { ...gate, label: hostile, detail: hostile }
              : gate)
          };
        }
      };
    }, hostileFixtureText);
    await page.locator("#auditScenario").selectOption("valid-history");
    await assertFixtureTextSafe("#gates .gate strong", hostileFixtureText, "Discovery gate label");
    await assertFixtureTextSafe("#gates .gate p", hostileFixtureText, "Discovery gate detail");

    // Malformed collection shape must degrade to the declared empty state.
    await page.addInitScript(() => {
      if (location.pathname !== "/opportunity-evidence.html" || location.search !== "?malformed-null=1") return;
      let evidence;
      Object.defineProperty(window, "SCOUTSA_DEMO_EVIDENCE", {
        configurable: true,
        get: () => evidence,
        set: value => {
          value.entries = null;
          evidence = value;
        }
      });
    });
    await page.goto(origin + "/opportunity-evidence.html?malformed-null=1", { waitUntil: "load" });
    assert.equal(await page.locator("#count").textContent(), "0 entries",
      "null evidence collection must produce a zero-entry count");
    assert.equal(await page.locator("#items .empty").count(), 1,
      "null evidence collection must render the safe empty state");

    await page.addInitScript(() => {
      if (location.pathname !== "/opportunity-evidence.html" || location.search !== "?malformed-rows=1") return;
      let evidence;
      Object.defineProperty(window, "SCOUTSA_DEMO_EVIDENCE", {
        configurable: true,
        get: () => evidence,
        set: value => {
          value.entries = [null, [], "not-a-record"];
          evidence = value;
        }
      });
    });
    await page.goto(origin + "/opportunity-evidence.html?malformed-rows=1", { waitUntil: "load" });
    assert.equal(await page.locator("#count").textContent(), "0 entries",
      "null and non-record evidence rows must be excluded");
    assert.equal(await page.locator("#items .empty").count(), 1,
      "all-invalid evidence rows must render the safe empty state");

    // Malformed scalar values at an actual renderer: null, undefined, object, array and unknown enum.
    await page.goto(origin + "/opportunity-evidence.html", { waitUntil: "load" });
    await page.evaluate(() => {
      const x = window.SCOUTSA_DEMO_EVIDENCE.entries[0];
      x.opportunity = "rerender-malformed-evidence";
      x.evidenceLabel = null;
      x.source = { unexpected: "<img src=x onerror=alert(1)>" };
      x.sourceAuthority = undefined;
      x.state = "UNRECOGNIZED-STATE";
      x.nextAction = ["unexpected", "<script>not markup</script>"];
      x.limitation = null;
    });
    await page.locator("#search").fill("rerender-malformed-evidence");
    await page.locator("#search").fill("");
    assert.equal(await page.locator("#items h3").first().textContent(), "",
      "null evidence label must render as empty text");
    assert.equal(await page.locator("#items .datum:nth-child(2) strong").first().textContent(), "[object Object]",
      "unexpected object source must be coerced to inert text");
    assert.equal(await page.locator("#items .datum:nth-child(3) strong").first().textContent(), "",
      "undefined source authority must render as empty text");
    assert.equal(await page.locator("#items .badge").first().textContent(), "UNRECOGNIZED-STATE",
      "unknown enum must remain inert text rather than becoming a class");
    assert.equal(await page.locator("#items article p:nth-of-type(1)").first().textContent(), "Limitation: ",
      "null limitation must render without throwing");
    assert.equal(await page.locator("#ui008-fixture-injection").count(), 0,
      "malformed scalar values must not create executable elements");

    // Malformed nested consent fixtures must render explicit blocked/empty states.
    await page.goto(origin + "/guardian-consent.html", { waitUntil: "load" });
    await page.evaluate(() => {
      window.SCOUTSA_GUARDIAN_CONSENT_DEMO.cases = [
        { id: "CASE-MALFORMED", playerRef: null, ageState: null, purposes: null }
      ];
      window.SCOUTSA_GUARDIAN_CONSENT_DEMO.rules = null;
      window.SCOUTSA_GUARDIAN_CONSENT_DEMO.limits = {};
      render();
    });
    assert.equal(await page.locator("#caseGrid .case").count(), 1,
      "a partial consent case must remain inspectable");
    assert.match(await page.locator("#purposeList").innerText(), /No purpose-specific scenario records/,
      "missing purpose records must not imply permission");
    assert.match(await page.locator("#ruleList").innerText(), /Disclosure remains blocked/,
      "missing rules must retain the disclosure stop line");
    assert.match(await page.locator("#caseDetails").innerText(), /Age state/,
      "partial consent case must show its review dimensions");
    await page.evaluate(() => {
      window.SCOUTSA_GUARDIAN_CONSENT_DEMO.cases = [];
      render();
    });
    assert.match(await page.locator("#caseTitle").innerText(), /No fictional consent scenarios/,
      "empty consent collection must render an explicit empty state");
    assert.match(await page.locator("#caseDetails").innerText(), /remain unestablished and blocked/,
      "empty consent collection must not imply consent or disclosure");

    // Incomplete pathway structures must not invent stages or readiness.
    await page.goto(origin + "/player-development-pathways.html", { waitUntil: "load" });
    await page.evaluate(() => {
      window.SCOUTSA_PATHWAYS_DEMO.players = [
        { id: "PLAYER-MALFORMED", name: null, position: null, stages: null }
      ];
      window.SCOUTSA_PATHWAYS_DEMO.stages = [
        { id: "STAGE-1", name: null, description: null }
      ];
      render("PLAYER-MALFORMED");
    });
    assert.match(await page.locator("#stages").innerText(), /Not supplied/,
      "missing pathway evidence must be explicit");
    assert.match(await page.locator("#stages").innerText(), /Human review required/,
      "missing next step must not be inferred");
    assert.match(await page.locator("#stages").innerText(), /Unassessed/,
      "missing pathway state must remain unassessed");
    await page.evaluate(() => {
      window.SCOUTSA_PATHWAYS_DEMO.players = [];
      render();
    });
    assert.match(await page.locator("#playerName").innerText(), /No pathway record available/,
      "empty player collection must render a safe empty state");
    assert.match(await page.locator("#stages").innerText(), /No stage evidence is available/,
      "empty player collection must not infer a pathway or outcome");
    passed.push("Malformed guardian consent and development pathway fixtures fail closed with explicit empty states");

    passed.push("Additional hostile fixture checks cover Passport profile, matching dimensions, guardian rules/limits and opportunity register sinks");
    passed.push("Hostile fixture strings remain literal at Passport, evidence, invitation, matching, pathway, consent, academy and decision render sinks");

    passed.push("HTML-escape helper hostile-string and nullish-value checks across all 11 workspaces");

    assert.deepEqual(errors, [], "browser must not emit uncaught page or console errors");
    process.stdout.write(passed.map((name, index) => "PASS " + (index + 1) + " — " + name).join("\n") +
      "\nWORKSPACE INTERACTION BROWSER SMOKE RESULT: " + passed.length + "/" + passed.length + " groups passed\n");
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => {
  process.stderr.write((error && error.stack) || String(error));
  process.exitCode = 1;
});
