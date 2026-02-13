---
name: makeit:debug
description: Systematic debugging for PO workflow issues with persistent state
---

<objective>
Systematic debugging for PO-specific workflow issues — Gate verification failures, backlog item gaps, sprint planning inconsistencies, PR review accuracy. Creates persistent debug state files that survive context resets.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-debugging/debug.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Check for existing debug files: `.makeit/debug/DEBUG-*.md`
  </step>

  <step name="execute">
    Follow skill instructions to:
    1. Describe and classify issue
    2. Create persistent debug state file
    3. Investigate root cause
    4. Apply fix or escalate
  </step>
</process>

<success_criteria>
- [ ] Issue classified
- [ ] Debug state persisted
- [ ] Root cause identified or escalated
</success_criteria>
