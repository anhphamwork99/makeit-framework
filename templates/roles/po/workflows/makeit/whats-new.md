---
name: makeit:whats-new
description: Scan blueprint repo, detect workspace gaps, and sync missing files
---

<objective>
Scan blueprint repo files trực tiếp, so sánh với workspace hiện tại, phát hiện files thiếu, và hướng dẫn user sync. Source of truth là blueprint repo files — không phụ thuộc version number.
</objective>

<execution_context>
@.agent/skills/makeit-po/_shared/skills/whats-new/whats-new.md
</execution_context>

<process>
  <step name="run_whats_new">
    Follow the whats-new skill instructions to:
    1. Detect workspace vars + auto-sync blueprint repo (git pull)
    2. Scan blueprint files → build expected file list
    3. Check workspace → detect missing files (gaps)
    4. If version updated → show CHANGELOG (info only)
    5. Copy missing files from blueprint to workspace
    6. Update modified core files + merge user files
    7. Finalize — write version + show summary
  </step>
</process>

<success_criteria>
- [ ] Blueprint repo scanned for expected files
- [ ] Workspace gaps detected and reported
- [ ] Missing files copied from blueprint
- [ ] User files merged (if applicable)
- [ ] FRAMEWORK-VERSION updated to blueprint version
</success_criteria>
