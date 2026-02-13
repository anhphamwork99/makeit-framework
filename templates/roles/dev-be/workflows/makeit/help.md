---
name: makeit:help
description: Display all available BE commands organized by category
---

<objective>
Display all 14 available Dev BE commands with descriptions, organized by category for quick reference.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-support/help.md
</execution_context>

<process>
  <step name="display">
    Follow skill instructions to display all commands:
    - Stage commands (6): clarify, plan-phase, execute-phase, verify-phase, verify-work, complete
    - Support commands (5): status, help, decide, estimate, lesson-learned
    - Context management (3): pause-work, resume-work, debug
    - Handoff (1): check-handoff — Check for incoming handoff from upstream role
    Include STOP mechanism note.
  </step>
</process>

<success_criteria>
- [ ] All 14 commands displayed with descriptions
- [ ] Commands organized by category
</success_criteria>
