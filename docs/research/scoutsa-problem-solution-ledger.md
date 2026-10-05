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

