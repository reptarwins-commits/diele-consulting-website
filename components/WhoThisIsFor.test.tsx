import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhoThisIsFor from "./WhoThisIsFor";
import Services from "./Services";

const BULLETS = [
  "Your best engineer is about to become a manager, and you want them ready before day one.",
  "You promoted someone six months ago, and the team still waits on them for every decision.",
  "A strong manager is about to lead other managers.",
  "A key technical person may leave because they can't see their path.",
  "You need a successor, and you have a name but not a plan.",
];

describe("Who this is for (P6)", () => {
  it("uses the exact P6 heading, intro and five bullets", () => {
    render(<WhoThisIsFor />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Who this is for.");
    expect(
      screen.getByText(
        "You're a manager or leader at a hardware or software company, or you lead people who are. One of these is true:",
      ),
    ).toBeInTheDocument();
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items).toEqual(BULLETS);
  });

  it("drops the CEO/CTO/VP line and the old copy", () => {
    const { container } = render(<WhoThisIsFor />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/CEO, CTO, or VP/);
    expect(text).not.toMatch(/You might be in the right place/);
    expect(text).not.toMatch(/identity shift/);
  });
});

describe("Pain-point grid", () => {
  it("has exactly the four P6 tiles with the mapped bullets", () => {
    render(<Services />);
    const tiles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(tiles).toEqual(["Promotion readiness", "New-manager habits", "Leading leaders", "Succession"]);
    const tileText = (title: string) =>
      screen.getByRole("heading", { level: 3, name: title }).closest("[data-tile]")?.textContent ?? "";
    expect(tileText("Promotion readiness")).toContain(BULLETS[0]);
    expect(tileText("New-manager habits")).toContain(BULLETS[1]);
    expect(tileText("Leading leaders")).toContain(BULLETS[2]);
    expect(tileText("Succession")).toContain(BULLETS[3]);
    expect(tileText("Succession")).toContain(BULLETS[4]);
  });

  it("drops the founder, burnout and CPO tiles", () => {
    const { container } = render(<Services />);
    const text = container.textContent ?? "";
    for (const gone of ["Delegation & Founder Freedom", "Burnout & Energy", "Scaling Pain", "Founder is always behind", "Founder cannot let go", "CPO cost"]) {
      expect(text).not.toContain(gone);
    }
  });
});
