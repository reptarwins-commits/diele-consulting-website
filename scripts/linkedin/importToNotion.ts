/**
 * Import selected LinkedIn posts into the Notion "Blog Posts" DB as Drafts (Step 2).
 * Reads the normalized JSON from the inventory step, applies scope filters, and
 * upserts one Notion page per post (idempotent by Slug). Everything lands as
 * Status=Draft, so the flag-gated blog stays hidden until Joe curates.
 *
 *   npx tsx scripts/linkedin/importToNotion.ts [posts.normalized.json] \
 *     [--dry-run] [--types=text,article] [--min-words=20] [--category=LinkedIn] [--limit=N]
 *
 * Requires NOTION_TOKEN + NOTION_BLOG_DB_ID in the env (except for --dry-run).
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Client } from "@notionhq/client";
import { mapPostToNotion, deriveTitle } from "./mapPost";
import { slugify } from "../../lib/notion";
import type { NormalizedPost, PostType } from "./types";

const DB_ID = process.env.NOTION_BLOG_DB_ID ?? "";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function flag(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit?.slice(name.length + 3);
}

async function slugExists(notion: Client, slug: string): Promise<boolean> {
  const res = await notion.databases.query({
    database_id: DB_ID,
    filter: { property: "Slug", rich_text: { equals: slug } },
    page_size: 1,
  });
  return res.results.length > 0;
}

async function main() {
  const positional = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const path = positional[0] ?? "scripts/linkedin/out/posts.normalized.json";
  const dryRun = process.argv.includes("--dry-run");
  const category = flag("category");
  const minWords = Number(flag("min-words") ?? 0);
  const limit = Number(flag("limit") ?? 0);
  const typesArg = flag("types");
  const allowed: Set<PostType> | null = typesArg ? new Set(typesArg.split(",") as PostType[]) : null;

  if (!dryRun && (!process.env.NOTION_TOKEN || !DB_ID)) {
    console.error("Set NOTION_TOKEN and NOTION_BLOG_DB_ID (or use --dry-run).");
    process.exit(1);
  }

  let posts: NormalizedPost[] = JSON.parse(readFileSync(resolve(path), "utf8"));
  posts = posts.filter((p) => {
    if (allowed && !allowed.has(p.type)) return false;
    const words = p.text.trim() ? p.text.trim().split(/\s+/).length : 0;
    return words >= minWords;
  });
  if (limit > 0) posts = posts.slice(0, limit);

  console.log(`${dryRun ? "[DRY RUN] " : ""}importing ${posts.length} post(s) as Drafts → DB ${DB_ID || "(unset)"}\n`);

  const notion = dryRun ? null : new Client({ auth: process.env.NOTION_TOKEN });
  let created = 0;
  let skipped = 0;

  for (const post of posts) {
    const title = deriveTitle(post);
    const slug = slugify(title);
    const line = `${post.publishedAt} [${post.type}] ${title.slice(0, 70)} (${slug})`;

    if (dryRun) {
      console.log(`  ${line}`);
      continue;
    }
    if (await slugExists(notion!, slug)) {
      console.log(`  SKIP (exists) ${line}`);
      skipped++;
      continue;
    }

    const { properties, children } = mapPostToNotion(post, { category });
    try {
      await notion!.pages.create({
        parent: { database_id: DB_ID },
        properties: properties as any,
        children: children as any,
      });
      console.log(`  OK   ${line}`);
      created++;
    } catch (err) {
      console.error(`  FAIL ${line} :: ${(err as Error).message}`);
    }
    await sleep(350); // gentle rate limit
  }

  console.log(`\n${dryRun ? "[DRY RUN] would import" : "imported"}: ${created} created, ${skipped} skipped (existing).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
