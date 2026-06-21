---
description: Deploy the site to production (dieleconsulting.com)
---

# Deploy to Production

Ship the current state of `main` to the live site at **https://dieleconsulting.com**.

This deploys to the Vercel project **`diele-consulting`** (NOT the `diele-consulting-website`
sandbox project). See `CLAUDE.md` for the full deployment notes.

## 1. Pre-flight checks

```bash
git status --short        # surface uncommitted changes
git log --oneline -3
```

If there are uncommitted changes, ask me whether to commit them before deploying.
If we're not on `main`, confirm with me before proceeding.

Confirm the deploy env vars are present (set via the web environment config):
`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. If `VERCEL_TOKEN` is missing,
stop and ask me for it.

## 2. Push to GitHub

```bash
git push origin main
```

## 3. Deploy to production

```bash
npx vercel --prod --yes --token "$VERCEL_TOKEN" --scope wooddigital
```

**Note:** prod builds take ~5+ minutes — longer than the CLI's foreground wait, so a local
timeout does NOT mean failure. If the CLI times out, verify the deployment state via the API:

```bash
curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
  "https://api.vercel.com/v6/deployments?projectId=prj_MGHnErjBJnN4E1z8LF9RPljnN9pI&teamId=team_CxLaTArzhv7Jc8EitMK9M2v8&limit=3"
```

Look for the newest deployment with `"target":"production"` and `"state":"READY"`.

## 4. Verify the live site

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://dieleconsulting.com
curl -s https://dieleconsulting.com | grep -oE "<title>[^<]*</title>" | head -1
```

Report the HTTP status (expect 200) and the page title. Confirm the deploy is live.
