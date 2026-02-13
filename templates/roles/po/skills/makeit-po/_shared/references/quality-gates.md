# Quality Gates Reference (PO View)

> File này được trích xuất từ wiki/ — single source of truth nằm ở `wiki/reference/quality-gates.md`
> PO-relevant gates được đánh dấu ⭐

---

## Cross-Check Model

- **Verifier = Receiver** — Người kiểm tra là người sẽ sử dụng output đó
- **Check before start** — Receiver kiểm tra checklist trước khi bắt đầu công việc
- **Return with specifics** — Nếu fail: ghi rõ item nào, cần bổ sung gì, tag sender trên Telegram
- **No blame, just fix** — Catch issues sớm, không để snowball

## Source of Truth Hierarchy

```
PO Goal & Context (why + what)
  └─→ Designer Specs (how it looks)
      └─→ BA User Stories (how it works) ← SOURCE OF TRUTH cho Dev
          └─→ Techlead Tasks (how to build)
              └─→ Dev Implementation (the code)
```

Conflict → escalate lên layer cao hơn để clarify.

---

> ⭐ **PO OUTPUT GATE — Bạn là SENDER tại gate này**
> Tự check output trước khi handoff cho BA. Dùng `/makeit:check-gate` để verify.

## Gate 1: Design/PO → BA

**Verifier:** BA | **Trigger:** Cả Design lẫn PO đều "Ready"

| # | Check Item | PO Role |
|---|-----------|---------|
| 1 | Design screens marked "Ready for Dev" trong Figma | Coordinate với Designer |
| 2 | All interaction states defined (hover, active, disabled, error, empty, loading) | Coordinate với Designer |
| 3 | **Goal rõ ràng: PO mô tả mục tiêu business** | ⭐ **YOUR ITEM** |
| 4 | **Context đầy đủ: PO cung cấp background, user needs, constraints** | ⭐ **YOUR ITEM** |
| 5 | **Priority xác định: PO đã set priority và sprint** | ⭐ **YOUR ITEM** |

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

## Gate 3: Techlead → FE/BE

**Verifier:** Dev FE/BE | **Trigger:** Tasks assigned

| # | Check Item |
|---|-----------|
| 1 | Task break rõ ràng: FE tasks tách biệt BE tasks |
| 2 | Scope cụ thể: mô tả rõ cần implement cái gì |
| 3 | User story reference: link đến user story của BA |
| 4 | Technical constraints noted (API limits, browser support, third-party) |
| 5 | API contract defined (nếu FE/BE cần coordinate) |
| 6 | Estimation hợp lý: Techlead đã estimate effort |
| 7 | Lark task has correct sprint, priority, and assignee |

**Fail →** Dev tag Techlead trên Telegram, ghi rõ task thiếu.

---

## Gate 4: FE/BE → Review

**Verifier:** Reviewer | **Trigger:** PR created

| # | Check Item |
|---|-----------|
| 1 | PR follows template (all required sections filled) |
| 2 | Lark task linked in PR description |
| 3 | AI Review Checklist completed (all items checked) |
| 4 | Self-reviewed diff before requesting review |
| 5 | Commit messages follow conventional commits (feat, fix, docs, chore) |
| 6 | FE: Screenshot/video attached for UI changes |
| 7 | BE: API documentation updated for endpoint changes |
| 8 | No console errors/warnings in development |
| 9 | Code follows coding standards |

**Fail →** Reviewer tag Author trên Telegram, ghi rõ PR thiếu.

---

> ⭐ **PO REVIEW GATE — Bạn là FINAL AUTHORITY tại gate này**
> Review business logic, verify acceptance criteria, approve/reject PR.

## Gate 5: Review → Done

**Verifier:** Reviewer + Designer + PO | **Trigger:** Review complete

| # | Check Item | PO Role |
|---|-----------|---------|
| 1 | At least 1 approval from team member | Team responsibility |
| 2 | Designer verified UI matches Figma design (nếu có UI changes) | Designer responsibility |
| 3 | **PO verified business logic matches specs (nếu có logic changes)** | ⭐ **YOUR ITEM** |
| 4 | All review comments addressed (resolved or explained) | Team responsibility |
| 5 | No unresolved CI checks or merge conflicts | Team responsibility |
| 6 | **PO final approval — PO là final authority** | ⭐ **YOUR ITEM** |

**Feedback loop:** Max 3 rounds → sau đó escalate lên sync meeting.
