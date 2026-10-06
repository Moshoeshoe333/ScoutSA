# Gate 2 — Consolidated Relationship Blocker Review — 2026-10-06

## Status

**Gate 2:** OPEN  
**Purpose:** consolidate unresolved relationship/operational seams before conceptual ERD review.  
**ERD:** HOLD  
**Schema:** HOLD  
**RLS/API/UI:** DEFERRED  
**Implementation:** DEFERRED

## Governing rule

The relationship model is derived from the ratified Constitution and Domain Model.

`ERD must not be used to invent domain truth.`

If a blocker is semantic, the control is:

`STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED → DOMAIN RECONCILIATION`

If a blocker is only relationship, cardinality, authorization-process, or operational policy, it remains a Gate 2 decision and must be resolved explicitly before ERD freeze.

## Consolidated seam matrix

| Seam | Current disposition | Semantic concept missing? | Remaining blocker |
|---|---|---:|---|
| G2-SEAM-01 User ↔ Player | OPEN / DOMAIN DECISION | No current evidence | Exact cardinality; delegated/shared access |
| G2-SEAM-02 User ↔ Guardian/Coach/Scout/Organization | OPEN / DOMAIN + OPERATIONAL | No current evidence | Actor multiplicity; affiliation; authorization scope/history |
| G2-SEAM-03 GuardianLink ↔ ConsentRecord | OPEN / LEGAL + OPERATIONAL | No current evidence | Conflict handling; authorizing-person relationship; applicability |
| G2-SEAM-04 Assertion ↔ Evidence | CLOSED / RATIFIED | No | Relationship semantics ratified; technical multiplicity still deferred |
| G2-SEAM-05 Safeguarding Case/Response | CLOSED / RATIFIED | No | Technical/operational representation only |
| G2-SEAM-06 Child Participation/Voice | CLOSED / RATIFIED | No | Technical/operational representation only |
| G2-SEAM-07 OpportunityApplication | SEMANTICALLY SUFFICIENT / OPERATIONAL HOLD | No | Participants; actor authorization; state taxonomy; withdrawal/cancellation; invitation; access |
| G2-SEAM-08 Outcome | SEMANTICALLY SUFFICIENT / RELATIONSHIP-OPERATIONAL HOLD | No | Multiplicity; correction/dispute; supersession; placement treatment; access |

## G2-SEAM-01 — User ↔ Player

Existing semantic distinction:

- User = authentication identity for a human actor.
- Player = persistent football identity / Player Passport.

Safe principles:

- Player may exist without a User account.
- User may exist without being a Player.
- User role does not prove football identity.

Still unresolved:

1. exact User ↔ Player cardinality;
2. whether one User may legitimately act for multiple Players;
3. whether multiple Users may legitimately act for one Player;
4. delegated/shared access;
5. account deactivation versus Player persistence.

No universal one-to-one rule should be invented in the ERD.

## G2-SEAM-02 — User ↔ Guardian / Coach / Scout / Organization

Safe principles:

- role ≠ universal authority;
- affiliation ≠ identity;
- affiliation may require temporal history;
- Guardian relationship remains Player-specific through GuardianLink.

Still unresolved:

1. actor multiplicity;
2. organization affiliation model;
3. organization-side authorization;
4. role/affiliation effective periods;
5. whether a User can hold multiple actor roles;
6. how authority-bearing actions are attributable.

Rejected shortcuts:

- permanent `user.organization_id`;
- role-implied authority;
- immutable Coach/Scout affiliation;
- Guardian authority derived solely from User role.

## G2-SEAM-03 — GuardianLink ↔ ConsentRecord

Safe principles already ratified:

- GuardianLink ≠ ConsentRecord.
- Consent is purpose-bound.
- Consent cannot expand legitimate authority scope.
- historical authority/consent remain distinguishable from current applicability.

Still unresolved:

1. conflicting GuardianLink authority scopes;
2. applicable legal/operational resolution process;
3. authorizing-person relationship to User/Guardian/Player;
4. current-applicability evaluation.

Rejected:

- latest wins;
- first wins;
- majority wins;
- universal Guardian precedence.

No legal hierarchy should be invented merely to make the ERD convenient.

## G2-SEAM-04 — Assertion ↔ Evidence

**CLOSED SEMANTICALLY.**

Assertion is ratified as first-class.

Ratified:

- Assertion ≠ Evidence;
- Assertion ≠ Verification;
- Assertion ≠ Truth;
- Author ≠ Authority;
- evidence supports an assertion but does not thereby establish truth;
- contradictions remain attributable;
- historical assertion ≠ current applicability.

Remaining work is technical relationship detail only.

## G2-SEAM-05 — Safeguarding Case/Response

**CLOSED SEMANTICALLY.**

First-class Safeguarding Case/Response is ratified.

The domain must preserve:

`Concern/Report → Finding/Substantiation → Protective Action → Investigation Outcome → Final Resolution`

as distinct concepts/states where applicable.

No universal safeguarding authority or fixed operating procedure has been invented.

Remaining work is representation/authorization-process detail.

## G2-SEAM-06 — Child Participation / Voice

**CLOSED SEMANTICALLY.**

First-class Child Participation / Voice Record is ratified.

Preserve:

- child voice ≠ Guardian authority;
- child voice ≠ consent;
- child voice ≠ final decision;
- objection ≠ automatic veto;
- Guardian authority ≠ automatic suppression of child voice.

No universal age, capacity, assent, consent, or Guardian-precedence rule is invented.

Remaining work is representation and contextual decision effects.

## G2-SEAM-07 — OpportunityApplication

**SEMANTICALLY SUFFICIENT.**

The application remains:

`Player ↔ OpportunityApplication ↔ Opportunity`

The application may have initiating, participating, reviewing, or responding actors, but actor participation does not create universal authority.

Still unresolved:

1. participant/cardinality model;
2. allowed initiating actors;
3. allowed responding/transition actors;
4. minor/adult contextual authorization;
5. state taxonomy;
6. withdrawal/cancellation;
7. invitation versus application;
8. correction/dispute;
9. notification/access;
10. contextual child-participation effects.

Do not freeze `GUARDIAN-APPROVED` or `VERIFIED-ELIGIBLE` as universal states without separate domain decisions.

## G2-SEAM-08 — Outcome

**SEMANTICALLY SUFFICIENT.**

Outcome remains distinct from Application state.

Safe principles:

- multiple outcomes are conceptually possible;
- correction preserves provenance;
- dispute ≠ proof of falsity;
- contradictory outcome assertions remain attributable;
- placement ≠ player quality;
- outcome ≠ ScoutSA causation;
- discoverability ≠ public outcome disclosure.

Still unresolved:

1. exact multiplicity/cardinality;
2. event versus composite-result representation;
3. Assertion ↔ Outcome relationship;
4. correction/version/supersession;
5. dispute lifecycle;
6. placement/registration treatment;
7. visibility/access;
8. retention/deletion.

No new semantic entity is warranted by this seam.

## Cross-seam findings

### Finding A — No new semantic entity currently required

Across G2-SEAM-01 through G2-SEAM-08, the unresolved items now cluster around:

- identity cardinality;
- actor multiplicity;
- affiliation;
- authorization scope;
- temporal applicability;
- application lifecycle;
- outcome lifecycle;
- correction/dispute;
- visibility/access.

The closed seams already introduced the only additional first-class semantic concepts warranted by the witnessed gaps:

1. Assertion;
2. Safeguarding Case/Response;
3. Child Participation/Voice Record.

No current evidence justifies inventing another domain entity.

### Finding B — ERD is still not authorized

The fact that no new semantic entity is currently required does **not** mean the ERD is ready.

Several cardinality and relationship decisions would still require the ERD to choose between materially different interpretations.

Therefore:

**ERD HOLD remains correct.**

### Finding C — Implementation remains deferred

No schema, RLS, API, UI, or implementation should be derived from unresolved relationship assumptions.

### Finding D — Opportunity-exposure methodology remains bounded

The previously recorded opportunity-surface hypothesis remains subordinate to the domain model:

`EXPOSURE ≠ OPPORTUNITY`

`VISIBILITY ≠ ACCESS`

`DISCOVERABILITY ≠ TRUST`

`VERIFICATION ≠ GUARANTEE`

`CONTACT ≠ PLACEMENT`

`EXPOSURE ≠ OUTCOME`

These remain product/methodology invariants, not new entities or outcome guarantees.

## 33×3 Gate 2 control

### Existence

**PASS:** required semantic concepts exposed by the current witness program are represented or explicitly ratified.

### Coherence

**PASS:** no current relationship proposal requires contradiction of the ratified semantic baseline.

### Failure containment

**PASS:** unresolved cardinality, authority, correction, dispute, and disclosure questions remain visible as HOLDs rather than being converted into schema assumptions.

## Gate 2 decision

**Gate 2 remains OPEN.**

The project is now ready for the next phase of Gate 2 work:

> **Explicitly resolve the remaining relationship decisions, one seam at a time, before conceptual ERD freeze.**

Recommended order:

1. G2-SEAM-01 — User ↔ Player cardinality;
2. G2-SEAM-02 — actor/organization affiliation;
3. G2-SEAM-03 — GuardianLink/Consent operational authority;
4. G2-SEAM-07 — Application participant/state model;
5. G2-SEAM-08 — Outcome multiplicity/correction/dispute.

Only after these are resolved should the conceptual ERD be drafted and adversarially reviewed.

## Non-claims

This review does not establish:

- legal compliance;
- POPIA compliance;
- Children’s Act compliance;
- universal Guardian precedence;
- safeguarding clearance;
- a fixed consent taxonomy;
- a fixed freshness duration;
- a fixed retention period;
- production security;
- investor readiness;
- institutional integration;
- database schema;
- RLS;
- API;
- UI;
- production readiness.
