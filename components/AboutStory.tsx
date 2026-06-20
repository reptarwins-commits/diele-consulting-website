"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutStory() {
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
          <p className="text-lg text-[#C8C8C8] leading-relaxed mb-8">
            And suddenly the thing slowing you down isn&apos;t the market or the
            product.
          </p>

          <p className="text-lg text-[#C8C8C8] leading-relaxed mb-6">
            It&apos;s something underneath.
          </p>

          <p className="text-lg text-[#C8C8C8] leading-relaxed mb-8">
            A leadership gap. A trust problem. A team that depends on you for
            decisions it shouldn&apos;t need you for. People who aren&apos;t
            performing the way you expected. Communication that keeps breaking in the
            same places.
          </p>

          {/* The Interference Concept */}
          <div className="border-l-2 border-[#B22222] pl-8 my-12">
            <p className="text-2xl md:text-3xl font-serif text-[#E8E8E8] mb-4">
              That&apos;s interference.
            </p>
            <p className="text-lg text-[#C8C8C8] leading-relaxed">
              And it has a direct cost on your revenue, your execution, and your
              energy.
            </p>
          </div>

          {/* The Equation */}
          <div className="bg-[#1a1a1a] p-8 md:p-12 my-12">
            <p className="text-sm text-[#B22222] tracking-[0.2em] uppercase mb-4">
              The Core Equation
            </p>
            <p className="text-3xl md:text-4xl font-serif text-[#E8E8E8] mb-6">
              Performance = Potential - Interference
            </p>
            <p className="text-lg text-[#C8C8C8] leading-relaxed">
              Most founders are operating well below their actual potential. Not
              because of the business they are building. But because of what is
              getting in the way inside it.
            </p>
          </div>

          <p className="text-lg text-[#C8C8C8] leading-relaxed mb-8">
            Over 35 years across startups and Fortune 500 companies, I kept seeing
            the same pattern. Brilliant people promoted into leadership roles
            without being equipped to lead. Execution slows. Engagement drops.
            Quality suffers. Good people leave.
          </p>

          <p className="text-lg text-[#C8C8C8] leading-relaxed">
            I saw it often enough that I wrote{" "}
            <em>Sustainable Quality</em>, which explores the direct connection
            between culture, leadership, and performance.
          </p>
        </div>
      </div>
    </section>
  );
}
