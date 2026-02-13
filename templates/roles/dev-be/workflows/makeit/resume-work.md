---
name: makeit:resume-work
description: Restore BE sprint context from saved state and continue from pause point
---

<objective>
Restore full BE sprint context from STATE.md and continue from the exact point where work was paused. Includes migration status check.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-lifecycle/resume-work.md
</execution_context>

<process>
  <step name="find_sprint">
    Search `.makeit/sprint/` for non-complete STATE.md files.
    If multiple → ask user which to resume.
    If none → "No active sprint. Use `/makeit:clarify` to start."
  </step>

  <step name="restore_context">
    Read STATE.md (pause context), SPECS.md, ROADMAP.md, current PLAN.md.
    Check pending migrations and git status.
  </step>

  <step name="present_resume">
    Display resume summary with last position, next action, migration warnings.
    Route to appropriate command.
  </step>
</process>

<success_criteria>
- [ ] Sprint found and context restored
- [ ] Migration status checked
- [ ] Next action suggested
</success_criteria>
