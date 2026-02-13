---
name: makeit:status
description: Show current sprint status — phases, deliverables, and suggested next command
---

<objective>
Quick orientation — display current TL sprint state, phase progress, deliverable status, and suggest the next command. Lightweight alternative to progress.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-support/status.md
</execution_context>

<process>
  <step name="load_state">
    Read `.makeit/sprint/SPRINT-*/STATE.md` → sprint status, phase progress.
  </step>

  <step name="display_status">
    Show: sprint goal, current phase, phase progress, deliverable counts.
    Suggest next command based on current state.
  </step>
</process>

<success_criteria>
- [ ] Sprint state displayed
- [ ] Next command suggested
</success_criteria>
