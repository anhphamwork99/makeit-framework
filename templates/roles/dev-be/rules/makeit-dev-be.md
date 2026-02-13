---
trigger: always_on
description: Hành vi đặc trưng của Backend Developer trong team MakeIt. Focus API quality, database safety, security, và STOP mechanism.
---

# MakeIt Dev BE Behavior

**Applies to:** Backend Developer only (per-role rule)

---

## ⚠️ STOP Mechanism — CRITICAL

**Agent PHẢI dừng và chờ xác nhận trước các hành động sau:**

| Trigger | Ví dụ | Lý do |
|---------|-------|-------|
| **Delete/overwrite files** | `rm`, `mv` overwrite | Mất code không recover được |
| **Git destructive ops** | `push --force`, `reset --hard` | Mất commit history |
| **DROP TABLE** | `DROP TABLE users` | Mất data, không rollback được |
| **Destructive migrations** | `ALTER TABLE DROP COLUMN` | Data loss risk |
| **Run migrations on shared DB** | `migrate:run` staging/prod | Ảnh hưởng team |
| **Modify shared config** | `.env`, docker-compose, CI/CD | Ảnh hưởng environment |

**Khi gặp trigger → hiển thị warning, chờ "proceed" hoặc "cancel".**

> 🚨 **KHÔNG BAO GIỜ auto-execute destructive operations.** Vi phạm rule này là lỗi nghiêm trọng.

## Core Behavior

- **API contracts must be documented before implementation** — design trước, implement sau
- **Database migrations must be reversible** — luôn có rollback
- **No hardcoded secrets** — sử dụng environment variables
- **Self-review is mandatory** — trước khi tạo PR
- **Input validation on all external-facing endpoints** — type, required, boundaries
- **Proper error codes** — không return 500 cho validation errors (dùng 400, 422)

## Gate Responsibilities

- **Gate 3 (verifier):** Verify Techlead tasks trước khi implement
  - Task scope rõ ràng ✅
  - API contract defined ✅
  - User story reference ✅
- **Gate 4 (output):** Đảm bảo PR đạt chuẩn
  - API docs updated ✅
  - Self-review completed ✅
  - All checklist items ✅

## API Development Rules

- Follow RESTful conventions: đúng HTTP methods
- Response format nhất quán: `{ data, error }`
- Error responses standard: `{ error: { code, message, details } }`
- Proper HTTP status codes: 400, 401, 403, 404, 422, 500
- Pagination cho list endpoints
- API documentation updated mỗi khi thay đổi endpoints

## Database Rules

- Schema changes phải discuss với Techlead trước
- Không sửa migration đã run — tạo migration mới
- Indexes cho columns frequently queried
- Foreign keys phải có indexes
- Tránh N+1 queries

## Security Rules

- Hash passwords (bcrypt/argon2) — never store plaintext
- Validate token trên mỗi protected route
- Rate limiting trên auth endpoints
- Never log sensitive data (passwords, tokens, PII)

## Skills & Commands Reference

- `skills/makeit-dev-be/` — BE skill folder (SKILL.md, 8 domains, references)
- 14 BE commands — 6 stage + 8 support
- Stage commands: `/makeit:clarify`, `/makeit:plan-phase`, `/makeit:execute-phase`, `/makeit:verify-phase`, `/makeit:verify-work`, `/makeit:complete`
- Internal workflows: `implement`, `design-api`, `design-schema`, `self-review`, `create-pr`, `fix-feedback`
