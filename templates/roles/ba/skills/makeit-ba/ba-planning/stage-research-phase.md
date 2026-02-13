---
name: ba-stage-research-phase
description: BA phase research — spawn researcher sub-agent for deep investigation of design context, PO intent, or domain unknowns
---

<purpose>
Deep research before planning — investigate Figma design context, PO intent, and domain unknowns by spawning a BA researcher sub-agent.
</purpose>

<required_reading>
@ba-planning/stage-discuss-phase.md
@ba-planning/stage-plan-phase.md
@ba-planning/templates/RESEARCH-TEMPLATE.md
@_shared/references/sub-agent-spawning.md
@_shared/references/figma-mcp.md
</required_reading>

<rules>
1. Prescriptive, not exploratory — "Use X" not "Consider X or Y"
2. Sub-agent always — research burns context, always spawn
3. BA-focused research — design, PO intent, domain patterns (not technical stack)
4. Optional stage — not required, but recommended for complex phases
5. Figma MCP integration — researcher should use MCP tools for design analysis
</rules>

<output>
Research document → `.makeit/sprint/SPRINT-NNN/phases/{NN}/RESEARCH.md`

Use template: @ba-planning/templates/RESEARCH-TEMPLATE.md
Sections: Design Context, PO Intent, Domain Patterns, Edge Cases Discovered, Dependencies, Recommendations.
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

    Present summary to user before spawning.
  </step>

  <step name="spawn_researcher">
    Why sub-agent: Research burns context fast (Figma MCP calls, design analysis, multi-source comparison).

    1. Read BA researcher agent definition from `.agent/agents/makeit-ba-researcher.md`
    2. Prepare spawn prompt with phase description, Figma links, PO goal documents, research focus areas
    3. Spawn sub-agent (see `@_shared/references/sub-agent-spawning.md`)

    BA research focus areas:
    - Design analysis — Figma screen structure, component hierarchy, interaction states via MCP
    - PO intent clarification — business goals, success metrics, user personas
    - Domain knowns — similar features, industry patterns, competitor analysis
    - Edge case discovery — systematic from design and domain
    - Dependency mapping — API contracts, data requirements, cross-feature
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
