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



## 6.1 Adversarial Seam A — User ↔ Player / Actor Identity

**Seam ID:** G2-SEAM-01  
**Status:** NEEDS DOMAIN DECISION — ERD BLOCKER

### Question

Does a `User` represent the same domain person as a `Player`, and if so, what cardinality and lifecycle are guaranteed?

### Adversarial test

The current Domain Model deliberately separates:

- `User` — authentication identity for a human actor;
- `Player` — persistent football identity / Player Passport.

The following tempting shortcuts are **not authorized** by the current domain:

- `User = Player`;
- every Player must have a User account;
- every User must have a Player;
- one User may represent multiple Players;
- multiple Users may represent the same Player;
- deleting/deactivating a User deletes the Player Passport;
- a User role automatically proves the person's football identity.

### Evidence from the ratified domain

The Domain Model states that authentication identity is distinct from football identity and that a role assignment does not itself verify external professional status.

The Player Passport is also required to be persistent and club-independent.

Therefore the safest current conclusion is:

> **User and Player are distinct domain concepts. Their exact cardinality is not yet ratified.**

### Candidate relationship shapes considered

| Candidate | Result | Reason |
|---|---|---|
| User 1:1 Player | REJECTED FOR NOW | Assumes every player must have an account and every account is a player. |
| User 0..1 : 0..1 Player | PLAUSIBLE, NOT RATIFIED | Preserves optional account linkage but still imposes one-account/one-player semantics. |
| User 1 : many Players | NOT SUPPORTED | Would permit account-level identity ambiguity without an explicit delegation model. |
| Many Users : one Player | NOT SUPPORTED | Could be valid operationally for delegated/guardian-managed access, but no such domain concept or authorization rule is ratified. |
| Player with no User | SUPPORTED | Does not conflict with the persistent Player Passport concept. |
| User with no Player | SUPPORTED | Users may be Guardian, Coach, Scout, administrator, or another authorized role. |

### Disposition

**G2-01A — Player may exist independently of a User account: DERIVABLE / SAFE.**

**G2-01B — User may exist without being a Player: DERIVABLE / SAFE.**

**G2-01C — Exact User ↔ Player cardinality: NEEDS DOMAIN DECISION.**

**G2-01D — Delegated/shared access to a Player Passport: NEEDS DOMAIN + AUTHORIZATION DECISION.**

### Gate consequence

Do **not** freeze a User↔Player foreign-key cardinality into the ERD yet.

This seam does not require a new semantic amendment at present. It requires an explicit domain decision about account ownership/delegation.

**No schema implementation is authorized from this seam.**



## 6.2 Adversarial Seam B — User ↔ Guardian / Coach / Scout / Organization Affiliation

**Seam ID:** G2-SEAM-02  
**Status:** NEEDS DOMAIN / OPERATIONAL DECISION — ERD BLOCKER

### Question

Are Guardian, Coach, and Scout permanent identities, roles held by a User, organization affiliations, or some combination?

### Adversarial test

The Domain Model defines:

- User as authentication identity for a human actor.
- Guardian, Coach, and Scout as conceptual roles.
- Organization as a separate domain entity.
- A role assignment does not itself verify external professional status.

Therefore the following shortcuts are not authorized:

- User role = verified Guardian/Coach/Scout status;
- User has one permanent Organization;
- Coach or Scout affiliation is immutable;
- Guardian authority is created merely by a GUARDIAN role;
- Organization membership automatically grants every organizational permission;
- changing a User's role rewrites historical actions or assertions.

### Safe derivations

| Proposition | Disposition | Reason |
|---|---|---|
| A User may hold a Guardian role | SAFE | Explicitly supported by conceptual roles. |
| A User may hold Coach/Scout roles | SAFE | Explicitly supported by conceptual roles. |
| Role ≠ external verification | SAFE | Explicit Domain invariant. |
| Organization affiliation is separate from User identity | SAFE | Organization and User are distinct concepts. |
| Affiliation needs temporal/history semantics | SAFE | Historical provenance is required for authority-bearing assertions. |
| One permanent Organization per User | NOT SUPPORTED | No such domain rule exists. |
| Role alone grants organization authority | REJECTED | Conflicts with scoped authority. |
| Exact multiplicity/cardinality | NEEDS DOMAIN DECISION | Not yet ratified. |
| Exact verification/authorization process | NEEDS OPERATIONAL / LEGAL DECISION | Deliberately deferred by Gate 1. |

### Important distinction

A relationship such as User → Organization cannot by itself answer:

- whether the person is currently authorized to act for that organization;
- which claims they may make;
- whether they are a Guardian for a particular Player;
- whether they are a verified Coach or Scout;
- whether they may access restricted information.

Those require separate scope/status/verification/authorization concepts where applicable.

### Disposition

**G2-02A — Role assignment is distinct from verification: DERIVABLE / SAFE.**

**G2-02B — Organization affiliation is distinct from User identity: DERIVABLE / SAFE.**

**G2-02C — Guardian relationship must remain Player-specific through GuardianLink: DERIVABLE / SAFE.**

**G2-02D — Exact User ↔ Guardian/Coach/Scout multiplicities: NEEDS DOMAIN DECISION.**

**G2-02E — Organization affiliation/authorization semantics: NEEDS DOMAIN + OPERATIONAL DECISION.**

### Gate consequence

Do not freeze a single user.organization_id, permanent role, or role-implied authority into the ERD.

No new semantic amendment is presently required. The unresolved issue is the exact relationship and authorization model.

**No schema implementation is authorized from this seam.**

## 6.3 Adversarial Seam C — GuardianLink authority scope ↔ ConsentRecord

**Seam ID:** G2-SEAM-03  
**Status:** NEEDS DOMAIN / LEGAL-OPERATIONAL DECISION — ERD BLOCKER

### Question

Can ScoutSA relate a Guardian's Player-specific relationship and authority scope to a ConsentRecord without treating the Guardian relationship itself as universal permission or treating the existence of an authorising-person reference as proof of authority?

### Adversarial test

The ratified Domain Model already separates:

- **GuardianLink** — the Player ↔ Guardian relationship, including relationship type, authority scope, status, effective period, evidence reference, and verification status.
- **ConsentRecord** — a versioned, purpose-specific permission granted by an authorised person, with scope, purpose, status, timing, expiry/revocation, and relevant organisation/opportunity where applicable.

The Consent Model further requires the system to record **who** authorised, **what** was authorised, **for what purpose**, **when**, and under **which version**.

Therefore the relationship model can safely preserve the following distinction:

> **GuardianLink establishes a relationship and records an authority scope; ConsentRecord records a purpose-specific authorisation. Neither object alone should be treated as universal permission.**

### Authority / consent test

| Proposition | Disposition | Reason |
|---|---|---|
| GuardianLink may carry an authority scope | **DERIVABLE / SAFE** | Already explicit in the Domain Model. |
| ConsentRecord may identify an authorising person | **DERIVABLE / SAFE** | Already explicit in the Consent Model. |
| Authorising-person reference alone proves authority | **REJECTED** | A reference identifies who acted; it does not establish that the person was authorised for that purpose at that time. |
| Consent purpose/scope must be evaluated against the grantor's legitimate authority scope | **DERIVABLE / SAFE** | Explicit ConsentRecord invariant: consent cannot exceed the grantor's legitimate scope. |
| Consent can expand GuardianLink authority | **REJECTED** | Consent cannot grant more authority than the grantor legitimately possesses. |
| GuardianLink automatically grants consent | **REJECTED** | Relationship/authority scope is not itself a purpose-specific consent record. |
| One consent can silently cover unrelated purposes | **REJECTED** | Conflicts with purpose-bound authorisation. |
| Revocation removes the historical fact that consent existed | **REJECTED** | Consent history must remain auditable; current authorisation is recalculated. |
| Authority-scope change may affect current applicability of an existing consent | **DERIVABLE / SAFE** | Consistent with temporal applicability and derived-state reassessment. |
| Exact legal effect of multiple GuardianLinks on one consent decision | **NEEDS LEGAL / OPERATIONAL DECISION** | The domain deliberately does not establish universal Guardian precedence, latest-wins, majority-wins, or another invented conflict rule. |
| Exact identity/cardinality between authorising person, User, Guardian, and Player | **NEEDS DOMAIN DECISION** | G2-SEAM-01 and G2-SEAM-02 remain unresolved. |

### Multiple-Guardian adversarial case

Assume a Player has two active GuardianLinks with different authority scopes.

Guardian A authorises **Trial-Specific Approval** for Opportunity X.

Guardian B has a different authority scope and later submits a conflicting authorisation.

The model must **not** infer:

- Guardian A wins because they acted first;
- Guardian B wins because they acted later;
- the latest consent wins automatically;
- the majority of guardians wins;
- any Guardian can override another;
- a broader role label creates precedence.

The records must remain separately attributable and time-scoped until an applicable legal/product/operational rule determines their effect.

### Revocation / authority-change test

Three distinct events must remain distinguishable:

1. **Consent revocation** — the authorising person withdraws a previously recorded permission where revocation is legally applicable.
2. **GuardianLink authority change** — the relationship, authority scope, status, or effective period changes.
3. **Opportunity/context change** — the consent's purpose or relevant organisation/opportunity no longer matches the current action.

These events must not be collapsed into a single mutable "consent = true/false" fact.

The current state may therefore require reassessment when a material authority, consent, purpose, or opportunity input changes, while historical records remain preserved.

### Disposition

**G2-03A — GuardianLink relationship + scoped authority: DERIVABLE / SAFE.**

**G2-03B — ConsentRecord as purpose-specific authorisation: DERIVABLE / SAFE.**

**G2-03C — Authorising-person reference ≠ proof of authority: DERIVABLE / SAFE.**

**G2-03D — Consent validity requires scoped authority evaluation: DERIVABLE / SAFE.**

**G2-03E — Multiple-Guardian conflict effect: NEEDS LEGAL / OPERATIONAL DECISION.**

**G2-03F — Authorising person ↔ User / Guardian / Player identity cardinality: NEEDS DOMAIN DECISION.**

**G2-03G — Exact authority-resolution process: NEEDS LEGAL / OPERATIONAL DECISION.**

### Gate consequence

No new semantic amendment is required.

The existing M1–M5 boundaries are sufficient to express the seam without inventing a new authority hierarchy:

- scoped authority;
- purpose-bound authorisation;
- temporal applicability;
- conflict preservation;
- derived-state reassessment.

However, **G2-SEAM-03 remains an ERD blocker** because the exact authoriser identity relationship and conflict/authority-resolution behavior are not yet ratified.

No schema, RLS, API, or UI rule may be derived from an assumed Guardian precedence rule.

## 6.4 Adversarial Seam D — Assertion / Claim ↔ Evidence

**Seam ID:** G2-SEAM-04  
**Status:** **GOVERNANCE STOP — POTENTIAL MISSING SEMANTIC CONCEPT / ERD BLOCKER**

### Question

Can the current domain represent an attributable **assertion/claim** and its relationship to supporting Evidence without collapsing assertion into evidence, evidence into truth, verification into assertion, or verification into truth?

### Adversarial test

The ratified Domain Model establishes:
- Authority is the actor permitted to make a particular assertion.
- Evidence is an artifact, observation, assertion, or system event supporting a claim.
- Evidence is first-class and provenance-bearing.
- ASSERTION ≠ EVIDENCE.
- EVIDENCE ≠ VERIFICATION.
- VERIFICATION ≠ TRUTH.
- Verification must have a defined subject, claim/scope, authority, evidence basis, timestamp, and status.
- Evidence may include a coach assertion, organization assertion, guardian consent action, or system event.

The current Domain Model does not, however, define a first-class Assertion or Claim entity with its own lifecycle, subject, author/authority, content/scope, timestamp, status, or relationship to one or more Evidence records.

### Representation tests

| Proposition | Disposition | Reason |
|---|---|---|
| Evidence can support a claim | **DERIVABLE / SAFE** | Explicit Domain Model rule. |
| Evidence can itself be an assertion submitted by an actor | **DERIVABLE / SAFE** | Explicit Evidence examples. |
| An assertion is semantically distinct from Evidence | **RATIFIED / SAFE** | Explicit M1 boundary. |
| Verification can be treated as the assertion itself | **REJECTED** | Would conflate verification with the underlying assertion. |
| Evidence alone can represent who asserted a fact, what exactly they asserted, and when | **INSUFFICIENT / NOT SAFE TO FREEZE** | Current evidence fields do not clearly define the substantive assertion object. |
| Player ↔ Evidence alone can represent all claims supported by that evidence | **INSUFFICIENT / NOT SAFE TO FREEZE** | One evidence artifact may support multiple claims, and a claim may require multiple evidence items. |
| A technical claim_id may be invented now | **REJECTED** | A technical key cannot create an unratified domain concept. |
| A generic Evidence record may silently become the Assertion object | **REJECTED** | Would collapse a ratified semantic distinction. |
| Verification may be reused as the universal Claim object | **REJECTED** | Would conflate verification with underlying assertion and truth. |

### Why this seam is different from G2-SEAM-03

G2-SEAM-03 exposed unresolved operational/legal relationship rules while the existing semantic objects were sufficient.

G2-SEAM-04 exposes a more fundamental question:

> **What is the domain object that carries the attributable assertion/claim which Evidence supports?**

The current documents define the distinction but do not clearly define the object required to represent it.

A relationship-only solution would therefore risk inventing semantics through the ERD.

### Governance trigger

Under the Gate 2 control:

> STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED

This seam therefore must not be resolved by adding an Assertion entity, renaming Evidence, or reusing Verification by implication.

The appropriate next step is a governance/re-witness package to determine whether:
1. Assertion is an existing implicit domain concept that can be formally clarified without semantic amendment; or
2. a new ratifiable domain concept is genuinely required; and, if so,
3. its minimum semantics and boundaries can be established without creating truth-by-record, automatic verification, or unsupported authority.

### Required re-witness questions

1. What is the subject of an assertion?
2. Who is its author?
3. What authority, if any, permits the author to make that assertion?
4. What exactly is being asserted?
5. Can one assertion have multiple supporting Evidence records?
6. Can one Evidence record support multiple assertions?
7. How are contradictory assertions preserved?
8. How do assertions change over time without erasing historical provenance?
9. How does Verification relate to an assertion without replacing it?
10. How does a derived readiness state consume assertions/evidence without becoming a source of truth?
11. What correction/dispute lifecycle is required?
12. What visibility/disclosure rules apply to the assertion versus its supporting Evidence?

### Disposition

**G2-04A — Evidence as a supporting domain concept: DERIVABLE / SAFE.**

**G2-04B — Assertion ≠ Evidence: RATIFIED / SAFE.**

**G2-04C — Verification ≠ underlying assertion: RATIFIED / SAFE.**

**G2-04D — Current relationship model is sufficient to freeze an Assertion↔Evidence ERD: NO.**

**G2-04E — Whether Assertion/Claim requires first-class domain representation: GOVERNANCE REVIEW REQUIRED.**

### Gate consequence

**STOP.**

No ERD relationship, schema object, foreign key, API contract, RLS rule, or UI behavior is authorized for this seam until governance determines whether the domain requires a first-class Assertion/Claim concept.

This is **not** a claim that ScoutSA definitely needs a new entity. It is a witnessed insufficiency in the current relationship model that must be resolved before ERD freeze.

**Gate 2:** OPEN  
**G2-SEAM-04:** GOVERNANCE STOP  
**ERD:** HOLD  
**Schema:** HOLD  
**RLS/API/UI:** DEFERRED  
**Implementation:** DEFERRED

## 6.5 Adversarial Seam E — Assertion ↔ Evidence Reconciliation

**Seam ID:** G2-SEAM-04  
**Status:** **CLOSED — SEMANTIC CONCEPT RATIFIED**

The explicit Gate 2 ratification record establishes **Assertion** as a first-class semantic domain concept.

Conceptual relationship:

```
Subject
  ↑
Assertion
  ├── author / authority context
  ├── temporal context / lifecycle
  ├── provenance
  └── supporting Evidence

Assertion → Verification (where a defined verification evaluates the assertion/scope)
Assertion → Derived State (as an input, never as replacement)
```

The relationship model may therefore distinguish:

- the proposition being asserted;
- the actor who authored/submitted it;
- applicable authority/scope;
- supporting Evidence;
- any scoped Verification evaluating it;
- historical/current temporal context.

### Ratified relationship invariants

1. ASSERTION ≠ EVIDENCE.
2. ASSERTION ≠ VERIFICATION.
3. ASSERTION ≠ TRUTH.
4. AUTHOR ≠ AUTHORITY.
5. One Assertion may require multiple Evidence records.
6. One Evidence record may support multiple Assertions.
7. Contradictory Assertions remain separately attributable until an authorized resolution process applies.
8. Historical Assertions remain distinguishable from current applicability.
9. Assertion visibility does not automatically equal Evidence visibility or republication permission.
10. Derived readiness may consume Assertions and Evidence but does not replace them.

### Scope boundary

This reconciliation does **not** freeze database multiplicity, keys, storage, RLS, API, UI, or implementation mechanics. Those remain later-gate decisions.

**Disposition:** G2-SEAM-04 semantic blocker CLOSED. Remaining Gate 2 seams continue.


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


## 6.6 Adversarial Seam F — Safeguarding Case/Response

**Seam ID:** G2-SEAM-05  
**Status:** CLOSED — SEMANTIC CONCEPT RATIFIED

The G2-SEAM-05 governance re-witness established that AuditEvent is not sufficient to represent the substantive safeguarding response lifecycle. The ratification review then tested the candidate against M1–M9, the ratified Assertion concept, provenance, authority, truth, temporal, disclosure, and implementation boundaries.

### Ratified conceptual relationship

```
Safeguarding Subject
        │
        ▼
Concern / Report
        │
        ▼
Safeguarding Case / Response
   ├── Finding / Substantiation (where applicable)
   ├── Protective Action (where applicable)
   ├── Investigation Outcome (where applicable)
   └── Final Resolution (where applicable)
```

The relationship is conceptual only. Not every case follows every branch.

### Relationship invariants

1. A concern/report remains distinct from any later finding/substantiation.
2. Protective action does not establish guilt or final resolution.
3. Investigation outcome remains distinct from interim protective action and the original report.
4. Final resolution remains distinct from earlier response states.
5. Case/response records retain provenance and temporal context.
6. Safeguarding records are not public merely because the Player or Organization is discoverable.
7. AuditEvent remains an accountability/history mechanism and does not replace the substantive case/response concept.
8. Responsible authority/process may be referenced where applicable, but the relationship model does not invent a universal safeguarding authority hierarchy.
9. Technical keys, cardinalities, RLS, API behavior, UI behavior, and storage mechanics remain deferred.

### Gate consequence

**G2-SEAM-05:** CLOSED — semantic concept ratified.  
**Gate 2:** OPEN.  
**ERD:** HOLD pending remaining seam interrogation.  
**Schema:** HOLD.  
**RLS/API/UI:** DEFERRED.  
**Implementation:** DEFERRED.
