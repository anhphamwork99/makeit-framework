---
sprint-id: "SPRINT-{NNN}"
role: "dev-be"
status: "clarifying"
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
  
  Created by: stage-clarify (from STATE-TEMPLATE.md)
  Updated by: all stage commands (clarify, plan-phase, execute-phase, verify-phase, complete)
-->

## Sprint Info

- **Sprint ID:** {SPRINT-NNN}
- **Role:** Dev BE
- **Started:** {YYYY-MM-DD}
- **Lark Sprint Issue:** {LARK-SPRINT-ID or link}
- **Status:** clarifying

<!-- Statuses: clarifying → planning → executing → verifying → complete -->

## Current Position

- **Phase:** {0} of {total-phases}
- **Stage:** clarifying
- **Last Activity:** {YYYY-MM-DD HH:MM} — {description of what happened}

<!-- 
  The orchestrator reads this section to route to the correct stage command.
  Update this EVERY time a stage transition happens.
  
  Stage values: clarifying, planning, executing, verifying, complete
-->

## SPECS Summary

<!-- 
  Brief deliverables summary extracted from SPECS.md during clarify stage.
  Orchestrator uses this for quick reference without re-reading SPECS.md.
-->

- [ ] {API contract} — {brief description}
- [ ] {DB schema/migration} — {brief description}
- [ ] {API implementation} — {brief description}
- [ ] {Tests} — {brief description}

## Phase Progress

<!-- 
  Updated by orchestrator as phases progress.
  Each phase goes through: pending → planning → executing → verifying → complete
-->

| Phase | Name | Status | Plans | Started | Completed |
|-------|------|--------|-------|---------|-----------|
| 1 | {phase-name} | pending | 0 | — | — |

<!-- Add rows as phases are created from ROADMAP.md -->

## BE Progress Tracking

<!-- BE-specific progress columns -->

| Metric | Count | Status |
|--------|-------|--------|
| Endpoints implemented | 0 / {total} | — |
| Migrations created | 0 / {total} | — |
| Tests written | 0 / {total} | — |
| Security audit | — | pending |
| API docs updated | — | pending |

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

## ⚠️ STOP Log

<!-- 
  Track any STOP mechanism activations during this sprint.
  Used for audit and learning.
-->

| # | Operation | Phase | Decision | Date |
|---|-----------|-------|----------|------|
| — | — | — | — | — |

<!-- 
  Example: 
  | 1 | DROP TABLE legacy_users | Phase 2 | Confirmed by TL — data migrated | 2026-02-15 |
-->
