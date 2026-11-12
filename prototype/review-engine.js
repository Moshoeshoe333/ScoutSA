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
  const BLOCKED_GUARDIAN_DECISIONS = new Set(["OBJECTION", "OBJECTED", "REVOKED", "WITHDRAWN"]);
  const array = value => Array.isArray(value) ? value : [];
  const find = (items, predicate) => array(items).find(predicate) || null;
  const uniqueLookup = (items, predicate) => {
    const matches = array(items).filter(predicate);
    return { record: matches.length === 1 ? matches[0] : null, duplicate: matches.length > 1 };
  };
  const DISPLAY_STATUS = Object.freeze({
    organization_identity: { PASS:"Verified", FAIL:"Unverified" },
    representative_authority: { PASS:"Verified", FAIL:"Not established" },
    passport_reference: { PASS:"Linked synthetic Passport", FAIL:"Missing or unresolved" },
    membership_linkage: { PASS:"Verified active membership", FAIL:"Missing or mismatched" },
    age_safe_route: { PASS:"Safe route present", FAIL:"Safe route not established" },
    guardian_authority: { PASS:"Established", FAIL:"Blocked", SKIPPED:"Skipped — actor legitimacy" },
    player_voice: { PASS:"Recorded", FAIL:"Blocked", SKIPPED:"Skipped — actor legitimacy" },
    purpose_consent: { PASS:"Recorded for exact purpose and recipient", FAIL:"Blocked", SKIPPED:"Skipped — actor legitimacy" },
    opportunity_source: { PASS:"Verified", FAIL:"Not verified" },
    opportunity_eligibility: { PASS:"Verified", FAIL:"Not assessed", SKIPPED:"Skipped — source not verified" },
    safeguarding_review: { PASS:"Reviewed", FAIL:"Blocked", SKIPPED:"Skipped — source not verified" },
    disclosure_scope: { FAIL:"No disclosure permitted" }
  });
  const gate = (key, label, state, detail, reasonCode, blocking = true) => ({
    key, label, state, satisfied: state === "PASS", blocking,
    status: (DISPLAY_STATUS[key] && DISPLAY_STATUS[key][state]) || (key === "opportunity_eligibility" ? detail : state),
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

    const playerLookup = uniqueLookup(players, item => item && item.id === r.playerId);
    const organizationLookup = uniqueLookup(organizations, item => item && item.id === r.organizationId);
    const membershipLookup = uniqueLookup(memberships, item => item && item.id === r.membershipId);
    const consentLookup = uniqueLookup(consentCases, item => item && item.id === r.consentCaseId);
    const opportunityLookup = uniqueLookup(opportunities, item => item && item.id === r.opportunityId);
    const invitationLookup = uniqueLookup(invitationCases, item => item && item.id === r.invitationCaseId);
    const organizationAuthorities = authorities.filter(item => item && item.organizationId === r.organizationId);
    const exactAuthorities = organizationAuthorities.filter(item => item.representativeId === r.representativeId);
    const authorityLookup = exactAuthorities.length
      ? uniqueLookup(exactAuthorities, () => true)
      : uniqueLookup(organizationAuthorities, () => true);
    const player = playerLookup.record;
    const organization = organizationLookup.record;
    const authority = authorityLookup.record;
    const membership = membershipLookup.record;
    const consent = consentLookup.record;
    const opportunity = opportunityLookup.record;
    const invitation = invitationLookup.record;

    // Tier 1: actor legitimacy. Tier 2 cannot evaluate consent until both pass.
    const orgLife = current(organization, now);
    const orgIdentityOk = !!organization && organization.identityStatus === "Verified" && orgLife.ok;
    const orgGate = gate(
      "organization_identity", "Organization identity",
      orgIdentityOk ? "PASS" : "FAIL",
      organizationLookup.duplicate ? "Multiple organization records resolve to the same reference."
        : !organization ? "Organization record not found."
        : organization.identityStatus !== "Verified" ? "Identity is not verified."
        : !orgLife.ok ? "Organization lifecycle check failed: " + orgLife.code
        : "Organization identity is verified and its lifecycle is current.",
      organizationLookup.duplicate ? "DUPLICATE_ORGANIZATION_REFERENCE"
        : !organization ? "ORGANIZATION_NOT_FOUND"
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
      authorityLookup.duplicate ? "Multiple authority grants resolve to this organization and representative."
        : !authority ? "No authority grant exists for this exact organization and representative."
        : authority.organizationId !== r.organizationId || authority.representativeId !== r.representativeId
          ? "Authority grant is not bound to the requested organization and representative."
        : authority.scope !== "DISCOVERY_REQUEST_REVIEW" ? "Authority grant does not cover this action."
        : authority.authority !== "Verified" ? "Representative authority is not verified."
        : !authorityLife.ok ? "Authority lifecycle check failed: " + authorityLife.code
        : "Representative authority is verified, current and scoped to this review.",
      authorityLookup.duplicate ? "DUPLICATE_REPRESENTATIVE_AUTHORITY"
        : !authority ? "REPRESENTATIVE_AUTHORITY_NOT_FOUND"
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
      playerLookup.duplicate ? "Multiple Passport records resolve to this player reference."
        : !player ? "Player Passport record not found."
        : !r.passportRef || r.passportRef !== player.id ? "Passport reference does not match the requested player."
        : player.recordStatus !== "ACTIVE" ? "Passport record is not active."
        : !passportLife.ok ? "Passport lifecycle check failed: " + passportLife.code
        : "Exact Passport reference resolves to an active synthetic record.",
      playerLookup.duplicate ? "DUPLICATE_PASSPORT_REFERENCE"
        : !player ? "PASSPORT_NOT_FOUND"
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
      membershipLookup.duplicate ? "Multiple membership records resolve to this claim reference."
        : !membership ? "Membership claim not found."
        : !membershipPairMatches ? "Membership does not bind this exact player and organization."
        : membership.status !== "Active" || membership.verification !== "Verified"
          ? "Membership is not both active and independently verified."
        : !membershipLife.ok ? "Membership lifecycle check failed: " + membershipLife.code
        : "Membership is active, verified and bound to the exact player and organization.",
      membershipLookup.duplicate ? "DUPLICATE_MEMBERSHIP_REFERENCE"
        : !membership ? "MEMBERSHIP_NOT_FOUND"
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

    const consentPrerequisites = actorLegitimacyPassed;
    const consentLinkedToPlayer = !!consent && consent.playerRef === r.playerRef;
    let guardianConflict = false;
    let guardianAuthorityOk = false;
    let playerVoiceOk = false;
    if (under18 && consentLinkedToPlayer) {
      const guardians = array(consent.guardians);
      guardianConflict = guardians.some(g => g
        && g.authorityStatus === "ESTABLISHED"
        && BLOCKED_GUARDIAN_DECISIONS.has(g.decision));
      const primaryGuardians = guardians.filter(g => g
        && g.authorityStatus === "ESTABLISHED" && g.primary === true);
      guardianAuthorityOk = primaryGuardians.length > 0
        && primaryGuardians.every(g => g.decision === "APPROVED");
      playerVoiceOk = consent.playerVoice === "Assent recorded";
    } else if (adultVerified && consentLinkedToPlayer) {
      guardianAuthorityOk = true;
      playerVoiceOk = consent.playerVoice === "Consent recorded";
    }

    const guardianGate = gate(
      "guardian_authority", "Guardian authority and conflict",
      !consentPrerequisites ? "SKIPPED" : guardianConflict ? "FAIL" : guardianAuthorityOk ? "PASS" : "FAIL",
      guardianConflict ? "Conflicting objection or revocation by an established guardian; review hold required."
        : under18 ? guardianAuthorityOk ? "Required guardian authority is established."
          : "Guardian authority is not established."
        : adultVerified ? "Not required for this verified-adult scenario." : "Adult status not verified.",
      !consentPrerequisites ? null : guardianConflict ? "GUARDIAN_CONFLICT_HOLD"
        : guardianAuthorityOk ? null : "GUARDIAN_AUTHORITY_NOT_ESTABLISHED"
    );
    const playerVoiceGate = gate(
      "player_voice", "Player voice / assent",
      !consentPrerequisites ? "SKIPPED" : playerVoiceOk ? "PASS" : "FAIL",
      under18 ? playerVoiceOk ? "Player assent recorded." : "Player assent is not recorded."
        : adultVerified ? playerVoiceOk ? "Adult consent recorded." : "Adult consent is not recorded."
        : "Age/capacity is unresolved; player voice requirement is not satisfied.",
      !consentPrerequisites ? null : playerVoiceOk ? null : "PLAYER_VOICE_NOT_RECORDED"
    );

    let consentState = "SKIPPED";
    let consentReason = null;
    let consentDetail = "Not evaluated: organization identity and representative authority must both pass first.";
    if (consentPrerequisites) {
      const consentLife = current(consent, now);
      const expectedPurpose = PURPOSE_CODES[r.purpose] || r.purposeCode;
      const purposeMatches = expectedPurpose && consent
        ? array(consent.purposes).filter(p => p && p.purposeCode === expectedPurpose) : [];
      const purposeAmbiguous = purposeMatches.length > 1;
      const purpose = purposeMatches.length === 1 ? purposeMatches[0] : null;
      const linked = !!consent && consent.playerRef === r.playerRef;
      const purposeOk = !!purpose && purpose.state === "Given";
      const recipientOk = !!purpose && purpose.recipientOrganizationId === r.organizationId;
      const overallOk = !!consent && consent.consentState === "Given";
      const lifecycleOk = consentLife.ok;
      const consentAuthorityOk = guardianAuthorityOk && playerVoiceOk && !guardianConflict;
      if (consentLookup.duplicate) { consentReason = "DUPLICATE_CONSENT_REFERENCE"; consentDetail = "Multiple consent records resolve to this reference."; }
      else if (!linked) { consentReason = "CONSENT_PLAYER_MISMATCH"; consentDetail = "Consent record does not match this player."; }
      else if (!overallOk) { consentReason = "CONSENT_NOT_GIVEN"; consentDetail = "Overall consent is not given."; }
      else if (purposeAmbiguous) { consentReason = "CONSENT_PURPOSE_AMBIGUOUS"; consentDetail = "Multiple grants match this purpose code; human resolution is required."; }
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
      opportunityLookup.duplicate ? "Multiple opportunity records resolve to this reference."
        : !opportunity ? "Opportunity record not found."
        : !opportunityOrgMatches ? "Opportunity belongs to a different organization."
        : opportunity.verification !== "Verified" ? "Opportunity source is not verified."
        : !opportunityLife.ok ? "Opportunity lifecycle check failed: " + opportunityLife.code
        : "Opportunity source is verified and current.",
      opportunityLookup.duplicate ? "DUPLICATE_OPPORTUNITY_REFERENCE"
        : !opportunity ? "OPPORTUNITY_NOT_FOUND"
        : !opportunityOrgMatches ? "OPPORTUNITY_ORGANIZATION_MISMATCH"
        : opportunity.verification !== "Verified" ? "OPPORTUNITY_SOURCE_UNVERIFIED" : opportunityLife.code
    );
    const eligibilityOk = !!opportunity && opportunity.eligibility === "Verified";
    const eligibilityState = !sourceOk ? "SKIPPED" : eligibilityOk ? "PASS" : "FAIL";
    const eligibilityGate = gate(
      "opportunity_eligibility", "Opportunity-specific eligibility",
      eligibilityState,
      !sourceOk ? "Skipped until the opportunity source and lifecycle are verified."
        : opportunity ? opportunity.eligibility : "Not assessed",
      eligibilityState === "FAIL" ? "ELIGIBILITY_NOT_VERIFIED" : null
    );
    const invitationOpportunityMatches = !invitationLookup.duplicate && !!invitation && invitation.opportunityId === r.opportunityId;
    const invitationSecondReviewComplete = !!invitation && invitation.secondReviewStatus === "COMPLETE";
    const safeguardingOk = sourceOk && !!opportunity && opportunity.safeguarding === "Reviewed"
      && invitationOpportunityMatches
      && invitation.workflowState === "READY"
      && invitationSecondReviewComplete;
    const safeguardingState = !sourceOk ? "SKIPPED" : safeguardingOk ? "PASS" : "FAIL";
    const safeguardingReason = !sourceOk ? null
      : invitationLookup.duplicate ? "DUPLICATE_INVITATION_REVIEW_REFERENCE"
      : !invitationOpportunityMatches ? "INVITATION_OPPORTUNITY_MISMATCH"
      : !invitationSecondReviewComplete ? "INVITATION_SECOND_REVIEW_INCOMPLETE"
      : safeguardingOk ? null : "SAFEGUARDING_NOT_CLEARED";
    const safeguardingGate = gate(
      "safeguarding_review", "Safeguarding review",
      safeguardingState,
      !sourceOk ? "Skipped until the opportunity source and lifecycle are verified."
        : !invitationOpportunityMatches ? "Invitation review is not bound to this exact opportunity."
        : !invitationSecondReviewComplete ? "Independent second review is incomplete."
        : safeguardingOk ? "Safeguarding and opportunity-bound second review are complete."
        : "Safeguarding and/or invitation review remains unresolved.",
      safeguardingReason
    );

    const disclosureGate = gate(
      "disclosure_scope", "Disclosure scope", "FAIL",
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
