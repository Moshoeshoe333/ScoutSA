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
