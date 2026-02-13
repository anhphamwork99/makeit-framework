---
name: makeit:help
description: Show all available PO commands organized by category
---

<objective>
Display all available PO commands with descriptions, organized by category. Quick reference for PO workflow navigation.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-support/help.md
</execution_context>

<process>
  <step name="execute">
    Follow skill instructions to display all commands:
    - Stage commands (6-stage lifecycle)
    - Support commands
    - Lifecycle extras
    - Dual-mode explanation
    - AI Verification rule reminder
    - Handoff: `/makeit:check-handoff` — Check for incoming handoff from upstream role
  </step>
</process>

<success_criteria>
- [ ] All 14 commands displayed with descriptions
- [ ] Commands organized by category
</success_criteria>
