# Handoff: Techlead → Dev FE + Dev BE

> Agent: Điền template này khi TL hoàn thành sprint deliverables và sẵn sàng handoff cho FE và BE.
> HANDOFF.md là **routing document** — trỏ đến files, KHÔNG inline nội dung deliverables.

## Sprint Info

- **Sprint:** SPRINT-{NNN}
- **Date:** {YYYY-MM-DD}
- **Sender:** Techlead
- **Receiver:** Dev FE + Dev BE
- **Sprint Issue:** [Lark Sprint Issue link]

---

## Summary

[1 câu tóm tắt: TL đã break down tasks, design API contracts, và estimate complexity — FE/BE cần implement theo task assignments.]

---

## What I've Done

- [x] {Task breakdown completed} — `deliverables/tasks/FE-TASK-NNN.md`, `deliverables/tasks/BE-TASK-NNN.md`
- [x] {API contracts designed} — `deliverables/contracts/API-CONTRACT-{feature}.md`
- [x] {Architecture decisions recorded} — `deliverables/architecture/ADR-NNN.md`
- [x] {Estimation completed} — `deliverables/ESTIMATION-{feature}.md`

> Agent: Mỗi deliverable 1 dòng checklist + file path.

---

## For FE

### FE Tasks Overview

| Task | File | Priority | Complexity | Dependencies |
|------|------|----------|------------|--------------|
| [Task title] | `deliverables/tasks/FE-TASK-NNN.md` | P1 | [S/M/L] | [API dependencies] |
| [Task title] | `deliverables/tasks/FE-TASK-NNN.md` | P2 | [S/M/L] | [Component deps] |

### FE Notes

- [Context quan trọng cho FE — design tokens, component patterns, Figma references]
- [Dependencies: API nào cần ready trước khi FE implement]
- [Blockers hoặc risks cần lưu ý]

---

## For BE

### BE Tasks Overview

| Task | File | Priority | Complexity | Dependencies |
|------|------|----------|------------|--------------|
| [Task title] | `deliverables/tasks/BE-TASK-NNN.md` | P1 | [S/M/L] | [DB dependencies] |
| [Task title] | `deliverables/tasks/BE-TASK-NNN.md` | P2 | [S/M/L] | [Service deps] |

### BE Notes

- [Context quan trọng cho BE — schema considerations, migration notes]
- [Dependencies: FE coordination points, shared types]
- [Blockers hoặc risks cần lưu ý]

---

## Tasks For Receiver

> AI Agent tự fill tất cả — human chỉ review + approve.

### For FE

| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | {Implement component {X} theo FE-TASK-NNN} | {LARK-XXXX} | {Display name} | — |
| 2 | {Implement screen {Y} theo FE-TASK-NNN} | {LARK-XXXX} | {Display name} | LARK-XXXX |

### For BE

| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | {Implement API endpoint {Z} theo BE-TASK-NNN} | {LARK-XXXX} | {Display name} | — |
| 2 | {Create database migration theo BE-TASK-NNN} | {LARK-XXXX} | {Display name} | LARK-XXXX |

> ⚠️ Nếu Lark MCP không available, ghi "Pending" thay vì Lark IDs. Retry sau hoặc tạo manual.

---

## Shared Context

### Key Decisions

- {Decision 1 — architecture, API design, task splitting rationale}
- {Decision 2 — scope trade-off, priority reasoning}

### Links

| Type | Link |
|------|------|
| Figma | [Figma link từ BA stories] |
| Lark Sprint Issue | [Lark link] |
| Previous Handoff | [Path to BA HANDOFF.md đã nhận] |

---

## Git Path

```
.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md
```

> Commit file này vào product repo khi chạy `stage-complete`.
> FE và BE sẽ đọc file này khi chạy `/makeit:check-handoff`.

---

## Knowledge Pointers

<!-- 
  Knowledge Pointers: Cross-reference this deliverable with knowledge base docs.
  - Add relevant ADR IDs if architecture decisions apply
  - Add lesson IDs if past experiences influenced this work  
  - Add pattern IDs if established patterns were used
  - Leave empty if this is the first sprint or no relevant docs exist
-->

<!-- Link related knowledge documents from .makeit/knowledge/ -->
<!-- This section helps future sprints find relevant context -->

| Doc ID | Relevance |
|--------|-----------|
| {e.g., adr-003} | {e.g., Architecture decision that shaped task breakdown} |
| {e.g., lesson-012} | {e.g., Lesson learned from previous sprint} |

> 💡 Populate during deliverable creation. Use `/makeit:search-kb` to find relevant docs.
> Leave empty if no relevant knowledge docs exist yet.
