---
name: makeit:decide
description: Document a technical decision with context, options, and rationale
---

<objective>
Record technical decision with full context, options considered, rationale, and impact analysis.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-support/decide.md
</execution_context>

<process>
  <step name="gather">
    Ask: What decision? Why now? Impact on API/DB/performance?
  </step>

  <step name="list_options">
    Present options with pros/cons. Note if architecture-level → discuss with Techlead.
  </step>

  <step name="record">
    Document: chosen option, rationale, trade-offs, date, impact.
    Save to task file or standalone record.
  </step>
</process>

<success_criteria>
- [ ] Decision context documented
- [ ] Options listed with trade-offs
- [ ] Decision recorded with rationale
</success_criteria>
