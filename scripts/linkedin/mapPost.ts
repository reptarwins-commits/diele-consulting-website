import type { NormalizedPost } from "./types";
// Reuse the site's own slug + read-time rules so imported posts match how the
// blog already maps content (relative import so it also resolves under tsx).
import { slugify, readTimeFromText } from "../../lib/notion";

const TITLE_MAX = 80;
const EXCERPT_MAX = 160;
const BLOCK_MAX = 2000; // Notion rich_text content limit per block.

export function deriveTitle(post: NormalizedPost): string {
  if (post.type === "article" && post.articleTitle?.trim()) return post.articleTitle.trim();
  const firstLine = post.text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  if (!firstLine) return `LinkedIn post — ${post.publishedAt}`;
  if (firstLine.length <= TITLE_MAX) return firstLine;
  const cut = firstLine.slice(0, TITLE_MAX);
  const lastSpace = cut.lastIndexOf(" ");
  const head = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim();
  return `${head}…`;
}

function excerptOf(post: NormalizedPost): string {
  const base = (post.text || post.articleTitle || "").replace(/\s+/g, " ").trim();
  return base.length <= EXCERPT_MAX ? base : `${base.slice(0, EXCERPT_MAX - 1).trimEnd()}…`;
}

function chunk(s: string, n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < s.length; i += n) out.push(s.slice(i, i + n));
  return out;
}

type NotionBlock = Record<string, unknown>;

function paragraph(content: string): NotionBlock {
  return {
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: [{ type: "text", text: { content } }] },
  };
}

function bodyBlocks(post: NormalizedPost): NotionBlock[] {
  const blocks: NotionBlock[] = [];
  for (const para of post.text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)) {
    for (const c of chunk(para, BLOCK_MAX)) blocks.push(paragraph(c));
  }
  if (post.type === "article" && post.articleUrl) {
    blocks.push(paragraph(`Read the full article: ${post.articleUrl}`));
  }
  blocks.push({ object: "block", type: "divider", divider: {} });
  blocks.push(paragraph(`Originally posted on LinkedIn: ${post.permalink}`));
  return blocks;
}

/** Map a normalized post to Notion `pages.create` properties + body blocks. */
export function mapPostToNotion(post: NormalizedPost, opts: { category?: string } = {}) {
  const title = deriveTitle(post);
  const properties = {
    Title: { title: [{ text: { content: title } }] },
    Slug: { rich_text: [{ text: { content: slugify(title) } }] },
    Date: { date: { start: post.publishedAt } },
    Category: { select: { name: opts.category ?? "Essay" } },
    Excerpt: { rich_text: [{ text: { content: excerptOf(post) } }] },
    "Read Time": { rich_text: [{ text: { content: readTimeFromText(post.text) || "1 min read" } }] },
    Status: { select: { name: "Draft" } },
  };
  return { properties, children: bodyBlocks(post) };
}
