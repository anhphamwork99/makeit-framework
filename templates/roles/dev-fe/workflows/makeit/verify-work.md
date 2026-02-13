---
name: makeit:verify-work
description: Final FE sprint validation — all components vs SPECS.md with comprehensive UI quality checks
---

<objective>
Validate entire FE sprint output — all components, interaction states, responsive behavior, design token compliance, and accessibility meet SPECS.md criteria. UAT-like final check before sprint completion.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-verification/stage-verify-work.md
@.agent/skills/makeit-dev-fe/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint. Confirm all phases complete.
    Load SPECS.md for deliverable list and success criteria.
  </step>

  <step name="verify_all">
    For each deliverable: component quality, UI fidelity, interaction states, responsive, accessibility.
    Cross-deliverable consistency checks.
  </step>

  <step name="route_results">
    All pass → suggest `/makeit:complete`.
    Gaps found → list specific gaps with fix instructions.
  </step>
</process>

<success_criteria>
- [ ] All deliverables validated against SPECS.md
- [ ] FE-specific quality checks applied
- [ ] Cross-deliverable consistency verified
- [ ] User informed of next steps
</success_criteria>
