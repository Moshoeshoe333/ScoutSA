# ScoutSA Gate Status — current note 2026-11-17

> This note is on `prototype/internal-demo`. It records the isolated prototype branch and does not alter or lift any mainline implementation hold.


> **17 November 2026 prototype integrity checkpoint:** The latest recorded tournament documentation workflow failures exposed five missing prototype README links; the same review found asymmetric push/pull-request path filters. The links have been restored and workflow coverage broadened on `prototype/internal-demo`. A fresh hosted run for the resulting branch head is required before this remediation can be called verified. The historical successful run references below remain historical and do not validate later commits. No mainline gate, canonical domain decision or implementation authorization changed. See `prototype/verification/SESSION-LEDGER-2026-11-17.md` and `prototype/DOMAIN-EVIDENCE-SEMANTICS-RECONCILIATION.md`.
**Mainline remains:** documentation-first; implementation, schema migration, RLS, API, authentication, real identity processing, deployment and pilot remain on hold. The October 2026 gate decisions and unresolved seams below remain in force.

**Isolated prototype branch:** a synthetic, static browser demonstration exists under `prototype/`. Its pure review engine is version 0.3.0. The historical 40/40 engine run was recorded on 2026-11-12; the current engine test source declares **79/79 tests**, including malformed-input, cross-owner mismatch, consent-input integrity and invitation/guardian reevaluation cases; the historical 49-test engine source passed hosted verification on [run 43431181124](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43431181124); the historical 73-test engine plus audit-history-validator-only baseline passed full hosted verification on [run 43440108660](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43440108660); that run does not verify the current gate integration. Both relevant inline scripts previously passed syntax checks; both JSON schema files parsed. The documentation-integrity suite now declares 9 checks; with 79 engine tests, the engine-plus-documentation source total is 88. The audit-history suite declares 31 tests and workspace-data-integrity declares 2, for **121 total Node test declarations**. The audit-history validator is integrated as a mandatory synthetic invitation-review gate, but is not an immutable store; see `prototype/SYNTHETIC-AUDIT-HISTORY-PROPOSAL.md` and `prototype/verification/33-tier-audit-history-assessment-2026-11-13.md`. The 48-declaration suite passed hosted verification on [run 43409104888](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409104888), commit `14bcabb84e58fa8f286887d4125cddb6ee6a282e`. The prior 46-declaration suite passed hosted GitHub Actions on [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544), commit `50566e1902b9fa409515103bc81511f4af638881`; the historical 47-declaration baseline passed hosted GitHub Actions on [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367), commit `25108a07320a2e70cd86573a4d950024b8211273`. See `prototype/verification/documentation-integrity-ci-2026-11-13.md`. The prior 32/32 browser result belongs to the v0.1.0 baseline and is not current proof. The current hosted Playwright/Chromium run [43420141388](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43420141388), commit `7eb60f651363dfc3b569e2be80da187007a75d2d`, passed 48/48 headless tests, 7/7 request-review browser groups and 8/8 unified hub/all-workspace browser groups. See `prototype/verification/discovery-request-browser-verification-2026-11-13.md` and `prototype/verification/workspace-hub-browser-verification-2026-11-13.md`.

**Prototype boundary:** synthetic fixtures only; no backend, persistence, authentication, authorization, RLS, API, identity vault, consent capture, disclosure, production security, legal compliance or pilot readiness. A successful policy evaluation can only reach separate human review and never authorizes disclosure.

**Operational seams still open:** membership evidence classes (formal-organization records, community-coach attestations and player-reported claims) remain a proposal only; see `prototype/AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md`. No class is a trust tier, and minimum evidence and opportunity-specific acceptance rules remain unresolved. The [Opportunity Evidence Acceptance Matrix](../prototype/OPPORTUNITY-EVIDENCE-ACCEPTANCE-MATRIX.md) records candidate handling by opportunity type; the [Opportunity Requirement Declaration](../prototype/OPPORTUNITY-REQUIREMENT-DECLARATION.md) proposes owner disclosures and review controls. Both are not ratified. Multi-guardian legal authority and dispute resolution; purpose-category scope; user/player delegation; retention and access policy; and a server-side release authorization design also remain open. The current engine's verified-membership rule is unchanged. No implementation is authorized by the prototype work.

**Documentation integrity:** `docs/engineering-integrity.md` defines the high-priority synchronization protocol and incident log. Root README, prototype README, gate status, contract and verification records have been reconciled. The automated documentation-integrity checks are part of the hosted prototype test workflow; see the 2026-11-13 verification record.

---


**Current phase:** MVP Authorization / External Validation Hold  
**Gate 1:** CLOSED  
**Gate 2:** CLOSED AT CONCEPTUAL LEVEL  
**Conceptual ERD:** FROZEN  
**ERD implementation detail:** DEFERRED  
**Schema:** DRAFT / REVIEWED — IMPLEMENTATION HOLD  
**RLS / API / UI:** HOLD — POLICY / LEGAL AUTHORIZATION REQUIRED  
**Implementation:** HOLD

## 1. Executive status

ScoutSA has completed Gate 1 and has now closed Gate 2 at the conceptual relationship level. The conceptual ERD is frozen without inventing unresolved operational or legal policy.

The governing sequence remains:

> **Research can propose. Evidence can witness. The Constitution ratifies. The Domain Model formalizes. The Relationship Model derives. Code implements.**

The current evidence does **not** authorize implementation merely because the repository contains substantial documentation.

## 2. Gate 1

**Status: CLOSED — 2026-10-05**

Gate 1 established and ratified the semantic baseline M1–M9:

- epistemic object separation;
- scoped authority and conflict preservation;
- purpose-bound authorization;
- temporal applicability and freshness;
- derived-state invalidation;
- safeguarding / verification separation;
- disclosure / republication boundary;
- child participation / voice boundary;
- safeguarding concern / response boundary.

No claim of POPIA, Children's Act, FIFA, SAFA or other legal/institutional compliance is implied by this closure.

## 3. Gate 2 semantic concepts

Three additional first-class concepts were exposed by adversarial seam work and explicitly ratified:

| Concept | State |
|---|---|
| Assertion | **RATIFIED** |
| Safeguarding Case / Response | **RATIFIED** |
| Child Participation / Voice Record | **RATIFIED** |

No additional semantic concept is currently warranted.

## 4. Gate 2 seam status — conceptual freeze

| Seam | Current state | What remains |
|---|---|---|
| G2-01 User ↔ Player | **SEMANTICALLY STABLE / HOLD** | cardinality; delegated/shared access |
| G2-02 User ↔ actors / Organization | **SEMANTICALLY STABLE / HOLD** | actor multiplicity; affiliation; authorization |
| G2-03 GuardianLink ↔ ConsentRecord | **SEMANTICALLY STABLE / HOLD** | authoriser identity; conflict effect; applicability |
| G2-04 Assertion ↔ Evidence | **CLOSED** | technical relationship detail only |
| G2-05 Safeguarding Case / Response | **CLOSED** | operational representation only |
| G2-06 Child Participation / Voice | **CLOSED** | contextual effects only |
| G2-07 OpportunityApplication | **SUFFICIENT / HOLD** | participants; lifecycle; transition authority |
| G2-08 Outcome | **SUFFICIENT / HOLD** | multiplicity; correction; dispute; supersession; access |

## 5. What is deliberately NOT frozen

The following remain open and must not be invented through schema design:

- User ↔ Player cardinality;
- delegated/shared Player access;
- actor/Organization affiliation cardinality;
- organization authorization and verification process;
- multiple-Guardian conflict handling;
- exact authorising-person relationship;
- OpportunityApplication participant cardinality;
- application lifecycle vocabulary and transition authority;
- Outcome multiplicity;
- correction/version/supersession semantics;
- dispute lifecycle and participants;
- placement/registration treatment;
- access and retention policy.

## 6. Current architectural boundary

The Relationship Model is **implementation-independent**.

No database table, foreign-key cardinality, RLS policy, API contract, UI behavior, authentication-provider rule, or storage mechanism may be treated as authoritative merely because it is technically convenient.

If a relationship decision exposes a missing semantic concept:

> **STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED → DOMAIN RECONCILIATION → RELATIONSHIP MODEL UPDATE**

## 7. Gate 2 closure record

**Final review:** `docs/research/gate-2-final-conceptual-relationship-freeze-review-2026-10-06.md`  
**Review commit:** `2561afcd9b7cfd1ad60e88f98272d4fabedbe0d7`  
**Relationship Model freeze commit:** `558515b228ef217c50d232ec598efeff58f5b42b`

Final conceptual test:

- Existence: **PASS**
- Coherence: **PASS**
- Failure containment: **PASS**
- Hidden-semantic-assumption test: **PASS**

**Decision: Gate 2 — Semantic Relationship Integrity CLOSED AT CONCEPTUAL LEVEL.**

This closure does not resolve deferred cardinality, authority-process, lifecycle, correction/dispute, access, retention, or legal questions. Those remain explicit carry-forward decisions.

G2-SEAM-03 retains an evidence-completeness note: its dedicated re-witness artifact was previously blocked from commit. No claim of complete repository evidence for that seam is made.

## 8. Next gate — MVP Relationship Subset Freeze

The MVP boundary has been explicitly ratified. The next authorized work is to derive the smallest MVP relationship subset strictly from the frozen conceptual ERD, without reopening the ratified semantic baseline.

Required sequence:

1. MVP relationship subset from the frozen conceptual model.
2. Operational/legal carry-forward decisions required for that MVP.
3. Implementation prerequisites and evidence requirements.
4. Schema Boundary Freeze.
5. Only after schema boundary review/freeze: schema design.
6. SQL/schema implementation draft is permitted only as a traceable draft.
7. Implementation remains HOLD until SQL/schema review and implementation evidence are ratified.

## 9. Anti-drift rule

Documentation growth is not itself progress.

A new research artifact must either:

- witness a real uncertainty;
- resolve a defined decision;
- preserve provenance;
- identify a contradiction;
- or support a justified gate transition.

Otherwise it should not expand the repository.

## 10. Implementation boundary

**No implementation is currently authorized.**

The purpose of Gate 2 is to make the eventual implementation **smaller, safer, and derivable**, not to defer implementation indefinitely.

Once Gate 2 relationship integrity is sufficiently stable, the next authorized activity is an explicit **MVP Boundary Freeze** before code.

## 11. Evidence rule

> **Strength of claim must never exceed strength of evidence.**

## 12. Current controlled state — reconciled 2026-10-06

The earlier Gate 2 → MVP wording above is historical and must not be read as the current next step. Subsequent ratified/frozen work has advanced the repository through the schema boundary and SQL draft stages.

### Current state

| Control | State |
|---|---|
| Gate 1 | **CLOSED** |
| Gate 2 | **CLOSED — CONCEPTUAL LEVEL** |
| Conceptual ERD | **FROZEN** |
| MVP Boundary | **RATIFIED** |
| MVP Relationship Subset | **FROZEN** |
| Implementation Prerequisites | **RATIFIED** |
| Schema Boundary | **FROZEN** |
| Physical Table Boundary | **FROZEN** |
| SQL Schema | **DRAFT / REVIEWED** |
| SQL Static Witness | **PASS WITH RUNTIME HOLD** |
| SQL ↔ Field/Constraint Reconciliation | **PASS** |
| PostgreSQL Runtime Witness | **PASS — PostgreSQL 17.11 / isolated non-production execution** |
| Migration-Safety Design | **DEFINED / REVIEWED** |
| Migration-Safety Review | **CONDITIONAL PASS / EXECUTION HOLD** |
| Migration / Database | **HOLD** |
| RLS | **HOLD** |
| API | **HOLD** |
| UI | **HOLD** |
| Nullability/Defaults/Index/Uniqueness | **PASS WITH POLICY HOLDS** |
| RLS / Access / Disclosure Review | **CONDITIONAL PASS / POLICY-LEGAL HOLD** |
| Production Implementation | **HOLD** |
| Future Collaborator Lead | **RECORDED / NOT VERIFIED** |

### Runtime witness record

**Artifact:** `docs/research/postgresql-runtime-witness-2026-10-06.md`  
**Record commit:** `a214be879d23c8a25b76896d8803027ff25f1935`  
**Workflow run:** `37468048851`  
**Job:** `112283944840`  
**Witness commit:** `47210a0500b583cc9ef9b1557df5577edcf5d6e9`  
**SQL blob:** `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`

Observed evidence:

- PostgreSQL 17.11 server started and became healthy.
- Exact SQL blob identity matched.
- Exact SQL draft executed with `ON_ERROR_STOP=1`.
- 26 tables created.
- 26 tables observed.
- 17 foreign keys observed.
- Workflow/job conclusion: **SUCCESS**.

This is a runtime witness for the exact SQL draft in an isolated non-production environment. It is not a production migration.

### Authoritative next sequence

```
SQL draft
   ↓
Static witness                         PASS
   ↓
SQL ↔ Field/Constraint reconciliation PASS
   ↓
PostgreSQL syntax/runtime witness     PASS
   ↓
Migration-safety review               CONDITIONAL PASS / EXECUTION HOLD
   ↓
Nullability/default/index/uniqueness   PASS WITH POLICY HOLDS
   ↓
RLS/access/disclosure review           CONDITIONAL PASS / POLICY-LEGAL HOLD
   ↓
Explicit MVP access-policy authorization  REQUIRED
   ↓
Explicit migration authorization      REQUIRED
   ↓
Authorized non-production migration   ONLY AFTER AUTHORIZATION
   ↓
Post-migration runtime witness        REQUIRED
```

The PostgreSQL runtime evidence must not be broadened into claims about migration safety, RLS, authorization, legal compliance, production readiness, or investor readiness.

**Authority boundary:** NONE beyond the evidence actually recorded above.



## 13. Current executive position — reconciled after access-policy work

The historical sections above preserve the chronology of the project. They are not the current executive state.

**Current controlled position:**

| Control | Current state |
|---|---|
| Gate 1 | **CLOSED** |
| Gate 2 | **CLOSED — CONCEPTUAL LEVEL** |
| Conceptual ERD | **FROZEN** |
| MVP Boundary | **RATIFIED** |
| MVP Relationship Subset | **FROZEN** |
| Implementation Prerequisites | **RATIFIED** |
| Schema Boundary | **FROZEN** |
| Physical Table Boundary | **FROZEN** |
| SQL Schema | **DRAFT / REVIEWED** |
| PostgreSQL Runtime Witness | **PASS — isolated non-production** |
| Migration-Safety Review | **CONDITIONAL PASS / HOLD** |
| RLS / Access / Disclosure | **CONDITIONAL PASS / POLICY-LEGAL HOLD** |
| MVP Access-Policy Matrix | **COMPLETE / RATIFICATION REQUIRED** |
| Actor × Purpose × Resource Map | **COMPLETE / RATIFICATION REQUIRED** |
| RLS | **NOT AUTHORIZED** |
| Migration / Database | **HOLD** |
| Production Implementation | **HOLD** |

### Controlled next move

The repository has reached the point where additional internal governance artifacts should be minimized unless they resolve a concrete decision or contradiction.

The next product-validating activity is therefore **external validation**, focused on the smallest set of questions that can materially change the MVP:

1. Can Vaal Triangle football organizations understand and use the proposed Player Passport / Opportunity model?
2. Which information do they actually need before making a contact or trial decision?
3. Which information would they refuse to receive or store?
4. What safeguarding and Guardian workflow do they consider workable in practice?
5. Which parts of the current MVP are unnecessary, confusing or operationally burdensome?
6. Does the proposed opportunity-readiness model solve a real access problem rather than merely describe one?

External feedback is evidence input, not automatic ratification. Material contradictions return through the existing governance path; non-material feedback should not generate ceremony.

**Anti-drift boundary:** no new governance artifact should be created merely to demonstrate activity. The next artifact should exist only if external validation produces a decision that must be preserved.

## Access-Policy Control — 2026-10-06

MVP Access-Policy Decision Matrix: **SEMANTICALLY COMPLETE / POLICY-LEGAL RATIFICATION REQUIRED**.
Adversarial review: **PASS WITH POLICY-LEGAL HOLDS**.

RLS / Access / Disclosure remains **CONDITIONAL PASS / POLICY-LEGAL HOLD**.

RLS implementation: **NOT AUTHORIZED**.
Migration: **HOLD**.
Database implementation: **HOLD**.


Recorded 45-test CI baseline: [run 43401941704](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43401941704) — historical baseline only (40 engine + 5 documentation checks). Historical 46-test CI verification: [run 43403854544](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43403854544). Historical 47-test CI baseline: [run 43406164367](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43406164367).


## Opportunity validation proposal — 2026-11-13

The [Opportunity Validation Scenario Pack](../prototype/OPPORTUNITY-VALIDATION-SCENARIO-PACK.md) provides 14 fictional cases for testing the proposed opportunity evidence and declaration artifacts. It is **NOT RATIFIED** and does not change current gates, implementation holds or pilot authority. No real people or organizations are described.
\n\n## External validation — non-blocking operating decision — 2026-11-13\n\nOutreach to external stakeholders has been attempted; responses have not been received to date. **ScoutSA internal development will continue without waiting for external validation.** The [Vaal Stakeholder Validation Interview Guide](../prototype/VAAL-STAKEHOLDER-VALIDATION-INTERVIEW-GUIDE.md) is an optional, parked instrument for any future response. It is not a prerequisite, does not imply interviews occurred, and does not ratify the opportunity proposals. Internal work remains limited to the authorized synthetic/prototype scope. Existing holds on real player/minor data, database execution, RLS, API, authentication, identity processing, disclosure, deployment and pilot remain unchanged. A demonstrable product may make later stakeholder conversations more concrete; it is not evidence of demand, safety or production readiness.\n

## Unified prototype navigation — 2026-11-13

`prototype/index.html` now acts as the main workspace hub and links to all 11 existing synthetic review screens. The new navigation is a discoverability and frontend integration improvement only; it does not merge the pages into one runtime or imply shared state, authentication, authorization, persistence or production behavior. The documentation-integrity suite now contains 8 checks (40 engine + 8 documentation = 48 declarations). All 48 passed on [run 43409488949](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43409488949), commit `fc3d121becd267287eb37bc19ba4644ed9f39b0c`; the new check confirms each of the 11 specialist screens links back to the hub. Existing mainline and real-data holds remain unchanged.


## Incomplete request handoff correction — 2026-11-13

The synthetic Discovery & Request Review page previously treated an opportunity-only query parameter as ordinary navigation and displayed the full fictional request queue. This contradicted the documented fail-closed handoff boundary. The prototype now detects the presence of either handoff parameter independently and delegates filtering to `prototype/handoff-filter.js`. Any partial handoff requires a non-empty player reference; an optional opportunity reference must also be non-empty and match exactly. Incomplete, unknown and unmatched handoffs display no request records. The ordinary page with no handoff parameters retains its normal fictional sample queue. Regression assertions were added within the existing workspace-integrity check; the declaration count remains 48. Hosted verification passed in [run 43418015630](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43418015630): 48/48 headless tests and 7/7 Chromium browser-smoke groups. No mainline status change is implied.


## Prototype review-state presentation — 2026-11-13

The isolated `prototype/internal-demo` branch now includes a read-only six-stage presentation in `prototype/discovery-request.html`, projected by `prototype/review-state.js` from the existing synthetic review-engine result. It distinguishes a fictional fixture from a submitted request; summarizes authority/evidence and safeguarding gates; labels a passing evaluation only as eligibility for separate human review; explicitly shows that no final decision/outcome is recorded; and prohibits disclosure/contact. Failed gates remain on hold, skipped prerequisites remain waiting, and missing/unknown gate output fails closed. The review engine, policy rules and fixtures are unchanged. No state transition, human decision, approval, decline, invitation, placement, persistence, authorization or disclosure is implemented. The source declaration count remains 48 (40 engine + 8 documentation checks); new assertions are inside an existing check. Hosted GitHub Actions verification passed on [run 43415259079](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43415259079), commit `ad6fb2f488b62b433ef95a5373fa79118a6e5a52` (48 passed, 0 failed). Browser smoke verification passed 7/7 groups on [run 43418015630](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43418015630), commit `70c6c8563325403bfff334bb8f6bdde67a23be41`. Mainline holds remain unchanged.

The projection also requires `allBlockingGatesSatisfied` and passing evidence/safeguarding groups before showing human-review eligibility; contradictory or incomplete readiness fails closed.

## Specialist workspace interaction checkpoint — 2026-11-13

The isolated `prototype/internal-demo` branch now includes a third Playwright/Chromium script, `prototype/tests/workspace-interactions.browser-smoke.cjs`, covering actual client-side controls and read-only boundaries across all eleven specialist workspaces. Hosted GitHub Actions [run 43422082698](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422082698), commit `e6fab109253fab2091292ddef29d285251348c4e`, passed 48/48 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation browser groups and 11/11 specialist interaction groups. Checks cover player selection/tabs/handoff; membership, opportunity, evidence, invitation and matching filters/searches; decision form validation and session-only reset; pathway and guardian scenario selection; the Coach & Academy static/no-roster boundary; and the Discovery & Request Review hold/no-decision boundary. No uncaught browser page or console errors were reported. The decision form stores only in page-session memory and the test confirms that its entry disappears after reload; this is not persistence. All data remains fictional. This work does not add authentication, authorization, RLS, API, database, durable storage, consent capture, disclosure or contact, and does not establish legal compliance, safeguarding effectiveness, accessibility completeness, security or production readiness. Mainline implementation holds remain unchanged. See `prototype/verification/workspace-interaction-browser-verification-2026-11-13.md`.


## Workspace data-integrity and failure-state checkpoint — 2026-11-13

Cross-workspace fixture verification found and corrected: (1) Coach & Academy referenced `MEM-DEMO-005` which did not exist in the central membership fixture; a matching fictional, unverified membership record was added; (2) the Coach & Academy workspace for `ORG-DEMO-01` listed `OPP-DEMO-003`, owned by `ORG-DEMO-03`; the foreign opportunity was removed and the proposal count corrected; and (3) `REQ-DEMO-003`, which intentionally has no Passport, referenced `MEM-DEMO-002` belonging to another player; that membership reference is now null. The shared handoff filter also now fails closed for invalid/non-array record input. New `prototype/tests/workspace-data-integrity.test.js` checks cross-workspace IDs, relationships, organization scope, summary counts and handoff failure cases. The browser suite now tests opportunity-only, unknown-player and mismatched handoffs and literal text rendering in the Claim Decisions form. Hosted GitHub Actions [run 43422932825](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422932825), commit `ea3b8919b1240be43391ffbb679b3c1d17a5942e`, passed 50/50 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 11/11 specialist interaction groups. Current test inventory: 50 declarations (40 engine, 8 documentation, 2 data-integrity). See `prototype/verification/workspace-data-integrity-verification-2026-11-13.md`.

## Prototype priority — depth before breadth — 2026-11-13

The internal demo is prioritizing the core Discovery & Request Review loop and pure review engine. No additional workspace breadth is planned until core input validation, exact references, authority/evidence checks, safeguarding prerequisites, failure states and disclosure prohibition have stronger test evidence. Existing secondary workspaces remain synthetic supporting surfaces. This does not ratify unresolved policy seams, authorize external/user data or lift any mainline implementation hold.

Two new engine tests cover missing/malformed context collections and missing request input. Both require HOLD, `allBlockingGatesSatisfied === false` and `disclosurePermitted === false`. Hosted run [43427648705](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43427648705), commit `5945b75e05229427e430317b79f0541836cbe275`, passed 52/52 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups. Inventory: 57 engine + 8 documentation-integrity + 2 cross-workspace data-integrity declarations (67 total).

**Safe-rendering mitigation — UI-008 remains OPEN:** Ten fixture-driven workspaces now use an HTML-escaping helper for identified dynamic HTML-string interpolations; Claim Decisions retains its existing escaping helper. Hosted run [43426395229](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43426395229) passed 50/50 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups. Browser coverage checks hostile markup and nullish values against the helper contract across all eleven workspaces. This is not proof that every dynamic interpolation has been identified or that every HTML context is safe. URL policy, malformed fixture resilience and complete renderer review remain outstanding. No external/user-supplied data is authorized; no mainline implementation gate is lifted.
\n\n**Latest prototype integrity extension — awaiting hosted verification:** The request-integrity test now asserts that each request's organization owns the referenced opportunity. It also checks Passport-ID consistency only when a Passport reference is actually supplied, preserving the intentionally incomplete third request and the separate opaque player reference. The change is isolated to `prototype/internal-demo`; it does not alter engine policy or mainline gates.\n

**Latest review-engine ownership checks — awaiting hosted verification:** Two additional negative-path tests require a membership reference to match both the exact player and organization, and require an opportunity to belong to the request's exact organization. An owner mismatch must fail the opportunity-source gate and leave eligibility/safeguarding skipped. These tests change no evaluator policy; they exercise existing fail-closed behavior. The test source now declares 57 engine tests and 67 total declarations across engine, documentation-integrity and workspace-data-integrity suites. No hosted pass is claimed yet.


**Consent identity and malformed nested-input checks — awaiting hosted verification:** A new regression confirms that an opaque `playerRef` cannot be replaced with the internal Passport ID: the Passport identity check can pass while consent, guardian and player-voice checks fail on the distinct reference. A second regression supplies object-shaped (rather than array-shaped) guardian and purpose collections; both must fail closed without an exception or disclosure permission. No engine policy was changed. Current source inventory: 57 engine + 8 documentation-integrity + 2 workspace-data-integrity declarations (67 total).

## Invitation and safeguarding chain regression — 2026-11-13

Three new engine tests check that a completed second-review status is not an approval/selection/invitation, that a non-READY invitation workflow remains HOLD even when second-review status is COMPLETE, and that guardian revocation between evaluations blocks consent on reevaluation. Current inventory: **49 engine + 8 documentation-integrity + 2 workspace-data-integrity = 59 declarations**. Hosted verification passed on [run 43431181124](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43431181124), commit `f7d6383111c92f72e2b33213b0b05619deb94ebd`: 59/59 headless tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups.

**Known model limitation:** `secondReviewStatus === "COMPLETE"` is presently consumed as a synthetic input flag. The engine does not authenticate reviewer identities, independence or authority. Do not treat this field as verified independent review or use it as real-world evidence. This is an unresolved design limitation, not a ratified policy. UI-008 remains OPEN; mainline implementation, real-data, disclosure, deployment and pilot holds remain unchanged.


**Verification boundary:** the passing run confirms the synthetic evaluator's declared behavior and the tested browser flows only. It does not validate real safeguarding, actual reviewer independence/authority, consent validity, security, legal compliance, accessibility completeness or production readiness. UI-008 remains OPEN. Mainline holds remain unchanged.


## Evidence-linked reviewer model — 2026-11-13

The prototype's invitation safeguarding gate now ignores the legacy `secondReviewStatus` flag. It requires two distinct reviewers, distinct authority grants, current and exact-scoped reviewer authority, completed review records with timestamps and evidence references, cleared conflict checks with evidence references, and a second-review independence check with its own evidence reference. Eight additional tests cover bypass and malformed/contradictory cases. Current source inventory: **57 engine + 8 documentation-integrity + 2 workspace-data-integrity = 67 declarations**.

**Boundary:** all records are synthetic. The evaluator checks data shape and internal consistency only. It does not verify actual identity, reviewer independence, conflict of interest, legal authority, evidence authenticity or an accountable human decision. The contract remains not ratified. UI-008 remains OPEN; mainline, real-data, disclosure, deployment and pilot holds remain unchanged. Hosted verification passed on [run 43432903661](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43432903661): 67/67 Node tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups.


Hosted run [43432903661](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43432903661), commit `8ea0ea7cac0f11875ac3431017d7868f8687629a`, passed **67/67 Node tests**, **7/7 Discovery & Request Review browser groups**, **8/8 workspace hub browser groups**, and **12/12 specialist interaction browser groups**. This is synthetic test evidence only. UI-008 remains OPEN; mainline, real-data, disclosure, deployment and pilot holds remain unchanged.

### Evidence provenance and revocation checkpoint — 2026-11-13

The isolated prototype's two-person invitation review now requires five uniquely resolved, claim-specific evidence-inspection records. Each record is bound to the invitation, organization, reviewer, authority grant and exact safeguarding-review scope, and includes synthetic source metadata, finding reference, inspector, timestamp, lifecycle and expiry. Only current, unexpired `ACCEPTED` evidence can satisfy a claim. Submitted, merely inspected, rejected, stale, revoked, expired, missing, duplicate or mismatched evidence fails closed. Revoked reviewer authority also blocks reevaluation. Nine new engine tests cover these failure paths. Current inventory: **66/66 engine tests + 8 documentation-integrity checks + 2 workspace-data-integrity checks = 76 declarations**. Hosted verification is pending for this revision. All records remain synthetic; no evidence authentication, durable audit ledger, event-driven revocation, external ingestion or production authorization exists. UI-008 remains OPEN. Mainline and real-data/disclosure/deployment/pilot holds remain unchanged.

### Evidence version pinning checkpoint — 2026-11-13

The prototype engine is v0.2.1 and the draft review contract is v1.1.0. Every review claim now pins a synthetic evidence version ID and fingerprint. Evidence records are versioned by evidence reference plus version ID; exactly one version must be current. Superseded evidence invalidates the earlier review, and a fresh review must pin the new current version and fingerprint. Seven new engine tests cover missing/unknown pins, supersession, multiple current versions, duplicate version IDs, fingerprint mismatch and successful fresh re-review. Current inventory: **73 engine + 8 documentation-integrity + 2 workspace-data-integrity = 83 declarations**. Hosted verification is pending. Fingerprints are not cryptographic; there is no immutable store, append-only history or automatic invalidation workflow. UI-008 remains OPEN; mainline, real-data, disclosure, deployment and pilot holds remain unchanged.


**Synthetic audit-history gate — experimental and not ratified:** `prototype/audit-history.js` v0.2.0 and its 31-test suite are now called by the synthetic invitation safeguarding evaluator. Missing, incomplete, inconsistent or invalidated histories fail closed. The validator remains in-memory and caller-supplied; it is not immutable, durable, cryptographically protected or a production authorization service. See the 33-tier assessment and the audit-history proposal. Hosted verification passed on [run 43444088668](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43444088668): 121/121 Node tests, 7/7 request-review browser groups, 8/8 hub/navigation groups and 12/12 specialist interaction groups. UI-008 remains OPEN; mainline, real-data, disclosure, deployment and pilot holds remain unchanged.


## Tournament identifier crosswalk — 2026-11-17

A source-backed [Tournament Identifier Crosswalk](../prototype/TOURNAMENT-IDENTIFIER-CROSSWALK.md) now inventories the current proposal documents, synthetic UI fields, organizer JSON handoff, match-day handoff and canonical root models. Findings: (1) the organizer handoff and Tournament Manager consistently use `editionId`; `edition_id` is used by the tournament relationship proposal, while `tournament_edition_id` remains in the organizer portal proposal. The evidence supports one intended edition concept, so TAD-001 is **READY FOR GOVERNANCE** for naming only. (2) The distinct `match_participation_id` appears only in the conceptual relationship proposal; current statistics, day operations, history and handoff use `fixtureId + participationId`. An independent lifecycle or multiple-stint model has not been evidenced, so TAD-002 is **BLOCKED** pending domain meaning, multiplicity and correction decisions. No decision is ratified. No schema, migration, API, importer, shared persistence or mainline change is authorized. Review was documentation/source inspection only; no browser or test run was performed for this checkpoint.


## Organizer identity and authority evidence checkpoint — 2026-11-17

Added [Organizer Identity and Authority Crosswalk](../prototype/ORGANIZER-IDENTITY-AUTHORITY-CROSSWALK.md) and updated TAD-003. The canonical Domain Model already defines Organization; the canonical Relationship Model's G2-SEAM-02 keeps User↔Organization affiliation and authorization unresolved and explicitly rejects role-implied authority. Tournament proposals use Organizer ambiguously as both organization identity and event capacity. Preferred candidate: reuse Organization as enduring identity, treat Organizer as an event-scoped capacity, distinguish submitting User from represented Organization, and separately assess representative authority. TAD-003 remains **BLOCKED** pending independent-organizer representation, cardinality, delegation, scope, expiry/revocation, dispute and evidence rules. No domain decision was ratified and no implementation authority was created. Documentation/source inspection only; no UI, browser, or automated test was run.


## Team entry and player participation cardinality review — 2026-11-17

Added [Team Entry and Player Participation Cardinality Crosswalk](../prototype/TEAM-ENTRY-PLAYER-PARTICIPATION-CARDINALITY-CROSSWALK.md) and updated TAD-004. The tournament proposals support the basic TeamEntry → PlayerParticipation relationship, but the current Tournament Manager generates a new Team ID for every entry and a new Player ID for every participation; it cannot demonstrate stable Team/Player identity reuse, multi-division entry, dual registration or transfers. Eligibility review is participation/division/edition-scoped, while roster status, permission, lineup and appearance are distinct concerns. TAD-004 remains **OPEN** pending canonical Team semantics and representative competition regulations for multiplicity, effective periods, transfer/guest/dual registration, duplicate resolution and appeals. No domain decision was ratified; no schema, migration, API, RLS, shared persistence, real player/minor processing or mainline implementation is authorized. Documentation/source inspection only; no browser or automated test was run for this checkpoint.


## Fixture consistency and lifecycle review — 2026-11-17

Added [Fixture Consistency and Lifecycle Crosswalk](../prototype/FIXTURE-CONSISTENCY-LIFECYCLE-CROSSWALK.md) and updated TAD-005. The proposals support a fixture linked to one division and home/away team entries, with same-edition/division consistency proposed but not ratified. The synthetic Tournament Manager stores schedule, score and result-review fields together; Day Operations has a separate session-only status; Match-Day Handoff v1 has no authoritative result or competition context. Postponement, abandonment/resumption, replay, walkover/forfeit, multi-leg ties, result authority and correction lifecycle remain unresolved. Candidate boundaries distinguish scheduled contest, schedule revision, match-day session, played match instance, result observation and competition decision. TAD-005 remains **OPEN**. No domain decision was ratified; no schema, migration, API, RLS, shared persistence, real match/player processing or mainline implementation is authorized. Documentation/source inspection only; no browser or automated test was run for this checkpoint.


## Match participation and match-day multiplicity review — 2026-11-17

Added [Match Participation and Match-Day Multiplicity Crosswalk](../prototype/MATCH-PARTICIPATION-MATCH-DAY-MULTIPLICITY-CROSSWALK.md) and updated TAD-006. The current Day Operations page maintains one session-only match-day record per fixture, exports the first record, and derives one continuous interval from one incoming/outgoing substitution lookup; handoff v1 permits one lineup row per participation per fixture. These are demo limits, not universal football rules. IFAB 2026/27 distinguishes playing periods/extra time, makes substitution limits and some permissions competition-dependent, allows return substitutions only subject to the relevant agreement, and gives competition rules/organisers scope over abandoned-match outcomes. No target South African competition regulations or local authority confirmation were validated. Candidate direction distinguishes fixture, operational session, played attempt, periods, shoot-out and multiple appearance intervals; TAD-006 remains **OPEN** and TAD-002 remains **BLOCKED** pending the match-participation grain. No domain decision was ratified; no schema, migration, API, RLS, shared persistence, real match/player processing or mainline implementation is authorized. Documentation/source inspection and official rules-reference review only; no browser or automated test was run for this checkpoint.
