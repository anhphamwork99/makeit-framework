---
name: po-status
description: PO status — show current sprint state, phase progress, and suggest next action
---

<purpose>
Display current PO sprint state — mode, phase progress, deliverables status, and context-aware next action suggestion.
</purpose>

<process>
  <step name="load_state">
    1. Find active sprint: `.makeit/sprint/SPRINT-*` (most recent)
    2. Read STATE.md → sprint info, mode, current phase, phase progress
    3. If no active sprint → report "No active sprint" and suggest `/makeit:start-sprint`
  </step>

  <step name="display_status">
    ```
    📋 PO Sprint Status

    Sprint: SPRINT-{NNN}
    Mode: {Backlog Creation / PR Review}
    Goal: {sprint goal}
    Current Phase: {NN} — {phase name} ({status})

    Phase Progress:
    | Phase | Name | Status |
    |-------|------|--------|
    | 01 | {name} | ✅ complete |
    | 02 | {name} | 🔄 executing |
    | 03 | {name} | ⏳ pending |

    Deliverables: {count} created
    ```
  </step>

  <step name="suggest_next">
    Based on current state:
    - Phase `pending` → `/makeit:plan-phase`
    - Phase `planning` → review plan → `/makeit:execute-phase`
    - Phase `executing` → continue tasks or check progress
    - Phase `verifying` → `/makeit:verify-phase`
    - All phases done → `/makeit:verify-work`
    - Sprint complete → `/makeit:complete`
    - No sprint → `/makeit:start-sprint`
  </step>
</process>

<edge_cases>

**Khi STATE.md hoặc sprint data có thể đã stale (modified bởi session khác hoặc lâu không cập nhật):** Kiểm tra last modified timestamp. Nếu > 24h → warn PO: "⚠️ Sprint data chưa được cập nhật trong 24h — recommend verify trên Lark trước khi tiếp tục."

</edge_cases>

<success_criteria>
- [ ] Current state accurately displayed
- [ ] Phase progress table shown
- [ ] Next action suggested based on state
</success_criteria>
