"use client";
import { useEffect, useRef, useState } from "react";

// Four tiles from P6. Bodies are the P6 bullets mapped per the Notion card;
// do not add tile blurbs.
const painCategories = [
  {
    category: "Promotion readiness",
    painPoints: ["Your best engineer is about to become a manager, and you want them ready before day one."],
  },
  {
    category: "New-manager habits",
    painPoints: ["You promoted someone six months ago, and the team still waits on them for every decision."],
  },
  {
    category: "Leading leaders",
    painPoints: ["A strong manager is about to lead other managers."],
  },
  {
    category: "Succession",
    painPoints: [
      "A key technical person may leave because they can't see their path.",
      "You need a successor, and you have a name but not a plan.",
    ],
  },
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
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
              How We Work Together
            </span>
            <div className="w-6 h-[1px] bg-[#B22222]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-4">
            Start with the pain. End with the result.
          </h2>
          <p className="text-[#C8C8C8] max-w-2xl mx-auto">
            Every engagement starts with understanding what is actually happening in your organization. 
            Here are the pain points I help leaders solve.
          </p>
        </div>

        {/* Pain Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {painCategories.map((category, index) => (
            <PainCategoryCard
              key={index}
              category={category}
              index={index}
              visible={visible}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-lg text-[#C8C8C8] mb-6">
            If any of these sound familiar, let&apos;s talk about what that could look like for you.
          </p>
          <a
            href="https://calendly.com/josephdiele"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#B22222] text-white px-8 py-4 font-semibold hover:bg-[#8B0000] transition-colors duration-200"
          >
            Book a Free 20-Minute Call →
          </a>
          <p className="text-sm text-[#888888] mt-4">
            No pitch. Just a conversation about what&apos;s slowing you down.
          </p>
        </div>
      </div>
    </section>
  );
}

function PainCategoryCard({
  category,
  index,
  visible,
}: {
  category: (typeof painCategories)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-tile
      className={`group relative bg-[#1a1a1a] p-8 transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${hovered ? "-translate-y-1 shadow-xl shadow-black/40" : ""}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Border trace */}
      <div
        className="absolute top-0 left-0 h-[1px] bg-[#B22222] transition-all duration-500 ease-out"
        style={{ width: hovered ? "100%" : "0%" }}
      />
      <div
        className="absolute top-0 right-0 w-[1px] bg-[#B22222] transition-all duration-500 ease-out delay-100"
        style={{ height: hovered ? "100%" : "0%" }}
      />
      <div
        className="absolute bottom-0 right-0 h-[1px] bg-[#B22222] transition-all duration-500 ease-out delay-200"
        style={{ width: hovered ? "100%" : "0%" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[1px] bg-[#B22222] transition-all duration-500 ease-out delay-300"
        style={{ height: hovered ? "100%" : "0%" }}
      />

      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <h3
          className={`font-serif text-xl font-bold transition-colors duration-300 ${
            hovered ? "text-white" : "text-[#E8E8E8]"
          }`}
        >
          {category.category}
        </h3>
      </div>

      {/* Pain Points */}
      <ul className="space-y-3">
        {category.painPoints.map((point, i) => (
          <li key={i} className="flex gap-3 text-[#C8C8C8]">
            <span className="text-[#B22222] flex-shrink-0">→</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
