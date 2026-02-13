# Handoff: Dev FE → PO (Review)

> Agent: Điền template này khi FE hoàn thành sprint deliverables và sẵn sàng handoff cho PO review.
> HANDOFF.md là **routing document** — trỏ đến files, KHÔNG inline nội dung deliverables.

## Sprint Info

- **Sprint:** SPRINT-{NNN}
- **Date:** {YYYY-MM-DD}
- **Sender:** Dev FE
- **Receiver:** PO (Review) + Designer (UI verification)
- **Sprint Issue:** [Lark Sprint Issue link]

---

## Summary

[1-2 câu tóm tắt: FE đã implement gì — components nào, screens nào, user flow nào. PO cần review và Designer cần verify UI.]

---

## Pull Request

- **PR:** #{PR number} — [PR title]
- **Branch:** `feat/SPRINT-{NNN}-{short-description}`
- **Files changed:** [N files]
- **Preview:** [Staging/preview link nếu có]

---

## Components Built

| Component | Location | Interaction States | Responsive | Design Tokens |
|-----------|----------|-------------------|------------|---------------|
| [ComponentName] | `src/components/...` | ✅ All 7 states | ✅ 3 breakpoints | ✅ Tokens only |
| [ComponentName] | `src/components/...` | ⚠️ Missing loading | ✅ 3 breakpoints | ✅ Tokens only |

## Deliverable Paths

> Reviewer agent: Dùng `view_file` để đọc từng file bên dưới.

| # | Path | Type | Description |
|---|------|------|-------------|
| 1 | `src/components/{component}/index.tsx` | Component | [Brief description] |
| 2 | `src/components/{component}/{component}.module.css` | Styles | [Brief description] |
| 3 | `phases/{NN}-{name}/UI-COMPARISON.md` | UI Comparison | [Figma vs implementation] |

## Interaction States Coverage

| Component | Default | Hover | Active | Disabled | Error | Empty | Loading |
|-----------|---------|-------|--------|----------|-------|-------|---------|
| [Name] | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Name] | ✅ | ✅ | ✅ | ✅ | N/A | N/A | ✅ |

## Responsive Behavior

| Breakpoint | Layout | Status | Notes |
|-----------|--------|--------|-------|
| Desktop (1440px+) | [Grid/Flex] | ✅ | [Notes] |
| Tablet (768-1439px) | [Grid/Flex] | ✅ | [Notes] |
| Mobile (320-767px) | [Stack] | ✅ | [Notes] |

## Known Limitations

- [Any intentional deviation from design with reason]
- [Browser-specific issues]
- [Performance notes]

## External Links

| Type | Link |
|------|------|
| Pull Request | [PR link] |
| Figma | [Main Figma link] |
| Lark Sprint Issue | [Lark Sprint issue link] |
| TL Handoff (received) | [Path to TL HANDOFF.md đã nhận] |

## For Designer Review

- [ ] UI matches Figma for all components?
- [ ] Interaction states feel natural?
- [ ] Responsive behavior acceptable?
- [ ] Design token usage correct?

## For PO Review

- [ ] Business logic correct per stories?
- [ ] User flow complete and intuitive?
- [ ] Edge cases handled?

## Gate 4 Status (FE)

- ✅ UI matches Figma design
- ✅ All interaction states implemented
- ✅ Responsive on all breakpoints
- ✅ Design tokens used (no hardcoded values)
- ✅ Component-based architecture
- ✅ No console errors/warnings
- ✅ Accessibility basics (semantic HTML, alt text, keyboard nav)

**Verdict:** PASS — ready for Designer UI verification and PO review

## Git Path

```
.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md
```

> Commit file này vào product repo khi chạy `stage-complete`.
> PO sẽ đọc file này khi chạy `/makeit:check-handoff`.

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
