---
name: tl-stage-verify-work
description: TL verify work — validate ALL sprint deliverables against SPECS.md before completion
---

<purpose>
Full sprint validation — checks every deliverable against the original SPECS.md requirements. Unlike verify-phase (single phase), this validates the ENTIRE sprint output to ensure TL work is ready for Dev FE/BE handoff.
</purpose>

<required_reading>
- `.agent/skills/makeit-techlead/_shared/references/quality-gates.md` — Gate 3 full checklist
- `.agent/skills/makeit-techlead/_shared/references/team-workflow.md` — Handoff rules
</required_reading>

<rules>
1. Check ALL phases, not just the last one
2. SPECS.md is the source of truth for requirement coverage
3. Gate 3 must pass across ALL task breakdowns
4. Cross-deliverable consistency: API contracts match task descriptions
5. If any phase has gaps → suggest specific fix before allowing completion
</rules>

<process>
  <step name="load_sprint">
    Read STATE.md → verify all phases are "executed" or "verified".
    If phases remain unexecuted → warn and ask user to confirm.
    Read SPECS.md → extract all requirements.
    Read ROADMAP.md → extract all phase goals.
  </step>

  <step name="validate_deliverables">
    For each requirement in SPECS.md:

    **Task Breakdown Coverage:**
    - Every BA story has a corresponding task breakdown?
    - FE and BE tasks identified for each story?
    - No stories left unbroken?

    **API Contract Coverage:**
    - All FE-BE interaction points have API contracts?
    - Request/response schemas defined?
    - Error handling specified?

    **Estimation Coverage:**
    - All tasks estimated?
    - XL tasks flagged and broken down?
    - Sprint capacity feasible?

    **Quality Checks:**
    - Gate 3 applied to each task breakdown
    - Self-review passed for each deliverable
    - Coding standards referenced where applicable
  </step>

  <step name="cross_deliverable_consistency">
    Verify consistency across deliverables:
    - API contracts in task breakdowns match estimation scope
    - FE/BE dependencies are correctly mapped
    - No conflicting architecture decisions across phases
    - Story references are consistent
  </step>

  <step name="coverage_report">
    Generate coverage report:
    ```
    📊 Sprint Verification Report

    Requirements: {N}/{total} covered
    Task Breakdowns: {N}/{total} complete
    API Contracts: {N}/{total} defined
    Estimations: {N}/{total} done

    Gate 3 Status: ✅ PASS / ⚠️ GAPS FOUND
    Ready for handoff: YES / NO

    Gaps (if any):
    - {gap 1}: {specific fix}
    - {gap 2}: {specific fix}
    ```
  </step>

  <step name="update_state">
    Update STATE.md:
    - If passed → "verified, ready for completion"
    - If gaps → list specific action items
  </step>

  <step name="suggest_next">
    Based on result:
    - All pass → `/makeit:complete` (package and handoff)
    - Gaps → `/makeit:execute-phase {N}` (fix specific phase)
  </step>
</process>

<success_criteria>
- [ ] All phases checked
- [ ] SPECS.md requirements mapped to deliverables
- [ ] Gate 3 applied across all task breakdowns
- [ ] Cross-deliverable consistency verified
- [ ] Coverage report generated
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
