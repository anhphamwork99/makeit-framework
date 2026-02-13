---
name: makeit:debug
description: Systematic FE debugging — hypothesis-driven investigation for UI, build, and state issues
---

<objective>
Diagnose FE issues using hypothesis-driven methodology. Covers build failures, UI mismatches, state issues, responsive breaks, integration problems, Figma MCP errors, and sub-agent quality issues.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-debugging/debug.md
@.agent/skills/makeit-dev-fe/_shared/references/quality-gates.md
@.agent/skills/makeit-dev-fe/_shared/references/figma-mcp.md
</execution_context>

<process>
  <step name="load_context">
    Find active sprint. Check for existing DEBUG.md.
    If exists → resume investigation from last state.
  </step>

  <step name="investigate">
    Define problem clearly. Form FE-specific hypotheses.
    Test each hypothesis: smallest fix → re-verify.
    Track all steps in DEBUG.md.
  </step>

  <step name="report">
    Display findings. Suggest verification command or escalation.
    Link to `/makeit:lesson-learned` for future prevention.
  </step>
</process>

<success_criteria>
- [ ] Problem clearly defined
- [ ] Hypotheses systematically tested
- [ ] Investigation persisted to DEBUG.md
- [ ] Root cause identified or escalation provided
</success_criteria>
