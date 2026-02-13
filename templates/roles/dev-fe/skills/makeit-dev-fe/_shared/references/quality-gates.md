# Quality Gates Reference (Dev FE View)

> File này được trích xuất từ wiki/ — single source of truth nằm ở `wiki/reference/quality-gates.md`
> Dev FE-relevant gates được đánh dấu ⭐

---

## Cross-Check Model

- **Verifier = Receiver** — Người kiểm tra là người sẽ sử dụng output đó
- **Check before start** — Receiver kiểm tra checklist trước khi bắt đầu công việc
- **Return with specifics** — Nếu fail: ghi rõ item nào, cần bổ sung gì, tag sender trên Telegram
- **No blame, just fix** — Catch issues sớm, không để snowball

## Source of Truth Hierarchy

```
PO Goal & Context (why + what)
  └─→ Designer Specs (how it looks) ← VISUAL SOURCE OF TRUTH
      └─→ BA User Stories (how it works) ← SOURCE OF TRUTH cho Dev
          └─→ Techlead Tasks (how to build)
              └─→ Dev Implementation (the code) ← ⭐ YOU BUILD THIS
```

Conflict → escalate lên layer cao hơn để clarify.

---

## Gate 1: Design/PO → BA

**Verifier:** BA | **Trigger:** Cả Design lẫn PO đều "Ready"

| # | Check Item |
|---|-----------|
| 1 | Design screens marked "Ready for Dev" trong Figma |
| 2 | All interaction states defined (hover, active, disabled, error, empty, loading) |
| 3 | Goal rõ ràng: PO mô tả mục tiêu business |
| 4 | Context đầy đủ: PO cung cấp background, user needs, constraints |
| 5 | Priority xác định: PO đã set priority và sprint |

> 💡 Design tokens consistency và copy/text finalization là **Designer responsibility** — đã verify qua `mark-ready` trước khi mark "Ready for Dev".

**Fail →** BA tag Designer/PO trên Telegram, ghi rõ item thiếu.

---

## Gate 2: BA → Techlead

**Verifier:** Techlead | **Trigger:** Stories ready

| # | Check Item |
|---|-----------|
| 1 | User story follows format: "As a [role], I want [action], so that [benefit]" |
| 2 | Acceptance criteria listed (≥ 3 checkable items) |
| 3 | Figma design link attached and accessible |
| 4 | Edge cases documented (empty state, error state, boundary conditions) |
| 5 | Dependencies identified and status confirmed |
| 6 | Source context rõ ràng: reference đến PO Goal + Design specs |
| 7 | Lark task has correct sprint, priority, and assignee |

**Fail →** Techlead tag BA trên Telegram, ghi rõ story thiếu.

---

> ⭐ **DEV FE VERIFIES THIS GATE — Bạn là VERIFIER tại gate này**
> Check tasks từ Techlead trước khi implement. Gate 3 check is built into `/makeit:clarify`.

## Gate 3: Techlead → FE/BE

**Verifier:** Dev FE/BE | **Trigger:** Tasks assigned

| # | Check Item | Dev FE Action |
|---|-----------|---------------|
| 1 | Task break rõ ràng: FE tasks tách biệt BE tasks | ⭐ **VERIFY THIS** |
| 2 | Scope cụ thể: mô tả rõ cần implement cái gì | ⭐ **VERIFY THIS** |
| 3 | User story reference: link đến user story của BA | ⭐ **VERIFY THIS** |
| 4 | Technical constraints noted (browser support, third-party) | ⭐ **VERIFY THIS** |
| 5 | API contract defined (nếu FE/BE cần coordinate) | ⭐ **VERIFY THIS** |
| 6 | Estimation hợp lý: Techlead đã estimate effort | ⭐ **VERIFY THIS** |
| 7 | Lark task has correct sprint, priority, and assignee | ⭐ **VERIFY THIS** |

**Fail →** Dev tag Techlead trên Telegram, ghi rõ task thiếu.

---

> ⭐ **DEV FE OUTPUT GATE — Bạn là SENDER tại gate này**
> Self-check output trước khi request review. Dùng `/makeit:check-gate` và `/makeit:self-review` để verify.

## Gate 4: FE/BE → Review

**Verifier:** Reviewer | **Trigger:** PR created

| # | Check Item | Dev FE Role |
|---|-----------|-------------|
| 1 | PR follows template (all required sections filled) | ⭐ **YOUR ITEM** |
| 2 | Lark task linked in PR description | ⭐ **YOUR ITEM** |
| 3 | AI Review Checklist completed (all items checked) | ⭐ **YOUR ITEM** |
| 4 | Self-reviewed diff before requesting review | ⭐ **YOUR ITEM** |
| 5 | Commit messages follow conventional commits (feat, fix, docs, chore) | ⭐ **YOUR ITEM** |
| 6 | Screenshot/video attached for UI changes | ⭐ **YOUR ITEM** |
| 7 | BE: API documentation updated for endpoint changes | N/A for FE |
| 8 | No console errors/warnings in development | ⭐ **YOUR ITEM** |
| 9 | Code follows coding standards | ⭐ **YOUR ITEM** |

**Fail →** Reviewer tag Author trên Telegram, ghi rõ PR thiếu.

---

## Gate 5: Review → Done

**Verifier:** Reviewer + Designer + PO | **Trigger:** Review complete

| # | Check Item |
|---|-----------|
| 1 | At least 1 approval from team member |
| 2 | Designer verified UI matches Figma design (nếu có UI changes) |
| 3 | PO verified business logic matches specs (nếu có logic changes) |
| 4 | All review comments addressed (resolved or explained) |
| 5 | No unresolved CI checks or merge conflicts |
| 6 | PO final approval — PO là final authority |

**Feedback loop:** Max 3 rounds → sau đó escalate lên sync meeting.
