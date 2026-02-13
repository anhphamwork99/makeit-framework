---
name: makeit:verify-phase
description: Verify phase output — goal-backward check + Gate 1 sender + PO quality checks
---

<objective>
Verify phase output using goal-backward methodology with PO-specific quality checks. Catches "all green but wrong outcome" — ensures deliverables achieve the phase goal, not just complete tasks.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-verification/stage-verify-phase.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → "No active sprint. Run /makeit:start-sprint to start."
    Read STATE.md → current phase, verify it's in `executing` or `verifying` state.
    If phase not executed → "Phase not executed yet. Run /makeit:execute-phase first."
  </step>

  <step name="execute">
    Follow stage skill to:
    1. Run 3-level verification on all deliverables
    2. Run PO-specific quality checks (mode-aware)
    3. Run Gate 1 sender check (Mode 1) or review quality check (Mode 2)
    4. Run goal-backward check
    5. Present results for PO review
  </step>

  <step name="suggest_next">
    ALL PASS → more phases? `/makeit:plan-phase` : `/makeit:verify-work`
    GAPS → list fixes, re-execute, max 1 revision
  </step>
</process>

<success_criteria>
- [ ] 3-level verification applied
- [ ] PO quality checks passed
- [ ] Goal-backward confirms phase goal achieved
- [ ] STATE.md updated
</success_criteria>
