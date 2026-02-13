---
name: tl-pause-work
description: TL context save — save sprint context and create handoff state for later resume
---

<purpose>
Save current TL sprint context so work can be resumed later in a fresh session without losing progress.
</purpose>

<rules>
1. Always capture in-progress files — don't lose partial work
2. WIP commit if appropriate — save work in git
3. Pause context in STATE.md — must be machine-readable for resume-work
</rules>

<process>
  <step name="capture_state">
    Read and summarize from active sprint:
    1. **STATE.md** → current phase, status, progress
    2. **Current task** → what was being worked on
    3. **In-progress files** → any partially created deliverables
    4. **Decisions made** → from DECISIONS.md if exists
    5. **Blockers** → anything preventing progress
  </step>

  <step name="create_pause_context">
    Update STATE.md with pause information:
    ```markdown
    ## Pause Context
    - **Paused at:** {timestamp}
    - **Phase:** {current phase number and name}
    - **Task:** {what was being done}
    - **Status:** {where in task — planning, executing, verifying}
    - **In-progress files:** {list of partially complete files}
    - **Next action:** {specific thing to do when resuming}
    - **Blockers:** {any unresolved items}
    ```
  </step>

  <step name="ensure_saved">
    1. Check all in-progress files are saved to disk
    2. Warn about any unsaved changes
    3. Git commit in-progress work if appropriate (WIP commit)
  </step>

  <step name="present_resume_instructions">
    ```
    ⏸️ Work paused for Sprint SPRINT-{NNN}

    📍 Paused at: Phase {N} — {task description}
    📝 Resume with: `/makeit:resume-work`

    Context saved in STATE.md — resume from any session.
    ```
  </step>
</process>

<success_criteria>
- [ ] Current state captured
- [ ] Pause context written to STATE.md
- [ ] In-progress files saved/committed
- [ ] Resume instructions displayed
</success_criteria>
