---
name: makeit:start-my-tasks
description: Select personal FE tasks from TL handoff and create focused workspace
---

<objective>
Dev FE task selection — read TL's HANDOFF.md, filter to "For FE" tasks, display with smart filtering by user_name, let Dev FE select tasks, create scoped workspace, recommend `/makeit:plan-phase`.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-discovery/start-my-tasks.md
</execution_context>

<process>
  <step name="start_my_tasks">
    Follow the Dev FE start-my-tasks skill to:
    1. Read TL's HANDOFF.md from `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
    2. Filter to "### For FE" subsection
    3. Smart highlight FE tasks assigned to user (from config)
    4. Let user select tasks → auto-assign unassigned if selected
    5. Create Dev FE workspace with MY-TASKS.md, SPECS.md, STATE.md
    6. Recommend: `/makeit:plan-phase`
  </step>
</process>

<success_criteria>
- [ ] TL HANDOFF.md read and "For FE" tasks filtered
- [ ] Tasks selected and workspace created
- [ ] Next step (`/makeit:plan-phase`) recommended
</success_criteria>
