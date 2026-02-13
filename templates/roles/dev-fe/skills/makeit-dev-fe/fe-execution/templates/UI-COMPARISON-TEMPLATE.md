# UI Comparison Report: [Feature / Screen Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Dev FE
**Date:** [YYYY-MM-DD]
**Comparison Method:** [Figma MCP Screenshot / Manual Screenshot / Checklist]

---

## Comparison Metadata

- **Figma File:** [Figma link to design file]
- **Figma Frame(s):** [Specific frame/page names compared]
- **Implementation:** [Branch name or commit hash]
- **Breakpoints Compared:** [Desktop (1440px) / Tablet (768px) / Mobile (375px)]
- **Design Tokens Version:** [Token set used — date or version]
- **Comparison Scale:** [1x / 2x — resolution used for screenshots]

## Screen-by-Screen Comparison

<!-- For each screen/component compared -->

### Screen: [Screen Name — e.g., "Login Page"]

**Figma Reference:** [Frame name or node ID]
**Implementation:** [File path — e.g., src/pages/LoginPage.tsx]

#### Desktop (≥1024px)

| Aspect | Figma Design | Implementation | Match? |
|--------|-------------|----------------|:---:|
| Overall layout | [Grid/flex, column count, structure] | [Matches/Differs — detail] | [✅/❌] |
| Spacing (margins/padding) | [Key spacing values] | [Matches/Differs] | [✅/❌] |
| Typography | [Font sizes, weights, line-heights] | [Matches/Differs] | [✅/❌] |
| Colors | [Key colors used] | [Token-based/Hardcoded] | [✅/❌] |
| Shadows/Effects | [Shadow values, opacity] | [Matches/Differs] | [✅/❌] |
| Border radius | [Radius values] | [Matches/Differs] | [✅/❌] |
| Icons/Images | [Size, placement, assets] | [Matches/Differs] | [✅/❌] |

#### Tablet (768px–1023px)

| Aspect | Expected Behavior | Actual | Match? |
|--------|-------------------|--------|:---:|
| Layout adaptation | [How layout changes] | [Actual behavior] | [✅/❌] |
| Content reflow | [What moves/stacks] | [Actual behavior] | [✅/❌] |
| Touch targets | [Min 44x44px] | [Actual size] | [✅/❌] |

#### Mobile (≤767px)

| Aspect | Expected Behavior | Actual | Match? |
|--------|-------------------|--------|:---:|
| Layout adaptation | [How layout changes] | [Actual behavior] | [✅/❌] |
| Content stacking | [Stack order] | [Actual behavior] | [✅/❌] |
| Hidden elements | [Elements hidden on mobile] | [Actual behavior] | [✅/❌] |
| Touch targets | [Min 44x44px] | [Actual size] | [✅/❌] |

### Interaction States

| State | Figma Designed? | Implemented? | Match? | Notes |
|-------|:---:|:---:|:---:|-------|
| Default | [✅/❌] | [✅/❌] | [✅/❌/N/A] | [Details] |
| Hover | [✅/❌] | [✅/❌] | [✅/❌/N/A] | [Details] |
| Active/Pressed | [✅/❌] | [✅/❌] | [✅/❌/N/A] | [Details] |
| Focus | [✅/❌] | [✅/❌] | [✅/❌/N/A] | [Details] |
| Disabled | [✅/❌] | [✅/❌] | [✅/❌/N/A] | [Details] |
| Error | [✅/❌] | [✅/❌] | [✅/❌/N/A] | [Details] |
| Empty | [✅/❌] | [✅/❌] | [✅/❌/N/A] | [Details] |
| Loading | [✅/❌] | [✅/❌] | [✅/❌/N/A] | [Details] |

<!-- Repeat "### Screen" section for each screen compared -->

## Discrepancy List

<!-- Categorized list of ALL differences found -->

### Spacing Discrepancies

| # | Component | Property | Expected | Actual | Severity |
|---|-----------|----------|----------|--------|----------|
| 1 | [Component] | [margin/padding/gap] | [Value from Figma] | [Actual value] | [Critical/Major/Minor] |

### Color Discrepancies

| # | Component | Property | Expected (Token) | Actual | Severity |
|---|-----------|----------|----------|--------|----------|
| 1 | [Component] | [background/text/border] | [Token → hex] | [Actual hex] | [Critical/Major/Minor] |

### Typography Discrepancies

| # | Component | Property | Expected | Actual | Severity |
|---|-----------|----------|----------|--------|----------|
| 1 | [Component] | [font-size/weight/line-height] | [Value] | [Actual] | [Critical/Major/Minor] |

### Layout Discrepancies

| # | Screen | Breakpoint | Expected | Actual | Severity |
|---|--------|-----------|----------|--------|----------|
| 1 | [Screen] | [Desktop/Tablet/Mobile] | [Layout description] | [Actual layout] | [Critical/Major/Minor] |

### Interaction State Discrepancies

| # | Component | State | Expected | Actual | Severity |
|---|-----------|-------|----------|--------|----------|
| 1 | [Component] | [hover/disabled/error] | [Expected behavior] | [Actual/Missing] | [Critical/Major/Minor] |

## Severity Assessment

<!-- Summary of severity distribution -->

| Severity | Count | Description |
|----------|:---:|-------------|
| **Critical** | [N] | Blocks deployment — functional or major visual break |
| **Major** | [N] | Noticeable to users — significant visual difference |
| **Minor** | [N] | Polish items — small spacing/alignment differences |
| **Acceptable** | [N] | Within tolerance — rendering engine differences |

**Overall Match Score:** [✅ Pixel-perfect / ⚠️ Minor deviations / ❌ Significant differences]

## Action Items

<!-- Ordered by severity — fix Critical first -->

| Priority | # | Component | Fix Description | Effort |
|:---:|---|-----------|-----------------|:---:|
| 🔴 | 1 | [Component] | [Specific fix instruction — e.g., "Change padding from 12px to 16px"] | [S/M/L] |
| 🟡 | 2 | [Component] | [Fix instruction] | [S/M/L] |
| 🟢 | 3 | [Component] | [Fix instruction] | [S/M/L] |

**Estimated Fix Time:** [Total estimate for all action items]
**Recommendation:** [Fix all and re-compare / Fix critical only / Accept as-is]

---

## Instructions

**How to fill this template:**

1. **Comparison Metadata:** Document Figma source, implementation state, and breakpoints tested
2. **Screen-by-Screen:** For each screen, compare desktop/tablet/mobile layout + interaction states
3. **Discrepancy List:** Categorize ALL differences by type (spacing, color, typography, layout, states)
4. **Severity Assessment:** Classify each discrepancy — Critical blocks deployment, Minor is polish
5. **Action Items:** Ordered fix list with priority, specific instructions, and effort estimate

**Comparison methods (in order of preference):**
1. **Figma MCP Screenshot** — Use `figma_capture_screenshot` for Figma, browser screenshot for implementation
2. **Manual Screenshot** — Ask user to provide implementation screenshot, compare side-by-side
3. **Checklist Comparison** — Structured visual checklist when screenshots unavailable

**Severity guidelines:**
- **Critical:** Missing component, broken layout, wrong color scheme, non-functional state
- **Major:** Noticeable spacing difference (>4px), wrong font weight, missing interaction state
- **Minor:** Small spacing variance (1-3px), slight color mismatch, alignment perfectionism
- **Acceptable:** Browser rendering differences, anti-aliasing, sub-pixel differences

---

## Filled Example

```markdown
## Discrepancy List

### Spacing Discrepancies

| # | Component | Property | Expected | Actual | Severity |
|---|-----------|----------|----------|--------|----------|
| 1 | LoginForm | padding-top | 32px | 24px | Major |
| 2 | Button | margin-bottom | 16px | 12px | Minor |

### Color Discrepancies

| # | Component | Property | Expected (Token) | Actual | Severity |
|---|-----------|----------|----------|--------|----------|
| 1 | Button | background | --color-primary → #1A73E8 | #2196F3 | Major |

## Severity Assessment

| Severity | Count |
|----------|:---:|
| Critical | 0 |
| Major | 2 |
| Minor | 1 |

**Overall Match Score:** ⚠️ Minor deviations — 2 major fixes needed

## Action Items

| Priority | # | Component | Fix | Effort |
|:---:|---|-----------|-----|:---:|
| 🟡 | 1 | LoginForm | Change padding-top from 24px to 32px (use --spacing-xl) | S |
| 🟡 | 2 | Button | Replace #2196F3 with var(--color-primary) | S |
| 🟢 | 3 | Button | Adjust margin-bottom from 12px to 16px | S |

**Estimated Fix Time:** ~15 min
**Recommendation:** Fix all and re-compare
```
