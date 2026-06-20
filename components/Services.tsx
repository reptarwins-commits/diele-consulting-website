"use client";
import { useEffect, useRef, useState } from "react";

const painCategories = [
  {
    category: "Culture & Engagement",
    icon: "🔥",
    painPoints: [
      "Best people are burning out, quitting, or going through the motions",
      "Engagement is low, recognition is weak, psychological safety is thin",
      "A key employee looks likely to leave",
    ],
  },
  {
    category: "Communication & Alignment",
    icon: "🎯",
    painPoints: [
      "Team is pulling in different directions; priorities are unclear",
      "Information stays in the founder's head or small inner circle",
      "Managers avoid conflict and hard conversations",
    ],
  },
  {
    category: "Role Clarity & Accountability",
    icon: "⚡",
    painPoints: [
      "Nobody knows who owns what; decisions keep coming back to founder",
      "One team has friction, duplication, and handoff confusion",
      "Managers either micromanage or avoid accountability",
    ],
  },
  {
    category: "Hiring & Developing People",
    icon: "🌱",
    painPoints: [
      "Wrong hires, weak onboarding, no real manager bench",
      "First-time managers are overwhelmed and reactive",
      "Top operator promoted to supervisor without support",
      "Good people are leaving because growth, recognition, and retention are weak",
    ],
  },
  {
    category: "Delegation & Founder Freedom",
    icon: "🚀",
    painPoints: [
      "Founder cannot let go; team cannot decide without them",
      "Founder is holding too many tasks and decisions",
    ],
  },
  {
    category: "Burnout & Energy",
    icon: "🔋",
    painPoints: [
      "Founder is always behind, always tired, always on",
      "Founder is stuck in the weeds and needs rapid clarity",
    ],
  },
  {
    category: "Scaling Pain",
    icon: "📈",
    painPoints: [
      "What got us here won't get us there; growth is breaking what used to work",
      "Company needs people, leadership, and communication infrastructure for the next stage",
      "Company needs ongoing senior people leadership without full-time CPO cost",
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
        <span className="text-2xl">{category.icon}</span>
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
