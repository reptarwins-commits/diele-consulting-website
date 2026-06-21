import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Stats from "./Stats";

describe("Stats", () => {
  it("renders all four stat labels", () => {
    render(<Stats />);
    expect(screen.getByText("Years of Experience")).toBeInTheDocument();
    expect(screen.getByText("Leaders Developed")).toBeInTheDocument();
    expect(screen.getByText("Culture Indicators")).toBeInTheDocument();
    expect(screen.getByText("Custom Engagements")).toBeInTheDocument();
  });
});
