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

[1-2 câu tóm tắt: BA đã phân tích gì — user stories, user flows, edge cases. TL cần review stories và break thành FE/BE tasks.]

---

## Sprint Goal

[Goal statement từ SPECS.md — mục tiêu business chính của sprint này.]

---

## Deliverable Paths

> TL agent: Dùng `view_file` để đọc từng file bên dưới.

| # | Path | Type | Description |
|---|------|------|-------------|
| 1 | `deliverables/stories/US-NNN-{feature}.md` | User Story | [Brief description] |
| 2 | `deliverables/stories/US-NNN-{feature}.md` | User Story | [Brief description] |
| 3 | `deliverables/flows/FLOW-{feature}.md` | User Flow | [Brief description] |
| 4 | `deliverables/analysis/ANALYSIS-{feature}.md` | Figma Analysis | [Brief description] |

## Stories Overview

| Story | Title | Priority | Complexity Hint | Dependencies |
|-------|-------|----------|-----------------|--------------|
| US-001 | [Story title] | P1 | [S/M/L] | [APIs, components] |
| US-002 | [Story title] | P2 | [S/M/L] | [Dependencies] |

## Edge Cases Flagged

| Category | Edge Case | Priority | In Story AC? |
|----------|-----------|----------|-------------|
| [Data/State/UI/Business/Error] | [Description] | [Critical/Important/Nice] | [Yes — US-NNN / No] |

## Key Decisions Made

- [Decision 1 — scope, interpretation, edge case handling]
- [Decision 2 — design vs requirement trade-off]

## Questions for Techlead

- [Open question 1 — needs technical decision]
- [Clarification 2 — BA scope vs TL scope]

## External Links

| Type | Link |
|------|------|
| Figma | [Main Figma link] |
| Lark Sprint Issue | [Lark Sprint issue link] |
| PO Goal | [Lark-ID or goal reference] |
| PO Handoff (received) | [Path to PO HANDOFF.md đã nhận] |

## Gate 2 Status

- ✅ All stories follow format standard
- ✅ All stories have ≥3 acceptance criteria
- ✅ Figma links attached to all stories
- ✅ Edge cases documented and integrated
- ✅ Dependencies identified
- ✅ Source context referenced

**Verdict:** PASS — ready for Techlead task breakdown

## Next Steps for Techlead

1. [Review stories and break into FE/BE tasks]
2. [Validate edge case handling approach]
3. [Check API dependency availability]
4. [Estimate task complexity and assign to FE/BE]

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
