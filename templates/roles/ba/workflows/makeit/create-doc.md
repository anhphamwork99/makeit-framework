---
name: makeit:create-doc
description: Create a new knowledge document with HITL approval
---

<objective>
Create a new knowledge document. Spawn Document Agent workflow → draft → human review → publish to appropriate knowledge category.
</objective>

<execution_context>
@.agent/skills/makeit-ba/kb-management/create-doc.md
@.agent/skills/makeit-ba/kb-management/_rebuild-index.md
</execution_context>

<process>
  <step name="run_create_doc">
    Follow the create-doc skill instructions to complete the operation.
    After completion, rebuild INDEX.md if knowledge files changed.
  </step>
</process>

<success_criteria>
- [ ] Operation completed successfully
- [ ] INDEX.md updated (if applicable)
- [ ] User notified of result
</success_criteria>
