"use strict";

/**
 * Read-only projection of the synthetic review-engine result into user-facing
 * workflow stages. This module does not mutate records, advance states, make
 * decisions, authorize disclosure or initiate contact.
 */
const EVIDENCE_KEYS = Object.freeze([
  "organization_identity",
  "representative_authority",
  "passport_reference",
  "membership_linkage",
  "opportunity_source",
  "opportunity_eligibility"
]);
const SAFEGUARDING_KEYS = Object.freeze([
  "age_safe_route",
  "guardian_authority",
  "player_voice",
  "purpose_consent",
  "safeguarding_review"
]);

function summarizeGateGroup(evaluation, keys) {
  if (!evaluation || !Array.isArray(evaluation.gates)) {
    return {
      status: "UNAVAILABLE — HOLD",
      tone: "hold",
      detail: "A valid synthetic evaluation is not available. No progression is possible."
    };
  }
  const selected = keys.map(key => evaluation.gates.find(g => g && g.key === key));
  if (selected.some(g => !g)) {
    return {
      status: "INCOMPLETE — HOLD",
      tone: "hold",
      detail: "One or more required review checks are missing from the evaluation result."
    };
  }
  const failed = selected.filter(g => g.state === "FAIL");
  const skipped = selected.filter(g => g.state === "SKIPPED");
  const unknown = selected.filter(g => !["PASS", "FAIL", "SKIPPED"].includes(g.state));
  if (failed.length || unknown.length) {
    const names = failed.map(g => g.label);
    const detail = names.length
      ? "Blocking checks not satisfied: " + names.join(", ") + "."
      : "One or more review checks returned an unrecognized state.";
    return {
      status: "HOLD — BLOCKERS PRESENT",
      tone: "hold",
      detail: detail + (skipped.length ? " Some dependent checks were skipped because prerequisites were not met." : "")
    };
  }
  if (skipped.length) {
    return {
      status: "WAITING — PREREQUISITES NOT MET",
      tone: "waiting",
      detail: "Dependent checks remain skipped: " + skipped.map(g => g.label).join(", ") + "."
    };
  }
  return {
    status: "CHECKS PASS — SYNTHETIC ONLY",
    tone: "pass",
    detail: "All checks in this group passed in the fictional demonstration. This is not independent verification or approval."
  };
}

function deriveReviewStages(evaluation) {
  if (!evaluation || !Array.isArray(evaluation.gates)) return [];
  const evidence = summarizeGateGroup(evaluation, EVIDENCE_KEYS);
  const safeguarding = summarizeGateGroup(evaluation, SAFEGUARDING_KEYS);
  const readinessIsConsistent = evaluation.allBlockingGatesSatisfied === true
    && evidence.tone === "pass"
    && safeguarding.tone === "pass";
  const disposition = evaluation.disposition === "READY_FOR_SEPARATE_HUMAN_REVIEW" && readinessIsConsistent
    ? {
        status: "ELIGIBLE FOR SEPARATE HUMAN REVIEW",
        tone: "waiting",
        detail: "The synthetic evaluator found no blocking gate failure. No human review has occurred and this is not approval, selection or an invitation."
      }
    : evaluation.disposition === "HOLD" || evaluation.disposition === "READY_FOR_SEPARATE_HUMAN_REVIEW"
      ? {
          status: "NOT READY — HOLD",
          tone: "hold",
          detail: "The synthetic evaluator reports a hold. A human must not treat this screen as a decision or permission to proceed."
        }
      : {
          status: "UNAVAILABLE — HOLD",
          tone: "hold",
          detail: "The evaluator disposition is missing or unrecognized. No progression is permitted."
        };

  return [
    {
      key: "request",
      label: "Request record",
      status: "FICTIONAL FIXTURE — NOT SUBMITTED",
      tone: "info",
      detail: "A static sample record is being viewed. Nothing was received from a player, guardian or organization."
    },
    {
      key: "evidence",
      label: "Authority and evidence review",
      ...evidence
    },
    {
      key: "safeguarding",
      label: "Safeguarding review",
      ...safeguarding
    },
    {
      key: "human-review",
      label: "Separate human review",
      ...disposition
    },
    {
      key: "outcome",
      label: "Final decision and outcome",
      status: "NO DECISION RECORDED",
      tone: "info",
      detail: "No accept, decline, selection, trial, placement or registration decision is recorded by this prototype."
    },
    {
      key: "disclosure",
      label: "Disclosure and contact",
      status: "PROHIBITED — NOT IMPLEMENTED",
      tone: "prohibited",
      detail: "The evaluator never authorizes disclosure. This static demonstration cannot share Passport data, media or contact details."
    }
  ];
}

const api = Object.freeze({ deriveReviewStages, summarizeGateGroup });
if (typeof module !== "undefined" && module.exports) module.exports = api;
if (typeof window !== "undefined") window.SCOUTSA_REVIEW_STATE = api;
