---
name: makeit:research-phase
description: Deep research technical or architecture unknowns for a phase via sub-agent (optional pre-planning step)
---

<objective>
Conduct deep research on technical unknowns before planning a phase. Spawns a researcher sub-agent to investigate architecture patterns, library choices, or integration approaches. Outputs RESEARCH.md.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-planning/stage-research-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase, existing context.
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="identify_unknowns">
    Read ROADMAP.md for phase goal.
    Read CONTEXT.md if exists (locked decisions constrain research scope).
    Identify what needs research: architecture, library evaluation, API design, integration.
  </step>

  <step name="spawn_researcher">
    Prepare research prompt with phase context and specific questions.
    Output path: `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/RESEARCH.md`
    Follow sub-agent spawning method per `.agent/rules/spawn sub-agents.md`.
  </step>

  <step name="verify_output">
    After researcher returns, verify RESEARCH.md exists and covers research questions.
    Update STATE.md with research status.
  </step>

  <step name="report">
    Display research summary and key findings.
    Suggest next: `/makeit:plan-phase`
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and unknowns identified
- [ ] Researcher sub-agent spawned with scoped prompt
- [ ] RESEARCH.md produced in phase directory
- [ ] STATE.md updated with research status
- [ ] User informed of next steps
</success_criteria>
