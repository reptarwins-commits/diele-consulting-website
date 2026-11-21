import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import ResourcesList from "./ResourcesList";

const TITLE = "10 Signs You’re About to Lose Someone You Can’t Afford to Lose";
const HREF = "/resources/10-signs-youre-about-to-lose-someone.pdf";

describe("/resources: 10 Signs download", () => {
  it("links to the 10 Signs PDF with the PDF's title as the link label, no email gate", () => {
    render(<ResourcesList />);
    const link = screen.getByRole("link", { name: new RegExp(TITLE) });
    expect(link).toHaveAttribute("href", HREF);
  });

  it("serves the file from public/ under a kebab-case name", () => {
    expect(existsSync(join(process.cwd(), "public", HREF))).toBe(true);
    expect(HREF).toMatch(/^\/resources\/[a-z0-9-]+\.pdf$/);
  });

  it("keeps the existing resources", () => {
    render(<ResourcesList />);
    expect(screen.getByText("People Excellence Workshop Overview")).toBeInTheDocument();
    expect(screen.getByText("Employee Disengagement Collection")).toBeInTheDocument();
  });
});
