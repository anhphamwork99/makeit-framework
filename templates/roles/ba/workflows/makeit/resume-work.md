---
name: makeit:resume-work
description: Restore sprint context from saved state — pick up where you left off
---

<objective>
Restore working context from a previously paused sprint session. Reads the handoff document and STATE.md to reconstruct what was happening, what's next, and any pending decisions. Enables seamless continuation across async sessions.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-lifecycle/resume-work.md
</execution_context>

<process>
  <step name="find_sprint">
    Find active or paused sprint:
    - Check `.makeit/sprint/SPRINT-*/STATE.md` for status "paused" or last active
    - If no sprint found → error: "No sprint to resume. Run /makeit:clarify to start."
  </step>

  <step name="restore_context">
    Read STATE.md for resume file reference.
    Read HANDOFF-PAUSE.md (or latest handoff document).
    Reconstruct context:
    - Where work was paused (phase, task)
    - What's already done
    - Open questions and blockers
    - Uncommitted changes (check git status)
  </step>

  <step name="present_context">
    Display restored context to user:
    - Sprint status summary
    - What was in progress
    - Pending items and blockers
    - Suggested next action

    Update STATE.md:
    - Status → "active" (from "paused")
    - Last activity → resume timestamp
  </step>

  <step name="suggest_next">
    Based on paused state, suggest next command:
    ```
    /makeit:execute-phase    → continue executing tasks
    /makeit:status           → full sprint overview
    ```
  </step>
</process>

<success_criteria>
- [ ] Paused sprint found and context restored
- [ ] User shown clear summary of where things left off
- [ ] STATE.md updated from "paused" to "active"
- [ ] Next action suggested
</success_criteria>
