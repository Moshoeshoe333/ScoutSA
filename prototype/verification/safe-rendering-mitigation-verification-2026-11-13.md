# Safe-rendering mitigation verification — 2026-11-13

## Scope

Branch: `prototype/internal-demo` only.

This checkpoint applies a first-layer rendering mitigation to the eleven synthetic specialist workspaces. Ten fixture-driven pages define a shared-shape local `h(value)` HTML-escaping helper and wrap identified dynamic HTML-string interpolations. Claim Decisions retains its existing `esc(value)` helper and escaped record rendering.

Affected workspaces:
- Player Passport
- Organization Membership Review
- Opportunity Register
- Opportunity Evidence Review
- Claim Decisions
- Safeguarded Invitation Workflow
- Player–Opportunity Matching Review
- Player Development Pathway Tracker
- Coach & Academy Workspace
- Guardian & Consent Workspace
- Discovery & Request Review

## Test changes

`prototype/tests/workspace-interactions.browser-smoke.cjs` now includes an additional browser group that visits all eleven pages and checks the page's rendering escape helper against:
- hostile HTML-looking text containing an image element and an event-handler attribute;
- null values;
- undefined values.

The test confirms that the escaped value does not create an image element when interpreted as HTML, that the literal text is preserved, and that nullish values become empty strings.

The existing Claim Decisions form test still submits HTML-looking user text through the actual form and verifies that it remains literal text and does not create an image element.

The hosted workflow path filter now includes `prototype/*.html`, so future specialist-page edits trigger the workflow.

## Verification status

- Hosted GitHub Actions [run 43426395229](https://github.com/Moshoeshoe333/ScoutSA/actions/runs/43426395229), commit `a7a72870ad63b52d722e4260a9c29e8cd7fad647`, completed successfully.
- Headless Node declaration inventory: **50 passed, 0 failed** (40 review-engine + 8 documentation-integrity + 2 workspace-data-integrity).
- Discovery & Request Review browser suite: **7/7 groups passed**.
- Workspace hub/navigation browser suite: **8/8 groups passed**.
- Specialist workspace interaction suite: **12/12 groups passed**, including the new cross-workspace escape-helper contract group.
- Logs report no uncaught browser errors. An earlier run exposed a malformed nested interpolation and a test-source newline error; both were corrected before this successful run. The failed runs are not counted as successful verification.

## Limitations and open work

This is a scoped mitigation, not a security certification or complete renderer audit.

- The browser contract checks validate the escaping helper, but do not prove that every dynamic interpolation in every renderer has been identified and wrapped.
- HTML escaping is not a substitute for URL-scheme validation. Current navigation destinations are authored internal routes with encoded synthetic identifiers; no external URL or user-controlled navigation destination is authorized.
- Malformed/empty fixture resilience has not been comprehensively tested in this checkpoint.
- Safe DOM construction remains preferable for future renderer changes.
- No external, connected or user-supplied data may be connected to these pages while UI-008 remains open.
- No authentication, authorization, backend, API, RLS, persistence, consent capture, disclosure, contact or production capability is introduced.
- No mainline implementation gate is lifted; mainline remains untouched.

## Decision

**UI-008 remains OPEN.** The mitigation is useful progress, but closure requires a complete interpolation/context audit, stronger renderer-level hostile-input tests, malformed-fixture handling and successful hosted verification.
