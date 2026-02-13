# Tech Lead (Techlead)

Trang workflow chi tiết cho vai trò **Tech Lead** trong team MakeIt. Techlead là người chuyển user stories thành technical tasks — đảm bảo Dev FE/BE có đủ thông tin để implement, và giữ chuẩn kiến trúc xuyên suốt dự án.

> 📖 **Vị trí trong workflow:** Techlead đảm nhận **Stage 3** trong [Team Workflow](../../workflows/team-workflow.md) — nhận user stories từ BA, output FE/BE tasks cho Dev.

---

## Role Overview

| | Detail |
|---|---|
| **Stage** | Stage 3: Techlead Task Breakdown |
| **Nhận từ** | BA (user stories + acceptance criteria) |
| **Giao cho** | Dev FE/BE (tasks + API contracts) |
| **Gate kiểm tra input** | [Gate 2](../../reference/quality-gates.md#gate-2-ba--techlead-user-stories-ready-for-task-breakdown) — Techlead verify BA stories |
| **Gate kiểm tra output** | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) — Dev verify Techlead tasks |
| **Tool hỗ trợ** | Antigravity IDE, Lark, Telegram, GitHub |

---

## Responsibilities

1. **Verify user stories** — Kiểm tra stories từ BA đạt chuẩn trước khi break tasks
2. **Break tasks** — Tách user stories thành FE tasks + BE tasks cụ thể
3. **Define API contracts** — Khi FE/BE cần coordinate, define rõ endpoint + schema
4. **Architecture decisions** — Quyết định technical approach và document lại
5. **Estimate effort** — Ước lượng effort cho mỗi task
6. **Code review** — Review code quality, architecture alignment, AI-generated code
7. **AI quality oversight** — Đảm bảo AI-generated code đạt chuẩn team

---

## Task Breakdown Process

Đây là quy trình step-by-step mỗi khi Techlead nhận user stories từ BA:

### Step 1: Nhận thông báo + Pull HANDOFF.md

BA tag Techlead trên Telegram khi stories ready. TL chạy `/makeit:check-handoff` để pull và đọc HANDOFF.md từ BA.

### Step 2: Verify user stories (Gate 2)

Kiểm tra stories theo [Gate 2 checklist](../../reference/quality-gates.md#gate-2-ba--techlead-user-stories-ready-for-task-breakdown):

- [ ] User story follows format: "As a [role], I want [action], so that [benefit]"
- [ ] Acceptance criteria listed (≥ 3 checkable items)
- [ ] Figma design link attached and accessible
- [ ] Edge cases documented
- [ ] Dependencies identified and status confirmed
- [ ] Source context rõ ràng (reference đến PO Goal + Design specs)
- [ ] Lark task has correct sprint, priority, assignee

> ⚠️ Nếu bất kỳ item nào **fail** → tag BA trên Telegram, ghi rõ story nào thiếu thông tin gì. BA sẽ discuss lại với PO nếu cần.

### Step 3: Discuss unclear stories

Nếu stories cần clarification:
1. Tag BA trên Telegram
2. Ghi rõ story nào, question cụ thể gì
3. Chờ BA trả lời (BA có thể cần check lại với PO)
4. Ghi lại clarification đã nhận

### Step 4: Break thành FE + BE tasks

Từ mỗi user story, tách rõ ràng:

**FE Tasks:**
- Component nào cần tạo/sửa
- UI interactions + states
- Data binding + state management
- Responsive behavior

**BE Tasks:**
- API endpoints cần tạo/sửa
- Database changes (nếu có)
- Business logic
- Validation rules

**Nguyên tắc:**
- Mỗi task mô tả rõ scope cần implement
- Link ngược lại user story (source of truth)
- Ghi technical constraints (API limits, browser support, third-party)

Sử dụng template trong [templates.md](./templates.md#task-breakdown-template).

### Step 5: Define API contracts

Khi FE/BE cần coordinate:
- Define rõ endpoint path + method
- Specify request schema (body, params, query)
- Specify response schema (success + error)
- Ghi authentication requirements
- Note rate limits hoặc constraints

Sử dụng template trong [templates.md](./templates.md#api-contract-template).

### Step 6: Estimate effort

Cho mỗi task:
- Estimate effort (T-shirt sizing: S/M/L/XL hoặc story points)
- Flag tasks phức tạp cần discuss thêm
- Identify dependencies giữa FE/BE tasks

### Step 7: Assign và handoff (Git-based)

1. Tạo subtasks trong Lark cho FE/BE
2. Assign cho Dev phù hợp
3. Attach API contracts (nếu có)
4. Chạy `/makeit:complete` → commit HANDOFF.md vào `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
5. Tag Dev trên Telegram → Dev chạy `/makeit:check-handoff` để pull

> 📖 **Format:** Xem [Handoff Format](../../reference/handoff-format.md)

---

## Architecture Decisions

Techlead quyết định technical approach cho team. Dưới đây là framework:

### Khi nào discuss với team vs quyết định alone?

| Tình huống | Approach |
|------------|----------|
| **Minor:** Chọn library nhỏ, naming convention, file structure | Quyết định alone, document trong PR/task |
| **Medium:** Chọn state management approach, API design pattern | Discuss với Dev liên quan, document quyết định |
| **Major:** Thay đổi architecture, thêm service layer, đổi stack | Discuss cả team, tạo ADR (Architecture Decision Record) |

### Cách document quyết định

Với decisions **medium+**, document trong task/PR description:

```
**Decision:** [Tên quyết định]
**Context:** [Tại sao cần quyết định]
**Options considered:**
1. [Option A] — Pros: [x], Cons: [y]
2. [Option B] — Pros: [x], Cons: [y]
**Chosen:** [Option nào]
**Rationale:** [Tại sao chọn]
```

---

## Code Review Process

Techlead review tất cả PRs. Dưới đây là checklist review:

### Architecture Alignment

- [ ] Code structure follows established patterns
- [ ] New patterns (nếu có) đã được discuss/approve
- [ ] Dependencies hợp lý (không thêm library không cần thiết)
- [ ] Separation of concerns đúng (FE logic không mix BE logic)

### Code Quality & Conventions

- [ ] Follow [Coding Standards](../../reference/coding-standards.md)
- [ ] Naming conventions consistent
- [ ] Error handling appropriate
- [ ] No commented-out code hoặc debug logs
- [ ] Commit messages follow conventional format

### AI-Generated Code Oversight

> 🔑 **Techlead chịu trách nhiệm verify chất lượng AI-generated code.**

- [ ] AI output đã được review, không phải raw paste
- [ ] Logic đúng và complete (không phải partial/stub)
- [ ] Edge cases handled (AI thường miss edge cases)
- [ ] Security implications checked (SQL injection, XSS, etc.)
- [ ] Performance acceptable (AI đôi khi tạo code O(n²) không cần thiết)

Sử dụng [Code Review Checklist](./templates.md#code-review-checklist) đầy đủ.

---

## Handoff Points

### Cơ chế Handoff

TL sử dụng **Git-based HANDOFF.md** — cơ chế giao tiếp chính giữa các roles:

1. TL chạy `/makeit:check-handoff` → pull HANDOFF.md từ BA
2. TL hoàn thành → chạy `/makeit:complete` → commit HANDOFF.md cho FE/BE
3. Telegram dùng để **notify**, Git dùng để **truyền nội dung**

### Nhận từ (Input)

| Từ ai | Nhận gì | Cách nhận | Verify bằng |
|-------|---------|----------|-------------|
| BA | HANDOFF.md (user stories + acceptance criteria + user flow docs) | `git pull` + `/makeit:check-handoff` | [Gate 2](../../reference/quality-gates.md#gate-2-ba--techlead-user-stories-ready-for-task-breakdown) |

### Giao cho (Output)

| Giao cho ai | Giao gì | Cách giao | Được verify bằng |
|-------------|---------|----------|-------------------|
| Dev FE | HANDOFF.md section `## For FE` (Frontend tasks + Figma refs) | `/makeit:complete` + `git push` | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) |
| Dev BE | HANDOFF.md section `## For BE` (Backend tasks + API contracts) | `/makeit:complete` + `git push` | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) |

---

## AI Usage with Antigravity

Techlead sử dụng **Antigravity IDE** để tăng hiệu quả. Dưới đây là playbook cụ thể:

### 1. Task breakdown từ user stories

```
Cho user story: "[paste user story + acceptance criteria]"

Hãy break thành FE + BE tasks:

FE Tasks:
- Component nào cần tạo/sửa
- UI states cần handle
- Data binding requirements

BE Tasks:
- API endpoints cần tạo
- Database model changes
- Business logic + validation

Mỗi task cần: scope rõ ràng, reference user story, technical constraints.
```

### 2. Draft API contracts

```
Cho feature: [mô tả feature]
FE cần data: [mô tả data requirements]

Hãy draft API contract:
- Endpoint path + method
- Request schema (body/params/query)
- Response schema (success + error responses)
- Authentication requirements
- Rate limits nếu relevant

Format theo RESTful conventions.
```

### 3. AI-assisted code review

```
Review PR này cho:
1. Architecture alignment — code structure đúng patterns hiện tại không?
2. Edge cases — có scenario nào chưa handle không?
3. Security — có vulnerability nào không (injection, XSS, auth bypass)?
4. Performance — có bottleneck nào không?
5. AI code quality — nếu code AI-generated, output đã clean chưa?

[Paste diff hoặc file contents]
```

### AI Verification Rules

> ⚠️ **Bắt buộc:** AI output cho plans và architecture decisions **phải được human verify** trước khi implement. Techlead review mọi AI suggestion, cross-check với project context.

- AI draft task breakdown → Techlead review → Adjust → Share
- AI draft API contract → Techlead review → Confirm with Dev → Lock
- AI review suggestion → Techlead evaluate → Accept/reject
- Tham khảo GSD Framework workflows cho patterns: research → plan → verify

---

## Quick Reference

| Hành động | Xem tài liệu |
|-----------|---------------|
| Xem vị trí TL trong workflow | [Team Workflow — Stage 3](../../workflows/team-workflow.md#stage-3-techlead-task-breakdown) |
| Tra checklist verify stories | [Gate 2](../../reference/quality-gates.md#gate-2-ba--techlead-user-stories-ready-for-task-breakdown) |
| Tra checklist output cho Dev | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) |
| Source of truth hierarchy | [Team Workflow — Source of Truth](../../workflows/team-workflow.md#source-of-truth-hierarchy) |
| Coding standards for review | [Coding Standards](../../reference/coding-standards.md) |
| Templates | [Techlead Templates](./templates.md) |

---

*Role: Tech Lead · [← Roles](../README.md)*
*Last updated: 2026-02-13*
