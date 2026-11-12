/* Fictional matching triage only. No real players or opportunities. No rank or recommendation is produced. */
window.SCOUTSA_MATCHING_DEMO = {
  dimensions: [
    {id:"D1",name:"Opportunity requirements",meaning:"Age band, position, eligibility and participation criteria must be defined by an accountable source."},
    {id:"D2",name:"Football profile evidence",meaning:"Profile assertions are not verified football evidence; no talent score is inferred."},
    {id:"D3",name:"Geographic feasibility",meaning:"Area labels are indicative only; distance, transport, cost and travel safety are not established."},
    {id:"D4",name:"Availability",meaning:"Current player availability and opportunity dates are not supplied."},
    {id:"D5",name:"Membership and authority",meaning:"Membership claims and organization identity remain unverified."},
    {id:"D6",name:"Safeguarding and eligibility",meaning:"Age, guardian process, eligibility and safe participation must be independently established."}
  ],
  pairs: [
    {id:"PAIR-001",playerId:"DEMO-PLAYER-001",player:"Kabelo Mokoena",opportunityId:"OPP-DEMO-001",opportunity:"U17 Development Programme — Sample",areaContext:"Sebokeng / Sedibeng (labels only)",positionContext:"Central Midfielder",findings:[
      ["Not assessable","No verified age or eligibility criteria; U17 status cannot be inferred."],
      ["Insufficient evidence","Position is a fictional profile assertion; no supporting evidence."],
      ["Unconfirmed","Area labels do not establish travel feasibility or safe transport."],
      ["Unknown","No current availability or programme dates."],
      ["Unverified","Sample academy identity and membership claim are not verified."],
      ["HARD STOP","Under-18 scenario; guardian, consent and safeguarding gates are unresolved."]
    ],disposition:"NO MATCH DECISION — HOLD",reason:"A position label and geographic proximity are not enough to establish eligibility or safe participation."},
    {id:"PAIR-002",player:"Lerato Nkosi",playerId:"DEMO-PLAYER-002",opportunityId:"OPP-DEMO-001",opportunity:"U17 Development Programme — Sample",areaContext:"Vanderbijlpark / Sedibeng (labels only)",positionContext:"Wide Forward",findings:[
      ["Not assessable","No verified age or eligibility criteria; U17 status cannot be inferred."],
      ["Insufficient evidence","Position is a fictional profile assertion; no supporting evidence."],
      ["Unconfirmed","Area labels do not establish travel feasibility or safe transport."],
      ["Unknown","No current availability or programme dates."],
      ["Unverified","No verified membership or organization authority."],
      ["HARD STOP","Age is not established; under-18 safeguards apply until reliably established."]
    ],disposition:"NO MATCH DECISION — HOLD",reason:"The programme's age and participation criteria are not verified, and the profile does not establish age."},
    {id:"PAIR-003",player:"Kabelo Mokoena",playerId:"DEMO-PLAYER-001",opportunityId:"OPP-DEMO-002",opportunity:"Girls' Football Skills Clinic — Sample",areaContext:"Sebokeng / Emfuleni (labels only)",positionContext:"Central Midfielder",findings:[
      ["Not assessable","No published eligibility, age band or participation criteria."],
      ["Insufficient evidence","No independently supported football profile evidence."],
      ["Unconfirmed","No venue, travel plan or transport cost."],
      ["Unknown","No dates or availability."],
      ["Unverified","Organization identity and membership claims are unverified."],
      ["HARD STOP","No eligibility or safeguarding assessment; do not infer suitability."]
    ],disposition:"NO MATCH DECISION — HOLD",reason:"The clinic's participation criteria are unknown; no suitability conclusion can be drawn."},
    {id:"PAIR-004",player:"Lerato Nkosi",playerId:"DEMO-PLAYER-002",opportunityId:"OPP-DEMO-002",opportunity:"Girls' Football Skills Clinic — Sample",areaContext:"Vanderbijlpark / Emfuleni (labels only)",positionContext:"Wide Forward",findings:[
      ["Not assessable","No published eligibility, age band or participation criteria."],
      ["Insufficient evidence","Position is a fictional profile assertion; no supporting evidence."],
      ["Unconfirmed","No venue, travel plan or transport cost."],
      ["Unknown","No dates or availability."],
      ["Unverified","Organization identity and membership claims are unverified."],
      ["HARD STOP","No eligibility or safeguarding assessment; do not infer suitability."]
    ],disposition:"NO MATCH DECISION — HOLD",reason:"A position label cannot substitute for explicit clinic requirements or safe-participation review."},
    {id:"PAIR-005",player:"Kabelo Mokoena",playerId:"DEMO-PLAYER-001",opportunityId:"OPP-DEMO-003",opportunity:"Regional Talent Observation Session — Sample",areaContext:"Sebokeng / Vaal Triangle (labels only)",positionContext:"Central Midfielder",findings:[
      ["Not assessable","Issuer, eligibility criteria, age band and required positions are unknown."],
      ["Insufficient evidence","No authenticated performance evidence or independent corroboration."],
      ["Unconfirmed","No confirmed venue or travel plan."],
      ["Unknown","No confirmed event date or current availability."],
      ["Unverified","Issuer, organization and representative authority are unverified."],
      ["HARD STOP","Age unknown; under-18 protections apply; invitation workflow is blocked."]
    ],disposition:"NO MATCH DECISION — HOLD",reason:"The notice itself is unverified and the participant criteria are absent."},
    {id:"PAIR-006",player:"Lerato Nkosi",playerId:"DEMO-PLAYER-002",opportunityId:"OPP-DEMO-003",opportunity:"Regional Talent Observation Session — Sample",areaContext:"Vanderbijlpark / Vaal Triangle (labels only)",positionContext:"Wide Forward",findings:[
      ["Not assessable","Issuer, eligibility criteria, age band and required positions are unknown."],
      ["Insufficient evidence","No authenticated performance evidence or independent corroboration."],
      ["Unconfirmed","No confirmed venue or travel plan."],
      ["Unknown","No confirmed event date or current availability."],
      ["Unverified","Issuer, organization and representative authority are unverified."],
      ["HARD STOP","Age unknown; under-18 protections apply; invitation workflow is blocked."]
    ],disposition:"NO MATCH DECISION — HOLD",reason:"A possible position fit cannot cure an unverified notice, unknown age or missing safeguards."}
  ]
};
