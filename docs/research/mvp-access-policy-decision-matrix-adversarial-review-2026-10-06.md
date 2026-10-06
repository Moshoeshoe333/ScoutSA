# ScoutSA MVP Access-Policy Decision Matrix — Adversarial Review — 2026-10-06

**AuthorityLevel:** NONE  
**Review status:** PASS WITH POLICY HOLDS  
**Artifact reviewed:** docs/research/mvp-access-policy-decision-matrix-2026-10-06.md  
**Matrix commit:** be583b62479c9292b6d11d45565dcb2752388291

## 1. Review purpose

Test whether the access matrix converts the ratified semantic boundaries into explicit policy classifications without silently inventing:

- legal authority;
- Guardian precedence;
- child capacity or best-interests conclusions;
- safeguarding findings;
- consent validity;
- public republication permission;
- unrestricted role authority;
- technical permissions before policy ratification.

## 2. Adversarial checks

| Check | Result | Finding |
|---|---|---|
| Every MVP resource represented | PASS | All MVP access-sensitive resources are represented. |
| Four decision classes explicit | PASS | ALLOW, DENY, CONDITIONAL and HOLD are defined. |
| Conditional ≠ authorized | PASS | Matrix explicitly prevents direct conversion into RLS predicates. |
| HOLD ≠ DENY | PASS | Unresolved policy/legal matters are preserved as HOLD. |
| USER ≠ PLAYER | PASS | Identity and access authority remain separate. |
| ROLE ≠ UNIVERSAL AUTHORITY | PASS | No role grants unrestricted access. |
| MEMBERSHIP ≠ OWNERSHIP | PASS | Organization membership does not create Player-data ownership. |
| GuardianLink ≠ blanket consent | PASS | Guardian access remains scoped and conditional. |
| Consent ≠ blanket database permission | PASS | ConsentRecord is restricted and purpose-bound. |
| Assertion/Evidence separation | PASS | Evidence is not automatically exposed with Assertions. |
| Verification ≠ safeguarding clearance | PASS | Verification display is bounded. |
| Child Voice separation | PASS | Child voice is not converted into consent, veto or final decision. |
| Safeguarding separation | PASS | Case/Response is not treated as guilt or clearance. |
| Discoverable ≠ republishable | PASS | Public access remains explicit/conditional. |
| Historical ≠ current authorization | PASS | Current applicability is an explicit requirement. |
| Audit isolation | PASS | AuditEvent is not a general disclosure surface. |
| Retention separated from RLS | PASS | Retention/deletion remains a separate hold. |
| Legal conclusions invented | PASS | No legal precedence/capacity/finding is encoded. |
| Technical implementation leakage | PASS | No SQL/RLS predicate is implemented. |
| Public sensitive-data leakage | PASS | Medical, academic, consent, safeguarding and audit are not public. |
| New domain concept invented | PASS | Matrix uses established concepts only. |
| 33×3 existence | PASS | Access decisions map to established resources/holds. |
| 33×3 coherence | PASS | Ratified semantic distinctions remain intact. |
| 33×3 failure containment | PASS | Unresolved questions become CONDITIONAL/HOLD rather than invented permissions. |

## 3. Boundary correction applied before review closure

The initial draft used unconditional ALLOW in the Protected / Accountability column.

That was too broad because “protected/accountability” is an access context, not an established universal authorization.

The matrix was tightened so protected/accountability access is conditional on an explicitly authorized accountability function.

This is important because a safeguarding, consent, medical or audit record must not become readable merely because an actor is described as an accountability actor.

## 4. Remaining policy/legal holds

The matrix does not resolve:

- exact User↔Player cardinality/delegation;
- actor↔Organization affiliation and authority;
- Guardian conflict precedence;
- authorizer legal validity;
- application transition authority;
- outcome correction/dispute;
- child-voice effects in specific workflows;
- safeguarding response authority;
- public Passport field selection;
- public Verification display state;
- protected/minor-data access requirements;
- retention/deletion;
- lawful republication/further processing.

These remain intentionally unresolved.

## 5. Implementation boundary

The review authorizes no:

- RLS SQL;
- policy creation;
- GRANT/REVOKE changes;
- migration;
- production database;
- API authorization implementation;
- UI exposure of protected records.

The matrix is evidence for a future policy-ratification step.

## 6. Decision

**MVP ACCESS-POLICY DECISION MATRIX: ADVERSARIAL REVIEW PASS WITH POLICY-LEGAL HOLDS**

The artifact is structurally suitable for explicit policy/legal ratification.

It is **not** itself authorization to implement RLS.

### 33×3

- Existence: PASS
- Coherence: PASS
- Failure containment: PASS

**AuthorityLevel: NONE**
