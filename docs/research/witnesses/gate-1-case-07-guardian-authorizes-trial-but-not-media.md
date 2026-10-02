# Gate 1 Witness — Case 7: Guardian Authorizes Trial but Not Media

Status: Gate 1 witness — adversarial domain test
Scope: Implementation-independent ScoutSA domain model
Governing principle: Strength of claim must never exceed strength of evidence.

## 1. Witness Point
Test whether ScoutSA preserves purpose-specific consent when a Guardian authorizes one activity but does not authorize a different disclosure.

Adversarial condition:
Trial participation authorization is not automatically media disclosure authorization.

The witness asks: Can ScoutSA preserve valid authorization for one purpose without silently expanding it into permission for another?

## 2. Scenario
T1 — Minor Player exists with a Player Passport, discoverable football information, restricted media, and GuardianLink.
T2 — Opportunity T exists and requires defined participation/contact arrangements.
T3 — An authorized Guardian grants a versioned, purpose-bound ConsentRecord for trial participation.
T4 — Organization O requests publication or sharing of Player P media. No separate media authorization has been granted.
T5 — A later process attempts to reuse trial consent as media permission.

## 3. 33×3 Witness

### Existence
- ConsentRecord: PASS. It is already versioned, purpose-specific, revocable, and optionally expiring.
- Purpose: PASS. Trial participation and media sharing are already identified as distinct purposes.
- Guardian authority: PASS AS PRINCIPLE. GuardianLink contains scoped authority and effective dates.
- Media permission: PASS AS PRINCIPLE. Media is explicitly consent-dependent, especially for minors.
- Purpose relationship semantics: PARTIAL. The model does not define whether two purposes are identical, compatible, narrower, broader, or unrelated.

### Coherence
- Trial participation consent → media permission: PASS AS PRINCIPLE only when an explicit ratified rule establishes the relationship; no such rule currently exists.
- Consent cannot exceed Guardian authority: PASS.
- Media remains a separate protected domain: PASS.
- Opportunity acceptance does not create unrelated media permission: PASS AS PRINCIPLE.
- Discoverability does not create media disclosure permission: PASS AS PRINCIPLE.
- Purpose compatibility test: MATERIAL GAP.

### Failure
- Trial consent automatically authorizes media publication: RED.
- Trial attendance is treated as implied media consent: RED.
- Organization acceptance is treated as media permission: RED.
- One undifferentiated consent=true state covers multiple purposes: RED / DOMAIN GAP.
- Discoverability is treated as media disclosure authorization: RED.
- Revoked media consent is ignored for future disclosure: RED.
- Child/Guardian disagreement is silently collapsed: RED / MATERIAL GAP where the applicable legal or safeguarding context requires separate consideration.

## 4. Reverse Trace
Media disclosure → media asset → purpose → authorization/ConsentRecord → grantor authority → Player/Guardian relationship → time/version/revocation → disclosing actor.

The current model names these layers but does not yet define a complete purpose-compatibility evaluation or disclosure provenance chain.

## 5. Candidate Findings

### C-002 — Purpose-Bound Authorization
STATUS: HYPOTHESIS / NOT RATIFIED
A consent or authorization granted for one purpose must not be silently reused for a materially different purpose.
Future question: What rule determines whether a requested action is within, outside, or incompatible with an existing authorization purpose?

### C-003 — Disclosure Provenance
STATUS: HYPOTHESIS / NOT RATIFIED
A material disclosure should be reconstructable from actor, subject, disclosed asset/field, purpose, authorization/consent state, authority scope, time, and relevant context.

## 6. Relationship To Earlier Cases
Case 2: Authority ≠ Consent.
Case 3: Historical consent ≠ Current authorization.
Case 6: Discovery visibility ≠ Contact authorization.
Case 7: Trial authorization ≠ Media authorization.

Emerging invariant: Authorization is scoped by actor, purpose, action, context, and time; it must not be silently widened by proximity between related workflows.

## 7. Gate 1 Impact
| Finding | Result |
|---|---|
| ConsentRecord exists | PASS |
| Consent is purpose-bound | PASS |
| Guardian authority is scoped | PASS |
| Media consent dependency exists | PASS |
| Trial and media remain conceptually distinct | PASS AS PRINCIPLE |
| Purpose compatibility rule | PARTIAL / GAP |
| Trial consent → media permission | RED |
| Discoverability → media permission | RED |
| Undifferentiated consent state | RED / GAP |
| Disclosure provenance fully reconstructable | PARTIAL / GAP |
| Constitution amendment justified | NO |
| Domain-model amendment justified | NOT YET |
| Gate 1 closure | NO |

## 8. Witness Conclusion
Case 7 = RED / MATERIAL DOMAIN GAP.
The existing Domain Model contains the correct high-level principle: consent is granular and purpose-bound. The unresolved semantic is how ScoutSA determines whether a requested action falls within the exact purpose for which authorization was granted.

Safe boundary:
Trial Participation Consent ≠ Media Disclosure Consent, unless an explicitly ratified rule establishes equivalence or compatibility.

No Constitution amendment is warranted.
No Domain Model amendment is ratified.
Gate 1 remains OPEN.

## 9. Gate 1 Ledger Effect
SCOUTSA-027 — Purpose-Bound Authorization
STATUS: WITNESSED GAP — NOT RATIFIED
Finding: ScoutSA correctly models consent as granular and purpose-bound, but it does not yet define the semantic test for determining whether a requested disclosure/action falls within an existing authorization purpose.
Gate: Gate 1 remains OPEN.
Next adversarial witness: Case 8 — Child view conflicts with guardian authorization.