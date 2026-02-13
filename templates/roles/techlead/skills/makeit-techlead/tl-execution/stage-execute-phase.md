---
name: tl-stage-execute-phase
description: TL execute — run plan tasks using internal TL workflows (break-tasks, design-solution, review-code, etc.)
---

<purpose>
Execute tasks defined in PLAN.md using internal Techlead workflows. Each task maps to a TL domain workflow — story verification, solution design, task breakdown, estimation, assignment, or code review. Updates STATE.md after each task.
</purpose>

<required_reading>
- `.agent/skills/makeit-techlead/_shared/references/quality-gates.md` — Gate 2 (verify input) + Gate 3 (your output)
- `.agent/skills/makeit-techlead/_shared/references/coding-standards.md` — Technical standards
</required_reading>

<rules>
1. Execute tasks in PLAN.md order — follow dependency chain
2. Each task updates STATE.md progress after completion
3. Spawn sub-agents for tasks marked "spawn" in PLAN.md
4. Inline execution for tasks marked "inline"
5. Use co-located templates from `tl-execution/templates/` when specified
6. Never skip task — if blocked, report and wait
</rules>

<output>
- Deliverables as specified in each task's output field
- Updated STATE.md with task completion status
</output>

<internal_workflows>
These are the TL domain workflows available during execution:

| Workflow | Purpose | When Used |
|----------|---------|-----------|
| **break-tasks** | Break user stories into FE/BE tasks | Core TL workflow — task decomposition |
| **design-solution** | Design technical solution (architecture, API, patterns) | Complex stories needing tech design |
| **assign-tasks** | Assign FE/BE tasks to developers | After task breakdown + estimation |
| **review-code** | Review PR for quality, patterns, security | When Dev submits PR |
| **self-review** | Self-review task breakdown quality | Before assignment — quality check |
| **check-gate** | Formal Gate 3 pass/fail verification | Before handoff to Dev |
| **estimate** | Estimate task complexity with TL methodology | After task breakdown |

### Workflow Details

**break-tasks** — See `tl-breakdown/break-tasks.md` content:
- Load verified stories
- Analyze scope → identify FE and BE work
- Define API contracts between FE/BE → **follow `wiki/reference/api-contract-convention.md`** (convention-based: only document deviations from standard CRUD)
- Map dependencies
- Template: `tl-execution/templates/task-breakdown.md`

**design-solution** — See `tl-breakdown/design-solution.md` content:
- Gather context (stories, constraints, existing codebase)
- Propose solution across layers (architecture, data, API)
- Analyze trade-offs
- Template: `tl-execution/templates/architecture-decision.md`

**assign-tasks** — See `tl-breakdown/assign-tasks.md` content:
- Review task breakdown
- Assign based on skills and workload
- Generate assignment messages

**review-code** — See `tl-review/review-code.md` content:
> 🔄 **Part of Code Review Lifecycle** (not Sprint Lifecycle).
> Triggered when Dev submits PR. See `wiki/reference/lifecycle-types.md`.

- Architecture compliance, coding standards
- AI-generated code oversight
- Performance and security checks
- Template: `tl-execution/templates/code-review.md`

**self-review** — See `tl-review/self-review.md` content:
- Task breakdown quality check
- Technical completeness check
- Ambiguity check

**check-gate** — See `tl-review/check-gate.md` content:
- Gate 3 formal checklist
- Task breakdown quality, scope, references

**estimate** — See `tl-estimation/estimate.md` content:
- 7-factor complexity scoring
- T-shirt sizing (S/M/L/XL)
- Risk factor assessment
- FE/BE split analysis
- Template: `tl-execution/templates/estimation-report.md`
</internal_workflows>

<process>
  <step name="load_plan">
    Read PLAN.md for current phase.
    Parse tasks: description, input, output, workflow, execution mode.
    Track: which tasks are done, which remain.
  </step>

  <step name="execute_tasks">
    For each task in order:

    1. **Check dependencies** — prerequisite tasks completed?
    2. **Load task context** — input files, templates
    3. **Execute workflow:**
       - If inline → run the internal workflow directly
       - If spawn → prepare spawn prompt, follow sub-agent spawning method
    4. **Write output** — deliverable file to specified path
    5. **Update STATE.md** — mark task as complete
  </step>

  <step name="handle_spawn">
    For spawn tasks:
    1. Prepare spawn prompt with task context and output requirements
    2. Follow spawning method per `.agent/rules/spawn sub-agents.md`
    3. After sub-agent returns, verify output exists and has content
  </step>

  <step name="report">
    After all tasks complete:
    ```
    ✅ Phase {N} execution complete

    📦 Deliverables:
    - {deliverable 1}: {path}
    - {deliverable 2}: {path}

    💡 Next: /makeit:verify-phase → check output quality
    ```
  </step>
</process>

<edge_cases>

**Khi break-tasks output thiếu tasks hoặc bỏ sót scenarios:** Re-check BA stories gốc, cross-reference với Figma screens. Nếu story có N screens nhưng task breakdown chỉ cover N-1 → bổ sung tasks còn thiếu. Nếu story ambiguous → ⚠️ STOP — Story không đủ rõ để break tasks. Tag BA qua Telegram yêu cầu clarify. Log vào STATE.md.

**Khi Figma design thay đổi sau khi đã break tasks:** So sánh design mới vs task breakdown hiện tại. Nếu thay đổi nhỏ (copy, spacing) → patch tasks hiện tại, ghi note trong task description. Nếu thay đổi lớn (flow mới, screen mới) → ⚠️ STOP — Design change ảnh hưởng task breakdown. Cần re-assess scope với BA/PO trước khi tiếp tục. Log vào STATE.md.

**Khi phát hiện BA spec mâu thuẫn hoặc thiếu trong lúc execution:** Nếu 2 acceptance criteria conflict nhau hoặc story thiếu scenario quan trọng → dừng task hiện tại, ghi rõ contradiction/gap, tag BA qua Telegram: "Story X: AC #2 conflict với AC #4 — cần clarify." Không tự suy đoán intent của BA.

**Khi Dev trả lại task breakdown vì thiếu hoặc sai:** Đọc feedback cụ thể từ Dev. Phân loại: (1) clarification → trả lời trực tiếp, (2) gap thật → revise task breakdown + API contract, (3) scope disagreement → escalate lên BA/PO. Sau khi fix → re-handoff với changelog rõ ràng.

**Khi AI-generated code liên tục mắc cùng loại lỗi (pattern issue):** Nếu >2 PRs có cùng vấn đề (thiếu error handling, sai type, bỏ qua validation) → tạo ADR hoặc update coding-standards.md để prevent. Đưa pattern vào checklist review-code. Không chỉ fix từng PR — fix systemic issue.

**Khi task quá phức tạp cho AI agent xử lý autonomously:** Indicators: cần reasoning across >3 systems, cần real-time external data, cần architectural judgment nuanced. → Chuyển task thành hybrid human+AI: AI draft → human review → human refine. Ghi note trong PLAN.md: "Execution: hybrid — AI draft, human refine."

**Khi phát hiện FE và BE devs đang làm việc trên conflicting assumptions:** Nếu API contract đã define nhưng implementation diverge → triệu tập sync nhanh (Telegram). Nếu chưa có contract → tạo contract ngay, gửi cho cả FE và BE confirm trước khi tiếp tục.

**Khi shared resource (STATE.md, API contracts) bị modified bởi agent/role khác:** Trước khi edit shared file → kiểm tra timestamp/version. Nếu file đã thay đổi since last read → re-read, merge changes, rồi mới update. Nếu conflict không thể tự merge → ⚠️ STOP — Shared resource conflict. Cần coordination với role liên quan. Log vào STATE.md.

**Khi architecture decision cần consensus từ nhiều roles:** Nếu quyết định ảnh hưởng >1 role (DB schema change, new API pattern, infrastructure component) → KHÔNG quyết định unilateral. Draft proposal trong ADR format → gửi Telegram cho affected roles → set deadline 24h cho feedback. Nếu không có feedback sau deadline → proceed với default approach, ghi note.

**Khi estimate sai lệch lớn so với actual effort:** Nếu task đang execute mà effort thực tế >2x estimate → dừng, reassess remaining tasks. Cập nhật estimation report. Nếu sprint capacity bị ảnh hưởng → flag cho PO: "Sprint X sẽ không hoàn thành đúng hạn — cần re-prioritize."

**Khi code review phát hiện solution design sai fundamentally:** Nếu vấn đề không phải code quality mà là approach sai (wrong data model, wrong architecture pattern) → KHÔNG approve với "fix code" comments. → ⚠️ STOP — Re-design cần thiết. Quay lại design-solution workflow, re-break tasks nếu cần. Log decision trong ADR.

</edge_cases>

<success_criteria>
- [ ] All tasks from PLAN.md executed
- [ ] Deliverables written to specified paths
- [ ] Templates used where specified
- [ ] STATE.md updated after each task
- [ ] User informed of results and next steps
</success_criteria>
