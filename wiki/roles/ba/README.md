# Business Analyst (BA)

Trang workflow chi tiết cho vai trò **Business Analyst** trong team MakeIt. BA là vai trò trung gian quan trọng — nhận goals từ PO và Figma specs, rồi tổng hợp thành user stories để Dev có thể implement.

> 📖 **Vị trí trong workflow:** BA đảm nhận **Stage 2** trong [Team Workflow](../../workflows/team-workflow.md) — nhận input từ PO (và Figma designs), output user stories cho Techlead.

---

## Role Overview

| | Detail |
|---|---|
| **Stage** | Stage 2: BA Story Breakdown |
| **Nhận từ** | PO (HANDOFF.md: goals + context + Figma links) |
| **Giao cho** | Techlead (user stories + acceptance criteria) |
| **Gate kiểm tra input** | [Gate 1](../../reference/quality-gates.md#gate-1-designpo--ba-design--backlog-ready-for-story-breakdown) — BA verify Design + PO output |
| **Gate kiểm tra output** | [Gate 2](../../reference/quality-gates.md#gate-2-ba--techlead-user-stories-ready-for-task-breakdown) — Techlead verify BA stories |
| **Tool hỗ trợ** | Antigravity IDE, Figma (view), Lark, Telegram |

---

## Responsibilities

1. **Verify context** — Kiểm tra output từ PO đạt chuẩn trước khi bắt đầu (pull HANDOFF.md từ Git)
2. **Analyze Figma** — Phân tích design screens, hiểu interactions và edge cases
3. **Document user flow** — Tạo tài liệu flow từ entry point → happy path → edge cases *(đây là trách nhiệm của BA, không phải Designer)*
4. **Discuss với PO** — Làm rõ mọi điểm chưa rõ ràng qua Telegram
5. **Break user stories** — Tổng hợp từ PO goals + Design specs thành user stories actionable
6. **Viết acceptance criteria** — Mỗi story ≥ 3 acceptance criteria checkable
7. **Attach references** — Link Figma screens + PO goals vào mỗi story

---

## Story Breakdown Process

Đây là quy trình step-by-step mỗi khi BA nhận một feature/epic mới:

### Step 1: Nhận thông báo + Pull HANDOFF.md

PO tag BA trên Telegram khi đã hoàn thành sprint. BA chạy `/makeit:check-handoff` để pull và đọc HANDOFF.md từ PO.

### Step 2: Verify input (Gate 1)

Kiểm tra PO output theo [Gate 1 checklist](../../reference/quality-gates.md#gate-1-designpo--ba-design--backlog-ready-for-story-breakdown):

**PO HANDOFF.md:**
- [ ] Goàl rõ ràng (mục tiêu business)?
- [ ] Context đầy đủ (background, user needs, constraints)?
- [ ] Figma links có và accessible?
- [ ] Priority + sprint xác định?

**Figma Design (nếu có):**
- [ ] Screens marked "Ready for Dev"?
- [ ] Interaction states defined?
- [ ] Design tokens consistent?
- [ ] Copy/text finalized?

> ⚠️ Nếu bất kỳ item nào **fail** → tag PO trên Telegram, ghi rõ cần bổ sung gì. **Không bắt đầu** viết stories cho đến khi tất cả pass.

### Step 3: Discuss điểm chưa rõ

Nếu có bất kỳ thông tin nào ambiguous:
1. Tag PO trên Telegram
2. Ghi rõ câu hỏi cụ thể (không hỏi chung chung)
3. Chờ trả lời trước khi tiếp tục
4. Ghi lại các clarification đã nhận (dùng làm reference trong stories)

### Step 4: Analyze Figma screens

Mở Figma và phân tích chi tiết:
- **Screens chính:** Mỗi screen phục vụ mục đích gì?
- **Interaction states:** Hover, active, disabled, error, empty, loading cho mỗi element
- **Transitions:** Flow giữa các screens ra sao?
- **Edge cases:** Empty states, error states, boundary conditions
- **Data requirements:** Screen cần data gì? Từ đâu?

### Step 5: Document user flow

> 🔑 **BA sở hữu trách nhiệm document user flow** — không phải Designer, không phải PO.

BA tạo tài liệu user flow dựa trên Figma analysis + PO context:
- **Entry point:** User bắt đầu từ đâu?
- **Happy path:** Flow chính từ đầu đến cuối
- **Alternative paths:** Các nhánh rẽ (ví dụ: user chưa login, user nhập sai)
- **Edge cases:** Empty state, max limits, concurrent actions
- **Error handling:** Hệ thống respond thế nào khi có lỗi?

Sử dụng template trong [templates.md](./templates.md#user-flow-documentation-template).

### Step 6: Break thành User Stories

Từ PO Goal + Design specs + user flow analysis, tạo user stories:
- Format: "As a [role], I want [action], so that [benefit]"
- ≥ 3 acceptance criteria per story (checkable, specific)
- Attach Figma design link cho mỗi story
- Document edge cases đã identify
- Ghi reference nguồn (PO Goal nào, Design screen nào)

Sử dụng template trong [templates.md](./templates.md#user-story-template).

### Step 7: Attach references

Mỗi user story phải có:
- Link đến Figma design screens liên quan
- Reference đến PO Goal/Context
- Ghi rõ source of truth cho mỗi quyết định

### Step 8: Handoff cho Techlead (Git-based)

Khi tất cả stories ready:
1. Chạy `/makeit:complete` → tạo HANDOFF.md và commit vào `.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md`
2. Update Lark tasks với stories link
3. Tag Techlead trên Telegram → TL chạy `/makeit:check-handoff` để pull

> 📖 **Format:** Xem [Handoff Format](../../reference/handoff-format.md)

---

## Spec Verification

Trước khi bắt đầu story breakdown, BA **luôn** verify input theo [Gate 1 checklist](../../reference/quality-gates.md#gate-1-designpo--ba-design--backlog-ready-for-story-breakdown).

**Tại sao verify quan trọng:**
- BA stories sẽ trở thành **source of truth** cho Dev implementation
- Nếu input sai/thiếu → stories sai → code sai → feedback loop kéo dài
- Verify sớm = phát hiện issues sớm = tiết kiệm effort cho cả team

Sử dụng [Spec Verification Checklist](./templates.md#spec-verification-checklist) để track.

---

## Handoff Points

### Cơ chế Handoff

BA sử dụng **Git-based HANDOFF.md** — cơ chế giao tiếp chính giữa các roles:

1. BA chạy `/makeit:check-handoff` → pull HANDOFF.md từ PO
2. BA hoàn thành → chạy `/makeit:complete` → commit HANDOFF.md cho TL
3. Telegram dùng để **notify**, Git dùng để **truyền nội dung**

### Nhận từ (Input)

| Từ ai | Nhận gì | Cách nhận | Verify bằng |
|-------|---------|----------|-------------|
| PO | HANDOFF.md (goals + context + Figma links) | `git pull` + `/makeit:check-handoff` | [Gate 1](../../reference/quality-gates.md#gate-1-designpo--ba-design--backlog-ready-for-story-breakdown) |

### Giao cho (Output)

| Giao cho ai | Giao gì | Cách giao | Được verify bằng |
|-------------|---------|----------|-------------------|
| Techlead | HANDOFF.md (user stories + acceptance criteria + user flow docs) | `/makeit:complete` + `git push` | [Gate 2](../../reference/quality-gates.md#gate-2-ba--techlead-user-stories-ready-for-task-breakdown) |

---

## AI Usage with Antigravity

BA sử dụng **Antigravity IDE** để tăng hiệu quả trong các task hằng ngày. Dưới đây là playbook cụ thể:

### 1. Analyze Figma designs

Dùng Antigravity để phân tích Figma design và extract requirements:

```
Phân tích Figma screen [link/name] cho feature [tên feature].
Hãy identify:
1. Các UI components chính và states của chúng
2. User interactions trên mỗi component
3. Data requirements (field nào cần data gì)
4. Edge cases cần handle (empty, error, loading states)
5. Các flow transitions giữa screens
```

### 2. Draft user stories từ PO goals + Design specs

```
Dựa trên PO goal: "[paste PO goal]"
Và design specs: [mô tả screens đã phân tích]

Hãy draft user stories theo format:
"As a [role], I want [action], so that [benefit]"

Mỗi story cần:
- ≥ 3 acceptance criteria (checkable, specific)
- Edge cases
- Reference đến design screens

Lưu ý: Stories phải specific và implementable, không phải high-level themes.
```

### 3. Identify edge cases

```
Cho feature [tên feature] với flow: [mô tả flow].

Hãy liệt kê tất cả edge cases cần handle:
- Input validation edge cases
- State management edge cases (empty, loading, error)
- Concurrent user actions
- Permission/authorization scenarios
- Data boundary conditions (max length, special characters, etc.)
```

### 4. Document user flow

```
Dựa trên các Figma screens đã phân tích cho feature [tên].
Hãy document user flow theo template:
- Entry point
- Happy path (step-by-step)
- Alternative paths (2-3 scenarios)
- Edge cases + error handling
```

### AI Verification Rules

> ⚠️ **Bắt buộc:** AI output cho specs và stories **phải được human verify** trước khi share với team. BA đọc lại, cross-check với Figma/PO context, và chỉnh sửa trước khi handoff.

- AI draft → BA review → BA chỉnh sửa → Chỉ khi BA hài lòng mới share
- Không auto-send AI output trực tiếp cho Techlead
- Tham khảo GSD Framework workflows cho patterns: research → plan → verify

---

## Quick Reference

| Hành động | Xem tài liệu |
|-----------|---------------|
| Xem vị trí BA trong workflow | [Team Workflow — Stage 2](../../workflows/team-workflow.md#stage-2-ba-story-breakdown) |
| Tra checklist verify input | [Gate 1](../../reference/quality-gates.md#gate-1-designpo--ba-design--backlog-ready-for-story-breakdown) |
| Tra checklist output cho Techlead | [Gate 2](../../reference/quality-gates.md#gate-2-ba--techlead-user-stories-ready-for-task-breakdown) |
| Source of truth hierarchy | [Team Workflow — Source of Truth](../../workflows/team-workflow.md#source-of-truth-hierarchy) |
| Templates | [BA Templates](./templates.md) |

---

*Role: Business Analyst · [← Roles](../README.md)*
*Last updated: 2026-02-13*
