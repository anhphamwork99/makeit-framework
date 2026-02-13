# Completion Signal Template

Format chuẩn cho sub-agent khi hoàn thành task trong HITL orchestration.

---

## Standard Completion

Khi task hoàn thành thành công:

```
✅ {AGENT_TYPE} COMPLETE

📁 Files Created:
- path/to/file1.md
- path/to/file2.md

📝 Summary:
- [Key outcome 1]
- [Key outcome 2]
- [Key outcome 3]

🔙 Return and say: "{RETURN_TRIGGER}"
```

---

## Blocked Completion

Khi agent không thể hoàn thành:

```
⚠️ {AGENT_TYPE} BLOCKED

🚫 Blocker: [mô tả vấn đề cụ thể]

📋 Completed:
- [Những gì đã làm được]
- [Partial work nếu có]

❓ Need: [Cần gì để tiếp tục]
- [Missing info 1]
- [Missing resource 2]

🔙 Return and say: "blocked on {AGENT_TYPE}"
```

---

## Return Triggers by Agent Type

| Agent Type | Success Trigger | Blocked Trigger |
|------------|-----------------|-----------------|
| Researcher | "research complete" | "research blocked" |
| Planner | "planning complete" | "planning blocked" |
| Executor | "execution complete" | "execution blocked" |
| Verifier | "verification complete" | "verification blocked" |

---

## Usage Guidelines

### Sub-agent session:
1. Execute assigned task
2. Create output files
3. End session với completion signal format
4. Use appropriate return trigger

### Orchestrator session:
1. Nhận return trigger từ user
2. Verify output files exist
3. Update orchestration-tracking/STATE.md
4. Continue to next step

---

## Examples

### Researcher Complete:
```
✅ RESEARCHER COMPLETE

📁 Files Created:
- .makeit/sprint/SPRINT-001/phases/02/RESEARCH.md

📝 Summary:
- Analyzed 4 Figma screens for user flow
- Identified 3 edge cases in checkout process
- Documented API requirements for payment integration

🔙 Return and say: "research complete"
```

### Executor Blocked:
```
⚠️ EXECUTOR BLOCKED

🚫 Blocker: Missing Figma design for settings page

📋 Completed:
- Created user stories for dashboard
- Wrote acceptance criteria for profile page

❓ Need:
- Figma link for settings page design
- PO clarification on notification preferences

🔙 Return and say: "blocked on executor"
```

---

*Package: MakeIt HITL Addon*
