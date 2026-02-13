---
name: makeit:complete
description: Create PR, package deliverables, commit to git, create Designer/Techlead handoff
---

<objective>
Finalize FE sprint — create PR with self-review evidence, package all code deliverables, sync to git with STOP before push, and create structured handoff for Designer (UI verify) and Techlead (code review).
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-lifecycle/stage-complete.md
@.agent/skills/makeit-dev-fe/_shared/references/quality-gates.md
@.agent/skills/makeit-dev-fe/_shared/references/team-workflow.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint. Verify sprint is verified/ready for completion.
    If not verified → warn: "Run /makeit:verify-work first"
  </step>

  <step name="package_and_pr">
    Package code deliverables. Generate PR description.
    ⚠️ STOP before git push — mandatory user approval.
    Create PR with proper labels and reviewers.
  </step>

  <step name="create_handoff">
    Generate handoff document for Designer + Techlead.
    Draft Telegram notification. Provide Lark update instructions.
  </step>

  <step name="finalize">
    Update STATE.md to complete. Display completion summary.
    Sprint lifecycle: ✅ clarify → ✅ plan → ✅ execute → ✅ verify → ✅ complete
  </step>
</process>

<success_criteria>
- [ ] PR created with self-review + compare-ui evidence
- [ ] Git push approved by user (STOP mechanism)
- [ ] HANDOFF.md created for Designer + Techlead
- [ ] STATE.md updated to complete
- [ ] Telegram notification drafted
</success_criteria>
