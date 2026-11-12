/* ScoutSA pure review engine — synthetic prototype contract only.
 * No DOM, storage, network, authentication, authorization or disclosure side effects.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.SCOUTSA_REVIEW_ENGINE = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const asArray = value => Array.isArray(value)
    ? value
    : value && typeof value === "object" ? Object.values(value) : [];
  const byId = (items, id) => asArray(items).find(item => item && item.id === id) || null;
  const makeGate = (key, label, satisfied, status, detail, reasonCode, blocking = true) => ({
    key, label, satisfied: !!satisfied, status, detail,
    blocking,
    reasonCodes: reasonCode ? [reasonCode] : []
  });

  function evaluateRequest(request, context = {}) {
    const r = request || {};
    const players = asArray(context.players);
    const consentCases = asArray(context.consentCases);
    const organizations = asArray(context.organizations);
    const memberships = asArray(context.memberships);
    const authorities = asArray(context.representativeAuthorities);
    const opportunities = asArray(context.opportunities);
    const invitationCases = asArray(context.invitationCases);

    const player = r.passportRef && r.passportRef === r.playerId
      ? players.find(x => x && x.id === r.playerId) || null
      : null;
    const consentCase = byId(consentCases, r.consentCaseId);
    const organization = byId(organizations, r.organizationId);
    const membership = byId(memberships, r.membershipId);
    const opportunity = byId(opportunities, r.opportunityId);
    const invitation = byId(invitationCases, r.invitationCaseId);
    const authority = byId(authorities, r.organizationId);

    const ageState = typeof r.ageState === "string" ? r.ageState : "";
    const under18Protections = ageState.includes("Under 18") || ageState.includes("Unknown");
    const adultVerified = ageState === "Adult — verified";
    const safeRoute = under18Protections
      ? typeof r.requestOrigin === "string" && r.requestOrigin.includes("Guardian-mediated")
      : adultVerified;

    const guardianAuthoritySatisfied = under18Protections
      ? !!consentCase && consentCase.guardianState === "Established"
      : adultVerified;
    const playerVoiceSatisfied = under18Protections
      ? !!consentCase && consentCase.playerVoice === "Assent recorded"
      : adultVerified && !!consentCase && consentCase.playerVoice === "Consent recorded";

    const consentLinked = !!consentCase && consentCase.playerRef === r.playerRef;
    const purposeGrant = consentCase && Array.isArray(consentCase.purposes)
      ? consentCase.purposes.find(item => item && item.name === r.purpose) || null
      : null;
    const consentOverallGiven = consentLinked && consentCase.consentState === "Given";
    const consentPurposeGiven = !!purposeGrant && purposeGrant.state === "Given";
    const consentRecipientMatches = !!purposeGrant && purposeGrant.recipientOrganizationId === r.organizationId;
    const consentSatisfied = consentOverallGiven && consentPurposeGiven && consentRecipientMatches;

    const membershipIdentityMatches = !!membership
      && membership.playerId === r.playerId
      && membership.organizationId === r.organizationId;
    const membershipVerified = membershipIdentityMatches
      && membership.status === "Active"
      && membership.verification === "Verified";

    const opportunityOrganizationMatches = !!opportunity
      && opportunity.organizationId === r.organizationId;
    const opportunityVerified = opportunityOrganizationMatches
      && opportunity.verification === "Verified";
    const eligibilityVerified = !!opportunity && opportunity.eligibility === "Verified";
    const safeguardingReviewed = !!opportunity
      && opportunity.safeguarding === "Reviewed"
      && !!invitation
      && invitation.workflowState === "READY";

    const gates = [
      makeGate(
        "passport_reference", "Player Passport reference", !!player,
        player ? "Linked synthetic Passport" : "Missing or unresolved",
        player ? "Exact Passport reference resolves to the requested synthetic player; claims remain unverified."
          : "Passport reference is missing, does not equal the request player ID, or does not resolve to a fixture.",
        "PASSPORT_MISSING_OR_MISMATCHED"
      ),
      makeGate(
        "age_safe_route", "Age and safe request route", safeRoute,
        under18Protections
          ? (safeRoute ? "Guardian-mediated route present" : "Guardian-mediated route not established")
          : (adultVerified ? "Adult status verified" : "Adult status unverified"),
        under18Protections
          ? "Under-18 protections apply; a guardian-mediated route is required."
          : adultVerified ? "Adult status is explicitly established in this synthetic scenario."
          : "Adult status is not established; under-18 protections must not be bypassed.",
        under18Protections ? "SAFE_GUARDIAN_ROUTE_MISSING" : "AGE_STATUS_UNVERIFIED"
      ),
      makeGate(
        "purpose_consent", "Purpose-specific consent", consentSatisfied,
        consentSatisfied ? "Recorded for exact purpose and recipient" : "Blocked",
        !consentLinked ? "Consent record is absent or does not match the request player."
          : !consentOverallGiven ? "Overall consent is not given."
          : !consentPurposeGiven ? "The exact requested purpose is not given."
          : !consentRecipientMatches ? "Consent recipient does not match the request organization."
          : "Purpose and recipient are bound to this request.",
        !consentLinked ? "CONSENT_PLAYER_MISMATCH"
          : !consentOverallGiven ? "CONSENT_NOT_GIVEN"
          : !consentPurposeGiven ? "CONSENT_PURPOSE_NOT_GIVEN"
          : !consentRecipientMatches ? "CONSENT_RECIPIENT_MISMATCH" : null
      ),
      makeGate(
        "guardian_authority", "Guardian authority",
        guardianAuthoritySatisfied,
        under18Protections
          ? (guardianAuthoritySatisfied ? "Established" : "Blocked")
          : adultVerified ? "Not required — adult verified" : "Adult status not verified",
        under18Protections
          ? (consentCase ? consentCase.guardianState : "No consent case linked")
          : adultVerified ? "Guardian authority is not required for the verified-adult scenario."
          : "Guardian authority cannot be bypassed until adult status is established.",
        under18Protections ? "GUARDIAN_AUTHORITY_NOT_ESTABLISHED" : "AGE_STATUS_UNVERIFIED"
      ),
      makeGate(
        "player_voice", "Player voice / assent", playerVoiceSatisfied,
        playerVoiceSatisfied ? "Recorded" : "Blocked",
        consentCase ? consentCase.playerVoice : "No consent case linked",
        "PLAYER_VOICE_NOT_RECORDED"
      ),
      makeGate(
        "organization_identity", "Organization identity",
        !!organization && organization.identityStatus === "Verified",
        organization && organization.identityStatus === "Verified" ? "Verified" : "Unverified",
        organization ? organization.name + " — " + organization.identityStatus : "No organization record.",
        "ORGANIZATION_IDENTITY_UNVERIFIED"
      ),
      makeGate(
        "representative_authority", "Representative authority",
        !!authority && authority.authority === "Verified",
        authority ? authority.authority : "Not established",
        authority ? "Authority record: " + authority.authority : "No authority record exists for this organization.",
        "REPRESENTATIVE_AUTHORITY_UNVERIFIED"
      ),
      makeGate(
        "membership_linkage", "Membership linkage",
        membershipVerified,
        !membership ? "Missing or mismatched"
          : !membershipIdentityMatches ? "Missing or mismatched"
          : membershipVerified ? "Verified active membership"
          : "Linked claim; still unverified",
        membership ? membership.player + " / " + membership.organizationId + " / " + membership.verification
          : "No matching membership claim supplied.",
        !membership ? "MEMBERSHIP_NOT_FOUND"
          : !membershipIdentityMatches ? "MEMBERSHIP_LINK_MISMATCH"
          : "MEMBERSHIP_NOT_VERIFIED"
      ),
      makeGate(
        "opportunity_source", "Specific opportunity and source",
        opportunityVerified,
        !opportunity ? "Not verified"
          : !opportunityOrganizationMatches ? "Organization mismatch"
          : opportunityVerified ? "Verified" : "Not verified",
        !opportunity ? "No opportunity record."
          : !opportunityOrganizationMatches ? "Opportunity organization does not match the request organization."
          : opportunity.title + " — " + opportunity.source + " — " + opportunity.verification,
        !opportunity ? "OPPORTUNITY_NOT_FOUND"
          : !opportunityOrganizationMatches ? "OPPORTUNITY_ORGANIZATION_MISMATCH"
          : "OPPORTUNITY_SOURCE_UNVERIFIED"
      ),
      makeGate(
        "opportunity_eligibility", "Opportunity-specific eligibility",
        eligibilityVerified,
        opportunity ? opportunity.eligibility : "Not assessed",
        opportunity ? opportunity.eligibility : "No opportunity record.",
        "ELIGIBILITY_NOT_VERIFIED"
      ),
      makeGate(
        "safeguarding_review", "Safeguarding review",
        safeguardingReviewed,
        safeguardingReviewed ? "Reviewed" : "Blocked",
        opportunity
          ? "Opportunity safeguarding: " + opportunity.safeguarding + "; invitation workflow: " + (invitation ? invitation.workflowState : "No invitation review")
          : "No opportunity record.",
        "SAFEGUARDING_NOT_CLEARED"
      ),
      makeGate(
        "disclosure_scope", "Disclosure scope", false,
        "No disclosure permitted",
        "This static prototype has no disclosure capability; passing review gates never releases player data.",
        "DISCLOSURE_NOT_IMPLEMENTED",
        false
      )
    ];

    const blockingGates = gates.filter(item => item.blocking && !item.satisfied);
    const reasonCodes = Array.from(new Set(gates.flatMap(item => item.reasonCodes)));
    return {
      requestId: r.id || null,
      disposition: blockingGates.length ? "HOLD" : "READY_FOR_SEPARATE_HUMAN_REVIEW",
      allBlockingGatesSatisfied: blockingGates.length === 0,
      disclosurePermitted: false,
      reasonCodes,
      gates
    };
  }

  return Object.freeze({
    version: "0.1.0",
    evaluateRequest
  });
});
