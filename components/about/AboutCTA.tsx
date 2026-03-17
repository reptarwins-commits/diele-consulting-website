"use client";
import { useEffect, useRef, useState } from "react";

export default function AboutCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[#1a1a1a] border-t border-white/5" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Work Together</span>
            <div className="w-8 h-[1px] bg-[#B22222]" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-6 leading-tight">
            If any of this sounds familiar,<br />
            <span className="text-[#B22222]">let's talk.</span>
          </h2>

          <p className="text-[#C8C8C8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Not a sales call. A real conversation about where you are, where you want to be, and whether I'm the right person to help you get there.
          </p>

          <a
            href="https://calendly.com/josephdiele"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#B22222] hover:bg-[#9a1a1a] text-white font-semibold px-10 py-5 text-base transition-all duration-200 hover:shadow-xl hover:shadow-[#B22222]/30 hover:-translate-y-0.5"
          >
            Schedule a Conversation
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
