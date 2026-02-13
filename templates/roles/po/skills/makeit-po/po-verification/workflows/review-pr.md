---
name: po-workflow-review-pr
description: PO internal workflow — review PR with focus on business logic, verify acceptance criteria met, make approve/reject decision
---

<purpose>
Review PR with focus on business logic — verify implementation matches original PO goal and acceptance criteria. PO is final authority in Stage 5.
</purpose>

<rules>
1. Review against original user story/AC — not "by feeling"
2. Issues must be specific — expected behavior vs actual behavior
3. Override decisions require follow-up tasks with clear deadline
4. Feedback specific enough for Dev to fix without additional clarification
5. Max 3 rounds — escalate after 3 if not aligned
6. PO is final authority — PO decisions override other reviewers on business logic
</rules>

<output>
Review feedback → `deliverables/REVIEW-{pr-id}.md`
Template: `@po-verification/templates/review-feedback.md`
</output>

<process>
  <step name="load_pr_context">
    1. User provides PR link/description + linked user story
    2. Read user story + acceptance criteria (source of truth)
    3. Read original PO goal (from backlog item)
    4. If task file exists → read context from `.makeit/tasks/TASK-NNN.md`
  </step>

  <step name="check_business_logic">
    Verify each aspect:

    **Logic matches specs?**
    - PR implementation matches user story / original goal?
    - Flow matches expected user journey?
    - No undocumented logic deviations?

    **Acceptance criteria met?**
    - Check each AC item: ✅ met / ❌ not met / ⚠️ partial
    - If partial → specify what's missing

    **Edge cases handled?**
    - Documented edge cases handled?
    - New edge cases discovered → flag

    **Business logic regression?**
    - Changes affect existing feature logic?
    - Side effects on other user flows?
  </step>

  <step name="make_decision">
    | Decision | When | Action |
    |----------|------|--------|
    | ✅ **Approve** | Logic correct, all AC met | Recommend merge |
    | 🔄 **Request changes** | Issues found | Draft specific comment per issue |
    | ⏭️ **Override minor** | Tight deadline, minor issues only | Approve + create follow-up task |
  </step>

  <step name="generate_feedback">
    1. Use template `@po-verification/templates/review-feedback.md`
    2. Fill all sections: decision, business logic check, issues, follow-up
    3. If Override → draft follow-up task
    4. If Request changes → draft specific comment for each issue
    5. Present summary to user
  </step>
</process>

<edge_cases>

**Khi PR review phát hiện fundamental requirement misunderstanding (không phải code bug mà là hiểu sai specs gốc):** ⚠️ STOP — đây không phải "Request changes" thông thường. Không approve hay request code fix. Escalate lên BA: "Requirement misunderstanding detected — cần BA review lại user story chain từ PO goal." Log trong review feedback với category "Specs Escalation".

</edge_cases>

## Anti-patterns

- ❌ **Review technical implementation:** PO reviews business logic, not code quality (Techlead's job)
- ❌ **Vague feedback:** "Looks wrong" → Need specific AC reference + expected behavior
- ❌ **Changing specs during review:** Review against existing AC, don't add new requirements
- ❌ **Endless review cycles:** Max 3 rounds → escalate to sync meeting
- ❌ **Skip follow-up tasks:** Override minor issues without follow-up → issues lost
- ❌ **Block on style preferences:** Business logic focus — UI preferences belong to Designer review
