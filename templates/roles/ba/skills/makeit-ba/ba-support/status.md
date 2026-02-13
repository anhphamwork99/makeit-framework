---
name: ba-status
description: BA sprint status — show current state, phase progress, and suggested next command
---

<purpose>
Show current BA sprint state, phase progress, deliverable status, and suggest the next command. Lightweight command for quick orientation.
</purpose>

<process>
  <step name="read_state">
    Read `STATE.md` → sprint status, current phase, progress table.
    Read `ROADMAP.md` → total phases, phase names.
    Read `SPECS.md` → deliverable completion status.
  </step>

  <step name="display_status">
    ```
    📊 Sprint Status: SPRINT-{NNN}

    🎯 Goal: {sprint goal}
    📍 Current: Phase {N} of {total} — {phase name}
    🔄 Status: {pending|planning|executing|verifying|complete}

    Phase Progress:
    ├── Phase 1: {name} ✅ complete
    ├── Phase 2: {name} 🔄 executing
    └── Phase 3: {name} ⏳ pending

    Deliverables:
    ├── User stories: {N}/{total}
    ├── User flows: {N}/{total}
    └── Edge cases: {status}

    💡 Suggested: {next command based on current state}
    ```
  </step>

  <step name="suggest_next">
    | Status | Suggested |
    |--------|-----------|
    | No sprint | `/makeit:clarify` |
    | Phase pending | `/makeit:plan-phase` |
    | Phase executing | `/makeit:execute-phase` |
    | Phase verifying | `/makeit:verify-phase` |
    | All phases done | `/makeit:verify-work` |
  </step>
</process>

<success_criteria>
- [ ] Sprint state displayed
- [ ] Phase progress shown
- [ ] Next command suggested
</success_criteria>
