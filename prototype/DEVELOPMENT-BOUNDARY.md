# Internal demonstration development boundary

**Decision type:** Product-development scope decision  
**Authority:** Internal project-owner direction  
**Applies to:** `prototype/internal-demo` only  
**Status:** Active for synthetic-data demonstration work; does not amend production gates.

## Decision

The project owner has directed that internal product development continue while external validators are not responding. External validation is therefore not a prerequisite for building and testing a clearly labelled, non-production demonstration.

## Authorized now

- Responsive browser prototypes.
- Synthetic and fictional records only.
- Local interaction and presentation tests.
- Frontend architecture experiments that do not connect to real personal data.
- Documentation required to make the demonstration understandable and reproducible.

## Not authorized by this decision

This decision does not ratify the MVP access-policy matrix, actor-purpose-resource authorization map, RLS predicates, migration execution, production database use, real-player onboarding, public player discovery, real opportunity publication, contact or application workflows, guardian/consent processing, safeguarding adjudication, or any legal/compliance claim.

No real child or adult player personal data, identity documents, private contact details, medical records, academic records, or private media may be entered into this demonstration.

## Evidence and release language

- A prototype is not a functioning production service.
- A UI smoke test is not a security, authorization, privacy or legal-compliance test.
- Synthetic records are not evidence of market demand or customer adoption.
- A feature may be described as implemented only when the corresponding code and test evidence exist.
- External validation remains a required product-learning activity before real-world pilot decisions.

## Review trigger

Revisit this boundary before connecting any backend, enabling accounts, processing personal data, publishing real opportunities, or inviting real players or organizations into the system.

**Governing rule:** Strength of claim must never exceed strength of evidence.
