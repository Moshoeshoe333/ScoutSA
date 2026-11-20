"use strict";

// Browser smoke test for the static Vaal football ecosystem research workbench.
// It checks discoverability and honest evidence labels, not completeness or truth
// of the underlying public reports.
const assert = require("node:assert/strict");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
    const relative = path.normalize(pathname).replace(/^([/\\])+/, "");
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
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    const response = await page.goto(origin + "/vaal-ecosystem-coverage.html", { waitUntil: "load" });
    assert.equal(response.status(), 200);
    assert.match(await page.locator(".warning").innerText(), /not a complete Vaal team list/i);
    const total = Number(await page.locator("#total").innerText());
    assert.ok(total >= 45, "seed should include at least 45 reported team leads");
    assert.equal(await page.locator("#rows tr").count(), total);
    assert.equal(await page.locator(".pill").count(), total);
    assert.equal(await page.locator('a.source:not([href^="https://"])').count(), 0,
      "all source links must use HTTPS");
    const sourceRow = page.locator("#rows tr").first();
    const sourceName = await sourceRow.locator("td").first().innerText();
    const validSourceHref = await sourceRow.locator("a.source").getAttribute("href");
    assert.ok(validSourceHref.startsWith("https://"));
    assert.equal(await sourceRow.locator("a.source").getAttribute("target"), "_blank");
    assert.equal(await sourceRow.locator("a.source").getAttribute("rel"), "noopener noreferrer");
    assert.equal(await sourceRow.locator("a.source").getAttribute("referrerpolicy"), "no-referrer");

    // URL scheme and credential checks must hold at the rendered-link boundary.
    for (const hostileSource of [
      "javascript:window.__vaalSourceXss=1",
      "http://example.com/report",
      "https://user:password@example.com/report",
      "not a valid URL"
    ]) {
      await page.evaluate(({ name, value }) => {
        const item = teams.find(row => row[0] === name);
        if (!item) throw new Error("Expected research fixture was not found.");
        item[4] = value;
        render();
      }, { name: sourceName, value: hostileSource });
      const row = page.locator("#rows tr").filter({ hasText: sourceName }).first();
      assert.equal(await row.locator("a.source").count(), 0,
        "invalid, non-HTTPS or credential-bearing source URLs must not become links");
      assert.match(await row.innerText(), /Source unavailable/,
        "rejected source URL must be represented as unavailable");
      assert.equal(await page.evaluate(() => window.__vaalSourceXss || 0), 0,
        "hostile source URL must not execute code");
    }
    await page.evaluate(({ name, value }) => {
      const item = teams.find(row => row[0] === name);
      item[4] = value;
      render();
    }, { name: sourceName, value: validSourceHref });
    const restoredRow = page.locator("#rows tr").filter({ hasText: sourceName }).first();
    assert.equal(await restoredRow.locator("a.source").getAttribute("href"), validSourceHref,
      "valid HTTPS research source must render again after fixture restoration");
    await page.locator("#search").fill("Vaal Ladies");
    assert.equal(await page.locator("#rows tr").count(), 1);
    assert.match(await page.locator("#rows").innerText(), /Vaal Ladies FC/);
    await page.locator("#search").fill("");
    await page.locator("#evidence").selectOption("Identity / alias review");
    assert.ok(await page.locator("#rows tr").count() >= 3,
      "identity and alias conflicts must be discoverable");
    await page.locator("#evidence").selectOption("");
    await page.locator("#locality").selectOption({ index: 1 });
    assert.ok(await page.locator("#rows tr").count() > 0);
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    assert.ok(dimensions.scrollWidth <= dimensions.width, "390px viewport must not overflow");
    assert.deepEqual(errors, [], "page must have no JavaScript or console errors");
    console.log("PASS: Vaal coverage seed, source links, filters and 390px layout");
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
