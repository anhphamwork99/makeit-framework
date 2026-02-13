---
name: tl-stage-insert-phase
description: Insert urgent TL work as decimal phase (e.g., 2.1) between existing phases in sprint ROADMAP
---

<purpose>
Handle urgent TL work discovered mid-sprint by inserting a decimal phase between existing phases without renumbering the entire roadmap.
</purpose>

<rules>
1. Decimal numbering — never renumber existing phases
2. Maximum 5 insertions per gap (N.1 to N.5)
3. Urgency justified — ask why it can't wait
</rules>

<output>
- Updated ROADMAP.md with decimal phase inserted
- New phase directory → `phases/{NN.1}-{phase-name}/`
- Updated STATE.md with decimal phase in progress table
</output>

<process>
  <step name="validate_context">
    Read ROADMAP.md → find target phase.
    Confirm insertion point: "Insert after Phase {N}, before Phase {N+1}?"
    Verify urgency: "Why can't this wait until the end?"
  </step>

  <step name="determine_number">
    If no existing decimal phases: `{N}.1`
    If `{N}.1` exists: `{N}.2`
    Maximum: `{N}.5` (if more → suggest restructuring)
  </step>

  <step name="update_roadmap">
    Insert new phase in correct position:
    ```markdown
    ### Phase {N.1}: {Name}
    **Goal:** {phase goal}
    **Deliverables:** {expected deliverables}
    **Domain Workflow:** {relevant TL workflow}
    **Note:** Inserted for urgent work — [reason]
    ```
  </step>

  <step name="create_directory">
    Create `phases/{NN.1}-{phase-name}/`
  </step>

  <step name="update_state">
    Add decimal phase to Phase Progress table.
    Log insertion reason.
  </step>

  <step name="present_confirmation">
    Display confirmation with phase details.
    Warn: current phase must complete before starting inserted phase.
  </step>
</process>

<success_criteria>
- [ ] Decimal phase inserted in ROADMAP.md
- [ ] Phase directory created
- [ ] STATE.md updated
- [ ] Urgency justified
</success_criteria>
