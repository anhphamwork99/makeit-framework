---
name: manage-sprint-goal
description: PO workflow to add, modify, or split sprint goals mid-sprint with impact assessment and downstream notifications
---

# Sprint Goal Management

> PO can adjust sprint goals during execution when business context changes.
> Every change must be assessed for impact and communicated to downstream roles.

## When to Use

- New business priority emerges mid-sprint
- Market/user feedback changes original assumptions
- Goal proves too large to complete in one sprint
- Stakeholder request requires scope adjustment

## Add Goal

When PO identifies an additional goal during sprint:

1. **Assess impact on existing goals**
   - Will this delay current goals?
   - Can it be added without scope creep?
   - Is resource capacity available?

2. **Check resource availability**
   - Are BA/TL/Dev available for additional scope?
   - Does timeline allow for new goal?
   - Any conflicting priorities?

3. **Add to SPECS.md**
   - Add goal with clear business objective
   - Set priority relative to existing goals
   - Define success criteria (≥3 checkable items)
   - Tag as `[ADDED]` with date and reason

4. **Notify BA via Telegram**
   ```
   🆕 Sprint Goal Added
   Goal: {goal description}
   Priority: {High/Medium/Low}
   Reason: {why added}
   Impact: {impact on existing work}
   Action: Please assess story impact
   ```

## Modify Goal

When business context changes require goal adjustment:

1. **Document reason for change**
   - What changed? (market, user feedback, stakeholder request)
   - Why can't we continue with original goal?
   - What's the risk of NOT changing?

2. **Assess impact on stories already created**
   - Which BA stories are affected?
   - Are any stories already in development?
   - Estimate rework needed

3. **Update SPECS.md**
   - Mark original goal as `[MODIFIED]` with date
   - Document change reason
   - Update success criteria
   - Keep original goal text as reference (strikethrough)

4. **Notify BA + TL via Telegram**
   ```
   ✏️ Sprint Goal Modified
   Original: {original goal}
   Updated: {new goal}
   Reason: {change reason}
   Impact: {stories affected, rework estimate}
   Action: BA review stories, TL review tasks
   ```

## Split Goal

When goal proves too large for single sprint:

1. **Identify natural split points**
   - User journey boundaries (e.g., browse vs. purchase)
   - Feature boundaries (e.g., core vs. enhancement)
   - Technical boundaries (e.g., API vs. UI)
   - Value delivery milestones (what delivers value earliest?)

2. **Create 2-3 focused sub-goals**
   - Each sub-goal must be independently valuable
   - Each must have clear success criteria
   - Total sub-goals should cover original scope
   - Name convention: `{Original Goal} — Part {N}: {Focus}`

3. **Assign priorities to sub-goals**
   - P1: Must-have for this sprint (core value)
   - P2: Should-have if capacity allows
   - P3: Nice-to-have, can defer to next sprint

4. **Update ROADMAP phases accordingly**
   - Adjust current phase scope to P1 sub-goal
   - Add new phases for P2, P3 sub-goals
   - Update timeline estimates

5. **Notify BA which sub-goal to prioritize**
   ```
   ✂️ Sprint Goal Split
   Original: {original goal}
   Sub-goals:
   - [P1] {sub-goal 1} ← Focus this sprint
   - [P2] {sub-goal 2} ← If capacity allows
   - [P3] {sub-goal 3} ← Next sprint
   Action: BA focus on P1 stories first
   ```

## Decision Log

After any goal change, record in sprint workspace:

```markdown
## Goal Change Log

| Date | Action | Original | Updated | Reason | Notified |
|------|--------|----------|---------|--------|----------|
| {date} | Add/Modify/Split | {original} | {updated} | {reason} | BA, TL |
```

> ⚠️ **AI Verification:** PO must personally evaluate every goal change. AI can draft impact assessment but PO makes the final decision.

<edge_cases>

**Khi TL hoặc Dev (Stage 3-4) escalate feedback nói goal gốc không thể implement:** Phân loại feedback: scope problem → Modify Goal, technical infeasibility → Split Goal + consult TL, ambiguity → Refine Goal. Luôn notify downstream roles sau khi thay đổi.

**Khi stage-execute-phase đang chạy và phát hiện sprint goal cần thay đổi:** Pause execution hiện tại → sử dụng workflow này để assess impact trước khi tiếp tục. Không bao giờ tiếp tục execute với goal cũ nếu goal đã thay đổi.

</edge_cases>
