---
name: makeit:sync-scope
description: Pull latest scope changes from upstream handoff — sync Dev BE workspace with TL updates
---

<objective>
Dev BE pulls latest scope changes from TL's HANDOFF. Shows diff of any modifications to backend tasks, updates Dev BE workspace.
</objective>

<execution_context>
@_shared/skills/scope-management/sync-scope.md
</execution_context>

<process>
  <step name="sync_scope">
    Follow the shared sync-scope skill to:
    1. Git pull latest from product repo
    2. Detect changes in TL's HANDOFF.md
    3. Show diff of scope changes
    4. Update Dev BE workspace (MY-TASKS.md) with confirmed changes
    5. Sync Lark Tasks if applicable

    Role context:
    - Dev BE syncs from **TL** (Stage 3 → Stage 4)
    - Upstream HANDOFF path: `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
    - Changes typically involve new backend tasks, API changes, or modified technical requirements
  </step>
</process>

<success_criteria>
- [ ] Latest changes pulled from product repo
- [ ] Scope diff displayed clearly
- [ ] Workspace updated with confirmed changes
- [ ] WIP warnings shown for cancelled in-progress tasks
</success_criteria>
