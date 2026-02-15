---
name: makeit:update-scope
description: Update task scope in committed HANDOFF after handoff — add/remove/modify tasks for BA
---

<objective>
PO modifies the committed HANDOFF.md task table to update scope for BA. Adds, removes, modifies, or reprioritizes tasks after initial handoff.
</objective>

<execution_context>
@_shared/skills/scope-management/update-scope.md
</execution_context>

<process>
  <step name="update_scope">
    Follow the shared update-scope skill to:
    1. Identify PO's committed HANDOFF.md in product repo
    2. Show current tasks (Stories for BA)
    3. Collect PO's scope changes (add/remove/modify/reprioritize)
    4. Update HANDOFF.md task table with traceability markers
    5. Update Lark Tasks (or note pending if Lark MCP unavailable)
    6. Commit + push updated HANDOFF.md
    7. Draft Telegram notification for BA

    Role context:
    - PO updates tasks for **BA** (Stage 1 → Stage 2)
    - Tasks are typically user stories, feature requests, or backlog items
    - Assignee = BA team member(s)
  </step>
</process>

<success_criteria>
- [ ] HANDOFF.md updated with scope changes
- [ ] Cancelled tasks have ❌ prefix (not deleted)
- [ ] Modified tasks have [UPDATED] marker
- [ ] Lark Tasks synced (or pending noted)
- [ ] Git commit with `scope(po)` prefix
- [ ] Telegram notification drafted for BA
</success_criteria>
