---
name: fe-stage-clarify
description: FE sprint entry point — read Lark Sprint issue, verify Techlead tasks (Gate 3), check Figma readiness, create sprint workspace with SPECS.md + ROADMAP.md + STATE.md
---

<purpose>
Transform Techlead tasks into a structured FE sprint workspace with Gate 3 verification — checking task clarity, Figma design readiness, and API contract availability before implementation begins.
</purpose>

<required_reading>
@_shared/references/quality-gates.md
@_shared/references/figma-mcp.md
@_shared/references/team-workflow.md
@fe-planning/stage-plan-phase.md
@fe-planning/stage-discuss-phase.md
@fe-discovery/templates/ROADMAP-TEMPLATE.md
@fe-discovery/templates/SPECS-TEMPLATE.md
@fe-discovery/templates/STATE-TEMPLATE.md
@fe-discovery/templates/SPRINT-TEMPLATE.md
@fe-discovery/templates/CODEBASE-SNAPSHOT.md
</required_reading>

<rules>
1. Gate 3 is mandatory — never skip input verification from Techlead
2. FE-specific deliverables — always verify Figma readiness and design token availability
3. Figma links required — FE cannot implement without design reference
4. User story traceability — every task must trace back to BA user story (source of truth)
5. Sprint workspace is ephemeral — process files don't get committed, only code deliverables
6. STOP mechanism — remind about destructive operation safeguards
</rules>

<output>
Sprint workspace → `.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/`
- `STATE.md` — sprint state tracking
- `SPECS.md` — deliverables + success criteria
- `ROADMAP.md` — phased execution plan
- `deliverables/` — output folder
- `phases/` — phase execution folders
</output>

<process>
  <step name="receive_sprint_issue">
    Ask user for Lark Sprint issue content (paste, URL, or structured input).
    Extract key fields: Sprint ID, sprint goal, feature/epic name, Techlead tasks,
    Figma links, API contracts, priority/timeline, constraints.
  </step>

  <step name="read_incoming_handoff">
    Read incoming HANDOFF.md from TL (fixed sender):

    1. Check for TL handoff:
       ```bash
       cat .makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md 2>/dev/null
       ```
    2. If found:
       - Parse the `## FE Developer` section specifically (ignore ## BE Developer)
       - Extract: FE task list, Figma links, design context, API contracts
       - Use deliverable paths to read TL task breakdowns via `view_file`
       - Use external links for Figma, Lark references
       - This provides routing context for what TL expects FE to implement
    3. If NOT found:
       - Tell user: "No handoff found from TL. Ask TL to run `/makeit:complete` first, or proceed with Lark input only."
       - Continue with Lark-based clarification (backward compatible)
    4. Create own role subfolder for this sprint:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/fe/
       ```

    > HANDOFF.md provides routing context. Lark provides task tracking details.
    > This step SUPPLEMENTS existing clarification flow — it does NOT replace Lark input.
  </step>

  <step name="load_project_knowledge">
    Check if knowledge base exists and load relevant context for this sprint:

    1. **Check INDEX.md:**
       ```bash
       cat .makeit/knowledge/INDEX.md 2>/dev/null
       ```
       - If not exists: Skip knowledge loading (KB not yet populated)
       - If exists: Read Quick Stats to understand what's available

    2. **Role-filtered scan (L0):**
       Read the Documents table from INDEX.md. Filter for:
       - category IN (technical, operational)
       - tags contain "frontend" OR type IN (component, pattern, lesson)

       Select 3-5 most relevant docs based on:
       - Matching tags with current sprint topic
       - Recent updates (freshness)
       - High confidence scores
       - Related category/type for FE role

    3. **Load summaries (L1):**
       For each selected doc, read ONLY the Summary + Key Points sections:
       ```bash
       # Read frontmatter + L1 content (until L2 marker)
       sed -n '1,/<!-- === DETAIL/p' "{doc_path}" | head -50
       ```

    4. **Context injection:**
       Add loaded knowledge to sprint context:
       ```
       📚 Relevant Knowledge from Past Sprints:

       - [{id}] {title}: {summary one-liner}
       - [{id}] {title}: {summary one-liner}

       💡 Use `/makeit:search-kb` for deeper queries during this sprint.
       ```

    5. **DO NOT load full docs (L2) at this stage.** Save context for actual work.
  </step>

  <step name="verify_gate_3">
    🔒 Gate 3 = FE's entry gate. Do NOT proceed to implementation until Gate 3 passes.

    Run Gate 3 verification against Techlead task inputs:

    **Task Quality Checks:**
    | # | Check Item | Status |
    |---|-----------|--------|
    | 1 | Task break rõ ràng: FE tasks tách biệt BE tasks | ✅/❌ |
    | 2 | Scope cụ thể: mô tả rõ cần implement cái gì | ✅/❌ |
    | 3 | User story reference: link đến user story của BA | ✅/❌ |
    | 4 | Technical constraints noted (browser support, third-party) | ✅/❌ |
    | 5 | API contract defined (nếu FE/BE cần coordinate) | ✅/❌ |
    | 6 | Estimation hợp lý: Techlead đã estimate effort | ✅/❌ |
    | 7 | Lark task has correct sprint, priority, and assignee | ✅/❌ |

    **Design Readiness Checks:**
    | # | Check Item | Status |
    |---|-----------|--------|
    | 8 | Figma link attached and accessible | ✅/❌ |
    | 9 | Screens marked "Ready for Dev" in Figma | ✅/❌ |
    | 10 | All interaction states defined (hover, active, disabled, error, empty, loading) | ✅/❌ |
    | 11 | Design tokens extractable via Figma MCP | ✅/❌ |

    **Gate 3 Verdict:**
    - ALL PASS → Continue to next step
    - HAS FAILURES → Generate clarification message for Techlead, block progress
  </step>

  <step name="discover_context">
    Run context discovery workflow to gather existing FE context:
    - @fe-discovery/workflows/discover-fe-context.md

    Scans: components inventory, design tokens, CSS approach, state management, routing, folder conventions, Figma↔code mapping.

    Save results to sprint workspace:
    `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md`

    > This snapshot is reusable across all phases in this sprint.
    > Only re-run if sprint scope changes significantly.
    > Copy template from `@fe-discovery/templates/CODEBASE-SNAPSHOT.md`
  </step>

  <step name="create_workspace">
    After Gate 3 passes, create sprint folder structure:
    ```
    .makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/
    ├── STATE.md          ← from STATE-TEMPLATE
    ├── SPECS.md          ← from SPECS-TEMPLATE
    ├── ROADMAP.md        ← from ROADMAP-TEMPLATE
    ├── deliverables/     ← output folder (code files)
    └── phases/           ← phase execution folders
    ```
  </step>

  <step name="populate_specs">
    Fill SPECS.md with extracted sprint data:
    1. Sprint metadata — ID, goal, dates, role (Dev FE)
    2. Deliverables list — implemented components, responsive behavior, interaction states
    3. Success criteria — SC1-SC6 covering UI match, states, responsive, tokens, gate 4
    4. Constraints — from Lark issue + Techlead notes
    5. References — Figma links, user story links, API contracts, Lark task IDs
  </step>

  <step name="populate_roadmap">
    Create phased execution plan. FE typical phases:
    - Phase 1: Design Extraction → Figma analysis + design token mapping
    - Phase 2: Component Implementation → build components from Figma specs
    - Phase 3: Integration & Polish → API connection, states, responsive
    - Phase 4: Quality Assurance → self-review, compare-ui, Gate 4

    Adjust phases based on sprint complexity.
  </step>

  <step name="initialize_state">
    Populate STATE.md with sprint ID, goal, Phase 1 set to `pending`,
    all other phases listed as `pending`, session continuity section initialized.

    ⚠️ STOP Mechanism reminder: AI sẽ pause trước destructive operations.
  </step>

  <step name="present_summary">
    Display sprint workspace summary with Gate 3 status, deliverables expected,
    workspace path. Suggest: `/makeit:plan-phase` or `/makeit:discuss-phase`.
  </step>
</process>

## Error Handling

| Scenario | Action |
|----------|--------|
| No Lark content provided | Ask user to paste or provide link |
| Gate 3 fails | Block with clarification message for Techlead — never proceed |
| Active sprint exists | Offer resume or new sprint |
| Figma links inaccessible | Flag as Gate 3 failure item |
| API contract missing | Flag if FE/BE coordination needed |
| User story reference missing | Flag — cannot implement without source of truth |

<success_criteria>
- [ ] Sprint workspace created with STATE.md, SPECS.md, ROADMAP.md
- [ ] Gate 3 verified — all checks pass or failures flagged to Techlead
- [ ] Deliverables list matches FE role expectations
- [ ] Success criteria defined and traceable to user stories
- [ ] STOP mechanism reminder included
- [ ] User informed of next steps
</success_criteria>
