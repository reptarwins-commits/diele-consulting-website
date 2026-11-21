import type { MetadataRoute } from "next";
import { BLOG_ENABLED } from "@/lib/flags";
import { getAllPosts } from "@/lib/notion";

const BASE = "https://dieleconsulting.com";

const ROUTES = ["", "/about", "/services", "/results", "/resources", "/resources/people-excellence-workshop"];

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ROUTES.map((path) => ({ url: `${BASE}${path}` }));
  if (!BLOG_ENABLED) return pages;

  // getAllPosts already returns unique, non-empty slugs; dedupe defensively.
  const posts = await getAllPosts();
  const seen = new Set<string>();
  const blog = posts
    .filter((p) => p.slug && !seen.has(p.slug) && seen.add(p.slug))
    .map((p) => ({ url: `${BASE}/blog/${p.slug}` }));

  return [...pages, { url: `${BASE}/blog` }, ...blog];
}
