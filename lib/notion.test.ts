import { describe, it, expect } from "vitest";
import { mapPageToMeta, assignUniqueSlugs } from "./notion";

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

// Bold-Unicode titles (pasted from LinkedIn) and duplicate slugs
// (Notion card "Fix unreachable and colliding blog post slugs").
const bold = (s: string) =>
  Array.from(s)
    .map((c) => {
      const code = c.charCodeAt(0);
      if (c >= "A" && c <= "Z") return String.fromCodePoint(0x1d400 + code - 65);
      if (c >= "a" && c <= "z") return String.fromCodePoint(0x1d41a + code - 97);
      return c;
    })
    .join("");

describe("bold-Unicode titles", () => {
  it("renders the title as plain text and derives a real slug", () => {
    const meta = mapPageToMeta(
      page({
        Title: { type: "title", title: [{ plain_text: bold("He had been talking about culture for two years.") }] },
        Slug: { type: "rich_text", rich_text: [] },
      }),
    );
    expect(meta.title).toBe("He had been talking about culture for two years.");
    expect(meta.slug).toBe("he-had-been-talking-about-culture-for-two-years");
  });

  it("handles the Sep 15 title", () => {
    const meta = mapPageToMeta(
      page({ Title: { type: "title", title: [{ plain_text: bold("The Report Was His. The Visibility Was Not.") }] } }),
    );
    expect(meta.title).toBe("The Report Was His. The Visibility Was Not.");
    expect(meta.slug).toBe("the-report-was-his-the-visibility-was-not");
  });
});

describe("assignUniqueSlugs", () => {
  const post = (slug: string, date: string, title = slug) => ({
    slug, title, date, excerpt: "", category: "Essay", readTime: "",
  });

  it("keeps the earliest post on the shared slug and suffixes later ones with month and year", () => {
    const posts = [
      post("the-resume-was-wrong-for-the-role", "2026-10-27", "Oct"),
      post("other", "2026-08-01"),
      post("the-resume-was-wrong-for-the-role", "2026-07-02", "Jul"),
    ];
    const out = assignUniqueSlugs(posts);
    expect(out.map((p) => p.title)).toEqual(["Oct", "other", "Jul"]); // order preserved
    expect(out.find((p) => p.title === "Jul")!.slug).toBe("the-resume-was-wrong-for-the-role");
    expect(out.find((p) => p.title === "Oct")!.slug).toBe("the-resume-was-wrong-for-the-role-october-2026");
  });

  it("never leaves an empty slug", () => {
    const out = assignUniqueSlugs([post("", "2026-09-15", "x")]);
    expect(out[0].slug).not.toBe("");
  });

  it("returns slugs that are all unique", () => {
    const out = assignUniqueSlugs([
      post("a", "2026-01-01"), post("a", "2026-01-02"), post("a", "2026-01-03"),
    ]);
    expect(new Set(out.map((p) => p.slug)).size).toBe(3);
  });
});

describe("real Blog Posts records (Nov 20 snapshot)", () => {
  const rec = (title: string, slug: string, date: string) =>
    page({
      Title: { type: "title", title: [{ plain_text: title }] },
      Slug: { type: "rich_text", rich_text: slug ? [{ plain_text: slug }] : [] },
      Date: { type: "date", date: { start: date } },
    });

  it("gives the four affected posts plain titles and unique, reachable slugs", () => {
    const metas = assignUniqueSlugs(
      [
        rec("𝗛𝗲 𝗵𝗮𝗱 𝗯𝗲𝗲𝗻 𝘁𝗮𝗹𝗸𝗶𝗻𝗴 𝗮𝗯𝗼𝘂𝘁 𝗰𝘂𝗹𝘁𝘂𝗿𝗲 𝗳𝗼𝗿 𝘁𝘄𝗼 𝘆𝗲𝗮𝗿𝘀.", "", "2026-11-19"),
        rec("The Resume Was Wrong for the Role.", "", "2026-10-27"),
        rec("𝗧𝗵𝗲 𝗥𝗲𝗽𝗼𝗿𝘁 𝗪𝗮𝘀 𝗛𝗶𝘀. 𝗧𝗵𝗲 𝗩𝗶𝘀𝗶𝗯𝗶𝗹𝗶𝘁𝘆 𝗪𝗮𝘀 𝗡𝗼𝘁.", "", "2026-09-15"),
        rec("𝗧𝗵𝗲 𝗥𝗲𝘀𝘂𝗺𝗲 𝗪𝗮𝘀 𝗪𝗿𝗼𝗻𝗴 𝗳𝗼𝗿 𝘁𝗵𝗲 𝗥𝗼𝗹𝗲.", "the-resume-was-wrong-for-the-role", "2026-07-02"),
      ].map(mapPageToMeta),
    );
    expect(metas.map((m) => [m.date, m.slug, m.title])).toEqual([
      ["2026-11-19", "he-had-been-talking-about-culture-for-two-years", "He had been talking about culture for two years."],
      ["2026-10-27", "the-resume-was-wrong-for-the-role-october-2026", "The Resume Was Wrong for the Role."],
      ["2026-09-15", "the-report-was-his-the-visibility-was-not", "The Report Was His. The Visibility Was Not."],
      ["2026-07-02", "the-resume-was-wrong-for-the-role", "The Resume Was Wrong for the Role."],
    ]);
  });
});
