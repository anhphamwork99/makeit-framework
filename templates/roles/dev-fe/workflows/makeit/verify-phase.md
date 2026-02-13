---
name: makeit:verify-phase
description: Goal-backward check on FE phase output — verify UI matches Figma + Gate 4 quality
---

<objective>
Verify that a completed FE phase's deliverables meet its stated goal using goal-backward checking. Applies Gate 4 quality criteria — checks UI fidelity, interaction states, responsive behavior, design tokens, accessibility.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-verification/stage-verify-phase.md
@.agent/skills/makeit-dev-fe/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase, verify execution is complete.
    If phase not yet executed → error: "Run /makeit:execute-phase first"
  </step>

  <step name="gather_deliverables">
    Read PLAN.md for must_haves and success criteria.
    Read ROADMAP.md for phase goal.
    List all code deliverables produced.
  </step>

  <step name="verify">
    Run 3-level verification (existence, substantive, wired).
    Run FE self-review (code quality, UI comparison, responsive, a11y).
    Run Gate 4 formal check.
    Run goal-backward check.
  </step>

  <step name="route_results">
    All pass → suggest `/makeit:verify-work` or `/makeit:plan-phase` (next phase).
    Gaps found → list with fix instructions → suggest `/makeit:execute-phase`.
    Update STATE.md with verification result.
  </step>
</process>

<success_criteria>
- [ ] 3-level verification applied
- [ ] Self-review + compare-ui completed
- [ ] Gate 4 checked
- [ ] Goal-backward check confirms phase goal
- [ ] STATE.md updated
</success_criteria>
