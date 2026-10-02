# Gate 1 Witness — Case 12: Authentic but Stale Evidence

**Status:** Gate 1 witness — adversarial domain test  
**Scope:** Implementation-independent domain integrity  
**Governing principle:** Strength of claim must never exceed strength of evidence.

## 1. Witness Point

Test whether ScoutSA distinguishes evidence that is authentic and intact from evidence that is sufficiently current and applicable to support a present claim.

The question is not whether old evidence becomes false. The question is whether authenticity can be silently converted into current applicability.

## 2. Scenario

T1 — Evidence E is genuinely sourced, attributable, and integrity-preserved.

T2 — E supports a defined claim C at its effective time.

T3 — Time passes beyond the relevant freshness period, or circumstances materially change.

T4 — No replacement evidence exists.

T5 — A current Passport, verification, Football Readiness, or Opportunity Readiness decision attempts to rely on E as though it remains current.

Variants:
- E has no explicit expiry date;
- E is authentic but outside a defined freshness window;
- E remains historically valid but the underlying fact has changed;
- E was verified by an authorized actor but the verification is now old;
- replacement evidence conflicts with E;
- the source remains authentic but its scope no longer matches the current claim.

## 3. 33×3 Witness

### Existence

- Evidence has source/provenance: PASS.
- Evidence has captured/submitted timestamp: PASS.
- Effective date: PASS AS CONCEPT.
- Expiry date: PASS AS CONCEPT.
- Verification has timestamp/status: PASS.
- Historical preservation: PASS AS PRINCIPLE.
- Freshness/currentness policy: PARTIAL / GAP.
- Applicability window by claim type: MATERIAL GAP.
- No-expiry evidence freshness semantics: MATERIAL GAP.
- Material change invalidation relationship: PARTIAL / GAP.

### Coherence

- Authenticity ≠ currentness: PASS.
- Currentness ≠ applicability: PASS AS PRINCIPLE.
- Historical evidence may remain valid historically after becoming insufficient for a current claim: PASS.
- Verification timestamp ≠ perpetual verification: PASS.
- Expiry ≠ evidence fabrication/destruction: PASS.
- Evidence that remains authentic must not silently be represented as current: PASS AS PRINCIPLE.
- Different claim types may legitimately require different freshness windows: UNDER-SPECIFIED.
- Absence of an expiry date does not prove indefinite currentness: MATERIAL GAP.
- Replacement evidence should preserve the historical record rather than silently overwrite it: PASS AS PRINCIPLE.

### Failure

- Authentic evidence automatically displayed as current forever: RED.
- Old medical clearance treated as current because document integrity is intact: RED.
- Old membership record treated as current membership: RED.
- Old performance statistics presented without period/context: RED.
- Expiry date absent → system assumes permanently current: RED / GAP.
- Old verification badge treated as perpetual external authority: RED.
- Replacement evidence silently overwrites historical evidence: RED.
- Current readiness depends on stale evidence without an explainable freshness/applicability rule: RED / MATERIAL GAP.
- Stale evidence is deleted so the historical decision cannot be reconstructed: RED.
- Stale evidence is falsely labelled invalid rather than simply no longer sufficient for the current claim: RED.

## 4. Reverse Trace

Current claim  
→ current decision/derived state  
→ verification/assertion used  
→ supporting evidence  
→ source  
→ evidence effective/capture time  
→ freshness/applicability rule  
→ material changes since evaluation  
→ replacement/superseding evidence  
→ resulting current state.

The current domain model provides timestamps, expiry, historical preservation, and the principle that expired evidence cannot silently remain current. It does not yet define a complete, claim-specific freshness/applicability mechanism.

## 5. Candidate Findings

### T-004 — Authenticity / Currentness Separation

**STATUS: HYPOTHESIS / NOT RATIFIED**

Authenticity and integrity establish that an evidence artifact is attributable/intact; they do not establish that it is sufficiently current for a present claim.

### T-005 — Claim-Scoped Freshness

**STATUS: HYPOTHESIS / NOT RATIFIED**

Freshness should be evaluated relative to the claim, evidence type, effective period, material context, and applicable rule rather than assuming one universal expiry interval.

### T-006 — No-Expiry Evidence Semantics

**STATUS: HYPOTHESIS / NOT RATIFIED**

Absence of an explicit expiry date must not automatically be interpreted as indefinite currentness. Where freshness matters, the applicable rule must determine whether evidence remains sufficient.

### T-007 — Historical Evidence Preservation

**STATUS: HYPOTHESIS / NOT RATIFIED**

Evidence becoming stale for a current decision must not erase its historical evidentiary role or silently rewrite prior decisions.

## 6. Relationship To Earlier Cases

Case 4 established that evidence expiry creates a temporal dependency between evidence and verification.

Case 5 established that derived readiness is contextual and point-in-time.

Case 10 established that source authenticity does not make a source universally authoritative.

Case 12 isolates the additional distinction:

`AUTHENTIC ≠ CURRENT ≠ APPLICABLE ≠ SUFFICIENT`

A stale artifact may remain authentic and historically meaningful while being insufficient for a current claim.

## 7. Gate 1 Impact

| Finding | Result |
|---|---|
| Evidence provenance | PASS |
| Evidence timestamp | PASS |
| Evidence expiry concept | PASS |
| Verification temporal state | PASS |
| Historical preservation | PASS AS PRINCIPLE |
| Authenticity ≠ currentness | PASS AS PRINCIPLE |
| Currentness ≠ applicability | PASS AS PRINCIPLE |
| Claim-scoped freshness | MATERIAL GAP |
| No-expiry freshness | MATERIAL GAP |
| Material-change dependency | PARTIAL / GAP |
| Current decision using stale evidence | RED |
| Historical record silently overwritten | RED |
| Constitution amendment justified | NO |
| Domain-model amendment ratified | NO |
| Gate 1 closure | NO |

## 8. Witness Conclusion

**Case 12 = RED / MATERIAL DOMAIN GAP.**

The current model correctly establishes provenance, timestamps, expiry concepts, historical preservation, and the prohibition against silently treating expired evidence as current. The unresolved semantic boundary is broader than expiry: an authentic artifact can become stale or inapplicable even without an explicit expiry date.

The required distinction is:

> **Authenticity establishes what the artifact is; freshness/applicability determines whether it can support the present claim.**

No Constitution amendment is ratified.
No Domain Model amendment is ratified.
Gate 1 remains OPEN.

## 9. Gate 1 Ledger Effect

**SCOUTSA-032 — Authentic but Stale Evidence**  
**STATUS: WITNESSED GAP — NOT RATIFIED**

Finding: ScoutSA needs explicit claim-scoped freshness/applicability semantics so authentic historical evidence cannot silently become current evidence.

Next adversarial witness: **Case 13 — Two legitimate authorities make incompatible assertions.**
