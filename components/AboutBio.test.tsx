import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutBio from "./AboutBio";

describe("AboutBio", () => {
  it("renders Joe's bio with headshot, name, a credential, and a link to /about", () => {
    render(<AboutBio />);
    expect(screen.getByText("Joseph Diele")).toBeInTheDocument();
    expect(screen.getByAltText("Joseph Diele")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /more about joe/i })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("includes the relocated company ticker below the bio", () => {
    render(<AboutBio />);
    expect(screen.getAllByText(/ScaleFlux/i).length).toBeGreaterThan(0);
  });

  it("uses the exact P4 paragraph and credential line", () => {
    const { container } = render(<AboutBio />);
    expect(
      screen.getByText(
        "35+ years across nine technology companies, moving from technical lead to manager to leader: StorageTek, Sun, Tristate, Fusion-io, SanDisk, ScaleFlux, Liqid, Dell and Priest-Zimmerman. I care about the people I work with, I stay calm when things get hard, and I've made the very same journey your managers are making.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("M.S. Management · Author, Sustainable Quality · Certified Executive Coach · Lean Six Sigma Black Belt"),
    ).toBeInTheDocument();
    const bio = container.querySelector("[data-testid='about-bio']")?.textContent ?? "";
    expect(bio).not.toMatch(/CTO|\bVP\b|M\.S\. Org\. Leadership|CECM/);
  });
});
