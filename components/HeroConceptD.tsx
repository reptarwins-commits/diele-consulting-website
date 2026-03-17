"use client";
// CONCEPT D — "The Newspaper"
// Editorial broadsheet layout. Giant condensed headline at top like a masthead.
// Two-column body copy. Date + edition. Red rules. Photo as columnist portrait.
// Nothing else in consulting looks like this.
import { useEffect, useState } from "react";
import Image from "next/image";

function HeroPrimaryButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="https://calendly.com/josephdiele" target="_blank" rel="noopener noreferrer"
      className="relative inline-flex items-center gap-2 bg-[#B22222] text-white font-semibold px-6 py-3 text-sm overflow-hidden transition-all duration-200 hover:bg-[#9a1a1a] hover:shadow-lg hover:shadow-[#B22222]/30"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 left-0 h-[2px] bg-white transition-all ease-out" style={{ width: hovered ? "100%" : "0%", transitionDuration: "350ms" }} />
      <div className="absolute top-0 right-0 w-[2px] bg-white transition-all ease-out" style={{ height: hovered ? "100%" : "0%", transitionDuration: "350ms", transitionDelay: "90ms" }} />
      <div className="absolute bottom-0 right-0 h-[2px] bg-white transition-all ease-out" style={{ width: hovered ? "100%" : "0%", transitionDuration: "350ms", transitionDelay: "180ms" }} />
      <div className="absolute bottom-0 left-0 w-[2px] bg-white transition-all ease-out" style={{ height: hovered ? "100%" : "0%", transitionDuration: "350ms", transitionDelay: "270ms" }} />
      Schedule a Conversation →
    </a>
  );
}

export default function HeroConceptD() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen bg-[#111111] overflow-hidden pt-20">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222] z-20" />

      <div className={`relative z-10 max-w-6xl mx-auto px-6 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>

        {/* MASTHEAD — newspaper top bar */}
        <div className="border-b border-white/10 py-3 flex items-center justify-between mb-0">
          <div className="flex items-center gap-4">
            <span className="text-[#909090] text-[10px] tracking-[0.3em] uppercase">Est. 2024</span>
            <span className="text-white/20">·</span>
            <span className="text-[#909090] text-[10px] tracking-[0.3em] uppercase">Vol. I · No. 1</span>
          </div>
          <span className="text-[#909090] text-[10px] tracking-[0.2em] uppercase">Executive Coaching & Leadership Development</span>
          <span className="text-[#909090] text-[10px] tracking-[0.2em] uppercase hidden sm:block">dieleconsulting.com</span>
        </div>

        {/* GIANT HEADLINE — condensed, full-bleed */}
        <div className="border-b-2 border-white/10 py-6 mb-0">
          <h1
            className="font-serif font-black text-[#E8E8E8] leading-[0.95] uppercase tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          >
            <span className="block">The skills that</span>
            <span className="block">made you great</span>
            <span className="block text-[#B22222]">won't be enough.</span>
          </h1>
        </div>

        {/* Red rule */}
        <div className="h-[3px] bg-[#B22222] mb-0" />
        <div className="h-[1px] bg-white/10 mb-6" />

        {/* BODY — two-column broadsheet layout */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1px_2fr_1px_1.2fr] gap-0 items-start">

          {/* Column 1 */}
          <div className="pr-6">
            <p className="text-[#909090] text-[10px] tracking-[0.25em] uppercase font-semibold mb-3 border-b border-white/10 pb-2">
              The Gap
            </p>
            <p className="text-[#C8C8C8] text-sm leading-[1.75] mb-4">
              You were promoted because you were the best at what you did. The sharpest technical mind. The one who could solve problems nobody else could touch.
            </p>
            <p className="text-[#C8C8C8] text-sm leading-[1.75]">
              Nobody told you the rules had changed. The skills that got you promoted — mastery, precision, having the right answer — are exactly the skills that will hold you back as a leader.
            </p>
          </div>

          {/* Vertical rule */}
          <div className="hidden md:block w-[1px] bg-white/8 mx-6 self-stretch" />

          {/* Column 2 */}
          <div className="px-0 md:px-6 mt-6 md:mt-0">
            <p className="text-[#909090] text-[10px] tracking-[0.25em] uppercase font-semibold mb-3 border-b border-white/10 pb-2">
              The Work
            </p>
            <p className="text-[#C8C8C8] text-sm leading-[1.75] mb-4">
              The transition from expert to leader is one of the most disorienting moves in a career. Most organizations handle it by handing you a new title and hoping for the best.
            </p>
            <p className="text-[#C8C8C8] text-sm leading-[1.75] mb-6">
              I've been where you are — not as a coach who studied it, but as someone who lived the hard version first. I help you close that gap.
            </p>
            <div className="flex flex-col gap-3 items-start">
              <HeroPrimaryButton />
              <a href="#services" className="text-[#909090] hover:text-[#E8E8E8] text-xs tracking-wide uppercase border-b border-white/20 hover:border-white/50 pb-0.5 transition-colors duration-200">
                See How It Works →
              </a>
            </div>
          </div>

          {/* Vertical rule */}
          <div className="hidden md:block w-[1px] bg-white/8 mx-6 self-stretch" />

          {/* Column 3 — columnist portrait */}
          <div className="mt-6 md:mt-0 pl-0 md:pl-6">
            <p className="text-[#909090] text-[10px] tracking-[0.25em] uppercase font-semibold mb-3 border-b border-white/10 pb-2">
              The Author
            </p>
            {/* Photo — portrait, tall, columnist style */}
            <div className="relative w-full aspect-[3/4] overflow-hidden border border-white/5 mb-4 max-w-[180px]">
              <Image
                src="/images/joe-headshot.jpg"
                alt="Joseph Diele"
                fill
                className="object-cover object-top grayscale-[20%]"
                sizes="180px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
            </div>
            <p className="text-[#E8E8E8] font-bold text-sm mb-1">Joseph Diele</p>
            <p className="text-[#909090] text-xs leading-relaxed mb-3">
              35 years. 9 companies. 1 book. Executive coach, engineer-turned-leader, and the person who'll tell you what nobody else will.
            </p>
            <div className="flex flex-col gap-1">
              {["CECM", "LSS Black Belt", "M.S. Org. Leadership"].map(c => (
                <span key={c} className="text-[#909090] text-[10px] tracking-wide">— {c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-8 h-[1px] bg-white/10" />
        <div className="py-3 flex items-center justify-between">
          <span className="text-[#B22222] text-[10px] tracking-[0.3em] uppercase font-semibold">Diele Consulting</span>
          <span className="text-[#909090] text-[10px] tracking-[0.2em] uppercase">josephdiele@gmail.com · 720-398-7701</span>
        </div>

      </div>
    </section>
  );
}
