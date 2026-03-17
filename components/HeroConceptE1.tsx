"use client";
// CONCEPT E — "The Reveal" (v5)
// Sequence:
//   1. Line 1 slides in → holds → dims 25%
//   2. Line 2 slides in simultaneously with dim
//   3. "leader." gets hand-drawn SVG circle after line 2 lands
//   4. Both lines translate UP — line 1 exits top, line 2 takes line 1's slot
//   5. Line 3 typewriters in; line 2 dims 25%
//   6. CTA fades in after line 3 finishes
import { useEffect, useRef, useState } from "react";

const LINE1 = "The technical skills that made you great";
const LINE2_PREFIX = "won't make you a great ";
const LINE2_WORD   = "leader.";
const LINE3 = "I help you close that gap.";
const CHAR_INTERVAL = 38;

// Timing (ms from mount)
const T_LINE1_IN  = 200;
const T_DIM1      = 2400;
const T_LINE2_IN  = 2400;
const T_CIRCLE    = 4400;  // circle draws 600ms after line 2 fully lands (2400+1400+600)
const T_SCROLL_UP = 6000;  // pause to admire circle, then scroll up
const T_LINE3_IN  = 8200;  // after scroll-up (6000+1800) + 400ms pause
const T_CTA       = T_LINE3_IN + LINE3.length * CHAR_INTERVAL + 600;
const T_BIO       = T_CTA + 600;

// Irregular ellipse path — slightly wobbly to look hand-drawn
// Drawn around a normalized 200×60 box; we scale via SVG viewBox
// Clean ellipse: 4-arc cubic bezier, starts/ends at top-center (100,2)
const CIRCLE_PATH = "M 100,2 C 148,2 196,16 196,30 C 196,44 148,58 100,58 C 52,58 4,44 4,30 C 4,16 52,2 100,2 Z";
// Total approx path length for stroke-dasharray
// Path length = perimeter of ellipse with rx~96, ry~28 ≈ 2π√((96²+28²)/2) ≈ 490
const PATH_LENGTH = 490;

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

// Inline circle — only mounted after circleDrawn fires
// Uses local animate state with 50ms delay so browser paints hidden state before transitioning
function WordCircle({ draw }: { draw: boolean }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);
  const pad = { x: 28, y: 18 };
  return (
    <svg
      style={{
        position: "absolute",
        left: -pad.x,
        top: -pad.y,
        width: `calc(100% + ${pad.x * 2}px)`,
        height: `calc(100% + ${pad.y * 2}px)`,
        pointerEvents: "none",
        overflow: "visible",
      }}
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
    >
      {/* Single path — fully hidden until draw fires, then sweeps around word */}
      <path
        d={CIRCLE_PATH}
        fill="none"
        stroke="#B22222"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: `${PATH_LENGTH} 9999`,
          strokeDashoffset: animate ? 0 : PATH_LENGTH,
          transition: animate ? "stroke-dashoffset 700ms cubic-bezier(0.4,0,0.2,1)" : "none",
        }}
      />
    </svg>
  );
}

export default function HeroConceptE() {
  const [line1Visible, setLine1Visible]     = useState(false);
  const [line1Dimmed, setLine1Dimmed]       = useState(false);
  const [line2Visible, setLine2Visible]     = useState(false);
  const [circleDrawn, setCircleDrawn]       = useState(false);
  const [underlineDrawn, setUnderlineDrawn]   = useState(false);
  const [scrolledUp, setScrolledUp]         = useState(false);
  const [line2Dimmed, setLine2Dimmed]       = useState(false);
  const [line3Chars, setLine3Chars]         = useState(0);
  const [ctaVisible, setCtaVisible]         = useState(false);
  const [bioVisible, setBioVisible]         = useState(false);
  const [eyebrowVisible, setEyebrowVisible] = useState(false);

  const [hasScrolled, setHasScrolled] = useState(false);
  const seqStage   = useRef(0);
  const lastScrollY = useRef(0);
  const line1Ref   = useRef<HTMLDivElement>(null);
  const leaderRef  = useRef<HTMLSpanElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (line1Ref.current) setLineHeight(line1Ref.current.offsetHeight);
  }, [line1Visible]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    at(T_LINE1_IN,  () => { setEyebrowVisible(true); setLine1Visible(true); seqStage.current = 1; });
    at(T_DIM1,      () => { setLine1Dimmed(true); setLine2Visible(true); seqStage.current = 2; });
    at(T_CIRCLE,    () => { setCircleDrawn(true); seqStage.current = 3; });
    at(T_SCROLL_UP, () => { setScrolledUp(true); seqStage.current = 4; });
    at(T_LINE3_IN,  () => {
      setLine2Dimmed(true); seqStage.current = 5;
      let i = 0;
      const tick = setInterval(() => {
        i++;
        setLine3Chars(i);
        if (i >= LINE3.length) clearInterval(tick);
      }, CHAR_INTERVAL);
      timers.push(tick as unknown as ReturnType<typeof setTimeout>);
    });
    at(T_CTA,  () => { setCtaVisible(true); setUnderlineDrawn(true); seqStage.current = 6; });
    at(T_BIO,  () => setBioVisible(true));

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      if (sy > 10) setHasScrolled(true);
      if (sy > lastScrollY.current + 40 && seqStage.current < 4) {
        setLine1Visible(true); setEyebrowVisible(true);
        setLine1Dimmed(true); setLine2Visible(true);
        setCircleDrawn(true); setScrolledUp(true); setUnderlineDrawn(true);
        setLine2Dimmed(true); setLine3Chars(LINE3.length);
        setCtaVisible(true); setBioVisible(true);
        seqStage.current = 6;
      }
      lastScrollY.current = sy;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const upShift = lineHeight > 0 ? lineHeight + 8 : 90;
  const headlineSize = "clamp(2.5rem, 6vw, 5.5rem)";
  const headlineLineH = 1.1;

  return (
    <section className="hero-section relative min-h-screen flex flex-col justify-center bg-[#111111] overflow-hidden">
      {/* Line grid — top-left visible, sharp diagonal fade crossing mid-screen */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        WebkitMaskImage: "linear-gradient(135deg, black 0%, black 40%, transparent 58%)",
        maskImage: "linear-gradient(135deg, black 0%, black 40%, transparent 58%)",
      }} />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222] z-20" />

      {/* Red accent bar */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] bg-[#B22222] rounded-full"
        style={{
          height: ctaVisible ? "60%" : scrolledUp ? "40%" : line2Visible ? "30%" : line1Visible ? "20%" : "0%",
          transition: "height 1000ms ease-out",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-20">

        {/* Eyebrow */}
        <div
          className="mb-10"
          style={{ opacity: eyebrowVisible ? 1 : 0, transition: "opacity 600ms ease" }}
        >
          <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
            Executive Coaching & Leadership Development
          </span>
        </div>

        {/* Lines container */}
        <div
          className="relative mb-10 lines-container"
          style={{ height: `calc(${upShift * 2 + 8}px)` }}
        >

          {/* LINE 1 */}
          <div
            ref={line1Ref}
            className="absolute left-0 w-full"
            style={{
              top: 0,
              transform: scrolledUp
                ? `translateY(calc(-100% - ${upShift}px))`
                : line1Visible ? "translateY(0)" : "translateY(20px)",
              opacity: scrolledUp ? 0 : line1Visible ? 1 : 0,
              transition: scrolledUp
                ? "transform 1800ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 1400ms ease-in-out"
                : "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 700ms ease",
            }}
          >
            <span
              className="font-serif font-bold block"
              style={{
                fontSize: headlineSize,
                lineHeight: headlineLineH,
                color: line1Dimmed ? "#969696" : "#C8C8C8",
                transition: "color 1200ms ease-in-out",
              }}
            >
              {LINE1}
            </span>
          </div>

          {/* LINE 2 — with "leader." ref for circle */}
          <div
            className="absolute left-0 w-full"
            style={{
              top: scrolledUp ? 0 : `${upShift + 8}px`,
              transform: line2Visible ? "translateY(0)" : "translateY(60px)",
              opacity: line2Visible ? 1 : 0,
              transition: [
                `top 1800ms cubic-bezier(0.25,0.46,0.45,0.94)`,
                `transform 1400ms cubic-bezier(0.25,0.46,0.45,0.94)`,
                `opacity 1400ms cubic-bezier(0.25,0.46,0.45,0.94)`,
              ].join(", "),
            }}
          >
            <span
              className="font-serif font-bold block"
              style={{
                fontSize: headlineSize,
                lineHeight: headlineLineH,
                color: line2Dimmed ? "#969696" : "#E8E8E8",
                transition: "color 1200ms ease-in-out",
              }}
            >
              {LINE2_PREFIX}
              <span ref={leaderRef} style={{ position: "relative", display: "inline-block" }}>
                {LINE2_WORD}
                {circleDrawn && <WordCircle draw={circleDrawn} />}
              </span>
            </span>
          </div>



          {/* LINE 3 — typewriter */}
          {scrolledUp && (
            <div
              className="absolute left-0 w-full"
              style={{ top: `${upShift + 16}px` }}
            >
              <span
                className="font-bold block"
                style={{
                  fontSize: headlineSize,
                  lineHeight: headlineLineH,
                  color: "#E8E8E8",
                  fontFamily: "var(--font-caveat)",
                  position: "relative",
                }}
              >
                {LINE3.slice(0, line3Chars)}

              </span>
              {/* Hand-drawn underline — diagonal, left to right, slight upward angle */}
              <svg
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "-14px",
                  width: "72%",
                  height: "18px",
                  overflow: "visible",
                  pointerEvents: "none",
                }}
                viewBox="0 0 300 18"
                preserveAspectRatio="none"
              >
                <path
                  d="M 4,14 C 60,16 140,12 200,10 C 240,8 270,7 296,5"
                  fill="none"
                  stroke="#B22222"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 310,
                    strokeDashoffset: underlineDrawn ? 0 : 310,
                    transition: underlineDrawn ? "stroke-dashoffset 600ms cubic-bezier(0.4,0,0.2,1)" : "none",
                  }}
                />
              </svg>
            </div>
          )}
        </div>

        {/* Hand-drawn circle — positioned relative to section, travels with line 2 */}


        {/* Single CTA — left-aligned, auto width */}
        <div
          className="mt-14 flex items-center gap-6"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <HeroPrimaryButton />
          <a href="#services" className="text-[#909090] hover:text-[#E8E8E8] text-sm tracking-wide border-b border-white/20 hover:border-white/50 pb-0.5 transition-colors duration-200">
            See How It Works →
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      {!hasScrolled && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-white/40 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll to continue</span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M8 1v14M2 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
