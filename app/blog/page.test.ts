import { describe, it, expect, vi } from "vitest";
vi.mock("@/lib/notion", () => ({ getAllPosts: async () => [] }));
import { metadata } from "./page";

describe("/blog metadata", () => {
  it("uses the approved meta description with 35+ years", () => {
    expect(metadata.description).toBe(
      "Practical writing on leadership transitions, engineering culture, and what it really takes to lead technical teams — from Joe Diele, who ran engineering organizations for 35+ years.",
    );
  });
});
