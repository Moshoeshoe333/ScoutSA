# ScoutSA MVP Boundary Freeze — 2026-10-06

**Status:** Draft for MVP boundary ratification  
**Authority:** Gate 1 closed; Gate 2 conceptual relationship baseline frozen  
**Purpose:** Define the smallest evidence-backed product surface that can proceed toward implementation without reopening ratified semantic boundaries.

> **Governing rule:** Strength of claim must never exceed strength of evidence.

## 1. MVP decision

ScoutSA v1 is bounded to one core loop:

**Create/maintain a Player Passport → establish scoped verification and relevant readiness context → make an eligible player discoverable to an authorized opportunity-side actor → initiate a structured contact/trial request → apply the relevant guardian/consent/safeguarding gates → record the resulting opportunity event/outcome.**

The MVP is an **opportunity network**, not a transfer marketplace, social network, general messaging platform, recruitment agency, or safeguarding adjudication system.

## 2. MVP user/domain surface

### In scope — first implementation boundary

1. **User identity**
   - Authentication identity for participating actors.
   - Roles remain distinct from authority and external verification.

2. **Player / Player Passport**
   - Persistent football identity.
   - Core identity and football profile.
   - Availability relevant to opportunity discovery.
   - Scout ID.
   - Membership-based organization history rather than a mutable current-club/current-school shortcut.

3. **Guardian + GuardianLink**
   - Player-specific Guardian relationship.
   - Required participation where applicable.
   - No universal Guardian precedence is invented.

4. **ConsentRecord**
   - Purpose-bound authorization records required for MVP discovery/contact/trial pathways.
   - Temporal status and revocation history.
   - Consent is not treated as universal authority.

5. **Organization + Membership**
   - Organization context for academies, clubs, schools, and opportunity-side actors where required by the MVP.
   - Scoped affiliation rather than universal organization authority.

6. **Assertion + Evidence**
   - Attributable claims and supporting provenance.
   - Only claims/evidence needed for the MVP verification and opportunity flow.
   - No verification-as-truth.

7. **Verification**
   - Scoped verification of defined claims.
   - Source, scope, and temporal context retained.
   - Verification is not safeguarding clearance.

8. **Opportunity**
   - A structured football opportunity created within an authorized organization context.
   - MVP opportunities are discovery/trial/pathway opportunities, not contracts or transfers.

9. **OpportunityApplication**
   - Player + Opportunity interaction.
   - Structured contact/trial request pathway.
   - Contextual participants and lifecycle.
   - Application state is not truth, suitability, placement, or football ability.

10. **OpportunityReadiness**
    - Contextual Player + Opportunity evaluation.
    - Actionable readiness states rather than a pseudo-precise score.
    - Derived and explainable from current material inputs.

11. **FootballReadiness**
    - Separate football-evidence-derived view.
    - Not a ranking, talent score, or guarantee.

12. **Child Participation / Voice Record**
    - Preserved separately where materially relevant.
    - Never silently converted into consent, Guardian authority, or final decision.

13. **Safeguarding Case / Response**
    - Included only to the extent necessary to preserve a safeguarding concern/response boundary created by an MVP interaction.
    - The MVP does not adjudicate guilt or provide safeguarding clearance.

14. **Outcome**
    - Record relevant real-world pathway results.
    - Outcome is historical and attributable.
    - Outcome is not a ranking, reputation score, or proof that ScoutSA caused placement.

15. **AuditEvent**
    - Accountability record for material MVP actions.

## 3. MVP core flow

### A. Player onboarding

Capture only the information necessary to establish a usable Player Passport and opportunity context.

For minors, applicable guardian/consent gates are applied before protected discovery/contact behavior is enabled.

### B. Scoped verification

An authorized verifier may submit or verify defined claims within their actual scope.

The system preserves:
- who acted;
- what was asserted/verified;
- source/evidence;
- scope;
- time;
- current applicability where relevant.

### C. Opportunity creation

An authorized organization-side actor creates a defined opportunity with the minimum requirements needed to evaluate suitability and feasibility.

### D. Discovery

An authorized scout/opportunity-side actor discovers players only where current visibility and purpose rules permit.

Discovery does not authorize republication or unrestricted data access.

### E. Structured contact / trial request

The requesting actor and organization, purpose, opportunity context, and relevant timing/location are recorded.

Applicable consent, Guardian, child-participation, safeguarding, and disclosure boundaries are evaluated before protected information is released or an opportunity proceeds.

### F. Outcome recording

Where a legitimate pathway event occurs, ScoutSA records the relevant outcome without rewriting prior assertions, evidence, applications, or history.

## 4. MVP readiness boundary

The MVP retains two separate readiness domains:

### Football Readiness
Evidence-derived football context.

### Opportunity Readiness
Contextual feasibility for:

**Player + Opportunity + current applicable requirements**

Candidate actionable states remain:

- Trial Ready
- Ready with Constraints
- Needs Guardian Action
- Needs Transport Verification
- Incomplete
- Not Ready

No percentage-based talent/readiness score is authorized.

## 5. Explicit MVP non-scope

The following are outside v1 unless separately ratified:

- player transfer marketplace;
- contracts or regulated transfer negotiations;
- fees, commissions, escrow, or marketplace payments;
- unrestricted direct messaging/chat;
- public contact-detail directory;
- unrestricted public Player Passports;
- automatic republication of third-party/public data;
- AI deciding truth, legal authority, consent validity, child capacity, best interests, safeguarding guilt, or final resolution;
- safeguarding adjudication or a “safeguarding cleared” badge;
- automatic exclusion based solely on an unsubstantiated concern;
- generalized player ranking/reputation scoring;
- automated talent prediction;
- medical-record repository beyond the minimum clearance state required for a legitimate MVP pathway;
- detailed academic records beyond justified MVP eligibility/context;
- organization-wide authority implied by role alone;
- universal Guardian authority across Players;
- latest-wins / first-wins / majority-wins conflict resolution;
- social-feed/community features;
- agent marketplace;
- automated placement guarantee;
- investor or compliance certification claims.

## 6. Operational / legal carry-forward register

These decisions are not allowed to hide inside schema design.

| ID | Decision | Classification | MVP treatment |
|---|---|---|---|
| MVP-01 | User ↔ Player cardinality / delegated access | DEFER AS OPERATIONAL POLICY | Define before authentication/delegation implementation. |
| MVP-02 | Actor ↔ Organization affiliation/cardinality | DEFER AS OPERATIONAL POLICY | Define before organization authorization implementation. |
| MVP-03 | External actor/org verification and authorization | DEFER AS LEGAL/JURISDICTIONAL | Establish applicable verification/legal basis before launch claims. |
| MVP-04 | Multiple-Guardian conflict effect | DEFER AS LEGAL/JURISDICTIONAL | No universal precedence encoded. |
| MVP-05 | Authorising-person identity/cardinality | DEFER AS OPERATIONAL POLICY | Define before consent implementation. |
| MVP-06 | Application participants and transition authority | DEFER AS OPERATIONAL POLICY | Define before workflow implementation. |
| MVP-07 | Application lifecycle vocabulary | DEFER AS OPERATIONAL POLICY | Freeze only the states actually required by MVP. |
| MVP-08 | Outcome multiplicity/correction/dispute | DEFER AS OPERATIONAL POLICY | Define before outcome implementation. |
| MVP-09 | Outcome access/retention | DEFER AS LEGAL/JURISDICTIONAL | Establish applicable legal/policy basis before launch. |
| MVP-10 | Child participation/voice effects in specific workflows | DEFER AS LEGAL/JURISDICTIONAL | Context-specific effect must not be invented globally. |
| MVP-11 | Safeguarding response procedure/authority | DEFER AS LEGAL/JURISDICTIONAL | MVP must have an explicit operational escalation path before launch. |
| MVP-12 | Field-level visibility/disclosure rules | DEFER AS LEGAL/JURISDICTIONAL | Define against actual processing purposes before production. |
| MVP-13 | Retention/deletion schedule | DEFER AS LEGAL/JURISDICTIONAL | No arbitrary universal retention period. |

## 7. Evidence required before implementation

Before schema implementation begins, the MVP must have:

- an approved MVP relationship subset derived from the frozen conceptual model;
- explicit required vs optional fields at product level;
- defined MVP workflow states and transition ownership;
- defined access/disclosure purposes;
- defined guardian/consent behavior for the actual MVP paths;
- defined safeguarding escalation ownership;
- defined correction/dispute behavior for MVP records;
- defined retention/deletion basis;
- testable acceptance criteria for the core flow;
- a traceable decision ledger linking each material implementation rule to its governing source.

## 8. Semantic preservation test

The MVP boundary introduces no new first-class semantic concept.

It preserves:

- ASSERTION ≠ EVIDENCE ≠ VERIFICATION ≠ TRUTH;
- ROLE ≠ UNIVERSAL AUTHORITY;
- GUARDIANLINK ≠ CONSENT;
- CONSENT ≠ AUTHORITY EXPANSION;
- CHILD VOICE ≠ GUARDIAN AUTHORITY;
- CHILD VOICE ≠ FINAL DECISION;
- VERIFICATION ≠ SAFEGUARDING CLEARANCE;
- APPLICATION STATE ≠ TRUTH;
- APPROVED ≠ PLACEMENT;
- OUTCOME ≠ RANKING/REPUTATION;
- HISTORICAL VALIDITY ≠ CURRENT APPLICABILITY;
- DISCOVERABLE ≠ REPUBLISHABLE;
- DERIVED STATE ≠ SOURCE OF TRUTH.

## 9. Boundary decision

**MVP BOUNDARY: SEMANTICALLY SUFFICIENT / READY FOR RATIFICATION.**

The MVP is deliberately narrow enough to proceed without introducing a new semantic model, while the unresolved operational/legal decisions remain visible and assigned.

This document does not authorize schema or implementation.

### Next gate

**MVP Boundary Ratification → MVP relationship subset freeze → implementation prerequisite review → schema design.**

If implementation planning exposes a genuinely missing semantic concept:

**STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED → RECONCILE → CONTINUE.**

> **No implementation until the MVP boundary is explicitly ratified.**
