---
name: fe-workflow-fix-feedback
description: Internal FE workflow — address review comments on PR from Designer and Techlead
---

> 🔄 **Part of PR Iteration Lifecycle** (not Sprint Lifecycle).
> Triggered by review feedback on PR, after `/makeit:complete` creates the PR.
> PR Iteration = load comments → fix → re-verify → request re-review (max 3 rounds).

<purpose>
Process and fix review feedback on FE Pull Requests — prioritize comments, fix issues, re-verify, and update PR.
</purpose>

<context>
Internal workflow — called by `stage-complete.md` when feedback received, NOT a standalone command.
Max 3 review rounds before escalation.
</context>

<rules>
1. Fix critical + important first — nice-to-have can wait
2. Re-verify after fixes — run self-review + compare-ui again
3. Max 3 rounds — escalate if feedback loop continues
4. STOP before force-push — always ask user
5. Respond to ALL comments — even if "won't fix" with reason
</rules>

<process>
  <step name="load_feedback">
    1. Gather PR review comments
    2. Categorize by priority:
       - 🔴 Critical — blocks merge, must fix
       - 🟡 Important — should fix before merge
       - 🟢 Nice-to-have — can address in follow-up
    3. Categorize by reviewer:
       - Designer feedback → focus on visual/UI issues
       - Techlead feedback → focus on code quality/architecture
  </step>

  <step name="fix_issues">
    For each critical/important item:
    1. Understand the feedback
    2. Apply fix
    3. Self-verify the fix
    4. Respond to the comment with what was changed
  </step>

  <step name="re_verify">
    After all fixes:
    - Run self-review on changed files
    - Run compare-ui if visual changes were made
    - Ensure no regressions introduced
  </step>

  <step name="update_pr">
    ⚠️ STOP before push.
    Push fixes with commit:
    ```
    fix(fe): address review feedback round {N}
    ```
    Update PR description if scope changed.
  </step>

  <step name="check_round_limit">
    If round ≥ 3 → escalate to user: "3 review rounds completed. Schedule sync meeting?"
  </step>
</process>
