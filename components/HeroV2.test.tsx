import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroV2 from "./HeroV2";

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

  it("gates the paragraph, CTAs, and credentials (hidden initially, revealed after the tagline)", () => {
    render(<HeroV2 />);
    // None of the three appear with the rest of the hero — they start hidden and
    // are faded in later (timing/sequence verified separately with Playwright).
    const paragraph = screen.getByText(/You got to where you are/);
    const ctaWrapper = screen.getByText("See How It Works").closest("div.flex");
    const credentialsWrapper = screen.getByText("CECM").closest("div.border-t");

    expect(paragraph.className).toContain("opacity-0");
    expect(ctaWrapper?.className).toContain("opacity-0");
    expect(credentialsWrapper?.className).toContain("opacity-0");
  });
});
