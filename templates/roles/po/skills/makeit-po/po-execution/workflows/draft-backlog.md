---
name: po-workflow-draft-backlog
description: PO internal workflow — transform raw ideas into structured backlog items with goal, context, and acceptance criteria
---

<purpose>
Transform raw idea/feature request into a structured backlog item ready for BA handoff.
</purpose>

<rules>
1. Goal must answer WHY — not WHAT or HOW
2. Context must be sufficient for BA to understand and breakdown
3. Priority requires rationale — not just "important"
4. Gate 1 sender-side check before handoff
5. AI drafts, PO evaluates — never auto-approve
</rules>

<output>
Backlog item file → `deliverables/TASK-NNN-{feature}.md`
Template: `@po-execution/templates/backlog-item.md`
</output>

<process>
  <step name="gather_context">
    Extract or ask user for:
    1. **Goal:** Business objective — WHY build this feature?
    2. **User need:** Who uses it? When? Current pain point?
    3. **Background:** Why needed now, current state
    4. **Constraints:** Technical, timeline, dependencies
    5. **Priority:** P1/P2/P3 + rationale
    6. **Sprint:** Target sprint

    If input is vague (1-2 sentences) → probe with targeted questions:
    - "Which user benefits most from this feature?"
    - "If we don't build this, what's the impact?"
    - "Scope — what's IN, what's OUT?"
    - "Dependencies with other features/systems?"
  </step>

  <step name="draft_item">
    1. Use template `@po-execution/templates/backlog-item.md`
    2. Fill all sections from gathered context:
       - **Goal** — WHY (business objective, 1-2 clear sentences)
       - **Context** — Background, user needs, current state, expected outcome
       - **Constraints** — Technical, timeline, dependencies, out of scope
       - **Edge Cases** — Known edge cases (PO awareness)
       - **Priority & Sprint** — P1/P2/P3 + rationale + sprint number
       - **Design Coordination** — Design status, Figma link if available
    3. Create task file with frontmatter: task-id, title, role: po, status: pending, stage: 1
  </step>

  <step name="validate_gate_1">
    PO sender-side verification — check before handoff:
    - [ ] Goal rõ ràng — BA/Dev can understand WHY
    - [ ] Context đầy đủ — no critical info missing
    - [ ] Priority defined — sprint and priority level set with rationale

    FAIL → highlight missing item, ask PO to provide.
  </step>

  <step name="present_output">
    Show summary:
    - 📋 Task ID + title
    - 🎯 Goal (1 sentence)
    - ⚡ Priority + Sprint
    - ✅/❌ Gate 1 pre-check result

    Suggest next:
    - Gate 1 pass → continue or `/makeit:check-gate` for formal check
    - Needs refinement → refine-goal workflow
    - Needs design coordination → flag for Designer
  </step>
</process>

<edge_cases>

**Khi AI tạo backlog item có goal quá vague (< 10 từ) hoặc thiếu AC (< 3 items):** Tự động flag output trước khi trình PO — highlight mục thiếu, đề xuất bổ sung cụ thể. Không submit output chất lượng thấp.

**Khi Figma designs thay đổi sau khi backlog item đã tạo:** So sánh design status lúc tạo item vs hiện tại. Nếu khác biệt → flag cho PO: "⚠️ Design đã cập nhật sau khi tạo item — cần review lại context và AC."

**Khi BA trả lại item nói "Goal vague" hoặc "Context missing":** Parse feedback từ BA → route tới refine-goal workflow cho mục cụ thể. Track số lần clarification (max 3 rounds trước khi escalate).

**Khi AI tạo nhiều backlog items nhưng output lặp lại, generic, thiếu ngữ cảnh sản phẩm:** ⚠️ STOP — phát hiện cookie-cutter pattern. Yêu cầu PO cung cấp thêm product-specific context trước khi tiếp tục. Log vào STATE.md.

**Khi task quá phức tạp — AI không thể articulate cross-system dependencies hoặc thiếu domain knowledge:** ⚠️ STOP — "Task vượt khả năng AI, cần PO tự draft với AI hỗ trợ." Chuyển sang chế độ assistant (PO viết, AI suggest). Log vào STATE.md.

**Khi tạo nhiều backlog items trong cùng sprint mà phát hiện conflicting resource needs hoặc timing dependencies giữa FE/BE:** Flag dependency conflict cho PO trước khi handoff. Đề xuất thứ tự ưu tiên hoặc tách sprint.

**Khi backlog item có scope vượt capacity 1 sprint (XL trên tất cả dimensions):** Tự động suggest split goal — reference `manage-sprint-goal` workflow. Không proceed với item quá lớn mà không có PO confirmation.

</edge_cases>

## Anti-patterns

- ❌ **Goal quá vague:** "Làm cho tốt hơn" → Need specific business objective
- ❌ **Skip Gate 1 check:** Handoff without verification → BA will return
- ❌ **Viết specs chi tiết:** PO writes goal + context, not user stories (BA's job)
- ❌ **Technical decisions:** PO doesn't decide technical approach — delegate to Techlead
- ❌ **Missing priority rationale:** Set P1 without explaining why → team not aligned
