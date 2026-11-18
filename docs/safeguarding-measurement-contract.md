# Safeguarding Measurement Contract — proposed control

**Status:** PROPOSED CONTROL — not a ratified operating procedure or authorization to collect/process real player data.  
**Applies to:** Any future ScoutSA pilot, evaluation, dashboard, research readout, or product metric involving players, guardians, coaches, scouts, organizations, opportunities, or safeguarding activity.  
**Authority:** Constitution, canonical Gate Status, applicable law, and formally ratified safeguarding/access policies prevail. This document cannot lift an implementation or pilot hold.

## 1. Non-negotiable measurement rule

**Trust and safety are constraints, not growth variables.** No volume, conversion, engagement, attendance, or placement target may compensate for invalid authority, invalid consent, unauthorized disclosure, safeguarding harm, or an unresolved conflict.

No real-player measurement is authorized by this document. Until the relevant gates and operating procedures are approved, use synthetic data or properly de-identified, lawfully obtained aggregate evidence only. Synthetic results must be labelled synthetic and never presented as field outcomes.

## 2. Measurement design controls

Every proposed metric must have, before collection:

- a named accountable role (not merely a team);
- a decision question it informs;
- an exact numerator, denominator, inclusion/exclusion rule, and time window;
- a documented source and provenance;
- a lawful, purpose-bound basis and access scope, approved through the relevant governance process;
- a retention/deletion rule;
- an interpretation and known-bias note;
- a misuse / gaming risk and countermeasure;
- a stop condition and escalation owner.

If any required definition is missing, the metric is **NOT READY TO COLLECT**. Do not substitute a convenient proxy or silently change the denominator.

## 3. Required safeguard indicators

These are proposed definitions for future review. They are not claims that instrumentation or processes currently exist.

| Indicator | Definition (numerator / denominator or timing) | Interpretation and guardrail |
|---|---|---|
| Authorization-complete action coverage | Numerator: in-scope requests whose actor authority, current organization affiliation, purpose, resource, opportunity, recipient scope, time validity, and applicable consent checks are all evidenced before action. Denominator: all in-scope requests attempted. | A failed or unknown check must block the action. The metric is not a permission to average away an individual failure. |
| Consent revocation containment | Elapsed time from a valid revocation being received by the authorized process to affected access/actions being blocked, with each event retained in an audit trail. | Fail closed immediately at the enforcement point. Report distribution (including maximum), not only average. No target may be invented before the process is validated. |
| Unauthorized access / disclosure events | Count of confirmed and suspected unauthorized access, disclosure, onward sharing, or attempted bypass events, separated by severity and confidence. | Never normalize incidents by user or player volume. A confirmed material incident triggers the applicable pause and response process. |
| Safeguarding concern handling | Elapsed time from receipt to acknowledgement, triage, protective action where required, and authorized resolution; report each stage separately. | Do not collapse concern, finding, action, outcome, and resolution. Do not publish identifying case details or reward low complaint counts. |
| Guardian opt-out / consent withdrawal | Count and rate of opt-outs/withdrawals among the clearly defined applicable consent population, with reason optional and separately consented. | Withdrawal is a legitimate exercise of control, not churn, failure, or a negative guardian score. Never pressure a person to reverse it. |
| Access / erasure request handling | Time from validated request receipt to completion, with lawful exceptions, blocked dependencies, and overdue cases separately visible. | Do not claim deletion completion until relevant systems, copies, processors, and backups are covered by the approved procedure. |
| Critical-action audit completeness | Numerator: sampled critical actions with attributable actor, authority/scope, purpose, timestamp, resource, decision, and provenance. Denominator: all sampled critical actions in scope. | Missing evidence is a control failure, not a zero-risk event. Sampling method and coverage must be disclosed. |
| Verified opportunity quality | Count of opportunities whose source, organizer authority, eligibility, location/time, costs, and material conditions are independently evidenced under an approved verification process. | Do not optimize raw opportunity volume. An unverified listing is not a verified opportunity; a verification marker is not a guarantee. |
| Pressure / coercion signals | Count and handling status of substantiated or credible reports of pressure, retaliation, inducement, or coercion affecting player/guardian participation. | Low reporting is not proof of safety. Provide safe reporting routes and prohibit retaliation. |

## 4. Prohibited success metrics and optimization

The following must not be used as standalone success measures or optimization targets:

- number of minors registered, profiled, made discoverable, or exposed;
- public profile views, share-card opens, follower counts, or time spent;
- contact-request volume, guardian approval rate, or opt-out minimization;
- trial attendance or placement counts without opportunity quality, consent, and context;
- readiness scores, talent rankings, or conversion rates that penalize missing information or refusal;
- low complaint, incident, or withdrawal counts interpreted as evidence of safety.

Player or guardian participation must never be a quota. A refusal, withdrawal, incomplete record, or safeguarding concern must not reduce access to unrelated services or create an adverse label.

## 5. Stop / pause conditions

Pause the affected workflow, access path, or measurement activity and invoke the authorized response process when any of the following occurs:

1. Actor authority, organization affiliation, purpose, scope, or applicable consent is missing, conflicting, expired, or revoked.
2. A minor is contacted through an unauthorized private channel or an unauthorized person receives identifying information.
3. A public or onward disclosure occurs without an explicitly ratified disclosure basis and recipient scope.
4. A safeguarding concern indicates credible immediate risk, retaliation, coercion, exploitation, or an unsafe opportunity.
5. Critical audit evidence is absent such that an action cannot be reconstructed.
6. A metric is found to incentivize unsafe volume, suppress reporting, pressure participation, or disguise missing data.

Do not wait for a dashboard threshold where an individual control has failed. Escalation and restart authority must be defined in a ratified response procedure; this document does not assign it.

## 6. Reporting and disclosure

- Default to internal, aggregate, purpose-limited reporting.
- Never expose player-level or guardian-level performance, identity, contact details, location, case details, or consent state in a public dashboard.
- Do not publish small or uniquely identifying cohorts. A minimum cell-size and disclosure-control standard must be ratified before any external disaggregation; no threshold is invented here.
- Separate synthetic, test, de-identified, and real-world evidence.
- Preserve numerator, denominator, exclusions, time window, data freshness, missingness, and limitations with every reported rate.
- Do not compare organizations, coaches, guardians, or players until comparability, fairness, and authorization have been independently reviewed and ratified.

## 7. Ownership and cadence

Before a pilot, assign accountable safeguarding, privacy/data-governance, operational, and measurement owners by role and name through the approved governance process. Define escalation coverage, out-of-hours handling, audit access, and review cadence. No role assignment is implied by this draft.

A future readout should include:
1. safety gate status and unresolved incidents;
2. data coverage and missingness;
3. safeguard indicators and their denominators;
4. opportunity-quality evidence;
5. negative evidence, refusals, withdrawals, and dissent;
6. interpretation limits and decisions explicitly not made.

## 8. Ratification blockers

This contract does not settle legal basis, retention periods, erasure exceptions, minimum disclosure cell size, safeguarding response SLAs, incident severity taxonomy, role appointments, guardian-conflict handling, or technical enforcement. Each requires the relevant evidence, competent review, and explicit ratification before real-world collection or pilot use.

**Current state: proposed measurement design only. No real-player data collection, instrumentation, dashboard, pilot, or implementation is authorized by this document.**
