# Organizer Identity and Authority Crosswalk — Evidence Review

**Status:** Internal evidence review · NOT RATIFIED · no implementation authority  
**Branch:** `prototype/internal-demo`  
**As at:** 17 November 2026  
**Parent decision:** TAD-003 in [Tournament Architecture Decision Register](TOURNAMENT-ARCHITECTURE-DECISION-REGISTER.md)

## 1. Question

What does the word **Organizer** mean in ScoutSA's tournament domain?

The current proposals risk using one word for several different things:
- the enduring identity of an institution or body;
- the human account submitting information;
- the capacity in which that human acts;
- the authority to represent an institution for a particular event;
- the evidence and review of that authority.

Those are not interchangeable.

## 2. Canonical domain evidence

### 2.1 Organization already exists as a root-domain identity

The canonical Domain Model defines **Organization** as a football-related institution or body. Its types include `SCHOOL`, `CLUB`, `ACADEMY`, `UNIVERSITY`, `LFA`, `LEAGUE` and `OTHER`. It assigns organizational administration to administrators within assigned scope and explicitly separates Organization type from verification status.

The same model defines **Membership** specifically as the historical/current relationship between Player and Organization. It does not define Membership as a general User-to-Organization employment or representative-authority relationship.

### 2.2 User affiliation and authority are deliberately unresolved

The canonical Relationship Model's G2-SEAM-02 states:
- User and Organization are distinct concepts;
- a User may have multiple roles and affiliations; one permanent Organization per User is unsupported;
- organization affiliation needs temporal/history semantics;
- role assignment does not prove external professional status;
- a User-to-Organization relationship alone does not establish current authority, permitted claims or access to restricted information;
- exact affiliation/authorization semantics remain a domain and operational decision and an ERD blocker.

It explicitly prohibits freezing one `user.organization_id`, permanent role, or role-implied authority into the ERD.

### 2.3 Tournament proposals use Organizer inconsistently

| Source | Observed definition | Finding |
|---|---|---|
| `prototype/TOURNAMENT-RELATIONSHIP-MODEL.md`, lines 17–20 | `Organizer organization` / `organizer_id` described as Organization identity and authority evidence | Conflates identity and authority in one row |
| `prototype/TOURNAMENT-ORGANIZER-PORTAL-MODEL.md`, lines 15–16 | `Organizer` / `organizer_id` described as an Organization identity record; separate organizer authority evidence | Better separation, but still appears to create a second organization identity |
| Same portal model, lines 29–35 | Organizer identity and organizer authority are separate states; submission, feature permission and publication are also separate | Correctly distinguishes lifecycle states; should be retained |
| Same portal model, lines 39–44 | Synthetic organizer, submission, evidence and feature-request records; no authentication, persistence or API | Demo records do not establish production identity/authority semantics |
| Same portal model, lines 77–81 | Versioned manual JSON handoff includes organizer and submission records; synthetic file transfer only | Payload is not proof of shared identity or authenticated representation |

## 3. Findings

### F-1 — Do not create a second enduring Organization identity by renaming it Organizer

The canonical Organization concept already covers football-related institutions and bodies, including clubs, schools, academies, universities, LFAs, leagues and OTHER. A second Organizer identity table risks duplicate organizations and inconsistent verification state.

### F-2 — A human submitter and the organization represented must be distinguishable

The person operating the portal is not necessarily the organization. The portal must preserve who submitted a package and, where relevant, which Organization that person claims to represent. An account, display name, email domain, role label or organization link alone must not establish representative authority.

### F-3 — Organizer should be treated as an event-scoped capacity, not automatically as a new identity

The least duplicative conceptual direction is to treat “organizer” as a role/capacity in an event-submission context. That capacity may be exercised by an authorized representative acting for an Organization. Whether an independent individual may organize without representing an Organization, and how that actor is represented, remains unresolved.

### F-4 — Authority is scoped, temporal and reviewable

Authority to submit one tournament or edition does not automatically grant authority to:
- represent the Organization for all purposes;
- change another organization's identity or administrators;
- certify event sanctioning, venue rights, safety or eligibility;
- grant ScoutSA permission to feature an event;
- grant rights to player images, logos or third-party media;
- access player or guardian information.

The authorization record, if approved, must have a defined subject, actor, represented party, scope, effective period, evidence, reviewer/decision authority, status and revocation/expiry history. This is a design requirement for future review, not a ratified field list.

### F-5 — Event existence, organizer authority and publication permission remain separate

An event can exist without ScoutSA being authorized to feature it. A person may submit information without having authority to bind an Organization. An Organization may be recognized without a particular representative being authorized. Feature permission does not imply media rights or player consent.

## 4. Candidate conceptual boundary

The following is a **candidate vocabulary and responsibility split**, not an ERD or approved schema:

| Concept | Responsibility | Must not imply |
|---|---|---|
| Organization | Enduring institutional/body identity | Verification, event authority or publication permission |
| User / submitting actor | Authenticated human who performs the submission action | Authority to represent an Organization |
| Organizer capacity / event role | The context in which an actor is proposing or managing an event | A second Organization identity |
| Representation / authorization evidence | Evidence supporting the actor's claimed authority for a defined scope and period | Universal or permanent authority |
| Organizer submission | The submitted event/edition proposal and its review lifecycle | Event truth, sanctioning or permission to publish |
| Feature permission | Permission for ScoutSA to feature defined event information | Media rights, player consent or automatic publication |
| Publication decision/listing | Independent ScoutSA publication approval and lifecycle | Player opportunity, endorsement or verified trial |

Candidate relationship flow:

```text
User (submitting actor)
  └── claims event-scoped authority to act for
        └── Organization (where applicable)
              └── OrganizerSubmission
                    └── Tournament / TournamentEdition proposal

Authority evidence + scoped review decision
  └── evaluates the representation claim

Feature permission + content/media rights + publication approval
  └── remain separate from the submission and authority claim
```

This sketch intentionally does not specify cardinality, key names, inheritance, or the final representation of an independent individual organizer.

## 5. Options and disposition

| Option | Assessment |
|---|---|
| A. Reuse Organization as the enduring institution; model Organizer as scoped event capacity/role and separately evaluate representative authority | **Preferred candidate**, least duplication and most consistent with root domain boundaries |
| B. Keep a distinct Organizer entity linked to Organization | Only justified if Organizer has independent identity, lifecycle and domain meaning beyond an event role; not demonstrated by current sources |
| C. Treat Organizer as display label only | Rejected for authority-bearing submission and review workflows |

## 6. What remains blocked

TAD-003 remains **BLOCKED**. The evidence supports a preferred conceptual direction but does not settle:
1. Whether an organizer can be an independent individual, an Organization, or both.
2. How User-to-Organization affiliation and authorization are represented without bypassing G2-SEAM-02.
3. Whether one submission can have multiple submitters, represented organizations or delegated representatives.
4. Which evidence is acceptable for schools, clubs, academies, leagues, associations and independent event organizers.
5. Who can grant, review, expire, suspend, revoke and appeal representative authority.
6. Whether authority is specific to a tournament, edition, venue, competition or action.
7. How disputes, conflicts of interest, delegation and authority changes affect historical submissions.
8. Which event facts require separate sanctioning, venue, insurance, safeguarding or emergency evidence.

## 7. Stop conditions

Until these questions are resolved and ratified:
- Do not create a second production Organization/Organizer identity.
- Do not infer authority from account role, membership, email address, organization name, social media page or a submitted document alone.
- Do not let an accepted organization identity automatically authorize every representative.
- Do not let a representative's authority to submit an event imply authority to grant feature permission or media rights.
- Do not expose player or guardian data through organizer workflows.
- Do not publish event listings or mark organizers as verified based on synthetic demo states.

## 8. Sources

- [Canonical Domain Model](../docs/01-domain-model.md), §5.6 Organization and §5.7 Membership.
- [Canonical Relationship Model](../docs/02-relationship-model.md), §6.2 G2-SEAM-02.
- [Tournament Relationship Model](TOURNAMENT-RELATIONSHIP-MODEL.md).
- [Tournament Organizer Portal Model](TOURNAMENT-ORGANIZER-PORTAL-MODEL.md).
- [Tournament Data Architecture Draft](TOURNAMENT-DATA-ARCHITECTURE-DRAFT.md).
- [Tournament Architecture Decision Register](TOURNAMENT-ARCHITECTURE-DECISION-REGISTER.md).

**Conclusion:** Reuse the canonical Organization identity and treat Organizer as an event-scoped capacity with separately evidenced, scoped representative authority. This is the strongest current candidate, not a ratified domain decision. G2-SEAM-02 remains open; therefore TAD-003 remains blocked and no implementation authority is created.
