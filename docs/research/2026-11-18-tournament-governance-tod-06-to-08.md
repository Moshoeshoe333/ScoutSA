# Tournament Governance Decision Brief — TOD-06 to TOD-08

**Date:** 2026-11-18  
**Status:** PROPOSED / NOT RATIFIED  
**Inputs:** ScoutSA Constitution; canonical Gate Status; Consent Model; Tournament Organiser Adversarial Test Pack; TOD-01 to TOD-05 reconciliation  
**Scope:** Result authority, organizer verification/mandate, and minimum data for tournament operations  
**Authority:** Research and decision support only. This brief does not amend frozen governing models, ratify policy, establish legal compliance, or authorize implementation.

> Author ≠ Authority. Identity verification ≠ mandate. Mandate ≠ safeguarding clearance. Operational utility ≠ permission to collect player data.

## 1. Executive recommendation

Resolve the three decisions using a deliberately narrow model:

1. **TOD-06 — Result governance:** separate submission, confirmation, dispute, adjudication, correction and independent verification. Authority must be explicit, scoped to a competition and action, time-bounded, and reviewable. Conflicts remain visible until an authorized process resolves them.
2. **TOD-07 — Organizer verification:** verify distinct claims separately: who the person is, which organization (if any) they represent, whether that organization or competent body recognizes the event, and whether the person has a current mandate for the specific tournament. None of these establishes safeguarding clearance or unrestricted data access.
3. **TOD-08 — Minimum data:** design the first organizer workflow to operate without player personal information. Tournament setup, team entries, fixtures, score assertions and organizer audit history should be sufficient for the initial operational test. Player rosters, player identifiers, contact details, media, medical/academic/transport data and Player Passport access remain excluded unless a separately justified and authorized purpose is established.

These are recommended policy directions for review, not ratified decisions.

## 2. Governing constraints witnessed

The current Constitution and Gate Status establish that:

- Authority is scoped to subject, claim, scope, context, time and applicable legal/policy basis.
- An author is not automatically an authority.
- Assertion, Evidence, Verification, Derived State and Decision are distinct.
- Incompatible legitimate assertions remain distinguishable until an authorized resolution process applies.
- Purpose-bound authorization does not transfer from one purpose to another.
- Verification of identity, role, organization or football claims is not safeguarding clearance or contact authorization.
- A guardian relationship or consent record cannot be assumed to authorize every purpose.
- Child participation/voice remains distinct from guardian authority and the resulting decision.
- The frozen ERD, MVP boundary, schema boundary and physical table boundary remain unchanged; implementation and access-policy holds remain in force.

This brief is consistent with those constraints. It does not resolve the legal or operational carry-forward items already recorded in Gate Status.

## 3. TOD-06 — Who may submit, dispute, adjudicate and correct results?

### Decision question

Which actors may perform each result action, for which tournament, during what period, and under what evidence and appeal rules?

### Recommended rule

Do not assign one broad permission called “manage results.” Separate the actions and their authority:

| Action | Candidate permitted actor | Required control |
|---|---|---|
| Submit a result assertion | Designated team representative, match official or tournament official | Attribute author, source, fixture, timestamp and submission context |
| Confirm receipt / acknowledge | Designated opposing representative or official | Acknowledgement is not adjudication or verification |
| Dispute a result | Designated participant representative or authorized official | Preserve the disputed assertion and stated grounds |
| Adjudicate a dispute | Named competition authority or expressly delegated adjudicator | Authority, scope, mandate, evidence considered and reason recorded |
| Correct an accepted determination | Same competent authority or a separately authorized reviewer | Preserve prior state; record reason, evidence and supersession |
| Independently verify a claim | A separately authorized verifier under a defined verification process | Verification claim, verifier authority, evidence basis, scope and time |

This is a candidate responsibility split. It is not a universal hierarchy and does not assume that a team representative, referee, organizer or league always has final authority.

### Non-negotiable invariants

1. Submission never equals acceptance, adjudication or verification.
2. Acknowledgement never equals agreement with the score.
3. No first-write-wins or last-write-wins resolution.
4. Conflicting assertions remain preserved and visible to authorized reviewers.
5. A person cannot gain authority merely by claiming a title, uploading a logo or being associated with a team.
6. Adjudication must identify the governing competition rule or mandate that grants the decision power.
7. A correction must preserve the prior assertion and determination, the actor, time, reason, evidence and authority.
8. A person whose own submission is disputed should not be the sole adjudicator of that dispute without an explicitly justified and reviewed process.
9. An appeal/review route must be defined before the product represents a determination as final.
10. AI or automated scoring may flag inconsistencies but must not independently decide contested truth.

### Candidate result-resolution lifecycle

SUBMITTED → ACKNOWLEDGED / DISPUTED → UNDER_REVIEW → ACCEPTED / REJECTED / NO_RESULT → SUPERSEDED (if later corrected)

This is vocabulary for review, not a ratified state machine. Not every case follows every state. The model must preserve parallel assertions and the decision record rather than force all activity into one mutable status field.

### Questions that must be answered by actual competition practice

- Which role is recognized by local tournaments as the authoritative match official?
- Do both teams normally sign or confirm score sheets?
- What happens when a referee report conflicts with both team submissions?
- Who hears an appeal, and can the original adjudicator review their own decision?
- What time limit, if any, applies to a dispute or correction?
- Which competition rules govern walkovers, abandoned matches, replays and sanctions?

**Disposition:** recommend action-specific, competition-scoped authority with preserved conflict and appeal history. Operational rules require external validation; legal/organizational authority must not be invented.

## 4. TOD-07 — What does organizer verification establish?

### Decision question

What exactly does a ScoutSA “verified organizer” label mean, who can grant it, how is it evidenced, and when does it expire or get revoked?

### Recommended approach: verify separate claims

Do not issue one broad trust badge that implies more than was checked. Distinguish:

| Claim | Example evidence to assess | What it does NOT establish |
|---|---|---|
| Person identity | Appropriate identity-check process | Authority to organize any event |
| Organization identity | Reliable organizational records / recognized institutional source | That every associated person may act for it |
| Organizational affiliation | Confirmation from an authorized organizational contact | A mandate for this specific tournament |
| Tournament mandate | Dated, scoped appointment/delegation or confirmation from the competent authority | Safeguarding clearance or legal approval of every activity |
| Event recognition | Confirmation from the relevant league/association/competition authority where applicable | Player eligibility, result accuracy or ScoutSA endorsement |
| Safeguarding suitability | Separate competent process, if one is lawfully and operationally defined | Must never be inferred from identity, affiliation or tournament verification |

The evidence source and its authority must be recorded. A website, social-media page, badge, email signature or uploaded document may be a lead, but does not automatically prove the claim.

### Recommended display language

Prefer precise, scoped labels such as:

- Identity checked — as of [date]
- Organization affiliation confirmed — by [source], as of [date]
- Tournament mandate confirmed — for [named tournament], valid [period]
- Event recognition confirmed — by [named authority], for [defined scope]

Avoid an unqualified “trusted,” “safe,” “official,” “FIFA/SAFA approved” or “safeguarding cleared” label unless the exact claim, authority and current evidence genuinely support it.

### Lifecycle and accountability requirements

A future authorized process should define:

- who may perform each check and who reviews exceptions;
- accepted source classes and how source authority is established;
- scope, issue date, expiry/review date and revocation trigger;
- how contradictory or withdrawn evidence is handled;
- how organizers can correct inaccurate records or appeal a decision;
- how the public-facing status avoids disclosing sensitive verification evidence;
- incident escalation and suspension controls that do not presume guilt.

**Critical boundary:** organizer verification must not unlock Player Passport access, direct contact with minors, roster disclosure, media reuse or safeguarding-case visibility.

**Disposition:** recommend claim-specific verification and tournament-specific mandate. The competent authorities, acceptable evidence and operational revocation process remain open pending external validation and qualified review.

## 5. TOD-08 — What is the minimum information needed?

### Decision question

Can the Tournament Organiser workflow deliver immediate utility without collecting or exposing player personal information?

### Recommended answer

Yes. The first workflow should be designed around event administration and team-level competition records, not player profiles.

### Candidate minimum data for an organizer-only operational test

| Area | Candidate information | Boundary |
|---|---|---|
| Tournament | Name, competition dates, venue/area, divisions, published rules, lifecycle status | Public/event information only where disclosure is authorized |
| Organizer | Account identifier, role in this tournament, mandate reference/status | No broad organizational or player access |
| Team | Team name, stable internal reference, optional organization affiliation claim | Avoid collecting personal details about players |
| Entry | Team, division, submission time, decision and reason | Entry does not establish player eligibility or participation |
| Fixture | Fixture reference, participating entries, scheduled time/venue, schedule history | Fixture does not prove a match occurred |
| Result assertion | Score/outcome claim, submitter, source, timestamp and supporting reference | No automatic acceptance or verification |
| Resolution | Decision, decision-maker, authority reference, reason, time and superseded claim | Preserve history and appeal status |
| Audit | Actor, action, object, time, purpose and outcome | Avoid copying sensitive content into logs |

### Explicitly excluded from the first organizer workflow

Unless a distinct purpose is evidenced, governed and authorized, do not collect or expose:

- player names linked to tournament participation;
- dates of birth, identity numbers or personal contact details;
- player account/profile or Player Passport identifiers;
- guardian contact information or consent records;
- photographs, videos or biometric-like media;
- medical, academic, disability, transport or home-location information;
- safeguarding reports or case details;
- private scout/agent messages or player discovery data.

A roster may be operationally useful to some organizers, but “useful” alone does not establish necessity, lawful basis, authority, consent, retention or safe disclosure. If external validation demonstrates an essential roster requirement, treat it as a new purpose-specific decision with a separate data-flow, legal and safeguarding review. Do not quietly add it to the tournament feature.

### Utility test

The first workflow should be judged on whether an organizer can:

1. create and maintain a tournament;
2. register and manage team entries;
3. schedule and update fixtures;
4. submit and reconcile result assertions;
5. correct mistakes with preserved history;
6. produce a useful team-level tournament record;

without entering any real player's personal information.

If this cannot be achieved, record the exact operational blocker and evidence. Do not collect player data pre-emptively.

**Disposition:** recommend a player-data-free initial organizer workflow. Validate the assumption with real tournament organizers before any scope change.

## 6. External validation plan — smallest useful questions

Seek a small, diverse set of real-world witnesses: a Vaal tournament organizer, a league/LFA representative where available, a coach or team representative, and a safeguarding/privacy practitioner. Do not treat one person's opinion as universal policy.

Ask each relevant witness:

1. Who is actually authorized to submit and decide a score dispute in your competitions? Give a recent ordinary example and an exception.
2. What record proves that a person may organize this particular event on behalf of an organization?
3. How are organizer appointments, affiliations or event recognition withdrawn or changed?
4. Can you operate tournament registration, fixtures and results without sending a player roster to the platform?
5. If a roster is essential, which exact fields are required, for what task, who sees them, for how long, and what happens when a player is a minor?
6. What happens when two teams submit conflicting results or an official report is challenged?
7. What would make you refuse to use this workflow?

Record source, role, date, context, exact claim, evidence offered, disagreement and limits. Do not record unnecessary personal data about players during interviews.

### Evidence standard

- An interview is evidence of that witness's reported practice or opinion, not proof of universal law or national practice.
- A policy document is evidence of its own stated rule, not proof that every competition follows it.
- A claimed delegation must be checked with the source that has authority to issue it.
- Conflicting accounts must remain visible.
- Legal interpretation requires a suitably qualified South African practitioner; this brief is not legal advice.

## 7. Decision dependency and stop conditions

| Decision | Can be provisionally designed? | Must remain unresolved until evidence/review |
|---|---|---|
| TOD-06 result authority | Action separation, provenance and conflict preservation | Actual competent roles, appeal rules, deadlines and binding competition rules |
| TOD-07 organizer verification | Separate identity, affiliation, mandate and event-recognition claims | Authoritative source classes, verification provider, expiry/revocation and any safeguarding process |
| TOD-08 minimum data | Player-data-free workflow hypothesis | Any claimed roster necessity, lawful basis, child/guardian process, retention and disclosure |

Stop and return to governance if a proposal assumes:
- a universal league/organizer authority hierarchy;
- a verified organizer is automatically safe or entitled to player data;
- team entry implies player eligibility or participation;
- a guardian link creates blanket permission;
- public availability permits republication;
- a score submission is truth;
- a legal/compliance claim without qualified review and implementation evidence.

## 8. Proposed decision register

| ID | Proposed direction | Status |
|---|---|---|
| TOD-06 | Action-specific, tournament-scoped result authority; preserve competing assertions; record adjudication, correction and appeal | PROPOSED — NOT RATIFIED |
| TOD-07 | Verify identity, affiliation, tournament mandate and event recognition as separate scoped claims; no implied safeguarding clearance | PROPOSED — NOT RATIFIED |
| TOD-08 | First organizer workflow uses tournament/team-level records and no player personal data | PROPOSED — NOT RATIFIED |

## 9. Gate and next action

**Current decision:** RESEARCH / EXTERNAL VALIDATION PREPARATION ONLY.

- No Constitution amendment.
- No Domain Model or Relationship Model amendment.
- No ERD, schema, SQL, migration, RLS, API, UI, authentication or production change.
- No player-data processing or organizer access expansion.
- No legal compliance or safeguarding-clearance claim.
- Canonical Gate Status remains authoritative.

**Next controlled action:** validate the three decisions with real tournament stakeholders and competent privacy/safeguarding input. Preserve evidence and contradictions. Only material findings should return to governance.

**Stop condition:** no implementation until the applicable decisions are explicitly ratified and the existing gate process authorizes the next step.

**Final principle:** the best first tournament workflow is the one that solves a real organizer problem while needing the least sensitive information and making the fewest unsupported trust claims.
