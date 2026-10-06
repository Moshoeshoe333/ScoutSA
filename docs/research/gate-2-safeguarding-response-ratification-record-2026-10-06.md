# Gate 2 G2-SEAM-05 — Safeguarding Case/Response Ratification Record

**Date:** 2026-10-06  
**Seam:** G2-SEAM-05  
**Decision:** RATIFIED — semantic domain concept

## 1. Ratification basis

The G2-SEAM-05 governance re-witness established that:

- Gate 1 already ratified distinct safeguarding response states.
- AuditEvent is insufficient to represent the substantive safeguarding response lifecycle.
- A first-class Safeguarding Case/Response concept is required to preserve that lifecycle without collapsing its states.
- The ratification review tested compatibility with M1–M9, the Assertion concept, provenance, authority boundaries, truth boundaries, disclosure boundaries, and implementation deferral.
- All ratification tests passed.

## 2. Ratified concept

**Safeguarding Case/Response** is a first-class semantic domain concept representing the substantive safeguarding response context around a concern/report and, where applicable, subsequent finding/substantiation, protective action, investigation outcome, and final resolution.

Not every case must pass through every state.

The concept preserves the distinction between the historical record of what was reported or done and any later current applicability or resolution.

## 3. Ratified boundaries

- CONCERN / REPORT ≠ FINDING / SUBSTANTIATION
- FINDING / SUBSTANTIATION ≠ PROTECTIVE ACTION
- PROTECTIVE ACTION ≠ INVESTIGATION OUTCOME
- INVESTIGATION OUTCOME ≠ FINAL RESOLUTION
- VERIFICATION ≠ SAFEGUARDING CLEARANCE
- PROTECTIVE ACTION ≠ GUILT
- CASE EXISTENCE ≠ TRUTH
- CASE EXISTENCE ≠ LEGAL VALIDITY
- HISTORICAL RESPONSE RECORD ≠ CURRENT APPLICABILITY
- SAFEGUARDING RECORD VISIBILITY ≠ PUBLIC DISCLOSURE
- AI ≠ SAFEGUARDING ADJUDICATOR

## 4. Minimum semantic representation

Where applicable, the concept preserves:

- case/response identity;
- safeguarding subject;
- concern/report provenance;
- submitting/receiving actor;
- relevant organization/opportunity context;
- temporal history;
- response state(s);
- responsible authority/process reference where applicable;
- supporting Evidence;
- protective action records where applicable;
- investigation outcome where applicable;
- final resolution where applicable;
- disclosure/access classification;
- correction/dispute provenance.

These are semantic requirements, not database columns.

## 5. Explicit non-ratifications

This ratification does not establish:

- universal safeguarding authority;
- legal investigative or adjudicative authority;
- allegation-to-guilt rules;
- automatic exclusion;
- safeguarding clearance;
- fixed investigation procedure;
- fixed retention duration;
- automatic public disclosure;
- POPIA/Children's Act compliance certification;
- AI adjudication;
- database schema;
- RLS;
- API;
- UI;
- production readiness.

## 6. Reconciliation authorization

The ratification authorizes semantic reconciliation:

**Constitution → Domain Model → Relationship Model → Ledger**

The ERD remains derived work. No schema or implementation is authorized merely by this ratification.

## 7. Gate consequence

```
G2-SEAM-05: CLOSED — SEMANTIC CONCEPT RATIFIED
GATE 2: OPEN
ERD: HOLD pending remaining seam interrogation
SCHEMA: HOLD
RLS/API/UI: DEFERRED
IMPLEMENTATION: DEFERRED
```
