---
name: makeit:debug
description: Systematic debugging with hypothesis-driven investigation for API errors, DB issues, migration failures
---

<objective>
Diagnose issues during BE sprint execution using systematic hypothesis-driven approach. Covers API errors, database issues, migration failures, security vulnerabilities, and performance problems. Creates debug file for state persistence.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-debugging/debug.md
@.agent/skills/makeit-dev-be/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="load_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Check for existing debug file: `.makeit/sprint/SPRINT-*/DEBUG.md`
    If exists → resume investigation from last state.
  </step>

  <step name="define_problem">
    What is failing? When did it start? Expected vs actual?
    Categories: API error, DB issue, migration failure, security, performance, integration.
  </step>

  <step name="investigate">
    Follow skill instructions for hypothesis-driven debugging:
    1. Generate hypotheses (most likely → least likely)
    2. For each: define test, run test, record result
    3. Narrow down root cause
    4. Propose fix (⚠️ STOP if destructive)
  </step>

  <step name="save_findings">
    Update/create DEBUG.md with problem, hypotheses tested, root cause, fix, prevention.
  </step>

  <step name="report">
    Display findings. If fix applied → suggest verification.
    If unclear → suggest escalation path.
  </step>
</process>

<success_criteria>
- [ ] Problem clearly defined
- [ ] Hypotheses systematically tested
- [ ] Investigation state persisted
- [ ] Root cause identified or escalation provided
</success_criteria>
