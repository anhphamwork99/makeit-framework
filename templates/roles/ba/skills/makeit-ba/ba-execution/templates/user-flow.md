# User Flow: [Feature Name]

## Metadata

- **Feature:** [Tên feature]
- **Date:** [YYYY-MM-DD]
- **Related Stories:** [Story IDs — US-001, US-002...]
- **Figma Screens:** [Figma link]
- **PO Goal Reference:** [LARK-ID hoặc goal summary]

## Entry Point

- **User arrives from:** [screen/action/URL cụ thể]
- **Preconditions:** [user đã login, có data X, quyền Y, etc.]
- **Initial state:** [Mô tả state ban đầu của screen/feature]

## Happy Path

1. User [action 1] → System [response 1] → [Screen/State]
2. User [action 2] → System [response 2] → [Screen/State]
3. User [action 3] → System [response 3] → [Screen/State]
4. **Result:** [Outcome mong đợi — user thấy gì, data thay đổi gì]

## Alternative Paths

**Path A: [Tên scenario]**
- **Trigger:** [Điều kiện rẽ nhánh — ví dụ: user chưa login]
- **Flow:** [Steps khác happy path]
- **Result:** [Outcome]

**Path B: [Tên scenario]**
- **Trigger:** [Điều kiện rẽ nhánh — ví dụ: user nhập sai data]
- **Flow:** [Steps khác happy path]
- **Result:** [Outcome]

## Edge Cases

| # | Scenario | Trigger | Expected Behavior |
|---|----------|---------|-------------------|
| 1 | Empty state | [Khi nào xảy ra — no data, first-time user] | [System hiện gì — empty illustration, CTA] |
| 2 | Error state | [Network error, server error] | [Error message, retry option] |
| 3 | Max limit | [Boundary condition — max items, max chars] | [System response — warning, block] |
| 4 | Concurrent action | [Multiple users, parallel ops] | [System response — lock, merge, conflict] |

## Error Handling

| Error | Trigger | User Sees | Recovery |
|-------|---------|-----------|----------|
| [Tên error] | [Khi nào xảy ra] | [Error message/UI change] | [User có thể làm gì để fix] |
| [Network error] | [No internet / timeout] | [Retry banner / offline mode] | [Auto-retry khi reconnect] |

## Notes

- [Clarification đã nhận từ PO/Designer]
- [Assumptions cần confirm trước khi finalize]
- [Technical considerations ghi chú cho Techlead]


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
