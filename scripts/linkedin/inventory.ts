/**
 * Read-only inventory of a LinkedIn activity HAR (Step 1).
 * Parses the export, normalizes Joe's posts, prints counts/date-range/sample,
 * and writes scripts/linkedin/out/posts.normalized.json for the import step.
 * Makes NO network calls and NO Notion writes.
 *
 *   npx tsx scripts/linkedin/inventory.ts <export.har> [more.har] [--self=urn:li:fsd_profile:XXX]
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { parseHar } from "./parseHar";
import { normalize, inferSelfActorUrn } from "./normalize";
import type { PostType } from "./types";

function main() {
  const args = process.argv.slice(2);
  const self = args.find((a) => a.startsWith("--self="))?.slice("--self=".length);
  const paths = args.filter((a) => !a.startsWith("--"));
  if (paths.length === 0) {
    console.error("usage: npx tsx scripts/linkedin/inventory.ts <export.har> [more.har] [--self=urn]");
    process.exit(1);
  }

  const raws = paths.flatMap((p) => parseHar(JSON.parse(readFileSync(resolve(p), "utf8"))));
  const selfUrn = self ?? inferSelfActorUrn(raws);
  const posts = normalize(raws, { selfActorUrn: selfUrn });

  const counts: Record<PostType, number> = { article: 0, text: 0, reshare: 0, empty: 0 };
  for (const p of posts) counts[p.type]++;
  const bareReshares = posts.filter((p) => p.type === "reshare" && !p.text).length;
  const dates = posts.map((p) => p.publishedAt).filter(Boolean).sort();

  const outPath = resolve("scripts/linkedin/out/posts.normalized.json");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(posts, null, 2));

  console.log(`\nLinkedIn inventory  (source: ${paths.join(", ")})`);
  console.log(`  self actor          : ${selfUrn ?? "(unknown — pass --self=)"}`);
  console.log(`  raw updates parsed  : ${raws.length}`);
  console.log(`  Joe's posts (deduped): ${posts.length}`);
  console.log(`    articles : ${counts.article}`);
  console.log(`    text     : ${counts.text}`);
  console.log(`    reshares : ${counts.reshare}  (bare / no comment: ${bareReshares})`);
  console.log(`    empty    : ${counts.empty}`);
  if (dates.length) console.log(`  date range          : ${dates[0]} → ${dates[dates.length - 1]}`);

  console.log(`\n  sample (newest 10):`);
  for (const p of posts.slice(0, 10)) {
    const snippet = (p.text || p.articleTitle || "(no text)").replace(/\s+/g, " ").slice(0, 100);
    console.log(`   • ${p.publishedAt}  [${p.type.padEnd(7)}] ${snippet}`);
  }
  console.log(`\n  wrote ${posts.length} normalized posts → ${outPath}\n`);
}

main();
