# ScoutSA MVP Access-Policy Decision Matrix — 2026-10-06

**AuthorityLevel:** NONE  
**Status:** DRAFT FOR POLICY / LEGAL RATIFICATION — NO RLS IMPLEMENTATION AUTHORIZED

## 1. Purpose

This matrix converts the ratified semantic access boundary into explicit MVP policy decisions without inventing unresolved authority, legal, consent, safeguarding, disclosure, or retention rules.

It is a policy decision artifact, not RLS SQL and not a POPIA compliance certification.

### Decision vocabulary

- **ALLOW** — semantically permissible baseline, subject to ordinary identity/authentication and approved workflow.
- **DENY** — explicitly outside the MVP boundary.
- **CONDITIONAL** — may be permitted only when a defined purpose, relationship, scope, authorization, or workflow condition is satisfied.
- **HOLD** — insufficient approved operational/legal policy to safely decide.

CONDITIONAL does not mean currently authorized. HOLD does not mean denied. Neither may be converted into RLS predicates until the underlying policy is ratified.

## 2. Governing boundaries

- USER ≠ PLAYER
- ROLE ≠ UNIVERSAL AUTHORITY
- MEMBERSHIP ≠ OWNERSHIP
- AUTHORITY ≠ CONSENT
- CONSENT ≠ BLANKET DATABASE PERMISSION
- PURPOSE A AUTHORIZATION ≠ PURPOSE B AUTHORIZATION
- ASSERTION ≠ EVIDENCE
- ASSERTION VISIBILITY ≠ EVIDENCE VISIBILITY
- VERIFICATION ≠ SAFEGUARDING CLEARANCE
- CHILD VOICE ≠ GUARDIAN AUTHORITY
- CHILD VOICE ≠ FINAL DECISION
- DISCOVERABLE ≠ REPUBLISHABLE
- AUTHENTICATED ≠ AUTHORIZED
- AUTHORIZED ≠ LEGALLY SUFFICIENT
- HISTORICALLY AUTHORIZED ≠ CURRENTLY APPLICABLE
- RLS ≠ LEGAL / POLICY DECISION MAKER
- RETENTION / DELETION ≠ RLS

## 3. Access contexts

1. **Self / Player** — a person accessing information about themselves where the approved workflow permits it.
2. **Scoped Guardian** — Player-specific access arising from an approved Guardian relationship, authority scope, purpose and workflow.
3. **Organization / Opportunity** — access required for an approved opportunity workflow; never organization-wide ownership of Player data.
4. **Public Discovery** — only information explicitly approved for discovery and display.
5. **Protected / Accountability** — restricted access for sensitive records, safeguarding, consent, audit and other authorized accountability functions.

These are contexts, not universal roles.

## 4. MVP decision matrix

| Resource | Self / Player | Scoped Guardian | Organization / Opportunity | Public Discovery | Protected / Accountability |
|---|---|---|---|---|---|
| Player identity | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | ALLOW |
| Assertions | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | ALLOW |
| Evidence | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | ALLOW |
| Verification | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | ALLOW |
| ConsentRecord | DENY by default | CONDITIONAL | CONDITIONAL | DENY | ALLOW |
| Media | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | ALLOW |
| AcademicProfile | DENY by default | CONDITIONAL | CONDITIONAL | DENY | ALLOW |
| MedicalClearance | DENY by default | CONDITIONAL | CONDITIONAL | DENY | ALLOW |
| TransportProfile | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | ALLOW |
| Opportunity | ALLOW where published | CONDITIONAL | CONDITIONAL | CONDITIONAL | ALLOW |
| OpportunityApplication | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | ALLOW |
| Outcome | CONDITIONAL | CONDITIONAL | CONDITIONAL | DENY | ALLOW |
| Child Participation / Voice | CONDITIONAL | CONDITIONAL | HOLD | DENY | ALLOW |
| Safeguarding Case / Response | DENY by default | HOLD | HOLD | DENY | ALLOW |
| AuditEvent | DENY | DENY | DENY | DENY | ALLOW |

The terms applicable, approved, authorized, and purpose-limited remain unresolved policy/legal inputs where indicated. They are not permissions created by this table.

## 5. Resource-specific decisions

### Player identity
Baseline: CONDITIONAL across self, Guardian and Organization contexts; CONDITIONAL for public discovery.

Player identity is not automatically User identity. Guardian access requires applicable Player-specific authority. Organization access requires an approved opportunity/discovery purpose. Public display requires explicit approved disclosure scope.

Hold: exact User↔Player cardinality, delegated access, public-field selection and organization disclosure scope.

### Assertions
Baseline: CONDITIONAL.

Access must remain within applicable subject, purpose and workflow scope. Supporting Evidence does not automatically inherit Assertion visibility.

Hold: exact actor permissions, purpose scopes, correction/dispute effects and field-level disclosure.

### Evidence
Baseline: CONDITIONAL.

Evidence may contain source material, provenance, third-party information or sensitive content. Assertion visibility does not imply Evidence visibility.

Public: DENY by default.

### Verification
Baseline: CONDITIONAL.

Verification may expose only the verification state or approved derived/display information necessary for the purpose. Verification must never be represented as universal truth, universal trust, safeguarding clearance, or legal validation.

Public: CONDITIONAL only where an explicit approved display state exists.

### ConsentRecord
Baseline: DENY by default outside authorized consent/accountability contexts.

Guardian access is CONDITIONAL on applicable authority and purpose. Organization access is CONDITIONAL and purpose-limited. Public: DENY.

ConsentRecord must not become a mechanism for unrestricted database access.

### Media
Baseline: CONDITIONAL.

Media access is purpose-bound. Public discovery is CONDITIONAL only where explicit publication/display permission and applicable policy exist.

### AcademicProfile
Baseline: DENY by default for general self/discovery and public access. Guardian and Organization access is CONDITIONAL on applicable purpose and authority.

### MedicalClearance
Baseline: DENY by default for general self, public and unrestricted organization access.

Where a workflow legitimately requires a minimum clearance state, Organization access is CONDITIONAL and should expose minimum necessary information rather than detailed medical information.

### TransportProfile
Baseline: CONDITIONAL.

Access may support opportunity-feasibility decisions but must not become a public location/contact surface. Public discovery: DENY by default.

### Opportunity
Baseline: ALLOW for approved published opportunity discovery.

Organization control remains scoped to that organization's Opportunity records. Public discovery is CONDITIONAL because an Opportunity must be explicitly publishable. Opportunity visibility does not grant access to participating Players' protected information.

### OpportunityApplication
Baseline: CONDITIONAL.

Access is limited to participants and authorized opportunity-side workflow actors. Public discovery: DENY.

An application does not create unrestricted consent, Player-data ownership, placement, proof of football ability, or safeguarding clearance.

### Outcome
Baseline: CONDITIONAL.

Outcome access follows the applicable application/workflow context. Public discovery: DENY by default. Correction and dispute remain operational-policy holds.

Outcome is not truth, ranking, reputation, or proof ScoutSA caused a placement.

### Child Participation / Voice
Baseline: CONDITIONAL for self/Player and Guardian contexts.

Organization/opportunity access is HOLD until the specific workflow, purpose, authority and legal effect are approved. Public discovery: DENY.

The record preserves a child's expressed view without making it automatically consent, veto, final decision, legal capacity, or a best-interests determination. AI must not adjudicate those matters.

### Safeguarding Case / Response
Baseline: highly restricted.

Public discovery: DENY. Guardian and Organization access remains HOLD unless an applicable safeguarding procedure, responsible authority and disclosure rule have been explicitly established. Protected/accountability access is ALLOW only for an appropriately authorized safeguarding/accountability process.

The record must not be treated as proof of guilt, safeguarding clearance, legal finding, or automatic exclusion.

### AuditEvent
Baseline: DENY for general Player, Guardian, Organization and public access.

Protected/accountability access is ALLOW only for authorized accountability functions. Audit records must not become a secondary disclosure channel.

## 6. Explicit policy/legal holds

### Operational policy holds
- exact User↔Player cardinality and delegated/shared access;
- actor↔Organization affiliation and multiplicity;
- Guardian/authorizer cardinality;
- OpportunityApplication participant and transition authority;
- Application lifecycle vocabulary;
- Outcome multiplicity;
- correction/version/supersession;
- dispute workflow;
- field-level access choices where policy has not been ratified;
- approved public Passport fields;
- approved public Verification display state.

### Legal / jurisdictional holds
- external actor / organization verification and authorization;
- conflicting Guardian authority;
- child participation/voice effects in particular workflows;
- safeguarding escalation authority and disclosure;
- access to protected/minor information;
- retention/deletion;
- lawful republication or further processing;
- any legal conclusion about capacity, best interests or consent validity.

## 7. RLS implementation boundary

Only after the relevant policy cells are ratified may technical predicates be designed.

Potentially safe predicate classes include:
- authenticated subject identity;
- explicitly approved Player↔User relationship;
- explicitly approved GuardianLink scope;
- explicitly approved Organization↔Opportunity relationship;
- approved purpose/scope;
- current applicability;
- protected-record restriction;
- accountability/audit isolation.

RLS must not contain invented logic for legal Guardian precedence, child legal capacity, best-interests determination, safeguarding guilt, lawful processing/republication, unresolved dispute resolution, or universal role authority.

## 8. Required next evidence before RLS implementation

1. Explicit MVP access-purpose definitions.
2. Actor/context authorization map.
3. Legal/jurisdictional review for protected/minor data.
4. Public Passport field disclosure decision.
5. Guardian/consent applicability decisions.
6. Child Voice workflow effect decisions.
7. Safeguarding escalation/disclosure procedure.
8. Correction/dispute effects.
9. Retention/deletion interaction.
10. Field-level access mapping.
11. Non-production deny-by-default tests.
12. Cross-purpose leakage tests.
13. Explicit RLS implementation authorization.

## 9. Adversarial invariants

The matrix fails review if implementation would require:
- AUTHENTICATED → AUTOMATICALLY AUTHORIZED
- ROLE → UNIVERSAL AUTHORITY
- MEMBERSHIP → OWNERSHIP
- GUARDIANLINK → BLANKET CONSENT
- CONSENT → UNIVERSAL DATABASE PERMISSION
- ASSERTION → EVIDENCE ACCESS
- VERIFICATION → SAFEGUARDING CLEARANCE
- CHILD VOICE → AUTOMATIC VETO
- SAFEGUARDING CASE → GUILT
- PUBLIC DISCOVERY → REPUBLICATION
- HISTORICAL AUTHORIZATION → CURRENT ACCESS
- RLS → LEGAL DECISION

Any such mapping is a governance failure, not merely a SQL bug.

## 10. 33×3 review target

- **Existence:** every access decision traces to an established domain concept or explicit policy hold.
- **Coherence:** no access rule collapses ratified semantic distinctions.
- **Failure containment:** unresolved policy/legal questions result in CONDITIONAL/HOLD rather than invented permission.

### Current decision

**MVP ACCESS-POLICY MATRIX: SEMANTICALLY COMPLETE / POLICY-LEGAL RATIFICATION REQUIRED**

**RLS implementation: NOT AUTHORIZED.**

**Migration: HOLD.**

**Production database: HOLD.**
