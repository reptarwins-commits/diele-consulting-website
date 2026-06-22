import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Nav from "./Nav";

describe("Nav", () => {
  it("hides the Blog link while the blog feature flag is off (default)", () => {
    render(<Nav />);
    expect(screen.queryAllByRole("link", { name: "Blog" })).toHaveLength(0);
  });

  it("still shows the always-on links", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
  });
});
