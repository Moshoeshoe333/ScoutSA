"use strict";

// Tournament relationship hub smoke test. Synthetic fixture data only.
// Verifies navigation, relationship views, filters and mobile layout—not production controls.
const assert = require("node:assert/strict");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const root = path.resolve(__dirname, "..");

async function startServer() {
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
  const { server, origin } = await startServer();
  let browser;
  const errors = [];
  try {
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    const hubResponse = await page.goto(origin + "/index.html", { waitUntil: "load" });
    assert.equal(hubResponse.status(), 200);
    const link = page.locator('a[href="./tournament-intelligence.html"]');
    assert.equal(await link.count(), 1, "hub must expose tournament relationship hub");
    await link.click();
    await page.waitForLoadState("load");
    assert.ok(page.url().endsWith("/tournament-intelligence.html"));
    assert.equal(await page.locator("#tournamentCount").innerText(), "3");
    assert.equal(await page.locator("#teamCount").innerText(), "6");
    assert.equal(await page.locator("#statCount").innerText(), "5");
    assert.equal(await page.locator("#teamRows tr").count(), 2);
    assert.match(await page.locator("#teamRows").innerText(), /TEN-001/);
    await page.locator('[data-tab="players"]').click();
    assert.equal(await page.locator("#playerRows tr").count(), 3);
    await page.locator('[data-tab="fixtures"]').click();
    assert.equal(await page.locator("#fixtureRows tr").count(), 1);
    await page.locator('[data-tab="stats"]').click();
    assert.equal(await page.locator("#statRows tr").count(), 3);
    await page.locator('[data-tab="ids"]').click();
    assert.ok(await page.locator("#relationshipCards .rel").count() >= 8);
    await page.locator("#search").fill("Sedibeng Youth");
    assert.equal(await page.locator("#tournamentList .tournament").count(), 1);
    await page.locator("#search").fill("");
    await page.locator("#season").selectOption("2024");
    assert.equal(await page.locator("#tournamentList .tournament").count(), 1);
    await page.locator("#season").selectOption("");
    await page.locator("#tournamentList .tournament").nth(1).click();
    assert.equal(await page.locator("#detailId").innerText(), "TRN-2025-002");
    await page.locator('a[href="./index.html"]').click();
    await page.waitForLoadState("load");
    assert.ok(page.url().endsWith("/index.html"));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(origin + "/tournament-intelligence.html", { waitUntil: "load" });
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    assert.ok(dimensions.scrollWidth <= dimensions.width, "390px viewport must not overflow");
    assert.deepEqual(errors, [], "no uncaught browser errors");
    console.log("PASS: tournament registry, ID relationships, participation, fixtures, stats, filters and mobile layout");
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
