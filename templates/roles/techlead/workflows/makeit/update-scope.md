---
name: makeit:update-scope
description: Update task scope in committed HANDOFF after handoff — add/remove/modify tasks for Dev FE/BE
---

<objective>
Techlead modifies the committed HANDOFF.md task table to update scope for Dev FE/BE. Adds, removes, modifies, or reprioritizes technical tasks after initial handoff.
</objective>

<execution_context>
@_shared/skills/scope-management/update-scope.md
</execution_context>

<process>
  <step name="update_scope">
    Follow the shared update-scope skill to:
    1. Identify TL's committed HANDOFF.md in product repo
    2. Show current tasks (Technical tasks for Dev FE/BE)
    3. Collect TL's scope changes (add/remove/modify/reprioritize)
    4. Update HANDOFF.md task table with traceability markers
    5. Update Lark Tasks (or note pending if Lark MCP unavailable)
    6. Commit + push updated HANDOFF.md
    7. Draft Telegram notification for Dev FE and/or Dev BE

    Role context:
    - TL updates tasks for **Dev FE/BE** (Stage 3 → Stage 4)
    - Tasks are technical implementation tasks with dependencies
    - Assignee = Dev FE or Dev BE team member(s)
    - May need to notify both FE and BE if changes affect both
  </step>
</process>

<success_criteria>
- [ ] HANDOFF.md updated with scope changes
- [ ] Cancelled tasks have ❌ prefix (not deleted)
- [ ] Modified tasks have [UPDATED] marker
- [ ] Lark Tasks synced (or pending noted)
- [ ] Git commit with `scope(tl)` prefix
- [ ] Telegram notification drafted for Dev FE and/or Dev BE
</success_criteria>
