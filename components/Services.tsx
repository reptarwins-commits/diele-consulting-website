"use client";
import { useEffect, useRef, useState } from "react";

const coachingTiers = [
  {
    tag: "Focused Sprint",
    tagBg: "bg-[#2a2a2a]",
    title: "The Bridge",
    duration: "2-3 Months",
    description:
      "For founders with solid people instincts who are drowning in the complexity of scale. The goal is to move from reactive to intentional, building a vision, leadership habits, and systems that scale without losing the culture that made you great.",
    outcomes: [
      "Clear vision your team can act on",
      "Intentional leadership rhythms",
      "Delegation that actually works",
    ],
    cta: "Schedule a Fit Call",
    href: "https://calendly.com/josephdiele",
  },
  {
    tag: "Core Engagement",
    tagBg: "bg-[#B22222]",
    title: "The Transformation",
    duration: "6+ Months",
    description:
      "For deeply technical founders who need to build people leadership skills from the ground up. Not a personality change, a skill set expansion. Communication, trust, conflict, feedback, and leading through others.",
    outcomes: [
      "Foundational people leadership skills",
      "Self-awareness around leadership blind spots",
      "Psychological safety within the team",
    ],
    cta: "Schedule a Fit Call",
    href: "https://calendly.com/josephdiele",
  },
  {
    tag: "Ongoing",
    tagBg: "bg-[#2a2a2a]",
    title: "The Retainer",
    duration: "Monthly",
    description:
      "For companies that want Inside-Out embedded as the ongoing leadership operating system, onboarding new leaders, protecting culture through rapid growth, developing the next generation.",
    outcomes: [
      "Ongoing 1:1 coaching",
      "New leader onboarding support",
      "Culture continuity through growth",
    ],
    cta: "Let's Talk",
    href: "https://calendly.com/josephdiele",
  },
];

const consultingAreas = [
  {
    name: "Culture & Direction",
    symptom: "Trust is breaking down. People don't know what matters or why.",
    outcome: "Clear roles, communication, and direction built into the operating rhythm of the company.",
    duration: "6 months",
  },
  {
    name: "People & Retention",
    symptom: "Good people are leaving and you don't know why.",
    outcome: "Diagnose what's actually driving turnover and disengagement, then build the systems to reverse it.",
    duration: "1-2 months",
  },
  {
    name: "Leadership Development",
    symptom: "Middle management is weak. Key leaders are burning out.",
    outcome: "Develop the layer between you and the team so you're not the solution to every problem.",
    duration: "3-6 months",
  },
  {
    name: "Succession & Leadership Transition",
    symptom: "A new leader is stepping in and resistance is forming.",
    outcome: "Navigate leadership transitions without losing what makes the company work.",
    duration: "6-9 months",
  },
  {
    name: "Operations & Quality",
    symptom: "Errors, inefficiency, missed deadlines. The work isn't holding up.",
    outcome: "Build the systems and leadership behaviors that drive consistent, quality execution.",
    duration: "6 months",
  },
];

const bundledPrograms = [
  { name: "Inside-Out Starter", desc: "Assessment + 3-Month Coaching" },
  { name: "Culture Turnaround", desc: "Org Consulting + Coaching" },
  { name: "Sustainable Growth", desc: "Full transformation + retainer" },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="py-24 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className={`max-w-2xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#EC4545] text-xs tracking-[0.3em] uppercase font-semibold">How We Work Together</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-4">
            Every engagement is built for your situation.
          </h2>
          <p className="text-[#C8C8C8]">
            No off-the-shelf programs. No generic workshops. Everything starts with understanding what's actually happening in your organization.
          </p>
        </div>

        {/* Part 1: Coaching Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {coachingTiers.map((tier, i) => (
            <CoachingCard key={i} tier={tier} visible={visible} delay={200 + i * 150} />
          ))}
        </div>

        {/* Part 2: Organizational Consulting */}
        <div className={`mb-24 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#EC4545] text-xs tracking-[0.3em] uppercase font-semibold">Organizational Consulting</span>
          </div>
          <p className="text-[#C8C8C8] max-w-2xl mb-10">
            For founders ready to address culture, people, and leadership challenges at the company level. Each engagement includes discovery, diagnostic, strategy, and measurable outcomes.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {consultingAreas.map((area, i) => (
              <div key={i} className="bg-[#1a1a1a] p-6 border-l-2 border-[#B22222]/30 hover:border-[#B22222] transition-colors duration-300">
                <h3 className="font-serif text-lg font-bold text-[#E8E8E8] mb-2">{area.name}</h3>
                <p className="text-[#888888] italic text-sm mb-3">{area.symptom}</p>
                <p className="text-[#C8C8C8] text-sm mb-3">{area.outcome}</p>
                <span className="text-[#666666] text-xs uppercase tracking-wider">{area.duration}</span>
              </div>
            ))}
          </div>

          <p className="text-[#C8C8C8] text-sm">
            All engagements scoped on your Fit Call.{" "}
            <a
              href="https://calendly.com/josephdiele"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EC4545] hover:text-white transition-colors duration-200 underline underline-offset-2"
            >
              Schedule yours here.
            </a>
          </p>
        </div>

        {/* Part 3: Diagnostic CTA */}
        <div className={`mb-24 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="bg-[#1a1a1a] border border-[#B22222]/20 p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#B22222] to-transparent" />
            <div className="max-w-2xl">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#E8E8E8] mb-4">
                Not sure where to start?
              </h3>
              <p className="text-[#C8C8C8] text-base leading-relaxed mb-6">
                The Clear Direction Diagnostic is a free 15-minute self-assessment built around the same framework used in every engagement. It surfaces the specific gaps between where your leadership and culture are today and where they need to be.
              </p>
              <a
                href="https://www.dieleconsulting.com/diagnostic"
                className="inline-block bg-[#B22222] hover:bg-[#8B0000] text-white text-sm font-semibold px-8 py-3 transition-colors duration-300 mb-4"
              >
                Take the Diagnostic →
              </a>
              <p className="text-[#666666] text-sm">
                More diagnostics coming, each focused on a different dimension of the people side of your business.
              </p>
            </div>
          </div>
        </div>

        {/* Part 4: Bundled Programs Coming Soon */}
        <div className={`transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="border border-white/5 p-8 bg-[#141414]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#555555] text-xs tracking-[0.3em] uppercase font-semibold">Coming Soon</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#888888] mb-3">Bundled Programs</h3>
            <p className="text-[#555555] text-sm mb-6 max-w-xl">
              Structured programs that combine assessment, coaching, and consulting for founders who want a defined path from where they are to where they need to be. Mention it on your Fit Call.
            </p>
            <ul className="space-y-2">
              {bundledPrograms.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-[#555555] text-sm">
                  <span className="w-1 h-1 rounded-full bg-[#444444] flex-shrink-0" />
                  <span className="font-semibold text-[#666666]">{p.name}</span>
                  <span className="text-[#444444]">{p.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

function CoachingCard({
  tier,
  visible,
  delay,
}: {
  tier: typeof coachingTiers[0];
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative flex flex-col bg-[#1a1a1a] p-8 transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${hovered ? "-translate-y-1 shadow-xl shadow-black/40" : ""}
      `}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Border trace */}
      <div className="absolute top-0 left-0 h-[1px] bg-[#B22222] transition-all duration-500 ease-out" style={{ width: hovered ? "100%" : "0%" }} />
      <div className="absolute top-0 right-0 w-[1px] bg-[#B22222] transition-all duration-500 ease-out delay-100" style={{ height: hovered ? "100%" : "0%" }} />
      <div className="absolute bottom-0 right-0 h-[1px] bg-[#B22222] transition-all duration-500 ease-out delay-200" style={{ width: hovered ? "100%" : "0%" }} />
      <div className="absolute bottom-0 left-0 w-[1px] bg-[#B22222] transition-all duration-500 ease-out delay-300" style={{ height: hovered ? "100%" : "0%" }} />

      <span className={`inline-block text-xs font-semibold text-white px-3 py-1 mb-6 self-start ${tier.tagBg}`}>
        {tier.tag}
      </span>

      <h3 className={`font-serif text-xl font-bold mb-2 transition-colors duration-300 ${hovered ? "text-white" : "text-[#E8E8E8]"}`}>
        {tier.title}
      </h3>
      <p className="text-[#B22222] font-semibold text-sm mb-4">{tier.duration}</p>
      <p className="text-[#C8C8C8] text-base leading-relaxed mb-6 flex-grow">{tier.description}</p>

      <ul className="space-y-2 mb-8">
        {tier.outcomes.map((o, j) => (
          <li key={j} className="flex items-start gap-2 text-[#C8C8C8] text-base">
            <span className="text-[#B22222] mt-0.5 flex-shrink-0">✓</span>
            {o}
          </li>
        ))}
      </ul>

      <a
        href={tier.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto border text-sm font-semibold px-6 py-3 text-center transition-all duration-300
          ${hovered ? "border-[#B22222] bg-[#B22222]/10 text-[#E8E8E8]" : "border-white/10 text-[#C8C8C8]"}
        `}
      >
        {tier.cta} →
      </a>
    </div>
  );
}
