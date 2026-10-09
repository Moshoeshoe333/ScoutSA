# ScoutSA Part 11 — Go-to-Market and Pilot Design

**As of:** 2026-10-09  
**Status:** Strategy proposal / research-derived; not a gate transition or implementation authorization.  
**Basis:** User-supplied Parts 4–10, research dossiers 10.61–10.64, and the current controlled repository position.

## 1. Decision this plan supports

How can ScoutSA test whether a narrowly scoped verification-and-evidence layer helps players reach legitimate football opportunities, without opening public listings or exposing players before the trust controls are ready?

**Working decision:** Begin with a controlled, organization-led validation path—not a public launch. Use desk research and synthetic/de-identified scenarios first. Progress to real-user activity only when the relevant access-policy, safeguarding, consent, incident-response, and operational controls are explicitly authorized and tested.

This plan does not authorize RLS, database migration, API/UI implementation, public listings, or production use. Existing repository holds remain in force.

## 2. Go-to-market thesis

ScoutSA should enter through the people and organizations that already make or support football decisions, while preserving player/guardian control.

The initial offer is not “more exposure” or a promise of selection. It is:

> **A more inspectable way to establish who is offering an opportunity, what has actually been verified, what evidence is available, and what the player has consented to share.**

The first value proposition is operational trust: clearer provenance, less ambiguity, safer evidence sharing, and fewer avoidable journeys. Whether this is valuable enough to change existing behaviour remains an assumption to test.

### Initial stakeholder order

1. **Club, academy, school-football or coach/scout representatives** — test what information they genuinely need, what they will verify, and what they will not use.
2. **Safeguarding / guardian perspective** — review proposed consent, sharing boundaries, contact pathways and incident handling before any minor's data is used.
3. **Adult players or appropriately consented research participants** — test comprehension, control, perceived usefulness and friction using mock or de-identified profiles first.
4. **Legitimate agents or agencies, where relevant** — test role distinctions and verification needs without creating an agent marketplace or implying endorsement.
5. **Broader regional partners** — only after the first controlled test demonstrates a real workflow and a manageable verification burden.

This order is a proposed sequence, not evidence that any group has agreed to participate.

## 3. Pilot shape: three controlled steps

### Step A — Desk and tabletop validation

**Purpose:** Test the rules without processing real player data or publishing opportunities.

Use synthetic scenarios covering:
- a legitimate opportunity with independently confirmable organizer details;
- an authentic person advertising an opportunity that the receiving organization does not confirm;
- a false agent or impersonated club representative;
- an opportunity requesting money for trial access or placement;
- an opportunity with missing dates, eligibility, location, responsible contact or fee terms;
- stale or conflicting evidence;
- a minor's profile with absent, expired, disputed or purpose-mismatched consent;
- a guardian or player requesting correction, withdrawal or removal;
- a coach asking for information outside the consented scope;
- a player with strong football evidence but unresolved transport or scheduling constraints.

**Output:** A scored evaluation record, failure analysis, and list of rules that are ambiguous or impossible to apply consistently. Synthetic test success is not proof of real-world scam prevention.

### Step B — Closed organizational workflow rehearsal

**Purpose:** Check whether a small number of willing adult organizational representatives can understand and use the proposed verification and evidence workflow.

Use mock records or appropriately de-identified data. Do not create public listings, expose real minors, send real invitations, or represent a rehearsal as a live service.

Test whether a verifier can:
1. identify the exact claim being checked;
2. contact or consult the receiving organization through an independently sourced official channel;
3. record the method, date, result, source and limitations;
4. distinguish person/role verification from opportunity verification;
5. identify missing, stale or contradictory evidence;
6. explain what “verified” does and does not mean;
7. record a rejection, pause, dispute or superseding check without erasing history.

**Output:** Observed completion, error and time measures; usability notes; and unresolved policy questions.

### Step C — Limited live pilot, only after authorization

**Preconditions:** The relevant policy/legal and safeguarding questions are resolved to an explicitly approved scope; access controls and consent enforcement are implemented and tested; an incident and removal process is ready; verification responsibilities and response times are assigned; and a documented go/no-go decision is recorded.

Start with a small, invitation-only cohort and one bounded geography. The Vaal Triangle/Sedibeng remains the candidate starting region, not a proven optimal launch area.

Do not promise trials, selection, placement, or safety from all fraud. Do not launch open self-service opportunity publishing. Do not make a minor's profile public by default. If the preconditions cannot be met, remain at Step A or B.

## 4. Verification promise: define the word narrowly

ScoutSA must never use a single “verified” badge to imply that every aspect of a person or opportunity is safe, suitable, current or guaranteed.

Record distinct checks, each with scope and date:
- **Person / role:** what identity or claimed role was checked, by which method, and with what limitations.
- **Organization / affiliation:** what relationship to the named club, academy, school or agency was confirmed.
- **Specific opportunity:** whether the receiving organization independently confirmed the event, dates, eligibility, location, responsible contact and terms.
- **Fee terms:** whether the organizer explicitly stated the charges and whether the opportunity complies with ScoutSA's no-paid-access policy.
- **Freshness:** when re-checking is required and when the status becomes stale.
- **Consent / sharing:** who authorized which data to be shared, with whom, for what purpose and until when.

Verification of a person does not verify their opportunity. Verification of an organization does not verify every listing attributed to it. A missing answer is not a pass.

### Fee policy boundary

ScoutSA's product policy should prohibit payment for access to trial introductions or placement through ScoutSA and should not list an opportunity requiring such payment as an ordinary verified opportunity. Requests for money, unclear charges, training fees or other financial terms should be recorded and reviewed in context rather than collapsed into an unsupported universal legal claim. Any exception would require explicit policy review; no exception is assumed here.

## 5. Acquisition and communication channels

Use trust-bearing, low-volume channels before broad marketing:
- direct, transparent outreach to established clubs, academies, schools and coach/scout contacts;
- introductions through known football-development networks where the source of the introduction is recorded;
- short demonstrations of the verification workflow using mock data;
- player/guardian education material that is useful even if they never join ScoutSA;
- a simple public explanation of what ScoutSA checks, what it cannot guarantee, and how to report impersonation.

Avoid paid acquisition, public “trial opportunity” campaigns, unverified WhatsApp forwarding, and language such as “get scouted,” “guaranteed trial,” “verified talent,” or “official SAFA partner” unless a precise claim is independently substantiated and authorized.

Every outreach message should identify ScoutSA honestly, make no claim of official affiliation, request no sensitive player documents, and provide a low-pressure way to decline.

## 6. Pilot offer and minimum workflow

**Offer to an organizational participant:** Help test whether a source-linked, consent-scoped evidence package reduces ambiguity when reviewing a player or opportunity.

Minimum workflow to test:
1. A verifier records a candidate opportunity privately.
2. The receiving organization is contacted through an independently sourced channel.
3. Evidence, gaps, date and verification scope are recorded.
4. The opportunity remains unavailable for public/actionable use until the applicable verification requirements are met.
5. A player/guardian controls whether an evidence package is shared, under an authorized consent process.
6. The recipient sees only the authorized evidence and its context.
7. Any invitation or follow-up is logged; acceptance, refusal, no response and outcome remain distinct states.
8. A correction, complaint, consent change or suspicious request triggers a documented review path.

A prototype or tabletop rehearsal must not be described as a production workflow.

## 7. Measurement plan

Measure usefulness and harm indicators together. Keep denominators and evidence sources explicit.

### Trust and verification
- number of opportunities submitted, reviewed, confirmed, rejected, paused and marked stale;
- percentage of reviewed opportunities with all required evidence fields complete;
- rate of verification decisions later disputed or corrected;
- time and staff effort per verification;
- number and type of suspicious fee requests or impersonation attempts detected, reported, and substantiated;
- number of confirmed incidents associated with ScoutSA activity, with a documented severity and response.

### Utility
- whether organizational participants can complete the review task;
- whether evidence packages answer the questions participants say they need answered;
- time to complete a review compared with the participant's usual process, if a fair baseline can be collected;
- invitations requested, issued, accepted, declined, unanswered and completed—kept as separate events;
- player/guardian understanding of consent and sharing controls.

### Guardrails
- no public/actionable opportunity without the required verification;
- no sharing outside the authorized scope;
- no platform-facilitated payment for trial access or placement;
- all complaints and incidents triaged within a documented target;
- no unresolved critical safeguarding or access-control defect at a pilot gate.

“Zero incidents observed” is not proof that the product is scam-proof or safe. Record observation period, cohort size, reporting routes and known limitations. Do not use sign-ups, views or profile volume as primary success evidence.

## 8. Go / revise / stop rules

**Go to the next step only if:**
- the previous step's evaluation is documented and reproducible;
- critical verification and consent failure cases are handled as intended;
- participants understand the meaning and limits of verification;
- operational effort is measurable and plausible for the available team;
- no unresolved critical safeguarding, disclosure or access issue remains;
- the next step has explicit authorization appropriate to the data and actions involved.

**Revise** when the workflow is useful in principle but the evidence requirements, language, usability or operational burden are unclear.

**Stop or narrow** if the system creates false confidence, cannot verify opportunities independently, invites unauthorized contact, requires more data than the purpose justifies, or cannot maintain a credible verification queue.

No numerical pass threshold is invented here. Thresholds must be specified before scoring, justified against the risk, and not changed after results are seen merely to pass a gate.

## 9. Risks specific to market entry

| Risk | Control |
|---|---|
| ScoutSA is mistaken for an official federation or club service | Clear identity and affiliation language; never imply endorsement |
| A “verified” label creates false confidence | Show verification scope, source, date, limitations and stale status |
| Publicity attracts scammers before controls are ready | No open listing or broad opportunity campaign during early testing |
| Coaches see the workflow as extra admin | Measure time and usefulness; remove fields that do not serve a defined decision |
| Low supply makes the product look empty | Begin as a controlled evidence workflow, not a public listing catalogue |
| The project overstates local demand | Mark regional assumptions provisional until directly tested |
| One operator becomes the verification bottleneck | Record time per case and backlog; cap pilot volume rather than weaken checks |
| Minor data is exposed during research or demos | Synthetic/de-identified records until a separately authorized live scope is ready |

## 10. Immediate actions

1. Build the synthetic evaluation set from the scenarios in Step A.
2. Write a one-page verification procedure with explicit “pass / pause / reject / stale” definitions and evidence requirements.
3. Prepare a mock Player Passport and mock opportunity record—no real minor data.
4. Prepare a short organization interview/demo script focused on actual decision tasks, not asking participants to endorse ScoutSA.
5. Create a pilot measurement sheet with denominators, definitions and predeclared decision thresholds.
6. Maintain the current implementation, RLS, migration and production holds. This plan does not change them.

## 11. Research contract and limitations

**Decision:** Which bounded go-to-market path should ScoutSA test first?  
**As-of date:** 2026-10-09.  
**Scope:** Controlled validation, verification workflow, acquisition channels, pilot measures and launch safeguards.  
**Evidence basis:** User-supplied Parts 4–10 and repository research artifacts 10.61–10.64.  
**Interpretation:** The proposed pilot sequence and metrics are product-design recommendations, not findings proven by external stakeholder interviews.  
**Unresolved:** Local organizational willingness, player/guardian trust, real verification costs, operational feasibility, and whether the workflow improves outcomes in the Vaal Triangle.  
**Stop condition:** A documented, testable pilot protocol exists; further strategy writing pauses until evaluation or new evidence identifies a concrete change.

## 12. Decision boundary

This document is a strategy proposal. It does not ratify product principles, resolve legal questions, approve data collection, authorize live use, reopen frozen concepts, or lift existing repository holds.

**Governing rule:** ScoutSA should prove that its verification process is useful and appropriately bounded before it tries to grow a network.
