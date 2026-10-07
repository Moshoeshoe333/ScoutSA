# ScoutSA MVP Actor × Purpose × Resource Authorization Framework — 2026-10-07

**AuthorityLevel:** NONE  
**Status:** PROPOSED ARCHITECTURAL RESEARCH ARTIFACT — POLICY / LEGAL RATIFICATION REQUIRED  
**RLS:** NOT AUTHORIZED  
**Migration:** HOLD  
**Production:** HOLD

## 1. Purpose

This framework provides the architectural bridge between the ScoutSA MVP Access-Policy Decision Matrix and any future technical authorization mechanism such as Row-Level Security (RLS).

It does **not** create permissions, establish legal authority, certify POPIA compliance, resolve safeguarding procedure, or authorize RLS.

Its purpose is to ensure that a future technical permission can be traced through:

**ACTOR → PURPOSE → RESOURCE → ACCESS CLASSIFICATION → ACTIVE PRECONDITIONS / PROVENANCE**

The governing rule remains:

> **Authorization is contextual and purpose-bound; role labels alone do not create authority.**

## 2. Relationship to the access-policy matrix

The working access-policy matrix uses five access contexts:

1. Self / Player
2. Scoped Guardian
3. Organization / Opportunity
4. Public Discovery
5. Protected / Accountability

These are **contexts, not universal roles**.

The Actor × Purpose × Resource framework refines those contexts into human and operational actors without collapsing:

- USER ≠ PLAYER
- ROLE ≠ UNIVERSAL AUTHORITY
- MEMBERSHIP ≠ OWNERSHIP
- AUTHORITY ≠ CONSENT
- CONSENT ≠ BLANKET DATABASE PERMISSION
- PURPOSE A AUTHORIZATION ≠ PURPOSE B AUTHORIZATION
- ASSERTION ≠ EVIDENCE
- VERIFICATION ≠ SAFEGUARDING CLEARANCE
- AUTHENTICATED ≠ AUTHORIZED
- AUTHORIZED ≠ LEGALLY SUFFICIENT
- HISTORICAL AUTHORIZATION ≠ CURRENT APPLICABILITY
- RLS ≠ POLICY / LEGAL DECISION MAKER

## 3. MVP actor vocabulary

### 3.1 Player

**Human meaning:** the person who is the subject of the Player record.

**Potential purposes:**
- Self-Passport Review
- Review of own application history
- Participation in approved player workflows
- Expression of child voice where applicable

**Boundary:**
- Player access is limited to the approved self-scope.
- A User account must not automatically be treated as a Player record without an approved relationship.
- A minor must not be treated as able to grant legally effective consent merely because the person is the Player.
- Child voice must remain distinct from guardian authority and legal consent.

### 3.2 Guardian / Competent Person

**Human meaning:** a person with an applicable, evidenced relationship and authority concerning the specific Player.

**Potential purposes:**
- Minor consent management
- Guardian review
- Safeguarding/access participation where an approved procedure permits it

**Required relationship:**
- Current, Player-specific GuardianLink or equivalent approved relationship.
- Provenance for the relationship.
- Applicable authority scope.
- Current applicability.
- Any required conflict/precedence handling must be explicitly established before technical enforcement.

**Boundary:**
- Guardian authority is not universal access to Player data.
- Guardian authority does not authorize alteration of football evaluation merely by virtue of the relationship.
- GuardianLink does not become blanket database permission.
- Conflicting or uncertain authority remains a policy/legal hold.

### 3.3 LFA / Grassroots Official

**Human meaning:** an operational actor associated with a specific football organization or regional function.

**Potential purposes:**
- Player verification workflow
- Review of verification assertions
- Regional opportunity administration
- Other explicitly authorized football-administration functions

**Required relationship:**
- Verified organizational affiliation.
- Defined organizational function.
- Active applicability.
- Specific jurisdiction/scope.
- Purpose-specific authorization.

**Boundary:**
- LFA/official status does not create universal access to Player records.
- Regional authority does not automatically extend outside the relevant organization/jurisdiction.
- Access to Evidence does not automatically follow from permission to review an Assertion.
- The system must not infer legal authority from a role title alone.

### 3.4 Club Scout / Opportunity Holder

**Human meaning:** an actor participating in an approved opportunity-side workflow.

**Potential purposes:**
- Authorized discovery
- Review of an application submitted to the actor's opportunity
- Opportunity evaluation
- Authorized connection / trial workflow

**Required relationship:**
- Current relationship to the relevant Opportunity.
- Approved purpose.
- Applicable safeguarding and consent state.
- Eligibility state required by the workflow.
- Minimum-necessary disclosure.

**Boundary:**
- Scout status does not create general Player-data access.
- Opportunity participation does not create ownership of Player data.
- Application access does not authorize scraping or unrelated discovery.
- Raw minor contact information and safeguarding records remain protected unless a separately authorized workflow explicitly establishes otherwise.
- An application is not itself proof of consent, eligibility, safeguarding clearance, football ability, placement, or outcome.

### 3.5 Safeguarding Officer / Auditor

**Human meaning:** a restricted accountability actor operating within an explicitly established safeguarding, audit, compliance, or dispute-resolution function.

**Potential purposes:**
- Safeguarding intervention
- Authorized case review
- Accountability/audit inspection
- Dispute resolution where an approved procedure exists

**Required relationship:**
- Explicit assignment or approved accountability function.
- Defined purpose.
- Appropriate scope.
- Applicable safeguarding/disclosure procedure.
- Audit trail for sensitive access.

**Boundary:**
- Safeguarding Officer/Auditor status does not create unrestricted access.
- A SafeguardingCase is not proof of guilt, legal finding, safeguarding clearance, or automatic exclusion.
- AuditEvent must not become a secondary disclosure channel.
- Where procedure, responsible authority, or disclosure rule is unresolved, access remains HOLD/CONDITIONAL rather than invented.

## 4. Actor × Purpose × Resource decision map

| Actor | Purpose | Resource | Baseline classification | Required active conditions |
|---|---|---|---|---|
| Player | Self-Passport Review | PlayerPassport / approved player fields | CONDITIONAL | Authenticated subject relationship; approved self-scope; current applicability |
| Player | Application History | OpportunityApplication | CONDITIONAL | Player↔application relationship; approved workflow scope |
| Guardian / Competent Person | Grant/Revoke Consent | ConsentRecord | CONDITIONAL | Current GuardianLink; applicable authority; minor/consent applicability; provenance |
| Guardian / Competent Person | Guardian Review | Player/approved related resources | CONDITIONAL | Current GuardianLink; purpose-specific scope; minimum necessary disclosure |
| LFA / Grassroots Official | Verify Player Assertion | Assertion | CONDITIONAL / SCOPED | Active organizational affiliation; jurisdiction; purpose; current applicability |
| LFA / Grassroots Official | Inspect supporting material | Evidence | CONDITIONAL / SCOPED | Explicit Evidence purpose and scope; provenance; minimum necessary access |
| LFA / Grassroots Official | Manage regional opportunity | Opportunity | CONDITIONAL / SCOPED | Current organization/opportunity relationship; operational scope |
| Club Scout / Opportunity Holder | Authorized Discovery | approved discovery surface | CONDITIONAL | Published/approved fields; opportunity purpose; current authorization |
| Club Scout / Opportunity Holder | Review Applicant | OpportunityApplication | CONDITIONAL | Relevant opportunity relationship; submitted application; applicable consent/eligibility gates; current state |
| Club Scout / Opportunity Holder | Evaluate Player | approved application/player fields | CONDITIONAL | Active workflow; minimum necessary disclosure; applicable safeguarding/consent conditions |
| Club Scout / Opportunity Holder | View SafeguardingCase | SafeguardingCase | DENY by default / HOLD unless separately authorized | Explicit safeguarding procedure, responsible authority, assignment and disclosure basis |
| Safeguarding Officer | Safety Intervention | SafeguardingCase / Response | CONDITIONAL / RESTRICTED | Explicit assignment; approved procedure; purpose; audit trail |
| Safeguarding Officer / Auditor | Accountability Inspection | AuditEvent | CONDITIONAL / RESTRICTED | Authorized accountability function; bounded scope; audit trail |
| Any Actor | Unrestricted scraping | All resources | DENY | No general-purpose access path is authorized |
| Public / Discovery Actor | General protected-data access | ConsentRecord, Evidence, Medical, Safeguarding, AuditEvent | DENY | No public disclosure path |

**Important:** a classification of CONDITIONAL is not an implementation permission. It identifies a policy condition that must be satisfied and ratified before technical enforcement.

## 5. Active-state validation rule

Every future authorization decision must evaluate the relevant state at the time of access.

Static role membership is insufficient.

At minimum, applicable decisions should consider:

1. Actor identity
2. Actor ↔ subject relationship
3. Actor ↔ organization relationship
4. Actor ↔ opportunity relationship
5. Purpose
6. Resource
7. Jurisdiction / scope
8. Current applicability
9. Consent / authorization state where applicable
10. Eligibility state where applicable
11. Safeguarding state where applicable
12. Provenance
13. Minimum-necessary disclosure
14. Auditability

A historical authorization must not silently become current authorization.

## 6. Reconciliation against the 2026-10-06 access-policy matrix

The framework confirms the matrix's central distinction between contextual access and universal role authority.

### Confirmed architectural alignment

- Self/Player maps to the Player subject context.
- Scoped Guardian maps to Guardian/Competent Person access.
- Organization/Opportunity maps to LFA and opportunity-side actors.
- Public Discovery remains limited to explicitly approved discovery surfaces.
- Protected/Accountability maps to restricted safeguarding and audit functions.
- CONDITIONAL remains a state requiring further policy definition, not an automatic ALLOW.
- HOLD remains unresolved and must not be converted into technical permission.

### Holds exposed rather than silently resolved

The framework identifies the following areas as still requiring policy/legal decisions:

- exact User ↔ Player relationship and delegated/shared access;
- Guardian/authorizer cardinality and conflicting authority;
- actor ↔ Organization affiliation and multiplicity;
- exact LFA jurisdiction and operational authority;
- OpportunityApplication lifecycle and participant transition authority;
- field-level disclosure for discovery and application workflows;
- child voice and its effect within particular workflows;
- safeguarding assignment, escalation and disclosure procedure;
- correction/version/supersession;
- dispute workflow;
- retention/deletion;
- lawful republication/further processing;
- external verification of organizational/actor authority.

Therefore the framework **does not close these holds**. It makes their required inputs explicit.

## 7. Resource-specific protection rules

### ConsentRecord

No actor receives blanket database permission through consent authority.

Consent management must remain distinct from ordinary Player-data access.

### Evidence

Evidence visibility must not be inferred from Assertion visibility.

Evidence may contain provenance, third-party information or sensitive material requiring narrower access.

### Verification

Verification state must not be represented as universal truth, legal validation, safeguarding clearance or universal trust.

### OpportunityApplication

Application access is workflow-scoped.

Application state must not be interpreted as unrestricted consent, ownership, placement or safeguarding clearance.

### SafeguardingCase / Response

Highly restricted.

Guardian and Organization access remains HOLD unless the applicable safeguarding procedure, responsible authority and disclosure rule have been explicitly established.

### AuditEvent

Restricted to approved accountability functions.

Audit data must not become a secondary channel through which otherwise protected Player information is exposed.

## 8. Adversarial failure tests

The framework fails if an implementation requires any of the following mappings:

- AUTHENTICATED → AUTOMATICALLY AUTHORIZED
- ROLE → UNIVERSAL AUTHORITY
- MEMBERSHIP → OWNERSHIP
- GUARDIANLINK → BLANKET CONSENT
- CONSENT → UNIVERSAL DATABASE PERMISSION
- ASSERTION → AUTOMATIC EVIDENCE ACCESS
- VERIFICATION → SAFEGUARDING CLEARANCE
- APPLICATION → AUTOMATIC CONSENT
- SCOUT → GENERAL PLAYER ACCESS
- LFA OFFICIAL → UNIVERSAL REGIONAL DATA ACCESS
- CHILD VOICE → AUTOMATIC LEGAL CONSENT OR VETO
- SAFEGUARDING CASE → GUILT
- PUBLIC DISCOVERY → REPUBLICATION
- HISTORICAL AUTHORIZATION → CURRENT ACCESS
- RLS → LEGAL / POLICY DECISION MAKING

Any such mapping is a governance failure, not merely a SQL implementation bug.

## 9. Traceability requirement for future technical rules

No future RLS predicate or authorization function should be accepted unless it can answer:

1. Which Actor?
2. Which Purpose?
3. Which Resource?
4. Which policy-matrix cell?
5. Which active precondition?
6. Which provenance source?
7. Which scope/jurisdiction?
8. Which current-state field(s)?
9. Which disclosure boundary?
10. What happens when the precondition becomes false?
11. What audit evidence is produced?
12. What policy/legal ratification authorizes the rule?

If these questions cannot be answered, the technical rule remains **UNAUTHORIZED**.

## 10. 33×3 review target

### Existence
Every proposed authorization decision must correspond to an established actor, purpose, resource, relationship, or explicitly recorded policy/legal hold.

### Coherence
No proposed rule may collapse the ratified distinctions between identity, authority, consent, evidence, verification, safeguarding, child voice, disclosure and current applicability.

### Failure containment
When required evidence or policy is absent, the system must fail into DENY, HOLD, or another explicitly ratified safe state rather than inventing authority.

## 11. Current decision

**Actor × Purpose × Resource Framework: PROPOSED / ARCHITECTURALLY COHERENT**

**Policy/legal holds: REMAIN OPEN**

**RLS implementation: NOT AUTHORIZED**

**Migration: HOLD**

**Production database: HOLD**

**Next controlled action:** reconcile this framework against the complete policy matrix and identify which individual CONDITIONAL/HOLD cells have sufficient evidence for formal policy/legal ratification.

---

**Provenance anchor:** Derived from the ScoutSA MVP Access-Policy Decision Matrix, commit be583b62479c9292b6d11d45565dcb2752388291, and the architectural framework defined for this workstream.

**Authority boundary:** This document is not legal advice, legal certification, POPIA compliance certification, safeguarding clearance, or technical authorization.
