import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutCredentials from "./AboutCredentials";

describe("AboutCredentials", () => {
  it("points Explore Services at /services, not the home-only #services anchor", () => {
    render(<AboutCredentials />);
    expect(screen.getByRole("link", { name: "Explore Services" })).toHaveAttribute("href", "/services");
  });
});
