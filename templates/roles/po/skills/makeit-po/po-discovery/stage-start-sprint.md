---
name: po-stage-start-sprint
description: PO sprint entry point — detect mode (backlog creation or PR review), create sprint workspace with SPECS.md + ROADMAP.md + STATE.md, verify Gate 1 sender-side
---

<purpose>
Transform raw Lark Sprint issue into a structured sprint workspace. PO dual-mode: detect if this is Backlog Creation (Mode 1 = full lifecycle) or PR Review (Mode 2 = streamlined lifecycle). Verify PO's own Gate 1 items (sender-side) before handoff.
</purpose>

<required_reading>
@_shared/references/quality-gates.md
@_shared/references/team-workflow.md
@po-planning/stage-plan-phase.md
</required_reading>

<rules>
1. Dual-mode detection — determine Mode 1 (Backlog Creation) or Mode 2 (PR Review) from input
2. Gate 1 sender-side — PO checks items 3-5 (goal, context, priority) before handoff
3. PO goal traceability — every spec must trace back to business objective
4. Sprint workspace is ephemeral — process files don't get committed, only deliverables
5. AI Verification — AI drafts, PO reads and evaluates. Never auto-approve.
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
    Extract key fields: Sprint ID, feature/epic name, priority/timeline, constraints.
  </step>

  <step name="read_incoming_handoff">
    Read incoming HANDOFF.md from FE and/or BE (for review mode):

    1. Check for FE handoff:
       ```bash
       cat .makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md 2>/dev/null
       ```
    2. Check for BE handoff:
       ```bash
       cat .makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md 2>/dev/null
       ```
    3. If either found (review mode):
       - Parse summaries, PR links, deliverable paths from both
       - Combine context for unified review
       - Use deliverable paths to read implementation details via `view_file`
       - This provides routing context for what FE/BE have delivered
    4. If neither found:
       - Likely Backlog Creation mode (Mode 1) — proceed normally
       - Or tell user: "No handoff found from FE/BE. If reviewing, ask FE/BE to run `/makeit:complete` first."
    5. Create own role subfolder for this sprint:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/po/
       ```

    > HANDOFF.md provides routing context. Lark provides task tracking details.
    > This step SUPPLEMENTS existing clarification flow — it does NOT replace Lark input.
    > For Mode 1 (Backlog Creation), handoff may not exist — that's expected.
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
       - category IN (business, operational)
       - type IN (feature, rule, journey, lesson)

       Select 3-5 most relevant docs based on:
       - Matching tags with current sprint topic
       - Recent updates (freshness)
       - High confidence scores
       - Related category/type for PO role

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

  <step name="define_sprint_goal">
    **Goal-first approach** — define the WHY before anything else.

    1. Ask PO: "What is the business objective for this sprint?"
    2. Frame goal as: "We want to [achieve X] so that [business benefit]"
    3. Validate goal is:
       - Specific enough to be actionable
       - Measurable with clear success criteria
       - Achievable within sprint timeframe
    4. If goal is too vague → ask clarifying questions
    5. If goal is too large → flag for potential splitting (handled in later step)

    > ⚠️ Do NOT proceed to other steps until sprint goal is clearly defined.
  </step>

  <step name="link_figma_designs">
    Check if Designer has provided Figma designs for this sprint:

    1. Search Sprint Issue for Figma links
    2. If found:
       - Note screen references and Figma URLs
       - Will be included in SPECS.md references section
       - Verify designs align with sprint goal
    3. If not found:
       - Flag as dependency: "⏳ Waiting for Designer — Figma designs not yet linked"
       - Don't block PO work — continue with goal refinement
       - Add to SPECS.md as pending dependency

    > Designer marks screens "Ready for Dev" in Figma.
    > PO should verify designs align with sprint goal when available.
  </step>

  <step name="detect_mode">
    Determine PO operating mode based on input:

    **Mode 1 — Backlog Creation (Stage 1):**
    - Input mentions: new feature, backlog item, goal, user need
    - Full 6-stage lifecycle: start-sprint → plan → execute → verify → verify-work → complete
    - Deliverables: backlog items, refined goals, acceptance criteria, sprint plan

    **Mode 2 — PR Review (Stage 5):**
    - Input mentions: PR review, code review, business logic check
    - Streamlined lifecycle: start-sprint → execute (review-pr) → complete
    - Deliverables: review feedback, approve/reject decisions

    Display detected mode to user for confirmation.
  </step>

  <step name="verify_gate_1_sender">
    🔒 PO sender-side verification — check PO's own output items before handoff.

    **PO Items (sender side — items 3-5):**
    | # | Check Item | Status |
    |---|-----------|--------|
    | 3 | Goal rõ ràng — PO mô tả mục tiêu business | ✅/❌ |
    | 4 | Context đầy đủ — background, user needs, constraints | ✅/❌ |
    | 5 | Priority xác định — PO đã set priority và sprint | ✅/❌ |

    **Designer coordination (items 1-2):**
    Report status of Designer items. PO coordinates, doesn't directly verify.
    > Design tokens + copy/text → Designer self-check via `mark-ready`.
    > Figma links status: from `link_figma_designs` step above.

    **Verdict:**
    - ALL PASS → Continue to workspace creation
    - HAS FAILURES → Flag specific gaps, ask PO to provide missing info
  </step>

  <step name="refine_scope">
    With sprint goal defined and Figma context gathered:

    1. Refine goal into actionable scope
    2. Identify what's in-scope vs out-of-scope
    3. If goal is too large:
       - Suggest splitting (reference `manage-sprint-goal` workflow for split process)
       - PO decides which sub-goal to pursue this sprint
    4. Document refined scope for SPECS.md
  </step>

  <step name="discover_context">
    Run context discovery workflow to gather existing product context:
    - @po-discovery/workflows/discover-product-context.md

    Scans: existing features, sprint history, business metrics, user feedback.

    Save results to sprint workspace:
    `.makeit/sprint/SPRINT-{NNN}/PRODUCT-CONTEXT.md`

    > This snapshot is reusable across all phases in this sprint.
    > Only re-run if sprint scope changes significantly.
    > Copy template from `@po-discovery/templates/PRODUCT-CONTEXT.md`
  </step>

  <step name="create_workspace">
    After Gate 1 sender check, create sprint folder structure.
    Bootstrap instruction: `@po-discovery/templates/SPRINT-TEMPLATE.md`
    ```
    .makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/
    ├── STATE.md          ← from @po-discovery/templates/STATE-TEMPLATE.md
    ├── SPECS.md          ← from @po-discovery/templates/SPECS-TEMPLATE.md
    ├── ROADMAP.md        ← from @po-discovery/templates/ROADMAP-TEMPLATE.md
    ├── deliverables/     ← output folder
    └── phases/           ← phase execution folders
    ```
  </step>

  <step name="populate_specs">
    Fill SPECS.md with extracted sprint data:
    1. Sprint metadata — ID, goal, dates, role (PO)
    2. Mode — Backlog Creation or PR Review
    3. Sprint goal — from `define_sprint_goal` step
    4. Figma references — from `link_figma_designs` step
    5. Deliverables list:
       - Mode 1: backlog items, refined goals, sprint plan, acceptance criteria
       - Mode 2: review feedback, approve/reject decisions
    6. Success criteria — checkable, traceable to PO goals
    7. References — Figma links, Lark task IDs, PO goal docs
  </step>

  <step name="populate_roadmap">
    Create phased execution plan based on mode:

    **Mode 1 — Backlog Creation:**
    - Phase 1: Goal Refinement → refine goals, define acceptance criteria
    - Phase 2: Backlog Drafting → create backlog items with templates
    - Phase 3: Sprint Preparation → prioritize, create sprint plan, Gate 1 check

    **Mode 2 — PR Review:**
    - Phase 1: PR Context → load PR, user story, original PO goal
    - Phase 2: Business Logic Review → verify logic, AC met, edge cases

    Adjust phases based on sprint complexity.
  </step>

  <step name="initialize_state">
    Populate STATE.md with sprint ID, goal, mode, Phase 1 set to `pending`,
    all other phases listed as `pending`, session continuity section initialized.
  </step>

  <step name="present_summary">
    Display sprint workspace summary with mode detected, Gate 1 sender status,
    Figma design status, deliverables expected, workspace path.
    Suggest: `/makeit:plan-phase` for next step.
  </step>
</process>

## Error Handling

| Scenario | Action |
|----------|--------|
| No Lark content provided | Ask user to paste or provide link |
| Mode ambiguous | Present both options, ask user to choose |
| Gate 1 sender check fails | Flag missing PO items, ask for completion |
| Active sprint exists | Offer resume or new sprint |
| Designer status unknown | Flag as coordination item, don't block PO work |

<edge_cases>

**Khi Figma designs thay đổi SAU khi sprint đã bắt đầu và backlog items đã handoff cho BA:** Kiểm tra design timestamps vs sprint start date. Nếu designs updated → flag cho PO: "⚠️ Figma screens đã thay đổi — cần re-assess backlog items bị ảnh hưởng và notify BA."

**Khi 2 PO sessions hoặc PO + role khác cùng access sprint workspace đồng thời:** Kiểm tra STATE.md lock indicator trước khi ghi. Nếu phát hiện concurrent access → ⚠️ STOP — "Sprint workspace đang được sử dụng bởi session khác. Chờ hoàn tất hoặc coordinate qua Telegram." Log vào STATE.md.

**Khi Designer's Figma diverges từ PO's intended business goal (phát hiện tại link_figma_designs step):** So sánh design direction với sprint goal. Nếu misalignment → flag cho PO: "⚠️ Design direction khác với PO goal — cần PO quyết định: adjust goal hay request Designer update."

**Khi Lark Sprint Issue data có thể đã outdated (modified since last sync):** Hỏi PO xác nhận freshness: "Lark data này có phải phiên bản mới nhất không? Lần cuối update khi nào?" Nếu không chắc → yêu cầu PO verify trên Lark trước khi tạo sprint workspace.

</edge_cases>

<success_criteria>
- [ ] Mode detected (Backlog Creation or PR Review)
- [ ] Sprint workspace created with STATE.md, SPECS.md, ROADMAP.md
- [ ] Gate 1 sender-side verified (items 3-5)
- [ ] Deliverables list matches PO mode expectations
- [ ] AI Verification reminder: PO must read and evaluate outputs
- [ ] User informed of next steps
</success_criteria>
