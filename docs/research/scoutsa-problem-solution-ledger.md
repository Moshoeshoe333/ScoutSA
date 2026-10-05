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
