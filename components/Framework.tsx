"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Name the Real Problem",
    description:
      "Most leaders know something is wrong before they can say what. We start by making it concrete — a structured diagnostic that gives you language for what you've been feeling.",
  },
  {
    number: "02",
    title: "Build from the Inside Out",
    description:
      "Technical AND people. Not OR. You don't have to give up your technical identity — you build on top of it. The coaching develops the self-awareness and communication skills that make leadership stick.",
  },
  {
    number: "03",
    title: "Create Systems That Last",
    description:
      "Every engagement ends with repeatable systems your team owns. Culture built on clarity, not compliance. The goal is never dependency — it's durability.",
  },
];

export default function Framework() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`max-w-2xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#E84444] text-xs tracking-[0.3em] uppercase font-semibold">The Approach</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-4 leading-tight">
            Inside-Out Leadership™
          </h2>
          <p className="text-[#C8C8C8] text-base leading-relaxed">
            Most leadership programs start with behavior. Inside-Out Leadership starts with identity — who you are as a leader before what you do as a leader. The results last because they come from within, not from a manual.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <FrameworkCard key={i} step={step} visible={visible} delay={200 + i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FrameworkCard({ step, visible, delay }: { step: typeof steps[0]; visible: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative p-8 bg-[#252525] transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${hovered ? "-translate-y-2" : ""}
      `}
      style={{
        transitionDelay: `${delay}ms`,
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(178,34,34,0.25)"
          : "0 2px 8px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Border trace — 2px, full red */}
      <div className="absolute top-0 left-0 h-[2px] bg-[#B22222] transition-all duration-500 ease-out"
        style={{ width: hovered ? "100%" : "0%" }} />
      <div className="absolute top-0 right-0 w-[2px] bg-[#B22222] transition-all duration-500 ease-out delay-100"
        style={{ height: hovered ? "100%" : "0%" }} />
      <div className="absolute bottom-0 right-0 h-[2px] bg-[#B22222] transition-all duration-500 ease-out delay-200"
        style={{ width: hovered ? "100%" : "0%" }} />
      <div className="absolute bottom-0 left-0 w-[2px] bg-[#B22222] transition-all duration-500 ease-out delay-300"
        style={{ height: hovered ? "100%" : "0%" }} />

      {/* Dim base border */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none" />

      <div
        className="font-serif text-5xl font-bold mb-4 leading-none transition-colors duration-300"
        style={{ color: hovered ? "rgba(178,34,34,0.85)" : "rgba(178,34,34,0.5)" }}
      >
        {step.number}
      </div>
      <h3 className={`font-semibold text-lg mb-3 transition-colors duration-300 ${hovered ? "text-white" : "text-[#E8E8E8]"}`}>
        {step.title}
      </h3>
      <p className="text-[#C8C8C8] text-base leading-relaxed">{step.description}</p>
    </div>
  );
}
