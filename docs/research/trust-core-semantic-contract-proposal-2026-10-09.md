# Trust Core Semantic Contract — Proposal for Explicit Review

**Prepared:** 2026-10-09  
**Status:** PROPOSAL — NOT RATIFIED; NOT AN IMPLEMENTATION SPECIFICATION  
**AuthorityLevel:** NONE  
**Purpose:** Define candidate meanings for unknown/confirmed/conflicting/expired/not-applicable values, freshness, derived conclusions, and decision traceability before any schema or code work.

## 1. Research contract

**Question:** Can ScoutSA state a small, internally consistent semantic contract that prevents missing or contradictory information from becoming an unsupported positive claim, while preserving the frozen conceptual and physical boundaries?

**Decision informed:** Whether a later governance review should ratify semantic definitions, request changes, or retain explicit holds. This document itself does not make that decision.

**Inputs:** ScoutSA Constitution (M1–M9 and ratified Assertion boundary), Gate Status, frozen relationship/schema boundaries, claim-scoped opportunity-verification procedure, Trust Core field reconciliation, invariant matrix and traceability crosswalk.

**Method:** Desk reasoning plus hypothetical examples. No stakeholder interviews, live records, implementation, or tests are claimed.

**Stop condition:** Stop once candidate semantics are explicit enough to identify contradictions and unresolved authority questions. Do not extend into field/table design or code without separate authorization.

## 2. Governing constraints already present in the repository

This proposal must remain consistent with these ratified boundaries:
- ASSERTION ≠ EVIDENCE ≠ VERIFICATION ≠ DERIVED STATE ≠ DECISION.
- Author ≠ authority; contradictory legitimate assertions are not silently resolved.
- Historical validity ≠ current applicability ≠ sufficiency.
- Authorization is purpose-, scope-, context- and time-bound.
- Material withdrawal, revocation, expiry or dispute requires reassessment without silently rewriting history.
- Verification is not safeguarding clearance or contact authorization.
- No database field, table, relationship, policy or UI behavior becomes authoritative merely because it is technically convenient.

This proposal does not add a first-class domain concept and does not reopen the frozen conceptual ERD.

## 3. Candidate value semantics

These labels are semantic categories for review, not a prescribed enum or column set. A later model may encode them differently if the distinctions remain observable and testable.

| Meaning | Candidate definition | Must not be interpreted as |
|---|---|---|
| **UNKNOWN** | The available evidence does not establish the value. | False, zero, none, safe, allowed, or not applicable. |
| **CONFIRMED(value)** | Evidence supports a specific value for a stated claim and scope, subject to provenance and temporal limits. | Universal truth or confirmation of adjacent claims. |
| **CONFLICTING** | Two or more materially incompatible assertions/evidence items remain unresolved under the applicable authority process. | “Take the newest”, average values, or silently choose the preferred source. |
| **EXPIRED** | A previously time-bounded verification/authorization passed its applicable deadline without a valid reconfirmation or extension under an approved rule. | Proof that the historical statement was false. |
| **NOT_APPLICABLE** | An accountable, scoped assessment establishes that a condition does not apply to this particular claim/context. | A blank field, missing evidence, or a convenience default. |
| **NOT_PROVIDED** | The value/evidence has not been supplied or recorded. | A substantive answer such as “none” or “no”. |
| **REVOKED/WITHDRAWN** | An applicable authorization or assertion status has been withdrawn/revoked by a source/process with relevant authority, subject to scope and effective time. | Erasure of the historical event or proof that all earlier actions were invalid. |
| **DISPUTED** | A material challenge exists and the applicable resolution process has not concluded. | A finding of wrongdoing or automatic proof that the challenged claim is false. |

**Candidate rule:** UNKNOWN and NOT_PROVIDED can both block dependent conclusions, but should not be collapsed semantically. NOT_APPLICABLE requires a reasoned, scoped determination. CONFLICTING and DISPUTED preserve the competing assertions and their provenance. EXPIRED affects current applicability, not the historical existence of the evidence.

## 4. Candidate dependency rule

A derived claim must name its target claim, scope, evaluation time, material inputs, governing rule/version, and outcome rationale. The outcome cannot be stronger than its weakest required predicate.

For a requested action, the candidate order is:
1. Define the exact claim and action.
2. Confirm that each required input addresses the same subject/scope/purpose/context.
3. Preserve UNKNOWN, NOT_PROVIDED, CONFLICTING and DISPUTED as distinct conditions.
4. Assess provenance, relevant authority and temporal applicability.
5. Check any required freshness deadline and material opportunity conditions.
6. Check applicable authorization, consent, access and policy/legal holds.
7. Produce only the bounded conclusion supported by all required predicates.

**No automatic “positive by default”:** a missing required predicate, unresolved material conflict, expired required evidence, or applicable HOLD blocks the dependent positive claim/action. This is not a universal rule that every unknown blocks every display; the affected claim and dependency must be explicit. Historical, non-actionable facts may remain displayable only under an approved purpose/access policy.

## 5. Freshness semantics — candidate contract

1. A verification timestamp records when an action/check occurred; it is not itself a freshness deadline.
2. For any claim whose current applicability depends on freshness, the record must identify an explicit `valid_until` or `reconfirm_by` value and a rationale tied to the claim/scope. This follows the existing bounded tabletop decision; it does not establish a universal duration.
3. The accountable verifier/process assigning a deadline must be identified, and the deadline must be justified for the particular claim and scope. Who is authorized to do this remains a governance question where not already established.
4. If neither deadline field is present, use the existing bounded result **FRESHNESS METADATA MISSING — BLOCKED** for the affected current-use claim.
5. If the applicable deadline has passed, current-use remains blocked until an authorized reconfirmation or extension establishes current applicability. Do not silently extend a deadline.
6. If both `valid_until` and `reconfirm_by` exist but imply inconsistent outcomes, treat the freshness rule as unresolved and block current-use until an approved precedence rule resolves it.
7. Do not assume an existing SQL field such as `expires_at` is semantically equivalent to either field without an explicit, reviewed mapping. No mapping is proposed or authorized here.
8. A freshness failure does not delete the historical assertion, evidence, or verification record. Any disclosure or retention remains subject to purpose/access/retention policy.

This section proposes semantics only; it does not authorize fields, columns, schema edits or a new freshness duration.

## 6. Opportunity claim boundary

The following conclusions must remain distinct:

- **Source/organization authenticity:** evidence supports a bounded claim about the source or organization.
- **Opportunity conditions checked:** material details for a specific opportunity and scope have been checked to the stated level.
- **Participant-specific actionability:** relevant eligibility, timing/location, capacity, material costs, access/transport feasibility, consent and other applicable conditions support a particular action for a particular participant.

None follows automatically from the prior one. A positive organization verification does not prove a particular trial exists, is open, has capacity, is free, or is feasible for a participant. The material conditions vary by claim type; the accountable rule must say which dependencies apply rather than presume one universal checklist.

## 7. Candidate minimum decision/audit trace

Where a decision/action requires an auditable record, the minimum candidate semantic content is:

- decision/event identifier and event time;
- actor/requesting principal, represented with appropriate privacy controls;
- target subject/resource and the scope of the request;
- action and stated purpose;
- outcome (for example, allowed, denied, blocked, held, or not evaluated);
- reason code or bounded rationale;
- governing rule/policy version, if one was applied;
- material evidence/assertion/consent/authorization references used, with provenance;
- relevant freshness/applicability result;
- unresolved conditions or conflict references;
- prior/current derived state or a link to the state transition where relevant;
- correction/supersession relationship when an earlier record is corrected;
- evaluator/process identity and execution context when this is a system-generated decision.

This is a **candidate completeness checklist**, not a mandate for a new AuditEvent schema. First map it to existing `evidence`, `audit_events`, Assertion, Verification and Decision concepts. A timestamp alone does not establish audit completeness; neither does the presence of a table prove that logging is enforced or tamper-resistant.

Retention, deletion, redaction, access to audit history, and whether all denied attempts must be logged are policy/legal and threat-model decisions still requiring explicit review. Do not infer “append forever” or any retention duration.

## 8. Hypothetical consistency checks (not executed tests)

| Example | Candidate result | Reason |
|---|---|---|
| Fee field is blank; no evidence says “no fee”. | UNKNOWN / NOT_PROVIDED; block any dependent “free” or actionability claim. | Missing is not none. |
| Two plausible sources give conflicting event dates. | CONFLICTING; do not select by recency alone. | Authority and resolution process are not established. |
| Organization was verified last month but the required freshness deadline is absent. | Historical verification may be described within scope; current-use is blocked. | Timestamp does not equal deadline. |
| Required verification deadline has passed. | EXPIRED for current-use until authorized reconfirmation; preserve historical record. | Temporal applicability changes; history is not rewritten. |
| A condition is explicitly assessed as irrelevant for a defined opportunity type, with rationale. | NOT_APPLICABLE for that scope only. | It is a reasoned scoped determination, not missing data. |
| A protected action is denied but only an event timestamp is stored. | Denial may be recorded; audit completeness is not established. | Outcome and traceability are distinct claims. |
| Policy owner/authorization is unresolved although other checks pass. | HOLD for the affected action. | Other positive predicates do not override missing authority. |

These examples check logical consistency of the proposal only. No fixture has been run and no behavior has been verified.

## 9. Unresolved decision register

| ID | Question | Classification | Safe current treatment |
|---|---|---|---|
| SC-01 | Which actor/process may confirm each claim and assign its freshness deadline? | Authority / governance | Do not infer authority from authorship or role label alone. |
| SC-02 | What is the conflict-resolution process for multiple Guardians or authorizers? | Policy/legal HOLD | Preserve conflict; block affected protected action. |
| SC-03 | Which opportunity conditions are material for each opportunity type? | Domain/product decision requiring evidence | Do not claim participant-specific actionability where a required condition is unknown. |
| SC-04 | How do existing `expires_at` and any other current fields map to the freshness semantics? | Field mapping decision; no automatic equivalence | Leave mapping unresolved. |
| SC-05 | Which event types require audit records, and what can be logged lawfully and safely? | Policy/legal + threat-model review | Do not claim universal audit completeness. |
| SC-06 | How are correction, deletion, redaction and audit preservation reconciled? | Policy/legal HOLD | Do not invent retention periods or promise permanent history. |
| SC-07 | Which historical/non-actionable claims may be displayed, to whom, for what purpose? | Access/disclosure policy HOLD | No new display or disclosure authorization. |
| SC-08 | Which semantic categories need to be represented explicitly in the frozen physical schema, if any? | Schema boundary decision | No schema amendment or implementation. |

## 10. Review checklist and disposition options

A reviewer should classify each section as:
- **ACCEPT AS RESTATEMENT** — already follows a ratified rule;
- **ACCEPT AS NEW SEMANTIC RULE** — requires explicit ratification;
- **REVISE** — contains ambiguity or contradiction;
- **POLICY/LEGAL HOLD** — cannot be resolved by product logic alone;
- **DEFER** — not needed to resolve the current decision.

Do not treat silence or a successful document commit as acceptance. Any ratification must be explicit and identify the scope. If a review changes a definition, preserve the previous version and decision provenance rather than silently rewriting history.

## 11. Status

This is a proposal for review, not a ratified semantic contract, code specification, schema migration plan, or test result. It does not authorize new entities/fields, implementation, RLS, API/UI, public opportunity listings, contact with minors, live pilot, or production use. No stakeholder validation, legal clearance, compliance, or security enforcement is claimed.

**Current status preserved:** STS-001 v1.1 remains **BLOCKED — NOT A PASS**. STS-006 remains blocked from evaluation under the current procedure. Existing gate and implementation holds remain in force.

## 12. Self-review clarification — 2026-10-09

A consistency review against the Constitution's epistemic-separation and historical-applicability rules identifies one important implementation-avoidance clarification:

- The labels in §3 are **cross-cutting semantic descriptions, not a shared status enum**. They must not be implemented as one generic status field across Assertion, Evidence, Verification, ConsentRecord, opportunity conditions and Decision.
- “WITHDRAWN” must be interpreted against the particular object and its authority: for example, withdrawal of consent affects future covered uses from the applicable effective time; withdrawal of an assertion records that the asserting source no longer stands by it; neither action silently deletes the historical event or automatically invalidates every earlier decision.
- “REVOKED” applies only where the relevant object/process supports revocation and the actor/process has the applicable authority. A generic revocation label must not invent a revocation power.
- “EXPIRED” describes a temporal applicability result for a scoped, time-bounded object; it does not prove the historical assertion false and must not be used as a synonym for withdrawn, disputed or revoked.
- “NOT_APPLICABLE” requires a reason, scope, evaluation time and attributable basis sufficient for later review. If that basis is absent, the state is not established as NOT_APPLICABLE.
- The candidate audit trace in §7 is a review checklist, not a requirement to store every listed item for every event. The applicable event class, necessity, access, retention and deletion rules must be determined before a concrete logging contract is authorized.

This clarification narrows the proposal to avoid accidental conflation of domain objects and authority. It does not ratify new semantics or authorize implementation.


## 13. Ratification-boundary classification — 2026-10-09

This classification is a review aid, not a ratification decision.

| Proposal area | Candidate classification | Why / required treatment |
|---|---|---|
| §2 epistemic and authority constraints | **ACCEPT AS RESTATEMENT** | Restates existing ratified M1–M9 and Assertion boundaries; do not broaden them. |
| §3 UNKNOWN / NOT_PROVIDED distinction | **PROPOSED SEMANTIC RULE** | Useful distinction, but explicit shared domain meaning requires review; do not add a generic status enum. |
| §3 CONFIRMED / CONFLICTING / DISPUTED | **MIXED: RESTATEMENT + PROPOSED PRECISION** | Conflict preservation is ratified; exact labels and application per object require review. |
| §3 EXPIRED / REVOKED / WITHDRAWN | **PROPOSED PRECISION / POLICY DEPENDENCY** | Temporal applicability is ratified; revocation authority and effects depend on object, context and accountable process. |
| §3 NOT_APPLICABLE | **PROPOSED SEMANTIC RULE** | Requiring a scoped rationale is a candidate contract, not yet a ratified universal representation. |
| §4 bounded dependency rule | **PROPOSED DESIGN RULE** | Follows evidence-bounded claims but needs review for claim-specific dependencies and allowed historical display. |
| §5 freshness rules | **PARTLY RATIFIED TABLETOP RULE; REMAINDER REVIEW/HOLD** | Missing/expired deadline blocks current-use within the bounded tabletop procedure; no universal duration, schema mapping or field equivalence is approved. |
| §6 authenticity / checked conditions / participant actionability | **RESTATEMENT + PROPOSED OPERATIONAL DETAIL** | Assurance tiers and separation are in the tabletop procedure; materiality by opportunity type still needs a decision. |
| §7 audit trace checklist | **PROPOSED CHECKLIST + POLICY/THREAT-MODEL HOLD** | Not a schema requirement; event coverage, privacy, access, retention and deletion need explicit review. |
| §8 hypothetical examples | **ILLUSTRATIVE ONLY** | Not executed tests, frozen fixtures, or empirical findings. |
| §9 unresolved decision register | **CARRY-FORWARD REGISTER** | Explicitly preserves authority, field mapping, retention and access questions as unresolved. |
| §12 self-review clarification | **PROPOSED CLARIFICATION** | Prevents accidental conflation; not independently ratified. |

**Review rule:** Only an explicit governance decision can move a row from proposed to ratified. File creation, ledger entry, PR update, internal consistency, or absence of objection does not ratify any new semantic rule. If a row depends on policy/legal authority, that hold cannot be cleared by a product-design decision alone.


## 14. Formal logic review — counterexamples and required refinement (2026-10-09)

**Review type:** Desk-level consistency review against the Constitution, current Gate Status, and ratified-for-tabletop-only Opportunity Verification Procedure v1.0. **No tests executed; no scenario opened; no new rule ratified.**

### FL-01 — Cross-cutting states are not mutually exclusive

Section 12 correctly says the labels are not one shared enum, but the proposal still needs an explicit compositional rule before implementation or formal ratification. For example, the same evidence item could be **EXPIRED** for current use and **DISPUTED** while its historical provenance remains **CONFIRMED**. These labels answer different questions; treating them as alternatives would erase information or force an arbitrary precedence.

**Disposition:** Keep labels as cross-cutting descriptions. Before any future machine representation, define separate semantic dimensions and permitted combinations per object type. This is a specification question, not permission to add columns, enums, or domain concepts.

### FL-02 — `valid_until` and `reconfirm_by` have not been shown to be semantically interchangeable

The proposal currently blocks current use after either applicable deadline and blocks when both deadlines imply inconsistent outcomes. That conservative tabletop treatment may be appropriate as a temporary fail-closed rule, but the names can encode different meanings: a validity end may mean the claim is no longer valid after a point; a reconfirmation date may mean a review is due. Counterexample: a venue was confirmed for a particular event, and a reconfirmation check is overdue, but no governing rule yet says the event fact itself becomes false at that instant. The system must not silently convert “review overdue” into “historically false”; it may still block action pending review.

**Disposition:** Preserve the existing tabletop block where that bounded rule applies. For any broader semantic contract, explicitly distinguish deadline type, what event triggers it, and its consequence for current-use. Do not map either field to `expires_at`, and do not choose a universal consequence or duration without governance. This refinement is required before the freshness section can be presented as a general semantic rule.

### FL-03 — “Weaker predicate” is explanatory, not yet a complete logic

The phrase “the outcome cannot be stronger than its weakest required predicate” expresses the evidence rule, but predicates do not always form a single ordered scale. Some claims require conjunctions; some may permit approved alternative evidence routes; some conditions are not applicable only after scoped assessment. Counterexample: two independent authorized evidence routes may each be sufficient for the same bounded claim, while an unrelated unknown field is not a dependency. A simple “weakest input wins” implementation could either over-block unrelated claims or permit an unsupported one.

**Disposition:** For each claim/action, define required predicates, approved alternatives, materiality, and the precise blocked/hold outcomes. Keep this as a candidate reasoning principle until claim-specific dependencies are approved; do not infer a universal evaluator or numeric score.

### FL-04 — Audit completeness must not override data minimisation

The §7 list is expressly a candidate checklist, not a schema mandate. Still, recording actor identity, target, purpose, evidence references, and prior state for every event could itself create unnecessary sensitive records if applied indiscriminately. A timestamp-only record may be insufficient for some audited decisions, but that does not prove every listed field is necessary for every event.

**Disposition:** Retain the checklist as review input. Require event-class-specific necessity, access, minimisation, retention, correction, and deletion decisions before any logging contract. No “log everything” or “retain forever” rule is implied.

### Formal review outcome

- **No contradiction found** with the Constitution's core epistemic separation, scoped authority, historical/current distinction, or frozen conceptual boundary.
- **Three material specification refinements remain**: orthogonal state composition (FL-01), distinct deadline semantics (FL-02), and claim-specific dependency logic (FL-03).
- **One policy/threat-model hold remains explicit**: event-specific audit minimisation and lifecycle (FL-04).
- These findings do **not** authorize more domain concepts, schema changes, code, RLS, API/UI, implementation, merge, live outreach, or pilot.
- Given the repository's anti-drift rule and thin external validation, do not create another standalone artifact for these findings. Keep them in this proposal and ledger; prioritize adult stakeholder validation when access becomes practical.

**Current evaluation boundary unchanged:** STS-001 v1.1 remains **BLOCKED — NOT A PASS**; STS-006 remains **BLOCKED FROM EVALUATION**; STS-002–010 remain unopened under the stop rule.
