# Handoff: Techlead → PO (Result Review)

> TL đã review code, approve PRs, và deploy. PO review kết quả deployed.

## Sprint Info
- Sprint: SPRINT-{NNN}
- Date: {YYYY-MM-DD}
- Sender: Techlead (Mode 2: Code Review)
- Receiver: PO
- Sprint Issue: [Lark link]

## What I've Done
- [x] Code review hoàn thành — {N} PRs reviewed
- [x] PR #{N} approved + merged — {brief description}
- [x] Deployed to staging — {staging URL}
- [x] Quality checklist passed (see below)

## For PO Review
> PO reviews deployed results, NOT code.

| # | Review Item | Staging URL | Acceptance Criteria |
|---|-------------|-------------|---------------------|
| 1 | {Feature/story} | {URL} | {AC from user story} |
| 2 | {Feature/story} | {URL} | {AC from user story} |

## Tasks For Receiver
| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|-------------|
| 1 | Review {feature} trên staging | {LARK-XXXX} | PO | — |
| 2 | Verify acceptance criteria cho {story} | {LARK-XXXX} | PO | LARK-XXXX |

## Code Review Summary
| PR | Status | Key Findings |
|----|--------|-------------|
| #{N} | ✅ Approved | [Brief: clean code, test coverage OK] |
| #{N} | ✅ Approved | [Brief] |

## Shared Context
### Key Decisions
- {Decision 1 made during code review}

### Links
| Type | Link |
|------|------|
| Staging URL | [url] |
| PR (FE) | [link] |
| PR (BE) | [link] |
| Lark Sprint Issue | [link] |

## Gate 5a Status (TL Code Review)
- ✅ Code quality checked
- ✅ Security reviewed
- ✅ Test coverage verified
- ✅ PR(s) approved and merged
- ✅ Deployed to staging

Verdict: PASS — ready for PO result review

## Git Path
.makeit/sprint/SPRINT-{NNN}/tl-review/HANDOFF.md

## Knowledge Pointers

<!-- 
  Knowledge Pointers: Cross-reference this deliverable with knowledge base docs.
  - Add relevant ADR IDs if architecture decisions apply
  - Add lesson IDs if past experiences influenced this work  
  - Add pattern IDs if established patterns were used
  - Leave empty if this is the first sprint or no relevant docs exist
-->

<!-- Link related knowledge documents from .makeit/knowledge/ -->
<!-- This section helps future sprints find relevant context -->

| Doc ID | Relevance |
|--------|-----------|
| {e.g., adr-003} | {e.g., Architecture decision that shaped this deliverable} |
| {e.g., lesson-012} | {e.g., Lesson learned from previous implementation} |

> 💡 Populate during deliverable creation. Use `/makeit:search-kb` to find relevant docs.
> Leave empty if no relevant knowledge docs exist yet.
