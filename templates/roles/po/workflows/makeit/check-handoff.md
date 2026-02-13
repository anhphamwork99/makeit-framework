---
name: makeit:check-handoff
description: Check for incoming handoff from FE + BE — pull and review both HANDOFF.md files for review sprint
---

<objective>
PO review pre-sprint check — pull latest from product repo, read both FE and BE HANDOFF.md files, display summaries with clear separation, then recommend `/makeit:start-sprint` to begin review.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-discovery/check-handoff.md
</execution_context>

<process>
  <step name="check_handoff">
    Follow the check-handoff skill to:
    1. Identify FE + BE as senders (fixed — no param needed)
    2. Prompt user to `git pull` from product repo
    3. Read `.makeit/sprint/SPRINT-{NNN}/fe/HANDOFF.md`
    4. Read `.makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md`
    5. Display both summaries with clear FE/BE separation
    6. Handle partial availability (one arrived, one pending)
    7. Recommend: `/makeit:start-sprint`
  </step>
</process>

<success_criteria>
- [ ] User pulled latest from product repo
- [ ] FE and BE HANDOFF.md files read (or partial with notification)
- [ ] Summaries displayed with clear separation
- [ ] Next step (`/makeit:start-sprint`) recommended
</success_criteria>
