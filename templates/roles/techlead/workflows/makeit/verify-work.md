---
name: makeit:verify-work
description: Validate ALL sprint deliverables against SPECS.md — comprehensive quality check before completion
---

<objective>
Full sprint validation — checks every deliverable against SPECS.md requirements. Validates task breakdowns, API contracts, estimations, and cross-deliverable consistency to ensure TL work is ready for Dev handoff.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-verification/stage-verify-work.md
@.agent/skills/makeit-techlead/_shared/references/quality-gates.md
@.agent/skills/makeit-techlead/_shared/references/team-workflow.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse overall sprint status — all phases should be executed.
    If phases remain unexecuted → warn and ask user to confirm.
  </step>

  <step name="load_specs">
    Read SPECS.md → extract all requirements.
    Read ROADMAP.md → extract all phase goals.
    Build comprehensive requirement checklist.
  </step>

  <step name="validate_deliverables">
    For each requirement in SPECS.md:
    - Find matching deliverables
    - Check quality (not stub/placeholder)
    - Verify Gate 3 compliance
    - Check cross-deliverable consistency
  </step>

  <step name="coverage_report">
    Generate coverage report: requirements covered vs uncovered, quality scores.
  </step>

  <step name="suggest_next">
    Based on result:
    - All pass → `/makeit:complete` (package and handoff)
    - Gaps → `/makeit:execute-phase` (fix specific phase)
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and SPECS.md requirements extracted
- [ ] ALL deliverables validated against requirements
- [ ] Gate 3 quality checklist applied
- [ ] Coverage report generated
- [ ] STATE.md updated with verification status
- [ ] User informed of next steps
</success_criteria>
