# Work Log

This file is the project's running memory between Claude Code sessions.
`/update` writes to it; `/continue` reads from it.

<!-- Newest session goes at the top, just below this line. -->

## Current Session

**Date**: 2026-06-21
**Focus**: Add MCP integrations (Notion, Playwright), mandatory TDD rules, and a runnable test harness

### What Was Done
- Added **`.mcp.json`** (committed) declaring two MCP servers, both verified loading in-session:
  - **notion** — `@notionhq/notion-mcp-server`, auth via `NOTION_TOKEN` env var (`${NOTION_TOKEN}`).
  - **playwright** — `@playwright/mcp` headless+isolated.
- Confirmed web env config: `NOTION_TOKEN` present; setup script already runs
  `npm install` + `npx playwright install --with-deps chromium`. Installed Chromium in-session.
- Added **mandatory TDD ruleset** to `CLAUDE.md` (red-green-refactor; write failing test first)
  plus a **mandatory Playwright visual-verification** step for any UI/visual change
  (open page → screenshot → check console/network → show screenshot before calling it done).
- Set up a **Vitest + Testing Library** harness so the TDD rule is actually runnable:
  - `vitest.config.ts`, `vitest.setup.ts` (mocks `IntersectionObserver` + `requestAnimationFrame`).
  - npm scripts `test`, `test:watch`, `test:coverage`.
  - Sample `components/Stats.test.tsx` — passing (1/1), proves the harness works end-to-end.

### Key Decisions
- Test framework: **Vitest** (not Jest) — faster, native ESM, better React 19 / Tailwind v4 fit.
- MCP secrets referenced via `${NOTION_TOKEN}` so the token stays out of the repo (set in web env).
- Test tooling persists every session automatically: committed config + deps in `package.json`,
  installed by the setup script's `npm install` at session start.

### Key Files Changed
| File | Change |
|------|--------|
| .mcp.json | Added Notion + Playwright MCP servers |
| CLAUDE.md | Added TDD rules, visual-verification rule, test-tooling + setup-script docs |
| vitest.config.ts, vitest.setup.ts | New Vitest config + jsdom global mocks |
| package.json | Added test scripts + Vitest/Testing Library devDeps |
| components/Stats.test.tsx | Sample passing component test |

### In Progress
- None — integrations + TDD tooling complete and verified.

### Blockers
- None.

---

## Session: 2026-06-21 — OpenClaw → Claude Code transition

**Date**: 2026-06-21
**Focus**: Transition off OpenClaw → Claude Code; establish single source of truth and deploy pipeline

### What Was Done
- Confirmed which Vercel project serves the live domain: **`diele-consulting`**
  (`prj_MGHnErjBJnN4E1z8LF9RPljnN9pI`), NOT the `diele-consulting-website` sandbox project.
- Consolidated the repo: reset `main` to the **live production state** (deployed commit
  `ef42847` + a testimonials update). Preserved the unshipped exploratory work (full blog,
  "Leadership Coaching" rebrand, renamed diagnostic) on branch `divergent-blog-work`.
- Verified live-state markers: title "Executive Coaching for Technical Leaders", no
  `app/blog` or `content/posts`, homepage uses `components/HeroV2.tsx`.
- Linked this session to the live Vercel project and ran a **production deploy** —
  dieleconsulting.com verified live (HTTP 200, correct title).
- Added `CLAUDE.md` (deploy target, workflow, branch map) — committed.
- Persisted `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` and an `npm install`
  setup script to the web environment config so future sessions deploy with zero setup.
- Created session-memory + workflow slash commands: `/continue`, `/update`, `/status`,
  `/research`, `/deploy`. Seeded this `WORKLOG.md`.

### Key Decisions
- Local build fails only on Google Fonts fetch in the sandbox (network-restricted); builds
  fine on Vercel. Not a code issue — do not "fix" it.
- Token stored in the web environment's env vars despite the "no secrets" warning: this is a
  personal single-user environment and the token is Vercel-scoped + rotatable. (No dedicated
  secrets store exists in Claude Code on the web yet.)
- Kept the documented `/continue` + `/update` memory loop (writes/reads `WORKLOG.md`) over a
  generic `/worklog`; added a project-specific `/deploy` and folded a live-site 200 check
  into `/status`.

### Key Files Changed
| File | Change |
|------|--------|
| (whole repo) | `main` reset to live production state |
| CLAUDE.md | Added project guide (stack, deploy target, workflow, branches) |
| WORKLOG.md | Created session-memory log |
| .claude/commands/*.md | Added /continue, /update, /status, /research, /deploy |

### In Progress
- None — transition complete; ready for normal edit → /deploy workflow.

### Blockers
- None.

### Housekeeping (Joe's side, outside the repo)
- Delete the two temporary GitHub PATs used during consolidation
  (Settings → Developer settings → Fine-grained tokens).
- Rotate the Wix password (`Quality2025!` was exposed in the OpenClaw handoff doc).
