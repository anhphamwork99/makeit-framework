---
name: makeit:update-doc
description: Update an existing knowledge document with change tracking
---

<objective>
Update an existing knowledge document. Tracks changes, requires human approval before committing updates.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/kb-management/update-doc.md
@.agent/skills/makeit-dev-fe/kb-management/_rebuild-index.md
</execution_context>

<process>
  <step name="run_update_doc">
    Follow the update-doc skill instructions to complete the operation.
    After completion, rebuild INDEX.md if knowledge files changed.
  </step>
</process>

<success_criteria>
- [ ] Operation completed successfully
- [ ] INDEX.md updated (if applicable)
- [ ] User notified of result
</success_criteria>
