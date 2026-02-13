---
name: fe-debug
description: FE systematic debugging — diagnose issues with component implementation, UI mismatches, build failures, or sprint process problems
---

<purpose>
Systematic diagnosis and resolution of issues during FE sprint execution using hypothesis-driven methodology adapted for FE's domain.
</purpose>

<rules>
1. Hypothesis-driven — don't fix randomly
2. Smallest fix first — minimal changes
3. Log everything — future sessions benefit from debug history
4. Max 3 attempts — escalate after 3 failed hypotheses
</rules>

<process>
  <step name="define_problem">
    1. **What is failing?** Specific error, UI mismatch, or build failure
    2. **When did it start?** After which action/step
    3. **Expected vs actual:** What should render vs what renders
  </step>

  <step name="gather_evidence">
    Read current state:
    1. STATE.md → execution history
    2. Latest phase PLAN.md → task specifications
    3. Error output, console messages, build logs
    4. Related component files
    5. Figma design reference
  </step>

  <step name="form_hypothesis">
    FE-specific hypotheses:

    | Category | Typical Issue | Investigation |
    |----------|--------------|---------------|
    | **Build failure** | TypeScript error, missing import, circular dep | Check error message, trace imports |
    | **UI mismatch** | Wrong color, spacing, layout | Compare-UI vs Figma, check token usage |
    | **State issue** | Component not updating, wrong state | Check state flow, re-render triggers |
    | **Responsive** | Layout breaks at breakpoint | Test at exact breakpoint, check media queries |
    | **Integration** | API data not rendering | Check API response, data mapping, error handling |
    | **Performance** | Slow render, jank | Profile render cycle, check memo usage |
    | **Figma MCP** | Can't extract design specs | Verify Figma link, try alternative MCP calls |
    | **Sub-agent quality** | Spawn output incomplete | Review spawn prompt, add constraints |
  </step>

  <step name="test_hypothesis">
    1. Try the smallest possible fix
    2. Re-run the failing check (build, render, compare-ui)
    3. If still failing → revise hypothesis
  </step>

  <step name="apply_fix">
    1. Make the correction
    2. Re-verify (build, visual check, test)
    3. Log the fix in STATE.md
  </step>

  <step name="log_debug_session">
    Record in `phases/{NN}/DEBUG.md`:
    ```markdown
    ## Debug: {issue description}
    - **Date:** {YYYY-MM-DD}
    - **Problem:** {what failed}
    - **Root cause:** {why it failed}
    - **Fix applied:** {what was changed}
    - **Prevention:** {how to avoid in future}
    ```
  </step>
</process>

<success_criteria>
- [ ] Problem clearly defined
- [ ] Hypothesis formed and tested
- [ ] Fix applied and verified
- [ ] Debug session logged
</success_criteria>
