---
name: makeit:sync-scope
description: Pull latest scope changes from upstream handoff — sync TL workspace with BA or Dev updates
---

<objective>
Techlead pulls latest scope changes from upstream HANDOFF. In Mode 1, syncs from BA (task breakdown). In Mode 2, syncs from Dev FE/BE (code review). Shows diff and updates TL workspace.
</objective>

<execution_context>
@_shared/skills/scope-management/sync-scope.md
</execution_context>

<process>
  <step name="sync_scope">
    Follow the shared sync-scope skill to:
    1. Git pull latest from product repo
    2. Detect changes in upstream HANDOFF.md
    3. Show diff of scope changes
    4. Update TL workspace (MY-TASKS.md) with confirmed changes
    5. Sync Lark Tasks if applicable

    Role context:
    - TL syncs from **BA** (Mode 1 — Stage 2 → Stage 3) OR **Dev FE/BE** (Mode 2 — Stage 4 → Stage 5a)
    - Mode 1 upstream: `.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md`
    - Mode 2 upstream: `.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md` and/or `.makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md`
    - Detect mode from STATE.md or ask user
  </step>
</process>

<success_criteria>
- [ ] Latest changes pulled from product repo
- [ ] Scope diff displayed clearly (from correct upstream based on mode)
- [ ] Workspace updated with confirmed changes
- [ ] WIP warnings shown for cancelled in-progress tasks
</success_criteria>
