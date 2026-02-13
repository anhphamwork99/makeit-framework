---
name: fe-resume-work
description: FE context restore — restore sprint context from STATE.md and continue from pause point
---

<purpose>
Restore full FE sprint context from STATE.md and continue from the exact point where work was paused, in any session.
</purpose>

<process>
  <step name="find_sprint">
    1. Search `.makeit/sprint/` for non-complete STATE.md files
    2. If multiple found → ask user which to resume
    3. If none found → "No active sprint. Use `/makeit:clarify` to start."
  </step>

  <step name="restore_context">
    Read in order:
    1. **STATE.md** → sprint state + pause context
    2. **SPECS.md** → sprint requirements (skim — focus on current phase)
    3. **ROADMAP.md** → phase plan (focus on current/next phase)
    4. **Current phase PLAN.md** → if exists, task list
    5. **Current phase CONTEXT.md** → if exists, decisions
  </step>

  <step name="assess_position">
    From pause context, determine:
    - What was the last completed action?
    - What is the specific next action?
    - Are there any blockers to resolve first?
    - Any sub-agents that should have returned?
    - Any in-progress component files to review?
  </step>

  <step name="present_resume">
    ```
    🔄 Resuming Sprint SPRINT-{NNN}

    📍 Last position: Phase {N} — {status}
    📝 Last action: {what was completed}
    👉 Next action: {specific next step}

    Sprint Progress:
    ├── Phase 1: ✅
    ├── Phase 2: 🔄 ← you are here
    └── Phase 3: ⏳

    💡 Suggested: {command to continue}
    ```
  </step>

  <step name="continue_execution">
    Route to the appropriate command based on current state (same mapping as status skill).
  </step>
</process>

<success_criteria>
- [ ] Sprint found and context restored
- [ ] Current position identified
- [ ] Resume summary displayed
- [ ] Next action suggested
</success_criteria>
