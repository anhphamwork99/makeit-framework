---
name: be-progress
description: BE sprint progress — display current phase, deliverable status, and next actions
---

<purpose>
Display comprehensive BE sprint progress showing lifecycle stage, deliverable completion status, gate results, and immediate next actions.
</purpose>

<process>
  <step name="find_sprint">
    1. Search `.makeit/sprint/` for non-complete STATE.md files
    2. If none found → "No active sprint. Use `/makeit:clarify` to start."
    3. If multiple → list all with status, ask which to display
  </step>

  <step name="read_context">
    1. **STATE.md** → sprint status, current phase, progress table
    2. **ROADMAP.md** → total phases, phase names
    3. **SPECS.md** → deliverable completion status
  </step>

  <step name="determine_progress">
    For each phase, determine status:
    - `complete` — all tasks done, verified
    - `executing` — tasks in progress
    - `planning` — PLAN.md being created
    - `pending` — not yet started
    - `needs-revision` — failed verification

    For each deliverable in SPECS.md:
    - Check if output file exists
    - Check if file has substantive content
  </step>

  <step name="display_progress">
    ```
    📊 Sprint Status: SPRINT-{NNN}

    🎯 Goal: {sprint goal}
    📍 Current: Phase {N} of {total} — {phase name}
    🔄 Status: {pending|planning|executing|verifying|complete}

    Phase Progress:
    ├── Phase 1: {name} ✅ complete
    ├── Phase 2: {name} 🔄 executing
    │   └── Task 1/3 done
    └── Phase 3: {name} ⏳ pending

    Deliverables:
    ├── API contracts: {N}/{total} designed
    ├── Schema designs: {N}/{total} created
    ├── Code implementation: {layers done/total}
    ├── Tests: {passing/total}
    └── API documentation: {status}

    Gate Status:
    ├── Gate 3 (input): ✅ passed
    └── Gate 4 (output): ⏳ pending

    💡 Suggested: {next command based on current state}
    ```
  </step>

  <step name="suggest_next">
    | Current State | Suggested Command |
    |--------------|-------------------|
    | No sprint | `/makeit:clarify` |
    | Phase pending | `/makeit:plan-phase` |
    | Phase planning | `/makeit:plan-phase` (continue) |
    | Phase executing | `/makeit:execute-phase` |
    | Phase verifying | `/makeit:verify-phase` |
    | All phases done | `/makeit:verify-work` |
    | Verify-work passed | `/makeit:complete` |
    | Sprint complete | "Sprint done! Start new with `/makeit:clarify`" |
  </step>
</process>

<success_criteria>
- [ ] Active sprint found
- [ ] Phase progress displayed
- [ ] Deliverable status shown
- [ ] Next command suggested
</success_criteria>
