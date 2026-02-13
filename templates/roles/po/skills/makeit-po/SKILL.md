---
name: makeit-po
description: MakeIt Product Owner skill set — GSD-aligned stage skills for sprint-based backlog creation and PR review
---

# MakeIt PO Skill Set

> PO defines vision, provides context for features, and is final authority in review process. Operates in Stage 1 (backlog) and Stage 5 (review).

## Quick Start

```
/makeit:start-sprint   → Start new sprint (detect mode, verify Gate 1)
/makeit:status         → Where am I? What's next?
/makeit:help           → Show all commands
```

## Sprint Lifecycle

```
PO 6-Stage Lifecycle (no discuss/show/research phases):

  start-sprint → plan-phase → execute-phase → verify-phase → verify-work → complete

Dual-Mode Operation:
  Mode 1 (Backlog Creation): Full 6-stage lifecycle
  Mode 2 (PR Review):        start-sprint → execute (review-pr) → complete
```

## Skill Domains

| Domain | Skills | Purpose |
|--------|--------|---------| 
| `po-discovery/` | stage-start-sprint | Sprint entry — detect mode, create workspace, Gate 1 sender check |
| `po-planning/` | stage-plan-phase | Create PLAN.md — business complexity assessment, max 3 tasks |
| `po-execution/` | stage-execute-phase | Execute plans — route to domain workflows (draft-backlog, refine-goal, prepare-sprint) |
| `po-verification/` | stage-verify-phase, stage-verify-work | Phase + sprint verification — goal-backward, Gate 1 sender, quality checks |
| `po-lifecycle/` | stage-complete, pause-work, resume-work | Sprint completion — git sync, BA/Designer handoff, session continuity |
| `po-debugging/` | debug | Systematic debugging — persistent state across context resets |
| `po-support/` | status, help, decide, estimate, lesson-learned | Orientation, decisions, complexity, improvement |
| `kb-management/` | create-doc, search-kb, update-doc, archive-doc | Knowledge base CRUD — create, search, update, archive knowledge documents |
| `_shared/references/` | quality-gates, team-workflow, sub-agent-spawning | Reference docs — gates, pipeline, spawn guide |
| `_shared/skills/` | kb-management/ | Shared KB management skills — installed by `install.sh` |
| `_shared/skills/` | health-check/ | Workspace health check — broken reference detection (shared) |
| `_shared/skills/` | what-new/ | Framework update assistant — check & apply updates (shared) |

## Internal Workflows (called by stage skills, not slash commands)

| Workflow | Location | Called By |
|----------|----------|-----------|
| draft-backlog | `po-execution/workflows/` | stage-execute-phase |
| refine-goal | `po-execution/workflows/` | stage-execute-phase |
| prepare-sprint | `po-execution/workflows/` | stage-execute-phase |
| manage-sprint-goal | `po-execution/workflows/` | stage-execute-phase (on-demand) |
| review-pr | `po-verification/workflows/` | stage-verify-phase, stage-execute-phase |
| check-gate | `po-verification/workflows/` | stage-verify-phase, stage-execute-phase |

## Templates

| Template | Location | Used By |
|----------|----------|---------|
| PLAN-TEMPLATE | `po-planning/templates/` | stage-plan-phase |
| VERIFICATION-REPORT | `po-verification/templates/` | stage-verify-phase |
| ROADMAP-TEMPLATE | `po-discovery/templates/` | stage-start-sprint |
| SPECS-TEMPLATE | `po-discovery/templates/` | stage-start-sprint |
| STATE-TEMPLATE | `po-discovery/templates/` | stage-start-sprint |
| SPRINT-TEMPLATE | `po-discovery/templates/` | stage-start-sprint |
| PRODUCT-CONTEXT | `po-discovery/templates/` | stage-start-sprint |
| backlog-item | `po-execution/templates/` | draft-backlog workflow |
| sprint-plan | `po-execution/templates/` | prepare-sprint workflow |
| review-feedback | `po-verification/templates/` | review-pr workflow |
| handoff | `po-lifecycle/templates/` | stage-complete |

## All Commands (14)

### Stage Commands (6)

| Command | Description |
|---------|-------------|
| `/makeit:start-sprint` | Read Lark Sprint → detect mode → create workspace + verify Gate 1 |
| `/makeit:plan-phase` | Create PLAN.md for current phase |
| `/makeit:execute-phase` | Execute plan tasks with PO domain workflows |
| `/makeit:verify-phase` | Verify phase output — goal-backward + PO quality checks |
| `/makeit:verify-work` | Validate ALL deliverables against SPECS.md |
| `/makeit:complete` | Git sync + BA/Designer handoff + Telegram draft |

### Support Commands (6)

| Command | Description |
|---------|-------------|
| `/makeit:status` | Show sprint state + suggest next action |
| `/makeit:help` | Show all commands |
| `/makeit:decide` | Record a business decision |
| `/makeit:estimate` | Estimate backlog item complexity |
| `/makeit:lesson-learned` | Capture improvement opportunities |
| `/makeit:debug` | Systematic debugging for workflow issues |

### Lifecycle Commands (2)

| Command | Description |
|---------|-------------|
| `/makeit:pause-work` | Save context when pausing mid-phase |
| `/makeit:resume-work` | Restore context from previous pause |

## AI Verification Rule

> ⚠️ AI drafts, PO reads and evaluates. PO is the **final authority** on all business decisions.
> Never auto-approve AI-generated backlog items, sprint plans, or PR review decisions.

## PO Pipeline Position

```
┌──────────────┐
│  ★ PO ★      │    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐
│  + Designer  │───▶│  BA      │───▶│ Techlead │───▶│  FE/BE   │───▶│ ★ Review ★   │
│  (Stage 1)   │    │ (Stage 2)│    │ (Stage 3)│    │ (Stage 4)│    │ PO approve   │
└──────────────┘    └──────────┘    └──────────┘    └──────────┘    │ (Stage 5)    │
                                                                    └──────────────┘
```

**Role boundaries:**
- **Không** ra quyết định technical — delegate cho Techlead
- **Không** viết specs chi tiết — đó là việc của BA
- **Không** assign tasks trực tiếp — Techlead chịu trách nhiệm
