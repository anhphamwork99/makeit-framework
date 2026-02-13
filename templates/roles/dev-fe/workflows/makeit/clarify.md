---
name: makeit:clarify
description: Read Lark Sprint issue, verify Gate 3, create FE sprint workspace
---

<objective>
Read Techlead's Lark Sprint issue, verify Gate 3 (input quality, Figma readiness, user story traceability), and create structured FE sprint workspace with SPECS.md, ROADMAP.md, STATE.md.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-discovery/stage-clarify.md
@.agent/skills/makeit-dev-fe/_shared/references/quality-gates.md
@.agent/skills/makeit-dev-fe/_shared/references/figma-mcp.md
</execution_context>

<process>
  <step name="load_input">
    Ask user for Lark Sprint issue content (paste, URL, or structured input).
    Extract: sprint ID, tasks, Figma links, API contracts, constraints.
  </step>

  <step name="verify_gate_3">
    Run Gate 3 verification against Techlead tasks.
    Check: task clarity, Figma readiness, user story reference, API contracts.
    If failures → block and generate clarification message for Techlead.
  </step>

  <step name="create_workspace">
    Create `.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/` with STATE.md, SPECS.md, ROADMAP.md.
    Populate SPECS.md with FE deliverables and success criteria.
    Populate ROADMAP.md with phased execution plan.
    Initialize STATE.md with Phase 1 pending.
  </step>

  <step name="report">
    Display workspace summary, Gate 3 result, deliverables expected.
    Suggest: `/makeit:plan-phase` or `/makeit:discuss-phase`.
  </step>
</process>

<success_criteria>
- [ ] Sprint workspace created with all files
- [ ] Gate 3 verified — all checks pass or failures flagged
- [ ] STOP mechanism reminder included
- [ ] User informed of next steps
</success_criteria>
