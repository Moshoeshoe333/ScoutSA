# Workspace Data-Integrity and Failure-State Verification — 2026-11-13

**Branch:** `prototype/internal-demo`  
**Verified commit:** `ea3b8919b1240be43391ffbb679b3c1d17a5942e`  
**Hosted run:** [43422932825](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422932825)  
**Result:** PASS

## Defects found and corrected

1. **Coach membership reference did not resolve.** The Coach & Academy summary listed `MEM-DEMO-005`, but the central membership fixture did not contain it. Added a fictional, explicitly unverified central membership record for the same organization and player; no verification claim was added.
2. **Coach opportunity crossed organization scope.** The Coach & Academy workspace for `ORG-DEMO-01` listed `OPP-DEMO-003`, which belongs to `ORG-DEMO-03`. Removed the foreign opportunity and corrected the organization-scoped proposal count from two to one.
3. **Incomplete request borrowed another player's membership.** `REQ-DEMO-003` has no Passport/player record, but pointed to `MEM-DEMO-002`, which belongs to a different player. Cleared the membership reference. The scenario remains deliberately incomplete and must continue to evaluate as HOLD.
4. **Handoff filter assumed an array input.** With no handoff parameters, invalid or missing `records` input previously caused a `.slice()` error. The helper now normalizes non-array input to an empty collection and fails closed.

## Automated data-integrity coverage

Added `prototype/tests/workspace-data-integrity.test.js` with two test declarations. It loads the actual synthetic fixture files and checks:

- Unique, non-empty IDs across fixture collections.
- Membership-to-player and membership-to-organization references.
- Opportunity-to-organization references.
- Evidence-to-opportunity and decision-to-evidence references.
- Invitation-to-opportunity, matching-pair-to-player/opportunity, and pathway-to-player/stage references.
- Request-to-consent, organization, opportunity, membership and invitation references, including player/organization agreement for linked membership.
- Coach workspace membership and opportunity references are centrally resolvable and belong to the workspace's organization.
- Coach summary counts agree with the listed fixture collections.
- `REQ-DEMO-003` is the one explicitly incomplete player/Passport scenario; it must not borrow a membership or invent a Passport reference.

The same test file covers URL handoff filtering for ordinary navigation, opportunity-only handoffs, empty/unknown player references, unknown opportunities, exact matches, non-array input and input immutability.

## Browser failure-state additions

The specialist interaction browser test now additionally checks:

- A hostile HTML-looking value entered into the Claim Decisions form remains literal text and does not create an `img` element.
- Opportunity-only, unknown-player and player/opportunity-mismatch handoffs display no request records and no invented review stages.

The hostile-text check is specifically for the Claim Decisions form, whose renderer applies HTML escaping. It is not a blanket security test of every workspace renderer.

## Hosted verification

GitHub Actions [run 43422932825](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43422932825), commit `ea3b8919b1240be43391ffbb679b3c1d17a5942e`, completed successfully. Job logs confirm:

- **50/50** headless Node tests passed; 0 failed.
- **7/7** Discovery & Request Review browser groups passed.
- **8/8** workspace hub/navigation browser groups passed.
- **11/11** specialist workspace interaction browser groups passed.

The test declaration inventory is now 50: 40 review-engine, 8 documentation-integrity, and 2 workspace-data-integrity declarations.

## Open hardening requirement

Several static fixture pages build HTML strings with `innerHTML` and interpolate fixture fields without universal escaping. The current data is bundled, fictional JavaScript fixtures and these pages do not accept external submissions; this checkpoint does not claim a demonstrated exploit or complete security audit. However, those renderers must be converted to safe DOM text construction or consistent context-appropriate escaping **before any external, user-supplied or connected data is introduced**. The Claim Decisions form's escaping test does not close this wider requirement.

## Scope and gate boundary

All changes are confined to `prototype/internal-demo`. No real player, guardian, coach, organization, opportunity, consent, contact or media data was introduced. No backend, authentication, authorization, RLS, API, database, durable storage, consent capture, disclosure, contact, invitation or placement was implemented. No implementation gate is lifted. Mainline remains unchanged.


## Follow-on ownership regression coverage — awaiting hosted verification

After the hosted run recorded above, two additional tests were added to `prototype/tests/review-engine.test.js`:

- A membership reference whose `playerId` belongs to a different player must fail `membership_linkage` with `MEMBERSHIP_LINK_MISMATCH`.
- An opportunity owned by a different organization must fail `opportunity_source` with `OPPORTUNITY_ORGANIZATION_MISMATCH`; eligibility and safeguarding remain skipped.

These are tests of existing evaluator behavior, not new policy or a change to the engine. They are committed on `prototype/internal-demo`; no hosted result is yet confirmed for them. The current source inventory is 54 declarations: 44 review-engine, 8 documentation-integrity and 2 workspace-data-integrity tests. The historical PASS above applies only to its recorded commit and run.


## Follow-on consent identity and malformed-input tests — awaiting hosted verification

Two further tests were added to `prototype/tests/review-engine.test.js`:

- An opaque `playerRef` must not be replaced by the internal Passport ID. The Passport reference can remain valid while consent linkage, guardian authority and player voice fail on the mismatched opaque reference.
- Object-shaped `guardians` and `purposes` values must not be treated as valid collections. Guardian authority and purpose consent must fail closed without throwing or permitting disclosure.

No evaluator behavior or policy was changed. The current source inventory is 56 declarations: 46 review-engine, 8 documentation-integrity and 2 workspace-data-integrity tests. These latest tests await hosted verification; the historical PASS above does not cover them.
