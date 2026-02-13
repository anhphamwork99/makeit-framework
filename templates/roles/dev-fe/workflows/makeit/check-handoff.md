---
name: makeit:check-handoff
description: Check for incoming handoff from Techlead — pull and review FE section of HANDOFF.md
---

<objective>
Dev FE pre-sprint check — pull latest from product repo, read TL's HANDOFF.md (FE section only), display summary with deliverable paths and links, then recommend `/makeit:clarify` to begin work.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-discovery/check-handoff.md
</execution_context>

<process>
  <step name="check_handoff">
    Follow the check-handoff skill to:
    1. Identify Techlead as the sender (fixed — no param needed)
    2. Prompt user to `git pull` from product repo
    3. Read `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md` (focus: `## For FE`)
    4. Display FE-specific handoff summary (goal, deliverables, links)
    5. Recommend: `/makeit:clarify`
  </step>
</process>

<success_criteria>
- [ ] User pulled latest from product repo
- [ ] TL's HANDOFF.md read — only FE section displayed
- [ ] Next step (`/makeit:clarify`) recommended
</success_criteria>
