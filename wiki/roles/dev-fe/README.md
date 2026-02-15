# Frontend Developer (Dev FE)

Trang workflow chi tiết cho vai trò **Frontend Developer** trong team MakeIt. Dev FE là người biến designs thành giao diện thực tế — implement UI components, handle interaction states, và đảm bảo trải nghiệm người dùng đúng với specs.

> 📖 **Vị trí trong workflow:** Dev FE đảm nhận **Stage 4** trong [Team Workflow](../../workflows/team-workflow.md) — nhận tasks từ Techlead, output code + PR để review.

---

## Role Overview

| | Detail |
|---|---|
| **Stage** | Stage 4: FE/BE Implementation |
| **Nhận từ** | Techlead (FE tasks + Figma references) |
| **Giao cho** | TL (code + PR cho review) |
| **Gate kiểm tra input** | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) — Dev verify Techlead tasks |
| **Gate kiểm tra output** | [Gate 4](../../reference/quality-gates.md#gate-4-febe--review-code-ready-for-review) — Reviewer verify PR |
| **Tool hỗ trợ** | Antigravity IDE, Figma (view), GitHub, Lark, Telegram |

---

## Responsibilities

1. **Verify tasks** — Kiểm tra tasks từ Techlead đạt chuẩn trước khi implement
2. **Implement UI** — Build components, pages, và interactions theo design specs
3. **Translate Figma → Code** — Chuyển design screens thành giao diện thực
4. **Handle interaction states** — Implement đầy đủ hover, active, disabled, error, empty, loading states
5. **Ensure responsive** — Implement responsive behavior theo breakpoint rules của Designer
6. **Self-review** — Review code trước khi request review từ team
7. **Create PR** — Tạo PR với screenshots/videos, follow PR template

---

## Implementation Workflow

Đây là quy trình step-by-step mỗi khi Dev FE nhận tasks mới từ Techlead:

### Step 1: Nhận thông báo

Techlead tag Dev FE trên Telegram khi tasks ready (Gate 3 passed) → Dev FE biết có tasks mới.

### Step 2: Verify tasks (Gate 3)

Kiểm tra tasks theo [Gate 3 checklist](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation):

- [ ] Task được break rõ ràng: FE tasks tách biệt BE tasks
- [ ] Scope cụ thể: mô tả rõ cần implement cái gì
- [ ] User story reference: link đến user story của BA (source of truth)
- [ ] Technical constraints noted (browser support, third-party limitations)
- [ ] API contract defined (nếu cần coordinate với BE)
- [ ] Estimation hợp lý
- [ ] Lark task assigned đúng

> ⚠️ Nếu bất kỳ item nào **fail** → tag Techlead trên Telegram, ghi rõ task nào thiếu thông tin gì. **Không bắt đầu** implement cho đến khi tất cả pass.

### Step 3: Discuss unclear tasks

Nếu tasks cần clarification:
1. Tag Techlead trên Telegram
2. Ghi rõ task nào, question cụ thể gì
3. Chờ Techlead trả lời (Techlead có thể cần check với BA)
4. Ghi lại clarification đã nhận

### Step 4: Cross-check với BA user story

> 🔑 **Source of Truth:** BA user stories là source of truth cho implementation, không phải task description của Techlead.

Trước khi implement, đọc lại user story gốc của BA:
- Acceptance criteria có gì?
- Edge cases đã document những gì?
- Nếu task description conflict với user story → **user story wins** → hỏi BA/Techlead

### Step 5: Implement

Thực hiện implement theo task scope:
1. Follow [Coding Standards](../../reference/coding-standards.md) — branch naming, commit format
2. Implement component/feature theo design specs
3. Handle tất cả interaction states
4. Đảm bảo responsive behavior
5. Commit theo conventional commits format (`feat:`, `fix:`, `docs:`, `chore:`)

### Step 6: Self-review

Trước khi request review, Dev FE tự kiểm tra:
- [ ] Code đúng logic với acceptance criteria
- [ ] UI match Figma design (visual check)
- [ ] Interaction states hoạt động đúng (hover, active, disabled, error, empty, loading)
- [ ] Responsive hoạt động trên các breakpoints
- [ ] Không có console errors/warnings
- [ ] Đã diff toàn bộ changes

### Step 7: Create PR

1. Tạo PR theo [PR template](../../../.github/pull_request_template.md)
2. Điền đầy đủ summary, link Lark task
3. Mở section 🎨 Frontend Specific và hoàn thành checklist
4. Attach **screenshots/video** cho UI changes
5. Hoàn thành AI Review Checklist
6. Request review

> 📋 **Chi tiết PR flow:** Xem [Coding Standards — Pull Requests](../../reference/coding-standards.md#pull-requests)

---

## Frontend-Specific Expertise

Kiến thức chuyên môn dành riêng cho Dev FE trong team MakeIt:

### Component Development (React)

- Tách components theo **single responsibility** — mỗi component làm 1 việc
- Sử dụng **composition pattern** — ưu tiên composable components hơn monolithic
- Đặt tên component rõ ràng: `ProductCard`, `UploadDropzone`, `OrderSummary`
- Component phải handle tất cả states: default, hover, active, disabled, error, empty, loading
- Tách logic ra custom hooks khi logic reusable

### Figma-to-Code Workflow

1. **Mở Figma screen** — Xác định component nào cần build
2. **Inspect design tokens** — Colors, typography, spacing, border radius từ Figma
3. **Map tokens → code** — Sử dụng design tokens/variables từ project
4. **Build component structure** — HTML/JSX structure theo hierarchy trong Figma
5. **Apply styles** — CSS/styled-components theo design tokens
6. **Verify visual match** — So sánh output với Figma screen

### Responsive Implementation

- Breakpoints được define **1 lần** cho toàn dự án (project-level rule)
- Implement mobile-first hoặc desktop-first tùy theo breakpoint strategy đã define
- Test trên tất cả breakpoints đã define
- Khi design không specify behavior ở 1 breakpoint → hỏi Techlead hoặc PO

### State Management

- State local cho component-level state (React `useState`)
- State management library cho shared/global state
- Tách UI state (open/close modal) khỏi business state (user data, cart items)
- Cache server data hợp lý (React Query, SWR, etc.)

### Performance

- Lazy loading cho routes và heavy components
- Image optimization (correct format, lazy loading, srcset)
- Bundle size awareness — kiểm tra bundle khi thêm dependencies
- Tránh unnecessary re-renders (memo, useMemo, useCallback khi cần thiết)

---

## Handoff Points

### Cơ chế Handoff

Dev FE sử dụng **Git-based HANDOFF.md** — cơ chế giao tiếp chính:

1. FE chạy `/makeit:check-handoff` → pull HANDOFF.md từ TL (section `## For FE`)
2. FE hoàn thành → chạy `/makeit:complete` → commit HANDOFF.md cho TL (code review)
3. Telegram dùng để **notify**, Git dùng để **truyền nội dung**

### Nhận từ (Input)

| Từ ai | Nhận gì | Cách nhận | Verify bằng |
|-------|---------|----------|-------------|
| Techlead | HANDOFF.md `## For FE` (FE tasks + Figma refs + API contracts) | `git pull` + `/makeit:check-handoff` | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) |

### Giao cho (Output)

| Giao cho ai | Giao gì | Cách giao | Được verify bằng |
|-------------|---------|----------|-------------------|
| TL (Code Review) | HANDOFF.md (implementation notes, PRs, known issues) | `/makeit:complete` + `git push` | [Gate 4](../../reference/quality-gates.md#gate-4-febe--review-code-ready-for-review) |

> 📖 **Pipeline update (Phase 8.1):** Dev FE giờ gửi output cho TL (Stage 5: code review) thay vì trực tiếp cho PO. TL review xong → deploy → gửi kết quả cho PO (Stage 6).

> 🔑 **Source of Truth reminder:** BA user stories > Techlead tasks. Khi có doubt → check user story → check PO goal → hỏi PO.

---

## AI Usage with Antigravity

Dev FE sử dụng **Antigravity IDE** để tăng tốc implementation. Dưới đây là playbook cụ thể:

### 1. Component implementation từ Figma

```
Tôi cần implement component [tên component] theo Figma design.

Design specs:
- Layout: [mô tả layout]
- Colors: [tokens/values]
- Typography: [font, size, weight]
- States: [default, hover, active, disabled]
- Responsive: [breakpoint behavior]

Hãy tạo React component với:
- Props interface rõ ràng
- Tất cả interaction states
- Responsive behavior
- TypeScript types
```

### 2. Figma-to-code translation

```
Phân tích Figma design và tạo component structure:

Screen: [mô tả screen hoặc paste Figma link]
Components cần extract:
- [Component 1] — [mô tả]
- [Component 2] — [mô tả]

Output cần:
- File structure (component files)
- Props interface cho mỗi component
- CSS/styling approach (dùng design tokens nào)
```

### 3. Self-review trước PR

```
Review code thay đổi này trước khi tạo PR:
[paste diff hoặc file contents]

Kiểm tra:
1. Logic đúng với acceptance criteria: [paste AC]
2. Interaction states đầy đủ chưa?
3. Responsive behavior correct?
4. Có edge cases nào miss không?
5. Code style follow conventions không?
```

### 4. Debug UI issues

```
Component [tên] không hoạt động đúng:
- Expected behavior: [mô tả]
- Actual behavior: [mô tả]
- Khi nào xảy ra: [trigger condition]

[paste relevant code]

Hãy analyze và suggest fix.
```

### AI Verification Rules

| AI Output | Rule |
|-----------|------|
| Generated components/code | **Agent tự verify** — chạy, test, confirm chạy đúng trước khi commit |
| Suggested architecture changes | **Phải discuss với Techlead** trước khi implement |
| PR review suggestions | **Dev đọc và đánh giá** — không auto-apply |

> 💡 **Nguyên tắc:** AI giúp implement nhanh, nhưng Dev FE phải **verify output** — test locally, check visual match với Figma, confirm interaction states works. Code AI-generated cũng phải pass [AI Review Checklist](../../reference/coding-standards.md#ai-review-checklist).

---

## Quick Reference

| Hành động | Xem tài liệu |
|-----------|---------------|
| Xem vị trí Dev FE trong workflow | [Team Workflow — Stage 4](../../workflows/team-workflow.md#stage-4-febe-implementation) |
| Tra checklist verify tasks | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) |
| Tra checklist tạo PR | [Gate 4](../../reference/quality-gates.md#gate-4-febe--review-code-ready-for-review) |
| Coding standards | [Coding Standards](../../reference/coding-standards.md) |
| Source of truth hierarchy | [Team Workflow — Source of Truth](../../workflows/team-workflow.md#source-of-truth-hierarchy) |
| Templates | [Dev FE Templates](./templates.md) |

---

*Role: Frontend Developer · [← Roles](../README.md) · [Templates →](./templates.md)*
