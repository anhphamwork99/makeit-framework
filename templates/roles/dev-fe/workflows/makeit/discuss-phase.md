---
name: makeit:discuss-phase
description: Gather FE implementation context — UI patterns, component architecture, responsive strategy
---

<objective>
Capture FE implementation decisions through adaptive questioning before planning begins. Covers component architecture, responsive strategy, state management, animation approach, and design token mapping.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-planning/stage-discuss-phase.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase. If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="identify_gray_areas">
    Analyze phase and identify FE-specific discussion areas:
    Component architecture, responsive strategy, state management, animation approach, design token mapping, interaction states, accessibility.
  </step>

  <step name="discuss">
    Present gray areas, let user select which to discuss.
    Ask 4 concrete questions per area. Include "You decide" option.
    Track deferred ideas for future phases.
  </step>

  <step name="save_context">
    Write CONTEXT.md with decisions, agent discretion areas, deferred ideas.
    Update STATE.md. Suggest: `/makeit:plan-phase`.
  </step>
</process>

<success_criteria>
- [ ] Gray areas identified and discussed
- [ ] CONTEXT.md created with decisions
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
