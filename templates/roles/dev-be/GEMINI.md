# MakeIt Backend Developer Workspace

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

## Role: Backend Developer

Dev BE xây dựng backend systems — implement APIs, quản lý database, xử lý business logic, đảm bảo security & performance. Dev BE owns **Stage 4** trong pipeline.

> ⚠️ **STOP Mechanism:** AI PHẢI dừng trước destructive operations — DELETE/DROP, force push, migration trên shared DB. Xem `@rules/makeit-dev-be.md`.

### Sprint Lifecycle

BE tasks follow the Sprint lifecycle with 8 stage commands: **start-my-tasks → [discuss-phase] → [research-phase] → plan-phase → execute-phase → verify-phase → verify-work → complete**

> ⭐ `discuss-phase` and `research-phase` are OPTIONAL — use for complex features involving infrastructure decisions, third-party integrations, or unfamiliar domains.

- IDE acts as orchestrator — routes commands to skills, manages state
- Complex tasks spawn **sub-agents** for fresh context (see Sub-agents section below)
- Sprint state tracked in `.makeit/sprint/SPRINT-NNN/STATE.md`
- Routing decisions: `@skills/makeit-dev-be/_shared/references/sub-agent-spawning.md`

**Stage exit criteria:**

| Stage | Exit When |
|-------|----------|
| Start My Tasks | MY-TASKS.md created, workspace scoped to assigned BE tasks |
| Discuss (optional) | CONTEXT.md with infrastructure/integration decisions captured |
| Research (optional) | RESEARCH.md with prescriptive recommendations |
| Plan | PLAN.md ready for execution |
| Execute | All phase deliverables created. ⚠️ STOP before destructive ops |
| Verify | Phase deliverables verified, security audit passed. Max 1 revision loop |
| Complete | PR created, handed to TL for code review (Stage 5) |

## Skills

Skill hub: `@skills/makeit-dev-be/SKILL.md`

| Domain | Purpose | Skills |
|--------|---------|--------|
| `be-discovery/` | Sprint entry & Gate 3 verification | stage-clarify |
| `be-planning/` | Phase preparation & execution planning | stage-plan-phase, stage-discuss-phase (optional), stage-research-phase (optional) |
| `be-execution/` | Phase execution with BE workflows | stage-execute-phase, implement, design-api, design-schema |
| `be-verification/` | Quality assurance & gate checks | stage-verify-phase, stage-verify-work, self-review, check-gate |
| `be-lifecycle/` | Sprint completion & context management | stage-complete, pause-work, resume-work, progress, create-pr, fix-feedback |
| `be-management/` | Roadmap phase management | stage-add-phase, stage-insert-phase, stage-remove-phase |
| `be-debugging/` | Systematic issue diagnosis | debug |
| `be-support/` | Utility operations | help, status, decide, estimate, lesson-learned |

## Workflows (Commands)

### Stage Commands (Primary)

| Command | Mô tả |
|---------|-------|
| `/makeit:start-my-tasks` | Select BE tasks from TL handoff, create focused workspace |
| `/makeit:discuss-phase` | ⭐ OPTIONAL — Gather context: infrastructure, performance, integration decisions |
| `/makeit:research-phase` | ⭐ OPTIONAL — Deep research: library evaluation, architecture patterns, scalability |
| `/makeit:plan-phase` | Tạo PLAN.md cho phase hiện tại |
| `/makeit:execute-phase` | Thực thi plan (inline hoặc spawn sub-agents) |
| `/makeit:verify-phase` | Verify output phase — goal-backward check |
| `/makeit:verify-work` | Validate tất cả deliverables so với SPECS.md |
| `/makeit:complete` | Git sync, update Lark, tạo handoff cho Review/PO |

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
| `/makeit:whats-new` | Kiểm tra và cập nhật framework version mới |
| `/makeit:pause-work` | Lưu context khi tạm dừng công việc |
| `/makeit:resume-work` | Khôi phục context từ lần pause trước |
| `/makeit:progress` | Xem sprint progress với deliverable status |
| `/makeit:check-handoff` | Check for incoming handoff from upstream role |
| `/makeit:sync-scope` | Pull scope changes from upstream TL |

> Domain skills (implement, design-api, design-schema, self-review, check-gate, create-pr, fix-feedback) are now internal — called by the orchestrator during `/makeit:execute-phase`. For standalone use without sprint tracking, call the skill directly.

## Rules

- Universal: `@rules/makeit-universal.md`
- Role-specific: `@rules/makeit-dev-be.md` — ⚠️ includes STOP mechanism

## MCP Servers

- **Lark MCP** — Giao tiếp với Lark: gửi messages, đọc sprint issues (Bitable), quản lý tasks, đọc documents
- Skill: `@.agent/skills/lark-workspace/SKILL.md` | Config template: `templates/mcp/lark-mcp.json`
- **Serena MCP** (Optional) — Symbol-level code intelligence: find symbols, trace references, rename across codebase, semantic code navigation
- Skill: `@.agent/skills/serena-workspace/SKILL.md` | Config template: `templates/mcp/serena-mcp.json`
- Dev BE uses Serena for refactoring, symbol search, and code navigation during implementation

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
| makeit-be-researcher | Research API patterns, security best practices, integration approaches |
| makeit-be-planner | Plan implementation order, dependency mapping, batch grouping |
| makeit-be-executor | Implement APIs, schema, migrations, write tests |
| makeit-be-verifier | Verify contracts, security, data integrity, performance |

> Sub-agents are spawned for complex work to protect orchestrator context. Spawn decisions: `@.agent/skills/makeit-dev-be/_shared/references/sub-agent-spawning.md`. Spawning method: `.agent/rules/spawn sub-agents.md`.

---

## Pipeline Position

```
┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  PO          │───▶│  BA      │───▶│ Techlead │───▶│ ★ Dev BE ★   │───▶│  TL Code     │───▶│  PO Review   │
│  + Designer  │    │ (Stage 2)│    │ (Stage 3)│    │  (Stage 4)   │    │  Review      │    │  (Stage 6)   │
│  (Stage 1)   │    └──────────┘    └──────────┘    └──────────────┘    │  (Stage 5)   │    └──────────────┘
└──────────────┘                                                        └──────────────┘
```

> Dev BE → TL (code review) → Deploy → PO (result review)

**Boundaries:**
- **Không** thay đổi user story — đó là BA responsibility
- **Không** quyết định architecture lớn — discuss với Techlead trước
- **Không** review FE code — focus backend scope
- **Không** run migration trên shared DB without confirmation

---

## BE Quality Checklist

Quick reference trước khi submit PR:

- [ ] API contracts match specs — request/response schema đúng
- [ ] Input validation đầy đủ — type, required, boundaries
- [ ] Error handling proper — meaningful messages, correct HTTP codes
- [ ] Security checked — auth, authz, no injection/XSS
- [ ] Database queries efficient — no N+1, indexes tại chỗ
- [ ] Migrations reversible — có rollback
- [ ] No sensitive data in logs — passwords, tokens, PII
- [ ] API documentation updated

---

## Response Language

Ưu tiên tiếng Việt. Technical terms giữ nguyên English.
