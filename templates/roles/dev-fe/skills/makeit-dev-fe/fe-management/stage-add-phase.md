---
name: fe-stage-add-phase
description: Add a new phase to end of sprint ROADMAP — for planned FE work discovered during implementation
---

<purpose>
Append a new phase for FE work discovered during sprint execution to the end of the active sprint's roadmap.
</purpose>

<rules>
1. New phase goes at end — never insert mid-sequence (use insert-phase for that)
2. FE-specific deliverables — phase should produce components, styles, or integrations
3. No automatic execution — user must complete current work first
</rules>

<output>
- Updated ROADMAP.md with new phase appended
- New phase directory → `phases/{NN}-{phase-name}/`
- Updated STATE.md with new phase in progress table
</output>

<process>
  <step name="read_state">
    Read active sprint's ROADMAP.md → current phases.
    Read STATE.md → confirm no active phase blocking.
  </step>

  <step name="get_phase_details">
    Ask user: What does this phase deliver? Why wasn't it in the original roadmap?
    Generate phase number (next sequential from existing phases).
    Determine FE-specific deliverables this phase will produce.
  </step>

  <step name="update_roadmap">
    Append new phase in consistent format:
    ```markdown
    ### Phase {N}: {Name}
    **Goal:** {phase goal}
    **Deliverables:** {expected deliverables — components, responsive, states}
    **Domain Workflow:** {implement, compare-ui, etc.}
    ```
  </step>

  <step name="create_directory">
    Create `phases/{NN}-{phase-name}/` (empty — populated during plan-phase).
  </step>

  <step name="update_state">
    Add new phase to Phase Progress table with status `pending`.
    Log: "Phase {N} added: {description}"
  </step>

  <step name="present_confirmation">
    Display confirmation with phase details, directory path.
    Suggest: complete current phase, then `/makeit:plan-phase` for new phase.
  </step>
</process>

<success_criteria>
- [ ] Phase appended to ROADMAP.md
- [ ] Phase directory created
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
