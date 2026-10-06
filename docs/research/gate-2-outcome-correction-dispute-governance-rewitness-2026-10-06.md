# Gate 2 — G2-SEAM-08 Outcome Multiplicity / Correction / Dispute Governance Re-Witness — 2026-10-06

## Status

**G2-SEAM-08:** SEMANTICALLY SUFFICIENT / RELATIONSHIP-OPERATIONAL HOLD  
**Gate 2:** OPEN  
**ERD:** HOLD  
**Schema:** HOLD  
**RLS/API/UI:** DEFERRED  
**Implementation:** DEFERRED

## Purpose

This re-witness interrogates whether the existing `Outcome` domain concept is sufficient to represent multiplicity, correction, dispute, supersession, and provenance without silently inventing a new semantic object or collapsing Outcome into OpportunityApplication state.

The governing chain remains:

`Constitution → Domain Model → Gate 1 witnesses / ratified M1–M9 → Assertion / Safeguarding / Child Voice ratifications → G2 relationship seam → adversarial test`

No schema, RLS, API, UI, or implementation decision is authorized by this document.

## Existing domain anchor

The Domain Model defines Outcome as a record of what happened after an opportunity interaction, including examples such as trial attendance, further evaluation, offer, placement, registration, decline, or no outcome recorded.

The existing semantic boundary is:

> **Outcome measures a real-world event or result; it is not proof of causation or general player quality.**

## Adversarial re-witness

### RW-08-01 — Outcome is distinct from Application state

**Finding:** SAFE.

An OpportunityApplication describes the application process/state. An Outcome describes what happened after or in relation to an opportunity interaction.

Therefore:

- `OUTCOME ≠ APPLICATION STATE`
- `APPROVED ≠ PLACEMENT`
- `APPLICATION ≠ OUTCOME`

An application may conclude without a placement, and an outcome must not be silently encoded as an application-state mutation.

### RW-08-02 — Multiple outcomes

**Finding:** SAFE SEMANTIC PRINCIPLE.

More than one outcome may occur across an opportunity interaction or application lifecycle where the domain context warrants it. Examples may include attendance followed by further evaluation followed by an offer.

Exact multiplicity/cardinality remains a relationship decision and is not frozen here.

No assumption is made that every application has exactly one outcome.

### RW-08-03 — Outcome provenance

**Finding:** SAFE.

An outcome assertion must remain attributable to its source/actor/process where applicable and retain temporal context sufficient to distinguish the historical record from later correction or applicability.

`AUTHOR ≠ AUTHORITY` remains applicable.

Evidence may support an outcome assertion without establishing truth by record existence.

### RW-08-04 — Correction

**Finding:** SAFE SEMANTIC PRINCIPLE.

Correction must not silently rewrite history.

A corrected, amended, or superseded outcome must preserve sufficient provenance to distinguish:

- the earlier record;
- the later correction;
- who/what made or submitted the correction;
- when the correction occurred;
- the applicable context.

Exact versioning/supersession representation is deferred.

### RW-08-05 — Dispute

**Finding:** SAFE SEMANTIC PRINCIPLE.

A dispute is not itself proof that an outcome is false.

Therefore:

`DISPUTE ≠ PROOF OF FALSITY`

Contradictory outcome assertions remain distinguishable and attributable until an applicable authority/process resolves them.

No latest-wins, first-wins, majority-wins, or verification-wins rule is introduced.

### RW-08-06 — Outcome and Assertion

**Finding:** SAFE.

Where an Outcome is represented through an attributable assertion, the existing Assertion model applies:

- `ASSERTION ≠ EVIDENCE`
- `ASSERTION ≠ VERIFICATION`
- `ASSERTION ≠ TRUTH`
- evidence supports an assertion but does not thereby establish truth;
- contradictory assertions are not silently resolved;
- historical assertion does not automatically establish current applicability.

The Outcome concept therefore does not require a second truth-bearing object merely to represent provenance.

### RW-08-07 — Outcome and player quality

**Finding:** REJECTED AS SEMANTIC INFERENCE.

An Outcome must not silently become:

- player ranking;
- player reputation;
- generalized suitability;
- future success probability;
- football quality score.

In particular:

`PLACEMENT ≠ PLAYER QUALITY`

and:

`OUTCOME ≠ CAUSAL PROOF OF SCOUTSA SUCCESS`

This preserves the North Star while preventing outcome inflation.

### RW-08-08 — Placement / registration

**Finding:** SAFE AS A DOMAIN BOUNDARY; SUBTYPE DECISION DEFERRED.

Placement and registration may be meaningful outcome categories, but this re-witness does not determine whether they are:

- Outcome values;
- specialized outcome records;
- separate domain concepts;
- or related records.

That is a future relationship/domain decision.

No new entity is invented here.

### RW-08-09 — AuditEvent

**Finding:** SAFE.

AuditEvent can preserve system accountability around an Outcome-related action, but AuditEvent does not replace the substantive Outcome record.

`AUDIT EVENT ≠ OUTCOME`

### RW-08-10 — Visibility / disclosure

**Finding:** SAFE.

An Outcome is not public merely because its Player or Organization is discoverable.

Therefore:

`DISCOVERABLE ≠ REPUBLISHABLE`

and:

`OUTCOME VISIBILITY ≠ AUTOMATIC PUBLIC DISCLOSURE`

Exact access/disclosure policy remains deferred.

### RW-08-11 — Temporal applicability

**Finding:** SAFE.

A historical Outcome remains a historical record even when later corrected, disputed, superseded, or no longer applicable to a current decision.

`HISTORICAL OUTCOME ≠ CURRENT APPLICABILITY`

Derived readiness or other current state must not replace the historical Outcome record.

### RW-08-12 — Retention / deletion

**Finding:** DEFERRED.

This re-witness does not establish a fixed retention period, immutable retention rule, or deletion prohibition. Applicable law, policy, and future operational requirements must determine those rules.

## Representation sufficiency test

The current semantic model contains:

- OpportunityApplication;
- Outcome;
- Assertion;
- Evidence;
- Verification;
- AuditEvent;
- temporal applicability;
- correction/dispute provenance boundaries.

These concepts are sufficient to preserve the semantic distinctions witnessed above.

**No additional first-class semantic entity is currently warranted by G2-SEAM-08.**

The remaining questions are relationship/operational decisions:

1. exact Outcome multiplicity/cardinality relative to OpportunityApplication;
2. event-like versus composite-result representation;
3. precise Assertion/Outcome relationship;
4. correction/version/supersession representation;
5. dispute lifecycle and authorized participants;
6. whether placement/registration require specialized treatment;
7. visibility/access policy;
8. retention/deletion policy.

## Disposition

| Question | Disposition |
|---|---|
| Outcome remains first-class | **CONFIRMED** |
| Multiple outcomes conceptually possible | **SAFE** |
| Outcome ≠ Application state | **CONFIRMED** |
| Correction preserves provenance | **CONFIRMED** |
| Dispute ≠ proof of falsity | **SAFE PRINCIPLE** |
| Contradictory outcome assertions remain attributable | **SAFE PRINCIPLE** |
| Outcome becomes ranking/reputation | **REJECTED** |
| Placement proves player quality | **REJECTED** |
| AuditEvent replaces Outcome | **REJECTED** |
| Public visibility follows discoverability | **REJECTED** |
| New semantic entity required | **NO EVIDENCE** |
| Exact cardinality frozen | **NO** |
| Exact correction/dispute mechanism frozen | **NO** |
| Schema/RLS/API/UI | **HOLD / DEFERRED** |

## Gate consequence

```
G2-SEAM-08: SEMANTICALLY SUFFICIENT / RELATIONSHIP-OPERATIONAL HOLD
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED
```

## Next authorized action

Proceed to a consolidated Gate 2 blocker review covering the remaining unresolved relationship decisions from G2-SEAM-01, G2-SEAM-02, G2-SEAM-03, G2-SEAM-07, and G2-SEAM-08.

Do not freeze the conceptual ERD until those relationship decisions are explicitly resolved.

If any consolidation step exposes a missing semantic concept rather than a relationship/operational choice:

`STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED → DOMAIN RECONCILIATION`

## Non-claims

This document does not establish:

- legal authority;
- POPIA or Children’s Act compliance;
- safeguarding clearance;
- universal Guardian precedence;
- a fixed dispute procedure;
- a fixed retention period;
- database schema;
- RLS policy;
- API behavior;
- UI behavior;
- production readiness;
- investor readiness.
