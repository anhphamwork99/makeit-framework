# Verification Report: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Dev FE
**Date:** [YYYY-MM-DD]
**Revision:** [0 — first check / 1 — after fixes]

---

## Phase Info

- **Phase Goal:** [From ROADMAP.md — what this phase was supposed to deliver]
- **Plan Tasks:** [N tasks completed]
- **Deliverables Produced:** [Count — components, pages, style files, type definitions]

## 3-Level Verification

<!-- For each deliverable produced in this phase -->

### Deliverable: [ComponentName.tsx]

| Level | Check | Status |
|-------|-------|--------|
| **Level 1 — Existence** | File exists at expected path? | [✅/❌] |
| | Component renders without crash? | [✅/❌] |
| **Level 2 — Substantive** | Has real implementation (not stubs/TODOs)? | [✅/❌] |
| | All interaction states handled? | [✅/❌] |
| | Responsive behavior implemented? | [✅/❌] |
| **Level 3 — Wired** | Uses design tokens (not hardcoded values)? | [✅/❌] |
| | Connects to SPECS.md goals? | [✅/❌] |
| | Figma design reference traceable? | [✅/❌] |

<!-- Repeat for each deliverable -->

### Summary

| Deliverable | L1 Existence | L2 Substantive | L3 Wired | Verdict |
|-------------|:---:|:---:|:---:|:---:|
| [Component 1] | ✅ | ✅ | ✅ | PASS |
| [Component 2] | ✅ | ✅ | [✅/❌] | [PASS/FAIL] |
| [Style file] | ✅ | [✅/❌] | [✅/❌] | [PASS/FAIL] |

## FE Self-Review

<!-- Internal quality check using self-review.md -->

| # | Check Item | Status | Auto-fix Applied? |
|---|-----------|--------|-------------------|
| 1 | UI matches Figma design (visual check via compare-ui) | [✅/❌] | [N/A — requires compare-ui] |
| 2 | All interaction states: hover, active, disabled, error, empty, loading | [✅/❌] | [Yes — added missing / No / N/A] |
| 3 | Responsive on all breakpoints (mobile, tablet, desktop) | [✅/❌] | [Yes — fixed / No / N/A] |
| 4 | Design tokens used — no hardcoded colors/spacing/typography | [✅/❌] | [Yes — replaced / No / N/A] |
| 5 | Component-based architecture — single responsibility | [✅/❌] | [Yes — split / No / N/A] |
| 6 | No console errors/warnings | [✅/❌] | [Yes — fixed / No / N/A] |
| 7 | Accessibility: semantic HTML, alt text, keyboard nav | [✅/❌] | [Yes — added / No / N/A] |
| 8 | TypeScript types correct — no `any`, proper interfaces | [✅/❌] | [Yes — typed / No / N/A] |

**Auto-fixes applied:** [Count — e.g., "2 auto-fixes (hardcoded color replaced, missing alt text added)"]
**Flagged for user:** [Items requiring human action — architecture changes, missing design states]

## Compare-UI Results

<!-- Summary of UI comparison against Figma designs -->

| Component | Match Score | Critical Issues | Minor Issues |
|-----------|:---:|:---:|:---:|
| [Component 1] | [✅ Match / ⚠️ Minor / ❌ Major] | [Count] | [Count] |
| [Component 2] | [✅/⚠️/❌] | [Count] | [Count] |

<!-- Link to full comparison report if generated -->
**Full Report:** [Path to UI-COMPARISON report, or "Inline — see details below"]

### Key Discrepancies (if any)

| Component | Aspect | Expected (Figma) | Actual | Severity | Fix |
|-----------|--------|----------|--------|----------|-----|
| [Component] | [spacing/color/typography] | [Expected value] | [Actual value] | [Critical/High/Medium/Low] | [Fix instruction] |

## Gate 4 Formal Check

<!-- Binary pass/fail — from quality-gates.md -->

- [✅/❌] UI matches Figma design on all target screens
- [✅/❌] All interaction states implemented (hover, active, disabled, error, empty, loading)
- [✅/❌] Responsive behavior correct on all breakpoints
- [✅/❌] Design tokens used — no hardcoded visual values
- [✅/❌] Component-based architecture — single responsibility
- [✅/❌] No console errors or warnings
- [✅/❌] Accessibility basics: semantic HTML, alt text, keyboard nav

**Gate 4 Verdict:** [✅ PASS / ❌ FAIL — list failures]

## Goal-Backward Check

<!-- The critical step — catches "all green but wrong outcome" -->

**Phase Goal:** [Restate the phase goal from ROADMAP.md]

| # | Success Criterion | Is This TRUE Now? | Evidence |
|---|-------------------|:-----------------:|----------|
| 1 | [Criterion from SPECS.md] | [✅/❌] | [Where to verify — component path, visual check] |
| 2 | [Criterion from SPECS.md] | [✅/❌] | [Evidence] |
| 3 | [Criterion from SPECS.md] | [✅/❌] | [Evidence] |

**Meta-question:** Would Designer approve the UI and Techlead accept the code quality?
**Answer:** [Yes — ready for handoff / No — list gaps]

## Verdict

<!-- Final verdict combining all checks -->

- **3-Level Verification:** [ALL PASS / X failures]
- **Self-Review:** [Clean / X auto-fixes applied]
- **Compare-UI:** [Match / X discrepancies]
- **Gate 4:** [PASS / FAIL]
- **Goal-Backward:** [Achieved / Gaps found]

### Overall: [✅ PASS — mark phase complete / ⚠️ GAPS — list fixes needed]

[If GAPS: List gaps with fix instructions. Max 1 revision — second failure escalates to human.]

---

## Instructions

**How to fill this template:**

1. **3-Level Verification:** Check each component/file — exists, has substance, uses design tokens
2. **Self-Review:** Run 8-point FE quality check — auto-fix what you can, flag the rest
3. **Compare-UI:** Run compare-ui workflow, summarize match scores and discrepancies
4. **Gate 4:** Binary pass/fail on each item — no partial credit
5. **Goal-Backward:** Restate goal, check each criterion with evidence, ask meta-question
6. **Verdict:** Combine all results — only PASS if ALL sections pass

**FE-specific verification focus:**
- Figma fidelity: UI must match design at all breakpoints
- Interaction states: all 7 states (default, hover, active, disabled, error, empty, loading) when applicable
- Design tokens: zero hardcoded colors, spacing, typography values
- Responsive: verified at mobile, tablet, desktop breakpoints
- Accessibility: semantic HTML, proper focus management, keyboard navigation

**Routing:**
- ALL PASS → Mark phase complete in STATE.md, suggest `/makeit:plan-phase` or `/makeit:verify-work`
- GAPS FOUND → If 0 revisions → list gaps, suggest re-execute. If 1 revision done → ESCALATE to user

---

## Filled Example

```markdown
## Verdict

- **3-Level Verification:** ALL PASS (3/3 deliverables)
- **Self-Review:** 1 auto-fix applied (replaced hardcoded #333 with --color-text)
- **Compare-UI:** Match (2 minor spacing discrepancies — within tolerance)
- **Gate 4:** PASS (7/7 items)
- **Goal-Backward:** Achieved — all 3 success criteria verified

### Overall: ✅ PASS — phase 02 complete, ready for Phase 03 or verify-work
```
