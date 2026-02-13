---
sprint-id: "SPRINT-{NNN}"
title: "{Sprint title from Lark}"
role: "po"
mode: "{backlog-creation|pr-review}"
created: "{YYYY-MM-DD}"
---

# Sprint Specifications

<!-- 
  This file captures WHAT needs to be delivered in this sprint.
  
  Created by: stage-start-sprint (from SPECS-TEMPLATE.md)
  Source: Lark Sprint issue content + upstream context
  
  The orchestrator reads this to:
  - Understand what deliverables are expected
  - Break down into phases (ROADMAP.md)
  - Verify completion against success criteria
-->

## Goal

<!-- Extract this from the Lark Sprint issue description -->
<!-- Answer: What is the business outcome of this sprint? -->
<!-- PO Goal must answer WHY — not WHAT or HOW -->

{From Lark Sprint issue — what is the business outcome?}

## Context

<!-- Background information needed to execute this sprint -->
<!-- Include: business rationale, user needs, market context, constraints -->

{Background, constraints, business rationale, user needs}

### Mode

<!-- PO operating mode — determines lifecycle and deliverable types -->

**Mode:** {Mode 1 — Backlog Creation / Mode 2 — PR Review}

**Mode 1 — Backlog Creation (Stage 1):**
- Full 6-stage lifecycle: start-sprint → plan → execute → verify → verify-work → complete
- Deliverables: backlog items, refined goals, acceptance criteria, sprint plan

**Mode 2 — PR Review (Stage 5):**
- Streamlined lifecycle: start-sprint → execute (review-pr) → complete
- Deliverables: review feedback, approve/reject decisions

### Upstream Input

<!-- What context is available for this sprint? -->
<!-- PO is Stage 1 — no upstream handoff, but may have stakeholder input -->

- **From:** {Stakeholder / Market research / User feedback}
- **Context:** {description of what triggered this sprint}
- **Reference:** {link to research, feedback, or Lark issue}

## Deliverables

<!-- List ALL expected outputs with enough detail to verify completion -->
<!-- Each deliverable should be checkable — clear format, destination, and definition of done -->

- [ ] {deliverable-1} — {description, format, destination}
- [ ] {deliverable-2} — {description, format, destination}
- [ ] {deliverable-3} — {description, format, destination}

<!-- 
  PO Deliverable Examples:
  
  Mode 1 — Backlog Creation:
  - "Backlog items for auth feature — TASK-NNN-{name}.md in deliverables/"
  - "Sprint plan with prioritized items — SPRINT-PLAN-NNN.md in deliverables/"
  - "Refined goals with SMART criteria — updated in backlog items"
  - "Gate 1 sender self-check — verification report"
  
  Mode 2 — PR Review:
  - "PR review feedback — REVIEW-{pr-id}.md in deliverables/"
  - "Approve/reject decision with business rationale"
  - "Follow-up tasks for any overridden decisions"
-->

## Success Criteria

<!-- Specific, checkable conditions that must ALL be true for sprint to be complete -->
<!-- These are VERIFIED by stage-verify-phase and stage-complete -->

1. {criterion-1 — specific, checkable}
2. {criterion-2 — specific, checkable}
3. {criterion-3 — specific, checkable}

<!-- 
  Good criteria examples (PO-specific):
  - "All backlog items have ≥3 checkable acceptance criteria"
  - "Priority rationale documented for each item with business justification"
  - "Gate 1 sender items 3-5 all pass (goal, context, priority)"
  - "Sprint plan has clear sequencing based on dependencies"
  - "PR review references original user story and AC for each finding"
  
  Bad criteria examples:
  - "Backlog looks good" (too vague)
  - "Items are prioritized" (not checkable — what's the standard?)
-->

## References

<!-- Links to source materials and context -->
<!-- The orchestrator and sub-agents use these for context -->

- **Lark Sprint Issue:** {link or ID}
- **Figma:** {link if applicable, or "N/A — PO does not own design"}
- **Designer Status:** {Ready for Dev / In Progress / Not Started}
- **Stakeholder Input:** {link to research, feedback, or meeting notes}
- **Related Issues:** {links to related Lark issues}

## Acceptance Notes

<!-- Any additional notes on what "done" means for THIS specific sprint -->
<!-- Include edge cases, out-of-scope items, and quality expectations -->

{Any notes on what "done" means for this sprint}

### Priority Framework

<!-- Document how priorities are assigned in this sprint -->

- **P1 (Must-have):** {Criteria for P1 — business-critical, blocking}
- **P2 (Should-have):** {Criteria for P2 — important, can defer if needed}
- **P3 (Nice-to-have):** {Criteria for P3 — if capacity allows}

### Out of Scope

<!-- Explicitly list what is NOT included in this sprint -->
<!-- Prevents scope creep during execution -->

- {item explicitly excluded}
- {item deferred to future sprint}
