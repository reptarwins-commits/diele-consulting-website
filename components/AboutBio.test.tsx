import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutBio from "./AboutBio";

describe("AboutBio", () => {
  it("renders Joe's bio with headshot, name, a credential, and a link to /about", () => {
    render(<AboutBio />);
    expect(screen.getByText("Joseph Diele")).toBeInTheDocument();
    expect(screen.getByAltText("Joseph Diele")).toBeInTheDocument();
    expect(screen.getByText(/CECM/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /more about joe/i })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("includes the relocated company ticker below the bio", () => {
    render(<AboutBio />);
    expect(screen.getAllByText(/ScaleFlux/i).length).toBeGreaterThan(0);
  });
});
