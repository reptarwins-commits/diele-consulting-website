"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutHero() {
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
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #B22222 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
              About
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E8E8E8] mb-8 leading-tight">
            Leadership gets tested when the pressure goes up.
          </h1>

          <p className="text-xl md:text-2xl text-[#C8C8C8] leading-relaxed mb-6">
            Every founder hits a moment when the business stops responding the way
            it used to.
          </p>

          <p className="text-lg text-[#C8C8C8] leading-relaxed">
            More people. More complexity. More pressure. Faster decisions. Bigger
            consequences.
          </p>
        </div>
      </div>
    </section>
  );
}
