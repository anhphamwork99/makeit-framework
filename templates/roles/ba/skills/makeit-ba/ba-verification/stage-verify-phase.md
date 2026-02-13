---
name: ba-stage-verify-phase
description: BA phase verification — goal-backward check with Gate 2 quality checks and self-review integrated
---

<purpose>
Verify phase output using goal-backward methodology with integrated Gate 2 quality checks and BA self-review — catches "all green but wrong outcome".
</purpose>

<required_reading>
@ba-execution/stage-execute-phase.md
@ba-planning/stage-plan-phase.md
@ba-verification/stage-verify-work.md
@ba-verification/templates/VERIFICATION-REPORT.md
@_shared/references/quality-gates.md
</required_reading>

<rules>
1. Goal-backward first — "Did we achieve the goal?" not "Did we complete tasks?"
2. Gate 2 is mandatory — BA output must pass quality gate before handoff
3. Self-review before gate — auto-fix issues before formal check
4. Max 1 revision — second failure escalates to human
5. Always update STATE.md — record verification result
</rules>

<output>
Verification report using template: @ba-verification/templates/VERIFICATION-REPORT.md

Result routing:
- **PASS** → mark phase complete, suggest next phase or `/makeit:verify-work`
- **GAPS** → list gaps with fix instructions, route to re-plan (max 1 revision)
</output>

<process>
  <step name="gather_context">
    1. Read STATE.md → current phase, execution summary
    2. Read `phases/{NN}-{name}/PLAN.md` → task list, verification criteria
    3. Read SPECS.md → sprint-level success criteria
    4. Read ROADMAP.md → phase goal description
    5. List deliverables produced
  </step>

  <step name="run_3_level_verification">
    For each deliverable:

    **Level 1 — Existence:** File exists at expected path? File is not empty?
    **Level 2 — Substantive:** Has real content (not stubs)? No "TBD"/"TODO"? Required sections present?
    **Level 3 — Wired:** Connects to SPECS.md goals? References upstream inputs? Downstream (Techlead) can use it?
  </step>

  <step name="ba_self_review">
    Internal quality check before formal gate verification.

    For each user story, check:
    1. User story format ("As a... I want... So that...")
    2. Acceptance criteria ≥3 checkable items
    3. Figma design link attached and accessible
    4. Edge cases documented
    5. Dependencies identified
    6. Source context (PO Goal + Design specs reference)
    7. Lark task metadata

    Auto-fix: Story format, AC count, edge cases, source context, Figma links.
    Flag for user: Lark updates, dependency status, Figma access issues.
  </step>

  <step name="gate_2_formal_check">
    Binary pass/fail gate.
    Run Gate 2 verification using formal checklist from `@_shared/references/quality-gates.md`.
    ALL PASS ✅ → Ready for handoff. HAS FAILURES ❌ → List failures with fix instructions.
  </step>

  <step name="goal_backward_check">
    The critical step — catches "all green but wrong outcome":
    1. State the phase GOAL (from ROADMAP.md)
    2. For each success criterion: Is this now TRUE? Evidence?
    3. Meta-question: "Would Techlead be able to proceed with confidence using these deliverables?"
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

**Khi Figma design đã thay đổi sau khi stories được viết:** Trong bước `ba_self_review`, kiểm tra Figma links trong stories còn valid và match content hiện tại không. Nếu design changed → flag stories affected, route về `stage-execute-phase` để update stories. Không pass Gate 2 với stories dựa trên stale design.

**Khi verification passes nhưng downstream (Techlead/Dev) phát hiện issues sau:** Nếu nhận feedback post-handoff → tạo revision task trong phase mới (không reopen phase đã close). Record lesson learned: "Issue not caught at verification — root cause: {reason}." Suggest cải thiện verification checklist cho sprint sau.

**Khi AI output liên tục cần revision — pattern của quality degradation:** Nếu đã hit max 1 revision VÀ vẫn fail → ⚠️ STOP — Quality pattern issue, không phải bug đơn lẻ. Escalate cho user với gợi ý: "Output quality consistently below bar. Possible causes: prompt quá vague, context thiếu, hoặc task vượt AI capability. Suggest: review skill instructions hoặc `/makeit:lesson-learned`."

</edge_cases>

<success_criteria>
- [ ] 3-level verification applied to all deliverables
- [ ] BA self-review completed with auto-fixes applied
- [ ] Gate 2 formal check passed
- [ ] Goal-backward check confirms phase goal achieved
- [ ] STATE.md updated with verification result
</success_criteria>
