import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServicesPage, { metadata } from "./page";

// Approved Services copy (Notion card "Create the /services page with the
// approved four offers and no prices"). Must render verbatim, in this order.
const INTRO =
  "I help leaders and organizations get more from the capacity they already have. A lot of my work is with people who have been promoted into leadership. I made that same jump from technical expert to leader, so I know how hard it can be when the work changes and no one quite prepares you for it.";

const OFFERS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "Leadership Development & Executive Coaching",
    paragraphs: [
      "Strong individual contributors often become managers without much preparation, and established leaders run into the same challenges of leading people.",
      "I work with you one-on-one around the real situations on your plate: stakeholder expectations, confidential 360 feedback when it is useful, and the habits that need to change. We build a focused development plan and use the sessions to practice and review progress.",
      "You get a development plan, regular coaching you can apply between sessions, and a simple way to review progress.",
    ],
  },
  {
    heading: "Organizational Performance Diagnostic",
    paragraphs: [
      "A team or organization is underperforming, but leaders do not share a clear picture of what is getting in the way.",
      "I use a Capacity-Interference approach to look at two questions: do people have the capacity the work requires, and what is interfering with using it? That can include resources, skills, systems, and processes, as well as trust, direction, unclear expectations, and how work gets handed off. I gather evidence through interviews, the metrics you already have, and targeted observation.",
      "You receive a concise diagnosis of the main constraints, the evidence behind it, and a prioritized improvement roadmap. Broader implementation can be scoped separately.",
    ],
  },
  {
    heading: "Culture & Leadership Alignment",
    paragraphs: [
      "Stated values and the culture you want often do not match everyday management behaviors, and trust, engagement, or accountability can suffer as a result.",
      "I look at what employees and leaders actually experience: consistency of values and behavior, communication, trust, decision-making, and follow-through. Then we talk through the gaps and agree on practical leadership commitments.",
      "You receive a culture-and-behavior findings summary, agreed leadership actions, and observable indicators you can come back to over time.",
    ],
  },
  {
    heading: "Operational Excellence & Collaborative Improvement",
    paragraphs: [
      "Recurring errors, rework, handoff failures, slow decisions, or poor customer outcomes often persist even after repeated attempts to fix them.",
      "I start with a specific performance problem and work with the people who own the work. Together we find the root causes, improve the process, test changes, and put measures and ownership in place, using the SQI continuous improvement process from my quality book. This is about solving a concrete business problem with people across boundaries, not a generic quality program.",
      "You receive a practical improvement plan, redesigned ways of working where they are needed, clear owners, and agreed performance measures. Implementation support can be scoped separately.",
    ],
  },
];

const CLOSING = "Contact me for pricing.";

describe("/services page", () => {
  it("renders the site header and footer", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the four approved offer headings as h2s, in order", () => {
    render(<ServicesPage />);
    const article = screen.getByTestId("services-copy");
    const h2s = Array.from(article.querySelectorAll("h2")).map((h) => h.textContent);
    expect(h2s).toEqual(OFFERS.map((o) => o.heading));
  });

  it("renders the approved copy verbatim and in order, ending with the pricing line", () => {
    render(<ServicesPage />);
    const article = screen.getByTestId("services-copy");
    const blocks = Array.from(article.querySelectorAll("p, h2")).map((el) => el.textContent);
    const expected = [
      INTRO,
      ...OFFERS.flatMap((o) => [o.heading, ...o.paragraphs]),
      CLOSING,
    ];
    expect(blocks).toEqual(expected);
  });

  it("shows no prices and no Rapid Assessment or custom-option offer", () => {
    const { container } = render(<ServicesPage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\$/);
    expect(text).not.toMatch(/Rapid Assessment/i);
    expect(text).not.toMatch(/Something different in mind/i);
  });

  it("uses the approved document title and no invented description", () => {
    expect(metadata.title).toBe("Services | Diele Consulting LLC");
    expect(metadata).not.toHaveProperty("description");
  });
});
