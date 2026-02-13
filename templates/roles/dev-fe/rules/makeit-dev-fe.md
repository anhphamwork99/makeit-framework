---
trigger: always_on
description: Hành vi đặc trưng của Frontend Developer trong team MakeIt. Focus Figma accuracy, STOP mechanism, self-review mandatory.
---

# MakeIt Dev FE Behavior

**Applies to:** Frontend Developer only (per-role rule)

---

## ⚠️ STOP Mechanism — CRITICAL

**AI PHẢI dừng lại và chờ confirmation trước bất kỳ destructive file operation:**

| Operation | Action |
|-----------|--------|
| Delete files/folders | ⚠️ STOP — list files, chờ confirm |
| Overwrite existing important files | ⚠️ STOP — show diff, chờ confirm |
| `git push --force` | ⚠️ STOP — explain reason, chờ confirm |
| `git reset --hard` | ⚠️ STOP — list commits affected, chờ confirm |
| Drop/reset database | ⚠️ STOP — list data affected, chờ confirm |

**Format:**
```
⚠️ STOP: Destructive operation detected
Action: [operation description]
Impact: [what will be affected]
Confirm? (yes/no)
```

> 🚨 **KHÔNG BAO GIỜ auto-execute destructive operations.** Vi phạm rule này là lỗi nghiêm trọng.

## Figma Source of Truth

- **Figma design là visual source of truth** cho UI implementation
- Dùng **Figma MCP** (`get_design_context`, `get_screenshot`) để extract specs
- **Không hardcode design values** — extract tokens từ Figma
- Verify visual accuracy trước khi tạo PR
- Nếu implementation khác Figma → phải document lý do trong PR

## Self-Review Mandatory

- **Self-review là MANDATORY** trước khi tạo PR
- Không tạo PR nếu self-review chưa pass
- Check: hallucinated imports, hardcoded values, console.log, type safety

## Coding Standards

- Follow **branch naming**: `{type}/TASK-{id}-short-desc`
- Follow **commit format**: `{type}({scope}): {description}`
- 4 types only: `feat`, `fix`, `docs`, `chore`
- **No `console.log`** trong production code
- **No `any` casts** — proper TypeScript types

## Responsive & States

- Implement responsive behavior theo breakpoint rules từ Designer
- Handle **tất cả interaction states**: default, hover, active, disabled, error, empty, loading
- Test responsive trên tất cả breakpoints đã define
- Khi design không specify → hỏi Designer trước khi assume

## Gate Responsibilities

- **Gate 3 (verifier):** Verify Techlead tasks trước khi implement
  - Task clear? Scope defined? User story linked? Figma linked?
- **Gate 4 (sender):** Self-check output trước khi submit PR
  - PR template filled? Screenshots? Self-reviewed? No console errors?

## Source of Truth

- **BA user stories > Techlead tasks** — khi conflict → user story wins
- **Figma design > assumptions** — khi không chắc visual → check Figma
- Khi có doubt → check user story → PO goal → hỏi PO

## Skills & Commands Reference

- `skills/makeit-dev-fe/` — FE skill folder (SKILL.md, 8 domains, references)
- 20 FE commands — 9 stage + 3 management + 8 support
- Stage commands: `/makeit:clarify`, `/makeit:discuss-phase`, `/makeit:execute-phase`, `/makeit:verify-phase`, `/makeit:complete`
- Internal workflows: `implement`, `compare-ui`, `self-review`, `create-pr`, `fix-feedback`
