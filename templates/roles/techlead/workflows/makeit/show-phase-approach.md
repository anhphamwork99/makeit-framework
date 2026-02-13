---
name: makeit:show-phase-approach
description: View Agent's planned approach and assumptions before committing to a plan
---

<objective>
Present the Agent's proposed approach for implementing a phase — surfaces assumptions about architecture, task breakdown strategy, and FE/BE allocation BEFORE plan creation. Lets user approve or redirect.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-planning/stage-show-phase-approach.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase, prior context.
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="analyze_phase">
    Read ROADMAP.md for phase goal.
    Read CONTEXT.md if exists (locked decisions from discuss-phase).
    Read SPECS.md for sprint scope awareness.
    Analyze technical implications and formulate approach.
  </step>

  <step name="present_approach">
    Display structured approach proposal:
    - **Goal interpretation** — how Agent understands the phase goal
    - **Proposed approach** — architecture, API design, task strategy
    - **Key assumptions** — with confidence levels [HIGH/MEDIUM/LOW]
    - **FE/BE split** — estimated task allocation
    - **Estimated scope** — rough task count and complexity
  </step>

  <step name="await_approval">
    Wait for user response:
    - "approved" → proceed to plan-phase
    - Feedback → adjust approach, re-present
    - "abort" → cancel, user provides different direction
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and phase analyzed
- [ ] Approach presented with assumptions and trade-offs
- [ ] User approved or provided feedback
- [ ] Clear direction established for plan-phase
</success_criteria>
