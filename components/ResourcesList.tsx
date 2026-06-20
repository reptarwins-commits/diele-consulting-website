"use client";

import { useEffect, useRef, useState } from "react";

const resources = [
  {
    title: "People Excellence Workshop Overview",
    description:
      "A 3-day workshop for leadership teams who want to improve performance by bringing out the best in their people. Built for small business reality — especially tech companies and growing operational teams.",
    highlights: [
      "3 consecutive days",
      "5-10 participants",
      "The Performance = Capacity - Interference framework",
      "Purpose-driven engagement model",
      "90-day action plan included",
    ],
    price: "$1,250 per person",
    groupSize: "Groups of 5-10",
    cta: "Download Free Overview",
    href: "/resources/people-excellence-workshop",
    new: false,
  },
  {
    title: "Employee Disengagement Collection",
    description:
      "A curated collection of LinkedIn posts exploring why good employees quietly check out — and what leaders can do about it. Real stories, practical insights, and actionable frameworks for building teams that stay engaged.",
    highlights: [
      "Signs of quiet disengagement",
      "Why top performers leave",
      "Leadership habits that drive retention",
      "Practical conversation starters",
    ],
    price: "Free",
    groupSize: "PDF Download",
    cta: "Download Collection",
    href: "/resources/employee-disengagement-collection.pdf",
    new: true,
  },
];

export default function ResourcesList() {
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
    <section ref={ref} className="py-20 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] border border-white/10 p-8 md:p-12 relative overflow-hidden mb-8 last:mb-0"
            >
              {/* New badge */}
              {resource.new && (
                <span className="absolute top-0 right-0 bg-[#B22222] text-white text-xs font-semibold px-4 py-1">
                  NEW
                </span>
              )}

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#E8E8E8] mb-4">
                {resource.title}
              </h2>

              <p className="text-[#C8C8C8] text-lg leading-relaxed mb-6">
                {resource.description}
              </p>

              {/* Highlights */}
              <ul className="grid md:grid-cols-2 gap-3 mb-8">
                {resource.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#C8C8C8]">
                    <span className="text-[#B22222] flex-shrink-0">✓</span>
                    <span className="text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing */}
              <div className="border-t border-white/10 pt-6 mb-8">
                <p className="text-sm text-[#888888] uppercase tracking-wider mb-2">
                  Investment
                </p>
                <p className="text-2xl font-serif text-[#E8E8E8]">
                  {resource.price}
                </p>
                <p className="text-[#888888] text-sm">{resource.groupSize}</p>
              </div>

              {/* CTA */}
              <a
                href={resource.href}
                className="inline-block bg-[#B22222] text-white px-8 py-4 font-semibold hover:bg-[#8B0000] transition-colors duration-200"
              >
                {resource.cta} →
              </a>

              <p className="text-sm text-[#888888] mt-4">
                No email required. View online or print to PDF.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
