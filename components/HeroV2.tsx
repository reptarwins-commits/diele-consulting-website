"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const headline = "The skills that made you the best engineer in the room won't make you the best".split(" ");
const headlineEnd = ["leader."];
const tagline = "I help you close that gap.";


// Absolutely positioned underline — lives OUTSIDE the word-reveal spans
// so no parent opacity/transform transition can interfere
function UnderlineLayer({ leaderRef, trigger }: {
  leaderRef: React.RefObject<HTMLSpanElement | null>;
  trigger: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [rect, setRect] = useState<{ left: number; top: number; width: number } | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => {
      const el = leaderRef.current;
      const parent = el?.closest(".hero-content") as HTMLElement | null;
      if (!el || !parent) return;
      const elRect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      // Step 1: render the SVG hidden (clip-path 100%)
      setRect({
        left: elRect.left - parentRect.left,
        top: elRect.bottom - parentRect.top + 4,
        width: elRect.width,
      });
    }, 400);
    return () => clearTimeout(t);
  }, [trigger, leaderRef]);

  // Step 2: once rect is set and SVG is in the DOM, add transition + flip clip-path
  useEffect(() => {
    if (!rect || !svgRef.current) return;
    const svg = svgRef.current;
    // Two rAFs: first paints the element hidden, second starts the animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        svg.style.transition = "clip-path 1.2s cubic-bezier(0.4,0,0.2,1), opacity 0.1s ease";
        svg.style.clipPath = "inset(0 0% 0 0)";
        svg.style.opacity = "1";
      });
    });
  }, [rect]);

  if (!rect) return null;

  return (
    <svg
      ref={svgRef}
      style={{
        position: "absolute",
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: 12,
        overflow: "visible",
        pointerEvents: "none",
        opacity: 0,
        clipPath: "inset(0 100% 0 0)",
      }}
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M2 9 C40 3, 100 12, 198 6"
        stroke="#B22222"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
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
      Schedule a Conversation
      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
    </a>
  );
}

// Writes text character by character using clip-path reveal
function WriteIn({ text, active, className = "", style, delay = 0 }: {
  text: string; active: boolean; className?: string; style?: React.CSSProperties; delay?: number;
}) {
  const [charsVisible, setCharsVisible] = useState(0);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const msPerChar = 38; // speed of "writing"
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setCharsVisible(i);
        if (i >= text.length) clearInterval(interval);
      }, msPerChar);
    }, delay);
    return () => clearTimeout(t);
  }, [active, text, delay]);

  return (
    <span className={className} style={style}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            opacity: i < charsVisible ? 1 : 0,
            display: "inline-block",
            width: char === " " ? "0.3em" : undefined,
            transition: "opacity 0.06s ease",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function HeroV2() {
  const [visible, setVisible] = useState(false);
  const [wordsVisible, setWordsVisible] = useState(0);
  const [taglineReady, setTaglineReady] = useState(false);     // stage 3: tagline writes in
  const [parallaxY, setParallaxY] = useState(0);
  const leaderRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const total = headline.length + headlineEnd.length;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setWordsVisible(i);
      if (i >= total) {
        clearInterval(interval);
        // Stage 2: underline handled purely via CSS animation-delay in globals.css
        // Stage 3: tagline writes in 1s after underline starts
        setTimeout(() => setTaglineReady(true), 150 + 1400 + 1250);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [visible]);

  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allWords = [
    ...headline.map(w => ({ word: w, accent: false })),
    ...headlineEnd.map(w => ({ word: w, accent: true })),
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#111111]">
      {/* Red top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222] z-20" />

      {/* Right-side photo */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] z-0"
        style={{ transform: `translateY(${parallaxY}px)`, willChange: "transform" }}
      >
        <Image
          src="/images/joe-headshot.jpg"
          alt="Joseph Diele"
          fill
          className="object-cover"
          style={{ objectPosition: "center center" }}
          priority
          sizes="55vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/30" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className={`hero-content relative max-w-xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
              Executive Coaching & Leadership Development
            </span>
          </div>

          {/* Stage 1: Word-reveal headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.1] mb-3">
            {allWords.map(({ word, accent }, i) => (
              <span
                key={i}
                className={`inline-block mr-[0.22em] transition-[opacity,transform] duration-300 ${
                  i < wordsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                {accent ? (
                  <span ref={leaderRef} className="relative inline-block text-[#B22222]">
                    {word}
                  </span>
                ) : word}
              </span>
            ))}
          </h1>

          {/* Stage 2: Underline — sibling of h1, positioned via JS under "leader." word */}
          <UnderlineLayer leaderRef={leaderRef} trigger={wordsVisible >= headline.length + headlineEnd.length} />

          {/* Stage 3: Tagline writes in letter by letter */}
          <div className="mb-6 min-h-[3.5rem] flex items-center">
            <WriteIn
              text={tagline}
              active={taglineReady}
className="text-[#B22222] text-4xl md:text-5xl leading-tight block" style={{ fontFamily: "var(--font-caveat)" }}
            />
          </div>

          <p className="text-[#C8C8C8] text-base leading-relaxed mb-10 max-w-lg">
            You got to where you are because of what you know. Getting to what's next requires learning how to lead. I've been where you are — not as a coach who studied it, but as someone who lived it.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <HeroPrimaryButton />
            <a
              href="#services"
              className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-semibold px-8 py-4 transition-all duration-300 flex items-center justify-center"
            >
              See How It Works
            </a>
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
