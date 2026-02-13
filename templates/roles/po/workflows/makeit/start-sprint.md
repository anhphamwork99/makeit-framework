---
name: makeit:start-sprint
description: Read Lark Sprint issue → detect mode (Backlog/PR Review) → create workspace + verify Gate 1
---

<objective>
PO sprint entry point — detect operating mode (Backlog Creation or PR Review), create sprint workspace with SPECS.md + ROADMAP.md + STATE.md, verify Gate 1 sender-side items (5-7). This command CREATES the sprint workspace (unlike other stage commands that load an existing one).
</objective>

<execution_context>
@.agent/skills/makeit-po/po-discovery/stage-start-sprint.md
</execution_context>

<process>
  <step name="gather_context">
    Check for existing sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If active sprint exists → ask: resume existing or start new?
    If no sprint → proceed to sprint creation.
  </step>

  <step name="execute">
    Follow stage skill to:
    1. Receive Lark Sprint issue content
    2. Detect mode: Backlog Creation (Mode 1) or PR Review (Mode 2)
    3. Verify Gate 1 sender-side (items 3-5): goal, context, priority
    4. Create sprint workspace with all required files
    5. Present summary showing mode detected + Gate 1 status
  </step>

  <step name="suggest_next">
    Mode 1 (Backlog Creation) → `/makeit:plan-phase`
    Mode 2 (PR Review) → `/makeit:plan-phase` or direct `/makeit:execute-phase`
    Gate 1 fails → fix items first, then re-run `/makeit:start-sprint`
  </step>
</process>

<success_criteria>
- [ ] Mode detected and confirmed
- [ ] Sprint workspace created (SPECS.md, ROADMAP.md, STATE.md)
- [ ] Gate 1 sender-side verified
- [ ] Next action suggested
</success_criteria>
