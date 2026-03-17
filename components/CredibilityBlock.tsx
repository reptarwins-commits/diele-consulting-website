"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) return;
    setDone(false);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else { setCount(target); setDone(true); }
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return { count, done };
}

// ── Ticker ────────────────────────────────────────────────────────────────────
const companies = [
  "Dell Technologies",
  "SanDisk",
  "Sun Microsystems",
  "StorageTek",
  "ScaleFlux",
  "Liqid",
];
const tickerItems = [...companies, ...companies, ...companies];

function Ticker() {
  return (
    <div className="relative overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .cred-scroll-track {
          animation: scroll-left 22s linear infinite;
          display: flex;
          width: max-content;
        }
        .cred-scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      {/* Edge fades — matched to section bg */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

      <div className="cred-scroll-track">
        {tickerItems.map((name, i) => (
          <span key={i} className="flex items-center gap-10 px-5">
            <span className="text-white/40 hover:text-white/70 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 cursor-default whitespace-nowrap">
              {name}
            </span>
            <span className="text-[#B22222]/40 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
const stats = [
  { value: 35,  suffix: "+", label: "Years Experience",    sub: "Technology leadership & ops" },
  { value: 500, suffix: "+", label: "Leaders Developed",   sub: "Tech, manufacturing & gov" },
  { value: 52,  suffix: "",  label: "Culture Indicators",  sub: "Measured every engagement" },
  { value: 100, suffix: "%", label: "Custom Engagements",  sub: "No off-the-shelf programs" },
];

function StatCard({ stat, active, delay }: { stat: typeof stats[0]; active: boolean; delay: number }) {
  const { count, done } = useCountUp(stat.value, 2, active);
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (active) { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }
  }, [active, delay]);

  useEffect(() => {
    if (done) { setPulse(true); const t = setTimeout(() => setPulse(false), 400); return () => clearTimeout(t); }
  }, [done]);

  return (
    <div className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className={`text-4xl md:text-5xl font-serif font-bold text-[#E8E8E8] mb-2 transition-transform duration-200 ${pulse ? "scale-110" : "scale-100"}`}>
        {count}{stat.suffix}
      </div>
      <div className="w-6 h-[2px] bg-[#B22222] mx-auto mb-2" />
      <div className="text-[#E8E8E8] font-semibold text-sm mb-1">{stat.label}</div>
      <div className="text-[#909090] text-sm leading-relaxed">{stat.sub}</div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CredibilityBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#1a1a1a] border-t border-white/5">

      {/* Bio + photo ── same max-w as all other sections */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-6 grid md:grid-cols-[1fr_1.6fr] gap-12 items-center">

        {/* Photo */}
        <div className="relative w-full max-w-[300px] mx-auto md:mx-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[4px]">
            <Image
              src="/images/joe-headshot.jpg"
              alt="Joseph Diele"
              fill
              className="object-cover object-top"
              sizes="300px"
            />
            <div className="absolute bottom-0 left-0 w-14 h-[3px] bg-[#B22222]" />
          </div>
        </div>

        {/* Name, bio, credentials */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">About Joe</span>
          </div>
          <h2 className="text-[#E8E8E8] font-serif font-bold text-4xl md:text-5xl leading-tight mb-2">
            Joseph Diele
          </h2>
          <p className="text-[#909090] text-sm tracking-wide mb-6">
            Executive Coach · Engineer-turned-Leader · Author
          </p>
          <p className="text-[#C8C8C8] text-base leading-relaxed mb-8">
            35 years across 9 companies — from engineer to CTO to coach. I've lived the transition you're navigating, and I know exactly where it breaks down. I help technical leaders close the gap between what got them here and what it takes to go further.
          </p>
          {/* Credentials */}
          <div className="flex flex-wrap gap-2">
            {["CECM", "LSS Black Belt", "M.S. Org. Leadership", "Author — Sustainable Quality"].map(c => (
              <span key={c} className="text-[#909090] text-xs border border-white/10 px-3 py-1">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div ref={ref} className="max-w-6xl mx-auto px-6 pt-8 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} active={statsActive} delay={i * 150} />
          ))}
        </div>
      </div>

      {/* Ticker — full-bleed, below stats */}
      <div className="border-t border-white/5 py-5 overflow-hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0 pl-8 pr-8 border-r border-white/10">
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase whitespace-nowrap">
              Career Built At
            </p>
          </div>
          <div className="relative flex-1 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
            <Ticker />
          </div>
        </div>
      </div>

    </section>
  );
}
