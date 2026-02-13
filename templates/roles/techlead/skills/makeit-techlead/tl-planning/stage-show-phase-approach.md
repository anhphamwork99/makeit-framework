---
name: tl-stage-show-phase-approach
description: TL show approach — surface Agent's assumptions about architecture, task breakdown strategy, and risks before planning
---

<purpose>
Present the Agent's proposed approach for a phase — surfaces assumptions about architecture, task breakdown strategy, FE/BE allocation, and risks. User approves or adjusts before plan creation.
</purpose>

<rules>
1. Present assumptions with explicit confidence levels
2. Must include architecture and API approach
3. Must include FE/BE task split estimate
4. User approval required before proceeding to plan-phase
5. If user rejects → adjust approach, re-present (max 3 iterations)
</rules>

<process>
  <step name="gather_context">
    Read:
    1. ROADMAP.md → phase goal and description
    2. CONTEXT.md → locked decisions (if discuss-phase was run)
    3. SPECS.md → sprint scope and BA stories
    4. User stories → technical implications
  </step>

  <step name="analyze_and_propose">
    Analyze phase requirements and formulate approach:

    **Goal Interpretation:**
    - How Agent understands the phase goal
    - Which BA stories are in scope

    **Proposed Technical Approach:**
    - Architecture decisions (if not locked in CONTEXT.md)
    - API contract approach
    - FE/BE task split strategy
    - Integration points

    **Key Assumptions** (with confidence levels):
    - [HIGH] {assumption — based on locked decision}
    - [MEDIUM] {assumption — inferred from context}
    - [LOW] {assumption — needs user validation}

    **Task Breakdown Strategy:**
    - Planned breakdown approach (by story, by layer, by feature)
    - Estimated task count (FE: N, BE: N)
    - Dependency handling

    **Risks & Trade-offs:**
    - {risk 1} — mitigation approach
    - {risk 2} — accepted trade-off

    **Estimated Scope:**
    - Complexity: S/M/L/XL
    - Sub-agent needed? (based on task count > 3 or context > 30%)
  </step>

  <step name="await_approval">
    Wait for user response:
    - "approved" → proceed to plan-phase
    - Feedback → adjust approach, re-present
    - "abort" → cancel, user provides different direction
  </step>
</process>

<success_criteria>
- [ ] Phase context loaded
- [ ] Approach presented with architecture + task strategy
- [ ] Assumptions listed with confidence levels
- [ ] FE/BE split estimated
- [ ] User approved direction
</success_criteria>
