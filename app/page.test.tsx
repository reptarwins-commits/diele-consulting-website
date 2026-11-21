import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("home page", () => {
  it("no longer has the Inside-Out Leadership section", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Inside-Out Leadership/);
    for (const h of ["Name the Real Problem", "Build from the Inside Out", "Create Systems That Last"]) {
      expect(text).not.toContain(h);
    }
  });
});
