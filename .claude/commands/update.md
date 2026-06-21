---
description: Save this session's progress to the memory file
---

# Update Session Memory

Save what we did this session so it persists for next time.

## 1. Update the memory file

Read `WORKLOG.md`. Add a new "## Current Session" block at the top
(just below the comment line), and rename the previous "Current Session"
heading to "Session: YYYY-MM-DD" using its own date.

Use this format:

```markdown
## Current Session

**Date**: YYYY-MM-DD
**Focus**: Brief description of the main work area

### What Was Done
- Item 1
- Item 2

### Key Decisions
- Decision and the reason for it (or "None")

### Key Files Changed
| File | Change |
|------|--------|
| path/to/file | What changed |

### In Progress
- Anything not yet finished (or "None")

### Blockers
- Anything stuck (or "None")
```

## 2. Commit to git (optional)

If this project uses git, save the memory update:

```bash
git add WORKLOG.md
git commit -m "docs: update session memory"
```

If the project isn't using git, skip this — the file is still saved either way.

## 3. Confirm

Tell me the memory was saved and give a one-line summary of what was recorded.
