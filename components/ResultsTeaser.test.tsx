import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ResultsTeaser from "./ResultsTeaser";

describe("ResultsTeaser", () => {
  it("shows the approved teaser text and links to /results", () => {
    const { container } = render(<ResultsTeaser />);
    expect(container.textContent).toContain(
      "What changed when the people changed. At a major technology company, Severity 0 customer incidents went from 77 to zero, avoiding about $2.5M a year. At another technology company, field returns went from 4.8% to 0.81%.",
    );
    expect(screen.getByRole("link", { name: "See the results →" })).toHaveAttribute("href", "/results");
  });

  it("names no companies", () => {
    const { container } = render(<ResultsTeaser />);
    expect(container.textContent).not.toMatch(/StorageTek|Fusion-io/);
  });
});
