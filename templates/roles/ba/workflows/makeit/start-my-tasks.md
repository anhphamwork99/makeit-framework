---
name: makeit:start-my-tasks
description: Select personal tasks from PO handoff and create focused workspace
---

<objective>
BA task selection — read PO's HANDOFF.md, display tasks with smart filtering by user_name, let BA select tasks, create scoped workspace, recommend `/makeit:plan-phase`.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-discovery/start-my-tasks.md
</execution_context>

<process>
  <step name="start_my_tasks">
    Follow the BA start-my-tasks skill to:
    1. Read PO's HANDOFF.md from `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md`
    2. Extract task table from "Tasks For Receiver" section
    3. Smart highlight tasks assigned to user (from `.makeit/config.md` user_name)
    4. Let user select tasks → auto-assign unassigned if selected
    5. Create BA workspace with MY-TASKS.md, SPECS.md, STATE.md
    6. Recommend: `/makeit:plan-phase`
  </step>
</process>

<success_criteria>
- [ ] PO HANDOFF.md read and task table parsed
- [ ] Tasks selected and workspace created
- [ ] Next step (`/makeit:plan-phase`) recommended
</success_criteria>
