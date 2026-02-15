---
name: tl-start-my-tasks
description: TL selects tasks from BA handoff (Mode 1) or Dev handoff (Mode 2)
---

<purpose>
Techlead-specific entry point for task selection. Supports dual mode:
- **Mode 1 (Task Breakdown):** Read BA's HANDOFF.md → select tasks for breakdown into FE/BE tasks
- **Mode 2 (Code Review):** Read Dev FE/BE HANDOFF.md → select PRs for review

Mode detection follows the same logic as `check-handoff` — check which HANDOFF files exist.
</purpose>

<parameters>
## Mode 1 (Task Breakdown)
upstream_role: BA
handoff_path: .makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md
section_filter: (none)
next_command: /makeit:plan-phase

## Mode 2 (Code Review)
upstream_role: Dev FE / Dev BE
handoff_path: .makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md + be/HANDOFF.md
section_filter: (none — read both, merge)
next_command: /makeit:execute-phase (review-code workflow)
</parameters>

<process>
  <step name="detect_mode">
    Auto-detect mode by checking which HANDOFF files exist:

    1. Check for BA handoff: `.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md`
    2. Check for Dev handoffs: `.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md`, `be/HANDOFF.md`
    3. If **only BA** → Mode 1
    4. If **only Dev** → Mode 2
    5. If **both** → Ask TL which mode to proceed with
    6. If **neither** → Error: no handoff found

    Sprint number: latest in `.makeit/sprint/` or ask user.
  </step>

  <step name="delegate_to_shared">
    Execute the shared `start-my-tasks` skill with detected parameters:

    **Mode 1:**
    1. Read BA's HANDOFF.md → parse full task table
    2. Smart filter by user_name → select tasks
    3. Create `.makeit/sprint/SPRINT-{NNN}/tl/` workspace
    4. Recommend `/makeit:plan-phase`

    **Mode 2:**
    1. Read Dev FE and/or Dev BE HANDOFF.md → merge task tables
    2. Smart filter by user_name → select PRs to review
    3. Create `.makeit/sprint/SPRINT-{NNN}/tl/` workspace (or reuse if exists)
    4. Recommend `/makeit:execute-phase` (review-code workflow)

    Reference: `@_shared/skills/start-my-tasks/start-my-tasks.md`
  </step>
</process>

<edge_cases>

**Both BA and Dev handoffs exist:** Show both options, let TL choose. TL can handle one mode, complete it, then come back for the other mode in a separate session.

**Only 1 Dev handoff (FE or BE):** Still Mode 2 — the other Dev may not have submitted yet, or sprint only has 1 Dev.

**TL workspace already exists from Mode 1:** When entering Mode 2 later, reuse the existing workspace. Append code review tasks to MY-TASKS.md instead of overwriting.

</edge_cases>

<success_criteria>
- [ ] Mode detected correctly (BA → Mode 1, Dev → Mode 2)
- [ ] HANDOFF.md read and task table parsed
- [ ] Tasks selected and workspace created
- [ ] Next step recommended based on mode
</success_criteria>
