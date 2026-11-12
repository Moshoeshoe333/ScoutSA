# ScoutSA Internal Web Prototype

This directory contains the first responsive, browser-based ScoutSA interface prototype.

## Open locally
Open `index.html` in a modern browser. No build step or package installation is required.

## Run the browser smoke tests

Open `smoke-tests.html` in the same folder as `index.html`, then select **Run smoke tests**. The test page loads the prototype in an iframe and checks its demo labels, sample records, player search, safeguarding view, passport modal, and Escape-key close behavior. These are local UI smoke checks only; they do not test a backend, authorization, RLS, privacy, or legal compliance.

## Scope of this prototype
- Responsive overview dashboard
- Player discovery cards with client-side search and filters
- Fictional player passport detail modal
- Illustrative opportunity detail modal
- Sample organization directory
- Trust and safeguarding information view
- Mobile navigation

## Explicit limitations
- All names, counts, organizations and opportunities are fictional.
- No backend, database connection, authentication, account creation, uploads, messaging, applications or contact actions exist.
- No real player or minor data may be entered.
- No verification, guardian consent, legal compliance, access-control or safeguarding capability is implemented by this UI.
- The UI is a demonstration artifact, not a production service or evidence of product-market fit.

## Next engineering gates
1. Reconcile this prototype against the canonical domain and relationship models.
2. Define a non-production backend boundary and synthetic-data contract.
3. Resolve access-policy and safeguarding requirements before connecting any real data.
4. Add automated accessibility, interaction and security tests.
5. Obtain qualified review before any real-world pilot involving people, especially minors.

## Player Passport prototype

Open `player-passport.html` to inspect the focused Passport experience. It uses two fictional sample records and separates football profile, Assertions and supporting Evidence, Membership history, Verification status, Football Readiness and Opportunity Readiness. It does not calculate readiness or claim any sample is verified.

Open `player-passport-smoke-tests.html` to run local interface smoke checks. These checks are not security, authorization, privacy, legal-compliance or backend tests.

## Development boundary

See [DEVELOPMENT-BOUNDARY.md](./DEVELOPMENT-BOUNDARY.md). Internal development without external validation is limited to a clearly labelled synthetic-data demonstration. This decision does not lift database, RLS, access-policy, safeguarding, legal or production holds.

### Structured sample data and activity timeline

The Passport fixture is loaded from `data/player-passports.demo.js`, separate from the presentation markup. The Activity timeline combines dated synthetic claim and membership entries for display only. It is explicitly **not** an audit log and must not be represented as proof that an event occurred. The browser smoke-test page includes checks for the timeline's presence and warning.


## Organization membership review prototype

Open `organization-memberships.html` to inspect the read-only organization and membership review screen. It uses a separate synthetic fixture at `data/organization-memberships.demo.js` and demonstrates Pending, Active, Ended and Disputed workflow states, organization identity status, claim authorship, evidence descriptions and a separate verification field. An Active workflow state is not proof of a verified affiliation.

Open `organization-memberships-smoke-tests.html` to run local rendering and filtering checks. These checks have not been represented as executed until run in a browser, and they do not test authorization, RLS, security, privacy, safeguarding, verification or legal compliance. The page contains no create, edit, approve, reject, contact or other mutation actions.
