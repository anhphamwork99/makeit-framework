---
name: po-check-handoff
description: Check for incoming handoff from FE + BE — read both HANDOFF.md files for review
---

<purpose>
Standalone command that PO runs after receiving Telegram notifications from FE and/or BE. PO in review mode reads from BOTH FE and BE. Auto-detects senders, prompts git pull, reads both HANDOFF.md files, shows summaries with clear separation, and recommends next action. This is the bridge between receiving notifications and starting a review sprint.
</purpose>

<process>
  <step name="identify_senders">
    PO (review mode) receives from: **Dev FE** and **Dev BE**
    Paths:
    - `.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md`
    - `.makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md`
    Sprint number: Check latest sprint folder in `.makeit/sprint/` or ask user for sprint number.
    
    **Note:** PO may receive handoffs from FE and BE at different times. Show whichever are available.
  </step>

  <step name="git_pull">
    Prompt user to pull latest from product repo:
    ```
    📥 Before reading handoffs, please pull latest changes:
    
    cd {product_repo}
    git pull origin main
    ```
    Wait for user confirmation before proceeding.
  </step>

  <step name="read_handoffs">
    Read both handoff files:
    ```bash
    cat .makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md
    cat .makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md
    ```
    
    Track which files exist:
    - If BOTH found → show both
    - If only ONE found → show available, note the other is pending
    - If NEITHER found → error message
    
    ```
    ❌ No handoff found from FE/BE.
    Verify developers have completed `/makeit:complete` and committed HANDOFF.md to the product repo.
    ```
  </step>

  <step name="display_summary">
    Show both handoffs with clear separation:
    ```
    📋 Handoff Summary — Review Mode
    
    🔢 Sprint: SPRINT-{NNN}
    
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    📤 From: Dev FE
    📅 Date: {date}
    
    🎯 Summary:
    {FE sprint summary}
    
    📁 Deliverable Paths:
    {FE deliverable files — components, pages, etc.}
    
    🔗 External Links:
    {PR link, Figma, etc.}
    
    ⚠️ Blockers/Notes:
    {any FE-specific notes}
    
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    📤 From: Dev BE
    📅 Date: {date}
    
    🎯 Summary:
    {BE sprint summary}
    
    📁 Deliverable Paths:
    {BE deliverable files — APIs, schemas, etc.}
    
    🔗 External Links:
    {PR link, API docs, etc.}
    
    ⚠️ Blockers/Notes:
    {any BE-specific notes}
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ```
    
    If only one handoff available:
    ```
    ⏳ Waiting for {missing role} handoff. Only {available role} has submitted.
    You can proceed with partial review or wait for both.
    ```
  </step>

  <step name="recommend_next">
    ```
    ✅ HANDOFF.md(s) pulled and reviewed.
    
    💡 Next step: Run `/makeit:start-sprint` to begin the review sprint.
    ```
  </step>
</process>

<success_criteria>
- [ ] FE and BE identified as senders (no user input needed)
- [ ] User prompted to git pull before reading
- [ ] Both HANDOFF.md files read (or partial with notification)
- [ ] Summaries displayed with clear FE/BE separation
- [ ] Next action recommended (`/makeit:start-sprint`)
</success_criteria>
