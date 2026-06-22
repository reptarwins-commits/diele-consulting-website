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
});
