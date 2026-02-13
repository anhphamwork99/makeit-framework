# Team Workflow Reference (Dev BE View)

> File này được trích xuất từ wiki/ — single source of truth nằm ở `wiki/workflows/team-workflow.md`
> Dev BE-relevant stages được đánh dấu ⭐

---

## 5-Stage Pipeline

```
                                                    > ⭐ YOUR STAGE
Stage 1         Stage 2         Stage 3         Stage 4         Stage 5
Design/PO   ──▶ BA Story    ──▶ Techlead    ──▶ FE/BE       ──▶ Review &
Preparation     Breakdown       Task Break      Implement       Feedback Loop
                                                                
Designer+PO     BA              Techlead        Dev FE+BE       Reviewer+PO
                                                                +Designer
  Gate 1 ─────▶ Gate 2 ─────▶ Gate 3 ─────▶ Gate 4 ─────▶ Gate 5
(Design/PO→BA) (BA→TL)       (TL→Dev)       (Dev→Review)   (Review→Done)
```

---

## Per-Stage Summary

| Stage | Who | Input | Output | Gate |
|-------|-----|-------|--------|------|
| 1 | Designer + PO | Product vision, user needs | Figma designs ("Ready") + Lark backlog (goal + context) | Gate 1: BA verifies |
| 2 | BA | PO backlog + Designer specs | User stories + Acceptance criteria | Gate 2: Techlead verifies |
| 3 | Techlead | User stories từ BA | FE tasks + BE tasks + API contracts | Gate 3: Dev verifies |
| **4** ⭐ | **Dev FE + BE** | Tasks từ Techlead | Code + PR (theo template) | Gate 4: Reviewer verifies |
| 5 | Reviewer + Designer + PO | PR ready for review | Approved & merged code | Gate 5: PO final approve |

---

## Source of Truth Hierarchy

```
PO Goal & Context ──────── WHY we build (business value)
    │
    ▼
Designer Specs ─────────── HOW it looks (visual design)
    │
    ▼
BA User Stories ────────── HOW it works (user perspective) ← SOURCE OF TRUTH cho Dev ⭐
    │
    ▼
Techlead Tasks ─────────── HOW to build (technical breakdown)
    │
    ▼
Dev Implementation ─────── THE CODE (actual product) ← ⭐ YOU BUILD THIS
```

**Conflict resolution:**

| Situation | Action |
|-----------|--------|
| Task conflict với user story | **User story wins** → check với BA ⭐ |
| User story conflict với design | Discuss BA + Designer → align |
| Design conflict với PO goal | PO quyết định |
| Không chắc requirement | Check user story → PO goal → hỏi PO |

---

## Handoff Rules

- **Cross-check model:** Receiver kiểm tra input trước khi bắt đầu (không phải sender tự check)
- **Return with specifics:** Ghi rõ item nào fail, cần bổ sung gì, tag sender trên Telegram
- **Feedback loop:** Max 3 rounds → escalate lên sync meeting
- **PO final authority:** PO có quyền approve trực tiếp hoặc yêu cầu Designer verify
