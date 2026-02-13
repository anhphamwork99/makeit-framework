---
name: po-pause-work
description: PO pause-work — save context checkpoint when pausing mid-phase for session continuity
---

<purpose>
Create a context checkpoint when PO needs to pause work mid-phase — captures current state, progress, and next steps for seamless resume.
</purpose>

<process>
  <step name="capture_state">
    Read STATE.md and capture:
    - Current sprint, phase, task in progress
    - Deliverables completed so far
    - Items partially done + what's remaining
  </step>

  <step name="create_checkpoint">
    Update STATE.md with pause info:
    ```markdown
    ## Session Continuity
    - **Paused at:** {YYYY-MM-DD HH:MM}
    - **Phase:** {NN} — {name}
    - **Task in progress:** {task description}
    - **Completed:** {list of done items}
    - **Remaining:** {list of pending items}
    - **Context notes:** {anything important to remember}
    - **Resume with:** `/makeit:resume-work`
    ```
  </step>

  <step name="confirm">
    Display pause confirmation with resume instructions.
  </step>
</process>

<success_criteria>
- [ ] STATE.md updated with pause checkpoint
- [ ] All progress captured
- [ ] Resume instructions provided
</success_criteria>
