# ScoutSA Gate Status — current note 2026-11-13

> This note is on `prototype/internal-demo`. It records the isolated prototype branch and does not alter or lift any mainline implementation hold.

**Mainline remains:** documentation-first; implementation, schema migration, RLS, API, authentication, real identity processing, deployment and pilot remain on hold. The October 2026 gate decisions and unresolved seams below remain in force.

**Isolated prototype branch:** a synthetic, static browser demonstration exists under `prototype/`. Its pure review engine is version 0.2.0. On 2026-11-12, the engine suite recorded 40/40 headless Node tests passing; both relevant inline scripts passed syntax checks; both JSON schema files parsed. The documentation-integrity test adds three checks; the expanded hosted workflow passed all 43 test declarations (40 engine + 3 documentation) on [run 43398121693](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43398121693), commit `fef7aaed3beb87746613d049340a216d82294029`. See `prototype/verification/documentation-integrity-ci-2026-11-13.md`. The updated browser smoke page was not re-executed against v0.2.0 because unauthenticated access to this private repository returned 404. The prior 32/32 browser result belongs to the v0.1.0 baseline and is not current proof.

**Prototype boundary:** synthetic fixtures only; no backend, persistence, authentication, authorization, RLS, API, identity vault, consent capture, disclosure, production security, legal compliance or pilot readiness. A successful policy evaluation can only reach separate human review and never authorizes disclosure.

**Operational seams still open:** membership evidence classes (formal-organization records, community-coach attestations and player-reported claims) remain a proposal only; see `prototype/AFFILIATION-EVIDENCE-MODEL-PROPOSAL.md`. No class is a trust tier, and minimum evidence and opportunity-specific acceptance rules remain unresolved. Multi-guardian legal authority and dispute resolution; purpose-category scope; user/player delegation; retention and access policy; and a server-side release authorization design also remain open. The current engine's verified-membership rule is unchanged. No implementation is authorized by the prototype work.

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
