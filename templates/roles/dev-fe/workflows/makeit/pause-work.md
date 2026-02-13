---
name: makeit:pause-work
description: Save FE sprint context for later resume
---

<objective>
Save current FE sprint context — in-progress components, current task, next action — so work can be resumed in a fresh session.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-lifecycle/pause-work.md
</execution_context>

<process>
  <step name="save">
    Capture state: current phase, task, in-progress files, blockers.
    Write pause context to STATE.md. Ensure files saved/committed.
    Display resume instructions.
  </step>
</process>
