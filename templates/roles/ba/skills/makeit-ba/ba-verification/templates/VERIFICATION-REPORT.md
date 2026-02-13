# Verification Report: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** BA
**Date:** [YYYY-MM-DD]
**Revision:** [0 — first check / 1 — after fixes]

---

## Phase Info

- **Phase Goal:** [From ROADMAP.md — what this phase was supposed to deliver]
- **Plan Tasks:** [N tasks completed]
- **Deliverables Produced:** [Count — stories, flows, analysis reports]

## 3-Level Verification

<!-- For each deliverable produced in this phase -->

### Deliverable: [Filename — e.g., US-001-login.md]

| Level | Check | Status |
|-------|-------|--------|
| **Level 1 — Existence** | File exists at expected path? | [✅/❌] |
| | File is not empty? | [✅/❌] |
| **Level 2 — Substantive** | Has real content (not stubs)? | [✅/❌] |
| | No "TBD" or "TODO" markers? | [✅/❌] |
| | Required sections present? | [✅/❌] |
| **Level 3 — Wired** | Connects to SPECS.md goals? | [✅/❌] |
| | References upstream inputs (PO Goal, Figma)? | [✅/❌] |
| | Downstream (Techlead) can use it? | [✅/❌] |

<!-- Repeat for each deliverable -->

### Summary

| Deliverable | L1 Existence | L2 Substantive | L3 Wired | Verdict |
|-------------|:---:|:---:|:---:|:---:|
| [File 1] | ✅ | ✅ | ✅ | PASS |
| [File 2] | ✅ | ✅ | [✅/❌] | [PASS/FAIL] |
| [File 3] | ✅ | [✅/❌] | [✅/❌] | [PASS/FAIL] |

## BA Self-Review

<!-- Internal quality check before formal gate verification -->

| # | Check Item | Status | Auto-fix Applied? |
|---|-----------|--------|-------------------|
| 1 | User story format ("As a... I want... So that...") | [✅/❌] | [Yes — fixed / No / N/A] |
| 2 | Acceptance criteria ≥3 checkable items | [✅/❌] | [Yes — added / No / N/A] |
| 3 | Figma design link attached and accessible | [✅/❌] | [Yes — added / No — flagged for user] |
| 4 | Edge cases documented | [✅/❌] | [Yes — added / No / N/A] |
| 5 | Dependencies identified | [✅/❌] | [Yes — added / No / N/A] |
| 6 | Source context (PO Goal + Design specs reference) | [✅/❌] | [Yes — added / No / N/A] |
| 7 | Lark task metadata | [✅/❌] | [No — flagged for user] |

**Auto-fixes applied:** [Count — e.g., "3 auto-fixes (format, AC count, edge cases)"]
**Flagged for user:** [Items requiring human action — Lark updates, Figma access]

## Gate 2 Formal Check

<!-- Binary pass/fail — from quality-gates.md -->

- [✅/❌] All stories follow format standard
- [✅/❌] All stories have ≥3 acceptance criteria
- [✅/❌] Figma links attached to all stories
- [✅/❌] Edge cases documented and integrated into AC
- [✅/❌] Dependencies identified per story
- [✅/❌] Source context referenced (PO Goal + Figma)

**Gate 2 Verdict:** [✅ PASS / ❌ FAIL — list failures]

## Goal-Backward Check

<!-- The critical step — catches "all green but wrong outcome" -->

**Phase Goal:** [Restate the phase goal from ROADMAP.md]

| # | Success Criterion | Is This TRUE Now? | Evidence |
|---|-------------------|:-----------------:|----------|
| 1 | [Criterion from SPECS.md] | [✅/❌] | [Where to verify — file path, content check] |
| 2 | [Criterion from SPECS.md] | [✅/❌] | [Evidence] |
| 3 | [Criterion from SPECS.md] | [✅/❌] | [Evidence] |

**Meta-question:** Would Techlead be able to proceed with confidence using these deliverables?
**Answer:** [Yes — ready for handoff / No — list gaps]

## Verdict

<!-- Final verdict combining all checks -->

- **3-Level Verification:** [ALL PASS / X failures]
- **Self-Review:** [Clean / X auto-fixes applied]
- **Gate 2:** [PASS / FAIL]
- **Goal-Backward:** [Achieved / Gaps found]

### Overall: [✅ PASS — mark phase complete / ⚠️ GAPS — list fixes needed]

[If GAPS: List gaps with fix instructions. Max 1 revision — second failure escalates to human.]

---

## Instructions

**How to fill this template:**

1. **3-Level Verification:** Check each deliverable file exists, has substance, and is wired to SPECS.md
2. **Self-Review:** Run 7-point BA quality check — auto-fix what you can, flag the rest
3. **Gate 2:** Binary pass/fail on each item — no partial credit
4. **Goal-Backward:** Restate goal, check each criterion with evidence, ask meta-question
5. **Verdict:** Combine all results — only PASS if ALL sections pass

**Routing:**
- ALL PASS → Mark phase complete in STATE.md, suggest `/makeit:plan-phase` or `/makeit:verify-work`
- GAPS FOUND → If 0 revisions done → list gaps, suggest re-plan. If 1 revision done → ESCALATE to user

---

## Filled Example

```markdown
## Verdict

- **3-Level Verification:** ALL PASS (3/3 deliverables)
- **Self-Review:** 2 auto-fixes applied (added missing AC to US-002, added edge case to US-001)
- **Gate 2:** PASS
- **Goal-Backward:** Achieved — all 3 success criteria verified with evidence

### Overall: ✅ PASS — phase 02 complete, ready for Phase 03 or verify-work
```
