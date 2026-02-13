---
sprint-id: "SPRINT-{NNN}"
role: "ba"
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
  Updated by: ALL stage skills
-->

## Current Position

- **Stage:** [clarifying | discussing | planning | executing | verifying | completing]
- **Phase:** [Current phase number] of [Total phases]
- **Phase Name:** [Phase name from ROADMAP.md]
- **Last Action:** [What was done last — e.g., "Completed Figma analysis for login"]

## Phase Progress

| Phase | Name | Status | Started | Completed |
|-------|------|--------|---------|-----------|
| 01 | [Phase name] | [pending/in-progress/complete] | [Date or —] | [Date or —] |
| 02 | [Phase name] | [Status] | [Date or —] | [Date or —] |
| 03 | [Phase name] | [Status] | [Date or —] | [Date or —] |

## BA Progress Tracking

<!-- BA-specific counters for sprint deliverables -->

| Metric | Count | Target | Status |
|--------|-------|--------|--------|
| Stories written | [N] | [Expected] | [On track/Behind/Ahead] |
| Flows documented | [N] | [Expected] | [Status] |
| Edge cases identified | [N] | [—] | [Ongoing] |
| Figma screens analyzed | [N] | [Total screens] | [Status] |
| Gate 2 checks passed | [N/Total] | [All] | [Status] |

## Session Continuity

<!-- Updated at end of each session for context restoration -->

### Last Session Summary
- **Date:** [YYYY-MM-DD]
- **Duration:** [Approximate hours]
- **What was accomplished:** [Key achievements]
- **Next steps:** [What to do next — specific actions]

### Decisions Made
- [Decision 1 — documented in CONTEXT.md or inline]
- [Decision 2]

### Blockers / Open Questions
- [ ] [Blocker 1 — who can resolve]
- [ ] [Open question — escalation path]

## Stage History

<!-- Chronological log of stage transitions -->

| Timestamp | Stage | Action | Notes |
|-----------|-------|--------|-------|
| [YYYY-MM-DD HH:MM] | clarify | Sprint workspace created | Gate 1: PASS |
| [Timestamp] | [Stage] | [Action] | [Notes] |
