import { describe, it, expect } from "vitest";
import { deriveTitle, mapPostToNotion } from "./mapPost";
import type { NormalizedPost } from "./types";

function post(over: Partial<NormalizedPost> = {}): NormalizedPost {
  return {
    urn: "urn:li:activity:7150000000000000001",
    permalink: "https://www.linkedin.com/feed/update/urn:li:activity:7150000000000000001/",
    publishedAt: "2024-01-15",
    publishedAtMs: Date.UTC(2024, 0, 15),
    type: "text",
    text: "First line is the title.\n\nSecond paragraph body.",
    mediaCount: 0,
    isReshare: false,
    ...over,
  };
}

describe("deriveTitle", () => {
  it("uses the article headline for articles", () => {
    expect(deriveTitle(post({ type: "article", articleTitle: "Sustainable Quality" }))).toBe("Sustainable Quality");
  });
  it("uses the first non-empty line for text posts", () => {
    expect(deriveTitle(post())).toBe("First line is the title.");
  });
  it("truncates a very long first line at a word boundary", () => {
    const t = deriveTitle(post({ text: "word ".repeat(40).trim() }));
    expect(t.length).toBeLessThanOrEqual(81);
    expect(t.endsWith("…")).toBe(true);
  });
  it("falls back to a dated title when there is no text", () => {
    expect(deriveTitle(post({ type: "empty", text: "" }))).toBe("LinkedIn post — 2024-01-15");
  });
});

describe("mapPostToNotion", () => {
  it("maps core Notion properties with Status=Draft", () => {
    const { properties } = mapPostToNotion(post());
    expect(properties.Title.title[0].text.content).toBe("First line is the title.");
    expect(properties.Slug.rich_text[0].text.content).toBe("first-line-is-the-title");
    expect(properties.Date.date.start).toBe("2024-01-15");
    expect(properties.Status.select.name).toBe("Draft");
    expect(properties.Category.select.name).toBe("Essay");
    expect(properties["Read Time"].rich_text[0].text.content).toMatch(/min read/);
  });

  it("honors a custom category", () => {
    const { properties } = mapPostToNotion(post(), { category: "LinkedIn" });
    expect(properties.Category.select.name).toBe("LinkedIn");
  });

  it("appends the original LinkedIn permalink at the foot of the body", () => {
    const { children } = mapPostToNotion(post());
    const last = children[children.length - 1] as any;
    const txt = last.paragraph.rich_text.map((r: { text: { content: string } }) => r.text.content).join("");
    expect(txt).toContain("linkedin.com/feed/update/");
  });

  it("splits body text that exceeds Notion's 2000-char block limit", () => {
    const { children } = mapPostToNotion(post({ text: "x".repeat(5000) }));
    const paras = (children as any[]).filter((c) => c.type === "paragraph");
    for (const b of paras) {
      for (const r of b.paragraph.rich_text) {
        expect(r.text.content.length).toBeLessThanOrEqual(2000);
      }
    }
  });
});
