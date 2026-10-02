# Gate 1 Witness — Case 7: Guardian Authorizes Trial but Not Media

**Status:** Witnessed adversarial case — Gate 1 remains OPEN  
**Case:** 7  
**Scenario:** Guardian authorizes participation in a football trial but does not authorize media capture, publication, or sharing beyond the trial purpose.

**Governing rule:** Strength of claim must never exceed strength of evidence.

---

# 1. Point

This witness tests whether ScoutSA's **granular, purpose-bound consent model** survives a split authorization:

- Guardian permits the minor to participate in a defined trial;
- Guardian does **not** permit media capture/publication/sharing for that trial;
- the organization/scout nevertheless wants to photograph, record, upload, or share the Player's image/video.

The adversarial question is:

> Can authorization for one opportunity purpose be silently promoted into authorization for a separate media purpose?

The witness must preserve the distinction between:

```
trial participation
    ≠
media capture
    ≠
media publication
    ≠
media sharing
    ≠
public discovery
    ≠
commercial/reputational use
```

No legal conclusion is made merely from this witness. Applicable law, lawful basis, authority, child-protection requirements, contractual terms, and product policy must remain separately evaluated.

---

# 2. Scenario

Player **P** is a minor.

Guardian **G** has an active GuardianLink with sufficient authority for the relevant opportunity decision.

Organization **O** publishes Opportunity **T**, a football trial.

ScoutSA records a ConsentRecord from G:

```
Purpose: trial participation
Status: GRANTED
Scope: Opportunity T
Effective: current trial period
```

The same Guardian explicitly declines media permission:

```
Purpose: media capture/publication/sharing
Status: DENIED
Scope: Opportunity T
```

The following events are then attempted:

### T1 — Trial authorization

P is permitted to attend/participate in T.

### T2 — Media capture

O records photographs or video of P during T.

### T3 — Internal media retention

O retains the media after the trial.

### T4 — Restricted sharing

O shares the media with selected scouts/coaches.

### T5 — Public publication

O publishes the media on a website or social platform.

### T6 — Secondary use

O later uses the media for promotion, scouting campaigns, advertising, or another opportunity.

The witness asks whether ScoutSA can distinguish each purpose and prevent the original trial authorization from being silently reused.

---

# 3. External Legal/Policy Context

This witness does **not** turn legal principles into automatic product rules.

South Africa's POPIA provides that personal information must be collected for a specific, explicitly defined and lawful purpose, and its further-processing provisions require compatibility with the original purpose or another applicable basis. urlProtection of Personal Information Act 4 of 2013 — South African Governmenthttps://www.gov.za/documents/protection-personal-information-act

POPIA also contains special provisions concerning personal information of children. Section 34 establishes a prohibition subject to section 35, while section 35 identifies circumstances in which processing may be authorised, including prior consent of a competent person and specified statutory exceptions. urlPOPIA Section 35 — LawLibraryhttps://lawlibrary.org.za/akn/za/act/2013/4/eng@2013-11-26/provision/chp_3__part_C__sec_35__subsec_1

The South African Children's Act recognises parental responsibilities and rights, including responsibilities and rights concerning care, guardianship and specified consents, while also providing that those responsibilities/rights can be scoped, restricted or otherwise affected by law or court order. urlChildren's Act 38 of 2005 — South African Governmenthttps://www.gov.za/documents/childrens-act

These sources support the need for careful purpose, authority and child-protection analysis. They do **not**, by themselves, establish a universal rule that every football photograph, recording, trial, publication or contact event has one identical consent requirement.

---

# 4. 33×3 Witness

## 4.1 Existence

### E1 — Minor Player

**Observed model support: PASS**

The Player model explicitly recognises minor safeguarding requirements.

### E2 — Guardian relationship

**Observed model support: PASS**

GuardianLink contains relationship, authority scope, status, effective dates, evidence reference and verification status.

### E3 — Opportunity

**Observed model support: PASS**

Opportunity is a first-class entity with contextual requirements.

### E4 — Trial participation

**Observed model support: PASS**

Opportunity and OpportunityApplication support trial participation as an opportunity interaction.

### E5 — ConsentRecord

**Observed model support: PASS**

ConsentRecord is explicitly:

- versioned;
- purpose-specific;
- revocable;
- temporally bounded;
- authority constrained.

The Domain Model gives examples including:

- opportunity/trial participation;
- media sharing.

This is directly relevant.

### E6 — Media

**Observed model support: PASS**

Media is a first-class domain entity.

The model recognises:

- uploader/rights-holder;
- Player/Guardian permissions;
- visibility;
- lifecycle;
- retention;
- source;
- uploader;
- timestamp.

It also explicitly states that media visibility is consent-dependent, especially for minors.

### E7 — Public/discovery visibility

**Observed model support: PASS**

The model separates public/discoverable visibility from restricted access and protected information.

### E8 — Purpose separation

**Observed model support: PASS AS PRINCIPLE**

The Domain Model states that consent is granular and purpose-bound.

Therefore:

```
trial consent
≠
media consent
```

### E9 — Capture versus publication

**Observed model support: PARTIAL / GAP**

The model recognises Media and consent-dependent visibility, but it does not yet explicitly establish whether these are separate authorization purposes:

```
capture
≠
retain
≠
internal sharing
≠
external sharing
≠
publication
≠
secondary use
```

The distinction is semantically important, but the precise granularity remains unratified.

---

# 5. Coherence

## C1 — Trial consent must not imply media consent

**PASS**

The existing ConsentRecord model is purpose-bound.

A granted trial purpose cannot logically be treated as proof of a separately granted media purpose.

---

## C2 — Media denial must remain effective

**PASS AS PRINCIPLE**

If a valid ConsentRecord explicitly denies media use within its scope, the denial must not be silently overridden by the existence of a separate trial authorization.

The witness does not decide which legal actor may issue that denial; it tests whether the system can preserve the distinction once the authoritative state exists.

---

## C3 — Guardian authority must remain scoped

**PASS**

GuardianLink contains authority scope.

A Guardian relationship alone does not establish unrestricted authority over every Player-related purpose.

---

## C4 — Consent must not exceed grantor authority

**PASS**

The existing ConsentRecord invariant states:

> A consent record cannot grant access beyond the authority of its grantor.

This prevents the system from treating every Guardian action as universally authoritative.

---

## C5 — Trial attendance must not create implied media permission

**PASS AS PRINCIPLE**

The fact that a minor physically attends a trial does not, by itself, establish that the organization may treat participation as permission for unrelated media use.

This is consistent with the repository's broader distinction:

```
presence
≠
consent
≠
authorization
```

---

## C6 — Media capture and publication must not be silently collapsed

**MATERIAL GAP**

The current model identifies Media and visibility, but does not yet fully define whether capture, retention, sharing and publication are independent purposes.

This is a semantic gap rather than a reason to invent an enum immediately.

---

## C7 — Public visibility must not override a media denial

**RED IF ALLOWED**

If a Guardian has denied the applicable media purpose, the fact that the Player attended a public or semi-public trial must not be treated as automatic permission for publication.

The system must not manufacture consent from environmental visibility.

---

## C8 — Internal sharing must not automatically equal public publication

**MATERIAL GAP**

A future media authorization model may distinguish:

```
private operational use
    ≠
restricted scouting share
    ≠
organization publication
    ≠
public social publication
    ≠
commercial use
```

The witness does not select the final taxonomy.

---

## C9 — Secondary use must be separately evaluated

**PASS AS PRINCIPLE / SEMANTIC GAP**

A media artifact captured for one defined purpose cannot automatically be assumed authorised for an unrelated future purpose.

POPIA's purpose-specific collection and further-processing provisions reinforce why the distinction requires explicit analysis, although the legal basis for a particular use must be determined separately. urlPOPIA Section 13 — LawLibraryhttps://lawlibrary.org.za/akn/za/act/2013/4/eng@2013-11-26/provision/chp_3__part_A__sec_13

---

# 6. Failure

## F1 — Guardian approves trial → system marks media approved

**RED**

This collapses two distinct purposes.

```
trial participation
        ↓
incorrect inference
        ↓
media authorization
```

That violates the existing purpose-bound consent invariant.

---

## F2 — Guardian denies media → organization publishes anyway

**RED**

Where the denied purpose is applicable and authoritative, publication cannot be justified merely by pointing to trial participation.

---

## F3 — Guardian denies public publication but system permits social publication

**RED / GAP**

This would be a failure if the system treats publication as one purpose while the policy actually distinguishes public/social publication from another media purpose.

The witness therefore requires explicit purpose semantics before implementation.

---

## F4 — Media is captured because the Player is physically present

**RED IF CAPTURE REQUIRES THE DENIED AUTHORIZATION**

Physical presence must not be used as a substitute for the applicable authorization basis.

The witness does not itself determine whether a particular capture is legally permitted under every circumstance.

---

## F5 — Media is captured for trial administration and later reused for promotion

**RED / SECONDARY-PURPOSE GAP**

The later use is not automatically the same purpose as the original trial administration.

A separate authorization/basis decision must be reconstructable.

---

## F6 — Media shared with a scout because the scout is verified

**RED / AUTHORIZATION GAP**

Scout verification does not itself establish the Player's media authorization.

This connects Case 7 to Case 6:

```
Scout verification
≠
media authorization
```

---

## F7 — Publicly visible trial treated as public-media permission

**RED IF ALLOWED**

Public or discoverable context does not automatically convert the Player into a freely reusable media subject.

---

## F8 — Consent revocation ignored after capture

**RED / TEMPORAL GAP**

The model already recognises revocable consent and historical preservation.

A future implementation must distinguish:

```
historical fact:
media was captured
        ≠
current authorization:
media may still be used
```

This directly extends Case 3.

---

## F9 — Historical media permission survives a later denial

**RED**

A superseded or revoked authorization must not silently remain the current basis for continued use.

---

## F10 — No provenance showing why media use was permitted

**RED / MATERIAL DOMAIN GAP**

A protected media action should be reconstructable from at least the relevant conceptual chain:

```
Player
  ↓
Guardian authority
  ↓
Consent/basis
  ↓
Purpose
  ↓
Scope
  ↓
Time
  ↓
Media action
  ↓
Recipient / visibility
  ↓
Audit
```

The exact schema is not ratified.

---

# 7. Reverse Trace

Starting from a published image/video:

```
Published media
  ↓
Which Player?
  ↓
Who captured it?
  ↓
When?
  ↓
For what original purpose?
  ↓
What authority permitted the action?
  ↓
What Guardian authority existed?
  ↓
What consent/basis applied?
  ↓
Was media publication within scope?
  ↓
Was the authorization current?
  ↓
Who received/accessed it?
  ↓
What secondary processing occurred?
  ↓
What audit event records the decision?
```

The current model can represent many of these concepts independently.

It cannot yet guarantee that a future implementation can reconstruct the entire chain without introducing additional authorization semantics.

---

# 8. What This Witness Does Not Establish

This witness does **not** establish:

- that every football trial requires a Guardian's media consent;
- that every photograph of a minor is legally prohibited without a particular consent form;
- that one specific legal basis applies to every media use;
- that capture and publication must necessarily be separate consent records;
- that media can never be shared internally;
- that public events eliminate privacy obligations;
- a specific media enum;
- a specific RLS policy;
- a specific database schema;
- a particular retention period;
- a specific safeguarding workflow.

It establishes only that the domain model must not silently convert authorization for one purpose into authorization for another.

---

# 9. Candidate Findings

## S-004 — Purpose-Separated Opportunity Consent

**STATUS:** HYPOTHESIS / NOT RATIFIED

A consent or authorization for opportunity participation must remain distinguishable from authorization for media-related purposes.

Minimum future question:

> What purpose/scope model allows ScoutSA to prove that a specific media action was or was not covered by the applicable authorization?

No schema is selected.

---

## S-005 — Media Purpose Boundary

**STATUS:** HYPOTHESIS / NOT RATIFIED

ScoutSA should preserve a semantic distinction between the media lifecycle and the authorization basis for each relevant action.

Potential conceptual stages include:

```
capture
retention
internal access
restricted sharing
publication
secondary use
```

These are investigative dimensions, not ratified enum values.

---

## S-006 — Revocable Media Authorization

**STATUS:** HYPOTHESIS / NOT RATIFIED

A future authorization model should preserve the difference between:

```
historical authorization
        ≠
current authorization
```

A revocation should alter the current state without rewriting history.

This extends Case 3.

---

# 10. Relationship To Earlier Cases

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
Historical readiness ≠ Current readiness for changed Opportunity context
```

Case 6:

```
Visibility ≠ Authority to contact
```

Case 7 extends the chain:

```
Purpose A authorization
        ≠
Purpose B authorization
```

The emerging integrity chain is:

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
Disclosure
  ↓
Audit
```

The core principle is:

> **Permission is not transferable merely because two actions occur in the same opportunity.**

---

# 11. Gate 1 Impact

| Finding | Result |
|---|---|
| Minor status is recognised | **PASS** |
| Guardian relationship is scoped | **PASS** |
| Opportunity/trial exists as a domain context | **PASS** |
| ConsentRecord is purpose-bound | **PASS** |
| ConsentRecord is revocable | **PASS** |
| Media is a first-class entity | **PASS** |
| Media visibility is consent-dependent | **PASS AS PRINCIPLE** |
| Trial authorization ≠ media authorization | **PASS** |
| Media purpose granularity is fully specified | **PARTIAL / GAP** |
| Capture vs publication distinction | **PARTIAL / GAP** |
| Restricted sharing vs publication distinction | **PARTIAL / GAP** |
| Secondary media use semantics | **PARTIAL / GAP** |
| Media authorization provenance fully reconstructable | **MATERIAL GAP** |
| Revocation versus historical media state | **PASS AS PRINCIPLE / IMPLEMENTATION UNPROVEN** |
| Constitution amendment justified | **NO** |
| Domain-model amendment justified | **NOT YET** |
| Gate 1 closure | **NO** |

---

# 12. Witness Conclusion

**Case 7 = RED / MATERIAL DOMAIN GAP.**

The existing model survives the first-order test because it already states:

```
Consent is granular.
Consent is purpose-bound.
Consent is revocable.
Consent cannot exceed the grantor's authority.
Media is consent-dependent, especially for minors.
```

The adversarial case exposes the next semantic seam:

```
trial authorization
        ≠
media authorization
        ≠
publication authorization
        ≠
secondary-use authorization
```

The model currently expresses the principle but does not yet fully define the authorization semantics required to reconstruct each media action.

Therefore:

```
Opportunity Consent
  ≠
Media Consent
  ≠
Publication Authorization
  ≠
Secondary Use Authorization
```

No Constitution amendment is warranted by this witness.

No Domain Model amendment is ratified.

No schema is introduced.

No implementation is introduced.

**Gate 1 remains OPEN.**

---

# 13. Gate 1 Ledger Effect

**SCOUTSA-027 — Purpose-Separated Media Authorization Boundary**

**STATUS:** WITNESSED GAP — NOT RATIFIED

**Finding:** The current ScoutSA model correctly defines consent as granular, purpose-bound, revocable and authority-constrained, and it separately models Opportunity and Media. Case 7 demonstrates that trial participation authorization cannot safely be treated as media capture, publication, sharing, or secondary-use authorization. The repository does not yet fully define the purpose/scope semantics needed to reconstruct those media actions and their authorization basis.

**Gate:** Gate 1 remains OPEN.

**Next adversarial witness:** Case 8 — Guardian consent is valid, then GuardianLink authority changes before the trial.
