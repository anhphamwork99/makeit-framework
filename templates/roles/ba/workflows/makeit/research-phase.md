---
name: makeit:research-phase
description: Deep research technical or domain unknowns for a phase via sub-agent (optional pre-planning step)
---

<objective>
Conduct deep research on unknowns before planning a phase. Spawns a researcher sub-agent to investigate domain questions, design patterns, or integration unknowns. Outputs RESEARCH.md for the planner to consume.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-planning/stage-research-phase.md
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
    Read SPECS.md for sprint scope.
    Identify what needs research: domain unknowns, Figma design patterns, PO intent clarifications.
  </step>

  <step name="spawn_researcher">
    Prepare research prompt with:
    - Phase goal and description
    - Specific research questions
    - CONTEXT.md decisions (research THESE deeply, don't explore alternatives)
    - Output path: `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/RESEARCH.md`
    Spawn sub-agent following `.agent/rules/spawn sub-agents.md` (create spawn prompt, instruct user).
  </step>

  <step name="verify_output">
    After researcher returns, verify RESEARCH.md exists and covers research questions.
    Update STATE.md with research status.
  </step>

  <step name="report">
    Display research summary and key findings.
    Suggest next command:
    ```
    /makeit:plan-phase    → plan with research context
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and unknowns identified
- [ ] Researcher sub-agent spawned with scoped prompt
- [ ] RESEARCH.md produced in phase directory
- [ ] STATE.md updated with research status
- [ ] User informed of next steps
</success_criteria>
