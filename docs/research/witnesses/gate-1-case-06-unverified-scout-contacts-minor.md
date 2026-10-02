# Gate 1 Witness — Case 6: Unverified Scout Contacts Minor

**Document:** `docs/research/witnesses/gate-1-case-06-unverified-scout-contacts-minor.md`  
**Status:** Gate 1 witness — adversarial domain test  
**Scope:** Implementation-independent ScoutSA domain model  
**Governing principle:** Strength of claim must never exceed strength of evidence.

---

## 1. Witness Point

Test whether ScoutSA can preserve the distinct boundaries between:

- a User who identifies or claims a Scout role;
- role assignment and external/professional verification;
- Player/minor status;
- discovery visibility;
- contact authorization;
- consent;
- guardian authority;
- safeguarding controls;
- access to restricted information;
- opportunity-specific authorization;
- auditability.

### Adversarial condition

A User presents or claims to be a Scout.

The User is not externally verified as a Scout.

The User discovers a minor Player through an allowed discovery surface and attempts direct contact.

The witness asks:

> Can ScoutSA allow legitimate discovery without silently converting visibility, role labels, or profile existence into authorization to contact a minor or access protected information?

This is a semantic witness only. It does not prescribe a schema, API, UI, workflow implementation, or legal consent rule.

---

# 2. Scenario

Assume:

### T1 — Player exists

Player P is a minor.

P has a Player Passport containing football-related discovery information.

Some fields are discoverable under the product's visibility policy.

Restricted fields include guardian/contact details and other protected information.

### T2 — Scout User exists

User S registers or is assigned the conceptual role:

`SCOUT`

The current Domain Model states that a role assignment does not by itself verify the person's external professional status.

No external Scout verification is present.

### T3 — Discovery

S can see P through a permitted discovery surface.

This establishes, at most, that S may see information classified for that discovery purpose.

### T4 — Contact attempt

S attempts to contact P directly, requests private contact details, or initiates a contact request involving the minor.

No applicable guardian gate, consent state, safeguarding authorization, or opportunity-specific authorization has yet been established.

### T5 — Protected information request

S attempts to obtain restricted guardian/contact/academic/medical information.

The witness must determine whether the domain model distinguishes:

```
Can discover Player
        ≠
Can contact Player
        ≠
Can access restricted information
        ≠
Can create an opportunity interaction
        ≠
Can make a protected disclosure
```

---

# 3. 33×3 Witness

## 3.1 Existence

### E1 — Scout role

**Observed model support: PASS**

`SCOUT` is an explicit conceptual User role.

The model also states:

> A role assignment does not by itself verify the person's external professional status.

Therefore role and external verification are distinct.

### E2 — Scout verification

**Observed model support: PARTIAL**

The Verification entity supports scoped verification of a defined claim.

The model therefore provides the general mechanism for scoped verification.

However, it does not yet explicitly define:

- what constitutes Scout verification;
- who may verify a Scout;
- whether Scout verification is an identity claim, organization relationship, professional-status claim, or another claim;
- what contact privileges, if any, follow from such verification.

This is not yet a schema gap by itself, but it becomes material when contact authorization depends on Scout status.

### E3 — Minor status

**Observed model support: PASS AS PRINCIPLE**

The Player model explicitly recognizes minor safeguarding requirements.

The Constitution states that for every Player under 18, Guardian is a first-class stakeholder and discovery, contact, and opportunities must respect applicable consent and safeguarding requirements.

The exact legal definition and jurisdiction-specific rules remain outside the Domain Model's authority.

### E4 — Discovery visibility

**Observed model support: PASS**

The model distinguishes visibility from authorization.

Player/Passport visibility is field-level and purpose-specific.

The visibility classes include:

- Public / Discoverable;
- Connected Party;
- Opportunity-Limited;
- Restricted;
- Highly Restricted;
- Audit / Internal.

The safeguarding boundary also explicitly distinguishes discovery from contact authorization.

### E5 — Contact authorization

**Observed model support: PARTIAL / MATERIAL GAP**

The Domain Model names **contact authorization** as distinct from discovery.

It does not yet define the domain object, state, scope, authority, or decision rule by which contact authorization is established or denied.

This becomes material for the witness because the scenario specifically attempts to cross from discovery into contact.

### E6 — Guardian relationship and authority

**Observed model support: PASS AS PRINCIPLE**

GuardianLink has:

- relationship;
- authority scope;
- status;
- effective dates;
- evidence reference;
- verification status.

The model also states that being linked does not grant unrestricted access to all Player data.

### E7 — Consent

**Observed model support: PASS AS PRINCIPLE**

ConsentRecord is:

- versioned;
- purpose-specific;
- revocable;
- temporally bounded;
- authority constrained.

The model expressly says consent cannot be inferred merely from profile existence.

### E8 — Safeguarding boundary

**Observed model support: PASS AS PRINCIPLE**

The Domain Model explicitly states:

> discovery ≠ contact authorization ≠ consent ≠ verification ≠ suitability ≠ acceptance ≠ placement.

This is directly applicable to the witness.

### E9 — Individual authorization within an organization

**Observed model support: PARTIAL / GAP**

Organization administrators have scoped authority.

However, the model does not yet explicitly establish whether an organization-level verification or relationship authorizes an individual Scout User to contact a minor.

Therefore:

```
Verified Organization
        ≠
Every individual acting for that Organization is authorized
```

The exact relationship remains undefined.

---

# 4. Coherence

## C1 — Discovery must not imply contact authorization

**PASS AS PRINCIPLE**

The Domain Model explicitly separates discovery from contact authorization.

Therefore visibility of a minor Player through a discovery surface cannot, by itself, establish permission to initiate protected contact.

---

## C2 — Scout role must not imply contact authority

**PASS AS PRINCIPLE**

The User role `SCOUT` is distinct from authorization.

A role assignment does not itself verify external professional status.

Therefore:

```
SCOUT role
  ≠
verified Scout status
  ≠
contact authorization
```

The final relationship remains under-specified.

---

## C3 — Verification must not become blanket authorization

**PASS AS PRINCIPLE**

The Verification entity is explicitly scoped.

The model states that higher-level verification does not automatically verify unrelated facts.

Therefore even a future verified Scout status cannot logically be treated as blanket authorization to access all Player information or contact every minor.

---

## C4 — Guardian authority must remain distinct from consent

**PASS**

Cases 2 and 3 already established this distinction.

A GuardianLink represents relationship and scoped authority.

A ConsentRecord represents purpose-specific permission.

Neither should silently substitute for the other.

---

## C5 — Consent must remain purpose-bound

**PASS**

Consent for one purpose cannot automatically be expanded to another.

For example:

```
Consent to trial participation
        ≠
Consent to unrestricted media disclosure
        ≠
Consent to unrestricted direct contact
```

The model's granular-consent principle supports this distinction.

The witness does not determine which purposes legally require consent.

---

## C6 — Verified organization must not silently authorize individual contact

**MATERIAL GAP**

The Organization model supports organizational verification and administrator authority.

The User model supports individual roles.

The model does not yet explicitly define the authorization chain:

```
Organization
   ↓
verified relationship
   ↓
individual Scout User
   ↓
specific opportunity/contact scope
```

Without that boundary, an organization-level trust signal could be overextended to an individual actor.

This is a domain authorization gap, not a claim that such delegation must always be prohibited.

---

## C7 — Public/discoverable information must not imply unrestricted republication or contact

**PASS AS PRINCIPLE**

The model explicitly distinguishes visibility from public disclosure.

The research methodology also established that public availability is not equivalent to unrestricted republication.

For this witness, the important distinction is:

```
Visible for discovery
        ≠
permission to obtain restricted contact data
        ≠
permission to republish
        ≠
permission to bypass safeguarding
```

---

## C8 — Minor safeguarding must precede protected contact

**PASS AS PRINCIPLE / IMPLEMENTATION UNPROVEN**

The Player model says minor safeguarding requirements must be satisfied before protected discovery/contact flows are enabled.

The Constitution likewise requires contact to respect applicable consent and safeguarding requirements.

However, the repository currently contains domain documentation, not implementation evidence.

Therefore the semantic requirement exists, while implementation enforcement is unproven.

---

## C9 — Contact authorization must be opportunity/context scoped where applicable

**MATERIAL GAP**

The model already treats Opportunity Readiness and OpportunityApplication as contextual.

It does not yet explicitly state whether contact authorization can be:

- general;
- organization-scoped;
- opportunity-scoped;
- purpose-scoped;
- time-limited;
- revocable.

The witness therefore identifies scope semantics as unresolved rather than selecting one.

---

# 5. Failure

## F1 — Unverified Scout directly contacts minor solely because the Player is discoverable

**RED**

This would collapse:

```
discovery → contact authorization
```

and violate the explicit safeguarding boundary.

---

## F2 — Scout role badge treated as proof of external Scout status

**RED**

A role assignment is not external verification.

Presenting the role as established professional status would exceed the evidence supporting the claim.

---

## F3 — Verified Scout automatically receives guardian/contact information

**RED**

Verification is scoped.

Even a verified Scout claim does not establish authorization to access unrelated restricted information.

---

## F4 — Verified organization automatically authorizes every individual Scout

**RED / DOMAIN GAP**

This would silently promote organization-level authority into individual contact authority.

The current model does not define the delegation chain sufficiently to support that inference.

---

## F5 — Guardian consent for one purpose reused for another

**RED**

Example:

```
Consent: trial participation
        ↓
system assumes
        ↓
unrestricted direct contact
```

That would violate purpose limitation and the distinction between consent and authorization scope.

---

## F6 — Player profile existence treated as consent to contact

**RED**

Profile existence cannot establish consent.

The ConsentRecord invariants expressly reject inferred consent from profile existence.

---

## F7 — Public contact channel treated as safeguarding clearance

**RED**

The fact that a contact route is technically public does not establish that a minor-specific contact interaction satisfies ScoutSA's safeguarding boundary.

The model must preserve the difference between technical reachability and authorized interaction.

---

## F8 — Guardian absent from the interaction and system silently proceeds

**RED / MATERIAL GAP**

For a minor, the Constitution and Domain Model require applicable guardian/safeguarding gates.

If the system cannot establish the applicable gate before protected contact, it must not manufacture authorization from missing information.

The witness does **not** conclude that every possible contact interaction legally requires guardian consent. It establishes only that the applicable safeguarding/authorization condition must not be silently bypassed.

---

## F9 — Safeguarding concern ignored because Scout is verified

**RED**

Verification of identity or professional status cannot erase a separate safeguarding concern.

This follows the existing boundary:

```
verification ≠ suitability ≠ acceptance
```

A safeguarding signal must remain independently represented and actionable under applicable policy.

---

## F10 — Contact occurs but no durable audit event records the authorization basis

**RED / DOMAIN GAP**

The AuditEvent entity exists and is append-only.

However, the model does not yet explicitly require a contact interaction to preserve enough provenance to reconstruct:

- who initiated contact;
- which Player was involved;
- whether the actor was verified;
- what authority scope applied;
- what consent/safeguarding state applied;
- what visibility/contact basis permitted the action;
- when the action occurred;
- what protected information, if any, was disclosed.

Without this chain, post-event reconstruction may be incomplete.

---

# 6. Reverse Trace

## Forward trace

```
User S
  ↓
Scout role / verification state
  ↓
Player P is discoverable
  ↓
Contact request
  ↓
Applicable authority / consent / safeguarding checks
  ↓
Authorized or blocked interaction
  ↓
Restricted disclosure only within permitted scope
  ↓
Audit event
```

The model contains most conceptual layers.

The weak point is the exact authorization transition between discovery and contact.

---

## Reverse trace

Starting from a contact event:

```
Contact event
  ↓
Who initiated?
  ↓
What Scout role/status existed?
  ↓
What organization relationship existed?
  ↓
What contact authority/scope existed?
  ↓
What guardian authority existed?
  ↓
What consent/lawful basis/safeguarding condition applied?
  ↓
What Player fields were visible?
  ↓
What was disclosed?
  ↓
Why was the interaction permitted?
```

The current model cannot yet guarantee complete reconstruction of that chain.

The principal missing semantic object is not necessarily a single database table. It is the **authorization basis and scope for contact**.

---

# 7. What This Witness Does Not Establish

This witness does **not** establish that ScoutSA must implement:

- mandatory guardian approval for every communication;
- a particular legal consent rule;
- a specific Scout verification provider;
- a Scout licensing or accreditation requirement;
- automatic organization-to-Scout delegation;
- a particular contact-request state machine;
- a specific messaging platform;
- automatic blocking technology;
- a specific safeguarding incident workflow;
- a particular database schema or RLS policy.

It also does not make a legal determination about who may contact a minor under South African law.

Those questions require the applicable legal/policy authority and implementation evidence.

---

# 8. Candidate Findings

## Candidate S-001 — Contact Authorization Boundary

**STATUS:** HYPOTHESIS / NOT RATIFIED

ScoutSA should preserve a first-class semantic distinction between:

```
discovery visibility
contact authorization
protected-data access
opportunity participation
```

A Player being discoverable must never by itself establish authorization to contact a minor or access restricted information.

Minimum future question:

> What evidence, authority, scope, purpose, temporal state, and safeguarding condition are sufficient to authorize a particular contact interaction?

No object, enum, workflow, or schema is ratified here.

---

## Candidate S-002 — Individual Scout Authorization

**STATUS:** HYPOTHESIS / NOT RATIFIED

An organization-level verification or relationship should not silently become individual authorization for every User associated with that organization.

Minimum future question:

> What independently reconstructable relationship connects a specific Scout User to the organization, opportunity, or contact scope that permits the interaction?

No delegation model is selected here.

---

## Candidate S-003 — Protected Contact Provenance

**STATUS:** HYPOTHESIS / NOT RATIFIED

A protected contact interaction should be reconstructable from the actor, target, authorization scope, relevant guardian/consent/safeguarding state, purpose/context, time, and resulting disclosure/action.

This extends the existing auditability and evidence principles.

No field list is ratified.

---

# 9. Relationship To Earlier Cases

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

Case 4 exposed:

```
Historical verification ≠ Current evidentiary sufficiency
```

Case 5 exposed:

```
Historical readiness ≠ Current readiness for changed Opportunity context
```

Case 6 extends the chain into actor interaction:

```
Role
  ↓
Verification
  ↓
Visibility
  ↓
Contact Authorization
  ↓
Protected Disclosure
  ↓
Audit
```

The key principle emerging is:

> **Visibility is not authority to act.**

And for minors:

> **Technical reachability is not safeguarding authorization.**

---

# 10. Gate 1 Impact

| Finding | Result |
|---|---|
| Scout is a conceptual User role | **PASS** |
| Role does not itself prove external Scout status | **PASS** |
| Minor status is recognized as safeguarding-relevant | **PASS AS PRINCIPLE** |
| Discovery visibility exists | **PASS** |
| Discovery is distinct from contact authorization | **PASS AS PRINCIPLE** |
| Guardian relationship/authority is scoped | **PASS** |
| Consent is purpose-bound and revocable | **PASS** |
| Verification is scoped | **PASS** |
| Individual Scout contact authorization is explicitly modeled | **PARTIAL / GAP** |
| Organization verification → individual Scout authorization | **RED / GAP** |
| Contact scope/purpose/time semantics | **PARTIAL / GAP** |
| Protected contact provenance is fully reconstructable | **RED / GAP** |
| Public/discoverable data → unrestricted contact | **RED if allowed** |
| Missing safeguarding/authorization state → silent contact | **RED** |
| Verification overrides safeguarding concern | **RED** |
| Constitution amendment justified | **NO** |
| Domain-model amendment justified | **NOT YET** |
| Gate 1 closure | **NO** |

---

# 11. Witness Conclusion

**Case 6 = RED / MATERIAL DOMAIN GAP.**

The current Domain Model already contains an important and correct boundary:

```
discovery
≠
contact authorization
≠
consent
≠
verification
≠
suitability
≠
acceptance
≠
placement
```

The adversarial case shows that this boundary is stated more strongly than the authorization semantics needed to reconstruct an actual protected contact.

The principal unresolved seams are:

1. **What authorizes a specific Scout User to contact a specific minor?**
2. **How is organization-level trust prevented from becoming automatic individual authority?**
3. **What scope, purpose, and temporal conditions attach to contact authorization?**
4. **How can a protected contact be reconstructed after the fact without treating discovery or role assignment as authorization?**

Therefore:

```
Scout Role
  ≠
Scout Verification
  ≠
Discovery Visibility
  ≠
Contact Authorization
  ≠
Protected Data Access
```

No Constitution amendment is warranted by this witness.

No Domain Model amendment is ratified.

Gate 1 remains OPEN.

---

# 12. Gate 1 Ledger Effect

**SCOUTSA-026 — Minor Contact Authorization Boundary**

**STATUS:** WITNESSED GAP — NOT RATIFIED

**Finding:** ScoutSA explicitly distinguishes discovery from contact authorization and recognizes minor safeguarding, scoped verification, guardian authority, and purpose-bound consent. However, the Domain Model does not yet explicitly define the reconstructable authorization basis connecting a specific Scout User to a protected contact interaction, nor the boundary preventing organization-level verification from silently becoming individual contact authority.

**Gate:** Gate 1 remains OPEN.

**Next adversarial witness:** Case 7 — Guardian authorizes trial but not media.
