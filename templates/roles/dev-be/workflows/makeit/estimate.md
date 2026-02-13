---
name: makeit:estimate
description: Assess implementation complexity with BE-specific factors and t-shirt sizing
---

<objective>
Evaluate implementation effort for a BE task using complexity factors — endpoint count, business logic, DB changes, integrations.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-support/estimate.md
</execution_context>

<process>
  <step name="scope">
    Identify task scope boundaries and known complexities.
  </step>

  <step name="assess">
    Rate factors 1-5: endpoint count, business logic, DB changes, external integrations, error handling, testing effort.
  </step>

  <step name="estimate">
    Map to t-shirt size: S (~0.5-1d), M (~1-2d), L (~3-5d), XL (>5d).
    XL → suggest breaking into smaller tasks.
  </step>
</process>

<success_criteria>
- [ ] Complexity factors assessed
- [ ] T-shirt estimate provided
- [ ] Risks identified
</success_criteria>
