"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const questions = [
  "When was the last time your team solved a problem without you?",
  "When did you last take a week off and actually disconnect?",
  "How many decisions are still waiting for your approval right now?",
];

const CHAR_SPEED = 28;       // ms per char
const PAUSE_AFTER = 1800;    // ms after question fully typed before next
const FADE_DURATION = 400;   // ms fade out before next question

function TypewriterQuestion({ text, onDone }: { text: string; onDone: () => void }) {
  const [chars, setChars] = useState(0);

  useEffect(() => {
    setChars(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setChars(i);
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(onDone, PAUSE_AFTER);
      }
    }, CHAR_SPEED);
    return () => clearInterval(interval);
  }, [text, onDone]);

  return (
    <span>
      {text.slice(0, chars)}
      <span className="animate-pulse text-[#B22222]">|</span>
    </span>
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

export default function HeroConcept2() {
  const [phase, setPhase] = useState<"questions" | "reveal">("questions");
  const [qIndex, setQIndex] = useState(0);
  const [qFading, setQFading] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [copyVisible, setCopyVisible] = useState(false);
  const [bioVisible, setBioVisible] = useState(false);

  const handleQuestionDone = () => {
    if (qIndex < questions.length - 1) {
      setQFading(true);
      setTimeout(() => {
        setQIndex(i => i + 1);
        setQFading(false);
      }, FADE_DURATION);
    } else {
      // Last question done — pause, then reveal the headline
      setQFading(true);
      setTimeout(() => {
        setPhase("reveal");
        setTimeout(() => setHeadlineVisible(true), 100);
        setTimeout(() => setCopyVisible(true), 600);
        setTimeout(() => setBioVisible(true), 1000);
      }, FADE_DURATION);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#111111]">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222] z-20" />

      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#E8E8E8 1px, transparent 1px), linear-gradient(90deg, #E8E8E8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-28 pb-24">

        {/* PHASE 1 — Diagnostic questions */}
        {phase === "questions" && (
          <div className={`transition-opacity duration-300 ${qFading ? "opacity-0" : "opacity-100"}`}>
            {/* Small label */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-[2px] bg-[#B22222]" />
              <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">A question for you</span>
            </div>

            {/* Question counter dots */}
            <div className="flex gap-2 mb-8">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-[2px] transition-all duration-300 ${i === qIndex ? "w-8 bg-[#B22222]" : i < qIndex ? "w-4 bg-[#B22222]/40" : "w-4 bg-white/10"}`}
                />
              ))}
            </div>

            <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8E8E8] leading-[1.2] max-w-3xl min-h-[7rem]">
              <TypewriterQuestion
                key={qIndex}
                text={questions[qIndex]}
                onDone={handleQuestionDone}
              />
            </p>

            <p className="text-[#909090] text-sm mt-12 italic">
              {qIndex < questions.length - 1 ? `${questions.length - 1 - qIndex} more question${questions.length - 1 - qIndex !== 1 ? "s" : ""}…` : "Last one."}
            </p>
          </div>
        )}

        {/* PHASE 2 — Reveal */}
        {phase === "reveal" && (
          <div>
            {/* Headline */}
            <div className={`transition-all duration-700 ${headlineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-[#B22222]" />
                <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Executive Coaching & Leadership Development</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#E8E8E8] leading-[1.1] mb-6 max-w-3xl">
                If those questions landed — you already know why you're here.
              </h1>
            </div>

            {/* Copy + CTA */}
            <div className={`transition-all duration-700 delay-200 ${copyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-[#C8C8C8] text-lg leading-relaxed mb-10 max-w-2xl">
                The skills that got you promoted aren't the ones that will make you a great leader. I help technical executives close that gap — not with frameworks, but with the hard-won lessons of someone who lived it first.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <HeroPrimaryButton />
                <a href="#services" className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-semibold px-8 py-4 transition-all duration-300 flex items-center justify-center">
                  See How It Works
                </a>
              </div>
            </div>

            {/* Bio strip — headshot here, not in hero */}
            <div className={`transition-all duration-700 delay-300 border-t border-white/5 pt-10 ${bioVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden border border-[#B22222]/30">
                  <Image
                    src="/images/joe-headshot.jpg"
                    alt="Joseph Diele"
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-[#E8E8E8] font-semibold text-sm">Joseph Diele</p>
                  <p className="text-[#909090] text-xs mt-0.5">Executive Coach · 35 years in tech · Author, <em>Sustainable Quality</em></p>
                </div>
                <div className="hidden sm:block w-[1px] h-10 bg-white/10 mx-4" />
                <div className="hidden sm:flex gap-6">
                  {["CECM", "LSS Black Belt", "M.S. Org. Leadership"].map(c => (
                    <span key={c} className="text-[#909090] text-xs">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll hint — only after reveal */}
      {phase === "reveal" && (
        <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#B22222] to-transparent animate-pulse" />
        </div>
      )}
    </section>
  );
}
