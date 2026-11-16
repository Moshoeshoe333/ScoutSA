# Tournament Eligibility Review — Prototype Model

**Status:** synthetic design demonstration; not ratified; not a production eligibility service.

## Purpose

Represent a competition-specific eligibility review as a first-class record linked to the exact player participation, team entry, division and tournament edition. Keep the competition rule reference, evidence state, reviewer label and outcome visible rather than hiding them inside a player profile.

## Relationship

`TournamentEdition 1 — N Divisions`  
`Division 1 — N TeamEntries`  
`TeamEntry 1 — N PlayerParticipations`  
`PlayerParticipation 1 — N EligibilityReviews`  
`EligibilityReview N — 1 Division / TournamentEdition`

The review is participation-scoped because a player may participate in different competitions or divisions under different rules. A review must not be treated as a permanent property of a player.

## Prototype fields

- `eligibilityReviewId`: synthetic primary ID (`ELR-DEMO-*`).
- `participationId`, `playerId`, `teamEntryId`: explicit relationship keys.
- `divisionId`, `editionId`: competition context.
- `ageCategory`: copied from the linked division for display, not inferred from a person's appearance.
- `evidenceState`: not supplied, declared only, demo evidence reference recorded, demo evidence checked, or disputed.
- `decision`: not assessed, pending evidence, eligible for human review, not eligible under cited demo rule, exception/rule interpretation required, or disputed/hold.
- `ruleReference`, `reviewerLabel`, `note`: synthetic provenance fields.

## Non-negotiable semantics

- “Eligible for human review” is not a finding that the player is eligible, selected, invited or trial-ready.
- “Demo evidence checked” describes only a fictional demonstration state. It is not real verification.
- Eligibility is rule-specific and competition-specific. Age cut-off date, accepted evidence, exceptions and decision authority must be defined by the relevant competition rules before any real decision.
- Do not infer a date of birth or age from appearance, performance, position, school year or an unverified claim.
- This prototype does not collect dates of birth, identity documents, guardian details or real minor data.
- A disputed record or missing evidence must remain visibly unresolved; it must not silently pass.
- Any real under-18 workflow requires separately designed guardian authority, child safeguarding, purpose limitation, restricted access and human review.

## Production questions still open

1. Who is authorized to define and amend each competition's eligibility rules?
2. What is the rule's effective period and exact age cut-off date?
3. Which evidence types are accepted, by whom, and how is authenticity established?
4. Who can review, challenge, reverse or appeal a decision?
5. How are evidence versions, reviewer identity, timestamps and corrections preserved?
6. What data minimization and retention rules apply, particularly for minors?
7. How are cross-competition conflicts handled without turning one review into a global player label?

## Gate

This model is not a database schema, legal interpretation, safeguarding approval or authority to process real player data. It does not close any mainline gate. Implementation beyond this synthetic browser prototype requires explicit ratification and the applicable privacy, security and safeguarding design.
