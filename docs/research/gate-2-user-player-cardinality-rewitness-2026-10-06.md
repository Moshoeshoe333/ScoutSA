# Gate 2 G2-SEAM-01 — User ↔ Player Identity / Cardinality Re-Witness — 2026-10-06

**Status:** Re-witness complete — semantic boundary stable; exact cardinality remains a domain decision.

## 1. Question

Can the Relationship Model safely determine the cardinality and lifecycle relationship between:

- **User** — authentication identity for a human actor; and
- **Player** — persistent football identity / Player Passport?

## 2. Governing evidence

The ratified domain deliberately separates authentication identity from football identity.

Therefore:

- `USER ≠ PLAYER`;
- a User role does not itself prove football identity;
- a Player Passport is intended to persist independently of a current club/school relationship;
- Guardian, Coach, Scout and other actor roles may exist without making the User a Player.

## 3. Adversarial tests

| Proposition | Disposition |
|---|---|
| User and Player are the same domain object | **REJECTED** |
| Every Player must have a User account | **NOT ESTABLISHED** |
| Every User must be a Player | **REJECTED** |
| Player may exist without a User account | **DERIVABLE / SAFE** |
| User may exist without a Player | **DERIVABLE / SAFE** |
| User role proves football identity | **REJECTED** |
| User deactivation/deletion deletes Player | **REJECTED / NOT ESTABLISHED** |
| One User may represent multiple Players | **NOT ESTABLISHED** |
| Multiple Users may represent one Player | **NOT ESTABLISHED** |
| Delegated/shared Player access is automatically permitted | **REJECTED** |
| Exact User ↔ Player cardinality can be inferred from current evidence | **NO** |

## 4. Cardinality adversarial comparison

### A. Strict one-to-one

**Not ratified.**

It would silently assert that every Player owns exactly one User account and every Player-facing User is exactly one Player.

That conflicts with the existence of Players who may be represented in the system before account creation and with non-player actors.

### B. Optional one-to-one

**Plausible, but not ratified.**

It preserves the possibility of a Player without an account, but still silently fixes one account per Player and one Player per account.

That may become too restrictive if legitimate delegated access is later required.

### C. One-to-many / many-to-one

**Not ratified.**

Either direction would create a substantive delegation or representation rule that the domain has not yet established.

### D. Separate identity with an explicit access/delegation relationship

**Architecturally plausible, but not ratified.**

This would allow authentication identity and Player identity to remain separate while representing controlled access explicitly. However, introducing such a relationship as a domain concept requires an explicit decision about its semantics, authority, lifecycle and provenance.

The ERD must not create it merely because a database can represent it.

## 5. Lifecycle adversarial tests

The following must remain distinct unless a future ratified rule says otherwise:

- User creation ≠ Player creation;
- User deactivation ≠ Player deletion;
- Player profile change ≠ authentication identity change;
- role change ≠ football identity verification;
- loss of account access ≠ loss of Player identity;
- delegated access ≠ ownership of the Player identity.

## 6. Governance finding

The re-witness does **not** expose a missing semantic concept required to preserve the current domain.

The safe conclusion is:

> **User and Player are distinct domain concepts. A Player may exist without a User account, and a User may exist without being a Player. Exact cardinality and any delegated/shared-access relationship require explicit domain authorization before ERD freeze.**

This is a relationship/domain decision, not a justification for inventing a schema relationship.

## 7. Disposition

- **G2-01A — User ≠ Player:** RATIFIED / EXISTING DOMAIN BOUNDARY.
- **G2-01B — Player may exist without User:** DERIVABLE / SAFE.
- **G2-01C — User may exist without Player:** DERIVABLE / SAFE.
- **G2-01D — Exact cardinality:** **OPEN — DOMAIN DECISION REQUIRED.**
- **G2-01E — Delegated/shared access:** **OPEN — DOMAIN + AUTHORIZATION DECISION REQUIRED.**
- **G2-01F — Account lifecycle automatically controls Player lifecycle:** **REJECTED / NOT ESTABLISHED.**

## 8. Gate consequence

No new semantic amendment is warranted.

No ERD cardinality is frozen.

No technical access/delegation entity is invented.

No schema, RLS, API, UI, authentication-provider, or implementation rule is authorized from this seam.

```
G2-SEAM-01: SEMANTICALLY STABLE / CARDINALITY HOLD
GATE 2: OPEN
ERD: HOLD
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED
```

## 9. Control

If a future domain decision requires a new concept such as explicit delegated Player access, apply:

`STOP → GOVERNANCE REVIEW → RE-WITNESS → RATIFY IF REQUIRED → DOMAIN RECONCILIATION → RELATIONSHIP MODEL UPDATE`

The next authorized seam is **G2-SEAM-02 — User ↔ Guardian / Coach / Scout / Organization affiliation and authorization**.
