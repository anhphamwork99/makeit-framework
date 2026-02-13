# PR Description

## Title

`{type}({scope}): {description}`

> Ví dụ: `feat(upload): add drag-and-drop file upload component`

## Changes Summary

- [Thay đổi 1 — bullet point ngắn gọn]
- [Thay đổi 2]
- [Thay đổi 3]

## Task Reference

- **Lark task:** [LARK-ID — link]
- **User story:** [Link tới BA user story]
- **Figma:** [Link Figma frame đã implement]

## Screenshots / Visual Comparison

| Figma Design | Implementation |
|-------------|----------------|
| [Screenshot Figma] | [Screenshot browser] |

**Responsive:**
| Breakpoint | Screenshot |
|-----------|------------|
| Desktop (1440px) | [screenshot] |
| Tablet (768px) | [screenshot] |
| Mobile (375px) | [screenshot] |

## Testing Done

- [ ] Component renders correctly
- [ ] All interaction states work (hover, active, disabled, error, empty, loading)
- [ ] Responsive behavior tested on defined breakpoints
- [ ] No console errors/warnings
- [ ] Edge cases handled (empty data, long text, etc.)

## Checklist

### Coding Standards
- [ ] Branch naming follows `{type}/TASK-{id}-short-desc`
- [ ] Commit messages follow conventional commits
- [ ] Code follows project coding standards

### Self-Review
- [ ] Self-reviewed diff before requesting review
- [ ] No hallucinated imports — all packages/modules exist
- [ ] No hardcoded values that should be config/env
- [ ] No `console.log` in production code

### UI Verification
- [ ] UI matches Figma design (visual comparison done)
- [ ] Design tokens used correctly (colors, typography, spacing)
- [ ] Responsive behavior matches breakpoint rules

### AI Review Checklist
- [ ] No incorrect API usage — đúng method signature
- [ ] Type safety — no `any` casts
- [ ] Specs requirements covered — acceptance criteria met
- [ ] Edge cases from specs handled


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
