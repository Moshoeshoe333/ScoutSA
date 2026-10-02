# Player Passport Specification

## Purpose

The Player Passport is the persistent, club-independent football identity of every player on ScoutSA.

It is not a traditional football CV. It is a **football identity and opportunity-feasibility record**.

It should progressively answer:

1. Can this player play?
2. Can this player realistically access the opportunity?

## Scout ID

Format: `SSA-{PROVINCE}-{REGION}-{SEQUENTIAL}`

Example: `SSA-GT-VAAL-000124`

Rules:

- Generated once at creation.
- Never reused.
- Stable across club, school, season, or region changes.
- Visible on appropriate player-sharing surfaces.

The exact generation and uniqueness mechanism is an implementation concern and must be verified before being treated as immutable.

## Passport Structure

### 1. Identity Profile

- Scout ID
- Name
- Date of birth
- Nationality, where legitimately required
- Province / region / town
- Profile photo
- Identity verification status

### 2. Football Profile

- Primary position
- Secondary position
- Dominant foot
- Height
- Weight
- Current club through **Membership**
- Current school through **Membership**
- Trial availability
- Season performance records
- Achievements

### 3. Academic Profile

- Current grade
- School through Membership
- Academic status or appropriate band
- Matric status
- School-report metadata / controlled document reference
- Academic support flag

Academic information must not become an unnecessary exclusion mechanism. Display only what is required for a legitimate opportunity purpose.

### 4. Guardian Profile

- Linked guardian(s)
- Relationship
- Contact channel(s)
- Availability windows
- Alternate responsible adult where appropriate
- Consent delegation rules

### 5. Transport Profile

- Primary transport mode
- Realistic travel radius or travel-time capability
- Independence level
- Weekday capability
- Weekend capability
- Relevant safety constraints

The product should distinguish **distance** from **actual travel feasibility**.

### 6. Medical Profile

- Medical clearance status
- Clearance expiry date
- Last updated
- Controlled certificate reference where required

Detailed medical information must not sit on the general Player record. Access to any deeper information must be purpose-limited and explicitly authorised.

### 7. Verification Profile

- Verification level
- Active verification badges
- Verification source
- Scope of verification
- Verification timestamp
- Verification history

A badge must never imply more than the underlying verification actually establishes.

### 8. Media Profile

- Profile photo
- Highlight reels
- Full-match footage
- Skill clips

Each media item should carry:

- Type
- Source
- Verification status
- Consent / sharing status
- Relevant metadata

## Membership

Current club and school are **not authoritative fields on Player**.

Use:

`Player → Membership → Organization`

Membership should support:

- Organization type
- Role
- Start date
- End date
- Verification status
- Source
- Historical preservation

This allows ScoutSA to become a football timeline rather than a snapshot.

## Readiness

ScoutSA separates two readiness domains.

### Football Readiness

Signals may include:

- Position
- Performance records
- Relevant media
- Coach verification
- Technical evidence

### Opportunity Readiness

Signals may include:

- Identity status
- Guardian status
- Consent
- Transport feasibility
- Medical clearance status
- Academic eligibility

Opportunity Readiness should use **actionable states**, not a pseudo-precise percentage.

Candidate states:

- Trial Ready
- Ready with Constraints
- Needs Guardian Action
- Needs Transport Verification
- Incomplete
- Not Ready

A readiness state is a summary of currently known prerequisites. It is **not** a talent rating, selection guarantee, or prediction of success.

## Immutability and History

- Scout ID is stable.
- Verified identity attributes require controlled correction procedures.
- Membership history is append-oriented.
- Performance history is append-oriented.
- Verification history is append-oriented.
- Consent history is append-oriented.

The implementation must preserve historical evidence rather than silently rewriting it.

## Design Intent

The Passport reduces uncertainty for players, guardians, coaches, scouts, academies, clubs, and schools while protecting the player and family.
