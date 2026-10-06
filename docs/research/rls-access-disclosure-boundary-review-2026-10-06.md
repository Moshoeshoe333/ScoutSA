# ScoutSA RLS / Access / Disclosure Boundary Review — 2026-10-06

**AuthorityLevel:** NONE  
**Status:** CONDITIONAL PASS — POLICY / LEGAL INPUT REQUIRED BEFORE RLS IMPLEMENTATION

## 1. Purpose

This review determines what database-level access controls may safely enforce from already-established product semantics, while explicitly refusing to turn unresolved legal or operational questions into technical permissions.

It is not a POPIA compliance certification and does not authorize production RLS.

## 2. Governing semantic boundaries

The review is governed by:

- ASSERTION ≠ EVIDENCE
- ASSERTION VISIBILITY ≠ EVIDENCE VISIBILITY
- ROLE ≠ UNIVERSAL AUTHORITY
- AUTHORITY ≠ CONSENT
- PURPOSE A AUTHORIZATION ≠ PURPOSE B AUTHORIZATION
- DISCOVERABLE ≠ REPUBLISHABLE
- VERIFICATION ≠ SAFEGUARDING CLEARANCE
- CHILD VOICE ≠ GUARDIAN AUTHORITY
- SAFEGUARDING RECORD VISIBILITY ≠ PUBLIC DISCLOSURE

Technical access must preserve these distinctions.

## 3. Access classes

The MVP requires conceptual separation of at least these access contexts:

1. **Subject/self access** — a person accessing information about themselves where the applicable workflow permits it.
2. **Scoped Guardian access** — Player-specific access governed by applicable Guardian relationship, authority, purpose and policy.
3. **Organization/opportunity access** — access required for an approved opportunity workflow, not organization-wide ownership of Player data.
4. **Public/discovery access** — only information explicitly approved for discovery; discoverability does not authorize republication.
5. **Protected/sensitive access** — academic, medical, consent, safeguarding and comparable records require narrower purpose-bound access.
6. **Audit/accountability access** — controlled access to audit/provenance records for authorized accountability purposes.

These are access contexts, not universal roles.

## 4. Safe technical principles

### A1 — Default deny for protected data

Sensitive/protected records must not become broadly readable merely because their parent Player or Organization is discoverable.

### A2 — Player identity does not imply User authority

A User record must not automatically receive access to every Player record.

### A3 — Role does not imply universal authority

Coach, Scout, Guardian or Organization role labels must not by themselves grant unrestricted access.

### A4 — Membership does not imply ownership

Organization membership must not create unrestricted access to Player information.

### A5 — Consent is purpose-bound

A ConsentRecord must not be interpreted as blanket database permission. RLS can enforce an already-defined purpose/scope, but cannot decide the legal validity of the authorizer.

### A6 — Assertion/Evidence separation

Access to an Assertion does not automatically imply access to supporting Evidence.

### A7 — Sensitive-domain separation

Academic, medical, consent, safeguarding and child-voice records require separate access consideration.

### A8 — Revocation/current applicability

Where current access depends on consent or other time-scoped authorization, access evaluation must use current applicability rather than merely historical existence.

### A9 — Audit isolation

Audit events must not become a public disclosure surface simply because the underlying record is discoverable.

### A10 — No technical legal inference

RLS cannot determine legal guardian precedence, capacity, best interests, lawful basis, safeguarding guilt, or final dispute resolution.

## 5. MVP access matrix — semantic boundary only

| Resource | Self / Player | Guardian | Organization / Opportunity | Public Discovery | Protected / accountable |
|---|---|---|---|---|---|
| Player identity | scoped | applicable policy | approved subset | approved subset only | controlled |
| Assertions | scoped | purpose/scope | approved opportunity scope | not automatic | controlled |
| Evidence | controlled | purpose/scope | purpose/scope | not automatic | controlled |
| Verification | scoped | applicable scope | approved verification scope | limited derived/display state only if approved | controlled |
| ConsentRecord | restricted | applicable authority/purpose | purpose-limited where necessary | **NO** | controlled |
| Media | purpose-bound | applicable scope | approved purpose | explicit approval only | controlled |
| AcademicProfile | restricted | applicable scope | justified purpose only | **NO by default** | controlled |
| MedicalClearance | restricted | applicable scope | minimum necessary clearance only | **NO** | controlled |
| TransportProfile | scoped | applicable purpose | opportunity feasibility scope | **NO by default** | controlled |
| Opportunity | discoverable where approved | relevant context | organization-controlled | approved | controlled |
| OpportunityApplication | participant-scoped | applicable workflow | opportunity-scoped | **NO** | controlled |
| Outcome | participant-scoped | applicable workflow | applicable workflow | **NO by default** | controlled |
| Child Voice | restricted/contextual | applicable workflow | need-to-know only where authorized | **NO** | controlled |
| Safeguarding Case/Response | highly restricted | applicable process only | authorized safeguarding process only | **NO** | highly restricted |
| AuditEvent | **NO general access** | **NO general access** | **NO general access** | **NO** | authorized accountability |

The words “applicable”, “approved”, “authorized”, and “purpose-limited” are deliberate unresolved policy/legal inputs. They are not permissions created by this table.

## 6. RLS design boundary

### Safe to encode later

RLS may enforce:

- tenant/organization isolation where that concept is explicitly authorized;
- subject-scoped access;
- relationship-scoped access;
- approved purpose/scope predicates;
- explicit protected-record restrictions;
- audit isolation;
- current applicability predicates once their source policy is finalized.

### Must NOT be invented by RLS

RLS must not silently decide:

- which Guardian legally outranks another;
- whether a child has legal capacity;
- whether a consent authorizer is legally valid;
- whether a safeguarding concern is true;
- whether a person is safe/cleared;
- whether information may lawfully be republished;
- whether an unresolved dispute is resolved;
- whether a role has universal authority.

## 7. Disclosure boundary

The following distinctions remain mandatory:

`discoverable ≠ republishable`

`visible for purpose A ≠ visible for purpose B`

`authenticated ≠ authorized`

`authorized ≠ legally sufficient`

`historically authorized ≠ currently applicable`

A public Player Passport cannot automatically expose:

- consent records;
- detailed evidence;
- medical information;
- academic information;
- safeguarding records;
- audit records;
- private contact details.

## 8. Retention and deletion

RLS is not retention.

Database access policies must not be used as a substitute for retention/deletion rules.

Retention/deletion remains a separate legal/operational decision and is not frozen by this review.

## 9. Decision

**RLS / ACCESS / DISCLOSURE BOUNDARY: CONDITIONAL PASS**

The semantic boundary is sufficiently defined to prevent unsafe technical assumptions.

However, production RLS policy is **NOT AUTHORIZED**.

Before implementation:

1. define approved MVP access purposes and actors;
2. resolve legal/jurisdictional requirements for protected data and minors;
3. map each RLS predicate to an approved source-of-authority/relationship;
4. define correction/dispute effects;
5. define retention/deletion interaction;
6. test deny-by-default and cross-purpose leakage;
7. run non-production RLS tests;
8. obtain explicit implementation authorization.

## 10. 33×3

- Existence: PASS
- Coherence: PASS
- Failure containment: PASS

**Final boundary:** RLS may enforce ratified and explicitly approved policy; RLS must never invent the policy.
