---
name: ba-stage-clarify
description: BA sprint entry point — read Lark Sprint issue, verify PO+Designer input (Gate 1), create sprint workspace with SPECS.md + ROADMAP.md + STATE.md
---

<purpose>
Transform raw Lark Sprint issue into a structured sprint workspace with Gate 1 verification, creating SPECS.md, ROADMAP.md, and STATE.md before BA work begins.
</purpose>

<required_reading>
@_shared/references/quality-gates.md
@ba-verification/templates/spec-verification.md
@ba-discovery/templates/SPRINT-TEMPLATE.md
@ba-discovery/templates/SPECS-TEMPLATE.md
@ba-discovery/templates/ROADMAP-TEMPLATE.md
@ba-discovery/templates/STATE-TEMPLATE.md
@ba-discovery/templates/PRODUCT-CONTEXT.md
@ba-planning/stage-plan-phase.md
@ba-planning/stage-discuss-phase.md
</required_reading>

<rules>
1. Gate 1 is mandatory — never skip input verification
2. BA-specific deliverables — always include user stories, flows, edge cases
3. Figma links required — BA cannot work without design reference
4. PO goal traceability — every spec must trace back to PO goal
5. Sprint workspace is ephemeral — process files don't get committed, only deliverables
</rules>

<output>
Sprint workspace → `.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/`

Workspace structure: @ba-discovery/templates/SPRINT-TEMPLATE.md
- `STATE.md` — from @ba-discovery/templates/STATE-TEMPLATE.md
- `SPECS.md` — from @ba-discovery/templates/SPECS-TEMPLATE.md
- `ROADMAP.md` — from @ba-discovery/templates/ROADMAP-TEMPLATE.md
- `PRODUCT-CONTEXT.md` — from @ba-discovery/templates/PRODUCT-CONTEXT.md
- `deliverables/` — output folder
- `phases/` — phase execution folders

Gate 1 verification report → `@ba-verification/templates/spec-verification.md`
</output>

<process>
  <step name="receive_sprint_issue">
    Ask user for Lark Sprint issue content (paste, URL, or structured input).
    Extract key fields: Sprint ID, sprint goal, feature/epic name, PO goal + context,
    designer deliverables (Figma links), priority/timeline, constraints.
  </step>

  <step name="read_incoming_handoff">
    Read incoming HANDOFF.md from PO (fixed sender):

    1. Check for PO handoff:
       ```bash
       cat .makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md 2>/dev/null
       ```
    2. If found:
       - Parse summary, deliverable paths, external links (Figma, Lark)
       - Use deliverable paths to read context files via `view_file`
       - Use external links for Figma, Lark references
       - This provides routing context for what PO expects BA to produce
    3. If NOT found:
       - Tell user: "No handoff found from PO. Ask PO to run `/makeit:complete` first, or proceed with Lark input only."
       - Continue with Lark-based clarification (backward compatible)
    4. Create own role subfolder for this sprint:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/ba/
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
       - category IN (business, architecture)
       - type IN (rule, glossary, journey, feature, adr)

       Select 3-5 most relevant docs based on:
       - Matching tags with current sprint topic
       - Recent updates (freshness)
       - High confidence scores
       - Related category/type for BA role

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

  <step name="verify_gate_1">
    🔒 Gate 1 = BA's entry gate. Do NOT proceed to story breakdown until Gate 1 passes.

    Run Gate 1 verification against PO+Designer inputs.

    **Design Output Checks:**
    | # | Check Item | Status |
    |---|-----------|--------|
    | 1 | Screens marked "Ready for Dev" in Figma | ✅/❌ |
    | 2 | All interaction states defined (hover, active, disabled, error, empty, loading) | ✅/❌ |

    > 💡 Design tokens consistency và copy/text finalization là **Designer responsibility** — đã verify qua `mark-ready` trước khi mark "Ready for Dev".

    **PO Backlog Checks:**
    | # | Check Item | Status |
    |---|-----------|--------|
    | 3 | Goal clear — PO describes business objective | ✅/❌ |
    | 4 | Context complete — background, user needs, constraints | ✅/❌ |
    | 5 | Priority + sprint confirmed in Lark | ✅/❌ |

    **Gate 1 Verdict:**
    - ALL PASS → Continue to next step
    - HAS FAILURES → Generate clarification message, block progress

    Fill `@ba-verification/templates/spec-verification.md` with Gate 1 results.
  </step>

  <step name="discover_context">
    Run context discovery workflow to gather existing product + BA context:
    - @ba-discovery/workflows/discover-product-context.md

    Scans: existing stories, journey maps, AC patterns, PO context, codebase features.

    Save results to sprint workspace:
    `.makeit/sprint/SPRINT-{NNN}/PRODUCT-CONTEXT.md`

    > This snapshot is reusable across all phases in this sprint.
    > Only re-run if sprint scope changes significantly.
    > Copy template from `@ba-discovery/templates/PRODUCT-CONTEXT.md`
  </step>

  <step name="create_workspace">
    After Gate 1 passes, create sprint folder structure:
    ```
    .makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/
    ├── STATE.md          ← from STATE-TEMPLATE
    ├── SPECS.md          ← from SPECS-TEMPLATE
    ├── ROADMAP.md        ← from ROADMAP-TEMPLATE
    ├── deliverables/     ← output folder
    └── phases/           ← phase execution folders
    ```
  </step>

  <step name="populate_specs">
    Fill SPECS.md with extracted sprint data:
    1. Sprint metadata — ID, goal, dates, role (BA)
    2. Deliverables list — user stories, user flow docs, edge case analysis, Figma analysis
    3. Success criteria — SC1-SC6 covering PO goals, AC quality, flows, edge cases, Figma links, Gate 2
    4. Constraints — from Lark issue
    5. References — Figma links, Lark task IDs, PO goal docs
  </step>

  <step name="map_po_goals">
    Create **PO Goal → Story Traceability Matrix** from extracted sprint data:

    | PO Goal | Expected Stories | Expected TL Tasks | Figma Ref |
    |---------|-----------------|-------------------|-----------|
    | [Goal 1 from PO handoff] | US-001, US-002 | FE: 2, BE: 3 | [Figma link] |
    | [Goal 2 from PO handoff] | US-003 | FE: 1, BE: 1 | [Figma link] |

    **Purpose:** Every PO goal must map to at least one story. Stories without a goal are scope creep. Goals without stories are gaps.

    Save matrix in SPECS.md under "## Traceability Matrix" section.
    This matrix is the foundation for bi-directional linking: PO Goal ↔ BA Story ↔ TL Task.
  </step>

  <step name="populate_roadmap">
    Create phased execution plan. BA typical phases:
    - Phase 1: Design Analysis → Figma analysis report
    - Phase 2: Story Creation → user stories + user flow docs
    - Phase 3: Quality Assurance → edge case analysis + Gate 2 verification

    Adjust phases based on sprint complexity.
  </step>

  <step name="initialize_state">
    Populate STATE.md with sprint ID, goal, Phase 1 set to `pending`,
    all other phases listed as `pending`, session continuity section initialized.
  </step>

  <step name="present_summary">
    Display sprint workspace summary with Gate 1 status, deliverables expected,
    workspace path. Suggest: `/makeit:plan-phase` or `/makeit:discuss-phase`.
  </step>
</process>

## Error Handling

| Scenario | Action |
|----------|--------|
| No Lark content provided | Ask user to paste or provide link |
| Gate 1 fails | Block with clarification message — never proceed |
| Active sprint exists | Offer resume or new sprint |
| Figma links inaccessible | Flag as Gate 1 failure item |
| PO goal missing | Flag as Gate 1 failure — cannot start without business context |

<edge_cases>

**Khi đã có active sprint từ session khác:** Kiểm tra `.makeit/sprint/` cho STATE.md chưa complete. Nếu tìm thấy → hỏi user: "Đã có sprint đang chạy. Resume sprint cũ hay tạo mới?" Không tạo workspace mới mà không xác nhận.

**Khi PO goal mơ hồ hoặc mâu thuẫn nhau:** Nếu goal chứa từ ngữ không rõ ràng ("cải thiện", "tối ưu" mà không có metric) hoặc 2 goals conflict → ⚠️ STOP — Không thể tạo SPECS.md với goal mơ hồ. Yêu cầu PO clarify trước khi tiếp tục. Log vào STATE.md: "PO goal ambiguity detected at clarify stage"

**Khi Figma design pass Gate 1 tổng thể nhưng thiếu screens cụ thể:** Nếu một số screens/flows chưa đủ states (hover, error, empty, loading) → ghi nhận vào SPECS.md mục "Known Design Gaps", tiếp tục với các screens đã đủ. Flag cho Designer qua Telegram: "Screens X, Y thiếu states — BA sẽ làm trước phần đã ready."

**Khi Figma MCP tools fail hoặc return lỗi:** Fallback sang manual: yêu cầu user share screenshot hoặc paste Figma content. Ghi nhận trong Gate 1 report: "MCP unavailable — verified manually." Không block sprint vì MCP fail — design verification vẫn có thể làm manual.

**Khi knowledge base chứa thông tin contradicts sprint context hiện tại:** Nếu KB docs (ADR, business rules) conflict với PO goal mới → flag conflict cho user: "KB doc [{id}] nói X, nhưng PO goal nói Y. Dùng approach nào?" Không tự quyết định — PO goal hierarchy cao hơn nhưng cần confirm.

</edge_cases>

<success_criteria>
- [ ] Sprint workspace created with STATE.md, SPECS.md, ROADMAP.md
- [ ] Gate 1 verified — all checks pass or failures flagged
- [ ] Deliverables list matches BA role expectations
- [ ] Success criteria defined and traceable to PO goals
- [ ] User informed of next steps
</success_criteria>
