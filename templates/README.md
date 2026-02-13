# MakeIt AI Workspace — Setup Guide

## Overview

MakeIt AI Workspace là framework AI-augmented cho team MakeIt, giúp mỗi thành viên có AI assistant được cấu hình sẵn theo đúng vai trò của mình. Framework mirror pattern từ [GSD Framework](https://github.com/your-org/gsd-framework) — mỗi role có GEMINI.md, skills, workflows, và rules riêng.

**Nguyên tắc:** Clone repo → chạy install script chọn role → mở project trong Antigravity IDE → AI hiểu ngay context và quy trình của bạn.

---

## Quick Start

### 1. Clone repo

```bash
git clone https://github.com/your-org/ai-team-blueprint.git
cd ai-team-blueprint
```

### 2. Chạy install script

```bash
bash templates/install.sh
```

Script sẽ hỏi bạn chọn role và target workspace directory. AI workspace files sẽ được copy vào project của bạn.

### 3. Mở project trong Antigravity IDE

Mở workspace đã install trong Antigravity IDE. Agent sẽ tự động đọc `GEMINI.md` và nhận diện role, quy trình, và conventions của bạn.

---

## What Gets Installed

Khi chạy `install.sh`, các files sau được copy vào workspace của bạn:

| Thành phần | Đường dẫn | Mô tả |
|------------|-----------|-------|
| **GEMINI.md** | `./GEMINI.md` | Cấu hình AI agent theo role — principles, context, references |
| **Skills** | `.agent/skills/makeit/` | Skill library — agent expertise theo concern groups |
| **Workflows** | `.agent/workflows/makeit/` | Slash commands (`/makeit:xxx`) cho mọi task phổ biến |
| **Rules (Universal)** | `.agent/rules/makeit-conventions.md` | Coding standards, PR format, commit conventions |
| | `.agent/rules/makeit-workflow.md` | Team workflow rules, source of truth hierarchy |
| **Rule (Per-role)** | `.agent/rules/makeit-{role}.md` | Behavior rules riêng cho role của bạn |
| **Figma MCP** | `.vscode/mcp.json` | Cấu hình Figma MCP Server để agent đọc design trực tiếp |

---

## Available Roles

| # | Role | Mô tả |
|---|------|-------|
| 1 | **PO** (Product Owner) | Quản lý backlog, define business goals, final authority cho feature approval |
| 2 | **BA** (Business Analyst) | Verify context, break PO goals + Design specs thành user stories |
| 3 | **Designer** | Thiết kế UI/UX trong Figma, define interaction states và design tokens |
| 4 | **Techlead** | Review architecture, break user stories thành FE/BE tasks, estimate effort |
| 5 | **Dev FE** (Frontend Developer) | Implement UI theo Figma specs, follow coding standards, self-review code |
| 6 | **Dev BE** (Backend Developer) | Implement API/backend logic, define contracts, follow coding standards |

---

## Customization

Sau khi install, bạn có thể customize `GEMINI.md` cho project cụ thể:

1. **Thêm project-specific context** — Mô tả kiến trúc, tech stack, business domain của project bạn đang làm
2. **Adjust principles** — Giữ 5 core principles, thêm project-specific principles nếu cần
3. **Update references** — Thêm links đến project docs, API docs, Figma files
4. **HITL pattern** — Bật/tắt Human-in-the-Loop spawning tùy nhu cầu (documented trong GEMINI.md)

> ⚠️ **Lưu ý:** Không sửa files trong `.agent/skills/` hay `.agent/rules/` trực tiếp. Nếu cần thay đổi, đề xuất qua PR về repo `ai-team-blueprint`.

---

## For Maintainers — Source vs Installed Path

Cấu trúc trong repo (source) **khác** cấu trúc sau khi install. `install.sh` thực hiện mapping:

```
Source (repo)                           → Installed (user project)
──────────                                ─────────────────────────
templates/roles/{role}/GEMINI.md        → GEMINI.md (root)
templates/roles/{role}/agents/          → .agent/agents/
templates/roles/{role}/rules/           → .agent/rules/
templates/roles/{role}/skills/          → .agent/skills/
templates/roles/{role}/workflows/       → .agent/workflows/
templates/roles/_shared/agents/         → .agent/agents/ (merged)
templates/roles/_shared/rules/          → .agent/rules/ (merged)
templates/roles/_shared/skills/         → .agent/skills/ (merged)
```

> 📌 Khi viết content trong template files, mọi **path reference** (ví dụ `@rules/`, `@skills/`) phải dùng **installed path** — vì Antigravity resolve từ `.agent/`.

---

## Figma MCP Setup

Figma MCP Server cho phép agent đọc design context trực tiếp từ Figma — không cần copy-paste specs thủ công.

### Cấu hình (tự động khi install)

Script `install.sh` tự tạo file `.vscode/mcp.json` với nội dung:

```json
{
  "servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    }
  }
}
```

### Sử dụng

1. Mở project trong Antigravity IDE (VS Code)
2. Khi được prompt **"Allow Access"** — click cho phép để kết nối Figma account
3. Agent sẽ có 3 tools:
   - `get_design_context` — Fetch design data (layout, colors, typography, spacing)
   - `get_metadata` — Lấy node map của Figma file
   - `get_screenshot` — Chụp visual reference của component/screen

> 📖 **Tài liệu chi tiết:** [Figma MCP Server Official](https://developers.figma.com/docs/figma-mcp-server/)

---

## Troubleshooting

### Antigravity không nhận GEMINI.md

- **Check file path:** `GEMINI.md` phải nằm ở root của workspace (cùng cấp với `.agent/`)
- **Check file name:** Phải đúng `GEMINI.md` (viết hoa, đuôi `.md`)
- **Restart IDE:** Đôi khi cần restart Antigravity để load lại config

### Slash commands `/makeit:xxx` không xuất hiện

- **Check folder:** Đảm bảo `.agent/workflows/makeit/` tồn tại và có files `.md` bên trong
- **Check format:** Mỗi workflow file cần có YAML frontmatter với `description:`

### Figma MCP không kết nối

- **Check `.vscode/mcp.json`:** Đảm bảo file tồn tại với đúng URL `https://mcp.figma.com/mcp`
- **Re-authorize:** Nếu "Allow Access" không xuất hiện, thử restart IDE rồi mở lại
- **Network:** Figma MCP là remote server — cần kết nối internet

---

*Phase: 04 — AI Tooling*
*Last updated: 2026-02-10*
