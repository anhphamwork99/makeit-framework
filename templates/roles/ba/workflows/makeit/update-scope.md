---
name: makeit:update-scope
description: Update task scope in committed HANDOFF after handoff — add/remove/modify tasks for TL
---

<objective>
BA modifies the committed HANDOFF.md task table to update scope for Techlead. Adds, removes, modifies, or reprioritizes user stories after initial handoff.
</objective>

<execution_context>
@_shared/skills/scope-management/update-scope.md
</execution_context>

<process>
  <step name="update_scope">
    Follow the shared update-scope skill to:
    1. Identify BA's committed HANDOFF.md in product repo
    2. Show current tasks (User stories for TL)
    3. Collect BA's scope changes (add/remove/modify/reprioritize)
    4. Update HANDOFF.md task table with traceability markers
    5. Update Lark Tasks (or note pending if Lark MCP unavailable)
    6. Commit + push updated HANDOFF.md
    7. Draft Telegram notification for TL

    Role context:
    - BA updates tasks for **TL** (Stage 2 → Stage 3)
    - Tasks are user stories with acceptance criteria
    - Assignee = Techlead
  </step>
</process>

<success_criteria>
- [ ] HANDOFF.md updated with scope changes
- [ ] Cancelled tasks have ❌ prefix (not deleted)
- [ ] Modified tasks have [UPDATED] marker
- [ ] Lark Tasks synced (or pending noted)
- [ ] Git commit with `scope(ba)` prefix
- [ ] Telegram notification drafted for TL
</success_criteria>
