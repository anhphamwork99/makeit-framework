---
name: tl-stage-complete
description: TL sprint complete — dual mode support (Mode 1: handoff to Dev FE/BE, Mode 2: handoff to PO)
---

<purpose>
Finalize TL sprint — detect current mode, package deliverables, sync to git, and create structured handoff:
- **Mode 1 (Task Breakdown):** Handoff task breakdowns, API contracts, estimations to Dev FE/BE
- **Mode 2 (Code Review):** Handoff reviewed/deployed results to PO for acceptance review
</purpose>

<required_reading>
- `.agent/skills/makeit-techlead/_shared/references/quality-gates.md` — Gate 3 (Mode 1) / Gate 5a (Mode 2) handoff standards
- `.agent/skills/makeit-techlead/_shared/references/team-workflow.md` — Handoff rules
</required_reading>

<rules>
1. Sprint must be "verified" before completion — check STATE.md
2. Git commit before handoff — never handoff uncommitted work
3. Stage files individually — never `git add .`
4. Handoff document required — receiver needs structured entry point
5. User approval required before git commit
6. Detect mode before proceeding — Mode 1 and Mode 2 have different templates and receivers
7. Lark Tasks at completion — create all tasks simultaneously via Lark MCP, IDs go into HANDOFF
</rules>

<output>
**Mode 1:**
- Git commit of all deliverables
- `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md` — Structured Dev FE/BE handoff
- Lark Tasks created for Dev FE/BE (or marked Pending if Lark MCP unavailable)
- Updated STATE.md (status → "complete")
- Telegram notification message for Dev FE/BE

**Mode 2:**
- Git commit of review artifacts
- `.makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md` — Structured PO handoff
- Lark Tasks created for PO (or marked Pending if Lark MCP unavailable)
- Updated STATE.md (status → "complete")
- Telegram notification message for PO
</output>

<process>
  <step name="detect_mode">
    Detect current mode from STATE.md or sprint context:

    - **Mode 1:** Sprint contains task breakdowns, API contracts, estimations → handing off to Dev FE/BE
    - **Mode 2:** Sprint contains code review results, merged PRs, staging URL → handing off to PO

    Indicators:
    - MODE keyword in STATE.md (if set during sprint)
    - Presence of code review files in `.makeit/sprint/SPRINT-{NNN}/tl-review/`
    - Sprint goal mentions "review" or "code review"
    - Handoff source was Dev (not BA)

    If ambiguous → ask TL:
    ```
    🔀 Which mode are you completing?
    1. Mode 1 — Task breakdown → handoff to Dev FE/BE
    2. Mode 2 — Code review → handoff to PO
    ```
  </step>

  <step name="verify_status">
    Read STATE.md → verify sprint is "verified" or "ready for completion".
    If not verified → warn: "Run /makeit:verify-work first"
  </step>

  <step name="package_deliverables">
    **Mode 1:** Collect deliverables from all phases:
    - Task breakdowns (FE tasks, BE tasks)
    - API contracts
    - Architecture decisions / solution designs
    - Estimation reports
    - Code review feedback (if any)

    **Mode 2:** Collect review artifacts:
    - Code review checklists (filled code-review.md)
    - PR approval records
    - Staging URL and deployment notes
    - Acceptance criteria mapping

    Verify all files are complete (not stubs).
  </step>

  <step name="git_sync">
    Stage deliverable files for commit:
    - Stage each file individually
    - Commit:
      - Mode 1: `feat(tl-sprint): complete SPRINT-NNN deliverables`
      - Mode 2: `feat(tl-review): complete SPRINT-NNN code review`
    - User approval required before commit
  </step>

  <step name="create_handoff">
    **Mode 1:** Generate Dev handoff document using existing template (`@tl-lifecycle/templates/handoff.md`):

    ```markdown
    # Techlead → Dev Handoff: SPRINT-{NNN}

    ## Sprint Summary
    - Goal: {sprint goal}
    - Stories covered: {N} stories → {N} FE tasks + {N} BE tasks
    - Total estimation: {N} days (risk-adjusted)

    ## FE Developer
    ### Your Tasks
    | # | Task | Story | Size | Priority |
    |---|------|-------|------|----------|
    ...

    ### Key Context
    - Design reference: {Figma links}
    - States to handle: {interaction states}
    - Responsive: {breakpoint requirements}

    ## BE Developer
    ### Your Tasks
    | # | Task | Story | Size | Priority |
    |---|------|-------|------|----------|
    ...

    ### Key Context
    - API contracts: {link to contracts}
    - Database changes: {schema changes}
    - Security: {auth requirements}

    ## API Contracts
    {Summary of all FE-BE coordination points}

    ## Architecture Decisions
    {Summary of key decisions — reference ADR files}

    ## Open Questions
    {Any remaining items for Dev to clarify}

    ## File Index
    - Task breakdowns: {path}
    - API contracts: {path}
    - Estimations: {path}
    ```

    **Mode 2:** Generate PO handoff document using `@tl-lifecycle/templates/handoff-to-po.md`:
    - Fill template with staging URLs, acceptance criteria, code review summary
    - See handoff-to-po.md for complete format
  </step>

  <step name="commit_handoff_to_git">
    Commit HANDOFF.md to product repo via Git:

    **Mode 1:**
    1. Create role subfolder:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/tl/
       ```
    2. Write filled HANDOFF.md to `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
       - Ensure `## FE Developer` and `## BE Developer` sections are clearly separated
       - Include Lark Sprint Issue link as reference in the handoff
    3. Git commit + push:
       ```bash
       cd {product_repo}
       git add .makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md
       git commit -m "handoff(tl): Sprint {NNN} — task breakdowns for {feature}"
       git push
       ```

    **Mode 2:**
    1. Create review subfolder:
       ```bash
       mkdir -p .makeit/sprint/SPRINT-{NNN}/tl-review/
       ```
    2. Write filled HANDOFF.md to `.makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md`
       - Include staging URL and acceptance criteria
       - Reference code review checklists
    3. Git commit + push:
       ```bash
       cd {product_repo}
       git add .makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md
       git commit -m "handoff(tl-review): Sprint {NNN} — code review complete for {feature}"
       git push
       ```

    4. Present commit for user approval before executing.

    > Lark link is included IN the HANDOFF.md as reference — no need to paste content to Lark.
  </step>

  <step name="create_lark_tasks">
    Reference: @_shared/skills/lark-task-helper/lark-task-reference.md

    Create Lark Tasks for receiver (via Lark MCP if available):

    **Mode 1:** Create tasks for Dev FE/BE based on task breakdown table
    - Extract tasks from HANDOFF.md "Tasks For Receiver" tables (FE + BE sections)
    - Title: task description from table
    - Assignee: Dev FE/BE display name (if known) or empty
    - Description: "Sprint SPRINT-{NNN} task from TL. See HANDOFF: .makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md"

    **Mode 2:** Create review tasks for PO based on acceptance criteria
    - Extract verification tasks from HANDOFF.md
    - Title: task description (e.g., "Review deployed feature: {name}")
    - Assignee: PO display name (if known) or empty
    - Description: "Sprint SPRINT-{NNN} task from TL. See HANDOFF: .makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md"

    Write Lark Task IDs back to HANDOFF task table.
    If Lark MCP fails: follow fallback pattern (mark Pending, log todo).
  </step>

  <step name="knowledge_extraction">
    **Optional** — Review sprint deliverables and suggest knowledge docs that would benefit the team.

    1. **Scan deliverables:** Look at what this sprint produced:
       - Architecture decisions made (→ ADR doc candidates)
       - Technical patterns established (→ pattern doc candidates)
       - System design changes (→ system-map update candidates)
       - API contract patterns (→ API doc candidates)

    2. **Suggest candidates:**
       ```
       📚 Knowledge Capture Suggestions:

       1. [type] {title} — {why this is worth capturing}
       2. [type] {title} — {why this is worth capturing}

       💡 Run `/makeit:create-doc` to capture any of these.
       Skip if nothing noteworthy — not every sprint produces knowledge.
       ```

    3. **DO NOT auto-create docs.** This step SUGGESTS only.
       - User decides what's worth capturing
       - Keeps knowledge quality high
       - Prevents "documentation fatigue"
  </step>

  <step name="update_state">
    **Mode 1:** Update STATE.md: sprint status → "complete, handed off to Dev FE/BE"
    **Mode 2:** Update STATE.md: sprint status → "complete, handed off to PO"
    Update Lark Sprint issue status (or provide manual update instructions).
  </step>

  <step name="draft_telegram">
    Generate Telegram notification message:

    **Mode 1:**
    ```
    ✅ TL Sprint SPRINT-{NNN} complete
    📦 Deliverables: {N} task breakdowns, {M} API contracts
    ✅ Handoff committed: .makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md
    📎 Sprint Issue: [Lark link]
    👉 @DevFE @DevBE — tasks ready for implementation. Run `/makeit:check-handoff` to review.
    📝 Estimation: {N} days total ({FE}d FE + {BE}d BE)
    ```

    **Mode 2:**
    ```
    ✅ TL Code Review SPRINT-{NNN} complete
    🔍 PRs reviewed: {N} PRs approved + merged
    🚀 Deployed to staging: {staging URL}
    ✅ Handoff committed: .makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md
    📎 Sprint Issue: [Lark link]
    👉 @PO — results deployed and ready for your review. Run `/makeit:check-handoff` to review.
    ```
  </step>
</process>

<edge_cases>

**Khi Dev reject handoff — task breakdown thiếu hoặc sai (Mode 1):** Nếu Dev trả lại với feedback cụ thể → phân loại: (1) missing context → bổ sung vào HANDOFF.md, (2) task gap → quay lại execute-phase fix, (3) scope dispute → escalate lên BA/PO. Re-handoff với changelog: "Updated: [items changed based on Dev feedback]."

**Khi handoff bị reject nhiều lần (>2 rounds ping-pong):** Nếu handoff đã bị reject >2 lần trên cùng items → ⚠️ STOP — Misaligned expectations giữa TL và receiver. Cần sync meeting (Telegram call hoặc Lark meeting) để align. Ghi nhận vào lesson-learned. Log vào STATE.md.

**Khi PO reject deployed result (Mode 2):** PO trả lại với specific ACs that failed → TL routes feedback back to Dev. Create new task for Dev to fix. This starts a new review cycle (Dev fix → TL re-review → re-deploy → PO re-review).

**Mode 2 partial deployment (only FE deployed, BE pending):** Wait for all components before creating PO handoff. PO needs to see complete feature, not partial. If blocked, flag in STATE.md and communicate delay.

</edge_cases>

<success_criteria>
- [ ] Mode detected correctly (Mode 1 or Mode 2)
- [ ] Sprint status verified as "verified"
- [ ] All deliverables packaged and committed to git
- [ ] Correct handoff template used (handoff.md for Mode 1, handoff-to-po.md for Mode 2)
- [ ] Correct git path used (tl/ for Mode 1, tl-review/ for Mode 2)
- [ ] Lark Tasks created (or marked Pending if Lark MCP unavailable)
- [ ] STATE.md updated to complete with correct receiver
- [ ] Lark Sprint issue updated (or instructions provided)
- [ ] Telegram notification message generated with correct receiver
</success_criteria>
