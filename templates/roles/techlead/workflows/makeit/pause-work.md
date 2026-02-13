---
name: makeit:pause-work
description: Save current sprint context for later resume — creates handoff state
---

<objective>
Capture current TL sprint state and working context into STATE.md before pausing work. Ensures a fresh session can resume seamlessly.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-lifecycle/pause-work.md
</execution_context>

<process>
  <step name="capture_state">
    Read active sprint STATE.md, current task, in-progress files.
    Capture: phase, task, status, blockers, next action.
  </step>

  <step name="save_context">
    Write pause context to STATE.md.
    Git commit WIP if appropriate.
  </step>

  <step name="report">
    Display pause confirmation with resume instructions:
    `/makeit:resume-work`
  </step>
</process>

<success_criteria>
- [ ] Context captured in STATE.md
- [ ] In-progress files saved
- [ ] Resume instructions displayed
</success_criteria>
