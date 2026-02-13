---
name: makeit:add-phase
description: Add phase to end of FE sprint ROADMAP
---

<objective>
Append a new FE implementation phase to the end of the active sprint's roadmap for planned work discovered during implementation.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-management/stage-add-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint. Read ROADMAP.md.
  </step>

  <step name="get_details">
    Ask user what phase delivers and why it wasn't in original roadmap.
    Generate next sequential phase number.
  </step>

  <step name="update">
    Append phase to ROADMAP.md. Create phase directory. Update STATE.md.
    Suggest: complete current phase, then `/makeit:plan-phase` for new phase.
  </step>
</process>
