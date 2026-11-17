# TAD-004 Adversarial Cardinality and Lifecycle Test Matrix

**Status:** Internal analysis · NOT RATIFIED · no implementation authority  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026  
**Parent:** TAD-004 — Team entry and player participation cardinality  
**Companion:** [Team Entry and Player Participation Cardinality Crosswalk](TEAM-ENTRY-PLAYER-PARTICIPATION-CARDINALITY-CROSSWALK.md)

## 1. Purpose

This matrix stress-tests the proposed Team → TeamEntry → PlayerParticipation relationship against identity reuse, competition scope, temporal overlap, roster changes, eligibility, permission and historical-statistics cases.

It is a design test pack, not a rulebook. It does not assert that any scenario is permitted by South African football regulations, a school league, an academy, an LFA, a tournament or another competition. Where the applicable competition rule and decision authority are not evidenced, the expected system response is **unresolved / hold for authorized review**, not an invented allow-or-deny rule.

No canonical Gate 2 relationship, production schema, API, migration, RLS policy, real-data workflow or implementation permission is created.

## 2. Evidence boundary

The reviewed sources establish:

- The tournament proposal distinguishes a stable Team identity from a competition-specific TeamEntry.
- The proposal links PlayerParticipation to one TeamEntry and proposes one TeamEntry to many PlayerParticipations.
- The canonical root domain defines stable Player identity and Organization–Player Membership. It does **not** define Team as a canonical root entity or ratify tournament-registration cardinality.
- Canonical Membership permits multiple concurrent Player–Organization relationships. That rule is scoped to Organization Membership; it must **not** be copied into tournament PlayerParticipation as proof that dual registration is permitted.
- The current Tournament Manager creates a fresh Team ID and TeamEntry ID together for each team form submission, and a fresh Player ID and PlayerParticipation ID together for each player submission.
- The Manager cannot select/reuse an existing Team or Player identity. Its alias check is a synthetic-label check, not person identity resolution. Its roster labels, permission label and shirt-number validation are local demo behavior, not official competition rules.
- The current demo does not store registration effective periods, transfer/release events, registration evidence, rule versions, appeal decisions or a full status-transition history.

The current UI copy says a Team is a stable identity, but the form handler creates a new Team ID on every registration. This is a demonstrable prototype identity-reuse gap, not proof that the proposed domain distinction is wrong.

## 3. Adversarial scenario matrix

| ID | Scenario | Question that must be answered | Safe candidate treatment before rule evidence |
|---|---|---|---|
| T04-01 | Same Team enters two divisions in one edition | Is multi-division entry allowed, and are there squad separation rules? | Preserve one candidate Team identity and distinct TeamEntry instances; do not assume allowed or prohibited. |
| T04-02 | Same Team enters two different editions/seasons | Is Team identity continuous across editions, and what proves continuity after rebranding? | Reuse Team identity only after identity-resolution policy; retain distinct edition-scoped entries. |
| T04-03 | Two similarly named teams submit in one division | Are they the same team, separate teams, or duplicate applications? | Do not merge on name; hold candidate duplicate for attributable human resolution. |
| T04-04 | One Team submits twice for the same division | Is this a duplicate submission, replacement entry, or permitted second entry? | Preserve submissions and status history; do not silently overwrite or auto-create a second valid entry. |
| T04-05 | Team renames, relocates, merges or splits | Does the same sporting identity continue, or is this a successor/new team? | Record source-backed identity decision and history; no name-based automatic merge/split. |
| T04-06 | Same Player is added twice to one TeamEntry | Is this a duplicate registration, correction, or separate registration episode? | Flag possible duplicate; do not create two active registrations merely because two IDs differ. |
| T04-07 | Same Player appears under two TeamEntries in one division | Are simultaneous registrations permitted, prohibited or exception-only? | Apply no global assumption; require the competition-specific rule and authorized decision. |
| T04-08 | Same Player is registered in two divisions in one edition | Are age-group movement, dual registration or cross-division play allowed? | Keep distinct contextual records if approved; evaluate overlap and match eligibility under each division's rules. |
| T04-09 | Same Player appears in two different competitions during overlapping dates | Are the competitions independent, affiliated or subject to conflicting registration rules? | Evaluate by competition and governing authority; do not infer exclusivity or permission across competitions. |
| T04-10 | Guest / temporary / loan player joins an entry | Is the arrangement recognized, who authorizes it, and what dates/fixtures does it cover? | Model as an attributable, time-bounded exception/registration decision only after rule definition; do not relabel it as ordinary registration. |
| T04-11 | Player transfers from TeamEntry A to TeamEntry B mid-edition | What release, clearance, approval and effective date are required? | Preserve A's historical participation; create/record B's distinct relationship only after authorized transfer decision. |
| T04-12 | Old and new participation effective periods overlap | Is overlap legal, a transition window, or a data error? | Detect and hold conflict; do not silently truncate either period or choose the newest row. |
| T04-13 | Player withdraws, is suspended, then reinstated | Which authority changes each state, from when, and with what appeal/reversal path? | Preserve status events and effective dates; do not erase prior state or infer eligibility from reinstatement alone. |
| T04-14 | Roster changes after a fixture has been played | Which roster snapshot governs the historical fixture and its statistics? | Preserve the participation/eligibility context applied at match time; later roster edits must not rewrite history. |
| T04-15 | Player is registered but not selected for a fixture | Does registration imply selection or appearance? | No. Keep registration, lineup selection and actual appearance separate. |
| T04-16 | Player is selected but does not enter the field | What counts as an appearance under the competition's statistical rules? | Preserve selection and appearance as distinct observations; do not derive an appearance merely from lineup inclusion. |
| T04-17 | Player appears while suspended or not yet accepted | Is the appearance invalid, reportable, disputed or subject to a competition decision? | Preserve the observed event separately from eligibility/disciplinary decision; do not delete the appearance or certify it as valid. |
| T04-18 | Guardian/player permission is absent, expires or is revoked | What collection, participation, disclosure or contact purpose is affected? | Treat permission as purpose- and time-scoped; never infer it from roster acceptance or a coach's assertion. |
| T04-19 | Two Player records may refer to one person | What evidence and authority permit identity reconciliation? | Keep records separate as possible duplicates pending review; never merge by name, alias, date or team alone. |
| T04-20 | One Player record may incorrectly combine two people | How can a mistaken merge be corrected without losing provenance? | Preserve correction lineage and attributable adjudication; no destructive overwrite. |
| T04-21 | Squad number changes or is reused | Is uniqueness scoped to a team entry, match, season or another rule? | Treat shirt number as a contextual attribute, never an identity key; scope validation only after rules are known. |
| T04-22 | Registration start/end date is missing or disputed | Can a participation be considered active at a fixture timestamp? | Return unknown/undetermined; do not assume the record is valid for all dates. |
| T04-23 | Registration ends exactly at fixture kick-off or begins mid-day | Are interval boundaries inclusive, and which timezone/official timestamp applies? | Require explicit interval and timezone semantics; do not choose boundary behavior implicitly. |
| T04-24 | Competition rules change during an edition | Which rule version governs an earlier registration or fixture? | Pin decisions to a sourced rule version/effective date; do not retroactively apply the latest rule without authority. |

## 4. Cross-cutting invariants to test

These are safety and data-integrity requirements for design review, not a substitute for competition regulations:

1. **Identity is not a label.** Team names, Player display names, aliases, shirt numbers and generated IDs do not prove real-world identity.
2. **Team is not TeamEntry.** A continuing team identity and a competition entry have different scopes, if the domain owner ratifies both concepts.
3. **Player is not PlayerParticipation.** A Player is an identity; a PlayerParticipation is a contextual relationship to a specific TeamEntry.
4. **Organization Membership is not tournament registration.** Its concurrency rule cannot be generalized to competition participation.
5. **Registration is not roster acceptance.** Submission, acceptance, suspension, withdrawal and reinstatement need explicit lifecycle semantics and authority.
6. **Roster acceptance is not eligibility.** Eligibility is competition-, division-, rule-version- and time-scoped.
7. **Eligibility is not permission.** Player/guardian permission is purpose-bound and separately evidenced.
8. **Registration is not selection.** A registered player may not be selected for a fixture.
9. **Selection is not appearance.** Appearance requires its own match-day evidence and rule semantics.
10. **Observation is not adjudication.** An observed appearance can be retained while its eligibility or validity is disputed.
11. **Current state must not erase history.** Transfers, withdrawals, suspensions, corrections and reinstatements must preserve attributable prior states.
12. **Unknown is not false or true.** Missing dates, rules, identity evidence or authority must remain unresolved rather than being silently defaulted.

## 5. Candidate temporal model — deliberately incomplete

The following is a vocabulary for testing, not a proposed production schema:

- **Team:** candidate enduring team identity, subject to canonical domain approval and identity-resolution rules.
- **TeamEntry:** candidate competition-entry instance linked to one Team and a defined edition/division context. Its exact grain is unresolved; do not assume `edition_id + division_id + team_id` is sufficient to identify every possible application, replacement or re-entry.
- **PlayerParticipation:** candidate registration relationship between one Player identity and one TeamEntry. Its effective period and lifecycle must be explicit if approved.
- **Registration decision/event:** attributable submission, acceptance, rejection, suspension, withdrawal, transfer, release, reinstatement or correction, each tied to the applicable authority and rule version.
- **Eligibility review:** separate decision scoped to the relevant participation, competition/division, rule version and point in time.
- **Permission/consent:** separate purpose-bound authority record with grantor, scope, effective period, expiry/revocation and evidence.
- **Fixture selection / appearance:** separate fixture-level observations; not attributes that can be inferred from the registration record.

A transfer candidate should not overwrite the old participation's TeamEntry reference. It should preserve the earlier relationship and record the later relationship/decision with its own effective period. Whether that is represented as a new PlayerParticipation, a transfer event plus a new participation, or another governed form remains open.

The interval convention (for example, half-open `[effective_from, effective_to)`) is not selected here. Timezone, official fixture timestamp, missing-date behavior and rule-version effective dates must be specified before overlap constraints can be safely evaluated.

## 6. Candidate constraint strategy

Do not add a global uniqueness rule such as:

- one Player per TeamEntry across all time;
- one active PlayerParticipation per Player per edition;
- one active TeamEntry per Team per edition;
- one TeamEntry per Team per division;
- one Player per Team across all competitions.

Each may be correct in a particular competition or incorrect in another. The exact uniqueness key and active-overlap rule must be derived from the relevant competition regulations and approved by the appropriate authority.

A future rule-evaluation contract should be able to return at least:

- `PERMITTED` — supported by an identified, current rule and authorized decision;
- `PROHIBITED` — supported by an identified, current rule and authorized decision;
- `EXCEPTION_REVIEW_REQUIRED` — rule permits a waiver/exception process but no decision is yet recorded;
- `CONFLICT_REVIEW_REQUIRED` — records or evidence conflict;
- `UNDETERMINED` — rule, identity, time or authority evidence is insufficient.

These labels are candidate analysis outcomes, not existing product states or ratified domain vocabulary.

## 7. Prototype defects and non-defects

| Observation | Classification | Why it matters |
|---|---|---|
| Team form creates a new Team ID for every entry | Demonstrated prototype limitation | UI claims stable identity, but the handler cannot reuse it across entries. |
| Player form creates a new Player ID for every participation | Demonstrated prototype limitation | Same-person multi-entry and transfer cases cannot be exercised. |
| Alias uniqueness is global within the browser session | Demo-only guard | Prevents duplicate labels, not duplicate people; also blocks reuse of the same synthetic alias across entries. |
| Shirt-number uniqueness is checked within TeamEntry | Demo-only validation | Useful local guard, but its competition-rule scope is not established. |
| Roster status is a single selectable field | Demo simplification | No effective dates, transition authority, evidence, history or appeal lifecycle. |
| Permission is a single adult-demo string | Deliberate safety limitation | It is not a consent record and must not be treated as one. |
| Player history is a fixed fictional snapshot | Known prototype boundary | It cannot validate identity reuse or live transfer history. |

The first two are meaningful gaps against the stated Team/Player identity distinction. They do not authorize an immediate UI or schema rewrite: the canonical Team boundary and competition rules remain unresolved.

## 8. Required evidence before TAD-004 can close

For each selected pilot competition, capture:

- competition and governing-body identity;
- exact regulation document, URL/source, version, publication/effective date and relevant clause;
- who has authority to interpret and approve the rule;
- permitted team-entry multiplicity and duplicate-entry handling;
- player registration, transfer, guest/loan, age-group and dual-registration rules;
- registration windows, effective-period boundaries and exceptions;
- roster limits, replacements, squad-number scope and match eligibility;
- suspension, withdrawal, reinstatement, dispute and appeal processes;
- evidence required for team/player identity and duplicate adjudication;
- how historical fixtures and statistics are treated after later corrections;
- safeguarding and permission requirements before real player/minor data is processed.

A source without a known authority or effective date is a lead, not a settled rule. If no competition-rule evidence is available, keep the relevant behavior configurable/unresolved and do not manufacture a universal default.

## 9. Outcome

**TAD-004 remains OPEN.** This matrix increases the adversarial coverage of the existing crosswalk and exposes the exact prototype gap between claimed stable identity and generated-per-entry identity. It does not resolve Team's canonical status, entry grain, player multiplicity, transfer semantics, interval rules or competition-specific constraints.

**Next dependency-correct action:** retain TAD-004 as open, then complete the bounded TAD-005 fixture/lifecycle analysis without treating TAD-004 as ratified. TAD-006 and TAD-002 remain dependent on the required upstream decisions.

**Stop line:** no real registrations, no real player/minor data, no global uniqueness constraints, no identity merging, no production schema and no mainline changes from this document.
