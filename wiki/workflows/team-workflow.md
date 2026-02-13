# Team Workflow

## Overview

Document này mô tả quy trình vận hành end-to-end của team MakeIt — từ lúc Design/PO chuẩn bị đến khi feature shipped. Mỗi thành viên đọc document này sẽ hiểu rõ vị trí của mình trong chuỗi, biết mình nhận input từ ai, deliver output cho ai, và tiêu chuẩn nào cần đạt.

**Quy trình 5 stages:**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Stage 1     │    │  Stage 2     │    │  Stage 3     │    │  Stage 4     │    │  Stage 5     │
│              │    │              │    │              │    │              │    │              │
│  PO          │───▶│  BA Story    │───▶│  Techlead    │───▶│  FE/BE       │───▶│  Review &    │
│  Preparation │    │  Breakdown   │    │  Task        │    │  Implement   │    │  Feedback    │
│              │    │              │    │  Breakdown   │    │              │    │  Loop        │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
  PO                   BA                  Techlead           Dev FE + BE       Reviewer + PO
     Gate 1 ──────▶   Gate 2 ──────▶     Gate 3 ──────▶     Gate 4 ──────▶    Gate 5
  (PO→BA)           (BA→Techlead)      (TL→FE/BE)         (FE/BE→Review)    (Review→Done)
```

> 📖 **Chi tiết checklist tại mỗi gate:** Xem [Quality Gates](../reference/quality-gates.md)

---

## Stage 1: PO Preparation

**Who:** Product Owner

### PO Does

1. Xác định **goal** và **context** cho feature/epic
2. Chuẩn bị Figma design links (nếu dã có design sẵn)
3. Set priority và sprint cho backlog item trong Lark
4. Đảm bảo Figma screens đã đầy đủ interaction states (nếu PO làm design)

> 💡 **Responsive breakpoints:** Được define **1 lần** cho toàn bộ dự án (ví dụ: mobile 375px, tablet 768px, desktop 1280px). Breakpoints là project-level rules, không cần re-specify mỗi feature.

### Summary

| | Detail |
|---|---|
| **Input** | Product vision, user needs, market context |
| **Output** | HANDOFF.md (goal + context + Figma links) + Lark backlog items |
| **Handoff** | PO chạy `/makeit:complete` → commit HANDOFF.md → Tag BA trên Telegram → BA chạy `/makeit:check-handoff` |
| **Verification** | BA sẽ verify theo [Gate 1 checklist](../reference/quality-gates.md#gate-1-designpo--ba-design--backlog-ready-for-story-breakdown) |

> 📖 **Handoff format:** Xem [Handoff Format Standard](../reference/handoff-format.md)

---

## Stage 2: BA Story Breakdown

**Who:** Business Analyst

### What BA Does

1. **Verify context** — Kiểm tra PO output (pull HANDOFF.md):
   - PO goal và context đầy đủ chưa?
   - Figma designs accessible?
   - Có gì chưa rõ ràng không?

2. **Discuss nếu cần** — Nếu bất kỳ thông tin nào chưa đủ:
   - Tag PO trên Telegram
   - Ghi rõ cần bổ sung gì
   - Chờ bổ sung trước khi tiếp tục

3. **Analyze Figma & document user flow** — BA phân tích screens, kết hợp context từ PO:
   - Document user flow (entry point → happy path → edge cases)
   - Identify các scenarios cần handle
   - Map design screens với PO goals

4. **Break thành User Stories** — Từ PO Goal + Design specs + user flow analysis, BA tạo user stories:
   - Format: "As a [role], I want [action], so that [benefit]"
   - ≥ 3 acceptance criteria per story
   - Attach Figma design link
   - Document edge cases (từ user flow analysis)
   - Ghi reference nguồn (PO Goal nào, Design screen nào)

> 💡 **BA không chỉ copy-paste.** BA **verified** context, discuss các điểm chưa rõ, rồi **tổng hợp** từ PO Goal + Design specs để tạo user stories. Stories của BA trở thành **source of truth** cho Dev implementation.

### Summary

| | Detail |
|---|---|
| **Input** | PO HANDOFF.md (goal + context + Figma links) |
| **Output** | User stories + Acceptance criteria |
| **Handoff** | BA chạy `/makeit:complete` → commit HANDOFF.md → Tag TL trên Telegram → TL chạy `/makeit:check-handoff` |
| **Verification** | Techlead sẽ verify theo [Gate 2 checklist](../reference/quality-gates.md#gate-2-ba--techlead-user-stories-ready-for-task-breakdown) |

---

## Stage 3: Techlead Task Breakdown

**Who:** Tech Lead

### What Techlead Does

1. **Verify user stories** — Kiểm tra stories từ BA:
   - Format đúng? Acceptance criteria đủ?
   - Figma link accessible? Edge cases documented?
   - Đủ thông tin để break tasks chưa?

2. **Discuss nếu cần** — Nếu stories chưa đủ thông tin:
   - Tag BA trên Telegram
   - Ghi rõ story nào thiếu gì
   - BA sẽ discuss lại với PO nếu cần

3. **Break thành FE + BE tasks** — Từ user stories:
   - Tách rõ FE tasks và BE tasks
   - Mỗi task mô tả rõ scope cần implement
   - Link ngược lại user story (source of truth)
   - Ghi technical constraints (API limits, browser support, third-party)
   - Define API contracts nếu FE/BE cần coordinate
   - Estimate effort cho mỗi task

4. **Assign tasks** — Gán cho Dev FE/BE phù hợp trong Lark

### Summary

| | Detail |
|---|---|
| **Input** | BA HANDOFF.md (user stories) |
| **Output** | FE tasks + BE tasks + API contracts |
| **Handoff** | TL chạy `/makeit:complete` → commit HANDOFF.md → Tag Dev trên Telegram → Dev chạy `/makeit:check-handoff` |
| **Verification** | Dev sẽ verify theo [Gate 3 checklist](../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) |

---

## Stage 4: FE/BE Implementation

**Who:** Frontend Developer + Backend Developer

### What Dev Does

1. **Verify tasks** — Kiểm tra tasks từ Techlead:
   - Scope rõ ràng? FE/BE tách biệt?
   - User story reference có? Technical constraints noted?
   - API contract defined (nếu cần coordinate)?

2. **Discuss nếu cần** — Nếu tasks chưa đủ thông tin:
   - Tag Techlead trên Telegram
   - Ghi rõ task nào thiếu gì

3. **Lên plan và implement:**
   - Follow [Coding Standards](../reference/coding-standards.md)
   - Commit theo conventional commits format
   - Tạo PR theo [PR template](../../../.github/pull_request_template.md)
   - Self-review trước khi request review

> 💡 **Source of Truth:** BA user stories là source of truth cho implementation. Khi task description của Techlead conflict với user story của BA → **user story wins**. Dev nên cross-check với BA story khi có doubt.

### Summary

| | Detail |
|---|---|
| **Input** | TL HANDOFF.md (tasks + API contracts) |
| **Source of truth** | BA user stories |
| **Output** | Code + PR (theo PR template) + HANDOFF.md |
| **Handoff** | FE/BE chạy `/makeit:complete` → commit HANDOFF.md → Request PR review |
| **Verification** | Reviewer verify theo [Gate 4 checklist](../reference/quality-gates.md#gate-4-febe--review-code-ready-for-review) |

---

## Stage 5: Review & Feedback Loop

**Who:** Reviewer + PO

### What Happens

1. **Reviewer** check:
   - Code quality, conventions
   - PR template completed
   - AI Review Checklist passed
   - Commit messages follow format

2. **PO verify:**
   - Business logic matches specs
   - Acceptance criteria met
   - UI matches Figma design (nếu có UI changes)

3. **Feedback loop** nếu cần sửa:
   - PO/Designer/Reviewer comment trên PR — ghi rõ cần sửa gì
   - Author fix code
   - Author re-request review
   - Repeat cho đến khi PO approve

### Iteration Protocol

```
Round 1: Reviewer/Designer/PO review → feedback → Author fix
Round 2: Re-review → feedback (nếu còn) → Author fix
Round 3: Final review → nếu vẫn chưa align → ESCALATE
```

> ⚠️ **Max 3 rounds.** Nếu sau 3 rounds vẫn chưa align → escalate lên meeting sync giữa PO, Designer, BA, và Dev để clarify requirements gốc. Thường mất align là do requirements ban đầu chưa rõ, không phải do implementation sai.

### PO là Final Authority

PO có quyền quyết định cuối cùng:
- **Approve trực tiếp** — không cần Designer verify nếu thay đổi nhỏ hoặc urgent
- **Yêu cầu Designer verify** — nếu UI changes lớn, cần Designer confirm trước
- **Override minor issues** — nếu deadline tight, PO có thể accept và tạo follow-up task

### Summary

| | Detail |
|---|---|
| **Input** | PR ready for review |
| **Output** | Approved & merged code |
| **Iteration** | Max 3 rounds, sau đó escalate |
| **Final authority** | PO |

---

## Source of Truth Hierarchy

Trong toàn bộ workflow, source of truth được xếp theo thứ tự ưu tiên. Nếu có conflict giữa các layers → escalate lên layer cao hơn để clarify.

```
PO Goal & Context ─────────── WHY we build (business value)
    │
    ▼
Designer Specs ────────────── HOW it looks (visual design)
    │
    ▼
BA User Stories ───────────── HOW it works (user perspective)  ← SOURCE OF TRUTH cho Dev
    │
    ▼
Techlead Tasks ────────────── HOW to build (technical breakdown)
    │
    ▼
Dev Implementation ────────── THE CODE (actual product)
```

**Khi có doubt:**

| Situation | Action |
|-----------|--------|
| Task description conflict với user story | User story wins → check với BA |
| User story conflict với design | Discuss BA + Designer → align |
| Design conflict với PO goal | PO quyết định |
| Không chắc requirement | Check user story → check PO goal → hỏi PO |

---

## How This Connects to Other Documents

```
                    ┌─────────────────────────────┐
                    │  📋 Team Workflow            │ ← BẠN ĐANG ĐỌC CÁI NÀY
                    │  (quy trình tổng thể)       │
                    └──────────┬──────────────────┘
                               │
              ┌────────────────┼────────────────────┐
              ▼                ▼                     ▼
┌──────────────────┐ ┌──────────────────┐  ┌──────────────────┐
│  🚦 Quality Gates│ │  👥 Role Workflows│  │  📅 Sprint       │
│  (checklist tại  │ │  (chi tiết từng  │  │  Ceremonies      │
│   mỗi handoff)   │ │   role)          │  │  (meeting flow)  │
│                  │ │                  │  │                  │
│  reference/      │ │  roles/          │  │  workflows/      │
│  quality-gates.md│ │  {role}/         │  │                  │
└──────────────────┘ └──────────────────┘  └──────────────────┘
```

| Document | Khi nào dùng | Phase |
|----------|-------------|-------|
| [Quality Gates](../reference/quality-gates.md) | Tra cứu checklist tại mỗi handoff point | Phase 1 ✅ |
| [Coding Standards](../reference/coding-standards.md) | Khi viết code, tạo branch, commit, PR | Phase 1 ✅ |
| [Role Workflows](../roles/) | Chi tiết quy trình hằng ngày của từng role | ✅ Ready |
| [Sprint Ceremonies](../workflows/) | Runbooks cho refinement, planning, sync-up | ✅ Ready |

---

*Document: wiki/workflows/team-workflow.md*
*Phase: 01.1 — Team Workflow Definition*
*Last updated: 2026-02-13*
