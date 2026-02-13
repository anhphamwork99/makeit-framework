---
name: makeit:estimate
description: Assess story complexity using t-shirt sizing — helps prioritize and plan sprint capacity
---

<objective>
Evaluate the complexity of user stories or phase tasks using t-shirt sizing (XS/S/M/L/XL). Reads stories from the current sprint deliverables and produces estimates based on scope, uncertainty, and dependencies.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-support/estimate.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no sprint → error: "Run /makeit:clarify first — need stories to estimate"
    Read user stories from sprint deliverables directory.
  </step>

  <step name="execute">
    Follow skill instructions for t-shirt sizing:
    - Assess each story/task on: scope, uncertainty, dependencies
    - Assign t-shirt size: XS (< 1h), S (1-2h), M (2-4h), L (4-8h), XL (> 8h)
    - Flag stories that are too large (XL → should be split)
  </step>

  <step name="persist">
    Display estimation summary table.
    If requested, update story files with estimates.
    Note total sprint capacity estimate.
  </step>
</process>

<success_criteria>
- [ ] Stories loaded from sprint deliverables
- [ ] Each story assigned a t-shirt size with reasoning
- [ ] XL stories flagged for splitting
- [ ] Summary table displayed
</success_criteria>
