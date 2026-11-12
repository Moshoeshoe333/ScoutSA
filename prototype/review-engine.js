/* ScoutSA pure review engine v0.2.0 — deterministic synthetic policy evaluator.
 * No DOM, storage, network, authentication, authorization or disclosure side effects.
 * All time-sensitive checks use the caller-supplied context.now (ISO timestamp).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.SCOUTSA_REVIEW_ENGINE = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const PURPOSE_CODES = Object.freeze({
    "Respond to a specific opportunity request": "RESPOND_TO_SPECIFIC_OPPORTUNITY_REQUEST",
    "Share selected football evidence with a named academy": "SHARE_SELECTED_FOOTBALL_EVIDENCE"
  });
  const BLOCKED_GUARDIAN_DECISIONS = new Set(["OBJECTION", "REVOKED", "WITHDRAWN"]);
  const array = value => Array.isArray(value) ? value : [];
  const find = (items, predicate) => array(items).find(predicate) || null;
  const gate = (key, label, state, detail, reasonCode, blocking = true) => ({
    key, label, state, satisfied: state === "PASS", blocking, status: state,
    detail: detail || "", reasonCodes: state === "FAIL" && reasonCode ? [reasonCode] : []
  });
  const timestamp = value => {
    if (typeof value !== "string" || !value.trim()) return NaN;
    return Date.parse(value);
  };
  const current = (record, now) => {
    if (!record || record.lifecycleStatus !== "ACTIVE") return { ok: false, code: "LIFECYCLE_NOT_ACTIVE" };
    const expiry = timestamp(record.expiresAt);
    if (!Number.isFinite(expiry)) return { ok: false, code: "LIFECYCLE_EXPIRY_MISSING_OR_INVALID" };
    if (now >= expiry) return { ok: false, code: "LIFECYCLE_EXPIRED" };
    return { ok: true, code: null };
  };
  const first = (...values) => values.find(value => value !== undefined && value !== null);

  function evaluateRequest(request, context = {}, options = {}) {
    const r = request || {};
    const now = timestamp(options.now || context.now);
    if (!Number.isFinite(now)) {
      throw new TypeError("A valid deterministic evaluation time is required as options.now or context.now.");
    }

    const players = array(context.players);
    const organizations = array(context.organizations);
    const authorities = array(context.representativeAuthorities);
    const memberships = array(context.memberships);
    const consentCases = array(context.consentCases);
    const opportunities = array(context.opportunities);
    const invitationCases = array(context.invitationCases);

    const player = find(players, item => item && item.id === r.playerId);
    const organization = find(organizations, item => item && item.id === r.organizationId);
    const authority = find(authorities, item => item && item.organizationId === r.organizationId
      && item.representativeId === r.representativeId);
    const membership = find(memberships, item => item && item.id === r.membershipId);
    const consent = find(consentCases, item => item && item.id === r.consentCaseId);
    const opportunity = find(opportunities, item => item && item.id === r.opportunityId);
    const invitation = find(invitationCases, item => item && item.id === r.invitationCaseId);

    // Tier 1: actor legitimacy. Tier 2 cannot evaluate consent until both pass.
    const orgLife = current(organization, now);
    const orgIdentityOk = !!organization && organization.identityStatus === "Verified" && orgLife.ok;
    const orgGate = gate(
      "organization_identity", "Organization identity",
      orgIdentityOk ? "PASS" : "FAIL",
      !organization ? "Organization record not found."
        : organization.identityStatus !== "Verified" ? "Identity is not verified."
        : !orgLife.ok ? "Organization lifecycle check failed: " + orgLife.code
        : "Organization identity is verified and its lifecycle is current.",
      !organization ? "ORGANIZATION_NOT_FOUND"
        : organization.identityStatus !== "Verified" ? "ORGANIZATION_IDENTITY_UNVERIFIED" : orgLife.code
    );

    const authorityLife = current(authority, now);
    const authorityOk = !!authority
      && authority.authority === "Verified"
      && authority.organizationId === r.organizationId
      && authority.representativeId === r.representativeId
      && authority.scope === "DISCOVERY_REQUEST_REVIEW"
      && authorityLife.ok;
    const authorityGate = gate(
      "representative_authority", "Representative authority",
      authorityOk ? "PASS" : "FAIL",
      !authority ? "No authority grant exists for this exact organization and representative."
        : authority.organizationId !== r.organizationId || authority.representativeId !== r.representativeId
          ? "Authority grant is not bound to the requested organization and representative."
        : authority.scope !== "DISCOVERY_REQUEST_REVIEW" ? "Authority grant does not cover this action."
        : authority.authority !== "Verified" ? "Representative authority is not verified."
        : !authorityLife.ok ? "Authority lifecycle check failed: " + authorityLife.code
        : "Representative authority is verified, current and scoped to this review.",
      !authority ? "REPRESENTATIVE_AUTHORITY_NOT_FOUND"
        : authority.organizationId !== r.organizationId || authority.representativeId !== r.representativeId
          ? "REPRESENTATIVE_AUTHORITY_SCOPE_MISMATCH"
        : authority.scope !== "DISCOVERY_REQUEST_REVIEW" ? "REPRESENTATIVE_AUTHORITY_SCOPE_MISMATCH"
        : authority.authority !== "Verified" ? "REPRESENTATIVE_AUTHORITY_UNVERIFIED" : authorityLife.code
    );

    const actorLegitimacyPassed = orgIdentityOk && authorityOk;

    // Tier 2: player and request linkage. All applicable checks are evaluated;
    // only consent solicitation/evaluation is skipped when Tier 1 has not passed.
    const passportLife = current(player, now);
    const passportOk = !!player && player.id === r.playerId
      && player.recordStatus === "ACTIVE" && passportLife.ok
      && !!r.passportRef && r.passportRef === player.id;
    const passportGate = gate(
      "passport_reference", "Active Player Passport",
      passportOk ? "PASS" : "FAIL",
      !player ? "Player Passport record not found."
        : !r.passportRef || r.passportRef !== player.id ? "Passport reference does not match the requested player."
        : player.recordStatus !== "ACTIVE" ? "Passport record is not active."
        : !passportLife.ok ? "Passport lifecycle check failed: " + passportLife.code
        : "Exact Passport reference resolves to an active synthetic record.",
      !player ? "PASSPORT_NOT_FOUND"
        : !r.passportRef || r.passportRef !== player.id ? "PASSPORT_REFERENCE_MISMATCH"
        : player.recordStatus !== "ACTIVE" ? "PASSPORT_NOT_ACTIVE" : passportLife.code
    );

    const membershipLife = current(membership, now);
    const membershipPairMatches = !!membership
      && membership.playerId === r.playerId
      && membership.organizationId === r.organizationId;
    const membershipStatusOk = !!membership
      && membership.status === "Active"
      && membership.verification === "Verified"
      && membershipLife.ok;
    const membershipOk = membershipPairMatches && membershipStatusOk;
    const membershipGate = gate(
      "membership_linkage", "Membership linkage",
      membershipOk ? "PASS" : "FAIL",
      !membership ? "Membership claim not found."
        : !membershipPairMatches ? "Membership does not bind this exact player and organization."
        : membership.status !== "Active" || membership.verification !== "Verified"
          ? "Membership is not both active and independently verified."
        : !membershipLife.ok ? "Membership lifecycle check failed: " + membershipLife.code
        : "Membership is active, verified and bound to the exact player and organization.",
      !membership ? "MEMBERSHIP_NOT_FOUND"
        : !membershipPairMatches ? "MEMBERSHIP_LINK_MISMATCH"
        : membership.status !== "Active" || membership.verification !== "Verified"
          ? "MEMBERSHIP_NOT_VERIFIED" : membershipLife.code
    );

    const ageState = typeof r.ageState === "string" ? r.ageState : "";
    const under18 = ageState.includes("Under 18") || ageState.includes("Unknown");
    const adultVerified = ageState === "Adult — verified";
    const safeRouteOk = under18
      ? typeof r.requestOrigin === "string" && r.requestOrigin.includes("Guardian-mediated")
      : adultVerified && r.requestOrigin === "Adult self-directed";
    const routeGate = gate(
      "age_safe_route", "Age and safe request route",
      safeRouteOk ? "PASS" : "FAIL",
      under18 ? "Under-18 protections apply; guardian-mediated routing is required."
        : adultVerified ? "Verified-adult scenario requires an adult self-directed route."
        : "Adult status is not established; under-18 protections remain in force.",
      under18 ? (safeRouteOk ? null : "SAFE_GUARDIAN_ROUTE_MISSING")
        : adultVerified ? (safeRouteOk ? null : "SAFE_ADULT_ROUTE_MISSING") : "AGE_STATUS_UNVERIFIED"
    );

    let guardianConflict = false;
    let guardianAuthorityOk = false;
    let playerVoiceOk = false;
    if (under18 && consent) {
      const guardians = array(consent.guardians);
      guardianConflict = guardians.some(g => g
        && g.authorityStatus === "ESTABLISHED"
        && BLOCKED_GUARDIAN_DECISIONS.has(g.decision));
      guardianAuthorityOk = consent.guardianState === "Established"
        || guardians.some(g => g && g.authorityStatus === "ESTABLISHED"
          && g.primary === true && g.decision === "APPROVED");
      playerVoiceOk = consent.playerVoice === "Assent recorded";
    } else if (adultVerified) {
      guardianAuthorityOk = true;
      playerVoiceOk = !!consent && consent.playerVoice === "Consent recorded";
    }

    const guardianGate = gate(
      "guardian_authority", "Guardian authority and conflict",
      guardianConflict ? "FAIL" : guardianAuthorityOk ? "PASS" : "FAIL",
      guardianConflict ? "Conflicting objection or revocation by an established guardian; review hold required."
        : under18 ? guardianAuthorityOk ? "Required guardian authority is established."
          : "Guardian authority is not established."
        : adultVerified ? "Not required for this verified-adult scenario." : "Adult status not verified.",
      guardianConflict ? "GUARDIAN_CONFLICT_HOLD"
        : guardianAuthorityOk ? null : "GUARDIAN_AUTHORITY_NOT_ESTABLISHED"
    );
    const playerVoiceGate = gate(
      "player_voice", "Player voice / assent",
      playerVoiceOk ? "PASS" : "FAIL",
      under18 ? playerVoiceOk ? "Player assent recorded." : "Player assent is not recorded."
        : adultVerified ? playerVoiceOk ? "Adult consent recorded." : "Adult consent is not recorded."
        : "Age/capacity is unresolved; player voice requirement is not satisfied.",
      playerVoiceOk ? null : "PLAYER_VOICE_NOT_RECORDED"
    );

    const consentPrerequisites = actorLegitimacyPassed;
    let consentState = "SKIPPED";
    let consentReason = null;
    let consentDetail = "Not evaluated: organization identity and representative authority must both pass first.";
    if (consentPrerequisites) {
      const consentLife = current(consent, now);
      const expectedPurpose = PURPOSE_CODES[r.purpose] || r.purposeCode;
      const purpose = consent && array(consent.purposes).find(p =>
        p && (p.purposeCode === expectedPurpose || p.name === r.purpose));
      const linked = !!consent && consent.playerRef === r.playerRef;
      const purposeOk = !!purpose && purpose.state === "Given";
      const recipientOk = !!purpose && purpose.recipientOrganizationId === r.organizationId;
      const overallOk = !!consent && consent.consentState === "Given";
      const lifecycleOk = consentLife.ok;
      const consentAuthorityOk = guardianAuthorityOk && playerVoiceOk && !guardianConflict;
      if (!linked) { consentReason = "CONSENT_PLAYER_MISMATCH"; consentDetail = "Consent record does not match this player."; }
      else if (!overallOk) { consentReason = "CONSENT_NOT_GIVEN"; consentDetail = "Overall consent is not given."; }
      else if (!purposeOk) { consentReason = "CONSENT_PURPOSE_NOT_GIVEN"; consentDetail = "The requested purpose category is not granted."; }
      else if (!recipientOk) { consentReason = "CONSENT_RECIPIENT_MISMATCH"; consentDetail = "Consent recipient does not match this organization."; }
      else if (!lifecycleOk) { consentReason = consentLife.code; consentDetail = "Consent lifecycle check failed: " + consentLife.code; }
      else if (!consentAuthorityOk) { consentReason = guardianConflict ? "GUARDIAN_CONFLICT_HOLD" : "CONSENT_AUTHORITY_REQUIREMENTS_NOT_MET"; consentDetail = "Guardian authority/conflict or player voice requirements are not satisfied."; }
      else { consentState = "PASS"; consentDetail = "Current consent matches player, purpose and recipient."; }
      if (consentState !== "PASS") consentState = "FAIL";
    }
    const consentGate = gate(
      "purpose_consent", "Purpose-bound consent",
      consentState,
      consentDetail,
      consentReason
    );

    const opportunityLife = current(opportunity, now);
    const opportunityOrgMatches = !!opportunity && opportunity.organizationId === r.organizationId;
    const sourceOk = opportunityOrgMatches && opportunity.verification === "Verified" && opportunityLife.ok;
    const opportunityGate = gate(
      "opportunity_source", "Opportunity source and lifecycle",
      sourceOk ? "PASS" : "FAIL",
      !opportunity ? "Opportunity record not found."
        : !opportunityOrgMatches ? "Opportunity belongs to a different organization."
        : opportunity.verification !== "Verified" ? "Opportunity source is not verified."
        : !opportunityLife.ok ? "Opportunity lifecycle check failed: " + opportunityLife.code
        : "Opportunity source is verified and current.",
      !opportunity ? "OPPORTUNITY_NOT_FOUND"
        : !opportunityOrgMatches ? "OPPORTUNITY_ORGANIZATION_MISMATCH"
        : opportunity.verification !== "Verified" ? "OPPORTUNITY_SOURCE_UNVERIFIED" : opportunityLife.code
    );
    const eligibilityOk = !!opportunity && opportunity.eligibility === "Verified";
    const eligibilityGate = gate(
      "opportunity_eligibility", "Opportunity-specific eligibility",
      eligibilityOk ? "PASS" : "FAIL",
      opportunity ? opportunity.eligibility : "Not assessed",
      eligibilityOk ? null : "ELIGIBILITY_NOT_VERIFIED"
    );
    const safeguardingOk = !!opportunity && opportunity.safeguarding === "Reviewed"
      && !!invitation && invitation.workflowState === "READY";
    const safeguardingGate = gate(
      "safeguarding_review", "Safeguarding review",
      safeguardingOk ? "PASS" : "FAIL",
      safeguardingOk ? "Reviewed" : "Not cleared",
      safeguardingOk ? "Separate safeguarding and invitation review conditions are satisfied."
        : "Safeguarding and/or invitation review remains unresolved.",
      safeguardingOk ? null : "SAFEGUARDING_NOT_CLEARED"
    );

    const disclosureGate = gate(
      "disclosure_scope", "Disclosure scope", "FAIL",
      "No disclosure permitted",
      "This evaluator never authorizes disclosure; a separately ratified release policy would be required.",
      "DISCLOSURE_NOT_IMPLEMENTED", false
    );

    const gates = [
      orgGate, authorityGate, passportGate, membershipGate, routeGate,
      guardianGate, playerVoiceGate, consentGate, opportunityGate,
      eligibilityGate, safeguardingGate, disclosureGate
    ];
    const blockingFailures = gates.filter(g => g.blocking && g.state === "FAIL");
    const skippedPrerequisites = gates.filter(g => g.state === "SKIPPED");
    const reasonCodes = Array.from(new Set(gates.flatMap(g => g.reasonCodes)));
    return Object.freeze({
      engineVersion: "0.2.0",
      requestId: r.id || null,
      evaluatedAt: new Date(now).toISOString(),
      disposition: blockingFailures.length ? "HOLD" : "READY_FOR_SEPARATE_HUMAN_REVIEW",
      allBlockingGatesSatisfied: blockingFailures.length === 0,
      disclosurePermitted: false,
      reasonCodes,
      skippedPrerequisites: skippedPrerequisites.map(g => g.key),
      gates
    });
  }

  return Object.freeze({ version: "0.2.0", evaluateRequest });
});
