"use strict";

// End-to-end smoke test for the session-only tournament manager.
// All records are synthetic. This does not test or imply production persistence or authorization.
const assert = require("node:assert/strict");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const root = path.resolve(__dirname, "..");

async function serve() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
    const relative = path.normalize(pathname).replace(/^([/\\\\])+/, "");
    const file = path.resolve(root, relative || "index.html");
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404); res.end("Not found"); return;
    }
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(resolve => server.listen(0, "127.0.0.1", () =>
    resolve({ server, origin: "http://127.0.0.1:" + server.address().port })));
}

async function main() {
  const { server, origin } = await serve();
  let browser;
  const errors = [];
  try {
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(origin + "/tournament-intelligence.html", { waitUntil: "load" });
    const managerLink = page.locator('a[href="./tournament-manager.html"]');
    assert.equal(await managerLink.count(), 1, "relationship hub must link to manager");
    await managerLink.click();
    await page.waitForLoadState("load");
    assert.ok(page.url().endsWith("/tournament-manager.html"));
    assert.equal(await page.locator("#countT").innerText(), "1");
    assert.equal(await page.locator("#countE").innerText(), "2");

    // Create tournament + edition + distinct organizer and venue IDs.
    await page.locator("#eventName").fill("DEMO-Synthetic Test Cup");
    await page.locator("#eventSeason").fill("2026");
    await page.locator("#eventOrganizer").fill("DEMO-Organizer-Test");
    await page.locator("#eventVenue").fill("DEMO-Field-Test");
    await page.locator("#eventLocality").fill("DEMO-Locality-Test");
    await page.locator("#eventStart").fill("2026-12-01");
    await page.locator("#eventEnd").fill("2026-12-02");
    await page.locator("#eventForm button[type=submit]").click();
    assert.match(await page.locator("#eventMessage").innerText(), /Created TRN-DEMO-002 and EDT-DEMO-002/);
    assert.equal(await page.locator("#countT").innerText(), "2");

    // Reject an invalid date range.
    await page.locator("#eventName").fill("Invalid Date Cup");
    await page.locator("#eventSeason").fill("2026");
    await page.locator("#eventOrganizer").fill("DEMO-Organizer-Test");
    await page.locator("#eventVenue").fill("DEMO-Field-Test");
    await page.locator("#eventLocality").fill("DEMO-Locality-Test");
    await page.locator("#eventStart").fill("2026-12-03");
    await page.locator("#eventEnd").fill("2026-12-02");
    await page.locator("#eventForm button[type=submit]").click();
    assert.match(await page.locator("#eventMessage").innerText(), /End date cannot be before start date/);
    assert.equal(await page.locator("#countT").innerText(), "2");

    // Create a division under the new edition.
    await page.locator('[data-section="division"]').click();
    await page.locator("#divisionEvent").selectOption("EDT-DEMO-002");
    await page.locator("#divisionName").fill("U19 Test Division");
    await page.locator("#divisionForm button[type=submit]").click();
    assert.match(await page.locator("#divisionMessage").innerText(), /Created DIV-DEMO-002/);

    // Register two teams and event-specific coach assignments.
    await page.locator('[data-section="team"]').click();
    await page.locator("#teamEvent").selectOption({ label: "DEMO-Synthetic Test Cup" });
    await page.locator("#teamDivision").selectOption({ label: "U19 Test Division · DIV-DEMO-002" });
    await page.locator("#teamName").fill("DEMO-Lions");
    await page.locator("#teamCoach").fill("DEMO-Coach-One");
    await page.locator("#teamForm button[type=submit]").click();
    assert.match(await page.locator("#teamMessage").innerText(), /Created TEAM-DEMO-003, entry TEN-DEMO-003/);
    await page.locator("#teamEvent").selectOption({ label: "DEMO-Synthetic Test Cup" });
    await page.locator("#teamDivision").selectOption("DIV-DEMO-002");
    await page.locator("#teamName").fill("DEMO-Eagles");
    await page.locator("#teamCoach").fill("DEMO-Coach-Two");
    await page.locator("#teamForm button[type=submit]").click();
    assert.match(await page.locator("#teamMessage").innerText(), /Created TEAM-DEMO-004, entry TEN-DEMO-004/);
    assert.equal(await page.locator("#countE").innerText(), "4");

    // Create synthetic player participation.
    await page.locator('[data-section="player"]').click();
    await page.locator("#playerEntry").selectOption("TEN-DEMO-003");
    await page.locator("#playerAlias").fill("DEMO-PLAYER-003");
    await page.locator("#playerForm button[type=submit]").click();
    assert.match(await page.locator("#playerMessage").innerText(), /Created synthetic player PLY-DEMO-003/);
    await page.locator("#playerEntry").selectOption("TEN-DEMO-003");
    await page.locator("#playerAlias").fill("REAL PERSON");
    await page.locator("#playerForm button[type=submit]").click();
    assert.match(await page.locator("#playerMessage").innerText(), /Use a synthetic label/);

    // Fixture only accepts two distinct entries in the same division.
    await page.locator('[data-section="fixture"]').click();
    await page.locator("#fixtureDivision").selectOption("DIV-DEMO-002");
    await page.locator("#fixtureHome").selectOption("TEN-DEMO-003");
    await page.locator("#fixtureAway").selectOption("TEN-DEMO-004");
    await page.locator("#fixtureRound").fill("Group A · Round 1");
    await page.locator("#fixtureForm button[type=submit]").click();
    assert.match(await page.locator("#fixtureMessage").innerText(), /Created fixture FIX-DEMO-002/);
    assert.equal(await page.locator("#countF").innerText(), "2");

    // Record result, then a stat scoped to the correct player participation and fixture.
    await page.locator('[data-section="result"]').click();
    await page.locator("#resultFixture").selectOption("FIX-DEMO-002");
    await page.locator("#resultHome").fill("3");
    await page.locator("#resultAway").fill("1");
    await page.locator("#resultForm button[type=submit]").click();
    assert.match(await page.locator("#resultMessage").innerText(), /Saved result for FIX-DEMO-002/);

    await page.locator('[data-section="stats"]').click();
    await page.locator("#statFixture").selectOption("FIX-DEMO-002");
    await page.locator("#statPlayer").selectOption("PAR-DEMO-003");
    await page.locator("#statMetric").selectOption({ label: "Goals · count" });
    await page.locator("#statValue").fill("2");
    await page.locator("#statsForm button[type=submit]").click();
    assert.match(await page.locator("#statsMessage").innerText(), /Recorded STA-DEMO-001/);
    await page.locator("#statFixture").selectOption("FIX-DEMO-002");
    await page.locator("#statPlayer").selectOption("PAR-DEMO-003");
    await page.locator("#statValue").fill("2.5");
    await page.locator("#statsForm button[type=submit]").click();
    assert.match(await page.locator("#statsMessage").innerText(), /whole-number value/);

    // Ledger and JSON export.
    await page.locator('[data-section="records"]').click();
    const ledger = await page.locator("#ledger").innerText();
    assert.match(ledger, /TRN-DEMO-002/);
    assert.match(ledger, /FIX-DEMO-002/);
    assert.match(ledger, /STA-DEMO-001/);
    const downloadPromise = page.waitForEvent("download");
    await page.locator("#exportButton").click();
    const download = await downloadPromise;
    assert.equal(download.suggestedFilename(), "scoutsa-tournament-demo.json");

    // Mobile layout remains within viewport.
    await page.setViewportSize({ width: 390, height: 844 });
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    assert.ok(dimensions.scrollWidth <= dimensions.width, "390px viewport must not overflow");
    assert.deepEqual(errors, [], "no uncaught browser errors");
    console.log("PASS: event, division, team/coach, participation, fixture, result, statistics, validation, ledger, export and mobile layout");
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
