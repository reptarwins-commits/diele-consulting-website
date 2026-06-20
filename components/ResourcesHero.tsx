"use client";

import { useEffect, useRef, useState } from "react";

export default function ResourcesHero() {
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
    <section
      ref={ref}
      className="pt-32 pb-16 bg-[#0d1929] relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 relative">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
              Resources
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E8E8E8] mb-6 leading-tight">
            Free resources for leaders.
          </h1>

          <p className="text-xl text-[#C8C8C8] leading-relaxed">
            Practical tools and frameworks you can use immediately — no email required.
          </p>
          
          <p className="text-sm text-[#888888] mt-4">Updated May 2026</p>
        </div>
      </div>
    </section>
  );
}
