---
name: po-help
description: PO help — display all available PO commands organized by category
---

<purpose>
Display all available PO commands with descriptions, organized by category for quick reference.
</purpose>

<process>
  <step name="display_commands">
    ```
    📚 MakeIt PO Commands

    ━━━ Stage Commands (6-stage lifecycle) ━━━
    /makeit:start-sprint          Read Lark Sprint → detect mode → create workspace + verify Gate 1
    /makeit:plan-phase       Create PLAN.md for current phase
    /makeit:execute-phase    Execute plan tasks with PO domain workflows
    /makeit:verify-phase     Verify phase output — goal-backward + PO quality checks
    /makeit:verify-work      Validate ALL deliverables against SPECS.md
    /makeit:complete         Git sync + BA/Designer handoff + Telegram draft

    ━━━ Support Commands ━━━
    /makeit:status           Show sprint state + suggest next action
    /makeit:help             Show this command list
    /makeit:decide           Record a business decision
    /makeit:estimate         Estimate backlog item complexity
    /makeit:lesson-learned   Capture what went well/wrong for improvement
    /makeit:debug            Systematic debugging for PO workflow issues
    /makeit:health-check     Scan workspace for broken references
    /makeit:what-new         Check and apply framework updates

    ━━━ Lifecycle Extras ━━━
    /makeit:pause-work       Save context when pausing mid-phase
    /makeit:resume-work      Restore context from previous pause
    /makeit:check-handoff    Check for incoming handoff from upstream role
    /makeit:sync-scope       Pull scope changes from upstream sender

    ━━━ Knowledge Base ━━━
    /makeit:create-doc       Create knowledge document
    /makeit:search-kb        Search knowledge base
    /makeit:update-doc       Update knowledge document
    /makeit:archive-doc      Archive knowledge document

    ━━━ Sprint Management ━━━
    /makeit:update-scope     Update task scope after handoff (sender only)

    ━━━ PO Dual-Mode ━━━
    Mode 1 (Backlog Creation): start-sprint → plan → execute → verify → verify-work → complete
    Mode 2 (PR Review):        start-sprint → execute (review-pr) → complete

    ━━━ AI Verification Rule ━━━
    ⚠️ AI drafts, PO reads and evaluates. PO is final authority.
    Never auto-approve AI-generated outputs.
    ```
  </step>
</process>

<success_criteria>
- [ ] All 20 commands displayed with descriptions
- [ ] Commands organized by category
- [ ] Dual-mode guidance included
</success_criteria>
