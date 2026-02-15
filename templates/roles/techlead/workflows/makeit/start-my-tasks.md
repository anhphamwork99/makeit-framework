---
name: makeit:start-my-tasks
description: Select personal tasks from BA handoff (Mode 1) or Dev handoff (Mode 2) and create focused workspace
---

<objective>
TL task selection — detect mode (task breakdown vs code review), read upstream HANDOFF.md, display tasks with smart filtering, create scoped workspace.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-discovery/start-my-tasks.md
</execution_context>

<process>
  <step name="start_my_tasks">
    Follow the TL start-my-tasks skill to:
    1. Auto-detect mode by checking which HANDOFF files exist
    2. Mode 1 (BA): Read BA's HANDOFF.md, parse task table, select tasks → `/makeit:plan-phase`
    3. Mode 2 (Dev): Read Dev FE/BE HANDOFF.md, parse PR table, select PRs → `/makeit:execute-phase`
    4. Smart highlight by user_name from config
    5. Create TL workspace with MY-TASKS.md, SPECS.md, STATE.md
    6. Recommend next command based on detected mode
  </step>
</process>

<success_criteria>
- [ ] Mode detected correctly
- [ ] HANDOFF.md read and task table parsed
- [ ] Tasks selected and workspace created
- [ ] Next step recommended based on mode
</success_criteria>
