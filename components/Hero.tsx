"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

const headline = "The skills that made you the best engineer in the room won't make you the best".split(" ");
const headlineEnd = ["leader."];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [wordsVisible, setWordsVisible] = useState(0);
  const [tickerReady, setTickerReady] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

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
        setTimeout(() => setTickerReady(true), 400);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [visible]);

  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allWords = [
    ...headline.map(w => ({ word: w, accent: false })),
    ...headlineEnd.map(w => ({ word: w, accent: true })),
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#111111]">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Red top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B22222]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
              Executive Coaching & Leadership Development
            </span>
          </div>

          {/* Word-reveal headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#E8E8E8] leading-[1.15] mb-4">
            {allWords.map(({ word, accent }, i) => (
              <span
                key={i}
                className={`inline-block mr-[0.22em] transition-all duration-300 ${
                  i < wordsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                {accent ? (
                  <span className="red-underline">{word}</span>
                ) : word}
              </span>
            ))}
          </h1>

          <p className="text-[#E8E8E8] text-xl font-light mb-8 leading-relaxed">
            I help you close that gap.
          </p>

          <p className="text-[#C8C8C8] text-base leading-relaxed mb-10 max-w-lg">
            You got to where you are because of what you know. Getting to what's next requires learning how to lead. I've been where you are — not as a coach who studied it, but as someone who lived it.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticButton
              href="https://calendly.com/josephdiele"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#B22222] hover:bg-[#CC3333] text-white font-semibold px-8 py-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#B22222]/20 items-center justify-center gap-2"
            >
              Schedule a Conversation
              <span className="group-hover:translate-x-1 transition-transform duration-200 ml-2">→</span>
            </MagneticButton>
            <a
              href="#services"
              className="border border-[#E8E8E8]/20 hover:border-[#E8E8E8]/60 text-[#C8C8C8] hover:text-[#E8E8E8] font-semibold px-8 py-4 transition-all duration-300 flex items-center justify-center"
            >
              See How It Works
            </a>
          </div>

          {/* Credentials */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <p className="text-[#C8C8C8] text-xs tracking-widest uppercase mb-3">Credentials</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[#C8C8C8] text-sm">
              {["CECM", "Lean Six Sigma Black Belt", "Published Author", "35 Years"].map((c, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-[#B22222]">·</span>}
                  {c}
                </span>
              ))}
            </div>

            {/* Ticker */}
            <div className="mt-3 overflow-hidden h-5 relative">
              <div
                className={`flex gap-8 text-[#909090] text-xs whitespace-nowrap transition-opacity duration-500 ${tickerReady ? "opacity-100" : "opacity-0"}`}
                style={{ animation: tickerReady ? "ticker 14s linear infinite" : "none" }}
              >
                {["Dell", "SanDisk", "Sun Microsystems", "ScaleFlux", "Liqid", "StorageTek"].map((co, i) => (
                  <span key={i} className="flex items-center gap-8">
                    {co}<span className="text-[#B22222]/40">·</span>
                  </span>
                ))}
                {["Dell", "SanDisk", "Sun Microsystems", "ScaleFlux", "Liqid", "StorageTek"].map((co, i) => (
                  <span key={`d-${i}`} className="flex items-center gap-8">
                    {co}<span className="text-[#B22222]/40">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Photo */}
        <div
          className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transform: `translateY(${-parallaxY}px)` }}
        >
          <div className="relative">
            {/* Red border accent */}
            <div className="absolute -top-3 -right-3 w-full h-full border border-[#B22222]/40 pointer-events-none" />

            <div className="relative overflow-hidden aspect-[3/4] max-w-sm mx-auto">
              <Image
                src="/images/joe-headshot.jpg"
                alt="Joseph Diele — Executive Coach"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#111111] to-transparent" />

              {/* Book badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/90 backdrop-blur-sm border border-[#B22222]/30 p-3 flex items-center gap-3">
                <Image
                  src="/images/sustainable-quality-cover.jpg"
                  alt="Sustainable Quality"
                  width={40}
                  height={52}
                  className="object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-[#B22222] text-xs font-semibold tracking-wide uppercase">Published Author</p>
                  <p className="text-[#E8E8E8] text-sm font-semibold">Sustainable Quality</p>
                  <p className="text-[#C8C8C8] text-xs">Business Expert Press, 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#909090]">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#B22222] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
