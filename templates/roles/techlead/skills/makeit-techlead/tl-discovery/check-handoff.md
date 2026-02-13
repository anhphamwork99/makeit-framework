---
name: tl-check-handoff
description: Check for incoming handoff from BA — read HANDOFF.md from product repo
---

<purpose>
Standalone command that Techlead runs after receiving a Telegram notification from BA. Auto-detects BA as sender, prompts git pull, reads HANDOFF.md, shows summary, and recommends next action. This is the bridge between receiving a notification and starting a sprint.
</purpose>

<process>
  <step name="identify_sender">
    TL receives from: **BA**
    Path: `.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md`
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
    cat .makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md
    ```
    
    If file NOT found:
    ```
    ❌ No handoff found from BA.
    Verify BA has completed `/makeit:complete` and committed HANDOFF.md to the product repo.
    ```
  </step>

  <step name="display_summary">
    Show key info from HANDOFF.md:
    ```
    📋 Handoff Summary
    
    📤 From: BA
    📥 To: Techlead
    🔢 Sprint: SPRINT-{NNN}
    📅 Date: {date from handoff}
    
    🎯 Sprint Goal:
    {goal summary}
    
    📁 Deliverable Paths:
    {list of file paths — user stories, flows, edge cases}
    
    🔗 External Links:
    {Figma, Lark issue, etc.}
    
    ⚠️ Blockers/Notes:
    {any blockers or special notes}
    ```
  </step>

  <step name="recommend_next">
    ```
    ✅ HANDOFF.md pulled and reviewed.
    
    💡 Next step: Run `/makeit:clarify` to start working on this sprint.
    ```
  </step>
</process>

<success_criteria>
- [ ] BA identified as sender (no user input needed)
- [ ] User prompted to git pull before reading
- [ ] HANDOFF.md read and summary displayed
- [ ] Next action recommended (`/makeit:clarify`)
</success_criteria>
