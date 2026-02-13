# Self-Review Report

## Task Reference

- **Task ID:** [LARK-ID]
- **PR:** [PR link nếu đã tạo]
- **Reviewer:** Self (Dev FE)
- **Date:** [YYYY-MM-DD]

## Gate 4 Checklist

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | PR follows template (all sections filled) | ✅/❌ | |
| 2 | Lark task linked in PR description | ✅/❌ | |
| 3 | AI Review Checklist completed | ✅/❌ | |
| 4 | Self-reviewed diff before requesting | ✅/❌ | |
| 5 | Commit messages follow conventional commits | ✅/❌ | |
| 6 | Screenshot/video attached for UI changes | ✅/❌ | |
| 7 | No console errors/warnings | ✅/❌ | |
| 8 | Code follows coding standards | ✅/❌ | |

**Gate 4 Result:** ✅ PASS / ❌ FAIL

## Code Quality Checks

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 1 | No hallucinated imports — packages tồn tại | ✅/❌ | |
| 2 | No incorrect API usage — đúng method signature | ✅/❌ | |
| 3 | No hardcoded values (should be config/env) | ✅/❌ | |
| 4 | Type safety — no `any` casts | ✅/❌ | |
| 5 | All files exist and import paths correct | ✅/❌ | |
| 6 | No `console.log` in production code | ✅/❌ | |

## UI Comparison

| Aspect | Match? | Notes |
|--------|--------|-------|
| Layout structure | ✅/❌ | [Details] |
| Colors & gradients | ✅/❌ | [Details] |
| Typography (font, size, weight) | ✅/❌ | [Details] |
| Spacing (padding, margins) | ✅/❌ | [Details] |
| Interaction states | ✅/❌ | [Details] |
| Icons & images | ✅/❌ | [Details] |

> Screenshots captured via Figma MCP `get_screenshot`

## Responsive Check

| Breakpoint | Status | Notes |
|-----------|--------|-------|
| Desktop (≥1024px) | ✅/❌ | [Details] |
| Tablet (768-1023px) | ✅/❌ | [Details] |
| Mobile (<768px) | ✅/❌ | [Details] |

## Performance Check

- **Bundle size impact:** [Thêm bao nhiêu KB]
- **New dependencies:** [List nếu có]
- **Render performance:** [Lazy loading, memoization applied?]

## Summary

- **Overall:** ✅ READY FOR PR / ❌ NEEDS FIX
- **Issues found:** [N issues — list below]
- **Action:** [Fix issues → re-review / Submit PR]
