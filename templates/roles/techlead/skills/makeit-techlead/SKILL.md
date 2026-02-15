---
name: makeit-techlead
description: Techlead skill — sprint lifecycle management, task breakdown, solution design, code review, story verification, estimation, quality gate verification
---

## Mục đích

Skill này cung cấp expertise cho Agent trong vai trò **Techlead** của team MakeIt. Techlead là cầu nối giữa BA stories và Dev execution — chuyển user stories thành technical tasks, thiết kế giải pháp, review code và verify quality xuyên suốt dự án.

**TL owns Stage 3 (Mode 1)** and **Stage 5 (Mode 2)** trong team workflow:
- **Mode 1:** nhận input từ Stage 2 (BA user stories), sản xuất output cho Stage 4 (Dev FE/BE technical tasks).
- **Mode 2:** nhận code từ Stage 4 (Dev FE/BE), review code, deploy, handoff kết quả cho PO.

**Sprint-based lifecycle:** start-my-tasks → discuss-phase → show-phase-approach → research-phase → plan-phase → execute-phase → verify-phase → verify-work → complete

## Lifecycle

This role follows a 9-stage sprint lifecycle. IDE routes `/makeit:*` commands to workflow routers in `workflows/makeit/`.

### Stage Commands (Primary Interface)

| Stage | Command | Purpose |
|-------|---------|---------|
| Entry | `/makeit:start-my-tasks` | Select tasks from BA handoff (Mode 1) or review Dev handoff (Mode 2) |
| Discuss | `/makeit:discuss-phase` | Gather context via adaptive questioning before planning |
| Approach | `/makeit:show-phase-approach` | Agent proposes approach → user approves before plan |
| Research | `/makeit:research-phase` | Deep research on technical unknowns (optional) |
| Plan | `/makeit:plan-phase` | Create PLAN.md for current phase |
| Execute | `/makeit:execute-phase` | Execute plan tasks using internal TL workflows |
| Verify | `/makeit:verify-phase` | Goal-backward check on phase output + Gate 3 |
| Validate | `/makeit:verify-work` | Validate ALL deliverables against SPECS.md |
| Complete | `/makeit:complete` | Git sync, Lark update, handoff to Dev FE/BE |

> **Stage commands are the primary interface.** Domain workflows are called internally during execute-phase.

### Sprint Management Commands

| Command | Purpose |
|---------|---------|
| `/makeit:add-phase` | Add phase to end of ROADMAP |
| `/makeit:insert-phase` | Insert phase between existing (decimal) |
| `/makeit:remove-phase` | Remove future phase + renumber |
| `/makeit:update-scope` | Update task scope after handoff (sender only) |

### Sub-agents

| Agent | File | Purpose |
|-------|------|---------|
| Researcher | `makeit-tl-researcher.md` | Research architecture, tech unknowns, integration patterns |
| Planner | `makeit-tl-planner.md` | Plan task breakdown order and execution batches |
| Executor | `makeit-tl-executor.md` | Break tasks, design solutions, assign to FE/BE |
| Verifier | `makeit-tl-verifier.md` | Goal-backward verification of TL deliverables |

> Agent definitions live in `.agent/agents/`. Sub-agent spawning is mandatory for complex work — see `_shared/references/sub-agent-spawning.md`. Spawning method rule: `.agent/rules/spawn sub-agents.md`.

## Khi nào dùng

### Stage Commands (Primary — Sprint Lifecycle)

| Signal từ user | Command |
|----------------|---------|
| "Bắt đầu sprint mới" / "Có Lark issue mới" | `/makeit:start-my-tasks` |
| "Discuss phase" / "Cần thảo luận" | `/makeit:discuss-phase` |
| "Approach nào?" / "Đề xuất cách làm" | `/makeit:show-phase-approach` |
| "Research thêm" / "Tìm hiểu trước" | `/makeit:research-phase` |
| "Plan phase tiếp theo" | `/makeit:plan-phase` |
| "Thực thi phase" / "Execute" | `/makeit:execute-phase` |
| "Verify phase" / "Kiểm tra output" | `/makeit:verify-phase` |
| "Validate toàn bộ" | `/makeit:verify-work` |
| "Hoàn thành sprint" / "Handoff" | `/makeit:complete` |

### Sprint Management

| Signal từ user | Command |
|----------------|---------|
| "Thêm phase mới" | `/makeit:add-phase` |
| "Chèn phase khẩn cấp" | `/makeit:insert-phase` |
| "Bỏ phase" / "Xóa phase" | `/makeit:remove-phase` |

### Support Commands

| Signal từ user | Command |
|----------------|---------|
| "Check trạng thái" / "Resume" | `/makeit:status` |
| "Xem commands" | `/makeit:help` |
| "Ghi nhận quyết định" | `/makeit:decide` |
| "Estimate" / "Đánh giá complexity" | `/makeit:estimate` |
| "Lesson learned" | `/makeit:lesson-learned` |
| "Sync scope" / "Cập nhật scope" | `/makeit:sync-scope` |

### Context Management

| Signal từ user | Command |
|----------------|---------|
| "Debug" / "Issue" / "Lỗi" | `/makeit:debug` |
| "Tạm dừng" / "Pause" | `/makeit:pause-work` |
| "Tiếp tục" / "Resume work" | `/makeit:resume-work` |
| "Xem tiến độ" / "Progress" | `/makeit:progress` |

## Skill Domains (8 domains)

### tl-discovery/ — Sprint Entry (1 skill + 1 workflow)

| Skill | Purpose |
|-------|---------|
| `stage-clarify.md` | Select tasks from BA handoff (Mode 1), review Dev handoff (Mode 2), verify gate, create workspace |

**Internal workflows (in `tl-discovery/workflows/`):**
- Discover Existing Features — map existing features affected by sprint, assess impact, document in CODEBASE-SNAPSHOT.md

### tl-planning/ — Phase Preparation (4 skills)

| Skill | Purpose |
|-------|---------|
| `stage-discuss-phase.md` | Adaptive questioning for architecture and tech gray areas |
| `stage-show-phase-approach.md` | Surface Agent's assumptions before planning |
| `stage-research-phase.md` | Deep research via sub-agent |
| `stage-plan-phase.md` | Create PLAN.md with atomic tasks and spawn decisions |

### tl-execution/ — Phase Execution (1 skill + templates + workflows)

| Skill/Template | Purpose |
|----------------|---------|
| `stage-execute-phase.md` | Self-contained execution with 8 internal workflows |
| `templates/task-breakdown.md` | Task breakdown template |
| `templates/architecture-decision.md` | Architecture Decision Record template |
| `templates/code-review.md` | Code review template |
| `templates/estimation-report.md` | Estimation report template |

> **Internal workflows** (break-tasks, design-solution, assign-tasks, review-code, check-gate, self-review, estimate) are documented inline within `stage-execute-phase.md`. `review-code` is also available as a standalone workflow for Mode 2 code review.

**Additional workflows (in `tl-execution/workflows/`):**
- Handle Multi-Story — when BA provides 3+ stories: prioritize, group by domain, identify shared work, create execution phases
- API contracts follow convention-based approach — see `wiki/reference/api-contract-convention.md`

### tl-verification/ — Quality Assurance (2 skills)

| Skill | Purpose |
|-------|---------|
| `stage-verify-phase.md` | Goal-backward check + Gate 3 quality verification |
| `stage-verify-work.md` | Full sprint validation against SPECS.md |

### tl-lifecycle/ — Sprint Lifecycle (4 skills)

| Skill | Purpose |
|-------|---------|
| `stage-complete.md` | Package deliverables, git sync, Dev FE/BE handoff |
| `pause-work.md` | Save sprint context for later resume |
| `resume-work.md` | Restore context from saved state |
| `progress.md` | Detailed sprint progress display |

### tl-management/ — Roadmap Management (3 skills)

| Skill | Purpose |
|-------|---------|
| `stage-add-phase.md` | Append phase to end of roadmap |
| `stage-insert-phase.md` | Insert urgent phase with decimal numbering |
| `stage-remove-phase.md` | Remove future phase + renumber |

### tl-debugging/ — Troubleshooting (1 skill)

| Skill | Purpose |
|-------|---------|
| `debug.md` | Hypothesis-driven debugging for TL-specific issues |

### tl-support/ — Utilities (5 skills)

| Skill | Purpose |
|-------|---------|
| `status.md` | Quick sprint status + next command suggestion |
| `help.md` | Complete command reference (all 20 commands) |
| `decide.md` | Technical decision recording with authority levels |
| `estimate.md` | 7-factor complexity scoring (TL-specific methodology) |
| `lesson-learned.md` | Capture lessons with categorized prevention |

## Templates

### Discovery Templates (tl-discovery/templates/)

| Template | Path | Consuming Workflow |
|----------|------|--------------------|
| Sprint Workspace | `tl-discovery/templates/SPRINT-TEMPLATE.md` | `stage-clarify` — bootstrap instructions |
| State | `tl-discovery/templates/STATE-TEMPLATE.md` | `stage-clarify` — sprint state tracking |
| Specs | `tl-discovery/templates/SPECS-TEMPLATE.md` | `stage-clarify` — sprint specifications |
| Roadmap | `tl-discovery/templates/ROADMAP-TEMPLATE.md` | `stage-clarify` — phase breakdown |
| Codebase Snapshot | `tl-discovery/templates/CODEBASE-SNAPSHOT.md` | `stage-clarify` → `discover-tech-context` |

### Planning Templates (tl-planning/templates/)

| Template | Path | Consuming Workflow |
|----------|------|--------------------|
| Plan | `tl-planning/templates/PLAN-TEMPLATE.md` | `stage-plan-phase` — phase execution plan |
| Context | `tl-planning/templates/CONTEXT-TEMPLATE.md` | `stage-discuss-phase` — phase context decisions |
| Research | `tl-planning/templates/RESEARCH-TEMPLATE.md` | `stage-research-phase` — technical research |

### Execution Templates (tl-execution/templates/)

| Template | Path | Consuming Workflow |
|----------|------|--------------------|
| Task Breakdown | `tl-execution/templates/task-breakdown.md` | `break-tasks` (in stage-execute-phase), `handle-multi-story` |
| Architecture Decision | `tl-execution/templates/architecture-decision.md` | `design-solution` (in stage-execute-phase) |
| Code Review | `tl-execution/templates/code-review.md` | `review-code` (in stage-execute-phase) |
| Estimation Report | `tl-execution/templates/estimation-report.md` | `estimate` (tl-support/estimate.md) |

### Verification Templates (tl-verification/templates/)

| Template | Path | Consuming Workflow |
|----------|------|--------------------|
| Verification Report | `tl-verification/templates/VERIFICATION-REPORT.md` | `stage-verify-phase` — phase verification |

> **Total: 13 templates** — TL role is self-contained with zero `_shared/` template dependencies.

## References

Located in `_shared/references/`:

| Reference | Purpose |
|-----------|---------|
| `quality-gates.md` | Gate 2 ⭐ (Techlead verifies input) + Gate 3 ⭐ (Techlead output) |
| `team-workflow.md` | Stage 3 ⭐ (your stage) — pipeline position and responsibilities |
| `coding-standards.md` | Branch naming, commits, PR checklist, AI review guidelines |
| `sub-agent-spawning.md` | When to spawn vs inline for TL tasks |
| `skills/kb-management/` | Knowledge base CRUD skills (shared) |
| `skills/health-check/` | Workspace health check — broken reference detection (shared) |
| `skills/what-new/` | Framework update assistant — check & apply updates (shared) |

### kb-management/ — Knowledge Base Management (4 skills)

| Skill | Purpose |
|-------|---------|
| `create-doc.md` | `/makeit:create-doc` — Create knowledge document with HITL approval |
| `search-kb.md` | `/makeit:search-kb` — Search knowledge base via Deep Query |
| `update-doc.md` | `/makeit:update-doc` — Update existing knowledge document |
| `archive-doc.md` | `/makeit:archive-doc` — Archive deprecated knowledge document |

> KB skills located at `templates/roles/_shared/skills/kb-management/`. Shared across all roles — installed by `install.sh`.
