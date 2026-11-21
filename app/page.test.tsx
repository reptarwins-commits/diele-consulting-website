import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("home page", () => {
  it("no longer has the Inside-Out Leadership section", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Inside-Out Leadership/);
    for (const h of ["Name the Real Problem", "Build from the Inside Out", "Create Systems That Last"]) {
      expect(text).not.toContain(h);
    }
  });

  it("has no Rapid Assessment, prices, 30-minute CTA, or zero-counter stat tiles", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Rapid Assessment/);
    expect(text).not.toMatch(/Ready to find out where the gaps are/);
    // Prices like $2,500 / $5,500 must be gone; the approved teaser's "$2.5M" is a result, not a price.
    expect(text).not.toMatch(/\$\d{1,3},\d{3}/);
    expect(text).not.toMatch(/30-Min/i);
    for (const t of ["Years of Experience", "Leaders Developed", "Culture Indicators", "Custom Engagements"]) {
      expect(text).not.toContain(t);
    }
  });

  it("points mid-page Services CTAs at /services", () => {
    const { container } = render(<Home />);
    const link = Array.from(container.querySelectorAll("a")).find((a) => /See how I can help/.test(a.textContent ?? ""));
    expect(link?.getAttribute("href")).toBe("/services");
  });
});
