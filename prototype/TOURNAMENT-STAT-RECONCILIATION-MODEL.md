# Match Event and Statistic Reconciliation — Proposed Model

**Status:** Internal prototype and design proposal · synthetic records only · not ratified for mainline  
**Branch:** `prototype/internal-demo`  
**As at:** 16 November 2026

## Purpose

Reconcile fixture-level match events with statistical observations without silently creating duplicate statistics, overwriting disputed records or turning an unverified event into a verified performance claim.

The current browser page is a self-contained demonstration. It uses seeded synthetic records and does not read from or write to Tournament Manager or Tournament Day Operations. That separation is deliberate: it tests the decision rules before proposing cross-module integration.

## Record distinction

| Record | Meaning | Example |
|---|---|---|
| Match event | An observed occurrence during a fixture | Goal at minute 67 |
| Statistical observation | A metric value attributed to a player participation and fixture | Goals = 1 |
| Source record | Provenance reference for the observation | Match sheet / video timestamp |
| Reconciliation finding | A proposed relationship or conflict between records | Possible duplicate |
| Review decision | Human disposition of a finding | Reviewed; no data change |

An event is not automatically a statistic. A statistic is not automatically verified because it references an event. A review action is not a source correction.

## Proposed relationships

- Event: `event_id`, `fixture_id`, `participation_id`, `event_type`, `minute`, `source_id`, `review_state`.
- Statistical observation: `stat_id`, `fixture_id`, `participation_id`, `metric_definition_id`, `value`, `unit`, `source_id`, optional `source_event_id`, `review_state`.
- Reconciliation finding: `finding_id`, one or more event/stat references, `finding_type`, `reason`, `created_at`, `review_state`.
- Review decision: `decision_id`, `finding_id`, reviewer identity/authority, decision, rationale, timestamp and any superseding decision.

The canonical player reference remains the event-scoped participation ID. Do not join solely on player display labels.

## Matching and decision rules

1. **Explicit source-event link:** exact `source_event_id` creates a traceable candidate relationship. It does not prove the event or stat is accurate.
2. **Possible duplicate:** same fixture + participation + metric + value without an explicit event link is only a heuristic. It may represent the same occurrence, separate evidence or a coincidental equal value.
3. **Unmatched event:** do not auto-create a statistic. Surface a candidate for human review.
4. **Disputed observation:** preserve the observation and dispute state. Do not include it in verified totals.
5. **Conflicting values:** create a conflict finding; do not pick the newest or largest value automatically.
6. **Review:** marking a finding reviewed must not mutate source events or statistical observations. Corrections require a separate, attributable, versioned action.

## Metric definitions and context

Metrics require stable definitions and units. For example, goals and saves are integer counts; minutes played is a duration; pass completion is a percentage with numerator and denominator. A percentage without attempts/denominator is incomplete evidence.

Comparisons also require relevant context: minutes played, position/role, competition and division, opponent, match state, recording method, source quality and sample size. Missing observations are not zero. A raw total must not be converted into a talent score or ranking without a separately justified model and review.

## Prototype boundaries

- The page contains fictional adult sample records only.
- Review decisions are in-memory and reset on refresh.
- JSON export contains only the synthetic demo.
- No source documents, uploads, hashes, trusted timestamps or external verification are implemented.
- No production database, API, authentication, RLS, access policy or cross-module data integration is implemented.
- No real player, coach, official or organizer data may be entered.
- No production permission, POPIA compliance or safeguarding approval is claimed.

## Open questions before ratification

- Which metric definitions and units are canonical, versioned and competition-specific?
- Can one event legitimately support multiple metrics, and how are assist/own-goal/penalty rules represented?
- What source hierarchy applies when official match sheets, referee reports, video and coach observations disagree?
- Who may create, review, dispute, correct or approve a record, and how are authority and conflicts of interest represented?
- How are late corrections, appeals, rescinded goals and abandoned fixtures versioned?
- What evidence is sufficient for a status such as verified, and who is accountable for that determination?

**Decision boundary:** this proposal informs future design only. It does not ratify a production schema, authorize cross-module integration or close any mainline gate.
