---
name: ba-stage-remove-phase
description: Remove a future phase from BA sprint ROADMAP and renumber subsequent phases
---

<purpose>
Clean removal of BA work decided not to do — removes unstarted future phase from the sprint roadmap and renumbers subsequent phases.
</purpose>

<rules>
1. Only remove pending phases — never remove started or completed phases
2. Confirm before removing — destructive operation
3. Archive if has content — don't lose research/context
4. Renumber subsequently — keep clean sequence
</rules>

<output>
- Updated ROADMAP.md with phase removed and subsequent phases renumbered
- Updated STATE.md with phase removed from progress table
- Deleted (or archived) phase directory
</output>

<process>
  <step name="validate_removal">
    Read ROADMAP.md → find target phase.
    Read STATE.md → confirm phase is `pending`.
    If phase is `executing` or `complete` → refuse with explanation.
    Ask for confirmation: "Remove Phase {N}: {name}? This cannot be undone."
  </step>

  <step name="check_dependencies">
    Does any subsequent phase depend on this phase's output?
    If yes → warn user before proceeding.
    List affected phases and their dependencies.
  </step>

  <step name="remove_from_roadmap">
    Delete the phase section from ROADMAP.md.
    Renumber subsequent phases (N+1 → N, N+2 → N+1, etc.).
    Update any cross-references in remaining phases.
  </step>

  <step name="delete_directory">
    Delete `phases/{NN}-{name}/` if it exists.
    If directory has content (CONTEXT.md, RESEARCH.md) → archive instead of delete.
  </step>

  <step name="update_state">
    Remove phase from Phase Progress table.
    Renumber subsequent phase entries.
    Log: "Phase {N} removed: {reason}"
  </step>

  <step name="present_confirmation">
    Display confirmation with remaining phases renumbered.
    Suggest: Continue with current phase.
  </step>
</process>

<success_criteria>
- [ ] Phase removed from ROADMAP.md
- [ ] Subsequent phases renumbered
- [ ] Phase directory deleted/archived
- [ ] STATE.md updated
- [ ] Dependencies checked and warned
</success_criteria>
