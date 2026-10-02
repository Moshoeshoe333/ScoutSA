# South African Domain Governance and Data Quality Research

**Document:** `docs/research/south-african-domain-governance-and-data-quality.md`  
**Status:** Research Witness Artifact — Gate 1 input; **not constitutional ratification**  
**Repository:** ScoutSA  
**Method:** Point → Source → Observed proposition → ScoutSA implication → Candidate change → Unresolved question → Witness required → Ratification status

---

## 0. Purpose

This document records external South African governance, football-system, child-rights, privacy, safeguarding, electronic-record, and information-quality research that may affect ScoutSA's domain methodology.

It is deliberately **not** an amendment to the Constitution or Domain Model.

Its purpose is to answer:

> What does the external evidence require ScoutSA to reconsider about how it knows, verifies, derives, uses, and discloses information?

The governing methodological rule remains:

> **Strength of claim must never exceed strength of evidence.**

Research findings are not automatically domain truth. Each proposed architectural consequence must survive a Gate 1 witness.

---

# 1. Epistemic Starting Point

The existing ScoutSA model already distinguishes:

- Player;
- Evidence;
- Verification;
- Consent;
- Membership;
- derived readiness;
- audit.

The research exposes a potentially missing epistemic layer:

```text
SUBJECT
   ↓
ASSERTION
   ↓
AUTHORITY / SCOPE
   ↓
EVIDENCE
   ↓
INFORMATION QUALITY
   ↓
VERIFICATION
   ↓
DERIVED STATE
   ↓
DECISION
   ↓
DISCLOSURE
   ↓
AUDIT
```

This is a **candidate model**, not a ratified architecture.

A critical alternative remains under witness:

- **Claim** as the first-class epistemic object; or
- **Assertion** as the first-class epistemic object.

The current witness position favours **Assertion** conceptually because an assertion may exist without being established as true, while still being attributable to an actor, authority scope, time, and provenance.

### Candidate Truth Separation Invariant

> **Assertion is not Evidence. Evidence is not Verification. Verification is not Truth. Derived State is not Source Data.**

Each layer must preserve provenance to the layers supporting it.

### Candidate Disagreement Preservation Invariant

> **The system must preserve material disagreement between legitimate assertions rather than silently collapsing disagreement into fabricated certainty.**

---

# 2. South African Constitutional Context

## Point

South African constitutional rights create a domain boundary around privacy, dignity, child welfare, and information access.

## Source

- [Constitution of the Republic of South Africa, 1996 — Chapter 2](https://www.justice.gov.za/legislation/constitution/chp02.html)
- [Full Constitution text — Department of Justice](https://www.justice.gov.za/constitution/textindex.html)

Section 14 recognises a right to privacy. Section 28 provides children's rights and states that a child's best interests are of paramount importance in every matter concerning the child.

## Observed proposition

Privacy and child welfare are not optional product features. They form part of the external normative environment within which ScoutSA's handling of player information must operate.

## ScoutSA implication

The existing constitutional Safety and Privacy Rule is directionally aligned, but the research suggests a more explicit separation between:

- possession;
- processing;
- authority to use;
- authorization to disclose;
- purpose;
- repurposing.

## Candidate constitutional change

> **Presence of information ≠ authority to use it.**  
> **Authority to use it ≠ authority to disclose it.**  
> **Authority to disclose it ≠ authority to repurpose it.**

## Unresolved question

Which ScoutSA actions constitute processing, disclosure, or repurposing under the applicable legal framework, and which legal bases apply to each?

## Witness required

Adversarial media, public-profile, guardian, and third-party access cases.

## Ratification status

**RESEARCH SUPPORTED / NOT RATIFIED**

---

# 3. POPIA — Child Information and Purpose

## Point

POPIA treats children's personal information as subject to a specific prohibition and exceptions.

## Source

- [Protection of Personal Information Act 4 of 2013 — Department of Justice](https://www.justice.gov.za/legislation/acts/2013-004.pdf)

Sections 34–35 address processing of children's personal information. Section 35 includes multiple possible authorisations, including prior consent of a competent person, legal rights/obligations, certain international-law situations, specified historical/statistical/research purposes, and information deliberately made public by the child with competent-person consent. Section 35(2) also provides for possible Regulator authorisation in the public interest subject to safeguards.

## Observed proposition

It is incorrect to reduce POPIA to:

> "All child data requires guardian consent."

The statutory structure is more nuanced.

## ScoutSA implication

ScoutSA must distinguish:

- lawful basis;
- consent;
- GuardianLink;
- authority;
- authorization;
- visibility;
- disclosure;
- purpose limitation.

These concepts must not collapse into one boolean such as `guardian_verified` or `consent=true`.

## Candidate constitutional change

> **Legal basis is not identical to consent. Consent is not identical to authority. Authority is not identical to visibility.**

## Unresolved question

For each intended ScoutSA processing activity, what is the applicable lawful basis and whether any Regulator authorisation or additional condition is implicated.

## Witness required

Construct a processing-purpose matrix for:

- registration;
- discovery;
- scout contact;
- media;
- trial application;
- medical-clearance sharing;
- academic information;
- transport information;
- analytics;
- retention;
- deletion;
- disclosure to organizations.

## Ratification status

**RESEARCH SUPPORTED / LEGAL REVIEW REQUIRED / NOT RATIFIED**

---

# 4. Children's Act and Evolving Child Agency

## Point

The Children's Act gives effect to children's constitutional rights and regulates parental responsibilities and rights, care, protection, and related matters.

## Source

- [Children's Act 38 of 2005 — South African Government](https://www.gov.za/documents/childrens-act)

## Observed proposition

A domain model involving minors cannot assume that every relevant decision is reducible to a generic guardian approval state. Different contexts can assign different legal capacities and responsibilities.

## ScoutSA implication

GuardianLink should remain a **scoped authority relationship**, not merely a contact record.

Child participation/assent may need explicit treatment where the applicable legal or safeguarding context requires the child's views or participation.

## Candidate constitutional change

> **Guardian authority must be scoped to the action and context for which it exists.**

## Unresolved question

Exactly which ScoutSA actions require guardian authority, child participation, both, or another lawful basis.

## Witness required

- guardian authorises trial but not media;
- child view conflicts with guardian instruction in a context where child participation matters;
- two linked guardians have incompatible scopes.

## Ratification status

**RESEARCH SUPPORTED / LEGAL REVIEW REQUIRED / NOT RATIFIED**

---

# 5. Information Quality — SASQAF

## Point

Stats SA's South African Statistical Quality Assessment Framework (SASQAF) treats quality as multidimensional and explicitly connects quality with fitness for use.

## Source

- [South African Statistical Quality Assessment Framework — Stats SA](https://www.statssa.gov.za/standardisation/Statistics_SA_Statistical_Quality_Assessment_Framework.pdf)
- [SASQAF Edition 2 — Stats SA](https://www.statssa.gov.za/standardisation/SASQAF_Edition_2.pdf)
- [Stats SA policies and SASQAF](https://isibaloweb.statssa.gov.za/pages/policies.php)

The framework identifies dimensions including:

- relevance;
- accuracy;
- timeliness;
- accessibility;
- interpretability;
- coherence/comparability;
- methodological soundness;
- integrity.

Stats SA also states that quality assessment is relevant to whether information is fit for its intended use.

## Observed proposition

Information can have different quality characteristics without those characteristics being equivalent to truth.

A source can be highly relevant for discovery while being insufficient for a formal assessment.

## ScoutSA implication

ScoutSA should investigate an **Information Quality** layer rather than treating verification as a universal truth score.

Example:

```text
Position = STRIKER

Source: player self-report
Relevance: high
Timeliness: high
Verification: none
Quality for discovery: potentially usable
Quality for formal assessment: insufficient
```

versus:

```text
Height = 181cm

Source: documented measurement
Method: recorded measurement
Timestamp: known
Verification: qualified source
Quality for measurement-dependent use: potentially high
```

The same underlying information may be fit for one purpose and insufficient for another.

## Candidate constitutional principle

> **Information quality must be evaluated relative to intended use.**

## Critical invariant

> **Information quality is not a truth score.**

## Unresolved question

Whether ScoutSA needs a formal quality vector, a simpler evidence-quality classification, or purpose-specific quality rules.

## Witness required

Test the same evidence artifact against:

- discovery;
- scouting;
- trial eligibility;
- medical participation;
- academic eligibility;
- public disclosure.

## Ratification status

**STRONGLY SUPPORTED AS METHODOLOGICAL RESEARCH / NOT YET RATIFIED**

---

# 6. Stats SA as Evidence Discipline

## Point

Stats SA's public materials emphasise source, method, transparency, quality assessment, and prevention of misuse.

## Source

- [Stats SA Fundamental Principles of Statistics](https://www.statssa.gov.za/?page_id=361)
- [Stats SA Census 2022 data-quality statement](https://www.statssa.gov.za/?p=17379)
- [Census 2022 data-quality exclusions](https://www.statssa.gov.za/?p=17568)

## Observed proposition

Data can be withheld, qualified, or excluded when quality limitations make it unsuitable for a particular use. This is materially different from simply labelling data "verified".

## ScoutSA implication

The domain should be able to represent:

- known source;
- method;
- time;
- limitations;
- intended use;
- quality characteristics;
- uncertainty;
- exclusion from a particular decision.

## Candidate principle

> **Evidence may be authentic and still be unsuitable for a particular decision.**

## Witness required

Use stale, incomplete, low-methodology, and high-integrity evidence against the same derived state.

## Ratification status

**RESEARCH SUPPORTED / NOT RATIFIED**

---

# 7. SAFA and Institutional Football Provenance

## Point

SAFA's historical official materials show formal player registration, competition structures, stakeholder registration, and verification-oriented football data systems.

## Sources

- [SAFA Competitions Uniform Rules](https://www.safa.net/wp-content/uploads/2017/03/SAFA-COMPETITIONS-UNIFORM-RULESapproved25June2016.pdf)
- [SAFA 2014–2015 NEC Activity Report](https://www.safa.net/wp-content/uploads/2017/04/ANNUALREPORT2014-2015.pdf)
- [SAFA 2015–2016 NEC Activity Report](https://www.safa.net/wp-content/uploads/2017/04/ANNUALREPORT2015-2016.pdf)

The materials describe official player registers, registration requirements, football stakeholder registration, and verification workflows in historical SAFA digital-registration initiatives.

## Observed proposition

Institutional football records can provide stronger provenance than unsupported self-report for certain football facts.

But institutional provenance is **claim-specific**.

A football organisation's authority to assert registration does not automatically make it authoritative for:

- medical facts;
- private family relationships;
- academic records;
- every aspect of player identity;
- every football-performance claim.

## ScoutSA implication

SAFA/LFA membership or registration should be treated as a potential high-strength evidence/authority source for **defined football-registration claims**, not as universal truth.

## Candidate constitutional principle

> **Authority is scoped to the fact, action, purpose, and time for which it is granted or evidenced.**

## Unresolved question

Whether ScoutSA should integrate external registration identifiers or statuses in v1, and under what lawful/technical conditions.

## Witness required

Create an external-record conflict case:

```text
ScoutSA assertion ≠ external football registration record
```

The system must preserve the discrepancy rather than silently overwrite either side.

## Ratification status

**RESEARCH SUPPORTED / INTEGRATION NOT YET APPROVED**

---

# 8. Football Competition and Academy Research

## Point

Publicly documented academy and recruitment practices show that discovery is not equivalent to open access and that recruitment pathways vary by institution.

## Observed proposition

A national opportunity network should not assume that "trial" means one universal process.

Different organisations may use:

- open trials;
- invitations;
- scouting;
- academy intake;
- assessment appointments;
- LFA/club pathways.

## ScoutSA implication

Opportunity should remain a structured domain object rather than a hard-coded "trial" workflow.

The opportunity record must carry its own:

- eligibility;
- recruitment method;
- requirements;
- dates;
- location;
- authority;
- status;
- application rules.

## Candidate principle

> **Opportunity semantics belong to the opportunity, not to the Player.**

## Witness required

Model two opportunities with identical football requirements but different:

- recruitment mechanisms;
- guardian requirements;
- transport requirements;
- evidence thresholds.

## Ratification status

**RESEARCH INPUT / NOT RATIFIED**

---

# 9. Media Governance

## Point

A photograph, video, or player profile can exist in the system without creating unrestricted authority to disclose or repurpose it.

## Observed proposition

Ownership/possession, lawful processing, permission, disclosure, and repurposing are distinct questions.

## ScoutSA implication

Media should carry at minimum conceptual provenance for:

- source/uploader;
- rights basis;
- subject;
- capture/submission time;
- purpose;
- visibility;
- authorization;
- retention;
- revocation/restriction state.

## Candidate principle

> **Media requires purpose.**

## Witness required

Case:

1. Guardian authorises trial participation.
2. Guardian does not authorise public social media.
3. Organisation requests media for a different purpose.
4. Player/guardian later revokes the relevant permission.

The system must not infer the latter permissions from the former.

## Ratification status

**RESEARCH SUPPORTED / NOT RATIFIED**

---

# 10. Electronic Record Integrity

## Point

Electronic records are more useful as evidence when their provenance, integrity, context, and history are preserved.

## Candidate ScoutSA principle

> **A material record must preserve who created it, what was asserted, when, under what authority, with what supporting evidence, under which version/rules, and what material changes occurred.**

## ScoutSA implication

This aligns with the existing AuditEvent and historical-record principles but exposes a further need:

**AuditEvent tells us what the system observed. It does not by itself establish that the human assertion was true.**

Therefore:

```text
Human assertion
≠
system audit of the assertion
```

## Witness required

Replay a corrected or disputed assertion while preserving:

- original assertion;
- correction;
- actor;
- reason;
- time;
- supporting evidence;
- resulting derived state.

## Ratification status

**METHODOLOGICAL CANDIDATE / NOT RATIFIED**

---

# 11. Safeguarding as a Domain Boundary

## Point

Minor football discovery creates risks that cannot be represented solely through Player + Verification + Opportunity.

## Research direction

Potential safeguarding concerns include:

- abuse;
- exploitation;
- fake scout representation;
- suspicious intermediary behaviour;
- transport risk;
- harassment;
- bullying;
- boundary violations.

## Candidate domain object

`SafeguardingConcern`

Potential states:

`REPORTED → UNDER_REVIEW → ESCALATED / CLOSED`

These are **candidate states only**.

## Candidate constitutional principle

> **Safeguarding precedes discovery.**

Additional candidate rules:

1. Child best interests are paramount.
2. Visibility is not permission.
3. Media requires authorization.
4. Opportunity cannot bypass safeguarding.
5. Safeguarding actions must be auditable.
6. Representation by scouts/intermediaries must have verifiable provenance appropriate to the role.

## Unresolved question

Whether `SafeguardingConcern` belongs in the core domain model, a restricted governance subsystem, or both.

## Witness required

Case:

> An apparently verified organisation user attempts direct contact with a minor while a safeguarding concern is open.

The system must distinguish:

- identity;
- role;
- verification;
- authorization;
- safeguarding status;
- contact permission.

## Ratification status

**RESEARCH SUPPORTED / DOMAIN PLACEMENT NOT YET RATIFIED**

---

# 12. Candidate Information Lifecycle

Research suggests that ScoutSA should reason about information across its lifecycle:

```text
COLLECT
  ↓
USE
  ↓
DISCLOSE
  ↓
RETAIN
  ↓
CORRECT
  ↓
RESTRICT
  ↓
REVOKE / OBJECT
  ↓
DELETE / DISPOSE
  ↓
AUDIT
```

This is not a claim that every record follows the same lifecycle.

Different classes of information will require different rules.

## Candidate principle

> **Information governance is temporal.**

A record can be:

- valid;
- stale;
- expired;
- restricted;
- revoked;
- superseded;
- corrected;
- retained historically but unavailable for current use.

## Ratification status

**RESEARCH SUPPORTED / RULES NOT YET DEFINED**

---

# 13. Proposed Epistemic Model

The strongest current candidate is:

```text
SUBJECT
   │
   ▼
ASSERTION
   │
   ├── Actor
   ├── Authority Scope
   ├── Time
   ├── Purpose
   └── Provenance
   │
   ▼
EVIDENCE
   │
   ├── Source
   ├── Method
   ├── Time
   ├── Integrity
   └── Fitness-for-purpose characteristics
   │
   ▼
INFORMATION QUALITY
   │
   ▼
VERIFICATION
   │
   ├── Verifier
   ├── Scope
   ├── Method
   ├── Time
   └── Status
   │
   ▼
DERIVED STATE
   │
   ├── Inputs
   ├── Rules
   ├── Rule/version identity
   ├── Evaluation time
   └── Explanation
   │
   ▼
DECISION
   │
   ▼
CONTROLLED DISCLOSURE
   │
   ▼
AUDIT
```

Cross-cutting constraints:

- legal basis;
- consent where applicable;
- purpose;
- visibility;
- authorization;
- safeguarding;
- temporal validity.

---

# 14. The Central Witness Hypothesis

The research now creates a stronger Gate 1 hypothesis:

> **Every material ScoutSA decision should be reconstructable without silently converting an assertion into truth.**

A successful reconstruction should be able to answer:

1. What subject was involved?
2. What was asserted?
3. Who asserted it?
4. What authority did that actor have for that assertion?
5. What evidence supported it?
6. What was the evidence quality for the intended use?
7. Who verified what?
8. When was it valid?
9. What rules produced the derived state?
10. What purpose justified the use?
11. Who was authorized to see or act on it?
12. What changed later?
13. Can disagreement be reconstructed?
14. Can the original history be recovered?

Failure to answer any material question is a Gate 1 domain finding.

---

# 15. Adversarial Witness Set

The existing five cases remain mandatory:

### Case 1 — Player vs Coach

Player asserts:

`Position = STRIKER`

Coach asserts:

`Position = MIDFIELDER`

Required outcome:

- both assertions remain attributable;
- authority is scoped;
- evidence is independently represented;
- disagreement is preserved;
- any derived position is explicitly derived and explainable.

### Case 2 — Guardian vs Guardian

Two legitimate GuardianLinks carry incompatible authority or instructions.

Required outcome:

- scope is visible;
- conflict is preserved;
- no arbitrary "last write wins" truth rule.

### Case 3 — Consent Revocation

A previously authorised disclosure becomes revoked.

Required outcome:

- current permission changes;
- historical consent evidence remains;
- previously valid decisions remain historically reconstructable;
- future disclosure follows current authorization.

### Case 4 — Evidence Expiry

Evidence supported a prior verification but later expires.

Required outcome:

- historical verification remains historically attributable;
- expired evidence does not silently support current validity;
- current derived state is recalculated or marked stale where material.

### Case 5 — Opportunity Mutation

An opportunity changes after readiness evaluation.

Required outcome:

- previous readiness remains reconstructable;
- current readiness reflects current requirements;
- the system does not treat an old decision as permanently true.

### Additional research-driven cases

6. Unverified scout attempts contact with a minor.
7. Guardian authorises a trial but not media disclosure.
8. Child participation conflicts with guardian instruction where legally relevant.
9. Safeguarding concern is raised against a verified organisation user.
10. External football registration conflicts with ScoutSA assertion.
11. Publicly available information is proposed for republication.
12. Authentic but stale evidence is used for a new decision.
13. Two legitimate authorities issue incompatible assertions.
14. A material readiness input is withdrawn after readiness evaluation.

---

# 16. Candidate Constitutional Additions — Not Yet Ratified

The following remain proposals:

1. **Information Quality**
2. **Purpose Limitation**
3. **Scoped Authority**
4. **Temporal Integrity**
5. **Ranking Integrity**
6. **Data Minimisation**
7. **Derived-State Transparency**
8. **Safeguarding Charter**
9. **Verified Representation**
10. **Feasibility Is First-Class Data**
11. **Media Requires Purpose**
12. **Presence ≠ Authority to Use ≠ Authority to Disclose ≠ Authority to Repurpose**
13. **Information Quality ≠ Truth**
14. **Disagreement must not be silently collapsed**
15. **Derived decisions must preserve provenance**

No item in this section changes the Constitution merely by appearing here.

---

# 17. Candidate Domain Additions — Not Yet Ratified

Potential concepts requiring witness:

- Assertion;
- InformationQuality / evidence-quality metadata;
- AuthorityScope;
- SafeguardingConcern;
- Purpose;
- DisclosureAuthorization;
- Decision provenance;
- Rule/evaluation version;
- dispute/correction lifecycle.

Potential external identifiers such as SAFA/MySAFA registration identifiers are **not automatically approved** as ScoutSA fields.

Potential medical, transfer, registration, or competition fields must first pass the same domain-necessity and purpose tests.

---

# 18. Research Ledger

| ID | Finding | Status |
|---|---|---|
| SCOUTSA-012 | South African governance research materially expands the domain-governance evidence base | **VERIFIED AS RESEARCH INPUT** |
| SCOUTSA-013 | Information Quality is a multidimensional concept distinct from truth | **VERIFIED AS RESEARCH FINDING** |
| SCOUTSA-014 | Assertion/Claim may be a missing first-class epistemic object | **UNDER REVIEW** |
| SCOUTSA-015 | Constitutional additions are warranted candidates | **NOT RATIFIED** |
| SCOUTSA-016 | Gate 1 Domain Integrity remains open | **OPEN / UNDER WITNESS** |
| SCOUTSA-017 | A domain epistemology is emerging from the combined model + research | **WITNESSED DISCOVERY / NOT CONSTITUTIONAL** |

---

# 19. Gate 1 Decision Rule

This document does **not** close Gate 1.

The research survives only to the extent that the proposed concepts can resolve the adversarial cases without inventing hidden semantics.

The required sequence is:

```text
RESEARCH
   ↓
WITNESS
   ↓
RECONCILIATION
   ↓
CANDIDATE AMENDMENT
   ↓
CONSTITUTIONAL WITNESS
   ↓
RATIFICATION
   ↓
GATE 1 DECISION
   ↓
GATE 2 ERD
```

No ERD should be derived while material domain concepts remain unresolved.

No implementation should be used to conceal unresolved domain semantics.

---

# 20. Important Legal Boundary

This document is engineering/domain research, not legal advice.

References to the Constitution, POPIA, Children's Act, football regulations, or other legal instruments identify constraints and research questions. They do not establish that ScoutSA is legally compliant.

Before implementation or public compliance claims, ScoutSA requires appropriate South African legal review of the actual processing activities, data flows, authorization model, retention practices, safeguarding procedures, and disclosures.

---

**Current conclusion:**  
The research materially strengthens the case for an explicit epistemic layer, but the repository must now prove that layer through adversarial witness rather than ratifying it by intuition.

> **We do not strengthen the architecture merely because the research sounds convincing. We strengthen it where the evidence survives interrogation.**
