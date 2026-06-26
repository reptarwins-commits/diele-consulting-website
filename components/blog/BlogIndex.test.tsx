import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlogIndex from "./BlogIndex";
import type { PostMeta } from "@/lib/notion";

const posts: PostMeta[] = [
  {
    slug: "featured-one",
    title: "Featured One",
    date: "2026-06-20",
    excerpt: "Featured excerpt.",
    readTime: "5 min read",
    category: "Leadership",
  },
  {
    slug: "second-post",
    title: "Second Post",
    date: "2026-06-10",
    excerpt: "Second excerpt.",
    readTime: "3 min read",
    category: "Culture",
  },
];

describe("BlogIndex", () => {
  it("renders the featured post, the rest, and links to each post page", () => {
    render(<BlogIndex posts={posts} />);
    expect(screen.getByText("Featured One")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/blog/featured-one");
    expect(hrefs).toContain("/blog/second-post");
  });

  it("renders the header even with no posts", () => {
    render(<BlogIndex posts={[]} />);
    expect(screen.getByText("Essays on leadership.")).toBeInTheDocument();
  });
});

describe("BlogIndex card layout (equal-height panels)", () => {
  const three: PostMeta[] = [
    ...posts,
    { slug: "third-post", title: "A longer third title that wraps", date: "2026-06-01", excerpt: "Third ".repeat(20), readTime: "1 min read", category: "LinkedIn" },
  ];

  it("uses an equal-row grid for the post cards", () => {
    const { container } = render(<BlogIndex posts={three} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeTruthy();
    expect(grid!.className).toContain("auto-rows-fr");
  });

  it("makes each grid card a full-height flex column so panels match in size", () => {
    const { container } = render(<BlogIndex posts={three} />);
    const grid = container.querySelector(".grid")!;
    const cards = Array.from(grid.querySelectorAll('a[href^="/blog/"]'));
    // featured (posts[0]) lives in its own section; the grid holds the rest
    expect(cards.length).toBe(2);
    for (const a of cards) {
      expect(a.className).toContain("h-full");
      expect(a.className).toContain("flex-col");
    }
    // each card's wrapper must also fill the cell for the card to stretch
    for (const w of Array.from(grid.children)) {
      expect((w as HTMLElement).className).toContain("h-full");
    }
  });
});
