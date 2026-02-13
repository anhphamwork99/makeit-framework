---
name: makeit:pause-work
description: Save context checkpoint when pausing mid-phase
---

<objective>
Create a context checkpoint when PO needs to pause work mid-phase — captures current state, progress, and next steps for seamless resume in a new session.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-lifecycle/pause-work.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → "Nothing to pause."
  </step>

  <step name="execute">
    Follow skill instructions to:
    1. Capture current state (phase, task, progress)
    2. Save checkpoint to STATE.md Session Continuity section
    3. Confirm pause with resume instructions
  </step>
</process>

<success_criteria>
- [ ] STATE.md updated with pause checkpoint
- [ ] Resume instructions provided
</success_criteria>
