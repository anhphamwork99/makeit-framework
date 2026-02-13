---
name: makeit:resume-work
description: Restore sprint context from saved state — pick up where you left off
---

<objective>
Restore working context from a previously paused sprint session. Reads STATE.md to reconstruct what was happening, what's next, and any pending decisions.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-lifecycle/resume-work.md
</execution_context>

<process>
  <step name="find_sprint">
    Search `.makeit/sprint/` for non-complete STATE.md files.
    If multiple → ask which to resume.
    If none → suggest `/makeit:clarify`.
  </step>

  <step name="restore_context">
    Read STATE.md (including pause context), SPECS.md, ROADMAP.md, current PLAN.md.
    Determine: last action, next action, blockers.
  </step>

  <step name="present_resume">
    Display resume summary: position, progress, next action.
    Suggest appropriate command to continue.
  </step>
</process>

<success_criteria>
- [ ] Sprint found and context restored
- [ ] Current position identified
- [ ] Next action suggested
</success_criteria>
