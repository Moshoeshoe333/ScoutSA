# UI-008 — Navigation, file handoff and export review

**Review date:** 20 November 2026  
**Repository:** `Moshoeshoe333/ScoutSA`  
**Branch:** `prototype/internal-demo`  
**Source/test snapshot:** `196014529c9866f9ed16db0fe10ec8db9dfb7fae`  
**Scope:** Internal navigation, external research links, preview sharing, local JSON exports and local JSON imports.  
**Status:** Bounded source review and regression checks completed; UI-008 remains **OPEN**.

## 1. Question and limits

This review asks whether the prototype's navigation and file-transfer paths:
- derive destinations from arbitrary fixture/user input;
- apply URL scheme and attribute controls where external destinations are used;
- move files to a server or only read/download locally;
- keep exports bounded to the intended synthetic records;
- validate imported packages before using their values; and
- expose any unresolved data-flow or provenance questions.

This is source review plus browser regression evidence on a synthetic prototype. It is not a network penetration test, production deployment review, domain reputation assessment, malware scan, authorization assessment, legal opinion or POPIA/safeguarding certification.

## 2. Findings summary

| ID | Observation | Current evidence | Disposition |
|---|---|---|---|
| NAV-01 | Internal handoffs use fixed relative page paths; identifiers are encoded and rendered as data. A query parameter does not grant access. | Source trace plus hostile URL/identifier browser tests. | No confirmed open redirect or executable scheme in the reviewed routes. Keep the no-authorization invariant explicit. |
| NAV-02 | Vaal research links accept absolute HTTPS URLs with a hostname and without embedded credentials; new browser coverage rejects JavaScript, HTTP, credential-bearing HTTPS and malformed values. | Source trace and hosted regression in run #839. | Scheme and credential controls observed. There is no host allowlist; URL safety does not establish source credibility. |
| NAV-03 | Player Preview shares the complete current page URL through a fixed WhatsApp origin and encodes the message. Its HTTPS gate is scheme-based, not a verified public-host/domain policy. | Source trace and local-host browser test. | No arbitrary destination supplied to `window.open`; query/fragment data would be included in the copied/shared URL. Avoid placing secrets or personal data in URLs. |
| XFER-01 | Day Operations exports one fixture-scoped synthetic handoff; Player Tournament History imports it locally and verifies linked records and recomputed appearances. | Export/import browser flow, tampered-appearance rejection and non-DEMO-ID rejection. | End-to-end path already covered; no duplicate importer test added. |
| XFER-02 | Organizer Portal exports its four source-claim collections locally. Tournament Manager imports with size, collection, ID and relationship checks, stages changes before commit and preserves source claims. | Browser tests read the exported JSON and verify imported state. | No server upload observed. Imported JSON is not cryptographically authenticated. |
| XFER-03 | Tournament Manager re-exports the entire in-memory session state, including imported source-claim collections. The importer preserves unrecognized properties in claim objects. | Source trace through `mergeClaims`, state commit and session export. | Open schema/data-minimisation policy question; not evidence of external disclosure. |
| XFER-04 | Statistic Reconciliation exports events, stats, derived findings and session-only review decisions. | New downloaded-payload assertions passed in run #839. | Expected synthetic export content verified. |

## 3. Navigation paths

### 3.1 Internal page handoffs

The reviewed handoffs are built from fixed relative paths:
- Discovery & Request Review constructs links to the Passport, opportunity register, evidence, decision, safeguarding and matching workspaces. The labels and `href` strings are escaped before insertion.
- Opportunity Register returns to a selected Passport using a fixed `./player-passport.html` path and an encoded player reference. Its matching-request link uses a fixed `./discovery-request.html` path with encoded player and opportunity identifiers.
- Player Passport uses a fixed `./opportunities.html` path and `encodeURIComponent` for the selected player identifier.

The handoff filter checks exact synthetic player/opportunity/request relationships before rendering a request. Browser tests challenge hostile identifiers, mismatched pairs, unknown players and `javascript:`/`data:` schemes. A URL parameter is a lookup hint only; it is not an authorization grant and must never become one.

**Assessment:** no reviewed internal handoff accepts an arbitrary external URL as its destination. The tested paths remain relative local prototype pages.

### 3.2 External Vaal research links

`vaal-ecosystem-coverage.html` parses each source URL with `new URL()` and accepts only `https:` URLs with a hostname and no username/password. It constructs anchors with:
- `target="_blank"`;
- `rel="noopener noreferrer"`;
- `referrerPolicy="no-referrer"`; and
- a fixed visible label rather than rendering the raw URL as HTML.

The current embedded fixture set contains 15 distinct URLs, all on `www.citizen.co.za`. That is a property of the current static data, not a host restriction in the validator. The validator would accept another well-formed HTTPS host if that host were supplied in the fixture.

Run #839 adds browser-level mutations for:
- `javascript:`;
- plain `http:`;
- credential-bearing HTTPS; and
- malformed URL text.

Each must render a non-clickable “Source unavailable” state. It also checks the protections on an accepted external link. All checks passed.

**Boundary:** this is a scheme/credential control, not a destination reputation or source-authenticity check. A valid HTTPS link can still point to a misleading, compromised or irrelevant page. Evidence credibility remains a separate research-ledger decision.

### 3.3 Player Preview sharing

The preview:
- reads `window.location.href`;
- enables copy/WhatsApp actions when the current protocol is HTTPS and the hostname is not `localhost` or `127.0.0.1`;
- copies that complete URL to the clipboard; and
- opens a fixed `https://wa.me/` destination with an `encodeURIComponent`-encoded message and `noopener,noreferrer`.

The message contains generic sample wording and the current URL, not a player record payload. The current browser smoke test verifies that share and copy remain disabled on the local HTTP test host.

**Open design limitation:** the gate checks protocol plus two hostnames; it does not verify that the host is publicly reachable or belongs to an approved ScoutSA domain. It also shares the complete URL, so any future query string or fragment is included. The present demo has no real player data or secret-bearing route token. Before live sharing, define approved origins/canonical URL construction and prohibit sensitive data in query strings or fragments.

## 4. Local export and import paths

### 4.1 Tournament Day Operations → Player Tournament History

**Export:** `tournament-day-operations.html` builds a fixture-specific package from records whose `fixtureId` matches the selected fixture. It validates match duration, appearance intervals, unique record IDs, source links, substitution relationships, team consistency, event-to-lineup links and event minute bounds. The package declares `SYNTHETIC_DEMO_ONLY` and includes explicit limitations stating that sources are not authenticated and events are not verified performance totals.

The export is a browser Blob downloaded under a fixed filename pattern. In the current prototype the fixture selector contains the fixed `FIX-DEMO-001` option.

**Import:** `player-tournament-history.html` reads the selected File locally with `file.text()`; files over 1,000,000 bytes are rejected. Validation checks the package format, schema version, self-declared data class, synthetic ID patterns, one-fixture scope, uniqueness, source relationships, substitutions and recomputed appearance values. Rendering uses DOM nodes and text values rather than injecting imported HTML. No server upload is present in this import handler.

The existing Day Operations browser test already exercises the full export/import loop. It verifies imported minutes and event relationships, rejects a tampered derived appearance, rejects a non-DEMO participation ID, and preserves the last valid imported view after rejection. This was already covered before this review; no duplicate importer test was added.

**Limitation:** the format/class/DEMO labels and relationship checks validate package shape, not cryptographic origin or the truth of the underlying source. The UI explicitly states that source authenticity is not verified.

### 4.2 Organizer Portal → Tournament Manager

**Export:** Organizer Portal creates a local JSON Blob containing `organizers`, `submissions`, `evidence` and `features`, plus contract/source metadata and a notice that these claims do not imply verification, publication, player/media permission or an opportunity. Its browser test reads the downloaded JSON and checks the expected submission/evidence/feature values.

**Import:** Tournament Manager reads the chosen file locally and rejects files over 1 MiB. The importer validates the contract/source identifiers, required arrays, a maximum of 250 records per collection, primary-ID uniqueness, required synthetic labels, date/relationship constraints and conflicts with existing IDs. It stages all collections and derived edition records before a synchronous state commit. The interface states that no external sync occurs and that organizer verification/publication states remain unchanged.

The import/export browser test checks the source claims survive, operational identity/authority/feature states remain unverified/not-requested, and conflicting imports are rejected. These checks passed in the hosted suite.

**Data-contract question — unrecognized properties:** the importer validates required properties but does not reject all unknown object keys. Its merge step shallow-copies complete claim objects into session state, and the session exporter serializes the entire `state` object. Consequently, an unrecognized property on an imported organizer/submission/evidence/feature claim can remain in session state and be included in a later session export, even though the UI does not render that property.

This is not evidence of a server-side leak: the inspected path is local file input followed by a user-triggered local download. It is a data-minimisation and schema-closure question. A future decision should choose between a strict versioned allowlist and a documented extension namespace, and define whether unrecognized fields should be rejected, retained or explicitly surfaced. No behaviour change is made here.

### 4.3 Tournament Manager session export

Manager exports `{ notice, ...state }` as a local JSON Blob under a fixed filename. It includes the current synthetic session records and imported source-claim collections. The browser test reads the downloaded file and confirms imported edition and source claims remain present.

The filename is fixed, the export action is user initiated, and the code does not send the Blob to a server. The whole-session scope is broader than the Organizer Portal's four-collection handoff; that is intentional in the current control surface but should remain clearly described to the operator.

### 4.4 Statistic Reconciliation export

Statistic Reconciliation exports:
- source events;
- statistical observations;
- derived findings; and
- session-only review decisions.

It uses a local JSON Blob and a fixed filename. The review action does not alter source event/stat records. Run #839 extends the browser test to read the actual downloaded JSON and verify the notice, three events, three stats, four findings and the reviewed finding's session decision.

No external destination or server upload is present in the export handler.

## 5. Cross-cutting conclusions

1. The reviewed download paths use local Blob URLs and user-initiated anchors. The file import paths use browser File APIs. No file upload or remote persistence was identified in these handlers.
2. Internal handoff destinations are fixed local paths; identifiers are encoded and exact-record filters remain in place. These controls do not replace authorization in any future service.
3. External research anchors are constrained to HTTPS without embedded credentials and carry opener/referrer protections. The current fixture URLs point to one news domain, but the validator has no host allowlist and does not prove source truth.
4. The share action uses a fixed WhatsApp origin, but it shares the full current URL. Query/fragment minimisation must be settled before live use.
5. JSON packages carry self-declared source/version/data-class labels, not cryptographic signatures. Consumers must not interpret a correctly shaped package as proof that its contents were produced by the named source module or independently verified.
6. Tournament Manager's unknown-property preservation is a local data-flow question. It deserves an explicit schema/retention decision before packages from parties outside the controlled prototype workflow are accepted.

**No confirmed open redirect, arbitrary navigation execution, remote file upload or server-side export path was identified in the reviewed flows.** This is a bounded source assessment, not a claim that every link or future data source has been audited.

## 6. Hosted verification

The current source/test head is `196014529c9866f9ed16db0fe10ec8db9dfb7fae`. Hosted workflow [#839](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44756872937) completed successfully on 20 November 2026 against that exact head:

- Node headless suite: **121/121 passed; 0 failed**.
- Discovery & Request Review browser groups: **8/8 passed**.
- Workspace-hub browser groups: **8/8 passed**.
- Configured browser smoke scripts: **11/11 invoked and completed successfully**.
- Specialist workspace interaction groups: **24/24 passed**.

The new Vaal URL-rendering regression and the Statistic Reconciliation downloaded-payload assertions both passed.

## 7. UI-008 status and next decision

UI-008 remains **OPEN**. This review adds evidence for navigation and local file movement, but it does not settle:
- whether Tournament Manager imports should reject or preserve unrecognized properties;
- which origins, if any, should be permitted for a live player-preview share URL;
- whether the Vaal research-source validator should remain scheme-based or adopt a host/source allowlist; or
- any production authentication, authorization, consent, retention, safeguarding or privacy controls.

Those are separate design/authority decisions. No application behaviour, schema, workflow, MVP boundary or gate status was changed by this review. No implementation or certification is claimed.
