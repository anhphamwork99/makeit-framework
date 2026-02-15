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

[1 câu tóm tắt: PO đã chuẩn bị backlog items và sprint goal — BA cần breakdown stories, Designer cần prepare designs.]

---

## What I've Done

- [x] {Backlog item 1 — business goal} — `deliverables/backlog/TASK-NNN-{feature}.md`
- [x] {Backlog item 2 — business goal} — `deliverables/backlog/TASK-NNN-{feature}.md`
- [x] {Sprint plan defined} — `deliverables/SPRINT-PLAN-{sprint}.md`
- [x] {Sprint goal clarified} — Goal: {1-sentence business objective}

> Agent: Mỗi deliverable 1 dòng checklist + file path. PO verification = ✅ reviewed and approved.

---

## PO Verification

> ✅ PO has reviewed and approved all deliverables in this handoff.

---

## Backlog Items Summary

| Task | Goal | Priority | Design Status |
|------|------|----------|---------------|
| TASK-NNN | [1-sentence business goal — answer WHY] | P1 | Ready / In Progress / Not Started |
| TASK-NNN | [1-sentence business goal] | P2 | Ready / In Progress / Not Started |

## Design Coordination

- [ ] Designer status: {Ready for Dev / In Progress / Not Started}
- [ ] Figma links: {provided in backlog items / pending}
- [ ] Interaction states: {defined / pending}

## Known Edge Cases

- [Edge case 1 — ví dụ: user có nhiều accounts, xử lý thế nào?]
- [Edge case 2 — ví dụ: offline scenario, fallback behavior?]

> Ghi chú: BA sẽ identify thêm edge cases trong story breakdown (Stage 2).

---

## Tasks For Receiver

> AI Agent tự fill tất cả — human chỉ review + approve.

| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | {Analyze backlog item TASK-NNN — breakdown into user stories} | {LARK-XXXX} | {Display name} | — |
| 2 | {Document user flows for {feature}} | {LARK-XXXX} | {Display name} | LARK-XXXX |
| 3 | {Prepare Figma designs for {feature}} | {LARK-XXXX} | {Display name} | — |

> ⚠️ Nếu Lark MCP không available, ghi "Pending" thay vì Lark IDs. Retry sau hoặc tạo manual.

---

## Shared Context

### Key Decisions

- {Decision 1 — ví dụ: stakeholder confirmed Y approach}
- {Decision 2 — ví dụ: đã quyết định KHÔNG include feature Z trong scope}
- {Decision 3 — ví dụ: P1 items must-have vì business impact + urgency}

### Links

| Type | Link |
|------|------|
| Lark Sprint Issue | [Lark link] |
| Figma | [Figma links nếu có] |
| Previous Handoff | [path to upstream handoff nếu có] |

---

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
