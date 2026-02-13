---
sprint-id: "SPRINT-{NNN}"
total-phases: 0
current-phase: 0
---

# Sprint Roadmap

<!-- 
  This file breaks the sprint into phases.
  Each phase follows the plan→execute→verify loop.
  
  Created by: stage-start-sprint (from ROADMAP-TEMPLATE.md)
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
  Guidelines for phase breakdown:
  - Each phase should be independently verifiable
  - Phase 1 is usually "foundation" or "setup"
  - Last phase is usually "integration" or "polish"
  - Keep phases small enough for 1 session (aim for 1-3 plans per phase)
-->

<!-- 
  PO Phase Examples by Mode:
  
  Mode 1 — Backlog Creation:
  - Phase 1: Goal Refinement — refine goals, define acceptance criteria standard
  - Phase 2: Backlog Drafting — create backlog items with templates, set priorities
  - Phase 3: Sprint Preparation — prioritize items, create sprint plan, Gate 1 check
  
  Mode 2 — PR Review:
  - Phase 1: PR Context — load PR, user story, original PO goal
  - Phase 2: Business Logic Review — verify logic, AC met, edge cases
-->

<!-- 
  PO Deliverable Types:
  - Backlog items (TASK-NNN-{feature}.md)
  - Sprint plans (SPRINT-PLAN-{sprint}.md)
  - PR review feedback (REVIEW-{pr-id}.md)
  - Goal definitions (updated in backlog items)
  - Gate verification reports (GATE-{N}-CHECK.md)
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
  | 1 | Goal Refinement | 1 | 2026-02-15 | 2026-02-15 | 15 min |
-->

## Dependencies

<!-- 
  Optional: Note any cross-phase dependencies.
  Most sprints have linear phases, but document if Phase 3 needs Phase 1 output.
-->

- Phase 1 → Phase 2 (sequential — Phase 2 builds on Phase 1 output)

## Notes

<!-- Sprint-level notes that apply across all phases -->

- Each phase produces working output — no "setup only" phases
- If a phase fails verification, fix within the same phase before proceeding
- Max 1 retry per phase, then escalate
- PO dual-mode: Mode 1 (Backlog Creation) uses all phases; Mode 2 (PR Review) uses 1-2 phases
- AI Verification: PO must review phase outputs before marking complete
