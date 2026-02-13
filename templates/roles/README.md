# MakeIt Framework — Per-Role Setup

> Mỗi role nhận **chỉ** skills, workflows, rules relevant cho mình.
> Không overlap, không noise từ role khác.

---

## Overview

MakeIt Framework sử dụng **per-role isolation** — mỗi thành viên chỉ cần files cho role của mình. Khi chạy `install.sh`, script sẽ hỏi role và copy đúng folder tương ứng vào workspace.

**Tại sao per-role?**
- Agent chỉ thấy skills/workflows của role mình → ít confusion, nhanh hơn
- Commands tự giải thích — đọc tên biết dùng khi nào
- Quality gates embedded — mỗi role biết gate nào cần verify, gate nào cần output

---

## Folder Structure

```
templates/roles/
├── README.md                          ← Bạn đang đây
├── _shared/                           # Framework reference docs (Category C)
│   ├── task-template.md               # TASK-NNN.md template
│   ├── config-template.md             # .makeit/config.md template
│   ├── response-format.md             # AI response output standard
│   ├── communication-templates.md     # Telegram/Lark message templates
│   └── rules/makeit-universal.md      # Universal rules (all roles)
│
├── {role}/                            # Per-role folder (po, ba, designer, techlead, dev-fe, dev-be)
│   ├── GEMINI.md                      # AI workspace config
│   ├── skills/makeit-{role}/          # Skill hub + domain folders
│   │   ├── SKILL.md                   # Skill registry
│   │   ├── {role}-discovery/          # Sprint entry + templates
│   │   │   ├── stage-clarify.md
│   │   │   └── templates/             # ★ Per-role sprint templates
│   │   │       ├── ROADMAP-TEMPLATE.md
│   │   │       ├── SPECS-TEMPLATE.md
│   │   │       ├── STATE-TEMPLATE.md
│   │   │       ├── SPRINT-TEMPLATE.md
│   │   │       └── CODEBASE-SNAPSHOT.md
│   │   ├── {role}-planning/           # Plan & discuss phases
│   │   ├── {role}-execution/          # Execute phase + workflows
│   │   ├── {role}-verification/       # Verify phase + quality
│   │   ├── {role}-lifecycle/          # Complete + pause/resume
│   │   │   └── templates/             # Handoff, PR description, etc.
│   │   ├── {role}-support/            # Help, status, decide
│   │   └── _shared/references/        # Quality gates, team workflow
│   ├── workflows/makeit/             # Slash command routers
│   ├── rules/                        # Universal + role-specific rules
│   └── agents/                       # Sub-agent definitions
```

> **Phase 4.8:** Sprint lifecycle templates (ROADMAP, SPECS, STATE, SPRINT, CODEBASE-SNAPSHOT) are **per-role** — each role has adapted versions in `{role}-discovery/templates/`. `_shared/` only contains generic framework reference documents.

---

## Quick Start

```bash
./install.sh
```

Script sẽ:
1. Hỏi bạn chọn role (PO / BA / Designer / Techlead / Dev FE / Dev BE)
2. Copy GEMINI.md → root
3. Copy skills → `.agent/skills/` (includes per-role templates)
4. Copy workflows → `.agent/workflows/`
5. Copy rules → `.agent/rules/`
6. Copy templates → `.makeit/templates/` (Category C shared + per-role sprint templates)
7. Copy agent definitions → `.agent/agents/`

Sau khi install, mở Antigravity IDE và bắt đầu với `/makeit:help`.

---

## What Gets Installed

| Item | Destination | Purpose |
|------|-------------|---------|
| `GEMINI.md` | `.gemini/GEMINI.md` | AI context cho role |
| `skills/makeit-{role}/` | `.agent/skills/makeit-{role}/` | Skill definitions + templates + references |
| `workflows/makeit/` | `.agent/workflows/makeit/` | Slash commands (`/makeit:*`) |
| `rules/` | `.agent/rules/` | Universal + role-specific rules |
| `.makeit/` | `.makeit/` | Task state directory (tasks, config, archive) |

---

## Per-Role Links

- [Product Owner (PO)](./po/)
- [Business Analyst (BA)](./ba/)
- [Designer](./designer/)
- [Techlead](./techlead/)
- [Dev Frontend (FE)](./dev-fe/)
- [Dev Backend (BE)](./dev-be/)
