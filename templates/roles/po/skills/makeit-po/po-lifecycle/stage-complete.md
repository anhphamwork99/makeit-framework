---
name: po-stage-complete
description: PO sprint completion — package deliverables, git sync, prepare BA+Designer handoff, draft Telegram message
---

<purpose>
Package PO sprint deliverables, sync to git, update Lark (user-guided), and create structured handoff document for BA and Designer.
</purpose>

<required_reading>
@po-verification/stage-verify-work.md
@po-lifecycle/templates/handoff.md
</required_reading>

<rules>
1. Git before handoff — always commit deliverables before creating handoff
2. User approval for commit — present diff before committing
3. Telegram = notification — draft only, user sends
4. Lark = user-guided — provide instructions, don't auto-update
5. Handoff is actionable — BA+Designer should be able to start immediately
6. AI Verification reminder — include in handoff: PO has reviewed all outputs
7. Lark Tasks at completion — create all tasks simultaneously via Lark MCP, IDs go into HANDOFF
</rules>

<output>
- Git commit with all deliverables
- Handoff document → `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md` in product repo (template: `@po-lifecycle/templates/handoff.md`)
- Lark Tasks created for BA (or marked Pending if Lark MCP unavailable)
- Telegram notification draft
- Updated STATE.md (status = complete)
</output>

<process>
  <step name="package_deliverables">
    Collect all deliverables from `deliverables/` folder.
    Ensure file naming convention is consistent:
    - `TASK-NNN-{feature-name}.md` for backlog items
    - `SPRINT-PLAN-{sprint}.md` for sprint plan
    - `REVIEW-{pr-id}.md` for PR review feedback
    Check no process-only files are included (PLAN.md, STATE.md stay in sprint workspace).
  </step>

  <step name="git_sync">
    Stage deliverable files for commit.
    Use conventional commit format:
    ```
    docs(po): [Sprint-NNN] backlog items + sprint plan for {feature}
    ```
    Present commit for user approval before executing.
  </step>

  <step name="create_handoff">
    Generate structured handoff document for BA+Designer using `@po-lifecycle/templates/handoff.md`.
    Include: summary, deliverables table, backlog items overview, priority rationale,
    design coordination needs, Gate 1 sender status, known edge cases, PO context notes.
    Include Lark Sprint Issue link as reference.

    > Include AI Verification statement: "PO has reviewed and approved all deliverables in this handoff."
  </step>

  <step name="create_lark_tasks">
    Reference: @_shared/skills/lark-task-helper/lark-task-reference.md

    1. Extract tasks from filled HANDOFF.md "Tasks For Receiver" table
    2. For each task, create Lark Task via Lark MCP:
       - Title: task description from table
       - Assignee: BA display name (if known) or empty
       - Description: "Sprint SPRINT-{NNN} task from PO. See HANDOFF: .makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md"
    3. Write Lark Task IDs back to HANDOFF task table
    4. If Lark MCP fails: follow fallback pattern (mark Pending, log todo)
  </step>

  <step name="commit_handoff_to_git">
    Commit HANDOFF.md to product repo via Git:

    1. Create role subfolder in shared sprint folder:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/po/
       ```
    2. Write filled HANDOFF.md to `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md`
    3. Git commit + push:
       ```bash
       cd {product_repo}
       git add .makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md
       git commit -m "handoff(po): Sprint {NNN} — backlog items for {feature}"
       git push
       ```
    4. Present commit for user approval before executing.

    > Lark link is included IN the HANDOFF.md as reference — no need to paste content to Lark.
  </step>

  <step name="draft_telegram">
    Generate ready-to-send Telegram message:
    ```
    📋 PO Sprint Complete: {Feature Name}
    Sprint: SPRINT-{NNN}
    Mode: {Backlog Creation / PR Review}
    ✅ Handoff committed: .makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md
    Sprint Issue: [Lark link]
    Deliverables: {summary}
    @ba @designer Ready for story breakdown. Run `/makeit:check-handoff` to review.
    ```
  </step>

  <step name="guide_lark_update">
    Provide user with Lark update instructions.
    Do NOT auto-update Lark — user handles this manually.
  </step>

  <step name="knowledge_extraction">
    **Optional** — Review sprint deliverables and suggest knowledge docs that would benefit the team.

    1. **Scan deliverables:** Look at what this sprint produced:
       - Feature decisions made (→ feature decision doc candidates)
       - Business priority rationale (→ business rule doc candidates)
       - Market insights gathered (→ lesson doc candidates)
       - Acceptance criteria patterns (→ pattern doc candidates)

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
    Log completion timestamp, git commit hash, handoff summary.
  </step>

  <step name="present_completion">
    Display completion summary with deliverables committed, handoff path,
    Telegram draft, Lark instructions.
    Sprint lifecycle: ✅ start-sprint → ✅ plan → ✅ execute → ✅ verify → ✅ complete
  </step>
</process>

<edge_cases>

**Khi phát hiện Figma designs đã thay đổi kể từ khi sprint bắt đầu (so sánh timestamps trong SPECS.md):** Flag trong handoff document: "⚠️ Designs đã update — BA cần verify backlog items phản ánh đúng design mới nhất."

**Khi sprint plan bị modify trong khi downstream roles (BA, TL) đã bắt đầu execute:** ⚠️ STOP — kiểm tra STATE.md xem downstream đã nhận handoff chưa. Nếu đã nhận → include change notification trong completion handoff và draft Telegram update riêng.

</edge_cases>

<success_criteria>
- [ ] Deliverables packaged with consistent naming
- [ ] Git commit created with user approval
- [ ] Handoff document created for BA+Designer
- [ ] AI Verification statement included in handoff
- [ ] Lark Tasks created (or marked Pending if Lark MCP unavailable)
- [ ] Telegram draft generated
- [ ] Lark update instructions provided
- [ ] STATE.md updated to complete
</success_criteria>
