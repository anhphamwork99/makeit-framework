---
name: makeit:sync-scope
description: Pull latest scope changes from upstream handoff — sync PO workspace with TL review updates
---

<objective>
PO pulls latest scope changes from TL's HANDOFF (Mode 2 — result review). Shows diff of any modifications to the review scope, updates PO workspace.
</objective>

<execution_context>
@_shared/skills/scope-management/sync-scope.md
</execution_context>

<process>
  <step name="sync_scope">
    Follow the shared sync-scope skill to:
    1. Git pull latest from product repo
    2. Detect changes in TL's HANDOFF.md (result review scope)
    3. Show diff of scope changes
    4. Update PO workspace (MY-TASKS.md) with confirmed changes
    5. Sync Lark Tasks if applicable

    Role context:
    - PO syncs from **TL** (Mode 2 — result review)
    - Upstream HANDOFF path: `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
    - Changes typically involve review criteria, staging URLs, or acceptance criteria updates
  </step>
</process>

<success_criteria>
- [ ] Latest changes pulled from product repo
- [ ] Scope diff displayed clearly
- [ ] Workspace updated with confirmed changes
- [ ] WIP warnings shown for cancelled in-progress tasks
</success_criteria>
