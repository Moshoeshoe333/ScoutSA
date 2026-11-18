# Tournament Domain Reconciliation — TOD-01 to TOD-05

**Date:** 2026-11-18  
**Status:** PROPOSED DOMAIN RECONCILIATION — NOT RATIFIED  
**Inputs:** Tournament Organiser Adversarial Test Pack; current Domain Model; current Relationship Model; canonical Gate Status  
**Scope:** Resolve the conceptual shape of Tournament, Team, TournamentEntry, Fixture/Match and Result assertion without amending frozen governing models  
**Authority:** This paper is a recommendation for governance review. It does not ratify entities, reopen or amend the frozen ERD/schema/MVP boundary, or authorize implementation.

> Research can propose. Evidence can witness. The Constitution ratifies. The Domain Model formalizes. The Relationship Model derives. Code implements.

## 1. Executive recommendation

The Tournament Organiser workflow exposes a coherent operational domain, but it must not be modelled as a shortcut into Player Passport data.

The smallest defensible conceptual separation is:

1. **Tournament** — the competition/event container and its lifecycle.
2. **Team** — a sporting identity that may be affiliated with an Organization, without being identical to that Organization.
3. **TournamentEntry** — the time-bound admission/registration of a Team into a particular Tournament and division/category.
4. **Fixture** — a scheduled contest between eligible TournamentEntries, with a stable identity independent of schedule changes.
5. **Result assertion** — an attributable claim about the outcome of a Fixture, represented through the already-ratified Assertion concept. A current accepted result is a governed determination derived from one or more assertions and an authorized resolution, not an unqualified score field.

This is a **recommended conceptual direction**, not a declaration that all five concepts are already ratified. Tournament, Team, TournamentEntry and Fixture are candidate concepts requiring governance review. Result assertion should reuse the existing ratified Assertion semantics rather than introduce a competing generic Result-as-truth entity.

**Recommendation:** accept the five-part separation as the preferred design hypothesis for governance review; do not merge it into the frozen Domain Model or Relationship Model until the prescribed review and ratification path is completed.

## 2. Existing model constraints that must survive

The inspected Domain Model already establishes:

- Organization is a football-related institution/body and may be a school, club, academy, university, LFA, league or other body.
- Membership is the historical/current relationship between Player and Organization. It is not a team roster and must not be repurposed as one.
- Verification is scoped to a defined claim, authority, evidence basis, timestamp and status. It is not universal trust or safeguarding clearance.
- SeasonPerformance is a period-bound record for a season, team, competition or defined period; its source and context must remain explicit.
- Assertion is a ratified semantic concept: an attributable claim is not evidence, verification or truth.
- AuditEvent is append-oriented accountability history.
- Sensitive Player Passport data remains purpose-bound and restricted; operational roles do not receive blanket access.
- Derived states do not replace their underlying records; missing evidence is not a positive assertion; conflicts are not resolutions.

The Relationship Model also leaves actor/Organization affiliation and authorization details unresolved. The existence of an Organization, role label or technical relationship key cannot establish that a person may administer a specific tournament.

## 3. TOD-01 — Tournament identity and lifecycle

### Decision question

What does a Tournament represent, and how does it move from proposal to closure?

### Recommended conceptual definition

A **Tournament** is a bounded, organized football competition or event with an identifiable organizer, a defined competition period, a venue or venue context, and one or more participation categories/divisions. It provides the context within which entries, fixtures and result assertions are organized.

A Tournament should not be treated as an Organization. An Organization may organize multiple tournaments; a tournament may be organized by an authorized body or a specifically delegated organizer. The exact organizer-authority model remains unresolved and must not be inferred from a role name.

### Candidate lifecycle for review

- **DRAFT** — being prepared; not presented as an open or confirmed event.
- **SUBMISSION_OPEN** — entry submissions are being accepted under stated conditions.
- **ENTRY_CLOSED** — no ordinary new entries; authorized exceptions require an explicit process.
- **SCHEDULED** — fixtures and event arrangements have been published as current.
- **IN_PROGRESS** — competition activity has begun.
- **COMPLETED** — competition activity has ended; records may still require review.
- **CANCELLED** — event will not proceed.
- **ARCHIVED** — operationally closed and retained as historical record.

These labels are a vocabulary proposal only. They are not ratified states. In particular, cancellation, postponement, suspension, abandonment, rescheduling, reopening and correction may need separate events or transitions rather than being compressed into one status.

### Required invariants

1. A stable Tournament identity survives name, venue, date and organizer changes.
2. Material changes retain who changed what, when, why and under what authority.
3. Published dates/venues are time-sensitive assertions, not immutable truth.
4. A completed or archived Tournament is not silently rewritten.
5. A Tournament's existence does not establish organizer legitimacy, player eligibility, consent or match verification.
6. The system must distinguish an event's planned state from what actually occurred.

### Open questions

- Can one Tournament have multiple organizers or co-organizers?
- Is an organizer a verified Organization, an authorized person acting for one, or both?
- Who may pause, cancel, reopen or archive an event?
- Can divisions have different entry windows, rules and schedules?
- What minimum information makes a Tournament useful to organizers before any player data is involved?

**Disposition:** candidate concept; lifecycle vocabulary requires governance review. No change to current model.

## 4. TOD-02 — Team identity and Organization affiliation

### Decision question

Is Team a first-class identity, and how does it relate to Organization?

### Recommended conceptual definition

A **Team** is a sporting unit that competes under a recognizable identity during one or more periods. It may be affiliated with an Organization, but it is not itself necessarily an Organization.

An Organization may field multiple teams, including different age groups, divisions, squads or seasonal versions. A team may change affiliation or operate without a formally verified organizational affiliation. Those conditions must be represented as distinct facts, not resolved by renaming or merging the team.

### Recommended separation

- **Organization:** institution/body identity.
- **Team:** sporting identity.
- **Team affiliation:** a time-bounded assertion/relationship between Team and Organization, with source, effective dates and verification status where applicable.
- **Team name/alias:** a label, not a unique identity key.
- **Squad/roster:** not assumed to be the same thing as Team; player participation requires a separate, purpose-limited model.

### Required invariants

1. Display-name similarity is a duplicate-review signal, never proof of identity.
2. Same-name teams may be different entities; one organization may operate many teams.
3. Age group, gender/division, location and season are contextual attributes, not safe substitutes for identity.
4. Affiliation changes preserve history and do not rewrite prior tournament entries or results.
5. A Team's affiliation does not establish authority for every person associated with its Organization.
6. A Team is not a Player Membership; do not overload Membership to represent team roster membership.
7. Any merge or identity correction must preserve source IDs, history, attribution and a documented reversal/correction path.

### Alternatives considered

| Option | Benefit | Material risk | Disposition |
|---|---|---|---|
| Team is just an Organization | Fewer concepts | Conflates institution and sporting unit; cannot safely represent multiple squads | Reject |
| Team is only a free-text name on each entry | Very simple | Duplicates, spelling drift and disconnected history | Reject |
| Team is a first-class sporting identity with time-bounded Organization affiliation | Preserves identity and history | Requires explicit identity review and affiliation semantics | Recommend |

**Disposition:** recommend Team as a candidate first-class concept. This requires governance approval; no entity is added to the frozen model by this paper.

## 5. TOD-03 — TournamentEntry and what enters a Tournament

### Decision question

What is admitted to a Tournament: an Organization, a Team, a Player, or a squad?

### Recommended conceptual definition

A **TournamentEntry** is a time-bounded registration/admission record through which a Team seeks or receives entry into a particular Tournament and a defined division/category.

The entry is not the Team itself, not the Organization itself, and not proof that any named Player participated.

### Recommended distinctions

- **Entry submission:** an application/request to participate.
- **Entry decision:** accepted, waitlisted, rejected, withdrawn or otherwise decided under the tournament's approved rules.
- **Entry eligibility:** a determination against the stated competition rules; must identify its authority and evidence.
- **Player participation:** a separate, attributable fact/event, if the product later has a justified and authorized need to record it.
- **Roster/list:** potentially sensitive operational data; must not be treated as public player discovery or imported wholesale into Player Passport.

### Required invariants

1. One Team may have separate entries in different tournaments or divisions.
2. A single Tournament may have multiple entries; duplicate-entry policy must be explicit.
3. Entry does not prove player identity, eligibility, consent, registration or appearance.
4. An accepted entry does not imply every person associated with the Team is eligible.
5. Entry changes preserve submission and decision history.
6. Team affiliation and tournament authority are evaluated at the relevant time, not inferred from present-day labels.
7. Tournament operations must work without requiring organizers to collect unnecessary Player Passport data.

### Alternatives considered

| Option | Benefit | Material risk | Disposition |
|---|---|---|---|
| Organization enters directly | Simple for institutional competitions | Fails where one Organization fields multiple teams | Reject as universal model |
| Player enters individually | Supports individual sports | Wrong default for team football; creates unnecessary minor-data exposure | Reject for initial workflow |
| Team enters through TournamentEntry | Separates sporting unit, event and admission | Requires Team identity and entry decision rules | Recommend |

**Disposition:** recommend TournamentEntry as a candidate relationship/entity. Entry rules, roster handling and eligibility authority remain open.

## 6. TOD-04 — Fixture/Match identity, participants and schedule history

### Decision question

What is a Fixture/Match, and how are participants and schedule changes represented?

### Recommended conceptual definition

A **Fixture** is a uniquely identifiable planned contest within a Tournament, ordinarily between two eligible TournamentEntries, with a scheduled time, venue/context and competition stage/round where applicable.

The term **Fixture** is recommended for the planned contest record. **Match** may be used for the actual sporting event that takes place. Whether the distinction requires two separate domain concepts or one Fixture with an actual-event lifecycle should be decided only after workflow evidence; the first version should avoid premature duplication.

### Recommended minimum shape (conceptual, not schema)

- stable fixture identity;
- Tournament reference;
- participant TournamentEntry references;
- scheduled time and venue/context;
- schedule status/history;
- stage/round or grouping where needed;
- actual start/end or played/abandoned status where known;
- linked result assertions;
- provenance and correction history.

### Required invariants

1. A schedule change does not create a new fixture identity unless the competition rules define a genuinely new contest.
2. Historical schedule values remain traceable.
3. A postponed, abandoned, cancelled or replayed fixture is not silently represented as an ordinary completed match.
4. Participants must resolve to entries in the relevant Tournament; arbitrary free-text team names are insufficient as authoritative identity.
5. A fixture's existence does not prove it was played.
6. A match event does not prove any specific Player appeared.
7. Fixture scheduling access does not confer access to restricted Player Passport data.
8. Automatic brackets, complex federation structures and live match telemetry remain outside the initial workflow unless justified by evidence.

### Open questions

- Are walkovers, forfeits, byes, replays and abandoned matches required in the first workflow?
- Are neutral venues and multi-venue events in scope?
- Who may reschedule, cancel or confirm that a fixture was played?
- Is a Match a distinct actual-occurrence record or a lifecycle phase of Fixture?
- What is the minimum viable stage/round vocabulary?

**Disposition:** recommend Fixture as a candidate concept; defer Fixture-versus-Match split pending operational evidence.

## 7. TOD-05 — Result assertion versus accepted/verified result

### Decision question

How can ScoutSA preserve competing score reports without presenting one as truth prematurely?

### Recommended conceptual definition

A **Result submission** is an Assertion about a Fixture: for example, a scoreline, winner, walkover or abandonment claim. It must retain its author, source, time, scope and supporting evidence where available.

An **accepted result** is not merely the latest submitted score. It is the current competition determination reached through an explicitly authorized resolution process. A **verified result** should be used only where a defined verification action, verifier authority, evidence basis, scope and timestamp are recorded.

Do not introduce a generic Result entity that collapses assertion, adjudication, verification and truth into one record.

### Recommended state distinctions for review

- **SUBMITTED** — an attributable assertion has been received.
- **PENDING_CONFIRMATION** — awaiting the applicable confirmation or review.
- **DISPUTED** — incompatible assertions or a formal challenge exist.
- **UNDER_REVIEW** — an authorized review process is active.
- **ACCEPTED** — the authorized competition process has determined the current result.
- **VERIFIED** — a separately defined verification claim has been completed by an authorized verifier.
- **SUPERSEDED** — an earlier assertion or determination has been replaced, with history retained.
- **VOID / NO_RESULT** — the competition authority has determined that no result should stand, with reason and provenance.

These are candidate labels, not a ratified state machine. Accepted and verified must not be treated as synonyms. A tournament organizer's acceptance may be sufficient for an internal competition table while still not meeting an independent verification standard for Player Passport performance.

### Required invariants

1. Conflicting assertions remain separately attributable and inspectable.
2. No first-write-wins, last-write-wins or silent overwrite.
3. Evidence supports a claim; it does not automatically adjudicate the dispute.
4. Only an actor with explicit, current authority for the relevant competition and action may resolve a result.
5. Every consequential correction records actor, authority, time, reason, changed claim/scope and evidence basis.
6. Superseded assertions remain historically traceable.
7. Downstream standings/statistics must identify pending, disputed or stale source data and be recalculated or marked stale after a material correction.
8. A tournament result is not automatically a verified Player performance record.
9. A result can support SeasonPerformance only through a separate provenance and verification assessment appropriate to the specific performance claim.
10. A result status must not be used to infer player participation, eligibility, consent or safeguarding clearance.

### Key architectural recommendation

Reuse the already-ratified **Assertion** concept for every submitted score/result claim. Keep the competition's resolution decision and any scoped Verification distinguishable from those assertions. Whether the accepted determination itself needs a new semantic concept is a governance question; do not settle it through a convenient database column.

**Disposition:** Assertion reuse is the strongest fit with the existing ratified domain. Accepted-result and verification semantics remain open and require explicit authority/process decisions.

## 8. Cross-decision relationship hypothesis

The following is a conceptual hypothesis only:

```text
Organization
   └── time-bounded affiliation ── Team

Tournament
   ├── TournamentEntry ── Team
   └── Fixture
         ├── TournamentEntry (participant A)
         ├── TournamentEntry (participant B)
         └── Result Assertions (existing Assertion semantics)
                  └── authorized resolution / scoped verification
```

This does not define cardinalities, foreign keys, authorization policy or schema. It deliberately does not connect TournamentEntry directly to Player Passport or treat a Team roster as Player Membership.

## 9. Player Passport and SeasonPerformance protection

The Tournament workflow must not corrupt the Player Passport's source-of-truth boundaries.

- Tournament registration is not player registration.
- A Team entry is not a player roster assertion.
- A roster listing is not proof of appearance.
- A fixture is not proof the match took place.
- A score is not proof of a particular player's contribution.
- A tournament statistic is not automatically a verified SeasonPerformance record.
- Organizer access is not broad Player Passport access.
- A public tournament listing does not authorize public player discovery, media reuse or direct contact with minors.

If later evidence supports recording player participation, treat it as a distinct, purpose-bound, attributable claim with its own evidence, verification, consent, visibility and correction requirements. It must not be inferred from team entry or match result.

## 10. Decision dependency and review order

| Order | Decision | Depends on | Must not be assumed |
|---:|---|---|---|
| 1 | TOD-01 Tournament | Organizer authority, event scope | Organizer legitimacy or legal authority |
| 2 | TOD-02 Team | Organization identity, affiliation history | Team = Organization |
| 3 | TOD-03 TournamentEntry | Team identity, tournament rules | Entry = player participation |
| 4 | TOD-04 Fixture | Entries, schedule policy | Fixture = played match |
| 5 | TOD-05 Result assertion | Assertion, evidence, resolution authority | Submitted score = truth/verified performance |

The sequence is a review order, not a claim that every dependency is already resolved. TOD-06 (submit/dispute/adjudicate/correct authority) and TOD-07 (organizer verification) are critical dependencies for any executable workflow and must remain open.

## 11. Evidence needed before ratification

This desk reconciliation is not empirical validation. Before ratification, the governance review should require:

1. A traceability review against the Constitution and the complete relevant Domain/Relationship sections.
2. At least two contrasting synthetic tournament examples: one club/academy tournament and one school/league event.
3. Edge cases: one Organization with multiple age-group teams; same-name teams from different areas; a team changing affiliation; a team entering two divisions; a postponed/replayed fixture; conflicting result reports; a correction after standings publication.
4. Explicit confirmation that the workflow can be useful without collecting minor Player Passport data.
5. A documented authority matrix for organizer, team representative, fixture editor, result submitter, result reviewer and verifier. Unknown authority remains a hold, not an assumed permission.
6. A decision on whether actual Match occurrence needs a distinct concept from scheduled Fixture.
7. A clear mapping to existing Assertion, Verification, Evidence, SeasonPerformance and AuditEvent semantics.
8. A legal/safeguarding review before any real minor data, roster, contact or media workflow is considered.

No external stakeholder validation is claimed in this paper. Synthetic examples can test internal coherence; they cannot establish real-world demand, lawful basis or institutional authority.

## 12. 33-perspective challenge — concentrated findings

This is a targeted application of the existing 33-perspective register, not 33 independent empirical tests and not a new ratification exercise.

| Perspective family | Principal challenge | Required control |
|---|---|---|
| Identity and ontology | Are Organization, Team, Entry, Fixture and Assertion being conflated? | Separate identities and explicit mappings |
| Authority and governance | Who may create, admit, schedule, submit, resolve and verify? | Action- and scope-specific authority; unresolved = hold |
| Evidence and epistemics | Does a score become truth merely because it is stored? | Assertion provenance, conflict preservation, scoped verification |
| Time and change | Can names, affiliation, schedule or scores change without history? | Effective periods, immutable provenance, correction/supersession |
| Safety and privacy | Does tournament administration expose player or minor data? | No Player Passport dependency by default; purpose limitation |
| Operational resilience | Can the workflow tolerate duplicates, retries and poor connectivity? | Later synthetic fault tests; no silent merge or overwrite |
| Product utility | Does an organizer get immediate value without a scouting feature? | Validate event, team, entry, fixture and result workflow with organizers |
| Derived data integrity | Do standings/statistics overstate disputed or stale records? | Propagate status and invalidate/recalculate dependent views |
| Maintenance and scope | Are we building complex brackets/federation logic too early? | Manual/simple fixture workflow first; evidence-led expansion |

The strongest design risk is not missing a table. It is allowing a convenient relationship or status label to imply identity, eligibility, authority, truth or permission that has not been established.

## 13. Gate disposition and stop conditions

**Disposition: PROPOSED FOR GOVERNANCE REVIEW ONLY.**

- No new semantic concept is ratified by this paper.
- The frozen Domain Model and Relationship Model remain unchanged.
- The frozen MVP/schema/physical-table boundaries remain unchanged.
- No SQL, migration, RLS, API, UI, authentication, production behavior or pilot is authorized.
- No real player/minor data or organizer access is authorized.
- The canonical Gate Status remains authoritative. Its recorded controlled next move is external validation; this paper does not replace that priority or claim validation has occurred.

**Stop if:** the proposed workflow requires assumed organizer authority, guessed eligibility, unreviewed legal/guardian precedence, unrestricted player data, unverified player participation, or automatic adjudication of conflicting results.

## 14. Proposed governance decision record (blank)

| Item | Decision |
|---|---|
| TOD-01 Tournament concept/lifecycle | PENDING |
| TOD-02 Team identity/affiliation | PENDING |
| TOD-03 TournamentEntry | PENDING |
| TOD-04 Fixture versus Match | PENDING |
| TOD-05 Assertion / accepted / verified result | PENDING |
| Constitution impact | NOT ASSESSED |
| Domain amendment required | NOT RATIFIED |
| Relationship amendment required | NOT RATIFIED |
| Gate impact | NONE |
| Ratifying authority / date / evidence | NOT RECORDED |

**Final principle:** Build the competition record without turning it into an unsupported claim about a player. Keep identity separate from affiliation, entry separate from participation, fixture separate from occurrence, assertion separate from truth, and accepted result separate from independent verification.
