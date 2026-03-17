"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Concept 4 — The Stat Wall
// Left: headline copy. Right: animated data grid — numbers count up, then resolve.
// Photo appears as one "data point" in the grid — portrait tile among the stats.

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function StatTile({
  value, suffix = "", label, delay, active, large = false,
}: {
  value: number; suffix?: string; label: string; delay: number; active: boolean; large?: boolean;
}) {
  const [show, setShow] = useState(false);
  const count = useCountUp(value, show);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  return (
    <div
      className={`border border-white/5 bg-[#1a1a1a] p-5 flex flex-col justify-end transition-all duration-500 ${show ? "opacity-100" : "opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`font-serif font-black text-[#E8E8E8] leading-none mb-2 ${large ? "text-5xl" : "text-3xl"}`}>
        {count}{suffix}
      </div>
      <div className="text-[#909090] text-[10px] tracking-[0.2em] uppercase">{label}</div>
      <div className="mt-3 h-[2px] w-6 bg-[#B22222]" />
    </div>
  );
}

function HeroPrimaryButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://calendly.com/josephdiele"
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex items-center justify-center gap-2 bg-[#B22222] text-white font-semibold px-8 py-4 text-base overflow-hidden transition-all duration-200 hover:bg-[#9a1a1a] hover:shadow-xl hover:shadow-[#B22222]/30 hover:-translate-y-0.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 left-0 h-[2px] bg-white transition-all ease-out" style={{ width: hovered ? "100%" : "0%", transitionDuration: "400ms" }} />
      <div className="absolute top-0 right-0 w-[2px] bg-white transition-all ease-out" style={{ height: hovered ? "100%" : "0%", transitionDuration: "400ms", transitionDelay: "100ms" }} />
      <div className="absolute bottom-0 right-0 h-[2px] bg-white transition-all ease-out" style={{ width: hovered ? "100%" : "0%", transitionDuration: "400ms", transitionDelay: "200ms" }} />
      <div className="absolute bottom-0 left-0 w-[2px] bg-white transition-all ease-out" style={{ height: hovered ? "100%" : "0%", transitionDuration: "400ms", transitionDelay: "300ms" }} />
      Schedule a Conversation →
    </a>
  );
}

export default function HeroConcept4() {
  const [visible, setVisible] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const [copyVisible, setCopyVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setStatsActive(true), 400);
    const t3 = setTimeout(() => setCopyVisible(true), 200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#111111]">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222] z-20" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Headline + copy + CTA */}
          <div className={`transition-all duration-700 ${copyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#B22222]" />
              <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Executive Coaching</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E8E8E8] leading-[1.1] mb-6">
              The skills that made you the best engineer in the room won't make you the best{" "}
              <span className="text-[#B22222]">leader.</span>
            </h1>

            <p className="text-[#C8C8C8] text-base leading-relaxed mb-10">
              You got to where you are because of what you know. Getting to what's next requires learning how to lead. 35 years of living it — now I help others make the same shift.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <HeroPrimaryButton />
              <a href="#services" className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-semibold px-8 py-4 transition-all duration-300 flex items-center justify-center">
                See How It Works
              </a>
            </div>
          </div>

          {/* RIGHT — Data grid */}
          <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[420px]">

            {/* Row 1 */}
            <StatTile value={35} suffix="yr" label="In Tech Leadership" delay={0} active={statsActive} large />
            <StatTile value={9} label="Companies" delay={80} active={statsActive} />
            {/* Photo tile — spans 1 row, 1 col */}
            <div
              className={`relative border border-[#B22222]/20 overflow-hidden row-span-2 transition-all duration-700 ${statsActive ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "160ms" }}
            >
              <Image
                src="/images/joe-headshot.jpg"
                alt="Joseph Diele"
                fill
                className="object-cover object-top"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[#E8E8E8] font-semibold text-sm leading-tight">Joseph Diele</p>
                <p className="text-[#909090] text-[10px] tracking-wide uppercase mt-0.5">Executive Coach</p>
              </div>
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#B22222]" />
            </div>

            {/* Row 2 */}
            <StatTile value={400} suffix="+" label="Leaders Coached" delay={160} active={statsActive} large />
            <StatTile value={1} label="Published Book" delay={240} active={statsActive} />

            {/* Row 3 */}
            <div
              className={`col-span-2 border border-white/5 bg-[#1a1a1a] p-5 flex items-center gap-4 transition-all duration-500 ${statsActive ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "320ms" }}
            >
              <div className="flex gap-2 flex-wrap">
                {["CECM", "LSS Black Belt", "M.S. Org. Leadership", "B.S. Mech. Eng."].map(c => (
                  <span key={c} className="border border-[#B22222]/30 text-[#C8C8C8] text-[10px] tracking-wide uppercase px-2 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <StatTile value={2} label="Published Books" delay={360} active={statsActive} />

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#B22222] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
