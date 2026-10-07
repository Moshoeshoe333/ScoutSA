# ScoutSA Opportunity Pathway Model — 2026-10-07

## Status

**STATUS: RESEARCH / DESIGN INPUT — NOT RATIFIED**

This artifact defines a conceptual pathway for testing the ScoutSA product thesis against real-world evidence. It does not amend the Constitution, MVP boundary, conceptual ERD, physical schema, access-policy matrix, RLS boundary, or implementation authorization.

**AuthorityLevel: NONE beyond the evidence and design reasoning recorded here.**

## Purpose

ScoutSA's North Star is not profile activity. It is:

> **Verified players receiving genuine football opportunities.**

The pathway is:

**Player → Football Readiness → Opportunity → Opportunity Readiness → Authorized Connection → Trial/Opportunity Event → Real-World Outcome**

The pathway deliberately separates football capability from practical access, and discovery from authorization to contact.

## 1. The Pathway

### Stage A — Player Identity / Passport

The Player Passport is the persistent football identity.

It may hold identity information, football profile, membership history, evidence and verification signals, guardian relationship where applicable, relevant readiness inputs, and controlled media or other purpose-limited information.

**Boundary:** Passport existence is not verified truth.

### Stage B — Football Readiness

Football Readiness asks:

> What evidence exists that this player may be suitable for the football requirements of the opportunity?

Relevant inputs can include position, performance records, media, and scoped coach verification.

It is not a talent score, universal ranking, selection guarantee, or prediction of success.

**Boundary:** Football Readiness is not Opportunity Readiness.

### Stage C — Opportunity Definition

An Opportunity is a specific real-world pathway, not merely a search result.

It should have enough context to determine whether participation is realistically possible, such as opportunity type, responsible organization/person context, football requirements, date/time where applicable, location where applicable, participation requirements, and other legitimate prerequisites.

**Boundary:** Opportunity existence is not an outcome.

### Stage D — Opportunity Readiness

Opportunity Readiness is evaluated for a player against a specific opportunity.

**Player + Opportunity + Current Inputs → Feasibility Evaluation → Readiness State**

Existing candidate states:

- Trial Ready
- Ready with Constraints
- Needs Guardian Action
- Needs Transport Verification
- Incomplete
- Not Ready

The same player can have different readiness states for different opportunities.

**Boundary:** Readiness summarizes currently known prerequisites; it does not guarantee selection or success.

### Stage E — Discovery

A scout or opportunity-side actor discovers a player only through visibility permitted for that context.

Discovery may expose relevant football signals, verification signals, readiness context, and legitimate opportunity-relevant information.

Restricted medical, academic, guardian, safeguarding, or contact information must not silently become discovery data.

**Boundary:** Discoverable is not contact-authorized.

### Stage F — Authorized Connection

A contact or trial request is a distinct event.

Conceptually:

**Discovery → Request → Applicable Authorization / Safeguarding Evaluation → Decision → Authorized Information Release**

For a minor, applicable guardian and safeguarding requirements must be evaluated rather than assumed.

A request may be approved, declined, awaiting more information, or otherwise unresolved under the applicable process.

**Boundaries:**
- Request is not approval.
- Approval is not safeguarding clearance.
- Verification is not safeguarding clearance.

### Stage G — Real-World Opportunity Event

Where legitimately available, ScoutSA may record events such as contact approved, trial invited, trial attended, follow-up, and pathway/placement outcome.

The event itself is not automatically proof of the underlying claim. Evidence and provenance remain distinct.

### Stage H — Outcome

The meaningful endpoint is whether the pathway produced a **genuine opportunity outcome**, not engagement.

Potential outcome classes must remain evidence-bounded and must not imply placement merely because a profile was viewed or a contact occurred.

## 2. Critical Separations

| Concept | Must not silently become |
|---|---|
| Player Passport | Truth |
| Assertion | Evidence |
| Evidence | Truth |
| Verification | Safeguarding clearance |
| Football Readiness | Talent ranking |
| Opportunity Readiness | Selection guarantee |
| Discovery | Contact authorization |
| Contact request | Approval |
| Approval | Safeguarding clearance |
| Opportunity | Outcome |
| Trial invitation | Trial attendance |
| Trial attendance | Placement |
| Historical authorization | Current authorization |
| Public discoverability | Republication permission |
| Child voice | Guardian authorization |
| Guardian authority | Suppression of child voice |
| Safeguarding concern | Finding of wrongdoing |
| Outcome record | Independently verified truth |

These preserve existing ratified semantic boundaries; this artifact creates no new authority.

## 3. Failure-Containment Questions

At every transition, ScoutSA should be able to answer:

1. What is being claimed or requested?
2. What evidence supports it?
3. Who supplied or recorded it?
4. What authority/scope applies?
5. When was it applicable?
6. For what purpose may it be used?
7. What authorization is required before the next transition?
8. What happens if evidence is missing, expired, withdrawn, disputed, or contradicted?

A missing answer must not silently become an affirmative state.

## 4. North-Star Measurement

The conceptual funnel is:

**Registered player → sufficiently verified player → relevant opportunity exposure → authorized contact/request → genuine trial/opportunity → recorded real-world outcome**

This is not a vanity funnel.

Registration measures entry. Verification measures evidence-supported signals. Exposure measures visibility, not opportunity quality. Contact approval measures authorized connection, not success. Trial attendance measures a real-world event, not placement. Placement/pathway outcome is a stronger endpoint and requires appropriate evidence.

Exact metrics, denominators, attribution rules, and verification requirements remain open.

## 5. External Validation Questions

The pathway provides testable questions without presuming that the model is correct.

### Coaches / academies

- Where does the current pathway usually break?
- What information is needed before recommending or presenting a player?
- What information is distrusted?
- What makes an opportunity genuinely viable?
- What happens when a promising player cannot practically attend?
- How are contact and trial requests handled today?

### Schools

- What constraints affect a learner's ability to participate?
- What information can appropriately be shared, and with whom?
- Where do football and academic responsibilities conflict operationally?

### Guardians

- What makes a football opportunity feel legitimate and safe?
- What information is needed before allowing contact or a trial?
- What would cause a guardian to decline?
- What currently makes opportunities difficult to access?

### Scouts / recruiters

- What makes a player profile trustworthy enough to investigate?
- What information is useful at discovery versus contact stage?
- What causes a potential opportunity to be rejected or abandoned?
- What is needed before inviting a player to a trial?

Contradictions are evidence too and must not be forced into the model.

## 6. Current Uncertainties

1. Which readiness inputs stakeholders actually consider material.
2. Whether transport is as important as currently hypothesized.
3. Which information is genuinely needed at discovery, contact, and trial stages.
4. What organizations consider a sufficient verification signal.
5. How guardians want contact/trial authorization to work in practice.
6. Which opportunity outcomes can realistically be evidenced.
7. Which pathway steps are already handled well by WhatsApp, clubs, schools, academies, or informal networks.
8. Which legal/policy constraints alter the operational pathway.

These are validation targets, not assumed requirements.

## 7. Ratification Boundary

Nothing here authorizes database migration, RLS implementation, production deployment, new permissions, legal compliance claims, automatic guardian precedence, automatic safeguarding decisions, AI adjudication, readiness ranking, or placement guarantees.

If external evidence materially contradicts this model, the model must be revised rather than defended.

## Preliminary Design Conclusion

The strongest conceptual form of ScoutSA is not simply a platform that helps scouts find players.

It is:

> **A verified pathway that reduces uncertainty between a player's football identity and a genuine, realistically accessible opportunity — while preserving authorization, safeguarding, and evidence boundaries.**

This is a **design hypothesis for external testing**, not a validated market claim.
