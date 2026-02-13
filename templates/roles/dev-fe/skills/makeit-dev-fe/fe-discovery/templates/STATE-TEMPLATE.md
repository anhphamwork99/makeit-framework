# Sprint State: SPRINT-{NNN}

**Sprint:** SPRINT-{NNN}
**Role:** Dev FE
**Started:** [YYYY-MM-DD]
**Last Updated:** [YYYY-MM-DD HH:MM]
**Status:** [⬚ Not Started / 🔄 In Progress / ✅ Complete / ⏸ Paused]

---

## Current Position

- **Phase:** [NN — Phase Name]
- **Stage:** [clarify / discuss-phase / show-phase-approach / research-phase / plan-phase / execute-phase / verify-phase / verify-work / complete]
- **Task:** [Current task within phase, or "Between phases"]
- **Blocked:** [Yes — reason / No]

## Phase Progress

| # | Phase | Status | Plan | Started | Completed |
|---|-------|--------|------|---------|-----------|
| 01 | [Phase name] | [⬚/🔄/✅] | [✅ Planned / ⬚ Not planned] | [Date or —] | [Date or —] |
| 02 | [Phase name] | [⬚/🔄/✅] | [Planned status] | [Date or —] | [Date or —] |
| 03 | [Phase name] | [⬚/🔄/✅] | [Planned status] | [Date or —] | [Date or —] |

## FE Implementation Progress

<!-- Track component and page implementation status -->

### Components

| Component | Status | Figma Match | States | Responsive | A11y |
|-----------|:---:|:---:|:---:|:---:|:---:|
| [ComponentName] | [⬚/🔄/✅] | [✅/⚠️/❌/—] | [N/7 states] | [✅/❌/—] | [✅/❌/—] |
| [ComponentName] | [Status] | [Match] | [States] | [Responsive] | [A11y] |

### Pages

| Page | Status | Components Ready | Layout | Routing |
|------|:---:|:---:|:---:|:---:|
| [PageName] | [⬚/🔄/✅] | [N/N ready] | [✅/❌] | [✅/❌] |

### Design Tokens

| Category | Extracted | Applied | Verified |
|----------|:---:|:---:|:---:|
| Colors | [✅/❌] | [N/N applied] | [✅/❌] |
| Spacing | [✅/❌] | [N/N applied] | [✅/❌] |
| Typography | [✅/❌] | [N/N applied] | [✅/❌] |
| Shadows | [✅/❌] | [N/N applied] | [✅/❌] |

## Accumulated Context

### Decisions Made

| # | Decision | Rationale | Phase |
|---|----------|-----------|-------|
| 1 | [Decision — e.g., "CSS Modules for styling"] | [Why — existing codebase convention] | [Phase #] |

### Blockers

| # | Blocker | Impact | Status | Resolved |
|---|---------|--------|--------|----------|
| 1 | [Blocker description] | [Which phase/task blocked] | [Active / Resolved] | [Date or —] |

### Lessons Learned

| # | Lesson | Source | Applied |
|---|--------|--------|---------|
| 1 | [Lesson learned during sprint] | [Phase/Task] | [Yes — how / Not yet] |

## Session Continuity

<!-- For pause/resume across sessions -->

- **Last Action:** [What was being done when session ended]
- **Next Action:** [What should be done when session resumes]
- **Files in Progress:** [Files being actively edited]
- **Context to Restore:** [Key decisions, design refs, API status]

---

## Instructions

**How to fill this template:**

1. **Current Position:** Always update when stage, phase, or task changes
2. **Phase Progress:** Update status after each phase transition
3. **FE Implementation Progress:** Track per-component status including Figma match, states, responsive, a11y
4. **Accumulated Context:** Record decisions, blockers, lessons as they occur
5. **Session Continuity:** Fill when pausing work — enables clean resume

**State update triggers:**
- Stage transition → update Current Position
- Phase start/complete → update Phase Progress table
- Component completion → update FE Implementation Progress
- Token extraction → update Design Tokens table
- Blocker encountered → add to Blockers table
- Session pause → fill Session Continuity section

**FE-specific state fields:**
- Component tracking: per-component Figma match score, interaction state count, responsive status, a11y status
- Design token tracking: extraction → application → verification pipeline
- Page assembly tracking: component readiness for page integration

---

## Filled Example

```markdown
## Current Position

- **Phase:** 02 — Auth Components
- **Stage:** execute-phase
- **Task:** Task 2 — Implement RegisterForm component
- **Blocked:** No

## FE Implementation Progress

### Components

| Component | Status | Figma Match | States | Responsive | A11y |
|-----------|:---:|:---:|:---:|:---:|:---:|
| LoginForm | ✅ | ✅ | 5/7 | ✅ | ✅ |
| RegisterForm | 🔄 | — | 2/7 | ❌ | ❌ |
| TextInput | ✅ | ✅ | 4/7 | ✅ | ✅ |
| Button | ✅ | ✅ | 5/7 | ✅ | ✅ |

### Design Tokens

| Category | Extracted | Applied | Verified |
|----------|:---:|:---:|:---:|
| Colors | ✅ | 12/12 | ✅ |
| Spacing | ✅ | 8/10 | ❌ |
| Typography | ✅ | 6/6 | ✅ |
```
