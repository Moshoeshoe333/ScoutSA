# Engineering Lessons Ledger

**Status:** Active, cross-project engineering control  
**Project origin:** ScoutSA  
**Started:** 2026-11-17  
**Purpose:** Convert defects, near misses, failed assumptions and audit findings into reusable controls so that the same class of failure becomes harder to repeat.

> We do not promise error-free software. We make errors observable, containable, reproducible and less repeatable. A lesson is not complete until it changes a control, a test, a review practice or an explicit risk decision.

## 1. Operating rule

Every material mistake—small or large—must be treated as an engineering learning event, not merely patched and forgotten.

For each event:
1. **Detect and contain:** stop relying on the affected claim or behavior; protect users and downstream records.
2. **Preserve evidence:** record the exact branch, commit, failing test/run, source location, inputs and observed result. Never rewrite a failed run as a pass.
3. **Reproduce:** reduce the failure to a repeatable case where practical.
4. **Find the cause:** distinguish symptom, trigger, root cause and contributing conditions.
5. **Correct:** change the smallest responsible implementation or documentation surface without bypassing a governing decision.
6. **Prevent and detect:** add a preventive guard and a regression/detection test where practical.
7. **Verify:** run the relevant local and hosted checks against the exact resulting commit; read changed files back.
8. **Record residual risk:** state what remains untested, unsupported or dependent on external authority.
9. **Transfer:** ask whether the same failure mode exists in other modules or projects; reuse the control only where the context fits.

A code change without a regression check is an incomplete correction when a repeatable check is practical. A test without an observed run is a test declaration, not verification. A passing synthetic test is not proof of real-world safety or correctness.

## 2. Minimum lesson record

Every entry must include:
- **Failure mode:** what went wrong or could plausibly go wrong.
- **Observed evidence:** exact source, test, commit, run or audit observation; distinguish observed defect from preventive concern.
- **Root cause:** why the system allowed it; use “not established” rather than guessing.
- **Preventive control:** design, code, documentation, process or policy that reduces recurrence.
- **Detective control:** test, alert, review or reconciliation that detects recurrence.
- **Regression / verification:** exact test artifact and observed result, or clearly mark pending/not yet run.
- **Residual risk:** what the control does not cover.
- **Status:** open, mitigated, verified for scope, superseded or accepted risk—with reason.

IDs are permanent. Do not delete failed lessons; append a superseding entry and retain history.

## 3. Reusable cross-project control loop

Apply this loop to ScoutSA and other projects, adapting controls to the project's actual risk and architecture:

| Stage | Required question | Minimum artifact |
|---|---|---|
| Capture | What happened, where, and on which exact revision? | Incident / lesson ID |
| Explain | What was the root cause, and what is still uncertain? | Evidence-backed cause statement |
| Contain | What claim, workflow or data must not be relied on meanwhile? | Stop line / fail-closed behavior |
| Prevent | What makes recurrence less likely? | Guard, invariant, validation, ownership rule or checklist |
| Detect | What proves the guard still works? | Regression test / monitoring / review |
| Verify | Did the exact changed revision pass the intended checks? | Run URL, commit SHA, scope and result |
| Learn | Where else could this failure mode occur? | Cross-project transfer note |
| Reassess | What residual risk remains? | Explicit status and next action |

**Transfer rule:** copy the failure pattern and control idea, not another project's assumptions, domain rules, identifiers, legal conclusions or data model. Re-evaluate applicability before adoption.

## 4. ScoutSA lessons

### LESSON-001 — Documentation inventory and CI path coverage drift

- **Failure mode:** A document or code change is omitted from the discoverable project index, or a relevant change does not trigger the expected workflow.
- **Observed evidence:** The 17 November session ledger records five missing prototype README links and asymmetric push/pull-request path filters. Workflow runs 44091221023 and 44091232808 failed documentation assertions; browser stages were skipped after the Node step failed.
- **Root cause:** Documentation links and workflow path coverage were maintained manually without a complete automated cross-check.
- **Preventive control:** Keep push and pull-request path filters symmetric; index every material artifact; use one authoritative inventory and avoid silently duplicating status claims.
- **Detective control:** Documentation-integrity tests assert required links and workflow files; CI runs for root README, docs, prototype and workflow changes.
- **Regression / verification:** Existing `prototype/tests/documentation-integrity.test.js` and `.github/workflows/prototype-policy-tests.yml`; DOC-007 correction is recorded in `prototype/verification/SESSION-LEDGER-2026-11-17.md`. Exact-head hosted verification remains separately required.
- **Residual risk:** Automated link checks do not prove that descriptions are semantically accurate or that every new artifact was correctly classified.
- **Status:** Mitigated; exact-head workflow verification is still required for the current branch revision.

### LESSON-002 — Historical CI evidence mistaken for current verification

- **Failure mode:** A prior green run is used to imply that later commits are verified.
- **Observed evidence:** The 17 November ledger explicitly separates historical successful runs from the unverified latest branch head; run 44101410372 was still in progress during this audit.
- **Root cause:** Status summaries can outlive the commit and test scope they describe.
- **Preventive control:** Every verification claim must name the exact commit SHA, workflow run, branch, test scope and known exclusions. Historical runs must be labelled historical.
- **Detective control:** Before declaring green, fetch the current branch head and workflow/job result; compare run head SHA to branch head SHA; confirm all required steps completed and none were skipped.
- **Regression / verification:** Existing session-ledger stop line and the current workflow. This entry does not claim run 44101410372 completed successfully.
- **Residual risk:** A green automated run covers only the tests it actually executes and cannot prove untested requirements.
- **Status:** Control defined; exact-head verification remains mandatory for every release or status claim.

### LESSON-003 — Cross-workspace foreign or inconsistent references

- **Failure mode:** A record points to an existing entity that belongs to the wrong player, organization or opportunity owner.
- **Observed evidence:** UI-007 recorded missing membership references, a coach workspace listing another organization's opportunity, and a request borrowing a membership belonging to another player. A later extension added the explicit request-organization/opportunity-owner equality check.
- **Root cause:** Existence checks were performed without consistently checking ownership and relationship semantics.
- **Preventive control:** Validate both reference existence and relationship ownership at the same boundary; keep opaque identifiers distinct from internal primary keys.
- **Detective control:** `prototype/tests/workspace-data-integrity.test.js` checks referential integrity and ownership equality; handoff filters fail closed on incomplete or mismatched references.
- **Regression / verification:** UI-007 and its extension are recorded in `docs/engineering-integrity.md`; do not infer that a later assertion passed without its exact hosted result.
- **Residual risk:** Synthetic fixture consistency does not establish real-world identity, authority, affiliation or authorization.
- **Status:** Mitigated for the checked synthetic relationships; broader relationship domains need their own invariants.

### LESSON-004 — Dynamic content rendered into HTML without complete context safety

- **Failure mode:** Fixture-derived or future untrusted values are interpolated into HTML without escaping appropriate to the output context.
- **Observed evidence:** UI-008 identified dynamic HTML-string interpolation sinks across prototype workspaces. No external-input exploit was established; this was a preventive finding.
- **Root cause:** Rendering safety depended on local helper discipline and incomplete sink inventory.
- **Preventive control:** Keep untrusted content out of HTML-string construction where possible; use context-appropriate DOM APIs or escaping; review text, attribute and URL contexts separately.
- **Detective control:** Hostile-markup regression cases at actual render sinks, nullish-input tests, URL-scheme checks and a maintained sink inventory.
- **Regression / verification:** UI-008 browser checks cover identified helpers and selected render sinks; the UI-008 audit remains OPEN.
- **Residual risk:** Helper tests cannot prove every interpolation was found or that HTML, attribute and URL contexts are all safe.
- **Status:** Partially mitigated; do not connect external or user-supplied content while UI-008 remains open.

### LESSON-005 — Browser-only defects escaped source-level review

- **Failure mode:** A page appears structurally correct but fails in actual navigation, responsive layout or event handling.
- **Observed evidence:** UI-005 found a mobile workspace-grid overflow, use of a single-element selector where a collection selector was required, and an unwired hub action. Playwright runs exposed the failures before the scoped browser checkpoint passed.
- **Root cause:** Static inspection and headless tests did not exercise the complete rendered interaction path.
- **Preventive control:** Add browser tests for primary journeys, navigation, viewport constraints and user actions whenever a UI surface changes.
- **Detective control:** Playwright/Chromium smoke suites capture page errors, console errors, expected navigation and mobile overflow.
- **Regression / verification:** UI-005 records failed diagnostic runs and final scoped run 43420141388; current ten-suite workflow is broader.
- **Residual risk:** Smoke tests cover representative paths, not exhaustive usability, accessibility, security or device compatibility.
- **Status:** Mitigated for the tested journeys; continue adding regression cases when new UI paths are introduced.

### LESSON-006 — Fixture, operational session and played-match grain can be conflated

- **Failure mode:** One fixture is treated as exactly one match-day session or played attempt, preventing accurate representation of postponement, resumed play, replay or multiple match attempts.
- **Observed evidence:** Tournament Day Operations keeps one session record per fixture in its synthetic in-memory state; the v1 handoff exports one `matchDay` or null and is fixture-scoped. TAD-005/006 crosswalks identify the unresolved lifecycle and multiplicity questions.
- **Root cause:** The prototype's first version deliberately uses a simplified fixture-level grain; the wider competition lifecycle has not been ratified.
- **Preventive control:** Preserve separate concepts for fixture, schedule revision, operational session, played match instance/attempt, period and competition decision. Do not add uniqueness or cardinality rules until the governing competition context is known.
- **Detective control:** Adversarial TAD-005/006 scenario matrices; browser tests for the supported v1 boundary; decision-register dependency checks.
- **Regression / verification:** `TAD-005-FIXTURE-LIFECYCLE-ADVERSARIAL-TEST-MATRIX.md`, `MATCH-PARTICIPATION-MATCH-DAY-MULTIPLICITY-CROSSWALK.md` and `tournament-day-operations.browser-smoke.cjs`. These document and test scoped behavior; they do not implement multi-attempt support.
- **Residual risk:** Replay, resumption, extra time, shoot-outs and local competition rules remain unsupported or unresolved.
- **Status:** Known limitation recorded; TAD-005 and TAD-006 remain OPEN. No schema or production implementation authorized.

### LESSON-007 — Derived appearance minutes can hide interval and chronology complexity

- **Failure mode:** A single lineup/substitution calculation is treated as complete player appearance history despite multiple stints, return substitutions, multiple attempts or contradictory event timing.
- **Observed evidence:** The current v1 logic derives one interval from lineup and at most one substitution involvement. The browser smoke case deliberately records an event at minute 67 for a player whose derived substitution-out minute is 65; Player Tournament History preserves a chronology warning rather than silently rewriting the observation.
- **Root cause:** The current model uses a simplified fixture-level, single-clock representation.
- **Preventive control:** Keep raw event observations separate from derived appearance intervals. Future multi-stint support requires interval-level records, match-instance identity and a competition-specific rule context; do not silently discard contradictory evidence.
- **Detective control:** Test duration boundaries, substitution boundaries, event-after-appearance chronology, derived-minute reconciliation and rejected handoff preservation.
- **Regression / verification:** `prototype/tests/tournament-day-operations.browser-smoke.cjs` checks 65/90/25-minute derivations, out-of-range rejection, chronology warning, tampered appearance rejection and preservation of the prior history view.
- **Residual risk:** Integer minutes do not model period-relative time, stoppage-time notation, clock resets or authoritative adjudication; multiple appearance intervals are not implemented.
- **Status:** Scoped v1 behavior tested; expanded appearance model deferred to TAD-006 and related decisions.

### LESSON-008 — Provenance linkage is not proof of source authority

- **Failure mode:** A record with a source ID or a source label is described as verified, official or authoritative.
- **Observed evidence:** Tournament Day Operations creates synthetic source records and links events, substitutions and reports to them; the interface labels those records reported/unverified and the handoff states authenticity and authority are not established.
- **Root cause:** Referential provenance can be mistaken for source authenticity or decision authority.
- **Preventive control:** Model source existence, source identity, authenticity, authority, scope, review state and competition decision as distinct facts. Keep synthetic and unverified labels visible.
- **Detective control:** Handoff validation checks source links; documentation and browser tests assert synthetic-only boundaries; reconciliation keeps disputed and unmatched observations visible.
- **Regression / verification:** Tournament Day Operations handoff and statistic reconciliation browser smoke tests; source-link validation is not an authenticity check.
- **Residual risk:** No real source authentication, official appointment verification or competition-authority integration exists.
- **Status:** Boundary explicit in the prototype; production verification remains unimplemented and unauthorized.

### LESSON-009 — Passing tests can create confidence beyond their scope

- **Failure mode:** A passing unit or browser suite is treated as proof of untested behavior, policy correctness or production readiness.
- **Observed evidence:** Existing workflow suites cover declared test cases and selected journeys only; tournament crosswalks identify cases outside the current implementation.
- **Root cause:** Test results are easy to summarize without preserving coverage boundaries and residual risk.
- **Preventive control:** Every test and verification record states what it proves, what it does not prove, exact revision and remaining risks.
- **Detective control:** Review test names and assertions against requirements and adversarial cases; require explicit evidence for each release claim.
- **Regression / verification:** This ledger, the engineering-integrity protocol and current workflow's exact-head stop line.
- **Residual risk:** Unknown unknowns remain; tests cannot establish absence of all defects.
- **Status:** Active standing control.

## 5. Review and change rules

- Add a lesson after every material incident, near miss, audit finding or repeated manual correction.
- Update an existing entry only to clarify facts; preserve prior status and evidence in history. Prefer a new linked entry when the lesson materially changes.
- Never mark a lesson “verified” because a fix was committed. Verification requires observed test evidence on the exact resulting revision.
- If a proposed preventive change depends on unresolved domain, legal, safeguarding or external authority, record the gap and keep the implementation blocked.
- Review the ledger at each milestone and before transferring a control to another project.
- Do not optimize for a large number of tests. Optimize for tests that fail when an important invariant is broken.

## 6. Reusable entry template

Copy this template into the relevant project's ledger and assign a permanent project-local ID:

```markdown
### LESSON-XXX — Short failure pattern

- **Failure mode:** 
- **Observed evidence:** 
- **Root cause:** 
- **Preventive control:** 
- **Detective control:** 
- **Regression / verification:** 
- **Residual risk:** 
- **Status:** OPEN / MITIGATED / VERIFIED FOR SCOPE / SUPERSEDED / ACCEPTED RISK
```

**Review cadence:** after incidents and material audits; at each milestone; and before claiming a control is complete.


### LESSON-010 — Form-to-handoff field loss and boundary validation gaps

- **Failure mode:** A visible form field is accepted by the UI but omitted from the in-memory record or export contract; the receiving boundary then cannot recover the original value.
- **Observed evidence:** Organizer Portal baseline `ae354b20121e52f7ce1ee898b5fe89048c1b56a5` exposed start date, end date and summary inputs, while its submit handler persisted none of them. The importer accepted optional date values without ISO-calendar or chronological validation.
- **Root cause:** The form handler, record shape, export payload, importer mapping and browser tests were reviewed as separate pieces rather than one end-to-end data lineage.
- **Preventive control:** For each material field, trace input → validation → state record → export → import → destination state. Define optionality and format at both sender and receiver. Keep a positive round-trip test and a negative no-mutation test.
- **Detective control:** Browser tests assert exact field values after export/import, reject impossible or reversed dates, and assert rejected operations leave counts/state unchanged.
- **Regression / verification:** Hosted run [44299389829](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44299389829), exact commit `06204ac049ce21df6f22575d38202203c9ccec14`, passed the expanded Organizer Portal and Tournament Manager browser tests, including exact date/summary round-trip and invalid-date rejection.
- **Residual risk:** A client-side synthetic round-trip does not prove API/database consistency, persistence, authorization or event authenticity.
- **Status:** Verified for the tested synthetic prototype scope; production integration remains unauthorized.


### LESSON-011 — Browser-test cleanup must survive assertion failure

- **Failure mode:** A browser smoke test closes Chromium only after all assertions succeed; a failed assertion can leave the child browser process alive and mask the real failure as a stalled CI step.
- **Observed evidence:** During hosted run 44298372417, the Organizer Portal browser step remained in progress after prior suites completed. Source review confirmed no `try/finally` around browser cleanup. The exact assertion that stalled the run is not established because the in-progress job logs were unavailable.
- **Root cause:** Resource lifecycle was coupled to the happy path rather than guaranteed independently of test outcome.
- **Preventive control:** Put browser/server/process cleanup in `finally` blocks; use equivalent cleanup for every browser smoke script that owns external resources.
- **Detective control:** Review smoke-test teardown paths and ensure a deliberate assertion failure still terminates the test process.
- **Regression / verification:** The cleanup change is included in exact prototype head `17f69f4da691bb68a3818f5071f23b49f8963657`. Hosted run [44299838840](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44299838840) passed all 121 headless tests and completed all ten browser smoke scripts, including Organizer Portal. The earlier exact correction checkpoint is [run #679](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44299389829); run #680 is the later full-workflow rerun.
- **Residual risk:** The cleanup path has been exercised on successful teardown only. A deliberately injected assertion failure has not yet demonstrated that Chromium cleanup completes while preserving the original assertion error. The original stall's precise trigger remains unknown.
- **Status:** Mitigated and hosted-success-path verified for the Organizer Portal smoke test; failure-path fault injection remains OPEN.


### LESSON-012 — Responsive checks must traverse every navigable section

- **Failure mode:** A multi-section page is declared mobile-safe because one active section fits, while another section exposes a wide table or content descendant and expands the document.
- **Observed evidence:** Organizer Portal run 44298986431 measured a 696px document at a 390px viewport when the Organizer Registry section was active; the earlier test measured only the Ledger section.
- **Root cause:** Responsive assertions were coupled to one test-end navigation state rather than the page's full navigable state space.
- **Preventive control:** Iterate through each navigation section at representative narrow widths; use shrinkable grid tracks/panels and contained horizontal table scrolling.
- **Detective control:** Assert document scroll width after each navigation transition and include element-level bounds, width and overflow diagnostics.
- **Regression / verification:** Hosted run [44299389829](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/44299389829), exact commit `06204ac049ce21df6f22575d38202203c9ccec14`, passed the section-by-section 390px Organizer Portal check after the CSS correction.
- **Residual risk:** A single viewport and browser engine do not establish universal responsive conformance.
- **Status:** Verified for the tested 390px Chromium path; broader device coverage remains open.
