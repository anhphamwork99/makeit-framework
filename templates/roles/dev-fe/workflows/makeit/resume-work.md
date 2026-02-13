---
name: makeit:resume-work
description: Restore FE sprint context from previous session
---

<objective>
Restore full FE sprint context from STATE.md and continue from the exact point where work was paused.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-lifecycle/resume-work.md
</execution_context>

<process>
  <step name="restore">
    Find sprint with pause context. Read STATE.md, SPECS.md, ROADMAP.md, current phase.
    Determine last action and next action. Display resume summary.
    Route to appropriate command.
  </step>
</process>
