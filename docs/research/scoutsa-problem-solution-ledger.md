# ScoutSA Problem–Solution Ledger

Status: Research / product thesis witness — NOT constitutional ratification
Date: 2026-10-02
Governing principle: Strength of claim must never exceed strength of evidence.

## 1. Point
The external assessment supplied for this ledger describes ScoutSA as addressing a broken pipeline between grassroots South African football and credible opportunity.

The repository supports this narrower formulation:
ScoutSA is being designed as a verified football opportunity network for South African grassroots football, intended to make talent visible and reachable while preserving evidence, scoped authority, safeguarding, feasibility, and historical provenance.

This document does not establish national impact, commercial success, legal compliance, or industry transformation.

## 2. Problems ScoutSA Is Designed To Address

### P-001 — Visibility without trustworthy context
Grassroots players can be visible without the receiving party being able to distinguish self-report, assertions, evidence, verification, and derived state.
Repository status: DOCUMENTED DOMAIN INTENT.

### P-002 — Opportunity discovery without feasibility
Finding an opportunity is not equivalent to being able to attend and succeed in it. ScoutSA therefore separates Football Readiness from contextual Opportunity Readiness, including relevant guardian, transport, medical, academic, identity, consent, and opportunity requirements.
Repository status: DOCUMENTED DOMAIN INTENT.

### P-003 — Identity and membership confusion
Player relationships with clubs, schools, academies, and other organizations can change. ScoutSA therefore treats Membership as a first-class historical relationship rather than a mutable current-club/current-school shortcut.
Repository status: DOCUMENTED DOMAIN INTENT.

### P-004 — Unscoped trust
Verification is scoped to a defined claim and does not automatically verify unrelated attributes.
Repository status: DOCUMENTED DOMAIN INTENT.

### P-005 — Minor safeguarding and disclosure boundaries
ScoutSA explicitly separates discovery, contact authorization, consent, verification, suitability, acceptance, and placement. Case 6 found the conceptual boundary sound but individual contact authorization and protected-contact provenance unresolved.
Repository status: DOCUMENTED PRINCIPLE + WITNESSED GAP.

### P-006 — Consent being reused beyond its purpose
Consent is modeled as versioned, purpose-specific, revocable, and authority-constrained. Case 7 found the high-level boundary sound but the purpose-compatibility rule under-specified.
Repository status: DOCUMENTED PRINCIPLE + WITNESSED GAP.

### P-007 — Historical records losing meaning after change
Gate 1 witnesses have exposed temporal seams across consent, evidence, verification, readiness, and opportunity context. The methodology therefore distinguishes historical state from current state and requires reconstruction rather than silent rewriting.
Repository status: WITNESSED METHODOLOGY / DOMAIN GAPS REMAIN.

### P-008 — Football noise and unsupported rankings
The methodology rejects treating rankings or Top 10 lists as facts without explicit metric, population, period, method, source, and timestamp.
Repository status: RESEARCH-SUPPORTED METHODOLOGY POSITION.

## 3. Intended ScoutSA Solution Surface
- Player Passport: persistent football identity with separated supporting domains.
- Verification and provenance: attributable, scoped claims supported by evidence.
- Opportunity network: structured opportunities and applications.
- Opportunity feasibility: contextual readiness rather than a permanent talent score.
- Trust-preserving history: historical relationships, evidence, verification, consent, readiness, and audit remain distinguishable from current state.
- Controlled visibility: discovery does not make the whole Passport public.

## 4. External Assessment — Claims Kept As Hypotheses
The supplied assessment also makes broader claims. These are deliberately not promoted into repository facts:

- Nationally unlocking marginalized or geographically isolated talent: HYPOTHESIS; requires outcome evidence.
- Establishing a national/leading safeguarding standard: HYPOTHESIS; requires implemented controls, review, and operational evidence.
- Clean integration with MySAFA, SAFA, LFA, or FIFA systems: HYPOTHESIS / FUTURE INTEGRATION; no integration claim without direct evidence.
- Lowering professional scouting costs: HYPOTHESIS; requires measured evidence.
- Reducing recruitment or administrative risk: HYPOTHESIS; requires defined measures and observed outcomes.
- Exceptional commercial viability or revenue potential: HYPOTHESIS; requires market validation and economics.
- Grant, impact-investment, or ESD attractiveness: HYPOTHESIS; requires actual eligibility and funding evidence.
- Transforming South African football or eradicating vanity metrics: HYPOTHESIS; outcome claim, not established by architecture.
- POPIA or other legal compliance: NOT CLAIMED; implementation evidence and applicable legal analysis are required.

## 5. What ScoutSA Does Not Claim To Be
Version 1 excludes a transfer marketplace, contract negotiation, regulated fee/agent negotiation, guaranteed placement, permanent readiness percentages, unrestricted guardian directories, and AI authority that overrides policy.

Product thesis: Discover. Verify. Connect.

## 6. Value Chain Hypothesis
Grassroots Player → Structured Passport → Evidence / Verification → Context + Feasibility → Verified Opportunity → Controlled Application / Contact → Real-world Outcome → Auditable History.

This is a product hypothesis and domain model, not proof that every stage is implemented.

## 7. Core Problem–Solution Statement
Problem: Grassroots football opportunity can be constrained by fragmented information, weak provenance, uncertain verification, logistical barriers, and safeguarding requirements.

Intended response: build a football opportunity network where identity persists, assertions remain attributable, evidence constrains claims, verification remains scoped, memberships preserve history, readiness remains contextual, feasibility is first-class, safeguarding boundaries are explicit, sensitive information remains controlled, opportunities are structured, and outcomes can eventually be recorded and audited.

Evidence status: DOMAIN THESIS / DOCUMENTED INTENT — NOT YET PROOF OF PRODUCT OUTCOMES.

## 8. Ledger Rule
External assessment → Assertion → Source / Evidence → Repository Witness → Candidate Product / Domain Claim → Ratification only when earned.

A compelling description of the problem is not evidence that the proposed solution has solved it.

## 9. Current Gate Position
Gate 1 remains OPEN.
Current witness sequence: 01 Player vs Coach; 02 Guardian Authority Conflict; 03 Consent Revoked After Approval; 04 Evidence Expires After Verification; 05 Opportunity Changes After Readiness; 06 Unverified Scout Contacts Minor; 07 Guardian Authorizes Trial But Not Media; 08 Child View Conflicts With Guardian Authorization.

The next step remains adversarial witnessing rather than broad architectural expansion.

## 10. 2026-10-02 Progress Ledger — Gate 1 Adversarial Witnessing

### 10.1 Current witnessed progress

As of this ledger entry, the active Gate 1 sequence has reached **Case 9**.

| Case | Boundary tested | Result | Ledger effect |
|---|---|---|---|
| 6 | Unverified Scout → minor contact | RED / MATERIAL DOMAIN GAP | SCOUTSA-026 |
| 7 | Trial consent ≠ media authorization | RED / MATERIAL DOMAIN GAP | SCOUTSA-027 |
| 8 | Historical consent vs changed GuardianLink authority | RED / MATERIAL DOMAIN GAP | SCOUTSA-028 |
| 9 | Multiple legitimate Guardians with incompatible authority scopes | RED / MATERIAL DOMAIN GAP | SCOUTSA-029 |

Case 9 was committed directly to `main` as:

```
Commit: a13a0657fce0afe90aa48b4ab569a6771af85eb6
Path: docs/research/witnesses/gate-1-case-09-multi-guardian-authority-conflict.md
Blob: 0c2b3120dc7ede30eae78870b12b0a9ac18ded61
```

The file was independently re-fetched from `main` after commit and matched the intended witness content.

### 10.2 Gate position

**Gate 1 remains OPEN.**

No Constitution amendment has been ratified from Cases 6–9.

No Domain Model amendment has been ratified from Cases 6–9.

No schema, ERD, RLS policy, API contract, or application implementation is introduced by these witnesses.

The current evidence supports a stronger methodological chain, not a completed implementation:

```
Authority
  ↓
Purpose
  ↓
Scope
  ↓
Time
  ↓
Action
  ↓
Current applicability
  ↓
Conflict state
  ↓
Disclosure
  ↓
Audit
```

The current unresolved seams include individual Scout contact authority, media-purpose granularity, temporal authority/consent precedence, and multi-Guardian conflict semantics.

### 10.3 Investor-readiness roadmap — retained as planning hypothesis

The following timeline is recorded as a **planning hypothesis**, not a repository fact, commitment, funding forecast, or prediction of investor response.

**Phase 1 — Foundation & Domain Specification: approximately Weeks 1–4**

Focus:
- complete the remaining Gate 1 adversarial witnesses;
- address public-data, stale-evidence, authority-conflict and related domain seams;
- translate evidenced research into formal domain specifications;
- keep POPIA, child-protection law, institutional requirements, and external integrations as evidence-backed constraints rather than compliance claims.

Exit evidence sought:
- Gate 1 disposition earned from the witness sequence;
- ratified domain rules only where supported by evidence;
- explicit unresolved items retained rather than hidden.

**Phase 2 — Core Verified MVP: approximately Weeks 5–12**

Focus:
- only after the specification gates permit implementation;
- Player Passport;
- bounded verification/provenance;
- opportunity and application flow;
- opportunity-specific readiness/feasibility;
- narrow launch-node scope, with Vaal/Sedibeng treated as a proposed pilot context rather than an established market claim.

Exit evidence sought:
- working software;
- reproducible tests;
- traceable authorization and safeguarding behavior;
- deployment evidence;
- observed rather than asserted product outcomes.

**Phase 3 — Pilot & Local Validation: approximately Weeks 13–16**

Focus:
- controlled pilot with appropriately authorized players, guardians and football stakeholders;
- test consent revocation, trial visibility, contact boundaries, authority conflict and feasibility in real workflows;
- collect outcome and usability evidence.

Exit evidence sought:
- observed adoption/use;
- observed workflow outcomes;
- recorded defects and remediation;
- evidence that actual users can operate the intended safeguards.

**Timeline status:** The 3–4 month fast-track and 4–6 month realistic range supplied in the external assessment remain **planning estimates only**. They are not verified schedules and should not be presented to investors as guaranteed delivery dates.

### 10.4 Investor-readiness evidence model

For ScoutSA, "investor-ready" should remain an evidence-backed state rather than a label produced by architecture alone.

A future investor-readiness package should be able to show, separately:

```
Domain integrity
+
Legal / regulatory analysis
+
Working MVP evidence
+
Security / safeguarding evidence
+
Real-user pilot evidence
+
Market / economic evidence
+
Operational readiness
```

Architecture and methodology can reduce uncertainty, but they do not by themselves establish:
- legal compliance;
- product-market fit;
- commercial viability;
- institutional integration;
- user adoption;
- safeguarding effectiveness;
- investment attractiveness.

### 10.5 Today's stopping point

**End-of-session position — 2026-10-02**

```
Gate 1: OPEN
Case 9: WITNESSED
SCOUTSA-026 → 029: WITNESSED GAPS / NOT RATIFIED
Implementation: NOT STARTED FROM THESE WITNESSES
Premature schema/ERD expansion: AVOIDED
Next planned adversarial direction: Case 10
```

The methodological objective remains unchanged:

> **Do not build around a semantic gap merely because the gap is inconvenient. Witness it first.**



## 10.6 Gate 1 Progress Ledger — Session close 2026-10-02

This section records repository-witnessed progress completed after the earlier stopping point. It is a session ledger, not a claim that Gate 1 has passed.

### Witnesses completed

| Case | Boundary tested | Ledger status |
|---|---|---|
| 01 | Player assertion vs coach assertion | WITNESSED GAP / NOT RATIFIED |
| 02 | Conflicting guardian authority | WITNESSED GAP / NOT RATIFIED |
| 03 | Consent revocation after approval | WITNESSED GAP / NOT RATIFIED |
| 04 | Evidence expiry after verification | WITNESSED GAP / NOT RATIFIED |
| 05 | Opportunity changes after readiness evaluation | WITNESSED GAP / NOT RATIFIED |
| 06 | Unverified scout contacts minor | WITNESSED GAP / NOT RATIFIED |
| 07 | Guardian authorizes trial but not media | WITNESSED GAP / NOT RATIFIED |
| 08 | Child view vs guardian authorization | WITNESSED GAP / NOT RATIFIED |
| 09 | Safeguarding concern vs verified organization user | WITNESSED GAP / NOT RATIFIED |
| 10 | Institutional record vs ScoutSA assertion | WITNESSED GAP / NOT RATIFIED |
| 11 | Public information proposed for republication | WITNESSED GAP / NOT RATIFIED |
| 12 | Authentic but stale evidence | WITNESSED GAP / NOT RATIFIED |
| 13 | Two legitimate authorities with incompatible assertions | WITNESSED GAP / NOT RATIFIED |
| 14 | Derived readiness after material input withdrawal | WITNESSED GAP / NOT RATIFIED |

### Exact recent witness evidence

- Case 11 commit: c29ea655d9f2a3318d963f7df85865bf30f6230e; verified blob: 4cc2c44d1b59cd75fd6891417793c85739def1a5.
- Case 12 commit: e037c0847bd487748a44933856cb01d7c08894f6; verified blob: f249072183c8cc34f7f0386f7bb8a4c461fae8bc.
- Case 13 commit: 7586da0e531fec665160100667a1583f3aa82f97; verified blob: 95464f044abb2df673a2c5a5abecc7eb5ef5eec6.
- Case 14 commit: 88e1588607d0ac0687480b0b357e3798fe821caf; verified blob: ffe67aa277b69bc65231d2a45d3ebc86085c1525.

### Session achievement

The Gate 1 adversarial program now has **14 completed witnesses**. Repeated boundaries have emerged around Assertion vs Evidence; Authority vs Consent; historical vs current authorization; Evidence/Verification temporal dependency; contextual and point-in-time Readiness; Discovery vs Contact Authorization; purpose-bound disclosure; child view vs guardian authority; Verification vs Safeguarding; source conflict and authority scope; public availability vs republication authority; authenticity vs currentness/applicability; legitimate authority conflict; and derived-state dependency and invalidation.

No constitutional or Domain Model amendment has been ratified from these witnesses. No implementation has been started from these gaps. The work intentionally remains specification-first.

### Current Gate state

Gate 1: OPEN
Cases witnessed: 14
Witnessed gaps: ongoing
Ratified amendments from cases: 0
Implementation: NOT STARTED FROM THESE WITNESSES
ERD/schema expansion: DEFERRED

## 10.7 Next Session Plan — Monday 2026-10-05

**Objective:** consolidate before expanding the model.

1. Gate 1 Cases 1–14 synthesis — group duplicate findings, identify orthogonal gaps, and distinguish principles from implementation requirements.
2. 33×3 cross-case audit — Existence → Coherence → Failure across the complete witness set.
3. Legal/external-anchor research pass — review the already identified South African anchors, including Constitution, POPIA/Information Regulator material, Children’s Act/National Health Act where relevant, FIFA minor-transfer rules, safeguarding sources, and authoritative football-registration sources, before converting legal or institutional claims into domain rules.
4. Evidence-source reconciliation — assess which external anchors can support the Constitution/research layer and which must remain hypotheses or legal-review items.
5. Minimal semantic amendment set — only after synthesis/research; no automatic ratification of every candidate discovered by witnesses.
6. Re-witness affected cases — adversarially test any proposed amendments before Gate 1 closure is considered.
7. Gate decision — only then determine whether Gate 1 is ready to close or requires another witness cycle.

### Explicitly deferred

- ERD/schema design;
- production implementation;
- broad UI expansion;
- premature compliance claims;
- external integration claims;
- investor-readiness claims;
- importing rankings as truth;
- architecture expansion by analogy.

**Monday starting point:** Gate 1 synthesis, not new feature construction.

> Do not build around a semantic gap merely because the gap is inconvenient. Witness it, synthesize it, research it, amend minimally, and re-witness it first.


## 10.6 Gate 1 Synthesis — Cases 01–14

**Synthesis document:** `docs/research/gate-1-synthesis-cases-01-14.md`  
**Commit:** `b848dafaa37f601fc0f6e0d14f163b5e46ea1ae3`  
**Status:** Synthesis only — NOT constitutional ratification.

The fourteen witnesses have been consolidated into seven orthogonal semantic gap classes:

1. Assertion Boundary
2. Scoped Authority and Conflict
3. Purpose-Bound Authorization
4. Temporal Freshness and Applicability
5. Derived-State Dependency and Invalidation
6. Safeguarding vs Verification
7. Disclosure / Republication Boundary

Repeated failure modes are:

- silent promotion of a narrow fact into broader authority;
- silent invalidation or rewriting of historical state;
- silent conflict resolution;
- provenance loss.

### Repository provenance issue identified

The witness directory contains duplicate numbered scenarios for Cases 7, 8 and 9. The committed session ledger remains the current canonical sequence, but the duplicate files are preserved as evidence until provenance is explicitly reconciled.

**No witness was deleted, renamed, overwritten, or silently reclassified by the synthesis.**

### Gate decision

**Gate 1 remains OPEN.**

The synthesis does not authorize:

- Constitution amendment;
- Domain Model amendment;
- ERD/schema design;
- RLS/API design;
- implementation;
- compliance claims;
- investor-readiness claims.

### Next action

The repository's planned next phase is now active:

```
External / legal anchor research
        ↓
Evidence-source reconciliation
        ↓
Minimal semantic amendment draft
        ↓
Re-witness affected cases
        ↓
Gate 1 decision
```

The synthesis confirms that further witnesses should not be added merely to repeat already-witnessed seams unless the external research or reconciliation reveals a genuinely orthogonal adversarial class.



## 10.7 External / Legal Anchor Research — 2026-10-05

**Research document:** `docs/research/external-anchors-2026-10-05.md`  
**Commit:** `ba3b293ad23dc9bb48eaf7071882e4978cef7ea8`  
**Status:** External evidence reconciliation — NOT legal advice and NOT constitutional ratification.

The research strengthens seven Gate 1 candidate boundaries:

- scoped parental/guardian authority;
- child best-interests and safeguarding treatment;
- purpose and further-processing limitations;
- information quality/currentness;
- special treatment of children's personal information;
- separation of safeguarding from ordinary role/identity verification;
- controlled disclosure/republication.

### Important evidence boundary

The research does **not** establish ScoutSA compliance, a universal Guardian precedence rule, a universal consent taxonomy, a universal freshness period, a particular schema/RLS design, current SAFA policy beyond the retrieved source, institutional integration, or investor readiness.

The strongest external anchors retrieved are:

- Constitution of South Africa, section 28;
- Children's Act 38 of 2005, especially section 18 and section 28;
- POPIA, especially sections 4, 15, 16, 32, 34 and 35;
- Information Regulator official guidance/eServices;
- FIFA's 2026 Safeguarding Policy and safeguarding guidance;
- SAFA Football Academies Regulations, treated as historical/institutional evidence rather than current universal policy.

### Research verdict

External evidence supports the **direction** of the candidate semantic amendments but does not automatically ratify them.

Next action:

```
Candidate semantic amendment draft
        ↓
Classify each clause:
  EXTERNALLY SUPPORTED
  PRODUCT POLICY
  LEGAL REVIEW REQUIRED
  NOT YET EARNED
        ↓
Re-witness affected cases
        ↓
Gate 1 decision
```



## 10.8 Candidate Semantic Amendment Draft — 2026-10-05

**Document:** `docs/research/gate-1-candidate-semantic-amendments.md`  
**Commit:** `60936b97f8166888a9f7075155b642f2b037a7ef`  
**Status:** Candidate research text — NOT RATIFIED.

The draft preserves the seven orthogonal synthesis gaps as seven candidate amendment themes:

1. Epistemic Object Separation;
2. Scoped Authority and Conflict Preservation;
3. Purpose-Bound Authorization;
4. Temporal Applicability and Freshness;
5. Derived-State Dependency and Invalidation;
6. Safeguarding Is Distinct From Verification;
7. Disclosure / Republication Boundary.

Each clause is explicitly classified as externally supported, product policy, legal-review required, or not yet earned.

**No Constitution or Domain Model text was changed.**

### Next evidence step

Affected witnesses must now be re-witnessed against the candidate clauses before any ratification decision:

```
Candidate clause
    ↓
Affected witness
    ↓
33×3 re-test
    ↓
New contradiction / unsupported assumption?
    ↓
Retain, revise, reject or escalate
```

**Gate 1 remains OPEN.**


## 10.9 Candidate Amendment Re-Witness — 2026-10-05

**Document:** `docs/research/gate-1-candidate-rewitness-2026-10-05.md`  
**Commit:** `d21cc506f198687d00ff79fdb97e6104ac5116fa`  
**Status:** Preliminary adversarial re-witness — NOT RATIFIED.

The candidate amendment themes survived the preliminary contradiction test.

Three qualifications were made explicit:

1. Historical preservation is subject to applicable retention/deletion law and policy.
2. Authority conflict must defer to applicable law/policy rather than inventing precedence.
3. Public-information/republication behavior remains purpose- and context-dependent.

Result:

```
Candidate amendments: RETAIN FOR FORMAL DRAFTING
Constitution amendment: NOT YET
Domain Model amendment: NOT YET
ERD/schema: DEFERRED
Implementation: DEFERRED
Gate 1: OPEN
```

Next step: formal minimal amendment proposal → final Constitution/Domain Model contradiction audit → affected-case re-witness → Gate 1 decision.


## 10.10 Formal Minimal Semantic Amendment Proposal — 2026-10-05

**Document:** `docs/research/gate-1-formal-minimal-amendment-proposal-2026-10-05.md`  
**Commit:** `a08fabfc40754997cd7dd57fb1315f1cad500cb9`  
**Status:** Formal proposal — NOT RATIFIED.

The seven surviving candidate themes were converted into a minimal formal semantic amendment proposal:

1. Epistemic Object Separation;
2. Scoped Authority and Conflict Preservation;
3. Purpose-Bound Authorization;
4. Temporal Applicability and Freshness;
5. Derived-State Dependency and Reassessment;
6. Safeguarding Is Distinct From Verification;
7. Disclosure and Republication Boundary.

The proposal explicitly excludes universal Guardian precedence, automatic invalidation mechanics, fixed freshness/retention periods, AI authority, compliance certification, and premature ERD/schema/RLS decisions.

**Gate 1 remains OPEN.**

## 10.11 Constitution / Domain Model Contradiction Audit — 2026-10-05

**Document:** `docs/research/gate-1-constitution-domain-contradiction-audit-2026-10-05.md`  
**Commit:** `13cf78f4a932479066a27ba41321a282b9f36aeb`  
**Status:** Preliminary final contradiction audit — NOT RATIFICATION.

The formal proposal was re-fetched from `main` and audited against:

- `docs/00-constitution.md`;
- `docs/01-domain-model.md`.

Result:

- Constitutional contradiction: NONE FOUND.
- Domain-model contradiction: NONE FOUND.
- Unsupported legal expansion: NONE FOUND in the proposed wording, subject to explicit legal-review boundaries.
- Implementation leakage: NONE FOUND.
- New domain concepts accidentally frozen: NONE FOUND.

The audit also preserved one unresolved repository-provenance issue: duplicate numbered witness filenames for Cases 07, 08, and 09. The canonical 01–14 sequence remains the ledger/synthesis sequence; duplicate files remain preserved evidence pending explicit provenance reconciliation.

### Current decision

```
Formal proposal: SURVIVES CONTRADICTION AUDIT
Constitution: UNCHANGED
Domain Model: UNCHANGED
Ratified amendments: 0
Affected-case re-witness: NEXT
ERD/schema: DEFERRED
RLS: DEFERRED
Implementation: DEFERRED
Gate 1: OPEN
```

Next evidence transition:

**Formal proposal → affected-case re-witness → contradiction check → Gate 1 decision.**


## 10.12 Formal Amendment Affected-Case Re-Witness — 2026-10-05

**Document:** `docs/research/gate-1-formal-amendment-affected-case-rewitness-2026-10-05.md`  
**Commit:** `01a59b14cbf69d2d128546abd73dd56830a18b68`  
**Status:** Adversarial re-witness — NOT RATIFICATION.

All 14 canonical Gate 1 cases were re-tested against the seven-theme formal amendment proposal.

### Result

All seven amendment themes survive as semantic candidates.

No Constitution contradiction was found.

No Domain Model contradiction was found.

No amendment creates:
- universal Guardian precedence;
- automatic winner selection;
- universal consent;
- absolute retention;
- derived-state authority;
- AI authority;
- compliance certification;
- premature schema/RLS/implementation requirements.

### Residual gaps discovered

**R-01 — Child Voice / Guardian Authorization:** Case 08 shows that scoped authority and purpose-bound consent do not by themselves define the product/legal treatment of a child's objection, assent, participation preference, or applicable age/capacity rules.

**R-02 — Safeguarding Protective Action:** Case 09 shows that verification must remain separate from safeguarding, but temporary protective action, investigation, escalation, dismissal, substantiation, and resolution semantics remain unresolved.

**R-03 — Witness Provenance:** Duplicate numbered witness filenames remain for Cases 07, 08 and 09. They are preserved; no deletion or silent renaming occurred.

### Current decision

```
Formal proposal: SURVIVES AFFECTED-CASE RE-WITNESS
Ratification: NOT YET
Residual gaps: 3
Constitution: UNCHANGED
Domain Model: UNCHANGED
ERD/schema: DEFERRED
RLS: DEFERRED
Implementation: DEFERRED
Gate 1: OPEN
```

### Next evidence transition

Targeted evidence/legal/safeguarding research for R-01 and R-02, plus explicit provenance reconciliation for R-03, followed by a final Gate 1 re-witness.


## 10.13 Residual Gap Research — R-01 / R-02 / R-03 — 2026-10-05

**Document:** `docs/research/gate-1-residual-gap-research-2026-10-05.md`  
**Commit:** `4f3e2e2921d17d06478ffef865e59cf2695e5e5f`

External research narrowed the two substantive residual gaps:
- South African Children's Act section 10 supports age/maturity/development-based child participation and due consideration of the child's views; section 9 makes best interests paramount. This supports a distinct Child Voice boundary without establishing a universal child veto or Guardian override.
- Current FIFA safeguarding policy supports distinct prevention, reporting, investigation, resolution/remedy and governance layers; South African child-protection material supports specified reporting duties. This supports a distinct Safeguarding Concern / Response boundary without creating an automatic guilt or exclusion rule.

Two new candidates were therefore retained for formal review:
- M8 Child Participation and Voice Boundary.
- M9 Safeguarding Concern / Response Boundary.

R-03 remained a provenance issue pending explicit mapping.

## 10.14 Witness Provenance Map — 2026-10-05

**Document:** `docs/research/gate-1-witness-provenance-map-2026-10-05.md`  
**Commit:** `7b7917c9fbe12a3b126cba8521cd62dd6c0835b6`

Provenance review established that Cases 07, 08 and 09 do not merely contain duplicate copies. Each numeric ID has two distinct witnesses introduced by distinct commits. The canonical 01–14 sequence remains unchanged; supplemental witnesses are preserved as evidence.

R-03 is therefore narrowed from missing provenance to an identity-convention issue. No witness was deleted, renamed or overwritten.

## 10.15 Consolidated M1–M9 Final Re-Witness — 2026-10-05

**Document:** `docs/research/gate-1-consolidated-m1-m9-final-rewitness-2026-10-05.md`  
**Commit:** `4f53d444563185e5d47b71b1b9e8f433e490b738`

All M1–M9 candidates survive the consolidated final re-witness.

Constitution contradiction: NONE FOUND. Domain Model contradiction: NONE FOUND. No universal Guardian precedence, AI authority, automatic safeguarding guilt, blanket republication permission, fixed freshness/retention period, schema/RLS requirement, or compliance certification was created.

### Current decision
```
M1–M9 candidate set: SURVIVES FINAL RE-WITNESS
Ratified amendments: 0
Constitution: UNCHANGED
Domain Model: UNCHANGED
ERD/schema: DEFERRED
RLS: DEFERRED
Implementation: DEFERRED
Compliance claim: NONE
Investor-ready claim: NONE
Gate 1: OPEN
```

The evidence now supports a future M1–M9 semantic amendment package, but M8/M9 legal/product wording and the final witness identity convention remain review boundaries. Next step is ratification review, not coding.

## 10.16 Gate 1 Ratification Review — 2026-10-05

**Document:** docs/research/gate-1-ratification-review-2026-10-05.md  
**Commit:** 2cfc946cbf2de90c3c533fb60b949b2faa534f55  
**Status:** Ratification review packet — NOT YET RATIFIED.

The current Constitution and Domain Model were re-fetched from main and reviewed against the final M1–M9 candidate set. The evidence supports M1–M9 as semantic principles, with explicit legal/product boundaries around M2, M6, M7, M8 and M9.

### Ratification disposition

| Candidate | Disposition |
|---|---|
| M1 Epistemic Object Separation | ELIGIBLE |
| M2 Scoped Authority / Conflict Preservation | ELIGIBLE WITH LEGAL BOUNDARY |
| M3 Purpose-Bound Authorization | ELIGIBLE |
| M4 Temporal Applicability / Freshness | ELIGIBLE |
| M5 Derived-State Dependency / Reassessment | ELIGIBLE |
| M6 Safeguarding ≠ Verification | ELIGIBLE WITH OPERATIONAL BOUNDARY |
| M7 Disclosure / Republication Boundary | ELIGIBLE WITH CONTEXT BOUNDARY |
| M8 Child Participation / Voice | ELIGIBLE AS SEMANTIC PRINCIPLE ONLY |
| M9 Safeguarding Concern / Response | ELIGIBLE AS SEMANTIC PRINCIPLE ONLY |

### Explicit non-ratifications

Even if M1–M9 are subsequently accepted, that acceptance does not create universal Guardian precedence, a universal child veto, fixed age/capacity thresholds, fixed freshness or retention periods, safeguarding clearance, allegation-as-guilt, automatic exclusion, blanket republication permission, AI adjudication, compliance certification, or schema/RLS/API/UI mechanics.

### Governance state

```
Ratification package prepared: YES
M1–M9 semantic eligibility: SUPPORTED
Constitution changed: NO
Domain Model changed: NO
Ratified amendments recorded in governing documents: NO
ERD/schema: DEFERRED
RLS/API/UI: DEFERRED
Implementation: DEFERRED
Compliance claim: NONE
Investor-ready claim: NONE
Gate 1: OPEN PENDING EXPLICIT RATIFICATION
```

The next transition is explicit acceptance or rejection of the M1–M9 semantic package. If accepted, only then should minimal Constitution and Domain Model reconciliation occur, followed by re-fetch/contradiction audit and a Gate 1 closure decision.


## 10.17 M1–M9 Explicit Ratification and Governing-Document Reconciliation — 2026-10-05

**Decision:** M1–M9 explicitly accepted as ScoutSA semantic principles.

This transition follows the final re-witness and the ratification review. The governing documents were changed only at the semantic level; no schema, RLS, API, UI, retention duration, freshness duration, authority hierarchy, safeguarding-clearance mechanism, or implementation rule was introduced.

### Constitution
- Commit: 1bc29555e32cdcf6aec30924844f6bcecc75634e
- Blob: 9a5426288d4ae46286cf6d9461fd717c896dd547
- M1–M9 semantic boundaries recorded.
- Explicit non-overreach boundary retained: no universal Guardian precedence, child veto, AI adjudication, compliance certification, or fixed operational thresholds.

### Domain Model
- Commit: 8cba8123fd7e3fb98093e1601d388ab3d3367bd5
- Blob: c7e3046f02677d23055ef77e9e4bad504be02a7a
- Ratified semantic distinctions and invariants reconciled.
- Child voice, safeguarding response separation, purpose boundary, temporal applicability, conflict preservation, and derived-state reassessment are now explicit.
- Operational/legal unresolved items remain open and are not silently invented.

### Post-ratification verification

Both governing documents were re-fetched from main after mutation. The expected M1–M9 semantic material is present, and the Domain Model still explicitly defers ERD/schema/RLS/implementation mechanics.

### Current Gate position

```
M1–M9: RATIFIED AS SEMANTIC PRINCIPLES
Constitution: RECONCILED
Domain Model: RECONCILED
Constitution contradiction: NONE FOUND
Domain Model contradiction: NONE FOUND
ERD/schema: DEFERRED
RLS/API/UI: DEFERRED
Implementation: DEFERRED
Compliance claim: NONE
Investor-ready claim: NONE
Gate 1: OPEN — CLOSURE REVIEW REMAINS
```

The next work is not feature construction. It is a final Gate 1 closure review focused on the remaining explicit boundaries: jurisdiction-specific child participation/capacity effects, safeguarding response authority/procedure, disclosure/republication context, exact authority-resolution process, and whether the remaining unresolved domain decisions can be closed without inventing unsupported rules.


## 10.18 Gate 1 Closure Review — 2026-10-05

**Document:** `docs/research/gate-1-closure-review-2026-10-05.md`  
**Commit:** `3ba1d74c6a73cfc56a1ef2440023aa282b4e415e`  
**Decision:** **GATE 1 READY TO CLOSE**

The final closure review re-fetched the governing Constitution and Domain Model and tested the remaining explicit boundaries.

### Closure disposition

- Entity boundaries: CLOSED FOR GATE 1.
- Ownership / authority semantics: CLOSED; operational/legal detail deferred.
- Evidence model: CLOSED; storage/integrity mechanics deferred.
- Temporal model: CLOSED; freshness/retention thresholds deferred.
- Visibility / disclosure semantics: CLOSED; contextual legal/product rules deferred.
- Child participation / voice: CLOSED AS SEMANTIC BOUNDARY; contextual effects deferred.
- Safeguarding: CLOSED AS SEMANTIC BOUNDARY; operational response authority/procedure deferred.
- Authority conflict: CLOSED AS SEMANTIC BOUNDARY; resolution process deferred.
- Remaining domain decisions: DEFERRED, NOT BLOCKING.

### 33×3 closure judgment

```
Existence:         PASS
Coherence:         PASS
Failure containment: PASS
```

No remaining issue requires invention of a legal conclusion, authority hierarchy, child-capacity rule, safeguarding adjudication, disclosure permission, new core entity, or change to a ratified semantic boundary.

### Gate decision

```
M1–M9: RATIFIED AS SEMANTIC PRINCIPLES
Constitution: RECONCILED
Domain Model: RECONCILED + GATE 1 CLOSED
Gate 1: CLOSED — DOMAIN INTEGRITY
ERD / Schema: NOW AUTHORIZED AS GATE 2 WORK
RLS / API / UI: DEFERRED
Implementation: DEFERRED
Compliance claim: NONE
Investor-ready claim: NONE
```

Gate 2 is now authorized to derive the Relationship Model / ERD from the ratified Domain Model.

**Critical control:** If Gate 2 exposes a genuinely missing semantic concept, work must stop at that seam and return to governance. Gate 2 must not silently invent domain truth.

### Explicit non-claims

Gate 1 closure does not establish POPIA/Children's Act/FIFA/SAFA compliance, safeguarding clearance, legal sufficiency of consent, production readiness, security assurance, investor readiness, or implemented RLS/API/UI behavior.

> Deferred ≠ ignored. Deferred ≠ approved. Deferred ≠ implemented.



## 10.19 Gate 2 Relationship Model Initiated — 2026-10-05

**Document:** `docs/02-relationship-model.md`  
**Commit:** `e21404b754b7bc007dfd01cf4762569d8b62b849`

Gate 2 has formally begun. The first conceptual relationship model was derived from the closed Gate 1 Domain Model.

### Verified starting position

- Core Player / Guardian / Organization / Opportunity relationships are derivable.
- Membership remains first-class.
- GuardianLink remains first-class.
- Consent remains purpose-bound.
- Verification remains scoped.
- Evidence remains provenance-bearing.
- OpportunityApplication remains first-class.
- OpportunityReadiness remains contextual/derived.
- FootballReadiness remains separate.
- AuditEvent remains historical/accountability-oriented.
- No new semantic concept was silently introduced.

### Gate 2 remains OPEN

Schema work is **HOLD**.

The following seams must be interrogated before an ERD can be frozen:

1. User / Player / Guardian / Coach / Scout cardinalities and affiliations.
2. GuardianLink authority-scope representation.
3. Assertion/Claim ↔ Evidence representation.
4. Safeguarding response relationship/state structure.
5. Child participation / objection / assent / decision relationship.
6. OpportunityApplication participant/state structure.
7. Outcome multiplicity and correction/dispute structure.

### Control

If any seam requires a new semantic concept or changes a ratified boundary:

`STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED`

No schema, RLS, API, UI, or implementation work is authorized from an unresolved Gate 2 assumption.

**Gate 1:** CLOSED  
**Gate 2:** OPEN  
**Schema:** HOLD  
**Implementation:** DEFERRED



## 10.20 Gate 2 Adversarial Seam G2-SEAM-01 — User ↔ Player Identity — 2026-10-05

**Relationship Model commit:** `10d1971284809782ac882b93cbb9f7060ebf8188`

The first Gate 2 seam was adversarially interrogated rather than forced into a convenient one-to-one ERD relationship.

### Finding

The ratified Domain Model explicitly distinguishes:

- `User` — authentication identity for a human actor.
- `Player` — persistent football identity / Player Passport.

Therefore:

- Player may exist independently of a User account — **DERIVABLE / SAFE**.
- User may exist without being a Player — **DERIVABLE / SAFE**.
- Exact User ↔ Player cardinality — **NEEDS DOMAIN DECISION**.
- Delegated/shared access to a Player Passport — **NEEDS DOMAIN + AUTHORIZATION DECISION**.

### Rejected assumptions

The following were not promoted into the ERD:

- User = Player.
- Every Player must have a User.
- Every User must be a Player.
- One User may represent multiple Players.
- Multiple Users may represent one Player.
- User deactivation/deletion implies Player deletion.
- A User role proves football identity.

### Gate consequence

**G2-SEAM-01 is an ERD blocker, not an implementation invitation.**

No foreign-key cardinality or delegation mechanism was frozen from this seam.

No new semantic amendment is currently required. The issue is an explicit domain/account-ownership decision.

**Gate 2:** OPEN  
**ERD:** HOLD  
**Schema:** HOLD  
**RLS/API/UI:** DEFERRED  
**Implementation:** DEFERRED

Next seam: **User ↔ Guardian / Coach / Scout affiliation and identity relationship.**


## 10.21 Gate 2 Adversarial Seam G2-SEAM-02 — User ↔ Guardian / Coach / Scout / Organization — 2026-10-05

**Relationship Model commit:** `dcf3741bb8fa7e48bba4177c61d4df4203a8af1e`

Second Gate 2 seam: roles and organizational affiliations were tested without converting them into implicit authority.

### Finding

- User identity remains distinct from Guardian, Coach, and Scout role semantics.
- Role assignment does not equal external verification.
- Organization affiliation is distinct from User identity.
- Guardian relationship remains Player-specific through GuardianLink.
- Affiliation requires temporal/history semantics where it affects authority-bearing assertions.
- Exact actor multiplicities remain **NEEDS DOMAIN DECISION**.
- Exact organization affiliation/authorization behavior remains **NEEDS DOMAIN + OPERATIONAL DECISION**.

### Rejected assumptions

No single permanent `user.organization_id`, role-implied authority, immutable Coach/Scout affiliation, or Guardian authority derived solely from a User role was promoted into the relationship model.

### Gate consequence

**G2-SEAM-02 remains an ERD blocker.** No new semantic amendment is required at this stage.

**Gate 2:** OPEN  
**ERD:** HOLD  
**Schema:** HOLD  
**RLS/API/UI:** DEFERRED  
**Implementation:** DEFERRED

Next seam: **GuardianLink authority scope and its relationship to ConsentRecord.**


## 10.22 Gate 2 Adversarial Seam G2-SEAM-03 — GuardianLink ↔ ConsentRecord — 2026-10-05

**Relationship Model commit:** `9102a9c33ac4f02324c2de49f1ec9559fb6d575f`

Third Gate 2 seam: the relationship between Player-specific Guardian authority scope and purpose-specific consent was interrogated without creating universal Guardian precedence.

### Findings

- GuardianLink already carries relationship, authority scope, status, effective period, evidence reference, and verification status — **DERIVABLE / SAFE**.
- ConsentRecord already represents purpose-specific, versioned authorisation with scope, timing, expiry/revocation and relevant context — **DERIVABLE / SAFE**.
- An authorising-person reference identifies who acted but does **not** by itself prove that the person was authorised for that purpose at that time — **DERIVABLE / SAFE**.
- Consent cannot expand the legitimate authority scope of its grantor — **DERIVABLE / SAFE**.
- GuardianLink does not automatically equal consent, and consent cannot silently cover unrelated purposes — **DERIVABLE / SAFE**.
- Authority changes, consent revocation, and opportunity/context changes remain distinct temporal events; current applicability may require reassessment while historical records remain preserved — **DERIVABLE / SAFE**.
- Multiple GuardianLinks may create conflicting authorisations, but the repository does not currently establish a legal or product precedence rule — **NEEDS LEGAL / OPERATIONAL DECISION**.
- Exact authorising-person relationship across User / Guardian / Player remains unresolved from G2-SEAM-01/02 — **NEEDS DOMAIN DECISION**.

### Rejected assumptions

No latest-wins, first-wins, majority-wins, universal Guardian precedence, role-implied authority, or consent-as-authority-expansion rule was promoted into the relationship model.

### Gate consequence

**G2-SEAM-03 remains an ERD blocker.** No new semantic amendment is required: the ratified M1–M5 boundaries are sufficient to represent the seam without inventing a new authority hierarchy.

**Gate 2:** OPEN  
**ERD:** HOLD  
**Schema:** HOLD  
**RLS/API/UI:** DEFERRED  
**Implementation:** DEFERRED

Next seam: **Assertion / Claim ↔ Evidence representation.**

## 10.23 Gate 2 Adversarial Seam G2-SEAM-04 — Assertion / Claim ↔ Evidence — 2026-10-05

**Relationship Model commit:** b3c03c623b14405fab555f7169cc8c053361cde0

Fourth Gate 2 seam was interrogated against the ratified Domain Model and M1–M9 boundaries.

### Finding

The repository clearly establishes:
- ASSERTION ≠ EVIDENCE.
- EVIDENCE ≠ VERIFICATION.
- VERIFICATION ≠ TRUTH.
- Authority is the actor permitted to make a particular assertion.
- Evidence supports claims and remains provenance-bearing.
- Verification is scoped to a defined subject/claim/scope with authority, evidence basis, timestamp and status.

However, the current domain does not clearly define a first-class object carrying the attributable assertion/claim itself.

### Disposition

- Evidence supporting a claim: **DERIVABLE / SAFE**.
- Assertion distinct from Evidence: **RATIFIED / SAFE**.
- Verification distinct from underlying assertion: **RATIFIED / SAFE**.
- Player ↔ Evidence alone as the complete claim model: **INSUFFICIENT / NOT SAFE TO FREEZE**.
- Reusing Verification as the universal Claim object: **REJECTED**.
- Inventing a technical claim ID/entity directly in the ERD: **REJECTED**.
- Whether Assertion/Claim requires first-class domain representation: **GOVERNANCE REVIEW REQUIRED**.

### Why we stopped

This is materially different from the previous seams. The existing concepts may be semantically sufficient, but the current relationship model does not yet tell us what domain object carries the full chain: subject → author → authority → assertion/claim → supporting evidence → time/status.

Adding an ERD entity now would risk creating domain truth through schema design.

Therefore the Gate 2 control was correctly triggered:

STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED

### Required governance questions

The next re-witness must determine:
1. assertion subject;
2. author;
3. authority to assert;
4. asserted content/scope;
5. one-to-many assertion/evidence support;
6. contradictory assertions;
7. temporal change/history;
8. Verification's relationship to the assertion;
9. derived-state consumption;
10. correction/dispute lifecycle;
11. assertion vs Evidence visibility/disclosure.

### Gate consequence

**G2-SEAM-04 = GOVERNANCE STOP.**

No Assertion entity, schema object, foreign key, API, RLS, UI, or implementation rule is being invented.

**Gate 2:** OPEN  
**G2-SEAM-01/02/03:** unresolved blockers  
**G2-SEAM-04:** governance stop  
**ERD:** HOLD  
**Schema:** HOLD  
**Implementation:** DEFERRED

**Next action:** Governance/re-witness package for Assertion / Claim semantics before continuing ERD work.

## 10.24 Gate 2 Governance Re-Witness — Assertion / Claim ↔ Evidence — 2026-10-05

**Governance document:** `docs/research/gate-2-assertion-evidence-governance-rewitness-2026-10-05.md`  
**Commit:** 06d498ff76f07ad8e07d2d255a31cf6fea12c610

The G2-SEAM-04 governance interrogation was completed.

### Result

The existing domain successfully preserves the distinctions ASSERTION ≠ EVIDENCE, EVIDENCE ≠ VERIFICATION, and VERIFICATION ≠ TRUTH. Evidence remains first-class and provenance-bearing.

However, Player ↔ Evidence alone cannot represent the attributable proposition itself with sufficient precision. The re-witness therefore finds that a **first-class Assertion concept is warranted as a domain-level candidate**.

This is a governance finding, **not yet a ratified amendment**.

### Candidate minimum semantics

Subject; author/submitter; applicable authority/scope where relevant; asserted proposition/content or claim scope; time/effective period; lifecycle/status; provenance; supporting Evidence relationship; correction/dispute reference where applicable; visibility/disclosure classification where applicable.

### Candidate boundaries

- ASSERTION ≠ EVIDENCE
- ASSERTION ≠ VERIFICATION
- ASSERTION ≠ TRUTH
- AUTHOR ≠ AUTHORITY
- EVIDENCE SUPPORTS ASSERTION ≠ EVIDENCE ESTABLISHES TRUTH
- CONTRADICTORY ASSERTIONS ≠ SILENT RESOLUTION
- HISTORICAL ASSERTION ≠ CURRENT APPLICABILITY
- ASSERTION VISIBILITY ≠ EVIDENCE VISIBILITY

### Control

No Assertion entity, schema, RLS, API, UI, or implementation behavior has been introduced.

Required next decision: **explicit ratification or rejection of the candidate Assertion concept**, followed by Domain Model reconciliation if accepted.

**Gate 2:** OPEN  
**G2-SEAM-04:** RATIFICATION PENDING  
**ERD:** HOLD  
**Schema:** HOLD  
**Implementation:** DEFERRED
## 10.25 Gate 2 Assertion Concept — Ratification Review — 2026-10-05

**Review:** `docs/research/gate-2-assertion-ratification-review-2026-10-05.md`  
**Commit:** 081b9cec764fb9941719dcde653f851d1e481aab

The G2-SEAM-04 candidate was tested against semantic consistency, authority boundaries, truth boundaries, contradiction preservation, verification separation, temporal applicability, and implementation deferral.

### Result

**ELIGIBLE FOR RATIFICATION.**

The candidate first-class Assertion concept closes the witnessed representation gap without contradicting M1–M9 or inventing legal/operational authority.

Proposed definition:

> Assertion is an attributable domain statement or claim about a defined subject, made or submitted by an actor within an applicable authority/scope where relevant, preserved with sufficient provenance and temporal context to distinguish the historical assertion from later applicability, and capable of being supported or evaluated by Evidence and Verification without itself constituting truth.

The review explicitly rejects truth-by-record, universal authority, automatic conflict resolution, verification-as-truth, automatic current applicability, AI adjudication, and implementation semantics.

**Current ratification state: PENDING EXPLICIT ACCEPTANCE.**

No Constitution or Domain Model change has been made.

**Gate 2:** OPEN  
**G2-SEAM-04:** ELIGIBLE FOR RATIFICATION  
**ERD:** HOLD  
**Schema:** HOLD  
**Implementation:** DEFERRED

## 10.26 Gate 2 G2-SEAM-04 Assertion Concept — RATIFIED — 2026-10-05

**Ratification record:** `docs/research/gate-2-assertion-ratification-record-2026-10-05.md`  
**Commit:** 4171e261c31ec5291895338653fade0c656111fd

Explicit acceptance has now ratified **Assertion** as a first-class semantic domain concept.

### Reconciliation

- Constitution updated: commit `9c16f1797d61a971fa95c493149a6f4e1407b6e9`
- Domain Model updated: commit `dc6e3556d91cedcf1eb77a52626316caea122ec6`
- Relationship Model updated: commit `818287333221cd0213fd18be01bc58d5340bcf47`

The ratified concept closes the witnessed semantic gap without creating truth-by-record, universal authority, automatic verification, automatic conflict resolution, safeguarding clearance, public disclosure permission, or implementation mechanics.

### Gate consequence

**G2-SEAM-04:** CLOSED — semantic concept ratified.  
**Gate 2:** OPEN — remaining seams unresolved.  
**ERD:** HOLD pending remaining seam interrogation.  
**Schema:** HOLD.  
**RLS/API/UI:** DEFERRED.  
**Implementation:** DEFERRED.

Next authorized work: continue adversarial interrogation of the next Gate 2 seam. Do not freeze the ERD until all required seams are resolved.

## 10.27 Gate 2 G2-SEAM-05 — Safeguarding Response Governance Stop — 2026-10-06

**Governance re-witness:** `docs/research/gate-2-safeguarding-response-governance-rewitness-2026-10-06.md`  
**Commit:** 3e5146a180a5c0be91a47795da5b4a4b5d390058

G2-SEAM-05 was adversarially interrogated after G2-SEAM-04 Assertion ratification.

### Finding

Gate 1 already ratified the distinctions between:

- Concern / Report
- Finding / Substantiation
- Protective Action
- Investigation Outcome
- Final Resolution

The current domain also contains AuditEvent, Evidence, Verification, and the relevant actor/organization relationships.

However, **AuditEvent is not sufficient to represent the substantive safeguarding response lifecycle**. It records system accountability, not the domain process itself.

A first-class **Safeguarding Case/Response** concept is therefore warranted as a **candidate**, but it is NOT RATIFIED.

### Required boundaries

The candidate must not collapse:

- allegation into guilt;
- report into finding;
- protective action into guilt;
- verification into safeguarding clearance;
- one report into permanent exclusion;
- AI into safeguarding adjudication;
- disclosure into public permission.

### Gate consequence

**G2-SEAM-05:** GOVERNANCE STOP  
**Gate 2:** OPEN  
**ERD:** HOLD  
**Schema:** HOLD  
**Implementation:** DEFERRED

Next authorized action: governance review / explicit ratification decision for the candidate Safeguarding Case/Response concept.

## 10.28 Gate 2 G2-SEAM-05 — Safeguarding Case/Response RATIFIED — 2026-10-06

**Ratification review:** `docs/research/gate-2-safeguarding-response-ratification-review-2026-10-06.md`  
**Ratification record:** `docs/research/gate-2-safeguarding-response-ratification-record-2026-10-06.md`  
**Ratification record commit:** `7b8c01742d70a4e0f4dc31bca07faee6d242a1ef`

Explicit acceptance has ratified **Safeguarding Case/Response** as a first-class semantic domain concept.

### Reconciliation

The candidate was tested against M1–M9, Assertion semantics, provenance, temporal applicability, authority boundaries, disclosure boundaries, and implementation deferral.

All tests passed.

Reconciliation authorized and completed:

- Constitution: ratified Safeguarding Case/Response semantic boundary added.
- Domain Model: first-class Safeguarding Case/Response concept and invariants added.
- Relationship Model: conceptual lifecycle relationship added.
- No database schema, RLS, API, UI, retention duration, fixed investigation procedure, universal safeguarding authority, compliance certification, or implementation behavior was introduced.

### Gate consequence

```
G2-SEAM-05: CLOSED — SEMANTIC CONCEPT RATIFIED
GATE 2: OPEN
ERD: HOLD pending remaining seam interrogation
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED
```

The next authorized seam remains **G2-SEAM-06 — child participation / objection / assent / decision relationship**.

---

## 10.29 Methodology Observation — Opportunity Exposure / Surface Area — 2026-10-06

**Source status:** External observation supplied for methodological consideration; the referenced X post could not be independently fetched from the available web surface. The text supplied in the working conversation is therefore treated as **NON-AUTHORITATIVE INPUT**, not evidence.

### Observation

The supplied post frames opportunity as something that can be systematically increased through greater exposure/surface area, positioning, reduced friction, and deliberate access to bottlenecks.

This resonates with ScoutSA's product thesis, but only after applying the project's evidence discipline.

### ScoutSA interpretation

ScoutSA should not promise to manufacture opportunity. It can instead aim to increase **qualified exposure to genuine opportunity** by:

1. making real grassroots player signals more discoverable;
2. improving verification and provenance so visibility carries more trust;
3. reducing legitimate access friction without bypassing consent, safeguarding, or authority boundaries;
4. connecting verified players to relevant opportunities;
5. measuring downstream outcomes rather than vanity exposure.

### Critical correction to the earlier framing

The supplied text contains implementation/compliance claims that are **not currently ratified or established**, including references to hardcoding POPIA, Children's Act consent models, MySAFA identity verification, and SASCOC safeguarding.

ScoutSA must not convert those statements into repository facts.

The stronger formulation is:

> **ScoutSA systematically increases qualified exposure to opportunity while preserving evidence, consent, authority, safeguarding, and feasibility boundaries.**

This aligns the opportunity thesis with the existing North Star without weakening the Constitution.

### Methodological invariant

```
EXPOSURE ≠ OPPORTUNITY
VISIBILITY ≠ ACCESS
DISCOVERABILITY ≠ TRUST
VERIFICATION ≠ GUARANTEE
CONTACT ≠ PLACEMENT
EXPOSURE ≠ OUTCOME
```

The opportunity-surface concept is therefore a **product/methodology hypothesis**, not a ratified domain entity or success guarantee.

**No implementation change authorized from this observation.**


## 10.30 Gate 2 G2-SEAM-06 — Child Participation / Voice RATIFIED — 2026-10-06

**Re-witness:** `docs/research/gate-2-child-participation-voice-governance-rewitness-2026-10-06.md`  
**Ratification review:** `docs/research/gate-2-child-participation-voice-ratification-review-2026-10-06.md`  
**Ratification record:** `docs/research/gate-2-child-participation-voice-ratification-record-2026-10-06.md`  
**Ratification record commit:** `501d901e7a294f458ffbe9ae6875df05db0ff361`

Explicit acceptance has ratified **Child Participation / Voice Record** as a first-class semantic domain concept.

### Reconciliation

The candidate was tested against M8, ConsentRecord, GuardianLink, Assertion, Safeguarding Case/Response, provenance, temporal behavior, disclosure, authority boundaries, and AI non-authority.

All tests passed.

Reconciliation authorized and completed:

- Constitution: child participation/voice semantic boundary added.
- Domain Model: first-class Child Participation / Voice Record and invariants added.
- Relationship Model: conceptual relationship added.
- No fixed age/capacity rule, universal assent/consent rule, child veto, Guardian precedence, schema, RLS, API, UI, or implementation behavior was introduced.

### Gate consequence

```
G2-SEAM-06: CLOSED — SEMANTIC CONCEPT RATIFIED
GATE 2: OPEN
ERD: HOLD pending remaining seam interrogation
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED
```

Next authorized seam: **G2-SEAM-07 — OpportunityApplication participant/state structure.**


## 10.31 Gate 2 G2-SEAM-07 — OpportunityApplication Semantic Sufficiency — 2026-10-06

**Re-witness:** `docs/research/gate-2-opportunity-application-governance-rewitness-2026-10-06.md`  
**Commit:** `76b62c36d1ba8011a307d8e5bd7a067da9a570c1`

G2-SEAM-07 was adversarially interrogated.

### Finding

The existing OpportunityApplication concept is semantically sufficient. No missing first-class domain entity was exposed.

Confirmed boundaries:

- application subject = Player + Opportunity;
- initiating actor does not gain universal Player authority;
- responding actor does not gain unrelated data authority;
- Guardian participation does not replace GuardianLink/ConsentRecord semantics;
- child voice remains separate;
- application state does not establish truth, football ability, safeguarding clearance, placement, or success;
- APPROVED ≠ PLACEMENT;
- DECLINED/EXPIRED ≠ generalized player rejection;
- ConsentRecord remains purpose-bound;
- OpportunityReadiness remains derived;
- Outcome remains distinct;
- AuditEvent does not replace Application.

### Remaining hold

Exact participant cardinality, actor authorization, state taxonomy, withdrawal/cancellation, invitation semantics, correction/dispute, notification/access, and contextual child-participation effects remain unresolved before ERD/schema freeze.

**No new semantic ratification required.**

### Gate consequence

```
G2-SEAM-07: SEMANTICALLY SUFFICIENT / DOMAIN-OPERATIONAL HOLD
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
IMPLEMENTATION: DEFERRED
```

Next authorized seam: **G2-SEAM-08 — Outcome multiplicity and correction/dispute structure.**


## 10.32 Gate 2 G2-SEAM-08 — Outcome Multiplicity / Correction / Dispute — 2026-10-06

**Re-witness:** `docs/research/gate-2-outcome-correction-dispute-governance-rewitness-2026-10-06.md`  
**Commit:** `a2e67e3cb9570e37d12f5ef1f4673cbdd578ed70`

G2-SEAM-08 was adversarially interrogated against the existing Outcome, OpportunityApplication, Assertion, Evidence, Verification, AuditEvent, temporal, disclosure, and provenance semantics.

### Finding

The existing **Outcome** concept is semantically sufficient. No additional first-class semantic entity was exposed.

Confirmed boundaries:

- Outcome ≠ OpportunityApplication state.
- Outcome ≠ truth.
- Outcome ≠ player ranking/reputation.
- Placement ≠ proof of player quality.
- Placement ≠ proof ScoutSA caused the outcome.
- Multiple outcomes are conceptually possible where the opportunity interaction warrants them.
- Correction must preserve historical provenance rather than silently rewrite history.
- Dispute ≠ proof of falsity.
- Contradictory outcome assertions remain attributable until an applicable authority/process resolves them.
- Evidence may support an outcome assertion without establishing truth by record existence.
- AuditEvent supports accountability but does not replace the substantive Outcome.
- Outcome visibility does not become public merely because a Player or Organization is discoverable.
- Historical Outcome ≠ current applicability.
- Fixed retention/deletion semantics remain deferred.

### Remaining relationship / operational decisions

1. Exact Outcome multiplicity/cardinality relative to OpportunityApplication.
2. Event-like versus composite-result representation.
3. Precise Assertion ↔ Outcome relationship.
4. Correction/version/supersession representation.
5. Dispute lifecycle and authorized participants.
6. Placement/registration treatment.
7. Visibility/access policy.
8. Retention/deletion policy.

**No new semantic ratification is required.**

### Gate consequence

```
G2-SEAM-08: SEMANTICALLY SUFFICIENT / RELATIONSHIP-OPERATIONAL HOLD
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED
```

The next authorized action is a **consolidated Gate 2 relationship blocker review** covering G2-SEAM-01, G2-SEAM-02, G2-SEAM-03, G2-SEAM-07, and G2-SEAM-08.

If consolidation exposes a missing semantic concept rather than a relationship/operational decision:

`STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED → DOMAIN RECONCILIATION`

No conceptual ERD freeze is authorized until the remaining relationship decisions are explicitly resolved.


## 10.33 Gate 2 — Consolidated Relationship Blocker Review — 2026-10-06

**Review:** `docs/research/gate-2-consolidated-relationship-blocker-review-2026-10-06.md`  
**Commit:** `52a17438eb0e063f87e33d6df2b442d7845d4d76`

### Consolidated result

G2-SEAM-01 through G2-SEAM-08 have now been consolidated.

The major result is that **no additional first-class semantic concept is currently warranted** beyond the three concepts already introduced through governance:

1. Assertion;
2. Safeguarding Case/Response;
3. Child Participation / Voice Record.

The remaining blockers are relationship, cardinality, authorization-process, lifecycle, correction/dispute, and access-policy decisions.

### Remaining Gate 2 blockers

| Seam | Status | Remaining decision class |
|---|---|---|
| G2-SEAM-01 User ↔ Player | OPEN | Cardinality / delegation |
| G2-SEAM-02 User ↔ Guardian/Coach/Scout/Organization | OPEN | Actor multiplicity / affiliation / authorization |
| G2-SEAM-03 GuardianLink ↔ ConsentRecord | OPEN | Conflict handling / authorizing-person relationship / applicability |
| G2-SEAM-04 Assertion ↔ Evidence | CLOSED | Technical relationship detail only |
| G2-SEAM-05 Safeguarding Case/Response | CLOSED | Representation / operational detail |
| G2-SEAM-06 Child Participation/Voice | CLOSED | Representation / contextual effects |
| G2-SEAM-07 OpportunityApplication | SUFFICIENT / HOLD | Participants / state lifecycle / authorization |
| G2-SEAM-08 Outcome | SUFFICIENT / HOLD | Multiplicity / correction / dispute / supersession |

### Gate 2 control

```
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED
```

### 33×3 control

- **Existence: PASS** — required semantic concepts are represented or explicitly deferred through governance.
- **Coherence: PASS** — no unresolved relationship decision currently requires contradiction of the ratified semantic baseline.
- **Failure containment: PASS** — unresolved cardinality, authority, lifecycle, correction/dispute, and disclosure questions remain visible rather than being silently encoded.

### Next authorized order

1. G2-SEAM-01 — User ↔ Player cardinality.
2. G2-SEAM-02 — actor / organization affiliation.
3. G2-SEAM-03 — GuardianLink / Consent operational authority.
4. G2-SEAM-07 — OpportunityApplication participant/state model.
5. G2-SEAM-08 — Outcome multiplicity/correction/dispute.

Only after these are explicitly resolved should the conceptual ERD be drafted and adversarially reviewed.

**No implementation is authorized by this consolidation.**


## 10.34 Gate 2 G2-SEAM-01 — User ↔ Player Identity / Cardinality Re-Witness — 2026-10-06

**Re-witness:** `docs/research/gate-2-user-player-cardinality-rewitness-2026-10-06.md`  
**Commit:** `4136594a16e7724fe66cc1e8deeb8cfbae6365af`

### Finding

G2-SEAM-01 was adversarially re-witnessed against the ratified Constitution, Domain Model, Player Passport semantics, and existing Gate 2 relationship boundaries.

The semantic boundary is stable:

- USER ≠ PLAYER;
- Player may exist without a User account;
- User may exist without being a Player;
- User role does not prove football identity;
- account lifecycle does not automatically control Player lifecycle.

No additional first-class semantic concept is currently warranted.

### Unresolved domain decision

The exact User ↔ Player cardinality remains **OPEN**. Strict one-to-one, optional one-to-one, one-to-many, and many-to-one each introduce assumptions that are not currently ratified.

Delegated/shared Player access is likewise **OPEN**. If such access is required, its authority, lifecycle, provenance, and scope must be explicitly defined before an access/delegation concept is introduced into the ERD.

### Disposition

- G2-01A USER ≠ PLAYER: **RATIFIED / EXISTING BOUNDARY**.
- G2-01B Player may exist without User: **DERIVABLE / SAFE**.
- G2-01C User may exist without Player: **DERIVABLE / SAFE**.
- G2-01D Exact cardinality: **OPEN — DOMAIN DECISION REQUIRED**.
- G2-01E Delegated/shared access: **OPEN — DOMAIN + AUTHORIZATION DECISION REQUIRED**.
- G2-01F Account lifecycle automatically controls Player lifecycle: **REJECTED / NOT ESTABLISHED**.

### Gate consequence

No ERD cardinality is frozen and no delegation/access entity is invented.

```
G2-SEAM-01: SEMANTICALLY STABLE / CARDINALITY HOLD
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED
```

Next authorized seam: **G2-SEAM-02 — User ↔ Guardian / Coach / Scout / Organization affiliation and authorization.**


## 10.35 Gate 2 G2-SEAM-02 — User ↔ Guardian / Coach / Scout / Organization Re-Witness — 2026-10-06

**Re-witness:** `docs/research/gate-2-user-actor-organization-affiliation-rewitness-2026-10-06.md`  
**Commit:** `a6d0ec29b970af790ebc24a223e72d6c7eb18fe9`

### Finding

G2-SEAM-02 was adversarially re-witnessed. The semantic boundary is stable: User identity remains distinct from Guardian/Coach/Scout role semantics and from Organization affiliation. Role or affiliation does not create universal authority or verification.

Guardian authority remains Player-specific through GuardianLink. Organization affiliation may require temporal/history semantics when it affects authority-bearing assertions or actions.

No additional first-class semantic concept is currently warranted.

### Unresolved domain / operational decisions

- exact actor-role multiplicity;
- exact User ↔ Organization affiliation/cardinality;
- exact organization authorization and verification process.

Common technical structures such as OrganizationMembership, RoleAssignment, OrganizationAffiliation, or ActorAuthorization must not be invented in the conceptual ERD merely because they are familiar implementation patterns.

### Disposition

- G2-02A User identity distinct from actor-role semantics: **RATIFIED / EXISTING BOUNDARY**.
- G2-02B Role assignment ≠ verification: **RATIFIED / EXISTING BOUNDARY**.
- G2-02C Organization affiliation distinct from User identity: **DERIVABLE / SAFE**.
- G2-02D Guardian relationship remains Player-specific through GuardianLink: **DERIVABLE / SAFE**.
- G2-02E Exact actor-role multiplicity: **OPEN — DOMAIN DECISION REQUIRED**.
- G2-02F Exact User ↔ Organization affiliation/cardinality: **OPEN — DOMAIN / OPERATIONAL DECISION REQUIRED**.
- G2-02G Exact organization authorization/verification process: **OPEN — OPERATIONAL / LEGAL DECISION REQUIRED**.
- G2-02H Role or affiliation creates universal authority: **REJECTED**.

### Gate consequence

No new semantic amendment is warranted. No permanent user.organization_id, role-implied authority, or universal organization access rule is frozen. No new conceptual authorization entity is invented.

G2-SEAM-02: **SEMANTICALLY STABLE / AFFILIATION-AUTHORIZATION HOLD**  
GATE 2: **OPEN**  
ERD: **HOLD**  
SCHEMA: **HOLD**  
RLS/API/UI: **DEFERRED**  
IMPLEMENTATION: **DEFERRED**

Next authorized seam: **G2-SEAM-03 — GuardianLink ↔ ConsentRecord operational authority.**


## 10.36 Gate 2 G2-SEAM-07 — OpportunityApplication Participant / State Re-Witness — 2026-10-06

**Re-witness:** `docs/research/gate-2-opportunity-application-participant-state-rewitness-2026-10-06.md`  
**Commit:** `4704ae229ad56bce18bdbade54b15ed022632239`

### Finding

OpportunityApplication remains semantically sufficient as a first-class concept. Its subject is the Player in relation to an Opportunity. No additional semantic entity was exposed.

The re-witness preserves the distinction between Player, initiating/submitting actor, Opportunity-side actor, Guardian participation where applicable, Child Participation / Voice, and later Outcome.

Application state describes the application interaction only. It does not establish truth, football ability, safeguarding clearance, legal authority, suitability, placement, or future success. `APPROVED ≠ PLACEMENT` remains mandatory.

### Remaining decisions

- exact participant cardinality;
- exact actors permitted to initiate/submit/respond/transition;
- Player/Guardian behavior for minors;
- complete lifecycle vocabulary, including withdrawal/cancellation/invitation where required;
- correction/dispute behavior;
- access/notification semantics.

No technical ApplicationParticipant or StateTransition concept is invented merely for implementation convenience.

### Disposition

G2-07A Application first-class: **CONFIRMED**.  
G2-07B Player + Opportunity subject: **SAFE / DERIVABLE**.  
G2-07C Initiating actor may vary by context: **SAFE PRINCIPLE; exact authorization OPEN**.  
G2-07D Guardian participation does not replace GuardianLink/ConsentRecord: **RATIFIED / SAFE**.  
G2-07E Child Voice remains separate: **RATIFIED / SAFE**.  
G2-07F Application state ≠ truth/placement/success: **RATIFIED / SAFE**.  
G2-07G Participant cardinality: **OPEN — DOMAIN/OPERATIONAL DECISION**.  
G2-07H State taxonomy/transition authority: **OPEN — OPERATIONAL DECISION**.  
G2-07I Withdrawal/cancellation/invitation: **OPEN**.  
G2-07J New semantic concept: **NOT WARRANTED**.

### Gate consequence

G2-SEAM-07: **SEMANTICALLY SUFFICIENT / DOMAIN-OPERATIONAL HOLD**  
GATE 2: **OPEN**  
ERD: **HOLD**  
SCHEMA: **HOLD**  
RLS/API/UI: **DEFERRED**  
IMPLEMENTATION: **DEFERRED**

Next authorized seam: **G2-SEAM-08 — Outcome multiplicity / correction / dispute structure.**


## 10.37 Gate 2 G2-SEAM-08 — Outcome Multiplicity / Correction / Dispute Re-Witness — 2026-10-06

**Re-witness:** `docs/research/gate-2-outcome-correction-dispute-rewitness-2026-10-06.md`  
**Commit:** `eef1dccc2ee2af4ed0d4384722370ff723d4acd2`

### Finding

Outcome remains semantically sufficient as a first-class domain concept. No additional semantic entity was exposed.

The re-witness preserves these boundaries:

- Outcome ≠ OpportunityApplication state;
- Outcome ≠ truth;
- Placement ≠ proof ScoutSA caused placement;
- Outcome ≠ ranking/reputation;
- correction does not silently erase history;
- dispute ≠ proof of falsity;
- contradictory outcome assertions remain attributable until applicable resolution;
- Evidence supports an Outcome-related Assertion without automatically establishing truth;
- Outcome visibility does not become public merely because a Player or Organization is discoverable;
- historical Outcome ≠ current applicability.

### Remaining relationship / operational decisions

1. Exact Outcome multiplicity/cardinality relative to OpportunityApplication.
2. Event-like versus composite-result representation.
3. Precise Assertion ↔ Outcome relationship.
4. Correction/version/supersession representation.
5. Dispute lifecycle and authorized participants.
6. Placement/registration treatment.
7. Visibility/access policy.
8. Retention/deletion policy.

No technical OutcomeVersion, OutcomeDispute, OutcomeEvent, or StatusHistory concept is promoted into the domain merely for implementation convenience.

### Disposition

G2-08A Outcome first-class: **CONFIRMED**.  
G2-08B Multiple Outcomes conceptually possible: **SAFE / DERIVABLE**.  
G2-08C Outcome ≠ Application state: **RATIFIED / SAFE**.  
G2-08D Correction preserves provenance: **RATIFIED / SAFE**.  
G2-08E Dispute ≠ proof of falsity: **SAFE PRINCIPLE**.  
G2-08F Contradictory outcome assertions remain attributable: **SAFE PRINCIPLE**.  
G2-08G Outcome ≠ ranking/reputation: **RATIFIED / SAFE**.  
G2-08H Exact multiplicity/cardinality: **OPEN — DOMAIN DECISION**.  
G2-08I Correction/version/supersession: **OPEN — DOMAIN/OPERATIONAL DECISION**.  
G2-08J Dispute lifecycle: **OPEN — OPERATIONAL DECISION**.  
G2-08K Placement/registration treatment: **OPEN**.  
G2-08L Access/retention: **OPEN — POLICY/LEGAL DECISION**.  
G2-08M New semantic entity: **NOT WARRANTED**.

### Gate consequence

G2-SEAM-08: **SEMANTICALLY SUFFICIENT / RELATIONSHIP-OPERATIONAL HOLD**  
GATE 2: **OPEN**  
ERD: **HOLD**  
SCHEMA: **HOLD**  
RLS/API/UI: **DEFERRED**  
IMPLEMENTATION: **DEFERRED**

Next authorized action: **consolidated Gate 2 blocker review and decision package** for G2-01, G2-02, G2-03, G2-07, and G2-08.


## 10.38 Gate 2 — Consolidated Decision Package / Conceptual ERD Draft Authorization — 2026-10-06

**Decision package:** `docs/research/gate-2-consolidated-decision-package-2026-10-06.md`  
**Commit:** `e237b85eb43c251e76f6a0bf4e5d2493e2e302db`

### Consolidated result

The remaining Gate 2 seams were classified without inventing new semantics:

- G2-01 User ↔ Player: cardinality/delegation remain domain/authorization decisions.
- G2-02 User ↔ actors/Organization: multiplicity, affiliation and authorization remain domain/operational decisions.
- G2-03 GuardianLink ↔ ConsentRecord: conflict effect and authoriser relationship remain legal/operational/domain decisions.
- G2-07 OpportunityApplication: participant cardinality, lifecycle and transition authority remain domain/operational decisions.
- G2-08 Outcome: multiplicity, correction/dispute/supersession and access remain domain/operational/legal-policy decisions.

### Key conclusion

**Missing-semantic-concept test: PASS.** No additional first-class semantic concept is currently warranted beyond Assertion, Safeguarding Case/Response, and Child Participation/Voice Record.

**ERD readiness test: PASS at the semantic-ontology level.** The remaining uncertainty can be represented explicitly as unresolved relationship/policy decisions rather than silently guessed.

### Authorized transition

**GATE 2 — SEMANTIC RELATIONSHIP INTEGRITY: READY FOR CONCEPTUAL ERD DRAFT.**

This is not full Gate 2 closure. The next authorized activity is one implementation-independent conceptual ERD draft followed by one consolidated adversarial ERD review.

The ERD must mark unresolved cardinalities and operational/legal dependencies explicitly. No schema, RLS, API, UI, authentication, storage, or implementation behavior is authorized by this transition.

### 33×3

- Existence: **PASS**
- Coherence: **PASS**
- Failure containment: **PASS**

**Next authorized action: conceptual ERD drafting.**


## 10.39 Gate 2 — Conceptual ERD Draft + Adversarial Review — 2026-10-06

**Conceptual ERD:** `docs/research/gate-2-conceptual-erd-draft-2026-10-06.md`  
**Draft commit:** `ed237ae6fa268a91cedd661669a15cec81ee97b3`  
**Adversarial-review/correction commit:** `1164e994a88ff4bdf98844ba52564763e5baf365`  
**Current ERD blob:** `1373ede1eceeb5e8f3d550dd5abbca42597067da`

### Authorized action completed

The first implementation-independent conceptual ERD draft was created from the ratified Constitution, Domain Model, Relationship Model, Gate 2 seam witnesses, and consolidated decision package.

The draft explicitly represents established relationships while marking unresolved cardinality, delegation, affiliation, authority, lifecycle, correction/dispute, visibility, retention, and legal/operational dependencies as **OPEN**.

No schema, foreign-key design, RLS, API, UI, authentication, storage, or implementation behavior was introduced.

### Adversarial review

A consolidated adversarial review was performed against:

- first-class domain concepts;
- Gate 1 M1–M9 semantic boundaries;
- Assertion;
- Safeguarding Case/Response;
- Child Participation/Voice;
- User/Player identity;
- GuardianLink/ConsentRecord;
- OpportunityApplication;
- Outcome;
- provenance/history;
- derived readiness;
- disclosure/republication.

One scope defect was found and corrected: Safeguarding Case/Response must not be read as inherently Player-owned. Its conceptual subject remains a defined safeguarding matter/subject. No new semantic concept was required.

### Result

- Conceptual ERD: **ADMISSIBLE / NOT FROZEN**
- Missing semantic concept test: **PASS**
- Semantic coherence: **PASS**
- Failure containment: **PASS**
- Gate 2: **OPEN**
- Relationship freeze: **NOT YET RATIFIED**
- Schema: **HOLD**
- RLS/API/UI: **DEFERRED**
- Implementation: **DEFERRED**

### Evidence boundary

G2-SEAM-03 (GuardianLink ↔ ConsentRecord) remains an explicit repository evidence gap because its dedicated re-witness artifact was previously blocked from commit. The ERD therefore does not claim a complete G2-03 repository evidence trail; the underlying relationship decision remains OPEN.

### Next control

Before relationship freeze, resolve or explicitly carry forward the remaining OPEN Gate 2 decisions. Do not allow the ERD to become a backdoor for technical implementation or invented authority.



## 10.40 Gate 2 — Final Conceptual Relationship Freeze — 2026-10-06

**Review:** `docs/research/gate-2-final-conceptual-relationship-freeze-review-2026-10-06.md`  
**Commit:** `2561afcd9b7cfd1ad60e88f98272d4fabedbe0d7`

### Final test

The five remaining Gate 2 seam families were tested against one question:

> Does any remaining relationship decision force a hidden semantic assumption into the conceptual ERD?

**Answer: NO.**

The remaining items can remain explicit OPEN/DEFERRED boundaries without changing the ratified semantic ontology.

### Five-way classification control

Every remaining question is now assigned exactly one of:

- RATIFY;
- DEFER AS OPERATIONAL POLICY;
- DEFER AS LEGAL/JURISDICTIONAL;
- REJECT;
- IMPLEMENTATION DETAIL — AFTER ERD.

The Outcome access/retention item was corrected to a single classification: **DEFER AS LEGAL/JURISDICTIONAL**.

### 33×3

```
Existence:           PASS
Coherence:           PASS
Failure containment: PASS
```

### Gate decision

```
Gate 2 — Semantic Relationship Integrity: CLOSED AT CONCEPTUAL LEVEL
Conceptual ERD: FROZEN
Schema: HOLD
RLS/API/UI: DEFERRED
Implementation: DEFERRED
Compliance claim: NONE
Investor-ready claim: NONE
```

This is a narrow conceptual closure. It does not resolve deferred cardinality, authority-process, lifecycle, correction/dispute, access, retention, or legal questions.

### Evidence boundary

G2-SEAM-03 retains an explicit repository evidence-completeness note: the dedicated re-witness artifact was previously blocked from commit. The semantic conclusion is not promoted into a claim of complete repository evidence for that seam.

### Authorized next phase

**MVP BOUNDARY FREEZE**

```
Frozen Conceptual ERD
        ↓
MVP scope + explicit non-scope
        ↓
Operational / legal carry-forward
        ↓
MVP relationship subset
        ↓
Schema
        ↓
Implementation
```

No implementation is authorized merely because Gate 2 is conceptually closed.


## 10.42 — MVP Boundary → Physical Schema Draft — 2026-10-06

- MVP implementation prerequisites explicitly ratified: commit `bd70952e54671bde7970d138a4691f1285d30458`.
- Schema Boundary adversarial review passed and boundary frozen: commit `8846d7901919f56acd0d4a25ed20e1f2a107add2`.
- Field/Constraint Decision Matrix adversarial review passed: commit `2dcbbf2b945ba53b330a3d041eceb749a6b809be`.
- Physical table boundary frozen after traceability review: commit `692d01f102949602dbb0714e3e79e7b3410712dd`.
- Traceable SQL schema draft created at `docs/research/scoutsa-schema-draft.sql`: commit `8f5dd03436122975747ab324c429cd0db0260a58`.
- SQL is **DRAFT ONLY**; no migration has been run and no production implementation is claimed.
- Unresolved legal/operational questions remain comments/holds rather than technical assumptions.
- Next required witness: SQL draft syntax/traceability/adversarial review before any migration authorization.


## 10.43 — PostgreSQL Runtime Witness / Migration Hold — 2026-10-06

**Environment witness:** `docs/research/postgresql-runtime-witness-environment-limitation-2026-10-06.md`  
**Commit:** `52ec22a279d14dc75e15aa6ed968771fffaa242e`

The SQL draft static witness was completed, but the available execution environment does not contain a PostgreSQL server or PostgreSQL-compatible parser/runtime. `pg_config` is present, but is insufficient by itself to establish parser or runtime execution evidence.

Therefore the repository records the following conservatively:

- SQL draft static witness: **PASS WITH RUNTIME HOLD**.
- PostgreSQL syntax/parser witness: **UNAVAILABLE / NOT TESTED**.
- Migration-safety review: **HOLD**.
- Migration: **HOLD**.
- Production database write: **NOT AUTHORIZED**.

The environment limitation is now preserved as a dedicated evidence artifact rather than being treated as a failed SQL result or silently omitted.

### Required next evidence

1. Actual PostgreSQL syntax/parser/runtime witness.
2. Exact PostgreSQL version and execution result.
3. Migration transaction/reversibility review.
4. Field/nullability/default reconciliation against the frozen decision matrix.
5. RLS/access review.
6. Non-production migration dry run.
7. Explicit migration authorization.
8. Post-migration runtime witness.

### Current controlled sequence

```
SQL draft
   ↓
Static witness                         PASS
   ↓
PostgreSQL runtime witness             UNAVAILABLE
   ↓
Migration-safety review                HOLD
   ↓
Explicit migration authorization       REQUIRED
   ↓
Non-production migration               ONLY AFTER AUTHORIZATION
   ↓
Post-migration runtime witness         REQUIRED
```

**No database implementation is authorized by the environment witness.**


## 10.44 — Migration-Safety Design While PostgreSQL Runtime Is Unavailable — 2026-10-06

**Artifact:** `docs/research/migration-safety-design-hold-2026-10-06.md`  
**Commit:** `ebad53fc9a6b99ab548b11ad97ac82c37dcf8e6b`

With PostgreSQL execution unavailable, the next control was advanced without crossing the runtime boundary: the migration-safety evidence requirements were explicitly defined.

The controlled prerequisites are now:

1. exact SQL input/blob verification;
2. actual PostgreSQL parser/runtime witness;
3. transaction and reversibility review;
4. field/constraint reconciliation;
5. separate RLS/access review;
6. authorized non-production dry run;
7. post-migration runtime witness;
8. explicit production boundary authorization if production is ever considered.

Current decision:

**Migration-safety design: DEFINED / EXECUTION HOLD.**

This does not convert the SQL draft into an executable or validated migration. The PostgreSQL runtime witness remains the gating evidence event.


## 10.45 — SQL ↔ Field/Constraint Reconciliation — 2026-10-06

**Artifact:** `docs/research/sql-field-constraint-reconciliation-2026-10-06.md`  
**Commit:** `b7c64fdf4357f4115be51f3280c2bbdf0b65029c`

The current non-executed SQL draft was reconciled against the frozen Field / Constraint Decision Matrix.

### Result

- Candidate SQL tables remain inside the frozen physical table boundary: **PASS**.
- User, Player, Guardian, Organization, Coach and Scout remain distinct concepts: **PASS**.
- GuardianLink remains distinct from ConsentRecord: **PASS**.
- Assertion, Evidence and Verification remain distinct: **PASS**.
- Child Participation/Voice remains distinct from authority, consent and final decision: **PASS**.
- Safeguarding Case/Response remains distinct from verification, finding, guilt and clearance: **PASS**.
- OpportunityApplication remains distinct from Outcome: **PASS**.
- FootballReadiness and OpportunityReadiness remain derived: **PASS**.
- Conditional academic/medical concepts remain bounded: **PASS**.
- Temporal/provenance requirements are represented without claiming truth: **PASS**.
- Pending legal/operational questions remain unencoded: **PASS**.
- No hidden semantic concept was introduced by the SQL table set: **PASS**.

### Important boundary

The reconciliation is a semantic/traceability witness only. It does **not** establish PostgreSQL parser acceptance, runtime validity, migration safety, RLS correctness, legal compliance, or production readiness.

Remaining holds:
- PostgreSQL runtime/parser witness;
- final nullability/default review;
- indexes/uniqueness review;
- RLS/access design;
- retention/deletion;
- transaction/reversibility;
- authorized non-production dry run;
- post-migration runtime witness.

### 33×3

Existence: **PASS**  
Coherence: **PASS**  
Failure containment: **PASS**

### Decision

**SQL ↔ FIELD/CONSTRAINT RECONCILIATION: PASS**

The SQL draft remains **DRAFT / NOT EXECUTED**.

**Migration: HOLD. Database write: HOLD. RLS: HOLD. API: HOLD. UI: HOLD. Production implementation: HOLD.**

The next required evidence remains an **actual PostgreSQL runtime/parser witness**.


## 10.46 — Future Collaborator Contact — Sobayeni Sports — 2026-10-06

**Contact:** info@sobayenisports.com  
**Status:** FUTURE COLLABORATOR / CONTACT LEAD — NOT YET VERIFIED  
**AuthorityLevel:** NONE

The contact address was supplied for future collaborator tracking.

No claim is made here that the address has been independently verified, that Sobayeni Sports has agreed to collaborate, or that any person/entity represented by the address has been authenticated.

### Boundary

- No outreach has been sent by this ledger entry.
- No affiliation, endorsement, partnership, sponsorship, verification, or authorization is inferred.
- No ScoutSA access or domain authority is granted.
- Any future collaboration must be separately evidenced and recorded before being treated as an established relationship.

**Next action:** retain as a future-collaborator lead for later outreach/verification.


## 10.47 — Current Gate / Implementation Status Reconciliation — 2026-10-06

**Status artifact:** `docs/00-gate-status.md`  
**Commit:** `eb4a8aea209f3891c5dd830d55e0b3d2b0d366f1`  
**Content SHA:** `e67567a193fbbc2875b4d559758df1bfda6a3541`

### Purpose

A status-drift check found that the older Gate 2 section in `docs/00-gate-status.md` still described **MVP Boundary Freeze** as the next phase, even though subsequent ratified/frozen work had already advanced the repository through the schema boundary and SQL draft stages.

The status document has therefore been reconciled with the latest evidence.

### Current controlled state

- Gate 1: **CLOSED**.
- Gate 2: **CLOSED AT CONCEPTUAL LEVEL**.
- Conceptual ERD: **FROZEN**.
- MVP Boundary: **RATIFIED**.
- MVP Relationship Subset: **FROZEN**.
- Implementation Prerequisites: **RATIFIED**.
- Schema Boundary: **FROZEN**.
- Physical Table Boundary: **FROZEN**.
- SQL Schema: **DRAFT / REVIEWED**.
- SQL Static Witness: **PASS WITH RUNTIME HOLD**.
- SQL ↔ Field/Constraint Reconciliation: **PASS**.
- PostgreSQL Runtime Witness: **UNAVAILABLE / NOT TESTED**.
- Migration-Safety Design: **DEFINED / EXECUTION HOLD**.
- Migration, Database, RLS, API, UI and Production Implementation: **HOLD**.
- Future Collaborator Lead: **RECORDED / NOT VERIFIED**.

### Controlled next evidence

```
SQL draft
   ↓
Static witness                         PASS
   ↓
SQL ↔ Field/Constraint reconciliation PASS
   ↓
PostgreSQL syntax/runtime witness     REQUIRED
   ↓
Migration-safety review               HOLD until runtime evidence
   ↓
Explicit migration authorization      REQUIRED
   ↓
Authorized non-production migration   ONLY AFTER AUTHORIZATION
   ↓
Post-migration runtime witness        REQUIRED
```

### Integrity decision

This reconciliation changes **status documentation only**. It does not create PostgreSQL execution evidence, authorize a migration, establish legal compliance, establish production readiness, or alter the frozen semantic/domain/relationship baseline.

The PostgreSQL runtime gap remains an **evidence limitation**, not a PASS or FAIL execution result.

**Decision:** STATUS RECONCILIATION — **PASS**.  
**AuthorityLevel:** NONE beyond the evidence recorded.


## 10.48 — PostgreSQL Runtime Witness — 2026-10-06

**Artifact:** `docs/research/postgresql-runtime-witness-2026-10-06.md`  
**Record commit:** `a214be879d23c8a25b76896d8803027ff25f1935`  
**Workflow:** PostgreSQL Runtime Witness  
**Workflow run:** `37468048851`  
**Job:** `112283944840`  
**Witness commit:** `47210a0500b583cc9ef9b1557df5577edcf5d6e9`  
**SQL blob:** `127d93f100e3fedafcc6a45b6ab6c3ad9ef6478e`

### Runtime result

The previously missing PostgreSQL runtime witness has now been independently observed through GitHub Actions.

- Isolated PostgreSQL service: **PostgreSQL 17.11**.
- Exact SQL blob identity: **MATCH / PASS**.
- Exact SQL draft execution with `ON_ERROR_STOP=1`: **PASS**.
- Tables created: **26**.
- Tables observed: **26 / 26 — PASS**.
- Foreign keys observed: **17 / 17 — PASS**.
- Workflow run: **SUCCESS**.
- Job: **SUCCESS**.

### What this establishes

The exact SQL draft is syntactically/runtime executable against PostgreSQL 17.11 in the isolated witness environment, and its declared 26-table / 17-FK structural checks pass.

### What this does NOT establish

This witness does not establish migration safety, reversibility, RLS correctness, authorization correctness, legal compliance, production readiness, investor readiness, or production database deployment.

No production database was touched.

### Gate consequence

The PostgreSQL runtime evidence gate is now **PASS**.

The migration gate remains **HOLD** pending:

1. migration transaction/reversibility review;
2. final nullability/default review;
3. indexes/uniqueness review;
4. RLS/access review;
5. authorized non-production migration dry run;
6. explicit migration authorization;
7. post-migration runtime witness.

**Decision:** PostgreSQL Runtime Witness — **PASS**.  
**AuthorityLevel:** NONE beyond the evidence recorded.


## 10.49 — Migration-Safety Review — 2026-10-06

**Artifact:** `docs/research/migration-safety-review-2026-10-06.md`  
**Commit:** `bc66741057e0e9b667c51c4d2c904fbda894a55f`

### Result

**MIGRATION-SAFETY REVIEW: CONDITIONAL PASS — MIGRATION AUTHORIZATION HOLD**

The PostgreSQL runtime barrier is cleared for the exact current SQL draft.

Evidence confirms:

- exact SQL blob integrity: PASS;
- PostgreSQL 17.11 runtime execution: PASS;
- 26/26 tables: PASS;
- 17/17 foreign keys: PASS.

The current SQL contains create-table DDL only and no destructive data operations, roles, grants, RLS, triggers, functions, or production-side effects. This supports a controlled transaction design assessment, but rollback/reversibility has **not yet been runtime-witnessed**.

### Remaining controlled holds

1. final nullability/default decision mapping;
2. index/uniqueness decision mapping;
3. RLS/access review;
4. explicit authorization for a non-production migration dry run;
5. transaction/reversibility witness;
6. post-dry-run schema inspection;
7. post-migration runtime witness.

No production migration, hosted database, production credentials, RLS policy, or application data has been introduced.

**Decision:** Migration-safety review — **CONDITIONAL PASS / EXECUTION HOLD**.  
**AuthorityLevel:** NONE beyond the evidence recorded.


## 10.50 — Nullability / Defaults / Index / Uniqueness Review — 2026-10-06

**Artifact:** `docs/research/nullability-default-index-uniqueness-review-2026-10-06.md`  
**Commit:** `d614d971e7537b73aa0d3137089cb2f354b030f8`

**Decision:** **PASS WITH POLICY HOLDS**

- Structural primary keys and required relationship keys remain safe.
- No semantic defaults are authorized.
- Existing 17 foreign keys are structurally valid and runtime-witnessed.
- Business uniqueness constraints remain HOLD because multiplicity/lifecycle decisions remain open.
- Additional indexes remain HOLD pending approved access/workflow patterns.
- Lifecycle CHECK constraints remain HOLD while status vocabularies remain operationally open.
- Policy-sensitive nullability must not be tightened merely for technical convenience.

**Next controlled gate:** RLS / access / disclosure review.

No production database or application data is authorized.


## 10.51 — RLS / Access / Disclosure Boundary Review — 2026-10-06

**Artifact:** `docs/research/rls-access-disclosure-boundary-review-2026-10-06.md`  
**Commit:** `b4824159e1ece056c0d132f7038c7bcf5864fdd3`

**Decision:** **CONDITIONAL PASS — POLICY / LEGAL INPUT REQUIRED BEFORE RLS IMPLEMENTATION**

The semantic access boundary is sufficiently defined to prevent unsafe technical assumptions.

Ratified technical principles:

- default deny for protected data;
- User ≠ automatic Player authority;
- role ≠ universal authority;
- membership ≠ ownership;
- consent ≠ blanket database permission;
- Assertion visibility ≠ Evidence visibility;
- protected domains require narrower access;
- current applicability matters;
- audit records are not public surfaces;
- RLS cannot decide legal guardian precedence, capacity, best interests, safeguarding guilt, lawful basis, or final dispute resolution.

Production RLS remains **NOT AUTHORIZED**.

Required before implementation:

1. approved MVP access purposes and actors;
2. legal/jurisdictional review for protected/minor data;
3. predicate-to-authority mapping;
4. correction/dispute effects;
5. retention/deletion interaction;
6. deny-by-default and cross-purpose leakage tests;
7. non-production RLS tests;
8. explicit implementation authorization.

No production database or application data is authorized.


## 10.52 — MVP Access-Policy Decision Matrix — 2026-10-06

Artifact: docs/research/mvp-access-policy-decision-matrix-2026-10-06.md
Commit: be583b62479c9292b6d11d45565dcb2752388291

Decision: SEMANTICALLY COMPLETE / POLICY-LEGAL RATIFICATION REQUIRED.

The matrix introduces four controlled classifications: ALLOW, DENY, CONDITIONAL, HOLD. Unresolved policy/legal questions are not converted into permissions.

Covered resources: Player identity, Assertion, Evidence, Verification, ConsentRecord, Media, AcademicProfile, MedicalClearance, TransportProfile, Opportunity, OpportunityApplication, Outcome, Child Participation/Voice, Safeguarding Case/Response and AuditEvent.

Protected/accountability access was deliberately tightened to CONDITIONAL rather than treated as universal authorization.

No legal Guardian precedence, child-capacity rule, safeguarding finding, consent-validity rule, republication permission, or universal role authority was invented.

RLS implementation remains NOT AUTHORIZED.


## 10.53 — MVP Access-Policy Matrix Adversarial Review — 2026-10-06

Artifact: docs/research/mvp-access-policy-decision-matrix-adversarial-review-2026-10-06.md
Commit: b7189aedc2660e3d364fdb05d28b40a1332c1605

Adversarial review: PASS WITH POLICY-LEGAL HOLDS.

Existence: PASS.
Coherence: PASS.
Failure containment: PASS.

The review confirmed preservation of USER ≠ PLAYER, ROLE ≠ UNIVERSAL AUTHORITY, MEMBERSHIP ≠ OWNERSHIP, ASSERTION ≠ EVIDENCE, VERIFICATION ≠ SAFEGUARDING CLEARANCE, CHILD VOICE ≠ FINAL DECISION, DISCOVERABLE ≠ REPUBLISHABLE, and HISTORICAL AUTHORIZATION ≠ CURRENT ACCESS.

The review also recorded and corrected the initial over-broad Protected/Accountability ALLOW classification to CONDITIONAL.

Remaining holds include identity/delegation, organization authority, Guardian conflict, application transitions, outcome correction/dispute, child-voice effects, safeguarding procedure, public-field disclosure, protected/minor-data access, retention/deletion and republication.

RLS implementation: NOT AUTHORIZED.
Migration: HOLD.
Production database: HOLD.


## 10.54 — MVP Actor × Purpose × Resource Authorization Map — 2026-10-06

Artifact: docs/research/mvp-actor-purpose-resource-authorization-map-2026-10-06.md
Commit: 1b60a47396f5c128786de2bfd1738609ca15b19b

The MVP access boundary was decomposed into explicit actor contexts, purposes and resources using ALLOW, DENY, CONDITIONAL and HOLD.

Actor contexts remain separate from role titles:
- Player / subject;
- Scoped Guardian;
- Opportunity-side organization actor;
- Public / discovery viewer;
- Accountability actor;
- System / service.

Purpose classes include Passport management, Discovery, Verification, Contact request, Trial request, Opportunity administration, Consent administration, Safeguarding response, Accountability/audit, Public display and Derived readiness.

Decision: COMPLETE AS A POLICY-DESIGN ARTIFACT / READY FOR EXPLICIT POLICY-LEGAL RATIFICATION.

RLS remains NOT AUTHORIZED.


## 10.55 — MVP Actor × Purpose × Resource Authorization Map — Adversarial Review — 2026-10-06

Artifact: docs/research/mvp-actor-purpose-resource-authorization-map-adversarial-review-2026-10-06.md
Commit: c76aad64543e8f4e2fa4ab11eb5d2280392d6692

Review result: PASS WITH POLICY / LEGAL HOLDS.

Existence: PASS.
Coherence: PASS.
Failure containment: PASS.

The review confirmed that the map does not invent Guardian precedence, child capacity, safeguarding adjudication, consent validity, universal role authority, republication permission or RLS logic.

Public access remains narrow. Organization access remains opportunity-scoped. Guardian access remains Player-specific and purpose-bound. Sensitive domains remain separated. System execution remains subordinate to approved policy.

Remaining holds include User↔Player delegation, organization actor affiliation, Guardian conflict/authorizer validity, application transition authority, public Passport fields, public Verification display state, outcome correction/dispute, child participation effects, safeguarding authority, medical/academic disclosure, retention/deletion and lawful basis/republication.

RLS: NOT AUTHORIZED.
Migration: HOLD.
Production: HOLD.


## 10.56 — Process-Duration / External-Validation Control — 2026-10-06

The repository review identified a legitimate strategic risk: governance activity can become an end in itself.

Decision: **DO NOT OPEN ANOTHER INTERNAL GOVERNANCE GATE WITHOUT A CONCRETE UNCERTAINTY.**

The current internal model is sufficiently developed to expose the MVP to external reality. The next progress test is not another self-ratification ceremony; it is evidence from prospective Vaal Triangle football organizations, guardians/participants where appropriate, and qualified legal/safeguarding review.

### External validation questions

1. Can real Vaal football organizations understand and use the Player Passport / Opportunity model?
2. What information is actually required before contact or trial decisions?
3. What information would organizations refuse to receive, store or expose?
4. Which Guardian and safeguarding workflows are workable in practice?
5. Which MVP concepts are unnecessary, confusing or operationally burdensome?
6. Does Opportunity Readiness address a real access constraint?

External feedback is evidence input, not automatic ratification. Material contradictions return through the existing governance method; non-material feedback does not automatically create new artifacts.

**Strategic decision:** freeze governance ritual at its current sufficient level and prioritize external validation before further internal expansion.

**Implementation remains HOLD.**


## 10.57 — F1–F3 SQL Amendment Runtime Witness — 2026-10-06

Artifact: docs/research/postgresql-runtime-witness-f1-f3-amended-2026-10-06.md
Commit: 323749142bf6033b3a4a80073fe00b9627652594

The amended SQL blob `00f0dd0542f7f9a92447799f1452b26c513b06a5` was independently re-witnessed after F1–F3 changes.

GitHub Actions run `37479429284`, job `112323365262`: SUCCESS.

- exact amended SQL blob verification: PASS
- PostgreSQL 17 runtime: PASS
- exact SQL execution with ON_ERROR_STOP=1: PASS
- 26 tables: PASS
- 17 foreign keys: PASS

This witness supersedes the previous runtime evidence for the amended SQL only. It remains non-production evidence and does not authorize migration, RLS or production use.


## 10.58 — End-of-Day Progress & Next Action Plan — 2026-10-06

### Today's progress

ScoutSA completed a significant transition from internal domain/schema preparation toward controlled external validation.

1. **Canonical status reconciled** — `docs/00-gate-status.md` was corrected so the executive state matches the later ledger/research evidence. Gate 1 is CLOSED; Gate 2 is CLOSED at conceptual level; conceptual ERD is FROZEN; MVP Boundary is RATIFIED; MVP Relationship Subset is FROZEN; Schema/Physical Table boundaries are FROZEN; SQL remains DRAFT/REVIEWED; runtime evidence is PASS; migration and RLS remain held.
2. **Governance expansion deliberately frozen** — the repository now records that another internal gate/artifact should not be created unless a concrete uncertainty or new evidence requires it.
3. **External validation plan established** — five initial stakeholder conversations are targeted: 2 grassroots coaches, 1 school sports coordinator, 1 youth-player guardian, and 1 scout/academy recruiter. The core test is deliberately non-leading: what actually prevents talented young players from reaching trials/opportunities?
4. **Scoped legal review identified** — a 1–2 hour South African legal review is proposed for the Consent Model, access-policy matrix, POPIA/Children's Act assumptions. It is an external input, not a compliance certification.
5. **SQL adversarial review produced three required amendments** — F1 responsible authority on safeguarding responses; F2 membership validity bounds; F3 required provenance anchors for conditional/contextual records.
6. **F1–F3 amendments applied to SQL** — amended SQL blob: `00f0dd0542f7f9a92447799f1452b26c513b06a5`.
7. **Fresh PostgreSQL runtime witness completed** — GitHub Actions run `37479429284`, job `112323365262`: exact amended blob verified; PostgreSQL 17 execution PASS; 26 tables PASS; 17 foreign keys PASS. This fresh witness supersedes the earlier runtime evidence for the amended SQL.
8. **Methodology correction identified** — future schema reviews must test both directions: (a) schema feature → approved source, and (b) every ratified matrix requirement → represented physical field/constraint. The second direction is now an explicit control because F1 exposed its absence.

### Today's achieved state

**ScoutSA is no longer authorized to grow governance merely for its own sake.** The internal foundation is sufficiently mature for external reality-testing. The product remains non-production and no RLS/migration authorization has been granted.

### Next action plan — next working session

**Priority 1 — External validation preparation**
- Prepare a one-page plain-language ScoutSA explanation for people unfamiliar with gates/seams/witnesses.
- Prepare the five-conversation interview sheet using neutral, non-leading questions.
- Identify the first Vaal Triangle stakeholder contacts.

**Priority 2 — Legal review preparation**
- Package only the Consent Model + MVP access-policy matrix + relevant legal assumptions for a narrowly scoped reviewer.
- Do not ask for broad “compliance certification.”

**Priority 3 — One final technical reconciliation**
- Perform the bidirectional Field/Constraint Matrix ↔ SQL column/constraint trace on the amended SQL.
- Record only concrete defects or unresolved implementation dependencies.
- Do not reopen settled semantic decisions.

**Priority 4 — Hold implementation**
- No RLS SQL.
- No migration.
- No production database.
- No production readiness claim.

### Exit condition for this phase

The next phase should be considered complete only when external stakeholder evidence and scoped legal input have been gathered and reconciled with the existing MVP boundary/access model, or when documented evidence shows that the proposed validation cannot yet be obtained.

**Operating principle:** The methodology has done enough work to earn contact with reality. From here, evidence from real stakeholders should drive the next material change.


## 10.59 — Bidirectional SQL Traceability Review — 2026-10-07

Artifact: docs/research/bidirectional-field-constraint-sql-traceability-review-2026-10-07.md
Commit: 7076bae4b187999caa76bf5d9832dfe8c6ace40e

The amended SQL was reviewed in both directions against the Field/Constraint Decision Matrix.

**Source → SQL:** PASS, with two explicitly bounded implementation/lifecycle holds:
- derived-state version/context representation (D1);
- consent withdrawal/supersession representation (F5).

**SQL → Source:** PASS. No orphan physical field or constraint was identified.

The review found no hidden authority, legal precedence, verification-as-truth, verification-as-safeguarding-clearance, republication permission, readiness-as-ranking, or other ratified semantic collapse.

33×3: Existence PASS / Coherence PASS / Failure containment PASS.

Decision: BIDIRECTIONAL TRACEABILITY PASS WITH IMPLEMENTATION-DETAIL / LIFECYCLE HOLDS.

No new governance gate opened. Migration remains HOLD; RLS remains NOT AUTHORIZED; production remains HOLD.


## 10.60 — External Validation Interview Pack — 2026-10-07

Artifact: docs/research/external-validation-interview-pack-2026-10-07.md
Commit: 750c812a62a3a8e5f7b9a336b1a87b7dcbe8926a

A field-ready external validation pack was created containing:
- a one-page plain-language explanation of ScoutSA;
- neutral discovery questions for five initial stakeholder categories;
- separate treatment of direct observation, interpretation, contradiction, confidence and action;
- explicit anti-bias rules;
- a five-outcome validation decision rule: Confirmed / Revised / Reduced / New constraint / Contradicted / Unresolved.

The pack deliberately avoids leading stakeholders toward transport, guardianship, cost, academics or other proposed Opportunity Readiness barriers. It also avoids presenting ScoutSA as legally compliant, approved, or guaranteed to create opportunities.

Decision: FIELD VALIDATION MATERIAL READY. No new governance gate opened.


## 10.61 — External Validation Stakeholder Sampling Frame — 2026-10-07

Artifact: `docs/research/external-validation-stakeholder-sampling-frame-2026-10-07.md`
Commit: `c199e8541f212d5b419a5f984e689a9fdf861919`

A purposive first-contact sampling frame was established for the external-validation phase.

The frame covers five perspectives:
1. grassroots club/coach;
2. academy/development coach;
3. school sports;
4. guardian;
5. scout/academy recruitment.

Public-source research was used only to justify **contact relevance**. It does not establish stakeholder agreement, product demand, adoption, safeguarding quality, legal compliance, commercial viability, or representativeness.

Initial candidate routes:
- VOB FC — grassroots/youth-development perspective;
- NWU Vaal Football — institutional/development pathway;
- Vaal Elite Soccer Academy — youth-development perspective;
- Vaal Triangle school sports channel — school perspective;
- guardian recruited through an authorized club/academy/school relationship — family perspective.

Current field state:

| Control | State |
|---|---|
| Sampling frame | READY |
| First stakeholder contacted | NO |
| First stakeholder interview completed | NO |
| External validation evidence | NONE YET |
| Product assumptions changed | NO |
| MVP boundary changed | NO |
| RLS | NOT AUTHORIZED |
| Migration | HOLD |
| Production | HOLD |

**Decision:** proceed to actual stakeholder outreach/interview. Do not create additional internal governance artifacts unless a concrete uncertainty, contradiction, or external evidence requires one.

**Evidence boundary:** A candidate contact is not a witness. A public source is not stakeholder validation. No external validation claim is made by this entry.


## 10.62 — ScoutSA Opportunity Pathway Model — 2026-10-07

**Artifact:** docs/research/opportunity-pathway-model-2026-10-07.md

A conceptual pathway was defined from the existing frozen product model:

**Player → Football Readiness → Opportunity → Opportunity Readiness → Authorized Connection → Trial/Opportunity Event → Real-World Outcome**

The model reinforces the existing distinctions:

- Player Passport ≠ truth;
- Football Readiness ≠ talent ranking;
- Opportunity Readiness ≠ selection guarantee;
- Discovery ≠ contact authorization;
- Contact request ≠ approval;
- Approval ≠ safeguarding clearance;
- Opportunity ≠ outcome;
- trial invitation ≠ trial attendance;
- trial attendance ≠ placement;
- historical authorization ≠ current authorization.

The pathway makes the North Star operationally visible: **verified players receiving genuine opportunities**, rather than profile views or platform engagement.

Stakeholder-dependent questions remain deliberately open, including which readiness inputs matter in practice, what information is needed at each stage, what constitutes sufficient verification, how guardians want contact/trial authorization handled, which outcomes can be evidenced, and which existing informal networks already solve parts of the pathway.

**Decision:** RESEARCH / DESIGN INPUT — NOT RATIFIED.

No Constitution, MVP boundary, schema, access-policy boundary, RLS authorization, migration authorization, or production status was changed.

**External validation remains the next authority-bearing evidence source.**


## 10.63 — North-Star Impact Evidence Model — 2026-10-07

**Artifact:** docs/research/north-star-impact-evidence-model-2026-10-07.md

A conceptual evidence ladder was defined for the ScoutSA North Star: **verified players receiving genuine football opportunities**.

The proposed progression is: **Player existence → Evidence-supported information → Relevant opportunity exposure → Authorized connection → Genuine opportunity event → Real-world outcome**.

The model explicitly prevents activity metrics from being treated as impact and preserves attribution uncertainty. It distinguishes platform events from real-world events and records failure/constraint evidence as useful information rather than automatically treating it as product failure.

Potential diagnostic funnel ratios are research candidates only; no targets, production analytics requirements, schema changes, or causal claims were authorized.

**Decision:** RESEARCH / DESIGN INPUT — NOT RATIFIED.

External stakeholder evidence must test the model before any metric becomes a ratified product requirement. RLS remains NOT AUTHORIZED; migration remains HOLD; production remains HOLD.


## 10.64 — Genuine Opportunity Definition & Evidence Boundary — 2026-10-07

**Artifact:** `docs/research/genuine-opportunity-definition-evidence-boundary-2026-10-07.md`  
**Commit:** c16495cadc603688b853145b3dc682eeef79b375

A working evidence boundary was defined for the North Star concept **genuine football opportunity**.

The proposed definition requires an opportunity to be real, relevant and sufficiently evidenced, with an identifiable responsible party and enough context to distinguish a credible opportunity from mere visibility, communication, or an unsupported claim.

Seven proposed evidence dimensions were recorded:
1. existence;
2. legitimacy / responsible party;
3. relevance;
4. practical accessibility;
5. authorization / safeguarding boundary;
6. temporal validity;
7. evidence / provenance.

The artifact explicitly distinguishes:

- profile view ≠ opportunity;
- message ≠ necessarily opportunity;
- contact request ≠ approval;
- approval ≠ safeguarding clearance;
- trial invitation ≠ trial attendance;
- trial attendance ≠ placement;
- opportunity ≠ outcome.

It also establishes a proposed minimum threshold for any future “genuine opportunity” claim and a conceptual evidence-tier model, while preserving unresolved states such as unresolved, contradicted, expired, withdrawn, or not established where evidence is insufficient.

This work does **not** ratify a production definition, metric, schema, readiness state, verification badge, legal/safeguarding standard, or implementation rule.

**Decision:** RESEARCH / DESIGN INPUT — NOT RATIFIED.

### Current external-validation state

VOB FC outreach: **SENT**.  
NWU Vaal outreach: **SENT**.  
First stakeholder interview: **NOT YET CONDUCTED**.  
Stakeholder evidence: **NONE YET**.

The proposed definition is now ready to be tested against actual stakeholder practice rather than expanded internally.

### State unchanged

- Product assumptions: unchanged.
- MVP boundary: unchanged.
- RLS: NOT AUTHORIZED.
- Migration: HOLD.
- Production: HOLD.
- Legal compliance: NOT CLAIMED.

**Next authority-bearing evidence:** stakeholder responses/interviews and scoped legal/safeguarding input.


## 10.65 — NWU Outreach Delivery Failure / Contact Reconciliation — 2026-10-07

The initial NWU Vaal football outreach email to **Thomas.thema@nwu.ac.za** was returned by Proton Mail with SMTP response **550 5.0.0 — User unknown** at the recipient server.

This is evidence that the outreach message was **not delivered**. It is not evidence that NWU declined participation, nor evidence that the stakeholder/contact itself is invalid in every source.

A fresh check of official NWU sources found an important provenance conflict:

- NWU's current official Soccer page still lists **Thomas Thema**, **Thomas.thema@nwu.ac.za**, and **016-910-3228** as Vanderbijlpark Campus soccer contact.
- NWU's current official Sport contact page also lists Thomas Thema under Soccer / Vanderbijlpark Campus.
- An older official NWU Vanderbijlpark Campus Sport document (17 March 2021) also identifies Thomas Thema as Sport Manager (Football & Bodybuilding), but its age makes it weaker current-contact evidence.
- NWU's current Corporate Relations page identifies **Karabo Mokoka** as the Vanderbijlpark Senior Sports Manager and gives **Karabo.Mokoka@nwu.ac.za**.
- NWU's current Vanderbijlpark Campus sports information continues to identify football as a high-performance sport.

### Evidence interpretation

The correct conclusion is:

**Contact route conflicted / delivery unresolved — DO NOT treat as stakeholder rejection.**

The official web directory currently presents Thomas's address as valid, while the recipient mail server returned User unknown. Therefore the address should not be blindly retried as though delivery succeeded.

### Controlled next step

Use the current official NWU sports-management route to request either:
1. confirmation of the correct current football contact; or
2. referral to the appropriate person for a 20–30 minute research conversation.

The outreach remains research-only: no endorsement, partnership, adoption, sale, legal-compliance claim, or guaranteed-opportunity claim is being requested.

### External-validation state

| Control | State |
|---|---|
| VOB FC outreach | SENT / delivery pending response |
| NWU Thomas Thema email | **BOUNCED — NOT DELIVERED** |
| NWU stakeholder validation | NONE YET |
| NWU contact route | **RECONCILIATION REQUIRED** |
| First stakeholder interview | NOT YET CONDUCTED |
| Product assumptions | UNCHANGED |
| MVP boundary | UNCHANGED |
| RLS | NOT AUTHORIZED |
| Migration | HOLD |
| Production | HOLD |

**Decision:** treat the bounce as a contact-provenance/delivery issue, not stakeholder evidence. Re-route through the current official NWU sports-management contact rather than inventing or guessing an alternative address.


## 10.66 — MVP Definition Draft — 2026-10-07

A one-page MVP definition was drafted and committed as `docs/01-mvp-definition.md` for review and later ratification.

**Commit:** f5104fe55664ce509c9df827d27496b7e5136f73  
**Blob:** 62c3812b7114469729440980a4bf8ab3b262b32c

The draft was inspected against the live Constitution, Gate Status, Domain Model, Relationship Model, frozen MVP Boundary, frozen MVP Relationship Subset, and MVP Access-Policy Matrix before commit.

The draft defines one bounded user loop:

**Player Passport → minimum evidence / verification → consent-controlled discoverability → legitimate opportunity/contact request → applicable guardian gate → opportunity/trial outcome.**

The review preserved existing holds rather than inventing them. In particular, exact User↔Player cardinality/delegation, receiving-side authorization, Guardian conflict handling, and field-level disclosure remain governed by existing operational/legal holds.

The draft explicitly excludes rankings, transfer marketplace, payments, national scope, unrestricted messaging, AI authority, and production RLS/migration implementation.

The draft also separates activity metrics from evidence-of-value metrics and deliberately sets no adoption target before primary external conversations.

**Status:** DRAFT / NOT RATIFIED.  
**Authority:** NONE beyond the documented draft and existing ratified/frozen boundaries.  
**Implementation:** NOT AUTHORIZED.  
**Next evidence:** first external stakeholder conversations, beginning with the coach / academy / guardian-relevant sample already prepared.


## 10.67 — Desk Phase B Closed / Informal Discovery & Trust Evidence Seeded — 2026-10-07

Desk Phase B is now recorded as **SUBSTANTIALLY COMPLETE / CLOSED FOR EXPANSION**. Secondary evidence remains permitted to inform the assumption matrix and outreach map, but it is not treated as stakeholder validation.

The Assumption Validation Matrix was updated in commit **61366f71dbe57088548ec1a2a7c02b7c679e0451** (blob **ac7db9b9a38fa9363adcd0513d66e3fb7bd073ee**) with three explicit research controls:

- **A16 — Informal digital visibility channels already perform part of discovery:** local public reporting on Vino Snap provides a concrete example of grassroots visibility through photography/content and tournament exposure. This supports the existence of an informal visibility mechanism, not proof that it solves verification, feasibility or safe opportunity access.
- **A17 — Trust may attach more strongly to the recommender/network than to structured profile data:** public Vaal football history documents network-mediated discovery through coaches, journalists and development actors. This remains an OPEN hypothesis requiring primary evidence.
- **A18 — ScoutSA must identify a unique unresolved junction beyond existing visibility and network pathways:** existing clubs, academies, tournaments, development leagues and local football media make a generic visibility-gap thesis insufficient. This is OPEN / DECISIVE and requires primary stakeholder convergence.

A2 and A6 were also refined using secondary evidence: A2 remains **CHALLENGED**, while A6 is treated as a pathway-specific hypothesis rather than a universal claim because local open trials and invitation/scouting pathways both exist.

### Methodological boundary

Public sources establish context, contact relevance and hypotheses only. They do not establish that coaches, guardians or scouts will use ScoutSA, nor do they ratify product requirements.

### Current bottleneck

**Primary validation remains the next authority-bearing evidence source.** The first stakeholder interview has not yet occurred. No product assumption, MVP boundary, Constitution, schema, RLS, migration or production decision was changed by this desk update.

**Next action:** conduct the first real stakeholder conversation and preserve the raw witness, concrete case, contradiction and interpretation separately.

## 10.68 — Primary Validation Witness Record — 2026-10-07

Artifact: `docs/research/primary-validation-witness-record.md`  
Commit: 486f529ca267552ccea47c31673f5238750e46ea

A standardized field-ready witness record was created for the external-validation phase. It separates raw stakeholder testimony, concrete lived cases, general experience, interpretation, contradiction, assumption impact, and decision disposition.

The record includes the existing neutral five-question interview core, required non-leading probes, a dedicated falsifier question, evidence classification, contradiction capture, privacy/minimization controls, and an explicit authority boundary preventing interview evidence from silently authorizing Constitution, MVP, schema, RLS, migration, production, legal, safeguarding, institutional, or investor claims.

The artifact also preserves the distinction between discovery, relevant opportunity exposure, authorized connection, genuine opportunity event, and real-world outcome. Activity such as profile views, messages, contact requests, introductions, or positive opinions is not treated as product success by itself.

**Decision:** FIELD VALIDATION CONTROL READY. No new governance gate opened. No product or schema boundary changed.

**Current field state:**
- Primary Validation: OPEN
- First stakeholder interview: NOT YET CONDUCTED at artifact creation
- External validation evidence: NONE YET
- MVP boundary: UNCHANGED
- RLS: NOT AUTHORIZED
- Migration: HOLD
- Production: HOLD

**Next action:** use this record for the first actual stakeholder conversation and preserve the raw witness before interpretation.

## 10.69 — Living Assumption Board + Primary Interview Run-Sheet — 2026-10-07

Two field-validation controls were added without changing the product or governance boundaries.

### Living Assumption Board
Artifact: `docs/research/assumption-validation-matrix-2026-10-07.md`  
Commit: 2ead6ca4e3606abd274f0890a44278396d60d1b6

The Assumption Validation Matrix now contains a dedicated **Living Primary-Evidence Capture Board** covering A2–A18. Each tracked assumption has a primary-evidence question plus empty fields for interview date, attributable evidence/quote, contradiction and decision. A daily evidence rule requires raw witness preservation before interpretation and prevents positive replies, introductions or referrals from being recorded as validation.

### Interview Run-Sheet
Artifact: `docs/research/primary-validation-interview-run-sheet-2026-10-07.md`  
Commit: 07d7e4bb5cac8a40756a7cc9cec62e7db5e8a7b0

A concise 25–30 minute operating sheet was added with the neutral opening, five universal questions, non-leading probes, falsifier question, optional concept reaction only after discovery, same-day five-bullet capture, and explicit evidence/authority boundaries.

### Decision

**PRIMARY VALIDATION OPERATING CONTROLS READY.**

No assumption was changed by these artifacts. No product requirement was ratified. No Constitution, MVP boundary, schema, RLS, migration, production, legal-compliance or safeguarding claim was authorized.

**Next authority-bearing event:** the first actual stakeholder witness.

## 10.70 — Actor × Purpose × Resource Authorization Reconciliation — 2026-10-07

The MVP Actor × Purpose × Resource Authorization Framework was reconciled against the live ScoutSA MVP Access-Policy Decision Matrix.

### Artifact

`docs/research/mvp-actor-purpose-resource-map-2026-10-07.md`

Commit: `1619511e60fed91af5163f9893120cc7298487bc`

The framework establishes the traceability chain:

**ACTOR → PURPOSE → RESOURCE → ACCESS CLASSIFICATION → ACTIVE PRECONDITIONS / PROVENANCE**

It explicitly preserves the matrix's distinction between contextual access and universal role authority.

### Reconciliation result

The framework is **architecturally coherent**, but it does not close the underlying policy/legal holds.

The following remain unresolved and therefore cannot become RLS predicates:

- exact User↔Player relationship and delegated/shared access;
- Guardian/authorizer cardinality and conflicting authority;
- actor↔Organization affiliation and jurisdiction;
- OpportunityApplication lifecycle and transition authority;
- field-level discovery/application disclosure;
- child voice effects in specific workflows;
- safeguarding assignment, escalation and disclosure;
- correction/version/supersession and dispute handling;
- retention/deletion;
- lawful republication/further processing;
- external verification of actor/organization authority.

The framework adds an active-state requirement: authorization must be evaluated against current identity, relationship, purpose, resource, scope, applicability, consent/authorization, eligibility/safeguarding state where relevant, provenance, minimum disclosure and auditability.

### Authority decision

**Actor × Purpose × Resource Framework: PROPOSED / ARCHITECTURALLY COHERENT**

**Policy/legal holds: REMAIN OPEN**

**RLS: NOT AUTHORIZED**

**Migration: HOLD**

**Production: HOLD**

No product requirement, Constitution boundary, physical schema, RLS rule or migration was authorized by this reconciliation.

**Next authority-bearing evidence:** actual stakeholder evidence for the external-validation workstream, alongside appropriately scoped legal/safeguarding review for the remaining protected-data questions.



## 10.61 — Football Agent and Agency Research Dossier — 2026-10-09

Artifact: docs/research/agent-agency-research-dossier-2026-10-09.md
Commit: 764a86c3756099495814fb5d9fbfc804bf80d23e

Desk-research dossier created with a source register and primary/independent evidence lanes. It distinguishes agents, agencies, scouts, academies and clubs; summarizes FIFA's published agent framework and parent education materials; reviews the SAFA Football Agent Regulations approved 2023-12-09 with an explicit current-status caveat; and examines player-protection reporting from FIFPRO, the PFA and South African media.

Research-derived direction: ScoutSA should not assume the role of an agent marketplace or guarantee placement. Its bounded value may be to distinguish roles and claims, support source-level verification of real opportunities, make responsibilities/costs explicit, scope youth safeguards, and avoid implying that agent identity verification proves a specific trial is genuine.

Limits preserved: this is desk research, not direct Vaal Triangle validation, legal advice, a current licence check, or proof of local demand. Reports of allegations are not treated as adjudicated facts. Next research lanes remain coaches/scouts, then individual players.


## 10.62 — Coach, Scout and Youth Pathway Research Dossier — 2026-10-09

Artifact: docs/research/coach-scout-pathway-research-dossier-2026-10-09.md
Commit: a00f0042dfe1971ae5642454098bcd0c8f945265

Desk research reviewed South African practitioner interviews (TimesLIVE 2022; EWN 2025), FIFA Training Centre's Vela Khumalo interview (2023), a FIFA Training Centre brief summarizing a 125-scout Netherlands survey, a University of Johannesburg institutional record for a nine-scout qualitative study, and an older eThekwini coach study (13 coaches/five clubs). Findings emphasize plural discovery routes, context-rich and multidimensional assessment, limits of subjective scouting, and historical practitioner concerns about grassroots resources and pathway coordination.

Decision: carry forward only bounded design implications — contextual evidence, role/source provenance, no universal talent score, separate football readiness from opportunity access, and complement existing coach/competition pathways. No claim of measured Vaal Triangle demand or current national-system status is made.

Next research lane: individual players' first-person accounts, with attention to access barriers, trial logistics, scams, costs, and evidence that could contradict ScoutSA's assumptions.


## 10.63 — Individual Player Experience Research Dossier — 2026-10-09

Artifact: docs/research/individual-player-experience-research-dossier-2026-10-09.md
Commit: eac3f970d7a38c1a8ff3fa29b25d59ecd1d23a2f

Desk research reviewed a 2026 South African township-player vox pop (source surfaced in search but page could not be independently opened in this pass), FIFPRO Africa's 2023 survey summary of 263 professional players across seven African countries, and individual FIFPRO case reports involving players stranded after false club/trial promises. Limitations are explicit: professional-player survey findings are not representative of South African grassroots players; individual cases are not prevalence estimates; Tsakani is not the Vaal Triangle.

Research-derived design implications: independently confirm the receiving organization and opportunity; make cost/logistics/contingency explicit; avoid charging players for discoverability; minimize youth disclosure; separate concerns from findings; track request, response and outcome distinctly; never treat access constraints as a talent judgment. No claim is made that the Vaal Triangle's principal barrier has been measured or that ScoutSA can guarantee selection.

Current research sequence completed for first pass: (1) agents/agencies, (2) coaches/scouts/pathways, (3) individual player experiences. Next step is cross-dossier synthesis: identify convergences, contradictions, evidence strength, what ScoutSA can responsibly design for, and which questions remain local/unresolved. Avoid further internal governance expansion unless the synthesis identifies a material issue.


## 10.64 — Player Profile Video, Context and Metrics Research — 2026-10-09

Artifact: docs/research/player-profile-video-and-metrics-research-dossier-2026-10-09.md  
Initial artifact commit: 24dc13c72587a56648705f37f591fac0888a3456  
Source-excerpt register commit: d57661ccc30f94e185df41577c57dfed7a13189d  
Positional indicator matrix commit: a3560941038db8ab14e9f1e8e2a785d0581cd85b

Desk research reviewed FIFA's 2026 Talent Identification Guide and football-data materials, Wyscout's official metric glossary, a 2024 peer-reviewed study comparing in-person and video scouting by 30 English Category One academy scouts, a peer-reviewed study of coach interpretation agreement on tactical video, South African TIDQ-OP research, a Kaizer Chiefs official bogus-trial warning, and Information Regulator POPIA guidance.

Findings: contextual, role-specific and provenance-labelled evidence is justified. Video can be useful, but interpretations differ; advanced tracking metrics require suitable collection methods; metric definitions do not prove universal recruitment use. The proposed exact three-tier video durations, camera-height minimum, 3–5 second scan threshold, universal KPI weights and claims that all professional scouts reject certain formats are not established by the sources reviewed.

Research-derived direction only: build a progressive, low-bandwidth Player Passport; make contextual video and match evidence useful without making expensive footage mandatory; show source, sample size and measurement method for statistics; keep physical data and coach observations qualified; do not expose youth identity documents or full DOB publicly; independently confirm any claimed trial through the receiving organisation's official channel.

Limits: no direct Vaal Triangle coach validation; no proof of exact PSL/NFD/ABC Motsepe submission thresholds; no quantified local bandwidth study; no legal opinion or POPIA compliance claim. No schema, gate, RLS, migration, or production authority changed. Existing freezes and holds remain unchanged.


## 10.65 — Part 12 Protocol Ratification and Synthetic Fixture Freeze — 2026-10-09

**Artifacts**
- `docs/research/part-12-protocol-ratification-record-2026-10-09.md`
- `docs/research/synthetic-trust-fixtures-v1-2026-10-09.md`
- Parent protocol: `docs/research/synthetic-trust-evaluation-set-2026-10-09.md`

**Protocol decision:** Ratified for synthetic manual tabletop evaluation only, following explicit user confirmation in the project conversation. The ratification sets zero tolerance for critical failures; any critical failure blocks progression; all ten scenarios must ultimately pass after correction and retest; manual tabletop is the first evaluation; missing observations are NOT TESTED rather than PASS; and aggregate results cannot offset a critical failure.

**Fixture state:** Synthetic fixture set `STS-FIXTURES-1.0` frozen before evaluation. Six Critical scenarios: STS-002, STS-003, STS-004, STS-005, STS-007 and STS-008. Four High scenarios: STS-001, STS-006, STS-009 and STS-010. Inputs and expected outcomes are fictional and contain no copied real-person data.

**Execution state:** NOT RUN. No scenario has a PASS or FAIL result. No independent evaluator review is recorded. No corrective action or retest is recorded.

**Authority boundary:** Protocol ratification and fixture freeze do not authorize implementation, schema/RLS/migration changes, real player/guardian data, recruiting or contacting minors, public profiles/listings, live outreach, closed rehearsal, live pilot, or a gate transition. Existing holds remain unchanged.

**Next controlled step:** Conduct the manual tabletop against frozen version 1.0. Record each observation separately from its expected outcome, preserve failures and limitations, and block progression if any critical scenario fails or remains untested. A tabletop cannot establish software enforcement or live-pilot readiness.
