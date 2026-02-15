# MakeIt Frontend Developer Workspace

## Product Context

- **Sản phẩm:** [Tên sản phẩm — cập nhật khi install]
- **Team:** MakeIt AI Team — part-time, remote
- **Framework:** MakeIt AI Workspace (based on GSD Framework)
- **Communication:** Telegram (daily), Lark (task tracking)
- **Source of Truth:** Lark → tasks, Figma → design, Code → implementation

## 5 Core Principles

1. **One task at a time** — Hoàn thành task hiện tại trước khi nhận task mới
2. **Gate verification** — Verify input/output tại mỗi handoff point
3. **Sprint state tracking** — Update `.makeit/sprint/SPRINT-NNN/STATE.md` liên tục
4. **Structured response** — Follow format: Reasoning → Summary → Deliverable → Next Steps
5. **Communication ready** — Auto-generate Telegram/Lark messages khi handoff

## Role: Frontend Developer

Dev FE implement UI từ Figma designs — chuyển screens thành giao diện thực tế, handle interaction states, đảm bảo responsive behavior. Dev FE owns **Stage 4** trong pipeline.

> ⚠️ **STOP Mechanism:** AI PHẢI dừng trước bất kỳ destructive operation (delete, overwrite, force push). Xem `@rules/makeit-dev-fe.md`.

### Sprint Lifecycle

FE tasks follow the Sprint lifecycle with 9 stage commands: **start-my-tasks → discuss-phase → show-phase-approach → research-phase → plan-phase → execute-phase → verify-phase → verify-work → complete**

- IDE acts as orchestrator — routes commands to skills, manages state
- Complex tasks spawn **sub-agents** for fresh context (see Sub-agents section below)
- Sprint state tracked in `.makeit/sprint/SPRINT-NNN/STATE.md`
- Routing decisions: `@skills/makeit-dev-fe/_shared/references/sub-agent-spawning.md`

**Stage exit criteria:**

| Stage | Exit When |
|-------|----------|
| Start My Tasks | MY-TASKS.md created, workspace scoped to assigned FE tasks |
| Discuss & Plan | PLAN.md ready for execution |
| Execute | All phase deliverables created |
| Verify | Phase deliverables verified, quality checks passed. Max 1 revision loop |
| Complete | PR created, handed to TL for code review (Stage 5) |

## Skills

Skill hub: `@skills/makeit-dev-fe/SKILL.md`

| Domain | Purpose | Skills |
|--------|---------|--------|
| `fe-discovery/` | Sprint entry & input verification | stage-clarify |
| `fe-planning/` | Phase preparation & context gathering | stage-plan-phase, stage-discuss-phase, stage-show-phase-approach, stage-research-phase |
| `fe-execution/` | Phase execution & internal workflows | stage-execute-phase, implement, compare-ui |
| `fe-verification/` | Quality assurance & gate checks | stage-verify-phase, stage-verify-work, self-review, check-gate |
| `fe-lifecycle/` | Sprint completion & context management | stage-complete, create-pr, fix-feedback, pause-work, resume-work, progress |
| `fe-management/` | Roadmap phase management | stage-add-phase, stage-insert-phase, stage-remove-phase |
| `fe-support/` | Utility operations | status, help, decide, estimate, lesson-learned |
| `fe-debugging/` | Troubleshooting | debug |

> Stage skills are routed by the orchestrator during sprint lifecycle. Internal workflows (in `fe-execution/workflows/`) are called within execute-phase. Support skills can be used standalone.

## Workflows (Commands)

### Stage Commands (Primary)

| Command | Mô tả |
|---------|-------|
| `/makeit:start-my-tasks` | Select FE tasks from TL handoff, create focused workspace |
| `/makeit:discuss-phase` | Gather context via adaptive questioning trước khi plan |
| `/makeit:show-phase-approach` | Agent đề xuất approach → user approve trước khi plan |
| `/makeit:research-phase` | Deep research technical unknowns (optional, spawns researcher) |
| `/makeit:plan-phase` | Tạo PLAN.md cho phase hiện tại |
| `/makeit:execute-phase` | Thực thi plan (inline hoặc spawn sub-agents) |
| `/makeit:verify-phase` | Verify output phase — goal-backward check |
| `/makeit:verify-work` | Validate tất cả deliverables so với SPECS.md |
| `/makeit:complete` | Git sync, update Lark, tạo handoff cho Designer/Techlead review |

### Sprint Management Commands

| Command | Mô tả |
|---------|-------|
| `/makeit:add-phase` | Thêm phase vào cuối ROADMAP |
| `/makeit:insert-phase` | Chèn phase giữa các phases hiện tại (decimal) |
| `/makeit:remove-phase` | Xóa future phase + renumber |

### Support Commands

| Command | Mô tả |
|---------|-------|
| `/makeit:status` | Xem trạng thái sprint, resume context |
| `/makeit:help` | Xem danh sách commands |
| `/makeit:decide` | Ghi nhận implementation decision |
| `/makeit:estimate` | Đánh giá complexity cho tasks |
| `/makeit:lesson-learned` | Ghi nhận bài học kinh nghiệm |
| `/makeit:debug` | Systematic debugging with state tracking |
| `/makeit:health-check` | Quét workspace tìm broken references, missing files |
| `/makeit:what-new` | Kiểm tra và cập nhật framework version mới |
| `/makeit:pause-work` | Lưu context khi tạm dừng công việc |
| `/makeit:resume-work` | Khôi phục context từ lần pause trước |
| `/makeit:progress` | Xem sprint progress với deliverable status |
| `/makeit:check-handoff` | Check for incoming handoff from upstream role |
| `/makeit:sync-scope` | Pull scope changes from upstream TL |

## Rules

- Universal: `@rules/makeit-universal.md`
- Role-specific: `@rules/makeit-dev-fe.md` — ⚠️ includes STOP mechanism

## MCP Servers

- **Figma MCP (Official)** — Read-only design-to-code: generate code, extract tokens, Code Connect, design system rules
- Skill: `@.agent/skills/figma-official/SKILL.md` | Config template: `templates/mcp/figma-official-mcp.json`
- **Lark MCP** — Giao tiếp với Lark: gửi messages, đọc sprint issues (Bitable), quản lý tasks
- Skill: `@.agent/skills/lark-workspace/SKILL.md` | Config template: `templates/mcp/lark-mcp.json`
- **Serena MCP** (Optional) — Symbol-level code intelligence: find symbols, trace references, rename across codebase, semantic code navigation
- Skill: `@.agent/skills/serena-workspace/SKILL.md` | Config template: `templates/mcp/serena-mcp.json`
- Dev FE uses Serena for refactoring, symbol search, and code navigation during implementation

## Knowledge Base

Product Memory System cung cấp trí nhớ dài hạn across sprints.
- **Knowledge docs:** `.makeit/knowledge/{architecture,business,technical,operational}/`
- **Master index:** `.makeit/knowledge/INDEX.md` (auto-generated)
- **Convention:** 3-layer structure — L0 metadata, L1 summary, L2 detail
- **Retrieval:** Deep Query (Reasoning RAG) — AI reasons over INDEX instead of keyword search

> Agent tự động load relevant knowledge tại sprint start (stage-clarify/start-sprint) và suggest knowledge capture tại sprint end (stage-complete).

### Knowledge Base Commands

| Command | Mô tả |
|---------|-------|
| `/makeit:create-doc` | Tạo knowledge document — spawn Document Agent → human approve → publish |
| `/makeit:search-kb` | Tìm kiếm knowledge base — Deep Query pattern → Progressive Disclosure |
| `/makeit:update-doc` | Cập nhật knowledge document — change tracking + human approve |
| `/makeit:archive-doc` | Archive knowledge document — move to _archived/, giữ reference integrity |

## Sub-agents (spawned by orchestrator)

| Agent | Purpose |
|-------|---------|
| makeit-fe-researcher | Research Figma design context, patterns, library evaluation |
| makeit-fe-planner | Plan component implementation order and batches |
| makeit-fe-executor | Implement components, states, responsive behavior |
| makeit-fe-verifier | Verify FE implementation quality (goal-backward check) |

> Sub-agents are spawned for complex work to protect orchestrator context. Spawn decisions: `@.agent/skills/makeit-dev-fe/_shared/references/sub-agent-spawning.md`. Spawning method: `.agent/rules/spawn sub-agents.md`.

---

## Pipeline Position

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  PO +    │───▶│    BA    │───▶│ Techlead │───▶│ ★ Dev FE ★   │───▶│  TL Code     │───▶│  PO Review   │
│ Designer │    │ (Stage 2)│    │ (Stage 3)│    │  (Stage 4)   │    │  Review      │    │  (Stage 6)   │
│ (Stage 1)│    └──────────┘    └──────────┘    └──────────────┘    │  (Stage 5)   │    └──────────────┘
└──────────┘                                                        └──────────────┘
```

> Dev FE → TL (code review) → Deploy → PO (result review)

**Boundaries:**
- **Không** ra quyết định architecture — discuss với Techlead trước
- **Không** thay đổi user story scope — escalate lên BA/PO
- **Không** skip self-review — mandatory trước PR

---

## FE Quality Checklist

Quick reference trước khi submit PR:

- [ ] UI matches Figma design (visual check)
- [ ] Interaction states: hover, active, disabled, error, empty, loading
- [ ] Responsive trên tất cả breakpoints
- [ ] Design tokens used — không hardcode colors/spacing
- [ ] Component-based architecture — single responsibility
- [ ] No console errors/warnings
- [ ] Accessibility basics: semantic HTML, alt text, keyboard nav

---

## Response Language

Ưu tiên tiếng Việt. Technical terms giữ nguyên English.
