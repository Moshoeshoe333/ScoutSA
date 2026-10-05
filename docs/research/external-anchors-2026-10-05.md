# ScoutSA External / Legal Anchor Research — 2026-10-05

**Status:** Research evidence — NOT legal advice and NOT constitutional ratification  
**Repository:** `Moshoeshoe333/ScoutSA`  
**Purpose:** Test the seven Gate 1 semantic gaps against authoritative South African and football-governance sources.

## 1. Research rule

External law or institutional policy may establish a constraint. It does not automatically establish ScoutSA's schema, workflow, enum, RLS policy or implementation.

Method:

External authority → exact proposition → ScoutSA implication → what remains unproven.

## 2. Constitution of the Republic of South Africa — children

Section 28(2) states that a child's best interests are of paramount importance in every matter concerning the child. Section 28 also recognises parental/family care and protection from maltreatment, neglect and abuse.

**Evidence:** South African Government, Constitution, Chapter 2, section 28.  
Official source: https://www.gov.za/xh/documents/constitution/chapter-2-bill-rights

### ScoutSA implication

This supports retaining safeguarding and child-interest analysis as a first-class domain concern.

It does **not** establish a ScoutSA-specific rule such as child preference automatically overriding guardian authority, nor does it define the product's consent workflow.

**Gate mapping:** G2 Scoped Authority; G6 Safeguarding; G3 Purpose-Bound Authorization.

## 3. Children's Act 38 of 2005 — scoped parental responsibilities and multiple holders

Section 18 recognises that a person may have full or specific parental responsibilities and rights. It identifies care, contact, guardianship and certain consent functions among those rights/responsibilities.

Importantly for ScoutSA, section 18(4) states that where more than one person has guardianship, each is competent, subject to section 18(5), other law or a competent court order, to exercise independently and without the other's consent any right or responsibility arising from that guardianship. Section 18(5) separately requires consent of all guardians for the specified matters in section 18(3)(c), unless a competent court orders otherwise.

**Evidence:** Children's Act 38 of 2005, section 18. Official Justice PDF: https://www.justice.gov.za/legislation/acts/2005-038%20childrensact.pdf

Section 28 also provides a mechanism for suspending, terminating, extending or circumscribing parental responsibilities and rights. The Department of Justice explains that such applications can be brought by a co-holder and others with sufficient interest, and that the child's best interests are among the factors the court considers.

**Evidence:** Department of Justice Children's Act FAQ, section 28. https://www.justice.gov.za/vg/children-faq.html

### ScoutSA implication

This materially strengthens the existing decision not to invent a universal primary Guardian. Authority may be specific, multiple, temporally affected and subject to law or court order.

The law also shows why ScoutSA must not generalise from one type of consent to every child-related action.

**Important boundary:** ScoutSA must not infer from section 18 that every football-trial decision requires unanimous guardian consent. The statute itself distinguishes matters and circumstances. Product-specific legal interpretation remains required.

**Gate mapping:** G2 Scoped Authority and Conflict; G3 Purpose-Bound Authorization; G4 Temporal Applicability.

## 4. POPIA — lawful processing conditions

POPIA section 4 identifies the conditions for lawful processing as including accountability, processing limitation, purpose specification, further-processing limitation, information quality, openness, security safeguards and data-subject participation.

**Evidence:** Protection of Personal Information Act 4 of 2013, section 4. Official Justice PDF: https://www.justice.gov.za/legislation/acts/2013-004.pdf

### ScoutSA implication

This independently supports the Constitution's emphasis on purpose, evidence quality, controlled access, security and provenance.

**Gate mapping:** G3 Purpose-Bound Authorization; G4 Temporal/Freshness; G6 Safeguarding; G7 Disclosure.

## 5. POPIA — purpose and further processing

POPIA's purpose-specification and further-processing provisions require analysis of why information was collected and whether later processing is compatible or otherwise authorised. The Act includes circumstances in which further processing is not incompatible, including certain cases involving consent and information available in or derived from a public record.

The same provisions therefore show why the ScoutSA rule cannot simply be:

publicly available → automatically free for every new use.

Public-record status is one statutory factor/route, not a universal product permission for unrestricted republication.

**Evidence:** POPIA section 15 material in the official Justice Act text. https://www.justice.gov.za/legislation/acts/2013-004.pdf

**Gate mapping:** G3 Purpose-Bound Authorization; G7 Disclosure / Republication Boundary.

## 6. POPIA — information quality

Section 16 requires reasonably practicable steps to ensure personal information is complete, accurate, not misleading and updated where necessary, with regard to the purpose for which it is collected or further processed.

**Evidence:** POPIA section 16, official Justice Act text. https://www.justice.gov.za/legislation/acts/2013-004.pdf

### ScoutSA implication

This strongly supports the Gate 1 distinction:

`AUTHENTIC ≠ CURRENT ≠ APPLICABLE ≠ SUFFICIENT`

It does not establish a universal freshness period. Freshness remains claim- and context-dependent.

**Gate mapping:** G4 Temporal Freshness and Applicability.

## 7. POPIA — children

Section 34 generally prohibits processing personal information concerning a child, subject to section 35. Section 35 identifies specified authorisations, including prior consent of a competent person and certain statutory exceptions. It also addresses personal information deliberately made public by the child with competent-person consent.

**Evidence:** POPIA sections 34–35, official Justice Act text. https://www.justice.gov.za/legislation/acts/2013-004.pdf

### ScoutSA implication

This materially supports treating minor data as a special domain boundary and refusing to infer a single generic consent state.

It also reinforces Case 7 and Case 11: the existence of a public-information pathway does not by itself answer every downstream purpose or processing question.

**Gate mapping:** G3 Purpose-Bound Authorization; G6 Safeguarding; G7 Disclosure.

## 8. POPIA — health information

POPIA contains special provisions concerning health or sex-life information, including section 32 authorisations and confidentiality requirements in specified circumstances.

**Evidence:** POPIA section 32, official Justice Act text. https://www.justice.gov.za/legislation/acts/2013-004.pdf

### ScoutSA implication

This supports the existing domain decision to keep detailed medical information outside the core Player Passport and to treat medical-clearance status as highly restricted and purpose-limited.

It does not establish a particular medical schema or a universal legal basis for every football opportunity.

**Gate mapping:** G3 Purpose; G4 Temporal Applicability; G6 Safeguarding.

## 9. Information Regulator — authoritative regulatory body

The Information Regulator states that it is an independent body established under section 39 of POPIA and is empowered to monitor and enforce compliance with POPIA and PAIA. Its current eServices portal also provides compliance and prior-authorisation services.

**Evidence:** Information Regulator official website and eServices. https://inforegulator.org.za/  ; https://eservices.inforegulator.org.za/default.aspx

The Regulator's current prior-authorisation guidance identifies circumstances involving, among other things, unique identifiers, linking information across sources, and certain transfers of children's information to third countries without adequate protection.

**Evidence:** Information Regulator prior-authorisation portal. https://eservices.inforegulator.org.za/priorauthorisation/default.aspx

### ScoutSA implication

POPIA analysis should remain connected to the Regulator's current guidance rather than relying only on the Act text.

No ScoutSA compliance claim is justified yet.

**Gate mapping:** all privacy-related gaps, especially G3, G6 and G7.

## 10. FIFA — safeguarding in football

FIFA published a comprehensive Safeguarding Policy in March 2026. FIFA describes the framework as covering prevention; response including reporting, investigation, resolution and remedy; safeguarding during competitions; monitoring/evaluation/learning; and governance/accountability.

FIFA also states that the policy applies globally while respecting national legal and regulatory frameworks.

**Evidence:** FIFA Council, 19 March 2026, Landmark Safeguarding Policy. https://inside.fifa.com/organisation/fifa-council/news/safeguarding-policy-strengthen-protection-global-football

FIFA's safeguarding guidance says specific roles and responsibilities should be defined within Member Associations and that concerns should be reported and dealt with appropriately.

**Evidence:** FIFA Safeguarding and Child Protection guidance. https://inside.fifa.com/human-rights/fifa-guardians

### ScoutSA implication

This strengthens Case 9's distinction:

`VERIFICATION ≠ SAFEGUARDING CLEARANCE`

It also supports explicit roles, reporting, resolution, governance and auditability as domain concerns.

It does **not** establish SAFA's or ScoutSA's exact safeguarding workflow.

**Gate mapping:** G6 Safeguarding vs Verification; G2 Conflict/Resolution.

## 11. SAFA — football academy welfare/data source

SAFA's published Football Academies Regulations state that officials should remain aware of the Constitution, Bill of Rights and Children's Act and should act reasonably to safeguard or promote student welfare. The regulations also address student records, complaints procedures for students and parents, and student data management.

**Evidence:** SAFA Regulations on Football Academies. https://www.safa.net/wp-content/uploads/2017/03/FootballAcademies.pdf

### Source-quality qualification

The retrieved document is an older SAFA regulation approved in 2011. It is therefore useful as institutional evidence of the safeguarding/data-management direction, but it must **not** be treated as proof of current universal SAFA policy in 2026 without current confirmation.

### ScoutSA implication

This supports keeping welfare, complaints, parent involvement and controlled student records visible in the research layer.

**Gate mapping:** G6 Safeguarding; G7 Disclosure; operational governance.

## 12. External-anchor reconciliation

| Candidate gap | External support | Strength | What remains unproven |
|---|---|---|---|
| G1 Assertion Boundary | POPIA information quality/provenance logic; general evidence principles | SUPPORTING | Exact ScoutSA Assertion entity semantics |
| G2 Scoped Authority/Conflict | Children's Act s18 and s28; FIFA defined roles/responsibilities | STRONG SUPPORT | Product-specific precedence/resolution algorithm |
| G3 Purpose-Bound Authorization | POPIA purpose/further-processing; child provisions | STRONG SUPPORT | Exact product purpose taxonomy |
| G4 Temporal Freshness | POPIA information-quality requirement; Children's Act authority changes | SUPPORTING | Universal freshness durations |
| G5 Derived-State Dependency | POPIA quality/update principle | SUPPORTING | Exact invalidation/recalculation mechanics |
| G6 Safeguarding vs Verification | Constitution s28; Children's Act; FIFA 2026 safeguarding policy; SAFA historical academy rules | STRONG SUPPORT | ScoutSA-specific safeguarding clearance process |
| G7 Disclosure/Republication | POPIA further-processing and child provisions | STRONG SUPPORT | Exact republication rules for each data category/context |

## 13. Research verdict

The external evidence strengthens the direction of the Gate 1 synthesis without collapsing legal requirements into implementation rules.

Most strongly supported candidate principles are:

1. **Child interests and safeguarding require explicit treatment.**
2. **Parental/guardian authority can be scoped and can involve multiple holders.**
3. **Purpose and further-processing limitations matter.**
4. **Information quality/currentness matters.**
5. **Child personal information receives special treatment under POPIA.**
6. **Football safeguarding requires defined roles, reporting and accountability.**
7. **Public availability is not a sufficient universal reason to treat information as unrestricted ScoutSA data.**

## 14. What this research does NOT establish

It does not establish:

- POPIA compliance by ScoutSA;
- a universal Guardian precedence rule;
- that a child may always override a Guardian or vice versa;
- that every football photograph requires the same consent basis;
- that every public record may be republished without further analysis;
- a particular database or RLS design;
- a particular retention period;
- a particular automated decision mechanism;
- current SAFA policy beyond the evidence actually retrieved;
- institutional integration with SAFA/MySAFA;
- investor readiness.

## 15. Recommended next step

Draft the smallest candidate semantic amendment set from the seven synthesis gaps, explicitly marking each clause as:

`EXTERNALLY SUPPORTED` / `PRODUCT POLICY` / `LEGAL REVIEW REQUIRED` / `NOT YET EARNED`.

Then re-witness the affected cases before any Gate 1 closure decision.