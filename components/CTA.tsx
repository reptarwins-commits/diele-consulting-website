"use client";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#B22222]/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#B22222]/5 to-transparent" />

      <div className={`relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-[1px] bg-[#B22222]" />
          <span className="text-[#E84444] text-xs tracking-[0.3em] uppercase font-semibold">Take the First Step</span>
          <div className="w-6 h-[1px] bg-[#B22222]" />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8E8E8] mb-6 leading-tight">
          Ready to find out where the gaps are?
        </h2>

        <p className="text-[#C8C8C8] text-lg leading-relaxed mb-4 max-w-xl mx-auto">
          Start with a People & Culture Rapid Assessment. A focused diagnostic that gives you clear language for what's broken — and a prioritized path forward.
        </p>
        <p className="text-[#909090] text-sm mb-12">
          Flat fee. No retainer required. You'll walk away with a written report and a clear next step.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton
            href="https://calendly.com/josephdiele"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#B22222] hover:bg-[#CC3333] text-white font-semibold px-10 py-4 transition-colors duration-300 hover:shadow-xl hover:shadow-[#B22222]/20 items-center justify-center gap-2 text-base"
          >
            Start the Assessment — $2,500
            <span className="group-hover:translate-x-1 transition-transform duration-200 ml-2">→</span>
          </MagneticButton>
          <a
            href="https://calendly.com/josephdiele"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 hover:border-[#E8E8E8]/40 text-[#C8C8C8] hover:text-[#E8E8E8] font-semibold px-10 py-4 transition-all duration-300 flex items-center justify-center text-base"
          >
            Schedule a Free 30-Min Call
          </a>
        </div>
      </div>
    </section>
  );
}
