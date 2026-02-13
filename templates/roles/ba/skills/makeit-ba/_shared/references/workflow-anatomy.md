# MakeIt Workflow Anatomy

> Authoritative reference for MakeIt workflow format. All role workflows must follow this standard.

## 1. MakeIt vs GSD Workflows

| Aspect | GSD Workflow | MakeIt Workflow |
|--------|-------------|-----------------|
| Project files | `.planning/` | `.makeit/sprint/SPRINT-NNN-DDMMYYYY/` |
| State file | `.planning/STATE.md` | `.makeit/sprint/*/STATE.md` |
| Roadmap | `.planning/ROADMAP.md` | `.makeit/sprint/*/ROADMAP.md` |
| Skills path | `.agent/skills/gsd/` | `.agent/skills/makeit-{role}/` |
| Scope | Solo project lifecycle | Team sprint within pipeline |

**Same structure:** frontmatter → objective → execution_context → process → success_criteria

## 2. Three Workflow Categories

### Category A: Stage Command (12 per role)

Full sprint-aware lifecycle commands. 40-80 lines.

```markdown
---
name: makeit:{command}
description: What this command does
---

<objective>
What the command achieves — one sentence.
</objective>

<execution_context>
@.agent/skills/makeit-{role}/{domain}/stage-{command}.md
@.agent/skills/makeit-{role}/_shared/references/{ref}.md    ← if relevant
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase, plan status, blockers.
    If no active sprint → error: "Run /makeit:clarify first"
  </step>
  <step name="validate">
    Check prerequisites for this command.
    Validate arguments if any.
  </step>
  <step name="execute">
    Follow the skill instructions from execution_context.
    Apply to current sprint context.
  </step>
  <step name="update_state">
    Update `.makeit/sprint/*/STATE.md` with new status/progress.
  </step>
  <step name="report">
    Show results summary.
    Suggest next command in the lifecycle.
  </step>
</process>

<success_criteria>
- [ ] Sprint state loaded and validated
- [ ] Command-specific outcome achieved
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
```

**Exceptions:**
- `clarify.md` **creates** the sprint workspace (no load_sprint — it bootstraps)
- Management commands (`add/insert/remove-phase`) operate on ROADMAP.md

### Category B: Support Command (5 per role)

Lighter commands. Some sprint-aware, some context-free. 25-50 lines.

```markdown
---
name: makeit:{command}
description: What this command does
---

<objective>
Command purpose — one sentence.
</objective>

<execution_context>
@.agent/skills/makeit-{role}/{domain}/{command}.md
</execution_context>

<process>
  <step name="gather_context">
    Load sprint state if sprint-aware.
    Otherwise, work from current conversation context.
  </step>
  <step name="execute">
    Follow skill instructions.
  </step>
  <step name="persist">
    Save output if applicable (decision log, lesson file, etc.).
  </step>
</process>

<success_criteria>
- [ ] Output produced or displayed
</success_criteria>
```

**`help.md` exception:** No sprint context needed — just display command list.

### Category C: Utility Command (3 per role)

Medium complexity, context-aware. 30-50 lines.

```markdown
---
name: makeit:{command}
description: What this command does
---

<objective>
Command purpose — one sentence.
</objective>

<execution_context>
@.agent/skills/makeit-{role}/{domain}/{command}.md
</execution_context>

<process>
  <step name="load_context">
    Find active sprint or relevant state files.
  </step>
  <step name="execute">
    Follow skill instructions.
  </step>
  <step name="save">
    Persist state changes (handoff doc, debug file, etc.).
  </step>
  <step name="report">
    Show results and next steps.
  </step>
</process>

<success_criteria>
- [ ] Context captured/restored correctly
- [ ] Output persisted
</success_criteria>
```

## 3. Path Convention Rules

**All `@` paths use INSTALLED workspace paths, never template repo paths.**

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `@templates/roles/ba/skills/makeit-ba/...` | `@.agent/skills/makeit-ba/...` |
| `@templates/roles/_shared/skills/...` | `@.agent/skills/makeit-shared/...` |

## 4. Sprint File Reference Patterns

Workflows reference these project files:

| File | Path | Used by |
|------|------|---------|
| Sprint state | `.makeit/sprint/SPRINT-*/STATE.md` | All stage commands |
| Sprint specs | `.makeit/sprint/SPRINT-*/SPECS.md` | verify-work, execute |
| Phase roadmap | `.makeit/sprint/SPRINT-*/ROADMAP.md` | plan, execute, management |
| Phase plan | `.makeit/sprint/SPRINT-*/phases/{NN}-*/PLAN.md` | execute, verify |
| Deliverables | `.makeit/sprint/SPRINT-*/deliverables/` | verify-work, complete |

## 5. Fixed Steps Checklist

| Category | Required steps | Optional steps |
|----------|---------------|----------------|
| Stage | load_sprint, validate, execute, update_state, report | parse_args (if arguments) |
| Support | gather_context, execute, persist | — |
| Utility | load_context, execute, save, report | — |

## 6. Command Inventory

| # | Command | Category | Sprint-aware |
|---|---------|----------|-------------|
| 1 | clarify | Stage | Creates sprint |
| 2 | plan-phase | Stage | Yes |
| 3 | discuss-phase | Stage | Yes |
| 4 | show-phase-approach | Stage | Yes |
| 5 | research-phase | Stage | Yes |
| 6 | execute-phase | Stage | Yes |
| 7 | verify-phase | Stage | Yes |
| 8 | verify-work | Stage | Yes |
| 9 | complete | Stage | Yes |
| 10 | add-phase | Stage | Yes |
| 11 | insert-phase | Stage | Yes |
| 12 | remove-phase | Stage | Yes |
| 13 | status | Support | Yes |
| 14 | help | Support | No |
| 15 | decide | Support | Yes |
| 16 | estimate | Support | Yes |
| 17 | lesson-learned | Support | Optional |
| 18 | debug | Utility | Yes |
| 19 | pause-work | Utility | Yes |
| 20 | resume-work | Utility | Yes |
