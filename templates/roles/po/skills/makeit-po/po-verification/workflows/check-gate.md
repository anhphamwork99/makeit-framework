---
name: po-workflow-check-gate
description: PO internal workflow — verify PO output meets Gate 1 (sender-side items 3-5) and coordinate Gate 5 (PR review)
---

<purpose>
Verify PO output meets quality gates — Gate 1 sender-side (items 3-5) before handoff to BA, and Gate 5 (PR review) for final approval.
</purpose>

<rules>
1. PO verifies items 3-5 (sender side) — items 1-2 are BA verifier checks, design tokens + copy/text are Designer self-check via mark-ready
2. Report Designer item status — coordinate, don't directly verify
3. FAIL items must specify exactly what's missing
4. No auto-pass — verify against actual content
</rules>

<output>
Gate check report (pass/fail per item)
Reference: `@_shared/references/quality-gates.md`
</output>

<process>
  <step name="load_checklist">
    Read from `@_shared/references/quality-gates.md`, focus PO items:

    **Gate 1 — PO Output Items (sender side — items 3-5):**
    - [ ] Item 3: Goal rõ ràng — PO describes business objective clearly
    - [ ] Item 4: Context đầy đủ — background, user needs, constraints documented
    - [ ] Item 5: Priority xác định — PO set priority level and sprint

    **Gate 1 — Designer Items (coordinate — items 1-2):**
    - [ ] Item 1: Design screens "Ready for Dev"
    - [ ] Item 2: All interaction states defined
    > Design tokens + copy/text → Designer self-check via `mark-ready`

    **Gate 5 — PO Review Items (reviewer — items 3, 6):**
    - [ ] Item 3: PO verified business logic matches specs
    - [ ] Item 6: PO final approval
  </step>

  <step name="check_items">
    1. If user specifies task → read from `.makeit/tasks/TASK-NNN.md`
    2. If user pastes content → check directly
    3. Evaluate each item:
       - ✅ **Pass** — sufficient quality
       - ❌ **Fail** — missing/insufficient, specify what to add
       - ⚠️ **Partial** — present but unclear, specify gap
  </step>

  <step name="generate_report">
    ```markdown
    ## 🚦 Gate Check — PO Output

    | # | Item | Status | Notes |
    |---|------|--------|-------|
    | 3 | Goal rõ ràng | ✅/❌ | [detail] |
    | 4 | Context đầy đủ | ✅/❌ | [detail] |
    | 5 | Priority xác định | ✅/❌ | [detail] |

    **Designer coordination:**
    | 1-2 | Design items | [Status] | Coordinate with Designer |

    **Result:** ✅ PASS / ❌ FAIL
    ```

    Suggest next:
    - ✅ Pass → continue sprint or handoff
    - ❌ Fail → fix items → re-check
    - ⚠️ Partial → refine-goal workflow for specific gaps
  </step>
</process>

<edge_cases>

**Khi BA gate-fail feedback trả về nói "Goal vague" hoặc "Context missing":** Parse feedback cụ thể → route PO tới fix chính xác (refine-goal cho vague goal, bổ sung context cho missing items). Track clarification count — max 3 rounds trước khi escalate.

**Khi Designer và PO có conflicting vision — Gate 1 blocked vì Designer nói "Ready" nhưng PO disagrees:** Ghi nhận conflict → route tới PO decide workflow. PO là final authority theo team-workflow.md. Draft Telegram message để coordinate offline nếu cần.

</edge_cases>

## Anti-patterns

- ❌ **Skip gate check:** Handoff without verification → BA will return
- ❌ **Auto-pass without checking:** Tick ✅ without actually verifying
- ❌ **Ignore Designer items:** PO should coordinate, report status
- ❌ **No notes on failures:** ❌ without specifying what's missing → can't fix
