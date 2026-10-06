# Gate 2 G2-SEAM-07 — OpportunityApplication Participant / State Re-Witness — 2026-10-06

**Status:** Re-witness complete — semantic model sufficient; exact participant authorization and lifecycle remain operational/domain decisions.

## Finding

OpportunityApplication is already a first-class domain concept and does not require another semantic entity. Its subject is the Player in relation to an Opportunity.

The application lifecycle currently permits `REQUESTED → UNDER_REVIEW → APPROVED / DECLINED / EXPIRED`, but this vocabulary is not yet sufficient to freeze every operational transition.

## Adversarial tests

| Proposition | Disposition |
|---|---|
| Application belongs to Player + Opportunity context | **SAFE / DERIVABLE** |
| Initiating actor is always the Player | **NOT ESTABLISHED** |
| Guardian may participate where applicable | **SAFE / CONTEXTUAL** |
| Initiating actor gains universal Player authority | **REJECTED** |
| Organization-side response establishes unrelated data authority | **REJECTED** |
| Guardian participation replaces GuardianLink/ConsentRecord | **REJECTED** |
| Child Voice becomes Application authorization | **REJECTED** |
| Application state establishes truth | **REJECTED** |
| APPROVED = PLACEMENT | **REJECTED** |
| DECLINED/EXPIRED = generalized Player rejection | **REJECTED** |
| OpportunityReadiness becomes application state | **REJECTED** |
| Outcome is replaced by Application state | **REJECTED** |
| Multiple applications can exist | **SAFE / DERIVABLE** |
| Duplicate submission automatically increases evidentiary weight | **REJECTED** |
| Withdrawal/cancellation is necessarily identical to decline | **NOT ESTABLISHED** |
| Exact participant cardinality | **OPEN — DOMAIN/OPERATIONAL DECISION** |
| Exact transition authority | **OPEN — OPERATIONAL DECISION** |

## Participant boundary

The model should preserve the distinction between:

- Player as application subject;
- actor who initiates or submits an application;
- Opportunity-side actor who reviews/responds;
- Guardian participation where legally/product-contextually applicable;
- child expressed voice;
- any later Outcome.

A participant reference identifies participation in this application. It does not automatically grant authority over the Player, their ConsentRecords, Evidence, safeguarding records, or unrelated opportunities.

## State boundary

Application state describes the lifecycle of the application interaction. It does not establish:

- football ability;
- truth of player assertions;
- safeguarding clearance;
- legal authority;
- suitability;
- placement;
- future success.

`APPROVED ≠ PLACEMENT` remains mandatory.

A future lifecycle may need explicit withdrawal, cancellation, invitation, rejection, expiration, or correction states. Those terms must be defined before ERD freeze rather than inferred from UI labels or implementation convenience.

## Child / Guardian boundary

For minors, participation by a Guardian must continue to be evaluated through GuardianLink and purpose-bound ConsentRecord semantics where applicable. Child Participation / Voice remains separately attributable and does not become automatic consent or veto.

## Missing-concept test

No new first-class semantic entity is warranted. Participant records, transition authority, and lifecycle states are relationship/operational decisions unless future analysis proves that a genuinely missing domain concept is required.

Do not invent an ApplicationParticipant or StateTransition entity merely because such structures are common implementation patterns.

## Disposition

- **G2-07A — Application is first-class:** **CONFIRMED**.
- **G2-07B — Player + Opportunity form the application subject:** **SAFE / DERIVABLE**.
- **G2-07C — Initiating actor may vary by context:** **SAFE PRINCIPLE; exact authorization OPEN**.
- **G2-07D — Guardian participation does not replace GuardianLink/ConsentRecord:** **RATIFIED / SAFE**.
- **G2-07E — Child Voice remains separate:** **RATIFIED / SAFE**.
- **G2-07F — Application state ≠ truth/placement/success:** **RATIFIED / SAFE**.
- **G2-07G — Exact participant cardinality:** **OPEN — DOMAIN/OPERATIONAL DECISION**.
- **G2-07H — Exact state taxonomy and transition authority:** **OPEN — OPERATIONAL DECISION**.
- **G2-07I — Withdrawal/cancellation/invitation semantics:** **OPEN**.
- **G2-07J — New first-class semantic concept:** **NOT WARRANTED**.

## Gate consequence

G2-SEAM-07 is **SEMANTICALLY SUFFICIENT / DOMAIN-OPERATIONAL HOLD**.

No new semantic amendment is warranted. No ERD participant cardinality or transition authority is frozen. No schema, RLS, API, UI, or implementation behavior is authorized from unresolved lifecycle assumptions.

G2-SEAM-07: SEMANTICALLY SUFFICIENT / DOMAIN-OPERATIONAL HOLD
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED

Next authorized seam: **G2-SEAM-08 — Outcome multiplicity / correction / dispute structure.**
