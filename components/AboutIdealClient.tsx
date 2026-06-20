"use client";

import { useEffect, useRef, useState } from "react";

const signals = [
  "You are leading a team of 15 to 35 people and something has shifted.",
  "Execution is slipping and the cause isn't fully visible.",
  "Your team depends on you more than it should.",
  "Good people are disengaging, underperforming, or quietly heading for the door.",
  "You are stuck inside the work instead of leading it.",
  "You know something is wrong. You just don't have time to figure out what.",
];

export default function AboutIdealClient() {
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
    <section ref={ref} className="py-20 bg-[#0d1929]">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
              You Are in the Right Place If
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {signals.map((signal, i) => (
              <div
                key={i}
                className={`p-6 bg-[#1a1a1a] border border-white/5 transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <p className="text-[#C8C8C8] leading-relaxed">{signal}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-l-2 border-[#B22222] pl-8">
            <p className="text-xl text-[#E8E8E8] leading-relaxed mb-4">
              The interference is usually findable. And it is almost always
              fixable.
            </p>
            <p className="text-lg text-[#C8C8C8] leading-relaxed mb-4">
              You do not always need new people. Often, you just need to remove
              the interference.
            </p>
            <p className="text-lg text-[#E8E8E8] font-semibold">
              The transition is possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
