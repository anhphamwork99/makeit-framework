---
name: makeit:debug
description: Systematic debugging with hypothesis-driven investigation and state tracking
---

<objective>
Diagnose issues during BA sprint execution using a systematic hypothesis-driven approach. Covers Gate failures, story-goal mismatches, Figma MCP tool issues, and missing deliverables. Creates a debug file to track investigation state across context resets.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-debugging/debug.md
@.agent/skills/makeit-ba/_shared/references/quality-gates.md
@.agent/skills/makeit-ba/_shared/references/figma-mcp.md
</execution_context>

<process>
  <step name="load_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If active → load for context (current phase, recent errors, blockers).
    Check for existing debug file: `.makeit/sprint/SPRINT-*/DEBUG.md`
    If exists → resume investigation from last state.
  </step>

  <step name="define_problem">
    Clearly define the problem:
    - What is failing or unexpected?
    - When did it start?
    - What was the last successful state?
    Categories: Gate failure, story mismatch, MCP tool error, missing deliverable, process issue.
  </step>

  <step name="investigate">
    Follow skill instructions for hypothesis-driven debugging:
    1. Generate hypotheses (most likely → least likely)
    2. For each hypothesis: define test, run test, record result
    3. Narrow down root cause
    4. Propose fix
    Track all steps in DEBUG.md for persistence.
  </step>

  <step name="save_findings">
    Update/create `.makeit/sprint/SPRINT-*/DEBUG.md` with:
    - Problem statement
    - Hypotheses tested (with results)
    - Root cause identified
    - Fix applied or recommended
    - Lessons for future (link to `/makeit:lesson-learned`)
  </step>

  <step name="report">
    Display findings and recommended next steps.
    If fix applied → suggest verification command.
    If root cause unclear → suggest escalation path.
  </step>
</process>

<success_criteria>
- [ ] Problem clearly defined
- [ ] Hypotheses systematically tested
- [ ] Investigation state persisted to DEBUG.md
- [ ] Root cause identified or escalation path provided
- [ ] User informed of next steps
</success_criteria>
