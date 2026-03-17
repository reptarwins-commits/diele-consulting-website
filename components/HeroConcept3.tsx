"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const lines = [
  { text: "The skills that",    size: "text-5xl md:text-6xl lg:text-7xl", weight: "font-black", color: "text-[#E8E8E8]", delay: 0 },
  { text: "made you great",     size: "text-5xl md:text-6xl lg:text-7xl", weight: "font-black", color: "text-[#E8E8E8]", delay: 120 },
  { text: "at your craft",      size: "text-5xl md:text-6xl lg:text-7xl", weight: "font-black", color: "text-[#E8E8E8]", delay: 240 },
  { text: "won't make you",     size: "text-4xl md:text-5xl lg:text-6xl", weight: "font-light", color: "text-[#909090]",  delay: 380 },
  { text: "great at leading.",  size: "text-4xl md:text-5xl lg:text-6xl", weight: "font-light", color: "text-[#B22222]",  delay: 500 },
];

const TAGLINE = "I help you close that gap.";
const CHAR_MS = 42;

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

export default function HeroConcept3() {
  const [visible, setVisible]         = useState(false);
  const [taglineChars, setTaglineChars] = useState(0);  // how many chars of tagline are showing
  const [taglineActive, setTaglineActive] = useState(false);
  const [ctaVisible, setCtaVisible]   = useState(false);
  const [bioVisible, setBioVisible]   = useState(false);

  const lastLineDelay = lines[lines.length - 1].delay;

  useEffect(() => {
    // Lines start sliding in immediately
    const t1 = setTimeout(() => setVisible(true), 150);
    // Tagline starts after last line finishes animating (~600ms transition + lastLineDelay)
    const taglineStart = lastLineDelay + 700;
    const t2 = setTimeout(() => setTaglineActive(true), taglineStart);
    // CTA + copy appear after tagline finishes typing
    const taglineDone = taglineStart + TAGLINE.length * CHAR_MS + 300;
    const t3 = setTimeout(() => setCtaVisible(true), taglineDone);
    const t4 = setTimeout(() => setBioVisible(true), taglineDone + 300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [lastLineDelay]);

  // Drive char-by-char reveal
  useEffect(() => {
    if (!taglineActive) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTaglineChars(i);
      if (i >= TAGLINE.length) clearInterval(interval);
    }, CHAR_MS);
    return () => clearInterval(interval);
  }, [taglineActive]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#111111]">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222] z-20" />
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#B22222] via-[#B22222]/20 to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 pt-28 pb-20">

        {/* Eyebrow */}
        <div className={`flex items-center gap-3 mb-10 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-[#B22222] text-xs tracking-[0.35em] uppercase font-semibold">Executive Coaching & Leadership Development</span>
        </div>

        {/* Two-column: headline left, tagline right */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-end mb-14">

          {/* LEFT — stacked headline lines slide up */}
          <h1 className="font-serif leading-[1.05]">
            {lines.map((line, i) => (
              <div key={i} className={`block overflow-hidden ${line.size} ${line.weight} ${line.color}`}>
                <span
                  className="block"
                  style={{
                    transform: visible ? "translateY(0)" : "translateY(110%)",
                    opacity: visible ? 1 : 0,
                    transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${line.delay}ms, opacity 0.4s ease ${line.delay}ms`,
                  }}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </h1>

          {/* RIGHT — tagline types in char by char, large Caveat */}
          <div className="lg:pb-2 min-h-[8rem] flex items-end">
            <p
              className="text-[#B22222] leading-tight"
              style={{
                fontFamily: "var(--font-caveat)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
              }}
            >
              {TAGLINE.split("").map((char, i) => (
                <span
                  key={i}
                  style={{
                    opacity: i < taglineChars ? 1 : 0,
                    display: "inline-block",
                    width: char === " " ? "0.28em" : undefined,
                    transition: "opacity 0.05s ease",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              {/* Blinking cursor while typing */}
              {taglineChars < TAGLINE.length && taglineActive && (
                <span className="animate-pulse text-[#B22222] ml-0.5">|</span>
              )}
            </p>
          </div>
        </div>

        {/* Copy + CTAs — fade in after tagline finishes */}
        <div
          className="grid md:grid-cols-2 gap-10 items-start"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-[#C8C8C8] text-base leading-relaxed">
            You got to where you are because of what you know. Getting to what's next requires learning how to lead. I've been where you are — not as a coach who studied it, but as someone who lived the hard version first.
          </p>
          <div className="flex flex-col gap-4">
            <HeroPrimaryButton />
            <a href="#services" className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-semibold px-8 py-4 transition-all duration-300 flex items-center justify-center text-base">
              See How It Works
            </a>
          </div>
        </div>

        {/* Bio strip */}
        <div
          className="mt-16 pt-10 border-t border-white/5"
          style={{
            opacity: bioVisible ? 1 : 0,
            transform: bioVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden border border-[#B22222]/30">
              <Image src="/images/joe-headshot.jpg" alt="Joseph Diele" fill className="object-cover object-top" sizes="64px" />
            </div>
            <div>
              <p className="text-[#E8E8E8] font-semibold">Joseph Diele</p>
              <p className="text-[#909090] text-sm mt-0.5">
                Executive Coach · 35 years in tech leadership · Author, <em>Sustainable Quality</em> · CECM · LSS Black Belt
              </p>
            </div>
            <div className="hidden md:flex gap-6 ml-auto flex-shrink-0">
              {[["35", "Years"], ["9", "Companies"], ["400+", "Leaders"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="text-[#E8E8E8] font-bold text-lg leading-none">{n}</div>
                  <div className="text-[#909090] text-[10px] tracking-wider uppercase mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
