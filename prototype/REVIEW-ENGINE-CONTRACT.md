# ScoutSA Backend Gate Contract — Draft v1.0.0

**Draft — not ratified.**

## Purpose and boundary

This is a **contract proposal**, not backend implementation, database design, a security review, or authorization to process real player data. It translates the current synthetic review-engine rules into a small, explicit input/output boundary for a future server-side evaluator.

- Input schema: `prototype/contracts/review-evaluation-input.schema.json`
- Result schema: `prototype/contracts/review-evaluation-result.schema.json`
- Current prototype engine: `prototype/review-engine.js` version `0.1.0`
- Contract version: `1.0.0`

The current JavaScript engine is version `0.2.0`; it uses prototype fixture labels and returns a prototype result object. It is **not yet a schema-valid instance** of the backend result contract: a future adapter must add the contract/policy versions and evaluation timestamp, map fixture labels to canonical enums, and project the engine result into the exact result schema. Do not treat the current client-side module as an authorization service.

## Evaluation precedence and lifecycle

The evaluator requires an explicit evaluation timestamp; it never silently chooses the system clock. Passport, organization, representative authority, membership, consent and opportunity records must have an active lifecycle state and a valid future expiry. Missing, invalid, suspended, revoked, archived or expired records fail closed.

Actor legitimacy is Tier 1: organization identity must pass, then representative authority must independently pass for the exact organization, representative and review scope. Purpose-bound consent is **SKIPPED**, not solicited or evaluated, until both Tier 1 checks pass. Tier 2 then evaluates Passport, membership, safe route, guardian authority/conflict, player voice, consent, opportunity, eligibility and safeguarding. Within Tier 2, all applicable gates are returned together so the reviewer can see concurrent blockers.

An established guardian's objection, revocation or withdrawal creates `GUARDIAN_CONFLICT_HOLD`. An unverified guardian assertion does not establish authority. This is a conservative prototype rule, not a determination of legal custody or who must consent in a real case.

## Five gate groups

| Gate group | Required sub-gates | Pass condition |
|---|---|---|
| 1. Player Passport | Passport exists; Passport ID equals the request player ID; record is active | Exact opaque ID resolution. A display name or non-empty string is never sufficient. |
| 2. Purpose consent and minor authority | Age classification and safe route; overall consent; exact purpose; exact recipient organization; guardian authority; player assent/voice | All conditions must match the same player, purpose and recipient. Unknown age receives under-18 protections. Guardian authority and player assent remain separate checks. |
| 3. Organization authority | Organization identity; representative authority | Both are evaluated independently. A verified organization does not verify its representative; a verified representative does not verify the organization. Authority must be current and scoped to the action. |
| 4. Membership linkage | Membership claim belongs to exact player ID and organization ID; active state; verified status | Exact ID pair plus active and verified membership. Display labels are never keys. |
| 5. Opportunity clearance | Opportunity/source verification; opportunity-specific eligibility; safeguarding review and second review | Source, eligibility and safeguarding are separate decisions. None can substitute for another. Opportunity must belong to the requested organization. |

The result schema retains twelve sub-gates so the UI and future service can explain each blocker without collapsing separate decisions.

## Minimal input contract

The request contains only opaque references and controlled enums:

- request, player, Passport, organization, opportunity, membership, consent and invitation-review IDs
- age classification and request route
- purpose code and requested disclosure class

The referenced records are limited to the fields needed for the five gate groups. No player name, date of birth, ID number, phone number, email address, home address, guardian name/contact details, document image, video URL, or free-text personal narrative belongs in this evaluation payload.

Consent is bound to **player + purpose category + recipient organization + status + validity**. Guardian authority and player voice are separate prerequisites. A generic “share with an academy” grant is not reusable for another organization. The taxonomy must remain small and comprehensible; any purpose-category expansion requires a clear scope statement and versioned review. Withdrawn, expired, revoked, or not-given consent fails closed.

## Result contract

The evaluator returns:

- contract and policy versions
- request ID and evaluation timestamp
- `HOLD` or `READY_FOR_SEPARATE_HUMAN_REVIEW`
- twelve uniquely keyed gate results with `PASS`, `FAIL` or `SKIPPED` states
- stable reason codes
- `disclosurePermitted: false`

`READY_FOR_SEPARATE_HUMAN_REVIEW` is not approval, selection, invitation, contact permission, publication permission, trial eligibility, or placement. It only means the required evaluation gates did not identify a blocker and a separate authorized human review may begin.

The result schema deliberately makes `disclosurePermitted` a constant false. A later disclosure policy would require its own separately ratified contract, authority, purpose, recipient, safeguarding and access-control enforcement. It must not be inferred from this result.

## State-transition rules

| Current state | Event / condition | Next state | Rule |
|---|---|---|---|
| `RECEIVED` | Request accepted for evaluation | `HOLD` | Default fail-closed state. |
| `HOLD` | Every blocking gate passes under the current policy version | `READY_FOR_SEPARATE_HUMAN_REVIEW` | No disclosure or invitation occurs. |
| `HOLD` | Any gate remains unresolved, mismatched, expired, withdrawn or rejected | `HOLD` | Return reason codes; do not auto-correct or infer missing evidence. |
| `READY_FOR_SEPARATE_HUMAN_REVIEW` | Evidence changes, expires, is withdrawn/revoked, or a gate becomes invalid | `HOLD` | Re-evaluate before any further review. |
| `READY_FOR_SEPARATE_HUMAN_REVIEW` | Explicit authorized human reviewer starts review | `HUMAN_REVIEW_IN_PROGRESS` | Record reviewer authority and policy version in the future audit design. |
| `HUMAN_REVIEW_IN_PROGRESS` | Review is completed with a reasoned outcome | `HUMAN_REVIEW_COMPLETE` | Completion is not selection, invitation, contact, disclosure, or placement. |
| Any non-terminal state | Request is withdrawn or closed through an authorized process | `CLOSED` | Preserve the reason and required record-retention obligations. |

No transition is defined here for `APPROVED`, `INVITED`, `CONTACT_UNLOCKED`, `PUBLISHED`, `TRIAL_CONFIRMED`, or `PLACED`. Those are separate product and policy decisions and are not implied by review completion.

## Non-negotiable invariants

1. Unknown age receives under-18 protections until reliably established.
2. A request is not an invitation; discoverability is not permission.
3. Consent must match the exact player, purpose, recipient and validity window.
4. Guardian authority and the player's own voice/assent are distinct.
5. Organization identity and representative authority are distinct.
6. Membership must match exact player and organization IDs.
7. Eligibility and safeguarding are distinct and independently required.
8. A positive gate never overrides another failed gate.
9. Missing, ambiguous, stale, conflicting or unavailable evidence fails closed. A PASS at intake is not cached as a permanent authorization; the same evaluation must be repeated at each future server-side transition that could expose data or initiate contact.
10. No client-side result is trusted as a server authorization decision.
11. No disclosure, direct private scout-to-minor contact, or payment-to-be-seen flow is authorized by this contract.
12. No production, POPIA, Children’s Act, MySAFA, FIFA, or security-compliance claim is made by this draft.

## Reason-code policy

Reason codes are machine-readable identifiers, not explanations by themselves. Every returned code must map to a human-readable explanation and an evidence/next-action requirement. Codes must be stable within a contract version. Renaming or changing their meaning requires a version change and regression review.

## Ratification and stop conditions

This draft must be reviewed against the domain model and by appropriate safeguarding/legal stakeholders before implementation. Do not create database tables, migrations, RLS policies, API endpoints, identity vaults, real consent capture, notifications, or disclosure flows from this document alone.

Implementation remains blocked until the contract is explicitly ratified and the responsible authority, legal basis, retention policy, access model, incident process, and independent review requirements are established.
