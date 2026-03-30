"use client";
import { useEffect, useRef, useState } from "react";

const mediaItems = [
  {
    type: "podcast" as const,
    title: "Culture, Continuous Improvement & Quality",
    show: "Diele Consulting Podcast Feature",
    date: "July 26, 2022",
    url: "https://open.spotify.com/episode/5herX3voydURCYJQI3dxDS",
    label: "Listen on Spotify",
  },
];

export default function FeaturedOn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-[#111111] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Featured On</span>
            <div className="w-6 h-[1px] bg-[#B22222]" />
          </div>

          <div className="flex flex-wrap gap-4">
            {mediaItems.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 bg-[#1a1a1a] border border-white/5 hover:border-[#B22222]/30 transition-all duration-300 max-w-xl"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#B22222]/20 transition-colors duration-300">
                  {item.type === "podcast" && (
                    <svg className="w-5 h-5 text-[#B22222]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                    </svg>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[#E8E8E8] text-sm font-semibold leading-snug mb-1 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </p>
                  <p className="text-[#909090] text-xs mb-2">{item.show} · {item.date}</p>
                  <span className="inline-flex items-center gap-1 text-[#B22222] text-xs font-semibold tracking-wide uppercase">
                    {item.label}
                    <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
