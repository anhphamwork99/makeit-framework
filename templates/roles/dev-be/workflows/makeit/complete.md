---
name: makeit:complete
description: Package deliverables, create PR with API/DB changes, git sync, and handoff for review
---

<objective>
Package BE sprint deliverables, create PR with comprehensive description (API changes, DB migrations, test results), sync to git, and prepare review handoff.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-lifecycle/stage-complete.md
@.agent/skills/makeit-dev-be/be-lifecycle/templates/pr-description.md
</execution_context>

<process>
  <step name="package_deliverables">
    Collect all deliverables, ensure committed with conventional format.
    Check no process-only files included.
  </step>

  <step name="git_sync">
    Stage files, generate commit message, present for user approval.
    ⚠️ STOP: Never use `git push --force` or `git reset --hard`.
  </step>

  <step name="create_pr">
    Generate PR description with BE-specific sections:
    API Endpoints Changed, Database Changes, Testing Done, Checklists.
  </step>

  <step name="draft_telegram">
    Generate Telegram notification draft for team.
  </step>

  <step name="update_state">
    Sprint status → `complete`. Log commit hash, PR link.
  </step>

  <step name="present_completion">
    Display summary with deliverables, PR description, Telegram draft.
    Sprint lifecycle: ✅ clarify → ✅ plan → ✅ execute → ✅ verify → ✅ complete
  </step>
</process>

<success_criteria>
- [ ] Deliverables committed
- [ ] PR description created with BE sections
- [ ] Telegram draft generated
- [ ] STATE.md set to complete
</success_criteria>
