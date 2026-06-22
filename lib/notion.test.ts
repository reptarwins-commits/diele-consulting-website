import { describe, it, expect } from "vitest";
import { mapPageToMeta } from "./notion";

function page(props: Record<string, unknown>) {
  return { id: "p1", properties: props };
}

describe("mapPageToMeta", () => {
  it("maps a fully populated Notion page to PostMeta", () => {
    const meta = mapPageToMeta(
      page({
        Title: { type: "title", title: [{ plain_text: "From Expert to Leader" }] },
        Slug: { type: "rich_text", rich_text: [{ plain_text: "from-expert-to-leader" }] },
        Date: { type: "date", date: { start: "2026-06-20" } },
        Category: { type: "select", select: { name: "Leadership" } },
        Excerpt: { type: "rich_text", rich_text: [{ plain_text: "The hardest promotion." }] },
        Description: { type: "rich_text", rich_text: [{ plain_text: "SEO description." }] },
        "Read Time": { type: "rich_text", rich_text: [{ plain_text: "5 min read" }] },
      }),
    );
    expect(meta).toEqual({
      slug: "from-expert-to-leader",
      title: "From Expert to Leader",
      date: "2026-06-20",
      category: "Leadership",
      excerpt: "The hardest promotion.",
      description: "SEO description.",
      readTime: "5 min read",
    });
  });

  it("falls back to a slugified title when Slug is empty", () => {
    const meta = mapPageToMeta(
      page({
        Title: { type: "title", title: [{ plain_text: "The Hire Was Right!" }] },
        Slug: { type: "rich_text", rich_text: [] },
      }),
    );
    expect(meta.slug).toBe("the-hire-was-right");
  });

  it("defaults category, omits description, and leaves readTime empty when absent", () => {
    const meta = mapPageToMeta(
      page({
        Title: { type: "title", title: [{ plain_text: "Untitled Thoughts" }] },
      }),
    );
    expect(meta.category).toBe("Essay");
    expect(meta.description).toBeUndefined();
    expect(meta.readTime).toBe("");
  });
});
