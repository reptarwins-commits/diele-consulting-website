---
description: Quick project status snapshot
---

# Project Status

Give me a fast snapshot of the project right now:

1. Run `git status --short` and `git log --oneline -5`.
2. Read the top "Current Session" block of `WORKLOG.md`.
3. Check the live site is up:
   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" https://dieleconsulting.com
   ```
4. Summarize in a few lines: what branch I'm on, whether `main` matches
   origin, what's uncommitted, what I was last working on, any open blockers,
   and whether the live site returned 200.

Keep it short — this is a glance, not a deep dive.
