---
name: makeit:insert-phase
description: Insert an urgent phase between existing phases using decimal numbering (e.g., 2.1)
argument-hint: <after-phase> <description>
---

<objective>
Insert an urgent phase between existing phases without renumbering. Uses decimal numbering (e.g., phase 2.1 between phase 2 and 3). For work that must happen before the next planned phase.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-management/stage-insert-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="parse_args">
    Extract: after-phase number and description.
    If missing → error with usage: "/makeit:insert-phase <after-phase> <description>"
  </step>

  <step name="validate_position">
    Read `.makeit/sprint/SPRINT-*/ROADMAP.md`
    Verify the after-phase exists.
    Calculate decimal phase number (e.g., after phase 2 → 2.1, after 2.1 → 2.2).
    Verify the calculated number doesn't conflict with existing phases.
  </step>

  <step name="insert_phase">
    Insert new phase entry in ROADMAP.md at the correct position.
    Create phase directory: `.makeit/sprint/SPRINT-*/phases/{NN.N}-{slug}/`
  </step>

  <step name="update_state">
    Update STATE.md with roadmap evolution note.
  </step>

  <step name="report">
    Display: phase inserted at position, directory created.
    Suggest: `/makeit:plan-phase {N.N}` to plan the inserted phase.
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and after-phase validated
- [ ] Decimal phase number calculated without conflicts
- [ ] ROADMAP.md updated with inserted phase
- [ ] Phase directory created
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
