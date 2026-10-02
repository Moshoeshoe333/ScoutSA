# Cross-Repository Methodology Witness

**Document:** `docs/research/cross-repository-methodology-witness.md`  
**Status:** Gate 1 methodology input — read-only comparative review  
**Scope:** Publicly/privately accessible repositories under `Moshoeshoe333` visible to the connected GitHub account on 2026-10-02  
**Rule:** This document extracts engineering lessons; it does not import another repository's architecture into ScoutSA.

---

## 1. Purpose

ScoutSA is being developed after several other Moshoeshoe333 repositories exposed recurring classes of engineering failure and corresponding controls.

The purpose of this witness is to prevent ScoutSA from repeating those failures.

The governing principle is:

> **Use lessons from prior repositories as evidence about process, not as authority for ScoutSA's domain.**

The review is comparative and bounded. It is not a line-by-line audit of every repository.

---

# 2. Repository Corpus

The connected GitHub account currently exposes these eight repositories:

| Repository | Role in comparative review | Current observation |
|---|---|---|
| `Soulsync-guardian` | Earlier Guardian/mobile implementation | Small public application; security/CI lessons |
| `soulsync-guardian-eas` | EAS/build separation | One-commit public repository; build/evidence boundary |
| `Mall-Navigre` | Local-first spatial product | Strong explicit vertical-slice and 33×3 methodology |
| `soulsync-3` | Constitutional/evidence-first system | Deep immutability, typed absence, truth-ledger discipline |
| `SOULSYNCMOBILE` | Current offline Guardian application | Repository → execution evidence → gate methodology |
| `SOULSYNCMOBILE-ledger` | Independent forensic ledger | Application/ledger separation and methodology deltas |
| `SOULSYNCMOBILE-runtime-evidence` | Runtime evidence boundary | Separate evidence surface |
| `ScoutSA` | Current subject | Domain/constitutional design; Gate 1 |

This is the observed repository corpus, not a claim that these are every repository ever created by the account.

---

# 3. Lessons From SoulSyncMobile

## 3.1 Repository state must precede interpretation

SoulSyncMobile's governing method is:

```text
repository state
→ execution evidence
→ interpretation
→ gate transition
```

This prevents a documentation statement, reviewer statement, or expected behavior from being mistaken for executed behavior.

### ScoutSA control

For every Gate 1 decision:

```text
repository document
→ exact committed state
→ witness case
→ observed result
→ interpretation
→ gate decision
```

A proposed domain rule does not become a fact because it is written in Markdown.

---

## 3.2 CI is not runtime

SoulSyncMobile explicitly separates CI/Semantic/fixture evidence from G-BOOT/mobile runtime evidence.

### ScoutSA control

ScoutSA must distinguish:

- constitutional/documentation evidence;
- domain witness evidence;
- automated test evidence;
- runtime evidence;
- production evidence.

A future passing test cannot retroactively prove that the domain model was correct before the test existed.

---

## 3.3 Ledger ≠ application

The independent SoulSyncMobile ledger exists to preserve forensic memory without changing the application runtime tree.

### ScoutSA control

Research documents may record:

- external evidence;
- methodology;
- findings;
- candidate amendments;
- witness outcomes.

They must not silently become constitutional authority.

The Constitution remains the constitutional surface.

The Domain Model remains the domain-model surface.

Research remains research until ratified.

---

## 3.4 External review ≠ repository truth

SoulSyncMobile repeatedly exposed the need to reconcile claims against exact repository state.

### ScoutSA control

External assessments are treated as:

```text
ASSERTION / REVIEW
→ SOURCE IDENTIFICATION
→ REPOSITORY CHECK
→ WITNESS
→ ACCEPT / QUALIFY / REJECT
```

No reviewer grade, external statement, or AI-generated summary becomes ScoutSA truth merely because it sounds coherent.

---

## 3.5 Minimal-change execution

The adopted SoulSyncMobile methodology is:

```text
FAILURE
→ MINIMAL FIX
→ DIFF AUDIT
→ INVARIANT AUDIT
→ EXECUTION
```

### ScoutSA control

When a Gate 1 failure appears, we do not redesign the entire domain.

We:

1. identify the exact seam;
2. reproduce the contradiction;
3. determine the minimum missing semantic;
4. amend only the affected constitutional/domain layer;
5. re-run the witness;
6. inspect the resulting diff;
7. re-evaluate Gate 1.

---

# 4. Lessons From Mall-Navigre

## 4.1 The Point must remain explicit

Mall-Navigre uses:

```text
Reality → Graph → Integrity → State → Decision → Experience
```

ScoutSA's equivalent should remain:

```text
Reality / Subject
→ Assertion
→ Authority
→ Evidence
→ Quality
→ Verification
→ Derived State
→ Decision
→ Controlled Disclosure
```

The product is not allowed to skip epistemic boundaries simply because a UI needs a convenient answer.

---

## 4.2 33×3 is an audit lens, not 99 features

Mall-Navigre explicitly defines the 33 perspectives as an audit lens and tests important capabilities across:

1. Existence
2. Coherence
3. Failure

### ScoutSA control

For every material domain capability:

**Existence**
- Does the concept exist?

**Coherence**
- Does it agree with Constitution, neighboring entities, authority rules, temporal rules, and evidence semantics?

**Failure**
- What happens when it is missing, stale, contradictory, revoked, duplicated, unauthorized, or unavailable?

This becomes the ScoutSA Gate 1 witness lens.

---

## 4.3 Reverse tracing is mandatory

Mall-Navigre requires both:

```text
UI → Domain Logic → Data
```

and:

```text
Data → Domain Logic → UI
```

The second direction exposes silent contradictions.

### ScoutSA adaptation

Use both:

```text
Decision
→ Derived State
→ Verification
→ Evidence
→ Assertion
→ Actor / Authority
```

and:

```text
Assertion / Evidence
→ Verification
→ Derived State
→ Decision
→ Disclosure
```

This is especially important for readiness.

---

## 4.4 Do not manufacture precision

Mall-Navigre explicitly refuses to claim exact indoor GPS positioning where the evidence cannot support it.

### ScoutSA control

The equivalent is:

> **Do not manufacture certainty from weak football information.**

Examples:

- self-report ≠ verified football fact;
- verified ≠ universally true;
- quality ≠ truth;
- readiness ≠ talent ranking;
- outcome ≠ causal proof;
- public availability ≠ permission to republish.

---

## 4.5 Data truth and user state must remain separate

Mall-Navigre separates canonical mall data from user parking state.

### ScoutSA control

Separate:

- canonical/institutional football records;
- player assertions;
- organization assertions;
- evidence artifacts;
- derived readiness;
- user preferences;
- audit history.

A player assertion must never mutate an authoritative institutional record merely because the player submitted it.

Likewise, an organization assertion must not silently erase a conflicting player assertion.

---

## 4.6 Vertical slices before expansion

Mall-Navigre's Parking Truth Test tests one complete vertical slice before AR, AI, BLE, or monetization.

### ScoutSA control

The first ScoutSA vertical truth slice should be:

```text
Player
→ Assertion
→ Authority
→ Evidence
→ Verification
→ Purpose
→ Derived State
→ Controlled Disclosure
→ Audit
```

If this cannot be reconstructed cleanly, ScoutSA must not proceed to ERD complexity, recommendation, scoring, or broad implementation.

---

# 5. Lessons From SoulSync-3

## 5.1 Immutability is a semantic control

SoulSync-3's recent hardening explicitly freezes structured 99 observations and tests deep immutability.

### ScoutSA control

Historical epistemic records must not be silently rewritten.

At minimum:

- assertions;
- evidence references;
- verification events;
- consent events;
- material decisions;
- audit events

must preserve historical provenance.

Correction is a new event or controlled state transition, not destruction of the previous observation.

---

## 5.2 Typed absence matters

SoulSync-3 established a constitutional distinction around typed absence and prohibited synthetic meaning.

### ScoutSA control

ScoutSA must distinguish:

- unknown;
- missing;
- not applicable;
- not verified;
- expired;
- revoked;
- disputed;
- contradicted.

We must never turn absence into:

- false;
- zero;
- safe;
- ready;
- verified.

This directly reinforces the existing ScoutSA invariant:

> **Missing is not positive.**

---

## 5.3 No synthetic authority

SoulSync-3's methodology prohibits synthetic relation, numerification, and authority promotion.

### ScoutSA control

The system must never manufacture:

- authority from role labels;
- verification from profile completeness;
- quality from source prestige alone;
- truth from agreement;
- readiness from a score without defined rules;
- consent from silence;
- disclosure permission from possession.

---

# 6. Lessons From Earlier Soulsync-guardian

The earlier Guardian repository provides a cautionary counterexample as well as useful security practice.

The current repository contains a security policy and CodeQL workflow history, but its small footprint means it cannot establish the later SOULSYNCMOBILE evidence discipline by itself.

### ScoutSA lesson

Security documentation and static controls are valuable, but they do not establish complete runtime or governance correctness.

Therefore:

```text
security document
≠
security proof
```

and:

```text
static check
≠
domain truth
```

---

# 7. Lessons From soulsync-guardian-eas

The EAS repository is intentionally tiny and currently consists of a README surface and a single initial commit.

### ScoutSA lesson

Build/infrastructure repositories should not be confused with application evidence.

A build artifact can establish:

- what was built;
- from which source;
- under which build configuration;

but cannot by itself establish:

- domain correctness;
- user safety;
- legal compliance;
- product readiness.

This reinforces the ScoutSA rule:

> **Artifact provenance is necessary evidence, not universal evidence.**

---

# 8. Lessons From SOULSYNCMOBILE-ledger

The ledger repository provides the strongest direct lesson for ScoutSA's research discipline.

Its explicit separation is:

```text
application
≠
forensic ledger
```

and:

```text
claim strength ≤ evidence strength
```

It also uses methodology deltas to absorb external engineering patterns without importing their architectures.

### ScoutSA adoption

This exact pattern is now applied here:

```text
external research
→ research witness
→ candidate domain implication
→ adversarial witness
→ candidate amendment
→ ratification
```

No external source gets direct write authority over the ScoutSA Constitution.

---

# 9. Lessons From SOULSYNCMOBILE-runtime-evidence

The runtime-evidence repository demonstrates another important separation:

```text
application state
≠
runtime evidence archive
```

### ScoutSA lesson

When ScoutSA eventually has implementation/runtime evidence, evidence should remain identifiable by:

- exact repository SHA;
- workflow/run identity;
- artifact identity;
- environment;
- timestamp;
- test/witness identity.

This prevents:

> "It worked"

from becoming an unverifiable historical statement.

---

# 10. Portfolio-Level Failure Patterns To Avoid

Across the repository corpus, the recurring hazards are:

### F-001 — Documentation outruns evidence

A document describes behavior before execution establishes it.

**ScoutSA control:** documentation status and witness status remain separate.

### F-002 — Proxy evidence becomes direct evidence

CI, static analysis, screenshots, reviews, or build artifacts are used to prove something they did not observe.

**ScoutSA control:** every witness states exactly what it establishes and what it does not.

### F-003 — External authority substitution

An external expert, AI, framework, repository, or standard becomes the decision-maker.

**ScoutSA control:**

> External source → evidence/input.  
> ScoutSA constitutional decision → witnessed internal decision.

### F-004 — Architecture expansion before boundary proof

New entities, fields, tools, or infrastructure are added because they seem useful.

**ScoutSA control:**

> **Use the smallest semantic addition that closes the largest evidenced domain gap.**

### F-005 — Mutable shortcuts destroy history

A convenient current-state field replaces a historical relationship.

**ScoutSA control:** Membership, Assertion, Verification, Consent, Evidence, and decisions retain provenance.

### F-006 — Scores hide semantics

A numerical score compresses disagreement or uncertainty into false precision.

**ScoutSA control:** derived states must be explainable and contextual.

### F-007 — Runtime and documentation become conflated

A UI screenshot or documentation page is treated as proof of backend/domain correctness.

**ScoutSA control:** evidence is typed by what was actually observed.

### F-008 — Parallel evidence surfaces drift

Application, ledger, runtime evidence, and documentation can disagree.

**ScoutSA control:** every cross-repository reference carries exact SHA/ref/artifact identity where relevant.

---

# 11. ScoutSA Methodology v0 Candidate

The cross-repository evidence supports the following working loop:

```text
POINT
  ↓
AUTHORITATIVE REPOSITORY STATE
  ↓
RESEARCH / ASSERTION
  ↓
EVIDENCE MAPPING
  ↓
33×3 WITNESS
  ├── EXISTENCE
  ├── COHERENCE
  └── FAILURE
  ↓
MINIMAL SEMANTIC CHANGE
  ↓
DIFF / INVARIANT AUDIT
  ↓
RE-WITNESS
  ↓
CANDIDATE RATIFICATION
  ↓
GATE TRANSITION
```

This is a **methodology proposal**, not a new constitutional article.

---

# 12. Gate 1 Application

For ScoutSA, the first complete witness remains:

## Case 1 — Player vs Coach

```text
PLAYER ASSERTION
Position = STRIKER

COACH ASSERTION
Position = MIDFIELDER
```

The witness must determine:

- Are both assertions preserved?
- Is each actor's authority scoped?
- Is evidence distinct from assertion?
- Can one evidence artifact support multiple assertions?
- Can verification attach to a defined assertion/scope?
- Can disagreement remain unresolved without data corruption?
- Can a derived "primary position" be reconstructed?
- Does the derived state identify its inputs, rules, timestamp, and purpose?
- Can the resulting disclosure be justified?
- Can the complete historical chain be audited?

### 33×3

**Existence**
- Can each concept be represented?

**Coherence**
- Does the representation agree with Constitution and Domain Model?

**Failure**
- What happens when the coach is wrong, the player is wrong, evidence expires, authority is revoked, or a third authority disagrees?

---

# 13. Research Methodology Boundary

The South African governance research now joins the cross-repository lessons without becoming constitutional law.

The combined chain is:

```text
PRIOR REPOSITORY LESSON
+
SOUTH AFRICAN EXTERNAL RESEARCH
+
CURRENT SCOUTSA DOMAIN
        ↓
GATE 1 WITNESS
        ↓
CANDIDATE SEMANTICS
        ↓
CONSTITUTIONAL RATIFICATION
```

No other repository gets to define ScoutSA's football domain.

No external legal source gets to define ScoutSA's implementation.

No AI reviewer gets to declare ScoutSA compliant.

No passing CI result gets to declare ScoutSA's domain correct.

---

# 14. Current Portfolio Findings

| Finding | Status |
|---|---|
| Eight Moshoeshoe333 repositories are currently visible to the connected GitHub account | **VERIFIED** |
| SoulSyncMobile established a strong repository → execution → interpretation → gate discipline | **VERIFIED METHODOLOGY** |
| Mall-Navigre established Point/Knowing, 33×3, vertical-slice, reverse-trace and no-manufactured-precision controls | **VERIFIED METHODOLOGY** |
| SoulSync-3 established strong immutability/typed-absence/authority-boundary lessons | **VERIFIED METHODOLOGY** |
| Ledger/runtime-evidence separation is useful for ScoutSA research/evidence governance | **VERIFIED METHODOLOGY** |
| These repositories justify importing their architectures into ScoutSA | **NOT ESTABLISHED / REJECTED** |
| ScoutSA should adopt the process controls that close demonstrated gaps | **CANDIDATE — STRONGLY SUPPORTED** |
| ScoutSA Constitution should now be amended | **NOT YET** |
| ScoutSA Domain Model should now be amended | **NOT YET** |
| ScoutSA should run the Assertion/Evidence/Authority witness next | **YES** |

---

# 15. Non-Negotiable ScoutSA Controls Going Forward

1. **Exact state before interpretation.**
2. **Research is evidence/input, not authority.**
3. **Documentation does not prove implementation.**
4. **CI does not prove runtime.**
5. **Runtime does not automatically prove legal compliance.**
6. **External review does not override repository evidence.**
7. **Missing ≠ false.**
8. **Quality ≠ truth.**
9. **Verification is scoped.**
10. **Authority is scoped.**
11. **Disagreement is preserved.**
12. **Historical records are not silently rewritten.**
13. **Derived state must preserve provenance.**
14. **Use the smallest change that closes the largest evidenced gap.**
15. **33×3 tests existence, coherence, and failure.**
16. **A vertical slice must work end-to-end before expansion.**
17. **No architecture is adopted merely because another repository uses it.**
18. **No compliance claim without implementation evidence and appropriate legal review.**

---

# 16. Immediate Next Operation

The portfolio review does **not** justify another broad design pass.

The next operation is:

```text
GATE 1
  ↓
CASE 1
PLAYER ASSERTION
vs
COACH ASSERTION
  ↓
33×3
  ↓
RECORD FAILURE SEAMS
  ↓
CASE 2
GUARDIAN AUTHORITY CONFLICT
  ↓
...
```

Only after the adversarial set converges should ScoutSA modify:

1. `docs/00-constitution.md`
2. `docs/03-player-passport.md`
3. `docs/05-consent-model.md`
4. `docs/01-domain-model.md)

and only then proceed to Gate 2.

---

## Final Methodological Finding

The other repositories teach the same lesson from different domains:

> **A system becomes trustworthy not when it contains more structure, but when every important transition has a known boundary, an observable state, and evidence proportionate to the claim.**

For ScoutSA, that means the central engineering problem is no longer merely:

> "What entities should we build?"

It is:

> **"What must be true before ScoutSA is permitted to say that it knows something?"**

That question now governs Gate 1.
