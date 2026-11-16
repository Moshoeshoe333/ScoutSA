# Player preview: 14-day learning plan

**Status:** discovery plan; not a product milestone.  
**Prototype:** `scoutsa-player-preview.html`  
**Branch:** `prototype/internal-demo`  
**Audience target:** five coaches and two parents/guardians, approached face to face.  
**Sample:** Thabo Sample, fictional under-15 central midfielder. No real player data is permitted.

## Decision principle

A feature must demonstrate at least one of these five forms of value:

1. Player value.
2. Safeguarding value.
3. Operational value.
4. Commercial value.
5. Validated learning: it helps answer whether a defined user will use ScoutSA, pay for it, or enable someone else to pay for it.

If none applies, the feature waits.

## 14-day sequence

| Window | Work | Evidence required |
|---|---|---|
| Days 1–5 | Build and inspect the three-screen player preview | Functional walkthrough; low-data/mobile layout; no real data or backend action |
| Days 5–7 | Prepare public static hosting and social preview | HTTPS URL, configured Open Graph title/description/image, test on two different phones using fresh URLs |
| Days 7–14 | Show it to five coaches and two parents/guardians, in person | Seven separate reaction records, including lukewarm or negative feedback and the open-ended price question |
| Day 14 | Decide continue, redesign or pause | Count of concrete follow-up requests, repeated objections, buyer identity, price/use-case evidence and unresolved risks |

Commercial discovery runs alongside the build. Do not postpone questions about who pays, what they pay for, verification effort, or funding route until after the UI is complete.

## Conversation script

Show the preview without first explaining every screen. Let the participant explore, then ask:

1. **Use:** “Would you use this instead of what you do now? Why or why not?”
2. **Change:** “What is the first thing you would change?”
3. **Value:** “Which part, if any, is valuable enough that someone should pay for it?”
4. **Price:** “What would you pay for that part, if anything? What makes that amount make sense?”
5. **Next step:** “Would you like to take a concrete next step with us? If yes, what would that be?”

Do not suggest a price first. Do not interpret politeness, compliments or general interest as purchase intent. Record the participant's words as accurately as possible.

## Participant evidence sheet

Use participant codes, not names, in the analysis copy. Keep any separately held contact details only with permission and for the stated follow-up purpose.

| ID | Role | Would use? | Main objection / change | What would be paid for? | Price stated unprompted | Concrete next step requested? | Exact note / quote |
|---|---|---|---|---|---|---|---|
| C1 | Coach | | | | | | |
| C2 | Coach | | | | | | |
| C3 | Coach | | | | | | |
| C4 | Coach | | | | | | |
| C5 | Coach | | | | | | |
| P1 | Parent / guardian | | | | | | |
| P2 | Parent / guardian | | | | | | |

## Stop / redesign rule

At the end of the seven conversations:

- If **fewer than 3 of 7** participants ask for a concrete follow-up or next step, stop expanding the feature and redesign the proposition or walkthrough before writing more product code.
- If 3 or more ask for a next step, that is permission to investigate further—not validation of willingness to pay, product-market fit, safeguarding adequacy or youth-market demand.
- Regardless of the count, redesign if a repeated objection reveals a material misunderstanding, disclosure risk, safeguarding weakness or unusable workflow.
- Report all seven responses. Do not omit lukewarm participants or convert a verbal expression of interest into a commitment.

## Parallel commercial and operating questions

For each coach/academy conversation, identify:
- Who experiences the problem?
- Who would make the purchase decision?
- Who controls the budget (club, academy, parent, sponsor, CSI/funder, or another party)?
- Which exact service might be paid for: profile administration, verification, opportunity workflow, coach/academy tools, reporting, or something else?
- What evidence would the buyer require before paying?
- What work is required to verify a player, organization, coach or opportunity, and who bears that cost?

Estimate verification effort as a separate operational exercise: steps, responsible role, time per case, travel/communication cost, re-check frequency, exception handling and escalation. Do not invent a unit cost before recording the workflow and assumptions.

## Adult-first pilot: what it can and cannot establish

A narrowly scoped adult amateur pilot may test basic workflow usability, data minimisation, operational handling and indicative verification effort with consenting adults.

It **cannot** establish:
- whether young players will use or understand the product;
- whether guardians trust or approve the youth journey;
- whether academies can safely operate youth-facing workflows;
- whether CSI funders or youth-sport funders will sponsor the model;
- whether the safeguarding, legal or child-data design is sufficient for a youth launch.

Keep those as separate hypotheses requiring youth-sector stakeholder and specialist review. An adult pilot is not a substitute for youth validation.

## Hosting and WhatsApp preview gate

The current page is intentionally unhosted and has no fabricated canonical URL or Open Graph image. Before public hosting:

- Add absolute `og:url` and `og:image` values on the hosted page.
- Create a purpose-made 1200×630 sample image, under 300 KB, with a prominent “SAMPLE — FICTIONAL PLAYER” stamp.
- Keep `noindex,nofollow` on the sample page.
- Keep the HTML lightweight (target under 200 KB) and free of external runtime dependencies.
- Link any future video out to a separately hosted destination; do not host video in the page.
- Test WhatsApp link previews on two different phones, using fresh URLs (for example, a new version query string) because previews may be cached.
- Confirm the preview image, title and description never imply a real player, verified identity or live opportunity.

No real child details, images, clips, identity documents, school information, medical information or contact details may be used in this demonstration.

## Current limitations

This preview is a conversation prop. Its “guardian approval” interaction is a simulation only. It does not verify guardian authority, capture legal consent, check an opportunity, authorize disclosure, authenticate a recipient or send a player profile. The WhatsApp action opens a generic sample message; a person must still review and press Send in WhatsApp.

**No pilot, youth onboarding, public player listing or production-readiness claim follows from this page or its tests.**
