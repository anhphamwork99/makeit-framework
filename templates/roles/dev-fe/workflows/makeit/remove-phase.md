---
name: makeit:remove-phase
description: Remove a future pending FE phase from ROADMAP and renumber
---

<objective>
Remove unstarted future FE phase from sprint roadmap and renumber subsequent phases cleanly.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-management/stage-remove-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint. Read ROADMAP.md. Identify phase to remove.
  </step>

  <step name="validate">
    Confirm phase is pending (never remove started/completed).
    Check dependencies. Confirm with user.
  </step>

  <step name="remove">
    Delete phase from ROADMAP.md. Renumber subsequent phases. Delete/archive directory. Update STATE.md.
  </step>
</process>
