"use client";
// CONCEPT B — "The Arrival"
// Words arrive from below + blur snap — per-word stagger, 40ms apart.
// Not a slide-in, not a typewriter. A materialization.
// Used by Work & Co, Instrument, Huge — says "craft" without performing it.
import { useEffect, useState } from "react";
import Image from "next/image";

const WORDS = "The skills that made you the best engineer in the room won't make you the best leader.".split(" ");
const TAGLINE = "I help you close that gap.";
const STAGGER_MS = 45;
const BLUR_DURATION = 480;

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

export default function HeroConceptB() {
  const [trigger, setTrigger] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [bioVisible, setBioVisible] = useState(false);

  const totalAnimMs = WORDS.length * STAGGER_MS + BLUR_DURATION;

  useEffect(() => {
    const t1 = setTimeout(() => setTrigger(true), 200);
    const t2 = setTimeout(() => setTaglineVisible(true), totalAnimMs + 100);
    const t3 = setTimeout(() => setCtaVisible(true), totalAnimMs + 350);
    const t4 = setTimeout(() => setBioVisible(true), totalAnimMs + 600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [totalAnimMs]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#111111] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222] z-20" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-10"
          style={{ opacity: trigger ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          <div className="w-8 h-[2px] bg-[#B22222]" />
          <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Executive Coaching & Leadership Development</span>
        </div>

        {/* Headline — each word materializes with blur+rise */}
        <h1 className="font-serif font-bold leading-[1.12] mb-0" style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}>
          {WORDS.map((word, i) => {
            const isLast = word === "leader.";
            const delay = i * STAGGER_MS;
            const arrived = trigger;
            return (
              <span
                key={i}
                className={`inline-block mr-[0.22em] ${isLast ? "text-[#B22222]" : "text-[#E8E8E8]"}`}
                style={{
                  opacity: arrived ? 1 : 0,
                  transform: arrived ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)",
                  filter: arrived ? "blur(0px)" : "blur(8px)",
                  transition: `opacity ${BLUR_DURATION}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${BLUR_DURATION}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter ${BLUR_DURATION}ms ease ${delay}ms`,
                }}
              >
                {word}
              </span>
            );
          })}
        </h1>

        {/* Tagline */}
        <div
          className="mt-8 mb-10"
          style={{
            opacity: taglineVisible ? 1 : 0,
            transform: taglineVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span
            className="text-[#B22222]"
            style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700 }}
          >
            {TAGLINE}
          </span>
        </div>

        {/* Copy + CTAs */}
        <div
          className="grid md:grid-cols-2 gap-10 items-start"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-[#C8C8C8] text-base leading-relaxed">
            You got to where you are because of what you know. Getting to what's next requires learning how to lead — not from a framework, but from someone who lived the hard version first.
          </p>
          <div className="flex flex-col gap-3">
            <HeroPrimaryButton />
            <a href="#services" className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-semibold px-8 py-4 transition-all duration-300 text-center">
              See How It Works
            </a>
          </div>
        </div>

        {/* Bio strip */}
        <div
          className="mt-14 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{
            opacity: bioVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <div className="relative w-12 h-12 overflow-hidden border border-[#B22222]/30 flex-shrink-0">
            <Image src="/images/joe-headshot.jpg" alt="Joseph Diele" fill className="object-cover object-top" sizes="48px" />
          </div>
          <div>
            <p className="text-[#E8E8E8] font-semibold text-sm">Joseph Diele</p>
            <p className="text-[#909090] text-xs mt-0.5">Executive Coach · 35 years in tech · Author, <em>Sustainable Quality</em> · CECM · LSS Black Belt</p>
          </div>
          <div className="hidden sm:flex gap-8 ml-auto">
            {[["35yr", "Experience"], ["400+", "Leaders"], ["9", "Companies"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-[#E8E8E8] font-bold text-base leading-none">{n}</div>
                <div className="text-[#909090] text-[9px] tracking-wider uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#B22222] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
