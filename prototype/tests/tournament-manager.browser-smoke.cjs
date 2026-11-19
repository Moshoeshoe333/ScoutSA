const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs');

test('tournament manager imports organizer portal package by stable IDs and skips duplicates', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const errors = [];
  const consoleErrors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  await page.goto('file://' + path.resolve('prototype/tournament-manager.html') + '?testMode=1');
  const pkg = {
    contractVersion: '1.0',
    sourceSystem: 'scoutsa-organizer-portal',
    organizers: [{ id: 'ORG-DEMO-501', name: 'DEMO-Test-Organizer', type: 'Community organization', identity: 'verified', authority: 'approved' }],
    submissions: [{ id: 'SUB-DEMO-501', tournamentId: 'TRN-ORG-DEMO-501', editionId: 'EDT-ORG-DEMO-501', organizerId: 'ORG-DEMO-501', name: 'DEMO-Test-Cup', edition: 'DEMO-2027-Edition', locality: 'DEMO-Sedibeng', format: '11-a-side', start: '2027-06-01', end: '2027-06-03', summary: 'DEMO imported competition summary.', status: 'pending-review' }],
    evidence: [{ id: 'EVD-DEMO-501', organizerId: 'ORG-DEMO-501', type: 'Public institutional reference', ref: 'DEMO-EVIDENCE-501', status: 'expired' }],
    features: [{ id: 'FTR-DEMO-501', submissionId: 'SUB-DEMO-501', scope: 'Competition name, dates and public event summary', status: 'granted' }]
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
  await page.waitForFunction(() => /Import committed\. Editions: \+1/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
  assert.match(await page.locator('#organizerImportMessage').textContent(), /Import committed\. Editions: \+1/);
  assert.match(await page.locator('#organizerImportMessage').textContent(), /organizers: \+1 \/ skipped 0; submissions: \+1 \/ skipped 0; evidence: \+1 \/ skipped 0; features: \+1 \/ skipped 0/, 'import summary must disclose every source collection');
  assert.equal(await page.locator('#countT').textContent(), '2');
  const sessionDownloadWait = page.waitForEvent('download');
  await page.locator('#exportButton').click();
  const sessionDownload = await sessionDownloadWait;
  const sessionData = JSON.parse(fs.readFileSync(await sessionDownload.path(), 'utf8'));
  const imported = sessionData.events.find(event => event.editionId === 'EDT-ORG-DEMO-501');
  assert.ok(imported, 'imported edition must be present in exported session state');
  assert.equal(imported.start, '2027-06-01', 'importer must preserve start date');
  assert.equal(imported.end, '2027-06-03', 'importer must preserve end date');
  assert.equal(imported.summary, 'DEMO imported competition summary.', 'importer must preserve summary');
  assert.equal(imported.format, '11-a-side', 'importer must preserve competition format');
  assert.equal(imported.editionLabel, 'DEMO-2027-Edition', 'importer must preserve the edition label');
  assert.equal(imported.organizerIdentityState, 'unverified', 'untrusted imported identity claims must not elevate the operational state');
  assert.equal(imported.authority, 'unverified', 'untrusted imported authority claims must fail closed');
  assert.equal(imported.feature, 'not-requested', 'an imported feature claim must not become operational permission');
  assert.equal(imported.organizerIdentityClaim, 'verified', 'source identity claim must remain traceable');
  assert.equal(imported.organizerAuthorityClaim, 'approved', 'source authority claim must remain traceable');
  assert.equal(imported.featurePermissionClaim, 'granted', 'source feature-permission claim must remain traceable');
  assert.deepEqual(sessionData.organizerSourceClaims, pkg.organizers, 'complete organizer source records must survive import');
  assert.deepEqual(sessionData.organizerEvidenceClaims, pkg.evidence, 'evidence records, including expired status claims, must survive import');
  assert.deepEqual(sessionData.organizerFeaturePermissionClaims, pkg.features, 'feature permission source records must survive import');
  const exportSessionState = async () => page.evaluate(() => {
    if (typeof window.__SCOUTSA_TEST_SNAPSHOT__ !== 'function') throw new Error('Test-only state snapshot is unavailable');
    return window.__SCOUTSA_TEST_SNAPSHOT__();
  });
  assert.deepEqual(sessionData.organizerSubmissionClaims, pkg.submissions, 'complete submission source records must survive import');
  // Property order is not a semantic claim change; canonical comparison must accept replay.
  const reorderedOrganizer = Object.fromEntries(Object.entries(pkg.organizers[0]).reverse());
  const reorderedPackage = { ...pkg, organizers: [reorderedOrganizer] };
  await page.locator('#organizerHandoffFile').setInputFiles({ name: 'property-order-replay.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(reorderedPackage)) });
  await page.locator('#importOrganizerHandoff').click();
  await page.waitForFunction(() => /organizers: \+0 \/ skipped 1/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 5000 });
  assert.match(await page.locator('#organizerImportMessage').textContent(), /organizers: \+0 \/ skipped 1/);

  // OPA-013: a duplicate edition may still add a new side-collection claim; report it.
  const sideCollectionPackage = { ...pkg, evidence: [...pkg.evidence, { id: 'EVD-DEMO-502', organizerId: 'ORG-DEMO-501', type: 'Venue authorization', ref: 'DEMO-EVIDENCE-502', status: 'pending' }] };
  await page.locator('#organizerHandoffFile').setInputFiles({ name: 'side-collection-only.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(sideCollectionPackage)) });
  await page.locator('#importOrganizerHandoff').click();
  try {
    await page.waitForFunction(() => /evidence: \+1 \/ skipped 1/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
  } catch (error) {
    const diagnostic = await page.evaluate(() => ({
      message: document.querySelector('#organizerImportMessage')?.textContent || null,
      evidenceClaims: window.__SCOUTSA_TEST_SNAPSHOT__?.().organizerEvidenceClaims || null,
      pageTitle: document.title
    }));
    assert.fail(`Side-collection import did not report evidence addition. State=${JSON.stringify(diagnostic)}; pageErrors=${JSON.stringify(errors)}; consoleErrors=${JSON.stringify(consoleErrors)}; cause=${error.message}`);
  }
  assert.match(await page.locator('#organizerImportMessage').textContent(), /Editions: \+0 \/ skipped 1/);
  assert.match(await page.locator('#organizerImportMessage').textContent(), /evidence: \+1 \/ skipped 1/);
  assert.equal((await exportSessionState()).organizerEvidenceClaims.length, 2);

  // OPA-014: a post-commit rendering failure is not an import rejection.
  const refreshFailurePackage = {
    ...pkg,
    organizers: [{ id: 'ORG-DEMO-503', name: 'DEMO-Refresh-Failure-Organizer', type: 'Community organization', identity: 'unverified', authority: 'unverified' }],
    submissions: [{ id: 'SUB-DEMO-503', tournamentId: 'TRN-ORG-DEMO-503', editionId: 'EDT-ORG-DEMO-503', organizerId: 'ORG-DEMO-503', name: 'DEMO-Refresh-Failure-Cup', edition: 'DEMO-2028-Edition', locality: 'DEMO-Sedibeng', format: '11-a-side', status: 'pending-review' }],
    evidence: [], features: []
  };
  await page.evaluate(() => window.__SCOUTSA_TEST_FAIL_NEXT_REFRESH__());
  await page.locator('#organizerHandoffFile').setInputFiles({ name: 'refresh-failure.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(refreshFailurePackage)) });
  await page.locator('#importOrganizerHandoff').click();
  await page.waitForFunction(() => /^Import committed, but the view did not refresh/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
  assert.ok((await exportSessionState()).events.some(event => event.editionId === 'EDT-ORG-DEMO-503'));
  assert.doesNotMatch(await page.locator('#organizerImportMessage').textContent(), /Import rejected/);

  await page.locator('#importOrganizerHandoff').click();
  await page.waitForFunction(() => /Import committed\. Editions: \+0 \/ skipped 1/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
  assert.match(await page.locator('#organizerImportMessage').textContent(), /Import committed\. Editions: \+0 \/ skipped 1/);
  const assertRejectedImport = async (name, payload) => {
    const beforeState = await exportSessionState();
    const before = await page.locator('#countT').textContent();
    const buffer = Buffer.isBuffer(payload) ? payload : Buffer.from(typeof payload === 'string' ? payload : JSON.stringify(payload));
    await page.locator('#organizerHandoffFile').setInputFiles({ name, mimeType: 'application/json', buffer });
    await page.locator('#importOrganizerHandoff').click();
    await page.waitForFunction(() => /^Import rejected before commit:/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
    assert.equal(await page.locator('#countT').textContent(), before, name + ' must not change the tournament count');
    const afterState = await exportSessionState();
    assert.deepEqual(afterState, beforeState, name + ' must leave the complete exported session state unchanged');
  };
  await page.evaluate(() => window.__SCOUTSA_TEST_SET_OPERATIONAL_DECISION__('EDT-ORG-DEMO-501', { authority: 'human-decision-preserved-demo', feature: 'withdrawn' }));
  await page.locator('#organizerHandoffFile').setInputFiles({ name: 'handoff.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(pkg)) });
  await page.locator('#importOrganizerHandoff').click();
  await page.waitForFunction(() => /Import committed\. Editions: \+0 \/ skipped 1/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
  const preservedDecision = (await exportSessionState()).events.find(event => event.editionId === 'EDT-ORG-DEMO-501');
  assert.equal(preservedDecision.authority, 'human-decision-preserved-demo', 'duplicate source import must not overwrite an existing human authority decision');
  assert.equal(preservedDecision.feature, 'withdrawn', 'duplicate source import must not restore a withdrawn operational permission');
  await assertRejectedImport('altered-duplicate-content.json', { ...pkg, submissions: [{ ...pkg.submissions[0], summary: 'DEMO-altered-summary' }] });
  await assertRejectedImport('reused-submission-id-new-edition.json', { ...pkg, submissions: [{ ...pkg.submissions[0], tournamentId: 'TRN-ORG-DEMO-599', editionId: 'EDT-ORG-DEMO-599' }] });
  const collisionPage = await browser.newPage();
  try {
    await collisionPage.goto('file://' + path.resolve('prototype/tournament-manager.html') + '?testMode=1');
    await collisionPage.locator('[data-section="records"]').click();
    const beforeCollision = await collisionPage.evaluate(() => window.__SCOUTSA_TEST_SNAPSHOT__());
    const collisionPackage = {
      contractVersion: '1.0',
      sourceSystem: 'scoutsa-organizer-portal',
      organizers: [{ id: 'ORG-DEMO-001', name: 'DEMO-Conflicting-Organizer', type: 'Community organization', identity: 'unverified', authority: 'unverified' }],
      submissions: [{ id: 'SUB-DEMO-001', tournamentId: 'TRN-DEMO-001', editionId: 'EDT-DEMO-001', organizerId: 'ORG-DEMO-001', name: 'DEMO-Conflicting-Cup', edition: 'DEMO-2026-Edition', locality: 'DEMO-Sedibeng', format: '11-a-side', status: 'pending-review' }],
      evidence: [],
      features: []
    };
    await collisionPage.locator('#organizerHandoffFile').setInputFiles({ name: 'existing-edition-conflict.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(collisionPackage)) });
    await collisionPage.locator('#importOrganizerHandoff').click();
    await collisionPage.waitForFunction(() => /^Import rejected before commit:/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
    const afterCollision = await collisionPage.evaluate(() => window.__SCOUTSA_TEST_SNAPSHOT__());
    assert.deepEqual(afterCollision, beforeCollision, 'an existing edition without a matching source submission must not be silently treated as an exact duplicate');
  } finally {
    await collisionPage.close();
  }

  // OPA-015: deterministic importer metadata is part of duplicate identity.
  const metadataPage = await browser.newPage();
  try {
    await metadataPage.goto('file://' + path.resolve('prototype/tournament-manager.html') + '?testMode=1');
    const beforePackage = Buffer.from(JSON.stringify(pkg));
    await metadataPage.locator('#organizerHandoffFile').setInputFiles({ name: 'metadata-baseline.json', mimeType: 'application/json', buffer: beforePackage });
    await metadataPage.locator('#importOrganizerHandoff').click();
    await metadataPage.waitForFunction(() => /Import committed/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
    const beforeCorrupt = await metadataPage.evaluate(() => window.__SCOUTSA_TEST_SNAPSHOT__());
    await metadataPage.evaluate(() => window.__SCOUTSA_TEST_CORRUPT_IMPORT_METADATA__('EDT-ORG-DEMO-501', 'venueId', 'VEN-CORRUPTED'));
    const corruptedState = await metadataPage.evaluate(() => window.__SCOUTSA_TEST_SNAPSHOT__());
    await metadataPage.locator('#organizerHandoffFile').setInputFiles({ name: 'metadata-replay.json', mimeType: 'application/json', buffer: beforePackage });
    await metadataPage.locator('#importOrganizerHandoff').click();
    await metadataPage.waitForFunction(() => /^Import rejected before commit:/.test(document.querySelector('#organizerImportMessage')?.textContent || ''), null, { timeout: 3000 });
    assert.deepEqual(await metadataPage.evaluate(() => window.__SCOUTSA_TEST_SNAPSHOT__()), corruptedState, 'replay must reject corrupted deterministic venue metadata without mutation');
    assert.notDeepEqual(corruptedState, beforeCorrupt, 'the deliberate corruption must be present in the test fixture');
  } finally {
    await metadataPage.close();
  }
  await assertRejectedImport('malformed.json', '{not-json');
  await assertRejectedImport('null-record.json', { ...pkg, organizers: [null] });
  const incompleteOrganizer = { ...pkg.organizers[0] }; delete incompleteOrganizer.type;
  await assertRejectedImport('incomplete-organizer.json', { ...pkg, organizers: [incompleteOrganizer] });
  const duplicateEvidenceRef = { ...pkg.evidence[0], id: 'EVD-DEMO-502' };
  await assertRejectedImport('duplicate-evidence-reference.json', { ...pkg, evidence: [...pkg.evidence, duplicateEvidenceRef] });
  await assertRejectedImport('missing-feature-link.json', { ...pkg, features: [{ id: 'FTR-DEMO-502', submissionId: 'SUB-DEMO-MISSING', scope: 'DEMO-SCOPE', status: 'requested' }] });
  await assertRejectedImport('edition-collision.json', { ...pkg, submissions: [{ ...pkg.submissions[0], id: 'SUB-DEMO-502', tournamentId: 'TRN-ORG-DEMO-999' }] });
  await assertRejectedImport('oversized.json', Buffer.alloc(1024 * 1024 + 1, 32));
  await assertRejectedImport('invalid-date-order.json', { ...pkg, submissions: [{ ...pkg.submissions[0], id: 'SUB-DEMO-503', tournamentId: 'TRN-ORG-DEMO-503', editionId: 'EDT-ORG-DEMO-503', start: '2027-06-10', end: '2027-06-09' }] });
  await assertRejectedImport('invalid-date-format.json', { ...pkg, submissions: [{ ...pkg.submissions[0], id: 'SUB-DEMO-504', tournamentId: 'TRN-ORG-DEMO-504', editionId: 'EDT-ORG-DEMO-504', start: '2027-02-30' }] });
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
