# ScoutSA Gate Status — 2026-10-06

**Current phase:** Gate 2 — Relationship Model / ERD  
**Gate 1:** CLOSED  
**Gate 2:** OPEN  
**ERD:** HOLD  
**Schema:** HOLD  
**RLS / API / UI:** DEFERRED  
**Implementation:** DEFERRED

## 1. Executive status

ScoutSA has completed the Gate 1 semantic foundation and is actively resolving the remaining Gate 2 relationship decisions.

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

## 4. Gate 2 seam status

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

## 7. Exit criteria for Gate 2

Gate 2 may move toward conceptual ERD freeze only when:

1. remaining relationship/cardinality decisions are explicitly resolved;
2. authorization boundaries are defined without inventing legal authority;
3. application and outcome lifecycles are sufficiently precise;
4. correction/dispute/provenance behavior is represented;
5. access/disclosure boundaries are sufficiently defined for the conceptual model;
6. the complete relationship model passes adversarial review;
7. the conceptual ERD can be derived without introducing hidden semantic assumptions.

## 8. Anti-drift rule

Documentation growth is not itself progress.

A new research artifact must either:

- witness a real uncertainty;
- resolve a defined decision;
- preserve provenance;
- identify a contradiction;
- or support a justified gate transition.

Otherwise it should not expand the repository.

## 9. Implementation boundary

**No implementation is currently authorized.**

The purpose of Gate 2 is to make the eventual implementation **smaller, safer, and derivable**, not to defer implementation indefinitely.

Once Gate 2 relationship integrity is sufficiently stable, the next authorized activity is an explicit **MVP Boundary Freeze** before code.

## 10. Evidence rule

> **Strength of claim must never exceed strength of evidence.**
