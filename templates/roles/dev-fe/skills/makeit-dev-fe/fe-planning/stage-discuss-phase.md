---
name: fe-stage-discuss-phase
description: FE phase discussion — gather implementation context through adaptive questioning about UI patterns, component library choices, animation approach, and responsive strategy
---

<purpose>
Capture implementation decisions for an FE phase before planning begins through adaptive questioning — user is visionary, agent is builder.
</purpose>

<required_reading>
@fe-discovery/stage-clarify.md
@fe-planning/stage-plan-phase.md
@fe-planning/stage-show-phase-approach.md
@fe-planning/templates/CONTEXT-TEMPLATE.md
</required_reading>

<rules>
1. User = visionary, Agent = builder — ask about vision, not tech details
2. No scope creep — phase boundary is fixed; defer out-of-scope ideas
3. 4 questions per area, then check — keep discussions focused
4. FE-specific areas — component patterns, responsive strategy, state management, animation approach
5. Capture Agent discretion — track what the agent can decide
</rules>

<output>
Context document → `.makeit/sprint/SPRINT-NNN/phases/{NN}/CONTEXT.md`

Use template: `@fe-planning/templates/CONTEXT-TEMPLATE.md`

Structure:
- Phase Boundary
- Implementation Decisions (component architecture, responsive strategy, state management, styling, animation, a11y, design tokens)
- Agent's Discretion areas
- Specific Ideas
- Deferred Ideas
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
    Read phase description and identify FE-specific discussion areas:
    - Component architecture — Atomic design? Feature-based? How granular?
    - Responsive strategy — Mobile-first or desktop-first? Breakpoint behavior?
    - State management — Local state, context, or global store? Data flow?
    - Animation approach — CSS transitions, Framer Motion, or none? Performance budget?
    - Design token mapping — How to map Figma tokens to code? CSS variables, theme object?
    - Interaction states — Which states to prioritize? Custom vs standard?
    - Accessibility — ARIA patterns, keyboard nav, screen reader support level?

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

**Khi Figma responsive designs xung đột với CSS breakpoints hiện có:** Trong bước analyze gray areas, kiểm tra breakpoint values trong Figma vs project CSS. Nếu Figma dùng breakpoints khác (ví dụ: 768px vs 840px), hoặc mobile layout yêu cầu component structure hoàn toàn khác desktop → flag ngay cho user trong discussion: "Responsive conflict detected — cần quyết định breakpoint strategy trước khi plan." Capture decision vào CONTEXT.md.

</edge_cases>

<success_criteria>
- [ ] Phase validated and gray areas identified
- [ ] User selected discussion areas
- [ ] Decisions captured in CONTEXT.md
- [ ] Deferred ideas tracked
- [ ] STATE.md updated
</success_criteria>
