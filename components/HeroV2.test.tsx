import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroV2 from "./HeroV2";

const H1 = "I bring out the best in you, by helping you bring out the best in the people you lead.";
const SUBHEAD =
  "I bring out the very best in managers and leaders at hardware and software companies. I've made the very same journey, from technical to leader.";

describe("HeroV2", () => {
  it("no longer renders the headshot image (moved to the bio section)", () => {
    render(<HeroV2 />);
    expect(screen.queryByAltText("Joseph Diele")).not.toBeInTheDocument();
  });

  it("no longer renders the company ticker (moved below the bio)", () => {
    render(<HeroV2 />);
    expect(screen.queryAllByText(/ScaleFlux/i).length).toBe(0);
  });

  it("renders the subtle background grid layer", () => {
    render(<HeroV2 />);
    expect(screen.getByTestId("hero-grid")).toBeInTheDocument();
  });

  it("uses the approved eyebrow, headline and subhead (P1)", () => {
    render(<HeroV2 />);
    expect(screen.getByText("Leader Development for managers at hardware and software companies")).toBeInTheDocument();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.replace(/\s+/g, " ").trim()).toBe(H1);
    expect(screen.getByText(SUBHEAD)).toBeInTheDocument();
  });

  it("shows the accent word \"lead.\" in white first (it fades to red later)", () => {
    render(<HeroV2 />);
    const accent = screen.getByText("lead.");
    expect(accent.className).toContain("text-white");
    expect(accent.className).not.toContain("B22222");
  });

  it("has the two approved CTAs", () => {
    render(<HeroV2 />);
    expect(screen.getByRole("link", { name: /Book a Free 20-Minute Call →/ })).toHaveAttribute(
      "href",
      "https://calendly.com/josephdiele",
    );
    expect(screen.getByRole("link", { name: "See the results →" })).toHaveAttribute("href", "/results");
    expect(screen.queryByText(/See How It Works|Schedule a Conversation/)).toBeNull();
  });

  it("keeps the body paragraph and credentials strip unchanged", () => {
    render(<HeroV2 />);
    expect(screen.getByText(/You got to where you are because of what you know/)).toBeInTheDocument();
    expect(screen.getByText("CECM")).toBeInTheDocument();
    expect(screen.getByText("35 Years")).toBeInTheDocument();
  });

  it("gates the eyebrow, paragraph, CTAs, and credentials (hidden initially)", () => {
    render(<HeroV2 />);
    const eyebrow = screen.getByText(/Leader Development for managers/).closest("div");
    const paragraph = screen.getByText(/You got to where you are/);
    const ctaWrapper = screen.getByText("See the results →").closest("div.flex");
    const credentialsWrapper = screen.getByText("CECM").closest("div.border-t");
    for (const el of [eyebrow, paragraph, ctaWrapper, credentialsWrapper]) {
      expect(el?.className).toContain("opacity-0");
    }
  });
});
