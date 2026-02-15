---
name: po-check-handoff
description: Check for incoming handoff from TL (Code Review) — read HANDOFF.md with task preview
---

<purpose>
Standalone command that PO runs after receiving a Telegram notification from Techlead (Code Review). PO in review mode reads the TL's review handoff containing staging URL and acceptance criteria. Auto-detects TL as sender, prompts git pull, reads HANDOFF.md, shows summary with Lark Task IDs, and recommends next action. This is the bridge between receiving a notification and starting a review sprint.
</purpose>

<process>
  <step name="identify_sender">
    PO (review mode) receives from: **Techlead (Code Review — Mode 2)**
    Path: `.makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md`
    Sprint number: Check latest sprint folder in `.makeit/sprint/` or ask user for sprint number.

    **Note:** Pipeline changed — PO no longer receives directly from Dev FE/BE. Techlead reviews code first, then hands off deployed results to PO.
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
    cat .makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md
    ```
    
    If file NOT found:
    ```
    ❌ No handoff found from Techlead (Code Review).
    Verify Techlead has completed code review via `/makeit:complete` and committed HANDOFF.md to the product repo.
    
    Expected path: .makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md
    ```
  </step>

  <step name="display_summary">
    Show handoff summary with task table preview:
    ```
    📋 Handoff Summary — Review Mode
    
    📤 From: Techlead (Code Review)
    📥 To: PO
    🔢 Sprint: SPRINT-{NNN}
    📅 Date: {date from handoff}
    
    🎯 What TL Has Done:
    {checklist from "What I've Done" section}

    📋 Tasks For You:
    | # | Task | Lark ID | Status |
    |---|------|---------|--------|
    | 1 | {task description} | {LARK-XXXX or ⚠️ Pending} | — |
    | 2 | {task description} | {LARK-XXXX or ⚠️ Pending} | — |
    
    🔗 Staging URL: {url from handoff}
    
    📎 Shared Context:
    {key decisions and links from handoff}
    ```
  </step>

  <step name="recommend_next">
    ```
    ✅ HANDOFF.md pulled and reviewed.
    
    💡 Next step: Run `/makeit:start-sprint` to begin reviewing deployed results.
    ```
  </step>
</process>

<edge_cases>

**Khi HANDOFF.md chưa có Lark Task IDs:** Nếu thấy "⚠️ Pending" trong cột Lark ID, nghĩa là Lark MCP không available lúc TL tạo handoff. PO vẫn tiến hành review bình thường — Lark IDs chỉ là reference, không block workflow.

**Khi staging URL chưa sẵn sàng:** Hiển thị warning và hỏi PO muốn chờ hay proceed without staging. TL có thể update handoff sau khi deploy.

**Khi TL handoff path cũ (fe/ hoặc be/):** Nếu tìm thấy handoff ở path cũ `fe/HANDOFF.md` hoặc `be/HANDOFF.md` thay vì `tl-review/HANDOFF.md`, suggest user kiểm tra lại pipeline — có thể chưa update.

</edge_cases>

<success_criteria>
- [ ] TL identified as sender from tl-review/ path (not fe/ or be/)
- [ ] User prompted to git pull before reading
- [ ] HANDOFF.md read and summary displayed with Lark Task IDs
- [ ] Staging URL shown prominently
- [ ] Next action recommended (`/makeit:start-sprint`)
</success_criteria>
