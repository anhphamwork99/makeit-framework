---
name: be-stage-complete
description: BE sprint completion — package deliverables, git sync, prepare Techlead handoff (code review), draft Telegram notification
---

<purpose>
Package BE sprint deliverables, sync to git, update Lark (user-guided), and create structured handoff document for Techlead (code review).
</purpose>

<required_reading>
@be-verification/stage-verify-work.md
@be-lifecycle/templates/pr-description.md
@be-lifecycle/templates/handoff.md
@be-lifecycle/workflows/create-pr.md
@be-lifecycle/workflows/fix-feedback.md
</required_reading>

<rules>
1. Git before handoff — always commit deliverables before creating handoff
2. User approval for commit — present diff before committing
3. Telegram = notification — draft only, user sends
4. Lark = user-guided — provide instructions, don't auto-update
5. PR description complete — include API changes, DB migrations, test results
6. ⚠️ STOP before force push — never auto-force-push
7. Lark Tasks at completion — create all tasks simultaneously via Lark MCP, IDs go into HANDOFF
</rules>

<output>
- Git commit with all deliverables
- PR description (using `@be-lifecycle/templates/pr-description.md`)
- Handoff document → `.makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md` in product repo (template: `@be-lifecycle/templates/handoff.md`)
- Lark Tasks created for Techlead (or marked Pending if Lark MCP unavailable)
- Telegram notification draft
- Updated STATE.md (status = complete)
</output>

<process>
  <step name="package_deliverables">
    Collect all deliverables:
    - API contract files
    - Schema design files
    - Code changes (verified by git diff)
    - Test results

    Ensure all code committed with conventional format.
    Check no process-only files are included.
  </step>

  <step name="git_sync">
    Stage deliverable files for commit.
    Use conventional commit format:
    ```
    feat: [Sprint-NNN] {feature} API + DB implementation
    ```
    Present commit for user approval before executing.

    > ⚠️ STOP: Never use `git push --force` or `git reset --hard`
  </step>

  <step name="create_pr">
    Generate PR description using `@be-lifecycle/workflows/create-pr.md`:

    Include:
    - PR title (conventional format)
    - Summary (2-3 sentences)
    - API Endpoints Changed table
    - Database Changes table (with reversibility status)
    - Testing Done summary
    - BE-specific checklist (API docs, validation, security, migrations)
    - AI Review Checklist
  </step>

  <step name="notify_fe_integration">
    If this sprint includes API endpoints that FE depends on:

    1. List endpoints ready for integration
    2. Draft FE integration notification:
       ```
       🟢 API Ready for Integration: [Feature Name]

       Endpoints:
       - [METHOD] /api/v1/[endpoint] — [description]

       Contract doc: [link]
       Base URL: [dev/staging URL]
       Auth: [Bearer token / API key / none]

       @[FE dev] — ready to switch from mocks
       ```
    3. Note in STATE.md: "FE integration pending for: [endpoints]"

    > Sync Point 2: Notify FE when API endpoints are ready — FE can switch from mock data to real API.
  </step>

  <step name="create_handoff">
    Generate structured handoff document using `@be-lifecycle/templates/handoff.md`.
    Include: summary, API endpoints implemented, DB migrations, test results,
    PR link, security considerations, known limitations.
    Include Lark Sprint Issue link as reference.
  </step>

  <step name="commit_handoff_to_git">
    Commit HANDOFF.md to product repo via Git:

    1. Create role subfolder in shared sprint folder:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/be/
       ```
    2. Write filled HANDOFF.md to `.makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md`
    3. Git commit + push:
       ```bash
       cd {product_repo}
       git add .makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md
       git commit -m "handoff(be): Sprint {NNN} — BE implementation for {feature}"
       git push
       ```
    4. Present commit for user approval before executing.

    > Lark link is included IN the HANDOFF.md as reference — no need to paste content to Lark.
  </step>

  <step name="create_lark_tasks">
    Reference: @_shared/skills/lark-task-helper/lark-task-reference.md

    1. Extract tasks from filled HANDOFF.md "Tasks For Receiver" table
    2. For each task, create Lark Task via Lark MCP:
       - Title: task description from table (e.g., "Review PR #{N}", "Verify API security", "Check test coverage")
       - Assignee: Techlead display name (if known) or empty
       - Description: "Sprint SPRINT-{NNN} task from Dev BE. See HANDOFF: .makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md"
    3. Write Lark Task IDs back to HANDOFF task table
    4. If Lark MCP fails: follow fallback pattern (mark Pending, log todo)
  </step>

  <step name="draft_telegram">
    Generate ready-to-send Telegram message:
    ```
    ⚙️ BE Sprint Complete: {Feature Name}
    Sprint: SPRINT-{NNN}
    ✅ Handoff committed: .makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md
    Sprint Issue: [Lark link]
    PR: [link]
    API Changes: {endpoint summary}
    DB Migrations: {migration summary}
    @techlead Ready for code review. Run `/makeit:check-handoff` to review.
    ```
  </step>

  <step name="guide_lark_update">
    Provide user with Lark update instructions.
    Do NOT auto-update Lark — user handles this manually.
  </step>

  <step name="knowledge_extraction">
    **Optional** — Review sprint deliverables and suggest knowledge docs that would benefit the team.

    1. **Scan deliverables:** Look at what this sprint produced:
       - API patterns established (→ API pattern doc candidates)
       - Schema decisions made (→ schema/ADR doc candidates)
       - Backend integration lessons (→ lesson doc candidates)
       - Performance optimizations discovered (→ pattern doc candidates)

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
    Log completion timestamp, git commit hash, PR link.
  </step>

  <step name="present_completion">
    Display completion summary with deliverables committed, PR description,
    Telegram draft, Lark instructions.
    Sprint lifecycle: ✅ clarify → ✅ plan → ✅ execute → ✅ verify → ✅ complete
  </step>
</process>

## Fix Feedback Flow

When PR review feedback arrives, use `@be-lifecycle/workflows/fix-feedback.md`:
1. Load review comments → categorize by priority
2. Fix critical items first → commit each fix separately
3. Re-verify → run self-review checklist
4. Update PR → reply to reviewer comments

<edge_cases>

**Khi phát hiện FE integration mismatch lúc handoff (FE đã implement với mock data khác API thực tế):** Kiểm tra contract-code alignment trước khi notify FE (Sync Point 2). Nếu API response khác contract đã share → fix API hoặc update contract VÀ thông báo FE cụ thể field nào thay đổi. Không gửi Sync Point 2 notification khi biết có mismatch.

</edge_cases>

<success_criteria>
- [ ] Deliverables packaged and committed
- [ ] PR description created with BE-specific sections
- [ ] Handoff document created for Techlead
- [ ] Lark Tasks created (or marked Pending if Lark MCP unavailable)
- [ ] Telegram draft generated
- [ ] Lark update instructions provided
- [ ] STATE.md updated to complete
</success_criteria>
