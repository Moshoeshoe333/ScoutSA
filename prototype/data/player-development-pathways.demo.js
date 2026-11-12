/* Synthetic pathway storyboard only. These are not real activity events or audit records. */
window.SCOUTSA_PATHWAYS_DEMO = {
  stages: [
    {id:"S1",name:"Passport foundation",description:"A basic football profile exists; identity and profile claims remain unverified."},
    {id:"S2",name:"Evidence collection",description:"Claims are linked to attributable supporting material and limitations."},
    {id:"S3",name:"Membership review",description:"Organization identity and player affiliation are assessed separately."},
    {id:"S4",name:"Development assessment",description:"Qualified human feedback is recorded without automated talent scoring."},
    {id:"S5",name:"Opportunity review",description:"A specific opportunity is checked against eligibility and practical access requirements."},
    {id:"S6",name:"Outcome record",description:"Only an evidenced real-world outcome may be recorded; no outcome is inferred."}
  ],
  players: [
    {id:"DEMO-PLAYER-001",name:"Kabelo Mokoena",position:"Central Midfielder",area:"Sebokeng · illustrative",current:"Evidence collection",summary:"A profile exists, but its football claims have no supporting media or documents in this sample.",stages:[
      {state:"Started",detail:"Synthetic passport profile is present.",evidence:"Profile assertions only",next:"Establish identity and permission requirements before any real record exists."},
      {state:"Incomplete",detail:"Position and sample season claims have no supporting source.",evidence:"No supporting evidence supplied",next:"Define acceptable evidence and an authorized reviewer."},
      {state:"Unverified",detail:"Sample academy membership is unverified; historical entry is illustrative.",evidence:"No independent affiliation evidence",next:"Verify organization and claim scope independently."},
      {state:"Not assessed",detail:"No qualified development assessment is supplied.",evidence:"No coach assessment",next:"Define a safe, consistent assessment method and reviewer authority."},
      {state:"On hold",detail:"No opportunity eligibility, age or safe-access assessment is established.",evidence:"No verified opportunity criteria",next:"Resolve age-appropriate safeguards, eligibility and transport feasibility."},
      {state:"Not recorded",detail:"No trial, placement or pathway outcome is represented.",evidence:"No outcome evidence",next:"Record only a verified outcome if one occurs and is authorized."}
    ]},
    {id:"DEMO-PLAYER-002",name:"Lerato Nkosi",position:"Wide Forward",area:"Vanderbijlpark · illustrative",current:"Passport foundation",summary:"A minimal profile exists; age, evidence, membership and opportunity readiness are not established.",stages:[
      {state:"Started",detail:"Synthetic passport profile is present.",evidence:"Profile assertions only",next:"Establish identity and permission requirements before any real record exists."},
      {state:"Incomplete",detail:"Position claim has no supporting media or document.",evidence:"No supporting evidence supplied",next:"Define acceptable evidence and an authorized reviewer."},
      {state:"Unverified",detail:"Sample club affiliation is unverified.",evidence:"No independent affiliation evidence",next:"Verify organization and claim scope independently."},
      {state:"Not assessed",detail:"No qualified development assessment is supplied.",evidence:"No coach assessment",next:"Define a safe, consistent assessment method and reviewer authority."},
      {state:"On hold",detail:"Age and opportunity criteria are unknown; under-18 safeguards apply until age is reliably established.",evidence:"Eligibility and safeguarding unresolved",next:"Resolve age-appropriate safeguards, eligibility and transport feasibility."},
      {state:"Not recorded",detail:"No trial, placement or pathway outcome is represented.",evidence:"No outcome evidence",next:"Record only a verified outcome if one occurs and is authorized."}
    ]}
  ]
};
