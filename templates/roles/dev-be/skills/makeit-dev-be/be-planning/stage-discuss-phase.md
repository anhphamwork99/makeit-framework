---
name: be-stage-discuss-phase
description: BE phase discussion — gather implementation context through adaptive questioning about infrastructure decisions, performance requirements, and integration complexity
---

<purpose>
Capture implementation decisions for a BE phase before planning begins through adaptive questioning — user is visionary, agent is builder.

**OPTIONAL stage** — use for complex features involving cache strategies, queue architectures, third-party API integrations, or infrastructure decisions.
</purpose>

<required_reading>
@be-discovery/stage-clarify.md
@be-planning/stage-plan-phase.md
</required_reading>

<rules>
1. User = visionary, Agent = builder — ask about vision, not tech details
2. No scope creep — phase boundary is fixed; defer out-of-scope ideas
3. 4 questions per area, then check — keep discussions focused
4. BE-specific areas — infrastructure, performance, security, integration, data modeling
5. Capture Agent discretion — track what the agent can decide
</rules>

<output>
Context document → `.makeit/sprint/SPRINT-NNN/phases/{NN}/CONTEXT.md`

Template: @be-planning/templates/CONTEXT-TEMPLATE.md

Structure:
- Phase Boundary
- Implementation Decisions (infrastructure, performance, security, integration, data modeling)
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
    Read phase description and identify BE-specific discussion areas:
    - Infrastructure decisions — Cache strategy (Redis, Memcached)? Queue system (Bull, RabbitMQ)? Cron scheduling?
    - Performance requirements — Expected load? Response time SLA? Batch processing needs?
    - Integration complexity — Third-party APIs? Webhooks? OAuth flows? Rate limiting?
    - Data modeling — Schema design approach? Normalization level? Soft deletes? Versioning?
    - Security considerations — Auth method? Role-based access? Data encryption? API rate limiting?
    - Migration strategy — Zero-downtime migration? Rollback plan? Data seeding?
    - Error handling — Retry strategy? Dead letter queue? Alert thresholds?

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

**Khi phase liên quan đến third-party API integration (payment, auth provider, notification):** Chủ động hỏi trong discussion: (1) API có SLA/uptime guarantee không? (2) Rate limits? (3) Sandbox/test environment available? (4) Fallback nếu API down? Nếu user chưa rõ → flag as risk trong CONTEXT.md để plan-phase xử lý.

</edge_cases>

<success_criteria>
- [ ] Phase validated and gray areas identified
- [ ] User selected discussion areas
- [ ] Decisions captured in CONTEXT.md
- [ ] Deferred ideas tracked
- [ ] STATE.md updated
</success_criteria>
