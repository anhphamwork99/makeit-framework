---
name: tl-review-code
description: TL reviews Dev PR — check code quality, approve/reject, merge, deploy, handoff to PO
---

<purpose>
TL Mode 2 workflow: Receive Dev PR(s), perform code review using standard checklist, make approve/reject decision, merge approved PRs, deploy to staging, and create handoff for PO to review deployed results.

This is the quality gate between Dev implementation and PO result review. TL ensures code quality so PO only reviews deployed outcomes, not code.
</purpose>

<required_reading>
- `@tl-execution/templates/code-review.md` — Code review checklist template
- `@tl-lifecycle/templates/handoff-to-po.md` — TL → PO handoff template (Mode 2)
- `@_shared/references/quality-gates.md` — Gate 5a standards
</required_reading>

<rules>
1. Always use code-review.md checklist — never skip sections
2. Present review summary to TL before taking action — HITL at decision gate
3. Never auto-merge — TL must explicitly approve
4. Never auto-deploy — prompt user for deploy command or staging URL
5. If merge conflicts exist — flag to user, do NOT auto-resolve
6. Separate reviews for separate PRs (FE + BE)
</rules>

<process>
  <step name="receive_pr_context">
    Read Dev handoff to get PR context:

    1. Check for Dev handoff files:
       - FE: `.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md`
       - BE: `.makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md`
    2. Extract from each handoff:
       - PR link(s) or branch name
       - Self-review summary (what was implemented, decisions, known issues)
       - Story/task references
    3. If no PR link provided: review commit diff instead

    Display:
    ```
    📋 PR(s) to Review

    | # | Source | PR / Branch | Description |
    |---|--------|-------------|-------------|
    | 1 | Dev FE | #{NNN} or branch | {brief} |
    | 2 | Dev BE | #{NNN} or branch | {brief} |

    📄 Dev Self-Review Summary:
    {summary from handoff}
    ```
  </step>

  <step name="code_review">
    For each PR, perform code review using `@tl-execution/templates/code-review.md`:

    1. **Architecture Compliance** (4 checks):
       - Code structure follows established patterns
       - New patterns discussed/approved
       - Dependencies justified
       - Separation of concerns correct

    2. **Coding Standards** (4 checks):
       - Naming conventions consistent
       - Error handling appropriate
       - No debug logs/commented code
       - Commit messages follow format

    3. **AI-Generated Code Oversight** (4 checks):
       - AI output reviewed, not raw paste
       - Logic complete (no stubs)
       - Edge cases handled
       - No hallucinated imports

    4. **Performance Considerations**:
       - Bottleneck identification
       - Optimization opportunities

    5. **Security Considerations**:
       - SQL injection, XSS, auth bypass checks
       - Sensitive data exposure checks

    Fill out the code-review.md template for each PR.
  </step>

  <step name="decision_gate">
    Present review summary to TL and ask for decision:

    ```
    📊 Code Review Summary

    | PR | Checks Passed | Issues Found | Verdict |
    |----|---------------|--------------|---------|
    | #{NNN} (FE) | 10/12 | 2 minor | 🟡 |
    | #{NNN} (BE) | 12/12 | 0 | ✅ |

    🔍 Issues Found:
    1. [PR#{NNN}] {issue description} — severity: {minor/major/critical}
    2. [PR#{NNN}] {issue description} — severity: {minor/major/critical}

    What would you like to do?
    - **Approve** — merge and proceed to deploy
    - **Request changes** — send feedback to Dev
    - **Reject** — document reason and notify Dev
    ```

    **If "Approve"** → proceed to merge step
    **If "Request changes"** →
    - Create feedback list with specific file/line references
    - Save code review feedback to `.makeit/sprint/SPRINT-{NNN}/tl-review/`
    - Notify Dev: "Changes requested — review feedback at {path}"
    - ⏸️ PAUSE — wait for Dev to fix and re-submit
    **If "Reject"** →
    - Document rejection reason
    - Notify Dev with detailed explanation
    - ⏸️ PAUSE — escalation may be needed
  </step>

  <step name="merge_pr">
    If approved, merge PR(s):

    1. Check for merge conflicts first:
       ```
       ⚠️ If merge conflicts detected:
       Flag to user — do NOT auto-resolve.
       "PR #{NNN} has merge conflicts. Please resolve manually before continuing."
       ```
    2. Suggest merge approach:
       ```
       Ready to merge:
       - PR #{NNN} (FE) — suggest: squash merge
       - PR #{NNN} (BE) — suggest: squash merge

       Please merge via GitHub UI or:
       git checkout main
       git merge --squash {branch}
       git commit -m "feat: {description}"
       git push
       ```
    3. Wait for user confirmation that PR(s) are merged.
  </step>

  <step name="deploy">
    Prompt user for deployment (from CONTEXT.md Decision #12 — deploy method is flexible):

    ```
    🚀 Deploy to Staging

    PR(s) merged. Please deploy to staging:
    - Run your deploy command, OR
    - Provide the staging URL if auto-deployed

    Staging URL: _______________
    ```

    Wait for user to provide staging URL or confirm deployment.
    Agent does NOT auto-deploy — this is always a human action.
  </step>

  <step name="handoff_to_po">
    Generate TL → PO handoff using `@tl-lifecycle/templates/handoff-to-po.md`:

    1. Fill template with:
       - Sprint info (number, date, Lark link)
       - "What I've Done" checklist (PRs reviewed, merged, deployed)
       - "For PO Review" table (features + staging URLs + acceptance criteria)
       - "Tasks For Receiver" (PO review tasks)
       - Code review summary (PR status + findings)
       - Links (staging URL, PR links, Lark issue)
       - Gate 5a status checklist

    2. Save handoff to `.makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md`

    3. Inform TL:
       ```
       ✅ Code Review Complete

       📄 Handoff created: .makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md
       💡 Next: Run `/makeit:complete` to commit handoff and notify PO.
       ```
  </step>
</process>

<edge_cases>

**Multiple Dev PRs (FE + BE):** Review each PR separately using its own code-review.md instance. Merge each individually. Deploy once after all PRs merged. Single handoff to PO covers all PRs.

**PR has merge conflicts:** Flag to user immediately. Do NOT auto-resolve. User must resolve conflicts before TL can proceed with merge.

**No PR (direct push):** Review commit diff instead of PR diff. Same checklist applies. Note in review: "Reviewed via commit diff — no PR available."

**Dev re-submits after changes requested:** Re-run code review from step 2. Focus on previously flagged issues. If all resolved → proceed to approve/merge.

**Partial approval (1 PR approved, 1 needs changes):** Merge approved PR. Send feedback for the other. Wait for fix before deploying. Deploy only when all PRs are merged.

</edge_cases>

<success_criteria>
- [ ] PR context read from Dev handoff
- [ ] Code review completed using code-review.md checklist
- [ ] Decision presented to TL (HITL — not auto-decided)
- [ ] PR(s) merged (user confirmed)
- [ ] Deployed to staging (user provided URL)
- [ ] TL → PO handoff created with staging URL + ACs
</success_criteria>
