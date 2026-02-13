---
name: fe-stage-plan-phase
description: FE phase planning — create PLAN.md with component breakdown, state management planning, responsive strategy, and implementation order
---

<purpose>
Create a structured, executable PLAN.md for the current FE sprint phase with component-focused tasks, Figma extraction steps, and implementation order.
</purpose>

<required_reading>
@fe-discovery/stage-clarify.md
@fe-planning/stage-discuss-phase.md
@fe-planning/templates/PLAN-TEMPLATE.md
@fe-execution/stage-execute-phase.md
@_shared/references/sub-agent-spawning.md
@_shared/references/figma-mcp.md
</required_reading>

<rules>
1. Plans are SMALL — maximum 3 tasks
2. Tasks are atomic — one component/feature, one workflow, one verification
3. FE-specific workflows — reference internal domain workflows (implement, compare-ui)
4. Phase-goal alignment — every task traces back to phase goal and user story
5. Complexity assessment — always assess before planning
6. Figma-first — design extraction must precede implementation
</rules>

<output>
Phase plan → `.makeit/sprint/SPRINT-{NNN}/phases/{NN}-{name}/PLAN.md`

Use template: `@fe-planning/templates/PLAN-TEMPLATE.md`

Structure:
- Objective (from ROADMAP.md)
- Context (sprint, role, complexity, SPECS reference, Figma links)
- Tasks (max 3, each with files, workflow, Figma screen, action, verify, done)
- Spawn Decisions table
- Complexity Assessment table
- Verification (maps to SPECS.md success criteria)
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

       **FE search priorities:**
       - Component patterns → reuse existing component architecture
       - ADRs → frontend-specific architecture decisions
       - Lessons learned → avoid repeating past frontend issues

       Match phase topic keywords against doc tags, titles, categories.
       Select up to 3 most relevant documents.

    3. **Load L1 summaries:**
       For each relevant doc, read Summary + Key Points only (not full L2 content).

    4. **Apply to planning context:**
       ```
       📚 Relevant Knowledge Applied:

       - [{id}] {title} → {how this affects the plan}
         (e.g., "Reuse error handling pattern per PATTERN-001")

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
    - Complex Figma designs with unclear component hierarchy?
    - Animation/transition requirements not yet analyzed?
    - Library or pattern choices needed?
    - API integration with unclear contracts?

    If research needed → spawn FE researcher sub-agent (see `@_shared/references/sub-agent-spawning.md`).
  </step>

  <step name="assess_complexity">
    Assess phase complexity before creating plan:

    | Dimension | S | M | L | XL |
    |-----------|---|---|---|-----|
    | Components | 1-2 simple | 3-4 standard | 5+ complex | Many, nested |
    | Interaction states | Few (2-3) | Standard (4-5) | All 7 states | Custom animations |
    | Responsive | Same layout | Minor adjustments | Different per breakpoint | Complex reflows |
    | API integration | None/simple | 1-2 endpoints | Multiple endpoints | Real-time/WebSocket |
    | Design fidelity | Standard UI | Custom design | Pixel-perfect | Complex animations |

    If XL → suggest splitting phase in ROADMAP.md before planning.
  </step>

  <step name="create_plan">
    Create `phases/{NN}-{phase-name}/PLAN.md` with:
    - Objective, Context, Tasks (max 3), Spawn Decisions table, Verification

    FE-specific task types:
    - Figma extraction → produces design token mapping + component specs
    - Component implementation → produces React components with states
    - UI comparison → produces match/mismatch report
    - Integration → produces connected components with API data
    - Self-review → produces Gate 4 verification
  </step>

  <step name="spawn_decisions">
    Apply FE spawn decision matrix:

    | Task Type | Inline When | Spawn When |
    |-----------|------------|------------|
    | Figma extraction | ≤3 screens | >3 screens or complex hierarchy |
    | Component implementation | ≤2 components | >2 components or complex states |
    | UI comparison | Single screen | Multiple screens or responsive |
    | Integration | Simple endpoints | Complex data flows |
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

**Khi plan có component hierarchy không khớp với Figma design:** Trước khi present plan cho user, so sánh component breakdown trong plan với Figma component tree. Nếu hierarchy lệch (ví dụ: plan tách 3 components nhưng Figma có 5 layers phức tạp hơn) → điều chỉnh plan trước khi trình bày. Log điều chỉnh vào plan notes.

**Khi complexity assessment cho kết quả XL nhưng phase không thể split:** Nếu phase goal yêu cầu tất cả components phải deliver cùng lúc → giảm scope mỗi task, tăng số lượng spawn decisions, và cảnh báo user về rủi ro timeline. Log vào STATE.md.

</edge_cases>

<success_criteria>
- [ ] PLAN.md created with ≤3 atomic tasks
- [ ] Complexity assessed
- [ ] Spawn decisions determined
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
