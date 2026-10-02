# Gate 1 Witness — Case 02: Guardian Authority Conflict

**Status:** Witness result — candidate domain finding, not constitutional ratification  
**Repository:** `Moshoeshoe333/ScoutSA`  
**Branch:** `main`  
**Witness date:** 2026-10-02  
**Method:** 33×3 — Existence / Coherence / Failure  
**Governing principle:** Strength of claim must never exceed strength of evidence.

## 1. Point

Determine whether the current ScoutSA model can represent two legitimate people asserting guardian/parental authority over the same minor without silently selecting one, granting unrestricted authority, or losing temporal and evidentiary history.

### Adversarial case

Assume Player P is a minor.

Guardian A: relationship = parent; scope = opportunity participation + contact.
Guardian B: relationship = legal guardian; scope = medical-information access.

A second variant is deliberately adversarial: Guardian A authorizes trial participation while Guardian B refuses trial participation.

The witness does not decide which person has superior legal authority. It tests whether the domain can represent the conflict and defer the legal determination to the appropriate authority/rule.

## 2. 33×3 Witness

### A. EXISTENCE

**A1 — Multiple GuardianLinks? PASS.** The Domain Model explicitly models GuardianLink with relationship status and effective dates.

**A2 — Scoped guardian authority? PASS.** Guardian authority is explicitly scoped; being linked does not grant unrestricted access.

**A3 — Two guardian authorities coexist? PASS IN PRINCIPLE.** Multiple links can exist, but deterministic handling of overlapping scopes is not defined.

**A4 — Temporal authority? PASS.** GuardianLink includes effective-from/effective-to semantics and status.

**A5 — Authority evidence? PASS IN PRINCIPLE.** GuardianLink includes an evidence reference and verification status; the exact assertion/evidence relationship remains unresolved by Case 1.

### B. COHERENCE

**B1 — GuardianLink equals legal authority? FAIL if interpreted that way.** The model deliberately does not make the legal determination itself.

**B2 — Consent equals authority? PASS.** Consent cannot grant access beyond the authority of its grantor.

**B3 — Guardian status equals consent? PASS.** Consent is explicit, granular, purpose-bound, and revocable.

**B4 — One guardian overrides another by role label? UNPROVEN / GAP.** No deterministic precedence rule exists for two legitimate overlapping authorities.

**B5 — Purpose-specific authority? PASS.** Trial participation, media disclosure, and medical-detail access can remain distinct.

**B6 — Disagreement preserved? PARTIAL.** Separate links and consent records can exist, but the protected action's conflict state is not specified.

**B7 — Historical authority survives revocation? PASS IN PRINCIPLE.** Temporal/revocable records preserve history; exact conflict transitions remain unresolved.

## 3. FAILURE

**F1 — Guardian A authorizes, Guardian B refuses. RED.** The model lacks an explicit state such as authorization contested / legal precedence unresolved. It must not silently choose a winner.

**F2 — Guardian A authority expires. PASS IN PRINCIPLE.** Historical authorization remains evidence, but it must not authorize a new action after expiry.

**F3 — Consent revoked after approval. PASS IN PRINCIPLE.** Current authorization changes while historical evidence remains.

**F4 — Guardian B has medical-only authority. PASS.** That scope must not expand into trial, contact, or media authority.

**F5 — GuardianLink exists but authority is disputed. PASS IN PRINCIPLE.** The system must not manufacture legal certainty from relationship existence; disputed state is not yet modeled.

**F6 — Guardian identity verified but Player-specific authority unverified. PASS.** Identity/role verification is not Player-specific authority.

**F7 — Child preference conflicts with guardian authorization. OPEN LEGAL/DOMAIN QUESTION.** No universal implementation rule should be invented from this witness.

## 4. Reverse Trace

### Decision → Authority

A protected action such as releasing trial attendance/contact details must trace through purpose, applicable consent, granting actor, GuardianLink, authority scope, evidence, effective time, conflict state, and safeguarding rule.

**Result: PARTIAL / MATERIAL GAP.** Most ingredients exist, but explicit conflict resolution does not.

### Authority → Decision

Starting from Guardian A's authorization, the system must determine whether the link was active, the scope covered the purpose, another legitimate authority conflicts, consent remains current, the action remains within purpose, and a safeguarding hold applies.

**Result: PARTIAL / MATERIAL GAP.**

## 5. Candidate Finding

### A-001 — Authority Conflict Resolution

The witness confirms the earlier candidate that ScoutSA needs an explicit semantic boundary for conflicting legitimate authorities.

The minimum semantic requirement is not 'pick a winning guardian.' It is: preserve each authority assertion, scope, time, evidence, and conflict state, then apply a defined rule or authorized human/legal resolution before permitting a protected action.

## 6. Relationship to Case 1

Case 1 found: ASSERTION is not EVIDENCE.

Case 2 adds: AUTHORITY is not ROLE; AUTHORITY is not GuardianLink alone; CONSENT is not AUTHORITY; CONSENT is not VERIFICATION.

Together they support this candidate chain:

SUBJECT → ASSERTION → AUTHORITY / SCOPE → EVIDENCE → VERIFICATION → DERIVED STATE → DECISION → CONTROLLED DISCLOSURE → AUDIT

Cross-cutting constraints: PURPOSE, TIME, VISIBILITY, AUTHORIZATION, CONSENT / LAWFUL BASIS, SAFEGUARDING.

## 7. Gate Result

**Gate 1 — Case 2: RED / MATERIAL DOMAIN GAP.**

The current model correctly establishes scoped GuardianLink and purpose-bound ConsentRecord semantics. It does not yet establish deterministic handling of conflicting legitimate authority.

This does not justify choosing a guardian automatically. It justifies preserving the conflict as a first-class unresolved condition.

**Gate 1 remains OPEN.**
**Gate 2 remains NOT STARTED.**

## 8. Next Adversarial Cases

1. Consent revoked after prior approval.
2. Evidence expires after claim verification.
3. Opportunity changes after readiness evaluation.
4. Unverified scout contacts a minor.
5. Guardian authorizes trial but not media.
6. Child participation preference conflicts with guardian authorization.
7. Safeguarding concern against a verified organization user.
8. Institutional record conflicts with ScoutSA assertion.
9. Authentic but stale evidence.
10. Two legitimate authorities make incompatible assertions.
11. Derived readiness survives withdrawal of a material input.

No ERD/schema expansion should occur before these cases are witnessed.

## Witness conclusion

The strongest evidenced finding is:

> **ScoutSA can represent guardian relationships and scoped permissions, but it cannot yet prove safe behavior when two legitimate authorities disagree about a protected action.**

The required next step is to model the conflict semantically, not to manufacture a precedence rule.

**No constitutional amendment is ratified by this witness.**