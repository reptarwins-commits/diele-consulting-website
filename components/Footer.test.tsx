import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("hides the Blog link while the blog feature flag is off (default)", () => {
    render(<Footer />);
    expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
  });

  it("still shows other navigation links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
  });

  it("points About at /about, not an in-page anchor", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  it("points Book a Call at Calendly", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Book a Call" })).toHaveAttribute(
      "href",
      "https://calendly.com/josephdiele",
    );
  });

  it("links LinkedIn to /in/jdiele", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/jdiele",
    );
  });

  it("has a Results item pointing at /results", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Results" })).toHaveAttribute("href", "/results");
  });

  it("points Services at the /services page, not an in-page anchor", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
  });
});
