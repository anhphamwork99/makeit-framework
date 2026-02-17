# MakeIt Product Owner Workspace

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

## Role: Product Owner

PO định hình **vision**, cung cấp **context** cho feature/epic, và là **final authority** trong review process. PO tham gia **Stage 1** (chuẩn bị backlog items) và **Stage 5** (review & approve PRs).

### Sprint Lifecycle

PO tasks follow the Sprint lifecycle with 6 stage commands: **start-sprint → plan-phase → execute-phase → verify-phase → verify-work → complete**

PO operates in **dual mode:**

**Mode 1 — Backlog Creation (Stage 1):** Full sprint lifecycle — start-sprint → plan-phase → execute-phase → verify-phase → verify-work → complete
**Mode 2 — PR Review (Stage 5):** Streamlined — start-sprint → execute-phase (review-pr) → complete

**Mode detection:** "review PR" / "check PR" → Mode 2. "create backlog" / "new feature" → Mode 1. Ambiguous → ask user.

- IDE acts as orchestrator — routes commands to skills, manages state
- Complex tasks spawn **sub-agents** for fresh context (see Sub-agents section below)
- Sprint state tracked in `.makeit/sprint/SPRINT-NNN/STATE.md`
- Routing decisions: `@skills/makeit-po/_shared/references/sub-agent-spawning.md`

**Stage exit criteria:**

| Stage | Exit When |
|-------|----------|
| Start Sprint | SPECS.md created, mode detected, ROADMAP.md defined, STATE.md initialized |
| Plan | PLAN.md ready for execution (Mode 1 only) |
| Execute | All phase deliverables created |
| Verify | Phase deliverables verified, quality checks passed. Max 1 revision loop (Mode 1 only) |
| Complete | Output delivered to BA+Designer (Mode 1) or PR decision communicated (Mode 2) |

## Skills

Skill hub: `@skills/makeit-po/SKILL.md`

| Domain | Purpose | Skills |
|--------|---------|--------|
| `po-discovery/` | Sprint entry & input verification | stage-start-sprint |
| `po-planning/` | Phase preparation & context gathering | stage-plan-phase |
| `po-execution/` | Phase execution & internal workflows | stage-execute-phase, draft-backlog, refine-goal, prepare-sprint, manage-sprint-goal, review-pr, check-gate |
| `po-verification/` | Quality assurance & gate checks | stage-verify-phase, stage-verify-work |
| `po-lifecycle/` | Sprint completion & context management | stage-complete, pause-work, resume-work |
| `po-support/` | Utility operations | status, help, decide, lesson-learned |
| `po-debugging/` | Troubleshooting | debug |

> Stage skills are routed by the orchestrator during sprint lifecycle. Internal workflows (in `po-execution/workflows/`) are called within execute-phase. Support skills can be used standalone.

## Workflows (Commands)

### Stage Commands (Primary)

| Command | Mô tả |
|---------|-------|
| `/makeit:start-sprint` | Read Lark Sprint → detect mode → create workspace + verify Gate 1 |
| `/makeit:plan-phase` | Tạo PLAN.md cho phase hiện tại |
| `/makeit:execute-phase` | Thực thi plan (inline hoặc spawn sub-agents) |
| `/makeit:verify-phase` | Verify output phase — goal-backward check |
| `/makeit:verify-work` | Validate tất cả deliverables so với SPECS.md |
| `/makeit:complete` | Git sync, update Lark, tạo handoff cho BA+Designer |

### Sprint Management Commands

| Command | Mô tả |
|---------|-------|
| `/makeit:update-scope` | Update task scope after handoff (sender only) |

### Support Commands

| Command | Mô tả |
|---------|-------|
| `/makeit:status` | Xem trạng thái sprint, resume context |
| `/makeit:help` | Xem danh sách commands |
| `/makeit:decide` | Ghi nhận quyết định |
| `/makeit:estimate` | Đánh giá complexity cho backlog items |
| `/makeit:lesson-learned` | Ghi nhận bài học kinh nghiệm |
| `/makeit:debug` | Systematic debugging for PO workflow issues |
| `/makeit:health-check` | Quét workspace tìm broken references, missing files |
| `/makeit:what-new` | Kiểm tra và cập nhật framework version mới |
| `/makeit:pause-work` | Lưu context khi tạm dừng công việc |
| `/makeit:resume-work` | Khôi phục context từ lần pause trước |
| `/makeit:check-handoff` | Check for incoming handoff from upstream role |
| `/makeit:sync-scope` | Pull scope changes from upstream sender |

> Domain skills (draft-backlog, refine-goal, prepare-sprint, manage-sprint-goal, review-pr, check-gate) are now internal — called during `/makeit:execute-phase`. For standalone use without sprint tracking, call the skill directly.

## Rules

- Universal: `@rules/makeit-universal.md`
- Role-specific: `@rules/makeit-po.md`

## AI Verification

| AI Output | Rule |
|-----------|------|
| Specs & plans (backlog, goals) | **Phải human verify** trước khi share |
| PR review suggestions | **PO đọc và đánh giá** — không auto-approve |
| Sprint preparation items | **PO review** context trước khi finalize |

> 💡 AI draft nhanh, nhưng **PO luôn là người quyết định cuối cùng**.

## MCP Servers

- **Lark MCP** — Giao tiếp với Lark: gửi messages, đọc sprint issues (Bitable), quản lý tasks, đọc documents
- Skill: `@.agent/skills/lark-workspace/SKILL.md` | Config template: `templates/mcp/lark-mcp.json`

## Knowledge Base

Product Memory System cung cấp trí nhớ dài hạn across sprints.
- **Knowledge docs:** `.makeit/knowledge/{architecture,business,product,technical,operational}/`
- **Master index:** `.makeit/knowledge/INDEX.md` (auto-generated)
- **Convention:** 3-layer structure — L0 metadata, L1 summary, L2 detail
- **Retrieval:** Deep Query (Reasoning RAG) — AI reasons over INDEX instead of keyword search

> Agent tự động load relevant knowledge tại sprint start (stage-clarify/start-sprint) và suggest knowledge capture tại sprint end (stage-complete).

> 📝 **Update rule:** Khi tạo, sửa nội dung, hoặc xóa file trong `.makeit/knowledge/`, PHẢI update INDEX.md (qua `/makeit:update-doc` hoặc `/makeit:create-doc`).

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
| makeit-po-researcher | Research market context, competitor analysis, user feedback |
| makeit-po-planner | Plan backlog item creation order and priority batches |
| makeit-po-executor | Draft backlog items, refine goals, set acceptance criteria |
| makeit-po-verifier | Verify PO deliverables quality (goal-backward check) |

> Sub-agents are spawned for complex work to protect orchestrator context. Spawn decisions: `@.agent/skills/makeit-po/_shared/references/sub-agent-spawning.md`. Spawning method: `.agent/rules/spawn sub-agents.md`.

---

## Pipeline Position

```
┌──────────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐
│  ★ PO ★      │───▶│  BA      │───▶│  Techlead    │───▶│  FE/BE   │───▶│  TL Code     │───▶│ ★ PO Review ★│
│  + Designer  │    │ (Stage 2)│    │  (Stage 3)   │    │ (Stage 4)│    │  Review      │    │  (Stage 6)   │
│  (Stage 1)   │    └──────────┘    │  Mode 1:     │    └──────────┘    │  (Stage 5)   │    └──────────────┘
└──────────────┘                    │  Task Break  │                    │  Mode 2:     │
                                    └──────────────┘                    │  Review+Deploy│
                                                                        └──────────────┘
```

**Boundaries:**
- **Không** ra quyết định technical — delegate cho Techlead
- **Không** viết specs chi tiết — đó là việc của BA
- **Không** assign tasks trực tiếp cho Dev — Techlead chịu trách nhiệm

---

## Response Language

Ưu tiên tiếng Việt. Technical terms giữ nguyên English.
