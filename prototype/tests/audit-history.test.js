"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const audit = require("../audit-history.js");

const NOW = "2026-11-13T12:00:00.000Z";
const FUTURE = "2027-01-01T00:00:00.000Z";
const evidenceRecords = [{
  evidenceRef:"EV-1", versionId:"v1", versionStatus:"CURRENT",
  fingerprint:"FP-1", organizationId:"ORG-1",
  reviewScope:"INVITATION_SAFEGUARDING_REVIEW",
  reviewerId:"REVIEWER-1", authorityId:"AUTH-1",
  inspectionStatus:"ACCEPTED"
}];
const reviews = [{
  reviewId:"REV-1", organizationId:"ORG-1",
  scope:"INVITATION_SAFEGUARDING_REVIEW",
  reviewerId:"REVIEWER-1", authorityId:"AUTH-1",
  completedAt:"2026-11-13T09:03:00.000Z",
  evidenceRefs:[{evidenceRef:"EV-1",versionId:"v1",fingerprint:"FP-1"}]
}];
const eventAuthorities = [{
  id:"AUTH-1", reviewerId:"REVIEWER-1", organizationId:"ORG-1",
  scope:"INVITATION_SAFEGUARDING_REVIEW", authority:"Verified",
  lifecycleStatus:"ACTIVE", expiresAt:FUTURE
}];

function event(eventId,eventType,fromState,toState,occurredAt,extra={}) {
  return {
    eventId,eventType,fromState,toState,occurredAt,
    actorId:"REVIEWER-1",authorityId:"AUTH-1",organizationId:"ORG-1",
    scope:"INVITATION_SAFEGUARDING_REVIEW",provenanceRef:"SYNTHETIC-SOURCE-"+eventId,
    evidenceRef:"EV-1",versionId:"v1",fingerprint:"FP-1",
    evidenceRefs:[{evidenceRef:"EV-1",versionId:"v1",fingerprint:"FP-1"}],
    ...extra
  };
}
function validEvents() {
  return [
    event("E-1","EVIDENCE_CREATED",null,"SUBMITTED","2026-11-13T09:00:00.000Z"),
    event("E-2","EVIDENCE_INSPECTED","SUBMITTED","INSPECTED","2026-11-13T09:01:00.000Z"),
    event("E-3","EVIDENCE_ACCEPTED","INSPECTED","ACCEPTED","2026-11-13T09:02:00.000Z"),
    event("E-4","REVIEW_COMPLETED","PENDING","COMPLETE","2026-11-13T09:03:00.000Z",{reviewId:"REV-1"})
  ];
}
function validate(events=validEvents(),overrides={}) {
  return audit.validateAuditHistory({
    events,evidenceRecords,reviews,eventAuthorities,now:NOW,...overrides
  });
}

test("audit-history validator exposes a versioned pure API",()=>{
  assert.equal(audit.version,"0.2.0");
  assert.equal(typeof audit.validateAuditHistory,"function");
});
test("complete ordered evidence and review history validates",()=>{
  const result=validate();
  assert.equal(result.valid,true);
  assert.equal(result.eventCount,4);
  assert.equal(result.evidenceVersionCount,1);
  assert.deepEqual(result.reviewStatuses,[{reviewId:"REV-1",status:"COMPLETE"}]);
});
test("empty audit history fails closed",()=>{
  assert.ok(validate([]).errors.some(x=>x.code==="AUDIT_EVENTS_EMPTY"));
});
test("non-array audit history fails closed",()=>{
  assert.ok(validate(null).errors.some(x=>x.code==="AUDIT_EVENTS_COLLECTION_INVALID"));
});
test("every declared review requires a completion event",()=>{
  assert.ok(validate(validEvents().slice(0,3)).errors.some(x=>x.code==="AUDIT_REVIEW_COMPLETION_EVENT_MISSING"));
});
test("missing event identifiers fail closed",()=>{
  const events=validEvents();events[1].eventId="";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVENT_ID_MISSING"));
});
test("duplicate event identifiers fail closed",()=>{
  const events=validEvents();events[1].eventId=events[0].eventId;
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVENT_ID_DUPLICATE"));
});
test("out-of-order timestamps fail closed",()=>{
  const events=validEvents();events[2].occurredAt="2026-11-13T08:59:00.000Z";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVENT_ORDER_INVALID"));
});
test("equal timestamps fail closed because causal order is ambiguous",()=>{
  const events=validEvents();events[1].occurredAt=events[0].occurredAt;
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVENT_ORDER_INVALID"));
});
test("non-canonical timestamps fail closed",()=>{
  const events=validEvents();events[0].occurredAt="2026-11-13T09:00:00Z";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVENT_TIME_INVALID"));
});
test("illegal evidence transitions fail closed",()=>{
  const events=validEvents();events[2].fromState="SUBMITTED";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVIDENCE_TRANSITION_INVALID"));
});
test("unresolved evidence version fails closed",()=>{
  const events=validEvents();events[0].versionId="missing";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVIDENCE_TARGET_UNRESOLVED"));
});
test("duplicate evidence-version targets are ambiguous",()=>{
  const duplicate=[...evidenceRecords,structuredClone(evidenceRecords[0])];
  assert.ok(validate(validEvents(),{evidenceRecords:duplicate}).errors.some(x=>x.code==="AUDIT_EVIDENCE_TARGET_AMBIGUOUS"));
});
test("wrong evidence inspector or authority fails closed",()=>{
  const events=validEvents();events[1].actorId="OTHER";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVIDENCE_INSPECTOR_MISMATCH"));
});
test("event authority must resolve to one exact scoped grant",()=>{
  assert.ok(validate(validEvents(),{eventAuthorities:[]}).errors.some(x=>x.code==="AUDIT_EVENT_AUTHORITIES_INVALID"));
});
test("expired event authority fails closed",()=>{
  const authorities=[{...eventAuthorities[0],expiresAt:"2026-11-13T09:01:00.000Z"}];
  assert.ok(validate(validEvents(),{eventAuthorities:authorities}).errors.some(x=>x.code==="AUDIT_EVENT_AUTHORITY_NOT_CURRENT"));
});
test("evidence fingerprint is pinned by each evidence event",()=>{
  const events=validEvents();events[1].fingerprint="FP-CHANGED";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVIDENCE_FINGERPRINT_MISMATCH"));
});
test("review event actor and scope must match the review fixture",()=>{
  const events=validEvents();events[3].actorId="OTHER";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_REVIEW_ACTOR_OR_SCOPE_MISMATCH"));
});
test("review event must carry exact version and fingerprint links",()=>{
  const events=validEvents();events[3].evidenceRefs[0].fingerprint="FP-OTHER";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_REVIEW_EVIDENCE_LINK_MISSING"));
});
test("review cannot complete before its linked evidence is accepted",()=>{
  const events=validEvents();
  const accepted=events.splice(2,1)[0];
  events.splice(3,0,accepted);
  events[2].occurredAt="2026-11-13T09:01:30.000Z";
  events[3].occurredAt="2026-11-13T09:02:00.000Z";
  reviews[0].completedAt="2026-11-13T09:02:00.000Z";
  const result=validate(events);
  reviews[0].completedAt="2026-11-13T09:03:00.000Z";
  assert.ok(result.errors.some(x=>x.code==="AUDIT_REVIEW_EVIDENCE_NOT_ACCEPTED"));
});
test("review completion event time must equal review completedAt",()=>{
  const events=validEvents();events[3].occurredAt="2026-11-13T09:03:30.000Z";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_REVIEW_COMPLETION_TIME_MISMATCH"));
});
test("review invalidation is accepted after completion and exposes invalidated status",()=>{
  const events=validEvents();
  events.push(event("E-5","REVIEW_INVALIDATED","COMPLETE","INVALIDATED","2026-11-13T09:04:00.000Z",{reviewId:"REV-1"}));
  const result=validate(events);
  assert.equal(result.valid,true);
  assert.deepEqual(result.reviewStatuses,[{reviewId:"REV-1",status:"INVALIDATED"}]);
});
test("evidence revocation after review requires a review invalidation event",()=>{
  const events=validEvents();
  events.push(event("E-5","EVIDENCE_REVOKED","ACCEPTED","REVOKED","2026-11-13T09:04:00.000Z"));
  const record={...evidenceRecords[0],inspectionStatus:"REVOKED"};
  assert.ok(validate(events,{evidenceRecords:[record]}).errors.some(x=>x.code==="AUDIT_REVIEW_INVALIDATION_EVENT_MISSING"));
});
test("review invalidation before evidence revocation is not sufficient",()=>{
  const events=validEvents();
  events.push(event("E-5","REVIEW_INVALIDATED","COMPLETE","INVALIDATED","2026-11-13T09:04:00.000Z",{reviewId:"REV-1"}));
  events.push(event("E-6","EVIDENCE_REVOKED","ACCEPTED","REVOKED","2026-11-13T09:05:00.000Z"));
  const record={...evidenceRecords[0],inspectionStatus:"REVOKED"};
  assert.ok(validate(events,{evidenceRecords:[record]}).errors.some(x=>x.code==="AUDIT_REVIEW_INVALIDATION_ORDER_INVALID"));
});
test("review invalidation after evidence revocation closes the sequence but not the review gate",()=>{
  const events=validEvents();
  events.push(event("E-5","EVIDENCE_REVOKED","ACCEPTED","REVOKED","2026-11-13T09:04:00.000Z"));
  events.push(event("E-6","REVIEW_INVALIDATED","COMPLETE","INVALIDATED","2026-11-13T09:05:00.000Z",{reviewId:"REV-1"}));
  const record={...evidenceRecords[0],inspectionStatus:"REVOKED"};
  const result=validate(events,{evidenceRecords:[record]});
  assert.equal(result.valid,true);
  assert.equal(result.reviewStatuses[0].status,"INVALIDATED");
});
test("event terminal state must match evidence record state",()=>{
  const events=validEvents();events[2].toState="REJECTED";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVIDENCE_TRANSITION_INVALID"));
});
test("future events fail closed",()=>{
  const events=validEvents();events[3].occurredAt="2026-11-13T12:01:00.000Z";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVENT_FROM_FUTURE"));
});
test("unknown event types fail closed",()=>{
  const events=validEvents();events.push(event("E-5","MAGIC_APPROVED","ACCEPTED","APPROVED","2026-11-13T09:04:00.000Z"));
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVENT_TYPE_UNKNOWN"));
});
test("missing provenance fields fail closed",()=>{
  const events=validEvents();events[0].provenanceRef="";
  assert.ok(validate(events).errors.some(x=>x.code==="AUDIT_EVENT_PROVENANCE_MISSING"));
});
test("duplicate review identifiers are ambiguous",()=>{
  const duplicate=[...reviews,structuredClone(reviews[0])];
  assert.ok(validate(validEvents(),{reviews:duplicate}).errors.some(x=>x.code==="AUDIT_REVIEW_TARGET_AMBIGUOUS"));
});
