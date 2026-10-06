# Gate 2 G2-SEAM-07 — OpportunityApplication Governance / Re-Witness

**Date:** 2026-10-06  
**Seam:** G2-SEAM-07  
**Status:** Governance review  
**Authority:** Gate 2 governance process; semantic only

## 1. Point

Determine whether the existing **OpportunityApplication** concept can safely represent participants, lifecycle states, authority boundaries, and resulting Outcome without inventing new semantics or collapsing application state into truth, placement, consent, or success.

## 2. Existing domain

OpportunityApplication is already defined as a formal Player/Guardian/Organization interaction around an Opportunity.

Current conceptual lifecycle:

REQUESTED → UNDER_REVIEW → APPROVED / DECLINED / EXPIRED

Existing boundaries:

- applicable minor/guardian gates must be satisfied before protected contact details or attendance commitments are released;
- an application does not prove football ability;
- an accepted application does not guarantee placement or success;
- Outcome is a separate historical record of what happened after the interaction.

## 3. Adversarial re-witness

### RW-01 — Application subject

An application must identify the Player and the specific Opportunity.

**Disposition: SAFE / already represented.**

### RW-02 — Initiating participant

The initiating action may be performed by the Player, Guardian, or another authorized actor/process depending on the opportunity and applicable rules.

The actor who submits an application must not automatically become the legal owner of the Player or acquire universal authority.

**Disposition: SAFE semantic principle; exact actor authorization deferred.**

### RW-03 — Responding participant

The responding side is the Organization or authorized Opportunity-side actor.

A recipient's ability to respond to an application does not establish authority over unrelated Player data or purposes.

**Disposition: SAFE semantic principle.**

### RW-04 — Guardian participation

Guardian involvement may be required for minors in applicable contexts.

Guardian participation in an application does not silently create universal Guardian authority and does not replace the separate GuardianLink / ConsentRecord semantics.

**Disposition: SAFE.**

### RW-05 — Child voice

Where a minor participates or expresses a view, the application must not overwrite or collapse that expression into Guardian authorization or application state.

The ratified Child Participation / Voice Record remains separate.

**Disposition: SAFE.**

### RW-06 — Application state ≠ truth

REQUESTED, UNDER_REVIEW, APPROVED, DECLINED, or EXPIRED describes the application process.

It does not establish football ability, identity truth, safeguarding clearance, legal authority, opportunity suitability, placement, or future success.

**Disposition: SAFE.**

### RW-07 — APPROVED ≠ PLACEMENT

Application approval may advance the opportunity interaction, but does not prove that a trial occurred, offer was accepted, registration happened, or placement occurred.

Those remain Outcome-level events.

**Disposition: SAFE / already supported.**

### RW-08 — Declined / expired ≠ player rejection as truth

A declined or expired application is an event about that application and opportunity context.

It must not silently become a negative player attribute, ranking signal, or generalized quality judgment.

**Disposition: SAFE semantic principle.**

### RW-09 — Withdrawal / cancellation

Player-side or opportunity-side withdrawal/cancellation is semantically distinct from organization decline or time expiry.

The exact operational state vocabulary is not yet frozen.

**Disposition: SAFE semantic principle; exact state taxonomy deferred.**

### RW-10 — Multiple applications

A Player may apply to multiple Opportunities, including legitimately distinct opportunities from the same Organization.

One application must not silently overwrite another.

**Disposition: SAFE / consistent with established multiplicity.**

### RW-11 — Duplicate application

Duplicate submissions may be detected operationally, but duplicate records must not automatically be treated as separate opportunities or separate evidence of player interest/quality.

**Disposition: SAFE semantic principle.**

### RW-12 — Consent and application

An application does not itself create unrestricted consent to expose all Player, Guardian, medical, academic, transport, or media information.

Purpose-specific ConsentRecord and applicable safeguarding gates remain authoritative for protected disclosure.

**Disposition: SAFE.**

### RW-13 — Readiness

OpportunityReadiness may inform an application or its review, but it is a derived contextual state and cannot replace underlying records or determine the application's truth.

**Disposition: SAFE.**

### RW-14 — Outcome

Outcome remains separate from Application state.

An application can be approved with no placement; a trial can occur after approval; an outcome can later be corrected/disputed.

**Disposition: SAFE.**

### RW-15 — AuditEvent

AuditEvent records meaningful system actions around the application but does not replace the substantive Application record.

**Disposition: SAFE.**

## 4. Representation sufficiency

The existing domain already contains:

- OpportunityApplication;
- Player;
- Guardian;
- GuardianLink;
- ConsentRecord;
- Opportunity;
- Organization;
- Child Participation / Voice Record;
- OpportunityReadiness;
- Outcome;
- AuditEvent.

The adversarial pass does **not** expose a missing first-class semantic object.

The remaining uncertainty is primarily **operational state vocabulary and actor authorization**, not a missing domain concept.

Therefore:

**Current semantic representation is sufficient to proceed without a governance-level new entity.**

## 5. Controlled unresolved points

The following must remain explicit before ERD/schema freeze:

1. Exact application participant/cardinality model.
2. Which actor types may initiate an application in each context.
3. Which actor types may respond or transition state.
4. Whether Player/Guardian initiation differs by minor/adult context.
5. Exact state taxonomy, including withdrawal/cancellation.
6. Whether invitations and applications share or require distinct lifecycle semantics.
7. Exact correction/dispute behavior.
8. Notification/access semantics.
9. How child participation affects a process where applicable without inventing legal effect.

These are domain/operational decisions, not assumptions to be hidden in schema.

## 6. Governance disposition

**G2-07A — Application as first-class interaction:** RATIFIED / CONFIRMED.

**G2-07B — Player + Opportunity subject:** SAFE / DERIVABLE.

**G2-07C — Initiating actor semantics:** SAFE PRINCIPLE; exact authorization DEFERRED.

**G2-07D — Responding actor semantics:** SAFE PRINCIPLE; exact authorization DEFERRED.

**G2-07E — Application state ≠ truth / placement / success:** RATIFIED / CONFIRMED.

**G2-07F — Application state taxonomy complete:** NO — operational/domain decision required.

**G2-07G — New first-class semantic entity required:** NO EVIDENCE AT PRESENT.

**G2-07H — Schema/RLS/API/UI:** HOLD.

## 7. Gate consequence

G2-SEAM-07 does **not** trigger a governance stop for a new semantic concept.

It remains an **ERD blocker / unresolved relationship and lifecycle decision**, not a reason to invent another entity.

No ratification of a new entity is required at this point.

G2-SEAM-07: SEMANTICALLY SUFFICIENT / DOMAIN-OPERATIONAL HOLD
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
IMPLEMENTATION: DEFERRED
