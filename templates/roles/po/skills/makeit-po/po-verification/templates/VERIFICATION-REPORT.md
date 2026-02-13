# Verification Report: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** PO
**Date:** [YYYY-MM-DD]
**Mode:** [Backlog Creation / PR Review]
**Revision:** [0 — first check / 1 — after fixes]

---

## Phase Info

- **Phase Goal:** [From ROADMAP.md — what this phase was supposed to deliver]
- **Plan Tasks:** [N tasks completed]
- **Deliverables Produced:** [Count — backlog items, sprint plans, review feedback]

## 3-Level Verification

<!-- For each deliverable produced in this phase -->

### Deliverable: [Filename — e.g., TASK-001-login.md]

| Level | Check | Status |
|-------|-------|--------|
| **Level 1 — Existence** | File exists at expected path? | [✅/❌] |
| | File is not empty? | [✅/❌] |
| **Level 2 — Substantive** | Has real content (not stubs)? | [✅/❌] |
| | No "TBD" or "TODO" markers? | [✅/❌] |
| | Required sections present? | [✅/❌] |
| **Level 3 — Wired** | Connects to SPECS.md goals? | [✅/❌] |
| | References business objective (PO Goal)? | [✅/❌] |
| | Downstream (BA/Designer) can use it? | [✅/❌] |

<!-- Repeat for each deliverable -->

### Summary

| Deliverable | L1 Existence | L2 Substantive | L3 Wired | Verdict |
|-------------|:---:|:---:|:---:|:---:|
| [File 1] | ✅ | ✅ | ✅ | PASS |
| [File 2] | ✅ | ✅ | [✅/❌] | [PASS/FAIL] |

## PO Quality Check

<!-- Mode-specific quality verification -->

### Mode 1 — Backlog Creation Quality

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | Goal answers WHY (not WHAT or HOW) | [✅/❌] | [Evidence or fix needed] |
| 2 | Context sufficient for BA to understand and breakdown | [✅/❌] | [Evidence] |
| 3 | Priority set with rationale (not just "important") | [✅/❌] | [Evidence] |
| 4 | Constraints documented | [✅/❌] | [Evidence] |
| 5 | Edge cases identified (PO awareness items) | [✅/❌] | [Evidence] |
| 6 | Design coordination status noted | [✅/❌] | [Ready/In Progress/Not Started] |
| 7 | Acceptance criteria ≥3 checkable items per backlog | [✅/❌] | [Count per item] |

### Mode 2 — PR Review Quality

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | Decision references original user story/AC | [✅/❌] | [Story reference] |
| 2 | Issues are specific (expected vs actual behavior) | [✅/❌] | [Evidence] |
| 3 | Override decisions have follow-up tasks | [✅/❌] | [Task IDs] |
| 4 | Feedback specific enough for Dev to fix without clarification | [✅/❌] | [Evidence] |

> Agent: Fill ONLY the mode-specific section. Leave the other section blank or remove it.

## Gate 1/5 Verification

<!-- Gate check based on mode -->

### Gate 1 Sender Check (Mode 1 — Backlog Creation)

- [✅/❌] Goal rõ ràng — PO mô tả mục tiêu business for each item
- [✅/❌] Context đầy đủ — background, user needs, constraints documented
- [✅/❌] Priority xác định — priority level + rationale + sprint target set

**Gate 1 Verdict:** [✅ PASS / ❌ FAIL — list failures]

### Gate 5 Check (Mode 2 — PR Review)

- [✅/❌] Business logic verified against original AC
- [✅/❌] User flows tested end-to-end
- [✅/❌] Edge cases from original backlog addressed
- [✅/❌] PO approval decision documented with rationale

**Gate 5 Verdict:** [✅ PASS / ❌ FAIL — list failures]

## Goal-Backward Check

<!-- The critical step — catches "all green but wrong outcome" -->

**Phase Goal:** [Restate the phase goal from ROADMAP.md]

| # | Success Criterion | Is This TRUE Now? | Evidence |
|---|-------------------|:-----------------:|----------|
| 1 | [Criterion from SPECS.md] | [✅/❌] | [Where to verify — file path, content check] |
| 2 | [Criterion from SPECS.md] | [✅/❌] | [Evidence] |
| 3 | [Criterion from SPECS.md] | [✅/❌] | [Evidence] |

**Meta-question:** Would BA/Designer be able to proceed with confidence using these deliverables?
**Answer:** [Yes — ready for handoff / No — list gaps]

## Verdict

<!-- Final verdict combining all checks -->

- **3-Level Verification:** [ALL PASS / X failures]
- **PO Quality Check:** [Mode X — Clean / X issues found]
- **Gate 1/5:** [PASS / FAIL]
- **Goal-Backward:** [Achieved / Gaps found]

### Overall: [✅ PASS — mark phase complete / ⚠️ GAPS — list fixes needed]

[If GAPS: List gaps with fix instructions. Max 1 revision — second failure escalates to human.]

---

## Instructions

**How to fill this template:**

1. **3-Level Verification:** Check each deliverable file exists, has substance, and is wired to SPECS.md
2. **PO Quality Check:** Use ONLY the mode-specific section (Mode 1 or Mode 2)
3. **Gate Check:** Mode 1 → Gate 1 sender (items 3-5). Mode 2 → Gate 5 (approval quality)
4. **Goal-Backward:** Restate goal, check each criterion with evidence, ask meta-question
5. **Verdict:** Combine all results — only PASS if ALL sections pass

**Routing:**
- ALL PASS → Mark phase complete in STATE.md, suggest `/makeit:plan-phase` or `/makeit:verify-work`
- GAPS FOUND → If 0 revisions done → list gaps, suggest re-plan. If 1 revision done → ESCALATE to user

> ⚠️ AI Verification: PO must review the verification report. Agent flags issues but PO decides resolution.

---

## Filled Example

```markdown
## Verdict

- **3-Level Verification:** ALL PASS (2/2 deliverables)
- **PO Quality Check:** Mode 1 — Clean (7/7 checks pass)
- **Gate 1:** PASS (items 3-5 verified)
- **Goal-Backward:** Achieved — all 3 success criteria verified with evidence

### Overall: ✅ PASS — phase 02 complete, ready for Phase 03 or verify-work
```
