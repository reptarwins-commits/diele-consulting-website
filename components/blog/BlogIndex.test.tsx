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
