---
name: makeit:remove-phase
description: Remove a future phase from the sprint roadmap and renumber subsequent phases
argument-hint: <phase-number>
---

<objective>
Remove an unstarted phase from the sprint ROADMAP.md and renumber subsequent phases. Only future/pending phases can be removed — active or completed phases are protected.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-management/stage-remove-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse ROADMAP.md → phase to remove.
  </step>

  <step name="validate_removal">
    Confirm phase is pending (not started/completed).
    Check dependencies — warn if subsequent phases depend on this one.
    Ask for user confirmation.
  </step>

  <step name="remove_phase">
    Remove from ROADMAP.md.
    Renumber subsequent phases.
    Delete/archive phase directory.
    Update STATE.md.
  </step>

  <step name="report">
    Display confirmation with remaining phases renumbered.
  </step>
</process>

<success_criteria>
- [ ] Phase removed from ROADMAP.md
- [ ] Subsequent phases renumbered
- [ ] Phase directory deleted/archived
- [ ] STATE.md updated
</success_criteria>
