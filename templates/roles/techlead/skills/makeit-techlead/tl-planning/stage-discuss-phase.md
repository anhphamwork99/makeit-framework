---
name: tl-stage-discuss-phase
description: TL discuss — gather context via adaptive questioning before planning a phase
---

<purpose>
Explore and clarify a phase's scope through adaptive questioning before creating a plan. Surfaces gray areas in architecture, technical approach, and API design. Saves context to CONTEXT.md so the planner has clear direction.
</purpose>

<required_reading>
- `.agent/skills/makeit-techlead/_shared/references/quality-gates.md` — Gate 3 output expectations
- `.agent/skills/makeit-techlead/_shared/references/coding-standards.md` — Technical standards context
- `@tl-planning/templates/CONTEXT-TEMPLATE.md` — Template for CONTEXT.md output
</required_reading>

<rules>
1. Max 3-5 questions at a time — don't overwhelm user
2. Categorize answers: Decisions (locked) / Agent's Discretion / Deferred
3. Architecture decisions MUST be locked before plan-phase
4. If answer involves major architecture change → record as ADR candidate
5. Save all decisions to CONTEXT.md — planner depends on this
</rules>

<output>
- `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/CONTEXT.md` — Decisions + Discretion areas + Deferred ideas (use `@tl-planning/templates/CONTEXT-TEMPLATE.md`)
</output>

<process>
  <step name="validate_phase">
    Read STATE.md → confirm sprint is active.
    Read ROADMAP.md → locate target phase (argument or current).
    Check if CONTEXT.md already exists → offer to extend or restart.
  </step>

  <step name="check_existing_context">
    If CONTEXT.md exists from a previous discuss-phase:
    - Show existing decisions
    - Ask: "Extend with more questions, or start fresh?"
    If SPECS.md has constraints relevant to this phase → load them.
  </step>

  <step name="analyze_gray_areas">
    Techlead-specific gray areas to probe:

    | Category | Example Questions |
    |----------|-------------------|
    | **Architecture** | "Monolith or microservice boundary?" "State management approach?" |
    | **API Design** | "REST or GraphQL?" "Pagination strategy?" "Error response format?" |
    | **FE/BE Split** | "Where does validation live?" "SSR vs CSR for this feature?" |
    | **Tech Stack** | "New library needed?" "Existing pattern sufficient?" |
    | **Dependencies** | "External API limitations?" "Shared module changes needed?" |
    | **Performance** | "Caching needed?" "Query optimization scope?" |
    | **Security** | "Auth/authz requirements?" "Data sensitivity level?" |

    Ask focused questions (max 3-5 at a time).
    Wait for user answers. Iterate until gray areas resolved.
  </step>

  <step name="write_context">
    Write CONTEXT.md to phase directory:
    ```markdown
    # Phase {N} Context

    ## Decisions (Locked)
    - DEC-1: {decision} — {rationale}

    ## Agent's Discretion
    - {area}: Agent may decide {scope} freely

    ## Deferred
    - {idea}: Not in scope for this phase — revisit later

    ## ADR Candidates
    - {topic}: Needs formal Architecture Decision Record
    ```
  </step>

  <step name="report">
    Summarize decisions captured and remaining unknowns.
    Suggest next:
    ```
    /makeit:show-phase-approach  → see Agent's planned approach
    /makeit:plan-phase           → create plan with this context
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and phase identified
- [ ] Gray areas surfaced (architecture, API, tech stack)
- [ ] CONTEXT.md written with Decisions / Discretion / Deferred
- [ ] ADR candidates identified (if any)
- [ ] User informed of next steps
</success_criteria>
