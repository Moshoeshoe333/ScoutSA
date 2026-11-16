# ScoutSA Vaal-to-National Operating Model

**Status:** product / operating proposal for review; not ratified as policy and not implementation authorization  
**Starting point:** SAFA Emfuleni / ELFA  
**Long-term aim:** a trusted route from grassroots participation to appropriate football development and opportunity across South Africa  
**Branch:** `prototype/internal-demo`

## 1. Mission

ScoutSA is a grassroots football discovery, evidence and opportunity network. It should help the football ecosystem become more visible and better connected without pretending that visibility is selection, verification is a guarantee, or a profile is an opportunity.

The operating model has six connected workstreams:

1. Map the football ecosystem: teams, schools, tournaments, coaches, venues, creators and organisations.
2. Capture structured football activity and performance evidence at tournaments and leagues.
3. Identify potential talent through an internal scouting-support agent, with human review.
4. Connect schools and development structures to safe player pathways.
5. Work with football creators and media partners to produce permissioned, useful football media.
6. Route appropriate, approved profiles and opportunity requests to verified clubs, academies and agencies nationally.

## 2. Partnership sequence: SAFA Emfuleni first

The first institutional operating target is SAFA Emfuleni / ELFA. ScoutSA must complement, not bypass, the existing football structures.

### Proposed first engagement
- Understand the current association structure, competitions, streams, age groups and season calendar.
- Request a current club/team list and the rules for confirming affiliation.
- Agree what tournament observation, photography, match-stat capture and player-development activity can be supported.
- Identify the correct points of contact for technical development, competitions, safeguarding and media permissions.
- Agree a small, observable demonstration before proposing broad integration.

**No partnership is claimed.** A meeting, email, public report or team appearance does not equal an MoU, endorsement, data-sharing agreement or permission to collect personal information.

### Association boundary
- Association records are authoritative only for the facts the association is entitled and able to confirm.
- A club's affiliation does not automatically prove every coach's qualification, every player's identity, or every safeguarding practice.
- ScoutSA must preserve source, date, scope and expiry/re-check date for each verification.

## 3. Workstream A — Vaal Football Ecosystem Register

The team register is the first foundation. It must include:
- affiliated clubs and teams;
- independent/community teams;
- academies and development programmes;
- senior, reserve, junior and women's/girls teams;
- school teams and university/college teams;
- tournament-only teams and visiting teams;
- inactive, merged, renamed and newly formed teams as historical entities.

A club may have multiple teams by age group and gender. Model the organisation separately from its squads/teams. A single organisation name must not be treated as one team.

Coverage must be tracked by locality, competition, season, age group and gender. “All Vaal teams” is a target for a defined and maintained coverage process—not a claim based on a web search.

## 4. Workstream B — Tournaments as a structured observation network

Tournaments are a valuable way to observe players and coaches across multiple teams and contexts. They are not a shortcut around consent or reliable measurement.

### Event onboarding
Before collecting any player-level data, record:
- organiser and event authority;
- competition name, dates, venues and age divisions;
- participating teams and team representatives;
- match schedule and format;
- rules and official match records available;
- observer / statistician identities and roles;
- photo/video permissions and permitted uses;
- player/guardian notices and permissions required for the age group;
- retention and correction process;
- incident and safeguarding escalation route.

### Match-stat capture
Capture only metrics that can be defined consistently and observed reliably. A proposed first event schema:

**Match:** event ID, fixture ID, date/time, venue, age group, competition format, team IDs, score, match duration, source of official result, recorder and correction status.

**Player observation:** pseudonymous player/event identifier, squad number only where appropriate, team, position observed, minutes observed, substitution state, and event-linked observations.

**Candidate football events:** goals, assists (with explicit attribution rule), shots, shots on target, key passes, chances created, successful/attempted tackles, interceptions, recoveries, clearances, aerial duels, saves, crosses, set-piece actions, fouls and cards where officially recorded.

Do not attempt to capture every metric at the first tournament. Begin with a small, observable, position-aware set. Define denominator and observation opportunity. For example, “three tackles” is meaningless without minutes played, role, match context and the recorder's definition of a tackle.

### Coach evidence
Coach profiles should distinguish:
- self-reported experience;
- team/season history;
- qualifications and licence evidence;
- association confirmation;
- observed coaching session or tournament context;
- references and expiry/re-check status.

Never imply that a coach is qualified or endorsed solely because their team participated in an event.

### Quality controls
- Two observers independently record a small sample to estimate inter-rater agreement.
- Reconcile scores and official match events with the organiser/referee records where available.
- Store corrections as new versions; do not silently overwrite a disputed statistic.
- Flag missing minutes, unknown player identity, ambiguous attribution and incomplete match sheets.
- Show confidence and source provenance with every statistic.
- Do not compare raw totals across different age groups, formats, positions or playing time without an appropriate context model.

## 5. Workstream C — Internal scouting-support agent

The internal agent is a decision-support tool for ScoutSA's authorised scouting team. It is not an autonomous talent judge, agent, recruiter or selection authority.

### Proposed pipeline
1. Ingest approved event statistics, authorised observations and permissioned media references.
2. Validate source, event, team, age group, identity linkage and data completeness.
3. Separate measured match events from subjective scout observations.
4. Generate a role- and age-contextual shortlist for a human scout.
5. Show why each player was surfaced, the evidence behind each signal, missing data and confidence limitations.
6. Human scout reviews full match context and can accept, reject, defer or request more observation.
7. A separate safeguarding/permission gate determines whether a profile can be shared with a named recipient.
8. Record the decision, reviewer, reason, evidence version, recipient and permission scope.

### What the agent may do
- identify statistically unusual or promising patterns for further observation;
- detect repeated performance across more than one match;
- surface players overlooked by raw goal/assist rankings;
- compare a player with a clearly defined age/position/context cohort when sample size supports it;
- find gaps in observation and recommend another viewing;
- draft an internal scouting note with citations to the underlying event records.

### What the agent must not do
- declare a player “professional-ready”, guarantee potential or predict a career as fact;
- rank children using opaque, unvalidated scores;
- infer character, discipline, health, family circumstances or protected traits from footage or data;
- make selection, rejection, contract, trial or placement decisions;
- expose minors to agencies, agents, scouts or the public without the required purpose-specific permission and human authorization;
- autonomously message agencies or transmit player dossiers;
- treat popularity, social-media views or creator reach as evidence of football ability.

### Scouting output
An internal candidate note should contain:
- player reference and permission status (no unnecessary identity fields);
- age group and position context;
- matches/minutes observed;
- event-stat summary and definitions;
- video references with timecodes, where permitted;
- scout observations with observer and date;
- uncertainty, missing data and counter-evidence;
- recommended next observation;
- human reviewer and decision status.

### Agency referral gate
Before any external profile referral:
- verify the receiving club/academy/agency and named recipient;
- check applicable intermediary/agent status and scope through appropriate authoritative channels;
- identify exactly which profile fields and media are needed;
- obtain the relevant player's informed permission and, for minors, valid guardian authority and the child's age-appropriate participation/assent;
- specify recipient, purpose, fields, duration and withdrawal route;
- require a human release approval separate from the scouting recommendation;
- log exactly what was released, to whom, when and under which permission record.

**Default state is no external disclosure.** A positive scouting signal is not permission to share.

## 6. Workstream D — Schools

Schools can provide a vital route to players who are not visible through club competitions. School partnerships should begin with school leadership and sports coordinators, not direct approaches to children.

Potential collaboration:
- map schools and school sport structures by locality;
- identify existing leagues, festivals and inter-school fixtures;
- offer coach/teacher tools for team and match administration;
- capture permissioned match statistics at approved events;
- provide player-development feedback to authorised school staff;
- create referral pathways from school teams to appropriate clubs or academies.

Required safeguards:
- written school/organiser authority for the activity;
- clear parent/guardian information and permission where required;
- child-friendly explanation and no pressure to participate;
- no private direct messaging between scouts and minors;
- no public school timetable, learner contact details, home addresses or sensitive records;
- no collection of academic or medical data for talent scoring;
- clear photography/video opt-in and withdrawal handling;
- school staff remain involved in any youth-facing activity.

## 7. Workstream E — Creators and football media

Creators such as Vino Snaps may help document the football culture of the Vaal and produce useful footage for players, coaches, clubs and tournaments.

Potential collaboration formats:
- event photography and match-day coverage;
- short, permissioned player highlight clips;
- team and coach storytelling;
- tournament recap packages;
- creator-led community discovery and team mapping;
- media literacy and consent-aware filming practices.

Creator agreement must specify:
- who owns the original footage and who may reuse it;
- whether ScoutSA receives a licence or only a link;
- permitted platforms, duration, territory and audience;
- player/guardian and team permissions;
- credit, takedown and correction process;
- restrictions on tagging, geolocation and exposing minors;
- commercial split or fee, if any;
- no promise that media exposure produces selection or placement.

Creators are media partners, not independent verifiers of identity, ability, affiliation or safeguarding.

## 8. Workstream F — National opportunity network

Expansion should follow a repeatable local operating playbook, not a national launch announcement.

Proposed sequence:
1. Vaal / ELFA operating model and coverage method.
2. Adjacent Sedibeng structures: Midvaal and Lesedi, with their own association boundaries and evidence.
3. Greater Gauteng.
4. Provincial nodes.
5. National network of verified clubs, academies, tournaments, schools and opportunity providers.

Every opportunity provider must be checked for identity, authority, purpose, terms, fees, location, age eligibility and safeguarding controls. Agency or intermediary claims must be verified against the relevant authoritative registers and rules. Never promise a trial, contract, scholarship or placement.

The network should route opportunity information to the right players based on eligibility and permission—not indiscriminately broadcast player profiles.

## 9. Product capability map

| Capability | Primary users | First useful outcome | Gate / limitation |
|---|---|---|---|
| Ecosystem Register | ScoutSA operations, association contacts | Reconciled teams and competitions by locality/season | Source provenance and current status |
| Tournament Manager | Organisers, statisticians, coaches | Event, fixture, team and result records | Organiser authority and event permissions |
| Match Observation | Approved observers/scouts | Consistent, contextual player/coach observations | Defined metrics and quality checks |
| Player Passport | Player, guardian, authorised club | Controlled profile with evidence provenance | Consent, guardian authority and access policy |
| Scouting Workbench | Internal scouting team | Explainable candidate shortlist | Human review; no automated selection |
| Agency/Opportunity Directory | Operations and authorised reviewers | Verified opportunity recipient directory | Independent provider checks |
| Referral Release | Player/guardian and release reviewer | Purpose-bound profile referral | Explicit permission and human release approval |
| School Workspace | School sports coordinators | Permissioned school-team pathway | School authority and youth safeguards |
| Creator Workspace | Creators, teams, organisers | Permissioned media references and credits | Rights, consent and takedown controls |
| National Coverage | Regional operations | Repeatable province-by-province ecosystem map | Local authority and source reconciliation |

## 10. Commercial model to test in parallel

Do not assume players or families should pay to be seen. The no-pay-to-be-seen principle remains.

Potential payer hypotheses to investigate:
- clubs and academies: administration, team visibility, verified competition records, coach tools;
- tournament organisers: event operations, statistics, media and post-event reports;
- schools: sport administration and development reporting, subject to procurement and budget realities;
- sponsors / CSI / foundations: measurable grassroots development programmes and access support;
- media/creator partners: production packages and licensing, with fair creator compensation;
- legitimate opportunity providers: structured recruitment workflow, never a fee for access to minors.

For each payer type, identify the budget owner, problem, current workaround, purchase trigger, evidence required, procurement cycle and willingness to pay. Price only after these are understood. Do not sell player access or personal data.

## 11. Phased delivery

### Phase 0 — Map and define (now)
- seed and reconcile Vaal team register;
- map ELFA streams, competitions, venues and age groups;
- map tournaments, schools and creators;
- define evidence and permissions;
- draft the internal scouting workflow and metric dictionary.

### Phase 1 — Synthetic operations demonstration
- build a team coverage dashboard with fictional/sample records clearly marked;
- build a tournament/event and fixture workflow;
- build a manual match-observation form using synthetic data;
- build an internal scouting review queue that explains its evidence;
- no live player intake, uploads or agency transmission.

### Phase 2 — Adult / authorised operational test
- test low-risk administration and event statistics with adults or appropriately authorised non-personal test data;
- measure time, error rates, inter-observer agreement and operational cost;
- keep this distinct from youth-market validation.

### Phase 3 — Youth safeguarding and partner validation
- obtain relevant association, school, guardian and specialist input;
- settle data authority, permission, age, retention, access, media rights and incident response;
- independently review the safeguarding model before any youth-facing live use.

### Phase 4 — Controlled Vaal pilot
- only after the relevant gates are satisfied;
- begin with a defined set of participating teams, one or more events, named authorised roles and limited purposes;
- measure reach, coverage, data quality, follow-up, opportunity quality and safeguarding performance.

### Phase 5 — Replicate regionally and nationally
- expand only when the Vaal operating playbook is demonstrably repeatable;
- each region has its own association map, source ledger, partner authority and safeguarding plan.

## 12. Success measures

### Ecosystem coverage
- teams identified / directly confirmed / affiliation checked;
- coverage by locality, league, age group and gender;
- schools and tournaments mapped;
- active coaches and authorised contacts;
- duplicate, alias and dormant-entity resolution.

### Data quality
- match records complete;
- stat corrections and disputed attributions;
- inter-observer agreement;
- percentage of player observations with sufficient minutes/context;
- source freshness and re-verification rate.

### Talent pathway
- candidates surfaced for human review;
- repeat observations completed;
- scout recommendations accepted/deferred/rejected with reasons;
- permissioned referrals made;
- verified opportunity responses;
- trials, scholarships or placements only when independently evidenced.

### Safeguarding
- permission and authority completeness;
- unauthorised disclosure attempts blocked;
- complaints and incidents handled within defined process;
- media permissions and takedowns honoured;
- no-pay-to-be-seen complaints and investigation outcomes.

### Commercial
- paying organisation by segment;
- conversion from demonstration to paid pilot;
- gross delivery cost per event / team / verification;
- renewal and retention;
- sponsor/CSI outcomes reported against agreed measures.

## 13. Non-negotiable boundaries

- Exposure is not opportunity.
- Visibility is not access.
- Discoverability is not trust.
- Verification is not a guarantee.
- Contact is not placement.
- Exposure is not outcome.
- No player pays to be seen.
- No autonomous agency disclosure.
- No public minor contact details.
- No unsupported SAFA, MySAFA, FIFA, POPIA or Children's Act compliance claims.
- No real-data ingestion, production deployment or live youth pilot merely because a prototype is built.

## 14. Immediate next engineering decision

The next product artifact should not be another explanatory player screen. It should be an **Ecosystem Coverage Workbench** for internal ScoutSA operations, using the research seed register. Its first job is to make omissions visible: locality, team, age group, gender, competition, source, status, last checked and next action.

That workbench can then become the source for tournament coverage planning and school/creator outreach. Do not build the autonomous scouting agent before the event data, definitions, provenance and human review process exist.
