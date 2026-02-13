---
name: makeit:debug
description: Systematic debugging with persistent state tracking across context resets
---

<objective>
Diagnose and fix issues during TL sprint execution — Gate failures, task breakdown quality, API contract mismatches. Uses hypothesis-driven methodology with debug logging.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-debugging/debug.md
</execution_context>

<process>
  <step name="define_problem">
    Ask: What is failing? When did it start? Expected vs actual?
    Find active sprint context.
  </step>

  <step name="investigate">
    Form hypothesis from TL-specific categories:
    Gate 2, Gate 3, task breakdown, API contract, estimation, solution design, sub-agent quality.
    Test smallest fix first.
    Max 3 attempts before escalation.
  </step>

  <step name="fix_and_log">
    Apply fix, re-verify, log in DEBUG.md.
    Update STATE.md with resolution.
  </step>
</process>

<success_criteria>
- [ ] Problem clearly defined
- [ ] Hypothesis tested
- [ ] Fix applied and verified
- [ ] Debug session logged
</success_criteria>
