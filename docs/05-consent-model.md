# Consent Model

## Purpose

ScoutSA operates in a context that may involve children's personal information and other sensitive information. Consent, safeguarding, lawful processing, data minimisation, and access control therefore form part of the core product model.

This document is a **product and engineering specification**. It does not by itself establish legal compliance.

## Core Rules

1. Age and applicable legal status must be determined from authoritative identity data where required.
2. For minors, guardian involvement and applicable consent requirements are mandatory product gates.
3. Consent is granular, purpose-specific, versioned, auditable, and revocable where legally applicable.
4. Academic and medical information receive restricted treatment and are collected only when justified.
5. Consent events are retained as an auditable history.
6. A consent record must identify what was authorised, for what purpose, by whom, when, and under which version.
7. Revocation must propagate to the relevant visibility or contact pathways according to the purpose and applicable legal requirements.

## Consent Types

| Consent / Authorisation | Purpose |
|---|---|
| Profile Creation | Establish the Player Passport |
| Profile Visibility | Permit discovery by defined audiences |
| Contact Requests | Permit contact/opportunity requests through ScoutSA |
| Media Sharing | Permit specified media to be viewed |
| Academic Visibility | Permit defined academic status to be shared |
| Medical Clearance Sharing | Permit limited clearance information to be shared |
| Trial-Specific Approval | Permit a particular opportunity |
| Retention / Processing Acknowledgement | Record the applicable processing basis and notice |

The exact legal basis for each processing activity must be established during implementation and legal review rather than assumed to be consent in every case.

## ConsentRecord

A ConsentRecord should contain, at minimum:

- Player ID
- Authorising person ID
- Consent / authorisation type
- Status
- Version
- Timestamp
- Purpose
- Scope
- Expiry where applicable
- Revocation timestamp where applicable
- Relevant organisation / opportunity where purpose-limited

## Contact / Trial Request Gate

When an organisation requests contact or invites a player:

1. Identify the requesting person and organisation.
2. Identify the purpose.
3. Identify trial date and location when applicable.
4. Evaluate the information required for the request.
5. Check applicable consent and safeguarding gates.
6. Present the guardian with the relevant context.
7. Record the decision.
8. Release only the information authorised by the applicable rules.
9. Log the interaction.

Possible guardian responses:

- Approve
- Decline
- Request more information

## Medical Information

Default principle: **minimum necessary information**.

The general Passport should expose, where legitimately required:

- Clearance status
- Expiry / validity state

Detailed medical information should be isolated behind strict access controls and purpose limitation.

## Revocation

A revocation event must be recorded rather than deleting the historical fact that consent previously existed.

Current permissions must be recalculated from the authoritative consent state.

## Audit

Consent grants, changes, and revocations should produce durable audit events sufficient to establish:

- who acted
- what changed
- when it changed
- why / for what purpose
- what version governed the action

## Compliance Boundary

ScoutSA must not claim "POPIA compliant" merely because this document exists.

Before a compliance claim is made, the implemented system should be assessed against applicable requirements, including children's information, processing purpose, data minimisation, security safeguards, retention, access rights, incident handling, and organisational responsibilities.
