---
name: makeit:clarify
description: Start a new Techlead sprint — read Lark issue, verify Gate 2 (BA stories), create workspace
---

<objective>
Initialize TL sprint — parse Lark Sprint issue, verify BA stories against Gate 2 quality standards, and bootstrap the sprint workspace with STATE.md, SPECS.md, and ROADMAP.md. This is the TL entry point in the pipeline.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-discovery/stage-clarify.md
@.agent/skills/makeit-techlead/_shared/references/quality-gates.md
@.agent/skills/makeit-techlead/_shared/references/team-workflow.md
</execution_context>

<process>
  <step name="load_input">
    User provides Lark Sprint issue (URL, ID, or pasted content).
    Extract: sprint goal, user stories from BA, acceptance criteria, Figma links.
    If no Lark issue provided → ask user for sprint context.
  </step>

  <step name="verify_gate2">
    Apply Gate 2 (BA → Techlead) checklist:
    - Story format, AC quality, Figma links, edge cases, dependencies
    If ANY fails → report gaps, suggest contacting BA. Do NOT proceed.
  </step>

  <step name="create_workspace">
    Create sprint workspace:
    - `.makeit/sprint/SPRINT-{NNN}/STATE.md`
    - `.makeit/sprint/SPRINT-{NNN}/SPECS.md`
    - `.makeit/sprint/SPRINT-{NNN}/ROADMAP.md`
  </step>

  <step name="report">
    Display: Gate 2 result, workspace created, phase count.
    Suggest: `/makeit:discuss-phase` or `/makeit:plan-phase`
  </step>
</process>

<success_criteria>
- [ ] Lark Sprint issue parsed
- [ ] Gate 2 verified — all items checked
- [ ] Sprint workspace created (STATE + SPECS + ROADMAP)
- [ ] User informed of next steps
</success_criteria>
