---
name: makeit:help
description: Show all available BA commands organized by category
---

<objective>
Display all available BA commands with descriptions, organized by category. Quick reference for what commands exist and when to use them. No sprint context needed.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-support/help.md
@.agent/skills/makeit-ba/SKILL.md
</execution_context>

<process>
  <step name="display_commands">
    Show commands organized by category:

    **Stage Commands (Sprint Lifecycle):**
    | Command | Description |
    |---------|-------------|
    | `/makeit:clarify` | Start new sprint — read Lark issue, verify Gate 1, create workspace |
    | `/makeit:discuss-phase` | Gather context via adaptive questioning before planning |
    | `/makeit:show-phase-approach` | View Agent's approach and assumptions before planning |
    | `/makeit:research-phase` | Deep research unknowns via sub-agent (optional) |
    | `/makeit:plan-phase` | Create PLAN.md with tasks for current phase |
    | `/makeit:execute-phase` | Execute plan tasks with BA domain workflows |
    | `/makeit:verify-phase` | Goal-backward check on phase output + Gate 2 |
    | `/makeit:verify-work` | Validate ALL sprint deliverables against SPECS |
    | `/makeit:complete` | Package deliverables, git sync, Techlead handoff |

    **Sprint Management:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:add-phase` | Add phase to end of roadmap |
    | `/makeit:insert-phase` | Insert urgent phase (decimal numbering) |
    | `/makeit:remove-phase` | Remove future phase + renumber |

    **Support:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:status` | Sprint progress + suggested next action |
    | `/makeit:decide` | Document a decision with rationale |
    | `/makeit:estimate` | Story complexity assessment (t-shirt sizing) |
    | `/makeit:lesson-learned` | Capture lesson learned |
    | `/makeit:help` | This command |

    **Context Management:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:debug` | Systematic debugging with hypothesis tracking |
    | `/makeit:pause-work` | Save context for later resume |
    | `/makeit:resume-work` | Restore context from saved state |
    | `/makeit:check-handoff` | Check for incoming handoff from upstream role |
  </step>
</process>

<success_criteria>
- [ ] All 20 commands displayed with descriptions
- [ ] Commands organized by category
</success_criteria>
