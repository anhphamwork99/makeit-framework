---
name: be-check-handoff
description: Check for incoming handoff from Techlead — read BE tasks with Lark Task IDs from HANDOFF.md
---

<purpose>
Standalone command that Dev BE runs after receiving a Telegram notification from Techlead. Auto-detects TL as sender, prompts git pull, reads HANDOFF.md, filters to show only BE-relevant tasks with Lark Task IDs, and recommends next action. This is the bridge between receiving a notification and selecting tasks via start-my-tasks.
</purpose>

<process>
  <step name="identify_sender">
    BE receives from: **Techlead**
    Path: `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
    Sprint number: Check latest sprint folder in `.makeit/sprint/` or ask user for sprint number.
    
    **Important:** TL's HANDOFF.md contains sections for both FE and BE. Focus on `### For BE` section within "Tasks For Receiver".
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

  <step name="read_handoff">
    Read the handoff file:
    ```bash
    cat .makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md
    ```
    
    If file NOT found:
    ```
    ❌ No handoff found from Techlead.
    Verify Techlead has completed `/makeit:complete` and committed HANDOFF.md to the product repo.
    ```
    
    **Section filtering:** Extract and display only the `### For BE` section from TL's HANDOFF.md. Ignore the `### For FE` section — that's for the FE developer.
  </step>

  <step name="display_summary">
    Show key info from the BE section with task table preview:
    ```
    📋 Handoff Summary (BE portion)
    
    📤 From: Techlead
    📥 To: Dev BE
    🔢 Sprint: SPRINT-{NNN}
    📅 Date: {date from handoff}
    
    🎯 What TL Has Done:
    {checklist from "What I've Done" section}
    
    📋 BE Tasks From Techlead:
    | # | Task | Lark ID | Assignee |
    |---|------|---------|----------|
    | 1 | {API endpoint task} | {LARK-XXXX or ⚠️ Pending} | {name or —} |
    | 2 | {schema migration task} | {LARK-XXXX or ⚠️ Pending} | {name or —} |
    
    📊 Total: {N} BE tasks
    
    📎 Shared Context:
    {key decisions, API docs, dependencies from handoff}
    ```
    
    > ℹ️ Showing only the `### For BE` section. FE tasks are assigned separately.
  </step>

  <step name="recommend_next">
    ```
    ✅ HANDOFF.md pulled and reviewed.
    
    💡 Next step: Run `/makeit:start-my-tasks` to select your assigned tasks and create a focused workspace.
    ```
  </step>
</process>

<edge_cases>

**Khi "For BE" section không tồn tại:** Có thể sprint này chỉ có FE tasks. Hiển thị thông báo rõ ràng: "No BE tasks found in this handoff. Check with Techlead if this is expected."

**Khi HANDOFF.md chưa có Lark Task IDs:** Nếu thấy "⚠️ Pending" trong cột Lark ID, nghĩa là Lark MCP không available lúc TL tạo handoff. Dev BE vẫn tiến hành chọn tasks bình thường — Lark IDs chỉ là reference, không block workflow.

**Khi không có tasks nào assigned cho dev:** Task table có thể có Assignee = "—" cho tất cả tasks. start-my-tasks sẽ show full BE list để dev chọn.

**Khi sprint number không rõ:** Hỏi user. Hoặc scan `.makeit/sprint/` để tìm folder mới nhất có HANDOFF.md.

</edge_cases>

<success_criteria>
- [ ] Techlead identified as sender (no user input needed)
- [ ] User prompted to git pull before reading
- [ ] Only `### For BE` section displayed (not FE tasks)
- [ ] Task table with Lark ID and Assignee columns shown
- [ ] Total BE task count displayed
- [ ] Next action recommended (`/makeit:start-my-tasks`)
</success_criteria>
