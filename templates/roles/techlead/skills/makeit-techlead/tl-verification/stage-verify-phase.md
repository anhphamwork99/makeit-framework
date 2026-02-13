---
name: tl-stage-verify-phase
description: TL verify phase — goal-backward check with Gate 3 quality checks and TL self-review
---

<purpose>
Verify a completed phase's output using goal-backward checking. Applies Gate 3 quality standards and TL self-review criteria to ensure deliverables are ready for Dev handoff.
</purpose>

<required_reading>
- `.agent/skills/makeit-techlead/_shared/references/quality-gates.md` — Gate 3 formal checks
- `.agent/skills/makeit-techlead/_shared/references/coding-standards.md` — Technical standards
- `@tl-verification/templates/VERIFICATION-REPORT.md` — Template for verification output
</required_reading>

<rules>
1. Verify backward from goal → deliverables → tasks (not forward from tasks)
2. Gate 3 is formal — every item must be checked
3. Self-review criteria from `tl-review/self-review.md` apply
4. If ANY gate item fails → specific remediation suggested
5. Never auto-pass — be honest about gaps
</rules>

<process>
  <step name="gather_context">
    Read:
    1. ROADMAP.md → phase goal
    2. PLAN.md → expected deliverables
    3. STATE.md → execution status (all tasks should be "complete")
    4. Actual deliverable files → verify existence and content
  </step>

  <step name="level1_existence_check">
    For each expected deliverable in PLAN.md:
    - Does the file exist at the specified path?
    - Is it non-empty (not just a template header)?
    - Does it follow the expected template format?
  </step>

  <step name="level2_substantive_check">
    For each deliverable, verify content quality:

    **Task Breakdowns:**
    - FE tasks separated from BE tasks?
    - Each task has complexity, dependency, AC?
    - API contracts defined for FE/BE coordination?

    **Solution Designs:**
    - Architecture rationale documented?
    - Trade-offs explicitly stated?
    - Follow-up actions listed?

    **Estimations:**
    - All tasks estimated with methodology?
    - Risk factors identified?
    - FE/BE split calculated?

    **Code Reviews:**
    - All checklist items checked (not skipped)?
    - AI-generated code oversight applied?
    - Verdict with clear reasoning?
  </step>

  <step name="level3_gate3_check">
    Apply formal Gate 3 (TL → Dev) checklist:

    | # | Check Item | Status |
    |---|-----------|--------|
    | 1 | Task break rõ ràng: FE tasks tách biệt BE tasks | ✅/❌ |
    | 2 | Scope cụ thể: mô tả rõ cần implement cái gì | ✅/❌ |
    | 3 | User story reference: link đến BA story | ✅/❌ |
    | 4 | Technical constraints noted | ✅/❌ |
    | 5 | API contract defined (if FE/BE coordinate) | ✅/❌ |
    | 6 | Estimation hợp lý: effort estimated | ✅/❌ |
    | 7 | Lark task has correct sprint, priority, assignee | ✅/❌ |
  </step>

  <step name="self_review">
    Apply TL self-review criteria:
    - Task breakdown quality (atomic, clear scope)
    - Technical completeness (no gaps in constraints or dependencies)
    - Ambiguity check (Dev can work independently without asking TL)
  </step>

  <step name="route_result">
    Based on verification:

    **All Pass:**
    ```
    ✅ Phase {N} verified — Gate 3 ready
    💡 Next: /makeit:verify-work (if last phase) or /makeit:plan-phase {N+1}
    ```

    **Gaps Found:**
    ```
    ⚠️ Phase {N} has gaps:
    - {gap 1}: {specific fix needed}
    - {gap 2}: {specific fix needed}

    💡 Fix: /makeit:execute-phase (re-run specific tasks)
    ```
  </step>
</process>

<edge_cases>

**Khi verification phát hiện task breakdown thiếu tasks hoặc sai scope:** Nếu goal-backward check cho thấy deliverables không cover hết phase goal → liệt kê cụ thể những gì thiếu, suggest re-run execute-phase cho specific tasks. Không auto-pass nếu có gaps — even minor gaps phải được fix trước handoff.

**Khi Gate 3 bị fail nhiều lần (>2 rounds) trên cùng items:** Nếu cùng gate items fail lặp đi lặp lại → ⚠️ STOP — Structural problem với TL output quality hoặc misaligned expectations với Dev. Cần sync meeting giữa TL và Dev để align standards. Ghi nhận pattern trong lesson-learned. Log vào STATE.md.

</edge_cases>

<success_criteria>
- [ ] Phase goal matched against deliverables
- [ ] All deliverables exist and have content
- [ ] Content quality verified (not stubs)
- [ ] Gate 3 checklist applied
- [ ] Self-review passed
- [ ] VERIFICATION-REPORT.md created (use `@tl-verification/templates/VERIFICATION-REPORT.md`)
- [ ] STATE.md updated with verification result
- [ ] User informed of pass/fail with specific gaps
</success_criteria>
