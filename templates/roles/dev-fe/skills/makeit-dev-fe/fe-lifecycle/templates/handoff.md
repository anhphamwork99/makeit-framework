# Handoff: Dev FE → Techlead (Code Review)

> Agent: Điền template này khi FE hoàn thành sprint deliverables và sẵn sàng handoff cho TL code review.
> HANDOFF.md là **routing document** — trỏ đến files, KHÔNG inline nội dung deliverables.

## Sprint Info

- **Sprint:** SPRINT-{NNN}
- **Date:** {YYYY-MM-DD}
- **Sender:** Dev FE
- **Receiver:** Techlead (Code Review)
- **Sprint Issue:** [Lark Sprint Issue link]

---

## Summary

[1 câu tóm tắt: FE đã implement components và screens theo task assignments — TL cần review code + approve PR.]

---

## What I've Done

- [x] {Component {X} implemented} — `src/components/{component}/index.tsx`
- [x] {Screen {Y} implemented} — `src/pages/{screen}.tsx`
- [x] {Interaction states: all 7 states covered} — hover, active, disabled, error, empty, loading, default
- [x] {Responsive behavior verified} — 3 breakpoints (desktop, tablet, mobile)
- [x] {Design tokens used} — no hardcoded colors/spacing

> Agent: Mỗi deliverable 1 dòng checklist + file path.

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

---

## Tasks For Receiver

> AI Agent tự fill tất cả — human chỉ review + approve.

| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | {Review PR #{N} — check code quality + architecture compliance} | {LARK-XXXX} | {Display name} | — |
| 2 | {Check component {X} against Figma design} | {LARK-XXXX} | {Display name} | LARK-XXXX |
| 3 | {Verify responsive behavior on all breakpoints} | {LARK-XXXX} | {Display name} | — |
| 4 | {Approve/reject code quality} | {LARK-XXXX} | {Display name} | LARK-XXXX |

> ⚠️ Nếu Lark MCP không available, ghi "Pending" thay vì Lark IDs. Retry sau hoặc tạo manual.

---

## Shared Context

### Key Decisions

- {Decision 1 — component architecture, state management approach}
- {Decision 2 — design deviation rationale, if any}

### Links

| Type | Link |
|------|------|
| Pull Request | [PR link] |
| Figma | [Main Figma link] |
| Lark Sprint Issue | [Lark Sprint issue link] |
| Previous Handoff | [Path to TL HANDOFF.md đã nhận] |

---

## Gate 4 Status (FE)

- ✅ UI matches Figma design
- ✅ All interaction states implemented
- ✅ Responsive on all breakpoints
- ✅ Design tokens used (no hardcoded values)
- ✅ Component-based architecture
- ✅ No console errors/warnings
- ✅ Accessibility basics (semantic HTML, alt text, keyboard nav)

**Verdict:** PASS — ready for Techlead code review

## Git Path

```
.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md
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
