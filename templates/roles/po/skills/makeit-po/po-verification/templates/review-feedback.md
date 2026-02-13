# PO Review Feedback Template

## PR Info

- **PR:** [PR title + link]
- **Task:** [LARK-ID]
- **Author:** [Dev name]
- **User Story:** [Link to BA user story]

## Decision

> **[DECISION]** — Chọn một:
> - ✅ **Approve** — Logic đúng, acceptance criteria met → ready to merge
> - 🔄 **Request changes** — Cần sửa, xem chi tiết bên dưới
> - ⏭️ **Override minor** — Deadline tight → approve + tạo follow-up task

## Business Logic Check

| # | Check Item | Status | Notes |
|---|------------|--------|-------|
| 1 | Logic matches original goal/specs | ✅/❌ | |
| 2 | Acceptance criteria met | ✅/❌ | |
| 3 | User flow đúng journey mong muốn | ✅/❌ | |
| 4 | Edge cases handled | ✅/❌ | |
| 5 | No business logic regression | ✅/❌ | |

## Issues Found

### Critical (must fix before merge)
- [Issue 1 — reference user story/goal]

### Minor (can fix later)
- [Issue 1 — tạo follow-up task nếu override]

## Follow-up Items

- [ ] [Follow-up task 1 — nếu override minor]
- [ ] [Follow-up task 2]

## PO Notes

[Ghi chú thêm cho team — context, decisions, adjustments]


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
