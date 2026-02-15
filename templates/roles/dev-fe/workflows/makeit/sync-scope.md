---
name: makeit:sync-scope
description: Pull latest scope changes from upstream handoff — sync Dev FE workspace with TL updates
---

<objective>
Dev FE pulls latest scope changes from TL's HANDOFF. Shows diff of any modifications to frontend tasks, updates Dev FE workspace.
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
    4. Update Dev FE workspace (MY-TASKS.md) with confirmed changes
    5. Sync Lark Tasks if applicable

    Role context:
    - Dev FE syncs from **TL** (Stage 3 → Stage 4)
    - Upstream HANDOFF path: `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
    - Changes typically involve new frontend tasks, modified UI requirements, or re-prioritized features
  </step>
</process>

<success_criteria>
- [ ] Latest changes pulled from product repo
- [ ] Scope diff displayed clearly
- [ ] Workspace updated with confirmed changes
- [ ] WIP warnings shown for cancelled in-progress tasks
</success_criteria>
