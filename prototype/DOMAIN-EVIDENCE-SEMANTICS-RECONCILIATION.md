# Domain Evidence Semantics Reconciliation — Review Proposal

**Status:** Proposed clarification for governance review · NOT RATIFIED  
**Branch:** `prototype/internal-demo`  
**Date:** 17 November 2026

## 1. Purpose

Record a wording inconsistency in the canonical Domain Model without silently changing a ratified semantic boundary. This document proposes a narrow clarification for the appropriate domain authority to review.

**No canonical definition is changed by this proposal. No implementation, schema, migration, API, RLS, data-processing or gate-transition authority is created.**

## 2. Exact issue

In `docs/01-domain-model.md`, §3 currently defines Evidence as:

> Evidence: an artifact, observation, assertion, or system event supporting a claim.

The same section ratifies:

- ASSERTION ≠ EVIDENCE
- EVIDENCE ≠ VERIFICATION
- VERIFICATION ≠ TRUTH

The Evidence definition lists “assertion” as an Evidence type, while the ratified distinction says an Assertion and Evidence are not the same epistemic object. This creates an avoidable semantic ambiguity for every module that uses the vocabulary.

## 3. Candidate clarification

The following wording is proposed for governance consideration only:

- **Source:** the origin, issuer, system, person, organization or process from which information is obtained.
- **Assertion:** an attributable proposition about a subject, event, state or relationship.
- **Evidence:** an artifact, observation or recorded system event that supports, challenges or contextualizes an assertion or claim.
- **Verification:** a scoped assessment of an assertion against identified evidence, authority, method and applicable criteria.
- **Decision:** an authorized disposition within a defined process; it is not itself proof that the underlying assertion is true.

A source is not automatically evidence. An assertion is not automatically evidence. Evidence does not automatically verify an assertion. Verification does not establish universal truth. A decision does not replace its evidence basis.

This wording is intentionally a candidate. Domain governance must decide whether “claim” and “assertion” are synonyms or whether Claim is a distinct abstraction before this language is adopted.

## 4. Three-direction review

### Top-down

The Constitution and Domain Model preserve epistemic separation, scoped authority and provenance. The proposed wording is intended to clarify, not weaken, those boundaries.

### Bottom-up

Tournament and opportunity modules currently contain source labels, source IDs, evidence references, actor statements and review states. Those fields must not be interpreted interchangeably. A synthetic record or user-entered statement does not become verified merely because it is stored.

### Sideways

The vocabulary must be consistent across Player Passport, Organization Membership, Opportunity Evidence, Tournament Organizer, Match-Day Handoff, Statistic Reconciliation, Player Tournament History and the review engine. No module may introduce its own competing meaning without an explicit versioned contract and governance approval.

## 5. Required governance decisions

1. Is “claim” a synonym for Assertion or a separate domain concept?
2. Can a recorded system event itself be Evidence, or is it a Source/Provenance event supporting an assertion?
3. Can one evidence artifact support multiple assertions, and can one assertion have multiple supporting or contradictory evidence items?
4. How are evidence that challenges a claim, conflicting sources and superseded evidence represented?
5. Does Verification assess authenticity, applicability, sufficiency, accuracy or a defined subset—and how are these dimensions kept separate?
6. Which canonical definitions and downstream contracts require versioned amendment if the wording is ratified?

## 6. Required safeguards

Until governance resolves the issue:

- Do not treat an Assertion as Evidence solely because the current definition lists it.
- Do not infer Verification from the presence of a source ID or evidence reference.
- Preserve contradictory evidence and provenance; do not collapse disagreement into a single status.
- Keep source, assertion, evidence, verification and decision labels explicit in new proposals.
- Do not alter the canonical Domain Model or existing production contracts through this proposal.
- Keep all prototype examples synthetic.

## 7. Acceptance criteria for closure

This issue may be closed only when:

- an authorized domain owner resolves the Claim/Assertion distinction;
- the canonical definition and ratified semantic list are internally consistent;
- affected contracts and examples are inventoried;
- a versioned change record identifies every downstream artifact requiring amendment;
- documentation-integrity tests cover the adopted vocabulary;
- the gate ledger records the decision and its authority.

A wording edit without this evidence is not closure.

## 8. Sources

- [Canonical Domain Model](../docs/01-domain-model.md), §3 and §3.1.
- [Tournament Data Architecture Draft](TOURNAMENT-DATA-ARCHITECTURE-DRAFT.md).
- [Tournament Architecture Decision Register](TOURNAMENT-ARCHITECTURE-DECISION-REGISTER.md), TAD-007.
- [Organizer Identity and Authority Crosswalk](ORGANIZER-IDENTITY-AUTHORITY-CROSSWALK.md).

**Conclusion:** A genuine semantic inconsistency has been identified. The safe mitigation is a governance-bound clarification proposal, not an unauthorized edit to the canonical model.
