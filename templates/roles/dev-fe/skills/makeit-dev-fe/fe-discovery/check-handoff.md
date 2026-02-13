---
name: fe-check-handoff
description: Check for incoming handoff from Techlead — read FE-specific section from HANDOFF.md
---

<purpose>
Standalone command that Dev FE runs after receiving a Telegram notification from Techlead. Auto-detects TL as sender, prompts git pull, reads HANDOFF.md, and displays only the FE-relevant section. This is the bridge between receiving a notification and starting a sprint.
</purpose>

<process>
  <step name="identify_sender">
    FE receives from: **Techlead**
    Path: `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
    Sprint number: Check latest sprint folder in `.makeit/sprint/` or ask user for sprint number.
    
    **Important:** TL's HANDOFF.md contains sections for both FE and BE. Focus on `## For FE` section.
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
    
    **Section filtering:** Extract and display only the `## For FE` section from TL's HANDOFF.md. Ignore the `## For BE` section — that's for the BE developer.
  </step>

  <step name="display_summary">
    Show key info from the FE section:
    ```
    📋 Handoff Summary (FE portion)
    
    📤 From: Techlead
    📥 To: Dev FE
    🔢 Sprint: SPRINT-{NNN}
    📅 Date: {date from handoff}
    
    🎯 Sprint Goal:
    {goal summary}
    
    📁 FE Deliverable Paths:
    {FE-specific task files, component specs}
    
    🔗 External Links:
    {Figma links for FE screens, Lark issue, etc.}
    
    ⚠️ Blockers/Notes:
    {any FE-specific blockers or notes}
    ```
    
    > ℹ️ Showing only the `## For FE` section. BE tasks are assigned separately.
  </step>

  <step name="recommend_next">
    ```
    ✅ HANDOFF.md pulled and reviewed.
    
    💡 Next step: Run `/makeit:clarify` to start working on this sprint.
    ```
  </step>
</process>

<success_criteria>
- [ ] Techlead identified as sender (no user input needed)
- [ ] User prompted to git pull before reading
- [ ] Only `## For FE` section displayed (not BE tasks)
- [ ] HANDOFF.md summary displayed
- [ ] Next action recommended (`/makeit:clarify`)
</success_criteria>
