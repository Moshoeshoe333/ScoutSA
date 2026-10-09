# Trust Core Unfrozen Specification-Gap Vectors — Proposal

**Prepared:** 2026-10-09  
**Status:** PROPOSED TEST DESIGN ONLY — NOT RATIFIED, NOT EXECUTED  
**AuthorityLevel:** NONE

## Boundary

These five candidate examples are separate from STS-FIXTURES-1.0 and v1.1. They do not reopen or amend frozen fixtures and are not results from any test. Each expected outcome is declared in advance. No implementation or harness is authorized.

## SGV-01 — Freshness field mapping ambiguity

**Input:** A verification has a creation timestamp and an `expires_at` field, but the governing claim requires explicit `valid_until` or `reconfirm_by` plus rationale. No approved mapping establishes equivalence.

**Expected outcome:** **BLOCKED — FRESHNESS CONTRACT NOT ESTABLISHED.** Do not silently map similarly named fields. Historical evidence may remain, but current-use is not established.

## SGV-02 — Unknown versus explicitly no fee

**Input:** Fee information is blank. No evidence confirms that no fee is required.

**Expected outcome:** **BLOCKED — FEE CONDITION UNKNOWN** where fees are material. Do not treat blank as zero, “free,” or permission.

## SGV-03 — Conflicting authorization evidence

**Input:** Two synthetic records conflict about whether an adult has authority for a requested action. No approved conflict-resolution policy or accountable reviewer is specified.

**Expected outcome:** **HOLD — AUTHORITY CONFLICT UNRESOLVED.** Do not proceed based on convenience or recency alone. Preserve the conflicting evidence references.

## SGV-04 — Correction history versus retention/deletion

**Input:** A disputed record contains incorrect information. History-preservation and retention/deletion requirements may conflict, and no approved policy resolves them.

**Expected outcome:** **POLICY HOLD — RETENTION RULE REQUIRED.** Do not invent a retention period or assume permanent retention is always correct. A future authorized policy must define correction, restriction, deletion and audit treatment.

## SGV-05 — Denial versus audit completeness

**Input:** A protected read is denied, but the event record lacks some of actor, target, reason, result or applicable rule reference.

**Expected outcome:** **DENIAL RECORDED; AUDIT COMPLETENESS NOT ESTABLISHED.** Keep the data undisclosed; do not claim complete traceability based on a timestamp alone.

## Review conditions before any future execution

1. Confirm all inputs are synthetic.
2. Approve expected outcomes before observing results.
3. Keep all frozen fixtures unchanged.
4. Specify the exact test target and authorized isolated environment.
5. Preserve PASS, FAIL, BLOCKED, NOT TESTED and NOT APPLICABLE as distinct results.
6. Keep unresolved policy/legal matters as HOLD.
7. Retain version, input, expected/observed outcome, evaluator and limitations.

These are candidate examples for explicit future review only. They do not settle the underlying policy questions or authorize implementation.

**Current state:** No vectors executed. STS-001 v1.1 remains **BLOCKED — NOT A PASS**; STS-006 remains blocked from evaluation. No stakeholder validation or legal clearance is claimed.
