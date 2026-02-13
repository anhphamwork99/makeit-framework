# Quality Gates

## Overview

Quality gates là các checkpoint trước mỗi lần handoff giữa các vai trò trong team. Mục đích là đảm bảo output đạt tiêu chuẩn trước khi người tiếp theo bắt đầu công việc.

**MakeIt workflow flow:** Design/PO → BA → Techlead → FE/BE → Review → Done

Mỗi gate có checklist cụ thể. Người **nhận** (receiver) kiểm tra checklist trước khi bắt đầu — đây là **cross-check model** (xem chi tiết ở cuối tài liệu).

> **Tích hợp Lark:** Mỗi gate tương ứng với 1 task status transition trong Lark. Team members check items trong checklist trước khi chuyển status. Xem phần [Lark Task Integration](#lark-task-integration) để biết cách setup.

---

## Gate 1: Design/PO → BA (Design & Backlog Ready for Story Breakdown)

**Verifier:** BA (người nhận design output và backlog từ PO)

BA kiểm tra các items sau **trước khi** bắt đầu viết user stories. Gate này yêu cầu **cả Design lẫn PO** đã hoàn thiện phần của mình:

### Design Output

| # | Check Item | Verifier |
|---|-----------|----------|
| 1 | Design screens marked "Ready for Dev" trong Figma | BA |
| 2 | All interaction states defined (hover, active, disabled, error, empty, loading) | BA |
| 3 | Design tokens consistent với design system (colors, typography, spacing) | BA |
| 4 | Copy/text finalized (không còn "Lorem ipsum" hay placeholder text) | BA |

> 💡 **Lưu ý:** Responsive breakpoints là project-level rules, Designer define 1 lần cho toàn dự án. User flow documentation thuộc về BA (analyze Figma + PO context → document flow).

### PO Backlog

| # | Check Item | Verifier |
|---|-----------|----------|
| 5 | Goal rõ ràng: PO mô tả mục tiêu business của feature/epic | BA |
| 6 | Context đầy đủ: PO cung cấp background, user needs, và constraints | BA |
| 7 | Priority xác định: PO đã set priority và sprint cho backlog item | BA |

**Nếu bất kỳ item nào fail:** BA tag Designer/PO trên Telegram, ghi rõ item nào thiếu và cần bổ sung gì. BA **không bắt đầu** viết stories cho đến khi cả Design và PO output đều pass.

---

## Gate 2: BA → Techlead (User Stories Ready for Task Breakdown)

**Verifier:** Techlead (người nhận user stories để break thành tasks)

Techlead kiểm tra các items sau **trước khi** bắt đầu break stories thành FE/BE tasks:

| # | Check Item | Verifier |
|---|-----------|----------|
| 1 | User story follows format: "As a [role], I want [action], so that [benefit]" | Techlead |
| 2 | Acceptance criteria listed (≥ 3 checkable items) | Techlead |
| 3 | Figma design link attached and accessible | Techlead |
| 4 | Edge cases documented (empty state, error state, boundary conditions) | Techlead |
| 5 | Dependencies identified and status confirmed (blocked tasks flagged) | Techlead |
| 6 | Source context rõ ràng: BA ghi reference đến PO Goal + Design specs đã dùng để tạo story | Techlead |
| 7 | Lark task has correct sprint, priority, and assignee (BA → Techlead) | Techlead |

**Nếu bất kỳ item nào fail:** Techlead tag BA trên Telegram, ghi rõ user story nào thiếu thông tin. BA discuss lại với PO/Designer nếu cần và bổ sung.

> 💡 **Lưu ý:** BA không chỉ copy-paste specs của PO. BA **verified** context, discuss các điểm chưa rõ ràng, rồi **break thành user stories** từ Goal & Context của PO và Design của Designer.

---

## Gate 3: Techlead → FE/BE (Tasks Ready for Implementation)

**Verifier:** Dev FE/BE (người nhận tasks để implement)

Dev kiểm tra các items sau **trước khi** bắt đầu implement:

| # | Check Item | Verifier |
|---|-----------|----------|
| 1 | Task được break rõ ràng: FE tasks tách biệt BE tasks | Dev |
| 2 | Scope cụ thể: mỗi task mô tả rõ cần implement cái gì | Dev |
| 3 | User story reference: link đến user story của BA (source of truth) | Dev |
| 4 | Technical constraints noted (API limits, browser support, third-party limitations) | Dev |
| 5 | API contract defined (nếu FE/BE cần coordinate): endpoint, request/response format | Dev |
| 6 | Estimation hợp lý: Techlead đã estimate effort cho task | Dev |
| 7 | Lark task has correct sprint, priority, and assignee (Techlead → Dev) | Dev |

**Nếu bất kỳ item nào fail:** Dev tag Techlead trên Telegram, ghi rõ task nào thiếu thông tin và cần bổ sung gì.

> 💡 **Source of Truth:** BA user stories là source of truth cho implementation. Nếu task description của Techlead conflict với user story của BA → user story wins. Dev nên cross-check với BA story khi có doubt.

---

## Gate 4: FE/BE → Review (Code Ready for Review)

**Verifier:** Reviewer (người nhận code để review)

Reviewer kiểm tra các items sau **trước khi** bắt đầu review code:

| # | Check Item | Verifier |
|---|-----------|----------|
| 1 | PR follows template (all required sections filled) | Reviewer |
| 2 | Lark task linked in PR description | Reviewer |
| 3 | AI Review Checklist completed (all items checked) | Reviewer |
| 4 | Self-reviewed diff before requesting review | Reviewer |
| 5 | Commit messages follow conventional commits format (`feat:`, `fix:`, `docs:`, `chore:`) | Reviewer |
| 6 | FE: Screenshot/video attached for UI changes | Reviewer |
| 7 | BE: API documentation updated for endpoint changes | Reviewer |
| 8 | No console errors/warnings in development | Reviewer |
| 9 | Code follows [Coding Standards](./coding-standards.md) | Reviewer |

**Nếu bất kỳ item nào fail:** Reviewer tag Author trên Telegram, ghi rõ PR thiếu gì. Author bổ sung trước khi review chính thức bắt đầu.

---

## Gate 5: Review → Done (Approved for Merge)

**Verifier:** Reviewer + Designer + PO

Đây là gate cuối cùng trước khi merge. Cần nhiều người verify tùy loại thay đổi. Gate này cũng bao gồm **feedback loop** để iterate nếu cần:

| # | Check Item | Verifier |
|---|-----------|----------|
| 1 | At least 1 approval from team member | Reviewer |
| 2 | Designer verified UI matches Figma design (nếu có UI changes) | Designer |
| 3 | PO verified business logic matches specs (nếu có logic changes) | PO |
| 4 | All review comments addressed (resolved or explained) | Author |
| 5 | No unresolved CI checks or merge conflicts | Author |
| 6 | PO final approval — PO có quyền pass toàn bộ hoặc yêu cầu Designer verify nếu cần | PO |

> **⚡ PO là final authority:** PO có thể approve mà không cần Designer verify nếu thay đổi nhỏ hoặc urgent. PO cũng có thể yêu cầu Designer verify trước khi approve. Quyền quyết định thuộc về PO.

### Feedback Loop

Nếu PO hoặc Designer phát hiện output chưa đạt yêu cầu:

1. **PO/Designer comment** trên PR — ghi rõ cần sửa gì, reference user story hoặc design
2. **Author fix** — sửa code theo feedback
3. **Re-request review** — Author request review lại từ người đã comment
4. **Repeat** cho đến khi PO approve

> 💡 **Iteration protocol:** Feedback loop tối đa **3 rounds**. Nếu sau 3 rounds vẫn chưa align → escalate lên meeting sync giữa PO, Designer, BA, và Dev để clarify requirements gốc.

**Nếu bất kỳ item nào fail:** Tag người liên quan trên Telegram. Author fix và request re-review.

---

## Cross-Check Model

### How It Works

Cross-check model là cách team MakeIt kiểm soát chất lượng handoff. Nguyên tắc cốt lõi:

1. **Verifier = Receiver** — Người kiểm tra là người sẽ **sử dụng** output đó:
   - BA kiểm tra Design/PO output → vì BA cần chúng để viết stories
   - Techlead kiểm tra BA stories → vì Techlead cần chúng để break tasks
   - Dev kiểm tra Techlead tasks → vì Dev cần chúng để implement
   - Reviewer kiểm tra Dev code → vì Reviewer cần đánh giá chất lượng

2. **Check before start** — Receiver kiểm tra checklist **trước khi** bắt đầu công việc của mình. Không phải sau khi xong.

3. **Return with specifics** — Nếu bất kỳ item nào fail:
   - Ghi rõ item nào fail
   - Mô tả cụ thể cần bổ sung gì
   - Tag sender trên Telegram kèm link đến PR/task

4. **No blame, just fix** — Model này không phải để bắt lỗi của người khác. Nó giúp team catch issues sớm trước khi chúng snowball thành problems lớn hơn.

### Source of Truth Hierarchy

Trong toàn bộ workflow, source of truth có thứ tự ưu tiên:

```
PO Goal & Context (why + what)
    └─→ Designer Specs (how it looks)
        └─→ BA User Stories (how it works) ← SOURCE OF TRUTH cho Dev
            └─→ Techlead Tasks (how to build)
                └─→ Dev Implementation (the code)
```

Nếu có conflict giữa các layers → escalate lên layer cao hơn để clarify.

### Why Cross-Check?

| Traditional (self-check) | Cross-check (receiver verifies) |
|--------------------------|--------------------------------|
| Sender tự kiểm tra output | Receiver kiểm tra input |
| Dễ miss vì "nhìn quen rồi" | Fresh eyes bắt lỗi tốt hơn |
| Không ai challenge quality | Có built-in quality check |
| Issues phát hiện muộn | Issues phát hiện sớm nhất có thể |

---

## Lark Task Integration

### Setup

**Recommended: Checklist trong Task Description (Option A)**

Cách đơn giản nhất để integrate quality gates vào Lark:

1. **Tạo checklist trong task description** — Copy gate items vào description dưới dạng checklist markdown
2. **Check items trước khi chuyển status** — Team member (receiver) tick từng item
3. **Chuyển status khi tất cả items đã checked**

### Workflow

```
Design/PO hoàn thành → Tạo/update Lark task với checklist Gate 1
                      → Chuyển task sang "Ready for BA"
                      → Tag BA trên Telegram

BA hoàn thành stories → Update task với checklist Gate 2
                      → Chuyển task sang "Ready for Techlead"
                      → Tag Techlead trên Telegram

Techlead break tasks  → Create subtasks cho FE/BE với checklist Gate 3
                      → Assign cho Dev
                      → Tag Dev trên Telegram

Dev hoàn thành code   → Tạo PR với checklist Gate 4
                      → Request review

Review complete       → Checklist Gate 5
                      → PO final approve → Merge
```

### Return Flow

Khi receiver phát hiện item fail:

1. **Move task back** — Chuyển task về status trước đó trong Lark
2. **Comment** — Viết comment cụ thể: item nào fail, cần bổ sung gì
3. **Tag on Telegram** — Tag sender + paste link task, mô tả ngắn vấn đề
4. **Sender fix** — Sender sửa và chuyển task lại, update checklist

> 💡 **Tip:** Bắt đầu với Option A (checklist in description). Lean, hoạt động ngay, phù hợp team part-time. Chỉ chuyển sang custom fields (Option B) nếu team thấy cần thêm automation.

---

*Document: wiki/reference/quality-gates.md*
*Phase: 01 — Wiki Foundation & Conventions (updated for Phase 1.1 workflow)*
*Last updated: 2026-02-10*
