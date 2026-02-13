---
name: fe-stage-complete
description: FE sprint completion — create PR, package deliverables, git sync, prepare Designer/Techlead handoff, draft Telegram message
---

<purpose>
Package FE sprint deliverables, create PR, sync to git, and create structured handoff document for Designer (UI verification) and Techlead (code review).
</purpose>

<required_reading>
@fe-verification/stage-verify-work.md
@fe-lifecycle/workflows/create-pr.md
@fe-lifecycle/workflows/fix-feedback.md
@fe-lifecycle/templates/handoff.md
@fe-lifecycle/templates/pr-description.md
</required_reading>

<rules>
1. Git before handoff — always commit deliverables before creating handoff
2. User approval for commit — present diff before committing
3. STOP before push — ⚠️ MANDATORY pause before git push
4. Telegram = notification — draft only, user sends
5. Lark = user-guided — provide instructions, don't auto-update
6. Handoff is actionable — Designer can verify UI, Techlead can review code
</rules>

<output>
- Git commit + PR with all code deliverables
- Handoff document → `.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md` in product repo (template: `@fe-lifecycle/templates/handoff.md`)
- Telegram notification draft
- Updated STATE.md (status = complete)
</output>

<process>
  <step name="package_deliverables">
    Collect all code deliverables:
    - React components (*.tsx, *.ts)
    - Style files (*.css, *.scss, *.module.css)
    - Type definitions
    - Updated design token mappings
    - Tests if applicable
    Ensure no process files are included (PLAN.md, STATE.md stay in sprint workspace).
  </step>

  <step name="create_pr">
    Use internal workflow `@fe-lifecycle/workflows/create-pr.md`:
    1. Verify self-review and compare-ui completed
    2. Generate PR description using template `@fe-lifecycle/templates/pr-description.md`
    3. ⚠️ STOP — pause before git push for user approval
    4. Create PR with proper labels and reviewers
  </step>

  <step name="create_handoff">
    Generate structured handoff document using `@fe-lifecycle/templates/handoff.md`.
    Include: summary, components built, interaction states, responsive behavior,
    design token usage, known limitations, questions for Designer/Techlead.
    Include PR link, Lark Sprint Issue link as references.
  </step>

  <step name="commit_handoff_to_git">
    Commit HANDOFF.md to product repo via Git:

    1. Create role subfolder in shared sprint folder:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/fe/
       ```
    2. Write filled HANDOFF.md to `.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md`
    3. Git commit + push:
       ```bash
       cd {product_repo}
       git add .makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md
       git commit -m "handoff(fe): Sprint {NNN} — FE implementation for {feature}"
       git push
       ```
    4. Present commit for user approval before executing.

    > Lark link is included IN the HANDOFF.md as reference — no need to paste content to Lark.
  </step>

  <step name="draft_telegram">
    Generate ready-to-send Telegram message:
    ```
    🎨 FE Sprint Complete: {Feature Name}
    Sprint: SPRINT-{NNN}
    ✅ Handoff committed: .makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md
    Sprint Issue: [Lark link]
    Deliverables: {summary}
    PR: #{PR number}
    @po Ready for review. Run `/makeit:check-handoff` to review.
    @designer Ready for UI verification.
    @techlead Ready for code review.
    ```
  </step>

  <step name="guide_lark_update">
    Provide user with Lark update instructions.
    Do NOT auto-update Lark — user handles this manually.
  </step>

  <step name="knowledge_extraction">
    **Optional** — Review sprint deliverables and suggest knowledge docs that would benefit the team.

    1. **Scan deliverables:** Look at what this sprint produced:
       - Component patterns established (→ component pattern doc candidates)
       - UI conventions discovered (→ convention doc candidates)
       - Frontend integration lessons (→ lesson doc candidates)
       - Design token mappings (→ technical doc candidates)

    2. **Suggest candidates:**
       ```
       📚 Knowledge Capture Suggestions:

       1. [type] {title} — {why this is worth capturing}
       2. [type] {title} — {why this is worth capturing}

       💡 Run `/makeit:create-doc` to capture any of these.
       Skip if nothing noteworthy — not every sprint produces knowledge.
       ```

    3. **DO NOT auto-create docs.** This step SUGGESTS only.
       - User decides what's worth capturing
       - Keeps knowledge quality high
       - Prevents "documentation fatigue"
  </step>

  <step name="update_state">
    Sprint status → `complete`.
    Log completion timestamp, git commit hash, PR link, handoff summary.
  </step>

  <step name="present_completion">
    Display completion summary with deliverables committed, PR created, handoff path,
    Telegram draft, Lark instructions.
    Sprint lifecycle: ✅ clarify → ✅ plan → ✅ execute → ✅ verify → ✅ complete
  </step>
</process>

<success_criteria>
- [ ] Deliverables packaged (code files only)
- [ ] PR created with self-review + compare-ui evidence
- [ ] Git push approved by user (STOP mechanism)
- [ ] Handoff document created for Designer + Techlead
- [ ] Telegram draft generated
- [ ] Lark update instructions provided
- [ ] STATE.md updated to complete
</success_criteria>
