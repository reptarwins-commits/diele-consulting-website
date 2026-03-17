"use client";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    tag: "Start Here",
    tagBg: "bg-[#B22222]",
    title: "People & Culture Rapid Assessment",
    price: "$2,500",
    description:
      "A focused diagnostic that gives you clear language for what's broken — and a prioritized action plan. Async intake + written report + 60-min debrief.",
    outcomes: ["Name your top 3 culture risks", "Written action report", "60-min strategy debrief"],
    cta: "Start the Assessment",
    href: "https://calendly.com/josephdiele",
  },
  {
    tag: "Core Engagement",
    tagBg: "bg-[#2a2a2a]",
    title: "Leadership Coaching & Development",
    price: "3–6 Month Engagement",
    description:
      "Deep, customized coaching for technical leaders closing the gap between expert and executive. Built around your specific context, not a curriculum.",
    outcomes: ["1:1 executive coaching", "Inside-Out Leadership™ framework", "360° feedback integration"],
    cta: "Schedule a Conversation",
    href: "https://calendly.com/josephdiele",
  },
  {
    tag: "Government & Public Sector",
    tagBg: "bg-[#2a2a2a]",
    title: "Organizational Effectiveness Programs",
    price: "Custom Pricing",
    description:
      "Leadership development and culture programs for government agencies and public sector organizations. Customizable curriculum, on-site or remote.",
    outcomes: ["NAICS 611430 / 541618", "Custom curriculum", "On-site or remote delivery"],
    cta: "Request Information",
    href: "https://calendly.com/josephdiele",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="py-24 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`max-w-2xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">How We Work Together</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-4">
            Every engagement is built for your situation.
          </h2>
          <p className="text-[#C8C8C8]">
            No off-the-shelf programs. No generic workshops. Everything starts with understanding what's actually happening in your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} visible={visible} delay={200 + i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc, visible, delay }: { svc: typeof services[0]; visible: boolean; delay: number }) {
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

      <span className={`inline-block text-xs font-semibold text-white px-3 py-1 mb-6 self-start ${svc.tagBg}`}>
        {svc.tag}
      </span>

      <h3 className={`font-serif text-xl font-bold mb-2 transition-colors duration-300 ${hovered ? "text-white" : "text-[#E8E8E8]"}`}>
        {svc.title}
      </h3>
      <p className="text-[#B22222] font-semibold text-sm mb-4">{svc.price}</p>
      <p className="text-[#C8C8C8] text-base leading-relaxed mb-6 flex-grow">{svc.description}</p>

      <ul className="space-y-2 mb-8">
        {svc.outcomes.map((o, j) => (
          <li key={j} className="flex items-start gap-2 text-[#C8C8C8] text-base">
            <span className="text-[#B22222] mt-0.5 flex-shrink-0">✓</span>
            {o}
          </li>
        ))}
      </ul>

      <a
        href={svc.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto border text-sm font-semibold px-6 py-3 text-center transition-all duration-300
          ${hovered ? "border-[#B22222] bg-[#B22222]/10 text-[#E8E8E8]" : "border-white/10 text-[#C8C8C8]"}
        `}
      >
        {svc.cta} →
      </a>
    </div>
  );
}
