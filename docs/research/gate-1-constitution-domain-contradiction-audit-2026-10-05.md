# ScoutSA Gate 1 — Constitution / Domain Model Contradiction Audit

**Status:** Preliminary final contradiction audit — NOT RATIFICATION  
**Date:** 2026-10-05  
**Proposal under test:** Formal Minimal Semantic Amendment Proposal  
**Constitution ref:** main / docs/00-constitution.md  
**Domain Model ref:** main / docs/01-domain-model.md

---

## 1. Audit Rule

The proposed amendments may strengthen or clarify the existing domain only if they do not silently contradict an already ratified constitutional principle or an existing domain invariant.

A contradiction is treated as material where the proposal would:

- reverse an existing principle;
- create a broader authority than the current model permits;
- erase historical provenance;
- make a derived state authoritative;
- weaken guardian/safeguarding controls;
- imply a legal or compliance conclusion not earned by evidence;
- or force implementation before the domain is resolved.

---

## 2. Constitution Audit

### A — Visibility with Integrity

**Existing direction:** verification is the foundation of trust and self-reported data alone is insufficient.

**Proposal interaction:** Amendment A strengthens the distinction between assertion, evidence, verification, and derived state.

**Result:** NO CONTRADICTION.

---

### B — Trust Over Growth

**Existing direction:** data integrity, guardian control, and player safety cannot be sacrificed for growth.

**Proposal interaction:** Amendments B, C, F, and G prevent convenience-driven promotion of authority, consent, verification, or public availability.

**Result:** NO CONTRADICTION.

---

### C — Guardian Control

**Existing direction:** minors require guardian control subject to applicable consent and safeguarding requirements.

**Proposal interaction:** Amendment B makes authority scoped rather than universal; Amendment C keeps authorization purpose-bound; Amendment F separates verification from safeguarding.

**Result:** NO CONTRADICTION.

**Important boundary:** The proposal does not decide which Guardian wins where lawful authorities conflict.

---

### D — Opportunity Feasibility

**Existing direction:** Opportunity Readiness depends on contextual requirements including guardian, consent, transport, medical and academic factors.

**Proposal interaction:** Amendments D and E prevent stale or withdrawn inputs from silently continuing to support a current readiness result.

**Result:** NO CONTRADICTION.

---

### E — Verification Beats Self-Reporting

**Existing direction:** stronger verification signals must identify their source and scope.

**Proposal interaction:** Amendment A explicitly prevents verification from becoming universal truth; Amendment F prevents verification from becoming safeguarding clearance.

**Result:** NO CONTRADICTION.

---

### F — Player Passport as Source of Truth

**Existing direction:** Passport is the persistent football identity and historical relationships are preserved.

**Proposal interaction:** Amendments A, D, and E preserve underlying records and prevent derived states from replacing source records.

**Result:** NO CONTRADICTION.

---

### G — Evidence Rule

**Existing direction:** claim strength must never exceed evidence strength.

**Proposal interaction:** Amendment A operationalizes this epistemically without creating an implementation requirement.

**Result:** NO CONTRADICTION.

---

### H — Safety and Privacy

**Existing direction:** privacy, safeguarding, consent, data minimisation, access control, retention, and auditability are product requirements.

**Proposal interaction:** Amendments C, D, F, and G strengthen these boundaries while preserving legal-review qualifications.

**Result:** NO CONTRADICTION.

---

## 3. Domain Model Audit

### A — Authority Vocabulary

The Domain Model already distinguishes Owner, Author, Authority, Verifier, Evidence, Consent, and Derived State.

**Proposal:** Amendment A and B sharpen those distinctions.

**Result:** NO CONTRADICTION.

---

### B — Evidence Model

The Domain Model already states that evidence does not automatically establish truth and requires provenance, source, scope, freshness, and authority considerations.

**Proposal:** Amendment A and D formalize the same semantic boundary.

**Result:** NO CONTRADICTION.

---

### C — Guardian / GuardianLink

The Domain Model already gives GuardianLink:

- authority scope;
- status;
- effective-from;
- effective-to;
- evidence reference;
- verification status.

It also states that guardian authority is scoped and that exact legal definitions remain subject to jurisdiction-specific review.

**Proposal:** Amendment B fits the existing model and makes its unresolved conflict boundary explicit.

**Result:** NO CONTRADICTION.

---

### D — ConsentRecord

The Domain Model already defines consent as:

- versioned;
- purpose-specific;
- effective;
- revocable;
- optionally expiring;
- incapable of granting access beyond the grantor's authority.

**Proposal:** Amendment C is directly consistent.

**Result:** NO CONTRADICTION.

---

### E — Verification

The Domain Model already states that verification is scoped, timestamped, and may expire, be superseded, suspended, or revoked.

**Proposal:** Amendments A, D, and F prevent verification from being overextended.

**Result:** NO CONTRADICTION.

---

### F — OpportunityReadiness

The Domain Model already states that OpportunityReadiness is:

- derived;
- contextual;
- point-in-time;
- based on underlying records;
- explainable by underlying inputs;
- not a permanent Player percentage.

**Proposal:** Amendment E is a direct semantic strengthening.

**Result:** NO CONTRADICTION.

---

### G — Historical Records and Audit

The Domain Model already states that historical records are preserved and material corrections preserve provenance, while also retaining unresolved retention-period decisions for later gates.

**Proposal:** Amendment D preserves this principle but explicitly qualifies historical reconstruction by applicable retention/deletion law and policy.

**Result:** NO CONTRADICTION.

---

### H — Visibility and Sensitive Data

The Domain Model already provides field-level and purpose-specific access control and keeps guardian, medical, transport, academic, and consent information restricted by default.

**Proposal:** Amendment G reinforces that public discoverability does not automatically establish republication authority.

**Result:** NO CONTRADICTION.

---

### I — Explicit Unresolved Decisions

The Domain Model deliberately leaves unresolved:

- guardian legal definition;
- jurisdiction-specific age/consent requirements;
- verification hierarchy;
- retention periods;
- authorization/RLS;
- dispute/correction workflow;
- moderation/escalation;
- organization verification.

**Proposal interaction:** None of the seven amendments resolves these prematurely.

**Result:** NO CONTRADICTION.

---

## 4. Overreach Audit

| Risk | Result |
|---|---|
| Universal Guardian precedence | REJECTED |
| Latest assertion wins | REJECTED |
| Highest verification wins | REJECTED |
| Role creates universal authority | REJECTED |
| Trial consent becomes media consent | REJECTED |
| Historical record must always be retained | REJECTED |
| Stale evidence remains current | REJECTED |
| Derived readiness becomes authority | REJECTED |
| Verification becomes safeguarding clearance | REJECTED |
| Public record becomes blanket republication permission | REJECTED |
| AI becomes legal/safeguarding authority | REJECTED |
| Compliance claim created by documentation | REJECTED |
| Schema/RLS forced by semantic proposal | REJECTED |

---

## 5. Contradiction Audit Verdict

### Constitutional contradiction

**NONE FOUND.**

### Domain-model contradiction

**NONE FOUND.**

### Unsupported legal expansion

**NONE FOUND IN THE PROPOSED WORDING**, subject to the explicit legal-review boundaries retained in Amendments B, F, and G.

### Implementation leakage

**NONE FOUND.**

### New domain concepts accidentally frozen

**NONE FOUND.**

### Material unresolved issue discovered

**Yes — provenance numbering anomaly remains unresolved:** duplicate numbered witness filenames exist for Cases 07, 08, and 09. The canonical 01–14 sequence is currently determined by the committed ledger/synthesis, while the duplicate witness files remain preserved evidence.

This is a repository provenance issue, not a reason to alter the semantic amendment proposal.

---

## 6. Audit Decision

The formal amendment proposal **survives the Constitution / Domain Model contradiction audit**.

This does **not** mean the amendments are ratified.

The correct state is:

**FORMAL PROPOSAL: SURVIVES CONTRADICTION AUDIT**

**CONSTITUTION: UNCHANGED**

**DOMAIN MODEL: UNCHANGED**

**RATIFIED AMENDMENTS: 0**

**AFFECTED-CASE RE-WITNESS: NEXT**

**ERD / SCHEMA: DEFERRED**

**RLS: DEFERRED**

**IMPLEMENTATION: DEFERRED**

**GATE 1: OPEN**

---

## 7. Next Evidence Transition

The next evidence-bearing action is not implementation.

It is:

**Formal proposal → affected-case re-witness → contradiction check → Gate 1 decision.**

The affected cases are:

- Case 01
- Case 02
- Case 03
- Case 04
- Case 05
- Case 06
- Case 07
- Case 08
- Case 09
- Case 10
- Case 11
- Case 12
- Case 13
- Case 14

because the seven amendments collectively touch every major Gate 1 witness.

No constitutional or domain-model edit should occur until that re-witness is recorded.
