---
name: makeit:remove-phase
description: Remove a future phase from the sprint roadmap and renumber subsequent phases
argument-hint: <phase-number>
---

<objective>
Remove an unstarted phase from the sprint ROADMAP.md and renumber subsequent phases to maintain sequential ordering. Only future/unplanned phases can be removed — active or completed phases are protected.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-management/stage-remove-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="parse_args">
    Extract phase number to remove.
    If missing → error with usage: "/makeit:remove-phase <phase-number>"
  </step>

  <step name="validate_phase">
    Read `.makeit/sprint/SPRINT-*/ROADMAP.md`
    Verify target phase exists and is NOT active or completed.
    If active/complete → error: "Cannot remove active or completed phase"
  </step>

  <step name="remove_and_renumber">
    Remove phase entry from ROADMAP.md.
    Renumber subsequent phases to fill the gap.
    Remove phase directory if empty.
  </step>

  <step name="update_state">
    Update STATE.md with roadmap evolution note.
  </step>

  <step name="report">
    Display: phase removed, subsequent phases renumbered.
    Show updated roadmap overview.
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and phase validated as removable (not active/complete)
- [ ] Phase removed from ROADMAP.md
- [ ] Subsequent phases renumbered correctly
- [ ] Phase directory cleaned up (if empty)
- [ ] STATE.md updated
- [ ] User shown updated roadmap
</success_criteria>
