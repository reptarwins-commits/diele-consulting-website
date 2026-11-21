import { describe, it, expect, vi, beforeEach } from "vitest";

const posts = vi.hoisted(() => ({ list: [] as { slug: string }[] }));
vi.mock("@/lib/notion", () => ({ getAllPosts: async () => posts.list }));
vi.mock("@/lib/flags", () => ({ BLOG_ENABLED: true }));

import sitemap from "./sitemap";

describe("sitemap.xml", () => {
  beforeEach(() => {
    posts.list = [];
  });

  it("includes the /services page", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toContain("https://dieleconsulting.com/services");
  });

  it("includes the /results page", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toContain("https://dieleconsulting.com/results");
  });

  it("includes the existing standard pages", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://dieleconsulting.com",
        "https://dieleconsulting.com/about",
        "https://dieleconsulting.com/resources",
      ]),
    );
  });

  it("lists each blog post URL exactly once and no empty /blog/ stand-ins", async () => {
    posts.list = [
      { slug: "the-resume-was-wrong-for-the-role-october-2026" },
      { slug: "the-resume-was-wrong-for-the-role" },
      { slug: "he-had-been-talking-about-culture-for-two-years" },
    ];
    const urls = (await sitemap()).map((e) => e.url);
    const blog = urls.filter((u) => u.includes("/blog/"));
    expect(blog).toEqual([
      "https://dieleconsulting.com/blog/the-resume-was-wrong-for-the-role-october-2026",
      "https://dieleconsulting.com/blog/the-resume-was-wrong-for-the-role",
      "https://dieleconsulting.com/blog/he-had-been-talking-about-culture-for-two-years",
    ]);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).not.toContain("https://dieleconsulting.com/blog/");
    expect(urls).toContain("https://dieleconsulting.com/blog");
  });
});
