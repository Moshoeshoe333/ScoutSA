# ScoutSA Research Dossier — Player Profile Evidence, Video and Positional Metrics

**Research date / as-of:** 2026-10-09  
**Status:** Desk research synthesis; design guidance only; no gate transition or implementation authorization.  
**Scope:** Video evidence, positional metrics, contextual metadata, off-ball observation, and low-resource profile design for grassroots players.

## 1. Research contract

**Question.** What video formats, data points and tactical indicators can responsibly improve the usefulness of a grassroots football profile to coaches and scouts, without inventing a universal recruitment standard or excluding players who lack expensive recording infrastructure?

**Decision informed.** Define a minimum credible Player Passport evidence package and distinguish required metadata from optional advanced evidence.

**Must resolve.**
1. Is there a verified universal reel length, camera height, or three-tier video pipeline?
2. Which position-specific metrics have stable definitions and can be collected reliably at grassroots level?
3. What context is needed to interpret footage and statistics?
4. What can video show, and what remains uncertain without live or repeated observation?
5. How can the system avoid penalising players for low bandwidth, missing cameras, incomplete stats, or protected information?

**Source rules.** Prefer FIFA, official club statements, official data glossaries, peer-reviewed research, and the South African Information Regulator. Vendor glossaries establish that a metric has a defined operational meaning, not that every coach uses it. Marketing articles are leads, not standards.

**Stop condition.** Core design choices can be made conservatively from primary and peer-reviewed evidence. Exact local adoption thresholds and Vaal-specific recording constraints remain open because no direct Vaal Triangle coach validation was available.

## 2. Executive finding

The strongest evidence supports a **contextual, multi-source, bias-aware profile**, not a rigid video recipe or universal player score. FIFA’s 2026 Talent Identification Guide frames identification around an organisation’s playing philosophy, role profiles, structured observation, selection and sustainable systems. FIFA also stresses that maturation and birth date should not cause players to be overlooked. This is incompatible with treating one highlight reel, one physical measurement, or one short trial as a conclusive talent verdict.

Peer-reviewed research suggests video can be a useful and efficient scouting input: a 2024 study of 30 scouts at an English Category One academy found no statistically significant difference in player performance ratings between in-person and recorded-video observation of the same U14/U15 matches, while scouts perceived in-person observation as more accurate. That result is bounded to the study’s setting and sample; it does not establish that video replaces live observation in South Africa or across all decisions.

A 2024/2025 peer-reviewed study found substantial disagreement between coaches interpreting the same tactical video, with poor-to-fair agreement on several basic interpretations. Therefore footage and metrics should preserve context and provenance and should not be presented as objective truth by themselves.

**Recommended direction:** build a low-cost, progressive evidence package. Capture basic context first; allow video at different levels of completeness; show metric definitions and sample sizes; mark provenance and verification state; keep private identity documents and youth data protected; and never make the absence of advanced evidence equivalent to low talent.

## 3. Claim-to-evidence ledger

| Claim ID | Claim under review | Status | Evidence and limitation | ScoutSA implication |
|---|---|---|---|---|
| C-07 | Professional scouts universally reject tight footage, music, and edited reels and require elevated wide-angle video. | **Partly supported / overclaimed** | FIFA’s data/tracking material explains why camera coverage and missing players affect data quality. FIFA’s talent guide supports structured observation. No primary evidence located establishing a universal rejection rule or a universal minimum camera height. | Recommend stable, wide-enough footage where feasible; do not reject all phone footage or grassroots submissions by default. Label visibility limits. |
| C-08 | A universal three-tier pipeline is 60–90 sec impact reel, 5–8 min positional reel, and 1–2 full matches. | **Unverified as a standard; usable as an optional template** | No FIFA, SAFA, league or peer-reviewed source found mandating these exact durations or tiers. | Do not hard-code these durations as eligibility rules. Offer optional formats and allow a full-match link, shorter evidence clips, or no video where unavailable. |
| C-09 | Every action must include match minute, scoreline, competition and opponent quality. | **Supported as good contextual design; mandatory universal rule unverified** | FIFA’s profile/identification framework is context- and role-dependent; official data platforms synchronise video and data. Context is necessary to interpret the circumstances, but no universal player-upload metadata rule was located. | Collect date, competition, team/opponent, approximate match minute, position/role and source when known. Make unknown fields explicitly unknown rather than fabricated. |
| C-10 | Metrics should be normalised per 90 or expressed as percentages and categorised by position. | **Supported with qualification** | Wyscout’s official glossary defines many per-90 and percentage metrics, including progressive passes, duels, recoveries and xA. This proves a commercial event-data vocabulary exists, not that all coaches require every metric or that grassroots data can be reliably calculated. | Use a small, defined set only when numerator, denominator, minutes played and collection method are available. Show raw counts and sample size alongside rates. |
| C-11 | Unverified physical metrics are routinely ignored unless demonstrated in matches. | **Unverified as stated; provenance principle supported** | FIFA describes physical performance metrics derived from calibrated in-stadium tracking at elite tournaments. No source located proving a universal recruiter rule that self-reported height/weight/sprint figures are routinely ignored. | Label self-reported vs measured, date and measurement method. Do not require sprint tests or height/weight to create a profile. |
| C-12 | Scanning, transition response, adversity and off-ball movement are evaluated as heavily as on-ball technique. | **Directionally supported; weighting and exact indicators unverified** | Wyscout defines non-ball movement and pressing events; FIFA’s framework supports holistic, role-specific observation. No evidence found for universal weights or the proposed 3–5-second scanning rule. | Allow qualitative, attributed observation notes; do not calculate an automated character, resilience, scan-rate or talent score from ordinary video. |
| C-13 | A single video feed yields objective, consistent tactical conclusions. | **Contradicted / materially limited** | A peer-reviewed study of three coach samples found high variation in interpretations of the same footage and poor-to-fair agreement on several tactical questions. | Label interpretation as an observer’s assessment, preserve author/date/context, and permit disagreement. |
| C-14 | Recorded video can support scouting without always producing different ratings from live observation. | **Supported within a bounded study** | In a 2024 study, 30 English Category One academy scouts assessed the same U14/U15 matches in person or on video; player ratings did not differ significantly, although scouts felt in-person viewing was more accurate. | Treat video as a useful screening/review input, not as a guaranteed substitute for live observation or a trial. |
| C-15 | There is one universally correct set of positional KPIs. | **Not supported** | Wyscout’s glossary provides operational definitions for numerous events; FIFA says player profiles depend on the organisation’s football philosophy and role requirements. Metrics are not universal recruitment weights. | Keep metrics modular and position/role-aware. Do not create a single cross-position leaderboard or talent score. |
| C-16 | Child profiles should display identity documents and exact date of birth to prove credibility. | **Rejected as a public-display design** | The Information Regulator’s POPIA materials describe the special treatment of children’s personal information and competent-person consent in applicable circumstances. Publicly displaying ID documents or full DOB is not needed to prove a profile’s credibility. Legal/safeguarding review remains necessary. | Verify identity through a controlled process; expose only the minimum age/eligibility status needed to the authorised viewer. Never make ID images public by default. |

## 4. Primary and independent source findings

### S1 — FIFA Talent Identification Guide (official, 2 April 2026)
Source: https://www.fifatrainingcentre.com/en/environment/guide/high-performance/find/talent-identification-guide.php

FIFA describes an adaptable framework for local, regional and national systems. Its five dimensions are philosophy, profiles, identification, selection and constants. The guide states that role profiles define the characteristics and attributes needed to execute a playing style, and that identification can use comprehensive scouting environments, player observations and data analytics.

**Interpretation:** ScoutSA should capture useful evidence and context, but the receiving organisation’s role needs matter. The guide does not prescribe the exact three-tier video lengths in the proposed blueprint.

### S2 — FIFA football data / tracking material (official)
Sources:
- https://inside.fifa.com/innovation/football-data/football-data-solutions
- https://ipt.fifa.com/innovation/news/assessing-the-quality-of-player-tracking-data-generated-using-broadcast-footage
- https://football-technology.fifa.com/innovation/world-cup-2022/fifa-player-app

FIFA describes elite player data as combinations of trained analyst event data, tracking systems, positional information and synchronised video. Its broadcast-tracking discussion specifically notes that video quality, stadium environment and missing players in zoomed shots affect confidence in tracking outputs.

**Interpretation:** Advanced sprint, distance, pressure and spatial metrics require appropriate collection methods. They cannot be inferred reliably from any arbitrary smartphone clip. These elite systems are examples of what is possible, not minimum requirements for grassroots profiles.

### S3 — Wyscout official metric glossary
Sources:
- https://dataglossary.wyscout.com/player_metrics/
- https://dataglossary.wyscout.com/progressive_pass/
- https://dataglossary.wyscout.com/pass/

The glossary defines event metrics such as progressive passes per 90, defensive duels won, recoveries per 90, xA per 90 and pass accuracy. It also provides explicit operational definitions—for example, its progressive-pass definition varies by starting/finishing zones.

**Interpretation:** If ScoutSA ever presents metrics, each needs a definition and a credible collection method. Similar-sounding metrics can differ between providers. Do not combine statistics from different systems as if they were directly comparable without reconciliation.

### S4 — Owen et al. (2024), Journal of Expertise: in-person vs video assessment
Repository record: https://eprints.dkit.ie/id/eprint/1016/

The study included 30 scouts working for an English Category One academy and U14/U15 inter-academy matches. Player performance ratings did not significantly differ between the in-person and video groups; scouts nevertheless rated in-person observation as more accurate in their subjective view. Video-based report submission was quicker.

**Limitations:** One academy context, age groups and a modest sample. This does not establish an exact grassroots recording standard, a universal conversion rate from video to trial, or South African coach preferences.

### S5 — Furley et al. (published online 5 September 2024; journal volume 2025), coach interpretation of video
Source: https://journals.sagepub.com/doi/10.1177/17479541241278603

Across three studies, coaches showed substantial diversity interpreting the same video data. Agreement was low for several tactical questions, including formation and which player stood out.

**Interpretation:** Video evidence should not be marketed as self-interpreting or objectively proving talent. Notes should identify the observer and be open to revision.

### S6 — South African TIDQ-OP research (2024)
Source: https://pubmed.ncbi.nlm.nih.gov/38477297/

The study developed a 58-item Talent Identification Questionnaire in Soccer for Outfield Players from a process that included 173 experienced South African coaches. The authors describe it as a tool to assist identification and selection.

**Limitations:** It measures coaches’ perceptions of relevant attributes; it is not proof that every club uses the same weights, nor a validated automated prediction model. It supports structured thinking, not a universal ScoutSA scoring algorithm.

### S7 — Kaizer Chiefs official warning about bogus trials (18 May 2018)
Source: https://www.kaizerchiefs.com/club-news/beware-bogus-trials

The club warned about a person claiming to represent it and offering trials for a fee, stated it had not issued an official trial/academy advertisement, and directed the public to its official communication channels.

**Interpretation:** The receiving organisation must confirm a specific opportunity through an independently obtained official channel. A player video, badge, social media page, or verified person identity does not authenticate an individual trial invitation.

### S8 — South African Information Regulator / POPIA children’s information
Sources:
- https://inforegulator.org.za/popia/
- https://popia.co.za/section-35-general-authorisation-concerning-personal-information-of-children/

The Information Regulator describes a specific application process for processing children’s personal information in circumstances requiring authorisation. The published section 35 text describes circumstances in which the section 34 prohibition does not apply, including prior consent of a competent person.

**Limitation:** This is not a complete legal opinion on ScoutSA’s proposed processing. A South African legal/safeguarding review is still required before implementation or any compliance claim.

## 5. Practical profile specification — proposed, not ratified

The profile should use progressive evidence tiers. Missing advanced evidence must not make a player ineligible.

### A. Core player record
- Player-controlled display name or appropriate identity presentation.
- Age band / eligibility status, with exact date of birth and identity documents kept private and access-controlled.
- Primary and secondary positions; preferred foot, with source/verification status.
- Current team/club or playing context, with source and last-confirmed date.
- Guardian/consent workflow where applicable, kept separate from public profile content.
- Profile updated date and a clear statement that profile presence does not imply club endorsement or selection.

### B. Match/context record
For each match or video item, capture what is available:
- Match date or approximate date; competition/tournament; teams/opponent.
- Player’s team, shirt number if visible, position/role and minutes played if known.
- Match format and match duration where known; score/result if verified.
- Source of the record: official competition record, club/coach attestation, uploader statement, or other source.
- Provenance status and unresolved gaps.

Do not require opponent quality ratings, pitch-condition scores, exact match state or official league statistics when the player cannot reliably provide them. Unknown must remain unknown.

### C. Video evidence levels
1. **Short discovery clip (optional):** a concise, clearly labelled selection of actions. Avoid misleading edits; identify the player and preserve enough lead-in/follow-through to understand the action.
2. **Contextual action sequence (optional):** a sequence that shows more of the decision and outcome, not only the final touch.
3. **Long-form/full-match footage (optional, where available):** preserve the original recording or a link to it; state whether the recording is complete, partial, cropped or edited.
4. **Recording limitations:** note when the player leaves frame, camera angle hides off-ball movement, footage is low resolution, or only one phase is shown.

A wide, stable camera view is helpful for seeing space and off-ball context, but it is not an evidence-based reason to reject all ground-level phone footage. Use a graduated quality label rather than a hard exclusion rule.

### D. Statistics and positional indicators
- Start with verified match participation and basic events that can be evidenced: appearances, minutes, goals, assists, cards, and position/role where reliable.
- Advanced metrics are optional and should only be shown when there is a documented definition, collection method, sufficient exposure and source.
- For rates, show minutes/sample size and the raw count as well as per-90 or percentage. Avoid ranking a player on a tiny sample.
- Do not show xG/xA, sprint speed, distance, scan rate, pressing intensity or tracking metrics unless a valid source/method produced them.
- Make comparisons role- and context-specific; do not compare a goalkeeper’s or centre-back’s raw event counts directly with a winger’s.
- Keep coach notes attributed and qualitative. Do not infer character, resilience, attitude, or psychological traits automatically from clips.

### E. Evidence provenance labels
Recommended labels:
- **Self-reported** — submitted by player/guardian.
- **Coach-attested** — attributed to a named, verified coach; attestation is not independent proof.
- **Competition/source-confirmed** — matched to a reliable record.
- **Video-supported** — visible in the supplied footage, subject to angle/coverage limits.
- **Independently reviewed** — a reviewer has recorded what they checked and when.
- **Disputed / stale / incomplete** — unresolved or no longer current.

These labels describe the evidence process, not the player's quality or probability of placement.

## 6. What not to freeze into ScoutSA

Do **not** freeze the following as universal requirements based on the current evidence:
- Exact 60–90 second / 5–8 minute durations.
- A requirement for two full matches before a profile can be seen.
- A fixed camera height of 2–3 metres or mandatory elevated mounting.
- The assertion that professional scouts reject all music, graphics, smartphone or ground-level footage.
- The proposed 3–5 second scanning threshold.
- A universal weighted positional KPI matrix or radar score.
- Mandatory height, weight, sprint or agility testing.
- Public display of full date of birth, ID/passport images, guardian contact details or sensitive documents.
- An automated assessment of resilience, body language or “character.”

These may be explored as optional templates or future research questions, but they are not established universal standards.

## 7. Open questions — not blockers for conservative design

| Open ID | Question | Why unresolved | Next evidence that would resolve it |
|---|---|---|---|
| O-VID-01 | What video formats do PSL, Motsepe Foundation Championship/NFD, ABC Motsepe and local academy staff actually accept from unsolicited grassroots players? | No direct club recruitment submission specification located. | Official club/academy submission rules or multiple first-hand recruitment-staff accounts. |
| O-VID-02 | What is the minimum useful video quality and camera position for a player in Sebokeng/Vaal? | No Vaal-specific observation or technical feasibility study. | Low-cost recording test across local pitches and coach review of identical footage. |
| O-VID-03 | Which fields are actually required before a local coach will respond? | No direct local response threshold. | Structured review of anonymised sample profiles by local coaches/scouts. |
| O-VID-04 | Which positional statistics can grassroots teams collect accurately? | Commercial event-data definitions do not prove grassroots collection reliability. | Trial a simple event-logging protocol and compare independent annotators. |
| O-VID-05 | What upload/storage strategy is viable for 90-minute footage under local data constraints? | No current user-side bandwidth/cost measurement. | Measure file sizes and upload time on common phones/networks; test external video links and lower-resolution options. |
| O-VID-06 | What child-data and video-consent process is legally and operationally appropriate? | Desk research is not a legal review. | Scoped South African legal/safeguarding review before implementation. |

## 8. Decision

**Research decision: sufficient for conservative profile design guidance; insufficient for hard video eligibility gates, a universal KPI score, or claims about what Vaal Triangle coaches require.**

Permitted next design direction: a low-bandwidth, progressive Player Passport with contextual video, explicit evidence provenance, optional advanced metrics, and controlled youth-data disclosure. This is a research recommendation only. It does not amend the frozen schema, authorise RLS/migration/production, ratify new product requirements, or establish POPIA compliance.

## 9. Source register

1. FIFA Training Centre. “Talent Identification Guide.” 2 April 2026. https://www.fifatrainingcentre.com/en/environment/guide/high-performance/find/talent-identification-guide.php
2. FIFA. “FIFA football data solutions.” https://inside.fifa.com/innovation/football-data/football-data-solutions
3. FIFA Innovation. “Assessing the quality of player tracking data generated using broadcast footage.” 24 January 2021. https://ipt.fifa.com/innovation/news/assessing-the-quality-of-player-tracking-data-generated-using-broadcast-footage
4. FIFA. “FIFA Player App.” https://football-technology.fifa.com/innovation/world-cup-2022/fifa-player-app
5. Wyscout. “Player metrics,” “Progressive pass,” and “Pass” glossaries. https://dataglossary.wyscout.com/player_metrics/ ; https://dataglossary.wyscout.com/progressive_pass/ ; https://dataglossary.wyscout.com/pass/
6. Owen, R., Harvey, S., Smith, B. & Jones, B. (2024). “A Comparison of In-person Versus Video-recorded Player Assessment by English Category One Football Academy Scouts.” Journal of Expertise, 7(2). https://eprints.dkit.ie/id/eprint/1016/
7. Furley, P. et al. (published online 5 September 2024). “Objectivity of match analysis in football: Testing the level of agreement between coaches’ interpretations of video data.” International Journal of Sports Science & Coaching. https://journals.sagepub.com/doi/10.1177/17479541241278603
8. Development of the Talent Identification Questionnaire in Soccer for Outfield Players (TIDQ-OP). 2024. PubMed record https://pubmed.ncbi.nlm.nih.gov/38477297/
9. Kaizer Chiefs. “Beware of Bogus Trials.” 18 May 2018. https://www.kaizerchiefs.com/club-news/beware-bogus-trials
10. Information Regulator South Africa. POPIA guidance. https://inforegulator.org.za/popia/
11. Protection of Personal Information Act, section 35 (secondary hosted text). https://popia.co.za/section-35-general-authorisation-concerning-personal-information-of-children/
