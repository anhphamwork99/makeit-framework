# Coding Standards

Tài liệu này hướng dẫn quy chuẩn viết code, đặt tên branch, commit messages, tạo PR, và review code cho team MakeIt. Viết theo **playbook style** — mỗi tình huống có hướng dẫn cụ thể, step-by-step.

> 💡 **Cách dùng:** Tìm tình huống phù hợp ("Khi bạn..."), làm theo các bước. Không cần đọc từ đầu đến cuối.

---

## Branch Naming

### Khi bạn tạo branch mới

1. Xác định **loại công việc** — chọn prefix phù hợp:
   - `feat/` — tính năng mới
   - `fix/` — sửa bug
   - `docs/` — thay đổi documentation
   - `chore/` — maintenance, cleanup, dependencies

2. Lấy **TASK ID** từ Lark task board (format: `TASK-{id}`)

3. Thêm **mô tả ngắn**: 2-3 từ, kebab-case

4. Ghép lại theo format:
   ```
   {type}/TASK-{id}-short-desc
   ```

**Ví dụ:**

- ✅ `feat/TASK-42-add-upload-flow`
- ✅ `fix/TASK-108-button-alignment`
- ✅ `docs/TASK-55-update-api-docs`
- ✅ `chore/TASK-70-upgrade-vite`
- ❌ `feature/add-new-upload-flow-to-product-page` — quá dài, sai prefix, thiếu task ID
- ❌ `fix/fix-bug` — thiếu task ID, mô tả không rõ
- ❌ `TASK-42-upload` — thiếu type prefix

### Khi bạn không có Lark task ID

Nếu việc nhỏ chưa tạo task trên Lark (ví dụ: fix typo, update README):

1. Vẫn dùng format có prefix: `docs/fix-readme-typo`
2. Bỏ qua phần `TASK-{id}`
3. Nhưng **khuyến khích** tạo task trên Lark trước để tracking

---

## Commit Messages

### Khi bạn commit code

1. Chọn **type** phù hợp (chỉ 4 loại):

   | Type | Khi nào dùng |
   |------|-------------|
   | `feat` | Thêm tính năng mới, thay đổi behavior |
   | `fix` | Sửa bug, fix lỗi |
   | `docs` | Thay đổi documentation, README, comments |
   | `chore` | Upgrade dependencies, config, cleanup |

2. Viết **description** theo quy tắc:
   - Viết thường (lowercase)
   - Dùng thì mệnh lệnh (imperative mood): "add" không phải "added" hay "adding"
   - Tối đa 72 ký tự
   - Không kết thúc bằng dấu chấm

3. **(Tùy chọn)** Thêm scope trong ngoặc — kebab-case:
   ```
   {type}({scope}): {description}
   ```

4. Format cuối cùng:
   ```
   feat: add upload dropzone component
   fix(auth): resolve token refresh race condition
   docs: update PR template with AI review section
   chore: upgrade vite to 7.1.0
   ```

**Ví dụ:**

- ✅ `feat: add product search filter`
- ✅ `fix(cart): handle empty cart edge case`
- ✅ `docs: add API endpoint documentation`
- ✅ `chore: update eslint config`
- ❌ `Added new feature` — sai format, không có type prefix
- ❌ `feat: Add Upload Component.` — viết hoa, có dấu chấm
- ❌ `refactor: extract helper function` — `refactor` không nằm trong 4 types cho phép
- ❌ `feat: this commit adds a new upload dropzone component to the product page for better UX` — quá 72 ký tự

> ⚙️ **Tự động kiểm tra:** `commitlint` + `husky` sẽ tự động reject commit message không đúng format. Nếu commit bị reject, đọc lỗi và sửa lại theo format trên.

### Khi commit bị reject bởi commitlint

1. Đọc error message — nó sẽ chỉ rõ lỗi gì (sai type, viết hoa, quá dài...)
2. Sửa commit message theo đúng format
3. Chạy lại `git commit` với message đã sửa:
   ```bash
   git commit -m "feat: correct commit message here"
   ```

---

## Pull Requests

### Khi bạn tạo PR

1. **PR template tự động load** khi tạo PR trên GitHub — điền tất cả các section bắt buộc

2. **Điền Summary** — mô tả ngắn gọn thay đổi là gì, tại sao

3. **Chọn Type** — tick đúng loại (feat, fix, docs, chore)

4. **Link Lark task** — paste URL của Lark task vào phần Lark Task

5. **Hoàn thành General Checklist** — 4 items cơ bản

6. **Hoàn thành AI Review Checklist** — 6 items (xem chi tiết ở [section AI Review](#ai-review-checklist))

7. **Mở đúng role section:**
   - FE dev → mở section 🎨 Frontend Specific
   - BE dev → mở section ⚙️ Backend Specific
   - Designer/BA reviewing → mở section 📐 Design/BA Review

8. **Self-review diff** trước khi request review — đọc lại toàn bộ changes của mình

> 📄 PR template chi tiết: xem [`.github/pull_request_template.md`](../../.github/pull_request_template.md)

### Khi bạn không chắc PR thuộc loại gì

- Nếu thay đổi **behavior** của app → `feat`
- Nếu fix **bug đã biết** → `fix`
- Nếu chỉ thay đổi **docs/README** → `docs`
- Nếu upgrade **dependency** hoặc **config** → `chore`

---

## Code Review

### Khi bạn review code của người khác

1. **Đọc PR description** — hiểu context: thay đổi gì, tại sao, Lark task nào

2. **Kiểm tra General Checklist:**
   - Code có follow coding standards không?
   - Author đã self-review chưa?
   - Lark task đã link chưa?
   - Đã test locally chưa?

3. **Review logic:**
   - Logic có đúng với requirements không?
   - Có edge cases nào chưa handle?
   - Error handling có đầy đủ?

4. **Review naming & structure:**
   - Biến/hàm/file đặt tên có rõ ràng, nhất quán?
   - Code structure có clean, dễ đọc?

5. **Review theo role section:**
   - FE: screenshot, responsive, Figma match
   - BE: API docs, migration, error handling, security

6. **Kiểm tra AI Review Checklist** — xem section bên dưới

7. **Provide feedback:**
   - Comment cụ thể, chỉ rõ dòng nào cần sửa
   - Phân biệt: `blocking` (phải sửa) vs `nit` (khuyến khích sửa)
   - Approve khi tất cả blocking issues đã resolved

---

## AI Review Checklist

Khi code được tạo hoặc hỗ trợ bởi AI (Antigravity IDE), kiểm tra 2 nhóm sau:

### Output Verification

Kiểm tra AI output có chính xác không:

| # | Check Item | Cách verify |
|---|-----------|-------------|
| 1 | **No hallucinated imports** — packages/modules tồn tại trong project | Kiểm tra `package.json`, search import paths trong codebase |
| 2 | **No incorrect API usage** — đúng method signature, đúng version | So sánh với API docs/types hiện tại trong project |
| 3 | **No hardcoded values** that should be config/env | Search hardcoded URLs, keys, secrets — phải nằm trong `.env` hoặc config |
| 4 | **Type safety** — no `any` casts, proper error types | Search `as any`, `: any`, generic error catches |

### Context Completeness

Kiểm tra AI có đủ context khi generate code không:

| # | Check Item | Cách verify |
|---|-----------|-------------|
| 5 | **AI output matches plan/specs** — không thêm/bớt scope | So sánh output với task description / acceptance criteria |
| 6 | **Specs requirements covered** — acceptance criteria met | Check từng AC item |
| 7 | **Edge cases from specs handled** | Đọc edge cases trong specs, verify code handles chúng |
| 8 | **Integrations with existing code correct** — imports, props, hooks | Kiểm tra integration points compile và work đúng |

> ⏱️ Mỗi item phải **binary** (yes/no) và **verify được trong < 1 phút**. Nếu một item fail → yêu cầu author fix trước khi approve.

---

## Quick Reference

| Scenario | Format | Ví dụ |
|----------|--------|-------|
| Branch mới | `{type}/TASK-{id}-short-desc` | `feat/TASK-42-add-upload` |
| Commit message | `{type}: {description}` | `feat: add upload component` |
| Commit + scope | `{type}({scope}): {description}` | `fix(auth): handle token expiry` |
| PR type | Tick 1 checkbox | `[x] feat` |

**4 types duy nhất:** `feat` · `fix` · `docs` · `chore`

---

*Cập nhật lần cuối: 2026-02-10*
*Thuộc Phase 1: Wiki Foundation & Conventions*
