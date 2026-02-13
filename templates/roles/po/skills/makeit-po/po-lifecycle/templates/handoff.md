# Handoff: PO → BA + Designer

> Agent: Điền template này khi PO hoàn thành sprint deliverables và sẵn sàng handoff cho BA và Designer.
> HANDOFF.md là **routing document** — trỏ đến files, KHÔNG inline nội dung deliverables.

## Sprint Info

- **Sprint:** SPRINT-{NNN}
- **Date:** {YYYY-MM-DD}
- **Sender:** PO
- **Receiver:** BA + Designer
- **Mode:** {Backlog Creation / PR Review}
- **Sprint Issue:** [Lark Sprint Issue link]

---

## Summary

[1-2 câu tóm tắt: PO đã chuẩn bị gì — backlog items, sprint goal, design coordination. BA cần breakdown stories, Designer cần prepare designs.]

---

## Sprint Goal

[Mục tiêu business chính của sprint — 1-2 câu. Copy từ SPECS.md.]

> Agent: Nếu goal đã thay đổi mid-sprint, ghi goal hiện tại + note thay đổi.

---

## PO Verification

> ✅ PO has reviewed and approved all deliverables in this handoff.

---

## Deliverable Paths

> BA/Designer agent: Dùng `view_file` để đọc từng file bên dưới.

| # | Path | Type | Description |
|---|------|------|-------------|
| 1 | `deliverables/backlog/TASK-NNN-{feature}.md` | Backlog Item | [Brief — business goal 1 câu] |
| 2 | `deliverables/backlog/TASK-NNN-{feature}.md` | Backlog Item | [Brief — business goal 1 câu] |
| 3 | `deliverables/SPRINT-PLAN-{sprint}.md` | Sprint Plan | [Brief description] |

## Backlog Items Summary

| Task | Goal | Priority | Design Status |
|------|------|----------|---------------|
| TASK-NNN | [1-sentence business goal — answer WHY] | P1 | Ready / In Progress / Not Started |
| TASK-NNN | [1-sentence business goal] | P2 | Ready / In Progress / Not Started |

## Priority Rationale

- **P1 items:** [Tại sao must-have — business impact + urgency]
- **P2 items:** [Tại sao should-have — important nhưng có thể defer]
- **P3 items:** [Tại sao nice-to-have — nếu có capacity]

## Design Coordination

- [ ] Designer status: {Ready for Dev / In Progress / Not Started}
- [ ] Figma links: {provided in backlog items / pending}
- [ ] Interaction states: {defined / pending}

## Known Edge Cases

- [Edge case 1 — ví dụ: user có nhiều accounts, xử lý thế nào?]
- [Edge case 2 — ví dụ: offline scenario, fallback behavior?]

> Ghi chú: BA sẽ identify thêm edge cases trong story breakdown (Stage 2).

## PO Context Notes

- [Context quan trọng — ví dụ: stakeholder đã confirm Y approach]
- [Decisions — ví dụ: đã quyết định KHÔNG include feature Z trong scope]
- [Adjustments — ví dụ: timeline adjusted do dependency X]

## External Links

| Type | Link |
|------|------|
| Lark Sprint Issue | [Lark link] |
| Figma | [Figma links nếu có] |

## Gate 1 Sender Status (PO Items 3-5)

- [x] Goal rõ ràng — business objective described for each backlog item
- [x] Context đầy đủ — background, user needs, constraints documented
- [x] Priority xác định — priority level + rationale + sprint target set

**Verdict:** PASS — ready for BA story breakdown and Designer preparation

## Git Path

```
.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md
```

> Commit file này vào product repo khi chạy `stage-complete`.
> BA sẽ đọc file này khi chạy `/makeit:check-handoff`.

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
| {e.g., adr-003} | {e.g., Architecture decision that shaped this deliverable} |
| {e.g., lesson-012} | {e.g., Lesson learned from previous implementation} |

> 💡 Populate during deliverable creation. Use `/makeit:search-kb` to find relevant docs.
> Leave empty if no relevant knowledge docs exist yet.
