---
name: handle-multi-story
description: Process for handling multiple BA stories (3+) in a single sprint — prioritize, group, identify shared work, create execution phases
---

# Multi-Story Handling

## When to Use

When BA handoff contains **3+ user stories** for a single sprint. Without this process, tasks get mixed across stories and traceability breaks down.

## Process

### 1. Prioritize Stories

Order stories by:
1. **Dependencies** — stories that unblock others come first
2. **Business value** — highest PO goal impact first
3. **Risk** — highest uncertainty → earlier (de-risk early)

Output: numbered priority list with rationale.

### 2. Group by Domain

Categorize each story:

| Group | Definition | Example |
|-------|-----------|---------|
| **Pure FE** | UI-only, no new API needed | Add filter UI using existing endpoint |
| **Pure BE** | API/data only, no UI impact | Add export API, background job |
| **Full-stack** | FE + BE work required | New feature with UI + API |

### 3. Identify Shared Work

Look across ALL stories for:
- **Common models/entities** — same DB tables, same types
- **Shared API patterns** — auth middleware, pagination, error handling
- **Reusable FE components** — shared UI elements across stories
- **Infrastructure needs** — new libraries, env setup, migrations

> ⚠️ Shared work MUST be extracted into Phase 1 to avoid duplication.

### 4. Create Execution Phases

```
Phase 1: Shared Infrastructure
  - Common models, shared APIs, reusable components
  - Database migrations

Phase 2: [Story Group A — e.g., Pure BE stories]
  - Tasks grouped by domain

Phase 3: [Story Group B — e.g., Full-stack stories]
  - Tasks maintain story traceability

Phase N: Integration + Polish
  - Cross-story integration testing
  - Edge cases that span multiple stories
```

### 5. Map Tasks to Stories

Every task MUST link back to its source story:

```
TASK-001: Create product API endpoint
  ↑ Source: US-003 (Product CRUD)
  Domain: BE
  Phase: 2
```

**Rules:**
- No orphan tasks (every task traces to a story)
- No orphan stories (every story has ≥1 task)
- Cross-story tasks list ALL related stories

## Output

- Task list with story traceability
- Phase grouping with dependency order
- Shared work identified separately
- Estimation adjusted for shared work efficiencies

## Template

Use `tl-execution/templates/task-breakdown.md` — one task per story group, with shared work in Phase 1.

<edge_cases>

**Khi FE và BE tasks conflict trên shared code hoặc assumptions khác nhau:** Nếu parallel execution gây conflict (cùng modify shared types, conflicting API assumptions) → dừng parallel work, tạo API contract rõ ràng cho conflict point, gửi cho cả FE và BE confirm. Resume parallel work sau khi cả 2 align trên contract.

**Khi stories quá lớn, cần span nhiều sprints:** Nếu 1+ stories không fit trong sprint hiện tại → extract deliverable scope cho sprint này: "Sprint N: Foundation + Story A + Story B partial." Ghi rõ trong ROADMAP.md stories nào cần carry-over. Flag cho BA/PO: "Stories X, Y cần sprint tiếp theo để hoàn thành." Defer phần chưa làm sang sprint N+1 — không cố nhét hết.

</edge_cases>
