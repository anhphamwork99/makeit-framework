---
name: makeit:health-check
description: Scan workspace for broken references, missing files, registry mismatches, and structural issues
---

<objective>
Run an agent-powered workspace integrity check. Scans for broken @path references, GEMINI.md vs skill file sync, SKILL.md catalogue accuracy, help.md sync, agent file existence, and template references. Produces a report with errors, warnings, and optional self-healing suggestions.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/_shared/skills/health-check/health-check.md
@.agent/skills/makeit-dev-be/SKILL.md
</execution_context>

<process>
  <step name="run_health_check">
    Follow the health-check skill instructions to scan the workspace.
    The skill will guide you through each check category and produce a structured report.
  </step>
</process>

<success_criteria>
- [ ] All check categories scanned
- [ ] Report generated with errors and warnings
- [ ] Self-healing suggestions provided (if applicable)
</success_criteria>
