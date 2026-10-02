# Gate 1 Witness — Case 11: Public Information Proposed for Republication

**Document:** `docs/research/witnesses/gate-1-case-11-public-information-proposed-for-republication.md`  
**Status:** Gate 1 witness — adversarial domain test  
**Scope:** Implementation-independent ScoutSA domain model  
**Governing principle:** Strength of claim must never exceed strength of evidence.

## 1. Witness Point

Test whether ScoutSA distinguishes public availability of information from authority to collect, retain, republish, expose, or derive claims from that information.

The witness asks:

> If information about a Player or Organization is already publicly accessible, can ScoutSA prevent public availability from being silently converted into permission for unrestricted ingestion, republication, profiling, or disclosure?

This witness does not conclude that public information is never reusable. It tests whether purpose, source, provenance, applicable law, visibility, minimisation, safeguarding, and disclosure rules are evaluated before republication.

## 2. Scenario

T1 — Information concerning Player P is publicly visible on an external website or public social-media surface.

T2 — ScoutSA discovers or receives the information.

T3 — The information concerns a potentially sensitive or contextual domain fact, such as football profile, membership, media, age-related information, contact details, or opportunity history.

T4 — A ScoutSA workflow proposes copying the information into the Player Passport and exposing it to Scout users.

T5 — No explicit purpose, provenance, lawful-basis analysis, consent state where applicable, visibility rule, retention rule, or correction mechanism has yet been established for the copied information.

Variants:
- the source is public but stale;
- the source is public but the person is a minor;
- the source permits viewing but not necessarily republication;
- the information was originally published by the Player, Guardian, Organization, or third party;
- the source later removes or corrects the information;
- only part of the source content is relevant to the opportunity.

## 3. 33×3 Witness

### Existence

- Public/Discoverable visibility class: PASS.
- Restricted and purpose-specific visibility classes: PASS.
- Evidence provenance: PASS AS PRINCIPLE.
- Source actor / source organization: PASS AS CONCEPTUAL EVIDENCE FIELDS.
- ConsentRecord: PASS AS DOMAIN ENTITY.
- Data minimisation: PASS AS CONSTITUTIONAL/RESEARCH REQUIREMENT.
- Purpose limitation: PASS AS RESEARCH CANDIDATE / NOT FULLY RATIFIED DOMAIN RULE.
- Republication/disclosure event: PARTIAL / GAP.
- External-source ingestion provenance: PARTIAL / GAP.
- Source licence/terms/permission semantics: MATERIAL GAP.
- Correction/takedown relationship between external source and ScoutSA copy: MATERIAL GAP.

### Coherence

- Public visibility ≠ unrestricted ScoutSA republication: PASS AS PRINCIPLE.
- Possession/access ≠ authority to disclose: PASS AS PRINCIPLE.
- Public source ≠ verified truth: PASS.
- Public source ≠ current fact: PASS.
- Public media ≠ unrestricted minor-media permission: PASS AS PRINCIPLE.
- Public contact detail ≠ protected-contact authorization: PASS AS PRINCIPLE.
- Copying a public assertion into the Passport must preserve its source/provenance: MATERIAL GAP.
- Purpose limitation for ingestion and republication: MATERIAL GAP.
- Source correction/removal must have defined implications for ScoutSA's retained copy: MATERIAL GAP.
- Public information may still require restricted treatment because of sensitivity/context: PASS AS PRINCIPLE.

### Failure

- "It is public" is treated as permission to copy everything: RED.
- Public social-media content is automatically treated as verified ScoutSA evidence: RED.
- Public Player information is automatically made discoverable to Scouts: RED / MATERIAL GAP.
- A public phone number is treated as contact authorization: RED.
- Public minor media is treated as ScoutSA permission to republish: RED.
- External source removal is ignored indefinitely without a defined policy: RED / GAP.
- Stale public information is displayed as current: RED.
- Public information is copied without provenance: RED.
- Public source content is silently transformed into a stronger verified claim: RED.
- Public availability is used to bypass consent, safeguarding, purpose, or access controls: RED.

## 4. Reverse Trace

Passport field / disclosure  
→ copied assertion or evidence  
→ external source  
→ source actor / rights-holder where known  
→ original purpose/context  
→ ScoutSA collection purpose  
→ applicable authority / lawful basis / consent where relevant  
→ visibility rule  
→ retention state  
→ correction/takedown status  
→ disclosure actor and recipient.

The current model contains several of these concepts independently, but does not yet define a complete external-source republication provenance chain.

## 5. Candidate Findings

### P-001 — Public Availability Is Not Republication Authority

**STATUS: HYPOTHESIS / NOT RATIFIED**

Public visibility of information must not by itself be treated as permission for unrestricted ScoutSA collection, republication, profiling, or disclosure.

The exact lawful basis, purpose, rights, and safeguarding treatment remain context-specific.

### P-002 — External Source Provenance

**STATUS: HYPOTHESIS / NOT RATIFIED**

Material information imported from an external source should preserve source identity, capture time, relevant source context, and provenance sufficient to distinguish imported assertion from ScoutSA-verified fact.

### P-003 — External Copy Lifecycle

**STATUS: HYPOTHESIS / LEGAL/POLICY REVIEW REQUIRED / NOT RATIFIED**

Where ScoutSA retains a copy of externally sourced information, its lifecycle should account for source correction/removal, freshness, purpose, retention, and controlled disclosure.

The system must not automatically assume that source deletion creates a universal legal obligation to delete ScoutSA records; that determination requires applicable-law and policy analysis.

### P-004 — Public Minor Information Safeguard

**STATUS: HYPOTHESIS / LEGAL/SAFEGUARDING REVIEW REQUIRED / NOT RATIFIED**

Public availability of information concerning a minor must not be treated as a blanket waiver of ScoutSA's own safeguarding, minimisation, access, or disclosure controls.

## 6. Relationship To Earlier Cases

Case 4: Evidence can become stale.

Case 6: Discovery visibility does not equal contact authorization.

Case 7: Consent is purpose-bound.

Case 9: Verification is not safeguarding clearance.

Case 10: Authentic external/institutional evidence is not universally applicable.

Case 11 extends the chain:

`Public Visibility ≠ Collection Authority ≠ Verification ≠ Republication Authority ≠ Contact Authorization`

A further invariant emerges:

> **Availability of information does not erase the provenance, purpose, authority, safeguarding, temporal, or disclosure constraints attached to that information.**

## 7. Gate 1 Impact

| Finding | Result |
|---|---|
| Public/Discoverable visibility class | PASS |
| Restricted/purpose-specific visibility | PASS |
| Evidence provenance | PASS AS PRINCIPLE |
| Source identity/context | PASS AS CONCEPTUAL MODEL |
| Consent model | PASS |
| Public availability ≠ unrestricted disclosure | PASS AS PRINCIPLE |
| Public source ≠ verified truth | PASS |
| External ingestion provenance | PARTIAL / GAP |
| Republication authority semantics | MATERIAL GAP |
| Source correction/removal lifecycle | MATERIAL GAP |
| Public minor information safeguard | MATERIAL GAP |
| Public information as contact authorization | RED |
| Public information as automatic verification | RED |
| Constitution amendment justified | NO |
| Domain-model amendment justified | NOT YET |
| Gate 1 closure | NO |

## 8. Witness Conclusion

**Case 11 = RED / MATERIAL DOMAIN GAP.**

The current model already distinguishes visibility, evidence, consent, safeguarding, verification, and contact authorization. The missing semantic layer is the treatment of externally sourced public information as a separate provenance/lifecycle problem.

The witness does not conclude that every public datum requires consent before any use. It establishes the narrower requirement that public availability alone cannot be used as a universal permission signal.

Safe boundary:

`Public Availability ≠ Collection Authority ≠ Verification ≠ Republication Authority ≠ Contact Authorization`

No Constitution amendment is warranted.
No Domain Model amendment is ratified.
Gate 1 remains OPEN.

## 9. Gate 1 Ledger Effect

**SCOUTSA-031 — Public Information / Republication Boundary**  
**STATUS: WITNESSED GAP — NOT RATIFIED**

Finding: ScoutSA needs an explicit external-source provenance and republication boundary so public availability cannot silently become permission to collect, verify, retain, expose, or republish information.

Gate: Gate 1 remains OPEN.

Next adversarial witness: Case 12 — Authentic but stale evidence.
