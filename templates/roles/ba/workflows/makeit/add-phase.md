---
name: makeit:add-phase
description: Add a new phase to the end of the current sprint roadmap
argument-hint: <description>
---

<objective>
Append a new phase to the sprint's ROADMAP.md. Use when new work is discovered during execution that belongs at the end of the current sprint scope.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-management/stage-add-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="parse_args">
    Extract phase description from user arguments.
    If no description → error: "Usage: /makeit:add-phase <description>"
  </step>

  <step name="calculate_phase_number">
    Read `.makeit/sprint/SPRINT-*/ROADMAP.md`
    Find highest integer phase number.
    Calculate next phase number = max + 1.
  </step>

  <step name="update_roadmap">
    Append new phase entry to ROADMAP.md:
    - Phase heading with description
    - Goal: [To be planned]
    - Depends on: previous phase
    Create phase directory: `.makeit/sprint/SPRINT-*/phases/{NN}-{slug}/`
  </step>

  <step name="update_state">
    Update STATE.md with roadmap evolution note.
  </step>

  <step name="report">
    Display: phase added, directory created.
    Suggest: `/makeit:plan-phase {N}` to break down the new phase.
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded
- [ ] Phase number calculated correctly (ignoring decimals)
- [ ] ROADMAP.md updated with new phase entry
- [ ] Phase directory created
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
