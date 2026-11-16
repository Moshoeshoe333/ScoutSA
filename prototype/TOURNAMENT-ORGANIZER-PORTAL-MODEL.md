# Tournament Organizer Portal — Proposed Model

**Status:** Internal browser prototype and design proposal · synthetic records only · not ratified for mainline  
**Branch:** `prototype/internal-demo`  
**As at:** 16 November 2026

## Purpose

Give tournament organizers a structured route to submit competitions, editions and divisions; maintain organizer identity and authority evidence separately; and request permission for ScoutSA to feature an event. This creates a possible institutional onboarding and commercial pathway without treating a submission as proof.

## Core records and primary relationships

| Record | Primary key | Relationship / purpose |
|---|---|---|
| Organizer | `organizer_id` | Organization identity record; one organizer may submit many competitions |
| Organizer authority evidence | `organizer_evidence_id` | Belongs to an organizer; supports a human authority review |
| Tournament | `tournament_id` | Stable competition identity |
| Tournament edition | `tournament_edition_id` | Belongs to a tournament; season-specific dates and operating context |
| Division | `division_id` | Belongs to an edition; defines competition stream |
| Organizer submission | `submission_id` | Connects organizer to a proposed tournament/edition and its review lifecycle |
| Feature permission request | `feature_request_id` | Connects a submission to purpose, scope, permission state and evidence |
| Review decision | `review_decision_id` | Attributable human decision with rationale, time and supersession history |
| Public listing | `listing_id` | Created only after independent publication approval and applicable permission checks |

Names are display attributes, not join keys. Tournament identity, edition, organizer, submission, evidence, feature permission and publication are separate entities.

## State separation

- **Organizer identity:** unknown / pending / accepted / rejected / stale.
- **Organizer authority:** unknown / evidence requested / under review / accepted / rejected / expired.
- **Competition submission:** draft / submitted / clarification requested / accepted for further review / rejected / withdrawn.
- **Feature permission:** not requested / requested / granted / declined / withdrawn / expired.
- **Publication:** not eligible / pending human approval / published / suspended / removed.

An accepted organizer identity does not prove authority to operate a specific event. Authority evidence does not establish that an event is scheduled or safe. A tournament submission does not grant feature permission. Feature permission does not authorize use of player images, player profiles, marks, logos or third-party content unless the relevant rights and consent are separately established. A public listing is not a player opportunity or a verified trial.

## Prototype behaviour

- Seeded synthetic organizer, submission, evidence and feature-request records.
- New submissions create pending records; no auto-verification or auto-publication.
- Evidence register stores synthetic reference IDs and review states only; no uploads.
- Feature requests record scope and permission state; publication remains disabled.
- Session-only state resets on refresh; no persistence, authentication, outbound contact or API.
- Input validation restricts labels and evidence references to synthetic `DEMO-` values.

## Investor narrative and commercial hypotheses

The portal supports the strategic direction of ScoutSA as trust infrastructure for football opportunity, rather than a social network. It could become a low-friction institutional entry point for organizers and later support subscriptions or premium organizer tools. These are hypotheses, not demonstrated willingness to pay or revenue.

The Vaal Triangle is the initial geographic wedge. The portal should help build a structured, provenance-aware competition network, but tournament count is an activity measure—not proof of player outcomes. Outcome metrics should ultimately include qualified opportunity invitations, attendance, trial progression, scholarship/academy admissions and placements, with clear attribution and denominators.

Do not charge players for visibility. Do not imply that a tournament listing is an endorsement, verified opportunity, or guarantee of selection.

## Safeguarding, privacy and trust boundaries

- No real player or minor data belongs in this organizer-only prototype.
- Organizer verification must not imply player verification.
- Permission to feature a competition is distinct from permission to publish identifiable player/media content.
- No direct private contact with minors; guardian and player permission gates remain separate.
- Record evidence provenance, source, date checked, reviewer authority, scope, expiry, dispute and revocation.
- Do not claim POPIA compliance, federation endorsement, MySAFA integration or official recognition without evidence.
- No real outreach or publication is performed by this prototype.

## Open questions before ratification

1. What minimum evidence establishes legal identity and authority to operate an event?
2. Which authorities can confirm school, club, academy, association or independent organizer standing?
3. How are event sanctioning, venue permission, insurance, safeguarding and emergency arrangements represented?
4. What is the permission instrument and how are scope, duration, revocation and media rights handled?
5. Who can review and approve a public listing, and how are conflicts of interest managed?
6. Which institutional subscription problem is sufficiently valuable to justify payment?
7. What minimum viable organizer workflow can be operated safely in the Vaal pilot?

**Decision boundary:** this prototype informs design and investor narrative only. It does not ratify a production schema, authorize public listings, establish any organizer as verified, authorize contact, or close a mainline gate.
