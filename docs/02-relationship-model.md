# ScoutSA Relationship Model — Gate 2

**Status:** Draft — Gate 2 (Relationship Model / ERD)
**Authority:** Derived from the Gate 1 ratified Constitution and Domain Model.
**Rule:** The ERD must be derived from the domain, not used to invent domain truth.

## 1. Purpose

Gate 2 translates the ratified domain concepts into an implementation-independent relationship model.

This document does not define database tables, SQL, RLS, APIs, UI, authentication providers, or storage providers.

If relationship work exposes a concept that cannot be represented without changing a ratified semantic boundary:

> STOP → record the seam → return to governance.

## 2. Conceptual Relationship Map

```
User
 ├── Player
 ├── Guardian
 ├── Coach
 └── Scout

Player
 ├── GuardianLink ───────── Guardian
 ├── Membership ─────────── Organization
 ├── ConsentRecord
 ├── Verification
 ├── Evidence
 ├── Media
 ├── SeasonPerformance
 ├── TransportProfile
 ├── AcademicProfile
 └── MedicalClearance

Organization
 └── Opportunity
       └── OpportunityApplication ─── Player
                                      │
                                      └── Outcome

Player + Opportunity
 └── OpportunityReadiness (derived)

Player
 └── FootballReadiness (derived)

Critical actions
 └── AuditEvent
```

This is conceptual only. It is not a database ERD.

## 3. Relationship Matrix

| Relationship | Meaning | State |
|---|---|---|
| Player ↔ GuardianLink ↔ Guardian | safeguarding / authority relationship | Core |
| Player ↔ Membership ↔ Organization | historical/current organization relationship | Core |
| Player ↔ ConsentRecord | purpose-specific authorization history | Core |
| Player ↔ Verification | scoped verification assertions | Core |
| Player ↔ Evidence | provenance/supporting evidence | Core |
| Player ↔ Media | player-related media lifecycle | Core |
| Player ↔ SeasonPerformance | period-bound performance history | Core |
| Player ↔ TransportProfile | opportunity feasibility context | Core |
| Player ↔ AcademicProfile | opportunity context | Core |
| Player ↔ MedicalClearance | restricted clearance state | Core |
| Organization ↔ Opportunity | organization-created opportunity | Core |
| Opportunity ↔ Application ↔ Player | opportunity interaction | Core |
| Application ↔ Outcome | resulting real-world event | Core |
| Player + Opportunity → OpportunityReadiness | contextual derived state | Derived |
| Player → FootballReadiness | football evidence-derived view | Derived |
| Actor/action → AuditEvent | accountability history | Core |

## 4. Established Multiplicity

The Domain Model explicitly supports:

- multiple GuardianLinks;
- multiple Membership records;
- multiple Verification records;
- multiple ConsentRecords;
- multiple Evidence records;
- multiple Media items;
- multiple SeasonPerformance records;
- multiple Opportunities per Organization;
- multiple Applications per Player and Opportunity;
- multiple contextual Readiness evaluations;
- multiple AuditEvents.

Historical relationships must preserve provenance.

## 5. Relationship Invariants

1. Player organization state is derived from Membership; no mutable `current_club` shortcut.
2. GuardianLink does not create universal Guardian authority.
3. Consent cannot exceed the grantor's legitimate scope.
4. Verification is scoped and cannot silently verify unrelated claims.
5. Evidence remains provenance-bearing and does not automatically establish truth.
6. OpportunityReadiness requires a Player + Opportunity context.
7. FootballReadiness remains distinct from OpportunityReadiness and ranking.
8. Discoverability does not create republication permission.
9. Child voice remains distinct from Guardian authority and final decision where applicable.
10. Safeguarding concern/report remains distinct from finding, protective action, investigation outcome, and final resolution.
11. Derived states never replace their underlying records.
12. Technical relationship keys, if later implemented, do not themselves establish legal authority or truth.

## 6. Gate 2 Seams — Not Yet Frozen

The following require explicit resolution before schema work:

- exact User ↔ Player cardinality;
- User ↔ Guardian relationship;
- User ↔ Coach / Organization affiliation;
- User ↔ Scout / Organization affiliation;
- whether GuardianLink authority scopes require a separate authorization concept;
- exact Claim/Assertion representation relative to Evidence;
- safeguarding response relationship/state structure;
- child participation / objection / assent / decision relationship;
- OpportunityApplication participant and state structure;
- Outcome multiplicity and correction/dispute structure.

These are **deferred decisions, not hidden assumptions**.

## 7. Gate 2 Findings

**G2-01 — Relationship derivability: PASS.** Core Gate 1 entities can be related without changing the ratified semantic baseline.

**G2-02 — Semantic stability: PASS.** No new semantic amendment is presently required.

**G2-03 — Schema authorization: HOLD.** The relationship model is not yet frozen; unresolved seams must not be converted into database assumptions.

**G2-04 — Gate status: OPEN.**

## 8. Gate 2 Exit Criteria

- [x] Core relationships derived from Domain Model.
- [x] Membership remains first-class.
- [x] GuardianLink remains first-class.
- [x] Consent remains purpose-bound.
- [x] Verification remains scoped.
- [x] Evidence remains provenance-bearing.
- [x] OpportunityApplication remains first-class.
- [x] Readiness remains contextual and derived.
- [x] Football Readiness remains separate.
- [x] AuditEvent remains historical/accountability-oriented.
- [x] No semantic concept silently introduced.
- [ ] Actor cardinalities resolved.
- [ ] Assertion/Evidence relationship resolved.
- [ ] Safeguarding response relationship resolved.
- [ ] Child participation/decision relationship resolved.
- [ ] Application participant/state relationships resolved.
- [ ] Outcome correction/dispute relationship resolved.
- [ ] Complete conceptual ERD reviewed.
- [ ] ERD frozen without inventing authority or legal rules.

## 9. Next Action

Run adversarial interrogation of each Gate 2 seam:

`Constitution → Domain Model → Gate 1 witnesses → M1–M9 → relationship proposal → adversarial test → disposition`

Only after Gate 2 closes:

`Conceptual ERD → MVP relationship subset → Schema`

> **A relationship represents a domain relationship. It does not, by itself, prove authority, consent, truth, legality, or implementation.**

**End of Gate 2 Relationship Model**
