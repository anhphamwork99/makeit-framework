---
name: ba-stage-complete
description: BA sprint completion — package deliverables, git sync, prepare Techlead handoff, draft Telegram message
---

<purpose>
Package BA sprint deliverables, sync to git, update Lark (user-guided), and create structured handoff document for Techlead.
</purpose>

<required_reading>
@ba-verification/stage-verify-work.md
@ba-lifecycle/templates/handoff.md
</required_reading>

<rules>
1. Git before handoff — always commit deliverables before creating handoff
2. User approval for commit — present diff before committing
3. Telegram = notification — draft only, user sends
4. Lark = user-guided — provide instructions, don't auto-update
5. Handoff is actionable — Techlead should be able to start immediately
</rules>

<output>
- Git commit with all deliverables
- Handoff document → `.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md` in product repo (template: `@ba-lifecycle/templates/handoff.md`)
- Telegram notification draft
- Updated STATE.md (status = complete)
</output>

<process>
  <step name="package_deliverables">
    Collect all deliverables from `deliverables/` folder.
    Ensure file naming convention is consistent:
    - `US-NNN-{feature-name}.md` for user stories
    - `FLOW-{feature-name}.md` for user flows
    - `ANALYSIS-{feature-name}.md` for Figma analysis
    Check no process-only files are included (PLAN.md, STATE.md stay in sprint workspace).
  </step>

  <step name="git_sync">
    Stage deliverable files for commit.
    Use conventional commit format:
    ```
    docs(ba): [Sprint-NNN] user stories + flows for {feature}
    ```
    Present commit for user approval before executing.
  </step>

  <step name="create_handoff">
    Generate structured handoff document for Techlead using `@ba-lifecycle/templates/handoff.md`.
    Include: summary, deliverables table, stories overview, key decisions,
    edge cases flagged, questions for Techlead, design references, Gate 2 status.
    Include Lark Sprint Issue link as reference.
  </step>

  <step name="commit_handoff_to_git">
    Commit HANDOFF.md to product repo via Git:

    1. Create role subfolder in shared sprint folder:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/ba/
       ```
    2. Write filled HANDOFF.md to `.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md`
    3. Git commit + push:
       ```bash
       cd {product_repo}
       git add .makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md
       git commit -m "handoff(ba): Sprint {NNN} — stories + flows for {feature}"
       git push
       ```
    4. Present commit for user approval before executing.

    > Lark link is included IN the HANDOFF.md as reference — no need to paste content to Lark.
  </step>

  <step name="draft_telegram">
    Generate ready-to-send Telegram message:
    ```
    📋 BA Sprint Complete: {Feature Name}
    Sprint: SPRINT-{NNN}
    ✅ Handoff committed: .makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md
    Sprint Issue: [Lark link]
    Deliverables: {summary}
    @techlead Ready for task breakdown. Run `/makeit:check-handoff` to review.
    ```
  </step>

  <step name="guide_lark_update">
    Provide user with Lark update instructions.
    Do NOT auto-update Lark — user handles this manually.
  </step>

  <step name="knowledge_extraction">
    **Optional** — Review sprint deliverables and suggest knowledge docs that would benefit the team.

    1. **Scan deliverables:** Look at what this sprint produced:
       - Business rules discovered (→ rule doc candidates)
       - Glossary terms defined (→ glossary update candidates)
       - User journey maps created (→ journey doc candidates)
       - Key decisions with PO (→ feature decision doc candidates)

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
    Sprint lifecycle: ✅ clarify → ✅ plan → ✅ execute → ✅ verify → ✅ complete
  </step>
</process>

<edge_cases>

**Khi Techlead reject handoff hoặc raise issues với stories:** Phân loại feedback: (a) minor — sửa inline và re-submit, (b) major — cần re-plan phase mới. Nếu feedback > 3 rounds → escalate lên sync meeting. Ghi nhận trong STATE.md: "Handoff rejected — reason: {feedback summary}, action: {resolution approach}"

**Khi handoff có stories với dependency overlaps giữa FE↔BE:** Thêm "⚠️ Dependency Warnings" section vào HANDOFF.md. Liệt kê rõ: stories nào share resources, potential conflict points, và suggest Techlead coordinate task assignment để tránh 2 devs cùng modify shared resource. Đây là thông tin critical cho Techlead break tasks.

</edge_cases>

<success_criteria>
- [ ] Deliverables packaged with consistent naming
- [ ] Git commit created with user approval
- [ ] Handoff document created for Techlead
- [ ] Telegram draft generated
- [ ] Lark update instructions provided
- [ ] STATE.md updated to complete
</success_criteria>
