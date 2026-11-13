# ScoutSA — 33-tier × 3-plane audit-history assessment

**Date:** 2026-11-13  
**Branch:** `prototype/internal-demo`  
**Scope:** Synthetic audit-history validator and proposed integration into the invitation safeguarding review gate  
**Assessment status:** Internal engineering analysis; not external validation, ratification, legal review, security certification or production authorization.

## 1. Executive decision

**Decision: proceed with a narrow synthetic integration only after repairing the validator's completeness and chronology defects. Do not connect it as a trusted audit service.**

The existing validator is a useful state-sequence prototype, but it currently does not enforce the central system invariant. It is not connected to `review-engine.js`; empty or incomplete histories can validate; review completion is not bound to the review's exact completion timestamp; final event state is not reconciled to evidence fixture state; and an invalidation event recorded before the evidence invalidation can satisfy the current post-check. The review engine can therefore return `READY_FOR_SEPARATE_HUMAN_REVIEW` without a valid event history.

The safe next increment is a **mandatory synthetic audit-history gate** for the two invitation reviews. Missing, malformed, incomplete, contradictory or invalidated history must force `HOLD`. The engine must still keep `disclosurePermitted: false`. This is not an approval, release or authorization path.

## 2. Framework interpretation and version note

This assessment applies the user's current working 33-tier semantic framework, grouped into three planes:

- **Plane A — Identity, intent and state:** tiers 01–11.
- **Plane B — Action, boundary and policy:** tiers 12–22.
- **Plane C — Context, evidence and commitment:** tiers 23–33.

Each of the 33 tiers is examined across three independent planes:
1. **Reality / Evidence** — what exists and what is actually supported.
2. **Engineering / Security** — what the code enforces and what can fail or be attacked.
3. **Product / Commercial** — what the user, partner or buyer could reasonably infer and what can responsibly be promised.

This creates **99 checkpoints**. Each checkpoint is additionally examined through **Existence, Coherence and Failure** lenses; those lenses are not substitutes for the three planes and no checkpoint is averaged away. A material failure in any one plane remains a blocker.

**Tier 33 version note:** retrieved prior framework records contain an older wording, “Registry Audit”, and a later working wording, “Semantic normalization record”. This assessment uses the later 2026-11-06 wording. The canonical framework source should be reconciled before this is treated as a frozen standard.

## 3. Evidence and verification boundary

Observed repository state:
- `prototype/audit-history.js` v0.1.0 is a pure in-memory validator.
- `prototype/review-engine.js` v0.2.1 does not import or call it.
- The proposal explicitly says NOT RATIFIED / NOT CONNECTED TO THE REVIEW GATE.
- Evidence, reviewers, authorities, event IDs, timestamps and provenance are synthetic.
- The audit module has 16 declared tests.
- Hosted run [43440492966](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43440492966) passed 100/100 Node tests, 7/7 Discovery & Request Review browser groups, 8/8 workspace-hub browser groups and 12/12 specialist interaction groups on its tested commit.
- That passing run does not establish immutable storage, cryptographic integrity, identity proofing, authorization, legal compliance, safeguarding effectiveness or production readiness.

**Source strength:** repository code and hosted CI support statements about the code and those tests only. They do not support real-world claims.

## 4. The 33 tiers × 3 planes (99 checkpoints)

| Tier | Semantic tier | Reality / Evidence — Existence · Coherence · Failure | Engineering / Security — Existence · Coherence · Failure | Product / Commercial — Existence · Coherence · Failure |
|---:|---|---|---|---|
| 01 | Identity and provenance | Evidence records have invitation, organization, reviewer, authority and source references; all are synthetic. E: partial. C: claims bind to references. F: no source authentication. | Reviewer/authority IDs are compared, not authenticated; event IDs are unique within one supplied array. E: partial. C: exact bindings exist. F: spoofing and replay remain possible. | No user-facing identity promise is made. E: pass for prototype honesty. C: synthetic-only label is consistent. F: identity assurance must not be marketed. |
| 02 | Intent and purpose | Invitation safeguarding review and claim types are explicit. E: partial. C: claim-purpose links exist. F: evidence may still be misapplied across purpose without a system-level policy. | Review event scope is compared to fixture scope. E: partial. C: exact scope match. F: no purpose-specific event authorization. | Intended use is internal evaluation only. E: pass. C: no disclosure is implied. F: user expectation risk if prototype status is hidden. |
| 03 | Subject and actor | Each evidence record has a reviewer and each review has a reviewer. E: partial. C: actor matches evidence record. F: no actual human subject/actor proof. | Actor strings must match reviewer bindings. E: partial. C: wrong actor rejected. F: values can be forged or jointly rewritten. | Users see review status, not actor proof. E: partial. C: current screens are read-only. F: avoid implying actual people reviewed anything. |
| 04 | Role and authority | Reviewer authority records are checked by engine; event actor/authority are matched to evidence. E: partial. C: exact reviewer/org/scope binding. F: event authority lifecycle not independently checked at event time. | No authentication or authorization service. E: gap. C: fixture matching only. F: caller can supply fabricated authority IDs. | Separate human review is explicitly required. E: pass. C: no automated approval. F: do not sell synthetic reviewer checks as safeguarding. |
| 05 | Scope | Evidence is bound to invitation, organization and INVITATION_SAFEGUARDING_REVIEW. E: partial. C: cross-scope mismatch rejected. F: broader data minimization and purpose scope remain external. | Events compare org and scope to exact target records. E: partial. C: mismatch rejected. F: no enforcement outside evaluator call. | Scope limited to synthetic review. E: pass. C: no real disclosure. F: future commercial scope must be separately contracted. |
| 06 | State semantics | Evidence lifecycle has submitted, inspected, accepted, rejected, stale, revoked and superseded states. E: partial. C: states distinct. F: record's final status is not yet reconciled with event terminal state. | Transition map constrains event from/to states. E: pass at local transition level. C: illegal transition rejected. F: incomplete sequence can still validate. | UI distinguishes HOLD and eligibility for separate human review. E: partial. C: no approval state. F: user may mistake synthetic states for operational status. |
| 07 | Time and freshness | Evidence expiry and inspectedAt are checked by engine. E: partial. C: inspection must precede review completion. F: audit event completion time is not yet bound to review completedAt. | Events are ordered and future events rejected only when now supplied. E: partial. C: non-decreasing time. F: same-time ambiguity, untrusted timestamps, missing now. | No operational freshness SLA. E: gap. C: documentation states synthetic. F: stale data may be over-trusted in future. |
| 08 | Context | Evidence targets carry invitation and organization context. E: partial. C: context comparisons exist. F: contextual conditions at event time are not snapshotted. | Validator receives events, evidence and review fixtures separately. E: partial. C: target lookup. F: absent or malformed arrays default empty and empty history can pass. | Prototype context is fictional and isolated. E: pass. C: internal demo. F: context may not represent field reality. |
| 09 | Relationships | Evidence references link claims to exact versions; review fixtures list evidence links. E: partial. C: links are checked. F: completeness and duplicate relationship coverage are not yet enforced. | Event targets resolve uniquely; review events must repeat exact evidence links. E: partial. C: mismatch rejected. F: duplicate evidence fixture resolution is collapsed into unresolved. | Workflow explains request vs opportunity vs invitation. E: partial. C: concepts separate. F: future product must preserve these distinctions. |
| 10 | Uncertainty | Unknown or missing evidence generally fails closed in review engine. E: partial. C: unresolved references fail. F: validator does not report uncertainty classes or confidence limits. | Unknown event types fail; unknown evidence targets fail. E: pass. C: explicit reason codes. F: missing arrays and ambiguous records need stronger errors. | Prototype says synthetic, not real-world proof. E: pass. C: claim strength constrained. F: avoid overclaiming validity. |
| 11 | State transition | Review completion and invalidation states are defined. E: partial. C: allowed transitions. F: invalidation chronology has a known defect to repair. | One completion then invalidation is modeled. E: partial. C: illegal transitions rejected. F: invalidation must follow evidence invalidation; no dependent-decision graph. | Human decision is not a state in this evaluator. E: pass. C: separate decision boundary. F: no lifecycle for post-review appeal/closure. |
| 12 | Action definition | Events name evidence and review actions. E: partial. C: action vocabulary is explicit. F: no actor intent/reason payload. | Only declared event types are accepted. E: pass. C: unknown actions rejected. F: no command authorization or transaction boundary. | Actions are descriptive, not executable. E: pass. C: no send/contact/disclose action. F: future action surfaces require separate approval. |
| 13 | Authorization | Engine checks synthetic reviewer authority on review records. E: partial. C: exact scope/org. F: event-level authority is not checked against current authority registry at event time. | Validator only compares strings; it does not authorize. E: gap. C: binding consistency. F: fabricated/revoked actor could create events. | Prototype never grants access. E: pass. C: disclosure false. F: commercial launch needs server-side authorization. |
| 14 | Data boundary | Current payload is synthetic, minimal, and omits personal identifiers. E: pass. C: evidence references only. F: no runtime schema rejects arbitrary extra sensitive fields in audit event objects. | Pure in-memory validator. E: pass. C: no network/storage. F: arbitrary nested payloads are accepted/ignored. | Prototype boundary is documented. E: pass. C: synthetic-only. F: future ingestion must minimize and classify data. |
| 15 | Integration and tools | Audit module is not integrated into review gate. E: gap by design. C: proposal and engine are separate. F: review can pass without audit history. | CommonJS-only audit export; browser integration not yet established. E: gap. C: isolated module. F: environment mismatch risk. | No external integrations. E: pass for boundary. C: no connectors. F: avoid implying provider verification. |
| 16 | Deterministic core | Event transitions are deterministic for supplied arrays. E: partial. C: stable state machine. F: malformed/duplicate fixtures can collapse ambiguously. | Pure function, no side effects. E: pass. C: deterministic lookup and output. F: caller can alter input after evaluation; error objects not deeply frozen. | Determinism helps reproducible demo. E: partial. C: no network dependencies. F: not evidence of production reliability. |
| 17 | AI role and boundary | No AI decision is involved in the audit validator. E: pass. C: deterministic rules. F: future AI summaries could misstate event validity. | Pure deterministic code. E: pass. C: no model calls. F: any AI integration must not override fail-closed result. | Human review remains separate. E: pass. C: no AI approval. F: users must not infer automated safeguarding judgement. |
| 18 | Fail-closed behaviour | Missing event targets and invalid transitions fail. E: partial. C: negative cases exist. F: empty audit history and absent review-completion events can still pass. | Errors are returned but caller does not consume them yet. E: gap. C: validator itself returns invalid. F: no gate propagation. | Disclosure remains false independently. E: pass. C: no data release. F: eligibility display may still mislead if audit gate omitted. |
| 19 | Threat model | Known threats include forged IDs, tampered event arrays, replay, missing history and stale evidence. E: partial. C: some negative tests. F: no threat-to-control mapping or attacker capability model. | No cryptographic integrity or immutable store. E: gap. C: limitations disclosed. F: rewrite/reorder/delete undetected if sequence remains coherent. | Prototype not marketed as secure. E: pass. C: internal demo. F: future partner diligence will require a credible threat model. |
| 20 | Privacy and security | No real personal data is used. E: pass. C: synthetic fixtures. F: no privacy control if future real data is introduced. | No storage, access control, encryption or RLS in audit model. E: gap. C: explicit no-storage boundary. F: event details could leak in future if persisted without design. | No privacy compliance claims. E: pass. C: scope honesty. F: legal basis, retention, access and incident controls unresolved. |
| 21 | Auditability | Events can narrate evidence and review transitions. E: partial. C: event references exist. F: not append-only, not complete, no causal parent links. | IDs/time/state/provenance checked. E: partial. C: reproducible supplied sequence. F: no hash chain, signature, trusted timestamp or retention. | Audit feature is not user-facing. E: pass. C: proposal only. F: no audit-service promise. |
| 22 | Change governance | Proposal is not ratified; engine contract remains draft. E: partial. C: branch isolation and documentation. F: framework and policy versions not pinned in each event. | Tests and CI run on prototype branch. E: partial. C: 100 tests plus browser suites passed at recorded SHA. F: no merge or release governance for audit model. | Change authority remains internal prototype only. E: pass. C: no production change. F: commercial commitments must wait for ratification. |
| 23 | Source quality | Evidence sourceClass, sourceLocator and findingRef are synthetic. E: gap for real proof. C: fields required by engine. F: no source authenticity or quality grading. | Validator checks target fixture and non-empty provenanceRef only. E: partial. C: presence checked. F: provenanceRef not tied to a verified source record. | Source claims not marketed. E: pass. C: limits documented. F: future partner trust needs independent source standards. |
| 24 | Evidence sufficiency | Five evidence claims are required by review engine. E: partial. C: claim-specific references. F: audit validator accepts any non-empty evidenceRefs; does not enforce required claim taxonomy itself. | Completion requires referenced versions to have accepted events. E: partial. C: evidence links enforced. F: fingerprint not included in event pin. | Evidence sufficiency remains a synthetic eligibility check. E: partial. C: no final decision. F: real-world proof threshold not validated. |
| 25 | Reproducibility | Fixtures and evaluation time support repeatable checks. E: partial. C: test helpers deterministic. F: audit events not committed as canonical fixture or reproducible bundle. | Pure validator and Node tests. E: pass. C: same input same result. F: no serialized input/output snapshot or independent replay verification. | Repeatable demo helps review. E: partial. C: same fixtures. F: not proof of market or safeguarding. |
| 26 | Contradiction handling | Engine rejects multiple current evidence versions and fingerprint mismatch. E: partial. C: version conflicts fail. F: audit history may not reconcile event terminal state with current fixture status. | Chronology and transitions detect some contradictions. E: partial. C: state transitions. F: same-time and duplicate target ambiguities remain. | UI communicates holds, not adjudication. E: partial. C: no automatic override. F: no dispute/appeal pathway. |
| 27 | Adversarial testing | 16 audit tests cover several malformed sequences. E: partial. C: negative cases. F: gaps around empty histories, missing review completion, early invalidation, duplicate records and malformed shapes. | 100 Node tests and browser suites passed on run 43440492966. E: pass for tested code. C: hosted reproducibility. F: tests do not prove cryptographic or real-world security. | Tests support demo quality only. E: partial. C: limits documented. F: do not label as independent security validation. |
| 28 | Parent sources | Event provenance references are non-empty but not resolved to parent source records. E: gap. C: no source-parent graph. F: orphaned provenance accepted. | Validator checks string presence only. E: gap. C: no parent-source relation. F: arbitrary source locator can be substituted. | Source traceability is not yet a product feature. E: partial. C: no external claims. F: future evidence UX needs clear source lineage. |
| 29 | Payload representation | Events carry a narrow envelope, but arbitrary extra fields are neither rejected nor normalized. E: partial. C: expected fields checked. F: hidden payload divergence possible. | Plain JS objects and arrays only. E: partial. C: stable expected fields. F: no schema, size bounds or type-safe canonical payload. | Payload is internal fixture format. E: pass. C: no customer data. F: not a stable external API. |
| 30 | Canonical serialization | No canonical serializer exists. E: gap. C: JSON object shape only. F: property ordering/encoding/number/date normalization unspecified. | No canonical byte representation or serialization tests. E: gap. C: JSON-like inputs. F: hashes/signatures cannot be trusted without canonicalization. | No serialized audit export. E: pass for current scope. C: not advertised. F: future exports need schema/versioning. |
| 31 | Payload hash | Fingerprint is synthetic text on evidence record, not computed. E: gap. C: review engine compares equality. F: coordinated rewrite undetected. | No cryptographic digest, algorithm/version or byte binding. E: gap. C: equality only. F: no tamper detection. | No integrity guarantee claimed. E: pass. C: limitation explicit. F: never call it hash-verified. |
| 32 | Evidence commitment | No commitment binds event, payload, parent source and reviewer decision. E: gap. C: reference links only. F: deletion/replacement/reordering undetectable. | No signature, Merkle chain, append-only store or external timestamp. E: gap. C: deterministic validator only. F: no proof of existence at a past time. | No durable audit assurance offered. E: pass. C: prototype only. F: no compliance or evidentiary claim. |
| 33 | Semantic normalization record | No canonical semantic normalization record is stored for event meaning, policy version or controlled vocabulary. E: gap. C: event types are enumerated in code. F: vocabulary drift/meaning changes not version-pinned. | Module version exists, but events do not pin event-schema, policy, normalizer or vocabulary versions. E: partial. C: module version is fixed. F: old events may be reinterpreted after code changes. | Semantic consistency is important for future reporting but not delivered. E: gap. C: no analytics promise. F: cross-version reports may compare unlike meanings. |

## 5. Critical defects to resolve before integration

### D-01 — Empty and incomplete history can pass
The validator initializes empty state maps and returns valid when no events exist. It does not require a completion event for every declared review. A missing history can therefore be indistinguishable from a clean one. **Required:** explicit required review IDs; one valid completion event per review; non-empty event sequence.

### D-02 — Invalidation chronology is not enforced
The post-check currently accepts any review-invalidation event, even if it occurred before the evidence was invalidated. **Required:** the invalidation event must occur strictly after the invalidating evidence event in the ordered sequence and must target the same review and exact evidence pins.

### D-03 — Review completion time is not bound
The completion event's timestamp is not required to equal the review fixture's `completedAt`. **Required:** exact timestamp equality (normalized ISO instant), with all linked evidence accepted before completion.

### D-04 — Event terminal state is not reconciled
The validator does not compare the final event state with the evidence record's declared inspection/version state. **Required:** event-sourced final state and fixture state must agree, or the audit gate fails.

### D-05 — Evidence version identity is incomplete
Review events carry evidence reference and version ID, but not the pinned fingerprint. **Required:** exact `evidenceRef + versionId + fingerprint` link for every claim; this remains a synthetic comparison, not a cryptographic commitment.

### D-06 — Ambiguous targets are not distinguished
Evidence lookup returns null for both zero and multiple matches. Duplicate review IDs are not rejected as a separate condition. **Required:** unique target resolution and explicit duplicate-target errors.

### D-07 — Provenance is only a non-empty string
The validator does not resolve `provenanceRef` to a parent-source record. **Required for this prototype:** clearly label provenance as synthetic and require exact parent references in the fixture. Real source authentication remains out of scope.

### D-08 — Event authority is a string comparison
An event actor/authority is forced to match the evidence record's original reviewer even for revocation/supersession. This is not a sound model of independent authority to revoke. **Required:** separate event actor/authority from evidence creator/inspector, with an explicit event-specific authority fixture and scope. Until defined, do not claim the validator establishes who may revoke.

### D-09 — Event payloads are not canonical
There is no schema version, canonical serialization, digest, signature or parent-event commitment. **Required:** record these as explicit non-existent capabilities; do not fake a hash by reusing the current synthetic fingerprint.

### D-10 — No gate integration
The invitation review gate does not consume audit history. **Required:** make audit history a blocking prerequisite for synthetic safeguarding review; absent or invalid history must return a stable HOLD reason.

## 6. Integration contract proposed

The narrow integration should:
1. Add stable, explicit `reviewId` values to first and second synthetic review fixtures.
2. Require `context.auditEvents` to be a non-empty array.
3. Build two audit-review projections from the invitation review records; the first must pin completion + conflict evidence, the second completion + conflict + independence evidence.
4. Pass the exact evidence-version records, review projections, events and evaluation timestamp to the validator.
5. Require one completion event for each review, with exact reviewer, authority, organization, scope, evidence pins and completion timestamp.
6. Reject evidence state changes without a causally later invalidation event for each dependent completed review.
7. Preserve the existing reviewer, authority, evidence, expiry and version-pin checks; audit validation supplements them and cannot replace them.
8. Return a stable safeguarding failure reason such as `INVITATION_AUDIT_HISTORY_MISSING` or `INVITATION_AUDIT_HISTORY_INVALID`.
9. Keep all existing downstream rules: failed checks = HOLD; disclosure remains false; a pass means eligibility for separate human review only.

The audit validator must remain pure and side-effect-free. The integration must not create a database, write events, send messages, expose data, authorize contact, or create a human decision.

## 7. Required regression scenarios

- No auditEvents field; null/object/empty event collection.
- Missing completion event for first or second review.
- Duplicate event IDs and duplicate review IDs.
- Missing, duplicate or unresolved evidence-version records.
- Evidence pin mismatch including fingerprint mismatch.
- Review completion before acceptance or with mismatched completedAt.
- Evidence revoked/staled/rejected/superseded after review completion with no invalidation.
- Invalidation event before the evidence invalidation (must fail).
- Invalidation event after evidence invalidation with exact review/evidence link (may pass the history check, but does not restore review eligibility).
- Event actor/authority/org/scope mismatch.
- Event from future, malformed timestamp, equal-time ambiguity.
- Final event state inconsistent with current evidence record.
- Fresh review on a new current evidence version with a rebuilt, complete event sequence.
- A passing audit sequence never permits disclosure.

## 8. Stop conditions

No production database or append-only event store, cryptographic hash/signature, trusted timestamp, identity provider, reviewer authorization service, real evidence ingestion, real player/minor data, RLS, API, contact, disclosure, deployment or pilot is authorized by this assessment.

UI-008 remains OPEN. Mainline remains separate and untouched. External validation remains desirable but is not a blocker to synthetic internal development.

## 9. Final assessment

**Current audit-history model: useful experimental foundation; insufficient as a decision gate.**

**Next engineering decision:** repair completeness, causal invalidation and state reconciliation first; then integrate as a mandatory synthetic gate and verify it with hosted CI. The core invariant is non-negotiable:

> A decision must never outlive the evidence that justified it.
