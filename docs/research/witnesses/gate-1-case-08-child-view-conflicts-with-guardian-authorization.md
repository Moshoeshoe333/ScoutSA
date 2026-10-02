# Gate 1 Witness — Case 8: Child View Conflicts With Guardian Authorization

Status: Gate 1 witness — adversarial domain test
Scope: Implementation-independent ScoutSA domain model
Governing principle: Strength of claim must never exceed strength of evidence.

## 1. Witness Point
Test whether ScoutSA can preserve the child's expressed view when it conflicts with a Guardian authorization, without inventing a universal legal precedence rule.

The witness asks: When a minor and Guardian express incompatible preferences, can the system preserve both positions, identify the applicable authority and context, and prevent silent collapse into a boolean outcome?

## 2. Scenario
T1 — Player P is a minor and has an active GuardianLink.
T2 — Guardian G has a defined authority scope for an opportunity-related action.
T3 — G authorizes participation in Opportunity O.
T4 — P expresses that they do not wish to participate.
T5 — A workflow attempts to treat G's authorization as conclusive without recording P's view or considering the applicable legal/safeguarding context.

Variant: P wishes to participate while G refuses.

## 3. 33×3 Witness

### Existence
- Player is a first-class subject: PASS.
- GuardianLink with scoped authority: PASS.
- ConsentRecord: PASS AS PRINCIPLE.
- Child's own view/assent/dissent: PARTIAL / GAP. The model recognizes child participation may need explicit treatment in some contexts, but no first-class semantic is defined.
- Legal/safeguarding context: PARTIAL. The model deliberately avoids making a legal determination, but does not yet define how applicable external rules enter a domain decision.

### Coherence
- GuardianLink ≠ unlimited authority: PASS.
- Guardian authority ≠ automatic erasure of child's expressed view: PASS AS PRINCIPLE.
- Child view ≠ automatic legal veto: PASS AS PRINCIPLE.
- Consent ≠ authority: PASS.
- A single consent=true boolean cannot safely represent all child/guardian conflicts: RED.
- The system must not manufacture legal precedence from role labels alone: PASS.
- Context matters: MATERIAL GAP. The exact action, age/capacity context, safeguarding rule, and applicable legal basis may alter what can be done.

### Failure
- Guardian authorization silently overwrites child's refusal: RED / MATERIAL GAP.
- Child refusal silently overrides all Guardian authority in every context: RED.
- Child view is discarded because Guardian is the only stored actor: RED / DOMAIN GAP.
- Guardian role label is treated as conclusive legal authority: RED.
- Conflicting views are collapsed into a single approved/declined state without preserving both: RED.
- A protected action proceeds while the conflict remains unresolved where resolution is required: RED.
- Historical disagreement is deleted after later resolution: RED.

## 4. Reverse Trace
Decision → action → context → applicable authority rule → GuardianLink/authority → Guardian authorization → Player's expressed view → consent state → evidence → time.

The current model cannot yet guarantee complete reconstruction of the child's expressed view as an independent input to a conflict-sensitive decision.

## 5. Candidate Findings

### G-002 — Child View as First-Class Decision Input
STATUS: HYPOTHESIS / NOT RATIFIED
Where the applicable legal, safeguarding, or product context requires consideration of the child's views, the child's expressed position should be represented independently rather than inferred from Guardian state.

### G-003 — Minor Authority Conflict Resolution
STATUS: HYPOTHESIS / NOT RATIFIED
Conflicting Player and Guardian positions must remain visible as separate assertions/inputs until the applicable authority, safeguarding, and legal context determines what action is permitted.
No universal precedence rule is selected.

### G-004 — Contextual Capacity / Participation Rule
STATUS: HYPOTHESIS / LEGAL REVIEW REQUIRED / NOT RATIFIED
Where a child's age, maturity, capacity, or the type of decision is legally relevant, ScoutSA must not encode a universal age-based rule without jurisdiction-specific legal review.

## 6. Relationship To Earlier Cases
Case 2: Guardian authority is scoped and does not equal unrestricted control.
Case 3: Current authorization must be distinguished from historical authorization.
Case 7: Consent is purpose-bound.
Case 8: Guardian authorization and child's expressed view may be distinct inputs.

Emerging invariant: A conflict between legitimate actors must be preserved before it is resolved.

## 7. Gate 1 Impact
| Finding | Result |
|---|---|
| Player exists as first-class subject | PASS |
| GuardianLink is scoped | PASS |
| ConsentRecord exists | PASS AS PRINCIPLE |
| Child view is explicitly represented | PARTIAL / GAP |
| Child view and Guardian authorization remain distinct | PASS AS PRINCIPLE |
| Universal child veto | NOT SUPPORTED / MUST NOT BE ASSUMED |
| Universal Guardian override | NOT SUPPORTED / MUST NOT BE ASSUMED |
| Conflict preservation | PARTIAL / GAP |
| Context-specific resolution rule | MATERIAL GAP |
| Applicable legal/safeguarding input | MATERIAL GAP |
| Historical disagreement preservation | PASS AS PRINCIPLE / IMPLEMENTATION UNPROVEN |
| Constitution amendment justified | NO |
| Domain-model amendment justified | NOT YET |
| Gate 1 closure | NO |

## 8. Witness Conclusion
Case 8 = RED / MATERIAL DOMAIN GAP.
The existing model correctly avoids equating GuardianLink with unlimited authority and recognizes that child participation may require explicit treatment. The missing semantic is a first-class representation of the child's view and a context-sensitive resolution boundary.

The witness deliberately does not conclude that either party universally overrides the other. That would exceed the evidence and applicable-law analysis available in this domain draft.

Safe boundary:
Guardian authorization ≠ child's expressed view ≠ automatic legal precedence.

No Constitution amendment is warranted.
No Domain Model amendment is ratified.
Gate 1 remains OPEN.

## 9. Gate 1 Ledger Effect
SCOUTSA-028 — Child View / Guardian Authority Conflict
STATUS: WITNESSED GAP — NOT RATIFIED
Finding: ScoutSA needs a domain-level mechanism to preserve a minor's expressed view independently from Guardian authorization and to defer conflict resolution to the applicable legal, safeguarding, and action context rather than inventing universal precedence.
Gate: Gate 1 remains OPEN.
Next adversarial witness: Case 9 — Safeguarding concern against a verified organization user.