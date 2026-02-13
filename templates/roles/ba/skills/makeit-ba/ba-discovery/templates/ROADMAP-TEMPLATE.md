---
sprint-id: "SPRINT-{NNN}"
total-phases: 0
current-phase: 0
---

# Sprint Roadmap

<!-- 
  This file breaks the sprint into phases.
  Each phase follows the plan→execute→verify loop.
  
  Created by: stage-clarify (from ROADMAP-TEMPLATE.md)
  Updated by: stage-plan-phase (marks phases as started)
  Updated by: stage-complete (marks phases as complete)
  
  The orchestrator reads this to:
  - Determine which phase to work on next
  - Track overall sprint progress
  - Know when all phases are done
-->

## Phases

| Phase | Name | Goal | Deliverables | Status |
|-------|------|------|-------------|--------|
| 01 | [Phase name] | [What this phase delivers] | [Output file type(s)] | pending |
| 02 | [Phase name] | [Phase goal] | [Deliverables] | pending |
| 03 | [Phase name] | [Phase goal] | [Deliverables] | pending |

<!-- Status values: pending | in-progress | complete | skipped -->

## Phase Dependencies

```
Phase 01 → Phase 02 → Phase 03
```

<!-- Show which phases depend on which. BA typically runs sequentially. -->

---

## BA Phase Examples

BA sprints typically follow this 3-phase pattern:

**Phase 1: Design Analysis**
- Deliverables: Figma analysis report(s) — `ANALYSIS-{feature}.md`
- Workflow: analyze-design
- Input: Figma "Ready for Dev" screens

**Phase 2: Story Creation**
- Deliverables: User stories — `US-NNN-{feature}.md`, User flows — `FLOW-{feature}.md`
- Workflow: write-stories, document-flow
- Input: Phase 1 Figma analysis

**Phase 3: Quality Assurance**
- Deliverables: Edge case analysis, Gate 2 verification report
- Workflow: identify-edges, stage-verify-work
- Input: Phase 2 stories and flows

### BA Deliverable Types Reference

| Type | Template | File Convention |
|------|----------|----------------|
| Figma Analysis | `ba-execution/templates/figma-analysis.md` | `ANALYSIS-{feature}.md` |
| User Story | `ba-execution/templates/user-story.md` | `US-NNN-{feature}.md` |
| User Flow | `ba-execution/templates/user-flow.md` | `FLOW-{feature}.md` |
| Edge Cases | `ba-execution/templates/EDGE-CASES-TEMPLATE.md` | `EDGES-{feature}.md` |
| Handoff | `ba-lifecycle/templates/handoff.md` | `HANDOFF.md` |

## Notes

- Each phase has its own folder: `phases/{NN}-{name}/`
- Only deliverables/ folder gets committed to git
- Adjust phase count based on sprint complexity (1-5 phases typical)
