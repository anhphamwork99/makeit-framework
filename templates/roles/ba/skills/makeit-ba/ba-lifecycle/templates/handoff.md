# Handoff: BA → Techlead

> Agent: Điền template này khi BA hoàn thành sprint deliverables và sẵn sàng handoff cho Techlead.
> HANDOFF.md là **routing document** — trỏ đến files, KHÔNG inline nội dung deliverables.

## Sprint Info

- **Sprint:** SPRINT-{NNN}
- **Date:** {YYYY-MM-DD}
- **Sender:** BA
- **Receiver:** Techlead
- **Sprint Issue:** [Lark Sprint Issue link]

---

## Summary

[1 câu tóm tắt: BA đã phân tích user stories, user flows, và edge cases — TL cần review và break thành FE/BE tasks.]

---

## What I've Done

- [x] {User story US-NNN analyzed} — `deliverables/stories/US-NNN-{feature}.md`
- [x] {User story US-NNN analyzed} — `deliverables/stories/US-NNN-{feature}.md`
- [x] {User flow documented} — `deliverables/flows/FLOW-{feature}.md`
- [x] {Figma analysis completed} — `deliverables/analysis/ANALYSIS-{feature}.md`
- [x] {Edge cases identified and integrated into ACs}

> Agent: Mỗi deliverable 1 dòng checklist + file path.

---

## Stories Overview

| Story | Title | Priority | Complexity Hint | Dependencies |
|-------|-------|----------|-----------------|--------------|
| US-001 | [Story title] | P1 | [S/M/L] | [APIs, components] |
| US-002 | [Story title] | P2 | [S/M/L] | [Dependencies] |

## Edge Cases Flagged

| Category | Edge Case | Priority | In Story AC? |
|----------|-----------|----------|--------------|
| [Data/State/UI/Business/Error] | [Description] | [Critical/Important/Nice] | [Yes — US-NNN / No] |

---

## Tasks For Receiver

> AI Agent tự fill tất cả — human chỉ review + approve.

| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | {Break down US-NNN into FE/BE tasks} | {LARK-XXXX} | {Display name} | — |
| 2 | {Design API contract for {feature}} | {LARK-XXXX} | {Display name} | LARK-XXXX |
| 3 | {Validate edge case handling approach} | {LARK-XXXX} | {Display name} | — |
| 4 | {Estimate task complexity and assign to FE/BE} | {LARK-XXXX} | {Display name} | LARK-XXXX |

> ⚠️ Nếu Lark MCP không available, ghi "Pending" thay vì Lark IDs. Retry sau hoặc tạo manual.

---

## Shared Context

### Key Decisions

- {Decision 1 — scope, interpretation, edge case handling}
- {Decision 2 — design vs requirement trade-off}

### Links

| Type | Link |
|------|------|
| Figma | [Main Figma link] |
| Lark Sprint Issue | [Lark Sprint issue link] |
| PO Goal | [Lark-ID or goal reference] |
| Previous Handoff | [Path to PO HANDOFF.md đã nhận] |

---

## Gate 2 Status

- ✅ All stories follow format standard
- ✅ All stories have ≥3 acceptance criteria
- ✅ Figma links attached to all stories
- ✅ Edge cases documented and integrated
- ✅ Dependencies identified
- ✅ Source context referenced

**Verdict:** PASS — ready for Techlead task breakdown

## Git Path

```
.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md
```

> Commit file này vào product repo khi chạy `stage-complete`.
> TL sẽ đọc file này khi chạy `/makeit:check-handoff`.

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
