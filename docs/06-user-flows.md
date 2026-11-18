# Core User Flows

> **Status: PROPOSED FLOW NARRATIVE — NOT RATIFIED.**
>
> This document records interaction hypotheses for review. It is not an approved product contract, legal interpretation, safeguarding procedure, or implementation specification. It does not authorize schema, RLS, API, UI, migration, authentication, public disclosure, real-identity processing, deployment, or pilot implementation.
>
> **Authority boundary:** the Constitution and canonical Gate Status govern. The unresolved User ↔ Player cardinality/delegation, actor and organization authority, guardian conflicts, application lifecycle, outcome authority, access, disclosure, retention, and legal questions remain holds. No flow below may invent a default answer for them.
>
> All flows are conditional examples. Any unresolved actor, purpose, authority, consent, scope, time, child-participation, or disclosure condition means STOP / HOLD—not an assumed approval.

## Proposed Primary MVP Loop (non-authoritative)

**Player becomes discoverable → Scout finds a viable opportunity → Guardian reviews → Safe contact / opportunity proceeds → Real-world outcome is recorded.**

Every flow must reduce uncertainty without creating unnecessary risk.

## Flow 1 — Player Registration + Guardian Activation

1. Player or authorised adult begins registration.
2. Basic identity and football information are captured.
3. Age-related safeguarding rules are evaluated.
4. Where guardian involvement is required, a guardian is linked.
5. Guardian receives an invitation through an approved communication channel.
6. Guardian authenticates and reviews the relevant information.
7. Guardian completes required consent / authorisation actions.
8. Passport visibility is determined by the resulting permission state.

## Flow 2 — Coach Verification

1. Coach is associated with the relevant organisation.
2. Coach opens the Player Passport.
3. Coach reviews information within their verification scope.
4. Coach confirms only information they can legitimately verify.
5. Verification event is recorded with source, timestamp, and scope.
6. Passport verification signals update.

Verification must never imply that a coach has independently verified facts outside their scope.

## Flow 3 — Scout Discovery

1. Scout selects search criteria:
   - age
   - position
   - location
   - verification state
   - trial availability
   - transport feasibility
   - relevant academic eligibility
   - other legitimate opportunity requirements
2. System returns players visible to that scout under current permissions.
3. Results expose verification and readiness context without exposing restricted information.
4. Scout opens an appropriate Passport view.
5. Scout can initiate a structured contact or trial request.

## Flow 4 — Contact / Trial Request

1. Scout selects Request Contact or Invite to Trial.
2. System records:
   - requesting person
   - organisation
   - purpose
   - date
   - location
   - opportunity requirements
3. System evaluates applicable consent and safeguarding gates.
4. Guardian receives the relevant context when guardian approval is required.
5. Guardian chooses:
   - Approve
   - Decline
   - Request more information
6. Only authorised information is released.
7. Parties receive confirmation.
8. The event is recorded for audit and opportunity intelligence.

## Flow 5 — WhatsApp / Share Card (PROPOSED; NOT AUTHORIZED)

No public, forward-shareable, or externally accessible Scout Card is authorized by this document. This section is a risk-design prompt only; do not implement or distribute a card, particularly for a minor, until disclosure, safeguarding, recipient, consent, token, expiry, revocation, media, and republication rules are explicitly decided and ratified.

If a future ratified design permits a card, its minimum-necessary contents must be justified for a defined purpose and recipient scope. Candidate fields for review—not an approved field list—include:

- Scout ID
- player name
- age or age band where appropriate
- position
- selected verified signals
- availability
- profile link

Never infer that profile visibility permits republication or onward sharing. Private contact details, detailed medical information, and other restricted information must not appear in a public card. Tokenization alone does not establish authorization; forwarding, expiry, revocation, screenshots, recipient scope, and copies outside ScoutSA remain unresolved.

## Flow 6 — Opportunity Readiness

For a specific opportunity, a future ratified evaluator may derive readiness from relevant prerequisites rather than treating readiness as a permanent player attribute. Readiness is a contextual, reproducible derived artifact—not a stored player truth, talent score, or ranking. Every evaluation must retain its opportunity, material input provenance, governing rule/context, and evaluation time. Material changes, expiry, dispute, withdrawal, or consent revocation require reassessment; stale evaluations must not be presented as current. The explanation must distinguish missing information from a negative finding.

Example:

`Player + Opportunity → Feasibility Evaluation → Actionable Readiness State`

Potential states:

- Trial Ready
- Ready with Constraints
- Needs Guardian Action
- Needs Transport Verification
- Incomplete
- Not Ready

The same player can therefore be Trial Ready for one opportunity and Needs Transport Verification for another.

## Flow 7 — Real-World Outcome

Where legitimately available, ScoutSA records the pathway outcome:

- Viewed
- Contact Requested
- Contact Approved
- Trial Invited
- Trial Attended
- Follow-up
- Placement / pathway outcome

An outcome submission is an attributable assertion, not automatic truth. Preserve submitter, source, timestamp, authority/scope, evidence, and the relevant opportunity/fixture context. Conflicting submissions remain distinguishable and visibly disputed until an authorized resolution process exists. Corrections and supersession preserve prior assertions and their history; never use an unverified outcome as a player-quality or ranking signal. The authority to submit, confirm, dispute, resolve, or expose outcomes remains a ratification blocker.

## Design Principle

If a flow creates more risk or confusion than it removes, it does not belong in the MVP.
