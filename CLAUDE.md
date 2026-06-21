# Diele Consulting Website — Project Guide

This repo is the **single source of truth** for the live production site at
**https://dieleconsulting.com**. The `main` branch reflects what is deployed live.

## Stack
- Next.js 16 (App Router) · TypeScript · React 19 · Tailwind CSS v4 · Framer Motion 12
- Homepage entry: `app/page.tsx` (hero = `components/HeroV2.tsx`)
- Site title lives in `app/layout.tsx`

## Deployment (Vercel CLI — NOT git auto-deploy)
The live site is the Vercel project **`diele-consulting`** under the **`wooddigital`** team.
Do not confuse it with the `diele-consulting-website` Vercel project (a separate sandbox
project NOT wired to the live domain).

| Setting | Value |
|---------|-------|
| Vercel project | `diele-consulting` |
| Project ID | `prj_MGHnErjBJnN4E1z8LF9RPljnN9pI` |
| Team / Org ID | `team_CxLaTArzhv7Jc8EitMK9M2v8` (scope: `wooddigital`) |
| Live domains | dieleconsulting.com · www.dieleconsulting.com |

### Deploy to production (updates the live site)
```bash
npx vercel --prod --yes --token "$VERCEL_TOKEN" --scope wooddigital
```
With `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` set (see secrets below), this targets the
correct project even without a `.vercel/` link file.

**Note:** prod builds take ~5+ minutes — longer than the CLI's foreground wait, so a local
timeout does NOT mean failure. Verify via the Vercel API:
```bash
curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
  "https://api.vercel.com/v6/deployments?projectId=prj_MGHnErjBJnN4E1z8LF9RPljnN9pI&teamId=team_CxLaTArzhv7Jc8EitMK9M2v8&limit=3"
```

### Test deploy (preview, does NOT touch live)
Drop `--prod` to get a preview URL.

## Test-Driven Development — MANDATORY

Every code change MUST follow TDD. No exceptions, even for "small" fixes:

1. Write a failing test that defines the expected behavior.
2. Run it. Confirm it FAILS (proves the test is real).
3. Write the minimum code to make it pass.
4. Run it. Confirm it PASSES.
5. Refactor while keeping the test green.

Never write implementation code before its test. If asked for a change and no
test exists yet, write the test first and show it failing before touching
the implementation.

### Front-end / UI changes — visual confirmation is also MANDATORY

Automated tests don't catch a broken-LOOKING page. So for ANY change that
affects what the page looks like (HTML structure, CSS/layout, components,
anything visual), you MUST also verify it visually with Playwright before
reporting it done:

1. Use Playwright to open the affected page in a browser.
2. Take a screenshot of it.
3. Check the browser console for errors and any failed network requests,
   and report them.
4. Show the screenshot so Joe can confirm it looks correct.

Do not say a UI change is "done" until you've produced this screenshot.

## Standard workflow
1. Edit files in the Claude Code session
2. Commit and `git push` to `main`
3. Deploy to production with the command above
4. Verify: `curl -s -o /dev/null -w "%{http_code}\n" https://dieleconsulting.com`

## Secrets / environment
These must exist as env vars for deploys to work. In this managed environment they live in
`.claude/settings.local.json` (gitignored). That file is **session-local and does not survive
a fresh container** — for true persistence add them to the environment's configured env vars
via the Claude Code web environment settings:
- `VERCEL_TOKEN` — Vercel deploy token (secret)
- `VERCEL_ORG_ID` = `team_CxLaTArzhv7Jc8EitMK9M2v8`
- `VERCEL_PROJECT_ID` = `prj_MGHnErjBJnN4E1z8LF9RPljnN9pI`
- `NOTION_TOKEN` — Notion internal integration secret (`ntn_…`)

If a fresh session can't deploy, re-create `.claude/settings.local.json` with these values
(never commit it — it holds the secret token).

## Setup script (web environment config)
The following must be set as the **Setup script** in the Claude Code web environment settings.
It runs before each session starts:

```bash
#!/bin/bash
npm install
npx playwright install --with-deps chromium
```

`npm install` ensures dependencies are ready. `playwright install` fetches the Chromium
binary that `@playwright/mcp` needs — without it the Playwright MCP server loads but
browser actions will fail.

## MCP servers (`.mcp.json`)
Declared in `.mcp.json` (committed) so they load in every web session:
- **notion** — `@notionhq/notion-mcp-server`. Needs a `NOTION_TOKEN` env var (a Notion
  internal-integration token, `ntn_…`) set in the web environment config. The integration
  must be shared with the specific Notion pages/databases you want reachable.
- **playwright** — `@playwright/mcp` (headless). Requires browser binaries; the web setup
  script must run `npx playwright install --with-deps chromium`.

MCP changes only take effect in a **new** session.

## Branches
- `main` — live production state. Keep it equal to what's deployed.
- `divergent-blog-work` — unshipped exploratory work (full blog with MDX posts, a
  "Leadership Coaching" rebrand, renamed diagnostic). NOT live. Preserved for reference;
  cherry-pick from here if/when that work is revived.

## History note
This repo was consolidated from a prior OpenClaw workflow. The live production state
(deployed commit `ef42847` + a testimonials update) was reset onto `main`; the unshipped
work was moved to `divergent-blog-work`.
