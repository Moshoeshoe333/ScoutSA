# Gate 1 Witness — Case 01: Player vs Coach Assertion Conflict

**Status:** Witness result — candidate domain finding, not constitutional ratification  
**Repository:** `Moshoeshoe333/ScoutSA`  
**Branch:** `main`  
**Witness date:** 2026-10-02  
**Method:** 33×3 — Existence / Coherence / Failure  
**Governing principle:** Strength of claim must never exceed strength of evidence.

---

## 1. Point

Determine whether the current ScoutSA Constitution and Domain Model can represent two legitimate, materially conflicting statements about the same Player without:

- collapsing one statement into the other;
- converting an assertion into evidence or truth;
- granting authority beyond scope;
- losing provenance;
- manufacturing a derived position;
- or making a disclosure that cannot later be reconstructed.

### Adversarial case

```text
PLAYER ASSERTION
Position = STRIKER

COACH ASSERTION
Position = MIDFIELDER
```

Assume both actors are real authenticated users and each statement is made at a known time.

This witness deliberately does not decide which statement is true.

---

## 2. Authoritative repository state examined

The witness was run against the committed `main` state containing:

- `docs/00-constitution.md`
- `docs/01-domain-model.md`
- `docs/03-player-passport.md`
- `docs/05-consent-model.md`
- `docs/research/south-african-domain-governance-and-data-quality.md`
- `docs/research/cross-repository-methodology-witness.md`

The relevant domain state explicitly distinguishes Owner, Author, Authority, Verifier, Evidence, Consent, and Derived State.

The Domain Model also states that verification must have a defined subject, claim/scope, authority, evidence basis, timestamp, and status.

No implementation/schema is inferred from the documentation.

---

# 3. 33×3 Witness

## A. EXISTENCE

### A1 — Can the Player statement exist?

**Result: PARTIAL PASS**

The Domain Model has Player as a first-class entity and explicitly permits self-provided facts/assertions.

However, there is no first-class Assertion entity.

**Observation:** the semantic concept can be described, but its durable representation is not yet explicitly modeled.

### A2 — Can the Coach statement exist?

**Result: PARTIAL PASS**

The Domain Model recognizes Coach as a role and recognizes a coach assertion as an example of Evidence.

However, the model does not define a first-class record for the coach's statement itself.

### A3 — Can both statements coexist?

**Result: FAIL / UNPROVEN**

The model contains a Disagreement Preservation invariant as a candidate research finding, but the current core domain model does not provide an explicit Assertion record with independent identity, lifecycle, authority scope, and status.

Therefore the repository does not yet prove that two contradictory assertions can coexist without one being represented as an undifferentiated evidence artifact.

### A4 — Can an assertion exist without evidence?

**Result: UNPROVEN**

The research model proposes that an Assertion may exist without Evidence.

The current Domain Model does not explicitly state this lifecycle.

This matters because a statement made by an actor is itself an epistemic object distinct from an attached supporting artifact.

### A5 — Can evidence support multiple assertions?

**Result: UNPROVEN**

The current model supports evidence references but does not define whether one evidence artifact may support multiple competing assertions while preserving the relationship to each assertion.

---

## B. COHERENCE

### B1 — Is Authority scoped?

**Result: PASS**

The Domain Model explicitly says Authority is actor permission to make a particular assertion and that verification is claim/scope-specific.

A Coach may therefore have authority to assert a football position without thereby becoming authoritative for unrelated identity, medical, guardian, or legal facts.

### B2 — Is Verification scoped?

**Result: PASS**

Verification requires a defined subject, claim/scope, authority, evidence basis, timestamp, and status.

This supports verification of a defined position assertion rather than blanket verification of the Player.

### B3 — Is Evidence distinct from Verification?

**Result: PASS**

The model explicitly states that Evidence does not automatically establish truth and that Verification is a scoped trust assertion.

### B4 — Is Assertion distinct from Evidence?

**Result: FAIL / MATERIAL GAP**

The Domain Model lists “coach assertion” and “organization assertion” as Evidence examples.

That wording permits the semantic object “a statement made by an actor” to be stored conceptually as Evidence, even though the current research direction requires:

```text
Assertion ≠ Evidence
```

A statement may have evidence supporting it; the statement and its supporting artifact are not the same object.

### B5 — Can disagreement be preserved?

**Result: FAIL / UNPROVEN**

There is no explicit current lifecycle or conflict representation for:

```text
Assertion A = STRIKER
Assertion B = MIDFIELDER
Status = MATERIAL DISAGREEMENT
```

The model has not yet specified whether both remain active, disputed, superseded, contradicted, or otherwise stateful.

### B6 — Can a derived primary position be explained?

**Result: PARTIAL PASS**

Football Readiness is defined as derived and evidence-dependent.

However, the current model does not yet specify how a derived “primary position” would identify:

- contributing assertions;
- authority scopes;
- supporting evidence;
- evaluation timestamp;
- evaluation/rule version;
- unresolved disagreement.

Therefore explainability is required in principle but not yet fully witnessed for this case.

### B7 — Does history survive correction?

**Result: PASS IN PRINCIPLE**

The model repeatedly requires historical preservation and rejects silent overwrites.

The cross-repository methodology strengthens this as a non-negotiable control.

The exact Assertion correction lifecycle remains unresolved.

### B8 — Does the model avoid synthetic authority?

**Result: PASS**

Nothing in the current model permits agreement, profile completeness, role possession, or system convenience to manufacture authority.

---

# 4. FAILURE

## F1 — Player assertion is wrong

**Required behavior:** preserve the historical assertion; do not silently delete it merely because later evidence contradicts it.

**Current model:** principle supported.

**Witness result:** PASS IN PRINCIPLE; lifecycle not fully specified.

## F2 — Coach assertion is wrong

Same requirement.

**Witness result:** PASS IN PRINCIPLE; lifecycle not fully specified.

## F3 — Supporting evidence expires

An expired evidence artifact must not silently support a current verification or derived state.

**Current model:** explicit invariant.

**Witness result:** PASS.

## F4 — Coach authority is revoked

A historical coach assertion should remain historically attributable, while current authority should no longer permit new authoritative actions.

**Current model:** role/verification semantics support scoped authority, but assertion lifecycle after authority revocation is not explicit.

**Witness result:** PARTIAL / UNPROVEN.

## F5 — Third party disagrees

Example:

```text
Player: STRIKER
Coach: MIDFIELDER
Academy: STRIKER
```

The model can conceptually name all three sources, but it does not yet define a conflict-resolution state that preserves all three assertions without forcing a premature winner.

**Witness result:** FAIL / MATERIAL GAP.

## F6 — Derived position is already disclosed

Suppose ScoutSA previously disclosed “Primary position: STRIKER” and a later assertion creates a material conflict.

The system needs to know:

- what the earlier derived state was;
- which inputs produced it;
- when it was evaluated;
- which rule version was used;
- what disclosure occurred;
- whether the derived state is now stale.

**Witness result:** PARTIAL / MATERIAL GAP.

## F7 — Evidence exists but supports neither statement decisively

The system must be able to represent uncertainty rather than manufacture a winner.

**Witness result:** FAIL / UNPROVEN.

## F8 — Player and Coach statements agree accidentally

Agreement alone must not transform either statement into truth.

**Witness result:** PASS by governing principle; no synthetic authority.

---

# 5. Reverse Trace

## Decision → Source

A future ScoutSA decision such as:

```text
Primary Position = STRIKER
```

must be traceable:

```text
Decision
→ Derived Position State
→ contributing verification(s)
→ contributing assertion(s)
→ authority scope
→ evidence
→ actor
→ timestamp
→ purpose/context
```

The current Domain Model establishes most vocabulary but does not yet provide the first-class Assertion layer needed to make this trace deterministic.

**Result: FAIL / MATERIAL GAP.**

## Source → Decision

Starting with:

```text
Coach assertion: MIDFIELDER
```

the system must be able to determine:

- whether the coach had authority at that time;
- what evidence supported the assertion;
- whether it was verified;
- whether it conflicted with another assertion;
- whether it contributed to a derived state;
- whether that state was disclosed;
- whether later events made it stale or disputed.

**Result: FAIL / MATERIAL GAP.**

---

# 6. Semantic Boundary Findings

The witness establishes the following distinctions as necessary candidate semantics:

```text
ASSERTION ≠ EVIDENCE
EVIDENCE ≠ VERIFICATION
VERIFICATION ≠ TRUTH
DERIVED STATE ≠ SOURCE DATA
AUDIT ≠ PROOF OF TRUTH
ROLE ≠ UNIVERSAL AUTHORITY
AGREEMENT ≠ TRUTH
```

The first distinction is the most important unresolved seam.

The current model already contains Evidence and Verification, but an actor's statement is currently represented only indirectly.

---

# 7. Candidate Missing Semantic

## E-001 — First-Class Assertion

**Finding:** The current model does not provide a first-class Assertion entity capable of independently representing competing statements about a subject.

### Minimum semantic requirement

An Assertion should be able to identify at least:

- assertion ID;
- subject;
- asserted fact/claim;
- author/actor;
- authority scope;
- assertion timestamp;
- effective period where relevant;
- status;
- provenance;
- supporting evidence references where present;
- purpose/context where relevant.

The exact field model is intentionally **not ratified by this witness**.

### Why this is minimal

The witness does not justify redesigning Player, Coach, Verification, Evidence, or Football Readiness.

It identifies one missing semantic boundary:

```text
statement by actor
        ↓
ASSERTION
        ↓
(optional) supporting EVIDENCE
        ↓
VERIFICATION
        ↓
DERIVED STATE
```

This is smaller than redesigning the entire epistemic model and directly addresses the observed contradiction.

---

# 8. Candidate Conflict Semantics

A first-class Assertion layer also exposes a second unresolved question:

How does ScoutSA represent legitimate disagreement?

Candidate statuses may eventually include concepts such as:

- ACTIVE
- SUPERSEDED
- DISPUTED
- CONTRADICTED
- WITHDRAWN
- EXPIRED

**These are not ratified enums.**

The witness only establishes that the domain requires a way to preserve disagreement and historical state without collapsing it into Boolean truth.

---

# 9. Constitutional Impact

The witness does **not** yet authorize an amendment to:

- `docs/00-constitution.md`
- `docs/01-domain-model.md`

The Constitution's existing Evidence Rule already supports the direction.

The likely constitutional clarification, if later ratified, would be conceptual rather than implementation-specific:

> A statement made by an actor is not itself proof of truth; material assertions, supporting evidence, verification, disagreement, and derived state must remain distinguishable and traceable.

This remains a **candidate**, not constitutional text.

---

# 10. Gate Result

## Gate 1 — Case 1

**Result: RED / MATERIAL DOMAIN GAP**

Not because ScoutSA lacks every relevant concept.

Rather:

> The current model can name the ingredients but cannot yet prove that competing actor assertions are independently representable, authority-scoped, historically preserved, and traceable through verification into a derived decision.

This blocks Gate 1 closure.

It does **not** justify starting Gate 2 ERD design yet.

---

# 11. Next Witnesses

The next adversarial cases should test whether the same Assertion/Authority boundary survives:

1. **Guardian vs Guardian authority conflict**
2. **Consent revoked after prior approval**
3. **Evidence expires after verification**
4. **Opportunity changes after readiness evaluation**
5. **Unverified scout contacts a minor**
6. **Guardian authorizes trial but not media**
7. **Child participation preference conflicts with guardian authorization**
8. **Safeguarding concern against a verified organization user**
9. **Institutional record conflicts with ScoutSA assertion**
10. **Authentic but stale evidence**
11. **Two legitimate authorities make incompatible assertions**
12. **Derived readiness survives withdrawal of a material input**

The cases should be run before any schema/ERD work.

---

## Witness conclusion

The strongest evidenced finding is:

> **ScoutSA needs to distinguish the statement made by an actor from the evidence that supports that statement.**

That distinction is necessary to preserve disagreement without manufacturing certainty.

No broader architecture change is justified yet.

**Gate 1 remains OPEN.**

**Gate 2 remains NOT STARTED.**
