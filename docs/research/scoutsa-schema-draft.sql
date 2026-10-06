-- ScoutSA physical schema draft — 2026-10-06
-- DRAFT ONLY. Do not run against production.
-- Derived from the frozen conceptual/physical table boundary.
-- No unresolved legal or operational policy is encoded here.

create table users (
  id uuid primary key,
  created_at timestamptz not null
);

create table players (
  id uuid primary key,
  created_at timestamptz not null
);

create table guardians (
  id uuid primary key,
  created_at timestamptz not null
);

create table organizations (
  id uuid primary key,
  created_at timestamptz not null
);

create table coaches (
  id uuid primary key,
  created_at timestamptz not null
);

create table scouts (
  id uuid primary key,
  created_at timestamptz not null
);

create table guardian_links (
  id uuid primary key,
  player_id uuid not null references players(id),
  guardian_id uuid not null references guardians(id),
  created_at timestamptz not null
);

create table memberships (
  id uuid primary key,
  player_id uuid not null references players(id),
  organization_id uuid not null references organizations(id),
  created_at timestamptz not null
);

create table assertions (
  id uuid primary key,
  subject_ref text not null,
  context_ref text,
  author_ref text,
  authority_scope_ref text,
  created_at timestamptz not null,
  effective_at timestamptz,
  expires_at timestamptz,
  provenance_ref text
);

create table evidence (
  id uuid primary key,
  subject_ref text not null,
  source_ref text,
  created_at timestamptz not null,
  effective_at timestamptz,
  expires_at timestamptz,
  provenance_ref text
);

create table verifications (
  id uuid primary key,
  subject_ref text not null,
  scope_ref text,
  status text not null,
  created_at timestamptz not null,
  effective_at timestamptz,
  expires_at timestamptz,
  provenance_ref text
);

create table consent_records (
  id uuid primary key,
  subject_ref text not null,
  purpose_ref text not null,
  scope_ref text,
  authorizer_ref text,
  status text not null,
  created_at timestamptz not null,
  effective_at timestamptz,
  expires_at timestamptz,
  provenance_ref text
);

create table media (
  id uuid primary key,
  player_id uuid not null references players(id),
  media_ref text not null,
  purpose_ref text,
  provenance_ref text,
  created_at timestamptz not null
);

create table season_performances (
  id uuid primary key,
  player_id uuid not null references players(id),
  season_ref text not null,
  provenance_ref text,
  created_at timestamptz not null
);

create table academic_profiles (
  id uuid primary key,
  player_id uuid not null references players(id),
  purpose_ref text,
  created_at timestamptz not null
);

create table medical_clearances (
  id uuid primary key,
  player_id uuid not null references players(id),
  purpose_ref text,
  status text not null,
  created_at timestamptz not null,
  expires_at timestamptz
);

create table transport_profiles (
  id uuid primary key,
  player_id uuid not null references players(id),
  created_at timestamptz not null
);

create table opportunities (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  created_at timestamptz not null
);

create table opportunity_applications (
  id uuid primary key,
  player_id uuid not null references players(id),
  opportunity_id uuid not null references opportunities(id),
  status text not null,
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create table outcomes (
  id uuid primary key,
  application_id uuid references opportunity_applications(id),
  outcome_type text not null,
  created_at timestamptz not null,
  provenance_ref text
);

create table child_participation_voice_records (
  id uuid primary key,
  subject_ref text not null,
  matter_ref text not null,
  expression_ref text,
  created_at timestamptz not null,
  provenance_ref text
);

create table safeguarding_cases (
  id uuid primary key,
  subject_ref text not null,
  matter_ref text not null,
  created_at timestamptz not null,
  provenance_ref text
);

create table safeguarding_responses (
  id uuid primary key,
  case_id uuid not null references safeguarding_cases(id),
  response_type text not null,
  created_at timestamptz not null,
  provenance_ref text
);

create table football_readiness (
  id uuid primary key,
  player_id uuid not null references players(id),
  derived_at timestamptz not null,
  derivation_ref text
);

create table opportunity_readiness (
  id uuid primary key,
  player_id uuid not null references players(id),
  opportunity_id uuid not null references opportunities(id),
  derived_at timestamptz not null,
  derivation_ref text
);

create table audit_events (
  id uuid primary key,
  actor_ref text,
  action_ref text not null,
  target_ref text,
  created_at timestamptz not null,
  result_ref text
);

-- Deliberately omitted pending policy decisions:
-- User↔Player cardinality/delegation
-- actor↔Organization affiliation/authorization
-- Guardian conflict precedence and authorizer effect
-- application transition authority/lifecycle vocabulary
-- outcome correction/dispute/supersession policy
-- child-voice legal/operational effects
-- safeguarding escalation authority
-- access/disclosure/RLS
-- retention/deletion
-- provider/authentication/storage choices
