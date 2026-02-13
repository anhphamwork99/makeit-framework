---
name: makeit:estimate
description: Estimate backlog item complexity using business-oriented sizing
---

<objective>
Assess backlog item business complexity using t-shirt sizing. PO estimates business complexity (flows, edges, stakeholders) — technical estimation is Techlead's responsibility.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-support/estimate.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Load backlog items from deliverables or PLAN.md.
  </step>

  <step name="execute">
    Follow skill instructions to:
    1. Identify items to estimate
    2. Assess 5 business dimensions (flows, edges, stakeholders, deps, clarity)
    3. Apply ceiling rule
    4. Display complexity summary
  </step>
</process>

<success_criteria>
- [ ] Items assessed across business dimensions
- [ ] Complexity summary displayed
- [ ] Distinct from technical estimation
</success_criteria>
