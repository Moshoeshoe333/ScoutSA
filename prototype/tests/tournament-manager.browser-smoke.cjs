const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');

test('tournament manager imports organizer portal package by stable IDs and skips duplicates', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const errors = [];
  const consoleErrors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  await page.goto('file://' + path.resolve('prototype/tournament-manager.html'));
  const pkg = {
    contractVersion: '1.0',
    sourceSystem: 'scoutsa-organizer-portal',
    organizers: [{ id: 'ORG-DEMO-501', name: 'DEMO-Test-Organizer', type: 'Community organization', identity: 'unverified', authority: 'pending' }],
    submissions: [{ id: 'SUB-DEMO-501', tournamentId: 'TRN-ORG-DEMO-501', editionId: 'EDT-ORG-DEMO-501', organizerId: 'ORG-DEMO-501', name: 'DEMO-Test-Cup', edition: 'DEMO-2027-Edition', locality: 'DEMO-Sedibeng', format: '11-a-side', status: 'pending-review' }],
    evidence: [{ id: 'EVD-DEMO-501', organizerId: 'ORG-DEMO-501', type: 'Public institutional reference', ref: 'DEMO-EVIDENCE-501', status: 'pending' }],
    features: [{ id: 'FTR-DEMO-501', submissionId: 'SUB-DEMO-501', scope: 'Competition name, dates and public event summary', status: 'requested' }]
  };
  const recordsNav = page.locator('[data-section="records"]');
  assert.equal(await recordsNav.count(), 1, 'Records navigation control must exist exactly once');
  await recordsNav.click();
  const recordsPanel = page.locator('#section-records');
  try {
    await page.waitForFunction(() => document.querySelector('#section-records')?.classList.contains('active') === true, null, { timeout: 1000 });
  } catch (error) {
    const diagnostic = await page.evaluate(() => ({
      recordsNavCurrent: document.querySelector('[data-section="records"]')?.getAttribute('aria-current'),
      activeSections: [...document.querySelectorAll('.section.active')].map(el => el.id),
      recordsPanelExists: Boolean(document.querySelector('#section-records'))
    }));
    assert.fail(`Records navigation did not activate within 1s. State=${JSON.stringify(diagnostic)}; pageErrors=${JSON.stringify(errors)}; consoleErrors=${JSON.stringify(consoleErrors)}; cause=${error.message}`);
  }
  await recordsPanel.waitFor({ state: 'visible' });
  await page.locator('#organizerHandoffFile').setInputFiles({ name: 'handoff.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(pkg)) });
  await page.locator('#importOrganizerHandoff').click();
  await page.waitForFunction(() => /Imported 1 tournament edition/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
  assert.match(await page.locator('#organizerImportMessage').textContent(), /Imported 1 tournament edition/);
  assert.equal(await page.locator('#countT').textContent(), '2');
  await page.locator('#importOrganizerHandoff').click();
  await page.waitForFunction(() => /Imported 0 tournament edition\(s\); skipped 1 duplicate/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
  assert.match(await page.locator('#organizerImportMessage').textContent(), /Imported 0 tournament edition\(s\); skipped 1 duplicate/);
  const assertRejectedImport = async (name, payload) => {
    const before = await page.locator('#countT').textContent();
    const buffer = Buffer.isBuffer(payload) ? payload : Buffer.from(typeof payload === 'string' ? payload : JSON.stringify(payload));
    await page.locator('#organizerHandoffFile').setInputFiles({ name, mimeType: 'application/json', buffer });
    await page.locator('#importOrganizerHandoff').click();
    await page.waitForFunction(() => /^Import rejected:/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
    assert.equal(await page.locator('#countT').textContent(), before, name + ' must not partially mutate tournament state');
  };
  await assertRejectedImport('malformed.json', '{not-json');
  await assertRejectedImport('null-record.json', { ...pkg, organizers: [null] });
  await assertRejectedImport('missing-feature-link.json', { ...pkg, features: [{ id: 'FTR-DEMO-502', submissionId: 'SUB-DEMO-MISSING', scope: 'DEMO-SCOPE', status: 'requested' }] });
  await assertRejectedImport('edition-collision.json', { ...pkg, submissions: [{ ...pkg.submissions[0], id: 'SUB-DEMO-502', tournamentId: 'TRN-ORG-DEMO-999' }] });
  await assertRejectedImport('oversized.json', Buffer.alloc(1024 * 1024 + 1, 32));
  await page.locator('#organizerHandoffFile').setInputFiles({ name: 'handoff.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(pkg)) });
  await page.locator('[data-section="records"]').click();
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
  await page.locator('[data-section="records"]').click();
  await page.locator('#ledger').getByText('ELR-DEMO-001').waitFor();
  await page.locator('[data-section="player"]').click();
  await page.locator('#playerEntry').selectOption('TEN-DEMO-001');
  await page.locator('#playerAlias').fill('DEMO-PLAYER-TEST-10');
  await page.locator('#playerShirt').fill('10');
  await page.locator('#playerRosterState').selectOption('Pending registration');
  await page.locator('#playerForm button[type="submit"]').click();
  assert.match(await page.locator('#playerMessage').textContent(), /Created synthetic player/);
  await page.locator('#playerEntry').selectOption('TEN-DEMO-001');
  await page.locator('#playerAlias').fill('DEMO-PLAYER-TEST-11');
  await page.locator('#playerShirt').fill('10');
  await page.locator('#playerForm button[type="submit"]').click();
  assert.match(await page.locator('#playerMessage').textContent(), /already assigned within this team entry/);
  await page.locator('[data-section="stats"]').click();
  await page.locator('#statFixture').selectOption('FIX-DEMO-001');
  await page.locator('#statPlayer').selectOption('PAR-DEMO-003');
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

  // Percentage and minutes limits must be enforced by their declared units.
  await page.locator('#statMetric').selectOption('Pass completion|percent');
  await page.locator('#statValue').fill('101');
  await page.locator('#statsForm button[type="submit"]').click();
  assert.match(await page.locator('#statsMessage').textContent(), /between 0 and 100/);
  assert.equal(await page.locator('#statsTable tbody tr').count(), beforeInvalidCount,
    'out-of-range percentage must not create a statistic');
  await page.locator('#statMetric').selectOption('Minutes played|minutes');
  await page.locator('#statValue').fill('151');
  await page.locator('#statsForm button[type="submit"]').click();
  assert.match(await page.locator('#statsMessage').textContent(), /no greater than 150/);
  assert.equal(await page.locator('#statsTable tbody tr').count(), beforeInvalidCount,
    'out-of-range minutes must not create a statistic');

  // A valid whole-number count is accepted and remains linked to the selected fixture and participation.
  await page.locator('#statFixture').selectOption('FIX-DEMO-001');
  await page.locator('#statPlayer').selectOption('PAR-DEMO-001');
  await page.locator('#statMetric').selectOption({ label: 'Goals · count' });
  await page.locator('#statValue').fill('2');
  await page.locator('#statsForm button[type="submit"]').click();
  assert.match(await page.locator('#statsMessage').textContent(), /Recorded STA-/);
  assert.deepEqual(errors, []);
  assert.deepEqual(consoleErrors, []);
  } finally {
    await browser.close();
  }
});
