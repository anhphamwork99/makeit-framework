---
name: tl-stage-plan-phase
description: TL plan — create PLAN.md for a phase with tasks, spawn decisions, and complexity assessment
---

<purpose>
Create PLAN.md for a given phase — defines specific tasks, determines inline vs sub-agent execution, and assesses complexity. The plan drives execute-phase.
</purpose>

<required_reading>
- `.agent/skills/makeit-techlead/_shared/references/quality-gates.md` — Gate 3 output expectations
- `.agent/skills/makeit-techlead/_shared/references/coding-standards.md` — Technical standards
- `@tl-planning/templates/PLAN-TEMPLATE.md` — Template for PLAN.md output
</required_reading>

<rules>
1. Tasks MUST be atomic — one deliverable per task
2. Max 3-5 tasks per plan — if more, consider splitting phase
3. Each task specifies: description, input, output file, template (if any)
4. Spawn decision per task: inline (simple) vs sub-agent (complex)
5. Plan must align with phase goal — no scope creep
6. Reference locked decisions from CONTEXT.md
</rules>

<output>
- `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/PLAN.md` — Execution plan (use `@tl-planning/templates/PLAN-TEMPLATE.md`)
</output>

<process>
  <step name="read_context">
    1. STATE.md → current phase, sprint status
    2. ROADMAP.md → phase goal, description, dependencies
    3. CONTEXT.md → locked decisions (if discuss-phase was run)
    4. RESEARCH.md → research findings (if research-phase was run)
    5. SPECS.md → sprint scope, BA stories
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

       **TL search priorities:**
       - ADRs → must align with existing architecture decisions
       - System maps → architectural context and module boundaries
       - Patterns → reuse established implementation patterns

       Match phase topic keywords against doc tags, titles, categories.
       Select up to 3 most relevant documents.

    3. **Load L1 summaries:**
       For each relevant doc, read Summary + Key Points only (not full L2 content).

    4. **Apply to planning context:**
       ```
       📚 Relevant Knowledge Applied:

       - [{id}] {title} → {how this affects the plan}
         (e.g., "Must align with auth strategy per ADR-001")

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

  <step name="assess_complexity">
    Evaluate phase complexity:

    | Factor | Low | Medium | High |
    |--------|-----|--------|------|
    | Stories in scope | 1-2 | 3-4 | 5+ |
    | API contracts needed | 0-1 | 2-3 | 4+ |
    | Cross-team dependencies | 0 | 1-2 | 3+ |
    | Architecture decisions | 0 | 1 | 2+ |
    | Estimation complexity | Simple | Moderate | Detailed |

    If High → recommend sub-agent spawning for task execution.
  </step>

  <step name="create_plan">
    Write PLAN.md:
    ```markdown
    # Phase {N}: {Name}

    ## Goal
    {phase goal from ROADMAP.md}

    ## Context
    {locked decisions from CONTEXT.md, research findings}

    ## Tasks

    ### Task 1: {description}
    - **Input:** {BA stories, Figma links, SPECS references}
    - **Output:** {deliverable file path}
    - **Template:** {template from tl-execution/templates/ if applicable}
    - **Internal workflow:** {break-tasks | design-solution | assign-tasks | review-code | estimate}
    - **Execution:** inline | spawn {agent type}

    ### Task 2: {description}
    ...

    ## Spawn Decision
    - Tasks 1-2: inline (simple, < 30% context)
    - Task 3: spawn executor (complex, multiple stories)

    ## Success Criteria
    - [ ] {criterion 1}
    - [ ] {criterion 2}
    ```
  </step>

  <step name="update_state">
    Update STATE.md:
    - Phase status → "planned"
    - Plan file → path to PLAN.md
  </step>

  <step name="report">
    Display plan summary: task count, complexity, spawn decisions.
    Suggest next:
    ```
    /makeit:execute-phase  → execute this plan
    ```
  </step>
</process>

<edge_cases>

**Khi task quá phức tạp cho AI agent — phát hiện tại planning time:** Nếu complexity assessment cho thấy task cần multi-system reasoning, cần domain expertise sâu, hoặc cần architectural judgment mà AI không thể handle → mark task là "Execution: hybrid" trong PLAN.md. Ghi rõ: "AI draft initial output → human review và refine → human approve." Không plan full autonomous execution cho tasks vượt quá AI capability.

</edge_cases>

<success_criteria>
- [ ] Phase context loaded (ROADMAP, CONTEXT, RESEARCH, SPECS)
- [ ] Complexity assessed
- [ ] PLAN.md created with atomic tasks
- [ ] Spawn decisions made per task
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
