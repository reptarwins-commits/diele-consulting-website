import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutPage, { metadata } from "./page";

// Approved P5 replacement body (Notion card "Rewrite the About page for the
// current audience and story"). Must render verbatim, in this order.
const BODY = [
  "I've made the very same journey your managers are making, from technical to leader.",
  "For 35+ years I worked inside nine technology companies: StorageTek, Sun, Tristate, Fusion-io, SanDisk, ScaleFlux, Liqid, Dell and Priest-Zimmerman. Three of them, Fusion-io, ScaleFlux and Liqid, were startups. I went from technical lead to manager to leader, and along the way other leaders started sending me their people.",
  "That's the work now. I bring out the best in you, by helping you bring out the best in the people you lead. Most of the time that's a manager or leader at a hardware or software company who is great at the technical work and wants to be just as good with people.",
  "I care about the people I work with, and I stay calm when things get hard. People tell me I was the best manager they ever had. I have a fire inside me that was always meant to light the way for others.",
  "I also wrote Sustainable Quality (Business Expert Press, 2021). I hold an M.S. in Management, and I'm a Certified Executive Coach and a Lean Six Sigma Black Belt.",
  "Diele Consulting LLC · Westminster, CO",
];

const TILES = ["35+ Years", "9 Technology Companies", "M.S. Management", "Author: Sustainable Quality"];

describe("/about page", () => {
  it("keeps the approved document title", () => {
    expect(metadata.title).toBe("About | Joseph Diele — Founder, Diele Consulting");
  });

  it("does not mention Potential − Interference anywhere, including meta", () => {
    expect(String(metadata.description ?? "")).not.toMatch(/Potential/);
  });

  it("renders the P5 body verbatim and in order", () => {
    render(<AboutPage />);
    const body = Array.from(screen.getByTestId("about-copy").querySelectorAll("p")).map(
      (p) => p.textContent,
    );
    expect(body).toEqual(BODY);
  });

  it("renders the four background tiles", () => {
    render(<AboutPage />);
    const tiles = Array.from(screen.getByTestId("about-tiles").children).map((t) => t.textContent);
    expect(tiles).toEqual(TILES);
  });

  it("has exactly the two approved CTAs", () => {
    render(<AboutPage />);
    const ctas = Array.from(screen.getByTestId("about-ctas").querySelectorAll("a")).map((a) => [
      a.textContent,
      a.getAttribute("href"),
    ]);
    expect(ctas).toEqual([
      ["Book a Free 20-Minute Call →", "https://calendly.com/josephdiele"],
      ["See the results →", "/results"],
    ]);
  });

  it("drops the founder framing, the 15-to-35 line, Potential, and #services", () => {
    const { container } = render(<AboutPage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Every founder hits a moment/);
    expect(text).not.toMatch(/15 to 35 people/);
    expect(text).not.toMatch(/Potential/);
    expect(container.querySelector('a[href="#services"]')).toBeNull();
    expect(text).not.toMatch(/Explore Services/);
  });

  it("renders the site header and footer", () => {
    render(<AboutPage />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
