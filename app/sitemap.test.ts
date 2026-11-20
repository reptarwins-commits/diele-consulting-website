import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";

describe("sitemap.xml", () => {
  it("includes the /services page", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://dieleconsulting.com/services");
  });

  it("includes the existing standard pages", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://dieleconsulting.com",
        "https://dieleconsulting.com/about",
        "https://dieleconsulting.com/resources",
      ]),
    );
  });
});
