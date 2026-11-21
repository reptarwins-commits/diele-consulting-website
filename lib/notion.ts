import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description?: string;
  readTime: string;
  category: string;
}

export interface Post extends PostMeta {
  content: string;
}

const DB_ID = process.env.NOTION_BLOG_DB_ID ?? "";

function getClient(): Client {
  return new Client({ auth: process.env.NOTION_TOKEN });
}

function configured(): boolean {
  return Boolean(DB_ID && process.env.NOTION_TOKEN);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function plain(rich?: Array<{ plain_text?: string }>): string {
  return (rich ?? [])
    .map((t) => t.plain_text ?? "")
    .join("")
    .trim();
}

/** Bold/italic "Unicode letter" forms pasted from LinkedIn -> ordinary letters. */
function toPlainLetters(input: string): string {
  return input.normalize("NFKC");
}

function slugify(input: string): string {
  return toPlainLetters(input)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function readTimeFromText(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return "";
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/**
 * Pure mapper from a Notion page object to PostMeta. Unit-tested.
 * Expected DB properties: Title, Slug, Date, Category, Excerpt, Description,
 * Status, Read Time.
 */
export function mapPageToMeta(page: any): PostMeta {
  const props = page?.properties ?? {};
  const title = toPlainLetters(plain(props.Title?.title));
  const slug = toPlainLetters(plain(props.Slug?.rich_text)) || slugify(title);
  const date = props.Date?.date?.start ?? "";
  const excerpt = plain(props.Excerpt?.rich_text);
  const description = plain(props.Description?.rich_text) || undefined;
  const category = props.Category?.select?.name ?? "Essay";
  const readTime = plain(props["Read Time"]?.rich_text) || "";
  return { slug, title, date, excerpt, description, category, readTime };
}

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/**
 * Make every slug unique and non-empty. When posts share a slug, the earliest
 * post keeps it and later ones get "-<month>-<year>" (then "-2", "-3" if still
 * taken). Input order is preserved. Pure; unit-tested.
 */
export function assignUniqueSlugs<T extends PostMeta>(posts: T[]): T[] {
  const byDate = posts
    .map((p, i) => ({ p, i }))
    .sort((a, b) => (a.p.date || "").localeCompare(b.p.date || "") || a.i - b.i);
  const taken = new Set<string>();
  const result: T[] = new Array(posts.length);
  for (const { p, i } of byDate) {
    let base = p.slug || "post";
    let slug = base;
    if (taken.has(slug) || !p.slug) {
      const [y, m] = (p.date || "").split("-");
      const month = MONTHS[Number(m) - 1];
      if (month && y) slug = base = `${base}-${month}-${y}`;
      for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
    }
    taken.add(slug);
    result[i] = { ...p, slug };
  }
  return result;
}

async function queryAllPublished(notion: Client): Promise<any[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: DB_ID,
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Date", direction: "descending" }],
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...(res.results as any[]));
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return pages;
}

async function getAllPublished(): Promise<{ page: any; meta: PostMeta }[]> {
  const pages = await queryAllPublished(getClient());
  const metas = assignUniqueSlugs(pages.map(mapPageToMeta));
  return pages.map((page, i) => ({ page, meta: metas[i] }));
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!configured()) return [];
  return (await getAllPublished()).map((p) => p.meta);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!configured()) return null;
  const notion = getClient();

  // Resolve against the same unique slugs the index and sitemap use, so
  // duplicate or empty Slug values in Notion can't send two posts to one URL.
  const match = (await getAllPublished()).find((p) => p.meta.slug === slug);
  if (!match) return null;
  const { page, meta } = match;

  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const content = n2m.toMarkdownString(mdblocks).parent ?? "";
  const readTime = meta.readTime || readTimeFromText(content);
  return { ...meta, readTime, content };
}
