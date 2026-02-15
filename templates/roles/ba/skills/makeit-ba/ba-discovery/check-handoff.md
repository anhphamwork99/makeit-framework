---
name: ba-check-handoff
description: Check for incoming handoff from PO — read HANDOFF.md with task preview and Lark Task IDs
---

<purpose>
Standalone command that BA runs after receiving a Telegram notification from PO. Auto-detects PO as sender, prompts git pull, reads HANDOFF.md, shows summary with task table and Lark Task IDs, and recommends next action. This is the bridge between receiving a notification and selecting tasks via start-my-tasks.
</purpose>

<process>
  <step name="identify_sender">
    BA receives from: **PO**
    Path: `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md`
    Sprint number: Check latest sprint folder in `.makeit/sprint/` or ask user for sprint number.
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
    cat .makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md
    ```
    
    If file NOT found:
    ```
    ❌ No handoff found from PO.
    Verify PO has completed `/makeit:complete` and committed HANDOFF.md to the product repo.
    ```
  </step>

  <step name="display_summary">
    Show key info from HANDOFF.md with task table preview:
    ```
    📋 Handoff Summary
    
    📤 From: PO
    📥 To: BA
    🔢 Sprint: SPRINT-{NNN}
    📅 Date: {date from handoff}
    
    🎯 What PO Has Done:
    {checklist from "What I've Done" section}
    
    📋 Tasks For You:
    | # | Task | Lark ID | Assignee |
    |---|------|---------|----------|
    | 1 | {task description} | {LARK-XXXX or ⚠️ Pending} | {name or —} |
    | 2 | {task description} | {LARK-XXXX or ⚠️ Pending} | {name or —} |
    
    📎 Shared Context:
    {key decisions and links from handoff}
    ```
  </step>

  <step name="recommend_next">
    ```
    ✅ HANDOFF.md pulled and reviewed.
    
    💡 Next step: Run `/makeit:start-my-tasks` to select your assigned tasks and create a focused workspace.
    ```
  </step>
</process>

<edge_cases>

**Khi HANDOFF.md chưa có Lark Task IDs:** Nếu thấy "⚠️ Pending" trong cột Lark ID, nghĩa là Lark MCP không available lúc PO tạo handoff. BA vẫn tiến hành chọn tasks bình thường — chỉ thiếu Lark tracking reference.

**Khi không có tasks nào assigned cho BA:** Task table có thể có Assignee = "—" cho tất cả tasks. start-my-tasks sẽ show full list để BA chọn.

**Khi sprint number không rõ:** Hỏi user. Hoặc scan `.makeit/sprint/` để tìm folder mới nhất có HANDOFF.md.

</edge_cases>

<success_criteria>
- [ ] PO identified as sender (no user input needed)
- [ ] User prompted to git pull before reading
- [ ] HANDOFF.md read and summary displayed with Lark Task IDs
- [ ] Task table with Lark ID and Assignee columns shown
- [ ] Next action recommended (`/makeit:start-my-tasks`)
</success_criteria>
