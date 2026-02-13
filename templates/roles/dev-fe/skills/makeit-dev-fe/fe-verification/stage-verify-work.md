---
name: fe-stage-verify-work
description: FE sprint deliverables verification — validate all implemented components against SPECS.md with FE-specific UI quality checks
---

<purpose>
Validate entire sprint output — all components, responsive behavior, interaction states, and design token compliance meet SPECS.md criteria. UAT-like final check before sprint completion.
</purpose>

<required_reading>
@fe-verification/stage-verify-phase.md
@fe-lifecycle/stage-complete.md
@fe-verification/workflows/self-review.md
@fe-execution/workflows/compare-ui.md
@_shared/references/quality-gates.md
</required_reading>

<rules>
1. Verify against SPECS.md — spec is source of truth
2. Check ALL deliverables — don't skip any component
3. FE-specific quality — components, states, responsive, tokens, accessibility
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
    3. List code files produced — actual component files
  </step>

  <step name="fe_deliverable_check">
    For EACH expected deliverable:

    **Component Quality Check:**
    - [ ] All specified components implemented
    - [ ] TypeScript interfaces defined correctly
    - [ ] Props documented and typed (no `any`)
    - [ ] Component renders without errors
    - [ ] Single responsibility maintained
    - [ ] Reusable across specified contexts

    **UI Fidelity Check:**
    - [ ] Visual match with Figma designs (via compare-ui)
    - [ ] Design tokens used consistently
    - [ ] No hardcoded colors, spacing, or font values
    - [ ] Typography matches design system

    **Interaction States Check:**
    - [ ] Default state implemented
    - [ ] Hover state implemented
    - [ ] Active/pressed state implemented
    - [ ] Disabled state implemented
    - [ ] Error state implemented
    - [ ] Empty state implemented
    - [ ] Loading state implemented

    **Responsive Check:**
    - [ ] Desktop layout correct
    - [ ] Tablet layout correct
    - [ ] Mobile layout correct
    - [ ] No horizontal scroll on mobile
    - [ ] Touch targets adequate on mobile

    **Accessibility Check:**
    - [ ] Semantic HTML elements used
    - [ ] Alt text on images
    - [ ] Keyboard navigation works
    - [ ] Focus states visible
    - [ ] ARIA attributes where needed
  </step>

  <step name="cross_deliverable_consistency">
    | Check | Description |
    |-------|-------------|
    | Component-Design alignment | Every Figma screen covered by implementation |
    | Token consistency | Same tokens used for same visual elements |
    | State coverage | All 7 interaction states across all interactive components |
    | Responsive consistency | Same breakpoint behavior across all components |
    | Downstream usability | Designer can verify and PO can test this implementation |
  </step>

  <step name="route_results">
    **ALL PASS ✅:** Display verification report with component counts, success criteria status,
    cross-checks. Suggest: `/makeit:complete`.

    **GAPS FOUND ❌:** List specific gaps → suggest which phase to revisit → re-run after fixing.
  </step>
</process>

<success_criteria>
- [ ] All deliverables validated against SPECS.md
- [ ] FE-specific quality checks applied (UI, states, responsive, a11y)
- [ ] Cross-deliverable consistency verified
- [ ] STATE.md updated with verification result
- [ ] User informed of next steps
</success_criteria>
