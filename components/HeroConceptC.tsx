"use client";
// CONCEPT C — "The Morphing Headline" (Figma school)
// Headline cycles through 3 states, words blur-swap in place.
// "Technical skills open doors." → "People skills keep them open." → final hold.
import { useEffect, useState } from "react";
import Image from "next/image";

// Each state: array of words. Same slot = same position on screen.
// Words that stay the same don't animate. Words that change blur-swap.
const STATES = [
  { words: ["Technical", "skills", "open", "doors."], color: "text-[#909090]" },
  { words: ["People", "skills", "keep", "them", "open."], color: "text-[#C8C8C8]" },
];
const FINAL = "The skills that made you the best engineer in the room won't make you the best leader.";
const HOLD_MS = 2200;
const SWAP_MS = 500;

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

// A single word that can blur-swap between values
function MorphWord({ text, visible, delay = 0, className = "" }: {
  text: string; visible: boolean; delay?: number; className?: string;
}) {
  return (
    <span
      className={`inline-block mr-[0.22em] transition-all ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : "blur(6px)",
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transitionDuration: `${SWAP_MS}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {text}
    </span>
  );
}

export default function HeroConceptC() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0); // 0=state0, 1=state1, 2=final
  const [finalVisible, setFinalVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [bioVisible, setBioVisible] = useState(false);
  const [state0Visible, setState0Visible] = useState(false);
  const [state1Visible, setState1Visible] = useState(false);

  useEffect(() => {
    // State 0: arrive
    const t0 = setTimeout(() => setState0Visible(true), 300);
    // State 1: swap
    const t1 = setTimeout(() => {
      setState0Visible(false);
      setTimeout(() => { setPhase(1); setState1Visible(true); }, SWAP_MS + 100);
    }, HOLD_MS);
    // Final: swap to full headline
    const t2 = setTimeout(() => {
      setState1Visible(false);
      setTimeout(() => { setPhase(2); setFinalVisible(true); }, SWAP_MS + 100);
    }, HOLD_MS * 2 + 200);
    // CTA
    const t3 = setTimeout(() => setCtaVisible(true), HOLD_MS * 2 + SWAP_MS + 800);
    const t4 = setTimeout(() => setBioVisible(true), HOLD_MS * 2 + SWAP_MS + 1100);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const finalWords = FINAL.split(" ");

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#111111] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222] z-20" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Eyebrow — small label top left */}
        <div className="flex items-center gap-3 mb-14" style={{ opacity: 1 }}>
          <div className="w-8 h-[2px] bg-[#B22222]" />
          <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Executive Coaching & Leadership Development</span>
        </div>

        {/* Morphing headline zone — fixed height so layout doesn't jump */}
        <div className="mb-6 min-h-[14rem] md:min-h-[10rem] flex items-center">
          <h1 className="font-serif font-bold" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", lineHeight: 1.1 }}>

            {/* Phase 0 — "Technical skills open doors." */}
            {phase === 0 && (
              <span>
                {STATES[0].words.map((w, i) => (
                  <MorphWord key={i} text={w} visible={state0Visible} delay={i * 60} className={STATES[0].color} />
                ))}
              </span>
            )}

            {/* Phase 1 — "People skills keep them open." */}
            {phase === 1 && (
              <span>
                {STATES[1].words.map((w, i) => (
                  <MorphWord key={i} text={w} visible={state1Visible} delay={i * 60} className={STATES[1].color} />
                ))}
              </span>
            )}

            {/* Phase 2 — Full headline */}
            {phase === 2 && (
              <span>
                {finalWords.map((w, i) => (
                  <MorphWord
                    key={i}
                    text={w}
                    visible={finalVisible}
                    delay={i * 30}
                    className={w === "leader." ? "text-[#B22222]" : "text-[#E8E8E8]"}
                  />
                ))}
              </span>
            )}
          </h1>
        </div>

        {/* Connector line — appears after final */}
        {phase === 2 && (
          <div
            className="flex items-center gap-4 mb-8"
            style={{ opacity: ctaVisible ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            <div className="h-[1px] w-8 bg-[#B22222]" />
            <span
              className="text-[#B22222]"
              style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700 }}
            >
              I help you close that gap.
            </span>
          </div>
        )}

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
          style={{ opacity: bioVisible ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          <div className="relative w-12 h-12 overflow-hidden border border-[#B22222]/30 flex-shrink-0">
            <Image src="/images/joe-headshot.jpg" alt="Joseph Diele" fill className="object-cover object-top" sizes="48px" />
          </div>
          <div>
            <p className="text-[#E8E8E8] font-semibold text-sm">Joseph Diele</p>
            <p className="text-[#909090] text-xs mt-0.5">Executive Coach · 35 years in tech · Author, <em>Sustainable Quality</em></p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#B22222] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
