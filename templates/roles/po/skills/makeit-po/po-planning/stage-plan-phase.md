---
name: po-stage-plan-phase
description: PO phase planning — create PLAN.md with tasks for backlog item prioritization, goal refinement, and sprint preparation
---

<purpose>
Create a structured, executable PLAN.md for the current PO sprint phase with tasks, spawn decisions, and complexity assessment. Adapts to PO dual-mode operation.
</purpose>

<required_reading>
@po-discovery/stage-start-sprint.md
@po-execution/stage-execute-phase.md
@_shared/references/sub-agent-spawning.md
</required_reading>

<rules>
1. Plans are SMALL — maximum 3 tasks
2. Tasks are atomic — one deliverable, one workflow, one verification
3. PO-specific workflows — reference internal domain workflows (draft-backlog, refine-goal, prepare-sprint, review-pr, check-gate)
4. Phase-goal alignment — every task traces back to phase goal
5. AI Verification — PO reviews plan before execution, never auto-approve
</rules>

<output>
Phase plan → `.makeit/sprint/SPRINT-{NNN}/phases/{NN}-{name}/PLAN.md`

Template: `@po-planning/templates/PLAN-TEMPLATE.md`

Structure:
- Objective (from ROADMAP.md)
- Context (sprint, role, mode, complexity, SPECS reference)
- Tasks (max 3, each with files, workflow, action, verify, done criteria)
- Spawn Decisions table
- Verification (maps to SPECS.md success criteria)
</output>

<process>
  <step name="read_context">
    1. Read STATE.md — current phase, sprint goal, mode (Backlog Creation / PR Review)
    2. Read ROADMAP.md — phase name, goal, dependencies, expected deliverables
    3. Read SPECS.md — relevant deliverables, acceptance criteria, constraints
    4. Check CONTEXT.md (if exists) — implementation decisions
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

       **PO search priorities:**
       - Feature history → past feature evolution and decisions
       - Business rules → existing business constraints
       - Lessons from past sprints → avoid repeating strategic mistakes

       Match phase topic keywords against doc tags, titles, categories.
       Select up to 3 most relevant documents.

    3. **Load L1 summaries:**
       For each relevant doc, read Summary + Key Points only (not full L2 content).

    4. **Apply to planning context:**
       ```
       📚 Relevant Knowledge Applied:

       - [{id}] {title} → {how this affects the plan}
         (e.g., "Consider subscription tier limits per RULE-002")

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
    Assess phase complexity before creating plan:

    **Mode 1 — Backlog Creation:**
    | Dimension | S | M | L | XL |
    |-----------|---|---|---|-----|
    | Backlog items | 1-2 | 3-5 | 6-8 | 9+ |
    | Goal clarity | Clear | Mostly clear | Several unknowns | Ambiguous |
    | Stakeholder alignment | Aligned | Minor gaps | Significant gaps | Conflicting |
    | Dependencies | None | 1-2 clear | Cross-feature | Cross-team |

    **Mode 2 — PR Review:**
    | Dimension | S | M | L | XL |
    |-----------|---|---|---|-----|
    | PR scope | Single feature | Multi-feature | Architecture change | Breaking change |
    | AC complexity | Simple checks | Multi-flow | Cross-system | Ambiguous AC |
    | Business risk | Low impact | Medium impact | High impact | Critical path |

    If XL → suggest splitting phase in ROADMAP.md before planning.
  </step>

  <step name="create_plan">
    Create `phases/{NN}-{phase-name}/PLAN.md` with:
    - Objective, Context, Tasks (max 3), Spawn Decisions table, Verification

    PO-specific task types:
    - Draft backlog → produces backlog items with goal, context, AC
    - Refine goal → produces improved goal clarity + SMART criteria
    - Prepare sprint → produces sprint plan with prioritized items
    - Review PR → produces review feedback with business logic check
    - Check gate → produces gate verification report
  </step>

  <step name="spawn_decisions">
    Apply PO spawn decision matrix:

    | Task Type | Inline When | Spawn When |
    |-----------|------------|------------|
    | Draft backlog | Single item, clear context | Multiple items or complex domains |
    | Refine goal | Quick clarification | Deep research needed |
    | Prepare sprint | Standard sprint prep | Large backlog, complex prioritization |
    | Review PR | Single focused PR | Multiple related PRs |
    | Check gate | Standard check | Cross-team coordination |
  </step>

  <step name="update_state">
    Phase status: `planning` → `executing`.
    Update Phase Progress table.
    Log: "Phase {NN} plan created — {N} tasks, {N spawn / N inline}"
  </step>

  <step name="present_plan">
    Display plan summary with objective, complexity, tasks table, plan path.
    Remind: "⚠️ PO reviews and confirms plan before execution."
    Suggest: `/makeit:execute-phase` to start execution.
  </step>
</process>

<edge_cases>

**Khi complexity assessment = XL nhưng PO không muốn split phase:** ⚠️ STOP — "Phase quá phức tạp cho AI xử lý hiệu quả. Recommend split hoặc PO tham gia trực tiếp vào planning." Log vào STATE.md.

</edge_cases>

<success_criteria>
- [ ] PLAN.md created with ≤3 atomic tasks
- [ ] Complexity assessed for PO domain
- [ ] Spawn decisions determined
- [ ] STATE.md updated
- [ ] PO informed of plan for review
</success_criteria>
