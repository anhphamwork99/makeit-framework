---
name: makeit:verify-phase
description: Verify phase output with goal-backward check, Gate 4, API compliance, DB safety, and security checks
---

<objective>
Verify current phase output using goal-backward methodology with Gate 4 quality checks, API compliance verification, database safety, and BE self-review. Catches "all green but wrong outcome".
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-verification/stage-verify-phase.md
@.agent/skills/makeit-dev-be/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Confirm current phase has status `verifying` or `executing`.
    Load phase PLAN.md and deliverables list.
  </step>

  <step name="run_verification">
    Follow skill instructions for 3-level + goal-backward verification:
    1. **3-level check:** existence → substantive → wired (for each deliverable)
    2. **BE self-review:** code quality, API compliance, DB safety, security
    3. **Gate 4 check:** formal checklist items
    4. **Goal-backward:** "Did we achieve the phase goal?"
  </step>

  <step name="route_results">
    **ALL PASS ✅:** Mark phase complete, suggest next phase or `/makeit:verify-work`.
    **GAPS FOUND ⚠️:** List gaps with fix instructions, route to re-plan (max 1 revision).
  </step>
</process>

<success_criteria>
- [ ] 3-level verification applied to all deliverables
- [ ] BE self-review completed
- [ ] Gate 4 check passed
- [ ] Goal-backward confirms phase goal achieved
- [ ] STATE.md updated with verification result
</success_criteria>
