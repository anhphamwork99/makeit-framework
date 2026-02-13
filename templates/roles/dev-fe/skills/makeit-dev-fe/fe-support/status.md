---
name: fe-status
description: FE sprint status — quick view of current sprint state, route to next action
---

<purpose>
Quick sprint status check — shows where you are and what to do next. Lighter than progress, focuses on routing.
</purpose>

<process>
  <step name="find_sprint">
    Search `.makeit/sprint/` for non-complete STATE.md files.
    If none → "No active sprint. Use `/makeit:clarify` to start."
  </step>

  <step name="display_status">
    ```
    📍 Sprint: SPRINT-{NNN} — {goal}
    🔄 Phase {N}: {name} — {status}
    👉 Next: {suggested command}
    ```
  </step>

  <step name="route_next">
    | State | Route |
    |-------|-------|
    | pending | `/makeit:plan-phase` |
    | planning | Continue planning |
    | executing | `/makeit:execute-phase` |
    | verifying | `/makeit:verify-phase` |
    | all done | `/makeit:verify-work` |
    | verified | `/makeit:complete` |
  </step>
</process>
