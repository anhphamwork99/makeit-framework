---
name: ba-start-my-tasks
description: BA selects personal tasks from PO handoff
---

<purpose>
BA-specific entry point for task selection. Reads PO's HANDOFF.md, lets BA select assigned tasks, creates focused workspace. Replaces `/makeit:clarify` as the primary way to start working on a sprint.
</purpose>

<parameters>
upstream_role: PO
handoff_path: .makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md
section_filter: (none — BA receives all tasks from PO)
next_command: /makeit:plan-phase
</parameters>

<process>
  <step name="delegate_to_shared">
    Execute the shared `start-my-tasks` skill with BA-specific parameters:

    1. **Upstream:** PO — read `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md`
    2. **Task table:** Parse "Tasks For Receiver" (full table, no section filter)
    3. **Identity:** Read `user_name` from `.makeit/config.md`
    4. **Selection:** Smart default by assignee match → user confirms
    5. **Auto-assign:** If user selects unassigned task → assign via Lark MCP
    6. **Workspace:** Create `.makeit/sprint/SPRINT-{NNN}/ba/` with MY-TASKS.md, SPECS.md, STATE.md
    7. **Next:** Recommend `/makeit:plan-phase`

    Reference: `@_shared/skills/start-my-tasks/start-my-tasks.md`
  </step>
</process>

<success_criteria>
- [ ] PO HANDOFF.md read successfully
- [ ] Tasks displayed with smart highlighting by user_name
- [ ] Selected tasks scoped into BA workspace
- [ ] Next step (/makeit:plan-phase) recommended
</success_criteria>
