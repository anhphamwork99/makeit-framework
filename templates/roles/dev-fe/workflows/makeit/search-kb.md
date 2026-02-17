---
name: makeit:search-kb
description: Search the knowledge base using Deep Query pattern
---

<objective>
Search the knowledge base across all categories. Uses Deep Query pattern with Progressive Disclosure for relevant results.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/kb-management/search-kb.md
@.agent/skills/makeit-dev-fe/kb-management/_rebuild-index.md
</execution_context>

<process>
  <step name="run_search_kb">
    Follow the search-kb skill instructions to complete the operation.
    After completion, rebuild INDEX.md if knowledge files changed.
  </step>
</process>

<success_criteria>
- [ ] Operation completed successfully
- [ ] INDEX.md updated (if applicable)
- [ ] User notified of result
</success_criteria>
