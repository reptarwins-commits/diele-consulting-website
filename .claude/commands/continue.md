---
description: Restore context from the last session
---

# Continue Previous Session

Resume work with full context from previous sessions.

## 1. Read the memory file

Read `WORKLOG.md` to understand:
- What was accomplished recently
- Any decisions that were made
- Anything currently in progress
- Any blockers

## 2. Show recent git history

Run these to see what changed last:

```bash
git log --oneline -10
git status --short
```

(If this project isn't using git yet, just skip this step.)

## 3. Summarize for me

Present a short summary in this format:

```
## Session Restored

**Last Session**: [Date] — [Focus]

**Recent Commits**:
- [commit 1]
- [commit 2]

**In Progress**:
- [item] (or "None — ready for new work")

**Blockers**:
- [blocker] (or "None")

**Uncommitted Changes**:
- [files] (or "Working directory clean")

Ready to continue. What would you like to work on?
```
