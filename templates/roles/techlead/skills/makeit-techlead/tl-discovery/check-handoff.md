---
name: tl-check-handoff
description: Check for incoming handoff — dual source detection (BA for Mode 1, Dev FE/BE for Mode 2) with Lark Task IDs
---

<purpose>
Standalone command that Techlead runs after receiving a notification. Auto-detects sender and mode:
- **Mode 1 (Task Breakdown):** BA → TL — user stories for task breakdown
- **Mode 2 (Code Review):** Dev FE/BE → TL — PRs for code review

Prompts git pull, reads HANDOFF.md, shows summary with task table and Lark Task IDs, and recommends next action based on detected mode.
</purpose>

<process>
  <step name="identify_sender">
    TL receives from TWO possible sources:

    - **Mode 1 (task breakdown):** BA → `.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md`
    - **Mode 2 (code review):** Dev FE → `.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md`
                                 Dev BE → `.makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md`

    Sprint number: Check latest sprint folder in `.makeit/sprint/` or ask user for sprint number.

    Auto-detect mode:
    1. Check for BA handoff first (Mode 1) — look for `ba/HANDOFF.md`
    2. Check for Dev handoffs (Mode 2) — look for `fe/HANDOFF.md` and/or `be/HANDOFF.md`
    3. If **both** exist: display both, ask TL which mode to proceed with
    4. If **neither**: show error "No handoff found"
  </step>

  <step name="git_pull">
    Prompt user to pull latest from product repo:
    ```
    📥 Before reading handoff, please pull latest changes:
    
    cd {product_repo}
    git pull origin main
    ```
    Wait for user confirmation before proceeding.
  </step>

  <step name="detect_and_read">
    Scan for handoff files:

    ```bash
    # Check Mode 1 (BA)
    ls .makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md

    # Check Mode 2 (Dev FE)
    ls .makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md

    # Check Mode 2 (Dev BE)
    ls .makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md
    ```

    **If only BA handoff found → Mode 1:**
    Read `ba/HANDOFF.md` → proceed to display_summary with Mode 1 context.

    **If only Dev handoff(s) found → Mode 2:**
    Read `fe/HANDOFF.md` and/or `be/HANDOFF.md` → proceed to display_summary with Mode 2 context.

    **If both BA and Dev handoffs found:**
    ```
    ⚠️ Multiple handoffs detected:

    📁 Mode 1 (Task Breakdown):
    - ba/HANDOFF.md — BA sent user stories for breakdown

    📁 Mode 2 (Code Review):
    - fe/HANDOFF.md — Dev FE sent PR for review
    - be/HANDOFF.md — Dev BE sent PR for review

    Which mode do you want to proceed with?
    1. Mode 1 — Task breakdown (from BA)
    2. Mode 2 — Code review (from Dev)
    ```
    Wait for user selection.

    **If no handoff found:**
    ```
    ❌ No handoff found for SPRINT-{NNN}.
    
    Checked:
    - .makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md — not found
    - .makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md — not found
    - .makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md — not found
    
    Verify sender has completed `/makeit:complete` and committed HANDOFF.md to the product repo.
    ```
  </step>

  <step name="display_summary">
    **Mode 1 Summary (from BA):**
    ```
    📋 Handoff Summary — Mode 1: Task Breakdown
    
    📤 From: BA
    📥 To: Techlead
    🔢 Sprint: SPRINT-{NNN}
    📅 Date: {date from handoff}
    
    🎯 What BA Has Done:
    {checklist from "What I've Done" section}
    
    📋 Tasks For You:
    | # | Task | Lark ID | Assignee |
    |---|------|---------|----------|
    | 1 | {task description} | {LARK-XXXX or ⚠️ Pending} | {name or —} |
    | 2 | {task description} | {LARK-XXXX or ⚠️ Pending} | {name or —} |
    
    📎 Shared Context:
    {key decisions and links from handoff}
    ```

    **Mode 2 Summary (from Dev):**
    ```
    📋 Handoff Summary — Mode 2: Code Review
    
    📤 From: {Dev FE / Dev BE / Both}
    📥 To: Techlead
    🔢 Sprint: SPRINT-{NNN}
    📅 Date: {date from handoff}
    
    🔀 PRs to Review:
    | # | Source | PR / Branch | Description |
    |---|--------|-------------|-------------|
    | 1 | Dev FE | #{NNN} | {brief} |
    | 2 | Dev BE | #{NNN} | {brief} |
    
    📝 Dev Self-Review:
    {summary from handoff — what was implemented, decisions, known issues}
    
    📋 Tasks For You:
    | # | Task | Lark ID | Status |
    |---|------|---------|--------|
    | 1 | {review task} | {LARK-XXXX or ⚠️ Pending} | — |
    | 2 | {review task} | {LARK-XXXX or ⚠️ Pending} | — |
    
    ⚠️ Notes:
    {any blockers or special notes}
    ```
  </step>

  <step name="recommend_next">
    **Mode 1:**
    ```
    ✅ HANDOFF.md pulled and reviewed.
    
    💡 Next step: Run `/makeit:start-my-tasks` to select tasks for breakdown.
    ```

    **Mode 2:**
    ```
    ✅ HANDOFF.md pulled and reviewed.
    
    💡 Next step: Start code review with `/makeit:execute-phase` (review-code workflow).
    ```
  </step>
</process>

<edge_cases>

**Khi cả BA và Dev handoffs cùng tồn tại:** Hiển thị cả hai, hỏi TL chọn mode. Không auto-detect — TL quyết định thứ tự xử lý. TL có thể handle Mode 1 trước rồi Mode 2 sau (hoặc ngược lại) trong các sessions khác nhau.

**Khi chỉ có 1 Dev handoff (FE hoặc BE):** Vẫn là Mode 2 — review 1 PR. Có thể Dev còn lại chưa submit, hoặc sprint chỉ có 1 Dev.

**Khi sprint number không rõ:** Hỏi user. Hoặc scan `.makeit/sprint/` để tìm folder mới nhất có HANDOFF.md.

**Khi HANDOFF.md chưa có Lark Task IDs:** Nếu thấy "⚠️ Pending" trong cột Lark ID, nghĩa là Lark MCP không available lúc sender tạo handoff. TL vẫn tiến hành bình thường — Lark IDs chỉ là reference, không block workflow.

</edge_cases>

<success_criteria>
- [ ] Dual source detected correctly (BA for Mode 1, Dev for Mode 2)
- [ ] User prompted to git pull before reading
- [ ] HANDOFF.md read and summary displayed with correct mode label
- [ ] Lark Task IDs shown in task table preview
- [ ] Next action recommended based on detected mode (start-my-tasks or execute-phase)
- [ ] Handles edge case: both modes exist simultaneously
</success_criteria>
