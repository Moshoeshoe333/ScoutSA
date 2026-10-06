# ScoutSA MVP Actor × Purpose × Resource Authorization Map — Adversarial Review — 2026-10-06

**AuthorityLevel:** NONE
**Status:** PASS WITH POLICY / LEGAL HOLDS
**Artifact:** docs/research/mvp-actor-purpose-resource-authorization-map-2026-10-06.md
**Source commit:** 1b60a47396f5c128786de2bfd1738609ca15b19b

## 1. Review scope

The authorization map was tested against the ratified ScoutSA semantic boundaries and the existing MVP Access-Policy Decision Matrix.

The review asks one question:

> Does the map make access more explicit without silently creating authority?

## 2. Adversarial results

| Test | Result |
|---|---|
| Actor context is distinct from role title | PASS |
| Purpose is explicit | PASS |
| Resource is explicit | PASS |
| Four classifications are preserved | PASS |
| USER is not PLAYER | PASS |
| ROLE is not UNIVERSAL AUTHORITY | PASS |
| MEMBERSHIP is not OWNERSHIP | PASS |
| GuardianLink is not blanket consent | PASS |
| AUTHORITY is not CONSENT | PASS |
| Purpose A is not Purpose B | PASS |
| Assertion is not Evidence | PASS |
| Assertion visibility is not Evidence visibility | PASS |
| Verification is not safeguarding clearance | PASS |
| Child Voice is not Consent | PASS |
| Child Voice is not Final Decision | PASS |
| Safeguarding Case is not Finding/Guilt | PASS |
| Public discovery is not republication | PASS |
| Historical authorization is not current applicability | PASS |
| Sensitive data remains non-public by default | PASS |
| Audit remains isolated | PASS |
| Retention remains separate from RLS | PASS |
| No legal Guardian precedence invented | PASS |
| No child-capacity rule invented | PASS |
| No safeguarding adjudication invented | PASS |
| No consent-validity rule invented | PASS |
| No universal role authority invented | PASS |
| No RLS SQL introduced | PASS |
| No migration authorization introduced | PASS |

## 3. Material findings

### Finding A — System is not an authority source

The System / service row remains CONDITIONAL across resources.

This is correct. Technical execution may enforce approved policy but cannot create legal or product authority.

### Finding B — Public access remains narrow

Public display is limited to explicitly approved information. Evidence, consent, academic, medical, safeguarding and audit records remain DENY.

This preserves the mandatory distinction between discoverability and republication.

### Finding C — Organization access is opportunity-scoped

Organization actors do not receive general Player access merely from membership or role.

This preserves the distinction between membership and ownership.

### Finding D — Guardian access remains scoped

Guardian access is Player-specific and purpose-bound. Conflicting Guardian authority remains unresolved rather than silently ordered.

### Finding E — Sensitive domains remain separated

Academic, medical, safeguarding, child-voice and consent records do not become generally readable through a broader Passport or Opportunity permission.

### Finding F — Application and Outcome remain distinct

Opportunity workflow access does not imply placement, success, truth, ranking or generalized Player authority.

## 4. Policy/legal holds confirmed

The review does not resolve:

- User↔Player cardinality/delegation;
- organization actor affiliation;
- Guardian conflict/authorizer validity;
- application participant/transition authority;
- public Passport fields;
- public Verification display state;
- outcome correction/dispute;
- child participation effects;
- safeguarding response authority;
- medical/academic disclosure;
- retention/deletion;
- lawful basis/republication/further processing.

## 5. Implementation boundary

The map is suitable as a policy-design artifact.

It does not authorize:

- RLS SQL;
- database policies;
- GRANT/REVOKE;
- API authorization;
- UI disclosure;
- migration;
- production database use.

A combination may become implementation-eligible only after actor, purpose, resource, authority source, applicability, field-level disclosure and policy/legal status are sufficiently resolved and explicitly ratified.

## 6. 33×3

- Existence: PASS
- Coherence: PASS
- Failure containment: PASS

## 7. Decision

**MVP ACTOR × PURPOSE × RESOURCE AUTHORIZATION MAP: ADVERSARIAL REVIEW PASS WITH POLICY / LEGAL HOLDS**

**RLS:** NOT AUTHORIZED.
**Migration:** HOLD.
**Production:** HOLD.

**AuthorityLevel: NONE**
