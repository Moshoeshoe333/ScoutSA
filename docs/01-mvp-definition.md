# ScoutSA MVP Definition (Draft)

**Document:** `docs/01-mvp-definition.md`  
**Status:** DRAFT — for review against frozen boundaries; not yet ratified  
**Date:** 2026-10-07  

**Authority note:** This document does not authorize schema, RLS, API, UI, migration, or production implementation. Ratification is required before it becomes governing.

---

## 1. Purpose of v1

Prove that a small, consent-controlled loop can turn grassroots player identity into a **genuine, feasible opportunity interaction** in the Vaal / Sedibeng context — without rankings, transfers, or national scope.

North-star questions remain:

1. Can this player play? (Football readiness signals)  
2. Can this player realistically access this opportunity? (Opportunity readiness)

v1 only needs to support enough structure for those questions to be answered in practice for a bounded set of users.

---

## 2. Who v1 is for

**Primary**

- Grassroots coaches / academies in the Vaal Triangle and immediate Sedibeng area  
- Guardians of youth players (under-18) linked to those environments  

**Secondary (tightly bounded)**

- A small number of receiving-side scouts / club or academy staff who already have a legitimate reason to look for players in that geography  

**Not primary for v1**

- National federations, general public, schools as full hubs, agents as a marketplace role, or unaffiliated mass player self-signup without coach/guardian context  

---

## 3. The one user loop

```
Coach and/or Guardian
  → creates or claims Player Passport through an approved workflow
  → attaches minimum evidence / verification signals
  → consent-controlled discoverability (guardian gate where applicable)
  → legitimate opportunity or contact request from an authorized receiving-side actor
  → guardian approval where applicable
  → opportunity / trial outcome recorded
```

The exact User↔Player cardinality, delegation model, receiving-side authorization process, and guardian conflict rules remain governed by their existing operational/legal holds.

If this loop does not work with real people, nothing else in the product matters for v1.

---

## 4. In scope (v1)

- Player Passport (persistent identity; Scout ID concept as specified)  
- Membership link to Organization (club/academy) where applicable  
- Guardian link + purpose-bound consent for minors  
- Bounded verification signals (self / coach / organization as already modelled — no inflated claims)  
- Minimum media evidence sufficient for legitimate discovery/interest, subject to applicable visibility and disclosure rules  
- Transport / feasibility signals only as needed for the loop (no complex routing product)  
- Opportunity representation (trial / intake / assessment — not a transfer market)  
- Authorized contact or opportunity request  
- Guardian gate on contact/opportunity for minors where applicable  
- Outcome recording (attended / not attended / offered / declined / other — historical, not ranking)  
- Basic audit/provenance of critical actions (who requested, who approved, when)  

Exact field lists must remain consistent with the frozen conceptual model and MVP relationship subset; this page does not invent new entities.

---

## 5. Explicitly out of scope (v1)

- Rankings, talent scores, star ratings, or “AI scout” claims  
- Transfer marketplace, fees, contracts, or negotiation tooling  
- National rollout or multi-province coverage as a goal  
- School football hubs as a full product surface  
- Payments, subscriptions, or monetisation flows  
- Full production RLS / multi-tenant hardening beyond what the ratified access policy allows for a controlled pilot  
- Automated matching that bypasses human request + applicable guardian gate  
- League-level verification infrastructure  
- Anything not required for the single loop above  

---

## 6. Learning metrics (30–60 days)

Distinguish activity from evidence of value.

### Activity metrics (necessary but not sufficient)

- Number of players entered  
- Number of players with minimum verification/evidence  
- Number of participating coaches / guardians  
- Number of opportunity or contact requests initiated  

### Evidence metrics (what actually matters)

- Genuine opportunities created (not synthetic test data)  
- Requests that successfully reach the appropriate person (coach/guardian)  
- Guardian-approved opportunities (where required)  
- Trials or assessments actually attended  
- Documented real-world outcomes (even negative ones)  

Success is not “profiles exist.” Success is **real opportunity interactions under consent rules**.

Ambitious adoption targets are deliberately not set in this draft. Targets, if any, should be set after the first external conversations.

---

## 7. Falsification orientation

External conversations should be able to falsify assumptions, not only confirm them.

Example questions:

- What would make you decide you do *not* need ScoutSA?  
- What would make you refuse to put players on it?  
- What must be true before a trial invite is worth acting on?  
- Where would this create more work than value for a coach or guardian?  

Outreach failures (e.g. undelivered contact) are evidence about channels, not automatic evidence of stakeholder rejection.

---

## 8. Relationship to existing freezes

This draft must be checked against:

- Constitution  
- Domain Model  
- Relationship Model (Gate 2 conceptual freeze)  
- Conceptual ERD  
- MVP relationship subset / schema boundary (as already frozen)  
- Access-policy matrix and remaining HOLDs  

If this page conflicts with a ratified boundary, the boundary wins until formally amended.

---

## 9. What this draft does *not* authorize

- Production database  
- Migration execution  
- RLS implementation  
- Public launch  
- Claims of legal compliance (POPIA, Children’s Act, SAFA/FIFA, etc.)  
- Any expansion of scope beyond the loop above  

---

## 10. Proposed next steps after ratification

1. Use this page in the first three external conversations (coach, academy/recruitment-side, guardian/school-side).  
2. Record raw answers and contradictions as witnesses.  
3. Update only MVP-blocking assumptions and HOLDs.  
4. Decide manual pilot vs minimal technical build from evidence.  

---

**End of draft**
