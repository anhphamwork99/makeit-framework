---
name: be-start-my-tasks
description: Dev BE selects BE tasks from TL handoff
---

<purpose>
Dev BE-specific entry point for task selection. Reads TL's HANDOFF.md, filters to "§ For BE" subsection only, lets Dev BE select assigned BE tasks, creates focused workspace.
</purpose>

<parameters>
upstream_role: TL
handoff_path: .makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md
section_filter: § For BE
next_command: /makeit:plan-phase
</parameters>

<process>
  <step name="delegate_to_shared">
    Execute the shared `start-my-tasks` skill with Dev BE-specific parameters:

    1. **Upstream:** TL — read `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
    2. **Section filter:** Only parse "### For BE" subsection from Tasks For Receiver
    3. **Identity:** Read `user_name` from `.makeit/config.md`
    4. **Selection:** Smart default by assignee match → user confirms
    5. **Auto-assign:** If user selects unassigned task → assign via Lark MCP
    6. **Workspace:** Create `.makeit/sprint/SPRINT-{NNN}/be/` with MY-TASKS.md, SPECS.md, STATE.md
    7. **Next:** Recommend `/makeit:plan-phase`

    Reference: `@_shared/skills/start-my-tasks/start-my-tasks.md`
  </step>
</process>

<edge_cases>

**No "For BE" section in TL handoff:** Warn user — TL may not have split tasks by FE/BE yet. Show full task table and ask user to select BE-relevant tasks manually.

**All BE tasks assigned to another Dev BE:** Show warning, ask if current user wants to claim.

</edge_cases>

<success_criteria>
- [ ] TL HANDOFF.md read successfully
- [ ] Tasks filtered to "For BE" section
- [ ] Tasks displayed with smart highlighting by user_name
- [ ] Selected tasks scoped into Dev BE workspace
- [ ] Next step (/makeit:plan-phase) recommended
</success_criteria>
