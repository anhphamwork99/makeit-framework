---
name: tl-debug
description: TL systematic debugging — diagnose issues with task breakdowns, Gate failures, or sprint process problems
---

<purpose>
Systematic diagnosis and resolution of issues during TL sprint execution using hypothesis-driven methodology adapted for Techlead's domain.
</purpose>

<rules>
1. Hypothesis-driven — don't fix randomly
2. Smallest fix first — minimal changes
3. Log everything — future sessions benefit from debug history
4. Max 3 attempts — escalate after 3 failed hypotheses
</rules>

<process>
  <step name="define_problem">
    1. **What is failing?** Specific error, gap, or mismatch
    2. **When did it start?** After which action/step
    3. **Expected vs actual:** What should happen vs what happens
  </step>

  <step name="gather_evidence">
    Read current state:
    1. STATE.md → execution history
    2. Latest phase PLAN.md → task specifications
    3. Error output or verification failure details
    4. Related deliverables
  </step>

  <step name="form_hypothesis">
    TL-specific hypotheses:

    | Category | Typical Issue | Investigation |
    |----------|--------------|---------------|
    | **Gate 2** | BA stories incomplete, missing AC | Re-check Gate 2 checklist, contact BA |
    | **Gate 3** | Task breakdowns below quality bar | Re-read Gate 3 checklist, check each item |
    | **Task breakdown** | FE/BE split wrong, missing dependencies | Re-analyze stories, check API contracts |
    | **API contract** | FE/BE mismatch, missing endpoints | Verify contract against both FE and BE tasks |
    | **Estimation** | Over/under estimation, missing risk factors | Re-run estimation with more context |
    | **Solution design** | Wrong architecture choice, missing constraints | Re-evaluate trade-offs with updated context |
    | **Sub-agent quality** | Spawn prompt too vague, missing constraints | Review spawn prompt, add specifics |
  </step>

  <step name="test_hypothesis">
    1. Try the smallest possible fix
    2. Re-run the failing check
    3. If still failing → revise hypothesis
  </step>

  <step name="apply_fix">
    1. Make the correction
    2. Re-verify (use appropriate verify skill)
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
