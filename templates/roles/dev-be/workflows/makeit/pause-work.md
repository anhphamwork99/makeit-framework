---
name: makeit:pause-work
description: Save BE sprint context for later resume — includes migration status check
---

<objective>
Save current BE sprint context so work can be resumed later in a fresh session without losing progress. Includes migration status warning.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-lifecycle/pause-work.md
</execution_context>

<process>
  <step name="capture_state">
    Read active sprint STATE.md, current task, in-progress files.
    ⚠️ Check for pending/uncommitted migrations.
  </step>

  <step name="create_pause_context">
    Update STATE.md with pause information:
    - Paused at timestamp, current phase/task/status
    - In-progress files, pending migrations
    - Next action for resume
  </step>

  <step name="ensure_saved">
    Check all files saved. Git commit WIP if appropriate.
    Warn about uncommitted migrations.
  </step>

  <step name="present_resume_instructions">
    Display pause confirmation with resume command: `/makeit:resume-work`
  </step>
</process>

<success_criteria>
- [ ] State captured and saved to STATE.md
- [ ] Migration status checked
- [ ] Resume instructions displayed
</success_criteria>
