---
sprint-id: "SPRINT-{NNN}"
role: "po"
mode: "{backlog-creation|pr-review}"
status: "starting"
current-phase: 0
total-phases: 0
created: "{YYYY-MM-DD}"
updated: "{YYYY-MM-DD}"
lark-issue: "{LARK-SPRINT-ID or 'manual'}"
---

# Sprint State

<!-- 
  This file is the orchestrator's memory.
  It is READ at every stage transition to determine where we are.
  It is UPDATED after every stage completes.
  
  Created by: stage-start-sprint (from STATE-TEMPLATE.md)
  Updated by: all stage commands (start-sprint, plan-phase, execute-phase, verify-phase, complete)
-->

## Sprint Info

- **Sprint ID:** {SPRINT-NNN}
- **Role:** PO
- **Mode:** {Backlog Creation / PR Review}
- **Started:** {YYYY-MM-DD}
- **Lark Sprint Issue:** {LARK-SPRINT-ID or link}
- **Status:** starting

<!-- 
  Statuses: starting → planning → executing → verifying → complete
  PO dual-mode affects which stages are used:
  - Mode 1 (Backlog Creation): All 6 stages
  - Mode 2 (PR Review): start-sprint → executing → complete (skip planning/verifying)
-->

## Current Position

- **Phase:** {0} of {total-phases}
- **Stage:** starting
- **Last Activity:** {YYYY-MM-DD HH:MM} — {description of what happened}

<!-- 
  The orchestrator reads this section to route to the correct stage command.
  Update this EVERY time a stage transition happens.
  
  Stage values: starting, planning, executing, verifying, complete
-->

## SPECS Summary

<!-- 
  Brief deliverables summary extracted from SPECS.md during start-sprint stage.
  Orchestrator uses this for quick reference without re-reading SPECS.md.
-->

- [ ] {deliverable-1} — {brief description}
- [ ] {deliverable-2} — {brief description}
- [ ] {deliverable-3} — {brief description}

## PO Tracking

<!-- PO-specific state fields — updated as work progresses -->

### Backlog Items

| # | Item | Goal (1-line) | Priority | Status |
|---|------|---------------|----------|--------|
| 1 | {TASK-NNN} | {business goal} | {P1/P2/P3} | {draft/reviewed/final} |

### Goals Defined

- [ ] Sprint goal defined with SMART criteria
- [ ] Sub-goals identified (if sprint goal was split)
- [ ] Acceptance criteria standard set

### PR Reviews (Mode 2 only)

| # | PR | Story Reference | Decision | Status |
|---|-----|----------------|----------|--------|
| 1 | {PR-ID} | {US-NNN} | {approve/reject/changes} | {pending/complete} |

### Gate Status

- **Gate 1 Sender (items 3-5):** {pending / passed / failed}
- **Gate 5 (if Mode 2):** {pending / passed / failed}

## Phase Progress

<!-- 
  Updated by orchestrator as phases progress.
  Each phase goes through: pending → planning → executing → verifying → complete
-->

| Phase | Name | Status | Plans | Started | Completed |
|-------|------|--------|-------|---------|-----------|
| 1 | {phase-name} | pending | 0 | — | — |

<!-- Add rows as phases are created from ROADMAP.md -->

## Sub-agent History

<!-- 
  Tracks all sub-agents spawned during this sprint.
  Used for context continuity and debugging.
  Updated by orchestrator after each HITL spawn completes.
-->

| # | Type | Phase | Description | Status | Date | Output |
|---|------|-------|-------------|--------|------|--------|
| 1 | {researcher/planner/executor/verifier} | {phase#} | {what was spawned for} | {pending/complete} | {date} | {output file path} |

<!-- Types: researcher, planner, executor, verifier -->

## Decisions

<!-- 
  Sprint-scoped decisions made during execution.
  Captured for context and audit trail.
  Updated by orchestrator when decisions are made via /makeit:decide.
-->

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| 1 | {decision description} | {why this was decided} | {YYYY-MM-DD} |

## Blockers

<!-- 
  Any blockers encountered during the sprint.
  Resolved blockers move to Decisions with resolution rationale.
-->

None yet.
