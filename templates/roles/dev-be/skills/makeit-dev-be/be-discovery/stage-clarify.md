---
name: be-stage-clarify
description: BE sprint entry point — receive Techlead tasks, verify Gate 3 input, extract API contracts, identify schema changes, create sprint workspace
---

<purpose>
Transform Techlead task assignments into a structured sprint workspace with Gate 3 verification — extracting API contracts, schema requirements, and security considerations before BE implementation begins.
</purpose>

<required_reading>
@_shared/references/quality-gates.md
@_shared/references/coding-standards.md
@be-planning/stage-plan-phase.md
</required_reading>

<rules>
1. Gate 3 is mandatory — never skip input verification
2. BA user stories are source of truth — always cross-check with story AC
3. API contracts required — identify endpoints before implementation
4. Schema changes flagged — identify DB migration needs upfront
5. Security requirements extracted — auth, authz, input validation
6. Sprint workspace is ephemeral — process files don't get committed, only deliverables
</rules>

<output>
Sprint workspace → `.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/`
- `STATE.md` — sprint state tracking
- `SPECS.md` — deliverables + success criteria
- `ROADMAP.md` — phased execution plan
- `deliverables/` — output folder
- `phases/` — phase execution folders

Gate 3 verification report
</output>

<process>
  <step name="receive_tasks">
    Ask user for Techlead task assignments (paste, Lark link, or structured input).
    Extract key fields: Task ID, linked user story, API contracts needed,
    DB changes needed, priority/timeline, dependencies (FE, other services).
  </step>

  <step name="read_incoming_handoff">
    Read incoming HANDOFF.md from TL (fixed sender):

    1. Check for TL handoff:
       ```bash
       cat .makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md 2>/dev/null
       ```
    2. If found:
       - Parse the `## BE Developer` section specifically (ignore ## FE Developer)
       - Extract: BE task list, API contracts, DB changes, security requirements
       - Use deliverable paths to read TL task breakdowns via `view_file`
       - Use external links for Lark references
       - This provides routing context for what TL expects BE to implement
    3. If NOT found:
       - Tell user: "No handoff found from TL. Ask TL to run `/makeit:complete` first, or proceed with Lark input only."
       - Continue with Lark-based clarification (backward compatible)
    4. Create own role subfolder for this sprint:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/be/
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
       - tags contain "backend" OR type IN (api, schema, integration, pattern, lesson)

       Select 3-5 most relevant docs based on:
       - Matching tags with current sprint topic
       - Recent updates (freshness)
       - High confidence scores
       - Related category/type for BE role

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
    🔒 Gate 3 = BE's entry gate. Do NOT proceed to implementation until Gate 3 passes.

    **Task Clarity Checks:**
    | # | Check Item | Status |
    |---|-----------|--------|
    | 1 | Task break rõ ràng: BE scope tách biệt FE | ✅/❌ |
    | 2 | Scope cụ thể: endpoints, tables, logic rõ ràng | ✅/❌ |
    | 3 | User story reference linked to BA story | ✅/❌ |
    | 4 | Technical constraints documented | ✅/❌ |
    | 5 | API contract defined or design needed | ✅/❌ |
    | 6 | Estimation hợp lý | ✅/❌ |

    **Security Checks:**
    | # | Check Item | Status |
    |---|-----------|--------|
    | 7 | Authentication requirements defined | ✅/❌ |
    | 8 | Authorization/role requirements clear | ✅/❌ |
    | 9 | Data sensitivity level identified | ✅/❌ |

    **Gate 3 Verdict:**
    - ALL PASS → Continue to next step
    - HAS FAILURES → Generate clarification message for Techlead, block progress
  </step>

  <step name="discover_context">
    Run context discovery workflow to gather existing BE context:
    - @be-discovery/workflows/discover-be-context.md

    Scans: ORM/DB patterns, auth middleware, error handling, service layer, API versioning, migrations, testing, env config.

    Save results to sprint workspace:
    `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md`

    > This snapshot is reusable across all phases in this sprint.
    > Only re-run if sprint scope changes significantly.
    > Copy template from `@be-discovery/templates/CODEBASE-SNAPSHOT.md`
  </step>

  <step name="create_workspace">
    After Gate 3 passes, create sprint folder structure:

    Workspace template: @be-discovery/templates/SPRINT-TEMPLATE.md

    ```
    .makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/
    ├── STATE.md          ← from @be-discovery/templates/STATE-TEMPLATE.md
    ├── SPECS.md          ← from @be-discovery/templates/SPECS-TEMPLATE.md
    ├── ROADMAP.md        ← from @be-discovery/templates/ROADMAP-TEMPLATE.md
    ├── deliverables/     ← output folder (api/, schema/ subdirs)
    └── phases/           ← phase execution folders
    ```
  </step>

  <step name="populate_specs">
    Fill SPECS.md with extracted task data:
    1. Sprint metadata — ID, goal, dates, role (Dev BE)
    2. Deliverables list — API implementations, DB migrations, tests, API docs
    3. Success criteria — API contracts match, tests pass, security checked, migrations reversible
    4. Constraints — from Techlead task notes
    5. References — User story links, API contracts, Lark task IDs
  </step>

  <step name="populate_roadmap">
    Create phased execution plan. BE typical phases:
    - Phase 1: API Design + Schema Design → contracts + schema docs
    - Phase 2: Implementation → working code per layer
    - Phase 3: Quality Assurance → self-review + Gate 4 verification

    Adjust phases based on task complexity.
  </step>

  <step name="initialize_state">
    Populate STATE.md with sprint ID, goal, Phase 1 set to `pending`,
    all other phases listed as `pending`, session continuity section initialized.
  </step>

  <step name="present_summary">
    Display sprint workspace summary with Gate 3 status, deliverables expected,
    workspace path. Suggest: `/makeit:plan-phase`.
  </step>
</process>

## ⚠️ STOP Mechanism

If during clarify, user mentions any of these → STOP and confirm:
- Existing shared database changes
- Production environment modifications
- Dropping/deleting data structures

```
⚠️ STOP — Destructive operation detected during clarify
Action: [Description]
Impact: [What could be affected]
→ Confirm "proceed" to continue
```

## Error Handling

| Scenario | Action |
|----------|--------|
| No task provided | Ask user to paste or provide Lark link |
| Gate 3 fails | Block with clarification message for Techlead |
| Active sprint exists | Offer resume or new sprint |
| User story missing | Flag as Gate 3 failure — cannot start without BA story |
| API contract unclear | Flag, suggest `/makeit:plan-phase` to start with API design |

<edge_cases>

**Khi phát hiện BA story có acceptance criteria sai (không chỉ thiếu mà là incorrect):** Không chỉ check completeness — kiểm tra xem AC có mâu thuẫn nhau không, có khớp với PO intent không. Nếu phát hiện AC sai → flag riêng biệt với "incomplete", gửi clarification cụ thể cho BA/Techlead.

**Khi phát hiện TL task breakdown sai (wrong layer ordering, missing service dependency, incorrect API design):** Gate 3 check task *clarity* nhưng cũng cần assess *correctness*. Nếu thấy dependency bị thiếu hoặc layer ordering sai → flag và đề xuất adjustment cụ thể cho Techlead thay vì chấp nhận task as-is.

</edge_cases>

<success_criteria>
- [ ] Sprint workspace created with STATE.md, SPECS.md, ROADMAP.md
- [ ] Gate 3 verified — all checks pass or failures flagged
- [ ] Deliverables list matches BE role expectations
- [ ] API/DB/security requirements identified
- [ ] User informed of next steps
</success_criteria>
