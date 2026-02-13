---
name: tl-stage-complete
description: TL sprint complete — package deliverables, git sync, create Dev FE/BE handoff
---

<purpose>
Finalize TL sprint — package all deliverables (task breakdowns, API contracts, estimations), sync to git, update Lark Sprint issue, and create structured handoff documents for Dev FE and Dev BE.
</purpose>

<required_reading>
- `.agent/skills/makeit-techlead/_shared/references/quality-gates.md` — Gate 3 handoff standards
- `.agent/skills/makeit-techlead/_shared/references/team-workflow.md` — Handoff rules
</required_reading>

<rules>
1. Sprint must be "verified" before completion — check STATE.md
2. Git commit before handoff — never handoff uncommitted work
3. Stage files individually — never `git add .`
4. Handoff document required — Dev needs structured entry point
5. Separate FE and BE handoff sections — different developers need different context
6. User approval required before git commit
</rules>

<output>
- Git commit of all deliverables
- `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md` in product repo — Structured Dev FE/BE handoff (sections: ## For FE, ## For BE)
- Updated STATE.md (status → "complete")
- Telegram notification message
</output>

<process>
  <step name="verify_status">
    Read STATE.md → verify sprint is "verified" or "ready for completion".
    If not verified → warn: "Run /makeit:verify-work first"
  </step>

  <step name="package_deliverables">
    Collect deliverables from all phases:
    - Task breakdowns (FE tasks, BE tasks)
    - API contracts
    - Architecture decisions / solution designs
    - Estimation reports
    - Code review feedback (if any)
    Verify all files are complete (not stubs).
  </step>

  <step name="git_sync">
    Stage deliverable files for commit:
    - Stage each file individually
    - Commit: `feat(tl-sprint): complete SPRINT-NNN deliverables`
    - User approval required before commit
  </step>

  <step name="create_handoff">
    Generate Dev handoff document:

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
  </step>

  <step name="commit_handoff_to_git">
    Commit HANDOFF.md to product repo via Git:

    1. Create role subfolder in shared sprint folder:
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
    4. Present commit for user approval before executing.

    > Lark link is included IN the HANDOFF.md as reference — no need to paste content to Lark.
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
    Update STATE.md: sprint status → "complete, handed off to Dev FE/BE"
    Update Lark Sprint issue status (or provide manual update instructions).
  </step>

  <step name="report">
    Display completion summary and generate Telegram message:
    ```
    ✅ TL Sprint SPRINT-{NNN} complete
    📦 Deliverables: {N} task breakdowns, {M} API contracts
    ✅ Handoff committed: .makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md
    📎 Sprint Issue: [Lark link]
    👉 @DevFE @DevBE — tasks ready for implementation. Run `/makeit:check-handoff` to review.
    📝 Estimation: {N} days total ({FE}d FE + {BE}d BE)
    ```
  </step>
</process>

<edge_cases>

**Khi Dev reject handoff — task breakdown thiếu hoặc sai:** Nếu Dev trả lại với feedback cụ thể → phân loại: (1) missing context → bổ sung vào HANDOFF.md, (2) task gap → quay lại execute-phase fix, (3) scope dispute → escalate lên BA/PO. Re-handoff với changelog: "Updated: [items changed based on Dev feedback]."

**Khi handoff bị reject nhiều lần (>2 rounds ping-pong):** Nếu handoff đã bị reject >2 lần trên cùng items → ⚠️ STOP — Misaligned expectations giữa TL và Dev. Cần sync meeting (Telegram call hoặc Lark meeting) để align. Ghi nhận vào lesson-learned: "Handoff standards cần được clarify giữa TL và Dev." Log vào STATE.md.

</edge_cases>

<success_criteria>
- [ ] Sprint status verified as "verified"
- [ ] All deliverables packaged and committed to git
- [ ] HANDOFF.md created with FE and BE sections
- [ ] STATE.md updated to complete
- [ ] Lark Sprint issue updated (or instructions provided)
- [ ] Telegram notification message generated
</success_criteria>
