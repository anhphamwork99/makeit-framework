# Edge Case Analysis: [Feature Name]

**Sprint:** SPRINT-{NNN}
**Feature:** [Feature or story set being analyzed]
**Date:** [YYYY-MM-DD]
**Stories Covered:** [US-001, US-002, US-003]

---

## Category A: Data Edge Cases

<!-- Empty/null, max length, special characters, boundaries -->

| # | Edge Case | Trigger | Expected Behavior | Impact | Likelihood | Priority |
|---|-----------|---------|-------------------|--------|------------|----------|
| A1 | [Empty/null data — e.g., "User submits empty form"] | [Khi nào xảy ra] | [System response] | [Data loss/Bad UX/Security] | [Rare/Occasional/Frequent] | [Critical/Important/Nice] |
| A2 | [Max length input — e.g., "Email exceeds 255 chars"] | [Trigger condition] | [Truncate/Error message] | [Impact] | [Likelihood] | [Priority] |
| A3 | [Special characters — e.g., "Unicode emoji in name"] | [Trigger] | [Expected behavior] | [Impact] | [Likelihood] | [Priority] |
| A4 | [Date boundary — e.g., "Leap year, timezone, DST"] | [Trigger] | [Expected behavior] | [Impact] | [Likelihood] | [Priority] |

## Category B: State Edge Cases

<!-- First-time user, stale data, concurrent users, session expiry -->

| # | Edge Case | Trigger | Expected Behavior | Impact | Likelihood | Priority |
|---|-----------|---------|-------------------|--------|------------|----------|
| B1 | [First-time user — no history/data] | [Trigger] | [Empty state UI] | [Impact] | [Likelihood] | [Priority] |
| B2 | [Session expired mid-action] | [Trigger] | [Auto-save + redirect to login] | [Impact] | [Likelihood] | [Priority] |
| B3 | [Concurrent users — race condition] | [Trigger] | [Conflict resolution] | [Impact] | [Likelihood] | [Priority] |

## Category C: UI Edge Cases

<!-- Long text, missing images, slow network, screen extremes -->

| # | Edge Case | Trigger | Expected Behavior | Impact | Likelihood | Priority |
|---|-----------|---------|-------------------|--------|------------|----------|
| C1 | [Long text overflow — e.g., "Name 100+ chars"] | [Trigger] | [Truncate with ellipsis] | [Impact] | [Likelihood] | [Priority] |
| C2 | [Missing images/avatars] | [Trigger] | [Fallback placeholder] | [Impact] | [Likelihood] | [Priority] |
| C3 | [Slow network — loading states] | [Trigger] | [Skeleton/spinner shown] | [Impact] | [Likelihood] | [Priority] |

## Category D: Business Logic Edge Cases

<!-- Permission boundaries, subscription limits, feature flags -->

| # | Edge Case | Trigger | Expected Behavior | Impact | Likelihood | Priority |
|---|-----------|---------|-------------------|--------|------------|----------|
| D1 | [Permission boundary — e.g., "User tries admin action"] | [Trigger] | [403 + redirect] | [Impact] | [Likelihood] | [Priority] |
| D2 | [Cross-feature interaction] | [Trigger] | [Expected behavior] | [Impact] | [Likelihood] | [Priority] |

## Category E: Error Edge Cases

<!-- Network timeout, server errors, partial saves, duplicate submissions -->

| # | Edge Case | Trigger | Expected Behavior | Impact | Likelihood | Priority |
|---|-----------|---------|-------------------|--------|------------|----------|
| E1 | [Submission fails due to poor connection] | [Trigger] | [Retry prompt + data preserved] | [Impact] | [Likelihood] | [Priority] |
| E2 | [User sees unexpected error page] | [Trigger] | [User-friendly error message] | [Impact] | [Likelihood] | [Priority] |
| E3 | [Duplicate submission — double-click] | [Trigger] | [Debounce + prevent duplicate] | [Impact] | [Likelihood] | [Priority] |
| E4 | [Partial data save — mid-submission failure] | [Trigger] | [Draft saved / rollback] | [Impact] | [Likelihood] | [Priority] |

## Priority Matrix

| Priority | Count | Edge Cases |
|----------|-------|------------|
| **Critical** | [N] | [A1, B2, E1, ...] |
| **Important** | [N] | [A2, C3, D1, ...] |
| **Nice-to-have** | [N] | [A4, C2, ...] |

## Integration Actions

<!-- How edge cases are integrated into stories and handoff -->

| Action | Edge Cases | Target |
|--------|-----------|--------|
| **Added as AC** | [A1, B2, E1] | [US-001, US-002 — story acceptance criteria] |
| **New story created** | [D1] | [US-005 — complex edge case needs own story] |
| **Flagged for PO** | [B3, D2] | [PO decision needed — escalate in handoff] |
| **Deferred** | [A4] | [Low priority — backlog for future sprint] |

---

## Instructions

**How to fill this template:**

1. **Categories A-E:** Systematically go through each category — never skip ("simple feature" is not an excuse)
2. **Each edge case:** Must have Impact + Likelihood assessment to determine Priority
3. **Priority Matrix:** Summarize counts per priority level with edge case IDs
4. **Integration Actions:** Map critical edge cases to story AC, create separate stories for complex ones, flag PO-decision items

**Rules:**
- Critical edge cases MUST become acceptance criteria in relevant stories
- Edge cases needing PO decision are flagged separately in handoff
- Never keep edge cases as a separate document only — integrate into story AC

---

## Filled Example

```markdown
## Priority Matrix

| Priority | Count | Edge Cases |
|----------|-------|------------|
| **Critical** | 3 | A1 (empty form), B2 (session expiry), E3 (double-click) |
| **Important** | 4 | A2 (max length), C3 (slow network), D1 (permissions), E1 (timeout) |
| **Nice-to-have** | 2 | C2 (missing avatar), A4 (timezone) |

## Integration Actions

| Action | Edge Cases | Target |
|--------|-----------|--------|
| **Added as AC** | A1, B2, E3 | US-001 (login), US-002 (registration) |
| **New story created** | D1 | US-005 — permission boundary handling |
| **Flagged for PO** | B3 | Concurrent editing — PO decides conflict resolution strategy |
| **Deferred** | A4 | Timezone handling — not relevant for MVP |
```
