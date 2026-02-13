---
name: ba-stage-plan-phase
description: BA phase planning — create PLAN.md with tasks for current sprint phase, incorporating story estimation and complexity assessment
---

<purpose>
Create a structured, executable PLAN.md for the current BA sprint phase with tasks, spawn decisions, and complexity assessment.
</purpose>

<required_reading>
@ba-discovery/stage-clarify.md
@ba-planning/stage-discuss-phase.md
@ba-planning/templates/PLAN-TEMPLATE.md
@ba-execution/stage-execute-phase.md
@_shared/references/sub-agent-spawning.md
</required_reading>

<rules>
1. Plans are SMALL — maximum 3 tasks
2. Tasks are atomic — one deliverable, one workflow, one verification
3. BA-specific workflows — reference internal domain workflows, not external skills
4. Phase-goal alignment — every task traces back to phase goal
5. Complexity assessment — always assess before planning
</rules>

<output>
Phase plan → `.makeit/sprint/SPRINT-{NNN}/phases/{NN}-{name}/PLAN.md`

Use template: @ba-planning/templates/PLAN-TEMPLATE.md
Sections: Objective, Context, Tasks (max 3), Spawn Decisions, Verification.
</output>

<process>
  <step name="read_context">
    1. Read STATE.md — current phase, sprint goal, previous learnings
    2. Read ROADMAP.md — phase name, goal, dependencies, expected deliverables
    3. Read SPECS.md — relevant deliverables, acceptance criteria, constraints
    4. Check CONTEXT.md (if exists) — implementation decisions from discuss-phase
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

       **BA search priorities:**
       - ADRs → affects story scope and acceptance criteria
       - Business rules → must follow in story definitions
       - Glossary → correct terms in stories and flows

       Match phase topic keywords against doc tags, titles, categories.
       Select up to 3 most relevant documents.

    3. **Load L1 summaries:**
       For each relevant doc, read Summary + Key Points only (not full L2 content).

    4. **Apply to planning context:**
       ```
       📚 Relevant Knowledge Applied:

       - [{id}] {title} → {how this affects the plan}
         (e.g., "Follow subscription rules per RULE-001")

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

  <step name="determine_research_need">
    Check for unknowns:
    - Unfamiliar design patterns in Figma?
    - Complex user flows with unclear interactions?
    - Missing PO context that affects story scope?

    If research needed → spawn BA researcher sub-agent (see `@_shared/references/sub-agent-spawning.md`).
  </step>

  <step name="assess_complexity">
    Assess phase complexity before creating plan:

    | Dimension | S | M | L | XL |
    |-----------|---|---|---|-----|
    | Screens/flows | 1-2 | 3-4 | 5+ | Many, nested |
    | Edge cases | Few, obvious | Some, identifiable | Multiple, complex | Unclear, many unknowns |
    | Dependencies | None | 1-2 clear | Cross-feature | Cross-team/system |
    | Requirements clarity | Clear | Mostly clear | Several unknowns | Ambiguous |
    | Design completeness | Full | Minor gaps | Significant gaps | Incomplete |

    If XL → suggest splitting phase in ROADMAP.md before planning.
  </step>

  <step name="create_plan">
    Create `phases/{NN}-{phase-name}/PLAN.md` with:
    - Objective, Context, Tasks (max 3), Spawn Decisions table, Verification

    BA-specific task types:
    - Analyze design → produces Figma analysis report
    - Write stories → produces user stories with AC
    - Document flows → produces user flow documentation
    - Identify edges → produces edge case analysis
    - Self-review → produces Gate 2 verification
  </step>

  <step name="spawn_decisions">
    Apply BA spawn decision matrix:

    | Task Type | Inline When | Spawn When |
    |-----------|------------|------------|
    | Design analysis | ≤3 screens | >3 screens or complex interactions |
    | Story writing | ≤3 stories | >3 stories or cross-feature scope |
    | Flow documentation | Single flow | Multiple flows or complex branching |
    | Edge case analysis | Few obvious cases | Systematic analysis needed |
  </step>

  <step name="update_state">
    Phase status: `planning` → `executing`.
    Update Phase Progress table.
    Log: "Phase {NN} plan created — {N} tasks, {N spawn / N inline}"
  </step>

  <step name="present_plan">
    Display plan summary with objective, complexity, tasks table, plan path.
    Suggest: `/makeit:execute-phase` to start execution.
  </step>
</process>

<edge_cases>

**Khi complexity assessment cho kết quả XL hoặc nhiều unknowns:** Nếu ≥3 dimensions ở mức L/XL → ⚠️ STOP — Phase quá phức tạp cho single execution. Đề xuất split phase trong ROADMAP.md trước khi tạo plan. Nếu unknowns là domain knowledge → suggest `/makeit:research-phase` trước.

**Khi task breakdown cảm thấy không đúng — stories decomposition lệch hướng:** Trước khi finalize plan, tự kiểm tra: "Nếu execute plan này, output có đáp ứng phase goal không?" Nếu không chắc → trình bày decomposition approach cho user để confirm trước khi tạo PLAN.md.

**Khi estimated work vượt quá sprint capacity:** Nếu tổng stories dự kiến > 8 hoặc total complexity > 3L → flag cho user: "Estimated workload vượt sprint capacity. Suggest: giảm scope (bỏ feature phụ) hoặc split thành 2 sprints." Không tự cắt scope — PO quyết định priority.

**Khi knowledge enrichment tìm thấy docs conflicting hoặc stale:** Nếu KB doc có `last_updated` > 3 tháng hoặc contradicts current sprint goals → flag: "⚠️ KB doc [{id}] có thể stale (last updated: {date}). Verify trước khi apply vào plan." Không silently apply stale knowledge.

</edge_cases>

<success_criteria>
- [ ] PLAN.md created with ≤3 atomic tasks
- [ ] Complexity assessed
- [ ] Spawn decisions determined
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
