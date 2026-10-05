# ScoutSA Gate 1 — Residual Gap Research: Child Voice, Safeguarding, Provenance

**Date:** 2026-10-05  
**Status:** Evidence record — NOT RATIFICATION  
**Gate:** Gate 1 — Domain Integrity

## 1. Purpose
This document addresses the three residual gaps identified by the formal affected-case re-witness: R-01 Child Voice / Guardian Authorization; R-02 Safeguarding Protective Action; R-03 Witness Numbering Provenance.

## 2. R-01 — Child Voice / Guardian Authorization
South Africa's Children's Act states that where a child is of sufficient age, maturity and developmental stage to participate in a matter concerning that child, the child has a right to participate appropriately and the child's views must receive due consideration. Section 9 separately makes the child's best interests paramount. The Act's best-interests factors include age, maturity, development, physical and emotional security, and protection from harm. Official Department of Justice guidance likewise explains that a child's views must be taken into account where the child has sufficient age and maturity, while noting that a child's expressed view is not automatically the final legal outcome.

### Semantic consequence
The model should not collapse Guardian authorization and Child agreement, nor invent the reverse that Child objection is an automatic legal veto.

Proposed distinction:

```
Guardian Authority ≠ Child Participation / Voice
Child Participation / Voice ≠ Best-Interests Determination
Child Participation / Voice ≠ Automatic Veto
```

### Candidate M8 — Child Participation and Voice Boundary
A matter materially concerning a child should preserve the child's expressed view separately from Guardian authority and separately from any resulting decision. Where applicable law or policy requires the child's participation or consideration of the child's views, ScoutSA must not silently suppress, overwrite, or equate that view with either Guardian authorization or a final decision.

Explicit non-rules: no universal child veto; no universal Guardian override; no fixed age threshold invented by ScoutSA; no AI determination of capacity or best interests; no legal conclusion inferred from a stored preference.

**Status:** Strongly supported as a semantic distinction; exact product/legal effect requires review.

## 3. R-02 — Safeguarding Protective Action
South African government and Justice materials indicate reporting duties in specified child-abuse circumstances, including section 110 of the Children's Act. The official Act also provides for child-protection investigation and risk-assessment frameworks. FIFA's comprehensive Safeguarding Policy, approved 19 March 2026, is structured around prevention; response including reporting, investigation, resolution and remedy; safeguarding; monitoring/learning; and governance/accountability. FIFA's reporting mechanism also separates concerns from later findings and supports good-faith reporting.

### Semantic consequence
The domain needs to distinguish:

```
Concern / Report ≠ Finding / Substantiation
Finding / Substantiation ≠ Protective Action
Protective Action ≠ Investigation Outcome
Investigation Outcome ≠ Final Resolution
```

### Candidate M9 — Safeguarding Concern / Response Boundary
A safeguarding concern must remain distinguishable from a substantiated finding, and any protective action must remain distinguishable from final resolution. Reports, evidence, assessments, actions and outcomes must preserve provenance and responsible authority.

Explicit non-rules: no universal safeguarding-cleared badge; no allegation→guilt promotion; no verification→safety promotion; no automatic AI adjudication; no invented investigation authority; no automatic permanent exclusion from a single unverified report; no suppression of a good-faith concern merely because an organisation is verified.

**Status:** Strongly supported as a semantic distinction; operational response and legal duties require further review.

## 4. R-03 — Witness Numbering Provenance
The repository contains duplicate numbered witness filenames for Cases 07, 08 and 09. The known pairs are:

- Case 07: `gate-1-case-07-guardian-authorizes-trial-not-media.md` and `gate-1-case-07-guardian-authorizes-trial-but-not-media.md`
- Case 08: `gate-1-case-08-child-view-conflicts-with-guardian-authorization.md` and `gate-1-case-08-guardian-consent-authority-changes.md`
- Case 09: `gate-1-case-09-safeguarding-concern-against-verified-organization-user.md` and `gate-1-case-09-multi-guardian-authority-conflict.md`

Filename number alone is therefore insufficient to identify a unique witness. The committed Gate 1 synthesis and ledger establish the canonical 01–14 sequence currently used for Gate 1 reasoning. The additional duplicate files remain preserved until their origin, chronology and intended status are explicitly reconciled.

### Required provenance map
- witness file
- scenario title
- originating commit
- blob SHA
- first appearance
- canonical / supplemental / superseded status
- relationship to the canonical case sequence

No deletion, rename or overwrite is justified by current evidence.

## 5. Combined Residual Finding
M8 and M9 are new candidate semantic boundaries. Neither is ratified. They reinforce rather than contradict M1–M7.

## 6. Decision
R-01 is substantially narrowed but retained for formal drafting. R-02 is substantially narrowed but retained for formal drafting. R-03 remains OPEN pending an explicit provenance map.

## 7. Gate Status
```
M1–M7: survive re-witness
M8: candidate — evidence-supported, not ratified
M9: candidate — evidence-supported, not ratified
R-01: narrowed / retained for formal drafting
R-02: narrowed / retained for formal drafting
R-03: OPEN
Constitution: UNCHANGED
Domain Model: UNCHANGED
Ratified amendments: 0
ERD/schema: DEFERRED
RLS: DEFERRED
Implementation: DEFERRED
Gate 1: OPEN
```

The next action is the witness provenance map, followed by one consolidated M1–M9 final re-witness.