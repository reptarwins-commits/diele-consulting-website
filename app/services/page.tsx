import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Services | Diele Consulting LLC",
};

// Approved Services copy — use verbatim. Source: Services copy doc
// (docs.google.com/document/d/14gX6ocXunWspapWJOiZCe39ttWxYWYJF56qOfPmSuG8).
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

export default function ServicesPage() {
  return (
    <main className="bg-[#111111] min-h-screen">
      <ScrollProgress />
      <Nav />

      <section className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#B22222]" />
            <h1 className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
              Services
            </h1>
          </div>

          <div data-testid="services-copy">
            <p className="text-xl md:text-2xl text-[#E8E8E8] leading-relaxed mb-16">{INTRO}</p>

            {OFFERS.map((offer) => (
              <div key={offer.heading} className="mb-14 border-l-2 border-[#B22222] pl-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#E8E8E8] mb-5 leading-tight">
                  {offer.heading}
                </h2>
                {offer.paragraphs.map((para) => (
                  <p key={para} className="text-[#C8C8C8] leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            ))}

            <p className="text-lg font-semibold text-[#E8E8E8] mt-16">{CLOSING}</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
