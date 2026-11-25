# LinkedIn → blog backfill

Tooling to pull **Joe's own LinkedIn posts** into the (hidden) Notion-backed blog as **Drafts**,
since LinkedIn's official data export never delivered `Shares.csv`.

We can't scrape LinkedIn from this server (datacenter IP → login wall/checkpoint; the managed browser
has no internet route here either). Instead **Joe captures his activity from his own logged-in browser**
(his IP, already authenticated — no blocks, no password sharing) and uploads it. We parse it here.

The capture carries LinkedIn's **Voyager API JSON**, which has the **full post text** (no "…see more"
truncation), dates, permalinks, and reshare/article structure — far cleaner than saved HTML.

---

## Part A — Joe: capture your activity (≈ 5 minutes)

Do this in **Chrome or Edge on your own computer**, while logged into LinkedIn:

1. Open your activity feed:
   **`https://www.linkedin.com/in/<your-handle>/recent-activity/all/`**
2. Press **F12** → click the **Network** tab → tick **Preserve log** (top of that panel).
3. **Load your whole history**: scroll to the bottom over and over until nothing new appears.
   To avoid scrolling by hand, paste this into the **Console** tab and press Enter:
   ```js
   (async () => { let last = -1; while (document.body.scrollHeight !== last) { last = document.body.scrollHeight; window.scrollTo(0, last); await new Promise(r => setTimeout(r, 2500)); } console.log("✅ done scrolling — now save the HAR"); })();
   ```
4. Back on the **Network** tab, **right-click any row → "Save all as HAR with content"** → save the file.
5. **Upload that `.har` file** to the Claude Code session.

*(Optional — long-form articles)* If you've written full LinkedIn **Articles** and want their complete
bodies, also run LinkedIn's à-la-carte **Articles** export (Settings → Data privacy → Get a copy of your
data → *Articles*). The activity HAR only has each article's title + link + your intro text.

> Privacy: the `.har` contains your LinkedIn session tokens. It's gitignored here and never committed;
> it's used only to read your posts, then can be deleted.

---

## Part B — Us: parse → inventory → import

**1. Inventory (read-only — no Notion writes):**
```bash
npx tsx scripts/linkedin/inventory.ts <uploaded.har>
# add more HARs after it if you captured several pages/sessions
# override author detection if needed: --self=urn:li:fsd_profile:XXXX
```
Prints counts by type (article / text / reshare / empty), the date range, and a 10-post sample, and
writes `scripts/linkedin/out/posts.normalized.json`. **Joe reviews and picks scope.**

**2. Import the chosen set as Drafts** (idempotent by slug; needs `NOTION_TOKEN` + `NOTION_BLOG_DB_ID`):
```bash
# preview first — no writes, no token needed:
npx tsx scripts/linkedin/importToNotion.ts --dry-run --types=text,article --min-words=20

# then for real:
npx tsx scripts/linkedin/importToNotion.ts --types=text,article --min-words=20 --category=LinkedIn
```
Filters: `--types=`, `--min-words=`, `--limit=`, `--category=`. Everything imports as **Status=Draft**.

**3. Curate + go live (Joe, later):** in Notion set keepers to **Published**, then flip
`NEXT_PUBLIC_BLOG_ENABLED=true` on Vercel and redeploy. ISR + the daily cron refresh `/blog`.

---

## Modules
| File | Role |
|------|------|
| `parseHar.ts` | HAR → `RawUpdate[]` (pulls update entities out of Voyager responses) |
| `normalize.ts` | `RawUpdate[]` → deduped, dated `NormalizedPost[]`; drops reshared-source authors |
| `mapPost.ts` | `NormalizedPost` → Notion page properties + body blocks (reuses the site's slug/read-time rules) |
| `inventory.ts` | CLI — Step 1 read-only summary |
| `importToNotion.ts` | CLI — Step 2 import as Drafts |
| `__fixtures__/sampleHar.ts` | Test fixture modeling the Voyager shape |

> The fixture is a best-reconstruction of LinkedIn's current Voyager JSON. When the real HAR lands,
> sanity-check `parseHar` against it (counts/fields) and tune the extractors if the live shape differs.
