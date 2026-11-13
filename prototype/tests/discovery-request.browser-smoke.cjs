"use strict";

// Browser-level smoke test for the synthetic Discovery & Request Review page.
// Uses only fictional fixtures. This is not an authorization, security,
// safeguarding, privacy, accessibility or production-readiness test.
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

async function main() {
  const { server, origin } = await startServer();
  let browser;
  const failures = [];
  try {
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on("pageerror", error => failures.push("pageerror: " + error.message));
    page.on("console", message => {
      if (message.type() === "error") failures.push("console: " + message.text());
    });

    const base = origin + "/discovery-request.html";
    const open = async query => page.goto(base + (query || ""), { waitUntil: "load" });
    const stages = () => page.locator("#reviewStages .stage");
    const assertSixStages = async () => {
      assert.equal(await stages().count(), 6, "each matched request must render six review stages");
      assert.equal(await stages().nth(0).locator(".stage-status").innerText(), "FICTIONAL FIXTURE — NOT SUBMITTED");
      assert.equal(await stages().nth(4).locator(".stage-status").innerText(), "NO DECISION RECORDED");
      assert.equal(await stages().nth(5).locator(".stage-status").innerText(), "PROHIBITED — NOT IMPLEMENTED");
      assert.match(await page.locator("#requestState").innerText(), /HOLD/);
    };

    // Ordinary queue: all three synthetic scenarios appear and are selectable.
    await open("");
    assert.equal(await page.locator(".request").count(), 3, "ordinary navigation must show the three fictional request fixtures");
    for (const id of ["REQ-DEMO-001", "REQ-DEMO-002", "REQ-DEMO-003"]) {
      await page.locator('.request[data-id="' + id + '"]').click();
      assert.equal(await page.locator("#requestTitle").innerText(), id);
      await assertSixStages();
      assert.equal(await page.locator("#links a").count(), 8, "all connected prototype links should render");
    }

    // Guardian-mediated under-18 scenario.
    await page.locator('.request[data-id="REQ-DEMO-001"]').click();
    assert.match(await page.locator("#summary").innerText(), /Under 18/);
    assert.match(await page.locator("#gates").innerText(), /guardian/i);
    assert.match(await page.locator("#gates").innerText(), /FAIL|SKIPPED/);

    // Unknown-age scenario must remain protected and held.
    await page.locator('.request[data-id="REQ-DEMO-002"]').click();
    assert.match(await page.locator("#summary").innerText(), /Unknown/);
    assert.match(await page.locator("#gates").innerText(), /AGE_STATUS_UNVERIFIED|under-18 protections/i);

    // Adult-status-unverified scenario must not be treated as an adult route.
    await page.locator('.request[data-id="REQ-DEMO-003"]').click();
    assert.match(await page.locator("#summary").innerText(), /Adult status not verified/);
    assert.match(await page.locator("#gates").innerText(), /AGE_STATUS_UNVERIFIED|Adult status is not established/i);

    // URL handoff edge cases must never fall back to the full queue.
    const emptyStates = [
      ["?opportunity=OPP-DEMO-001", /player reference is required/i],
      ["?player=UNKNOWN-PLAYER", /No recognized synthetic Passport reference/i],
      ["?player=DEMO-PLAYER-001&opportunity=OPP-DEMO-003", /No matching synthetic request/i],
      ["?player=DEMO-PLAYER-001&opportunity=", /non-empty opportunity reference is required/i]
    ];
    for (const [query, expected] of emptyStates) {
      await open(query);
      assert.equal(await page.locator(".request").count(), 0, "invalid handoff must not expose the sample queue: " + query);
      assert.match(await page.locator("#passportHandoff").innerText(), expected);
      assert.equal(await stages().count(), 0, "no request stages may be fabricated for an unmatched handoff");
      assert.match(await page.locator("#requestState").innerText(), /NO REQUEST RECORD/);
    }

    // Exact known player + opportunity pair returns exactly one request.
    await open("?player=DEMO-PLAYER-001&opportunity=OPP-DEMO-001");
    assert.equal(await page.locator(".request").count(), 1);
    assert.equal(await page.locator(".request").first().getAttribute("data-id"), "REQ-DEMO-001");
    await assertSixStages();

    // Player-only handoff narrows to that player's synthetic records.
    await open("?player=DEMO-PLAYER-002");
    assert.equal(await page.locator(".request").count(), 1);
    assert.equal(await page.locator(".request").first().getAttribute("data-id"), "REQ-DEMO-002");

    // Narrow mobile viewport: no horizontal page overflow; review stages stack.
    await page.setViewportSize({ width: 390, height: 844 });
    await open("");
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
      stageColumns: getComputedStyle(document.querySelector(".review-stages")).gridTemplateColumns.split(" ").length,
      layoutColumns: getComputedStyle(document.querySelector(".layout")).gridTemplateColumns.split(" ").length
    }));
    assert.ok(dimensions.page <= dimensions.viewport, "mobile page must not overflow horizontally: " + JSON.stringify(dimensions));
    assert.equal(dimensions.stageColumns, 1, "review stages must stack to one column on mobile");
    assert.equal(dimensions.layoutColumns, 1, "request queue and detail must stack on mobile");

    assert.deepEqual(failures, [], "browser must not emit uncaught page or console errors");
    process.stdout.write([
      "PASS — ordinary queue and all three selectable scenarios",
      "PASS — six review stages, final outcome boundary and disclosure prohibition",
      "PASS — guardian-mediated under-18, unknown-age and adult-status-unverified cases",
      "PASS — opportunity-only, unknown-player, unmatched-pair and empty-opportunity handoffs fail closed",
      "PASS — exact pair and player-only handoffs",
      "PASS — mobile layout and no horizontal overflow",
      "PASS — no uncaught browser page or console errors",
      "BROWSER SMOKE RESULT: 7/7 groups passed"
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
