---
name: ba-stage-discuss-phase
description: BA phase discussion — gather implementation context through adaptive questioning about design analysis, acceptance criteria, and story approach
---

<purpose>
Capture implementation decisions for a BA phase before planning begins through adaptive questioning — user is visionary, agent is builder.
</purpose>

<required_reading>
@ba-discovery/stage-clarify.md
@ba-planning/stage-plan-phase.md
@ba-planning/stage-show-phase-approach.md
@ba-planning/templates/CONTEXT-TEMPLATE.md
</required_reading>

<rules>
1. User = visionary, Agent = builder — ask about vision, not tech details
2. No scope creep — phase boundary is fixed; defer out-of-scope ideas
3. 4 questions per area, then check — keep discussions focused
4. BA-specific areas — design interpretation, story granularity, edge case scope
5. Capture Agent discretion — track what the agent can decide
</rules>

<output>
Context document → `.makeit/sprint/SPRINT-NNN/phases/{NN}/CONTEXT.md`

Use template: @ba-planning/templates/CONTEXT-TEMPLATE.md
Sections: Phase Boundary, Implementation Decisions, Agent's Discretion, Specific Ideas, Deferred Ideas.
</output>

<process>
  <step name="validate_phase">
    Read active sprint's ROADMAP.md.
    Extract current phase (or accept phase number argument).
    Validate phase exists and is in `pending` or `planning` status.
  </step>

  <step name="check_existing_context">
    Check if CONTEXT.md already exists in the phase directory.
    If exists: Offer "Update it" / "View it" / "Skip".
  </step>

  <step name="analyze_gray_areas">
    Read phase description and identify BA-specific discussion areas:
    - Design interpretation — How to translate Figma screens into user stories?
    - Acceptance criteria depth — How detailed should AC be?
    - Edge case scope — How thorough should edge case analysis be?
    - PO goal alignment — Prioritization of conflicting goals?
    - Story granularity — Epic-level or atomic stories?
    - Flow complexity — Happy path only or all alternative paths?
    - Figma coverage — All screens or specific ones?

    Generate 3-5 phase-specific gray areas.
  </step>

  <step name="present_gray_areas">
    Show phase domain and gray areas.
    Use multi-select to let user choose which areas to discuss.
    Scope guardrail: defer out-of-scope suggestions to roadmap backlog.
  </step>

  <step name="discuss_selected_areas">
    For each selected area:
    1. Announce the area with brief context
    2. Ask 4 concrete questions (choices, not abstract options)
    3. After 4 questions: "More questions or move to next?"
    4. Include "You decide" option when Agent discretion is reasonable
    Track deferred ideas.
  </step>

  <step name="write_context">
    Create `.makeit/sprint/SPRINT-NNN/phases/{NN}/CONTEXT.md` with:
    Phase Boundary, Implementation Decisions, Agent's Discretion,
    Specific Ideas, Deferred Ideas.
  </step>

  <step name="update_state">
    Update STATE.md with context gathered note.
    Suggest: `/makeit:plan-phase` to create execution plan.
  </step>
</process>

<edge_cases>

**Khi requirements mâu thuẫn nhau surface trong discussion:** Nếu user đưa ra yêu cầu conflict với PO goal hoặc giữa các gray areas có contradiction → dừng discussion, ghi nhận conflict vào CONTEXT.md mục "Unresolved Conflicts", suggest user chạy `/makeit:decide` để resolve trước khi plan. Không tự chọn approach khi có conflict — source of truth hierarchy quyết định.

</edge_cases>

<success_criteria>
- [ ] Phase validated and gray areas identified
- [ ] User selected discussion areas
- [ ] Decisions captured in CONTEXT.md
- [ ] Deferred ideas tracked
- [ ] STATE.md updated
</success_criteria>
