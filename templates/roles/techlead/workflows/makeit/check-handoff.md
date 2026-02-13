---
name: makeit:check-handoff
description: Check for incoming handoff from BA — pull and review HANDOFF.md before starting sprint
---

<objective>
Techlead pre-sprint check — pull latest from product repo, read BA's HANDOFF.md, display summary with deliverable paths and links, then recommend `/makeit:clarify` to begin work.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-discovery/check-handoff.md
</execution_context>

<process>
  <step name="check_handoff">
    Follow the check-handoff skill to:
    1. Identify BA as the sender (fixed — no param needed)
    2. Prompt user to `git pull` from product repo
    3. Read `.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md`
    4. Display handoff summary (goal, deliverables, links)
    5. Recommend: `/makeit:clarify`
  </step>
</process>

<success_criteria>
- [ ] User pulled latest from product repo
- [ ] BA's HANDOFF.md read and summarized
- [ ] Next step (`/makeit:clarify`) recommended
</success_criteria>
