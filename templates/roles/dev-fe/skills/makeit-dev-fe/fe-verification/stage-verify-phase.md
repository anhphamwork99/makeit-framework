---
name: fe-stage-verify-phase
description: FE phase verification — goal-backward check with Gate 4 quality checks, self-review, compare-ui, and coding standards verification
---

<purpose>
Verify phase output using goal-backward methodology with integrated Gate 4 quality checks, FE self-review, and UI comparison — catches "all green but wrong outcome".
</purpose>

<required_reading>
@fe-execution/stage-execute-phase.md
@fe-planning/stage-plan-phase.md
@fe-verification/stage-verify-work.md
@fe-verification/templates/VERIFICATION-REPORT.md
@fe-verification/workflows/self-review.md
@fe-execution/workflows/compare-ui.md
@_shared/references/quality-gates.md
@_shared/references/coding-standards.md
</required_reading>

<rules>
1. Goal-backward first — "Did we achieve the goal?" not "Did we complete tasks?"
2. Gate 4 is mandatory — FE output must pass quality gate before handoff
3. Self-review + compare-ui before gate — auto-fix issues before formal check
4. Max 1 revision — second failure escalates to human
5. Always update STATE.md — record verification result
</rules>

<output>
Verification report → `.makeit/sprint/SPRINT-{NNN}/phases/{NN}-{name}/VERIFICATION-REPORT.md`

Use template: `@fe-verification/templates/VERIFICATION-REPORT.md`

Result:
- **PASS** → mark phase complete, suggest next phase or `/makeit:verify-work`
- **GAPS** → list gaps with fix instructions, route to re-plan (max 1 revision)
</output>

<process>
  <step name="gather_context">
    1. Read STATE.md → current phase, execution summary
    2. Read `phases/{NN}-{name}/PLAN.md` → task list, verification criteria
    3. Read SPECS.md → sprint-level success criteria
    4. Read ROADMAP.md → phase goal description
    5. List deliverables produced (code files, components)
  </step>

  <step name="run_3_level_verification">
    For each deliverable:

    **Level 1 — Existence:** File exists at expected path? Component renders without crash?
    **Level 2 — Substantive:** Has real implementation (not stubs/TODOs)? All states handled?
    **Level 3 — Wired:** Connects to SPECS.md goals? Uses design tokens? Responsive?
  </step>

  <step name="fe_self_review">
    Internal quality check using `@fe-verification/workflows/self-review.md`.

    For each component, check:
    1. UI matches Figma design (visual check via compare-ui)
    2. All interaction states: hover, active, disabled, error, empty, loading
    3. Responsive on all breakpoints
    4. Design tokens used — no hardcoded colors/spacing
    5. Component-based architecture — single responsibility
    6. No console errors/warnings
    7. Accessibility basics: semantic HTML, alt text, keyboard nav
    8. TypeScript types correct — no `any`, proper interfaces

    Auto-fix: Import issues, minor styling fixes, missing types.
    Flag for user: Architecture changes, missing states, performance concerns.
  </step>

  <step name="gate_4_formal_check">
    Binary pass/fail gate.
    Run Gate 4 verification using formal checklist from `@_shared/references/quality-gates.md`.
    ALL PASS ✅ → Ready for handoff. HAS FAILURES ❌ → List failures with fix instructions.
  </step>

  <step name="goal_backward_check">
    The critical step — catches "all green but wrong outcome":
    1. State the phase GOAL (from ROADMAP.md)
    2. For each success criterion: Is this now TRUE? Evidence?
    3. Meta-question: "Would Designer approve and Techlead accept this implementation?"
  </step>

  <step name="route_results">
    **ALL PASS ✅:**
    Mark phase complete in STATE.md. Check ROADMAP.md for more phases.
    Suggest: `/makeit:plan-phase` (next phase) or `/makeit:verify-work` (all phases done).

    **GAPS FOUND ⚠️:**
    If 0 revisions → list gaps, suggest re-plan, increment revision counter.
    If 1 revision done → ESCALATE to user (max 1 revision rule).
  </step>
</process>

<edge_cases>

**Khi Figma design đã thay đổi kể từ lúc bắt đầu implement:** Trong bước goal-backward check, re-fetch Figma screenshots và so sánh với design ban đầu trong SPECS.md. Nếu phát hiện design đã cập nhật → thông báo user: "Design đã thay đổi — verification dựa trên design mới hay design ban đầu?" Chờ quyết định trước khi continue.

**Khi implementation có subtle visual differences** (spacing 1-2px, font weight, shadow opacity lệch nhẹ): Đánh giá mức độ lệch — nếu ≤3 deviations nhỏ và không ảnh hưởng UX → ghi nhận trong verification report với tag "minor-visual-diff" và suggest fix trước khi PR. Nếu >3 deviations hoặc có deviation ảnh hưởng readability/usability → flag là GAPS và yêu cầu fix trước khi pass.

</edge_cases>

<success_criteria>
- [ ] 3-level verification applied to all deliverables
- [ ] FE self-review completed with auto-fixes applied
- [ ] Compare-UI run against Figma designs
- [ ] Gate 4 formal check passed
- [ ] Goal-backward check confirms phase goal achieved
- [ ] STATE.md updated with verification result
</success_criteria>
