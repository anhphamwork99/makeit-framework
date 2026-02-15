# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-08)

**Core value:** Mỗi thành viên clone repo → copy files vào IDE → chạy được ngay
**Current focus:** Phase 8.2 — Serena MCP Integration (next up)

## Current Position

Phase: 8.2 of 23 (Serena MCP Integration) — In Progress
Plan: 2/4 — Plan 01 + 03 complete (Serena Foundation + TL Code Review Enhancement)
Status: Executing — Plan 01, 03 done, Plan 02, 04 pending
Last activity: 2026-02-15 — Plan 03 executed (review-code impact analysis step + code-review template section 0)

Progress: [██████████░░░░░░░░░░] 50% — Phase 8.2 executing (2/4 plans)

## Performance Metrics

**Velocity:**
- Total plans completed: 63
- Average duration: ~6 min
- Total execution time: ~342 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01 Wiki Foundation | 3/3 ✅ | ~18 min | ~6 min |
| 01.1 Team Workflow | 1/1 ✅ | ~5 min | ~5 min |
| 02 Role Workflows | 3/3 ✅ | ~15 min | ~5 min |
| 03 Sprint Ceremonies | 1/1 ✅ | ~5 min | ~5 min |
| 04 AI Tooling | 6/6 ✅ | ~25 min | ~4 min |
| 04.1 Framework Hardening | 8/8 ✅ | ~40 min | ~5 min |
| 04.2 GSD Process Adoption | 12/12 ✅ | ~120 min | ~10 min |
| 04.3 BA Lifecycle Gap Fixes | 4/4 ✅ | ~10 min | ~2.5 min |
| 04.4 Active Orchestrator | 12/12 ✅ | ~65 min | ~5 min |
| 04.5 Skill Consolidation | 9/9 ✅ | ~60 min | ~7 min |
| 04.6 Workflow Process Gaps | 7/7 ✅ | ~45 min | ~6 min |
| 04.7 Template Standardization | 6/6 ✅ | ~15 min | ~2.5 min |
| 04.8 Template Coverage | 6/6 ✅ | ~60 min | ~10 min |
| 04.9 Product Memory | 6/6 ✅ | ~30 min | ~5 min |
| 04.10 Role Content Polish | 3/3 ✅ | ~15 min | ~5 min |
| 05 Edge Case Playbooks | 10/10 ✅ | ~40 min | ~4 min |
| 05.1 Git-based Handoff | 4/4 ✅ | ~20 min | ~5 min |
| 06 Tool Guides | 5/5 ✅ | ~25 min | ~5 min |
| 07 Onboarding | 2/2 ✅ | ~8 min | ~4 min |
| 08 Web App | 5/5 ✅ | ~50 min | ~10 min |
| 08.1 Lark-centric Task Flow | 8/8 ✅ | ~50 min | ~6 min |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Documentation-first, Automation-later strategy
- [Init]: Wiki hybrid structure (topic + role + workflow)
- [Init]: Web app extends existing Vite + React foundation
- [Init]: Shared resource protocol with layered GEMINI.md config
- [01-01]: Full guide READMEs for root, getting-started, reference
- [01-01]: Placeholder READMEs with 🚧 banner + cross-links pattern
- [01-02]: 4 commit types only (feat, fix, docs, chore) — enforced via commitlint
- [01-02]: Single PR template with 3 role-aware `<details>` blocks
- [01-02]: AI Review Checklist: Output Verification + Context Completeness
- [01-03]: 4 quality gates: Design→BA, BA→Dev, Dev→Review, Review→Done
- [01-03]: Cross-check model: receiver verifies input
- [01-03]: PO is final authority at Review→Done gate
- [01-03]: Trust-based shared resources: no CODEOWNERS, 1 approval, Telegram conflict resolution
- [01.1]: 5-stage workflow: Design/PO → BA → Techlead → FE/BE → Review → Done
- [01.1]: Source of truth hierarchy: PO Goal → Design → BA Stories → TL Tasks → Dev Code
- [01.1]: Feedback loop max 3 rounds, then escalate to sync meeting
- [02-01]: Role page structure: Overview → Responsibilities → Process → Handoff → AI Usage → Quick Ref
- [02-01]: Templates separated into templates.md per role folder
- [02-01]: AI prompts specific to Antigravity per role task (not generic)
- [02-01]: Breakpoints are project-level one-time decision by Designer
- [02-02]: BA explicitly owns user flow documentation (not Designer)
- [02-02]: Architecture decisions: minor (alone), medium (discuss Dev), major (team + ADR)
- [02-02]: AI-generated code oversight is explicit Techlead responsibility
- [02-03]: Dev FE and Dev BE share 7-step implementation process, differ on domain expertise
- [02-03]: AI verification: generated code = self-verify, architecture changes = discuss Techlead
- [02-03]: roles/README.md: all 6 roles ✅ Ready
- [03-01]: Time-box: Refinement ~30 min, Planning ~45 min, Sync max 15-20 min
- [03-01]: Runbook pattern: Trước/Trong/Sau structure with role-specific checklists
- [03-01]: Async Telegram updates complement weekly sync (not replace)
- [04.1-08]: Multi-domain skill architecture in GEMINI.md (domain table replaces flat skill list)
- [04.1-08]: install.sh copies from templates/roles/{role}/ with recursive domain folder copy
- [04.2-01]: 7-state lifecycle (received→clarifying→specifying→executing→verifying→complete→handed_off)
- [04.2-01]: Max 1 revision loop on verification failure; scope changes escalate
- [04.2-01]: HITL spawn threshold: >30% context or >50 lines output
- [04.2-01]: 3-level verification (existence→substantive→wired) adapted for deliverables
- [04.2-03]: role-orchestrator.md defines PROCESS (stages, routing); agent file defines ROLE (identity, responsibilities)
- [04.2-03]: Lifecycle section in SKILL.md: between Mục đích and Khi nào dùng for context-before-routing
- [04.2-03]: GEMINI.md pattern: Mini-GSD 5-bullet summary under role description
- [04.3-02]: Dual path decision: Both orchestrator lifecycle (Path A) and direct skill (Path B) are valid. Path A for tracked work needing full lifecycle; Path B for quick standalone actions. Not a bug — by design.
- [04.4-design]: Sprint = Mini-Project (per role, local workspace) — each role has OWN sprint folder `.makeit/sprint/SPRINT-NNN-DDMMYYYY/`, NOT shared cross-role
- [04.4-design]: 3-Layer Source of Truth — Lark (task tracking) → Local workspace (working files, ephemeral) → Git (final deliverables only)
- ~~[04.4-design]: Active Orchestrator — role-orchestrator.md becomes active skill with 7 functions~~ **⚠️ SUPERSEDED by [04.4-pivot]**
- ~~[04.4-design]: 6 Stage Commands — clarify, plan-phase, execute-phase, verify-phase, verify-work, complete~~ **⚠️ SUPERSEDED by [04.4-pivot]**
- [04.4-design]: Phase Iteration Loop — plan→execute→verify loops per phase, same as GSD
- [04.4-design]: Domain skills become internal — called during `/makeit:execute-phase`, not directly by user
- [04.4-design]: Lark Integration — auto-sync with manual fallback when API fails
- [04.4-design]: Process files ephemeral — only deliverables/ folder gets committed to git
- [04.4-pivot]: **role-orchestrator.md ELIMINATED** — IDE (Antigravity) IS the orchestrator. Each slash command routes directly to its stage skill via workflow file. Role context comes from GEMINI.md (auto-loaded). No intermediate orchestrator layer.
- [04.4-pivot]: **Commands expanded 6 → 16** — 9 stage (clarify, discuss-phase, show-phase-approach, research-phase, plan-phase, execute-phase, verify-phase, verify-work, complete) + 3 management (add-phase, insert-phase, remove-phase) + 4 support (status, help, decide, lesson-learned)
- [04.4-pivot]: **Workflow routers SHARED** — 16 shared files in `templates/workflows/makeit/` (not 30 per-role). Role context from GEMINI.md.
- [04.4-pivot]: **Sprint deliverables per role** — SPECS/ROADMAP about each role's deliverables: BA=stories, TL=tasks+estimates, FE=frontend code, BE=backend code, PO=backlog items
- [04.4-pivot]: **SKILL.md = catalogue only** — not routing hub, not in execution path. IDE reads it for /makeit:help, not during command execution. Stage skills are the execution entry points.
- [04.4-pivot]: **Architecture: 1 command = 1 workflow = 1 stage skill** — workflow file (thin router) → stage skill (self-contained process) → GEMINI.md (role context). Keeps Agent context minimal and focused.
- [07-02]: Role links use folder paths (../roles/po/) for consistency with wiki structure
- [07-02]: Vercel removed from getting-started tool stack, replaced with Shopify (Phase 6 alignment)

> All 10 todos resolved in **Phase 4.6: Workflow Process Gaps Fix** ✅

### Pending Todos

2 pending — see `.planning/todos/pending/`

- `2026-02-13-integrate-storybook-workflow.md` — Integrate Storybook vào team workflow với Figma MCP split-layer model (area: planning)

### Blockers/Concerns

None yet.

### Roadmap Evolution

- Phase 1.1 inserted after Phase 1: Team Workflow Definition — document end-to-end handoff chain before writing individual role workflows
- Phase 1.1 completed: 2026-02-10 — team workflow document created (285 lines, 5 stages, ASCII diagrams)
- Phase 4.1 inserted after Phase 4: MakeIt Framework Hardening (URGENT) — nâng chất lượng framework lên GSD-level rigor
- Phase 4.1 completed: 2026-02-10 — all 8 plans executed (foundation, 6 role restructures, integration)
- Phase 4.2 inserted after Phase 4.1: GSD Process Adoption per Role — research & apply GSD execution lifecycle cho từng role (INSERTED)
- Phase 4.2 decisions: Designer excluded (output = Figma), sequential per-role (BA→TL→FE→BE→PO), 3-layer skill architecture
- Phase 4.2 completed: 2026-02-10 — 12 plans, 9 waves, 25 agent files + 7 shared skills + 5 role-orchestrators
- Phase 4.2 bonus: Relocated agent/shared files from root .agent/ to templates/roles/ for correct install.sh flow
- Phase 4.3 inserted after Phase 4.2: BA Lifecycle Gap Fixes (URGENT) — 5 gaps found during BA walkthrough: TASK-TEMPLATE mismatch, missing start-task, .makeit bootstrap, dual path, missing sections
- Phase 4.3 completed: 2026-02-10 — 4 plans, 2 waves. Gaps fixed: TASK-TEMPLATE overhauled (7-state), start-task created (5 roles), install.sh bootstrap fixed, dual-path documented
- Phase 4.4 inserted after Phase 4.3: Active Orchestrator + Sprint Structure — redesign passive orchestrator to active GSD-like lifecycle, introduce Sprint as project unit, 6 stage commands
- Phase 4.4 completed: 2026-02-11 — 12 plans, 4 waves. Architectural pivot: role-orchestrators eliminated, commands 6→16, shared workflow routers, stage skills 6→12
- Phase 4.5 inserted after Phase 4.4: Skill Structure Consolidation — unify disconnected layers into GSD-aligned single structure with 8 domains per role
- Phase 4.5 completed: 2026-02-11 — 14 plans, 4 waves. 163 skill files, 90 routers, 25 agents, 5 spawning refs — all 5 roles verified
- Phase 4.6 inserted after Phase 4.5: Workflow Process Gaps Fix — 7 system-level gaps across all 5 roles, 10 todos consolidated, 4-wave plan
- Phase 4.6 completed: 2026-02-12 — 7 plans, 4 waves. Deliverables: 5 wiki references, 6 new workflows, 2 shared templates, 5 context discovery workflows, FE↔BE coordination protocol, BE lifecycle expanded 6→9 stages
- Phase 4.7 inserted after Phase 4.6: Template Standardization per Role — audit skills/sub-agents per role, standardize templates for consistent agent output
- Phase 4.7 completed: 2026-02-12 — 6 plans, 3 waves. 32 templates audited (21 role-specific + 11 shared), all passing quality checklist. 1 rewrite (PO handoff), 3 wiring fixes (TL/FE/BE), 0 orphans.
- Phase 4.8 completed: 2026-02-12 — 6 plans, 6 waves. 71 templates across 5 roles, all self-contained. Verification passed (5/5).
- Phase 4.9 inserted after Phase 4.8: Product Memory System — Knowledge Layer cho AI agents có trí nhớ dài hạn across sprints (INSERTED)
- Phase 4.9 completed: 2026-02-13 — 6 plans, 3 waves. Architecture files, KB skills (5), Document Agent, sprint integrations (15 files), GEMINI.md (5 roles), deliverable templates. 12/12 criteria passed.
- Phase 4.10 inserted after Phase 4.9: Role Content Polish — fix 27 audit issues across 5 roles from parallel audit agents
- Phase 4.10 completed: 2026-02-13 — 3 plans, 2 waves. Cross-role structural fixes (KB paths, phantom refs), content naming (CODEBASE-SNAPSHOT→PRODUCT-CONTEXT, gate numbering), registry sync (GEMINI.md, help.md), wiki refs cleaned, Figma MCP clarified.
- Phase 5 completed: 2026-02-13 — 10 plans, 2 waves. 5 gap audits (1,011 lines) + 5 fix plans. 62 skill files modified with `<edge_cases>` sections across 5 roles + 1 shared.
- Phase 5.1 inserted after Phase 5: Git-based Handoff — refactor handoff from Lark paste to Git commit in product repo (from todo)
- Phase 5.1 completed: 2026-02-13 — 4 plans, 3 waves. Handoff templates (5), sender/receiver skills (10), check-handoff command (10 new files), command registration (15 files). Git-based handoff replaces Lark paste.
- Phase 6 completed: 2026-02-13 — 5 plans, 2 waves. 24 wiki pages (Git 6, Figma 6, Lark 6, Shopify 6), tools index updated, Vercel removed (CONTEXT.md Decision #1). ROADMAP + REQUIREMENTS aligned.
- Phase 7 completed: 2026-02-13 — 2 plans, 2 waves. 3 onboarding guides (how-we-work, first-week-checklist, first-win-guide), getting-started README cleaned of all placeholders.
- Phase 8 started: 2026-02-13 — Plan 01 complete (scaffold + content pipeline). Vite + React + TailwindCSS v3 + shadcn/ui, 55 wiki pages loaded, TanStack Router route tree generated, dark mode with #EB2F96 accent.
- Phase 8 Plan 02: 2026-02-13 — Sidebar navigation, markdown rendering, Mermaid diagrams, dynamic routes, ToC scroll-spy, breadcrumb, mobile nav. All 55 wiki pages browsable.
- Phase 8 Plan 03 complete: 2026-02-13 — Home page with hero (gradient bg, grid pattern), 5 role selector cards (distinct accents), quick access (3 groups, 10 verified links). SectionCard reusable component.
- Phase 8 Plan 04 complete: 2026-02-13 — ⌘K command palette (MiniSearch full-text, section grouping, keyboard nav) + TeamWorkflow swimlane (5-stage, hover reveals) + SprintTimeline (ceremony cadence). All responsive.
- Phase 8 complete: 2026-02-14 — 5 plans, 4 waves. Web app with sidebar nav, markdown rendering, Mermaid diagrams, ⌘K search, workflow visualizations, responsive polish. Human verified, production build passes.
- Phase 8.1 inserted after Phase 8: Lark-centric Task Flow — Pipeline update (TL code review stage), Lark MCP task creation, start-my-tasks command, scope change management
- Phase 8.1 planning complete: 2026-02-15 — 7 plans, 3 waves. Wave 1: HANDOFF restructure + TL dual mode. Wave 2: Lark Tasks + start-my-tasks + scope management + check-handoff. Wave 3: Registry + wiki sync.
- Phase 8.1 complete: 2026-02-15 — 8 plans, 4 waves. HANDOFF restructure (5 templates), TL dual mode (review-code + handoff-to-po), Lark Task creation (5 stage-complete), start-my-tasks (4 roles), scope management (update-scope + sync-scope), check-handoff updates (5 roles, Lark Task IDs), registry + wiki sync (17 files), project docs refresh (ARCHITECTURE.md + PROJECT.md). 14 success criteria met.
- Phase 8.2 inserted after Phase 8.1: Serena MCP Integration — Symbol-level code intelligence for coding agents via Serena MCP. 4 ideas: Serena workspace skill, Memory Bridge (KB↔Serena), enhanced map-codebase (semantic), TL code review enhancement. Optional, backward compatible.

## Session Continuity

Last session: 2026-02-15T19:55:00+07:00
Stopped at: Phase 8.2 Plan 03 complete — TL Code Review Enhancement
Next: Execute Plan 02 (Memory Bridge) or Plan 04 (map-codebase)
Resume file: `.planning/phases/08.2-serena-mcp-integration/`
