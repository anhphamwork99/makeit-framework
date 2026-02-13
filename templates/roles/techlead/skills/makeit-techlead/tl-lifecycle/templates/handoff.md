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

[1-2 câu tóm tắt: TL đã làm gì trong sprint này — task breakdown, solution design, estimation. FE/BE cần làm gì tiếp theo.]

---

## For FE

### FE Tasks Overview

| Task | File | Priority | Complexity | Dependencies |
|------|------|----------|------------|--------------|
| [Task title] | `deliverables/tasks/FE-TASK-NNN.md` | P1 | [S/M/L] | [API dependencies] |
| [Task title] | `deliverables/tasks/FE-TASK-NNN.md` | P2 | [S/M/L] | [Component deps] |

### FE Deliverable Paths

> FE agent: Dùng `view_file` để đọc từng file bên dưới.

| # | Path | Type | Description |
|---|------|------|-------------|
| 1 | `deliverables/tasks/FE-TASK-NNN.md` | Task Breakdown | [Brief description] |
| 2 | `deliverables/contracts/API-CONTRACT-{feature}.md` | API Contract | [Brief — for FE integration] |
| 3 | `deliverables/architecture/ADR-NNN.md` | Architecture Decision | [Brief — if affects FE] |

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

### BE Deliverable Paths

> BE agent: Dùng `view_file` để đọc từng file bên dưới.

| # | Path | Type | Description |
|---|------|------|-------------|
| 1 | `deliverables/tasks/BE-TASK-NNN.md` | Task Breakdown | [Brief description] |
| 2 | `deliverables/contracts/API-CONTRACT-{feature}.md` | API Contract | [Brief — BE implements this] |
| 3 | `deliverables/ESTIMATION-{feature}.md` | Estimation Report | [Brief — effort estimates] |

### BE Notes

- [Context quan trọng cho BE — schema considerations, migration notes]
- [Dependencies: FE coordination points, shared types]
- [Blockers hoặc risks cần lưu ý]

---

## External Links

| Type | Link |
|------|------|
| Figma | [Figma link từ BA stories] |
| Lark Sprint Issue | [Lark link] |
| BA Handoff | [Path to BA HANDOFF.md đã nhận] |

## Key Decisions

- [Decision 1 — architecture, API design, task splitting rationale]
- [Decision 2 — scope trade-off, priority reasoning]

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
