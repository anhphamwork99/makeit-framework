---
name: makeit:resume-work
description: Restore context from previous pause and continue
---

<objective>
Restore PO sprint context from a previous pause and continue work from the saved checkpoint. Loads completion state, remaining tasks, and context notes.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-lifecycle/resume-work.md
</execution_context>

<process>
  <step name="gather_context">
    Find most recent sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Look for Session Continuity section.
    If no checkpoint → "No paused work found. Run /makeit:status for current state."
  </step>

  <step name="execute">
    Follow skill instructions to:
    1. Load checkpoint data
    2. Restore context (phase, progress, remaining tasks)
    3. Present resume summary
    4. Clear Session Continuity section
    5. Suggest next action
  </step>
</process>

<success_criteria>
- [ ] Context restored from checkpoint
- [ ] Next action suggested
</success_criteria>
