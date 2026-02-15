---
name: makeit:sync-scope
description: Pull latest scope changes from upstream handoff — sync BA workspace with PO updates
---

<objective>
BA pulls latest scope changes from PO's HANDOFF. Shows diff of any modifications to user stories or scope, updates BA workspace.
</objective>

<execution_context>
@_shared/skills/scope-management/sync-scope.md
</execution_context>

<process>
  <step name="sync_scope">
    Follow the shared sync-scope skill to:
    1. Git pull latest from product repo
    2. Detect changes in PO's HANDOFF.md
    3. Show diff of scope changes
    4. Update BA workspace (MY-TASKS.md) with confirmed changes
    5. Sync Lark Tasks if applicable

    Role context:
    - BA syncs from **PO** (Stage 1 → Stage 2)
    - Upstream HANDOFF path: `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md`
    - Changes typically involve new stories, modified requirements, or re-prioritized features
  </step>
</process>

<success_criteria>
- [ ] Latest changes pulled from product repo
- [ ] Scope diff displayed clearly
- [ ] Workspace updated with confirmed changes
- [ ] WIP warnings shown for cancelled in-progress tasks
</success_criteria>
