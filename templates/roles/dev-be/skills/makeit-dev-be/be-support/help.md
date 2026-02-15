---
name: be-help
description: BE help — display all available BE commands organized by category
---

<purpose>
Display all available BE commands with descriptions, organized by category for quick reference.
</purpose>

<process>
  <step name="display_commands">
    ```
    📚 MakeIt Dev BE Commands

    ━━━ Stage Commands ━━━
    /makeit:start-my-tasks   Select BE tasks from TL handoff → create workspace
    /makeit:discuss-phase    ⭐ OPTIONAL — Gather infrastructure/integration context
    /makeit:research-phase   ⭐ OPTIONAL — Deep research library/architecture patterns
    /makeit:plan-phase       Create PLAN.md for current phase
    /makeit:execute-phase    Execute plan tasks with domain workflows
    /makeit:verify-phase     Verify phase output + Gate 4 check
    /makeit:verify-work      Validate ALL sprint deliverables
    /makeit:complete         Package, create PR, handoff to TL for code review

    ━━━ Sprint Management ━━━
    /makeit:add-phase        Add phase to end of roadmap
    /makeit:insert-phase     Insert urgent phase (decimal numbering)
    /makeit:remove-phase     Remove future phase + renumber

    ━━━ Support ━━━
    /makeit:status           Sprint progress + next action
    /makeit:help             This help message
    /makeit:decide           Document a technical decision
    /makeit:estimate         Assess implementation complexity
    /makeit:lesson-learned   Capture lesson learned

    ━━━ Context Management ━━━
    /makeit:pause-work       Save context for later resume
    /makeit:resume-work      Restore context from saved state
    /makeit:debug            Systematic debugging with state tracking
    /makeit:health-check     Scan workspace for broken references
    /makeit:what-new         Check and apply framework updates
    /makeit:progress         Sprint progress with deliverable status
    /makeit:check-handoff    Check for incoming handoff from upstream role
    /makeit:sync-scope       Pull scope changes from upstream TL

    ━━━ Knowledge Base ━━━
    /makeit:create-doc       Create knowledge document
    /makeit:search-kb        Search knowledge base
    /makeit:update-doc       Update knowledge document
    /makeit:archive-doc      Archive knowledge document

    ⚠️ STOP Mechanism: AI will STOP before DELETE/DROP, force push,
    migration on shared DB, or modifying shared config.
    ```
  </step>
</process>

<success_criteria>
- [ ] All 29 commands displayed with descriptions
- [ ] Commands organized by category
- [ ] STOP mechanism noted
</success_criteria>
