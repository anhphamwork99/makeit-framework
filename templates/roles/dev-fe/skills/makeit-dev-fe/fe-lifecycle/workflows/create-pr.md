---
name: fe-workflow-create-pr
description: Internal FE workflow — create Pull Request with self-review evidence, compare-ui report, and STOP before push
---

<purpose>
Create a Pull Request for FE code deliverables — verify PR readiness, generate description, and STOP before push for user approval.
</purpose>

<context>
Internal workflow — called by `stage-complete.md`, NOT a standalone command.
Uses PR template at `@fe-lifecycle/templates/pr-description.md`.
</context>

<rules>
1. Self-review must be complete before PR
2. Compare-UI report must be included
3. ⚠️ STOP before git push — mandatory human approval
4. PR description follows template
5. Conventional commit format
</rules>

<process>
  <step name="verify_pr_readiness">
    Check pre-conditions:
    - [ ] Self-review completed (reference report)
    - [ ] Compare-UI report clean or deviations documented
    - [ ] Gate 4 passed
    - [ ] No TODO/FIXME in code
    - [ ] All tests pass (if applicable)
  </step>

  <step name="generate_pr_description">
    Use `@fe-lifecycle/templates/pr-description.md` to generate PR description.
    Include: component list, interaction states implemented, responsive behavior,
    design token usage, screenshots, self-review reference.
  </step>

  <step name="prepare_commit">
    Stage files and prepare conventional commit:
    ```
    feat(fe): [Sprint-NNN] implement {feature} components
    ```
  </step>

  <step name="stop_before_push">
    ⚠️ STOP: Present commit diff to user.
    ```
    ⚠️ STOP: About to push to remote and create PR.
    Branch: feature/{feature-name}
    Files: {count} files changed
    
    Continue? (yes/no)
    ```
    Wait for explicit approval.
  </step>

  <step name="create_pr_and_notify">
    After approval: push + create PR.
    Draft Telegram notification.
  </step>
</process>

<edge_cases>

**Khi branch có conflict với target branch** (shared files bị modify bởi team khác): Trước khi push, chạy `git fetch` + `git merge --no-commit origin/{target-branch}` để kiểm tra conflicts. Nếu có conflict trên shared files (global CSS, shared components, routing) → ⚠️ STOP — Merge conflict trên shared resources. Liệt kê files conflict và chờ user resolve trước khi tạo PR.

**Khi PR chứa changes trên files mà PR khác đang review:** Kiểm tra danh sách open PRs. Nếu phát hiện overlap → cảnh báo user trong PR description: "⚠️ Overlap với PR #[N] trên files: [list]." Để user quyết định merge order.

</edge_cases>
