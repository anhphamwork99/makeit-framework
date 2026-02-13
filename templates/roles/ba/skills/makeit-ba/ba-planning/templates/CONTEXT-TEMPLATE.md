# Phase Context: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** BA
**Date:** [YYYY-MM-DD]
**Discussed with:** [User/PO/Team]

---

## Phase Boundary

<!-- What is IN scope and OUT of scope for this phase -->

**In scope:**
- [Deliverable or activity 1 — specific]
- [Deliverable or activity 2 — specific]

**Out of scope (deferred):**
- [Item deferred to future phase — reason]
- [Item explicitly excluded — reason]

## Implementation Decisions

<!-- Key decisions made during discuss-phase that constrain planning -->

### Design Analysis Approach
- [How to interpret Figma screens — all screens or specific subset?]
- [Component-level or screen-level analysis?]
- [Which interaction states to focus on?]

### Story Writing Strategy
- [Story granularity — atomic per screen or epic-level per feature?]
- [AC depth — minimal checkable or comprehensive behavioral?]
- [Story naming convention — US-NNN or feature-based?]

### Edge Case Scope
- [How thorough — happy path + critical errors only, or systematic 5-category?]
- [Edge cases to prioritize — data, state, UI, business logic, error?]
- [PO-decision edge cases — escalate immediately or batch?]

### PO Goal Alignment
- [Priority order if goals conflict]
- [Acceptance of trade-offs — design vs requirements?]

## Agent's Discretion

<!-- Areas where the agent can make decisions without asking -->

- [Area 1 — e.g., "Story format and AC structure — follow template"]
- [Area 2 — e.g., "Minor edge case categorization — agent decides priority"]
- [Area 3 — e.g., "Flow notation style — agent's choice"]

## Specific Ideas

<!-- Concrete ideas from the discussion that should be incorporated -->

- [Idea 1 — specific implementation suggestion from user]
- [Idea 2 — specific approach agreed upon]

## Deferred Ideas

<!-- Good ideas that don't belong in this phase — saved for future -->

| Idea | Reason Deferred | Future Phase |
|------|----------------|--------------|
| [Idea description] | [Out of current scope] | [Phase or "backlog"] |
| [Idea description] | [Dependency not ready] | [Phase or "backlog"] |

---

## Instructions

**How to fill this template:**

1. **Phase Boundary:** Clearly state what's in and out of scope — prevents scope creep during execution
2. **Implementation Decisions:** Capture decisions per BA-specific area (design analysis, story writing, edge cases, PO alignment)
3. **Agent's Discretion:** List areas where agent can decide freely — reduces unnecessary user questions
4. **Specific Ideas:** Record concrete suggestions from the discussion session
5. **Deferred Ideas:** Track good ideas that don't fit this phase — use table with future phase reference

**Rule:** 4 questions per area, then check with user before continuing. Include "You decide" option when agent discretion is reasonable.

---

## Filled Example

```markdown
# Phase Context: Phase 01 — Design Analysis

**Sprint:** SPRINT-003
**Phase:** 01 — Design Analysis
**Role:** BA
**Date:** 2026-02-15
**Discussed with:** PO (Anh)

---

## Phase Boundary

**In scope:**
- Analyze 4 login/registration screens from Figma
- Document component hierarchy and interaction states
- Identify data requirements per screen

**Out of scope (deferred):**
- Password recovery flow — separate feature in next sprint
- Social login — PO confirmed not in MVP scope

## Implementation Decisions

### Design Analysis Approach
- Analyze all 4 screens individually, then create cross-screen flow
- Component-level analysis for reusable elements
- Focus on: default, hover, active, disabled, error, loading states

### Story Writing Strategy
- Atomic stories per screen (not epic-level)
- AC: comprehensive behavioral (≥4 criteria per story)
- Naming: US-NNN format with feature suffix

### Edge Case Scope
- Systematic 5-category analysis for login feature
- Prioritize: data validation edge cases + error states
- PO-decision cases: batch and present at end of phase

## Agent's Discretion

- Story format and AC structure — follow user-story.md template
- Edge case priority assignment — agent assesses impact/likelihood
- Flow notation style — use ASCII arrows from user-flow.md template

## Specific Ideas

- PO wants login error messages in Vietnamese, not English
- Include "remember me" as optional AC in login story

## Deferred Ideas

| Idea | Reason Deferred | Future Phase |
|------|----------------|--------------|
| Biometric login | Out of MVP scope | Backlog |
| Social OAuth | Not in sprint goal | Sprint 004 |
```
