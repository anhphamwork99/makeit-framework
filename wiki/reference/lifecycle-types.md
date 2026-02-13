# Lifecycle Types

> MakeIt framework có 3 loại lifecycle riêng biệt. Mỗi lifecycle có trigger, owner, và flow khác nhau. Không nhầm lẫn giữa chúng.

---

## 1. Sprint Lifecycle (per role)

**Flow:**

```
clarify → [discuss → show-approach → research →] plan → execute → verify → verify-work → complete
```

**Owned by:** Each role during their Stage (PO=Stage 1, BA=Stage 2, TL=Stage 3, FE/BE=Stage 4)

**Triggers:** New sprint assignment from upstream role (Lark Sprint Issue)

**Ends:** Handoff to downstream role / PR created

**Commands:**
- `/makeit:clarify` — Entry point, verify input gate
- `/makeit:discuss-phase` — Gather context (optional)
- `/makeit:show-phase-approach` — Surface assumptions (optional)
- `/makeit:research-phase` — Deep research (optional)
- `/makeit:plan-phase` — Create execution plan
- `/makeit:execute-phase` — Execute plan tasks
- `/makeit:verify-phase` — Goal-backward check per phase
- `/makeit:verify-work` — Validate all deliverables vs SPECS.md
- `/makeit:complete` — Package, handoff, git sync

**Scope:** This is the PRIMARY lifecycle — covers the full journey from receiving work to delivering output.

---

## 2. PR Iteration Lifecycle (FE, BE)

**Flow:**

```
receive-feedback → prioritize → fix → re-verify → update-pr → [repeat max 3x]
```

**Owned by:** Dev FE/BE after PR review

**Triggers:** Reviewer (Designer/Techlead) posts comments on PR

**Ends:** PR approved or escalated (max 3 rounds → sync meeting)

**Commands:**
- `fix-feedback` workflow (internal, not a stage command)

**Key rules:**
1. Fix critical + important first — nice-to-have can wait
2. Re-verify after fixes — run self-review + compare-ui (FE) again
3. Max 3 rounds — escalate if feedback loop continues
4. STOP before force-push — always ask user
5. Respond to ALL comments — even if "won't fix" with reason

**Location:**
- FE: `fe-lifecycle/workflows/fix-feedback.md`
- BE: `be-lifecycle/workflows/fix-feedback.md`

> ⚠️ This is NOT part of Sprint Lifecycle. This happens AFTER `/makeit:complete` creates the PR. It's a separate iteration loop triggered by review feedback.

---

## 3. Code Review Lifecycle (TL)

**Flow:**

```
receive-pr → review-code → provide-feedback → verify-fixes → approve
```

**Owned by:** Techlead during Stage 5 (Review)

**Triggers:** Dev submits PR for review

**Ends:** PR approved or rejected

**Commands:**
- `review-code` workflow (internal, within `tl-execution/stage-execute-phase.md`)

**Key responsibilities:**
1. Architecture compliance — patterns match team standards
2. Coding standards — naming, structure, conventions
3. AI-generated code oversight — verify AI output quality
4. Performance and security — no obvious issues
5. Provide actionable feedback with specific file/line references

**Location:**
- TL: `tl-execution/stage-execute-phase.md` (inline workflow section)

> ⚠️ This is NOT part of Sprint Lifecycle. This happens when Techlead reviews Dev PRs. The TL may be in their own Sprint Lifecycle (breaking tasks) while also handling code reviews — these are independent.

---

## Lifecycle Interaction Diagram

```
Sprint Lifecycle (Dev FE/BE)         PR Iteration Lifecycle
━━━━━━━━━━━━━━━━━━━━━━━━━━━         ━━━━━━━━━━━━━━━━━━━━━
clarify → plan → execute             receive-feedback
    → verify → verify-work                → prioritize
        → complete ──────────┐            → fix
                             │            → re-verify
                    Creates PR│            → update-pr
                             │            → [repeat max 3x]
                             ▼
                        PR Created ─── triggers ──→ Code Review Lifecycle (TL)
                                                    ━━━━━━━━━━━━━━━━━━━━━━━
                                                    receive-pr
                                                        → review-code
                                                        → provide-feedback ──→ triggers PR Iteration
                                                        → verify-fixes
                                                        → approve
```

---

## Summary

| Lifecycle | Owner | Trigger | Commands | Max Iterations |
|-----------|-------|---------|----------|----------------|
| Sprint | Each role | Lark Sprint Issue | 9 stage commands | Per-phase iteration |
| PR Iteration | Dev FE/BE | Review feedback on PR | fix-feedback (internal) | Max 3 rounds |
| Code Review | Techlead | Dev submits PR | review-code (internal) | Until approve/reject |
