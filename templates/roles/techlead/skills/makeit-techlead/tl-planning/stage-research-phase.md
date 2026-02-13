---
name: tl-stage-research-phase
description: TL research — deep research on architecture, integration patterns, or tech unknowns via sub-agent
---

<purpose>
Conduct deep research on technical unknowns before planning a phase. Spawns a researcher sub-agent to investigate architecture patterns, library evaluation, integration approaches, or API design trade-offs. Outputs RESEARCH.md for the planner to consume.
</purpose>

<rules>
1. Research scope must be specific — no open-ended exploration
2. CONTEXT.md decisions constrain research (don't research alternatives to locked decisions)
3. Researcher sub-agent gets fresh context for quality
4. Verify RESEARCH.md after researcher returns — check coverage
</rules>

<required_reading>
- `.agent/skills/makeit-techlead/_shared/references/quality-gates.md` — Gate 3 expectations
- `.agent/skills/makeit-techlead/_shared/references/coding-standards.md`
- `@tl-planning/templates/RESEARCH-TEMPLATE.md` — Template for RESEARCH.md output
</required_reading>

<output>
- `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/RESEARCH.md` — Research findings and prescriptive recommendations (use `@tl-planning/templates/RESEARCH-TEMPLATE.md`)
</output>

<process>
  <step name="validate_phase">
    Read STATE.md → confirm sprint is active.
    Read ROADMAP.md → locate target phase.
    Check if RESEARCH.md already exists → offer to extend or restart.
  </step>

  <step name="gather_context">
    Read CONTEXT.md (if exists) → load locked decisions to constrain research scope.
    Read SPECS.md → understand sprint-level constraints.
    Read user stories relevant to this phase → identify technical implications.
  </step>

  <step name="identify_unknowns">
    Techlead research topics:

    | Category | Example Questions |
    |----------|-------------------|
    | **Architecture** | "Best pattern for X?" "Microservice boundary?" |
    | **Library Eval** | "Which state management?" "ORM comparison for Y?" |
    | **API Design** | "REST vs GraphQL trade-offs for this use case?" |
    | **Integration** | "Third-party API patterns?" "Auth provider integration?" |
    | **Performance** | "Caching strategy options?" "Query optimization approaches?" |
    | **Security** | "OWASP compliance for this feature?" "Data encryption approach?" |

    Ask user to confirm research scope before spawning.
  </step>

  <step name="spawn_researcher">
    Spawn TL researcher sub-agent with:
    - Phase goal and description
    - Specific research questions (from identify_unknowns)
    - CONTEXT.md decisions (constraints — don't explore alternatives)
    - Output path: `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/RESEARCH.md`

    Follow sub-agent spawning method per `.agent/rules/spawn sub-agents.md`.
  </step>

  <step name="verify_output">
    After researcher returns:
    1. Verify RESEARCH.md exists
    2. Check all research questions are addressed
    3. Update STATE.md with research status
  </step>

  <step name="report">
    Display research summary and key findings.
    Suggest next:
    ```
    /makeit:plan-phase    → plan with research context
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and unknowns identified
- [ ] Research scope confirmed by user
- [ ] Researcher sub-agent spawned with scoped prompt
- [ ] RESEARCH.md produced in phase directory
- [ ] STATE.md updated with research status
- [ ] User informed of next steps
</success_criteria>
