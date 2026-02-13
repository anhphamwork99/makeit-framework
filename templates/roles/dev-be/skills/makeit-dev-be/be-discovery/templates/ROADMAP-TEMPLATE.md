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
  BE typical phase examples:
  - [ ] Phase 1: API Design — design API contracts and database schema
  - [ ] Phase 2: Implementation — implement models, migrations, services, controllers
  - [ ] Phase 3: Testing & Security — integration tests, security audit, Gate 4

  Guidelines for phase breakdown:
  - Each phase should be independently verifiable
  - Phase 1 is usually "API Design" or "Schema Design"
  - Middle phases are "Implementation" (layer by layer)
  - Last phase is usually "Testing" or "Security Audit"
  - Keep phases small enough for 1 session (aim for 1-3 plans per phase)
  
  BE layer ordering within phases:
  models → migrations → services → controllers → tests → docs
-->

## BE Deliverable Types

<!-- Reference for what each phase might produce -->

| Deliverable | Format | Destination |
|-------------|--------|-------------|
| API Contract | Markdown | deliverables/API-CONTRACT-{feature}.md |
| Schema Design | Markdown | deliverables/SCHEMA-{feature}.md |
| Migration files | Code | src/migrations/ or db/migrations/ |
| API endpoints | Code | src/controllers/ or src/routes/ |
| Service layer | Code | src/services/ |
| Integration tests | Code | tests/integration/ |
| API documentation | Markdown | deliverables/ or docs/api/ |

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
  | 1 | API Design | 1 | 2026-02-10 | 2026-02-10 | 15 min |
  | 2 | Implementation | 2 | 2026-02-10 | 2026-02-11 | 45 min |
-->

## Dependencies

<!-- 
  Optional: Note any cross-phase dependencies.
  Most sprints have linear phases, but document if Phase 3 needs Phase 1 output.
  
  BE-specific: Note FE dependencies (API contract handoff)
-->

- Phase 1 → Phase 2 (sequential — Schema design feeds implementation)
- Phase 1 → FE (parallel — API contract shared at Sync Point 1)

## Notes

<!-- Sprint-level notes that apply across all phases -->

- Each phase produces working output — no "setup only" phases
- If a phase fails verification, fix within the same phase before proceeding
- Max 1 retry per phase, then escalate
- ⚠️ Flag destructive migrations for STOP mechanism review
- API contracts shared with FE at earliest opportunity (Sync Point 1)
