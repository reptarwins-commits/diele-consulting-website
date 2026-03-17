"use client";
import { useEffect, useRef, useState } from "react";

const credentials = [
  {
    abbr: "CECM",
    full: "Certified Executive Coach & Mentor",
    context: "The credential that backs the coaching work — not just experience, but a validated methodology for developing leaders.",
  },
  {
    abbr: "LSSBB",
    full: "Lean Six Sigma Black Belt",
    context: "Operational discipline meets people leadership. Joe brings rigorous systems thinking to culture and organizational design.",
  },
  {
    abbr: "M.S.",
    full: "Management — Regis University",
    context: "Concentration in Leadership, Change Management, and Organizational Behavior. Graduated Magna Cum Laude.",
  },
  {
    abbr: "B.S.",
    full: "Computer Information Systems — Regis University",
    context: "The technical foundation. Graduated Magna Cum Laude. Where it all started.",
  },
];

export default function Credentials() {
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
    <section className="py-24 bg-[#1a1a1a]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Credentials</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-16">
            The work is backed by the credentials.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {credentials.map((c, i) => (
            <div
              key={i}
              className={`border border-white/5 bg-[#111111] p-6 hover:border-[#B22222]/40 hover:bg-[#150a0a] transition-all duration-200 group hover:-translate-y-0.5 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 border border-[#B22222]/30 group-hover:border-[#B22222] flex items-center justify-center transition-colors duration-200">
                  <span className="text-[#B22222] text-sm font-bold tracking-wider">{c.abbr}</span>
                </div>
                <div>
                  <p className="text-[#E8E8E8] font-semibold text-base mb-1">{c.full}</p>
                  <p className="text-[#909090] text-sm leading-relaxed">{c.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
