---
name: tl-help
description: TL help — display all available Techlead commands organized by category
---

<purpose>
Display all available Techlead commands with descriptions, organized by category. Quick reference for what commands exist and when to use them. No sprint context needed.
</purpose>

<process>
  <step name="display_commands">
    Show commands organized by category:

    **Stage Commands (Sprint Lifecycle):**
    | Command | Description |
    |---------|-------------|
    | `/makeit:start-my-tasks` | Select tasks from BA handoff (Mode 1) or review Dev handoff (Mode 2) |
    | `/makeit:discuss-phase` | Gather context via adaptive questioning before planning |
    | `/makeit:show-phase-approach` | View Agent's approach and assumptions before planning |
    | `/makeit:research-phase` | Deep research unknowns via sub-agent (optional) |
    | `/makeit:plan-phase` | Create PLAN.md with tasks for current phase |
    | `/makeit:execute-phase` | Execute plan tasks with TL domain workflows |
    | `/makeit:verify-phase` | Goal-backward check on phase output + Gate 3 |
    | `/makeit:verify-work` | Validate ALL sprint deliverables against SPECS |
    | `/makeit:complete` | Package deliverables, git sync, Dev FE/BE handoff (Mode 1) or PO handoff (Mode 2) |

    **Sprint Management:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:add-phase` | Add phase to end of roadmap |
    | `/makeit:insert-phase` | Insert urgent phase (decimal numbering) |
    | `/makeit:remove-phase` | Remove future phase + renumber |
    | `/makeit:update-scope` | Update task scope after handoff (sender only) |

    **Support:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:status` | Sprint progress + suggested next action |
    | `/makeit:decide` | Document a technical decision with rationale |
    | `/makeit:estimate` | Task complexity assessment (TL methodology) |
    | `/makeit:lesson-learned` | Capture lesson learned |
    | `/makeit:help` | This command |

    **Context Management:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:debug` | Systematic debugging with hypothesis tracking |
    | `/makeit:health-check` | Scan workspace for broken references |
    | `/makeit:whats-new` | Check and apply framework updates |
    | `/makeit:pause-work` | Save context for later resume |
    | `/makeit:resume-work` | Restore context from saved state |
    | `/makeit:progress` | Sprint progress with deliverable status |
    | `/makeit:check-handoff` | Check for incoming handoff from upstream role |
    | `/makeit:sync-scope` | Pull scope changes from upstream sender |

    **Knowledge Base:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:create-doc` | Create knowledge document |
    | `/makeit:search-kb` | Search knowledge base |
    | `/makeit:update-doc` | Update knowledge document |
    | `/makeit:archive-doc` | Archive knowledge document |
  </step>
</process>

<success_criteria>
- [ ] All 28 commands displayed with descriptions
- [ ] Commands organized by category
</success_criteria>
