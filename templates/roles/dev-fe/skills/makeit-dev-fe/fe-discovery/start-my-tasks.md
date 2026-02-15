---
name: fe-start-my-tasks
description: Dev FE selects FE tasks from TL handoff
---

<purpose>
Dev FE-specific entry point for task selection. Reads TL's HANDOFF.md, filters to "§ For FE" subsection only, lets Dev FE select assigned FE tasks, creates focused workspace.
</purpose>

<parameters>
upstream_role: TL
handoff_path: .makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md
section_filter: § For FE
next_command: /makeit:plan-phase
</parameters>

<process>
  <step name="delegate_to_shared">
    Execute the shared `start-my-tasks` skill with Dev FE-specific parameters:

    1. **Upstream:** TL — read `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
    2. **Section filter:** Only parse "### For FE" subsection from Tasks For Receiver
    3. **Identity:** Read `user_name` from `.makeit/config.md`
    4. **Selection:** Smart default by assignee match → user confirms
    5. **Auto-assign:** If user selects unassigned task → assign via Lark MCP
    6. **Workspace:** Create `.makeit/sprint/SPRINT-{NNN}/fe/` with MY-TASKS.md, SPECS.md, STATE.md
    7. **Next:** Recommend `/makeit:plan-phase`

    Reference: `@_shared/skills/start-my-tasks/start-my-tasks.md`
  </step>
</process>

<edge_cases>

**No "For FE" section in TL handoff:** Warn user — TL may not have split tasks by FE/BE yet. Show full task table and ask user to select FE-relevant tasks manually.

**All FE tasks assigned to another Dev FE:** Show warning, ask if current user wants to claim.

</edge_cases>

<success_criteria>
- [ ] TL HANDOFF.md read successfully
- [ ] Tasks filtered to "For FE" section
- [ ] Tasks displayed with smart highlighting by user_name
- [ ] Selected tasks scoped into Dev FE workspace
- [ ] Next step (/makeit:plan-phase) recommended
</success_criteria>
