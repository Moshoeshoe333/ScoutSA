# ScoutSA Field / Constraint Decision Matrix — 2026-10-06

**Status:** READY FOR REVIEW  
**Authority:** Derived from frozen schema boundary and physical-schema draft.  
**No SQL authority:** This matrix does not itself authorize migration.

## 1. Decision classes

- **S:** semantically required to preserve the concept.
- **O:** operationally required for an approved MVP workflow.
- **C:** legally/contextually conditional.
- **D:** derived; source records remain authoritative.
- **A:** audit/provenance requirement.
- **I:** implementation detail.

## 2. Field/constraint matrix

| Table | Representative field/boundary | Class | Decision |
|---|---|---:|---|
| users | stable identity reference | S/I | Required to distinguish authentication identity from Player identity. |
| users | role/actor information | O | Must not itself grant universal authority. |
| players | stable Player identity | S | Required Player Passport identity. |
| players | football/opportunity source references | S | Must point to source concepts, not derived truth. |
| guardians | stable Guardian identity | S | Separate from User identity. |
| guardian_links | Player + Guardian relationship | S | Player-specific relationship; authority scope remains policy-bound. |
| memberships | Player + Organization relationship | S | Membership does not imply universal organization authority. |
| assertions | subject/context + attribution + temporal/provenance context | S/A | Preserve claim separately from evidence and verification. |
| evidence | source/provenance + temporal context | S/A | Supports assertions; does not establish truth by itself. |
| verifications | scoped evaluation + temporal context | S/A | Verification remains scoped and distinct from truth/safeguarding clearance. |
| consent_records | purpose + scope + authorizer + lifecycle | S/O/A/C | Purpose-bound; authorizer applicability must be checked under policy/law. |
| media | media reference + purpose/provenance | C/O | Only where justified; visibility/republication is separate. |
| season_performances | performance record/context | O | Football evidence only; not ranking by itself. |
| academic_profiles | minimum justified eligibility/context | C | Conditional collection. |
| medical_clearances | minimum clearance state where required | C | No detailed medical repository by default. |
| transport_profiles | access/transport feasibility context | O/C | Used for opportunity feasibility where relevant. |
| organizations | organization identity | S | Organization identity distinct from User/role. |
| opportunities | opportunity identity + organization/context | S/O | Core demand-side object. |
| opportunity_applications | Player + Opportunity + lifecycle context | S/O | Structured interaction; state is not Outcome. |
| outcomes | application/pathway outcome + provenance/context | S/O/A | Does not prove platform causation or placement truth. |
| child_participation_voice_records | child expression + matter/context + temporal/provenance context | C/S/A | Separate from consent, authority and final decision. |
| safeguarding_cases | defined safeguarding matter/subject + provenance/context | C/S/A | Existence is not finding, guilt or clearance. |
| safeguarding_responses | response/action + responsible authority/context + temporal record | C/O/A | Protective action remains distinct from investigation/final resolution. |
| football_readiness | derived inputs/version/context | D | Never source of truth or generalized ranking. |
| opportunity_readiness | Player + Opportunity derived state/context | D | Never source of truth or generalized ranking. |
| audit_events | actor/action/target/time/result context | A/O | Accountability record; does not replace substantive records. |

## 3. Constraints that must remain policy-dependent

Do **not** freeze physical constraints for:

- exact User ↔ Player cardinality;
- shared/delegated access;
- exact actor ↔ Organization multiplicity;
- Guardian conflict precedence;
- authorizer cardinality;
- application transition authority;
- application lifecycle vocabulary;
- outcome correction/dispute mechanics;
- child voice legal effect;
- safeguarding escalation authority;
- access/disclosure;
- retention/deletion.

These require explicit operational or legal decisions before encoding.

## 4. Nullability principle

A nullable field must mean **not applicable / not collected under the approved purpose / not yet available**, not an invented semantic state.

Requiredness must be attached to a workflow and purpose where the concept is conditional.

## 5. Integrity principle

Technical constraints may preserve already-ratified semantics, but may not invent them.

Examples:
- A uniqueness constraint must not be used to silently decide whether multiple legitimate assertions/outcomes may exist.
- A foreign key must not be used to manufacture authority.
- RLS must not be used to decide unresolved legal disclosure.
- A check constraint must not encode a legal guardian hierarchy that has not been ratified.

## 6. Acceptance evidence

Before schema freeze, each implemented field/constraint must have a traceable test or rationale showing that it:
- preserves the source concept;
- supports the approved MVP flow;
- does not collapse a ratified distinction;
- does not create universal authority;
- has bounded access/retention implications.

## 7. 33×3

**Existence — PASS**  
**Coherence — PASS**  
**Failure containment — PASS**

## 8. Decision

**FIELD/CONSTRAINT DECISION MATRIX: READY FOR ADVERSARIAL REVIEW.**

Next: adversarial review → physical schema freeze. SQL/migrations remain HOLD.


# Field / Constraint Matrix Adversarial Review — 2026-10-06

**Decision:** PASS — PHYSICAL SCHEMA BOUNDARY READY FOR FREEZE

## Review

| Test | Result |
|---|---|
| Every candidate field traces to a frozen concept | PASS |
| MVP relationship coverage | PASS |
| Ratified M1–M9 preservation | PASS |
| Conditional-data minimization | PASS |
| Provenance preservation | PASS |
| Derived-state containment | PASS |
| Authority containment | PASS |
| Child participation boundary | PASS |
| Safeguarding boundary | PASS |
| Disclosure/republication boundary | PASS |
| Nullability semantics | PASS |
| Constraint non-invention | PASS |
| Legal-policy separation | PASS |
| Technical leakage | PASS |
| 33×3 Existence | PASS |
| 33×3 Coherence | PASS |
| 33×3 Failure containment | PASS |

### Freeze decision

The field/constraint matrix is accepted as the governing traceability artifact for the physical schema draft.

**PHYSICAL SCHEMA BOUNDARY: READY FOR FREEZE.**

Before SQL/migrations, the physical schema itself must be reviewed against this matrix and explicitly frozen.

No unresolved legal or operational question may be encoded as a technical constraint.
