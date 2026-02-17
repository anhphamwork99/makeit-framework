---
name: makeit:archive-doc
description: Archive a deprecated knowledge document
---

<objective>
Archive a deprecated knowledge document. Moves to _archived/ while maintaining reference integrity in INDEX.md.
</objective>

<execution_context>
@.agent/skills/makeit-ba/kb-management/archive-doc.md
@.agent/skills/makeit-ba/kb-management/_rebuild-index.md
</execution_context>

<process>
  <step name="run_archive_doc">
    Follow the archive-doc skill instructions to complete the operation.
    After completion, rebuild INDEX.md if knowledge files changed.
  </step>
</process>

<success_criteria>
- [ ] Operation completed successfully
- [ ] INDEX.md updated (if applicable)
- [ ] User notified of result
</success_criteria>
