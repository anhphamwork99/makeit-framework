---
name: makeit:add-phase
description: Add a new phase to the end of the current sprint roadmap
argument-hint: <description>
---

<objective>
Append a new phase to the sprint's ROADMAP.md. Use when new TL work is discovered during execution that belongs at the end of the current sprint scope.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-management/stage-add-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse ROADMAP.md → current phases.
  </step>

  <step name="get_phase_details">
    Ask: What does this phase deliver? Why wasn't it in the original roadmap?
    Determine TL deliverables (task breakdowns, API contracts, etc.)
  </step>

  <step name="add_phase">
    Append new phase to ROADMAP.md.
    Create phase directory.
    Update STATE.md.
  </step>

  <step name="report">
    Display confirmation with phase details.
    Suggest: complete current phase first, then plan new phase.
  </step>
</process>

<success_criteria>
- [ ] Phase added to ROADMAP.md
- [ ] Phase directory created
- [ ] STATE.md updated
- [ ] User informed
</success_criteria>
