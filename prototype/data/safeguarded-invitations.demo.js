/* Fictional invitation-gate scenarios. No real players, guardians, organizations or contacts. */
window.SCOUTSA_INVITATION_WORKFLOW = {
  cases: [
    {
      id:"INV-DEMO-001",opportunityId:"OPP-DEMO-001",opportunity:"U17 Development Programme — Sample",
      organization:"Vaal Sample Academy",participantBand:"Under 18 (fictional scenario)",
      route:"Guardian-mediated only",workflowState:"HOLD — NOT INVITABLE",
      gates:[
        {id:"G1",name:"Opportunity source and current validity",status:"Evidence required",note:"No original source or current confirmation is available."},
        {id:"G2",name:"Organization identity and authority",status:"Not assessed",note:"The fictional organization and its representative are not verified."},
        {id:"G3",name:"Opportunity-specific eligibility",status:"Not assessed",note:"No verified eligibility criteria or participant assessment exists."},
        {id:"G4",name:"Guardian authority and informed consent",status:"Blocked",note:"No guardian process or consent evidence exists; never infer consent."},
        {id:"G5",name:"Safe communication route",status:"Blocked",note:"No approved guardian-mediated route exists. No direct private contact with a minor."},
        {id:"G6",name:"Safeguarding and accountable supervision",status:"Not assessed",note:"Responsible adults, supervision, escalation and incident procedures are not established."},
        {id:"G7",name:"Venue, timing and transport safety",status:"Not assessed",note:"No independently confirmed venue or practical safety plan exists."},
        {id:"G8",name:"Independent second review and authority",status:"Not assessed",note:"No independent reviewer or authorized invitation decision exists."}
      ],
      hardStops:["Guardian consent and authority unresolved","No safe guardian-mediated communication route","Organization and opportunity unverified"],
      permittedNextStep:"Request independent evidence and qualified safeguarding review; do not identify or contact a real participant."
    },
    {
      id:"INV-DEMO-002",opportunityId:"OPP-DEMO-003",opportunity:"Regional Talent Observation Session — Sample",
      organization:"Southside Demo Development",participantBand:"Age not established (fictional scenario)",
      route:"No contact route established",workflowState:"HOLD — NOT INVITABLE",
      gates:[
        {id:"G1",name:"Opportunity source and current validity",status:"Evidence required",note:"Only a fictional draft notice is described; issuer and date are unverified."},
        {id:"G2",name:"Organization identity and authority",status:"Not assessed",note:"No reliable identity or representative authority evidence exists."},
        {id:"G3",name:"Opportunity-specific eligibility",status:"Not assessed",note:"Age and eligibility criteria have not been established."},
        {id:"G4",name:"Guardian authority and informed consent",status:"Blocked",note:"Age is unknown; the under-18 safeguarding path must apply until age is reliably established."},
        {id:"G5",name:"Safe communication route",status:"Blocked",note:"No authorized guardian-mediated route is established; no direct private contact."},
        {id:"G6",name:"Safeguarding and accountable supervision",status:"Not assessed",note:"No accountable safeguarding lead or supervision plan is evidenced."},
        {id:"G7",name:"Venue, timing and transport safety",status:"Not assessed",note:"Venue, timing and travel arrangements are unconfirmed."},
        {id:"G8",name:"Independent second review and authority",status:"Not assessed",note:"No independent review or invitation authority is evidenced."}
      ],
      hardStops:["Age not established — apply under-18 protections","Issuer and organization unverified","No guardian-mediated communication route"],
      permittedNextStep:"Keep on hold; establish age-appropriate safeguards and verify the issuer through independent sources."
    }
  ]
};
