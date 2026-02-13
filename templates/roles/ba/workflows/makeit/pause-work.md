---
name: makeit:pause-work
description: Save current sprint context for later resume — creates a handoff document
---

<objective>
Capture the current sprint state and working context into a handoff document before pausing work. Ensures a fresh session (or future Agent) can resume seamlessly without context loss. Critical for part-time, async team workflow.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-lifecycle/pause-work.md
</execution_context>

<process>
  <step name="load_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse: current phase, what was in progress, pending decisions, blockers.
    If no sprint → warn: "No active sprint to pause."
  </step>

  <step name="capture_state">
    Create comprehensive context snapshot:
    - Current phase and task in progress
    - What's done vs what remains
    - Open questions or blockers
    - Key decisions made this session
    - Files modified but not committed
    - What the next Agent should do first
  </step>

  <step name="create_handoff">
    Write handoff to `.makeit/sprint/SPRINT-*/HANDOFF-PAUSE.md`:
    - Session summary
    - Resume instructions (step-by-step)
    - Context snapshot
    - Next action suggestion

    Update STATE.md:
    - Status → "paused"
    - Last activity → pause timestamp
    - Resume file → path to HANDOFF-PAUSE.md
  </step>

  <step name="report">
    Display: "Sprint paused. Context saved."
    Show resume instructions:
    ```
    /makeit:resume-work    → resume from where you left off
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint state captured completely
- [ ] HANDOFF-PAUSE.md created with resume instructions
- [ ] STATE.md updated with paused status and resume file
- [ ] User informed how to resume
</success_criteria>
