const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs');

test('tournament organizer portal keeps organizer, authority and feature permission separate', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
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
  await page.locator('#startDate').fill('2027-06-10');
  await page.locator('#endDate').fill('2027-06-09');
  await page.locator('#submissionForm button[type="submit"]').click();
  assert.equal(await page.locator('#countSubmissions').textContent(), '2', 'reversed dates must not create a submission');
  assert.equal(await page.locator('#countOrganizers').textContent(), '2', 'reversed dates must not create an organizer');
  assert.match(await page.locator('#submissionMessage').textContent(), /end date must be on or after the start date/i);
  assert.equal(await page.locator('#startDate').inputValue(), '2027-06-10', 'rejected form must retain entered values for correction');
  await page.locator('#endDate').fill('2027-06-12');
  await page.locator('#submissionNote').fill('DEMO community tournament summary.');
  await page.locator('#submissionForm button[type="submit"]').click();
  assert.equal(await page.locator('#countSubmissions').textContent(), '3');
  assert.equal(await page.locator('#countOrganizers').textContent(), '3');
  assert.match(await page.locator('#submissionMessage').textContent(), /pending review/i);

  await page.locator('[data-section="evidence"]').click();
  await page.locator('#evidenceRef').fill('DEMO-REFERENCE-001');
  await page.locator('#evidenceForm button[type="submit"]').click();
  assert.equal(await page.locator('#countEvidence').textContent(), '2', 'duplicate evidence references must not mutate state');
  assert.match(await page.locator('#evidenceMessage').textContent(), /already exists/i);
  await page.locator('#evidenceRef').fill('DEMO-EVIDENCE-NEW');
  await page.locator('#evidenceForm button[type="submit"]').click();
  assert.equal(await page.locator('#countEvidence').textContent(), '3');
  assert.match(await page.locator('#evidenceMessage').textContent(), /not independently verified/i);

  await page.locator('[data-section="features"]').click();
  await page.locator('#featureSubmission').selectOption('SUB-DEMO-004');
  await page.locator('#featureState').selectOption('granted-demo');
  await page.locator('#featureForm button[type="submit"]').click();
  assert.match(await page.locator('#featureRows').innerText(), /not-published/);
  assert.equal(await page.locator('#countFeatures').textContent(), '2');

  await page.locator('[data-section="ledger"]').click();
  const exportWait = page.waitForEvent('download');
  await page.locator('#exportOrganizerPackage').click();
  const exported = await exportWait;
  const packageData = JSON.parse(fs.readFileSync(await exported.path(), 'utf8'));
  const created = packageData.submissions.find(item => item.name === 'DEMO-Founders-Cup');
  assert.ok(created, 'new competition must be present in the exported package');
  assert.equal(created.start, '2027-06-10', 'start date must survive export');
  assert.equal(created.end, '2027-06-12', 'end date must survive export');
  assert.equal(created.summary, 'DEMO community tournament summary.', 'competition summary must survive export');
  assert.equal(created.organizerId, 'ORG-DEMO-003', 'submission must retain its organizer relationship');
  assert.match(await page.locator('#exportMessage').textContent(), /Exported the synthetic organizer handoff package/);
  assert.match(await page.locator('#ledgerCards').innerText(), /ORG-DEMO-/);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const section of ['submit', 'organizers', 'evidence', 'features', 'ledger']) {
    await page.locator(`[data-section="${section}"]`).click();
    const dims = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(dims.scroll <= dims.width, `${section} section must fit a 390px viewport: ${JSON.stringify(dims)}`);
    assert.equal(await page.locator(`[data-section="${section}"]`).getAttribute('aria-current'), 'page');
  }
  assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
