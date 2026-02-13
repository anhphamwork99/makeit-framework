# Spec Verification — [Feature/Epic Name]

## Metadata

- **Date:** [YYYY-MM-DD]
- **Feature:** [Feature name]
- **PO Backlog Item:** [Lark link / LARK-ID]
- **Figma File:** [Figma link]
- **Verified by:** BA

---

## Design Output Check

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | Screens marked "Ready for Dev" trong Figma | [✅/❌] | [Ghi chú nếu cần] |
| 2 | Interaction states defined (hover, active, disabled, error, empty, loading) | [✅/❌] | [Screens nào thiếu] |

> 💡 Design tokens consistency và copy/text finalization là **Designer responsibility** — đã verify qua `mark-ready` trước khi mark "Ready for Dev".

## PO Backlog Check

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 3 | Goal rõ ràng — PO mô tả rõ mục tiêu business | [✅/❌] | [What's unclear] |
| 4 | Context đầy đủ — background, user needs, constraints | [✅/❌] | [What's missing] |
| 5 | Priority + sprint xác định trong Lark | [✅/❌] | [Status] |

---

## Verdict

- [ ] ✅ **PASS** — All items checked. Bắt đầu story breakdown.
- [ ] ❌ **FAIL** — Cần bổ sung items bên dưới trước khi bắt đầu.

## Items Cần Bổ Sung (nếu FAIL)

| # | Item thiếu | Cần từ ai | Đã tag Telegram? | Status |
|---|-----------|-----------|-------------------|--------|
| 1 | [Mô tả item thiếu] | [PO / Designer] | [☐/☑] | [Pending / Resolved] |
| 2 | [Mô tả item thiếu] | [PO / Designer] | [☐/☑] | [Pending / Resolved] |

## Clarification Message (auto-draft nếu FAIL)

```
❓ Clarification needed: [Feature name]

From: BA → To: [PO / Designer]
Task: [LARK-ID]

Items cần bổ sung:
1. [Item 1 — mô tả cụ thể]
2. [Item 2 — mô tả cụ thể]

Context: BA đang verify input cho story breakdown, cần các items trên để bắt đầu.
```
