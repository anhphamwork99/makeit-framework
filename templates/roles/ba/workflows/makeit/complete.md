---
name: makeit:complete
description: Package sprint deliverables, commit to git, update Lark, and create Techlead handoff
---

<objective>
Finalize BA sprint — package all deliverables, sync to git, update Lark Sprint issue status, and create a structured handoff document for Techlead. This is the BA exit point in the pipeline.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-lifecycle/stage-complete.md
@.agent/skills/makeit-ba/_shared/references/quality-gates.md
@.agent/skills/makeit-ba/_shared/references/team-workflow.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Verify sprint is in "verified" or "ready for completion" state.
    If not verified → warn: "Run /makeit:verify-work first"
  </step>

  <step name="package_deliverables">
    Collect all deliverables from `.makeit/sprint/SPRINT-*/deliverables/`:
    - User stories with acceptance criteria
    - User flow documentation
    - Edge case analysis
    - Figma analysis reports
    Verify all files are complete (not stubs).
  </step>

  <step name="git_sync">
    Stage only deliverable files for commit:
    - Stage each file individually (never `git add .`)
    - Commit: `feat(ba-sprint): complete SPRINT-NNN deliverables`
  </step>

  <step name="create_handoff">
    Generate Techlead handoff document:
    - Sprint summary (goal, scope, what was delivered)
    - Deliverable index with file paths
    - Key decisions made during analysis
    - Open questions for Techlead
    - Figma links for reference
    Save to `.makeit/sprint/SPRINT-*/HANDOFF.md`
  </step>

  <step name="update_state">
    Update STATE.md: sprint status → "complete, handed off to Techlead"
    Update Lark Sprint issue status (or provide manual update instructions).
  </step>

  <step name="report">
    Display completion summary:
    - Deliverables committed
    - Handoff document location
    - Lark update status
    - Telegram notification message (ready to copy-paste)

    Generate Telegram message for team channel:
    ```
    ✅ BA Sprint SPRINT-NNN complete
    📦 Deliverables: {N} stories, {M} flows
    👉 Handoff: @Techlead — ready for task breakdown
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and verified status confirmed
- [ ] All deliverables packaged and committed to git
- [ ] HANDOFF.md created for Techlead
- [ ] STATE.md updated to complete
- [ ] Lark Sprint issue updated (or instructions provided)
- [ ] Telegram notification message generated
- [ ] User informed — sprint lifecycle complete
</success_criteria>
