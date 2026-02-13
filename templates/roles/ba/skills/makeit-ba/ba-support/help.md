---
name: ba-help
description: BA help — display all available BA commands organized by category
---

<purpose>
Display all available BA commands with descriptions, organized by category for quick reference.
</purpose>

<process>
  <step name="display_commands">
    ```
    📚 MakeIt BA Commands

    ━━━ Stage Commands ━━━
    /makeit:clarify          Read Lark Sprint → create workspace + verify Gate 1
    /makeit:discuss-phase    Discuss phase approach with adaptive questions
    /makeit:show-phase-approach  View Agent's assumptions before planning
    /makeit:research-phase   Deep research via sub-agent (optional)
    /makeit:plan-phase       Create PLAN.md for current phase
    /makeit:execute-phase    Execute plan tasks with domain workflows
    /makeit:verify-phase     Verify phase output + Gate 2 check
    /makeit:verify-work      Validate ALL sprint deliverables
    /makeit:complete         Package, git sync, handoff to Techlead

    ━━━ Sprint Management ━━━
    /makeit:add-phase        Add phase to end of roadmap
    /makeit:insert-phase     Insert urgent phase (decimal numbering)
    /makeit:remove-phase     Remove future phase + renumber

    ━━━ Support ━━━
    /makeit:status           Sprint progress + next action
    /makeit:help             This help message
    /makeit:decide           Document a decision with rationale
    /makeit:estimate         Assess story complexity (t-shirt sizing)
    /makeit:lesson-learned   Capture lesson learned

    ━━━ Context Management ━━━
    /makeit:pause-work       Save context for later resume
    /makeit:resume-work      Restore context from saved state
    /makeit:debug            Systematic debugging with state tracking
    /makeit:health-check     Scan workspace for broken references
    /makeit:what-new         Check and apply framework updates
    /makeit:check-handoff    Check for incoming handoff from upstream role
    ```
  </step>
</process>

<success_criteria>
- [ ] All commands displayed with descriptions
- [ ] Commands organized by category
</success_criteria>
