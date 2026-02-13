# Knowledge Document Template

<!--
  ╔══════════════════════════════════════════════════════════════════════╗
  ║  KNOWLEDGE DOCUMENT CONVENTION TEMPLATE                             ║
  ║                                                                      ║
  ║  This template defines the structure for ALL knowledge documents     ║
  ║  in the MakeIt Product Memory System.                                ║
  ║                                                                      ║
  ║  3-Layer Progressive Disclosure:                                     ║
  ║                                                                      ║
  ║    L0 — METADATA (YAML frontmatter)                                  ║
  ║         Indexed in INDEX.md. ~100 tokens.                            ║
  ║         AI reads this to know WHAT exists.                           ║
  ║         Fields: id, title, type, category, status, dates, author,    ║
  ║         sprint, tags, supersedes, superseded_by, related, confidence ║
  ║                                                                      ║
  ║    L1 — SUMMARY (Summary + Key Points sections)                      ║
  ║         AI reads this for 70% understanding. ~200-400 tokens/doc.    ║
  ║         Structured blockquote format for quick scanning.             ║
  ║                                                                      ║
  ║    L2 — DETAIL (Full content sections)                               ║
  ║         Only loaded when AI needs 100% understanding.                ║
  ║         Sections vary by document type (see knowledge-taxonomy.md).  ║
  ║                                                                      ║
  ║  Usage:                                                              ║
  ║    1. Copy this template to the appropriate category folder          ║
  ║    2. Fill in the YAML frontmatter (all 14 fields required)          ║
  ║    3. Write Summary in blockquote format (Decision/Rule/Lesson)      ║
  ║    4. Add Key Points as bullet list                                  ║
  ║    5. Fill Detail sections appropriate for the document type         ║
  ║    6. Run /makeit:create-doc or manually update INDEX.md             ║
  ║                                                                      ║
  ║  File naming: {type}-{NNN}-{kebab-title}.md                          ║
  ║  Example: adr-001-auth-strategy.md, lesson-003-n-plus-one.md         ║
  ╚══════════════════════════════════════════════════════════════════════╝
-->

## Template

```markdown
---
# === METADATA (L0 — indexed in INDEX.md) ===
id: ""                              # Unique identifier: {type}-{NNN} (e.g., "adr-001", "lesson-003")
title: ""                           # Human-readable title (e.g., "Authentication Strategy")
type: ""                            # adr | rule | api | schema | lesson | pattern | glossary | journey | feature | debt | issue | integration | component | module | system-map
category: ""                        # architecture | business | technical | operational
status: ""                          # draft | proposed | accepted | deprecated | superseded
created: ""                         # ISO date: YYYY-MM-DD
updated: ""                         # ISO date: YYYY-MM-DD
author: ""                          # Role identifier: po | ba | techlead | dev-fe | dev-be
sprint: ""                          # Originating sprint: SPRINT-NNN
tags: []                            # Searchable keywords: ["auth", "security", "shopify"]
supersedes: ""                      # ID of superseded doc (empty if none)
superseded_by: ""                   # ID of doc that supersedes this (empty if none)
related: []                         # Cross-references by ID: ["api-003", "schema-002"]
confidence: ""                      # high | medium | low — how validated is this knowledge
---

# {Title}

<!-- === SUMMARY (L1 — AI reads this for 70% understanding) === -->

## Summary

> **Decision/Rule/Lesson:** [One-sentence statement of what was decided, established, or learned]
> **Context:** [Why this decision/rule/lesson exists — the problem or situation]
> **Impact:** [How this affects the system, team, or process]

## Key Points

- [Most important point]
- [Second key point]
- [Third key point]
- [Additional points as needed]

<!-- === DETAIL (L2 — Full content for complete understanding) === -->

## Context

[Full context description — the problem, constraints, business requirements, technical limitations.
This section answers: WHY did we need to make this decision / document this knowledge?]

<!-- 
  The remaining L2 sections vary by document type.
  Choose the appropriate sections from the list below based on your document type.
  
  === ADR (Architecture Decision Record) ===
  ## Decision
  ## Alternatives Considered (table: Alternative | Pros | Cons | Why Rejected)
  ## Consequences (Positive, Negative, Risks)
  ## Implementation Notes
  
  === Business Rule ===
  ## Rule Definition
  ## Business Rationale
  ## Implementation Requirements
  ## Exceptions
  
  === Lesson Learned ===
  ## Root Cause Analysis
  ## What We Did Wrong
  ## What To Do Instead
  ## Impact (time lost, fix effort)
  
  === API Contract ===
  ## Endpoint Definition (method, path, auth)
  ## Request Schema
  ## Response Schema
  ## Error Codes
  ## Examples
  
  === Data Schema ===
  ## Table/Model Definition
  ## Field Descriptions
  ## Relationships
  ## Indexes
  ## Migration Notes
  
  === Pattern Library Entry ===
  ## Pattern Description
  ## When To Use
  ## When NOT To Use
  ## Implementation (code examples)
  ## Known Issues
  
  === Integration Point ===
  ## Service Overview
  ## Authentication
  ## Key Endpoints Used
  ## Rate Limits
  ## Error Handling
  
  === Feature Evolution ===
  ## Current State
  ## Planned Changes
  ## Rationale
  ## Dependencies
  
  === Tech Debt Item ===
  ## Current State (what's wrong)
  ## Desired State (what should be)
  ## Effort Estimate
  ## Priority Rationale
  
  === Known Issue ===
  ## Issue Description
  ## Reproduction Steps
  ## Workaround
  ## Root Cause (if known)
  ## Fix Priority
  
  === User Journey ===
  ## Journey Steps (numbered flow)
  ## Pain Points
  ## Key Decision Points
  ## Metrics
  
  === Domain Glossary ===
  ## Terms (table: Term | Definition | Vietnamese | Context)
  
  === Frontend Component Map ===
  ## Component Tree
  ## Props Interface
  ## State Management
  ## Styling Approach
  
  === Module Registry ===
  ## Module Purpose
  ## Public API
  ## Dependencies
  ## Configuration
  
  === System Map ===
  ## Architecture Diagram (Mermaid/ASCII)
  ## Component Descriptions
  ## Data Flow
  ## Integration Points
-->
```

## Field Reference

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `id` | ✅ | Unique identifier `{type}-{NNN}` | `adr-001` |
| `title` | ✅ | Human-readable title | `Authentication Strategy` |
| `type` | ✅ | Document type from taxonomy | `adr` |
| `category` | ✅ | One of 4 categories | `architecture` |
| `status` | ✅ | Document lifecycle status | `accepted` |
| `created` | ✅ | Creation date (ISO) | `2026-02-15` |
| `updated` | ✅ | Last update date (ISO) | `2026-02-15` |
| `author` | ✅ | Role of creator | `techlead` |
| `sprint` | ✅ | Originating sprint | `SPRINT-005` |
| `tags` | ✅ | Searchable keywords | `["auth", "security"]` |
| `supersedes` | ⬜ | ID of replaced doc | `adr-001-v1` |
| `superseded_by` | ⬜ | ID of replacing doc | `adr-002` |
| `related` | ⬜ | Cross-reference IDs | `["api-003"]` |
| `confidence` | ✅ | Validation level | `high` |

## Status Lifecycle

```
draft → proposed → accepted → deprecated/superseded
                                    ↓
                              _archived/ folder
```

- **draft** — Work in progress, not yet reviewed
- **proposed** — Ready for review, pending approval
- **accepted** — Approved and active knowledge
- **deprecated** — No longer current, but not replaced
- **superseded** — Replaced by another doc (see `superseded_by`)

## Confidence Levels

| Level | Meaning | When to Use |
|-------|---------|-------------|
| **high** | Validated through implementation and/or team consensus | ADRs after implementation, tested patterns |
| **medium** | Based on research or partial validation | New decisions, untested recommendations |
| **low** | Hypothesis or early-stage knowledge | Initial observations, unverified lessons |
