# Gate 1 Witness — Case 8: Guardian Consent Valid, Then GuardianLink Authority Changes

**Status:** Witnessed adversarial case — Gate 1 remains OPEN  
**Case:** 8  
**Scenario:** A Guardian gives valid, in-scope consent for a minor's trial. Before the trial occurs, the GuardianLink authority or status changes.

**Governing rule:** Strength of claim must never exceed strength of evidence.

---

# 1. Point

This witness stress-tests the temporal relationship between:

- historical consent;
- current GuardianLink authority;
- current safeguarding state;
- future opportunity action.

The adversarial question is:

> Does a previously valid consent remain sufficient when the authority of the person who granted it has materially changed before the authorized action occurs?

The witness must preserve:

```
historical consent
    ≠
current guardian authority
    ≠
current authorization
    ≠
historical fact that consent once existed
```

No legal conclusion is made about the effect of a particular parental-responsibility change. The witness tests whether ScoutSA can represent and evaluate the change without silently treating historical consent as permanently authoritative.

---

# 2. Scenario

Player **P** is a minor.

Guardian **G** has an active GuardianLink with authority sufficient for the relevant trial decision.

Opportunity **T** is scheduled for a future date.

At **D1**, G grants consent:

```
Purpose: trial participation
Scope: Opportunity T
Status: GRANTED
Effective: D1
```

At **D2**, before the trial:

```
GuardianLink status/authority changes
```

Possible causes are deliberately abstracted:

- relationship status changes;
- authority scope changes;
- relationship is revoked;
- another authoritative record supersedes the prior state;
- a legal/court-derived restriction becomes effective;
- verification of the relationship is withdrawn.

The witness does not select which cause applies.

At **D3**, the organization attempts to rely on the D1 consent to permit P's participation.

The system must answer:

```
Was consent valid when granted?
        +
Is the grantor's authority still sufficient?
        +
Is the consent still effective?
        +
Has a superseding event changed the authorization state?
        ↓
What may happen now?
```

---

# 3. 33×3 Witness

## 3.1 Existence

### E1 — GuardianLink temporal state

**Observed model support: PASS**

GuardianLink has:

- status;
- effective-from;
- effective-to;
- authority scope;
- evidence reference;
- verification status.

The model therefore recognises that Guardian authority is temporal rather than permanently implied by relationship existence.

### E2 — Consent temporal state

**Observed model support: PASS**

ConsentRecord is:

- versioned;
- effective;
- revocable;
- optionally expiring;
- timestamped.

Historical consent can therefore be preserved.

### E3 — Consent authority

**Observed model support: PASS AS PRINCIPLE**

Consent is granted by an authorized person and cannot exceed the authority of its grantor.

### E4 — Current authorization

**Observed model support: PARTIAL / MATERIAL GAP**

The model clearly distinguishes historical records from current state.

However, it does not yet explicitly define the evaluation rule that determines whether a previously valid consent remains currently effective after a material change in the underlying GuardianLink authority.

### E5 — Superseding event

**Observed model support: PARTIAL**

AuditEvent and historical relationship records can represent events.

The model does not yet define a complete semantic mechanism for determining which later authority event supersedes an earlier consent for a particular purpose.

### E6 — Opportunity context

**Observed model support: PASS**

Opportunity and OpportunityApplication provide the relevant future action context.

### E7 — Guardian authority scope

**Observed model support: PASS**

GuardianLink explicitly includes authority scope.

The unresolved issue is how current scope interacts with an already-issued consent.

---

# 4. Coherence

## C1 — Historical consent must remain historically true

**PASS**

If G validly granted consent at D1, ScoutSA must not rewrite history merely because authority later changed.

```
D1: consent existed
        ≠
D2: consent necessarily remains current
```

This is consistent with the repository's temporal model.

---

## C2 — Historical consent must not automatically become permanent authorization

**PASS AS PRINCIPLE**

Consent is revocable and time-bounded where applicable.

A later authority event therefore cannot be ignored simply because the original consent record remains in history.

---

## C3 — GuardianLink authority must be evaluated at the relevant action time

**MATERIAL GAP**

The model records effective periods and authority scope, but does not yet specify the temporal evaluation rule for a future action.

The unresolved question is:

> Which authority state controls when the action occurs?

The witness does not invent the answer.

---

## C4 — Consent and authority must remain separate

**PASS**

The domain model already distinguishes:

```
Guardian relationship
    ≠
Guardian authority
    ≠
Consent
```

A consent record therefore cannot substitute for the existence of current authority.

---

## C5 — Revocation versus authority change must remain distinguishable

**PASS AS PRINCIPLE**

A Guardian may revoke consent.

Separately, the authority underlying a previously issued consent may change.

These are different domain events and should not be collapsed merely because both can alter current authorization.

---

## C6 — Supersession must not erase historical evidence

**PASS**

The temporal model explicitly preserves historical relationships and consent history.

A later state should supersede current applicability without deleting the earlier record.

---

## C7 — A future trial must not rely blindly on stale authority

**RED IF ALLOWED**

If a material GuardianLink authority change occurs before the trial and the system nevertheless treats the old consent as automatically sufficient without evaluating the changed authority state, the system would be using historical authorization as though it were current authorization.

---

## C8 — Current authority change must not rewrite what happened earlier

**PASS**

If the consent was legitimately recorded at D1, the later change must not cause the historical record to claim that no consent ever existed.

This protects auditability and temporal truth.

---

## C9 — Multiple GuardianLinks must not be collapsed into one undefined current Guardian

**MATERIAL GAP**

The model already treats GuardianLink as a separate relationship.

A future implementation must not silently assume:

```
one Player
    =
one Guardian
```

or that the newest relationship automatically invalidates every prior authority without evaluating scope and effective dates.

No such rule is ratified here.

---

# 5. Failure

## F1 — Old consent automatically authorizes future trial

**RED**

The system sees:

```
ConsentRecord = GRANTED
```

and ignores:

```
GuardianLink authority changed
```

This collapses historical consent into current authorization.

---

## F2 — GuardianLink changes but consent history is deleted

**RED**

This destroys evidence of what the system previously observed.

The correct conceptual distinction is:

```
historical consent
    = preserved fact
```

while:

```
current authorization
    = separately evaluated state
```

---

## F3 — Authority changes but consent record is silently rewritten

**RED**

A historical record must not be mutated merely to make the current state appear simpler.

---

## F4 — Authority is restored later and old consent is automatically revived

**RED / TEMPORAL GAP**

A later restoration of authority does not logically establish whether the earlier consent should automatically become current again.

The system must distinguish:

```
authority restored
    ≠
old consent automatically reactivated
```

Whether reactivation is permitted is a future policy/legal decision.

---

## F5 — Consent remains valid solely because its expiry date has not passed

**RED / AUTHORITY GAP**

An unexpired consent is not necessarily sufficient if the grantor's authority has materially changed.

Temporal validity of the consent and current authority of the grantor are separate dimensions.

---

## F6 — New Guardian authority automatically rewrites old consent

**RED**

A new or changed GuardianLink should not silently rewrite the historical fact that another authorized actor previously granted consent.

The current authorization effect must be evaluated without falsifying history.

---

## F7 — Organization relies on a screenshot/export of old consent

**RED / EVIDENCE GAP**

A historical representation of consent does not necessarily establish current authorization.

The system should distinguish the evidence artifact from the current state derived from applicable records.

---

## F8 — No audit event records the authority change

**RED / AUDIT GAP**

If an authority change materially affects a protected workflow, the event must be reconstructable.

The model already defines AuditEvent, but the exact required provenance chain remains unresolved.

---

## F9 — Trial attendance occurs after authority change with no current-state evaluation

**RED / MATERIAL DOMAIN GAP**

This is the central failure mode.

The system has enough concepts to know that both records exist, but not yet enough explicit semantics to guarantee that their temporal relationship is evaluated correctly.

---

## F10 — AI or derived readiness state treats historical consent as current authority

**RED**

A derived state must not silently promote historical consent into present authorization.

This follows the anti-model:

```
Derived state
    ≠
source of truth
```

and the broader principle:

```
historical evidence
    ≠
current authorization
```

---

# 6. Reverse Trace

Starting from a trial attendance authorization at D3:

```
Trial attendance
  ↓
Opportunity T
  ↓
Current authorization decision
  ↓
Current GuardianLink
  ↓
Guardian authority scope
  ↓
Historical ConsentRecord
  ↓
Consent purpose/scope/time
  ↓
Superseding/revocation events
  ↓
Applicable evidence
  ↓
Decision timestamp
  ↓
AuditEvent
```

The critical question is whether the chain can answer:

> Why was this consent still authoritative at the moment the protected action occurred?

The current model can represent the component records.

It does not yet specify the complete temporal precedence rule needed to guarantee the answer.

---

# 7. What This Witness Does Not Establish

This witness does **not** establish:

- that every GuardianLink change automatically revokes every prior consent;
- that a new Guardian automatically overrides a previous Guardian;
- that every court/relationship change has identical technical consequences;
- that consent must always be re-collected after an authority change;
- a specific precedence algorithm;
- a specific event type;
- a specific database schema;
- an RLS policy;
- a legal determination about parental responsibility;
- automatic consent reactivation after authority restoration.

It establishes only that historical consent, current authority, and current authorization must remain distinguishable and temporally evaluable.

---

# 8. Candidate Findings

## S-007 — Temporal Authority Evaluation

**STATUS:** HYPOTHESIS / NOT RATIFIED

A protected action should evaluate the relevant authority state at the action's effective time rather than relying solely on the existence of a historical consent record.

Minimum future question:

> What temporal rule determines whether the grantor of a consent still possessed sufficient authority when the protected action occurred?

No algorithm is selected.

---

## S-008 — Consent Supersession Boundary

**STATUS:** HYPOTHESIS / NOT RATIFIED

ScoutSA should distinguish:

```
consent granted
consent revoked
authority changed
authority superseded
consent expired
current authorization evaluated
```

These events may interact, but they should not be collapsed into one historical record.

---

## S-009 — Non-Rewriting Temporal Integrity

**STATUS:** HYPOTHESIS / NOT RATIFIED

A later authority change must alter the interpretation of current authorization without rewriting historical evidence of earlier consent or GuardianLink state.

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

Case 8 adds:

```
Historical consent
    ≠
Current authority
    ≠
Current authorization
```

The temporal integrity chain now becomes:

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
Disclosure
  ↓
Audit
```

The emerging rule is:

> **A historical permission remains evidence of what was granted; it is not automatically proof of what is authorized now.**

---

# 10. Gate 1 Impact

| Finding | Result |
|---|---|
| GuardianLink has temporal state | **PASS** |
| Guardian authority is scoped | **PASS** |
| Consent is versioned and temporal | **PASS** |
| Consent is revocable | **PASS** |
| Historical consent can be preserved | **PASS** |
| Consent cannot exceed grantor authority | **PASS** |
| Current authority is conceptually distinct from historical consent | **PASS AS PRINCIPLE** |
| Exact temporal precedence between GuardianLink and ConsentRecord | **PARTIAL / MATERIAL GAP** |
| Authority change versus consent revocation | **PASS AS DISTINCTION** |
| Supersession semantics | **PARTIAL / GAP** |
| Multiple GuardianLink temporal interaction | **PARTIAL / GAP** |
| Current authorization reconstruction after authority change | **MATERIAL GAP** |
| Audit provenance for authority-change effect | **PARTIAL / GAP** |
| Historical records remain non-rewritten | **PASS AS PRINCIPLE** |
| Constitution amendment justified | **NO** |
| Domain-model amendment justified | **NOT YET** |
| Gate 1 closure | **NO** |

---

# 11. Witness Conclusion

**Case 8 = RED / MATERIAL DOMAIN GAP.**

The current model correctly contains the necessary ingredients:

```
GuardianLink
ConsentRecord
authority scope
effective dates
revocation
historical preservation
AuditEvent
```

The adversarial case exposes the missing temporal semantics connecting them.

The unresolved question is not:

> “Was consent ever granted?”

It is:

> **“Was the relevant consent still authoritative for this purpose, for this Player, at the moment this protected action occurred?”**

Therefore:

```
Consent granted
    ≠
Consent currently applicable
    ≠
Current Guardian authority
    ≠
Current authorization
```

No Constitution amendment is warranted.

No Domain Model amendment is ratified.

No schema is introduced.

No implementation is introduced.

**Gate 1 remains OPEN.**

---

# 12. Gate 1 Ledger Effect

**SCOUTSA-028 — Temporal Guardian Authority / Consent Boundary**

**STATUS:** WITNESSED GAP — NOT RATIFIED

**Finding:** ScoutSA already models GuardianLink authority as scoped and temporal and ConsentRecord as versioned, revocable and purpose-bound. Case 8 demonstrates that these concepts cannot safely be evaluated by record existence alone. A material change in GuardianLink authority before a protected action creates a temporal authorization seam: historical consent must remain preserved as historical evidence while current authorization must be evaluated against the authority state applicable at the action time. The exact supersession/precedence semantics are not yet defined.

**Gate:** Gate 1 remains OPEN.

**Next adversarial witness:** Case 9 — Two Guardians hold legitimate but incompatible authority scopes.
