"use strict";

/**
 * Filter fictional request fixtures for a URL handoff.
 * No handoff parameters means the ordinary demo queue.
 * Any handoff parameter requires a non-empty player reference; incomplete or
 * unknown references return no records. Opportunity, when supplied, must
 * match exactly.
 */
function filterHandoffRecords(records, options = {}) {
  const source = Array.isArray(records) ? records : [];
  const {
    hasPlayerParam = false,
    hasOpportunityParam = false,
    playerId = null,
    opportunityId = null
  } = options;
  const hasHandoff = hasPlayerParam || hasOpportunityParam;
  if (!hasHandoff) return source.slice();
  if (!hasPlayerParam || typeof playerId !== "string" || playerId.length === 0) return [];
  return source.filter(record =>
    record.playerId === playerId &&
    (!hasOpportunityParam || (typeof opportunityId === "string" && opportunityId.length > 0 && record.opportunityId === opportunityId))
  );
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = filterHandoffRecords;
}
if (typeof window !== "undefined") {
  window.SCOUTSA_FILTER_HANDOFF_RECORDS = filterHandoffRecords;
}
