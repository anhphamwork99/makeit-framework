---
sprint-id: "SPRINT-{NNN}"
title: "{Sprint title from Lark}"
role: "techlead"
created: "{YYYY-MM-DD}"
---

# Sprint Specifications

<!-- 
  This file captures WHAT needs to be delivered in this sprint.
  
  Created by: stage-clarify (from SPECS-TEMPLATE.md)
  Source: Lark Sprint issue content + BA stories handoff (Gate 2)
  
  The orchestrator reads this to:
  - Understand what deliverables are expected
  - Break down into phases (ROADMAP.md)
  - Verify completion against success criteria
-->

## Goal

<!-- Extract this from the Lark Sprint issue description -->
<!-- Answer: What is the business outcome of this sprint? -->

{From Lark Sprint issue — what is the business outcome?}

## Context

<!-- Background information needed to execute this sprint -->
<!-- Include: constraints, dependencies from upstream role (BA), technical context -->

{Background, constraints, dependencies from BA stories}

### Upstream Input (Gate 2 — BA → Techlead)

<!-- What was handed off from BA? Verify Gate 2 checklist passed.
     - User stories with acceptance criteria (≥3 per story)
     - Figma design links attached and accessible
     - Edge cases documented (empty, error, boundary)
     - Dependencies identified and status confirmed
-->

- **From:** BA (Business Analyst)
- **Handoff:** {User stories, acceptance criteria, Figma links, edge cases}
- **Gate 2 Status:** {PASSED/FAILED — with details if failed}
- **Reference:** {link to BA handoff document or Lark issue}

### Codebase Context

<!-- Reference to CODEBASE-SNAPSHOT.md created during clarify -->
- **Codebase Snapshot:** `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md`
- **Tech Stack:** {key technologies from snapshot}
- **Existing Patterns:** {relevant patterns from snapshot}

## Deliverables

<!-- List ALL expected outputs with enough detail to verify completion -->
<!-- TL deliverables: task breakdowns, API contracts, architecture decisions, estimations -->

- [ ] {FE task breakdown} — FE tasks with Figma references, committed to deliverables/
- [ ] {BE task breakdown} — BE tasks with API specs, committed to deliverables/
- [ ] {API contracts} — FE↔BE coordination specs, committed to deliverables/
- [ ] {Estimation report} — effort estimation with risk factors, committed to deliverables/
- [ ] {Architecture decisions} — ADRs for significant technical decisions (if needed)

## Success Criteria

<!-- Specific, checkable conditions that must ALL be true for sprint to be complete -->
<!-- These are VERIFIED by stage-verify-phase and stage-complete -->

1. {criterion-1 — e.g., "All stories broken into FE and BE tasks with clear scope"}
2. {criterion-2 — e.g., "API contracts defined for every FE↔BE coordination point"}
3. {criterion-3 — e.g., "Effort estimated with methodology and risk factors"}
4. {criterion-4 — e.g., "Dev FE and Dev BE can work independently using deliverables"}

<!-- 
  TL-specific good criteria examples:
  - "All tasks have clear scope, acceptance criteria, and estimated effort"
  - "API contracts include request/response schema, error codes, auth requirements"
  - "Architecture decisions documented with rationale and alternatives considered"
  
  Bad criteria examples:
  - "Code works" (too vague — TL doesn't write code)
  - "Tasks look good" (not checkable)
-->

## References

<!-- Links to source materials and upstream artifacts -->
<!-- The orchestrator and sub-agents use these for context -->

- **Lark Sprint Issue:** {link or ID}
- **BA Handoff:** {link to BA deliverables — stories, flows, edge cases}
- **Figma:** {link to design files}
- **Related Issues:** {links to related Lark issues}
- **Existing ADRs:** {links to relevant architecture decision records}

## Acceptance Notes

<!-- Any additional notes on what "done" means for THIS specific sprint -->
<!-- Include edge cases, out-of-scope items, and quality expectations -->

{Any notes on what "done" means for this sprint}

### Out of Scope

<!-- Explicitly list what is NOT included in this sprint -->
<!-- Prevents scope creep during execution -->

- {item explicitly excluded — e.g., "DevOps/CI pipeline changes"}
- {item deferred to future sprint — e.g., "Performance optimization"}

### Quality Expectations

<!-- TL-specific quality bar -->

- All task breakdowns follow the task-breakdown template
- API contracts follow the api-contract-convention
- Estimations include risk factors and buffer allocation
- Architecture decisions include alternatives considered
