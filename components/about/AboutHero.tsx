"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section className="relative pt-32 pb-20 bg-[#111111] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222]" />

      {/* Subtle red glow top-left */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-[#B22222]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#B22222]" />
              <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">About Joe</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E8E8E8] leading-[1.1] mb-6">
              I didn't just study leadership.<br />
              <span className="text-[#B22222]">I lived the hard version.</span>
            </h1>
            <p className="text-[#C8C8C8] text-lg leading-relaxed mb-4">
              Thirty-five years in tech — from engineer to director to founder. I've been the bottleneck, the hero, the manager everyone was waiting on. I've watched brilliant people fail at leadership for the same reasons I almost did.
            </p>
            <p className="text-[#C8C8C8] text-base leading-relaxed">
              Now I help technical leaders make the transition I had to figure out the hard way.
            </p>
          </div>

          {/* Right — photo */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] max-w-sm mx-auto">
              <Image
                src="/images/joe-headshot.jpg"
                alt="Joseph Diele"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {/* Red corner accent */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-[#B22222]" />
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#B22222]/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
