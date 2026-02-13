---
name: makeit:clarify
description: Read Lark Sprint issue → verify Gate 1 → create sprint workspace with SPECS.md + ROADMAP.md + STATE.md
---

<objective>
BA sprint entry point — transforms raw Lark Sprint issue into a structured sprint workspace. Verifies PO+Designer inputs pass Gate 1 before BA work begins. This command CREATES the sprint workspace (unlike other stage commands that load an existing one).
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-discovery/stage-clarify.md
@.agent/skills/makeit-ba/_shared/references/quality-gates.md
@.agent/skills/makeit-ba/_shared/references/team-workflow.md
</execution_context>

<process>
  <step name="parse_input">
    Receive Lark Sprint issue link or pasted content from user.
    Extract: sprint name, PO goal, Designer Figma links, scope boundaries.
    If no input provided → ask user for Lark Sprint issue link.
  </step>

  <step name="verify_gate_1">
    Apply Gate 1 (Design → BA) checklist from quality-gates.md:
    - Designer specs marked "Ready for Dev" in Figma?
    - All interaction states defined?
    - PO goal defined with context?
    - Priority + sprint confirmed?
    > Design tokens & copy/text → Designer responsibility (verified via `mark-ready`).
    If Gate 1 fails → report missing items, ask user to follow up with PO/Designer.
  </step>

  <step name="bootstrap_workspace">
    Create sprint workspace structure:
    ```
    .makeit/sprint/SPRINT-NNN-DDMMYYYY/
      STATE.md        ← from STATE-TEMPLATE
      SPECS.md        ← from SPECS-TEMPLATE, filled with sprint scope
      ROADMAP.md      ← from ROADMAP-TEMPLATE, initial phases
      phases/         ← empty, populated during plan-phase
      deliverables/   ← empty, populated during execute
    ```
    Fill SPECS.md with extracted PO goal, Figma links, scope.
    Fill STATE.md with initial state (phase 1, status: planning).
    Create ROADMAP.md with initial BA analysis phases.
  </step>

  <step name="present_summary">
    Display sprint workspace summary:
    - Sprint name and ID
    - PO goal (one-liner)
    - Gate 1 status (passed/warnings)
    - Number of phases in initial roadmap
    - Files created

    Suggest next command:
    ```
    /makeit:discuss-phase 1   → gather context before planning
    /makeit:plan-phase 1      → plan first phase directly
    /makeit:status             → review sprint state
    ```
  </step>
</process>

<success_criteria>
- [ ] Lark Sprint issue parsed (goal, Figma links, scope extracted)
- [ ] Gate 1 checklist applied — pass or actionable feedback given
- [ ] Sprint workspace created at `.makeit/sprint/SPRINT-NNN-DDMMYYYY/`
- [ ] STATE.md, SPECS.md, ROADMAP.md populated with sprint context
- [ ] User informed of next steps
</success_criteria>
