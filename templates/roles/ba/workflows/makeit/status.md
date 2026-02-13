---
name: makeit:status
description: Sprint progress, current phase, and suggested next action
---

<objective>
Display current sprint state — phase progress, deliverable status, recent activity, and suggest the next logical command based on current state. Primary orientation tool for resuming work or checking progress.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-support/status.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → display: "No active sprint. Run /makeit:clarify to start."
    If found → parse: current phase, phase status, deliverable count, blockers.
  </step>

  <step name="execute">
    Follow skill instructions to format sprint status:
    - Sprint name and ID
    - Current phase and status (planning / executing / verifying / complete)
    - Phase progress bar
    - Deliverables produced so far
    - Recent activity (last 3-5 actions from STATE.md)
    - Any blockers or open questions
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
