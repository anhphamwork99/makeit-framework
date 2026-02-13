---
trigger: always_on
description: Quy chuẩn universal cho team MakeIt — sprint state, response format, communication, conventions, Figma MCP. Apply cho tất cả roles.
---

# MakeIt Universal Rules

**Applies to:** Tất cả roles (universal rule — embedded per role)

---

## Role Identification

- Luôn đọc `.makeit/config.md` đầu tiên để xác định role hiện tại
- Behavior và commands phải match role đã cấu hình
- Nếu `config.md` không tồn tại → hỏi user role

## Sprint State Management

- Sprint state tracked tại: `.makeit/sprint/SPRINT-NNN/STATE.md`
- IDE acts as orchestrator — routes `/makeit:*` commands tới skills
- Resume context qua `/makeit:status` hoặc `/makeit:resume-work`
- Mỗi phase trong sprint có status: `pending → planning → executing → verifying → done`
- Không tạo/sửa state files thủ công — dùng stage commands để transition

## Response Output Format

Mọi response phải follow format:

```
## 💭 Reasoning
[Tại sao approach này — what was considered]

## 📋 Summary
[Key outcomes — bullet points, max 5 items]

## 📄 Deliverable
[Files created/modified — với paths]

## ➡️ Next Steps
[1-3 clear action items + suggest /makeit command]

## 💬 Communication (khi handoff/clarify)
[Auto-generated Telegram/Lark message template]
```

## Source of Truth Hierarchy

```
PO Goal & Context ──── WHY (business value)
    ▼
Designer Specs ─────── HOW IT LOOKS (visual design)
    ▼
BA User Stories ────── HOW IT WORKS (user perspective)
    ▼
Techlead Tasks ─────── HOW TO BUILD (technical tasks)
    ▼
Dev Implementation ─── THE CODE (actual product)
```

Conflict → escalate lên layer cao hơn.

Source of truth cho tracking:

1. **Lark** — task assignments, priorities
2. **Figma** — design specs, visual reference
3. **Code** — actual implementation
4. **Telegram** — discussions (ephemeral)

## Branch Naming

Format: `{type}/TASK-{id}-{short-desc}`

- Types: `feat/`, `fix/`, `docs/`, `chore/`
- Task ID lấy từ Lark task board
- Short description: 2-3 từ, kebab-case
- Ví dụ: `feat/TASK-42-add-upload-flow`

Nếu chưa có Lark task ID → vẫn dùng prefix: `docs/fix-readme-typo`

## Commit Messages

Format: `{type}: {description}` hoặc `{type}({scope}): {description}`

- 4 types duy nhất: `feat`, `fix`, `docs`, `chore`
- Viết thường, imperative mood ("add" không phải "added")
- Tối đa 72 ký tự, không kết thúc bằng dấu chấm

## Pull Requests

- Luôn dùng PR template của team — điền tất cả sections bắt buộc
- Hoàn thành AI Review Checklist (Output Verification + Context Completeness)
- Link Lark task trong PR description
- Self-review diff trước khi request review

## Language Rules

- **Response body:** Tiếng Việt là chính
- **Technical terms:** Giữ nguyên English (component, API, user story, acceptance criteria, quality gate...)
- **Code/commands:** English
- **Communication templates:** Tiếng Việt

## Communication Auto-generate

- **Telegram** — async communication daily, tag trực tiếp khi cần
- **Lark** — task tracking + comments, source of truth cho progress
- Mỗi **handoff** → auto-generate Telegram message template (ready to copy)
- Mỗi **clarification** → auto-generate Telegram message template
- Không optional — **luôn** có communication template khi handoff/clarify

## Figma MCP Integration

Khi làm việc với designs, dùng **Figma MCP Server** (`https://mcp.figma.com/mcp`):

1. `get_design_context` — fetch structured design data (tokens, specs, layout)
2. `get_metadata` — nếu response quá lớn, dùng metadata thay thế
3. `get_screenshot` — capture visual reference cho implementation/review

**Không hardcode design values** — luôn extract từ Figma qua MCP.
