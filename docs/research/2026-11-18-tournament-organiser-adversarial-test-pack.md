# Tournament Organiser Workflow — Adversarial Test Pack

**Date:** 2026-11-18  
**Status:** PROPOSED RESEARCH / DESIGN ARTIFACT — NOT RATIFIED  
**Scope:** Documentation-only analysis of a possible first Tournament Organiser workflow  
**Authority:** This document does not amend the Constitution, Domain Model, Relationship Model, frozen schema boundary, MVP boundary, or Gate Status.  
**Implementation:** None. No schema, migration, RLS, API, UI, authentication, production or pilot work is authorized by this document.

> Research can propose. Evidence can witness. The Constitution ratifies. The Domain Model formalizes. The Relationship Model derives. Code implements.

## 1. Purpose

Test whether a deliberately small Tournament Organiser workflow can preserve ScoutSA's existing safeguarding, authority, provenance, correction, privacy, and data-integrity boundaries.

This pack converts six adversarial scenarios into testable expectations. It is a test design, not a report of tests already executed. All outcomes remain **NOT RUN** until witnessed against an explicitly authorized synthetic-data prototype or other approved test environment.

## 2. Evidence boundary

The current inspected Domain Model defines User, Organization, Membership, Verification, Assertion/Evidence, SeasonPerformance and other concepts. It includes the conceptual role `LEAGUE_ADMIN`, but a role label does not establish external status, organization affiliation, or permission to act for a particular tournament.

The inspected Relationship Model explicitly leaves organization affiliation/authorization and several actor relationships unresolved. It also requires provenance-bearing evidence, scoped verification, retained history, and separation between derived state and underlying records.

The inspected User Flows do not establish a complete Tournament Organiser workflow. The current Gate Status and README keep mainline implementation on hold.

**Repository inspection limitation:** this conclusion is limited to the named documents inspected for this review. It is not a claim that no tournament-related material exists anywhere else in the repository.

## 3. Non-negotiable distinctions

1. Account role ≠ verified professional or organizational status.
2. Organization affiliation ≠ authority to administer every activity of that organization.
3. Tournament organiser verification ≠ player safeguarding clearance.
4. Tournament entry ≠ proof of player identity, eligibility, consent, or participation.
5. Team association ≠ proof that a team is eligible for a particular division.
6. Submitted result ≠ independently verified result.
7. Result correction ≠ deletion of the original assertion or audit history.
8. Tournament statistics ≠ verified player performance unless the source, subject, period, authority and verification basis support that claim.
9. Operational access to a fixture ≠ unrestricted access to player personal data.
10. A technical identifier or relationship key cannot create legal authority or domain truth.

## 4. Adversarial scenario matrix

### TO-01 — Unverified organiser claims league authority

**Threat / setup:** A registered user selects or claims a league affiliation and attempts to create, edit, publish, or administer a tournament on its behalf.

**Expected safe behaviour:**
- The account role alone does not confer league authority.
- The claimed organization affiliation remains an assertion until assessed under an approved verification/authorization process.
- Administrative actions are denied or held until the actor's authority is established for the relevant organization and action.
- The decision, evidence, scope, verifier/decision-maker and effective period are attributable.
- No private player data is exposed merely because a tournament exists.

**Evidence required to pass:**
- Negative authorization test for an unverified or unaffiliated account.
- Positive test for a properly authorized synthetic actor, limited to the approved scope.
- Evidence that expired, suspended or revoked authority ceases to authorize new actions.
- Audit record identifying actor, action, target, time and decision basis.

**Fail conditions:** role-only access; self-asserted affiliation treated as verified; permanent organization authority assumed; revocation does not take effect.

**Unresolved decision:** Who may verify an organizer, by what evidence, for which organization and scope, and who can revoke or appeal that determination?

### TO-02 — Duplicate or ambiguous team registration

**Threat / setup:** Two organisers register the same real-world team under different spellings, aliases, age groups or organizational affiliations; alternatively, two different teams have similar names.

**Expected safe behaviour:**
- The system does not silently merge records based only on name similarity.
- Team identity, organization affiliation, age/division context and effective period remain distinguishable.
- A suspected duplicate enters a review state with provenance retained.
- A merge, if ever authorized, preserves source identifiers, history, attribution and a reversible mapping or documented correction trail.
- A team is not assumed to be an Organization; one organization may field multiple teams.

**Evidence required to pass:**
- Synthetic tests for spelling variants, aliases, same-name different teams, age-group variants and organization changes.
- Demonstration that automated similarity is a review signal, not proof of identity.
- Traceable review and correction history.

**Fail conditions:** destructive auto-merge; uniqueness based only on display name; duplicate detection silently changes historical participation or results.

**Unresolved decision:** Is Team a first-class domain concept, a time-bound representation of an Organization's squad, or a separate identity with explicit organizational affiliation? What constitutes authoritative team identity?

### TO-03 — Conflicting match-result submissions

**Threat / setup:** Two participating teams submit different scores for the same fixture, or one authorized reporter submits a result that conflicts with supporting evidence.

**Expected safe behaviour:**
- Each submission is preserved as an attributable assertion with source, author, timestamp and context.
- The system does not silently select the first, latest, or highest-authority-looking score without a ratified rule.
- The match result remains disputed/pending until an authorized resolution process is completed.
- Evidence may support an assertion but is not automatically treated as truth.
- Downstream statistics and standings must not present a disputed result as verified.

**Evidence required to pass:**
- Conflicting synthetic submissions remain separately inspectable.
- No result is promoted to verified without an explicit, authorized decision and evidence basis.
- Downstream derived views reflect the disputed state and can be recalculated after resolution.
- Audit history records the resolution and its authority.

**Fail conditions:** last-write-wins; first-write-wins; silent overwrite; disputed score displayed as verified; evidence attachment alone treated as adjudication.

**Unresolved decision:** Who may submit, confirm, dispute and resolve a result? Is confirmation by both teams required, or is there an independently authorized competition official? What appeal path applies?

### TO-04 — Published result requires correction

**Threat / setup:** A published score, fixture time, venue or participant association is later found to be wrong.

**Expected safe behaviour:**
- The original assertion and prior published state remain historically traceable.
- A correction records the correcting actor, timestamp, reason, changed fields, evidence and authorization.
- The current view reflects the accepted correction while historical views remain intelligible.
- Dependent statistics/standings are marked for recalculation or correction; stale derived data is not silently retained.
- A correction does not erase a dispute or conceal an earlier publication.

**Evidence required to pass:**
- Before/after history for a synthetic correction.
- Negative test preventing unauthorized correction.
- Proof that reason and provenance are mandatory for consequential correction.
- Reconciliation showing dependent views updated or explicitly marked stale.

**Fail conditions:** in-place destructive edit; missing reason; overwritten audit trail; stale statistics presented as current; correction authority inferred from ordinary edit access.

**Unresolved decision:** Which fields are correctable, by whom, under what evidence threshold, and how are disputes, supersession and downstream recalculation handled?

### TO-05 — Tournament workflow touches a minor's personal information

**Threat / setup:** An organizer needs team lists and fixture operations. A player is under 18. A workflow attempts to expose contact details, profile information, media, academic/medical data or direct messaging capability.

**Expected safe behaviour:**
- Tournament administration receives only the minimum information necessary for its approved operational task.
- Tournament creation or team entry does not imply consent to publish a Player Passport or media.
- Guardian authority, child participation/voice, purpose-specific consent and applicable safeguarding controls remain distinct.
- No public minor contact details or unrestricted direct private contact are exposed.
- Organiser verification does not grant access to medical, academic, transport or other restricted records.
- A safeguarding concern follows its separate protected response process; ordinary tournament administration cannot inspect or resolve it by default.

**Evidence required to pass:**
- Field-level access tests using synthetic minor and adult records.
- Negative tests for direct contact, private data, media and unrelated profile access.
- Consent-purpose mismatch and revocation tests.
- Guardian-authority conflict cases routed to an approved decision process rather than guessed.
- Access logs demonstrating actor, purpose, data accessed and decision.

**Fail conditions:** tournament membership grants broad player access; guardian link treated as universal consent; media visibility inferred from registration; private minor contact exposed; organizer role bypasses safeguarding gates.

**Unresolved decision:** What exact player data is essential for tournament operations? Who authorizes each use and disclosure? What lawful basis, consent, child-voice and guardian rules apply to each purpose in the relevant South African context? Qualified legal/safeguarding review remains necessary.

### TO-06 — Offline result entry and retry

**Threat / setup:** An organizer records a result during poor connectivity, loses connection, retries submission after reconnecting, or submits conflicting offline edits from two devices.

**Expected safe behaviour:**
- The local workflow clearly distinguishes saved locally, queued, submitted, acknowledged, disputed and verified states.
- A retry cannot create duplicate match results or duplicate audit actions.
- The client preserves the user's input through interruption.
- Conflicts are surfaced for resolution; the system does not silently overwrite newer or competing state.
- A locally stored result is not represented as server-accepted or verified.
- Sensitive local data is minimized and protected under a separately reviewed device/storage threat model.

**Evidence required to pass:**
- Airplane-mode, packet-loss, timeout, restart and reconnect tests.
- Duplicate retry/idempotency tests.
- Two-device conflict test.
- State-transition evidence distinguishing local persistence from server acknowledgement and verification.
- Payload/data-cost measurements on a constrained connection.

**Fail conditions:** lost input; duplicate result; silent last-write-wins; local-only state presented as published; offline data exposed without an approved protection model.

**Unresolved decision:** What is the offline scope, authoritative conflict-resolution policy, retention period, local data classification and device-security requirement?

## 5. Cross-scenario controls

| Control | Minimum requirement | Evidence type |
|---|---|---|
| Actor authority | Action-specific, organization-scoped and time-bounded | Positive and negative authorization tests |
| Assertion provenance | Actor, subject, scope, source and timestamp retained | Record inspection and trace |
| Verification | Defined claim, verifier authority, evidence basis, status and time | Verification lifecycle test |
| Corrections | Append-only history or equivalent immutable provenance | Before/after and audit inspection |
| Privacy | Minimum necessary fields and purpose-limited access | Field-level access tests |
| Minor safeguarding | No broad access or contact from tournament role alone | Abuse-case and access-denial tests |
| Offline integrity | Idempotency, conflict handling and clear sync state | Fault-injection and recovery tests |
| Derived data | Disputed/stale source state propagates to dependent views | Recalculation/reconciliation test |
| Operations | Named owner for review, disputes, incidents and escalation | Runbook walkthrough |

## 6. Candidate domain decisions — not ratified

The following questions must be resolved before a domain amendment or implementation specification is proposed.

| Decision ID | Question | Why it matters | Current disposition |
|---|---|---|---|
| TOD-01 | What is a Tournament, and what is its lifecycle? | Establishes scope, status, dates and closure semantics | OPEN |
| TOD-02 | Is Team a first-class identity, and how does it relate to Organization? | Prevents false identity merges and ambiguous team ownership | OPEN |
| TOD-03 | What is a TournamentEntry, and what entity enters a tournament? | Separates team registration from player participation | OPEN |
| TOD-04 | What is a Fixture/Match, and how are participants and schedule changes represented? | Defines match identity, lifecycle and schedule history | OPEN |
| TOD-05 | What is a Result assertion versus an accepted/verified result? | Preserves evidence and avoids false certainty | OPEN |
| TOD-06 | Who may submit, dispute, adjudicate and correct results? | Defines authority, appeals and accountability | OPEN |
| TOD-07 | What does organizer verification establish, and who grants it? | Prevents role/affiliation from becoming assumed authority | OPEN |
| TOD-08 | What minimum participant information is required for tournament operations? | Limits privacy and safeguarding exposure | OPEN |
| TOD-09 | How does tournament participation relate to Player Passport and SeasonPerformance? | Prevents unverified tournament records becoming verified player claims | OPEN |
| TOD-10 | What offline behaviour is essential for the first workflow? | Prevents scope creep while preserving field reliability | OPEN |

No answer in this table should be inferred from a convenient schema shape.

## 7. Smallest useful prototype boundary — candidate only

If, and only if, the established governance process authorizes a separate synthetic-data prototype, the smallest useful workflow to investigate is:

1. An authorized synthetic organizer creates a tournament.
2. The organizer records a venue/area, dates and division.
3. Synthetic teams are entered with explicit identity and affiliation references.
4. A fixture is scheduled between two entries.
5. A result is submitted as an attributable assertion.
6. A conflicting submission or correction is handled without destroying history.
7. A read-only tournament view shows clear status and provenance.

**Exclude from this first prototype:** real player accounts, minors' personal information, public player discovery, private contact, media uploads, payments, automatic brackets, federation integrations, automated talent rankings and production data.

This is a proposed test boundary, not approval to create a prototype branch or alter the frozen MVP/schema boundary.

## 8. Test execution record

No adversarial tests were executed as part of this document's preparation.

| Scenario | Test status | Evidence reference | Witness / date |
|---|---|---|---|
| TO-01 Organiser authority | NOT RUN | — | — |
| TO-02 Duplicate team | NOT RUN | — | — |
| TO-03 Conflicting results | NOT RUN | — | — |
| TO-04 Result correction | NOT RUN | — | — |
| TO-05 Minor privacy/safeguarding | NOT RUN | — | — |
| TO-06 Offline retry/conflict | NOT RUN | — | — |

A test may be marked PASS only when the exact environment, commit/version, synthetic fixtures, steps, expected outcome, observed outcome and evidence artifact are recorded. A test failure must be retained as a defect/learning record, not rewritten as a pass after a workaround.

## 9. Gate and next action

**Current decision:** RESEARCH / DOMAIN RECONCILIATION ONLY.

- No new domain entity is ratified here.
- No existing domain or relationship model is amended here.
- No schema, migration, RLS, API, UI, authentication or production behavior is authorized.
- Existing Gate Status remains authoritative.
- The next controlled action is to resolve TOD-01 through TOD-10 using the existing domain-governance process, beginning with Team, TournamentEntry, Fixture/Match, Result assertion and organizer authority.
- Any proposed semantic change must return through governance, then domain reconciliation, then relationship reconciliation, then the appropriate gate.

**Stop condition:** If a proposed workflow requires assuming legal authority, guardian precedence, player eligibility, verified performance or unrestricted organizer access, stop and record the seam. Do not code around it.

## 10. Review checklist

- [ ] All six scenarios reviewed against the current Constitution and Domain Model.
- [ ] Team / Organization distinction resolved.
- [ ] TournamentEntry / participant distinction resolved.
- [ ] Fixture / Match lifecycle resolved.
- [ ] Result assertion / verified result distinction resolved.
- [ ] Organizer authority and revocation process resolved.
- [ ] Minor-data purpose and access boundaries reviewed by competent safeguarding/legal reviewers.
- [ ] Offline scope and conflict policy justified by observed organizer need.
- [ ] Synthetic tests executed and evidence recorded.
- [ ] Gate owner explicitly authorizes any next implementation step.

**Final principle:** A tournament record is useful only when its origin, authority, context, correction history and uncertainty remain visible.
