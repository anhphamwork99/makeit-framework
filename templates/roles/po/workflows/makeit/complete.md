---
name: makeit:complete
description: Git sync + BA/Designer handoff + Telegram draft — sprint completion
---

<objective>
Package PO sprint deliverables, commit to git, create structured handoff for BA+Designer, and draft Telegram notification. Final step in PO sprint lifecycle.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-lifecycle/stage-complete.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → "No active sprint. Run /makeit:start-sprint to start."
    Read STATE.md → verify sprint is verified (passed verify-work).
    If not verified → "Sprint not verified. Run /makeit:verify-work first."
  </step>

  <step name="execute">
    Follow stage skill to:
    1. Package deliverables with consistent naming
    2. Git commit with user approval
    3. Create handoff document with AI Verification statement
    4. Draft Telegram notification
    5. Guide Lark update
  </step>

  <step name="suggest_next">
    Sprint complete → display lifecycle summary
    New sprint needed → `/makeit:start-sprint`
    Review sprint → `/makeit:lesson-learned`
  </step>
</process>

<success_criteria>
- [ ] Deliverables committed to git
- [ ] Handoff document created
- [ ] AI Verification statement included
- [ ] Telegram draft ready
- [ ] STATE.md set to complete
</success_criteria>
