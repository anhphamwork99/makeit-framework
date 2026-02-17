---
name: makeit:whats-new
description: Check framework updates and apply changes to current workspace
---

<objective>
Check if there are framework updates available, show what changed, and guide user through applying updates. Reads CHANGELOG from blueprint repo, compares with local version, and applies changes interactively.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/_shared/skills/whats-new/whats-new.md
</execution_context>

<process>
  <step name="run_what_new">
    Follow the whats-new skill instructions to:
    1. Detect current version from .makeit/FRAMEWORK-VERSION
    2. Compare with latest version in blueprint repo
    3. Show what changed (from CHANGELOG.md)
    4. Guide user through applying updates step by step
    5. Update version tracking after completion
  </step>
</process>

<success_criteria>
- [ ] Version comparison completed
- [ ] Relevant changes displayed
- [ ] Updates applied (if any)
- [ ] FRAMEWORK-VERSION updated
</success_criteria>
