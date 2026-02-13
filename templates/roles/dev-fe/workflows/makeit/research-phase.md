---
name: makeit:research-phase
description: Deep research for FE phase — Figma design analysis, library evaluation, pattern investigation
---

<objective>
Spawn FE researcher sub-agent for deep investigation of Figma designs, component library evaluation, and implementation pattern research before planning.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-planning/stage-research-phase.md
@.agent/skills/makeit-dev-fe/_shared/references/sub-agent-spawning.md
@.agent/skills/makeit-dev-fe/_shared/references/figma-mcp.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint. Validate target phase exists.
    Check for existing RESEARCH.md.
  </step>

  <step name="gather_context">
    Collect phase context: ROADMAP.md, SPECS.md, CONTEXT.md, Figma links.
    Present summary to user before spawning.
  </step>

  <step name="spawn_researcher">
    Spawn FE researcher sub-agent with phase context.
    Focus areas: design analysis, library evaluation, pattern investigation, performance, dependencies.
  </step>

  <step name="handle_return">
    Display research summary. Update STATE.md.
    Suggest: `/makeit:plan-phase`.
  </step>
</process>

<success_criteria>
- [ ] Researcher spawned with proper context
- [ ] RESEARCH.md produced
- [ ] STATE.md updated
</success_criteria>
