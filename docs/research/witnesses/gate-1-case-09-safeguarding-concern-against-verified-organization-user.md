# Gate 1 Witness — Case 9: Safeguarding Concern Against a Verified Organization User

**Document:** `docs/research/witnesses/gate-1-case-09-safeguarding-concern-against-verified-organization-user.md`  
**Status:** Gate 1 witness — adversarial domain test  
**Scope:** Implementation-independent ScoutSA domain model  
**Governing principle:** Strength of claim must never exceed strength of evidence.

## 1. Witness Point

Test whether ScoutSA keeps organizational verification separate from safeguarding status when a verified organization user becomes the subject of a safeguarding concern.

The witness asks:

> Can a verified organization or verified organization user retain historical verification provenance while a separate safeguarding concern triggers appropriate restriction, review, escalation, or hold without silently treating verification as proof of safety?

The witness deliberately does **not** determine whether a concern is true merely because it was reported. A concern, allegation, observation, verified finding, and final safeguarding determination must not be collapsed into one state.

## 2. Scenario

T1 — Organization O has an Organization Verified status for a defined scope.

T2 — User U is authorized within O for a defined product role.

T3 — U has an established relationship with Players and/or opportunities within the permitted scope.

T4 — A safeguarding concern is submitted about U, O, or an interaction involving a minor.

T5 — The concern has not yet been finally determined to be true.

T6 — A workflow attempts to continue protected minor contact solely because O is verified and U holds an organizational role.

Variants:
- the concern is substantiated after review;
- the concern is dismissed or found unsupported;
- the concern remains unresolved;
- the concern concerns U personally while O's organizational verification remains valid;
- the concern concerns O while individual U's role evidence remains separately recorded.

## 3. 33×3 Witness

### Existence

- Organization exists as a first-class entity: PASS.
- Organization verification is scoped: PASS.
- User role is distinct from external professional status: PASS AS PRINCIPLE.
- Individual authorization within an organization: PARTIAL / GAP, already observed in Case 6.
- Safeguarding boundary exists conceptually: PASS.
- Safeguarding concern as a first-class domain concept: PARTIAL / MATERIAL GAP.
- Concern provenance/evidence: PASS AS PRINCIPLE through the Evidence model, but concern-specific semantics are missing.
- Review/investigation status: PARTIAL / GAP.
- Restriction/hold state: PARTIAL / GAP.
- Resolution/outcome history: PARTIAL / GAP.

### Coherence

- Organization verification ≠ individual safety clearance: PASS AS PRINCIPLE.
- Organization verification ≠ blanket authorization for every individual: PASS.
- Individual role ≠ safeguarding clearance: PASS AS PRINCIPLE.
- A safeguarding concern ≠ established fact: PASS AS PRINCIPLE.
- Evidence of a concern ≠ final determination: PASS.
- Verification status and safeguarding status require separate provenance: MATERIAL GAP.
- A concern may require temporary protective action before final determination: MATERIAL GAP.
- A dismissed/unsupported concern must not be silently rewritten as if it never existed: MATERIAL GAP.
- A substantiated concern must not be hidden because the organization remains verified: RED.
- Historical verification should remain reconstructable without implying current suitability: PASS AS PRINCIPLE.

### Failure

- Verified organization automatically authorizes every employee/Scout to contact minors: RED.
- Organization verification is treated as proof that no safeguarding concern exists: RED.
- Individual verified role is treated as a safety clearance: RED.
- A concern is converted directly into guilt or permanent exclusion without an appropriate evidentiary/review process: RED.
- A concern is ignored while review is pending because verification exists: RED / MATERIAL GAP.
- A pending concern permits unrestricted protected contact: RED / MATERIAL GAP.
- A substantiated concern leaves protected contact unrestricted: RED.
- A dismissed concern permanently destroys unrelated historical verification: RED.
- Organization verification is silently revoked because of an individual concern without defined scope/rule: RED.
- Safeguarding events are deleted after resolution: RED.
- A safeguarding status is displayed publicly without considering its sensitivity and purpose: RED.

## 4. Reverse Trace

Protected contact decision → applicable safeguarding rule → current safeguarding state → concern/review/resolution records → supporting evidence → actor/subject → organization and individual role/authorization → organization verification → time and scope → resulting access decision.

The current model cannot yet guarantee a complete, first-class reconstruction of this chain.

Most importantly, it does not yet define the relationship between:
- an organization-level verification;
- an individual user's authorization;
- a safeguarding concern;
- interim protective restrictions;
- review outcome;
- final safeguarding determination.

## 5. Candidate Findings

### SG-001 — Safeguarding Concern as First-Class Domain Record

**STATUS: HYPOTHESIS / NOT RATIFIED**

A safeguarding concern should be independently represented with subject, reporter/source, timestamp, scope, evidence references, status, and controlled visibility.

A concern record must not itself assert guilt or final truth.

### SG-002 — Safeguarding State Is Separate From Verification

**STATUS: HYPOTHESIS / NOT RATIFIED**

Organization verification, individual role verification, and safeguarding status must remain separate dimensions.

Verification must never operate as a blanket safety clearance.

### SG-003 — Interim Protective Restriction

**STATUS: HYPOTHESIS / NOT RATIFIED**

Where the applicable safeguarding policy requires immediate protective action, ScoutSA needs a way to restrict or hold protected interactions while a concern is reviewed, without prematurely converting the concern into a final finding.

The exact trigger, authority, duration, review process, and appeal mechanism require explicit policy/legal/safeguarding review.

### SG-004 — Scope of Safeguarding Impact

**STATUS: HYPOTHESIS / NOT RATIFIED**

A concern about an individual should not automatically contaminate unrelated organization records, and an organization-level concern should not automatically be assigned to every individual, unless an explicit, evidence-based rule establishes that scope.

## 6. Relationship To Earlier Cases

Case 2: Authority is scoped and cannot be manufactured from role labels.

Case 6: Discovery visibility does not equal contact authorization; verified organization does not automatically authorize every individual.

Case 7: Purpose-specific consent cannot be widened silently.

Case 8: Conflicting actor positions must be preserved before context-specific resolution.

Case 9 adds another critical distinction:

`Verification ≠ Safeguarding Clearance ≠ Current Contact Authorization`

A further invariant emerges:

> A protective control may restrict an action without asserting that the underlying allegation is true.

This distinction is essential for both safeguarding and evidence integrity.

## 7. Gate 1 Impact

| Finding | Result |
|---|---|
| Organization verification is scoped | PASS |
| Individual role is distinct from organization identity | PASS AS PRINCIPLE |
| Individual authorization | PARTIAL / GAP |
| Safeguarding concern first-class entity | PARTIAL / GAP |
| Concern ≠ established fact | PASS AS PRINCIPLE |
| Verification ≠ safeguarding clearance | PASS AS PRINCIPLE |
| Verification/safeguarding provenance separation | MATERIAL GAP |
| Interim protective restriction | MATERIAL GAP |
| Safeguarding review state | PARTIAL / GAP |
| Scope of concern impact | MATERIAL GAP |
| Historical concern preservation | PARTIAL / GAP |
| Constitution amendment justified | NO |
| Domain-model amendment justified | NOT YET |
| Gate 1 closure | NO |

## 8. Witness Conclusion

**Case 9 = RED / MATERIAL DOMAIN GAP.**

The current model already contains several necessary boundaries: verification is scoped, role assignment does not prove external professional status, discovery does not equal contact authorization, and safeguarding is a protected boundary.

The missing semantic layer is a distinct safeguarding concern/review model that can support protective action without converting an unresolved concern into a factual finding.

Safe boundary:

`Organization Verification ≠ Individual Authorization ≠ Safeguarding Clearance ≠ Contact Authorization`

And:

`Safeguarding Concern ≠ Established Guilt`

while also:

`Protective Restriction ≠ Finding of Guilt`

No Constitution amendment is warranted.
No Domain Model amendment is ratified.
Gate 1 remains OPEN.

## 9. Gate 1 Ledger Effect

**SCOUTSA-029 — Safeguarding Concern / Verified Organization Boundary**  
**STATUS: WITNESSED GAP — NOT RATIFIED**

Finding: ScoutSA needs a first-class safeguarding concern/review boundary and scoped protective controls so that verification cannot silently function as a safety clearance, while unresolved concerns are not silently promoted into factual guilt.

Gate: Gate 1 remains OPEN.

Next adversarial witness: Case 10 — Institutional record conflicts with ScoutSA assertion.
