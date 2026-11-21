import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WorkshopSheet from "./WorkshopSheet";
import ResourcesList from "./ResourcesList";

describe("People Excellence Workshop: no price", () => {
  it("workshop overview drops the $1,250 price and the founder-frustration line, keeps format and culture", () => {
    const { container } = render(<WorkshopSheet />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\$1,250/);
    expect(text).not.toMatch(/Founder or executive frustration/);
    expect(text).not.toMatch(/Investment/);
    expect(text).toContain("Groups of 5-10 participants");
    expect(text).toMatch(/culture/i);
  });

  it("/resources drops the workshop price but keeps the free Disengagement Collection", () => {
    const { container } = render(<ResourcesList />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\$1,250/);
    expect(text).toContain("Groups of 5-10");
    expect(text).toContain("Employee Disengagement Collection");
    expect(text).toContain("Free");
    expect(container.querySelector('a[href="/resources/employee-disengagement-collection.pdf"]')).not.toBeNull();
  });
});
