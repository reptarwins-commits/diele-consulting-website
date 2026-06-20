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

If a fresh session can't deploy, re-create `.claude/settings.local.json` with these values
(never commit it — it holds the secret token).

## Branches
- `main` — live production state. Keep it equal to what's deployed.
- `divergent-blog-work` — unshipped exploratory work (full blog with MDX posts, a
  "Leadership Coaching" rebrand, renamed diagnostic). NOT live. Preserved for reference;
  cherry-pick from here if/when that work is revived.

## History note
This repo was consolidated from a prior OpenClaw workflow. The live production state
(deployed commit `ef42847` + a testimonials update) was reset onto `main`; the unshipped
work was moved to `divergent-blog-work`.
