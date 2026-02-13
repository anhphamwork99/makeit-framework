---
name: makeit:verify-phase
description: Goal-backward check on phase output — Gate 3 quality verification
---

<objective>
Verify a completed phase's output using goal-backward checking and Gate 3 quality standards. Ensures task breakdowns are ready for Dev FE/BE handoff.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-verification/stage-verify-phase.md
@.agent/skills/makeit-techlead/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase, verify all tasks are "complete".
  </step>

  <step name="gather_deliverables">
    Read PLAN.md → expected deliverables.
    Read actual deliverable files → verify existence and content.
    Read ROADMAP.md → phase goal for backward check.
  </step>

  <step name="verify">
    Follow skill instructions:
    - Level 1: Existence check (files exist, not empty)
    - Level 2: Substantive check (quality, completeness)
    - Level 3: Gate 3 formal checklist
    - Self-review criteria applied
  </step>

  <step name="report">
    Display verification result with pass/fail details.
    If pass → suggest `/makeit:verify-work` or next phase
    If gaps → suggest specific fixes
  </step>
</process>

<success_criteria>
- [ ] Phase deliverables gathered
- [ ] Goal-backward check applied
- [ ] Gate 3 checklist verified
- [ ] STATE.md updated with verification result
- [ ] User informed of pass/fail with next steps
</success_criteria>
