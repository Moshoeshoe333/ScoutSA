# Tournament Data Architecture — Cross-Module Contract Draft

**Status:** Internal architecture draft · synthetic prototype scope · NOT RATIFIED · no implementation authority  
**Branch:** prototype/internal-demo  
**As at:** 17 November 2026

## 1. Decision boundary

This document reconciles the existing tournament proposals into one reviewable relationship contract before shared persistence is considered. It does not amend the Constitution, Domain Model, frozen Gate 2 Relationship Model, schema boundary, or implementation authorization.

The canonical domain model remains authoritative. Tournament-specific proposals may extend its application only where they do not invent new semantics or bypass unresolved authority, identity, access, retention, safeguarding, correction or dispute decisions.

**No database, migration, API, RLS, authentication, shared store, real-data import or production integration is authorized by this draft.** The prototype remains synthetic and isolated.

## 2. Existing source models reviewed

- TOURNAMENT-RELATIONSHIP-MODEL.md
- TOURNAMENT-ORGANIZER-PORTAL-MODEL.md
- TOURNAMENT-DAY-OPERATIONS-MODEL.md
- TOURNAMENT-STAT-RECONCILIATION-MODEL.md
- PLAYER-TOURNAMENT-HISTORY-MODEL.md
- MATCH-DAY-HANDOFF-CONTRACT.md
- docs/01-domain-model.md and docs/02-relationship-model.md

The prototype documents are proposals, not authoritative production specifications. The root domain and relationship models retain precedence.

## 3. Proposed canonical relationship chain

Organization (existing domain concept)
→ Organizer / authorized event role (scope and authority unresolved)
→ OrganizerSubmission
→ Tournament
→ TournamentEdition
→ Division
→ TournamentTeamEntry → Team
→ CoachAssignment → Coach
→ PlayerParticipation → Player
→ Fixture
→ MatchParticipation → PlayerParticipation
→ Lineup / substitution observations
→ Derived appearance intervals
→ MatchEvent
→ StatisticObservation → MetricDefinition

Fixture-scoped match-day records also include official assignments, match reports and source references. Organizer feature-permission requests and public listings have separate lifecycles. Evidence, Source, Assertion, Verification and ReviewDecision attach to the claims or records they actually support, with explicit scope.

This is conceptual, not a physical ERD. Arrows show proposed relationship paths, not cardinalities or authorization grants.

## 4. Record grain and proposed stable identifiers

| Concept | Proposed stable key | Record grain / rule |
|---|---|---|
| Tournament | tournament_id | Competition identity across editions |
| Tournament edition | edition_id | One specific season/edition of a tournament |
| Organizer submission | submission_id | One submission/revision process; not the tournament itself |
| Organizer authority evidence | organizer_evidence_id | One evidence reference for a defined authority claim |
| Feature permission request | feature_request_id | One purpose/scope-specific permission request |
| Public listing | listing_id | One separately approved publication lifecycle |
| Division | division_id | One competition stream within an edition |
| Team | team_id | Stable team identity, independent of one event |
| Team entry | team_entry_id | One team's entry in one edition/division |
| Coach | coach_id | Stable coach identity; not proof of credentials |
| Coach assignment | coach_assignment_id | One coach's role for one team entry and effective period |
| Player | player_id | Stable Player Passport identity |
| Player participation | participation_id | One player's registration/participation relationship to one team entry |
| Fixture | fixture_id | One scheduled/recorded fixture in one division |
| Match participation | match_participation_id | One player's participation context in one fixture |
| Match-day record | match_day_id | One operational record/session for a fixture; multiplicity needs decision |
| Lineup entry | lineup_id | One fixture-specific lineup status for a match participation |
| Substitution observation | substitution_id | One reported substitution relationship and minute |
| Match event | event_id | One fixture-scoped event observation |
| Statistic definition | metric_definition_id | Versioned meaning, unit, scope and calculation for a metric |
| Statistic observation | stat_observation_id | One metric value for one match participation and source |
| Source/evidence reference | source_id / domain evidence ID | Provenance reference; a label alone is not the source artifact |
| Reconciliation finding | finding_id | One proposed match or conflict among records |
| Review decision | decision_id | One attributable disposition; must not overwrite source observations |

Names, labels, jersey numbers, dates and display text are attributes, never relationship keys. Identifier prefixes used in the prototype are synthetic labels, not a production ID strategy.

## 5. Relationship rules proposed for review

1. A tournament may have multiple editions; an edition belongs to one tournament.
2. A division belongs to one edition.
3. A team entry belongs to one edition and one division and references one team identity.
4. A coach assignment connects a coach to a team entry for a stated role and effective period. It does not make the coach permanently part of the tournament.
5. A player participation connects one player to one team entry. Registration, eligibility, permission and actual match appearance remain separate facts/states.
6. A fixture belongs to one division and references its participating team entries. Both entries should resolve to the fixture's edition/division if this invariant is ratified.
7. Match participation connects a player participation to a fixture. Match events and statistical observations should resolve through this fixture-scoped record, not through a player name or bare player ID.
8. Lineups and substitutions are observations about match participation. Appearance intervals/minutes are derived from those observations and configured match rules; they are not independent source records.
9. A match event is not automatically a statistic. A statistic is not verified because it links to an event.
10. Evidence/source references, assertions, verification, findings and review decisions remain distinct. A source label does not establish authenticity or authority.
11. Organizer identity, authority to submit an event, event status, feature permission, media rights and public publication are separate states. None implies another.
12. A tournament listing is not a player opportunity, trial invitation, player endorsement or guarantee of selection.

These are proposed constraints. Any rule that adds a semantic assumption or settles a deferred Gate 2 issue must return to governance before ratification.

## 6. Cross-document inconsistencies and proposed resolutions

| Issue found | Existing variation | Proposed resolution for review |
|---|---|---|
| Edition key naming | edition_id and tournament_edition_id both appear | Standardize conceptual key as edition_id; preserve any historical payload field only through an explicit versioned mapping |
| Match-stat join path | Relationship model uses match_participation_id; reconciliation proposal uses fixture_id + participation_id directly | Make match_participation_id the canonical fixture-scoped join target for statistic observations; keep fixture and participation references as validated context, not competing identity paths |
| Day-operations join path | Handoff currently carries fixtureId and participationId | Treat as a v1 transport representation; a future adapter would resolve the pair to one canonical match participation. No adapter or persistence is authorized |
| Organizer versus Organization | Organizer is modeled as an organization-like record, while root domain already defines Organization | Do not create a parallel identity concept by convenience. Resolve whether Organizer is an Organization role/relationship and how authority evidence attaches |
| Evidence versus source | Modules use local source_id and source labels | Keep provenance reference separate from the actual evidence artifact, assertion, verification and review decision |
| Match-day multiplicity | Demo assumes one match-day record; model leaves multiple sessions/restarts open | Do not freeze one-to-one cardinality. Decide how sessions, abandoned/restarted matches and periods are represented |
| Appearance multiplicity | Current calculation assumes one entry/exit interval | Keep appearance derived; return substitutions, extra time, temporary dismissals and restart segments remain unresolved |
| Event/stat correction | Reconciliation preserves disputes but has no durable correction history | Require versioned source observations and separate attributable correction/adjudication decisions before persistence |
| Organizer permission and player permission | Feature permission is separate in principle, but listing could blur it | Keep event feature permission, media/content rights, player participation and player/guardian permission as independent scopes |

## 7. Recommended source-of-truth boundaries

- **Identity:** Player, Coach, Team and Organization are stable domain identities; event-specific involvement belongs in junction/participation records.
- **Competition structure:** Tournament → Edition → Division → Team Entry.
- **Team roles:** Coach Assignment is time- and scope-bound; Player Participation is event/team-entry-bound.
- **Fixture participation:** Match Participation is the fixture-specific bridge from Player Participation.
- **Match operations:** lineup, substitution, event and report records are observations with their own sources and review states.
- **Appearance/minutes:** derived from validated lineup/substitution observations plus explicit match-duration/competition rules. Never silently promote a calculation into an official statistic.
- **Statistics:** Statistic Observation references a versioned Metric Definition and Match Participation, with source/provenance and review lifecycle. Missing is not zero.
- **Organizer lifecycle:** submission, authority evidence, feature permission, review decision and public listing are separate records.
- **History:** Player Tournament History is a read model/projection over underlying relationships, not an independent source of truth or editable player record.

## 8. Integrity checks a future implementation would need to prove

These are acceptance requirements to design and test later, not authorization to implement now:

- no duplicate stable IDs within their entity scope;
- every edition resolves to a tournament;
- every division resolves to one edition;
- every team entry resolves to one team, edition and division;
- coach assignments and player participations resolve to valid identities and team entries;
- fixtures resolve to valid division and team entries with consistent edition/division scope;
- each match participation resolves to one fixture and one player participation;
- lineup, substitution, event and statistic records resolve to the same fixture-scoped participation context;
- derived appearances reconcile with source lineup/substitution versions and competition timing rules;
- metric observations retain definition version, unit, denominator where applicable, source and correction history;
- cross-module imports are idempotent only under an explicit versioned contract and stable key mapping;
- conflicts, replays, stale versions and rejected imports are preserved as reviewable outcomes rather than silently overwritten;
- reads and changes are purpose-bound, actor-authorized, tenant/organization-scoped where applicable, and safeguarding-aware;
- no public disclosure or external contact follows from record existence or technical linkage alone.

## 9. Decisions still blocked / not inferred

1. Whether and how Organizer maps to the root Organization entity, and what establishes representative authority.
2. Cardinalities and lifecycle for edition/division/team entry, including event-specific competition rules.
3. Whether a player may have multiple simultaneous team entries or registrations in the same competition.
4. Match participation uniqueness and handling of guest players, transfers, walkovers, abandoned/replayed fixtures and multi-leg ties.
5. Match-day session multiplicity, extra time, return substitutions and competition-specific appearance calculations.
6. Canonical source/evidence artifact, provenance, authenticity and verification lifecycle.
7. Metric definition governance, source hierarchy, corrections, disputes, appeals and reviewer independence.
8. Retention, privacy classification, access, disclosure, safeguarding, guardian authority and real minor-data handling.
9. Organizer feature permission instrument, media/content rights, listing review, expiry, suspension and removal.
10. Production identifier strategy, schema constraints, transaction boundaries, import conflict strategy, RLS, API and authentication.

These are decision items, not blank spaces for engineering to fill with assumptions.

## 10. Proposed next sequence

1. Review this crosswalk against the canonical domain and relationship models.
2. Resolve identifier/join-path inconsistencies first, especially edition_id and match_participation_id.
3. Create a decision ledger for each unresolved item, with owner/authority, evidence required, options, consequences and stop condition.
4. Reconcile the five existing tournament proposal documents only after those decisions are accepted; do not copy this draft as if it were ratified.
5. Only after explicit ratification and applicable governance/legal/security review may a schema boundary proposal be considered.

**Current conclusion:** the prototype has enough separate tournament workflows to expose the major relationship seams. It does not yet have one ratified cross-module contract. The next useful progress is resolving the seams, not adding another UI page or claiming shared persistence.
