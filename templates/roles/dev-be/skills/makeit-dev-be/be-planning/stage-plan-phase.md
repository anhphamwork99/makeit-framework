---
name: be-stage-plan-phase
description: BE phase planning — create PLAN.md with API design planning, migration strategy, dependency analysis, and implementation ordering
---

<purpose>
Create a detailed execution plan (PLAN.md) for the current phase — breaking down the phase goal into ordered tasks with API design steps, migration strategy, dependency analysis, and layer-by-layer implementation sequence.
</purpose>

<required_reading>
@be-discovery/stage-clarify.md
@be-execution/stage-execute-phase.md
@_shared/references/quality-gates.md
@_shared/references/coding-standards.md
</required_reading>

<rules>
1. Plan before implement — never skip the planning step
2. Tasks must be atomic — each task = one commit
3. Layer ordering — models → migrations → services → controllers → tests → docs
4. Migration safety — flag destructive migrations in plan
5. Dependency awareness — external service dependencies identified upfront
6. 3-7 tasks per plan — break larger scopes into multiple phases
</rules>

<output>
PLAN.md → `.makeit/sprint/SPRINT-{NNN}/phases/{NN}-{name}/PLAN.md`
Updated STATE.md with plan status

Template: @be-planning/templates/PLAN-TEMPLATE.md
</output>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase number, plan status, blockers.
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="validate_phase">
    Read ROADMAP.md → locate target phase.
    Extract phase goal and description.
    Check if PLAN.md already exists → offer: replan or continue.
  </step>

  <step name="gather_context">
    Read available context for planning:
    - SPECS.md — sprint scope and task requirements
    - ROADMAP.md — phase dependencies and prior phases
    - API contract (if exists from prior design)
    - Schema design (if exists)
    - BA user story — source of truth for requirements
    - Existing codebase patterns — scan project structure
  </step>

  <step name="knowledge_context_enrichment">
    Before planning, check the knowledge base for relevant past decisions and patterns:

    1. **Quick check:**
       ```bash
       [ -f .makeit/knowledge/INDEX.md ] && echo "KB exists" || echo "No KB"
       ```
       - If no KB: Skip enrichment, proceed to next step

    2. **Search for relevant knowledge:**
       Read INDEX.md Documents table and find docs relevant to this phase:

       **BE search priorities:**
       - API contracts → must match existing endpoint definitions
       - Schema decisions → database design constraints and patterns
       - Integration patterns → third-party service integration approaches
       - Lessons learned → avoid repeating past backend issues

       Match phase topic keywords against doc tags, titles, categories.
       Select up to 3 most relevant documents.

    3. **Load L1 summaries:**
       For each relevant doc, read Summary + Key Points only (not full L2 content).

    4. **Apply to planning context:**
       ```
       📚 Relevant Knowledge Applied:

       - [{id}] {title} → {how this affects the plan}
         (e.g., "Follow API versioning strategy per ADR-005")

       💡 These docs influenced the plan. No action needed.
       ```

    5. **If conflicting knowledge found:**
       Flag the conflict and let user/planner decide:
       ```
       ⚠️ Knowledge Conflict:
       - [{id1}] says: {approach A}
       - [{id2}] says: {approach B}
       → Which approach should this plan follow?
       ```

    > **Non-blocking:** Enrichment is informational. It INFLUENCES the plan but doesn't block it. If KB is empty or nothing relevant, skip silently.
  </step>

  <step name="analyze_dependencies">
    Identify dependencies before creating tasks:

    **Internal dependencies:**
    - Which models depend on other models?
    - Which services need other services?
    - Migration ordering (foreign keys, etc.)

    **External dependencies:**
    - FE waiting for API contract?
    - Third-party API integrations?
    - Shared database concerns?

    > ⚠️ Flag shared database operations for STOP mechanism
  </step>

  <step name="create_plan">
    Break phase goal into 3-7 atomic tasks following BE layer ordering:

    **Typical task ordering:**
    1. API contract design (if not done) → `design-api` workflow
    2. Schema design (if DB changes) → `design-schema` workflow
    3. Model/entity creation → `implement` workflow
    4. Database migrations → `implement` workflow (⚠️ flag destructive)
    5. Service layer → `implement` workflow
    6. Controller/routes → `implement` workflow
    7. Tests → `implement` workflow
    8. API documentation → `implement` workflow

    Each task includes: description, workflow to use, done criteria, estimated effort.
    Write to `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/PLAN.md`
  </step>

  <step name="update_state">
    Update STATE.md:
    - Set phase status to "planned"
    - Record plan creation timestamp
  </step>

  <step name="report">
    Display plan summary: task count, estimated effort, dependencies, migration warnings.
    Suggest next command:
    ```
    /makeit:execute-phase    → execute the plan
    /makeit:status           → review progress
    ```
  </step>
</process>

<edge_cases>

**Khi phát hiện TL plan có issues trong lúc planning (wrong dependency, missing service, incorrect ordering):** Không chấp nhận plan as-is — flag cụ thể vấn đề (missing FK dependency, service A cần service B nhưng plan làm B trước). Đề xuất re-ordering hoặc escalate cho Techlead nếu cần architectural change.

**Khi plan chứa migration không thể rollback (data transformation, column type change):** Flag migration destructive trong plan với warning ⚠️. Yêu cầu backup plan trước khi execute — snapshot data, rollback SQL thủ công. Đánh dấu task này cần Techlead approve trước khi chạy.

**Khi schema change ảnh hưởng nhiều services/endpoints cùng phụ thuộc một table:** Phân tích cascade impact: liệt kê tất cả endpoints, services, và migrations bị ảnh hưởng bởi schema change. Nếu impact >3 services → ⚠️ STOP — cần coordination plan với Techlead trước khi execute.

</edge_cases>

<success_criteria>
- [ ] Sprint state loaded and phase validated
- [ ] PLAN.md created with atomic tasks and done criteria
- [ ] Tasks ordered by dependency (layer ordering)
- [ ] Destructive operations flagged
- [ ] STATE.md updated with plan status
- [ ] User informed of next steps
</success_criteria>
