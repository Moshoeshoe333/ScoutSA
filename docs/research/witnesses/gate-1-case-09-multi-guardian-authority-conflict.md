# Gate 1 Witness — Case 9: Two Legitimate Guardians Hold Incompatible Authority Scopes

**Status:** Witnessed adversarial case — Gate 1 remains OPEN  
**Case:** 9  
**Scenario:** Two Guardians have legitimate GuardianLinks with different, potentially incompatible authority scopes for the same minor and opportunity.

**Governing rule:** Strength of claim must never exceed strength of evidence.

---

# 1. Point

This witness stress-tests whether ScoutSA can represent **multiple legitimate authorities without inventing a universal “primary Guardian,” selecting a winner by relationship label, or collapsing distinct scopes into one authority state**.

The adversarial question is:

> When two legitimate GuardianLinks support different assertions about the same protected action, can ScoutSA preserve each authority's scope, purpose, time, evidence, and conflict state without fabricating a single answer?

The witness preserves:

```
Guardian relationship
    ≠
Guardian authority
    ≠
Consent
    ≠
Current authorization
    ≠
Conflict resolution
```

No legal precedence rule is invented here.

---

# 2. Scenario

Player **P** is a minor.

Guardian **G1** and Guardian **G2** each have a legitimate GuardianLink to P.

Their authority scopes are not identical.

For example, the repository may eventually need to represent distinctions such as:

```
G1 → authority scope A
G2 → authority scope B
```

Opportunity **T** is a defined football trial.

At **D1**:

- G1 provides an authorization relevant to one aspect of T.
- G2 provides an incompatible assertion concerning another protected aspect of T.

The witness deliberately does not assume which Guardian has legal precedence.

Possible differences may concern:

- opportunity participation;
- contact;
- disclosure;
- media;
- transport;
- a particular time period;
- a particular decision scope.

At **D2**, the organization asks ScoutSA:

```
May action X occur now?
```

The system must not answer merely from:

```
Guardian exists
```

or:

```
GuardianLink exists
```

or:

```
latest consent wins
```

It must preserve the authority and evidence boundaries needed to determine whether the action is authorized.

---

# 3. 33×3 Witness

## 3.1 Existence

### E1 — Multiple Guardians

**Observed model support: PASS AS STRUCTURE**

GuardianLink is modeled as a relationship between Player and Guardian rather than as a single mutable Player field.

This permits multiple relationships to exist.

### E2 — Guardian authority scope

**Observed model support: PASS**

GuardianLink contains authority scope.

Therefore:

```
GuardianLink G1
    ≠
GuardianLink G2
```

and their authority need not be identical.

### E3 — Temporal authority

**Observed model support: PASS**

GuardianLink contains effective dates and status.

Authority is therefore not merely a permanent relationship label.

### E4 — Consent

**Observed model support: PASS**

ConsentRecord is versioned, purpose-bound, revocable and authority-constrained.

### E5 — Conflict state

**Observed model support: PARTIAL / MATERIAL GAP**

The model contains the ingredients from which conflicting assertions could be represented, but it does not yet define a domain-level semantic for:

```
two legitimate authorities
+
same protected action
+
incompatible assertions
```

There is no ratified rule that selects a winner.

### E6 — Current authorization

**Observed model support: PARTIAL / MATERIAL GAP**

Current authorization is conceptually distinct from historical consent and authority.

However, the model does not yet specify how incompatible legitimate authority scopes are reconciled for a particular action.

### E7 — Evidence provenance

**Observed model support: PASS AS PRINCIPLE**

Authority and consent records carry evidence references/provenance concepts.

The unresolved issue is how conflicting evidence is surfaced without collapsing it into one assertion.

---

# 4. Coherence

## C1 — Multiple legitimate Guardians must remain representable

**PASS**

The domain model does not require:

```
one Player = one Guardian
```

GuardianLink is a distinct relationship.

---

## C2 — Legitimate relationship does not imply unlimited authority

**PASS**

Guardian authority is explicitly scoped.

Therefore:

```
legitimate Guardian
    ≠
unrestricted authority
```

---

## C3 — Authority scope must be evaluated against the action

**MATERIAL GAP**

The repository does not yet define the complete rule that maps:

```
Guardian authority scope
+
purpose
+
action
+
time
+
Opportunity
```

to current authorization when more than one legitimate Guardian is involved.

---

## C4 — Conflicting assertions must not erase one another

**PASS AS PRINCIPLE / GAP IN SEMANTICS**

The temporal model preserves historical records.

But the domain model does not yet define a conflict representation that can preserve:

```
G1 asserted X
G2 asserted not-X
```

without forcing one assertion to overwrite the other.

---

## C5 — “Latest consent wins” is not a ratified rule

**PASS**

Recency alone does not establish authority precedence.

A later record may be later in time while still being outside the relevant authority scope.

No precedence rule is selected by this witness.

---

## C6 — Relationship labels must not determine precedence by themselves

**PASS AS PRINCIPLE**

The model already states that the exact legal definition of guardian/parental responsibility must be confirmed during jurisdiction-specific legal review.

Therefore ScoutSA must not invent a rule such as:

```
Guardian type X always overrides Guardian type Y
```

without applicable authority and evidence.

---

## C7 — One Guardian's authorization must not silently expand another Guardian's scope

**PASS**

A consent record cannot grant access beyond the grantor's authority.

Therefore:

```
G1 consent
    ≠
G2 authority
```

---

## C8 — Conflict must not be converted into a fabricated positive authorization

**RED IF ALLOWED**

If the system encounters incompatible legitimate authority assertions and simply chooses an affirmative result because one record exists, it risks turning unresolved authority conflict into unauthorized action.

The witness does not define the final disposition.

---

## C9 — Conflict must not be hidden from audit/reconstruction

**MATERIAL GAP**

A protected action involving incompatible authority assertions should leave enough provenance to reconstruct:

- which Guardian asserted what;
- under which scope;
- at what time;
- based on which evidence;
- what current authorization state was determined;
- what unresolved conflict, if any, remained.

The exact event schema is not ratified.

---

# 5. Failure

## F1 — “Primary Guardian” is invented

**RED**

The system creates an unratified single-primary-Guardian rule merely to simplify authorization.

---

## F2 — Latest consent automatically overrides prior authority

**RED / PRECEDENCE GAP**

Recency is not itself authority.

A later assertion must still be evaluated against scope, effective time and evidence.

---

## F3 — Stronger-sounding relationship label automatically wins

**RED**

A relationship label must not substitute for documented authority.

---

## F4 — G1 authorizes trial → G1 automatically authorizes media/contact/disclosure

**RED**

Authority remains purpose- and scope-bound.

---

## F5 — G2 denial is discarded because G1 granted permission

**RED / CONFLICT GAP**

The system must not silently discard a legitimate conflicting assertion before establishing the applicable authority rule.

---

## F6 — G1 denial is discarded because G2 granted permission

**RED / CONFLICT GAP**

The same principle applies in the opposite direction.

---

## F7 — Conflict produces an invented legal conclusion

**RED**

The product must not infer legal precedence where the repository lacks authoritative evidence establishing it.

---

## F8 — Conflict is flattened into one boolean consent field

**RED**

A boolean such as:

```
guardian_consent = true
```

cannot preserve the authority, purpose, scope, time, provenance and conflict conditions tested here.

---

## F9 — AI or derived readiness resolves the conflict silently

**RED**

A derived state must not become an unacknowledged authority source.

AI explanation may describe recorded facts and unresolved state; it must not manufacture precedence.

---

## F10 — Audit records only the final boolean

**RED / AUDIT GAP**

Recording only:

```
AUTHORIZED = true
```

would lose the underlying conflict and make later reconstruction materially weaker.

The decision provenance must remain connected to the underlying assertions and evidence.

---

# 6. Reverse Trace

Starting from a protected action:

```
Protected action
  ↓
Opportunity / purpose
  ↓
Current authorization state
  ↓
Applicable Guardian authority scope(s)
  ↓
GuardianLink(s)
  ↓
Consent/assertion records
  ↓
Effective time
  ↓
Supporting evidence
  ↓
Conflicting assertions
  ↓
Resolution/deferral state
  ↓
Decision timestamp
  ↓
AuditEvent
```

The critical question is:

> Why was this action considered authorized, unauthorized, or unresolved when two legitimate authorities asserted incompatible positions?

The current model can represent many component records.

It does not yet define the conflict semantics required to guarantee a reconstructable answer.

---

# 7. What This Witness Does Not Establish

This witness does **not** establish:

- that one Guardian is legally superior to another;
- that every disagreement requires denial;
- that every disagreement requires re-consent;
- that a particular relationship type has universal precedence;
- that recency determines authority;
- that one Guardian's consent automatically cancels another's;
- a specific conflict enum;
- a specific precedence algorithm;
- a specific database schema;
- a specific RLS policy;
- a specific legal interpretation of parental responsibility;
- an automatic AI resolution mechanism.

It establishes only that ScoutSA must preserve multiple legitimate authority scopes and must not fabricate precedence when incompatible assertions exist.

---

# 8. Candidate Findings

## S-010 — Multi-Guardian Authority Scope

**STATUS:** HYPOTHESIS / NOT RATIFIED

ScoutSA should represent Guardian authority as independently scoped per GuardianLink rather than collapsing all Guardian relationships into one current authority.

Minimum future question:

> What authority scope applies to which protected action, for which purpose, at which time?

No schema is selected.

---

## S-011 — Conflict Preservation

**STATUS:** HYPOTHESIS / NOT RATIFIED

When legitimate authority assertions conflict, ScoutSA should preserve the conflicting assertions and their evidence rather than overwriting one with another.

Minimum future question:

> How should unresolved authority conflict be represented without fabricating a legal or policy outcome?

No enum is selected.

---

## S-012 — No-Invented-Precedence

**STATUS:** HYPOTHESIS / NOT RATIFIED

ScoutSA should not infer authority precedence from:

- relationship labels alone;
- record recency alone;
- verification level alone;
- organizational preference;
- AI inference.

Precedence, where required, must come from applicable authoritative policy/legal evidence.

---

# 9. Relationship To Earlier Cases

Case 1:

```
Assertion ≠ Evidence
```

Case 2:

```
Authority ≠ Consent
```

Case 3:

```
Historical decision ≠ Current authorization
```

Case 4:

```
Historical verification ≠ Current evidentiary sufficiency
```

Case 5:

```
Historical readiness ≠ Current Opportunity context
```

Case 6:

```
Visibility ≠ Authority to contact
```

Case 7:

```
Purpose A authorization ≠ Purpose B authorization
```

Case 8:

```
Historical consent ≠ Current authority ≠ Current authorization
```

Case 9 adds:

```
Multiple legitimate authorities
    ≠
one invented authority
```

The integrity chain now requires:

```
Authority
  ↓
Purpose
  ↓
Scope
  ↓
Time
  ↓
Action
  ↓
Current applicability
  ↓
Conflict state
  ↓
Disclosure
  ↓
Audit
```

---

# 10. Gate 1 Impact

| Finding | Result |
|---|---|
| Multiple GuardianLinks are structurally representable | **PASS** |
| Guardian authority is scoped | **PASS** |
| Guardian authority is temporal | **PASS** |
| Consent is purpose-bound | **PASS** |
| Consent cannot exceed grantor authority | **PASS** |
| Multiple legitimate authority assertions can exist conceptually | **PASS AS STRUCTURE** |
| Exact multi-Guardian conflict semantics | **PARTIAL / MATERIAL GAP** |
| Authority precedence | **UNDEFINED / NOT RATIFIED** |
| Relationship-label precedence | **NOT JUSTIFIED** |
| Recency-only precedence | **NOT JUSTIFIED** |
| Conflict preservation semantics | **PARTIAL / GAP** |
| Current authorization under incompatible scopes | **MATERIAL GAP** |
| Audit reconstruction of conflict | **PARTIAL / GAP** |
| Constitution amendment justified | **NO** |
| Domain-model amendment justified | **NOT YET** |
| Gate 1 closure | **NO** |

---

# 11. Witness Conclusion

**Case 9 = RED / MATERIAL DOMAIN GAP.**

The current model correctly gives ScoutSA the structural ingredients to represent more than one Guardian relationship and scoped authority.

The adversarial case exposes the unresolved semantic boundary:

```
legitimate Guardian A
        +
legitimate Guardian B
        +
different authority scopes
        +
incompatible assertions
        ↓
current authorization?
```

The repository does not yet ratify a rule that answers that question.

Therefore:

```
Multiple legitimate authorities
    ≠
one “primary Guardian”
    ≠
latest assertion wins
    ≠
relationship label wins
    ≠
AI decides
```

The safe epistemic state is to preserve the conflict until applicable authority, policy, and evidence establish how the protected action may proceed.

No Constitution amendment is warranted by this witness.

No Domain Model amendment is ratified.

No schema is introduced.

No implementation is introduced.

**Gate 1 remains OPEN.**

---

# 12. Gate 1 Ledger Effect

**SCOUTSA-029 — Multi-Guardian Authority Conflict Boundary**

**STATUS:** WITNESSED GAP — NOT RATIFIED

**Finding:** ScoutSA already models GuardianLink as a scoped, temporal relationship and ConsentRecord as purpose-bound and authority-constrained. Case 9 demonstrates that multiple legitimate Guardians can produce incompatible assertions without either assertion being safely reducible to a universal “primary Guardian.” The repository does not yet define the semantic rule for reconciling authority scopes, preserving conflict, or determining current authorization without inventing legal precedence.

**Gate:** Gate 1 remains OPEN.

**Next adversarial witness:** Case 10 — Public or organization-held information is discoverable, but the evidence supporting the claim is stale, withdrawn, or no longer sufficient for current opportunity use.
