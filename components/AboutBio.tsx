"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const credentials = [
  "CECM",
  "LSS Black Belt",
  "M.S. Org. Leadership",
  "Author — Sustainable Quality",
];

const companies = [
  "Sun Microsystems",
  "StorageTek",
  "ScaleFlux",
  "Liqid",
  "Dell Technologies",
  "SanDisk",
];

export default function AboutBio() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Headshot — left */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="relative w-full max-w-md mx-auto md:mx-0">
            <div className="relative aspect-[4/5] shadow-2xl shadow-black/50">
              <Image
                src="/images/joe-headshot.jpg"
                alt="Joseph Diele"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-20 bg-[#B22222]" />
          </div>
        </div>

        {/* Bio — right */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
              About Joe
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#E8E8E8] mb-3 leading-tight">
            Joseph Diele
          </h2>
          <p className="text-[#909090] text-sm mb-6">
            Executive Coach &middot; Engineer-turned-Leader &middot; Author
          </p>
          <p className="text-[#C8C8C8] text-base leading-relaxed mb-8 max-w-xl">
            35 years across 9 companies &mdash; from engineer to CTO to coach. I&apos;ve lived
            the transition you&apos;re navigating, and I know exactly where it breaks down. I
            help technical leaders close the gap between what got them here and what it takes
            to go further.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {credentials.map((c) => (
              <span
                key={c}
                className="text-[#909090] text-xs border border-white/10 px-3 py-1.5"
              >
                {c}
              </span>
            ))}
          </div>
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-[#E8E8E8] font-semibold text-sm border-b border-[#B22222] pb-1 hover:text-[#B22222] transition-colors duration-200"
          >
            More about Joe <span>&rarr;</span>
          </a>
        </div>
      </div>

      {/* Relocated company ticker — directly below the bio */}
      <div className="mt-20 border-t border-white/5 pt-8 overflow-hidden">
        <div
          className="flex w-max gap-8 whitespace-nowrap text-white/30 text-xs uppercase tracking-[0.2em]"
          style={{ animation: "ticker 14s linear infinite" }}
        >
          {companies.map((co, i) => (
            <span key={i} className="flex items-center gap-8">
              {co}
              <span className="text-[#B22222]/40">&middot;</span>
            </span>
          ))}
          {companies.map((co, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-8">
              {co}
              <span className="text-[#B22222]/40">&middot;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
