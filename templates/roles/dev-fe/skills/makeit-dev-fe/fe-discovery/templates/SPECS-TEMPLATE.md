# Sprint Specs: SPRINT-{NNN}

**Sprint:** SPRINT-{NNN}
**Role:** Dev FE
**Sprint Goal:** [Business outcome — what users/stakeholders get at sprint end]
**Lark Task:** [Lark link to sprint task]
**Figma:** [Figma link to design file]
**Created:** [YYYY-MM-DD]

---

## Sprint Context

- **BA Stories:** [Links to BA user story files or Lark tasks]
- **TL Tasks:** [Links to TL task breakdown files]
- **Design Status:** [Ready for Dev / Partially Ready / In Progress]
- **API Status:** [Available / In Progress / Not Started]

## FE Deliverables

<!-- What the FE developer is expected to deliver this sprint -->

| # | Deliverable | Type | Source Reference |
|---|-------------|------|-----------------|
| 1 | [Component/Page name] | [Component / Page / Layout / Integration] | [Figma frame + TL task] |
| 2 | [Component/Page name] | [Type] | [Reference] |
| 3 | [Component/Page name] | [Type] | [Reference] |

## FE Specifications

### Design Token Mapping

<!-- How Figma tokens map to code -->

| Figma Token | CSS Variable | Value | Notes |
|-------------|-------------|-------|-------|
| [color/primary] | [--color-primary] | [#hex] | [Usage notes] |
| [spacing/md] | [--spacing-md] | [16px] | [Usage notes] |
| [font/heading-lg] | [--font-heading-lg] | [24px/600] | [Usage notes] |

### Component Props

<!-- Key component API definitions -->

| Component | Prop | Type | Default | Required |
|-----------|------|------|---------|:---:|
| [ComponentName] | [propName] | [string / boolean / enum] | [default] | [✅/❌] |
| [ComponentName] | [propName] | [type] | [default] | [✅/❌] |

### Breakpoints

<!-- Responsive breakpoints for this sprint -->

| Breakpoint | Width | Layout Behavior |
|-----------|-------|-----------------|
| Mobile | [≤767px] | [Stack, single column, hide sidebar] |
| Tablet | [768px–1023px] | [Adjust grid, condensed nav] |
| Desktop | [≥1024px] | [Full layout, multi-column] |

### Interaction States

<!-- Required states per component -->

| Component | Default | Hover | Active | Disabled | Error | Empty | Loading |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| [Component] | ✅ | [✅/❌] | [✅/❌] | [✅/❌] | [✅/❌] | [✅/❌] | [✅/❌] |

## Success Criteria

<!-- Checkable, specific — the agent verifies these at the end -->

| ID | Criterion | How to Verify |
|----|-----------|---------------|
| SC1 | [UI matches Figma design at all breakpoints] | [Side-by-side comparison using compare-ui] |
| SC2 | [All interaction states implemented] | [Manual state trigger + visual inspection] |
| SC3 | [Design tokens used — no hardcoded values] | [Grep for hardcoded hex/px values in components] |
| SC4 | [Responsive on mobile, tablet, desktop] | [Browser resize + screenshot] |
| SC5 | [Accessibility basics met] | [Semantic HTML, keyboard nav, alt text check] |

## Out of Scope

<!-- Explicitly excluded from this sprint -->

- [Feature or requirement] — reason: [deferred to / not in story / blocked by]
- [Feature or requirement] — reason: [explanation]

## Assumptions

<!-- Things assumed true — if wrong, sprint scope may change -->

- [Assumption 1 — e.g., "Figma designs are finalized and will not change"]
- [Assumption 2 — e.g., "BE APIs will be available by Phase 04"]

---

## Instructions

**How to fill this template:**

1. **Sprint Context:** Link to upstream BA stories, TL tasks, and note design/API readiness
2. **FE Deliverables:** List all expected outputs with type classification
3. **FE Specifications:** Fill design token mapping, component props, breakpoints, and interaction states
4. **Success Criteria:** ≥3 criteria, each specific and checkable with verification method
5. **Out of Scope:** Explicitly state what this sprint does NOT deliver
6. **Assumptions:** List assumptions that could affect scope if proven wrong

**FE-specific specs requirements:**
- Design tokens: every color, spacing, typography, shadow value must trace to a Figma token
- Component props: define the public API for each component
- Breakpoints: specify layout behavior changes at each breakpoint
- Interaction states: 7 standard states — mark which are required per component
- Figma link: MUST be present — FE cannot work without design reference

---

## Filled Example

```markdown
## Success Criteria

| ID | Criterion | How to Verify |
|----|-----------|---------------|
| SC1 | Login form matches Figma at desktop (1440px) | compare-ui workflow — overlay comparison |
| SC2 | Error states show inline validation messages | Trigger validation, check error text appears |
| SC3 | All design tokens consumed from CSS variables | grep --include="*.css" -r "#[0-9a-f]" returns 0 hardcoded colors |
| SC4 | Forms responsive on mobile (375px) | Browser resize to 375px, fields stack vertically |
| SC5 | Tab navigation works through all form fields | Tab key moves focus through all inputs in order |
```
