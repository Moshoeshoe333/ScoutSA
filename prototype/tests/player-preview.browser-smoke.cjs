"use strict";

// Smoke test for the three-screen fictional player journey preview.
// This checks presentation and demo interactions only; it is not a safeguarding,
// privacy, authorization, accessibility or production-readiness assessment.
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
    res.writeHead(200, { "content-type": path.extname(file) === ".html" ? "text/html; charset=utf-8" : "application/octet-stream" });
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
    const response = await page.goto(origin + "/scoutsa-player-preview.html", { waitUntil: "load" });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator(".step").count(), 3, "the player journey must remain three screens");
    assert.match(await page.locator(".player-card").innerText(), /Thabo Sample/);
    assert.match(await page.locator(".player-card").innerText(), /SAMPLE — FICTIONAL PLAYER/);
    assert.match(await page.locator(".player-card").innerText(), /not yet/i);

    // Screen 1 -> 2: private is default, and broader audiences expose a guardian review step.
    await page.locator("#next").click();
    assert.equal(await page.locator('[data-screen="1"]').isVisible(), true);
    assert.equal(await page.locator("#guardianGate").isVisible(), false);
    await page.locator('input[value="named"]').check();
    assert.equal(await page.locator("#guardianGate").isVisible(), true);
    assert.match(await page.locator("#visibilityState").innerText(), /blocked/i);
    await page.locator("#guardianApprove").click();
    assert.match(await page.locator("#visibilityState").innerText(), /not real consent/i);
    assert.equal(await page.locator("#guardianApprove").isDisabled(), true);
    await page.locator('input[value="opportunity"]').check();
    assert.match(await page.locator("#visibilityState").innerText(), /specific opportunity/i);
    assert.match(await page.locator("#visibilityState").innerText(), /blocked/i);

    // Screen 3: share preview is fictional; the WhatsApp action carries only generic sample text + URL.
    await page.locator("#next").click();
    assert.equal(await page.locator('[data-screen="2"]').isVisible(), true);
    assert.match(await page.locator(".share-preview").innerText(), /SAMPLE — FICTIONAL PLAYER/);
    assert.match(await page.locator(".share-preview").innerText(), /Thabo Sample/);
    assert.match(await page.locator("#shareUrl").innerText(), /127\.0\.0\.1/);
    const popupPromise = page.waitForEvent("popup");
    await page.locator("#whatsapp").click();
    const popup = await popupPromise;
    assert.match(popup.url(), /^https:\/\/wa\.me\//);
    assert.match(decodeURIComponent(popup.url()), /fictional player only/i);
    await popup.close();

    // Narrow phone viewport must not overflow horizontally.
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    assert.ok(dimensions.scrollWidth <= dimensions.width, "390px viewport must not overflow horizontally");
    assert.deepEqual(errors, [], "page must have no JavaScript or console errors");
    console.log("PASS: three screens, guardian-gated demo interaction, sample share preview and 390px layout");
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
