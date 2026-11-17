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
  await page.locator('[data-section="eligibility"]').click();
  await page.locator('#eligibilityPlayer').selectOption('PAR-DEMO-001');
  assert.match(await page.locator('#eligibilityDivision').inputValue(), /Adult Open/);
  await page.locator('#eligibilityEvidence').selectOption('Demo evidence checked by reviewer');
  await page.locator('#eligibilityDecision').selectOption('Eligible for human review');
  await page.locator('#eligibilityRule').fill('DEMO-RULE-ADULT-01');
  await page.locator('#eligibilityReviewer').fill('DEMO-REVIEWER-01');
  await page.locator('#eligibilityNote').fill('Synthetic review only; no real age evidence.');
  await page.locator('#eligibilityForm button[type="submit"]').click();
  assert.match(await page.locator('#eligibilityMessage').textContent(), /not an eligibility certification/);
  await page.locator('#eligibilityTable').getByText('Eligible for human review').waitFor();
  await page.locator('#ledger').getByText('ELR-DEMO-001').waitFor();
  await page.locator('[data-section="player"]').click();
  await page.locator('#playerEntry').selectOption('TEN-DEMO-001');
  await page.locator('#playerAlias').fill('DEMO-PLAYER-TEST-10');
  await page.locator('#playerShirt').fill('10');
  await page.locator('#playerRosterState').selectOption('Pending registration');
  await page.locator('#playerForm button[type="submit"]').click();
  assert.match(await page.locator('#playerMessage').textContent(), /Created synthetic player/);
  await page.locator('#playerAlias').fill('DEMO-PLAYER-TEST-11');
  await page.locator('#playerShirt').fill('10');
  await page.locator('#playerForm button[type="submit"]').click();
  assert.match(await page.locator('#playerMessage').textContent(), /already assigned within this team entry/);
  await page.locator('[data-section="stats"]').click();
  await page.locator('#statFixture').selectOption('FIX-DEMO-001');
  await page.locator('#statPlayer').selectOption({ label: /DEMO-PLAYER-TEST-10/ });
  await page.locator('#statValue').fill('1');
  await page.locator('#statsForm button[type="submit"]').click();
  assert.match(await page.locator('#statsMessage').textContent(), /Only a registered demo roster entry/);

  // Re-select every field after the prior successful/blocked form interactions.
  // A fractional count must be rejected without writing a statistic.
  await page.locator('#statFixture').selectOption('FIX-DEMO-001');
  await page.locator('#statPlayer').selectOption('PAR-DEMO-001');
  await page.locator('#statMetric').selectOption({ label: 'Goals · count' });
  const beforeInvalidCount = await page.locator('#statsTable tbody tr').count();
  await page.locator('#statValue').fill('2.5');
  await page.locator('#statsForm button[type="submit"]').click();
  assert.match(await page.locator('#statsMessage').textContent(), /whole-number value/);
  assert.equal(await page.locator('#statsTable tbody tr').count(), beforeInvalidCount,
    'invalid fractional count must not create a statistic');

  // A valid whole-number count is accepted and remains linked to the selected fixture and participation.
  await page.locator('#statFixture').selectOption('FIX-DEMO-001');
  await page.locator('#statPlayer').selectOption('PAR-DEMO-001');
  await page.locator('#statMetric').selectOption({ label: 'Goals · count' });
  await page.locator('#statValue').fill('2');
  await page.locator('#statsForm button[type="submit"]').click();
  assert.match(await page.locator('#statsMessage').textContent(), /Recorded STA-/);
  assert.deepEqual(errors, []);
  await browser.close();
});
