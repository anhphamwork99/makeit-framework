---
name: po-resume-work
description: PO resume-work — restore context from previous pause and continue from checkpoint
---

<purpose>
Restore PO sprint context from previous pause and continue work from the saved checkpoint.
</purpose>

<process>
  <step name="find_checkpoint">
    1. Find most recent sprint: `.makeit/sprint/SPRINT-*`
    2. Read STATE.md → look for Session Continuity section
    3. If no checkpoint → report "No paused work found" and suggest `/makeit:status`
  </step>

  <step name="restore_context">
    Load from checkpoint:
    - Sprint ID, mode, current phase, task in progress
    - Deliverables completed, items remaining
    - Context notes from previous session
  </step>

  <step name="present_resume">
    Display restored context:
    ```
    🔄 Resuming PO Sprint

    Sprint: SPRINT-{NNN}
    Mode: {Backlog Creation / PR Review}
    Paused at: {timestamp}
    Phase: {NN} — {name}
    Progress: {X}/{Y} tasks done

    Remaining:
    - {task 1}
    - {task 2}

    Context notes: {saved notes}
    ```

    Suggest next action based on state.
    Clear Session Continuity section from STATE.md.
  </step>
</process>

<success_criteria>
- [ ] Checkpoint found and loaded
- [ ] Context accurately restored
- [ ] Next action suggested
- [ ] Session Continuity section cleared
</success_criteria>
