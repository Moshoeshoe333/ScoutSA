# Core User Flows

## Primary MVP Loop

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

## Flow 5 — WhatsApp / Share Card

A player may receive a shareable, read-only Scout Card where visibility permissions allow it.

The card should contain only appropriate public/shareable information, such as:

- Scout ID
- player name
- age or age band where appropriate
- position
- selected verified signals
- availability
- profile link

Never expose private contact details, detailed medical information, or other restricted information through a public card.

## Flow 6 — Opportunity Readiness

For a specific opportunity, ScoutSA should evaluate relevant prerequisites rather than treating readiness as a permanent player attribute.

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

Outcome data must be distinguished from claims that have not been verified.

## Design Principle

If a flow creates more risk or confusion than it removes, it does not belong in the MVP.
