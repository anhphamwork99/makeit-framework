---
name: ba-stage-show-phase-approach
description: BA phase approach — surface Agent's assumptions about a BA phase for user approval before planning
---

<purpose>
Present Agent's planned approach for a BA phase so user can approve or correct assumptions before planning begins — analysis of what Agent thinks, not intake of what user knows.
</purpose>

<required_reading>
@ba-planning/stage-discuss-phase.md
@ba-planning/stage-plan-phase.md
@ba-discovery/stage-clarify.md
</required_reading>

<rules>
1. Honest about uncertainty — mark confidence levels
2. Conversational only — no file output
3. BA-specific analysis — focus on stories, flows, edge cases, not technical implementation
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

    **1. Analysis Approach:** Which Figma screens to analyze first? What MCP tools to use?
    **2. Story Strategy:** How to structure user stories? What granularity for AC?
    **3. Scope Boundaries:** What's included vs excluded? Ambiguous areas?
    **4. Risk Areas:** BA-specific challenges? PO goal conflicts with design?
    **5. Dependencies:** Assumptions about PO goals or design completeness?
  </step>

  <step name="present_assumptions">
    Present approach with confidence levels:
    - "Fairly confident: ..." (clear from roadmap/specs)
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
