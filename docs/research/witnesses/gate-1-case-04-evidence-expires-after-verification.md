# Gate 1 Witness — Case 4: Evidence Expires After Verification

**Document:** `docs/research/witnesses/gate-1-case-04-evidence-expires-after-verification.md`  
**Status:** Gate 1 witness — adversarial domain test  
**Scope:** Implementation-independent ScoutSA domain model  
**Governing principle:** Strength of claim must never exceed strength of evidence.

---

## 1. Witness Point

Test whether ScoutSA can preserve the distinction between:

- evidence that was valid at a historical point in time;
- a verification that was legitimately made from that evidence;
- the continued usability of that verification for a later decision;
- derived state produced before or after evidence expiry.

### Adversarial condition

A defined evidence artifact supports a verification.

The evidence subsequently reaches its expiry date.

A later decision attempts to rely on the previously granted verification.

The witness asks:

> Can ScoutSA reconstruct what was valid then without silently treating expired supporting evidence as current?

This is a semantic witness only. It does not prescribe a schema, status enum, implementation mechanism, or legal retention outcome.

---

# 2. Scenario

Assume:

### T1 — Evidence submitted

A medical clearance document is supplied for Player P.

The evidence has:

- subject = Player P;
- source = qualified medical authority;
- captured/submitted timestamp;
- effective date;
- expiry date;
- provenance/integrity metadata;
- restricted visibility.

### T2 — Verification occurs

An authorized verifier verifies the defined claim:

> Player P had the required medical clearance for Opportunity O at T2.

The verification records its defined scope, verifier, timestamp, status, and supporting evidence.

### T3 — Readiness is evaluated

Opportunity Readiness is derived for Opportunity O using the verified clearance and other relevant inputs.

### T4 — Evidence expires

The clearance reaches its expiry date.

No replacement evidence has yet been supplied.

### T5 — New decision

A later request asks whether Player P is currently ready for Opportunity O.

The system encounters the historical verification.

The witness must determine whether the model can distinguish:

```
Verified at T2
```

from:

```
Currently supported at T5
```

---

# 3. 33×3 Witness

## 3.1 Existence

### E1 — Evidence expiry

**Observed model support: PASS**

The Domain Model explicitly gives Evidence a conceptual `expiry date, where applicable`.

It also states:

> Expired evidence must not silently remain current.

Therefore evidence expiry exists as a recognized semantic condition.

### E2 — Verification temporal state

**Observed model support: PASS**

Verification is defined as:

- timestamped;
- capable of expiring;
- capable of being superseded;
- capable of being suspended;
- capable of being revoked.

Therefore verification has an independent temporal lifecycle in the model.

### E3 — Derived-state temporal behavior

**Observed model support: PASS**

Opportunity Readiness is explicitly:

- point-in-time;
- input-dependent;
- stale when material inputs change.

Football Readiness is also defined as point-in-time and evidence-dependent.

### E4 — Historical preservation

**Observed model support: PASS in principle**

The Domain Model repeatedly requires historical records and provenance to be retained.

It also prohibits silently rewriting audit history.

### E5 — Exact dependency between verification and supporting evidence

**Observed model support: PARTIAL**

The model states that verification has an evidence basis and that derived claims must be traceable to supporting evidence.

However, it does not yet define the precise temporal dependency:

```
Evidence E valid at T2
        ↓
Verification V created at T2
        ↓
Evidence E expires at T4
        ↓
What is the current status/usability of V at T5?
```

The model recognizes both clocks but does not yet define their relationship.

---

# 4. Coherence

## C1 — Evidence expiry must not erase historical validity

**PASS**

If the evidence was valid when verification occurred, its later expiry must not rewrite the historical fact that verification occurred at T2.

Therefore:

```
Historical verification ≠ current evidence validity
```

The existing immutability/history principles support this distinction.

---

## C2 — Verification cannot silently make expired evidence current

**PASS as an invariant**

The Domain Model states:

> Expired/revoked verification cannot silently continue to support a current claim.

It separately states:

> Expired evidence cannot be represented as current.

These two rules point in the same direction.

However, the exact transition between them remains underspecified.

---

## C3 — Evidence expiry and verification expiry are not necessarily identical

**MATERIAL GAP**

The model gives Evidence and Verification separate temporal properties.

That is important.

Consider:

```
Evidence expires at T4
Verification expires at T6
```

The current model does not explicitly establish whether:

1. Verification remains historically valid but unusable for current decisions;
2. Verification automatically becomes stale at T4;
3. Verification remains current until T6;
4. a defined policy evaluates the supporting evidence at decision time;
5. different verification scopes may behave differently.

Choosing one now would be an implementation/domain decision not yet earned by this witness.

Therefore the distinction is identified, not resolved.

---

## C4 — Derived readiness must not survive material input withdrawal

**PARTIAL / MATERIAL GAP**

Opportunity Readiness already says it becomes stale when material inputs change.

Evidence expiry is a material temporal change when the derived state relied on that evidence.

But the current model does not yet provide an explicit provenance rule showing:

```
Readiness R at T3
    ↓
used Evidence E
    ↓
E expired at T4
    ↓
R becomes stale/invalid for T5
```

The semantic principle is present.

The reconstruction dependency is not yet fully defined.

---

## C5 — Replacement evidence

**PARTIAL**

The model supports evidence as first-class and preserves provenance.

It does not yet specify how replacement evidence relates to:

- the expired evidence;
- the old verification;
- a new verification;
- a new readiness evaluation.

No assumption is made that replacement evidence retroactively repairs the old record.

---

# 5. Failure

## F1 — Expired evidence used for a new decision

**RED**

If a new decision at T5 can rely on a verification solely because it once existed, without evaluating the temporal validity of its supporting evidence, the system can convert historical support into current support.

That would violate:

```
claim strength ≤ evidence strength
```

and the existing invariant that expired evidence cannot silently remain current.

---

## F2 — Historical verification deleted when evidence expires

**RED**

Deleting or rewriting the historical verification would destroy provenance.

The model's historical/audit principles reject this.

The correct semantic boundary must preserve:

```
what was verified
when it was verified
what evidence supported it
when that evidence ceased to be current
```

without deciding here how long records must legally be retained.

---

## F3 — Readiness remains current after material evidence expiry

**RED**

If Opportunity Readiness evaluated at T3 continues to be represented as current at T5 solely because no explicit recomputation occurred, the model's own point-in-time/staleness rule is violated.

The issue is not that the historical readiness evaluation was necessarily wrong.

The issue is that its temporal applicability has changed.

---

## F4 — Fresh replacement evidence silently overwrites old evidence

**RED**

A replacement clearance must not erase the expired clearance or silently rewrite the verification history.

The historical chain must remain reconstructable.

---

## F5 — Evidence has expiry but no usable temporal semantics

**RED / DOMAIN GAP**

Merely storing an expiry date is insufficient if downstream verification and derived-state semantics cannot use that date.

This is a key witness result:

> **Temporal metadata is not temporal integrity unless downstream claims are constrained by it.**

---

## F6 — No expiry supplied where freshness is material

**UNDER-SPECIFIED**

Some evidence is inherently time-sensitive.

The current model permits expiry “where applicable,” but does not define a universal rule for determining when freshness is material.

This witness does not invent that rule.

It identifies it as a future policy/domain question.

---

# 6. Reverse Trace

## Forward trace

```
Evidence
  ↓
Verification
  ↓
Derived Readiness
  ↓
Evidence expires
  ↓
Readiness should become stale
  ↓
New decision requires current support
```

The first three transitions are represented conceptually.

The expiry-to-derived-state transition is only partially specified.

---

## Reverse trace

Starting from a new decision:

```
Decision
  ↓
Readiness evaluation
  ↓
Verification
  ↓
Supporting evidence
  ↓
Evidence effective/expiry state
```

The model can name each conceptual layer.

But it cannot yet fully reconstruct the rule that determines whether the historical verification remains sufficient at the later decision point.

That is the principal seam exposed by Case 4.

---

# 7. What This Witness Does Not Establish

This witness does **not** establish that ScoutSA must implement:

- cascading status changes;
- a particular expiry enum;
- automatic invalidation;
- automatic re-verification;
- event sourcing;
- database triggers;
- scheduled jobs;
- a specific evidence table;
- a specific verification table;
- legal deletion/retention behavior.

Those are implementation or policy decisions.

The witness only establishes the semantic gap.

---

# 8. Candidate Finding

## Candidate T-002 — Temporal Dependency of Verification on Supporting Evidence

**Status:** HYPOTHESIS / NOT RATIFIED

A verification should remain historically reconstructable while its present usability for a later decision must remain constrained by the temporal state of the evidence and other material conditions on which that decision depends.

Minimum semantic question requiring future ratification:

> When supporting evidence becomes expired, stale, revoked, superseded, or otherwise materially unavailable, what relationship exists between the historical verification and a new decision that attempts to rely on it?

The answer must preserve both:

1. historical truth about what was verified at the time; and
2. current uncertainty or insufficiency where the original support no longer satisfies the applicable decision context.

No automatic rule is ratified by this witness.

---

# 9. Provenance Requirement Emerging From Case 4

A material derived state may need to be reconstructable from at least:

```
Subject
Opportunity / Context
Evaluation timestamp
Evaluation rule/version
Material input identifiers
Evidence references
Verification references
Authority / consent state where relevant
Result
Invalidation / staleness cause
```

This is a candidate provenance requirement, not a finalized field list.

---

# 10. Relationship To Earlier Cases

Case 1 exposed:

```
Assertion ≠ Evidence
```

Case 2 exposed:

```
Authority ≠ Consent
```

Case 3 exposed:

```
Historical decision ≠ Current authorization
```

Case 4 now exposes:

```
Historical verification ≠ Current evidentiary sufficiency
```

The emerging chain is therefore:

```
Assertion
  ↓
Authority
  ↓
Evidence
  ↓
Verification
  ↓
Derived State
  ↓
Decision
```

with **time** acting across the entire chain rather than belonging to only one record.

---

# 11. Gate 1 Impact

| Finding | Result |
|---|---|
| Evidence can have expiry | **PASS** |
| Verification has temporal lifecycle | **PASS** |
| Derived readiness has point-in-time semantics | **PASS** |
| Historical state must be preserved | **PASS** |
| Expired evidence cannot silently remain current | **PASS** |
| Historical verification must remain distinguishable from current sufficiency | **PASS AS PRINCIPLE** |
| Exact evidence-expiry → verification usability rule | **RED / GAP** |
| Exact evidence-expiry → derived-state invalidation rule | **RED / GAP** |
| Replacement evidence semantics | **PARTIAL** |
| Freshness requirement when expiry is absent | **UNDER-SPECIFIED** |
| Constitution amendment justified | **NO** |
| Domain-model amendment justified | **NOT YET** |
| Gate 1 closure | **NO** |

---

# 12. Witness Conclusion

**Case 4 = RED / MATERIAL DOMAIN GAP.**

The important discovery is not that ScoutSA forgot an expiry field.

It did not.

The model already knows about:

- evidence expiry;
- verification expiry;
- point-in-time derived state;
- staleness;
- historical preservation.

The missing semantic boundary is the relationship between them.

In other words:

> **ScoutSA currently describes temporal properties of individual records more strongly than it describes temporal propagation across the provenance chain.**

That distinction matters.

The historical verification may remain a valid record of what happened at T2 while no longer being sufficient support for a new decision at T5.

Therefore:

```
Evidence Validity at T2
        ≠
Verification History at T2
        ≠
Current Decision Sufficiency at T5
```

No architecture change is warranted yet.

---

# 13. Gate 1 Ledger Effect

**SCOUTSA-024 — Evidence/Verification Temporal Dependency**

**STATUS:** WITNESSED GAP — NOT RATIFIED

**Finding:** Evidence expiry and verification lifecycle are individually represented, but the temporal dependency governing whether historical verification remains sufficient for later derived state/decisions is not yet explicitly defined.

**Gate:** Gate 1 remains OPEN.

**Next adversarial witness:** Case 5 — Opportunity changes after readiness evaluation.
