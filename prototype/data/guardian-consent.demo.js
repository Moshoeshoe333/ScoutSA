/* Fictional guardian and consent fixture. No real people, documents, contact details or consent are represented. */
window.SCOUTSA_GUARDIAN_CONSENT_DEMO = {
  cases:[
    {id:"GCS-DEMO-001",playerRef:"PLAYER-DEMO-A",ageState:"Under 18 (scenario)",guardianState:"Authority not established",playerVoice:"Not recorded",consentState:"Not given",purposes:[{name:"Create a private Player Passport",state:"Not given",recipientOrganizationId:null},{name:"Share selected football evidence with a named academy",state:"Not given",recipientOrganizationId:null},{name:"Respond to a specific opportunity request",state:"Not given",recipientOrganizationId:null}],expiry:"Not applicable",withdrawal:"No consent record exists",disclosure:"Blocked",next:"Establish guardian authority through an approved process; separately explain each purpose to the player and guardian."},
    {id:"GCS-DEMO-002",playerRef:"PLAYER-DEMO-B",ageState:"Unknown",guardianState:"Not established",playerVoice:"Not recorded",consentState:"Not given",purposes:[{name:"Create a private Player Passport",state:"Not given",recipientOrganizationId:null},{name:"Share selected football evidence with a named academy",state:"Not given",recipientOrganizationId:null},{name:"Respond to a specific opportunity request",state:"Not given",recipientOrganizationId:null}],expiry:"Not applicable",withdrawal:"No consent record exists",disclosure:"Blocked",next:"Treat age as under 18 until reliably established; do not initiate direct private contact or disclose player information."},
    {id:"GCS-DEMO-003",playerRef:"PLAYER-DEMO-C",ageState:"Adult status not verified",guardianState:"Not applicable only if adult status is established",playerVoice:"Not recorded",consentState:"Not given",purposes:[{name:"Create a private Player Passport",state:"Not given",recipientOrganizationId:null},{name:"Share selected football evidence with a named academy",state:"Not given",recipientOrganizationId:null},{name:"Respond to a specific opportunity request",state:"Not given",recipientOrganizationId:null}],expiry:"Not applicable",withdrawal:"No consent record exists",disclosure:"Blocked",next:"Establish the applicable legal capacity and identity process before any real consent workflow."}
  ],
  rules:[
    "Consent is purpose-specific; agreement to create a Passport does not authorize sharing it.",
    "Guardian authority and the player's own understanding, views and assent are separate considerations.",
    "A guardian's assertion is not proof of authority; authority requires an approved, independently checked process.",
    "Unknown age is handled with under-18 protections until reliably established.",
    "Consent must be understandable, informed, specific, recorded, time-bounded where appropriate and withdrawable.",
    "Withdrawal must stop future use or disclosure for the withdrawn purpose pending the approved operational process; retention and legal obligations require separate policy.",
    "No consent state overrides safeguarding, eligibility, organization authority or access-control gates."
  ],
  limits:[
    "All cases and references are fictional. No real consent, guardian authority or age has been established.",
    "No identity documents, guardian contact details, signatures, biometrics or sensitive family information are collected.",
    "This static demo has no authentication, authorization, secure record storage, audit log, notification or access enforcement.",
    "No real consent should be collected through this prototype."
  ]
};
