---
name: ba-debug
description: BA systematic debugging — diagnose issues with BA deliverables, Gate failures, or sprint process problems
---

<purpose>
Systematic diagnosis and resolution of issues during BA sprint execution using hypothesis-driven methodology adapted for BA's domain.
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
    BA-specific hypotheses:

    | Category | Typical Issue | Investigation |
    |----------|--------------|---------------|
    | **Gate 1** | Design not ready, PO context missing | Re-check Figma status, Lark issue completeness |
    | **Gate 2** | Stories below quality bar | Re-read Gate 2 checklist, check each item |
    | **Design analysis** | MCP tool limitations, frame access | Verify Figma links, try alternative MCP calls |
    | **Story-goal mismatch** | Wrong interpretation of PO intent | Re-read PO goal, compare with story content |
    | **Flow gaps** | Missing alternative paths, edge cases | Re-analyze Figma flows systematically |
    | **Sub-agent quality** | Spawn prompt too vague, missing context | Review spawn prompt, add constraints |
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

<edge_cases>

**Khi root cause là AI capability limit, không phải process error:** Nếu sau 3 hypotheses vẫn fail VÀ tất cả hypotheses đều point về "AI không đủ context/capability" → ⚠️ STOP — Đây không phải bug có thể fix bằng debug. Escalate cho human: "Đã test 3 hypotheses, root cause: AI capability limit cho task loại này. Suggest: human complete task với partial output AI đã produce, hoặc simplify task scope."

</edge_cases>

<success_criteria>
- [ ] Problem clearly defined
- [ ] Hypothesis formed and tested
- [ ] Fix applied and verified
- [ ] Debug session logged
</success_criteria>
