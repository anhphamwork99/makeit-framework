---
name: makeit:insert-phase
description: Insert urgent FE work as decimal phase between existing phases
---

<objective>
Insert urgent FE work discovered mid-sprint as a decimal phase (e.g., 2.1) between existing phases without renumbering.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-management/stage-insert-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint. Read ROADMAP.md. Find insertion point.
  </step>

  <step name="validate">
    Confirm insertion point. Verify urgency. Determine decimal number.
  </step>

  <step name="insert">
    Insert phase in ROADMAP.md. Create phase directory. Update STATE.md.
    Warn: current phase must complete first.
  </step>
</process>
