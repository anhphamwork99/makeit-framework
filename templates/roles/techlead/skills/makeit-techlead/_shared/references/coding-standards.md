# Coding Standards Reference (Techlead View)

> File này được trích xuất từ wiki/ — single source of truth nằm ở `wiki/reference/coding-standards.md`
> ⭐ **Techlead enforces these standards in code review** — dùng với `/makeit:review-code`

---

## Branch Naming

| Format | Ví dụ |
|--------|-------|
| `{type}/TASK-{id}-short-desc` | `feat/TASK-42-add-upload-flow` |

**Types cho phép:** `feat/` · `fix/` · `docs/` · `chore/`

**Rules:**
- Mô tả ngắn 2-3 từ, kebab-case
- Lấy TASK ID từ Lark task board
- Nếu không có task ID: bỏ qua phần `TASK-{id}` (ví dụ: `docs/fix-readme-typo`)

> ⭐ **Techlead check:** PR branch name đúng format trong code review

---

## Commit Messages

| Format | Ví dụ |
|--------|-------|
| `{type}: {description}` | `feat: add upload component` |
| `{type}({scope}): {description}` | `fix(auth): handle token expiry` |

**4 types duy nhất:**

| Type | Khi nào dùng |
|------|-------------|
| `feat` | Thêm tính năng mới, thay đổi behavior |
| `fix` | Sửa bug, fix lỗi |
| `docs` | Thay đổi documentation, README, comments |
| `chore` | Upgrade dependencies, config, cleanup |

**Rules:**
- Viết thường (lowercase)
- Imperative mood: "add" không phải "added" hay "adding"
- Tối đa 72 ký tự
- Không kết thúc bằng dấu chấm
- `commitlint` + `husky` tự động reject message sai format

> ⭐ **Techlead check:** Commit messages follow conventional format — reject PR nếu sai

---

## PR Checklist

| # | Item |
|---|------|
| 1 | PR follows template (all required sections filled) |
| 2 | Summary mô tả ngắn gọn thay đổi + lý do |
| 3 | Type đúng (feat/fix/docs/chore) |
| 4 | Lark task linked |
| 5 | General Checklist completed |
| 6 | AI Review Checklist completed |
| 7 | Role section mở đúng (FE/BE/Design-BA) |
| 8 | Self-reviewed diff trước khi request review |

> ⭐ **Techlead check:** Verify all 8 items before starting code review

---

## AI Review Checklist

### Output Verification

| # | Check Item |
|---|-----------|
| 1 | No hallucinated imports — packages/modules tồn tại trong project |
| 2 | No incorrect API usage — đúng method signature, đúng version |
| 3 | No hardcoded values that should be config/env |
| 4 | Type safety — no `any` casts, proper error types |

### Context Completeness

| # | Check Item |
|---|-----------|
| 5 | AI output matches plan/specs — không thêm/bớt scope |
| 6 | Specs requirements covered — acceptance criteria met |
| 7 | Edge cases from specs handled |
| 8 | Integrations with existing code correct — imports, props, hooks |

> ⭐ **Techlead responsibility:** AI-generated code PHẢI qua review. Không merge raw AI output.

**Rule:** Mỗi item phải binary (yes/no) và verify được trong < 1 phút.
