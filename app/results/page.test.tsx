import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ResultsPage, { metadata } from "./page";

const INTRO =
  "These are stories from my own years leading teams. Each one started with people, not a process. Ask me for the full versions.";

const TITLES = [
  "Building Quality & Reliability at a Growing Technology Company",
  "Get to Yes | Turning Functional Friction into Customer Solutions",
  "Case Study | Restoring Customer Trust Through Organizational Redesign",
  "Case Study | From Fragmented Teams to Integrated Customer Solutions",
  "Case Study | Rebuilding a Team’s Capability to Adapt",
];

// One distinctive sentence from each approved web-version brief.
const SAMPLES = [
  "In the first year, field return rates declined from 4.8% to 0.81%, an 83.1% relative reduction, through improvements made with Engineering and Manufacturing.",
  "During a group discussion, a Sales leader asked, “Then how do we get to yes?” That question helped shape a solution that enabled business rather than merely restricting it.",
  "The company created a Severity 0 classification for customer incidents so serious that accounts were at risk of terminating the relationship. In the prior 12 months, 77 such issues had occurred. With limited budget for new resources, the challenge was to recover testing effectiveness through a different way of organizing work and not simply by asking overstretched engineers to work harder.",
  "Within twelve months, the testing organization had moved from limited credibility to being recognized as an important contributor. Product quality and customer acceptance reportedly improved. The later strategic shift brought Testing into closer partnership with Marketing and Sales to validate product combinations addressing customer needs. Marketing and Sales separately used estimated ROI to prioritize which solutions to pursue; I did not develop those estimates, and no financial ROI outcome is claimed here.",
  "81 vs. 46: The integration pilot identified 81 problems, compared with 46 in the previous product-testing effort; the test efforts may not have been directly equivalent.",
];

describe("/results page", () => {
  it("uses the approved document title", () => {
    expect(metadata.title).toBe("Results and Case Studies | Diele Consulting LLC");
  });

  it("is headed Results with the exact intro", () => {
    render(<ResultsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Results");
    expect(screen.getByText(INTRO)).toBeInTheDocument();
  });

  it("renders the five approved briefs, in order", () => {
    render(<ResultsPage />);
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(h2s).toEqual(TITLES);
  });

  it("renders the approved brief text verbatim", () => {
    render(<ResultsPage />);
    const text = screen.getByTestId("results-copy").textContent ?? "";
    for (const s of SAMPLES) expect(text).toContain(s);
  });

  it("keeps the anonymous stories anonymous", () => {
    const { container } = render(<ResultsPage />);
    const text = container.querySelector("[data-testid='results-copy']")?.textContent ?? "";
    for (const name of ["StorageTek", "Fusion-io", "Sun", "NWD", "TRA"]) {
      expect(text).not.toMatch(new RegExp(`\\b${name}\\b`));
    }
  });

  it("offers no downloads", () => {
    const { container } = render(<ResultsPage />);
    expect(container.querySelector("a[download], a[href$='.pdf']")).toBeNull();
  });

  it("renders the site header and footer", () => {
    render(<ResultsPage />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
