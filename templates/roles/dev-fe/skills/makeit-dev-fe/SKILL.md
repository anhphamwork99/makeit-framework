---
name: makeit-dev-fe
description: Dev FE skill — sprint lifecycle management, Figma-driven implementation, UI comparison, quality assurance, PR delivery
---

## Mục đích

Skill này cung cấp expertise cho Agent trong vai trò **Frontend Developer** của team MakeIt. Dev FE biến Figma designs thành giao diện thực tế — implement UI components, handle interaction states, đảm bảo responsive behavior, và deliver production-ready code.

**Dev FE owns Stage 4** trong team workflow: nhận input từ Stage 3 (Techlead technical tasks), sản xuất output cho Stage 5 (TL Code Review).

**Sprint-based lifecycle:** start-my-tasks → discuss → approach → research → plan → execute → verify → validate → complete

> ⚠️ **STOP Mechanism:** AI PHẢI dừng trước bất kỳ destructive operation (delete, overwrite, force push). Xem `@rules/makeit-dev-fe.md`.

## Lifecycle

This role follows a 9-stage sprint lifecycle. IDE routes `/makeit:*` commands to workflow routers which invoke stage skills.

### Stage Commands (Primary Interface)

| Stage | Command | Purpose |
|-------|---------|---------|
| Entry | `/makeit:start-my-tasks` | Select FE tasks from TL handoff, create focused workspace |
| Discuss | `/makeit:discuss-phase` | Gather FE context via adaptive questioning |
| Approach | `/makeit:show-phase-approach` | Surface Agent assumptions for user approval |
| Research | `/makeit:research-phase` | Deep research — Figma analysis, library evaluation (optional) |
| Plan | `/makeit:plan-phase` | Create PLAN.md with component-focused tasks |
| Execute | `/makeit:execute-phase` | Execute plan — implement components, compare UI |
| Verify | `/makeit:verify-phase` | Goal-backward + Gate 4 + self-review + compare-UI |
| Validate | `/makeit:verify-work` | Validate all deliverables against SPECS.md |
| Complete | `/makeit:complete` | PR creation + Designer/Techlead handoff |

> **Stage commands are the primary interface.** Internal workflows are called during execute-phase and verify-phase.

### Sprint Management Commands

| Command | Purpose |
|---------|---------|
| `/makeit:add-phase` | Add phase to end of ROADMAP |
| `/makeit:insert-phase` | Insert urgent phase (decimal numbering) |
| `/makeit:remove-phase` | Remove future pending phase + renumber |

### Support Commands

| Command | Purpose |
|---------|---------|
| `/makeit:status` | Quick sprint status check |
| `/makeit:help` | List all commands |
| `/makeit:decide` | Record implementation decision |
| `/makeit:estimate` | Assess task complexity |
| `/makeit:lesson-learned` | Record lesson for future sessions |

### Context Management Commands

| Command | Purpose |
|---------|---------|
| `/makeit:pause-work` | Save context for later resume |
| `/makeit:resume-work` | Restore context from previous session |
| `/makeit:progress` | Detailed progress with deliverable status |

### Debugging

| Command | Purpose |
|---------|---------|
| `/makeit:debug` | Systematic hypothesis-driven debugging |

### Sub-agents (spawned for complex work)

| Agent | Purpose |
|-------|---------|
| FE Researcher | Research Figma design context, patterns, library evaluation |
| FE Planner | Plan component implementation order and batches |
| FE Executor | Implement components, states, responsive behavior |
| FE Verifier | Goal-backward verification of FE implementation quality |

> Agent definitions in `.agent/agents/`. Spawning decisions: `@_shared/references/sub-agent-spawning.md`.

## Skill Domains

### fe-discovery/ — Sprint Entry (1 skill)

| Skill | Purpose |
|-------|---------|
| `stage-clarify.md` | Gate 3 verification, workspace creation, SPECS + ROADMAP |

> `stage-clarify.md` is invoked via `/makeit:start-my-tasks` command.

### fe-planning/ — Phase Preparation (4 skills)

| Skill | Purpose |
|-------|---------|
| `stage-discuss-phase.md` | Adaptive questioning for FE implementation context |
| `stage-show-phase-approach.md` | Surface assumptions for user approval |
| `stage-research-phase.md` | Deep research with sub-agent spawning |
| `stage-plan-phase.md` | Create PLAN.md with component tasks |

### fe-execution/ — Phase Execution (1 stage + 2 workflows)

| Skill | Purpose |
|-------|---------|
| `stage-execute-phase.md` | Route tasks to internal workflows, manage STOP |
| `workflows/implement.md` | Figma → code implementation |
| `workflows/compare-ui.md` | Visual comparison against Figma |

### fe-verification/ — Quality Assurance (2 stages + 2 workflows)

| Skill | Purpose |
|-------|---------|
| `stage-verify-phase.md` | Goal-backward + Gate 4 + self-review |
| `stage-verify-work.md` | Sprint deliverable validation vs SPECS.md |
| `workflows/self-review.md` | Code quality self-review |
| `workflows/check-gate.md` | Formal Gate 4 checklist |

### fe-lifecycle/ — Sprint Lifecycle (1 stage + 2 workflows + 3 utilities)

| Skill | Purpose |
|-------|---------|
| `stage-complete.md` | PR creation, handoff, git sync |
| `workflows/create-pr.md` | PR with self-review evidence, STOP before push |
| `workflows/fix-feedback.md` | Address review comments |
| `pause-work.md` | Save sprint context |
| `resume-work.md` | Restore sprint context |
| `progress.md` | Detailed sprint progress display |

### fe-management/ — Roadmap Management (3 skills)

| Skill | Purpose |
|-------|---------|
| `stage-add-phase.md` | Append phase to ROADMAP |
| `stage-insert-phase.md` | Insert decimal phase |
| `stage-remove-phase.md` | Remove future phase + renumber |

### fe-debugging/ — Troubleshooting (1 skill)

| Skill | Purpose |
|-------|---------|
| `debug.md` | Hypothesis-driven FE debugging |

### fe-support/ — Utility Commands (5 skills)

| Skill | Purpose |
|-------|---------|
| `status.md` | Quick status check + routing |
| `help.md` | Command reference |
| `decide.md` | Record implementation decision |
| `estimate.md` | Assess task complexity |
| `lesson-learned.md` | Capture lessons |
| `sync-scope.md` | Pull scope changes from upstream TL |

### kb-management/ — Knowledge Base Management (4 skills)

| Skill | Purpose |
|-------|---------| 
| `create-doc.md` | `/makeit:create-doc` — Create knowledge document with HITL approval |
| `search-kb.md` | `/makeit:search-kb` — Search knowledge base via Deep Query |
| `update-doc.md` | `/makeit:update-doc` — Update existing knowledge document |
| `archive-doc.md` | `/makeit:archive-doc` — Archive deprecated knowledge document |

> KB skills located at `templates/roles/_shared/skills/kb-management/`. Shared across all roles — installed by `install.sh`.

## Templates

### Discovery Templates (5)

| Template | Location | Used by |
|----------|----------|---------| 
| Roadmap | `fe-discovery/templates/ROADMAP-TEMPLATE.md` | stage-clarify |
| Sprint Specs | `fe-discovery/templates/SPECS-TEMPLATE.md` | stage-clarify |
| Sprint State | `fe-discovery/templates/STATE-TEMPLATE.md` | stage-clarify |
| Sprint Workspace | `fe-discovery/templates/SPRINT-TEMPLATE.md` | stage-clarify |
| Codebase Snapshot | `fe-discovery/templates/CODEBASE-SNAPSHOT.md` | stage-clarify (optional) |

### Planning Templates (3)

| Template | Location | Used by |
|----------|----------|---------| 
| Phase Plan | `fe-planning/templates/PLAN-TEMPLATE.md` | stage-plan-phase |
| Phase Context | `fe-planning/templates/CONTEXT-TEMPLATE.md` | stage-discuss-phase |
| Phase Research | `fe-planning/templates/RESEARCH-TEMPLATE.md` | stage-research-phase |

### Execution Templates (2)

| Template | Location | Used by |
|----------|----------|---------| 
| Implementation Plan | `fe-execution/templates/implementation-plan.md` | implement workflow |
| UI Comparison | `fe-execution/templates/UI-COMPARISON-TEMPLATE.md` | compare-ui workflow |

### Verification Templates (2)

| Template | Location | Used by |
|----------|----------|---------| 
| Verification Report | `fe-verification/templates/VERIFICATION-REPORT.md` | stage-verify-phase |
| Self-Review Checklist | `fe-verification/templates/self-review-checklist.md` | self-review workflow |

### Lifecycle Templates (2)

| Template | Location | Used by |
|----------|----------|---------| 
| PR Description | `fe-lifecycle/templates/pr-description.md` | create-pr workflow |
| Handoff Document | `fe-lifecycle/templates/handoff.md` | stage-complete |

## References

| Reference | Location | Purpose |
|-----------|----------|---------| 
| Quality Gates | `_shared/references/quality-gates.md` | Gate 3 (input) + Gate 4 (output) |
| Team Workflow | `_shared/references/team-workflow.md` | Stage 4 pipeline position |
| Coding Standards | `_shared/references/coding-standards.md` | Branch naming, commits, PR |
| Figma MCP | `_shared/references/figma-mcp.md` | Figma MCP tools for implementation |
| Sub-agent Spawning | `_shared/references/sub-agent-spawning.md` | When to spawn sub-agents |
| KB Management | `_shared/skills/kb-management/` | Knowledge base CRUD skills (shared) |
| Health Check | `_shared/skills/health-check/` | Workspace health check — broken reference detection (shared) |
| What's New | `_shared/skills/what-new/` | Framework update assistant — check & apply updates (shared) |

## Pipeline Position

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  PO +    │───▶│    BA    │───▶│ Techlead │───▶│  ★ Dev FE ★  │───▶│  TL Code     │───▶│  PO Review   │
│ Designer │    │ (Stage 2)│    │ (Stage 3)│    │  (Stage 4)   │    │  Review      │    │  (Stage 6)   │
│ (Stage 1)│    └──────────┘    └──────────┘    └──────────────┘    │  (Stage 5)   │    └──────────────┘
└──────────┘                                                        └──────────────┘
```
