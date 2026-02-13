---
name: makeit:status
description: Sprint progress, current phase, and suggested next action
---

<objective>
Display current PO sprint state — mode, phase progress, deliverables status, and suggest the next logical command based on current state. Primary orientation tool for resuming work or checking progress.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-support/status.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → display: "No active sprint. Run /makeit:start-sprint to start."
    If found → parse: current phase, mode, phase status, deliverable count.
  </step>

  <step name="execute">
    Follow skill instructions to format sprint status:
    - Sprint name and ID
    - Mode (Backlog Creation / PR Review)
    - Current phase and status
    - Phase progress table
    - Deliverables produced so far
  </step>

  <step name="suggest_next">
    Based on current state, suggest the next logical command:
    - Phase planned but not executed → `/makeit:execute-phase`
    - Phase executed but not verified → `/makeit:verify-phase`
    - All phases complete → `/makeit:verify-work`
    - Sprint verified → `/makeit:complete`
    - No plan for current phase → `/makeit:plan-phase`
  </step>
</process>

<success_criteria>
- [ ] Sprint state loaded and displayed
- [ ] Current position clearly shown
- [ ] Next action suggested based on state
</success_criteria>
