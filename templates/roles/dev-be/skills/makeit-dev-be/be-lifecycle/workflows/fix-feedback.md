---
name: be-workflow-fix-feedback
description: BE fix feedback workflow — address review comments with prioritized fixes and re-verification
---

> 🔄 **Part of PR Iteration Lifecycle** (not Sprint Lifecycle).
> Triggered by review feedback on PR, after `/makeit:complete` creates the PR.
> PR Iteration = load comments → fix → re-verify → request re-review (max 3 rounds).

<purpose>
Fix review comments from reviewer — load, prioritize, fix, and re-verify before requesting re-review.
</purpose>

<process>
  <step name="load_comments">
    1. Read PR review comments (user paste or link)
    2. Identify all items needing fix
    3. Categorize by priority:
       - 🔴 Critical: security, logic error, data loss → fix immediately
       - 🟡 Important: missing validation, poor naming → fix this round
       - 🟢 Nice-to-have: formatting, minor improvements → fix if time
  </step>

  <step name="fix_comments">
    1. Address critical items first
    2. Commit each fix separately: `fix: [description from review]`
    3. Reply reasoning for each comment (if needed)
    4. Mark comments as resolved
  </step>

  <step name="re_verify">
    1. Run self-review checklist (quick check)
    2. Verify fixes don't break existing functionality
    3. Update PR description if significant changes
  </step>

  <step name="output">
    Generate reply template:
    ```
    ✅ Review feedback addressed: [Feature name]
    Fixed:
    - [Comment 1]: [How fixed]
    - [Comment 2]: [How fixed]
    Ready for re-review.
    ```
  </step>
</process>
