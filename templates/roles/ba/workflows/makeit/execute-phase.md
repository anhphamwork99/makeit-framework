---
name: makeit:execute-phase
description: Execute plan tasks with BA domain workflows (analyze-design, write-stories, document-flow, identify-edges)
---

<objective>
Execute PLAN.md tasks using BA's internal domain workflows. Core engine that turns plans into deliverables — user stories, flow docs, Figma analysis reports. Handles task sequencing, sub-agent spawning for complex tasks, and deliverable tracking.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-execution/stage-execute-phase.md
@.agent/skills/makeit-ba/_shared/references/quality-gates.md
@.agent/skills/makeit-ba/_shared/references/figma-mcp.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase, verify a PLAN.md exists for this phase.
    If no plan → error: "Run /makeit:plan-phase first"
  </step>

  <step name="discover_tasks">
    Read `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/PLAN.md`
    List all tasks, check which are already complete (have deliverables).
    Build execution queue of remaining tasks.
  </step>

  <step name="execute_tasks">
    For each task in the plan:
    1. Determine which BA internal workflow to use:
       - Figma analysis → analyze-design workflow + Figma MCP
       - Story writing → write-stories workflow
       - Flow documentation → document-flow workflow
       - Edge case identification → identify-edges workflow
    2. Execute the task (inline or spawn sub-agent based on complexity)
    3. Save deliverable to `.makeit/sprint/SPRINT-*/deliverables/`
    4. Mark task complete in plan tracking
  </step>

  <step name="update_state">
    Update `.makeit/sprint/SPRINT-*/STATE.md`:
    - Phase progress (tasks completed / total)
    - Deliverables produced
    - Any blockers encountered
  </step>

  <step name="report">
    Display execution results: tasks completed, deliverables created, issues found.
    Suggest next command:
    ```
    /makeit:verify-phase    → verify phase output quality
    /makeit:execute-phase   → continue if tasks remain
    /makeit:status          → review progress
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and PLAN.md parsed
- [ ] All plan tasks executed (or blocked with clear reason)
- [ ] Deliverables saved to sprint deliverables directory
- [ ] STATE.md updated with execution progress
- [ ] User informed of next steps
</success_criteria>
