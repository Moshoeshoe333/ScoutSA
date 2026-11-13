"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const audit = require("../audit-history.js");

const FUTURE = "2027-01-01T00:00:00.000Z";
const NOW = "2026-11-13T12:00:00.000Z";
const evidenceRecords = [{
  evidenceRef:"EV-1", versionId:"v1", organizationId:"ORG-1",
  reviewScope:"INVITATION_SAFEGUARDING_REVIEW",
  reviewerId:"REVIEWER-1", authorityId:"AUTH-1"
}];
const reviews = [{
  reviewId:"REV-1", organizationId:"ORG-1",
  scope:"INVITATION_SAFEGUARDING_REVIEW",
  reviewerId:"REVIEWER-1", authorityId:"AUTH-1",
  evidenceRefs:[{evidenceRef:"EV-1",versionId:"v1"}]
}];
function event(eventId, eventType, fromState, toState, occurredAt, extra = {}) {
  return {
    eventId, eventType, fromState, toState, occurredAt,
    actorId:"REVIEWER-1", authorityId:"AUTH-1", organizationId:"ORG-1",
    scope:"INVITATION_SAFEGUARDING_REVIEW", provenanceRef:"SYNTHETIC-EVENT-SOURCE",
    evidenceRef:"EV-1", versionId:"v1", evidenceRefs:[{evidenceRef:"EV-1",versionId:"v1"}], ...extra
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
function validate(events = validEvents(), overrides = {}) {
  return audit.validateAuditHistory({events,evidenceRecords,reviews,now:NOW,...overrides});
}

test("audit-history validator exposes a versioned pure API", () => {
  assert.equal(audit.version,"0.1.0");
  assert.equal(typeof audit.validateAuditHistory,"function");
});
test("ordered evidence lifecycle and review completion validate", () => {
  const result = validate();
  assert.equal(result.valid,true);
  assert.equal(result.eventCount,4);
  assert.equal(result.evidenceVersionCount,1);
  assert.equal(result.reviewCount,1);
});
test("missing event identifiers fail closed", () => {
  const events = validEvents(); events[1].eventId = "";
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_EVENT_ID_MISSING"));
});
test("duplicate event identifiers fail closed", () => {
  const events = validEvents(); events[1].eventId = events[0].eventId;
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_EVENT_ID_DUPLICATE"));
});
test("out-of-order timestamps fail closed", () => {
  const events = validEvents(); events[2].occurredAt = "2026-11-13T08:59:00.000Z";
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_EVENT_ORDER_INVALID"));
});
test("illegal evidence transitions fail closed", () => {
  const events = validEvents(); events[2].fromState = "SUBMITTED";
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_EVIDENCE_TRANSITION_INVALID"));
});
test("unresolved evidence version fails closed", () => {
  const events = validEvents(); events[0].versionId = "missing";
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_EVIDENCE_TARGET_UNRESOLVED"));
});
test("wrong evidence actor or authority fails closed", () => {
  const events = validEvents(); events[1].actorId = "OTHER";
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_EVIDENCE_ACTOR_MISMATCH"));
});
test("review completion after invalidation is rejected", () => {
  const events = validEvents();
  events.splice(3,0,event("E-4","REVIEW_INVALIDATED","COMPLETE","INVALIDATED","2026-11-13T09:02:30.000Z",{reviewId:"REV-1"}));
  events[4].eventId = "E-5";
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_REVIEW_TRANSITION_INVALID"));
});
test("review invalidation is accepted only after completion", () => {
  const events = validEvents();
  events.push(event("E-5","REVIEW_INVALIDATED","COMPLETE","INVALIDATED","2026-11-13T09:04:00.000Z",{reviewId:"REV-1"}));
  assert.equal(validate(events).valid,true);
});
test("unknown event types and future timestamps fail closed", () => {
  const events = validEvents(); events.push(event("E-5","MAGIC_APPROVED","ACCEPTED","APPROVED","2026-11-13T12:01:00.000Z"));
  const result = validate(events);
  assert.ok(result.errors.some(item=>item.code==="AUDIT_EVENT_TYPE_UNKNOWN"));
  assert.ok(result.errors.some(item=>item.code==="AUDIT_EVENT_FROM_FUTURE"));
});
test("missing provenance fields fail closed", () => {
  const events = validEvents(); events[0].provenanceRef = "";
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_EVENT_PROVENANCE_MISSING"));
});

test("review completion requires exact evidence-version links", () => {
  const events = validEvents(); events[3].evidenceRefs = [];
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_REVIEW_EVIDENCE_LINK_MISSING"));
});
test("review cannot complete before its linked evidence is accepted", () => {
  const events = validEvents();
  const acceptance = events.splice(2,1)[0];
  events.splice(3,0,acceptance);
  events[2].occurredAt = "2026-11-13T09:01:30.000Z";
  events[3].occurredAt = "2026-11-13T09:02:00.000Z";
  assert.ok(validate(events).errors.some(item=>item.code==="AUDIT_REVIEW_EVIDENCE_NOT_ACCEPTED"));
});
