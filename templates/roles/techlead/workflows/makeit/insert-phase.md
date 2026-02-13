---
name: makeit:insert-phase
description: Insert an urgent phase between existing phases using decimal numbering (e.g., 2.1)
argument-hint: <after-phase> <description>
---

<objective>
Insert an urgent phase between existing phases without renumbering. Uses decimal numbering (e.g., phase 2.1 between phase 2 and 3). For TL work that must happen before the next planned phase.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-management/stage-insert-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse ROADMAP.md → current phases.
  </step>

  <step name="validate_insertion">
    Confirm insertion point and urgency justification.
    Determine decimal number (N.1, N.2, etc.)
  </step>

  <step name="insert_phase">
    Insert phase in ROADMAP.md at correct position.
    Create phase directory.
    Update STATE.md.
  </step>

  <step name="report">
    Display confirmation with decimal phase details.
    Warn: current phase must complete first.
  </step>
</process>

<success_criteria>
- [ ] Decimal phase inserted in ROADMAP.md
- [ ] Phase directory created
- [ ] STATE.md updated
- [ ] Urgency justified
</success_criteria>
