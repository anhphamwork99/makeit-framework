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

<!-- 
  Typically 2-4 phases per sprint.
  Each phase = plan→execute→verify loop.
  Order matters — phases may depend on previous ones.
  
  Format: - [ ] Phase N: {name} — {goal, 1 line}
  When complete: - [x] Phase N: {name} — {goal, 1 line}
-->

- [ ] Phase 1: {name} — {goal, 1 line}
- [ ] Phase 2: {name} — {goal, 1 line}
- [ ] Phase 3: {name} — {goal, 1 line}

<!-- 
  TL phase breakdown guidelines:
  - Phase 1 is typically "Story Analysis & Task Breakdown" — verify BA stories, decompose into FE/BE tasks
  - Middle phases handle "Solution Design & API Contracts" — architecture decisions, API specs
  - Last phase is typically "Estimation & Assignment" — effort estimation, assign to FE/BE devs
  - Keep phases small enough for 1 session (aim for 1-3 plans per phase)
  - Each phase should produce independently verifiable deliverables
-->

## Current Position

<!-- Updated by orchestrator at each phase transition -->

- **Phase:** 0 of {total-phases}
- **Status:** pre-planning

<!-- 
  Status values: pre-planning → active → complete
  Phase 0 = not started, all phases pending
-->

## Phase Completion Log

<!-- Filled as phases complete. Provides audit trail and velocity tracking. -->

| Phase | Name | Plans | Started | Completed | Duration |
|-------|------|-------|---------|-----------|----------|
| — | — | — | — | — | — |

<!-- 
  Example completed row:
  | 1 | Task Breakdown | 2 | 2026-02-10 | 2026-02-10 | 25 min |
-->

## Dependencies

<!-- 
  Optional: Note any cross-phase dependencies.
  Most sprints have linear phases, but document if Phase 3 needs Phase 1 output.
  
  TL-specific: API contracts from Solution Design phase are needed by Task Assignment phase.
-->

- Phase 1 → Phase 2 (sequential — Phase 2 builds on Phase 1 output)

## Notes

<!-- Sprint-level notes that apply across all phases -->

- Each phase produces working output — no "setup only" phases
- If a phase fails verification, fix within the same phase before proceeding
- Max 1 retry per phase, then escalate
- FE and BE tasks should be independently executable after TL breakdown
- API contracts must be agreed upon before task assignment
