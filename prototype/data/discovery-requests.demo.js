/* Fictional discovery/request scenarios only. No real players, consent, organizations or applications. */
window.SCOUTSA_DISCOVERY_REQUESTS = {
  purposes: [
    "Respond to a specific opportunity request",
    "Share selected football evidence with a named academy"
  ],
  records: [
    {
      id:"REQ-DEMO-001", playerId:"DEMO-PLAYER-001", playerRef:"PLAYER-DEMO-A",
      passportRef:"DEMO-PLAYER-001", opportunityId:"OPP-DEMO-001",
      consentCaseId:"GCS-DEMO-001", organizationId:"ORG-DEMO-01",
      membershipId:"MEM-DEMO-001", invitationCaseId:"INV-DEMO-001",
      requestOrigin:"Guardian-mediated scenario (not an actual request)",
      purpose:"Respond to a specific opportunity request",
      requestedDisclosure:"Selected football evidence only; no contact details",
      ageState:"Under 18 (scenario)",
      state:"HOLD — NOT SUBMITTABLE",
      note:"Guardian authority and purpose-specific consent are absent. Organization and opportunity are unverified."
    },
    {
      id:"REQ-DEMO-002", playerId:"DEMO-PLAYER-002", playerRef:"PLAYER-DEMO-B",
      passportRef:"DEMO-PLAYER-002", opportunityId:"OPP-DEMO-003",
      consentCaseId:"GCS-DEMO-002", organizationId:"ORG-DEMO-03",
      membershipId:null, invitationCaseId:"INV-DEMO-002",
      requestOrigin:"No authorized request route established",
      purpose:"Share selected football evidence with a named academy",
      requestedDisclosure:"No disclosure permitted",
      ageState:"Unknown — under-18 protections apply",
      state:"HOLD — NOT SUBMITTABLE",
      note:"Age is unknown, consent is absent, and the notice issuer and organization authority are unverified."
    },
    {
      id:"REQ-DEMO-003", playerId:"DEMO-PLAYER-003", playerRef:"PLAYER-DEMO-C",
      passportRef:null, opportunityId:"OPP-DEMO-002",
      consentCaseId:"GCS-DEMO-003", organizationId:"ORG-DEMO-02",
      membershipId:"MEM-DEMO-002", invitationCaseId:null,
      requestOrigin:"Adult self-directed scenario (adult status not verified)",
      purpose:"Share selected football evidence with a named academy",
      requestedDisclosure:"No disclosure permitted",
      ageState:"Adult status not verified",
      state:"HOLD — NOT SUBMITTABLE",
      note:"Adult status and consent are not established. The organization and opportunity remain unverified."
    }
  ],
  rules: [
    "A request for consideration is not an invitation, selection, trial, placement or guarantee.",
    "Unknown age receives under-18 protections until reliably established.",
    "A minor's route must be guardian-mediated, with guardian authority and the player's voice assessed separately.",
    "Consent must explicitly cover the named purpose and intended recipient; no consent is given in these examples.",
    "Organization identity and representative authority must be independently established.",
    "The specific opportunity and its source, eligibility and safeguarding must be independently reviewed.",
    "No direct private scout-to-minor or minor-to-scout messaging is permitted.",
    "No request may disclose a Passport, media or contact details through this static demonstration.",
    "No automated match, ranking, approval, invitation, publication or contact action is enabled."
  ],
  limits: [
    "All records are fictional and are not real requests or evidence of stakeholder activity.",
    "This screen does not submit or persist a request; it is a read-only workflow demonstration.",
    "No authentication, authorization, tenant isolation, RLS, secure storage or audit log exists.",
    "Do not enter real personal information or use this prototype to obtain consent."
  ]
};