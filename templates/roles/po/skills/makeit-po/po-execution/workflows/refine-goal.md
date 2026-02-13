---
name: po-workflow-refine-goal
description: PO internal workflow — challenge and refine goal clarity for backlog items using structured probing
---

<purpose>
Challenge and refine goal clarity for backlog items. Agent probes with targeted questions to identify gaps and improve clarity, applying SMART criteria.
</purpose>

<rules>
1. Only ask about gaps detected — don't ask all 5 questions if item is already clear
2. Max 2 probing rounds — after that, proceed with what's available
3. Agent identifies gaps, PO provides answers — don't write specs for PO
4. Before/after comparison required
5. AI drafts improvements, PO evaluates and decides
</rules>

<process>
  <step name="load_item">
    1. If user specifies task ID → read from `.makeit/tasks/TASK-NNN.md`
    2. If user pastes content → parse directly
    3. If nothing → ask user to paste backlog item draft

    Quick scan: Read Goal + Context sections, identify gaps immediately.
  </step>

  <step name="probe_gaps">
    Probe with 5 dimensions — only ask about detected gaps:

    **1. WHY (Value):**
    - Why build this now? Who benefits most? Impact if not built?

    **2. WHAT (Scope):**
    - Specific scope — what's IN, what's OUT? MVP vs full?

    **3. WHEN (Timeline):**
    - Hard deadline or flexible? Impact of 1-sprint delay?

    **4. HOW (Constraints):**
    - Known technical constraints? Integration requirements?

    **5. RISK (Assumptions):**
    - Assumptions to validate? Known edge cases? Break scenarios?

    > Smart probing: Group related questions. Don't overwhelm.
  </step>

  <step name="identify_gaps">
    List clearly:
    - ❌ **Missing:** Information completely absent
    - ⚠️ **Unclear:** Information present but ambiguous
    - ✅ **Clear:** Information is clear

    Gap severity:
    - 🔴 Critical — BA cannot proceed without this
    - 🟡 Important — should have, BA can infer
    - 🟢 Nice to have — improves quality
  </step>

  <step name="refine_item">
    1. Update backlog item with improved clarity from PO answers
    2. Apply SMART criteria: Specific, Measurable, Achievable, Relevant, Time-bound
    3. Show before/after comparison for key improvements
    4. Re-check against Gate 1 items (5-7)

    Suggest next:
    - Needs rewrite → draft-backlog workflow
    - Ready → check-gate workflow
    - Still has gaps → continue probing (max 2 rounds)
  </step>
</process>

<edge_cases>

**Khi AI refine goal nhưng output vẫn thiếu priority rationale hoặc context trống:** Tự flag trước khi trình PO — "⚠️ Sau 2 rounds probing, goal vẫn thiếu [mục cụ thể]. Cần PO cung cấp trực tiếp."

**Khi nhận feedback từ BA nói specs thiếu/sai — cần refine lại goal:** Parse BA feedback cụ thể (mục nào fail) → chỉ probe đúng gaps đó, không re-run toàn bộ 5 dimensions. Track clarification round count.

**Khi feedback đến từ TL/Dev (Stage 3-4) nói goal không khả thi về mặt technical:** Phân loại feedback (scope problem, technical infeasibility, ambiguity) → route tới PO với đề xuất: modify goal, split goal, hoặc escalate team discussion.

</edge_cases>

## Anti-patterns

- ❌ **Ask all 5 questions at once:** Overwhelming — only ask detected gaps
- ❌ **Accept vague answers:** "Decided later" → push for at least an assumption
- ❌ **Write specs for PO:** Agent identifies gaps, PO provides answers
- ❌ **Infinite refinement:** Max 2 rounds — proceed with available info
- ❌ **Skip severity classification:** Every gap must have severity for BA to know priority
