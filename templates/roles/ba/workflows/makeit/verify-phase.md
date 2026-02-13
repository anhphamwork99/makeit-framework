---
name: makeit:verify-phase
description: Goal-backward check on phase output — verify deliverables meet phase goal + Gate 2 quality
---

<objective>
Verify that a completed phase's deliverables meet its stated goal using goal-backward checking. Applies Gate 2 (BA → Techlead) quality criteria — checks story completeness, acceptance criteria quality, flow coverage, and edge case identification.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-verification/stage-verify-phase.md
@.agent/skills/makeit-ba/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase, verify execution is complete.
    If phase not yet executed → error: "Run /makeit:execute-phase first"
  </step>

  <step name="gather_deliverables">
    Read PLAN.md for the phase — extract must_haves and success criteria.
    Read ROADMAP.md for the phase goal.
    List all deliverables in `.makeit/sprint/SPRINT-*/deliverables/`
    List all deliverables in `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/`
  </step>

  <step name="goal_backward_check">
    For each must_have from the plan:
    - Does a deliverable satisfy this requirement?
    - Is the deliverable quality sufficient (not placeholder/stub)?
    Apply Gate 2 quality checklist from `@_shared/references/quality-gates.md`.
  </step>

  <step name="report_gaps">
    If gaps found → list missing/weak deliverables with specific feedback.
    If all pass → confirm phase verified.
    Update STATE.md with verification result.
  </step>

  <step name="suggest_next">
    Based on result:
    - All pass → `/makeit:verify-work` (validate full sprint) or `/makeit:plan-phase` (next phase)
    - Gaps found → `/makeit:execute-phase` (fix gaps) with gap details
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and phase deliverables gathered
- [ ] Goal-backward check applied against plan must_haves
- [ ] Gate 2 quality criteria checked
- [ ] Gaps reported with actionable feedback (if any)
- [ ] STATE.md updated with verification status
- [ ] User informed of next steps
</success_criteria>
