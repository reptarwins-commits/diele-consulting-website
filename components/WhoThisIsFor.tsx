"use client";
import { useEffect, useRef, useState } from "react";

const signals = [
  "You're a CEO, CTO, or VP of Engineering at a 20–50+ person tech company",
  "Your org has grown beyond the people you hired and trusted — and things feel different now",
  "You built your career on being the smartest person in the room, and now that's not enough",
  "You've got people problems but you keep trying to solve them with a technical mindset",
  "You haven't named it yet, but something in the culture isn't working",
];

export default function WhoThisIsFor() {
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
    <section id="who-this-is-for" ref={ref} className="py-24 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Who This Is For</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-6 leading-tight">
            You might be in the right place if&hellip;
          </h2>
          <p className="text-[#C8C8C8] text-base leading-relaxed mb-6">
            The transition from technical expert to leader isn't just a skills gap — it's an identity shift. Most people try to solve it with the same tools that made them successful. Those tools don't work here.
          </p>
          <p className="text-[#C8C8C8] text-base leading-relaxed mb-8">
            The inflection point isn't about headcount. It's when your org grows beyond the trust networks into stranger territory — and the culture you had organically starts to fray.
          </p>
          <a href="#services" className="inline-flex items-center gap-2 text-[#E8E8E8] font-semibold text-sm border-b border-[#B22222] pb-1 hover:text-[#B22222] transition-colors duration-200">
            See how I can help <span>→</span>
          </a>
        </div>

        {/* Right — reveal wrapper has the delay; li only handles hover (instant) */}
        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <ul className="space-y-3">
            {signals.map((signal, i) => (
              /* Reveal wrapper — carries the stagger delay */
              <div
                key={i}
                className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                {/* Hover target — zero delay, instant response */}
                <li className="flex gap-4 p-4 border border-white/5 bg-[#1a1a1a] hover:border-[#B22222] hover:bg-[#2a1515] hover:shadow-lg hover:shadow-[#B22222]/10 hover:-translate-x-1 transition-all duration-200 cursor-default group list-none">
                  <div className="mt-1 w-4 h-4 border border-[#B22222]/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-[#B22222] group-hover:scale-125 transition-transform duration-150" />
                  </div>
                  <span className="text-[#C8C8C8] group-hover:text-white text-base leading-relaxed transition-colors duration-150">{signal}</span>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
