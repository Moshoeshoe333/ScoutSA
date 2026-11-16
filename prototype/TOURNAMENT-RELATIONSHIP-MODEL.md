# Tournament Relationship Model — Prototype Proposal

**Status:** Prototype design proposal; not ratified for mainline implementation.  
**Branch:** `prototype/internal-demo`  
**Data:** Synthetic fixtures only.

## Purpose

The tournament registry is a relationship hub. A tournament record is not a flat event card: it is the parent context for editions, organizers, venues, divisions, team entries, coach assignments, fixtures, player participation and attributable statistics.

Stable primary IDs identify records. Foreign keys and junction records connect them. Names, team labels, dates and display text are not keys.

## Core records and primary keys

| Record | Primary key | Key relationships |
|---|---|---|
| Tournament | `tournament_id` | One tournament has one or more editions |
| Tournament edition | `edition_id` | `tournament_id`, organizer and venue references |
| Organizer organization | `organizer_id` | Organization identity and authority evidence |
| Venue | `venue_id` | Venue/locality reference |
| Division | `division_id` | `edition_id`; age/gender/competition format as declared |
| Team | `team_id` | Stable team identity, separate from event entry |
| Tournament team entry | `team_entry_id` | Junction: `edition_id` + `team_id` + `division_id` |
| Coach | `coach_id` | Stable coach identity, separate from event role |
| Coach assignment | `coach_assignment_id` | Junction: `team_entry_id` + `coach_id` + role and date scope |
| Player | `player_id` | Stable player identity, separate from event participation |
| Player participation | `participation_id` | Junction: `team_entry_id` + `player_id` + registration/permission state |
| Fixture | `fixture_id` | `division_id`, home and away `team_entry_id` references |
| Player match participation | `match_participation_id` | `fixture_id` + `participation_id`; minutes/appearance context |
| Statistic definition | `stat_definition_id` | Metric name, definition, unit, calculation and scope |
| Statistic observation | `stat_observation_id` | `match_participation_id` + `stat_definition_id` + value + source |
| Evidence source | `source_id` | Origin, author/recorder, timestamp, method, reference and review state |

A coach is not permanently attached to a tournament just because they coached one participating team. A player is not permanently attached to a tournament just because they appeared in one match. The event-specific junction records preserve the history and scope of each relationship.

## Relationship outline

```text
Tournament
  └── TournamentEdition
       ├── Organizer
       ├── Venue
       └── Division
            ├── TournamentTeamEntry ── Team
            │       └── CoachAssignment ── Coach
            │       └── PlayerParticipation ── Player
            └── Fixture
                    └── PlayerMatchParticipation
                            └── StatisticObservation
                                    ├── StatisticDefinition
                                    └── EvidenceSource
```

## Statistics: minimum evidence contract

A stat is not just `player_id + goals`. A usable observation must be scoped to a specific fixture and participation record, with:

- metric definition and unit (e.g. goals, minutes played, saves, tackles won);
- value and whether it is a count, rate, percentage or qualitative observation;
- fixture, division, team entry and event edition context;
- recorder/source, recorded timestamp and source reference;
- method (official match sheet, independent analyst, video review, coach observation, etc.);
- review state: reported, checked against source, disputed, corrected or withdrawn;
- correction history and the identity/role of the reviewer when real systems are authorized.

Do not merge incompatible definitions (for example, two providers' different definitions of an assist). Keep the source observation and any derived calculation distinguishable. Missing data is not zero. A stat line is evidence to inspect, not a talent verdict, selection decision, guarantee or ranking on its own.

## Organizer directory and future feature pathway

The organizer relationship is a first-class operational record. Before an event can be promoted in a public ScoutSA listing, the future system should separately establish:

1. the organizer's legal/operating identity and authorized representative;
2. the representative's authority to submit and manage the event;
3. the event's current dates, venue, divisions, eligibility and status;
4. whether the organizer permits ScoutSA to feature the event and what content may be used;
5. a public contact route and its source/date, stored separately from private account data;
6. listing review, publication status, expiry and correction/removal process.

A historical news article or social post is a discovery lead, not organizer consent, proof of current event status or permission to reuse media. The prototype does not contact organizers or publish events.

## Safeguarding and data boundaries

- Use synthetic fixtures in the prototype. Do not enter real player names, contact details, dates of birth, IDs, images, match footage or guardian records.
- Do not capture player-level information about minors until lawful purpose, safeguarding design, age handling, guardian authority, player participation, retention, access and disclosure controls have been separately reviewed and authorized.
- Never expose a minor's private contact information or allow direct private contact from scouts, agencies or organizers.
- Any future sharing/referral must be purpose-specific, recipient-verified and human-approved; an internal scouting agent may assist review but must not autonomously disclose player records.
- Public organizer/event listing permission is separate from player participation, media rights and player/guardian permission.
- No POPIA compliance, SAFA/MySAFA integration, affiliation verification or safeguarding certification is claimed by this design.

## Prototype acceptance checks

- Every tournament, edition, organizer, venue, division, team, coach, player, fixture, participation and stat observation has a distinct synthetic primary ID.
- Junction records express many-to-many relationships; a display name is never used as a join key.
- A selected tournament can display its teams/coaches, player participations, fixtures/results, statistics and ID relationship map.
- Filters and tabs do not create or imply real records, authorization, verification or external contact.
- Statistics show provenance/review state and remain scoped to the relevant fixture and participation.
- Mobile layout and browser interaction tests pass.

## Explicit non-goals

This proposal does not create a production database schema, API, RLS policy, authentication, import pipeline, external organizer CRM, messaging, event publication, live stats feed, scouting decision engine or permission service. Mainline implementation and governance gates remain unchanged.
