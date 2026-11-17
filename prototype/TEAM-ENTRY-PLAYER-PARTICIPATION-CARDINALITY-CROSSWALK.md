# Team Entry and Player Participation Cardinality Crosswalk

**Status:** Internal evidence crosswalk · NOT RATIFIED · no implementation authority  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026

## 1. Question and boundary

This crosswalk reviews TAD-004: permitted multiplicities and lifecycle rules for a Team Entry and Player Participation within an edition/division. It inspects the canonical domain boundary, tournament proposals, synthetic manager behavior, eligibility review, match-day handoff and player-history projection.

It does not decide competition regulations, establish real player identity, authorize roster processing, or amend the frozen Gate 2 Relationship Model. The prototype remains synthetic and isolated. No schema, migration, API, RLS, authentication, shared persistence, real-data import, public listing, player disclosure or mainline implementation is authorized.

## 2. Findings

### F-1 — Team identity and team entry are conceptually separate, but the canonical Team domain boundary is not yet established

The Tournament Relationship Model and Data Architecture Draft both distinguish a stable Team identity from an event-specific Team Entry. A Team Entry is scoped to an edition and division and references one Team identity.

However, the current Tournament Manager creates a new `teamId` and `entryId` together whenever the team-registration form is submitted. The form does not select an existing Team identity. The synthetic seed also supplies one Team identity for each of two entries. Consequently, the current UI cannot demonstrate one enduring Team entering multiple divisions or editions. Nor does it test whether duplicate entries for the same Team in the same division are prohibited.

The reviewed canonical Domain Model defines Player and Organization, and makes Organization–Player Membership first-class; it does not establish a ratified Team identity/Team Entry cardinality contract. A prototype Team label or generated ID must not be promoted to a canonical domain entity by implication.

**Finding:** the Team/Team Entry separation is a useful proposal, not a settled root-domain contract. Team identity reuse, ownership/identity resolution, and permitted entry multiplicity remain open.

### F-2 — One Team Entry to many Player Participations is supported as a proposal, not as a complete registration rule

The eligibility model explicitly proposes `TeamEntry 1 — N PlayerParticipations`. The relationship model and architecture draft likewise link a participation to a team entry. Tournament Manager permits adding multiple synthetic players to a selected entry.

This establishes the intended basic direction of the relationship. It does not establish competition roster limits, registration windows, replacement rules, squad locking, guest-player treatment or whether a participation may be active for more than one entry.

### F-3 — The current UI cannot test repeat participation by the same Player identity

The Tournament Manager creates a fresh `playerId` and `participationId` for every added player. It rejects a repeated synthetic display alias globally within the current session, but it has no existing-Player selector or player-identity reuse flow. That alias check is not a person-identity constraint and cannot prove that the same person cannot have multiple registrations.

The current design therefore does not demonstrate dual registration, transfer, guest participation, re-registration or reinstatement. It also cannot safely infer that two records with different IDs represent different real people.

### F-4 — Registration, roster status, eligibility, permission and appearance must remain distinct

The Tournament Relationship Model describes Player Participation as carrying registration/permission state, while the current Manager adds a roster status and a permission display field. The Eligibility Review model separately scopes an eligibility review to a particular participation, division and edition. Its own semantics correctly state that “eligible for human review” is not a finding of eligibility, selection or trial readiness.

Day Operations and the Match-Day Handoff then use a participation ID for fixture-specific lineup, substitution, event and appearance records. The current handoff permits one lineup entry per participation per fixture in version 1; that is a fixture-level demo constraint, not a rule about how many team registrations a player may hold across a competition.

**Finding:** these are distinct facts and should not be collapsed into one status:
- registration/submission and its effective period;
- competition roster state (for example pending, accepted, suspended, withdrawn, subject to actual rules);
- competition-specific eligibility review and its decision authority;
- player/guardian permission and its purpose/scope;
- fixture selection/lineup and actual appearance;
- derived minutes and statistical observations.

A roster label or permission field must not stand in for an authoritative eligibility decision or valid consent.

### F-5 — Transfers and duplicate/conflicting registrations need temporal and rule-scoped semantics

Current models do not define a transfer record, effective-from/effective-to dates, release/clearance evidence, registration-window rules, or how prior and future fixture records behave when a player changes team entry. They also do not define whether duplicate submissions should be rejected, held as possible duplicates, or reconciled through an attributable decision.

A global “one player, one team per edition” constraint would be too strong without competition-rule evidence. Conversely, allowing arbitrary simultaneous active registrations without a competition-specific conflict rule would permit contradictory rosters and misleading history.

### F-6 — Player Tournament History is a projection, not proof of valid registration

The history model follows Player → PlayerParticipation → TeamEntry → Edition/Division/Fixture and expressly keeps possible duplicate candidates separate until a human decision is supported by evidence. The current page contains only two fixed fictional adult snapshots and does not query the manager or share live state. It is not a registration ledger or independent identity-resolution service.

## 3. Evidence inventory

| Source | What it demonstrates | What it does not establish |
|---|---|---|
| `TOURNAMENT-RELATIONSHIP-MODEL.md` | Team and Team Entry are proposed as separate concepts; participation links Player to Team Entry | Canonical Team entity, cardinality constraints or competition rules |
| `TOURNAMENT-DATA-ARCHITECTURE-DRAFT.md` §5 | Proposed Team Entry and Player Participation relationship rules; registration, eligibility, permission and appearance intended as separate facts | Ratified constraints, transfer lifecycle or production authority |
| `tournament-manager.html` | One entry selects one division; one or more synthetic participations can be added to an entry; fresh Team and Player IDs are generated; aliases and shirt numbers have local demo checks | Reuse of Team/Player identities, dual registration, real duplicate detection, transfers or competition eligibility |
| `TOURNAMENT-ELIGIBILITY-REVIEW-MODEL.md` | Eligibility review is participation-, division- and edition-scoped; one participation can have multiple review records | Official eligibility, accepted evidence, appeal authority or rule ownership |
| `TOURNAMENT-DAY-OPERATIONS-MODEL.md` and `MATCH-DAY-HANDOFF-CONTRACT.md` | Fixture-level lineup/substitution relationships use participation IDs; one lineup per participation per fixture in current v1 | Registration multiplicity across teams, divisions or editions |
| `PLAYER-TOURNAMENT-HISTORY-MODEL.md` | History is a participation-scoped read model; possible duplicate candidates are not silently merged | Live canonical identity resolution or valid registration |
| `docs/01-domain-model.md` | Player identity is stable; Organization–Player Membership is a first-class relationship and current organization is derived from membership | A ratified Team/Team Entry model or competition registration rules |
| `docs/02-relationship-model.md` | Gate 2 cardinality and lifecycle policy remains deliberately deferred; technical cardinalities are not frozen | Permission to infer a new Team or Player relationship constraint |

## 4. Candidate conceptual boundaries

The following are candidates for governance review, not ratified rules:

1. **Team** — enduring football team identity, if and when the canonical domain model establishes its meaning and identity-resolution rules.
2. **Team Entry** — one team's entry into a defined edition/division/competition context. It should not be assumed that a Team can have only one entry per edition or only one division entry without competition rules.
3. **Player Participation** — one player's registration/participation relationship to one Team Entry, with explicit lifecycle and effective-period semantics once defined.
4. **Registration decision** — whether a submission is accepted, rejected, pending, withdrawn or otherwise processed under the competition's rules; not equivalent to eligibility.
5. **Eligibility review** — competition-rule-specific review attached to the relevant participation and context; not a permanent Player attribute.
6. **Permission/consent** — purpose-bound player/guardian authority, separately scoped and verified; not implied by roster acceptance.
7. **Fixture appearance** — lineup/substitution/event observations attached to the applicable participation and fixture; actual appearance is not inferred from registration.
8. **Transfer/release/reinstatement** — a potential lifecycle event or set of attributable decisions, not a silent mutation of the player's historical team entry.

## 5. Candidate direction

**Candidate:** permit multiple Player Participation records for the same Player identity where distinct team-entry or competition contexts legitimately require them, but define active-overlap and uniqueness constraints only at the exact scope established by the relevant competition rules. Preserve effective periods and attributable registration/transfer decisions. Do not impose a global one-player/one-team rule.

Likewise, preserve Team identity separately from Team Entry if the canonical domain owner ratifies that distinction. Do not assume duplicate Team Entries are valid or invalid without defining the scope (edition, division, competition, and entry lifecycle).

This direction is more expressive than a global uniqueness shortcut, but it is not a final cardinality decision. It must not be used to implement production constraints.

## 6. Decisions and evidence still required

- Is Team a canonical domain entity, and what authoritative identity evidence distinguishes a continuing team from a renamed, merged, split or successor team?
- Can one Team enter multiple divisions in the same edition? Can it enter multiple competitions or editions? Are duplicate entries within one division prohibited?
- What is the exact grain of Team Entry: edition + division + team, or a competition-specific registration instance with its own lifecycle?
- Can one Player be registered to multiple Team Entries in the same edition, across divisions, or across competitions? Which overlaps are prohibited, permitted or exception-only?
- What do representative regulations say about guest players, dual registration, age-group movement, transfers, loan arrangements, replacement players, registration windows, withdrawals and reinstatement?
- What constitutes a transfer or release, who can authorize it, what evidence is required, and how do effective dates affect already-played fixtures and statistics?
- How are duplicate identity candidates detected without merging two people or splitting one person into multiple records? Who adjudicates conflicts, and how are corrections and appeals preserved?
- Which states belong to registration, roster administration, eligibility, guardian/player permission, fixture selection and appearance respectively?
- What are the competition-specific roster limits, squad-number rules and exceptions? The current 1–99 number and within-entry uniqueness are demo rules only.
- What safeguards, access, retention and purpose limitations apply before any real player/minor information is processed?

Required evidence includes representative published competition regulations and actual edge-case scenarios, with source, version/effective date and authority recorded. Where no external evidence is available, keep the rule explicitly unresolved rather than inventing a universal football rule.

## 7. Stop conditions

Until the relevant decisions are ratified:
- do not enforce global one-player/one-team or one-team/one-division uniqueness;
- do not assume multiple simultaneous registrations are permitted merely because multiple records can be created;
- do not merge or split player/team identities from names, aliases or display labels alone;
- do not treat a roster status, eligibility review label, permission string or match appearance as proof of another;
- do not silently overwrite a prior participation when a transfer or withdrawal is represented;
- do not process real player or minor registration, guardian data, identity documents or eligibility evidence;
- do not create production schema constraints, migrations, API behavior, RLS policies or shared persistence from this crosswalk.

## 8. Outcome for TAD-004

**TAD-004 remains OPEN.** Evidence confirms the intended basic relationship shape and identifies specific prototype limitations, but no representative competition regulations or authoritative domain decision has been supplied to settle Team Entry multiplicity, player dual registration, transfer lifecycle or uniqueness scope.

This review is documentation and source inspection only. It does not change Gate 2, ratify a domain relationship, authorize implementation, or establish real-world registration or eligibility.
