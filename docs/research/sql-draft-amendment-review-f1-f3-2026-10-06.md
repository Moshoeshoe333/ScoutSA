# SQL Draft Amendment Review — F1–F3 — 2026-10-06

**Source SQL commit:** 2f7ae640de646f6d765400c6c4698984f15d049a  
**Status:** AMENDED DRAFT — RUNTIME WITNESS MUST BE REPEATED  
**AuthorityLevel:** NONE

## Findings addressed

### F1 — Safeguarding response responsible-authority provenance
**Resolved in draft.**

Added:
`responsible_authority_ref text not null`

This directly preserves the Field/Constraint Matrix requirement that a safeguarding response retain responsible-authority/context. It does not define who that authority legally is or grant authority.

### F2 — Membership historical/current validity
**Resolved in draft.**

Added:
- `valid_from timestamptz not null`
- `valid_to timestamptz`

This permits a membership to remain historically represented while distinguishing an ended relationship from a currently valid one. No uniqueness or conflict rule has been invented.

### F3 — Provenance for contextual/conditional records
**Resolved as a provenance-control amendment, with an important qualification.**

Added non-null `provenance_ref` to:
- media
- season_performances
- academic_profiles
- medical_clearances
- transport_profiles

This does **not** assert that these records are all Assertions. They remain domain records with their own semantics. The amendment instead ensures that contextual/conditional information has a required provenance anchor and cannot silently appear as unqualified Player fact.

The distinction remains:
- direct Player relationship ≠ assertion/truth;
- provenance ≠ verification;
- provenance ≠ legal validity;
- provenance ≠ current applicability.

## Additional advisory findings deliberately NOT folded into F1–F3

F4 — polymorphic `*_ref` integrity remains an architectural issue and requires a separate typed-reference decision.

F5 — consent withdrawal/supersession requires lifecycle review before encoding.

F6 — temporal checks, UUID defaults and `updated_at` maintenance are implementation details for later review.

No new policy or legal authority was invented to resolve these.

## Required re-witness

Because the SQL blob changed, the previous PostgreSQL runtime witness no longer applies to this exact input.

Required before any migration consideration:

1. exact blob verification;
2. PostgreSQL runtime execution;
3. table/FK count verification;
4. SQL ↔ field/constraint reconciliation update;
5. adversarial review of amended draft.

## Decision

**F1–F3: AMENDED IN DRAFT.**

**Migration:** HOLD.  
**RLS:** NOT AUTHORIZED.  
**Production:** HOLD.
