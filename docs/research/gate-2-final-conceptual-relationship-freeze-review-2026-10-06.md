# Gate 2 Final Conceptual Relationship Freeze Review — 2026-10-06

**Purpose:** Determine whether any remaining Gate 2 relationship decision forces a hidden semantic assumption into the conceptual ERD.

**Authority:** Ratified Constitution, Domain Model, Gate 2 seam evidence, five-way Consolidated Decision Package, and Conceptual ERD Draft.

> **Governing rule:** Strength of claim must never exceed strength of evidence.

## 1. Scope

This review covers only the five remaining relationship seams carried by the Consolidated Decision Package:

1. G2-SEAM-01 — User ↔ Player cardinality / delegation
2. G2-SEAM-02 — actor ↔ Organization affiliation / authorization
3. G2-SEAM-03 — GuardianLink ↔ ConsentRecord conflict / applicability
4. G2-SEAM-07 — OpportunityApplication participants / lifecycle
5. G2-SEAM-08 — Outcome multiplicity / correction / dispute

No new research lane is opened.

## 2. Decision test

For each unresolved item, ask:

> **Would choosing a particular answer be necessary to represent the conceptual relationship at all, or would it merely choose an operational, legal, lifecycle, cardinality, access, or technical policy?**

If the latter, the ERD may preserve the relationship with an explicit OPEN/DEFERRED boundary.

## 3. Five-way classification integrity

Every remaining question has exactly one governing classification:

- **RATIFY**
- **DEFER AS OPERATIONAL POLICY**
- **DEFER AS LEGAL/JURISDICTIONAL**
- **REJECT**
- **IMPLEMENTATION DETAIL — AFTER ERD**

No sixth hidden “domain decision” category remains.

## 4. Seam-by-seam freeze test

### G2-SEAM-01 — User ↔ Player

**Result: PASS — no hidden semantic assumption required.**

The conceptual ERD can represent User and Player as distinct concepts while leaving exact cardinality and delegated/shared access OPEN.

Settled:
- USER ≠ PLAYER.
- Player may exist without User.
- User may exist without Player.
- Account lifecycle does not silently control Player lifecycle.

Deferred:
- exact cardinality → **DEFER AS OPERATIONAL POLICY**;
- delegated/shared access → **DEFER AS OPERATIONAL POLICY**.

**Freeze consequence:** No cardinality or delegation mechanism must be invented to preserve the domain relationship.

### G2-SEAM-02 — User ↔ Guardian / Coach / Scout / Organization

**Result: PASS — no hidden semantic assumption required.**

The conceptual ERD can preserve User identity, actor-role semantics, and Organization affiliation as distinct concerns without asserting universal authority or verification.

Settled:
- role ≠ universal authority;
- role ≠ verification;
- organization affiliation ≠ universal authority;
- Guardian relationship remains Player-specific.

Deferred:
- actor multiplicity → **DEFER AS OPERATIONAL POLICY**;
- organization affiliation/cardinality → **DEFER AS OPERATIONAL POLICY**;
- external verification/authorization process → **DEFER AS LEGAL/JURISDICTIONAL**.

**Freeze consequence:** No permanent organization FK, role-implied authority, or universal authorization rule is required by the conceptual ERD.

### G2-SEAM-03 — GuardianLink ↔ ConsentRecord

**Result: PASS — no hidden semantic assumption required.**

The conceptual ERD can preserve GuardianLink and ConsentRecord as distinct concepts and represent their relationship without choosing a universal Guardian precedence rule.

Settled:
- GUARDIANLINK ≠ CONSENT;
- consent does not expand legitimate authority;
- authorising-person reference ≠ proof of authority;
- consent is purpose-bound and temporal;
- historical consent is not erased by revocation;
- material authority/context changes may affect current applicability.

Deferred:
- multiple-Guardian conflict effect / authority resolution → **DEFER AS LEGAL/JURISDICTIONAL**;
- exact authoriser identity/cardinality → **DEFER AS OPERATIONAL POLICY**.

**Evidence note:** A dedicated G2-SEAM-03 repository re-witness artifact was previously blocked from commit. The conceptual conclusion is supported by the existing ratified Constitution, Domain Model, Gate 1 witnesses, and relationship evidence, but repository evidence completeness for this seam must not be overstated.

**Freeze consequence:** The ERD must not encode latest-wins, first-wins, majority-wins, or universal Guardian precedence.

### G2-SEAM-07 — OpportunityApplication

**Result: PASS — no hidden semantic assumption required.**

The conceptual ERD can represent OpportunityApplication as a first-class relationship between Player and Opportunity while leaving participants and lifecycle open.

Settled:
- Application is first-class;
- subject = Player + Opportunity;
- initiating actor is contextual;
- Guardian participation does not replace GuardianLink/ConsentRecord;
- Child Voice remains separate;
- application state ≠ truth;
- APPROVED ≠ PLACEMENT;
- Outcome remains distinct.

Deferred:
- participant cardinality → **DEFER AS OPERATIONAL POLICY**;
- transition authority → **DEFER AS OPERATIONAL POLICY**;
- lifecycle vocabulary → **DEFER AS OPERATIONAL POLICY**;
- withdrawal/cancellation/invitation semantics → **DEFER AS OPERATIONAL POLICY**.

**Freeze consequence:** No ApplicationParticipant or StateTransition semantic entity is necessary merely to freeze the conceptual relationship.

### G2-SEAM-08 — Outcome

**Result: PASS — no hidden semantic assumption required.**

The conceptual ERD can preserve Outcome as distinct from Application state and truth while leaving exact multiplicity, correction, dispute, placement, and access rules open.

Settled:
- Outcome ≠ Application state;
- Outcome ≠ truth;
- Outcome ≠ ranking/reputation;
- placement does not prove causation;
- correction does not silently erase history;
- dispute ≠ proof of falsity;
- contradictory outcome assertions remain attributable;
- historical Outcome ≠ current applicability.

Deferred:
- multiplicity/cardinality → **DEFER AS OPERATIONAL POLICY**;
- event-like vs composite-result representation → **DEFER AS OPERATIONAL POLICY**;
- Assertion ↔ Outcome relationship → **DEFER AS OPERATIONAL POLICY**;
- correction/version/supersession → **DEFER AS OPERATIONAL POLICY**;
- dispute lifecycle/participants → **DEFER AS OPERATIONAL POLICY**;
- placement/registration treatment → **DEFER AS OPERATIONAL POLICY**;
- access/retention → **DEFER AS LEGAL/JURISDICTIONAL**.

Technical history structures remain **IMPLEMENTATION DETAIL — AFTER ERD**.

## 5. Hidden-assumption test

| Test | Result |
|---|---|
| Any remaining seam requires a new first-class semantic concept? | **NO** |
| Any remaining seam requires universal authority to freeze the ERD? | **NO** |
| Any remaining seam requires a legal conclusion to freeze the ERD? | **NO** |
| Any remaining seam requires exact operational cardinality to represent the relationship conceptually? | **NO** |
| Any remaining seam requires schema/RLS/API/UI structures? | **NO** |
| Any remaining seam contradicts a ratified semantic boundary? | **NO** |
| Can unresolved items remain explicit OPEN/DEFERRED in the conceptual model? | **YES** |

## 6. 33×3 final conceptual check

- **Existence:** PASS — required concepts and relationships are represented or explicitly bounded.
- **Coherence:** PASS — unresolved policy/legal questions do not contradict the ratified semantic baseline.
- **Failure containment:** PASS — unresolved authority, lifecycle, cardinality, correction/dispute, and access questions remain visible rather than becoming hidden technical truth.

## 7. Decision

**CONCEPTUAL RELATIONSHIP FREEZE: PASS.**

The conceptual ERD is sufficiently expressive to preserve the ratified domain semantics without guessing unresolved operational or legal policy.

Therefore:

**Gate 2 — Semantic Relationship Integrity: CLOSED AT CONCEPTUAL LEVEL — 2026-10-06.**

This closure is deliberately narrow.

It does **not** mean:
- database schema is frozen;
- RLS is defined;
- APIs are defined;
- UI behavior is defined;
- authentication/delegation mechanics are defined;
- legal compliance is certified;
- POPIA/Children's Act/FIFA/SAFA compliance is established;
- safeguarding clearance exists;
- production readiness exists;
- investor readiness exists.

## 8. Authorized next phase

The next gate is:

**MVP BOUNDARY FREEZE**

Its purpose is to determine the smallest evidence-backed product surface that can be implemented without reopening the ratified semantic baseline.

Order:

1. Freeze MVP scope and explicit non-scope.
2. Map only MVP relationships from the conceptual ERD.
3. Identify operational/legal decisions required for that MVP.
4. Record any unresolved decision explicitly.
5. Only after MVP boundary freeze, derive schema and implementation.
6. Re-open governance if implementation exposes a genuinely missing semantic concept.

> **No implementation is authorized merely because Gate 2 is conceptually closed.**
