# Gate 2 G2-SEAM-02 — User ↔ Guardian / Coach / Scout / Organization Re-Witness — 2026-10-06

**Status:** Re-witness complete — semantic boundary stable; exact actor/affiliation model remains a domain/operational decision.

## 1. Question

Can ScoutSA represent human authentication identity, Guardian/Coach/Scout roles, and organization affiliation without turning a role or affiliation into universal authority?

## 2. Governing distinctions

The ratified domain separates:

- **User** — authentication identity for a human actor;
- **Guardian / Coach / Scout** — actor-role semantics;
- **Organization** — a separate domain entity;
- **GuardianLink** — the Player-specific Guardian relationship and scoped authority context;
- **Verification / Assertion / Evidence** — separate epistemic objects.

Therefore:

- ROLE ≠ UNIVERSAL AUTHORITY;
- ROLE ≠ VERIFICATION;
- AFFILIATION ≠ UNIVERSAL AUTHORITY;
- ORGANIZATION MEMBERSHIP ≠ UNRESTRICTED ACCESS.

## 3. Adversarial tests

| Proposition | Disposition |
|---|---|
| User is the same thing as Guardian/Coach/Scout | **REJECTED** |
| A User may hold a Guardian/Coach/Scout role | **SAFE** |
| Role assignment proves external professional/organizational status | **REJECTED** |
| Organization affiliation is distinct from User identity | **SAFE** |
| One permanent organization per User | **NOT ESTABLISHED** |
| Organization affiliation may need temporal history | **SAFE / DERIVABLE** |
| Organization affiliation automatically grants every organization permission | **REJECTED** |
| Coach/Scout role automatically authorizes all organization actions | **REJECTED** |
| Guardian role alone establishes Player-specific Guardian authority | **REJECTED** |
| Guardian authority is represented through Player-specific GuardianLink | **SAFE / DERIVABLE** |
| Exact actor-role multiplicity | **OPEN — DOMAIN DECISION** |
| Exact organization-affiliation cardinality | **OPEN — DOMAIN / OPERATIONAL DECISION** |
| Exact verification/authorization process | **OPEN — OPERATIONAL / LEGAL DECISION** |

## 4. Temporal / provenance test

Where a User's organization affiliation affects an authority-bearing assertion or action, historical context must remain distinguishable from current affiliation.

Therefore:

- affiliation beginning ≠ verification;
- affiliation ending ≠ deletion of historical actions;
- role change ≠ rewriting prior assertions;
- current affiliation ≠ proof that every historical action was authorized;
- historical affiliation ≠ current authority.

The relationship model must preserve the ability to distinguish historical from current context without inventing a universal legal authority rule.

## 5. Guardian-specific test

Guardian is materially different from Coach/Scout affiliation.

A Guardian relationship is **Player-specific** and must remain represented through GuardianLink.

A generic User → GUARDIAN role must not silently create authority over every Player.

Thus:

> **Guardian role identity ≠ GuardianLink authority.**

This preserves the already ratified M2/M3/M8 boundaries.

## 6. Organization-side test

A User may interact with an Organization, but the mere existence of an affiliation must not answer:

- whether the affiliation is current;
- what organizational scope it covers;
- what actions the actor may perform;
- whether the actor is verified;
- whether the actor may access a particular Player, Opportunity, Evidence, ConsentRecord, or safeguarding record.

Those are separate authorization/verification questions.

## 7. Missing-concept test

The re-witness does **not** expose a new semantic object required to preserve the current domain.

Potential technical structures such as OrganizationMembership, RoleAssignment, OrganizationAffiliation, or ActorAuthorization must **not** be introduced into the conceptual ERD merely because they are common database patterns.

If one is required to express the final ratified domain, it must first be defined as a domain concept with scope, lifecycle, provenance and authority semantics.

## 8. Disposition

- **G2-02A — User identity distinct from actor-role semantics:** **RATIFIED / EXISTING BOUNDARY.**
- **G2-02B — Role assignment ≠ verification:** **RATIFIED / EXISTING BOUNDARY.**
- **G2-02C — Organization affiliation distinct from User identity:** **DERIVABLE / SAFE.**
- **G2-02D — Guardian relationship remains Player-specific through GuardianLink:** **DERIVABLE / SAFE.**
- **G2-02E — Exact actor-role multiplicity:** **OPEN — DOMAIN DECISION REQUIRED.**
- **G2-02F — Exact User ↔ Organization affiliation/cardinality:** **OPEN — DOMAIN / OPERATIONAL DECISION REQUIRED.**
- **G2-02G — Exact organization authorization/verification process:** **OPEN — OPERATIONAL / LEGAL DECISION REQUIRED.**
- **G2-02H — Role or affiliation creates universal authority:** **REJECTED.**

## 9. Gate consequence

No new semantic amendment is warranted.

No permanent user.organization_id, role-implied authority, or universal organization access rule is frozen.

No new conceptual authorization entity is invented.

No schema, RLS, API, UI, or implementation rule is authorized from this seam.

G2-SEAM-02: SEMANTICALLY STABLE / AFFILIATION-AUTHORIZATION HOLD
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED

Next authorized seam: **G2-SEAM-03 — GuardianLink ↔ ConsentRecord operational authority.**
