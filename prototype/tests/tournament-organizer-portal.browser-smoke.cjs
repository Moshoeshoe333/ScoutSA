const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');

test('tournament organizer portal keeps organizer, authority and feature permission separate', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('file://' + path.resolve('prototype/tournament-organizer-portal.html'));
  assert.match(await page.title(), /Tournament Organizer Portal/);
  assert.equal(await page.locator('#countSubmissions').textContent(), '2');
  assert.equal(await page.locator('#countOrganizers').textContent(), '2');
  assert.equal(await page.locator('#countEvidence').textContent(), '2');
  assert.equal(await page.locator('#countFeatures').textContent(), '1');

  await page.locator('[data-section="organizers"]').click();
  assert.equal(await page.locator('#organizerRows tr').count(), 2);
  assert.match(await page.locator('#organizerRows').innerText(), /unverified/);
  await page.locator('[data-section="submit"]').click();
  await page.locator('#organizerName').fill('DEMO-New-Organizer');
  await page.locator('#organizerType').selectOption('Community organization');
  await page.locator('#tournamentName').fill('DEMO-Founders-Cup');
  await page.locator('#editionLabel').fill('DEMO-2027-Edition');
  await page.locator('#locality').fill('DEMO-Sedibeng');
  await page.locator('#submissionForm button[type="submit"]').click();
  assert.equal(await page.locator('#countSubmissions').textContent(), '3');
  assert.equal(await page.locator('#countOrganizers').textContent(), '3');
  assert.match(await page.locator('#submissionMessage').textContent(), /pending review/i);

  await page.locator('[data-section="evidence"]').click();
  await page.locator('#evidenceRef').fill('DEMO-EVIDENCE-NEW');
  await page.locator('#evidenceForm button[type="submit"]').click();
  assert.equal(await page.locator('#countEvidence').textContent(), '3');
  assert.match(await page.locator('#evidenceMessage').textContent(), /not independently verified/i);

  await page.locator('[data-section="features"]').click();
  await page.locator('#featureSubmission').selectOption({ label: /DEMO-Founders-Cup/ });
  await page.locator('#featureState').selectOption('granted-demo');
  await page.locator('#featureForm button[type="submit"]').click();
  assert.match(await page.locator('#featureRows').innerText(), /not-published/);
  assert.equal(await page.locator('#countFeatures').textContent(), '2');

  await page.locator('[data-section="ledger"]').click();
  assert.match(await page.locator('#ledgerCards').innerText(), /ORG-DEMO-/);
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.locator('body').evaluate(el => el.scrollWidth <= window.innerWidth), true);
  assert.deepEqual(errors, []);
  await browser.close();
});
