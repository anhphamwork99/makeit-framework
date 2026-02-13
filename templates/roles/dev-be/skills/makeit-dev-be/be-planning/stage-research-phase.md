---
name: be-stage-research-phase
description: BE phase research — spawn researcher sub-agent for deep investigation of library evaluation, architecture patterns, and scalability considerations
---

<purpose>
Deep research before planning — investigate architecture patterns, evaluate libraries, and research scalability approaches by spawning a BE researcher sub-agent.

**OPTIONAL stage** — use for unfamiliar domains, new technology integrations, or complex performance requirements.
</purpose>

<required_reading>
@be-planning/stage-discuss-phase.md
@be-planning/stage-plan-phase.md
@_shared/references/sub-agent-spawning.md
</required_reading>

<rules>
1. Prescriptive, not exploratory — "Use X" not "Consider X or Y"
2. Sub-agent always — research burns context, always spawn
3. BE-focused research — architecture, libraries, performance (not UI/UX)
4. Optional stage — not required, but recommended for new tech or unfamiliar domains
5. Security-first — research must include security implications
</rules>

<output>
Research document → `.makeit/sprint/SPRINT-NNN/phases/{NN}/RESEARCH.md`

Template: @be-planning/templates/RESEARCH-TEMPLATE.md

Structure:
- Architecture Patterns (microservices vs monolith, API patterns, data flow)
- Library Evaluation (ORM, queue, cache, auth libraries)
- Performance Considerations (query optimization, caching strategy, connection pooling)
- Security Analysis (auth patterns, input validation, encryption requirements)
- Integration Research (third-party API docs, webhook patterns, rate limits)
- Scalability Considerations (horizontal scaling, database sharding, load balancing)
- Recommendations (prescriptive — "Use X" not "Consider X or Y")
</output>

<process>
  <step name="validate_phase">
    Read active sprint's ROADMAP.md.
    Extract target phase (current or specified by argument).
    Validate phase exists in roadmap.
  </step>

  <step name="check_existing_research">
    Check if RESEARCH.md already exists.
    If exists: Offer "Update research" / "View existing" / "Skip".
  </step>

  <step name="gather_phase_context">
    Collect context for the researcher:
    1. Phase description from ROADMAP.md
    2. Requirements from SPECS.md
    3. Prior decisions from CONTEXT.md (if exists)
    4. Sprint state from STATE.md
    5. Existing codebase patterns (if applicable)

    Present summary to user before spawning.
  </step>

  <step name="spawn_researcher">
    Why sub-agent: Research burns context fast (library comparison, architecture analysis, performance benchmarks).

    1. Read BE researcher agent definition from `.agent/agents/makeit-be-researcher.md`
    2. Prepare spawn prompt with phase description, technical constraints, research focus areas
    3. Spawn sub-agent (see `@_shared/references/sub-agent-spawning.md`)

    BE research focus areas:
    - Architecture patterns — API design, service layer, data access patterns
    - Library evaluation — ORM, cache, queue, auth, validation libraries
    - Performance analysis — query optimization, caching, connection pooling, batch processing
    - Security research — auth patterns, encryption, API security, OWASP compliance
    - Integration analysis — third-party API patterns, webhook handling, error recovery
    - Scalability — horizontal scaling, database strategy, message queues
  </step>

  <step name="handle_return">
    Research complete: Display summary, offer next steps:
    - Plan phase → `/makeit:plan-phase`
    - Research deeper → spawn again with specific questions
    - Review full research → display RESEARCH.md

    Research inconclusive: Show what was attempted, offer alternatives.
  </step>

  <step name="update_state">
    Update STATE.md with research completed note.
    Log in Phase Progress table.
  </step>
</process>

<success_criteria>
- [ ] Phase validated and context gathered
- [ ] Researcher spawned with proper context
- [ ] RESEARCH.md produced with prescriptive recommendations
- [ ] STATE.md updated
</success_criteria>
