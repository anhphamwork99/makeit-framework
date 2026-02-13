# Verification Report: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Techlead
**Date:** [YYYY-MM-DD]
**Revision:** [0 — first check / 1 — after fixes]

---

## Phase Info

- **Phase Goal:** [From ROADMAP.md — what this phase was supposed to deliver]
- **Plan Tasks:** [N tasks completed]
- **Deliverables Produced:** [Count — task breakdowns, API contracts, estimations, ADRs]

## 3-Level Verification

<!-- For each deliverable produced in this phase -->

### Deliverable: [Filename — e.g., TASK-login-fe.md]

| Level | Check | Status |
|-------|-------|--------|
| **Level 1 — Existence** | File exists at expected path? | [✅/❌] |
| | File is not empty? | [✅/❌] |
| **Level 2 — Substantive** | Has real content (not stubs)? | [✅/❌] |
| | No "TBD" or "TODO" markers? | [✅/❌] |
| | Required sections present? | [✅/❌] |
| **Level 3 — Wired** | Connects to SPECS.md goals? | [✅/❌] |
| | References upstream inputs (BA stories, Figma)? | [✅/❌] |
| | Downstream (Dev FE/BE) can use it? | [✅/❌] |

<!-- Repeat for each deliverable -->

### Summary

| Deliverable | L1 Existence | L2 Substantive | L3 Wired | Verdict |
|-------------|:---:|:---:|:---:|:---:|
| [File 1] | ✅ | ✅ | ✅ | PASS |
| [File 2] | ✅ | ✅ | [✅/❌] | [PASS/FAIL] |
| [File 3] | ✅ | [✅/❌] | [✅/❌] | [PASS/FAIL] |

## TL Self-Review

<!-- Internal quality check before formal gate verification -->

| # | Check Item | Status | Auto-fix Applied? |
|---|-----------|--------|-------------------|
| 1 | Task breakdowns: FE tasks separated from BE tasks | [✅/❌] | [Yes — fixed / No / N/A] |
| 2 | Task scope: each task has clear scope, AC, and deliverable | [✅/❌] | [Yes — clarified / No / N/A] |
| 3 | API contracts: FE↔BE coordination points defined | [✅/❌] | [Yes — added / No / N/A] |
| 4 | Estimations: all tasks estimated with methodology | [✅/❌] | [Yes — estimated / No / N/A] |
| 5 | Architecture: rationale documented for design decisions | [✅/❌] | [Yes — added / No / N/A] |
| 6 | Dependencies: cross-task and cross-team dependencies identified | [✅/❌] | [Yes — added / No / N/A] |
| 7 | AI-generated code oversight: AI quality standards noted where relevant | [✅/❌] | [No — flagged for review] |
| 8 | Dev can work independently: no ambiguity requiring TL consultation | [✅/❌] | [Yes — clarified / No / N/A] |

**Auto-fixes applied:** [Count — e.g., "2 auto-fixes (scope clarification, missing estimate)"]
**Flagged for user:** [Items requiring human action — Lark updates, ADR approvals]

## Gate 3 Formal Check

<!-- Binary pass/fail — from quality-gates.md -->

- [✅/❌] Task break rõ ràng: FE tasks tách biệt BE tasks
- [✅/❌] Scope cụ thể: mô tả rõ cần implement cái gì
- [✅/❌] User story reference: link đến BA story
- [✅/❌] Technical constraints noted
- [✅/❌] API contract defined (if FE/BE coordinate)
- [✅/❌] Estimation hợp lý: effort estimated
- [✅/❌] Lark task has correct sprint, priority, assignee

**Gate 3 Verdict:** [✅ PASS / ❌ FAIL — list failures]

## Goal-Backward Check

<!-- The critical step — catches "all green but wrong outcome" -->

**Phase Goal:** [Restate the phase goal from ROADMAP.md]

| # | Success Criterion | Is This TRUE Now? | Evidence |
|---|-------------------|:-----------------:|----------|
| 1 | [Criterion from SPECS.md] | [✅/❌] | [Where to verify — file path, content check] |
| 2 | [Criterion from SPECS.md] | [✅/❌] | [Evidence] |
| 3 | [Criterion from SPECS.md] | [✅/❌] | [Evidence] |

**Meta-question:** Would Dev FE and Dev BE be able to proceed with confidence using these deliverables?
**Answer:** [Yes — ready for handoff / No — list gaps]

## Verdict

<!-- Final verdict combining all checks -->

- **3-Level Verification:** [ALL PASS / X failures]
- **Self-Review:** [Clean / X auto-fixes applied]
- **Gate 3:** [PASS / FAIL]
- **Goal-Backward:** [Achieved / Gaps found]

### Overall: [✅ PASS — mark phase complete / ⚠️ GAPS — list fixes needed]

[If GAPS: List gaps with fix instructions. Max 1 revision — second failure escalates to human.]

---

## Instructions

**How to fill this template:**

1. **3-Level Verification:** Check each deliverable file exists, has substance, and is wired to SPECS.md
2. **Self-Review:** Run 8-point TL quality check — auto-fix what you can, flag the rest
3. **Gate 3:** Binary pass/fail on each item — no partial credit
4. **Goal-Backward:** Restate goal, check each criterion with evidence, ask meta-question
5. **Verdict:** Combine all results — only PASS if ALL sections pass

**TL-specific verification focus:**
- FE/BE separation: tasks must be independently executable by separate developers
- API contracts: every FE↔BE coordination point must have a defined contract
- Estimation accuracy: risk factors identified, buffer applied
- Architecture adherence: design decisions match CONTEXT.md/RESEARCH.md decisions

**Routing:**
- ALL PASS → Mark phase complete in STATE.md, suggest `/makeit:plan-phase` or `/makeit:verify-work`
- GAPS FOUND → If 0 revisions done → list gaps, suggest re-execute. If 1 revision done → ESCALATE to user

---

## Filled Example

```markdown
## Verdict

- **3-Level Verification:** ALL PASS (4/4 deliverables)
- **Self-Review:** 1 auto-fix applied (added missing dependency note to TASK-login-be.md)
- **Gate 3:** PASS (7/7 items)
- **Goal-Backward:** Achieved — all 3 success criteria verified with evidence

### Overall: ✅ PASS — phase 01 complete, ready for Phase 02 or verify-work
```
