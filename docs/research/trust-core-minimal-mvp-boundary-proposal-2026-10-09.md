# Trust Core — Minimal MVP Boundary Proposal

**Date:** 2026-10-09  
**Status:** PROPOSAL INPUT TO MVP BOUNDARY FREEZE — NOT RATIFIED, NOT IMPLEMENTED  
**Authority:** None to alter Gate 2, schema hold, RLS, API, UI, or implementation status  
**Source of constraint:** `README.md` on `main` states Gate 2 is closed at conceptual level, conceptual ERD frozen, schema on hold, implementation deferred, and the next phase is MVP Boundary Freeze.

## 1. Purpose

Define the smallest executable trust mechanism worth implementing after the MVP boundary is explicitly frozen and the required governance gate is authorized. This is a candidate implementation target, not permission to begin schema/code work.

The target is to test whether ScoutSA can preserve claim-scoped verification, non-actionable blocked states, consent enforcement, provenance, and auditability under synthetic data. It is not a public product or pilot.

## 2. Candidate minimum record set

1. **Opportunity** — stable internal ID; lifecycle state; event date/time/venue; responsible organization reference; eligibility criteria; capacity status; fee policy/amount/recipient; physical-attendance transport/access arrangements, responsibility and known costs; unresolved conditions.
2. **VerificationRecord** — opportunity/claim reference; tier; exact claim scope; source/evidence references; verification-action timestamp; verifier identity; limitations/conflicts; `valid_until` or `reconfirm_by` plus rationale for any current verification claim; status and reason.
3. **ConsentRecord** — subject/reference token; authorized adult/guardian relationship reference where applicable; purpose; permitted action/disclosure scope; effective interval; status including withdrawal; provenance. Do not store real child data in the initial test lane.
4. **EvidenceEvent** — append-only reference to the evidence source, event type, observed time, recorded time, actor, scope, and integrity/version linkage. No destructive overwrite of prior verification history.
5. **DecisionAuditEvent** — append-only decision actor, action, timestamp, prior/new state, rule/procedure version, evidence references, decision reason, and whether the action was allowed or blocked.

These are logical records for scope discussion only. They are not a proposed final ERD or SQL schema. Existing ratified domain/relationship constraints and unresolved Gate 2 seams must be reconciled during MVP Boundary Freeze.

## 3. Required states and transitions

- Verification tier is claim-scoped: `UNVERIFIED` → `AUTHENTICITY CORROBORATED — LIMITED SCOPE` → `OPPORTUNITY CONDITIONS CHECKED — SCOPE LIMITED` → `ACTIONABLE FOR A PARTICULAR PARTICIPANT`. No automatic transition; each tier requires evidence for its own preconditions.
- Opportunity operational state includes at minimum `DRAFT`, `PAUSED — AWAITING CLARIFICATION`, `BLOCKED`, and `CLOSED`. A blocked or paused opportunity cannot be public/actionable.
- Missing provenance, unresolved material eligibility/capacity/fee/transport conditions, expired reconfirmation deadline, missing freshness metadata, or absent/withdrawn/purpose-mismatched consent blocks dependent action.
- Authenticity does not imply actionability. Transport/access barriers remain distinct from football readiness.
- A status change creates a new event; previous records are preserved. Correction/dispute is additive, not silent overwrite.

## 4. Minimum synthetic acceptance tests

1. **STS-001:** limited authenticity can be represented while unresolved eligibility/capacity/transport keeps Tier 2 blocked and Tier 3 unestablished.
2. **Freshness metadata negative test:** absent `valid_until` and `reconfirm_by` cannot support a current verification claim; historical evidence remains queryable.
3. **Consent negative test:** absent, withdrawn, or purpose-mismatched consent blocks the attempted disclosure/action and creates an audit event.
4. **Append-only history test:** changing a verification status does not delete or overwrite prior evidence/decision events.
5. **Access-control negative test:** an unauthenticated or unauthorized actor cannot read protected records or write a higher verification tier; client-supplied role/metadata cannot grant authority.
6. **State-transition test:** unresolved material conditions cannot be bypassed by direct status update or client-supplied tier.
7. **Audit completeness test:** every attempted tier/state change records actor, timestamp, rule version, reason, and supporting evidence references; denied actions are logged.

No acceptance result is claimed until code exists and the tests actually run. Tests must include denial cases, not only successful paths.

## 5. Explicit non-scope

- No real player, guardian, scout, coach, or child data.
- No public profiles, opportunity listings, search/discovery, contact, messaging, media uploads, applications, payments, or notifications.
- No real-world outreach, recruitment of minors, live pilot, or user testing with minors.
- No claims of POPIA compliance, legal compliance, production readiness, or launch readiness.
- No production schema, migration, RLS policy, API, UI, or deployment before MVP Boundary Freeze and explicit implementation authorization.
- No blanket use of service-role credentials or client-controlled role claims. Any later implementation must have a separately reviewed access model and negative security tests.

## 6. Proposed "enough" gate

Trust Core is eligible for a separate review only when all are evidenced:
- the MVP boundary is explicitly frozen and reconciled with the Constitution, domain model, relationship model, consent model, and unresolved Gate 2 seams;
- the exact schema/API/access model and authorized actors are approved before implementation;
- STS-001 runs end-to-end on the frozen synthetic fixture with a recorded result and unresolved material conditions still blocked;
- missing/expired freshness metadata, consent withdrawal/purpose mismatch, unauthorized access, attempted tier escalation, and history mutation have negative tests that pass;
- every decision is auditable and evidence/procedure versions are retained;
- all failures and residual risks are documented; critical failures are zero;
- an authorized reviewer accepts or mitigates residual risks in writing.

Passing this bar would permit a decision about the next controlled development/test gate only. It would not automatically authorize adult-only testing, external access, publication, or a pilot.

## 7. Immediate next action

Use this proposal as input to the repository's stated next phase, **MVP Boundary Freeze**. Do not implement yet. First reconcile the minimum trust slice with the governing model and open Gate 2 seams; then seek explicit ratification of the bounded MVP and implementation gate. Preserve all existing holds until that authorization is recorded.
