---
name: be-lesson-learned
description: BE lesson learned — capture lessons after feature completion with structured analysis and action items
---

<purpose>
Record lessons learned after feature completion — structured event description, analysis, and actionable items.
</purpose>

<process>
  <step name="describe_event">
    1. **Context:** Feature/task, timeframe
    2. **What happened:** Specific situation
    3. **Impact:** Effect on timeline, quality, team
  </step>

  <step name="analyze">
    **What went well ✅**
    - [Specific positive outcome 1]
    - [Specific positive outcome 2]

    **What didn't go well ❌**
    - [Issue 1 — specific, no blame]
    - [Issue 2]

    **Root cause** (if issues found)
    - [Why it happened — process level]
  </step>

  <step name="action_items">
    | # | Action | Owner | Deadline |
    |---|--------|-------|----------|
    | 1 | [Specific action] | [Dev BE/Team] | [Sprint N] |
    | 2 | [Specific action] | [Dev BE/Team] | [Sprint N] |

    > 💡 Actions must be actionable — not "write better code" but "add validation step before implement"
  </step>

  <step name="save">
    1. Save entry (standalone or append to task file)
    2. Display summary in chat
    3. Suggest: share key learnings in sprint retrospective
  </step>
</process>

<success_criteria>
- [ ] Event described with context
- [ ] Analysis completed (positives + issues)
- [ ] Action items defined with owners
</success_criteria>
