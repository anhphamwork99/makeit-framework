---
name: fe-help
description: FE command reference — list all available commands with descriptions
---

<purpose>
Display all available FE commands organized by category for quick reference.
</purpose>

<process>
  <step name="display_commands">
    ```
    📖 Dev FE Commands

    ━━━ Stage Commands (Primary) ━━━
    /makeit:clarify          Read Lark Sprint → create workspace + Gate 3
    /makeit:discuss-phase    Gather context via adaptive questioning
    /makeit:show-phase-approach  Surface Agent assumptions for approval
    /makeit:research-phase   Deep research (spawns researcher)
    /makeit:plan-phase       Create PLAN.md for current phase
    /makeit:execute-phase    Execute plan tasks (implement, compare-ui)
    /makeit:verify-phase     Goal-backward + Gate 4 verification
    /makeit:verify-work      Final deliverable validation vs SPECS.md
    /makeit:complete         PR creation + Designer/Techlead handoff

    ━━━ Sprint Management ━━━
    /makeit:add-phase        Add phase to end of ROADMAP
    /makeit:insert-phase     Insert urgent phase (decimal numbering)
    /makeit:remove-phase     Remove future pending phase

    ━━━ Support ━━━
    /makeit:status           Quick sprint status check
    /makeit:help             This help screen
    /makeit:decide           Record implementation decision
    /makeit:estimate         Assess task complexity
    /makeit:lesson-learned   Record lesson for future sessions

    ━━━ Context Management ━━━
    /makeit:pause-work       Save context for later resume
    /makeit:resume-work      Restore context from previous session
    /makeit:progress         Detailed progress with deliverable status

    ━━━ Debugging ━━━
    /makeit:debug            Systematic hypothesis-driven debugging
    /makeit:health-check     Scan workspace for broken references
    /makeit:what-new         Check and apply framework updates
    /makeit:check-handoff    Check for incoming handoff from upstream role

    ⚠️ STOP Mechanism: AI pauses before destructive operations
       (file deletion, force push, shared dependency changes)
    ```
  </step>
</process>
