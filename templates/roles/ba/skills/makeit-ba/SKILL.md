---
name: makeit-ba
description: MakeIt Business Analyst skill set — GSD-aligned stage skills for sprint-based story analysis and delivery
---

# MakeIt BA Skill Set

> BA analyzes PO goals + Designer specs → produces user stories with acceptance criteria for Techlead.

## Quick Start

```
/makeit:start-my-tasks → Start new sprint (select tasks from PO handoff, create workspace)
/makeit:status         → Where am I? What's next?
/makeit:help           → Show all commands
```

## Sprint Lifecycle

```
start-my-tasks → discuss-phase → show-approach → research → plan → execute → verify → verify-work → complete
   ↑                        (optional)     (optional)                  ↑
   └── Gate 1 (input)                                          Gate 2 (output) ──┘
```

## Skill Catalogue

### ba-discovery/ — Sprint Entry
| Skill | Command | Purpose |
|-------|---------|---------|
| `stage-clarify.md` | `/makeit:start-my-tasks` | Select tasks from PO handoff, verify Gate 1, create workspace |

### ba-planning/ — Phase Preparation
| Skill | Command | Purpose |
|-------|---------|---------|
| `stage-plan-phase.md` | `/makeit:plan-phase` | Create PLAN.md with tasks for current phase |
| `stage-discuss-phase.md` | `/makeit:discuss-phase` | Gather context via adaptive questioning |
| `stage-show-phase-approach.md` | `/makeit:show-phase-approach` | View Agent's assumptions before planning |
| `stage-research-phase.md` | `/makeit:research-phase` | Deep research via sub-agent (optional) |

### ba-execution/ — Phase Execution
| Skill | Command | Purpose |
|-------|---------|---------|
| `stage-execute-phase.md` | `/makeit:execute-phase` | Execute plan tasks with internal BA workflows |

**Internal workflows (extracted to `ba-execution/workflows/`):**
- Analyze Design (Figma MCP) → Figma analysis report
- Write User Stories → Stories with acceptance criteria
- Document User Flow → Flow documentation
- Identify Edge Cases → Edge case analysis

> ⚠️ **Traceability requirement:** Every user story MUST include a traceability block linking PO Goal ↔ Figma ↔ Expected TL Tasks. See `stage-execute-phase.md` → `ensure_traceability` step.

### ba-verification/ — Quality Assurance
| Skill | Command | Purpose |
|-------|---------|---------|
| `stage-verify-phase.md` | `/makeit:verify-phase` | Goal-backward check + Gate 2 quality |
| `stage-verify-work.md` | `/makeit:verify-work` | Validate ALL sprint deliverables |

### ba-lifecycle/ — Sprint Completion & Context
| Skill | Command | Purpose |
|-------|---------|---------|
| `stage-complete.md` | `/makeit:complete` | Package, git sync, handoff to Techlead |
| `pause-work.md` | `/makeit:pause-work` | Save context for later resume |
| `resume-work.md` | `/makeit:resume-work` | Restore context from saved state |
| `progress.md` | — | Sprint progress with deliverable status |

### ba-management/ — Roadmap Management
| Skill | Command | Purpose |
|-------|---------|---------|
| `stage-add-phase.md` | `/makeit:add-phase` | Add phase to end of roadmap |
| `stage-insert-phase.md` | `/makeit:insert-phase` | Insert urgent phase (decimal) |
| `stage-remove-phase.md` | `/makeit:remove-phase` | Remove future phase + renumber |
| `update-scope.md` | `/makeit:update-scope` | Update task scope after handoff (sender only) |

### ba-support/ — Utility Operations
| Skill | Command | Purpose |
|-------|---------|---------|
| `status.md` | `/makeit:status` | Sprint progress + next action |
| `help.md` | `/makeit:help` | Show available commands |
| `decide.md` | `/makeit:decide` | Document a decision with rationale |
| `estimate.md` | `/makeit:estimate` | Story complexity assessment |
| `lesson-learned.md` | `/makeit:lesson-learned` | Capture lesson learned |
| `sync-scope.md` | `/makeit:sync-scope` | Pull scope changes from upstream sender |

### ba-debugging/ — Troubleshooting
| Skill | Command | Purpose |
|-------|---------|---------|
| `debug.md` | `/makeit:debug` | Systematic debugging with state tracking |

### kb-management/ — Knowledge Base Management
| Skill | Command | Purpose |
|-------|---------|---------| 
| `create-doc.md` | `/makeit:create-doc` | Create knowledge document with HITL approval |
| `search-kb.md` | `/makeit:search-kb` | Search knowledge base via Deep Query |
| `update-doc.md` | `/makeit:update-doc` | Update existing knowledge document |
| `archive-doc.md` | `/makeit:archive-doc` | Archive deprecated knowledge document |

> KB skills located at `templates/roles/_shared/skills/kb-management/`. Shared across all roles — installed by `install.sh`.

### _shared/ — Shared Resources
| Resource | Purpose |
|----------|---------|
| `references/quality-gates.md` | Gate 1 (input) + Gate 2 (output) checklists |
| `references/figma-mcp.md` | Figma MCP tool usage reference |
| `references/team-workflow.md` | 5-stage pipeline + source of truth |
| `references/sub-agent-spawning.md` | BA sub-agent spawning guide — when and how to delegate work |
| `skills/kb-management/` | Knowledge base CRUD skills (shared) |
| `skills/health-check/` | Workspace health check — broken reference detection (shared) |
| `skills/whats-new/` | Framework update assistant — check & apply updates (shared) |

## Templates

| Template | Location | Used By |
|----------|----------|---------|
| User Story | `ba-execution/templates/user-story.md` | write-stories workflow |
| User Flow | `ba-execution/templates/user-flow.md` | document-flow workflow |
| Figma Analysis | `ba-execution/templates/figma-analysis.md` | analyze-design workflow |
| Edge Cases | `ba-execution/templates/EDGE-CASES-TEMPLATE.md` | identify-edges workflow |
| Spec Verification | `ba-verification/templates/spec-verification.md` | stage-clarify (Gate 1) |
| Verification Report | `ba-verification/templates/VERIFICATION-REPORT.md` | stage-verify-phase |
| Plan | `ba-planning/templates/PLAN-TEMPLATE.md` | stage-plan-phase |
| Context | `ba-planning/templates/CONTEXT-TEMPLATE.md` | stage-discuss-phase |
| Research | `ba-planning/templates/RESEARCH-TEMPLATE.md` | stage-research-phase |
| Handoff | `ba-lifecycle/templates/handoff.md` | stage-complete |
| ROADMAP | `ba-discovery/templates/ROADMAP-TEMPLATE.md` | stage-clarify |
| SPECS | `ba-discovery/templates/SPECS-TEMPLATE.md` | stage-clarify |
| STATE | `ba-discovery/templates/STATE-TEMPLATE.md` | stage-clarify |
| Sprint Workspace | `ba-discovery/templates/SPRINT-TEMPLATE.md` | stage-clarify |
| Product Context | `ba-discovery/templates/PRODUCT-CONTEXT.md` | stage-clarify |

## Pipeline Position

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐
│  PO +    │───▶│   ★ BA ★     │───▶│  Techlead    │───▶│  FE/BE   │───▶│  TL Code     │───▶│  PO Review   │
│ Designer │    │  (Stage 2)   │    │  (Stage 3)   │    │ (Stage 4)│    │  Review      │    │  (Stage 6)   │
│ (Stage 1)│    └──────────────┘    │  Mode 1      │    └──────────┘    │  (Stage 5)   │    └──────────────┘
└──────────┘                        └──────────────┘                    └──────────────┘
```

**Input:** PO Goal + Context, Designer Specs (Figma "Ready for Dev")
**Output:** User Stories + AC, User Flows, Edge Cases → Techlead handoff
