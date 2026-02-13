---
name: fe-workflow-check-gate
description: Internal FE workflow — formal Gate 4 checklist verification before PR submission
---

<purpose>
Formal binary gate check — verify FE output meets Gate 4 requirements using the official checklist. Dev FE is the SENDER at Gate 4.
</purpose>

<context>
Internal workflow — called by `stage-verify-phase.md` or `stage-verify-work.md`.
Uses official Gate 4 checklist from `@_shared/references/quality-gates.md`.
</context>

<rules>
1. Binary — ALL items must pass or it fails
2. No skipping — every checklist item verified
3. FE is sender — output must be ready for Designer review
</rules>

<process>
  <step name="load_checklist">
    Read Gate 4 FE-specific checklist from quality-gates.md.
  </step>

  <step name="check_each_item">
    | # | Gate 4 Item | Status |
    |---|------------|--------|
    | 1 | UI matches Figma design | ✅/❌ |
    | 2 | All interaction states: hover, active, disabled, error, empty, loading | ✅/❌ |
    | 3 | Responsive on all breakpoints | ✅/❌ |
    | 4 | Design tokens used (no hardcoded values) | ✅/❌ |
    | 5 | Component-based architecture | ✅/❌ |
    | 6 | No console errors/warnings | ✅/❌ |
    | 7 | Accessibility basics (semantic HTML, alt text, keyboard nav) | ✅/❌ |
    | 8 | TypeScript types correct | ✅/❌ |
    | 9 | Self-review completed | ✅/❌ |
    | 10 | Compare-UI report clean | ✅/❌ |
  </step>

  <step name="route_result">
    **ALL PASS ✅:** Ready for PR creation → suggest `/makeit:complete`.
    **HAS FAILURES ❌:** List failures with fix instructions → re-execute failed items.
  </step>
</process>
