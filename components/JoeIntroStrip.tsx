"use client";
// JoeIntroStrip — full-width intro section that sits immediately below the hero
// Large photo left, name + credentials + stats right
// Used by concept-e-2 and concept-e-3
import Image from "next/image";

export default function JoeIntroStrip() {
  return (
    <section className="bg-[#1a1a1a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[1fr_1.6fr] gap-12 items-center">

        {/* Photo — large, portrait */}
        <div className="relative w-full max-w-[340px] mx-auto md:mx-0">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/joe-headshot.jpg"
              alt="Joseph Diele"
              fill
              className="object-cover object-top"
              sizes="340px"
            />
            {/* Red accent border bottom-left */}
            <div className="absolute bottom-0 left-0 w-16 h-[3px] bg-[#B22222]" />
          </div>
        </div>

        {/* Right — name, credentials, stats, CTA */}
        <div>
          {/* Name + title */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#B22222]" />
              <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">About Joe</span>
            </div>
            <h2 className="text-[#E8E8E8] font-serif font-bold text-4xl md:text-5xl leading-tight mb-2">
              Joseph Diele
            </h2>
            <p className="text-[#909090] text-sm tracking-wide">
              Executive Coach · Engineer-turned-Leader · Author
            </p>
          </div>

          {/* Bio sentence */}
          <p className="text-[#C8C8C8] text-base leading-relaxed mb-8">
            35 years across 9 companies — from engineer to CTO to coach. I've lived the transition you're navigating, and I know exactly where it breaks down. I help technical leaders close the gap between what got them here and what it takes to go further.
          </p>

          {/* Credentials */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["CECM", "LSS Black Belt", "M.S. Org. Leadership", "Author — Sustainable Quality"].map(c => (
              <span key={c} className="text-[#909090] text-xs border border-white/10 px-3 py-1">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
