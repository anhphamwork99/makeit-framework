---
name: makeit:discuss-phase
description: Gather context via adaptive questioning before planning — identify gray areas and lock decisions
---

<objective>
Explore and clarify a phase's scope through adaptive questioning before creating a plan. Surfaces gray areas in architecture, API design, and technical approach. Saves context to CONTEXT.md.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-planning/stage-discuss-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase number, overall sprint context.
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="identify_phase">
    Read `.makeit/sprint/SPRINT-*/ROADMAP.md`
    Locate target phase (from argument or current phase).
    Extract phase goal, description, dependencies.
    Check if CONTEXT.md already exists → offer to extend or restart.
  </step>

  <step name="adaptive_questioning">
    Follow skill instructions for adaptive questioning:
    - Analyze phase goal for architecture and technical ambiguities
    - Ask focused questions (max 3-5 at a time)
    - Categorize user answers into: Decisions (locked), Agent's Discretion, Deferred
    - Iterate until gray areas are resolved
  </step>

  <step name="save_context">
    Write CONTEXT.md to phase directory:
    `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/CONTEXT.md`
    Sections: Decisions (locked), Agent's Discretion, Deferred, ADR Candidates.
  </step>

  <step name="report">
    Summarize decisions captured and remaining unknowns.
    Suggest next command:
    ```
    /makeit:plan-phase       → create plan with this context
    /makeit:show-phase-approach → see Agent's planned approach
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and phase identified
- [ ] Gray areas surfaced and discussed with user
- [ ] CONTEXT.md written with Decisions / Discretion / Deferred sections
- [ ] User informed of next steps
</success_criteria>
