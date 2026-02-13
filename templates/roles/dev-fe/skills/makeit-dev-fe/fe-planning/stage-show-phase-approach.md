---
name: fe-stage-show-phase-approach
description: FE phase approach — surface Agent's assumptions about component-first vs page-first, responsive approach, and implementation strategy for user approval
---

<purpose>
Present Agent's planned approach for an FE phase so user can approve or correct assumptions before planning begins — analysis of what Agent thinks, not intake of what user knows.
</purpose>

<required_reading>
@fe-planning/stage-discuss-phase.md
@fe-planning/stage-plan-phase.md
@fe-discovery/stage-clarify.md
</required_reading>

<rules>
1. Honest about uncertainty — mark confidence levels
2. Conversational only — no file output
3. FE-specific analysis — focus on components, responsive, state management, not business logic
4. Quick and focused — 5-10 minutes
</rules>

<process>
  <step name="validate_phase">
    Read active sprint's ROADMAP.md.
    Extract target phase (current or specified by argument).
    Validate phase exists and is in `pending` or `planning` status.
  </step>

  <step name="analyze_phase">
    Based on ROADMAP.md description, SPECS.md requirements, and any existing CONTEXT.md,
    form assumptions across five areas:

    **1. Implementation Strategy:** Component-first (build components, then assemble pages) or page-first (build pages, extract components later)?
    **2. Component Architecture:** What component structure? How to decompose? Shared vs feature-specific?
    **3. Responsive Approach:** Mobile-first or desktop-first? Which breakpoints critical?
    **4. Risk Areas:** FE-specific challenges? Complex animations? Heavy API integration? Performance concerns?
    **5. Dependencies:** Assumptions about API readiness, design completeness, shared component availability?
  </step>

  <step name="present_assumptions">
    Present approach with confidence levels:
    - "Fairly confident: ..." (clear from roadmap/specs/Figma)
    - "Assuming: ..." (reasonable inference)
    - "Unclear: ..." (could go multiple ways)

    Ask: "Are these assumptions accurate? What I got right/wrong/missing?"
  </step>

  <step name="gather_feedback">
    If corrections: Acknowledge, summarize updated understanding, offer to re-analyze.
    If confirmed: Note assumptions as validated.
  </step>

  <step name="offer_next_steps">
    Options:
    1. `/makeit:discuss-phase` — Let me ask you questions
    2. `/makeit:plan-phase` — Create execution plan
    3. Re-examine assumptions — Analyze again with corrections
    4. Done for now
  </step>
</process>

<success_criteria>
- [ ] Phase analyzed across 5 assumption areas
- [ ] Confidence levels marked
- [ ] User feedback gathered
- [ ] Next steps offered
</success_criteria>
