---
name: makeit:help
description: Show all available Techlead commands organized by category
---

<objective>
Display all available Techlead commands with descriptions, organized by category. Quick reference for what commands exist and when to use them. No sprint context needed.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-support/help.md
@.agent/skills/makeit-techlead/SKILL.md
</execution_context>

<process>
  <step name="display_commands">
    Show commands organized by category:

    **Stage Commands (Sprint Lifecycle):**
    | Command | Description |
    |---------|-------------|
    | `/makeit:clarify` | Start new sprint — read Lark issue, verify Gate 2 |
    | `/makeit:discuss-phase` | Gather context via questioning |
    | `/makeit:show-phase-approach` | View Agent's approach before planning |
    | `/makeit:research-phase` | Deep research unknowns |
    | `/makeit:plan-phase` | Create PLAN.md |
    | `/makeit:execute-phase` | Execute plan tasks |
    | `/makeit:verify-phase` | Goal-backward check + Gate 3 |
    | `/makeit:verify-work` | Validate ALL deliverables |
    | `/makeit:complete` | Package + handoff to Dev FE/BE |

    **Sprint Management:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:add-phase` | Add phase to end |
    | `/makeit:insert-phase` | Insert urgent phase |
    | `/makeit:remove-phase` | Remove future phase |

    **Support:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:status` | Sprint progress |
    | `/makeit:decide` | Document decision |
    | `/makeit:estimate` | Task complexity assessment |
    | `/makeit:lesson-learned` | Capture lesson |
    | `/makeit:help` | This command |

    **Context Management:**
    | Command | Description |
    |---------|-------------|
    | `/makeit:debug` | Systematic debugging |
    | `/makeit:pause-work` | Save context |
    | `/makeit:resume-work` | Restore context |
    | `/makeit:check-handoff` | Check for incoming handoff from upstream role |
  </step>
</process>

<success_criteria>
- [ ] All 20 commands displayed
- [ ] Organized by category
</success_criteria>
