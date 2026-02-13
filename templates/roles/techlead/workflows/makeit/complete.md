---
name: makeit:complete
description: Package sprint deliverables, commit to git, update Lark, and create Dev FE/BE handoff
---

<objective>
Finalize TL sprint — package all deliverables, sync to git, update Lark Sprint issue status, and create structured handoff documents for Dev FE and Dev BE. This is the TL exit point in the pipeline.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-lifecycle/stage-complete.md
@.agent/skills/makeit-techlead/_shared/references/quality-gates.md
@.agent/skills/makeit-techlead/_shared/references/team-workflow.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Verify sprint is in "verified" or "ready for completion" state.
    If not verified → warn: "Run /makeit:verify-work first"
  </step>

  <step name="package_deliverables">
    Collect all deliverables: task breakdowns, API contracts, estimations, code reviews.
    Verify all files are complete (not stubs).
  </step>

  <step name="git_sync">
    Stage deliverable files individually.
    Commit: `feat(tl-sprint): complete SPRINT-NNN deliverables`
  </step>

  <step name="create_handoff">
    Generate Dev handoff document with separate FE and BE sections.
    Save to `.makeit/sprint/SPRINT-*/HANDOFF.md`
  </step>

  <step name="update_state">
    Update STATE.md: sprint status → "complete, handed off to Dev FE/BE"
  </step>

  <step name="report">
    Display completion summary and Telegram notification message:
    ```
    ✅ TL Sprint SPRINT-NNN complete
    📦 Deliverables: {N} task breakdowns, {M} API contracts
    👉 Handoff: @DevFE @DevBE — tasks ready for implementation
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and verified status confirmed
- [ ] All deliverables packaged and committed to git
- [ ] HANDOFF.md created for Dev FE/BE
- [ ] STATE.md updated to complete
- [ ] Telegram notification message generated
</success_criteria>
