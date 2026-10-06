# Methodology Delta — Utility Site List Review — 2026-10-06

**Status:** Research note / methodology-only  
**Authority:** NONE for product/domain decisions  
**Purpose:** Evaluate which tools from the supplied 50-site list can strengthen ScoutSA evidence, research, verification, and presentation workflows without changing the ratified domain or authorizing implementation.

## Verdict

The list contains useful **workflow tools**, but no tool in the list becomes a ScoutSA source of truth or authority.

The strongest reusable pattern is:

> **Discover → Preserve → Verify → Corroborate → Cite → Ratify**

A tool may assist one step without inheriting authority from another.

## 1. HIGH-VALUE: Evidence preservation

### Internet Archive / Wayback Machine

Use for preserving time-sensitive public web evidence such as institutional pages, regulations, public announcements, or research pages.

Important boundary:

**ARCHIVED COPY ≠ PRIMARY AUTHORITY ≠ CURRENT TRUTH**

The archive preserves what was accessible at a point in time. The original authoritative publisher/source remains the authority where applicable.

The Wayback Machine provides Save Page Now and persistent archived URLs for saved pages.

### Archive.today / Archive.ph

Potential secondary preservation route where appropriate.

Same boundary:

**SNAPSHOT ≠ SOURCE AUTHORITY**

Do not treat an archive snapshot as proof that the underlying page was legally authoritative, accurate, or still current.

## 2. HIGH-VALUE: Academic research discovery

### Semantic Scholar

Useful for discovering peer-reviewed literature, citation relationships, related papers, and research terminology.

It explicitly describes itself as an AI-powered academic discovery tool and states that it does not endorse claims made in papers.

ScoutSA rule:

**DISCOVERY ENGINE ≠ EVIDENCE OF CLAIM**

A paper still requires source-level reading, provenance, applicability assessment, and citation.

### Connected Papers

Useful for mapping literature neighborhoods and finding related papers that keyword search may miss.

Boundary:

**SIMILARITY GRAPH ≠ CONSENSUS ≠ TRUTH**

Use it to expand a research search, not to establish a conclusion.

### Consensus / Elicit / similar AI research assistants

Potentially useful for query expansion, literature triage, and identifying candidate papers.

Boundary:

**AI SUMMARY ≠ PRIMARY SOURCE**

Any material proposition entering a ScoutSA research or legal analysis should be traced back to the underlying paper, legislation, institutional source, or other authoritative source.

## 3. HIGH-VALUE WITH SAFETY LIMITS: Security hygiene

### VirusTotal

Useful for checking suspicious external URLs/files during controlled research or development hygiene.

Critical ScoutSA boundary: VirusTotal documentation warns that submitted/query indicators can enter its dataset and be accessible to the community. Therefore:

**NEVER submit ScoutSA personal information, confidential documents, credentials, private URLs, child data, guardian data, or other sensitive material merely for scanning.**

It can be a hygiene tool, not a repository for ScoutSA evidence.

### Have I Been Pwned

Potentially useful for organizational security hygiene, particularly checking an owned domain or authorized account exposure.

Boundary:

**BREACH EXPOSURE ≠ COMPROMISE PROOF OF A SPECIFIC SYSTEM**

Use only with appropriate authorization and without turning personal breach data into ScoutSA domain evidence.

## 4. USEFUL LATER: Image provenance

### TinEye

Potentially valuable once ScoutSA handles player media.

Possible use:
- identify duplicate/reused images;
- investigate whether a supposedly original image appears elsewhere;
- detect modified copies;
- support provenance questions.

Boundary:

**IMAGE MATCH ≠ IDENTITY PROOF ≠ OWNERSHIP PROOF ≠ CONSENT**

TinEye itself describes reverse-image search as finding where images appear and identifying modified versions.

Therefore any match becomes an investigative lead requiring independent verification.

## 5. LOW RISK / SUPPORTING ONLY

### AlternativeTo

Useful for comparing candidate tools and avoiding unnecessary vendor lock-in.

Boundary:

**COMMUNITY RECOMMENDATION ≠ ENGINEERING REQUIREMENT**

It can inform tool selection but cannot determine ScoutSA architecture.

### Carbon / Ray.so / mockup tools

Useful only for presentation:
- pitch decks;
- architecture illustrations;
- stakeholder explanations.

Boundary:

**PRESENTATION ≠ ARCHITECTURE EVIDENCE**

A polished diagram never becomes proof that the underlying system exists.

### JSON formatter / Regex101 / CodeBeautify / ExplainShell

Useful as development aids **after implementation is authorized**.

They must not be used to silently define schema, validation rules, or architecture before the relevant product decisions are ratified.

## 6. Explicit rejects

The following categories should not become part of ScoutSA's evidence workflow merely because they appear on the list:

- paywall-bypass services;
- unauthorized academic-copying sources;
- disposable email;
- temporary file-sharing for evidence;
- self-destructing messages for auditable records;
- untrusted public transformation services for sensitive player/guardian material.

The principle is:

**AUDITABILITY > CONVENIENCE**

## 7. Proposed ScoutSA research-tool hierarchy

For future research:

1. **Primary authoritative source**
2. **Stable preservation copy / archive**
3. **Independent corroborating source**
4. **Academic discovery/search tools**
5. **AI-assisted literature triage**
6. **Human/agent interpretation**
7. **Constitutional ratification**

No tool above can skip the later governance steps.

## 8. Methodology delta

This review supports one reusable addition to ScoutSA methodology:

> **Tool output is evidence about the tool's observation, not automatic evidence of the underlying proposition.**

Therefore every external-tool result should retain, where relevant:

- source URL;
- source publisher;
- tool used;
- observation/result;
- observation timestamp;
- original-source timestamp if known;
- provenance;
- applicability;
- corroboration status;
- confidence/limitations;
- whether the tool result is discovery, preservation, corroboration, or primary evidence.

This is compatible with the ratified distinctions:

**ASSERTION ≠ EVIDENCE**  
**EVIDENCE ≠ VERIFICATION**  
**VERIFICATION ≠ TRUTH**

## 9. Gate impact

No Gate 1 or Gate 2 semantic change is proposed.

No MVP scope change is proposed.

No schema, RLS, API, UI, authentication, storage, or implementation is authorized by this note.

**Authority level: NONE.**

The useful output is a research-tool discipline that can save time without weakening provenance.
