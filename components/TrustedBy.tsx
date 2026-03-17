"use client";

const companies = [
  "Dell Technologies",
  "SanDisk",
  "Sun Microsystems",
  "StorageTek",
  "ScaleFlux",
  "Liqid",
];

// Triplicate for seamless infinite loop
const items = [...companies, ...companies, ...companies];

export default function TrustedBy() {
  return (
    <section className="bg-[#0d0d0d] border-t border-b border-white/5 py-6 overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .scroll-track {
          animation: scroll-left 22s linear infinite;
          display: flex;
          width: max-content;
        }
        .scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex items-center">
        {/* Fixed left label */}
        <div className="flex-shrink-0 pl-8 pr-10 border-r border-white/10">
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase whitespace-nowrap">
            Career Built At
          </p>
        </div>

        {/* Scrolling track */}
        <div className="relative flex-1 overflow-hidden">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

          <div className="scroll-track">
            {items.map((name, i) => (
              <span key={i} className="flex items-center gap-10 px-5">
                <span className="text-white/40 hover:text-white/80 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 cursor-default whitespace-nowrap">
                  {name}
                </span>
                <span className="text-[#B22222]/40 text-[8px]">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
