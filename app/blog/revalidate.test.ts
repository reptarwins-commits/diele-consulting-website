import { describe, it, expect } from "vitest";
import { revalidate as indexRevalidate } from "@/app/blog/page";
import { revalidate as postRevalidate } from "@/app/blog/[slug]/page";

// The blog is Notion-backed. These ISR windows are the automatic "pull latest
// from Notion" cadence, so a newly-published post goes live within ~5 minutes
// of a visit — no deploy, no manual refresh. Keep them tight.
describe("blog ISR revalidation window (auto-refresh from Notion)", () => {
  it("re-fetches the /blog index at most ~5 minutes stale", () => {
    expect(indexRevalidate).toBe(300);
  });

  it("re-fetches individual /blog/[slug] posts at most ~5 minutes stale", () => {
    expect(postRevalidate).toBe(300);
  });
});
