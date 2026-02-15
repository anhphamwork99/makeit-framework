<p align="center">
  <img src="docs/assets/Banner.png" alt="MakeIt Framework" width="600">
</p>

<p align="center">
  <strong>AI-Augmented Team Operations Framework</strong><br>
  Biến mỗi thành viên trong team thành AI-powered operator với workflow chuẩn hóa
</p>

<p align="center">
  <a href="https://makeit-framework.vercel.app">📖 Documentation</a> •
  <a href="#-quick-start">🚀 Quick Start</a> •
  <a href="#-available-roles">👥 Roles</a> •
  <a href="#-changelog">📋 Changelog</a>
</p>

---

## 🤔 What is MakeIt?

MakeIt Framework là bộ công cụ giúp team phần mềm vận hành với AI agents. Mỗi thành viên — từ PO, BA, Techlead đến Developer — đều có AI assistant được cấu hình sẵn theo đúng vai trò, hiểu quy trình, và tuân thủ conventions của team.

**Không phải** chatbot generic. **Là** teammate biết context.

### Tại sao cần MakeIt?

| Vấn đề | Giải pháp MakeIt |
|--------|-----------------|
| AI không hiểu quy trình team | Mỗi role có GEMINI.md riêng với principles, workflows, boundaries |
| Agent làm sai scope | Rules + skills giới hạn agent trong đúng trách nhiệm của role |
| Thiếu nhất quán giữa các thành viên | Chung conventions, quality gates, handoff format |
| Onboarding mất thời gian | Agent hướng dẫn newbie từ A→Z theo role |
| Context bị mất giữa các tasks | Knowledge Base + Sprint state tracking |

---

## ✨ Features

- **🎭 5 Roles** — PO, BA, Techlead, Dev FE, Dev BE — mỗi role có bộ skills riêng
- **⚡ Sprint Lifecycle** — 9 stage commands: start → plan → execute → verify → complete
- **🧠 Knowledge Base** — Product memory system across sprints
- **🔄 HITL Spawning** — Spawn sub-agents trong Antigravity IDE sessions riêng
- **📐 Figma MCP** — Agent đọc design trực tiếp từ Figma (BA, Dev FE)
- **💬 Lark Integration** — Task tracking, communication, scope management qua Lark MCP
- **🧩 Serena MCP** — Symbol-level code intelligence cho TL, Dev FE, Dev BE (optional)
- **📖 Wiki** — Tài liệu đầy đủ cho workflows, conventions, tool guides

---

## 🚀 Quick Start

### 1. Clone repo

```bash
git clone https://github.com/anhphamwork99/makeit-framework.git
cd makeit-framework
```

### 2. Chạy installer

```bash
bash templates/install.sh
```

Bạn sẽ được hỏi:
- **Chọn role** (PO, BA, Techlead, Dev FE, Dev BE)
- **Target directory** (workspace project của bạn)
- **HITL addon** (tùy chọn, cho Antigravity IDE)

### 3. Mở project trong IDE

```
Mở workspace đã install trong Antigravity IDE (hoặc Cursor, Windsurf...)
Agent tự động nhận diện role và quy trình từ GEMINI.md
```

### 4. Bắt đầu làm việc

```
/makeit:help     ← Xem danh sách commands
/makeit:status   ← Xem trạng thái hiện tại
```

---

## 👥 Available Roles

| Role | Stage | Mô tả |
|------|-------|--------|
| **PO** (Product Owner) | 1 & 6 | Tạo backlog items, review kết quả deploy |
| **BA** (Business Analyst) | 2 | Phân tích design + PO goals → user stories cho Techlead |
| **Techlead** | 3 & 5 | Break stories thành FE/BE tasks, review code, deploy |
| **Dev FE** (Frontend) | 4 | Implement UI từ Figma, handle states, responsive behavior |
| **Dev BE** (Backend) | 4 | Implement APIs, database, business logic, security |

### Pipeline

```
┌──────────┐    ┌──────┐    ┌──────────┐    ┌─────────┐    ┌─────────┐    ┌────────┐
│ PO +     │───▶│  BA  │───▶│ Techlead │───▶│ Dev     │───▶│ TL Code │───▶│   PO   │
│ Designer │    │      │    │ Mode 1:  │    │ FE / BE │    │ Review  │    │ Review │
│ Stage 1  │    │  S2  │    │ TaskBreak│    │   S4    │    │ Mode 2  │    │   S6   │
└──────────┘    └──────┘    │   S3     │    └─────────┘    │   S5    │    └────────┘
                            └──────────┘                   └─────────┘
```

---

## 📁 What Gets Installed

```
your-project/
├── GEMINI.md                        ← AI config cho role của bạn
├── .agent/
│   ├── agents/                      ← Sub-agent definitions
│   ├── rules/                       ← Universal + per-role rules
│   ├── skills/makeit-{role}/        ← Skill library theo domain
│   └── workflows/makeit/            ← /makeit:xxx slash commands
└── .makeit/
    ├── sprint/                      ← Sprint workspace (per-sprint)
    ├── templates/                   ← Sprint lifecycle templates
    └── knowledge/                   ← Product memory (4 categories)
```

---

## 🔌 MCP Integrations

| MCP Server | Roles | Mục đích |
|------------|-------|----------|
| **Figma (Official)** | BA, Dev FE | Đọc design context, extract tokens |
| **Lark** | All | Task tracking, team communication, scope management |
| **Serena** *(optional)* | TL, Dev FE, Dev BE | Symbol-level code intelligence — find symbols, trace references, impact analysis |

> Cấu hình MCP templates nằm trong `templates/mcp/`. Xem [Integrations wiki](wiki/integrations/) để biết chi tiết.

---

## 💡 Slash Commands

Mỗi role có ~20 slash commands. Một số phổ biến:

| Command | Mô tả |
|---------|--------|
| `/makeit:help` | Xem danh sách commands |
| `/makeit:status` | Trạng thái sprint/task hiện tại |
| `/makeit:start-my-tasks` | Chọn tasks được assign từ handoff |
| `/makeit:plan-phase` | Lập kế hoạch cho phase hiện tại |
| `/makeit:execute-phase` | Thực thi plan |
| `/makeit:verify-work` | Kiểm tra deliverables so với specs |
| `/makeit:complete` | Hoàn thành sprint, handoff deliverables |
| `/makeit:check-handoff` | Xem handoff từ upstream role |
| `/makeit:pause-work` | Lưu context khi tạm dừng |
| `/makeit:resume-work` | Khôi phục context từ lần pause trước |

---

## 📖 Documentation

Tài liệu đầy đủ tại **[makeit-framework.vercel.app](https://makeit-framework.vercel.app)**

Wiki bao gồm:
- **Getting Started** — Onboarding, setup, first-win guides
- **Roles** — Workflow chi tiết từng role
- **Workflows** — Sprint ceremonies
- **Tools** — Git, Figma, Lark, Shopify guides
- **Reference** — Coding standards, quality gates, handoff format
- **Integrations** — MCP server setup guides (Serena, Figma, Lark)

---

## 🏗️ Architecture

```
makeit-framework/
├── templates/               ← 🎯 Framework distribution
│   ├── install.sh           ← One-click installer
│   ├── roles/               ← Role-specific configs (5 roles + shared)
│   ├── addons/              ← Optional packages (HITL, etc.)
│   ├── mcp/                 ← MCP server config templates
│   ├── VERSION              ← Framework version
│   └── CHANGELOG.md         ← Release notes
├── wiki/                    ← 📖 Team documentation
│   ├── getting-started/     ← Onboarding guides
│   ├── roles/               ← Per-role workflows
│   ├── workflows/           ← Sprint ceremonies
│   ├── tools/               ← Tool guides
│   ├── reference/           ← Standards & conventions
│   └── integrations/        ← MCP integration guides
└── docs/                    ← 🌐 Web UI (Vercel)
    └── (React + Vite app)
```

---

## 📋 Changelog

See [CHANGELOG.md](templates/CHANGELOG.md) for release notes.

**Current version:** `0.5.0`

---

## 🤝 Contributing

1. Fork repo
2. Tạo branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "feat(role): description"`
4. Push: `git push origin feature/your-feature`
5. Mở Pull Request

> Commit format: `type(scope): description` — types: `feat`, `fix`, `docs`, `refactor`

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <sub>Built with 💜 by the MakeIt team — AI-augmented from day one</sub>
</p>
