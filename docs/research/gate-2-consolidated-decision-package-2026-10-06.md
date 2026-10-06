# Gate 2 Consolidated Decision Package — 2026-10-06

**Purpose:** Resolve remaining Gate 2 relationship questions without inventing semantic concepts, legal authority, or implementation structures.

## Decision rule

Each open item is classified as RATIFY, DEFER AS OPERATIONAL POLICY, DEFER AS LEGAL/JURISDICTIONAL QUESTION, REJECT, or IMPLEMENTATION DETAIL — AFTER ERD.

> **Strength of claim must never exceed strength of evidence.**

## G2-SEAM-01 — User ↔ Player

| Question | Decision |
|---|---|
| User = Player? | **REJECT** |
| Player may exist without User? | **RATIFY / EXISTING SAFE PRINCIPLE** |
| User may exist without Player? | **RATIFY / EXISTING SAFE PRINCIPLE** |
| Exact cardinality? | **DEFER AS DOMAIN DECISION** |
| Delegated/shared Player access? | **DEFER AS DOMAIN + AUTHORIZATION POLICY** |
| User lifecycle controls Player lifecycle? | **REJECT** |

No single FK/cardinality is justified by current evidence. Delegation mechanisms remain downstream of an explicit domain decision.

## G2-SEAM-02 — User ↔ Guardian / Coach / Scout / Organization

| Question | Decision |
|---|---|
| Role = verified external status? | **REJECT** |
| User = Guardian/Coach/Scout identity? | **REJECT** |
| Organization affiliation = universal authority? | **REJECT** |
| Guardian relationship remains Player-specific? | **RATIFY / EXISTING SAFE PRINCIPLE** |
| Exact role multiplicity? | **DEFER AS DOMAIN DECISION** |
| Exact Organization affiliation/cardinality? | **DEFER AS DOMAIN + OPERATIONAL POLICY** |
| External verification/authorization process? | **DEFER AS OPERATIONAL / LEGAL QUESTION** |

Do not create a permanent user.organization_id, role-implied authority, or universal organization access rule.

## G2-SEAM-03 — GuardianLink ↔ ConsentRecord

| Question | Decision |
|---|---|
| GuardianLink = ConsentRecord? | **REJECT** |
| Consent expands legitimate authority? | **REJECT** |
| Authorising-person reference proves authority by itself? | **REJECT** |
| Consent is purpose-bound and temporal? | **RATIFY / EXISTING SAFE PRINCIPLE** |
| Historical consent erased on revocation? | **REJECT** |
| Authority/consent/context changes can affect current applicability? | **RATIFY / EXISTING SAFE PRINCIPLE** |
| Multiple-Guardian conflict precedence? | **DEFER AS LEGAL/JURISDICTIONAL + OPERATIONAL QUESTION** |
| Authoriser ↔ User/Guardian/Player exact cardinality? | **DEFER AS DOMAIN DECISION** |
| Latest/first/majority wins? | **REJECT** |

The domain is coherent without inventing a universal Guardian hierarchy.

## G2-SEAM-07 — OpportunityApplication

| Question | Decision |
|---|---|
| Application first-class? | **RATIFY / CONFIRMED** |
| Application subject = Player + Opportunity? | **RATIFY / CONFIRMED** |
| Initiating actor always Player? | **REJECT** |
| Guardian participation replaces GuardianLink/Consent? | **REJECT** |
| Child Voice = consent/veto? | **REJECT** |
| Application state = truth/suitability? | **REJECT** |
| APPROVED = PLACEMENT? | **REJECT** |
| Exact participant cardinality? | **DEFER AS DOMAIN + OPERATIONAL POLICY** |
| Exact transition authority? | **DEFER AS OPERATIONAL POLICY** |
| Complete lifecycle vocabulary? | **DEFER AS DOMAIN/OPERATIONAL POLICY** |
| Withdrawal/cancellation/invitation semantics? | **DEFER AS DOMAIN/OPERATIONAL POLICY** |
| Technical participant/state-history structures? | **IMPLEMENTATION DETAIL — AFTER ERD** |

OpportunityApplication is semantically sufficient; operational lifecycle remains to be made precise.

## G2-SEAM-08 — Outcome

| Question | Decision |
|---|---|
| Outcome first-class? | **RATIFY / CONFIRMED** |
| Multiple outcomes conceptually possible? | **RATIFY / SAFE PRINCIPLE** |
| Outcome = Application state? | **REJECT** |
| Outcome = truth? | **REJECT** |
| Outcome = ranking/reputation? | **REJECT** |
| Placement proves ScoutSA caused placement? | **REJECT** |
| Correction silently rewrites history? | **REJECT** |
| Dispute proves falsity? | **REJECT** |
| Contradictory outcomes silently collapsed? | **REJECT** |
| Exact multiplicity/cardinality? | **DEFER AS DOMAIN DECISION** |
| Correction/version/supersession semantics? | **DEFER AS DOMAIN/OPERATIONAL POLICY** |
| Dispute lifecycle/participants? | **DEFER AS OPERATIONAL POLICY** |
| Placement/registration treatment? | **DEFER AS DOMAIN/OPERATIONAL POLICY** |
| Access/retention? | **DEFER AS LEGAL/JURISDICTIONAL + OPERATIONAL POLICY** |
| Technical history structures? | **IMPLEMENTATION DETAIL — AFTER ERD** |

Outcome is semantically sufficient; remaining questions concern exact relationship and lifecycle semantics.

# Cross-seam conclusion

## Settled semantic boundaries

- USER ≠ PLAYER.
- ROLE ≠ UNIVERSAL AUTHORITY.
- ROLE ≠ VERIFICATION.
- GUARDIANLINK ≠ CONSENT.
- CONSENT ≠ AUTHORITY EXPANSION.
- ASSERTION ≠ EVIDENCE.
- ASSERTION ≠ VERIFICATION.
- ASSERTION ≠ TRUTH.
- VERIFICATION ≠ SAFEGUARDING CLEARANCE.
- CHILD VOICE ≠ GUARDIAN AUTHORITY.
- CHILD VOICE ≠ CONSENT.
- CHILD VOICE ≠ FINAL DECISION.
- APPLICATION STATE ≠ TRUTH.
- APPROVED ≠ PLACEMENT.
- OUTCOME ≠ APPLICATION STATE.
- OUTCOME ≠ RANKING/REPUTATION.
- DISPUTE ≠ PROOF OF FALSITY.
- CORRECTION ≠ HISTORY ERASURE.
- HISTORICAL VALIDITY ≠ CURRENT APPLICABILITY.
- DISCOVERABILITY ≠ REPUBLICATION.

## Missing-semantic-concept test

**PASS.** No additional first-class semantic concept is currently warranted beyond:

1. Assertion;
2. Safeguarding Case / Response;
3. Child Participation / Voice Record.

## ERD readiness test

**Question:** Is anything remaining that genuinely prevents a coherent conceptual ERD?

**Answer:** Not at the semantic-ontology level.

Remaining questions concern exact cardinalities, authority processes, lifecycle vocabulary, correction/dispute handling, and access/retention policy. These must be explicitly marked rather than guessed.

## Gate 2 disposition

**GATE 2 — SEMANTIC RELATIONSHIP INTEGRITY: READY FOR CONCEPTUAL ERD DRAFT**

This is **not full Gate 2 closure**.

### Authorized next step

1. Draft a complete implementation-independent conceptual ERD.
2. Mark unresolved cardinalities and operational/legal dependencies explicitly.
3. Run one consolidated adversarial ERD review.
4. Resolve or explicitly carry forward remaining non-semantic decisions.
5. Freeze the conceptual relationship model.
6. Freeze the MVP boundary.
7. Only then define schema and implementation.

### Forbidden shortcuts

No schema-driven domain invention; no universal Guardian precedence; no latest/first/majority wins; no verification-as-truth; no safeguarding clearance inferred from verification; no child-capacity or best-interests adjudication by AI; no outcome-as-ranking; no technical history structure promoted to semantic truth; no legal compliance certification; no implementation before MVP boundary freeze.

## 33×3 transition check

- **Existence:** PASS
- **Coherence:** PASS
- **Failure containment:** PASS

**Decision: Proceed to conceptual ERD drafting, not implementation.**
