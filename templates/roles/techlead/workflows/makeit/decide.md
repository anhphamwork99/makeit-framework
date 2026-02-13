---
name: makeit:decide
description: Document a technical decision with rationale and context — saves to sprint DECISIONS.md
---

<objective>
Facilitate and document a technical decision made during TL sprint work. Records the decision, rationale, alternatives considered, and decision authority level. Saves to DECISIONS.md.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-support/decide.md
</execution_context>

<process>
  <step name="gather_context">
    Ask: What needs deciding? Who's affected? What triggered this?
    Find active sprint if exists.
  </step>

  <step name="classify_and_apply">
    Classify: Minor/Medium/Major decision level.
    Apply Source of Truth Hierarchy.
    Discuss with user if needed.
  </step>

  <step name="record_decision">
    Record in DECISIONS.md:
    Date, level, context, decision, rationale, trade-offs, impact.
    Draft notification if cross-role impact.
  </step>
</process>

<success_criteria>
- [ ] Decision identified with context
- [ ] Level classified (Minor/Medium/Major)
- [ ] Result recorded in DECISIONS.md
</success_criteria>
