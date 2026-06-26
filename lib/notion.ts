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

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function readTimeFromText(text: string): string {
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
  const title = plain(props.Title?.title);
  const slug = plain(props.Slug?.rich_text) || slugify(title);
  const date = props.Date?.date?.start ?? "";
  const excerpt = plain(props.Excerpt?.rich_text);
  const description = plain(props.Description?.rich_text) || undefined;
  const category = props.Category?.select?.name ?? "Essay";
  const readTime = plain(props["Read Time"]?.rich_text) || "";
  return { slug, title, date, excerpt, description, category, readTime };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!configured()) return [];
  const notion = getClient();
  const res = await notion.databases.query({
    database_id: DB_ID,
    filter: { property: "Status", select: { equals: "Published" } },
    sorts: [{ property: "Date", direction: "descending" }],
  });
  return (res.results as any[]).map(mapPageToMeta);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!configured()) return null;
  const notion = getClient();

  // Direct match on the Slug property.
  const direct = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      and: [
        { property: "Status", select: { equals: "Published" } },
        { property: "Slug", rich_text: { equals: slug } },
      ],
    },
    page_size: 1,
  });

  let page = (direct.results as any[])[0];

  // Fallback: posts without an explicit Slug match the slugified title.
  if (!page) {
    const all = await notion.databases.query({
      database_id: DB_ID,
      filter: { property: "Status", select: { equals: "Published" } },
    });
    page = (all.results as any[]).find((p) => mapPageToMeta(p).slug === slug);
  }

  if (!page) return null;

  const meta = mapPageToMeta(page);
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const content = n2m.toMarkdownString(mdblocks).parent ?? "";
  const readTime = meta.readTime || readTimeFromText(content);
  return { ...meta, readTime, content };
}
