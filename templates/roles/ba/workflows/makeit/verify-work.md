---
name: makeit:verify-work
description: Validate ALL sprint deliverables against SPECS.md — comprehensive quality check before completion
---

<objective>
Full sprint validation — checks every deliverable against the original SPECS.md requirements. Unlike verify-phase (single phase), this validates the ENTIRE sprint output to ensure BA work is ready for Techlead handoff.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-verification/stage-verify-work.md
@.agent/skills/makeit-ba/_shared/references/quality-gates.md
@.agent/skills/makeit-ba/_shared/references/team-workflow.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse overall sprint status — all phases should be executed.
    If phases remain unexecuted → warn and ask user to confirm.
  </step>

  <step name="load_specs">
    Read `.makeit/sprint/SPRINT-*/SPECS.md` — extract all requirements.
    Read `.makeit/sprint/SPRINT-*/ROADMAP.md` — extract all phase goals.
    Build comprehensive requirement checklist.
  </step>

  <step name="validate_deliverables">
    For each requirement in SPECS.md:
    - Find matching deliverable(s) in `deliverables/` directory
    - Check quality (not stub/placeholder)
    - Verify acceptance criteria are testable
    - Check cross-references (Figma links, PO goal references)
    Apply Gate 2 (BA → Techlead) full checklist from `@_shared/references/quality-gates.md`.
  </step>

  <step name="coverage_report">
    Generate coverage report:
    - Requirements covered vs uncovered
    - Quality score per deliverable
    - Missing cross-references
    - Ready for handoff? (yes/no with reasons)
  </step>

  <step name="update_state">
    Update STATE.md with verification result.
    If passed → mark sprint as "verified, ready for completion"
    If gaps → list specific action items
  </step>

  <step name="suggest_next">
    Based on result:
    - All pass → `/makeit:complete` (package and handoff)
    - Gaps found → `/makeit:execute-phase` (fix specific phase) or `/makeit:plan-phase` (new phase for gaps)
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and SPECS.md requirements extracted
- [ ] ALL deliverables validated against requirements
- [ ] Gate 2 quality checklist applied
- [ ] Coverage report generated
- [ ] STATE.md updated with verification status
- [ ] User informed of next steps (complete or fix gaps)
</success_criteria>
