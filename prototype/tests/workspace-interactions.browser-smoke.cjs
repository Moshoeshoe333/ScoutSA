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
    passed.push("Membership status filter, search, count and empty state");

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
        const escape = typeof h === "function" ? h : esc;\n        const escaped = escape(hostile);
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
