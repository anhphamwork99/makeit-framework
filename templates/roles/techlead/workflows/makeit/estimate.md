---
name: makeit:estimate
description: Assess task complexity using TL 7-factor scoring and t-shirt sizing
---

<objective>
Evaluate task complexity using Techlead's specialized 7-factor scoring model with risk-adjusted t-shirt sizing and FE/BE split analysis.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-support/estimate.md
</execution_context>

<process>
  <step name="gather_tasks">
    Read task breakdowns from sprint deliverables or PLAN.md.
    If no sprint → ask user to describe tasks to estimate.
  </step>

  <step name="assess">
    Apply 7-factor scoring: scope, complexity, dependencies, uncertainty, integration, testing, risk.
    Calculate t-shirt size.
    Apply risk multiplier.
    Compute FE/BE split.
  </step>

  <step name="report">
    Display estimation report with per-task breakdown, risk assessment, and FE/BE split totals.
    Flag XL+ tasks for splitting.
  </step>
</process>

<success_criteria>
- [ ] Tasks assessed across 7 factors
- [ ] T-shirt sizes assigned
- [ ] Risk multipliers applied
- [ ] FE/BE split calculated
</success_criteria>
