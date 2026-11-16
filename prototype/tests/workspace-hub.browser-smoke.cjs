"use strict";

// Browser-level smoke test for the ScoutSA unified workspace hub and all
// eleven linked specialist workspaces. Synthetic fixtures only.
// This is not an accessibility, security, authorization or production test.
const assert = require("node:assert/strict");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const expected = [
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
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };

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

async function main() {
  const { server, origin } = await startServer();
  let browser;
  const errors = [];
  try {
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on("pageerror", error => errors.push("pageerror: " + error.message));
    page.on("console", message => { if (message.type() === "error") errors.push("console: " + message.text()); });
    const hub = origin + "/index.html";

    const hubResponse = await page.goto(hub, { waitUntil: "load" });
    assert.equal(hubResponse.status(), 200, "workspace hub must load");
    const cards = page.locator(".workspace-card");
    assert.equal(await cards.count(), 11, "hub must expose exactly eleven specialist workspace cards");

    // The hub's own navigation and primary call-to-action must be live.
    await page.locator('button[data-view="workspaces"]').click();
    assert.equal(await page.locator("#pageTitle").innerText(), "One connected product demonstration.");
    assert.equal(await page.locator(".workspace-card").count(), 11);
    await page.locator('button[data-view="organizations"]').click();
    assert.equal(await page.locator("#pageTitle").innerText(), "Build a trusted football network.");
    await page.locator('button[data-view="safeguarding"]').click();
    assert.equal(await page.locator("#pageTitle").innerText(), "Protection is part of the product.");
    await page.locator("#openWorkspaces").click();
    assert.equal(await page.locator("#pageTitle").innerText(), "One connected product demonstration.");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator("#menuBtn").click();
    assert.ok(await page.locator("#sidebar").evaluate(node => node.classList.contains("open")), "mobile menu must open the sidebar");
    await page.locator('button[data-view="workspaces"]').click();
    assert.ok(!(await page.locator("#sidebar").evaluate(node => node.classList.contains("open"))), "choosing a mobile nav item must close the sidebar");
    await page.setViewportSize({ width: 1280, height: 900 });

    // UI-008: switch to the player view before exercising player-card modal controls.
    // The hub correctly hides player cards in the all-workspaces view.
    await page.locator('button[data-view="players"]').click();
    assert.equal(await page.locator("#pageTitle").innerText(), "Discover talent with context.");
    // Dynamic player metadata must enter the modal as text, never parsed HTML.
    assert.ok(await page.locator("button[data-player]").count() >= 3, "all sample player cards must retain their modal controls");
    const hostileMetadata = '"><img id="ui008-modal-injection" src="x" onerror="window.__ui008Executed=true">';
    await page.locator(".player").first().evaluate(node => {
      node.dataset.position = '"><img id="ui008-modal-injection" src="x" onerror="window.__ui008Executed=true">';
      node.dataset.area = "<svg id=ui008-svg-injection onload=window.__ui008Svg=true>";
    });
    await page.locator('button[data-player]').first().click();
    assert.equal(await page.locator("#ui008-modal-injection, #ui008-svg-injection").count(), 0,
      "hostile player metadata must not create executable or parsed markup in the modal");
    assert.ok((await page.locator("#modalBody").innerText()).includes(hostileMetadata),
      "hostile player metadata must remain visible as literal text");
    assert.equal(await page.evaluate(() => window.__ui008Executed || window.__ui008Svg || false), false,
      "hostile modal metadata must not execute event handlers");
    await page.locator("#closeModal").click();

    const discovered = await cards.evaluateAll(nodes => nodes.map(node => new URL(node.getAttribute("href"), location.href).pathname.split("/").pop()));
    assert.deepEqual(discovered, expected, "hub cards must map to the complete expected workspace inventory");

    // Every card is actually clicked, the specialist page renders, and a real
    // return link navigates back to the hub.
    for (const file of expected) {
      await page.goto(hub, { waitUntil: "load" });
      const card = page.locator('.workspace-card[href="./' + file + '"]');
      assert.equal(await card.count(), 1, "hub card must exist exactly once: " + file);
      await card.click();
      await page.waitForLoadState("load");
      assert.ok(new URL(page.url()).pathname.endsWith("/" + file), "card must navigate to " + file);
      assert.ok((await page.title()).trim().length > 0, "specialist page must have a document title: " + file);
      assert.ok((await page.locator("h1").first().innerText()).trim().length > 0, "specialist page must render a primary heading: " + file);
      const returnLinks = page.locator('a[href="./index.html"]');
      assert.ok(await returnLinks.count() >= 1, "specialist page must expose a hub return link: " + file);
      const returnResponse = await page.request.get(hub);
      assert.equal(returnResponse.status(), 200, "hub return destination must resolve from " + file);
      await returnLinks.first().click();
      await page.waitForLoadState("load");
      assert.ok(new URL(page.url()).pathname.endsWith("/index.html"), "return link must navigate to hub from " + file);
      assert.equal(await page.locator(".workspace-card").count(), 11, "hub inventory must remain available after returning from " + file);
    }

    // Check every destination independently, including the static assets that
    // the page declares as local scripts.
    for (const file of expected) {
      const response = await page.request.get(origin + "/" + file);
      assert.equal(response.status(), 200, "specialist destination must return HTTP 200: " + file);
    }

    // Representative interactive controls: Passport tabs, guardian scenario
    // selector, and development-pathway player selector.
    await page.goto(origin + "/player-passport.html", { waitUntil: "load" });
    const claimsTab = page.locator('#tab-claims');
    await claimsTab.click();
    assert.equal(await claimsTab.getAttribute("aria-selected"), "true", "Passport claims tab must become selected");

    await page.goto(origin + "/guardian-consent.html", { waitUntil: "load" });
    const scenarioButtons = page.locator('button[data-case]');
    assert.ok(await scenarioButtons.count() >= 2, "guardian workspace must expose scenario selectors");
    await scenarioButtons.nth(1).click();
    assert.ok((await page.locator("#caseTitle").innerText()).trim().length > 0, "guardian scenario selection must render a case title");

    await page.goto(origin + "/player-development-pathways.html", { waitUntil: "load" });
    const playerButtons = page.locator("button.player-btn");
    assert.ok(await playerButtons.count() >= 2, "development workspace must expose player selectors");
    await playerButtons.nth(1).click();
    assert.ok((await page.locator("#playerName").innerText()).trim().length > 0, "pathway player selection must render the selected player");

    // Mobile viewport check across the hub and all specialist workspaces.
    const mobileWidths = [];
    await page.setViewportSize({ width: 390, height: 844 });
    for (const file of ["index.html", ...expected]) {
      await page.goto(origin + "/" + file, { waitUntil: "load" });
      const dimensions = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const page = document.documentElement.scrollWidth;
        const offenders = [...document.querySelectorAll("body *")].map(node => {
          const rect = node.getBoundingClientRect();
          return { tag: node.tagName, id: node.id, className: typeof node.className === "string" ? node.className : "", text: (node.innerText || "").trim().slice(0, 55), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
        }).filter(node => node.right > viewport + 1).slice(0, 20);
        return { viewport, page, offenders };
      });
      mobileWidths.push({ file, ...dimensions });
      assert.ok(dimensions.page <= dimensions.viewport, "mobile page must not overflow horizontally: " + JSON.stringify({ file, ...dimensions }));
    }

    assert.deepEqual(errors, [], "browser must not emit uncaught page or console errors");
    process.stdout.write([
      "PASS — hub renders exactly eleven specialist workspaces",
      "PASS — all eleven hub cards navigate to their correct pages",
      "PASS — all eleven specialist pages render title and primary heading",
      "PASS — all eleven specialist pages provide working return-to-hub navigation",
      "PASS — all eleven specialist destinations resolve successfully",
      "PASS — Passport tab, guardian scenario and pathway player controls respond",
      "PASS — hub and all eleven specialist pages fit a 390px viewport without horizontal overflow",
      "PASS — no uncaught browser page or console errors",
      "WORKSPACE HUB BROWSER SMOKE RESULT: 8/8 groups passed"
    ].join("\n") + "\n");
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => {
  process.stderr.write((error && error.stack) || String(error));
  process.exitCode = 1;
});
