---
name: fe-stage-research-phase
description: FE phase research — spawn researcher sub-agent for deep investigation of Figma designs, library evaluation, and implementation patterns
---

<purpose>
Deep research before planning — investigate Figma design context, evaluate component libraries, and research implementation patterns by spawning an FE researcher sub-agent.
</purpose>

<required_reading>
@fe-planning/stage-discuss-phase.md
@fe-planning/stage-plan-phase.md
@fe-planning/templates/RESEARCH-TEMPLATE.md
@_shared/references/sub-agent-spawning.md
@_shared/references/figma-mcp.md
</required_reading>

<rules>
1. Prescriptive, not exploratory — "Use X" not "Consider X or Y"
2. Sub-agent always — research burns context, always spawn
3. FE-focused research — design analysis, library evaluation, UI patterns (not business logic)
4. Optional stage — not required, but recommended for complex UI implementations
5. Figma MCP integration — researcher should use MCP tools for design analysis
</rules>

<output>
Research document → `.makeit/sprint/SPRINT-NNN/phases/{NN}/RESEARCH.md`

Use template: `@fe-planning/templates/RESEARCH-TEMPLATE.md`

Structure:
- Design Context (Figma analysis — components, hierarchy, states, tokens via MCP)
- Library Evaluation (component libraries, animation libraries, state management)
- Implementation Patterns (similar components, responsive patterns, accessibility patterns)
- Performance Considerations (bundle size impact, rendering concerns)
- Dependencies (API readiness, shared components, design token availability)
- Recommendations (prescriptive — "Use X" not "Consider X or Y")
</output>

<process>
  <step name="validate_phase">
    Read active sprint's ROADMAP.md.
    Extract target phase (current or specified by argument).
    Validate phase exists in roadmap.
  </step>

  <step name="check_existing_research">
    Check if RESEARCH.md already exists.
    If exists: Offer "Update research" / "View existing" / "Skip".
  </step>

  <step name="gather_phase_context">
    Collect context for the researcher:
    1. Phase description from ROADMAP.md
    2. Requirements from SPECS.md
    3. Prior decisions from CONTEXT.md (if exists)
    4. Sprint state from STATE.md
    5. Figma links from task references

    Present summary to user before spawning.
  </step>

  <step name="spawn_researcher">
    Why sub-agent: Research burns context fast (Figma MCP calls, library comparison, pattern analysis).

    1. Read FE researcher agent definition from `.agent/agents/makeit-fe-researcher.md`
    2. Prepare spawn prompt with phase description, Figma links, technical constraints, research focus areas
    3. Spawn sub-agent (see `@_shared/references/sub-agent-spawning.md`)

    FE research focus areas:
    - Design analysis — Figma screen structure, component hierarchy, interaction states via MCP
    - Library evaluation — component libs, animation libs, form handling, state management
    - Pattern investigation — responsive patterns, accessibility patterns, performance patterns
    - Performance analysis — bundle size, render performance, lazy loading opportunities
    - Dependency mapping — API contracts, shared components, design tokens
  </step>

  <step name="handle_return">
    Research complete: Display summary, offer next steps:
    - Plan phase → `/makeit:plan-phase`
    - Research deeper → spawn again with specific questions
    - Review full research → display RESEARCH.md

    Research inconclusive: Show what was attempted, offer alternatives.
  </step>

  <step name="update_state">
    Update STATE.md with research completed note.
    Log in Phase Progress table.
  </step>
</process>

<success_criteria>
- [ ] Phase validated and context gathered
- [ ] Researcher spawned with proper context
- [ ] RESEARCH.md produced with prescriptive recommendations
- [ ] STATE.md updated
</success_criteria>
