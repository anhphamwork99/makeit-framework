---
name: ba-stage-verify-work
description: BA sprint deliverables verification — validate all output against SPECS.md with BA-specific story quality checks
---

<purpose>
Validate entire sprint output — all user stories, flow docs, edge cases, and analysis reports meet SPECS.md criteria. UAT-like final check before sprint completion.
</purpose>

<required_reading>
@ba-verification/stage-verify-phase.md
@ba-lifecycle/stage-complete.md
@ba-verification/templates/spec-verification.md
@_shared/references/quality-gates.md
</required_reading>

<rules>
1. Verify against SPECS.md — spec is source of truth
2. Check ALL deliverables — don't skip any
3. BA-specific quality — stories, flows, edge cases must meet quality bar
4. Don't fix during verification — only check, don't modify
5. One re-verification allowed — after fixing, re-run once
</rules>

<output>
Verification report:
- ALL PASS → route to `/makeit:complete`
- GAPS → route back to fix with specific action items
</output>

<process>
  <step name="load_sprint_context">
    1. Read SPECS.md → deliverables list, success criteria, sprint goal
    2. Read STATE.md → confirm all phases complete
    3. List `deliverables/` folder → actual files
  </step>

  <step name="ba_deliverable_check">
    For EACH expected deliverable:

    **User Stories Check:**
    - [ ] All PO goals covered by at least one story
    - [ ] Each story has ≥3 checkable AC
    - [ ] Figma links attached to all stories
    - [ ] Edge cases integrated into AC
    - [ ] Story format correct ("As a... I want... So that...")
    - [ ] Dependencies identified with status

    **User Flow Documentation Check:**
    - [ ] Entry point defined
    - [ ] Happy path documented step-by-step
    - [ ] Alternative paths documented
    - [ ] Edge cases listed with expected behavior
    - [ ] Error handling documented

    **Figma Analysis Report Check:**
    - [ ] All screens identified and analyzed
    - [ ] Components listed with states
    - [ ] Interaction states documented
    - [ ] Data requirements extracted
    - [ ] Flow transitions mapped

    **Edge Case Analysis Check:**
    - [ ] Systematic by category (data, state, UI, business, error)
    - [ ] Priority assessed (critical/important/nice-to-have)
    - [ ] Integrated into story AC
  </step>

  <step name="cross_deliverable_consistency">
    | Check | Description |
    |-------|-------------|
    | Story-Flow alignment | Every user flow has corresponding stories |
    | Story-Design alignment | Every Figma screen covered by a story |
    | Edge-Story integration | Critical edge cases in story AC |
    | Goal coverage | All PO goals addressed |
    | Downstream usability | Techlead can use these to break into tasks |
  </step>

  <step name="route_results">
    **ALL PASS ✅:** Display verification report with deliverable counts, success criteria status,
    cross-checks. Suggest: `/makeit:complete`.

    **GAPS FOUND ❌:** List specific gaps → suggest which phase to revisit → re-run after fixing.
  </step>
</process>

<success_criteria>
- [ ] All deliverables validated against SPECS.md
- [ ] BA-specific quality checks applied
- [ ] Cross-deliverable consistency verified
- [ ] STATE.md updated with verification result
- [ ] User informed of next steps
</success_criteria>
