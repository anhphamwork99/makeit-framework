---
name: makeit:status
description: Quick FE sprint status check — current phase, route to next action
---

<objective>
Display current FE sprint status and route to the next appropriate command based on current state.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-support/status.md
</execution_context>

<process>
  <step name="check">
    Find active sprint. Display: sprint ID, goal, current phase, status.
    Suggest next command based on current state.
    If no sprint → "Use /makeit:clarify to start"
  </step>
</process>
