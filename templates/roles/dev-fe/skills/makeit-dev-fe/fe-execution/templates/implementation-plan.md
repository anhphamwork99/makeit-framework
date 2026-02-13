# Implementation Plan

> Role: Dev FE

## Task Reference

- **Task ID:** [LARK-ID]
- **Task title:** [Tên task từ Techlead]
- **User story:** [Link tới BA user story — SOURCE OF TRUTH]
- **Figma reference:** [Link Figma frame]
- **Sprint:** [Sprint N]
- **Priority:** [P1/P2/P3]

## Component Breakdown

| # | Component/Feature | Mô tả | Complexity |
|---|-------------------|--------|------------|
| 1 | [Component name] | [Cần build gì] | [S/M/L] |
| 2 | [Component name] | [Cần build gì] | [S/M/L] |
| 3 | [Component name] | [Cần build gì] | [S/M/L] |

**Build order:** [Component nào build trước, dependencies]

## Technology Choices

- **Framework patterns:** [React hooks, composition pattern, etc.]
- **Styling approach:** [CSS modules, styled-components, Tailwind, etc.]
- **State management:** [Local state, context, global store]
- **Design tokens:** [Token mapping từ Figma → code variables]

## File Structure

### New Files
```
src/
├── components/
│   ├── [ComponentName]/
│   │   ├── index.tsx
│   │   ├── [ComponentName].tsx
│   │   ├── [ComponentName].styles.ts
│   │   └── [ComponentName].test.tsx
```

### Modified Files
- `[path/to/file]` — [Thay đổi gì]

## Step-by-Step Plan

| Step | Action | Est. | Done |
|------|--------|------|------|
| 1 | [Setup component structure + types] | [time] | ☐ |
| 2 | [Implement base layout from Figma] | [time] | ☐ |
| 3 | [Add interaction states] | [time] | ☐ |
| 4 | [Implement responsive behavior] | [time] | ☐ |
| 5 | [Connect to API/data layer] | [time] | ☐ |
| 6 | [Self-review + compare-ui] | [time] | ☐ |

## Dependencies

- **APIs needed:** [Endpoint — status: ready/in-progress/blocked]
- **Shared components:** [Component — cần từ shared lib]
- **Design tokens:** [Token — extract từ Figma via MCP]
- **BE coordination:** [API contract — đã defined chưa?]

## Notes

- [Edge cases cần lưu ý]
- [Technical constraints]
- [Items cần clarify với Techlead]


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
