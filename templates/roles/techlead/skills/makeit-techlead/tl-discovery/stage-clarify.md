---
name: tl-stage-clarify
description: TL sprint entry — read Lark Sprint issue, verify Gate 2 (BA stories), bootstrap sprint workspace
---

<purpose>
Sprint entry point for Techlead. Reads the Lark Sprint issue, verifies BA stories pass Gate 2, and creates the sprint workspace with STATE.md, SPECS.md, and ROADMAP.md.
</purpose>

<required_reading>
- `.agent/skills/makeit-techlead/_shared/references/quality-gates.md` — Gate 2 (BA → TL) checklist
- `.agent/skills/makeit-techlead/_shared/references/team-workflow.md` — Stage 3 context
- `@tl-discovery/templates/SPRINT-TEMPLATE.md` — Sprint workspace bootstrap instructions
- `@tl-discovery/templates/STATE-TEMPLATE.md` — Template for STATE.md
- `@tl-discovery/templates/SPECS-TEMPLATE.md` — Template for SPECS.md
- `@tl-discovery/templates/ROADMAP-TEMPLATE.md` — Template for ROADMAP.md
- `@tl-discovery/templates/CODEBASE-SNAPSHOT.md` — Template for codebase snapshot
</required_reading>

<rules>
1. Must verify Gate 2 (BA → Techlead) BEFORE creating workspace
2. Do NOT break tasks until workspace exists — `clarify` is about understanding scope
3. Sprint workspace = STATE.md + SPECS.md + ROADMAP.md — all three required
4. If Gate 2 fails → stop, report gaps, suggest user contact BA
5. Cross-reference BA stories with design links — flag missing Figma references
</rules>

<output>
- `.makeit/sprint/SPRINT-{NNN}/STATE.md` — sprint tracking state
- `.makeit/sprint/SPRINT-{NNN}/SPECS.md` — extracted specs from Lark + BA stories
- `.makeit/sprint/SPRINT-{NNN}/ROADMAP.md` — phased execution plan
</output>

<process>
  <step name="read_lark_issue">
    1. User provides Lark Sprint issue (URL, ID, or pasted content)
    2. Extract: sprint goal, user stories, acceptance criteria, Figma links, priority
    3. Identify BA deliverables attached (stories, flows, edge cases)
  </step>

  <step name="read_incoming_handoff">
    Read incoming HANDOFF.md from BA (fixed sender):

    1. Check for BA handoff:
       ```bash
       cat .makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md 2>/dev/null
       ```
    2. If found:
       - Parse summary, deliverable paths, external links (Figma, Lark)
       - Use deliverable paths to read BA stories and flows via `view_file`
       - Use external links for Figma, Lark references
       - This provides routing context for what BA has delivered
    3. If NOT found:
       - Tell user: "No handoff found from BA. Ask BA to run `/makeit:complete` first, or proceed with Lark input only."
       - Continue with Lark-based clarification (backward compatible)
    4. Create own role subfolder for this sprint:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/tl/
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
       - category IN (architecture, technical)
       - type IN (adr, system-map, module, api, schema)

       Select 3-5 most relevant docs based on:
       - Matching tags with current sprint topic
       - Recent updates (freshness)
       - High confidence scores
       - Related category/type for Techlead role

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

  <step name="verify_gate2">
    Apply Gate 2 (BA → Techlead) checklist from `@_shared/references/quality-gates.md`:

    | # | Check Item | Status |
    |---|-----------|--------|
    | 1 | User story follows format: "As a [role], I want [action], so that [benefit]" | ✅/❌ |
    | 2 | Acceptance criteria listed (≥ 3 checkable items) | ✅/❌ |
    | 3 | Figma design link attached and accessible | ✅/❌ |
    | 4 | Edge cases documented (empty, error, boundary) | ✅/❌ |
    | 5 | Dependencies identified and status confirmed | ✅/❌ |
    | 6 | Source context: reference to PO Goal + Design specs | ✅/❌ |
    | 7 | Lark task has correct sprint, priority, and assignee | ✅/❌ |

    **If ANY item fails** → Report to user, suggest contacting BA. Do NOT proceed.
    **If ALL pass** → Continue to workspace creation.
  </step>

  <step name="discover_context">
    Run context discovery workflow to gather existing tech context:
    - @tl-discovery/workflows/discover-tech-context.md

    Scans: architecture, tech stack, code patterns (API, DB, auth, error handling, testing), folder conventions, ADRs.

    Save results to sprint workspace:
    `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md`

    > This snapshot is reusable across all phases in this sprint.
    > Only re-run if sprint scope changes significantly.
    > Copy template from `@tl-discovery/templates/CODEBASE-SNAPSHOT.md`
  </step>

  <step name="create_sprint_workspace">
    Create directory: `.makeit/sprint/SPRINT-{NNN}/`

    **STATE.md** — Sprint state tracking:
    - Sprint ID, goal, status (active)
    - Current phase, phase progress table
    - Input verification result (Gate 2)
    - Decisions log section

    **SPECS.md** — Extracted specifications:
    - Sprint goal (from PO/Lark)
    - User stories summary (from BA)
    - Figma links index
    - Technical constraints identified
    - Deliverable expectations (task breakdowns, API contracts, estimations)

    **ROADMAP.md** — Phased execution plan:
    - Phase breakdown based on scope analysis
    - Each phase: goal, deliverables, domain workflow
    - Suggested: story verification → solution design → task breakdown → estimation → assignment
  </step>

  <step name="present_result">
    Display sprint workspace summary:
    ```
    ✅ Sprint SPRINT-{NNN} created

    📋 Gate 2: PASSED ({N}/7 items verified)
    📁 Workspace: .makeit/sprint/SPRINT-{NNN}/
    📊 Phases: {N} phases planned
    🎯 Goal: {sprint goal}

    💡 Next: /makeit:discuss-phase or /makeit:plan-phase
    ```
  </step>
</process>

<edge_cases>

**Khi Figma design đã thay đổi so với BA stories (design update giữa chừng):** Nếu Gate 2 check thấy Figma screens không match với BA story descriptions → flag discrepancy: "Design screen X đã updated nhưng BA story vẫn reference version cũ." Yêu cầu BA re-verify stories vs design mới trước khi TL proceed. Không tự interpret design mới.

**Khi phát hiện BA spec thiếu hoặc mâu thuẫn tại Gate 2:** Nếu stories pass format check nhưng content có issues (AC conflict nhau, story thiếu critical scenario, acceptance criteria không testable) → fail Gate 2 với chi tiết cụ thể. Tag BA: "Gate 2 failed — Story X: [reason]." Không tự sửa stories — đó là BA responsibility.

**Khi BA stories quá lớn, cần span nhiều sprints:** Nếu scope analysis cho thấy stories cần foundational work ở sprint N và completion ở sprint N+1 → ghi nhận trong ROADMAP.md: "Phase N: Foundation (sprint này), Phase N+1: Completion (sprint sau)." Flag cho BA/PO: "Story X quá lớn cho 1 sprint — đề xuất split." Không tự split stories.

</edge_cases>

<success_criteria>
- [ ] Lark Sprint issue parsed and understood
- [ ] Gate 2 verified — all 7 items checked
- [ ] STATE.md created with sprint tracking
- [ ] SPECS.md created with extracted specifications
- [ ] ROADMAP.md created with phased plan
- [ ] User informed of next steps
</success_criteria>
