# Phase Research: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** BA
**Date:** [YYYY-MM-DD]
**Researcher:** [Sub-agent / Manual]

---

## Design Context

<!-- Figma analysis — components, states, layout patterns discovered via MCP -->

### Component Hierarchy
- [Component 1 — type, variants, states identified]
- [Component 2 — type, variants, states identified]

### Interaction States Matrix

| Component | Default | Hover | Active | Disabled | Error | Empty | Loading |
|-----------|---------|-------|--------|----------|-------|-------|---------|
| [Component 1] | ✅ | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] |
| [Component 2] | ✅ | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] |

### Layout Patterns
- [Pattern 1 — responsive behavior, grid structure]
- [Pattern 2 — navigation flow, screen transitions]

## PO Intent

<!-- Business goals mapped to design decisions -->

| PO Goal | Design Decision | Story Impact |
|---------|----------------|--------------|
| [Goal from PO handoff] | [How Figma design addresses this] | [Stories needed to fulfill] |
| [Goal 2] | [Design decision] | [Story impact] |

### Success Metrics
- [KPI 1 — how this feature contributes to business metric]
- [KPI 2 — measurable outcome expected]

## Domain Patterns

<!-- Similar features, best practices, industry standards -->

### Similar Features in Codebase
- [Existing feature 1 — how current sprint can reuse patterns]
- [Existing feature 2 — relevant conventions to follow]

### Industry Standards
- [Standard 1 — applicable to this feature, e.g., "WCAG 2.1 for form accessibility"]
- [Standard 2 — best practice reference]

## Edge Cases Discovered

<!-- Feed into identify-edges workflow -->

| # | Category | Edge Case | Source | Priority |
|---|----------|-----------|--------|----------|
| 1 | [Data/State/UI/Business/Error] | [Description] | [Figma analysis / Domain research / PO context] | [Critical/Important/Nice] |
| 2 | [Category] | [Description] | [Source] | [Priority] |
| 3 | [Category] | [Description] | [Source] | [Priority] |

## Dependencies

<!-- APIs, data sources, cross-feature dependencies -->

| Dependency | Type | Status | Impact on Stories |
|------------|------|--------|-------------------|
| [API endpoint / Data source] | [API/Data/Component/Feature] | [Available/In progress/Unknown] | [Which stories depend on this] |
| [Dependency 2] | [Type] | [Status] | [Impact] |

## Recommendations

<!-- Prescriptive — "Use X" not "Consider X or Y" -->

1. **[Area]:** Use [specific approach] because [reason]
2. **[Area]:** Use [specific approach] because [reason]
3. **[Area]:** Use [specific approach] because [reason]

---

## Instructions

**How to fill this template:**

1. **Design Context:** Use Figma MCP tools to extract component hierarchy, interaction states, and layout patterns
2. **PO Intent:** Map PO goals from SPECS.md to design decisions visible in Figma
3. **Domain Patterns:** Check existing codebase for similar features and applicable industry standards
4. **Edge Cases:** Systematically discover from design analysis and domain knowledge — feed into identify-edges
5. **Dependencies:** Identify APIs, data sources, and cross-feature dependencies that affect story scope
6. **Recommendations:** Always prescriptive ("Use X" not "Consider X or Y") — agent will follow these in planning

**Rule:** Research is optional but recommended for complex phases with ≥5 screens or unfamiliar domains.

---

## Filled Example

```markdown
# Phase Research: Phase 01 — Design Analysis

**Sprint:** SPRINT-003
**Phase:** 01 — Design Analysis
**Role:** BA
**Date:** 2026-02-15
**Researcher:** BA Sub-agent

---

## Design Context

### Component Hierarchy
- LoginForm — email input, password input, submit button, "remember me" checkbox
- RegistrationForm — name, email, password, confirm password, terms checkbox, submit

### Interaction States Matrix

| Component | Default | Hover | Active | Disabled | Error | Empty | Loading |
|-----------|---------|-------|--------|----------|-------|-------|---------|
| Email Input | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | N/A |
| Submit Button | ✅ | ✅ | ✅ | ✅ | N/A | N/A | ✅ |

## PO Intent

| PO Goal | Design Decision | Story Impact |
|---------|----------------|--------------|
| Reduce signup friction | Single-page registration | 1 story for registration flow |
| Increase security | Password strength indicator | AC for password validation |

## Recommendations

1. **Story scope:** Use atomic stories per form (login = 1 story, registration = 1 story)
2. **Edge cases:** Focus on data validation + error states (highest user impact)
3. **Flow documentation:** Use single-page flow with error branching
```
