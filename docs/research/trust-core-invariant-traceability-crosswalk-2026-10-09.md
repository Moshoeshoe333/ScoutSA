# Trust Core Invariant Traceability Crosswalk

**Prepared:** 2026-10-09  
**Status:** DESK CROSSWALK — NOT EXECUTED; NO FIXTURE EVALUATION  
**AuthorityLevel:** NONE  
**Compared artifacts:** `trust-core-logic-only-invariant-and-test-matrix-2026-10-09.md`, `opportunity-verification-procedure-v1-2026-10-09.md`, `synthetic-trust-fixtures-v1.1-2026-10-09.md`, and `synthetic-trust-evaluation-set-2026-10-09.md`.

## 1. Scope

This document compares written requirements and fixture definitions only. It does not execute any scenario, judge STS-002–STS-010, amend the procedure, or change frozen fixtures. “Aligned” means the source text directly expresses the same principle; it does not mean implementation or enforcement is proven. “Partial” means only part of the proposed invariant is explicit. “Gap” means the inspected artifacts do not establish the full requirement. “Not in scope” means the source intentionally does not settle the question.

## 2. Invariant crosswalk

| Invariant | Procedure evidence | Fixture-definition evidence | Status | Remaining note |
|---|---|---|---|---|
| INV-01 Evidence scope bounds claim scope | §1–2 requires claim-by-claim scope, source reference, limitations | STS-001 v1.1 limits its corroborated claims explicitly | ALIGNED (document level) | Does not prove runtime enforcement. |
| INV-02 Authenticity does not imply availability | §1–2 explicitly separates authenticity from actionability; unresolved conditions block Tier 2 | STS-001 unresolved conditions; STS-002 role verified/opportunity unverified | ALIGNED (document level) | No scenario was executed here. |
| INV-03 Authenticity does not imply participant suitability | §2 Tier 3 requires participant-specific eligibility, feasibility, consent and action decision | STS-001 says Tier 3 not established; STS-010 separates access barrier from ability | ALIGNED (document level) | Participant-specific criteria still depend on approved context. |
| INV-04 Missing freshness metadata is not fresh | Freshness decision record/procedure requires explicit `valid_until` or `reconfirm_by`; missing means blocked | STS-001 v1.1 was corrected to blocked due to missing deadline | ALIGNED (document level) | Exact schema mapping remains unresolved; `expires_at` is not presumed equivalent. |
| INV-05 Expired verification is not current without reconfirmation | Freshness decision requires reconfirmation after deadline; procedure blocks unsupported current use | STS-006 definition blocks evaluation until a governed rule/fixture change | PARTIAL | Expiration semantics are specified conceptually; exact transition behavior needs a separately authorized test. |
| INV-06 Unknown is not false, true, zero, or permission | §2 requires material conditions; §3 blocks unresolved/conflicting evidence | STS-005 and STS-010 preserve uncertainty/barriers | PARTIAL | No complete typed-state contract has been ratified for every field. |
| INV-07 Consent is purpose- and scope-bound | §2 Tier 3 requires applicable consent, purpose and disclosure scope | STS-007 definition covers purpose-mismatched consent | ALIGNED (document level) | Enforcement and legal mapping remain unproven/held. |
| INV-08 Missing/withdrawn/conflicting authorization does not silently permit disclosure | §2 Tier 3 blocks when required evidence is missing; §8 preserves holds | STS-007 definition covers missing/withdrawn/mismatched consent | PARTIAL | Specific guardian/authorizer conflict resolution is a policy/legal hold. |
| INV-09 Higher assurance tiers require their own predicates | §2 defines three tiers and says no tier automatically advances | STS-001 expected handling limits claims; STS-002 prevents status inheritance | ALIGNED (document level) | No automatic software transition is authorized. |
| INV-10 Material unresolved conditions block dependent actionability | §2 explicitly blocks unresolved material conditions; §3 pauses where needed | STS-001, STS-005 and STS-010 definitions | ALIGNED (document level) | Materiality is context-dependent and must be recorded, not inferred universally. |
| INV-11 Corrections supersede rather than falsify history | §3 requires preserving prior states; evaluation protocol preserves observations/corrections/retests | STS-009 definition covers correction/dispute and prior-state preservation | PARTIAL | Exact retention/deletion and append-only enforcement remain policy/design questions. |
| INV-12 Denied action is not allowed; material attempt should be auditable | §2–3 define blocked states and recorded decisions; §7 requires recorded observations | STS-007/008 definitions mention recording decisions | PARTIAL | A universal denied-action audit schema and access-policy enforcement are not established. |
| INV-13 Field/table presence is not enforcement evidence | §7 says tabletop is not software-enforcement evidence; §8 preserves implementation holds | Evaluation set distinguishes test design from execution | ALIGNED (governance principle) | Actual access-control negative tests have not been run. |
| INV-14 Policy/legal HOLD cannot be inferred into ALLOW | §2–3 and §8 require blocking/holds; procedure grants no live authority | Fixtures consistently specify no implementation/live authority | ALIGNED (governance principle) | Exact policy owners and approvals still need identification through proper governance. |
| INV-15 Synthetic PASS is not real-world validation | §7 explicitly says tabletop is not legal-compliance or live-pilot evidence | Evaluation set §1–3 bounds synthetic test claims | ALIGNED (governance principle) | Independent/blind evaluation has not occurred. |

## 3. Cross-cutting findings

1. The written procedure and fixture definitions align strongly on claim scope, authenticity/actionability separation, explicit consent scope, blocking unresolved material conditions, and no automatic tier promotion.
2. The clearest open specification gaps are exact freshness field mapping and transition behavior; fully typed unknown/conflict semantics; accountable authorization/guardian-conflict handling; retention/deletion boundaries for corrections; and the required audit detail for denied attempts.
3. These gaps do not justify adding tables or columns by default. First reconcile the requirement to existing domain concepts and the frozen physical boundary; any proposed amendment needs its own decision record and authorization.
4. Written alignment is not proof of execution, security, or implementation. The current SQL draft and table presence do not prove these behaviors.
5. The crosswalk does not reopen STS-001 and does not evaluate STS-002–STS-010. In particular, STS-001 v1.1 remains **BLOCKED — NOT A PASS** and STS-006 remains blocked from evaluation under the current procedure.

## 4. Next logic-only step

Prepare a small set of *new, unfrozen candidate* adversarial examples for the specification gaps in Section 3, with expected outcomes and rationale written before any evaluation. Do not alter or reopen frozen fixtures. Any new test pack must be explicitly labelled proposed and must not be treated as authorized execution until separately approved.

## 5. Non-authorization

This crosswalk authorizes no schema change, code, harness, migration, RLS, API/UI, real-person data, live outreach, public listing, production use, pilot, or gate transition. No stakeholder validation, legal clearance, or production readiness is claimed.
