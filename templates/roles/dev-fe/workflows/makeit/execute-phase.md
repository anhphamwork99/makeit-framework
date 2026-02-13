---
name: makeit:execute-phase
description: Execute FE plan tasks — implement components from Figma, manage STOP mechanism
---

<objective>
Execute all tasks in the current phase PLAN.md using FE internal workflows (implement, compare-ui). Routes tasks to correct workflow, manages STOP mechanism for destructive operations, and tracks progress in STATE.md.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-execution/stage-execute-phase.md
@.agent/skills/makeit-dev-fe/_shared/references/sub-agent-spawning.md
@.agent/skills/makeit-dev-fe/_shared/references/figma-mcp.md
@.agent/skills/makeit-dev-fe/_shared/references/coding-standards.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Read PLAN.md for current phase. Determine first incomplete task.
    If no plan → error: "Run /makeit:plan-phase first"
  </step>

  <step name="execute_tasks">
    For each task in PLAN.md:
    - If spawn decision = spawn → spawn sub-agent, wait for return
    - If inline → route to internal workflow (implement, compare-ui)
    - ⚠️ STOP before destructive operations
    - Update STATE.md after each task
  </step>

  <step name="report">
    Display execution summary: tasks completed, deliverables produced, issues.
    Suggest: `/makeit:verify-phase`.
  </step>
</process>

<success_criteria>
- [ ] All plan tasks executed in order
- [ ] STOP mechanism respected
- [ ] STATE.md updated after each task
- [ ] User informed of next steps
</success_criteria>
