# ScoutSA Gate Status — 2026-10-06

**Current phase:** SQL Schema Implementation Draft  
**Gate 1:** CLOSED  
**Gate 2:** CLOSED AT CONCEPTUAL LEVEL  
**Conceptual ERD:** FROZEN  
**ERD implementation detail:** DEFERRED  
**Schema:** HOLD  
**RLS / API / UI:** DEFERRED  
**Implementation:** DEFERRED

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
3. Operational/legal carry-forward decisions required for that MVP.
4. Implementation prerequisites and evidence requirements.
5. Schema Boundary Freeze.
6. Only after schema boundary review/freeze: schema design.
7. SQL/schema implementation draft is permitted only as a traceable draft.
8. Implementation remains HOLD until SQL/schema review and implementation evidence are ratified.



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
