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
});
