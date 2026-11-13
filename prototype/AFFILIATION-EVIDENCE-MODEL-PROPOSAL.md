# ScoutSA Affiliation Evidence Model — Proposal

**Status:** Research/design proposal — **NOT RATIFIED**  
**Branch:** `prototype/internal-demo`  
**As of:** 2026-11-13  
**Authority:** None. This document proposes a way to reason about affiliation claims; it does not amend the Constitution, Domain Model, Relationship Model, schema boundary, or implementation permissions.

## 1. Decision question

How can ScoutSA preserve credible evidence of a player's grassroots football participation without making formal club registration the only route by which a player can describe their football history?

The model must support different realities: formally recorded club participation, community-based coaching or development, and player-reported experience. It must not pretend these sources have identical authority.

## 2. Governing distinctions

- **Membership** is the historical/current relationship between a Player and an Organization.
- **Assertion** is an attributable claim about that relationship or another defined fact.
- **Evidence** is the source material or observation that may support an Assertion.
- **Verification** is a scoped determination by an authorized reviewer under a defined process.
- **Consent** is purpose-specific permission; it is not evidence that a membership claim is true.
- **Workflow status** is not proof. An Active record can remain unverified or disputed.

The Domain Model already allows organization assertions, player confirmation or dispute, and supporting evidence. This proposal does not create a new semantic entity.

## 3. Proposed evidence classes

These are **source/evidence classes, not trust tiers or a ranking of players**. They must remain separately identifiable.

### A. Player-reported experience

**What it can support:** A claim that the player reports participating with a named club, school, community team, coach, or development programme during a stated period.

**Minimum record context proposed:**
- player subject and claim author clearly identified;
- named team/programme/coach, or an explicit unknown value;
- claimed role (for example player, trial participant, training participant);
- approximate or exact period, with uncertainty retained;
- location/context where useful;
- source marked as player-reported;
- correction/dispute path.

**What it cannot establish by itself:**
- that the named organization is legitimate;
- that the player was officially registered;
- that a coach or organization endorsed the claim;
- current membership, eligibility, performance level, safeguarding clearance, or opportunity suitability.

**Use:** Preserve the player's account and permit appropriately consented, restricted discovery workflows to consider the claim as uncorroborated context. Never display it as independently verified membership.

### B. Community-coach attestation

**What it can support:** A named coach's first-hand attestation that they personally coached, trained, observed, or supervised a player in a defined community setting and period.

**Minimum record context proposed:**
- coach/attestor identity and how it was checked;
- claimed coaching role and the basis for that role;
- player subject;
- specific relationship/observation being attested (training attendance, coaching period, team participation, or another bounded fact);
- dates/period and frequency where known;
- source of the attestation and submission time;
- any conflict of interest or relationship to the player;
- independent corroboration, if available, recorded separately;
- limits of the attestor's authority.

**What it cannot establish by itself:**
- formal club, league, or academy registration;
- institutional endorsement where the coach has no authority to speak for that institution;
- a player's current availability, ability, eligibility, or safeguarding status;
- truth beyond the coach's stated first-hand knowledge.

A community coach may be a credible witness to their own coaching relationship without representing a registered organization. ScoutSA must not invent organizational authority from a coach title.

### C. Formal organization record

**What it can support:** A claim that a club, school, academy, league, or other organization recorded a player's membership, registration, roster inclusion, or defined participation.

**Minimum record context proposed:**
- organization identity independently checked to the level required by the claim;
- representative's identity and authority checked for the exact organization and action;
- source record type and provenance (for example, authenticated organization-controlled roster or registration record);
- player subject and relationship/role;
- applicable season/period and effective dates;
- record issue/capture date and any expiry or supersession;
- integrity/authenticity review and limitations;
- player confirmation, disagreement, or non-response preserved separately.

**What it cannot establish by itself:**
- current membership beyond the record's valid period;
- performance quality, selection likelihood, or readiness;
- safety of a separate opportunity;
- that the organization or representative has authority outside the verified scope.

An old roster is historical evidence, not proof of current affiliation. A document's appearance or logo alone is not authentication.

## 4. Evaluate evidence on separate dimensions — no composite trust score

A reviewer should record the following dimensions independently:

| Dimension | Review question |
|---|---|
| Provenance | Where did this record or observation originate, and can that origin be traced? |
| Source identity | Is the author/attestor/source identified to the level required? |
| Authority | Is this source entitled to make this particular claim? |
| Directness | Is the source first-hand, a contemporaneous record, or hearsay? |
| Independence | Does corroboration come from a genuinely separate source? |
| Temporal fit | Does the evidence cover the claimed period and the decision's relevant date? |
| Integrity | Is the record complete and plausibly authentic, with alterations/limitations considered? |
| Scope | Which exact proposition can this evidence support, and which propositions remain outside it? |
| Contradiction | Are there conflicting assertions or records that require separate handling? |

Do not add these dimensions into a single numerical score. A high result on one dimension cannot compensate automatically for a failure on another. Two copies of the same source are not independent corroboration.

## 5. Proposed review outcomes

The following labels are candidates for a future policy vocabulary, not frozen lifecycle states:

- **Received** — submitted, not yet assessed.
- **In review** — a human review is active.
- **Corroborated for this claim** — the evidence supports only the specified proposition and period under an approved rule.
- **Not corroborated** — available evidence does not independently support the claim.
- **Insufficient** — the evidence is incomplete or too weak to decide.
- **Disputed** — a material conflicting assertion exists.
- **Stale / period ended** — the evidence may remain historically relevant but does not establish current status.
- **Blocked** — source authority, identity, safeguarding, consent, or another prerequisite prevents the review from proceeding.

A reviewer must record the claim, scope, rationale, evidence references, limitations, reviewer authority, and review time. A status must never silently rewrite the original assertion.

## 6. Opportunity-specific acceptance

There should be no universal rule that every opportunity accepts every evidence class.

Before an opportunity is published or used for matching, its authorized owner must define:
- the exact eligibility proposition that needs proof;
- acceptable evidence classes for that proposition;
- minimum provenance and authority requirements;
- relevant period/freshness;
- whether independent corroboration is required;
- how disputes and missing records are handled;
- who may decide and who performs independent review.

Examples:
- A community development session may reasonably accept a first-hand community-coach attestation for participation in that coach's sessions.
- A formal league-registration requirement may require an authenticated league or organization record.
- A scouting review may consider player-reported history as context, but must label it as such and must not convert it into verified membership.

If a requirement is not evidenced, record **not established** rather than inventing a negative conclusion about the player's ability or potential.

## 7. Anti-exclusion and safeguarding controls

1. Lack of formal registration must not erase a player's self-reported football history.
2. Player-reported claims must never be promoted to independent verification merely because no contradiction is known.
3. A coach attestation must not become institutional verification without verified authority.
4. Organization verification and membership verification remain separate.
5. A membership decision must not imply skill, readiness, selection, or opportunity safety.
6. No evidence class permits direct private contact with a minor.
7. Unknown age receives the under-18 safeguard path until reliably resolved.
8. Player voice, guardian authority, consent, and legal parental responsibility remain distinct; this proposal does not settle multi-guardian authority or custody disputes.
9. No real identity documents, minor data, or private media are required for the synthetic prototype.
10. Evidence access and disclosure require separate purpose, privacy, retention, and authorization rules.

## 8. Adversarial cases the eventual policy must survive

| Case | Required handling |
|---|---|
| Player reports informal team participation; no club registration exists | Preserve as player-reported; do not label false or verified by default. |
| Coach attests to weekly training but has no authority to represent a club | Consider only the coach's bounded first-hand attestation. |
| Coach uses an academy name/logo without proof of affiliation | Do not infer academy authority; investigate source/authority separately. |
| Organization roster is authentic but from two seasons ago | Preserve historical period; do not infer current membership. |
| Organization claims a player is registered; player disputes it | Preserve both assertions and route to a defined dispute process. |
| Two coaches repeat the same unverified story | Do not count repetition as independent corroboration. |
| Player has no documents and is under 18 | Do not bypass age, guardian, consent, or safeguarding gates. |
| Opportunity requires formal league registration | Apply the published requirement; do not relabel informal participation as formal registration. |
| Organization is verified but its representative is not | Organization identity alone does not authorize the representative's assertion. |
| Evidence supports training attendance but not match selection | Limit any corroborated outcome to training attendance. |

## 9. Decisions still required before ratification

- Which actors may submit each class, and what identity checks are proportionate?
- What constitutes adequate proof of a community coach's identity and first-hand role without excluding informal football structures?
- When is independent corroboration mandatory, and what counts as independent?
- Which organization types and records qualify for formal membership evidence?
- What dispute process protects both player and organization without silently suppressing either assertion?
- What is the minimum acceptable evidence for each opportunity type, and who has authority to set it?
- What data may be visible to whom, for what purpose, and for how long?
- How are minor participation, child voice, guardian conflict, and safeguarding concerns handled under qualified South African legal and safeguarding review?

These questions require evidence and appropriate stakeholder/legal review. This proposal alone cannot answer them.

## 10. Gate and implementation boundary

**No implementation is authorized by this proposal.**

Do not change the review engine, schemas, membership fixture semantics, database model, RLS, API, or user-facing verification labels until:
1. the proposal is challenged against real grassroots operating contexts;
2. relevant actors and evidence requirements are independently reviewed;
3. unresolved contradictions and legal/safeguarding questions are recorded;
4. the competent governance authority explicitly ratifies the policy;
5. the Domain Model and downstream contracts are reconciled.

**Current decision:** retain the existing verified-membership rule. This proposal is a decision aid only; it does not change any engine behavior or gate status.

---

**Evidence principle:** A claim may be preserved before it is verified. A claim may be considered without being accepted. A claim may be corroborated only within the exact scope the evidence supports.
