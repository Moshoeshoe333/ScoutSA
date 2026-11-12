/* Fictional academy workspace fixture. No real organization, coach or player records. */
window.SCOUTSA_ACADEMY_WORKSPACE_DEMO = {
  organization:{id:"ORG-DEMO-01",name:"Vaal Sample Academy",type:"Academy",area:"Sedibeng · illustrative",identity:"Unverified",authority:"Not established",membership:"Claims present; none independently verified",workspaceRole:"Sample academy reviewer (fictional)",scope:"Organization-level summaries only; no player-level records supplied"},
  summary:{membershipClaims:3,claimsNeedingReview:3,opportunityProposals:2,evidenceActions:4},
  memberships:[
    {id:"MEM-DEMO-001",state:"Pending",verification:"Not verified",note:"A fictional player-submitted affiliation claim is awaiting independent evidence."},
    {id:"MEM-DEMO-004",state:"Disputed",verification:"Not verified",note:"Conflicting synthetic affiliation assertions require separate resolution."},
    {id:"MEM-DEMO-005",state:"Active",verification:"Not verified",note:"Illustrative workflow state only; Active does not establish a verified affiliation."}
  ],
  opportunities:[
    {id:"OPP-DEMO-001",name:"U17 Development Programme — Sample",state:"Proposal only",source:"Fictional planning note",blocker:"Issuer, eligibility, dates and safeguards are not established."},
    {id:"OPP-DEMO-003",name:"Regional Talent Observation Session — Sample",state:"Verification required",source:"Fictional draft notice",blocker:"Issuer and accountable authority are unknown; do not publish or invite."}
  ],
  evidenceActions:[
    {id:"ACT-001",area:"Organization identity",state:"Evidence absent",action:"Identify an independent, authoritative source for the entity."},
    {id:"ACT-002",area:"Representative authority",state:"Unverified",action:"Establish the scope and currency of the representative's authority."},
    {id:"ACT-003",area:"Membership claims",state:"Review required",action:"Preserve each claim and obtain independent, claim-specific evidence."},
    {id:"ACT-004",area:"Opportunity source",state:"Insufficient",action:"Identify the issuer and verify the original notice before any further use."}
  ],
  boundaries:[
    "No player roster, names, contact details, passports or individual readiness records are shown.",
    "An academy or coach role does not create general permission to view player information.",
    "This static prototype has no authentication, authorization, tenant isolation or RLS.",
    "No player contact, invitation, publication, membership approval or evidence acceptance is enabled."
  ]
};
