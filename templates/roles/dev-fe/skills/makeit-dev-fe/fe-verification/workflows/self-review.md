---
name: fe-workflow-self-review
description: Internal FE workflow — code quality self-review before PR submission using Gate 4 checklist
---

<purpose>
Self-review FE code before creating PR — check quality, design compliance, responsive behavior, and accessibility basics.
</purpose>

<context>
Internal workflow — called by `stage-verify-phase.md`, NOT a standalone command.
Uses Gate 4 checklist from `@_shared/references/quality-gates.md`.
Use template `@fe-verification/templates/self-review-checklist.md` for structured output.
</context>

<rules>
1. Check EVERY item — no shortcuts
2. Auto-fix minor issues — import order, formatting, missing types
3. Flag major issues — architecture changes, missing states, performance
4. Report template — use self-review-checklist template
</rules>

<process>
  <step name="load_gate_4_checklist">
    Read Gate 4 requirements from `@_shared/references/quality-gates.md`.
    Focus on FE-specific items.
  </step>

  <step name="code_quality_check">
    - [ ] TypeScript types correct (no `any`, proper interfaces)
    - [ ] No console.log/debug statements
    - [ ] Import organization clean
    - [ ] Component naming consistent
    - [ ] File structure follows conventions
    - [ ] No duplicated code
    - [ ] Error boundaries where needed
  </step>

  <step name="ui_comparison">
    Run compare-ui workflow for visual verification.
    Document any deviations found.
  </step>

  <step name="responsive_check">
    - [ ] Desktop renders correctly
    - [ ] Tablet renders correctly
    - [ ] Mobile renders correctly
    - [ ] No layout breaks at intermediate sizes
  </step>

  <step name="performance_check">
    - [ ] No unnecessary re-renders
    - [ ] Images optimized
    - [ ] Bundle impact reasonable
    - [ ] Lazy loading where beneficial
  </step>

  <step name="generate_report">
    Create self-review report using template.
    Categorize: ✅ Pass / ❌ Fail / ⚠️ Warning.
    Suggest next step based on result.
  </step>
</process>
