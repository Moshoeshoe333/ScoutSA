# ScoutSA MVP Actor × Purpose × Resource Authorization Map — 2026-10-06

**AuthorityLevel:** NONE  
**Status:** POLICY / LEGAL DECISION ARTIFACT — RATIFICATION REQUIRED  
**RLS:** NOT AUTHORIZED

## 1. Purpose

This map translates the existing MVP access boundary into explicit combinations of **actor context**, **purpose**, and **resource**.

It does not itself grant access. It identifies which combinations are:

- **ALLOW** — baseline semantic access is permissible;
- **DENY** — outside the MVP access boundary;
- **CONDITIONAL** — requires an approved purpose, relationship, scope and workflow;
- **HOLD** — policy/legal input is still required.

A CONDITIONAL or HOLD cell must not be converted directly into an RLS predicate.

## 2. Actor contexts

Actor context is deliberately separated from job title or role.

| Actor context | Meaning | Authority assumption |
|---|---|---|
| Player / subject | Person associated with the Player Passport | No automatic User↔Player authority |
| Scoped Guardian | Guardian relationship concerning a specific Player | No universal Guardian precedence |
| Opportunity-side organization actor | Person acting within an approved Opportunity workflow | Role/membership does not create universal Player access |
| Public / discovery viewer | Unauthenticated or general discovery context | Only explicitly approved public fields |
| Accountability actor | Explicitly authorized safeguarding, audit, consent or governance function | No automatic access merely from being an employee/role |
| System / service | Technical execution context | Must execute approved policy; cannot invent authority |

## 3. Purpose vocabulary

| Purpose | Boundary |
|---|---|
| Passport management | Establish or maintain the Player Passport |
| Discovery | Find approved opportunities/players within approved disclosure scope |
| Verification | Evaluate a defined Assertion/Evidence relationship |
| Contact request | Facilitate a defined opportunity-related contact request |
| Trial request | Facilitate a specific trial/opportunity workflow |
| Opportunity administration | Operate an organization's Opportunity |
| Consent administration | Record/evaluate purpose-specific authorization |
| Safeguarding response | Perform an authorized safeguarding process |
| Accountability / audit | Establish what action occurred, by whom, when and under what context |
| Public display | Display explicitly approved public information |
| Derived readiness | Evaluate FootballReadiness / OpportunityReadiness from approved inputs |

## 4. Authorization matrix

| Actor × Purpose | Player identity | Assertions | Evidence | Verification | Consent | Media | Academic | Medical | Transport | Application | Outcome | Child Voice | Safeguarding | Audit |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Player × Passport management | ALLOW | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | HOLD | HOLD | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | CONDITIONAL |
| Player × Discovery | CONDITIONAL | CONDITIONAL | DENY | CONDITIONAL | DENY | CONDITIONAL | DENY | DENY | DENY | CONDITIONAL | DENY | DENY | DENY | DENY |
| Player × Contact request | CONDITIONAL | CONDITIONAL | DENY | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | DENY | CONDITIONAL | CONDITIONAL | DENY | CONDITIONAL | DENY | CONDITIONAL |
| Player × Trial request | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | CONDITIONAL | HOLD | CONDITIONAL |
| Guardian × Passport management | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | HOLD | CONDITIONAL |
| Guardian × Contact / Trial | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | HOLD | CONDITIONAL |
| Organization × Discovery | CONDITIONAL | CONDITIONAL | DENY | CONDITIONAL | DENY | CONDITIONAL | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| Organization × Contact request | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | DENY | CONDITIONAL | CONDITIONAL | DENY | HOLD | HOLD | CONDITIONAL |
| Organization × Trial request | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | HOLD | HOLD | CONDITIONAL |
| Organization × Opportunity administration | CONDITIONAL | DENY | DENY | CONDITIONAL | DENY | CONDITIONAL | DENY | DENY | DENY | CONDITIONAL | CONDITIONAL | DENY | HOLD | CONDITIONAL |
| Public × Public display | CONDITIONAL | DENY | DENY | CONDITIONAL | DENY | CONDITIONAL | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| Accountability × Consent administration | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | HOLD | HOLD | HOLD | CONDITIONAL | CONDITIONAL | CONDITIONAL | HOLD | CONDITIONAL |
| Accountability × Safeguarding response | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | HOLD | HOLD | HOLD | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Accountability × Audit | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| System × approved workflow execution | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL |

## 5. Interpretation rules

### 5.1 Player

Player access is not equivalent to User access.

Where the product requires authenticated User access to a Player Passport, the User↔Player relationship must be explicitly approved before implementation.

### 5.2 Guardian

Guardian access is always Player-specific and purpose-bound.

GuardianLink does not by itself settle:
- conflicting Guardians;
- legal precedence;
- capacity;
- consent validity;
- every possible disclosure purpose.

Those remain policy/legal decisions.

### 5.3 Organization

An Organization may participate in an Opportunity workflow without receiving unrestricted access to the Player.

Organization membership is not ownership.

Discovery, contact and trial access must be separately scoped.

### 5.4 Public

Public display is a deliberately narrow context.

Public availability does not authorize:
- Evidence disclosure;
- Consent disclosure;
- Academic disclosure;
- Medical disclosure;
- Safeguarding disclosure;
- Audit disclosure;
- private contact information;
- automatic republication of external information.

### 5.5 Accountability

Accountability access is purpose-specific.

A safeguarding investigator, consent administrator, auditor or other authorized actor does not receive universal access merely because the actor belongs to an accountability function.

### 5.6 System

The system/service context is not an authority source.

Technical execution may enforce approved policy but must not decide:
- legal Guardian precedence;
- child capacity;
- best interests;
- safeguarding guilt;
- lawful republication;
- unresolved disputes.

## 6. Purpose-bound rules

The following transformations are prohibited:

- Passport management → automatic Discovery permission for every field.
- Discovery → Evidence access.
- Verification → Safeguarding clearance.
- Contact request → unrestricted Player-data access.
- Trial request → unrestricted medical/academic access.
- Organization membership → Player ownership.
- GuardianLink → blanket ConsentRecord authority.
- Consent for one purpose → consent for another purpose.
- Public display → republication rights.
- Historical consent → current permission after applicable revocation/expiry.
- Safeguarding Case access → finding of guilt.
- Child Voice → automatic veto or consent.
- Audit access → unrestricted underlying data access.

## 7. Policy/legal decision queue

These cells cannot be finalized without additional ratification:

### Operational policy
- User↔Player cardinality and delegated access;
- exact organization actor affiliation;
- application participant and transition authority;
- public Passport field set;
- public Verification display state;
- application lifecycle;
- outcome correction/dispute behavior;
- exact purpose scopes.

### Legal/jurisdictional
- Guardian conflict and authorizer validity;
- child participation effects;
- safeguarding authority and disclosure;
- medical/academic processing and disclosure;
- retention/deletion;
- lawful basis and republication/further processing.

## 8. RLS readiness rule

An access combination becomes eligible for technical RLS design only when:

1. actor context is defined;
2. purpose is defined;
3. resource is defined;
4. relationship/authority source is identified;
5. current applicability rule is identified where relevant;
6. field-level disclosure is defined where relevant;
7. policy/legal dependency is resolved or explicitly bounded;
8. deny-by-default behavior is testable;
9. the combination is explicitly ratified for implementation.

Until then, the classification remains CONDITIONAL or HOLD.

## 9. 33×3 target

- **Existence:** every authorization combination maps to an existing actor context, purpose and resource.
- **Coherence:** no combination collapses ratified semantic boundaries.
- **Failure containment:** unresolved authority/legal questions become HOLD rather than invented access.

## 10. Decision

**MVP ACTOR × PURPOSE × RESOURCE MAP: COMPLETE AS A POLICY-DESIGN ARTIFACT.**

**Status:** READY FOR ADVERSARIAL REVIEW AND EXPLICIT POLICY/LEGAL RATIFICATION.

**RLS:** NOT AUTHORIZED.  
**Migration:** HOLD.  
**Production:** HOLD.
