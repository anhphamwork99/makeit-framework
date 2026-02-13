---
name: be-check-handoff
description: Check for incoming handoff from Techlead — read BE-specific section from HANDOFF.md
---

<purpose>
Standalone command that Dev BE runs after receiving a Telegram notification from Techlead. Auto-detects TL as sender, prompts git pull, reads HANDOFF.md, and displays only the BE-relevant section. This is the bridge between receiving a notification and starting a sprint.
</purpose>

<process>
  <step name="identify_sender">
    BE receives from: **Techlead**
    Path: `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
    Sprint number: Check latest sprint folder in `.makeit/sprint/` or ask user for sprint number.
    
    **Important:** TL's HANDOFF.md contains sections for both FE and BE. Focus on `## For BE` section.
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
    
    **Section filtering:** Extract and display only the `## For BE` section from TL's HANDOFF.md. Ignore the `## For FE` section — that's for the FE developer.
  </step>

  <step name="display_summary">
    Show key info from the BE section:
    ```
    📋 Handoff Summary (BE portion)
    
    📤 From: Techlead
    📥 To: Dev BE
    🔢 Sprint: SPRINT-{NNN}
    📅 Date: {date from handoff}
    
    🎯 Sprint Goal:
    {goal summary}
    
    📁 BE Deliverable Paths:
    {BE-specific task files, API specs, schema designs}
    
    🔗 External Links:
    {Lark issue, API docs, etc.}
    
    ⚠️ Blockers/Notes:
    {any BE-specific blockers or notes}
    ```
    
    > ℹ️ Showing only the `## For BE` section. FE tasks are assigned separately.
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
- [ ] Only `## For BE` section displayed (not FE tasks)
- [ ] HANDOFF.md summary displayed
- [ ] Next action recommended (`/makeit:clarify`)
</success_criteria>
