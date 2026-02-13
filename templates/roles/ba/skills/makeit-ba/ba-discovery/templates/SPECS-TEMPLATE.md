---
sprint-id: "SPRINT-{NNN}"
title: "{Sprint title from Lark}"
role: "ba"
created: "{YYYY-MM-DD}"
---

# Sprint Specifications

<!-- 
  This file captures WHAT needs to be delivered in this sprint.
  
  Created by: stage-clarify (from SPECS-TEMPLATE.md)
  Source: Lark Sprint issue content + upstream handoff
  
  The orchestrator reads this to:
  - Understand what deliverables are expected
  - Break down into phases (ROADMAP.md)
  - Verify completion against success criteria
-->

## Sprint Goal

[1-2 sentences — the business outcome this sprint achieves]

## Source

- **Lark Sprint Issue:** [LARK-ID or link]
- **PO Handoff:** [Link to PO handoff doc or "verbal"]
- **Figma:** [Main Figma design link(s)]

## Deliverables

| # | Deliverable | Type | Template | Status |
|---|-------------|------|----------|--------|
| 1 | [Deliverable name] | [Story/Flow/Analysis/Edge Cases] | [Template path] | pending |
| 2 | [Deliverable name] | [Type] | [Template] | pending |
| 3 | [Deliverable name] | [Type] | [Template] | pending |

### BA Deliverable Expectations

- **User Stories:** Follow `user-story.md` format — "As a [role], I want [action], so that [benefit]"
- **Acceptance Criteria:** ≥3 checkable items per story — specific, measurable, testable
- **User Flows:** Follow `user-flow.md` format — happy path + alternative paths + error flows
- **Figma Analysis:** Follow `figma-analysis.md` format — component hierarchy, interaction states, data requirements
- **Edge Cases:** Follow `EDGE-CASES-TEMPLATE.md` — 5-category systematic analysis

## Success Criteria

<!-- Each criterion is checkable. Used by verify-phase and verify-work. -->

- [ ] SC1: [PO goal-aligned criterion — e.g., "All PO goals mapped to at least one story"]
- [ ] SC2: [Quality criterion — e.g., "All stories have ≥3 checkable AC"]
- [ ] SC3: [Completeness criterion — e.g., "User flows documented for all features"]
- [ ] SC4: [Edge case criterion — e.g., "Edge cases documented for all story sets"]
- [ ] SC5: [Design criterion — e.g., "Figma links attached to all stories"]
- [ ] SC6: [Gate criterion — e.g., "Gate 2 verification passes"]

## Traceability Matrix

<!-- Every PO goal must map to at least one story. Stories without goals = scope creep. -->

| PO Goal | Expected Stories | Expected TL Tasks | Figma Ref |
|---------|-----------------|-------------------|-----------| 
| [Goal 1 from PO handoff] | US-001, US-002 | FE: 2, BE: 3 | [Figma link] |
| [Goal 2 from PO handoff] | US-003 | FE: 1, BE: 1 | [Figma link] |

## Constraints

- [Constraint 1 — timeline, dependency, or scope limit]
- [Constraint 2 — from Lark issue or PO handoff]

## References

- **Figma:** [Figma project link]
- **Lark:** [Lark Sprint issue link]
- **PO Goal Doc:** [Link or reference]
- **Related Sprints:** [Prior sprint IDs if building on existing work]
