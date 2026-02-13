---
name: makeit:progress
description: Show sprint progress with deliverable completion status — detailed view
---

<objective>
Display comprehensive TL sprint progress showing lifecycle stage, deliverable completion, gate results, and immediate next actions. More detailed than status.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-lifecycle/progress.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Read ROADMAP.md, SPECS.md for full picture.
  </step>

  <step name="display_progress">
    Show: phase progress tree, deliverable counts (task breakdowns, API contracts, estimations, code reviews), gate status, suggested next command.
  </step>
</process>

<success_criteria>
- [ ] Active sprint found
- [ ] Phase progress displayed
- [ ] Deliverable status shown
- [ ] Next command suggested
</success_criteria>
