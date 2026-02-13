---
name: po-debug
description: PO debug — systematic debugging with persistent state tracking across context resets for PO workflow issues
---

<purpose>
Systematic debugging for PO-specific workflow issues: Gate verification failures, backlog item gaps, sprint planning inconsistencies, PR review accuracy.
</purpose>

<process>
  <step name="describe_problem">
    Ask:
    - "What's the issue?" — Get the specific failure/unexpected behavior
    - "What were you doing?" — Which PO workflow/command was active?
    - "What did you expect?" — Expected vs actual outcome
    - "Has this happened before?" — Pattern or one-off?
  </step>

  <step name="classify_issue">
    | Category | Examples |
    |----------|---------|
    | gate-verification | Gate 1 sender check gives wrong result, items not detected |
    | backlog | Template not filling correctly, missing sections |
    | sprint-planning | Items not loading, priority sorting wrong |
    | pr-review | Wrong AC checked, story reference missing |
    | state | STATE.md out of sync, mode detection wrong |
    | handoff | Telegram draft wrong, Lark instructions unclear |
    | workflow | Wrong routing, internal workflow not found |
  </step>

  <step name="save_debug_state">
    Create debug file: `.makeit/debug/DEBUG-{NNN}.md`
    ```markdown
    ## DEBUG-{NNN}: {Title}
    - **Date:** {YYYY-MM-DD}
    - **Category:** {category}
    - **Sprint:** SPRINT-{NNN}
    - **Phase:** {current phase}
    - **Command:** {command that triggered issue}
    - **Status:** investigating | root-cause-found | fixed | wont-fix

    ### Problem
    {User description}

    ### Investigation Steps
    1. {Step and finding}

    ### Root Cause
    {When found}

    ### Fix Applied
    {When fixed}
    ```
  </step>

  <step name="investigate">
    1. Check STATE.md for inconsistencies
    2. Verify file paths referenced in error
    3. Check mode detection (Backlog vs PR Review)
    4. Verify template references resolve correctly
    5. Present findings and proposed fix to user
  </step>
</process>

<success_criteria>
- [ ] Issue classified into category
- [ ] Debug state file created for persistence
- [ ] Root cause identified or escalated
- [ ] Fix applied or documented
</success_criteria>
