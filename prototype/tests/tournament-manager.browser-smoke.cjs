const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');

test('tournament manager imports organizer portal package by stable IDs and skips duplicates', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('file://' + path.resolve('prototype/tournament-manager.html'));
  const pkg = {
    contractVersion: '1.0',
    sourceSystem: 'scoutsa-organizer-portal',
    organizers: [{ id: 'ORG-DEMO-501', name: 'DEMO-Test-Organizer', type: 'Community organization', identity: 'unverified', authority: 'pending' }],
    submissions: [{ id: 'SUB-DEMO-501', tournamentId: 'TRN-ORG-DEMO-501', editionId: 'EDT-ORG-DEMO-501', organizerId: 'ORG-DEMO-501', name: 'DEMO-Test-Cup', edition: 'DEMO-2027-Edition', locality: 'DEMO-Sedibeng', format: '11-a-side', status: 'pending-review' }],
    evidence: [{ id: 'EVD-DEMO-501', organizerId: 'ORG-DEMO-501', type: 'Public institutional reference', ref: 'DEMO-EVIDENCE-501', status: 'pending' }],
    features: [{ id: 'FTR-DEMO-501', submissionId: 'SUB-DEMO-501', scope: 'Competition name, dates and public event summary', status: 'requested' }]
  };
  await page.locator('[data-section="records"]').click();
  await page.locator('#organizerHandoffFile').setInputFiles({ name: 'handoff.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(pkg)) });
  await page.locator('#importOrganizerHandoff').click();
  assert.match(await page.locator('#organizerImportMessage').textContent(), /Imported 1 tournament edition/);
  assert.equal(await page.locator('#countT').textContent(), '2');
  await page.locator('#importOrganizerHandoff').click();
  assert.match(await page.locator('#organizerImportMessage').textContent(), /Imported 0 tournament edition\(s\); skipped 1 duplicate/);
  await page.locator('#ledger').getByText('TRN-ORG-DEMO-501').waitFor();
  assert.deepEqual(errors, []);
  await browser.close();
});
