"use client";
// CONCEPT A — "The Statement"
// Linear/Vercel school: massive centered headline, zero performance anxiety
// Size IS the confidence. One red underline draw. Caveat tagline fades. That's it.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function HeroPrimaryButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="https://calendly.com/josephdiele" target="_blank" rel="noopener noreferrer"
      className="relative flex items-center gap-2 bg-[#B22222] text-white font-semibold px-8 py-4 text-base overflow-hidden transition-all duration-200 hover:bg-[#9a1a1a] hover:shadow-xl hover:shadow-[#B22222]/30 hover:-translate-y-0.5"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 left-0 h-[2px] bg-white transition-all ease-out" style={{ width: hovered ? "100%" : "0%", transitionDuration: "400ms" }} />
      <div className="absolute top-0 right-0 w-[2px] bg-white transition-all ease-out" style={{ height: hovered ? "100%" : "0%", transitionDuration: "400ms", transitionDelay: "100ms" }} />
      <div className="absolute bottom-0 right-0 h-[2px] bg-white transition-all ease-out" style={{ width: hovered ? "100%" : "0%", transitionDuration: "400ms", transitionDelay: "200ms" }} />
      <div className="absolute bottom-0 left-0 w-[2px] bg-white transition-all ease-out" style={{ height: hovered ? "100%" : "0%", transitionDuration: "400ms", transitionDelay: "300ms" }} />
      Schedule a Conversation →
    </a>
  );
}

export default function HeroConceptA() {
  const [loaded, setLoaded] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [tagline, setTagline] = useState(false);
  const [bio, setBio] = useState(false);
  const leaderRef = useRef<HTMLSpanElement>(null);
  const [lineRect, setLineRect] = useState<{ left: number; width: number; top: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 80);
    const t2 = setTimeout(() => setUnderline(true), 600);
    const t3 = setTimeout(() => setTagline(true), 1200);
    const t4 = setTimeout(() => setBio(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    if (!underline || !leaderRef.current || !containerRef.current) return;
    const el = leaderRef.current;
    const container = containerRef.current;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setLineRect({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      top: elRect.bottom - containerRect.top + 6,
    });
  }, [underline]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#111111] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222] z-20" />

      {/* Very subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }} />

      <div ref={containerRef} className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <div className={`flex items-center justify-center gap-3 mb-10 transition-all duration-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <div className="w-6 h-[1px] bg-[#B22222]" />
          <span className="text-[#B22222] text-[10px] tracking-[0.4em] uppercase font-semibold">Executive Coaching & Leadership Development</span>
          <div className="w-6 h-[1px] bg-[#B22222]" />
        </div>

        {/* THE HEADLINE — enormous, centered */}
        <h1
          className={`font-serif font-black leading-[1.0] mb-0 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
        >
          <div>The skills that made you</div>
          <div>the best engineer in the room</div>
          <div>
            won't make you the best{" "}
            <span ref={leaderRef} className="text-[#B22222] relative inline-block">leader.</span>
          </div>
        </h1>

        {/* SVG underline — drawn left to right */}
        {lineRect && (
          <svg
            style={{
              position: "absolute",
              left: lineRect.left,
              top: lineRect.top,
              width: lineRect.width,
              height: 14,
              overflow: "visible",
              pointerEvents: "none",
            }}
            viewBox="0 0 200 14"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M2 10 C50 4, 110 13, 198 7"
              stroke="#B22222"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              style={{
                strokeDasharray: 210,
                strokeDashoffset: underline ? 0 : 210,
                transition: "stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
              }}
            />
          </svg>
        )}

        {/* Tagline — Caveat, fades in below headline */}
        <div
          className="mt-10 mb-12"
          style={{
            opacity: tagline ? 1 : 0,
            transform: tagline ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span
            className="text-[#B22222]"
            style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700 }}
          >
            I help you close that gap.
          </span>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          style={{ opacity: tagline ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}
        >
          <HeroPrimaryButton />
          <a href="#services" className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-semibold px-8 py-4 transition-all duration-300">
            See How It Works
          </a>
        </div>

        {/* Bio strip — horizontal, centered */}
        <div
          className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
          style={{ opacity: bio ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          <div className="relative w-12 h-12 overflow-hidden border border-[#B22222]/30 flex-shrink-0">
            <Image src="/images/joe-headshot.jpg" alt="Joseph Diele" fill className="object-cover object-top" sizes="48px" />
          </div>
          <div className="text-left">
            <p className="text-[#E8E8E8] font-semibold text-sm">Joseph Diele</p>
            <p className="text-[#909090] text-xs mt-0.5">Executive Coach · 35 years · Author, <em>Sustainable Quality</em> · CECM · LSS Black Belt</p>
          </div>
          <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
          <div className="hidden sm:flex gap-8">
            {[["35yr", "Experience"], ["400+", "Leaders Coached"], ["9", "Companies"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-[#E8E8E8] font-bold text-base leading-none">{n}</div>
                <div className="text-[#909090] text-[9px] tracking-wider uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
